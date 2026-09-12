"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLearning } from "@/context/LearningContext";
import {
  matchPersons,
  matchTargets,
  audioListeningChallenge,
  MatchPerson,
  MatchTarget,
} from "@/data/quizData";

export default function InteractivePracticePage() {
  const { showTashkeel, playPronunciation, playFeedbackSound, addPoints, decrementHeart } =
    useLearning();

  // Exercise 1: Matching State
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({
    p_salim: "t_jadd",
    p_salma: "t_umm",
  });

  // Exercise 2: Audio Challenge State
  const [selectedAudioChoiceId, setSelectedAudioChoiceId] = useState<string | null>(null);
  const [isAudioAnswerSubmitted, setIsAudioAnswerSubmitted] = useState(false);

  // Victory State
  const [isUnitCompleted, setIsUnitCompleted] = useState(false);

  const handleSelectPerson = (personId: string) => {
    if (matchedPairs[personId]) return;
    setSelectedPersonId(personId);
    playFeedbackSound("tap");
  };

  const handleSelectTarget = (targetId: string) => {
    if (!selectedPersonId) return;
    const person = matchPersons.find((p) => p.id === selectedPersonId);

    if (person && person.matchedTargetId === targetId) {
      // Correct Match!
      setMatchedPairs((prev) => ({ ...prev, [selectedPersonId]: targetId }));
      setSelectedPersonId(null);
      playFeedbackSound("success");
      addPoints(10);
    } else {
      // Wrong Match
      playFeedbackSound("error");
      decrementHeart();
    }
  };

  const handlePlayChallengeAudio = () => {
    playFeedbackSound("tap");
    playPronunciation(audioListeningChallenge.audioPrompt);
  };

  const handleSelectAudioChoice = (choiceId: string, isCorrect: boolean) => {
    if (isAudioAnswerSubmitted) return;
    setSelectedAudioChoiceId(choiceId);
    setIsAudioAnswerSubmitted(true);

    if (isCorrect) {
      playFeedbackSound("success");
      addPoints(15);
    } else {
      decrementHeart();
    }
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* 1. Header Hero Banner */}
      <section className="relative rounded-2xl bg-surface-container-lowest p-space-md sm:p-space-lg shadow-sm overflow-hidden mb-space-lg border border-surface-container">
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-secondary-fixed/30 pointer-events-none blur-2xl" />
        <div className="absolute top-1/2 -right-8 w-36 h-36 rounded-full bg-primary-fixed/20 pointer-events-none blur-xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant flex-wrap">
              <span className="text-primary font-bold">المستوى الأول</span>
              <span className="material-symbols-outlined text-[14px]">arrow_back_ios</span>
              <span className="text-on-surface-variant font-medium">الوحدة الأولى: أسرتي</span>
              <span className="material-symbols-outlined text-[14px]">arrow_back_ios</span>
              <span className="text-secondary font-bold">الدرس ٤: التمارين التفاعلية</span>
            </div>

            <div className="flex items-baseline gap-space-sm flex-wrap mt-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface m-0 tracking-tight">
                {showTashkeel ? "التَّمَارِينُ التَّفَاعُلِيَّةُ الشَّامِلَة" : "التمارين التفاعلية الشاملة"}
              </h1>
              <span className="text-xs font-bold text-on-surface-variant tracking-wide">
                [ Interactive Practice & Challenges ]
              </span>
            </div>

            <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed mt-1">
              ثبّت ما تعلمته في المفردات، شجرة العائلة، وسلم القواعد من خلال التوصيل الذكي، الاستماع الصوتي، وتحديات النطق.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-primary-fixed/30 px-4 py-2 rounded-full border border-primary/20 text-xs font-bold text-primary self-start lg:self-center">
            <span className="material-symbols-outlined text-base">emoji_events</span>
            <span>الوحدة الأولى: ٤/٤ تحديات مكتملة</span>
          </div>
        </div>
      </section>

      {/* 2. EXERCISE 1: Matching Game */}
      <section className="w-full bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg mb-space-xl shadow-sm border border-surface-container">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6 pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
              ١
            </span>
            <div>
              <h2 className="text-xl font-bold text-on-surface m-0">
                لعبة التوصيل: طابق الشخصية بصلة القرابة
              </h2>
              <p className="text-xs text-on-surface-variant m-0">
                اضغط على بطاقة الشخصية ثم انقر على صلة القرابة المناسبة لتوصيلهما معاً!
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-bold text-on-surface-variant">
            {Object.keys(matchedPairs).length} من {matchPersons.length} مكتمل
          </span>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          {/* Column 1: Persons */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-on-surface-variant px-1 uppercase tracking-wide">
              أفراد الأسرة (Family Members)
            </span>

            {matchPersons.map((person) => {
              const isMatched = !!matchedPairs[person.id];
              const isSelected = selectedPersonId === person.id;

              return (
                <div
                  key={person.id}
                  onClick={() => handleSelectPerson(person.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl shadow-sm cursor-pointer transition-all border ${
                    isMatched
                      ? "bg-primary-fixed/20 border-primary/30"
                      : isSelected
                      ? "bg-primary text-on-primary border-primary ring-2 ring-primary/40 shadow-md translate-y-[-2px]"
                      : "bg-surface-container-low border-surface-container hover:bg-surface-container"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-surface-container shadow-xs shrink-0">
                      <Image
                        src={person.imageUrl}
                        alt={person.namePlain}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-lg font-bold ${
                          isSelected ? "text-on-primary" : "text-on-surface"
                        }`}
                      >
                        {showTashkeel ? person.nameWithTashkeel : person.namePlain}
                      </span>
                      <span
                        className={`text-xs ${
                          isSelected ? "text-on-primary/80" : "text-on-surface-variant"
                        }`}
                      >
                        {person.roleHint}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isMatched ? (
                      <>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold">
                          +٥ XP
                        </span>
                        <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-base">check</span>
                        </span>
                      </>
                    ) : (
                      <span className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center text-xs font-bold">
                        {isSelected ? "محدد" : "اختر"}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 2: Targets */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-on-surface-variant px-1 uppercase tracking-wide">
              صلة القرابة (Relationship Roles)
            </span>

            {matchTargets.map((target) => {
              const matchedPersonId = Object.keys(matchedPairs).find(
                (pId) => matchedPairs[pId] === target.id
              );
              const isMatched = !!matchedPersonId;

              return (
                <div
                  key={target.id}
                  onClick={() => handleSelectTarget(target.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl shadow-sm cursor-pointer transition-all border ${
                    isMatched
                      ? "bg-surface-container-low border-primary/30"
                      : "bg-surface-container-low border-surface-container hover:bg-surface-container hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${target.badgeBg} ${target.badgeTextColor}`}
                    >
                      <span className="material-symbols-outlined text-2xl">
                        {target.icon}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-on-surface">
                        {showTashkeel ? target.titleWithTashkeel : target.titlePlain}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        {target.englishLabel} {isMatched ? "(متصل ✓)" : ""}
                      </span>
                    </div>
                  </div>

                  {isMatched ? (
                    <span className="material-symbols-outlined text-primary text-2xl">
                      task_alt
                    </span>
                  ) : (
                    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full font-medium">
                      انقر للمطابقة
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. EXERCISE 2: Audio Listening Challenge */}
      <section className="w-full bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg mb-space-xl shadow-sm border border-surface-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-3 border-b border-surface-container">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-sm">
                ٢
              </span>
              <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
                تحدي الاستماع والتمييز
              </span>
            </div>
            <h2 className="text-2xl font-bold text-on-surface m-0">
              استمع واختر الكلمة الصحيحة
            </h2>
            <p className="text-xs text-on-surface-variant m-0 mt-0.5">
              انقر على أيقونة الصوت الكبيرة ثم حدد البطاقة المطابقة لما سمعته
            </p>
          </div>

          <div className="px-3.5 py-1.5 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-bold flex items-center gap-1.5 self-start">
            <span className="material-symbols-outlined text-sm">headphones</span>
            صوت فصيح عالي الجودة
          </div>
        </div>

        {/* Centerpiece Audio Player Console */}
        <div className="w-full max-w-2xl mx-auto bg-surface-container-low rounded-2xl p-6 mb-8 flex flex-col items-center text-center shadow-inner relative overflow-hidden border border-surface-container">
          <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-tertiary/10 rounded-full blur-xl pointer-events-none" />

          {/* Pulsing Speaker Core */}
          <div className="relative flex items-center justify-center mb-4">
            <span className="absolute w-24 h-24 rounded-full bg-tertiary/20 animate-ping opacity-75 pointer-events-none" />
            <span className="absolute w-28 h-28 rounded-full bg-tertiary/10 animate-pulse pointer-events-none" />
            <button
              onClick={handlePlayChallengeAudio}
              className="relative z-10 w-20 h-20 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-[0_6px_0_#004b73] hover:brightness-110 active:translate-y-1 active:shadow-[0_2px_0_#004b73] transition-all cursor-pointer"
              type="button"
              title="تشغيل الصوت"
            >
              <span className="material-symbols-outlined text-4xl">volume_up</span>
            </button>
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={handlePlayChallengeAudio}
              className="px-4 py-1.5 bg-surface-container-lowest text-tertiary font-bold rounded-full text-xs shadow-sm hover:bg-surface-container transition-all flex items-center gap-1.5 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">play_arrow</span>
              انقر للاستماع
            </button>
          </div>

          {/* Subtle Clue */}
          <div className="text-xs text-on-surface-variant bg-surface-container-lowest/90 px-4 py-1.5 rounded-full shadow-xs mt-1">
            دليل الصوت: <span className="text-primary font-bold">{showTashkeel ? audioListeningChallenge.audioClueWithTashkeel : audioListeningChallenge.audioClue}</span>
          </div>
        </div>

        {/* 4 Multiple Choice Answer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {audioListeningChallenge.options.map((option, idx) => {
            const isSelected = selectedAudioChoiceId === option.id;

            return (
              <div
                key={option.id}
                onClick={() => handleSelectAudioChoice(option.id, option.isCorrect)}
                className={`flex flex-col rounded-2xl p-4 cursor-pointer transition-all shadow-sm border relative ${
                  isSelected
                    ? option.isCorrect
                      ? "bg-primary-fixed/25 border-primary shadow-md -translate-y-1 ring-2 ring-primary/40"
                      : "bg-error-container/30 border-error shadow-md -translate-y-1"
                    : "bg-surface-container-low border-surface-container hover:bg-surface-container hover:-translate-y-0.5"
                }`}
              >
                {isSelected && option.isCorrect && (
                  <div className="absolute -top-3 right-4 px-3 py-0.5 bg-primary text-on-primary rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-sm">check</span>
                    صحيح! أحسنت
                  </div>
                )}

                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-surface-container-lowest mb-3">
                  <Image
                    src={option.imageUrl}
                    alt={option.nameArabic}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span
                      className={`text-lg font-bold ${
                        isSelected && option.isCorrect ? "text-primary" : "text-on-surface"
                      }`}
                    >
                      {showTashkeel ? option.nameArabicWithTashkeel : option.nameArabic}
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      {option.englishRole}
                    </span>
                  </div>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      isSelected && option.isCorrect
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {isSelected && option.isCorrect ? "✓" : idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. GAMIFICATION VICTORY BAR / RESULTS RIBBON */}
      <section className="w-full rounded-2xl bg-gradient-to-l from-primary via-primary-container to-primary p-6 md:p-8 text-on-primary shadow-xl relative overflow-hidden mb-space-xl">
        {/* Confetti particles */}
        <div className="absolute top-2 left-6 text-2xl opacity-70 select-none animate-bounce">✨</div>
        <div className="absolute bottom-4 right-10 text-3xl opacity-70 select-none animate-pulse">🎉</div>
        <div className="absolute top-10 right-1/3 text-xl opacity-60 select-none">⭐</div>
        <div className="absolute bottom-6 left-1/4 text-2xl opacity-60 select-none">🎈</div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-on-primary">
                🎉 النتيجة النهائية: ١٠٠٪ كاملة
              </span>
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold">
                ممتاز جداً!
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-on-primary m-0">
              أحسنت! أتممت تمارين «أسرتي» بنجاح
            </h3>
            <p className="text-sm text-on-primary/90 max-w-xl mt-1 leading-relaxed">
              لقد أثبت كفاءتك في تمييز أسماء العائلة وضمائرها وإتقان النطق العربي الفصيح.
            </p>
          </div>

          {/* Rewards Badges Cluster */}
          <div className="flex flex-wrap items-center gap-3">
            {/* XP Pill */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest text-on-surface rounded-2xl shadow-md">
              <span
                className="material-symbols-outlined text-secondary-container text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <div className="flex flex-col text-right">
                <span className="text-[11px] text-on-surface-variant font-medium">المكتسب</span>
                <span className="text-base font-bold text-primary leading-tight">+٣٠ XP</span>
              </div>
            </div>

            {/* Streak Pill */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest text-on-surface rounded-2xl shadow-md">
              <span
                className="material-symbols-outlined text-secondary-container text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <div className="flex flex-col text-right">
                <span className="text-[11px] text-on-surface-variant font-medium">شعلة الحماس</span>
                <span className="text-base font-bold text-on-secondary-container leading-tight">٨ أيام!</span>
              </div>
            </div>

            {/* Master Badge */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary-fixed text-on-secondary-fixed rounded-2xl shadow-md">
              <span
                className="material-symbols-outlined text-secondary text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                military_tech
              </span>
              <div className="flex flex-col text-right">
                <span className="text-[11px] text-on-secondary-fixed-variant font-medium">وسام جديد</span>
                <span className="text-base font-bold leading-tight">خبير الأسرة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Finish Action CTA */}
        <div className="relative z-10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/20">
          <div className="flex items-center gap-2 text-on-primary/90 text-xs font-semibold">
            <span className="material-symbols-outlined text-sm">lock_open</span>
            تم فتح الوحدة الثانية بنجاح: «في المدرسة»
          </div>

          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container font-bold rounded-2xl shadow-[0_4px_0_#855300] active:translate-y-1 active:shadow-[0_1px_0_#855300] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>إنهاء الوحدة الأولى والعودة للمفردات</span>
            <span className="material-symbols-outlined text-xl rotate-180">arrow_back</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
