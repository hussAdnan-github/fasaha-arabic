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
    hearts,
    playFeedbackSound,
    playPronunciation,
  } = useLearning();

  const [activeStageTab, setActiveStageTab] = useState<"stage1" | "stage2" | "stage3">("stage1");
  const [activeAudioWord, setActiveAudioWord] = useState<string | null>(null);

  const handlePlayWord = (word: string, id: string) => {
    setActiveAudioWord(id);
    playFeedbackSound("tap");
    playPronunciation(word);
    setTimeout(() => setActiveAudioWord(null), 1200);
  };

  const sampleKeyWords = [
    { id: "w1", arabic: "أُسْرَةٌ", plain: "أسرة", meaning: "Family", phonetic: "[ Usrah ]", demonstrative: "هَذِهِ" },
    { id: "w2", arabic: "بَيْتٌ", plain: "بيت", meaning: "House / Home", phonetic: "[ Bayt ]", demonstrative: "هَذَا" },
    { id: "w3", arabic: "مَدْرَسَتِي", plain: "مدرستي", meaning: "My School", phonetic: "[ Madrasatee ]", demonstrative: "هَذِهِ" },
    { id: "w4", arabic: "مُعَلِّمٌ", plain: "معلم", meaning: "Teacher (m)", phonetic: "[ Mu‘allim ]", demonstrative: "هَذَا" },
    { id: "w5", arabic: "السَّلَامُ عَلَيْكُمْ", plain: "السلام عليكم", meaning: "Peace be upon you", phonetic: "[ As-Salāmu ‘Alaykum ]", demonstrative: "تحية" },
    { id: "w6", arabic: "أَمَامَ وَخَلْفَ", plain: "أمام وخلف", meaning: "In front & Behind", phonetic: "[ Amāma wa Khalfa ]", demonstrative: "مكان" },
  ];

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* 1. Grand Hero Banner: Level 1 Identity & Motivation */}
      <section className="relative rounded-3xl bg-surface-container-lowest p-space-md sm:p-space-xl shadow-sm overflow-hidden mb-space-lg border border-surface-container">
        {/* Soft Radial Ambient Lights */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary-fixed/30 pointer-events-none blur-3xl" />
        <div className="absolute top-1/2 -right-12 w-56 h-56 rounded-full bg-secondary-fixed/25 pointer-events-none blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-lg">
          <div className="flex flex-col gap-2 max-w-3xl">
            {/* Badges strip */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-bold shadow-xs">
                المستوى الأول • Level 1
              </span>
              <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-bold font-mono">
                CEFR A1 • مبتدئ
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                تأسيس المحادثة والقواعد
              </span>
            </div>

            {/* Title */}
            <div className="flex flex-col mt-2">
              <h1 className="text-3xl sm:text-5xl font-black text-on-surface tracking-tight leading-tight m-0">
                {showTashkeel
                  ? "المُسْتَوَى الأَوَّل: الانْطِلَاقُ وَالأَسَاسِيَّات"
                  : "المستوى الأول: الانطلاق والأساسيات"}
              </h1>
              <span className="text-xs sm:text-sm font-bold text-on-surface-variant font-mono mt-1 tracking-wide">
                [ Foundational Arabic for Non-Native Speakers • A1 Curriculum ]
              </span>
            </div>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mt-2">
              من هنا تبدأ رحلتك الحقيقية لتعلم لغة الضاد؛ تدرج مرن وبصري ينقلك من مفردات الأسرة والبيت وقواعد الإشارة إلى مرافق المدرسة والجمل الاسمية والفعلية وظروف المكان.
            </p>

            {/* Quick Action CTA Strip */}
            <div className="flex items-center gap-3 pt-3 flex-wrap">
              <Link
                href="/vocabulary"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary font-bold shadow-[0_4px_0_#005137] active:translate-y-[2px] active:shadow-[0_2px_0_#005137] hover:bg-primary-container transition-all text-sm"
              >
                <span className="material-symbols-outlined text-lg">play_arrow</span>
                <span>ابدأ من الدرس الأول: المفردات المصورة</span>
              </Link>

              <Link
                href="/stage-2"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-secondary text-on-secondary font-bold shadow-[0_4px_0_#d97706] active:translate-y-[2px] active:shadow-[0_2px_0_#d97706] hover:brightness-105 transition-all text-sm"
              >
                <span className="material-symbols-outlined text-lg">school</span>
                <span>المرحلة الثانية: مدرستي</span>
              </Link>

              <button
                onClick={toggleTashkeel}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs border border-surface-container transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-base text-primary">text_fields</span>
                <span>{showTashkeel ? "إخفاء التشكيل" : "إظهار التشكيل"}</span>
              </button>
            </div>
          </div>

          {/* Gamification Progress Card */}
          <div className="flex flex-col gap-3 p-4 bg-surface-container-low/90 rounded-2xl border border-surface-container min-w-[260px] shadow-xs self-start lg:self-center">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface-variant">إنجاز المستوى الأول</span>
              <span className="text-xs font-mono font-bold text-primary bg-primary-fixed/40 px-2 py-0.5 rounded-full">
                ٥٠٪ مكتمل
              </span>
            </div>

            <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-700"
                style={{ width: "50%" }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-surface-container text-center">
              <div className="flex flex-col p-2 bg-surface-container-lowest rounded-xl">
                <span className="text-xs font-extrabold text-primary font-mono">{points}</span>
                <span className="text-[10px] text-on-surface-variant">نقطة XP</span>
              </div>
              <div className="flex flex-col p-2 bg-surface-container-lowest rounded-xl">
                <span className="text-xs font-extrabold text-secondary font-mono">{streakDays} أيام</span>
                <span className="text-[10px] text-on-surface-variant">حماسة</span>
              </div>
              <div className="flex flex-col p-2 bg-surface-container-lowest rounded-xl">
                <span className="text-xs font-extrabold text-error font-mono">{hearts}/٥</span>
                <span className="text-[10px] text-on-surface-variant">قلوب</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1">
              <span>المراحل المتاحة:</span>
              <span className="font-bold text-on-surface">مرحلتان نشطتان (١٤ درساً وقسماً)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Stages Selector & Curriculum Presentation */}
      <section className="mb-space-xl">
        {/* Stages Segmented Header Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-space-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-primary">view_timeline</span>
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface m-0">
              خطة ومراحل المستوى الأول (Level 1 Curriculum Stages)
            </h2>
          </div>

          {/* Stage Filter Buttons */}
          <div className="flex items-center p-1 bg-surface-container-low rounded-2xl border border-surface-container text-xs font-bold self-start">
            <button
              onClick={() => {
                setActiveStageTab("stage1");
                playFeedbackSound("tap");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeStageTab === "stage1"
                  ? "bg-surface-container-lowest text-primary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              <span>المرحلة الأولى: أسرتي</span>
              <span className="text-[10px] px-1 rounded bg-primary-fixed text-on-primary-fixed">٥ دروس</span>
            </button>

            <button
              onClick={() => {
                setActiveStageTab("stage2");
                playFeedbackSound("tap");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeStageTab === "stage2"
                  ? "bg-surface-container-lowest text-secondary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">school</span>
              <span>المرحلة الثانية: مدرستي</span>
              <span className="text-[10px] px-1 rounded bg-secondary-fixed text-on-secondary-fixed">٩ أقسام</span>
            </button>

            <button
              onClick={() => {
                setActiveStageTab("stage3");
                playFeedbackSound("tap");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeStageTab === "stage3"
                  ? "bg-surface-container-lowest text-tertiary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>المرحلة الثالثة: روتيني</span>
              <span className="text-[10px] px-1 rounded bg-surface-container text-on-surface-variant">قريباً</span>
            </button>
          </div>
        </div>

        {/* TAB 1: STAGE 1 (أسرتي وبيتي) */}
        {activeStageTab === "stage1" && (
          <div className="flex flex-col gap-space-md animate-in fade-in duration-300">
            {/* Stage Banner Summary */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-l from-primary/10 via-surface-container-lowest to-surface-container-lowest border border-primary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">home</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-on-surface">
                      المرحلة الأولى: أسرتي وبيتي (My Family & Home)
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
                      ٥ دروس • متسلسلة ومنسقة
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed max-w-3xl">
                    الركيزة الأساسية لتعلم أسماء الأقارب، التذكير والتأنيث، واستخدام هذا وهذه، مع سلم التدرج البصري من المفرد إلى المثنى والجمع والتحيات اليومية.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                <span className="text-xs font-bold text-primary bg-primary-fixed/40 px-3 py-1 rounded-full">
                  ١٠٠٪ مكتملة بنجاح ✓
                </span>
              </div>
            </div>

            {/* The 5 Lessons Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
              {/* Lesson 1 */}
              <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-primary-fixed/60 text-primary flex items-center justify-center text-xs font-mono font-bold">
                      ٠١
                    </span>
                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      مكتمل (+١٠٠ XP)
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-on-surface group-hover:text-primary transition-colors m-0">
                    المفردات المصورة
                  </h3>
                  <span className="text-xs text-on-surface-variant font-medium block mt-0.5 font-mono">
                    Illustrated Vocabulary • Al-Mufradāt
                  </span>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    الكلمات الجوهرية (أسرة، بيت، مدرستي) مع النطق الصوتي الدقيق، والتشكيل، وتدريب التسجيل الصوتي.
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="text-[11px] text-on-surface-variant">٣ كلمات + ٤ بطاقات</span>
                  <Link
                    href="/vocabulary"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <span>فتح الدرس</span>
                    <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Lesson 2 */}
              <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-secondary-fixed/60 text-secondary flex items-center justify-center text-xs font-mono font-bold">
                      ٠٢
                    </span>
                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      مكتمل (+١٢٠ XP)
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-on-surface group-hover:text-secondary transition-colors m-0">
                    أفراد الأسرة والإشارة
                  </h3>
                  <span className="text-xs text-on-surface-variant font-medium block mt-0.5 font-mono">
                    Family & Demonstratives • Hādhā / Hādhihi
                  </span>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    شجرة العائلة والمقارنة التفاعلية بين المذكر والمؤنث: استخدام هذا للولد وهذه للبنت وعلامة التاء المربوطة.
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="text-[11px] text-on-surface-variant">٦ أفراد + مقارنة</span>
                  <Link
                    href="/family-and-gender"
                    className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline"
                  >
                    <span>فتح الدرس</span>
                    <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Lesson 3 */}
              <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-tertiary-fixed/60 text-tertiary flex items-center justify-center text-xs font-mono font-bold">
                      ٠٣
                    </span>
                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      مكتمل (+١١٠ XP)
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-on-surface group-hover:text-tertiary transition-colors m-0">
                    سلم القواعد: النحو
                  </h3>
                  <span className="text-xs text-on-surface-variant font-medium block mt-0.5 font-mono">
                    Grammar Ladder • Singular, Dual & Plural
                  </span>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    تدرج بصري سلس: المفرد (ولد)، المثنى بإضافة (ـان) (ولدان)، والجمع (أولاد)، مع محول الكلمات التفاعلي.
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="text-[11px] text-on-surface-variant">السلم + المحول</span>
                  <Link
                    href="/grammar-ladder"
                    className="inline-flex items-center gap-1 text-xs font-bold text-tertiary hover:underline"
                  >
                    <span>فتح الدرس</span>
                    <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Lesson 4 */}
              <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-primary-fixed/60 text-primary flex items-center justify-center text-xs font-mono font-bold">
                      ٠٤
                    </span>
                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      مكتمل (+٩٠ XP)
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-on-surface group-hover:text-primary transition-colors m-0">
                    المحادثة اليومية
                  </h3>
                  <span className="text-xs text-on-surface-variant font-medium block mt-0.5 font-mono">
                    Daily Dialogue • Islamic Greetings & Q&A
                  </span>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    إلقاء ورد تحية الإسلام، السؤال عن الاسم والحال بالفصحى، والاستماع التلقائي بسرعة عادية وبطيئة.
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="text-[11px] text-on-surface-variant">حوارات صوتية تفاعلية</span>
                  <Link
                    href="/daily-dialogue"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <span>فتح الدرس</span>
                    <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Lesson 5 */}
              <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group md:col-span-2 lg:col-span-2">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-secondary-fixed/60 text-secondary flex items-center justify-center text-xs font-mono font-bold">
                      ٠٥
                    </span>
                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      مكتمل (+١٥٠ XP)
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-on-surface group-hover:text-secondary transition-colors m-0">
                    التمارين التفاعلية الشاملة
                  </h3>
                  <span className="text-xs text-on-surface-variant font-medium block mt-0.5 font-mono">
                    Comprehensive Interactive Practice & Quiz
                  </span>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    تحدي التوصيل البصري بين أفراد العائلة وصفاتهم، واختبار التمييز السمعي، لتثبيت كافة مخرجات المرحلة الأولى.
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="text-[11px] text-on-surface-variant">تحدي التوصيل + التحدي الصوتي</span>
                  <Link
                    href="/interactive-practice"
                    className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline"
                  >
                    <span>فتح التمارين</span>
                    <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STAGE 2 (مدرستي وفصلي) */}
        {activeStageTab === "stage2" && (
          <div className="flex flex-col gap-space-md animate-in fade-in duration-300">
            {/* Stage Banner Summary */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-l from-secondary/15 via-surface-container-lowest to-surface-container-lowest border border-secondary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">school</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-on-surface">
                      المرحلة الثانية: مدرستي وفصلي (My School & Classroom)
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary text-[10px] font-bold">
                      المرحلة النشطة الحالية
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed max-w-3xl">
                    المشهد البصري الشامل لمبنى المدرسة، أقسام الكلمة (اسم/فعل/حرف)، مرافق المدرسة العشرة، الجملة الاسمية والفعلية، تأنيث المهن، وظروف المكان الستة مع المنظور النسبي.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                <Link
                  href="/stage-2"
                  className="px-4 py-2 rounded-xl bg-secondary text-on-secondary text-xs font-bold shadow-xs hover:brightness-105 transition-all flex items-center gap-1"
                >
                  <span>دخول المرحلة كاملة</span>
                  <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* The 4 Learning Stations Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {/* Station 1 */}
              <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 text-[11px] font-bold">
                      المحطة الأولى
                    </span>
                    <span className="text-[11px] text-on-surface-variant">٣ أقسام</span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface m-0">
                    صرح المدرسة ومرافقها
                  </h3>
                  <span className="text-xs text-on-surface-variant block mt-0.5">
                    المشهد البصري • ١٠ مرافق مدرسية • تدريب التذكر
                  </span>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    استكشاف مبنى المدرسة، فناء الطابور، المختبرات، والمكتبة، وتدريب تفاعلي على محتويات كل مرفق.
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 font-bold">مكتمل جزئياً</span>
                  <Link
                    href="/stage-2#campus"
                    className="text-xs font-bold text-secondary hover:underline flex items-center gap-0.5"
                  >
                    <span>ابدأ المحطة</span>
                    <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Station 2 */}
              <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-900 text-[11px] font-bold">
                      المحطة الثانية
                    </span>
                    <span className="text-[11px] text-on-surface-variant">قسمان</span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface m-0">
                    التعبير وأقسام الكلمة
                  </h3>
                  <span className="text-xs text-on-surface-variant block mt-0.5">
                    الجمل النموذجية (مدرستي) • فرز اسم / فعل / حرف
                  </span>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    نصوص ونماذج سياقية مثل «مدرستي جميلة، أنا أحب مدرستي»، مع تدريب تفاعلي لتصنيف الكلمات بدقة.
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="text-[11px] text-amber-700 font-bold">نشطة</span>
                  <Link
                    href="/stage-2#sentences"
                    className="text-xs font-bold text-secondary hover:underline flex items-center gap-0.5"
                  >
                    <span>ابدأ المحطة</span>
                    <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Station 3 */}
              <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-900 text-[11px] font-bold">
                      المحطة الثالثة
                    </span>
                    <span className="text-[11px] text-on-surface-variant">قسمان</span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface m-0">
                    القواعد ومطابقة المهن
                  </h3>
                  <span className="text-xs text-on-surface-variant block mt-0.5">
                    الجملة الاسمية والفعلية • ٧ مهن مدرسية وتأنيثها
                  </span>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    أركان الجملة الاسمية (مبتدأ + خبر) والجملة الفعلية، وتحويل وظائف المدرسة بين المذكر والمؤنث.
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="text-[11px] text-blue-700 font-bold">نشطة</span>
                  <Link
                    href="/stage-2#grammar-structure"
                    className="text-xs font-bold text-secondary hover:underline flex items-center gap-0.5"
                  >
                    <span>ابدأ المحطة</span>
                    <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Station 4 */}
              <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-900 text-[11px] font-bold">
                      المحطة الرابعة
                    </span>
                    <span className="text-[11px] text-on-surface-variant">قسمان</span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface m-0">
                    الفصل والمنظور المكاني
                  </h3>
                  <span className="text-xs text-on-surface-variant block mt-0.5">
                    توزيع المقاعد • ظروف المكان الستة • المنظور النسبي
                  </span>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    تطبيق ظروف المكان: أمام، خلف، فوق، تحت، يمين، يسار، وفهم التغير النسبي للاتجاهات حسب وجهة النظر.
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="text-[11px] text-purple-700 font-bold">تطبيق متقدم</span>
                  <Link
                    href="/stage-2#spatial-classroom"
                    className="text-xs font-bold text-secondary hover:underline flex items-center gap-0.5"
                  >
                    <span>ابدأ المحطة</span>
                    <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STAGE 3 (الأوقات والأنشطة - قادمة) */}
        {activeStageTab === "stage3" && (
          <div className="p-8 rounded-2xl bg-surface-container-lowest border border-surface-container text-center flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary mb-3">
              <span className="material-symbols-outlined text-3xl">schedule</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface m-0">
              المرحلة الثالثة: الأوقات والأنشطة والروتين اليومي
            </h3>
            <span className="text-xs text-tertiary font-bold mt-1">
              المرحلة الختامية في المستوى الأول • تُفتح قريباً
            </span>
            <p className="text-sm text-on-surface-variant max-w-lg mt-2 leading-relaxed">
              ستتعلم فيها التعبير عن أوقات الصباح والمساء، الساعة، الأفعال الروتينية (أستيقظ، أتناول الفطور، أذهب، أذاكر)، وصياغة الجمل الزمنية المترابطة بالفصحى.
            </p>
            <button
              onClick={() => setActiveStageTab("stage1")}
              className="mt-4 px-5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-all cursor-pointer"
              type="button"
            >
              العودة إلى دروس المرحلة الأولى
            </button>
          </div>
        )}
      </section>

      {/* 3. Level 1 Core Learning Outcomes (ماذا ستتقن في هذا المستوى؟) */}
      <section className="mb-space-xl p-space-md sm:p-space-lg rounded-3xl bg-surface-container-low/80 border border-surface-container">
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">verified</span>
            <h2 className="text-lg sm:text-xl font-bold text-on-surface m-0">
              مخرجات وإتقان المستوى الأول (Core Learning Competencies)
            </h2>
          </div>
          <span className="text-xs text-on-surface-variant font-mono hidden sm:inline-block">
            CEFR A1 Target Outcomes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
          <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container flex flex-col gap-1.5 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary-fixed/50 text-primary flex items-center justify-center text-sm font-bold">
                ١
              </span>
              <span className="text-xs font-bold text-on-surface">التعريف بالنفس والأسرة</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              القدرة على ذكر أفراد العائلة ووصف البيت بالفصحى ونطق الحركات بدقة.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container flex flex-col gap-1.5 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-secondary-fixed/50 text-secondary flex items-center justify-center text-sm font-bold">
                ٢
              </span>
              <span className="text-xs font-bold text-on-surface">التمييز بين التذكير والتأنيث</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              استخدام أسماء الإشارة التلقائية (هذا / هذه) مع الأسماء والمهن المناسبة.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container flex flex-col gap-1.5 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-tertiary-fixed/50 text-tertiary flex items-center justify-center text-sm font-bold">
                ٣
              </span>
              <span className="text-xs font-bold text-on-surface">المفرد والمثنى والجمع</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              صياغة المثنى الفصيح بإضافة (ـان) وفهم جموع التكسير والمذكر والمؤنث السالم.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container flex flex-col gap-1.5 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary-fixed/50 text-primary flex items-center justify-center text-sm font-bold">
                ٤
              </span>
              <span className="text-xs font-bold text-on-surface">الاتجاهات والمحادثة اليومية</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              إلقاء ورد السلام، والسؤال عن الحال، وتوظيف ظروف المكان الستة في وصف المحيط.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Quick Audio Preview: Essential Vocabulary Bank */}
      <section className="mb-space-lg">
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-secondary">volume_up</span>
            <h2 className="text-lg sm:text-xl font-bold text-on-surface m-0">
              بنك النطق السريع لمفردات المستوى الأول
            </h2>
          </div>
          <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
            اضغط للاستماع الصوتي الفوري
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {sampleKeyWords.map((item) => {
            const isPlaying = activeAudioWord === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handlePlayWord(item.arabic, item.id)}
                className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between gap-1 cursor-pointer relative overflow-hidden ${
                  isPlaying
                    ? "bg-primary text-on-primary border-primary shadow-sm scale-[1.02]"
                    : "bg-surface-container-lowest hover:bg-surface-container-low border-surface-container text-on-surface hover:border-primary/40"
                }`}
                type="button"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                    isPlaying ? "bg-white/20 text-white" : "bg-surface-container text-on-surface-variant"
                  }`}>
                    {item.demonstrative}
                  </span>
                  <span className={`material-symbols-outlined text-base ${isPlaying ? "text-white animate-pulse" : "text-primary"}`}>
                    volume_up
                  </span>
                </div>

                <div className="my-1">
                  <span className="text-base font-extrabold block">
                    {showTashkeel ? item.arabic : item.plain}
                  </span>
                  <span className={`text-[10px] font-mono block ${isPlaying ? "text-white/80" : "text-on-surface-variant"}`}>
                    {item.phonetic}
                  </span>
                </div>

                <span className={`text-[11px] font-semibold mt-auto ${isPlaying ? "text-white/90" : "text-on-surface-variant"}`}>
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
