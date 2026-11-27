"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLearning } from "@/context/LearningContext";

export default function Level1HubPage() {
  const {
    showTashkeel,
    toggleTashkeel,
    points,
    streakDays,
    playFeedbackSound,
    playPronunciation,
  } = useLearning();

  const [activeStageTab, setActiveStageTab] = useState<"stage1" | "stage2">("stage1");
  const [activeAudioWord, setActiveAudioWord] = useState<string | null>(null);

  const handlePlayWord = (word: string, id: string) => {
    setActiveAudioWord(id);
    playFeedbackSound("tap");
    playPronunciation(word);
    setTimeout(() => setActiveAudioWord(null), 1200);
  };

  const sampleKeyWords = [
    { id: "w1", arabic: "أُسْرَةٌ", plain: "أسرة", meaning: "Family", phonetic: "[ Usrah ]", demonstrative: "هَذِهِ" },
    { id: "w2", arabic: "بَيْتٌ", plain: "بيت", meaning: "House", phonetic: "[ Bayt ]", demonstrative: "هَذَا" },
    { id: "w3", arabic: "مَدْرَسَتِي", plain: "مدرستي", meaning: "My School", phonetic: "[ Madrasatee ]", demonstrative: "هَذِهِ" },
    { id: "w4", arabic: "مُعَلِّمٌ", plain: "معلم", meaning: "Teacher", phonetic: "[ Mu‘allim ]", demonstrative: "هَذَا" },
    { id: "w5", arabic: "السَّلَامُ عَلَيْكُمْ", plain: "السلام عليكم", meaning: "Greetings", phonetic: "[ As-Salām ]", demonstrative: "تحية" },
    { id: "w6", arabic: "أَمَامَ", plain: "أمام", meaning: "In front", phonetic: "[ Amāma ]", demonstrative: "مكان" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Concise, Mobile-Optimized Hero Banner */}
      <section className="relative rounded-3xl bg-surface-container-lowest p-4 sm:p-6 shadow-xs overflow-hidden mb-4 sm:mb-6 border border-surface-container">
        {/* Ambient glow */}
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-primary-fixed/25 pointer-events-none blur-3xl" />
        <div className="absolute top-1/2 -right-8 w-40 h-40 rounded-full bg-secondary-fixed/20 pointer-events-none blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col gap-1.5 max-w-2xl">
            {/* Badges */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-bold text-xs shadow-2xs">
                المستوى الأول
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold font-mono text-xs">
                CEFR A1
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-bold text-[11px]">
                مبتدئ • لغير الناطقين
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-black text-on-surface tracking-tight leading-tight m-0 mt-1">
              {showTashkeel ? "الانْطِلَاقُ وَالأَسَاسِيَّاتُ" : "الانطلاق والأساسيات"}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-xl m-0">
              تعلّم العربية الفصيحة بالتدرج البصري والصوتي؛ من مفردات الأسرة وقواعد الإشارة إلى البيئة المدرسية وظروف المكان.
            </p>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              <Link
                href="/vocabulary"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs sm:text-sm shadow-[0_3px_0_#005137] active:translate-y-0.5 active:shadow-[0_1px_0_#005137] hover:bg-primary-container transition-all"
              >
                <span className="material-symbols-outlined text-base">play_arrow</span>
                <span>ابدأ من الدرس الأول</span>
              </Link>

              <Link
                href="/stage-2"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-4 sm:py-2.5 rounded-full bg-secondary text-on-secondary font-bold text-xs sm:text-sm shadow-[0_3px_0_#d97706] active:translate-y-0.5 active:shadow-[0_1px_0_#d97706] hover:brightness-105 transition-all"
              >
                <span className="material-symbols-outlined text-base">school</span>
                <span>المرحلة ٢: مدرستي</span>
              </Link>

              <button
                onClick={toggleTashkeel}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold border border-surface-container transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-sm text-primary">text_fields</span>
                <span>{showTashkeel ? "إخفاء التشكيل" : "إظهار التشكيل"}</span>
              </button>
            </div>
          </div>

          {/* Gamification Capsule (Mobile & Desktop) */}
          <div className="flex md:flex-col justify-between items-center md:items-stretch gap-2 p-3 bg-surface-container-low/90 rounded-2xl border border-surface-container shrink-0">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold text-on-surface-variant">إنجاز المستوى</span>
              <span className="text-xs font-mono font-bold text-primary bg-primary-fixed/50 px-2 py-0.5 rounded-full">
                ٥٠٪
              </span>
            </div>

            <div className="hidden md:block w-36 bg-surface-container-high h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "50%" }} />
            </div>

            <div className="flex items-center gap-2 text-center text-xs">
              <div className="px-2.5 py-1 bg-surface-container-lowest rounded-xl font-mono">
                <span className="font-bold text-primary">{points}</span>
                <span className="text-[10px] text-on-surface-variant mr-1">XP</span>
              </div>
              <div className="px-2.5 py-1 bg-surface-container-lowest rounded-xl font-mono">
                <span className="font-bold text-secondary">{streakDays}</span>
                <span className="text-[10px] text-on-surface-variant mr-1">أيام 🔥</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Focused Stage Switcher (Stage 1 & Stage 2 Only) */}
      <section className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-xl">view_timeline</span>
            <h2 className="text-base sm:text-xl font-extrabold text-on-surface m-0">
              مراحل المستوى الأول
            </h2>
          </div>

          {/* Segmented 2-Pill Switcher */}
          <div className="flex items-center p-1 bg-surface-container-low rounded-xl border border-surface-container text-xs font-bold">
            <button
              onClick={() => {
                setActiveStageTab("stage1");
                playFeedbackSound("tap");
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                activeStageTab === "stage1"
                  ? "bg-surface-container-lowest text-primary shadow-2xs font-black"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              <span>المرحلة ١: أسرتي</span>
              <span className="text-[10px] px-1 rounded bg-primary-fixed text-on-primary-fixed">٥</span>
            </button>

            <button
              onClick={() => {
                setActiveStageTab("stage2");
                playFeedbackSound("tap");
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                activeStageTab === "stage2"
                  ? "bg-surface-container-lowest text-secondary shadow-2xs font-black"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">school</span>
              <span>المرحلة ٢: مدرستي</span>
              <span className="text-[10px] px-1 rounded bg-secondary-fixed text-on-secondary-fixed">٩</span>
            </button>
          </div>
        </div>

        {/* STAGE 1 CONTENT (5 Lessons) */}
        {activeStageTab === "stage1" && (
          <div className="flex flex-col gap-2.5 animate-in fade-in duration-200">
            {/* The 5 Sequential Lessons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
              {/* Lesson 1 */}
              <Link
                href="/vocabulary"
                className="p-3.5 sm:p-4 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-2xs hover:shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between group active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-lg bg-primary-fixed/60 text-primary flex items-center justify-center text-xs font-mono font-bold">
                      ١
                    </span>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      مكتمل
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors m-0">
                    {showTashkeel ? "المُفْرَدَاتُ المُصَوَّرَةُ" : "المفردات المصورة"}
                  </h3>
                  <span className="text-[11px] text-on-surface-variant font-medium block font-mono">
                    Vocabulary • Al-Mufradāt
                  </span>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed line-clamp-2">
                    الكلمات الأساسية (أسرة، بيت، مدرستي) مع النطق الصوتي والتشكيل والمايك.
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-surface-container flex items-center justify-between text-xs font-bold text-primary">
                  <span>فتح الدرس</span>
                  <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                </div>
              </Link>

              {/* Lesson 2 */}
              <Link
                href="/family-and-gender"
                className="p-3.5 sm:p-4 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-2xs hover:shadow-sm hover:border-secondary/40 transition-all flex flex-col justify-between group active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-lg bg-secondary-fixed/60 text-secondary flex items-center justify-center text-xs font-mono font-bold">
                      ٢
                    </span>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      مكتمل
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface group-hover:text-secondary transition-colors m-0">
                    {showTashkeel ? "أَفْرَادُ الأُسْرَةِ وَالإِشَارَةُ" : "أفراد الأسرة والإشارة"}
                  </h3>
                  <span className="text-[11px] text-on-surface-variant font-medium block font-mono">
                    Family & Demonstratives • Hādhā / Hādhihi
                  </span>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed line-clamp-2">
                    شجرة العائلة والتمييز بين هذا للمذكر وهذه للمؤنث مع الاستماع.
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-surface-container flex items-center justify-between text-xs font-bold text-secondary">
                  <span>فتح الدرس</span>
                  <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                </div>
              </Link>

              {/* Lesson 3 */}
              <Link
                href="/grammar-ladder"
                className="p-3.5 sm:p-4 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-2xs hover:shadow-sm hover:border-tertiary/40 transition-all flex flex-col justify-between group active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-lg bg-tertiary-fixed/60 text-tertiary flex items-center justify-center text-xs font-mono font-bold">
                      ٣
                    </span>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      مكتمل
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface group-hover:text-tertiary transition-colors m-0">
                    {showTashkeel ? "سُلَّمُ القَوَاعِدِ: النَّحْوُ" : "سلم القواعد: النحو"}
                  </h3>
                  <span className="text-[11px] text-on-surface-variant font-medium block font-mono">
                    Grammar Ladder • Singular, Dual, Plural
                  </span>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed line-clamp-2">
                    المفرد (ولد)، المثنى بإضافة (ـان) (ولدان)، والجمع (أولاد).
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-surface-container flex items-center justify-between text-xs font-bold text-tertiary">
                  <span>فتح الدرس</span>
                  <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                </div>
              </Link>

              {/* Lesson 4 */}
              <Link
                href="/daily-dialogue"
                className="p-3.5 sm:p-4 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-2xs hover:shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between group active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-lg bg-primary-fixed/60 text-primary flex items-center justify-center text-xs font-mono font-bold">
                      ٤
                    </span>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      مكتمل
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors m-0">
                    {showTashkeel ? "المُحَادَثَةُ اليَوْمِيَّةُ" : "المحادثة اليومية"}
                  </h3>
                  <span className="text-[11px] text-on-surface-variant font-medium block font-mono">
                    Daily Dialogue • Greetings & Q&A
                  </span>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed line-clamp-2">
                    تحية الإسلام، السؤال عن الاسم والحال، والاستماع بسرعة عادية وبطيئة.
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-surface-container flex items-center justify-between text-xs font-bold text-primary">
                  <span>فتح الدرس</span>
                  <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                </div>
              </Link>

              {/* Lesson 5 */}
              <Link
                href="/interactive-practice"
                className="p-3.5 sm:p-4 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-2xs hover:shadow-sm hover:border-secondary/40 transition-all flex flex-col justify-between group active:scale-[0.99] sm:col-span-2 lg:col-span-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-lg bg-secondary-fixed/60 text-secondary flex items-center justify-center text-xs font-mono font-bold">
                      ٥
                    </span>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      مكتمل
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface group-hover:text-secondary transition-colors m-0">
                    {showTashkeel ? "التَّمَارِينُ التَّفَاعُلِيَّةُ" : "التمارين التفاعلية"}
                  </h3>
                  <span className="text-[11px] text-on-surface-variant font-medium block font-mono">
                    Interactive Practice & Quiz Challenges
                  </span>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed line-clamp-2">
                    تحديات التوصيل البصري، الاستماع الصوتي، وتثبيت كل مخرجات المرحلة الأولى.
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-surface-container flex items-center justify-between text-xs font-bold text-secondary">
                  <span>فتح التمارين</span>
                  <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* STAGE 2 CONTENT (4 Stations) */}
        {activeStageTab === "stage2" && (
          <div className="flex flex-col gap-2.5 animate-in fade-in duration-200">
            <div className="p-3 sm:p-4 rounded-2xl bg-secondary-fixed/20 border border-secondary/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">school</span>
                </span>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-on-surface">
                    المرحلة الثانية: مدرستي وفصلي
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    ٤ محطات تعليمية • ٩ أقسام تفاعلية تطبيقية
                  </span>
                </div>
              </div>

              <Link
                href="/stage-2"
                className="px-3.5 py-1.5 rounded-xl bg-secondary text-on-secondary text-xs font-bold shadow-xs hover:brightness-105 transition-all flex items-center gap-1 shrink-0"
              >
                <span>دخول</span>
                <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
              </Link>
            </div>

            {/* 4 Stations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Link
                href="/stage-2#campus"
                className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-2xs hover:border-secondary/40 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-800 flex items-center justify-center text-xs font-bold">١</span>
                  <span className="text-xs font-bold text-on-surface">صرح المدرسة ومرافقها</span>
                </div>
                <p className="text-[11px] text-on-surface-variant m-0 line-clamp-2">
                  المشهد البصري ومرافق المدرسة العشرة وتمرين التذكر.
                </p>
              </Link>

              <Link
                href="/stage-2#sentences"
                className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-2xs hover:border-secondary/40 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-900 flex items-center justify-center text-xs font-bold">٢</span>
                  <span className="text-xs font-bold text-on-surface">الجمل وأقسام الكلمة</span>
                </div>
                <p className="text-[11px] text-on-surface-variant m-0 line-clamp-2">
                  الجمل النموذجية (مدرستي) وتصنيف اسم وفعل وحرف.
                </p>
              </Link>

              <Link
                href="/stage-2#grammar-structure"
                className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-2xs hover:border-secondary/40 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-lg bg-blue-500/15 text-blue-900 flex items-center justify-center text-xs font-bold">٣</span>
                  <span className="text-xs font-bold text-on-surface">القواعد وتأنيث المهن</span>
                </div>
                <p className="text-[11px] text-on-surface-variant m-0 line-clamp-2">
                  الجملة الاسمية والفعلية ومطابقة مهن المدرسة.
                </p>
              </Link>

              <Link
                href="/stage-2#spatial-classroom"
                className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-2xs hover:border-secondary/40 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-lg bg-purple-500/15 text-purple-900 flex items-center justify-center text-xs font-bold">٤</span>
                  <span className="text-xs font-bold text-on-surface">الفصل وظروف المكان</span>
                </div>
                <p className="text-[11px] text-on-surface-variant m-0 line-clamp-2">
                  توزيع المقاعد وظروف المكان الستة والمنظور النسبي.
                </p>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 3. Level 1 Competencies (4 Compact Pillars) */}
      <section className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-3xl bg-surface-container-low/70 border border-surface-container">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-lg">verified</span>
            <h2 className="text-xs sm:text-sm font-bold text-on-surface m-0">
              مخرجات المستوى الأول (Target Competencies)
            </h2>
          </div>
          <span className="text-[10px] text-on-surface-variant font-mono">CEFR A1</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container">
            <span className="text-xs font-bold text-primary block mb-0.5">١. الأسرة والبيت</span>
            <p className="text-[11px] text-on-surface-variant m-0 leading-tight">
              التعريف بالنفس والأسرة ونطق الحركات.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container">
            <span className="text-xs font-bold text-secondary block mb-0.5">٢. هذا وهذه</span>
            <p className="text-[11px] text-on-surface-variant m-0 leading-tight">
              التمييز التلقائي بين المذكر والمؤنث.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container">
            <span className="text-xs font-bold text-tertiary block mb-0.5">٣. سلم العدد</span>
            <p className="text-[11px] text-on-surface-variant m-0 leading-tight">
              صياغة المفرد والمثنى (ـان) والجمع.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container">
            <span className="text-xs font-bold text-primary block mb-0.5">٤. ظروف المكان</span>
            <p className="text-[11px] text-on-surface-variant m-0 leading-tight">
              الاتجاهات الستة والمحادثة اليومية.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Quick Audio Bank: Foundational Pronunciation */}
      <section className="mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-lg">volume_up</span>
            <h2 className="text-xs sm:text-sm font-bold text-on-surface m-0">
              بنك النطق السريع
            </h2>
          </div>
          <span className="text-[10px] text-on-surface-variant">انقر للاستماع</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
          {sampleKeyWords.map((item) => {
            const isPlaying = activeAudioWord === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handlePlayWord(item.arabic, item.id)}
                className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                  isPlaying
                    ? "bg-primary text-on-primary border-primary shadow-xs scale-105"
                    : "bg-surface-container-lowest hover:bg-surface-container-low border-surface-container text-on-surface"
                }`}
                type="button"
              >
                <span className="text-xs sm:text-sm font-bold block leading-tight">
                  {showTashkeel ? item.arabic : item.plain}
                </span>
                <span className={`text-[10px] block mt-0.5 ${isPlaying ? "text-white/80" : "text-on-surface-variant"}`}>
                  {item.meaning}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
