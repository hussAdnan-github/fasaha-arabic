"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLearning } from "@/context/LearningContext";
import { primaryVocabItems, miniFlashcards, VocabItem, MiniFlashcard } from "@/data/vocabularyData";

export default function VocabularyPage() {
  const {
    showTashkeel,
    toggleTashkeel,
    audioSpeed,
    setAudioSpeed,
    playPronunciation,
    playFeedbackSound,
    addPoints,
  } = useLearning();

  const [recordingId, setRecordingId] = useState<string | null>(null);
  const [successToastId, setSuccessToastId] = useState<string | null>(null);
  const [activeWaveId, setActiveWaveId] = useState<string | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);

  const handlePlayWord = (id: string, text: string) => {
    setActiveWaveId(id);
    playFeedbackSound("tap");
    playPronunciation(text);
    setTimeout(() => setActiveWaveId(null), 1400);
  };

  const handleToggleRecord = (item: VocabItem) => {
    if (recordingId === item.id) {
      // Stop recording and show celebration
      setRecordingId(null);
      setSuccessToastId(item.id);
      addPoints(5);
      setTimeout(() => setSuccessToastId(null), 3000);
    } else {
      // Start recording
      setRecordingId(item.id);
      playFeedbackSound("tap");
    }
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* 1. Header Banner */}
      <section className="relative rounded-2xl bg-surface-container-lowest p-space-md sm:p-space-lg shadow-sm overflow-hidden mb-space-lg border border-surface-container">
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-primary-fixed/20 pointer-events-none blur-2xl" />
        <div className="absolute top-1/2 -right-8 w-36 h-36 rounded-full bg-secondary-fixed/30 pointer-events-none blur-xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
          {/* Breadcrumb & Titles */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant flex-wrap">
              <span className="text-primary font-bold">المستوى الأول</span>
              <span className="material-symbols-outlined text-[14px]">arrow_back_ios</span>
              <span className="text-on-surface-variant font-medium">الوحدة الأولى: أسرتي</span>
              <span className="material-symbols-outlined text-[14px]">arrow_back_ios</span>
              <span className="text-secondary font-bold">الدرس ١: المفردات المصورة</span>
            </div>

            <div className="flex items-baseline gap-space-sm flex-wrap mt-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary m-0 tracking-tight">
                {showTashkeel ? "المُفْرَدَاتُ الأَسَاسِيَّةُ" : "المفردات الأساسية"}
              </h1>
              <span className="text-xs font-bold text-on-surface-variant tracking-wide">
                [ Al-Mufradāt Al-Asāsiyyah • Foundational Vocabulary ]
              </span>
            </div>

            <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed mt-1">
              اكتشف كلمات العائلة والبيت بالنطق الصوتي الواضح، واستمع للتشكيل الدقيق لدعم ثقتك في الحديث والاستماع.
            </p>
          </div>

          {/* Controls Matrix */}
          <div className="flex flex-wrap items-center gap-space-sm sm:gap-space-md self-start lg:self-center p-1.5 bg-surface-container-low rounded-2xl border border-surface-container">
            {/* Diacritics Switch */}
            <button
              onClick={toggleTashkeel}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest shadow-sm hover:bg-surface-container transition-all text-xs font-bold text-on-surface cursor-pointer"
              type="button"
            >
              <span>إظهار التشكيل</span>
              <div
                className={`w-9 h-5 rounded-full p-0.5 relative transition-colors ${
                  showTashkeel ? "bg-primary" : "bg-surface-container-high"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    showTashkeel ? "translate-x-0" : "-translate-x-4"
                  }`}
                />
              </div>
            </button>

            {/* Speed Selector Toggle */}
            <div className="flex items-center bg-surface-container-lowest rounded-full p-1 shadow-sm text-xs">
              <button
                onClick={() => {
                  setAudioSpeed(1);
                  playFeedbackSound("tap");
                }}
                className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                  audioSpeed === 1
                    ? "text-primary bg-primary-fixed/40 shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                type="button"
              >
                ١.٠x عادي
              </button>
              <button
                onClick={() => {
                  setAudioSpeed(0.75);
                  playFeedbackSound("tap");
                }}
                className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  audioSpeed === 0.75
                    ? "text-primary bg-primary-fixed/40 shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                type="button"
              >
                <span>٠.٧٥x</span>
                <span className="material-symbols-outlined text-[14px]">pace</span>
              </button>
            </div>

            {/* Autoplay Switch */}
            <button
              onClick={() => {
                setAutoPlay(!autoPlay);
                playFeedbackSound("tap");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm text-xs font-medium transition-colors cursor-pointer ${
                autoPlay
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">volume_up</span>
              <span>تشغيل تلقائي</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Primary Visual Vocabulary Cards (3-Column Bento/Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg mb-space-xl">
        {primaryVocabItems.map((item) => {
          const isRecording = recordingId === item.id;
          const isToastVisible = successToastId === item.id;
          const isWaveActive = activeWaveId === item.id;

          return (
            <div
              key={item.id}
              className="vocab-card flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative"
            >
              {/* Recording Success Toast Notification */}
              <div
                className={`eval-toast absolute top-space-md inset-x-space-md z-30 bg-primary text-on-primary rounded-xl p-2.5 px-4 flex items-center justify-between transition-all duration-300 shadow-md ${
                  isToastVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  نطق ممتاز! دقة {item.accuracyScore}٪
                </span>
                <span className="text-xs font-extrabold text-primary-fixed bg-black/20 px-2 py-0.5 rounded-md">
                  +٥ نقاط
                </span>
              </div>

              {/* Card Top Graphic Window */}
              <div className="relative h-56 w-full overflow-hidden bg-surface-container">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Gender/Grammar Floating Tag */}
                <div className="absolute top-space-md right-space-md px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.gender === "feminine"
                        ? "bg-secondary-container"
                        : item.gender === "masculine"
                        ? "bg-primary"
                        : "bg-tertiary"
                    }`}
                  />
                  <span className="text-xs font-bold text-on-surface">
                    {item.genderLabel}
                  </span>
                </div>

                {/* Pronoun Indicator Tag */}
                <div className="absolute bottom-space-md right-space-md px-3 py-1 rounded-full bg-surface-container-lowest/90 text-on-surface text-xs font-bold backdrop-blur-sm shadow-sm">
                  {item.demonstrative}
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-space-lg flex flex-col flex-1">
                {/* Root & Morphological Pill */}
                <div className="flex items-center justify-between gap-space-xs pb-2 border-b border-surface-container">
                  <span className="text-xs text-tertiary font-bold bg-tertiary-fixed/40 px-2.5 py-0.5 rounded-full">
                    الجذر: {item.root}
                  </span>
                  <span className="text-xs font-bold text-on-surface-variant font-mono">
                    {item.phonetic}
                  </span>
                </div>

                {/* Primary Arabic Word Showcase */}
                <div className="my-3 flex items-baseline justify-between">
                  <h2 className="text-3xl font-extrabold text-on-surface tracking-wide m-0">
                    {showTashkeel ? item.wordWithTashkeel : item.wordPlain}
                  </h2>
                  <span className="text-xl font-bold text-on-surface-variant">
                    {item.englishMeaning}
                  </span>
                </div>

                <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Context Sentence Card */}
                <div className="p-3.5 rounded-xl bg-surface-container-low mb-4 relative overflow-hidden border border-surface-container">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-primary font-bold tracking-wide">
                      جملة مثالية • Example
                    </span>
                    <button
                      onClick={() =>
                        handlePlayWord(
                          `sentence-${item.id}`,
                          showTashkeel ? item.sentenceWithTashkeel : item.sentencePlain
                        )
                      }
                      className="text-tertiary hover:text-primary transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                      <span>استمع</span>
                    </button>
                  </div>
                  <p className="text-xl text-on-surface font-bold m-0 leading-loose">
                    {showTashkeel ? item.sentenceWithTashkeel : item.sentencePlain}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1 font-mono">
                    {item.sentencePhonetic} • {item.sentenceTranslation}
                  </p>
                </div>

                {/* Tactile Action Mechanics Toolbar */}
                <div className="mt-auto pt-3 flex items-center justify-between gap-space-sm border-t border-surface-container">
                  {/* Big 3D Tactile Speaker Button */}
                  <button
                    onClick={() =>
                      handlePlayWord(
                        item.id,
                        showTashkeel ? item.wordWithTashkeel : item.wordPlain
                      )
                    }
                    className="relative flex-1 flex items-center justify-center gap-2 h-12 rounded-full bg-primary text-on-primary text-sm font-bold shadow-[0_4px_0_#005137] active:translate-y-[2px] active:shadow-[0_2px_0_#005137] hover:brightness-105 transition-all overflow-hidden cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">volume_up</span>
                    <span>نطق الكلمة</span>
                    {isWaveActive && (
                      <span className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />
                    )}
                  </button>

                  {/* Slow Audio Button */}
                  <button
                    onClick={() => {
                      playFeedbackSound("tap");
                      playPronunciation(
                        showTashkeel ? item.wordWithTashkeel : item.wordPlain
                      );
                    }}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface shadow-[0_3px_0_#d2d9f4] active:translate-y-[2px] active:shadow-[0_1px_0_#d2d9f4] transition-all cursor-pointer"
                    title="استماع ببطء"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">slow_motion_video</span>
                  </button>

                  {/* Voice Recording Practice */}
                  <button
                    onClick={() => handleToggleRecord(item)}
                    className={`w-12 h-12 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                      isRecording
                        ? "bg-error text-on-error animate-pulse shadow-[0_3px_0_#93000a]"
                        : "bg-surface-container-high text-on-surface shadow-[0_3px_0_#d2d9f4] active:translate-y-[2px] active:shadow-[0_1px_0_#d2d9f4]"
                    }`}
                    title={isRecording ? "إيقاف التسجيل وتقييم النطق" : "تدرب على النطق بصوتك"}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {isRecording ? "stop" : "mic"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Additional Quick Vocabulary Strip (Mini Flashcards) */}
      <section className="mb-space-xl">
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-2xl">
              family_restroom
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface m-0">
              أفراد الأسرة الأساسيون (Core Family Members)
            </h2>
          </div>
          <span className="text-xs font-bold text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">
            ٤ بطاقات سريعة
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
          {miniFlashcards.map((card) => (
            <div
              key={card.id}
              className="group flex flex-col p-space-md bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 relative"
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    card.genderType === "masculine"
                      ? "bg-primary-fixed/50 text-primary"
                      : "bg-error-container/60 text-error"
                  }`}
                >
                  {card.demonstrative}
                </span>
                <button
                  onClick={() =>
                    handlePlayWord(
                      card.id,
                      showTashkeel ? card.wordWithTashkeel : card.wordPlain
                    )
                  }
                  className="w-7 h-7 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary flex items-center justify-center text-on-surface transition-colors cursor-pointer"
                  type="button"
                  title="استمع للكلمة"
                >
                  <span className="material-symbols-outlined text-sm">volume_up</span>
                </button>
              </div>

              <div className="text-center py-2">
                <span className="text-2xl font-extrabold text-primary block leading-normal">
                  {showTashkeel ? card.wordWithTashkeel : card.wordPlain}
                </span>
                <span className="text-xs text-on-surface-variant block font-medium mt-0.5">
                  {card.phonetic}
                </span>
              </div>

              <div className="mt-auto pt-1 bg-surface-container-low rounded-lg p-1.5 text-center">
                <span className="text-xs text-on-surface font-semibold">
                  {card.examplePhrase}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Bottom Milestone Feedback & Tactile Sticky Progression Bar */}
      <section className="sticky bottom-4 z-40 w-full mt-auto">
        <div className="p-space-md sm:p-space-lg bg-surface-container-lowest/95 backdrop-blur-xl rounded-2xl shadow-xl border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md">
          {/* Progress & Achievement Capsule */}
          <div className="flex items-center gap-space-md w-full sm:w-auto">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-[0_2px_0_#fea619] shrink-0">
              <span className="material-symbols-outlined text-2xl">workspace_premium</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-on-surface">
                  حفظت ٣ كلمات جديدة مفصلة!
                </span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">
                  +١٥ نقطة XP
                </span>
              </div>
              <span className="text-xs text-on-surface-variant">
                أنت الآن جاهز لاستخدام هذه الكلمات مع أسماء الإشارة وتكوين الجمل الأولى.
              </span>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                playFeedbackSound("tap");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-1.5 px-space-lg h-12 sm:h-14 rounded-full bg-surface-container text-on-surface text-sm font-bold shadow-[0_4px_0_#d2d9f4] active:translate-y-[2px] active:shadow-[0_2px_0_#d2d9f4] hover:bg-surface-container-high transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">style</span>
              <span>مراجعة سريعة</span>
            </button>

            <Link
              href="/family-and-gender"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-space-xl h-12 sm:h-14 rounded-full bg-primary text-on-primary text-base font-bold shadow-[0_4px_0_#005137] active:translate-y-[2px] active:shadow-[0_2px_0_#005137] hover:bg-primary-container transition-all text-center cursor-pointer"
            >
              <span>متابعة إلى أفراد الأسرة</span>
              <span className="material-symbols-outlined text-xl rotate-180">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
