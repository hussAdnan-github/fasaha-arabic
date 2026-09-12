"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLearning } from "@/context/LearningContext";
import { familyPairs, FamilyPair, FamilyMember } from "@/data/familyData";
import { fillInTheBlankQuestions } from "@/data/quizData";

export default function FamilyAndGenderPage() {
  const {
    showTashkeel,
    playPronunciation,
    playFeedbackSound,
    addPoints,
    decrementHeart,
  } = useLearning();

  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const currentQuestion = fillInTheBlankQuestions[currentQuestionIndex];

  const handlePlayAudio = (phrase: string) => {
    playFeedbackSound("tap");
    playPronunciation(phrase);
  };

  const handleSelectAnswer = (optionId: string) => {
    if (isAnswerChecked) return;
    setSelectedOptionId(optionId);
    setIsAnswerChecked(true);

    const isCorrect = currentQuestion.options.find((o) => o.id === optionId)?.isCorrect;
    if (isCorrect) {
      playFeedbackSound("success");
      addPoints(10);
    } else {
      decrementHeart();
    }
  };

  const handleNextQuestion = () => {
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setCurrentQuestionIndex((prev) => (prev + 1) % fillInTheBlankQuestions.length);
  };

  const filteredPairs =
    filterCategory === "all"
      ? familyPairs
      : familyPairs.filter((p) => p.id === filterCategory);

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* 1. Top Context Banner */}
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
              <span className="text-secondary font-bold">الدرس ٢: أفراد الأسرة والإشارة</span>
            </div>

            <div className="flex items-baseline gap-space-sm flex-wrap mt-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface m-0 tracking-tight">
                {showTashkeel
                  ? "أَفْرَادُ الأُسْرَةِ وَأَسْمَاءُ الإِشَارَة"
                  : "أفراد الأسرة وأسماء الإشارة"}
              </h1>
              <span className="text-xs font-bold text-on-surface-variant tracking-wide">
                [ Shajarat Al-‘A’ilah wa Asmā’ Al-Ishārah ]
              </span>
            </div>

            <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed mt-1">
              قارن بين المذكر والمؤنث واستكشف الفارق الدقيق بين استخدام &quot;هذا&quot; و &quot;هذه&quot; في وصف أفراد العائلة مع الاستماع الفوري للنطق الصحيح.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 bg-surface-container-low p-1.5 rounded-full border border-surface-container text-xs font-bold self-start lg:self-center">
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                filterCategory === "all"
                  ? "bg-primary text-on-primary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              الكل
            </button>
            <button
              onClick={() => setFilterCategory("children")}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                filterCategory === "children"
                  ? "bg-primary text-on-primary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              الأبناء
            </button>
            <button
              onClick={() => setFilterCategory("parents")}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                filterCategory === "parents"
                  ? "bg-primary text-on-primary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              الوالدان
            </button>
            <button
              onClick={() => setFilterCategory("grandparents")}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                filterCategory === "grandparents"
                  ? "bg-primary text-on-primary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              الأجداد
            </button>
          </div>
        </div>
      </section>

      {/* 2. Gender Comparison Pairs */}
      <section className="flex flex-col gap-space-lg mb-space-xl">
        {filteredPairs.map((pair) => (
          <div
            key={pair.id}
            className="pair-container bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg shadow-sm border border-surface-container"
          >
            {/* Pair Header */}
            <div className="flex items-center justify-between pb-3 mb-space-md border-b border-surface-container">
              <div className="flex items-center gap-space-sm">
                <div className={`w-2.5 h-7 ${pair.colorAccent} rounded-full`} />
                <div>
                  <span className="text-xs uppercase font-bold text-primary tracking-wide">
                    {pair.pairNumber}
                  </span>
                  <h2 className="text-xl font-bold text-on-surface m-0">
                    {pair.titleArabic} • {pair.titleEnglish}
                  </h2>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-mono font-bold">
                {pair.comparisonBadge}
              </span>
            </div>

            {/* Two Gender Cards: Masculine & Feminine */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
              {/* Masculine Card */}
              <div className="gender-card-masc group flex flex-col p-space-md sm:p-space-lg rounded-xl bg-surface-container-low transition-all duration-300 hover:shadow-md border border-surface-container">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold">
                    <span className="material-symbols-outlined text-[15px]">male</span>
                    مذكر • Masculine
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    {showTashkeel ? pair.masculine.nameWithTashkeel : pair.masculine.namePlain} (
                    {showTashkeel ? pair.masculine.roleWithTashkeel : pair.masculine.rolePlain})
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-space-md mb-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden shadow-sm bg-surface-container-high">
                    <Image
                      src={pair.masculine.imageUrl}
                      alt={pair.masculine.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100px, 120px"
                    />
                    <button
                      onClick={() => handlePlayAudio(pair.masculine.fullNamePhrase)}
                      className="absolute bottom-1 left-1 w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer"
                      title="استمع للنطق"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">volume_up</span>
                    </button>
                  </div>

                  <div className="flex flex-col text-center sm:text-right flex-1 min-w-0">
                    <div className="inline-block mb-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-tertiary ml-1">
                        {showTashkeel
                          ? pair.masculine.demonstrativeWithTashkeel
                          : pair.masculine.demonstrative}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                        {showTashkeel
                          ? ` ${pair.masculine.roleWithTashkeel} ${pair.masculine.nameWithTashkeel}`
                          : ` ${pair.masculine.rolePlain} ${pair.masculine.namePlain}`}
                      </span>
                    </div>
                    <span className="text-xs text-on-surface-variant font-mono text-right dir-ltr">
                      {pair.masculine.phonetic}
                    </span>
                    <span className="text-xs text-on-surface-variant mt-1">
                      {pair.masculine.englishMeaning}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-2 bg-surface-container-lowest rounded-lg p-2.5 flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">
                    {pair.masculine.markerLabel}
                  </span>
                  <span className="font-bold text-tertiary">
                    {pair.masculine.markerValue}
                  </span>
                </div>
              </div>

              {/* Feminine Card */}
              <div className="gender-card-fem group flex flex-col p-space-md sm:p-space-lg rounded-xl bg-surface-container-low transition-all duration-300 hover:shadow-md border border-surface-container">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold">
                    <span className="material-symbols-outlined text-[15px]">female</span>
                    مؤنث • Feminine
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    {showTashkeel ? pair.feminine.nameWithTashkeel : pair.feminine.namePlain} (
                    {showTashkeel ? pair.feminine.roleWithTashkeel : pair.feminine.rolePlain})
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-space-md mb-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden shadow-sm bg-surface-container-high">
                    <Image
                      src={pair.feminine.imageUrl}
                      alt={pair.feminine.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100px, 120px"
                    />
                    <button
                      onClick={() => handlePlayAudio(pair.feminine.fullNamePhrase)}
                      className="absolute bottom-1 left-1 w-8 h-8 rounded-full bg-error text-on-error flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer"
                      title="استمع للنطق"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">volume_up</span>
                    </button>
                  </div>

                  <div className="flex flex-col text-center sm:text-right flex-1 min-w-0">
                    <div className="inline-block mb-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-error ml-1">
                        {showTashkeel
                          ? pair.feminine.demonstrativeWithTashkeel
                          : pair.feminine.demonstrative}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                        {showTashkeel
                          ? ` ${pair.feminine.roleWithTashkeel} ${pair.feminine.nameWithTashkeel}`
                          : ` ${pair.feminine.rolePlain} ${pair.feminine.namePlain}`}
                      </span>
                    </div>
                    <span className="text-xs text-on-surface-variant font-mono text-right dir-ltr">
                      {pair.feminine.phonetic}
                    </span>
                    <span className="text-xs text-on-surface-variant mt-1">
                      {pair.feminine.englishMeaning}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-2 bg-surface-container-lowest rounded-lg p-2.5 flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">
                    {pair.feminine.markerLabel}
                  </span>
                  <span className="font-bold text-error">
                    {pair.feminine.markerValue}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Quick Interactive Micro-Check Practice Widget */}
      <section className="w-full max-w-4xl mx-auto mb-space-xl">
        <div className="bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg shadow-sm border border-surface-container">
          <div className="flex items-center gap-space-sm mb-space-md">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-xl">quiz</span>
            </div>
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                اختبار سريع • QUICK CHECK
              </span>
              <h3 className="text-lg font-bold text-on-surface m-0">
                اختر اسم الإشارة المناسب للفراغ:
              </h3>
            </div>
          </div>

          {/* Question Sentence Plate */}
          <div className="p-space-lg bg-surface-container-low rounded-2xl text-center mb-space-md border border-surface-container">
            <div className="flex items-center justify-center gap-3 flex-wrap text-2xl sm:text-3xl font-bold">
              <div
                className={`min-w-[120px] px-4 py-1 border-b-4 border-dashed rounded-lg transition-all duration-300 ${
                  isAnswerChecked
                    ? selectedOptionId === "fem"
                      ? "border-primary text-primary bg-primary-fixed/30"
                      : "border-error text-error bg-error-container/30"
                    : "border-primary text-primary"
                }`}
              >
                {selectedOptionId
                  ? currentQuestion.options.find((o) => o.id === selectedOptionId)?.text
                  : "[ . . . . . ]"}
              </div>
              <span className="text-on-surface">{currentQuestion.blankWord}</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-2 font-mono dir-ltr">
              {currentQuestion.phonetic}
            </p>
          </div>

          {/* Tactical 3D Option Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md max-w-lg mx-auto mb-space-md">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(option.id)}
                disabled={isAnswerChecked}
                className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-[0_4px_0_#bccac0] active:translate-y-1 active:shadow-[0_1px_0_#bccac0] transition-all cursor-pointer ${
                  selectedOptionId === option.id
                    ? option.isCorrect
                      ? "bg-primary text-on-primary shadow-[0_4px_0_#005137]"
                      : "bg-error text-on-error shadow-[0_4px_0_#93000a]"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                }`}
                type="button"
              >
                <span className="text-2xl font-extrabold">{option.text}</span>
                <span className="text-xs opacity-80 mt-0.5">{option.label}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Feedback Toast */}
          {isAnswerChecked && (
            <div
              className={`p-4 rounded-xl flex items-center justify-between gap-space-md border transition-all ${
                currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect
                  ? "bg-primary-fixed/30 border-primary/40 text-on-surface"
                  : "bg-error-container/40 border-error/40 text-on-surface"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl">
                  {currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect
                    ? "check_circle"
                    : "cancel"}
                </span>
                <div>
                  <h4 className="text-sm font-bold">
                    {currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect
                      ? "إجابة صحيحة! أحسنت (+١٠ نقاط)"
                      : "إجابة غير دقيقة، حاول الانتباه لجنس الكلمة!"}
                  </h4>
                  <p className="text-xs opacity-90 mt-0.5">
                    {currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect
                      ? "استخدمنا اسم الإشارة المناسب بحسب التذكير والتأنيث."
                      : "نستخدم 'هذا' للمذكر المفرد، و'هذه' للمؤنث المفرد."}
                  </p>
                </div>
              </div>

              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-bold shadow-sm hover:brightness-105 transition-all cursor-pointer"
                type="button"
              >
                السؤال التالي
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. Bottom Sticky Milestone Bar */}
      <section className="sticky bottom-4 z-40 w-full mt-auto">
        <div className="p-space-md sm:p-space-lg bg-surface-container-lowest/95 backdrop-blur-xl rounded-2xl shadow-xl border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md w-full sm:w-auto">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-[0_2px_0_#007bb9] shrink-0">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-on-surface">
                أتقنت التمييز بين (هذا) و (هذه)!
              </span>
              <span className="text-xs text-on-surface-variant">
                الخطوة التالية هي دراسة المفرد والمثنى والجمع عبر سلم القواعد.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 px-space-lg h-12 sm:h-14 rounded-full bg-surface-container text-on-surface text-sm font-bold shadow-[0_4px_0_#d2d9f4] active:translate-y-[2px] active:shadow-[0_2px_0_#d2d9f4] hover:bg-surface-container-high transition-all"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
              <span>المفردات المصورة</span>
            </Link>

            <Link
              href="/grammar-ladder"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-space-xl h-12 sm:h-14 rounded-full bg-primary text-on-primary text-base font-bold shadow-[0_4px_0_#005137] active:translate-y-[2px] active:shadow-[0_2px_0_#005137] hover:bg-primary-container transition-all text-center"
            >
              <span>الانتقال لسلم القواعد</span>
              <span className="material-symbols-outlined text-xl rotate-180">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
