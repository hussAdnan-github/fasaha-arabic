"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLearning } from "@/context/LearningContext";
import StageOperationsNav from "@/components/layout/StageOperationsNav";
import {
  schoolFacilities,
  modelSentences,
  wordClassificationItems,
  genderProfessionPairs,
  spatialDirectionSentences,
  perspectiveQuestions,
  CampusFacility,
  ModelSentence,
  WordClassificationItem,
} from "@/data/stage2SchoolData";

// 4 Themed Learning Stations
interface LearningStation {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  badgeBg: string;
  sectionIds: number[];
}

const STATIONS: LearningStation[] = [
  {
    id: 1,
    number: "المحطة الأولى",
    title: "صرح المدرسة ومرافقها",
    subtitle: "المشهد البصري • ١٠ مرافق • تمرين التذكر",
    icon: "domain",
    accentColor: "from-emerald-600 to-teal-700",
    badgeBg: "bg-emerald-500/15 text-emerald-800 border-emerald-300/40",
    sectionIds: [1, 4, 5],
  },
  {
    id: 2,
    number: "المحطة الثانية",
    title: "التعبير وأقسام الكلمة",
    subtitle: "الجمل الاسمية والفعلية • فرز الكلمات",
    icon: "article",
    accentColor: "from-amber-600 to-orange-600",
    badgeBg: "bg-amber-500/15 text-amber-900 border-amber-300/40",
    sectionIds: [2, 3],
  },
  {
    id: 3,
    number: "المحطة الثالثة",
    title: "القواعد ومطابقة المهن",
    subtitle: "المبتدأ والخبر • ٧ مهن وتأنيثها",
    icon: "schema",
    accentColor: "from-blue-600 to-indigo-700",
    badgeBg: "bg-blue-500/15 text-blue-900 border-blue-300/40",
    sectionIds: [6, 7],
  },
  {
    id: 4,
    number: "المحطة الرابعة",
    title: "الفصل والمنظور المكاني",
    subtitle: "توزيع المقاعد • ٦ اتجاهات • المنظور",
    icon: "explore",
    accentColor: "from-purple-600 to-violet-700",
    badgeBg: "bg-purple-500/15 text-purple-900 border-purple-300/40",
    sectionIds: [8, 9],
  },
];

const SECTIONS_META = [
  { id: 1, stationId: 1, title: "المشهد البصري التمهيدي لمبنى المدرسة وفنائها", shortTitle: "١. المشهد البصري", icon: "domain", desc: "مبنى المدرسة وفناؤها ومرافقها" },
  { id: 2, stationId: 2, title: "الجمل الأساسية والنصوص النموذجية (مدرستي)", shortTitle: "٢. الجمل النموذجية", icon: "article", desc: "مدرستي جميلة، أنا أحب مدرستي" },
  { id: 3, stationId: 2, title: "التدريب التصنيفي: أقسام الكلمة (اسم/فعل/حرف)", shortTitle: "٣. أقسام الكلمة", icon: "category", desc: "تصنيف الكلمات إلى اسم وفعل وحرف" },
  { id: 4, stationId: 1, title: "الحصيلة اللغوية ومرافق المدرسة الأساسية", shortTitle: "٤. مرافق المدرسة", icon: "apartment", desc: "١٠ مرافق أساسية مع النطق والمحتويات" },
  { id: 5, stationId: 1, title: "تدريب الاستيعاب والتذكر (ماذا يوجد في...)", shortTitle: "٥. تدريب التذكر", icon: "quiz", desc: "ماذا يوجد في كل مرفق مدرسي؟" },
  { id: 6, stationId: 3, title: "البنية النحوية والتركيبية (الاسمية والفعلية)", shortTitle: "٦. البنية النحوية", icon: "schema", desc: "الجملة الاسمية والفعلية وأركانها" },
  { id: 7, stationId: 3, title: "المطابقة بين التذكير والتأنيث في المهن المدرسية", shortTitle: "٧. التذكير والتأنيث", icon: "switch_account", desc: "٧ وظائف مدرسية وقواعد النحو" },
  { id: 8, stationId: 4, title: "الفصل الدراسي وتطبيق ظروف المكان الستة", shortTitle: "٨. ظروف المكان", icon: "explore", desc: "توزيع المقاعد و٦ ظروف مكانية" },
  { id: 9, stationId: 4, title: "تدريب نسبي على الاتجاهات المكانية", shortTitle: "٩. التدريب النسبي", icon: "compare_arrows", desc: "منظور الطلاب مقابل منظور المعلم" },
];

export default function Stage2SchoolPage() {
  const {
    showTashkeel,
    toggleTashkeel,
    formatArabic,
    audioSpeed,
    setAudioSpeed,
    playPronunciation,
    playFeedbackSound,
    addPoints,
  } = useLearning();

  // Active section tab (from 1 to 9)
  const [activeTab, setActiveTab] = useState<number>(1);

  // Quick Index Modal / Drawer
  const [showIndexDrawer, setShowIndexDrawer] = useState<boolean>(false);

  // SECTION 1: Active campus facility hotspot & category filter
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>("classrooms");
  const [campusCategoryFilter, setCampusCategoryFilter] = useState<string>("all");

  // SECTION 3: Word classification quiz state
  const [classifiedWords, setClassifiedWords] = useState<Record<string, "noun" | "verb" | "particle">>({});
  const [selectedWordToClassify, setSelectedWordToClassify] = useState<WordClassificationItem | null>(
    wordClassificationItems[0]
  );
  const [classificationScore, setClassificationScore] = useState(0);
  const [classificationFeedback, setClassificationFeedback] = useState<string | null>(null);

  // SECTION 5: Facility items quiz state
  const facilityQuizQuestions = [
    {
      facilityName: "الفَصْل الدِّرَاسِيّ",
      correctItems: ["سَبُّورَةٌ", "مَقَاعِدُ الطُّلَّابِ", "مَكْتَبُ المُعَلِّمِ"],
      options: ["سَبُّورَةٌ", "مَقَاعِدُ الطُّلَّابِ", "أَنَابِيبُ اخْتِبَارٍ", "مَكْتَبُ المُعَلِّمِ", "شَطَائِرُ المَقْصَفِ"],
    },
    {
      facilityName: "المَقْصَف المَدْرَسِيّ",
      correctItems: ["شَطَائِرُ صِحِّيَّةٌ", "عَصَائِرُ طَازَجَةٌ", "طَابُورُ الطُّلَّابِ"],
      options: ["شَطَائِرُ صِحِّيَّةٌ", "مَجَاهِرُ ضَوْئِيَّةٌ", "عَصَائِرُ طَازَجَةٌ", "طَابُورُ الطُّلَّابِ", "سِجِلَّاتُ الإِدَارَةِ"],
    },
    {
      facilityName: "مَكْتَب الإِدَارَة",
      correctItems: ["مَكْتَبُ المَدِيرِ", "سِجِلَّاتُ الحُضُورِ", "شَهَادَاتُ التَّقْدِيرِ"],
      options: ["مَكْتَبُ المَدِيرِ", "مَلْعَبُ الكُرَةِ", "سِجِلَّاتُ الحُضُورِ", "شَهَادَاتُ التَّقْدِيرِ", "حَبْلُ القَفْزِ"],
    },
    {
      facilityName: "سَاحَة المَدْرَسَة",
      correctItems: ["سَارِيَةُ العَلَمِ", "أَشْجَارٌ مُظَلِّلَةٌ", "مَلْعَبُ الكُرَةِ"],
      options: ["سَارِيَةُ العَلَمِ", "حَوَاسِيبُ التَّسْجِيلِ", "أَشْجَارٌ مُظَلِّلَةٌ", "مَلْعَبُ الكُرَةِ", "فِهْرِسُ الكُتُبِ"],
    },
  ];
  const [activeFacilityQuizIndex, setActiveFacilityQuizIndex] = useState(0);
  const [selectedFacilityItems, setSelectedFacilityItems] = useState<string[]>([]);
  const [facilityQuizFeedback, setFacilityQuizFeedback] = useState<string | null>(null);

  // SECTION 7: Gender transformation practice
  const [genderPracticeMode, setGenderPracticeMode] = useState<"table" | "quiz">("table");
  const [genderQuizIndex, setGenderQuizIndex] = useState(0);
  const [genderQuizAnswer, setGenderQuizAnswer] = useState<string | null>(null);

  // SECTION 9: Perspective Quiz state
  const [perspectiveAnswers, setPerspectiveAnswers] = useState<Record<string, string>>({});
  const [perspectiveScore, setPerspectiveScore] = useState(0);
  const [perspectiveSubmitted, setPerspectiveSubmitted] = useState(false);

  // Audio helper
  const handlePlayText = (text: string) => {
    playFeedbackSound("tap");
    playPronunciation(text);
  };

  // Section 3: Classify Word Handler
  const handleClassifyWord = (type: "noun" | "verb" | "particle") => {
    if (!selectedWordToClassify) return;

    const isCorrect = selectedWordToClassify.type === type;
    if (isCorrect) {
      playFeedbackSound("success");
      addPoints(10);
      setClassificationScore((prev) => prev + 1);
      setClassifiedWords((prev) => ({ ...prev, [selectedWordToClassify.id]: type }));
      setClassificationFeedback(`أحسنت! «${selectedWordToClassify.wordWithTashkeel}» ${type === "noun" ? "اسم" : type === "verb" ? "فعل" : "حرف"}.`);

      // Pick next unclassified word
      const nextWord = wordClassificationItems.find(
        (w) => w.id !== selectedWordToClassify.id && !classifiedWords[w.id]
      );
      if (nextWord) {
        setSelectedWordToClassify(nextWord);
      }
    } else {
      playFeedbackSound("error");
      setClassificationFeedback(`إجابة غير صحيحة، حاول تصنيف «${selectedWordToClassify.wordWithTashkeel}» مرة أخرى.`);
    }
  };

  // Section 5: Toggle Item in Facility Quiz
  const handleToggleFacilityItem = (item: string) => {
    playFeedbackSound("tap");
    setSelectedFacilityItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Section 5: Verify Facility Quiz
  const handleVerifyFacilityQuiz = () => {
    const q = facilityQuizQuestions[activeFacilityQuizIndex];
    const correctCount = selectedFacilityItems.filter((item) => q.correctItems.includes(item)).length;
    const incorrectCount = selectedFacilityItems.filter((item) => !q.correctItems.includes(item)).length;

    if (correctCount === q.correctItems.length && incorrectCount === 0) {
      playFeedbackSound("success");
      addPoints(20);
      setFacilityQuizFeedback("إجابة ممتازة! حددت جميع المرافق والمحتويات الصحيحة بدقة.");
    } else {
      playFeedbackSound("error");
      setFacilityQuizFeedback(`تنبيه: اخترت ${correctCount} من ${q.correctItems.length} صحيحة، و${incorrectCount} غير ملائمة لهذا المرفق.`);
    }
  };

  // Section 9: Perspective Quiz Answer Select
  const handlePerspectiveSelect = (qId: string, option: string) => {
    playFeedbackSound("tap");
    setPerspectiveAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  // Section 9: Grade Perspective Quiz
  const handleGradePerspectiveQuiz = () => {
    let score = 0;
    perspectiveQuestions.forEach((q) => {
      if (perspectiveAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    setPerspectiveScore(score);
    setPerspectiveSubmitted(true);
    if (score === perspectiveQuestions.length) {
      playFeedbackSound("complete");
      addPoints(50);
    } else {
      playFeedbackSound("success");
      addPoints(score * 10);
    }
  };

  const selectedFacility =
    schoolFacilities.find((f) => f.id === selectedFacilityId) || schoolFacilities[0];

  // Derived Active Station based on current activeTab
  const currentStation =
    STATIONS.find((s) => s.sectionIds.includes(activeTab)) || STATIONS[0];

  // Current Section Metadata
  const currentSectionMeta =
    SECTIONS_META.find((s) => s.id === activeTab) || SECTIONS_META[0];

  // Overall Stage 2 Progress
  const stageProgressPercent = Math.round((activeTab / 9) * 100);

  // Standardized Section Footer with Step Navigation
  const renderSectionFooter = (currentId: number) => {
    const prevSection = SECTIONS_META.find((s) => s.id === currentId - 1);
    const nextSection = SECTIONS_META.find((s) => s.id === currentId + 1);

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-surface-container">
        {/* Previous Button */}
        <div>
          {prevSection ? (
            <button
              onClick={() => {
                setActiveTab(prevSection.id);
                playFeedbackSound("tap");
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold transition-all cursor-pointer border border-surface-container shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
              <span>السابق: {prevSection.shortTitle}</span>
            </button>
          ) : (
            <div className="w-24" />
          )}
        </div>

        {/* Step dots (1 to 9) */}
        <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-full border border-surface-container">
          {SECTIONS_META.map((sec) => {
            const isCurrent = sec.id === currentId;
            const isDone = sec.id < currentId;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveTab(sec.id);
                  playFeedbackSound("tap");
                }}
                title={sec.title}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-primary text-on-primary shadow-xs scale-110 ring-2 ring-primary/30"
                    : isDone
                    ? "bg-primary-fixed/60 text-primary hover:bg-primary-fixed font-bold"
                    : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"
                }`}
                type="button"
              >
                {sec.id}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <div>
          {nextSection ? (
            <button
              onClick={() => {
                setActiveTab(nextSection.id);
                playFeedbackSound("tap");
              }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-primary text-on-primary hover:brightness-105 text-xs font-bold transition-all cursor-pointer shadow-xs"
              type="button"
            >
              <span>التالي: {nextSection.shortTitle}</span>
              <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
            </button>
          ) : (
            <Link
              href="/levels"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-primary text-on-primary hover:brightness-105 text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <span>🎉 أتممت المرحلة • خارطة المستويات</span>
              <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
            </Link>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* 1. Master Cross-Stage Operations Ribbon */}
      <StageOperationsNav />

      {/* 2. Sleek Unified Stage 2 Header Card */}
      <section className="relative rounded-3xl bg-surface-container-lowest p-4 sm:p-5 shadow-xs overflow-hidden mb-4 border border-surface-container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Title & Stage Identity */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]">school</span>
                {formatArabic("المستوى الأول • المرحلة الثانية")}
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                • {currentStation.number}: {currentStation.title}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-primary text-[11px] font-bold">
                القسم {activeTab} من ٩ ({stageProgressPercent}٪)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-on-surface m-0 tracking-tight">
              {showTashkeel ? "مَدْرَسَتِي وَفَصْلِي الدِّرَاسِيّ" : "مدرستي وفصلي الدراسي"}
            </h1>
            <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed m-0">
              رحلة تعليمية متدرجة عبر ٤ محطات رئيسية: استكشاف صرح المدرسة ومرافقها، الجمل النموذجية وأقسام الكلمة، القواعد النحوية ومطابقة الوظائف، والفصل الدراسي والمنظور المكاني.
            </p>
          </div>

          {/* Quick Learning Controls & Index Drawer Trigger */}
          <div className="flex items-center gap-2 self-start lg:self-center flex-wrap">
            {/* Diacritics Toggle */}
            <button
              onClick={toggleTashkeel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-bold text-on-surface border border-surface-container shadow-xs transition-all cursor-pointer"
              type="button"
              title="تفعيل أو تعطيل التشكيل"
            >
              <span>التشكيل</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  showTashkeel ? "bg-primary animate-pulse" : "bg-outline"
                }`}
              />
            </button>

            {/* Audio Speed Toggle */}
            <div className="flex items-center bg-surface-container-low rounded-xl p-0.5 border border-surface-container text-xs">
              <button
                onClick={() => setAudioSpeed(1)}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  audioSpeed === 1 ? "bg-primary text-on-primary shadow-xs" : "text-on-surface-variant"
                }`}
                type="button"
              >
                ١.٠x
              </button>
              <button
                onClick={() => setAudioSpeed(0.75)}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  audioSpeed === 0.75 ? "bg-primary text-on-primary shadow-xs" : "text-on-surface-variant"
                }`}
                type="button"
              >
                ٠.٧٥x
              </button>
            </div>

            {/* Full 9-Section Index Popover Trigger */}
            <button
              onClick={() => {
                setShowIndexDrawer(true);
                playFeedbackSound("tap");
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary-fixed/40 hover:bg-primary-fixed/70 text-primary text-xs font-bold transition-all cursor-pointer border border-primary/20 shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>فهرس الأقسام (٩)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. The 4 Themed Learning Stations Stepper */}
      <section className="mb- space-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {STATIONS.map((station) => {
            const isStationActive = currentStation.id === station.id;
            const isStationPassed = station.sectionIds.every((id) => id < activeTab);

            return (
              <button
                key={station.id}
                onClick={() => {
                  setActiveTab(station.sectionIds[0]);
                  playFeedbackSound("tap");
                }}
                className={`p-3.5 rounded-2xl text-right transition-all flex flex-col justify-between gap-2.5 cursor-pointer border ${
                  isStationActive
                    ? "bg-surface-container-lowest border-primary shadow-sm ring-2 ring-primary/20 -translate-y-0.5"
                    : isStationPassed
                    ? "bg-surface-container-lowest hover:bg-surface-container-low border-surface-container text-on-surface"
                    : "bg-surface-container-lowest/80 hover:bg-surface-container border-surface-container text-on-surface"
                }`}
                type="button"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm ${
                        isStationActive
                          ? "bg-primary text-on-primary shadow-xs font-bold"
                          : isStationPassed
                          ? "bg-primary/20 text-primary font-bold"
                          : "bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px]">{station.icon}</span>
                    </span>
                    <span className="text-[11px] font-bold text-on-surface-variant">
                      {station.number}
                    </span>
                  </div>

                  {isStationActive ? (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold shadow-xs">
                      أنت هنا
                    </span>
                  ) : isStationPassed ? (
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  ) : (
                    <span className="text-[10px] text-on-surface-variant font-medium">
                      {station.sectionIds.length} أقسام
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className={`text-sm font-extrabold line-clamp-1 ${isStationActive ? "text-primary" : "text-on-surface"}`}>
                    {station.title}
                  </span>
                  <span className="text-[10px] text-on-surface-variant mt-0.5 line-clamp-1">
                    {station.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Active Station Sub-Navigation Bar (Only the sections in this station) */}
      <section className="mb- space-md bg-surface-container-lowest p-2 rounded-2xl border border-surface-container shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <span className="text-[11px] font-bold text-on-surface-variant px-2 hidden sm:inline">
            أقسام {currentStation.number}:
          </span>
          {currentStation.sectionIds.map((secId) => {
            const secMeta = SECTIONS_META.find((s) => s.id === secId)!;
            const isTabActive = activeTab === secId;

            return (
              <button
                key={secId}
                onClick={() => {
                  setActiveTab(secId);
                  playFeedbackSound("tap");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isTabActive
                    ? "bg-primary text-on-primary shadow-xs scale-100"
                    : "bg-surface-container-low hover:bg-surface-container text-on-surface border border-surface-container"
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">{secMeta.icon}</span>
                <span>{secMeta.shortTitle}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center px-1">
          <span className="text-xs text-primary font-bold">
            {currentSectionMeta.title}
          </span>
        </div>
      </section>

      {/* Quick Index Slide-Over Drawer / Popover Modal */}
      {showIndexDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-surface-container shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center text-base font-bold shadow-xs">
                  <span className="material-symbols-outlined text-lg">menu_book</span>
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-on-surface m-0">
                    فهرس أقسام المرحلة الثانية التسعة
                  </h3>
                  <p className="text-xs text-on-surface-variant m-0">
                    انقر على أي قسم للانتقال إليه مباشرة ضمن مسار التعلم.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIndexDrawer(false)}
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* List by Stations */}
            <div className="space-y-4">
              {STATIONS.map((station) => (
                <div key={station.id} className="p-3.5 rounded-2xl bg-surface-container-low/70 border border-surface-container">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-base">{station.icon}</span>
                    <span className="text-xs font-black text-on-surface">{station.number}: {station.title}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {station.sectionIds.map((secId) => {
                      const sec = SECTIONS_META.find((s) => s.id === secId)!;
                      const isActive = activeTab === secId;
                      return (
                        <button
                          key={secId}
                          onClick={() => {
                            setActiveTab(secId);
                            setShowIndexDrawer(false);
                            playFeedbackSound("tap");
                          }}
                          className={`p-2.5 rounded-xl text-right transition-all flex flex-col gap-0.5 cursor-pointer border ${
                            isActive
                              ? "bg-primary text-on-primary border-primary shadow-xs"
                              : "bg-surface-container-lowest hover:bg-surface-container text-on-surface border-surface-container"
                          }`}
                          type="button"
                        >
                          <span className="text-xs font-bold leading-tight line-clamp-1">{sec.shortTitle}</span>
                          <span className={`text-[10px] line-clamp-1 ${isActive ? "text-white/80" : "text-on-surface-variant"}`}>
                            {sec.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 1: المشهد البصري التمهيدي (مدخل الوحدة ومبنى المدرسة وفناءها)
      ========================================================================= */}
      {activeTab === 1 && (
        <section className="bg-surface-container-lowest rounded-3xl p- space-md sm:p-space-lg shadow-sm border border-surface-container mb-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold text-base shadow-xs">
                ١
              </div>
              <div>
                <h2 className="text-xl font-black text-on-surface m-0">
                  المشهد البصري التمهيدي: مبنى المدرسة وفناؤها
                </h2>
                <p className="text-xs text-on-surface-variant m-0">
                  رسم تخطيطي تفاعلي يجسد مبنى المدرسة وفناءها وممراتها ومرافقها لربط المتعلم بالمحيط الواقعي.
                </p>
              </div>
            </div>

            <button
              onClick={() => handlePlayText("مَبْنَى المَدْرَسَةِ وَفِنَاؤُهَا الجَمِيلُ")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary-fixed/30 text-primary hover:bg-primary-fixed/50 text-xs font-bold transition-colors cursor-pointer self-start sm:self-center"
              type="button"
            >
              <span className="material-symbols-outlined text-base">volume_up</span>
              <span>استمع للوصف</span>
            </button>
          </div>

          {/* Interactive School Campus Blueprint & Illustrated Scene */}
          <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-inner mb-6">
            <div className="absolute top-0 right-0 p-4 opacity-15">
              <span className="material-symbols-outlined text-9xl">school</span>
            </div>

            {/* Campus Title Badge & Category Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold self-start">
                <span className="material-symbols-outlined text-sm text-emerald-400">explore</span>
                <span>مُخَطَّطُ صَرْحِ المَدْرَسَةِ التَّفَاعُلِيّ (School Campus Blueprint)</span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-xl backdrop-blur-md text-xs flex-wrap">
                {[
                  { id: "all", label: "كافة المرافق (١٠)" },
                  { id: "classroom", label: "أكاديمي وتعليم" },
                  { id: "admin", label: "إدارة ومكاتب" },
                  { id: "facility", label: "مرافق وخدمات" },
                  { id: "outdoor", label: "الساحة والبوابة" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCampusCategoryFilter(cat.id);
                      playFeedbackSound("tap");
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      campusCategoryFilter === cat.id
                        ? "bg-emerald-400 text-slate-950 font-black shadow-xs"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    type="button"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Grid of Campus Zones */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 relative z-10">
              {schoolFacilities
                .filter(
                  (fac) =>
                    campusCategoryFilter === "all" ||
                    fac.category === campusCategoryFilter
                )
                .map((fac) => {
                  const isSelected = selectedFacilityId === fac.id;
                  return (
                    <button
                      key={fac.id}
                      onClick={() => {
                        setSelectedFacilityId(fac.id);
                        handlePlayText(fac.nameWithTashkeel);
                      }}
                      className={`p-3.5 rounded-2xl transition-all text-right flex flex-col justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-white text-slate-900 shadow-xl ring-4 ring-emerald-400/80 scale-[1.03]"
                          : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10"
                      }`}
                      type="button"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg ${
                            isSelected ? "bg-emerald-600 text-white" : "bg-white/20 text-emerald-300"
                          }`}
                        >
                          <span className="material-symbols-outlined">{fac.icon}</span>
                        </span>
                        <span className="text-[10px] font-mono opacity-70">
                          {fac.category}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-extrabold leading-tight">
                          {formatArabic(fac.nameWithTashkeel, fac.namePlain)}
                        </span>
                        <span
                          className={`text-[10px] mt-0.5 ${
                            isSelected ? "text-slate-600" : "text-emerald-200/80"
                          }`}
                        >
                          {fac.englishMeaning}
                        </span>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Active Facility Detailed Inspector Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center text-2xl shrink-0 shadow-xs">
                <span className="material-symbols-outlined">{selectedFacility.icon}</span>
              </div>
              <div className="flex flex-col text-right">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-black text-on-surface m-0">
                    {formatArabic(selectedFacility.nameWithTashkeel, selectedFacility.namePlain)}
                  </h3>
                  <span className="text-xs font-mono text-on-surface-variant font-medium">
                    ({selectedFacility.englishMeaning})
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1 max-w-xl leading-relaxed m-0">
                  {selectedFacility.description}
                </p>

                {/* Items Found in this Facility */}
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  <span className="text-[11px] font-bold text-primary">يوجد فيه:</span>
                  {selectedFacility.itemsFound.map((item, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface border border-surface-container text-[11px] font-semibold"
                    >
                      {formatArabic(item)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handlePlayText(selectedFacility.nameWithTashkeel)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-xs hover:brightness-105 transition-all cursor-pointer shrink-0 self-end md:self-center"
              type="button"
            >
              <span className="material-symbols-outlined text-base">volume_up</span>
              <span>نطق المرفق</span>
            </button>
          </div>

          {/* Standardized Section Bottom Navigation */}
          {renderSectionFooter(1)}
        </section>
      )}

      {/* =========================================================================
          SECTION 2: الجمل الأساسية والنصوص النموذجية (مدرستي)
      ========================================================================= */}
      {activeTab === 2 && (
        <section className="bg-surface-container-lowest rounded-3xl p-space-md sm:p-space-lg shadow-sm border border-surface-container mb-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center font-bold text-base shadow-xs">
                ٢
              </div>
              <div>
                <h2 className="text-xl font-black text-on-surface m-0">
                  الجمل الأساسية والنصوص النموذجية (مدرستي)
                </h2>
                <p className="text-xs text-on-surface-variant m-0">
                  تعلم النماذج التعبيرية الرسمية مع تمييز نوع الجملة (اسمية / فعلية) والاستماع الصوتي الفوري.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {modelSentences.map((sentence) => (
              <div
                key={sentence.id}
                className="p-4 rounded-3xl bg-surface-container-low/70 border border-surface-container flex flex-col justify-between gap-3 hover:border-primary/40 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      sentence.type === "nominal"
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "bg-secondary-fixed text-on-secondary-fixed"
                    }`}
                  >
                    {sentence.typeLabel}
                  </span>

                  <button
                    onClick={() => handlePlayText(sentence.arabicWithTashkeel)}
                    className="w-8 h-8 rounded-full bg-surface-container-lowest hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                    type="button"
                    title="استمع للنطق"
                  >
                    <span className="material-symbols-outlined text-lg">volume_up</span>
                  </button>
                </div>

                <div className="flex flex-col text-right">
                  <span className="text-xl sm:text-2xl font-black text-on-surface leading-snug">
                    {formatArabic(sentence.arabicWithTashkeel, sentence.arabicPlain)}
                  </span>
                  <span className="text-xs font-mono text-on-surface-variant font-medium mt-1">
                    {sentence.phonetic}
                  </span>
                  <span className="text-xs text-on-surface-variant font-semibold mt-0.5 text-primary">
                    “{sentence.englishTranslation}”
                  </span>
                </div>

                {/* Simplified Grammar Breakdown */}
                <div className="p-2.5 rounded-2xl bg-surface-container-lowest border border-surface-container/60 flex flex-col gap-1 text-[11px]">
                  <span className="font-bold text-on-surface-variant">التحليل التركيبي:</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {sentence.grammarAnalysis.map((item, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1">
                        <span className="px-1.5 py-0.2 rounded bg-surface-container-high font-bold">
                          {item.part}
                        </span>
                        <span className={item.colorClass}>({item.role})</span>
                        {idx < sentence.grammarAnalysis.length - 1 && <span className="text-outline">+</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Standardized Section Bottom Navigation */}
          {renderSectionFooter(2)}
        </section>
      )}

      {/* =========================================================================
          SECTION 3: التدريب التصنيفي (أقسام الكلمة: اسم / فعل / حرف)
      ========================================================================= */}
      {activeTab === 3 && (
        <section className="bg-surface-container-lowest rounded-3xl p-space-md sm:p-space-lg shadow-sm border border-surface-container mb-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-base shadow-xs">
                ٣
              </div>
              <div>
                <h2 className="text-xl font-black text-on-surface m-0">
                  التدريب التصنيفي: أقسام الكلمة (اسم / فعل / حرف)
                </h2>
                <p className="text-xs text-on-surface-variant m-0">
                  صنّف الكلمة المعروضة بالنقر على الصندوق المناسب لكسب النقاط واختبار فهمك النحوي.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold">
              <span className="material-symbols-outlined text-base">stars</span>
              <span>النقاط: {classificationScore} / {wordClassificationItems.length}</span>
            </div>
          </div>

          {/* Active Word Card to Classify */}
          {selectedWordToClassify ? (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-primary-fixed/30 to-secondary-fixed/30 border border-primary/20 text-center flex flex-col items-center justify-center gap-3 mb-6 shadow-sm">
              <span className="text-xs font-bold text-on-surface-variant">الكلمة المطلوب تصنيفها:</span>
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-on-surface">
                  {formatArabic(selectedWordToClassify.wordWithTashkeel, selectedWordToClassify.wordPlain)}
                </span>
                <button
                  onClick={() => handlePlayText(selectedWordToClassify.wordWithTashkeel)}
                  className="w-10 h-10 rounded-full bg-surface-container-lowest hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">volume_up</span>
                </button>
              </div>
              <span className="text-xs font-mono text-on-surface-variant">
                [ المعنى: {selectedWordToClassify.meaning} ]
              </span>

              {classificationFeedback && (
                <div className="mt-2 px-4 py-1.5 rounded-full bg-surface-container-lowest text-xs font-bold text-primary shadow-xs">
                  {classificationFeedback}
                </div>
              )}

              {/* Classification Action Buckets */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-3">
                <button
                  onClick={() => handleClassifyWord("noun")}
                  className="py-3 px-4 rounded-2xl bg-primary text-on-primary font-black text-sm shadow-[0_3px_0_#005137] active:translate-y-0.5 hover:brightness-105 transition-all cursor-pointer flex flex-col items-center gap-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">badge</span>
                  <span>اسْمٌ (Noun)</span>
                </button>

                <button
                  onClick={() => handleClassifyWord("verb")}
                  className="py-3 px-4 rounded-2xl bg-secondary text-on-secondary font-black text-sm shadow-[0_3px_0_#855300] active:translate-y-0.5 hover:brightness-105 transition-all cursor-pointer flex flex-col items-center gap-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">directions_run</span>
                  <span>فِعْلٌ (Verb)</span>
                </button>

                <button
                  onClick={() => handleClassifyWord("particle")}
                  className="py-3 px-4 rounded-2xl bg-tertiary text-on-tertiary font-black text-sm shadow-[0_3px_0_#1b4c3e] active:translate-y-0.5 hover:brightness-105 transition-all cursor-pointer flex flex-col items-center gap-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">link</span>
                  <span>حَرْفٌ (Particle)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-primary-fixed/20 text-center mb-6">
              <span className="material-symbols-outlined text-4xl text-primary">verified</span>
              <h3 className="text-lg font-bold text-on-surface mt-2">رائع! لقد أتممت تصنيف جميع الكلمات بنجاح.</h3>
            </div>
          )}

          {/* Quick Words Reference Table */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Nouns Column */}
            <div className="p-3.5 rounded-2xl bg-primary-fixed/20 border border-primary/25">
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-primary/20">
                <span className="text-xs font-extrabold text-primary">الأسْمَاءُ (Nouns)</span>
                <span className="text-[10px] font-mono text-on-surface-variant">مدرستنا، المكاتب...</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {wordClassificationItems.filter((w) => w.type === "noun").map((w) => (
                  <span key={w.id} className="px-2 py-1 rounded-lg bg-surface-container-lowest text-xs font-bold text-on-surface shadow-xs">
                    {formatArabic(w.wordWithTashkeel, w.wordPlain)}
                  </span>
                ))}
              </div>
            </div>

            {/* Verbs Column */}
            <div className="p-3.5 rounded-2xl bg-secondary-fixed/20 border border-secondary/25">
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-secondary/20">
                <span className="text-xs font-extrabold text-secondary">الأَفْعَالُ (Verbs)</span>
                <span className="text-[10px] font-mono text-on-surface-variant">يحترم، يلعب، يشرب...</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {wordClassificationItems.filter((w) => w.type === "verb").map((w) => (
                  <span key={w.id} className="px-2 py-1 rounded-lg bg-surface-container-lowest text-xs font-bold text-on-surface shadow-xs">
                    {formatArabic(w.wordWithTashkeel, w.wordPlain)}
                  </span>
                ))}
              </div>
            </div>

            {/* Particles Column */}
            <div className="p-3.5 rounded-2xl bg-tertiary-fixed/20 border border-tertiary/25">
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-tertiary/20">
                <span className="text-xs font-extrabold text-tertiary">الحُرُوفُ (Particles)</span>
                <span className="text-[10px] font-mono text-on-surface-variant">في، من، على...</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {wordClassificationItems.filter((w) => w.type === "particle").map((w) => (
                  <span key={w.id} className="px-2 py-1 rounded-lg bg-surface-container-lowest text-xs font-bold text-on-surface shadow-xs">
                    {formatArabic(w.wordWithTashkeel, w.wordPlain)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Standardized Section Bottom Navigation */}
          {renderSectionFooter(3)}
        </section>
      )}

      {/* =========================================================================
          SECTION 4: الحصيلة اللغوية ومرافق المدرسة (يوجد في مدرستي)
      ========================================================================= */}
      {activeTab === 4 && (
        <section className="bg-surface-container-lowest rounded-3xl p-space-md sm:p-space-lg shadow-sm border border-surface-container mb-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold text-base shadow-xs">
                ٤
              </div>
              <div>
                <h2 className="text-xl font-black text-on-surface m-0">
                  الحصيلة اللغوية ومرافق المدرسة (يوجد في مدرستي)
                </h2>
                <p className="text-xs text-on-surface-variant m-0">
                  قائمة بمكونات ومرافق المدرسة الأساسية العشرة؛ استمع لنطق كل مرفق وتعرف على ما يحتويه.
                </p>
              </div>
            </div>

            <span className="text-xs text-primary font-bold px-3 py-1 bg-primary/10 rounded-full">
              ١٠ مرافق أساسية
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
            {schoolFacilities.map((fac, idx) => (
              <div
                key={fac.id}
                className="group p-4 rounded-3xl bg-surface-container-low border border-surface-container hover:border-primary/50 transition-all flex flex-col justify-between gap-3 shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center font-bold text-xs font-mono shadow-xs">
                    {idx + 1}
                  </span>
                  <button
                    onClick={() => handlePlayText(`يُوجَدُ فِي مَدْرَسَتِي: ${fac.nameWithTashkeel}`)}
                    className="w-8 h-8 rounded-full bg-surface-container-lowest group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center transition-colors cursor-pointer"
                    type="button"
                    title="استمع للجملة كاملة"
                  >
                    <span className="material-symbols-outlined text-lg">volume_up</span>
                  </button>
                </div>

                <div className="flex flex-col text-right">
                  <span className="text-base font-extrabold text-on-surface">
                    {formatArabic(fac.nameWithTashkeel, fac.namePlain)}
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-medium">
                    {fac.englishMeaning}
                  </span>
                </div>

                <div className="pt-2 border-t border-surface-container/60 text-[10px] text-on-surface-variant">
                  <span className="font-bold text-primary">المحتويات: </span>
                  <span>{fac.itemsFound.slice(0, 2).map((item) => formatArabic(item)).join("، ")}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Standardized Section Bottom Navigation */}
          {renderSectionFooter(4)}
        </section>
      )}

      {/* =========================================================================
          SECTION 5: تدريب الاستيعاب والتذكر (اكتب ماذا يوجد في...)
      ========================================================================= */}
      {activeTab === 5 && (
        <section className="bg-surface-container-lowest rounded-3xl p-space-md sm:p-space-lg shadow-sm border border-surface-container mb-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center font-bold text-base shadow-xs">
                ٥
              </div>
              <div>
                <h2 className="text-xl font-black text-on-surface m-0">
                  تدريب الاستيعاب والتذكر (ماذا يوجد في...)
                </h2>
                <p className="text-xs text-on-surface-variant m-0">
                  حدد العناصر والمحتويات الصحيحة التابعة لكل مرفق بناءً على ما درسته في المشهد المدرسي.
                </p>
              </div>
            </div>
          </div>

          {/* Facility Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4">
            {facilityQuizQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveFacilityQuizIndex(idx);
                  setSelectedFacilityItems([]);
                  setFacilityQuizFeedback(null);
                  playFeedbackSound("tap");
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFacilityQuizIndex === idx
                    ? "bg-secondary text-on-secondary shadow-xs"
                    : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                }`}
                type="button"
              >
                {q.facilityName}
              </button>
            ))}
          </div>

          {/* Current Facility Challenge Box */}
          <div className="p-5 rounded-3xl bg-surface-container-low border border-surface-container text-right mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-secondary text-2xl">help</span>
              <h3 className="text-base font-extrabold text-on-surface m-0">
                ماذا يوجد في «{facilityQuizQuestions[activeFacilityQuizIndex].facilityName}»؟
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant mb-4">
              انقر على الخيارات التي تنتمي بالفعل إلى هذا المرفق:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {facilityQuizQuestions[activeFacilityQuizIndex].options.map((option, idx) => {
                const isSelected = selectedFacilityItems.includes(option);
                return (
                  <button
                    key={idx}
                    onClick={() => handleToggleFacilityItem(option)}
                    className={`p-3 rounded-2xl text-xs font-bold transition-all text-center border cursor-pointer ${
                      isSelected
                        ? "bg-primary text-on-primary border-primary shadow-xs scale-100"
                        : "bg-surface-container-lowest text-on-surface border-surface-container hover:bg-surface-container"
                    }`}
                    type="button"
                  >
                    <span>{formatArabic(option)}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-surface-container">
              <button
                onClick={handleVerifyFacilityQuiz}
                className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs shadow-xs hover:brightness-105 transition-all cursor-pointer"
                type="button"
              >
                تحقق من الإجابة
              </button>

              {facilityQuizFeedback && (
                <span className="text-xs font-bold text-primary">{facilityQuizFeedback}</span>
              )}
            </div>
          </div>

          {/* Standardized Section Bottom Navigation */}
          {renderSectionFooter(5)}
        </section>
      )}

      {/* =========================================================================
          SECTION 6: البنية النحوية والتركيبية (الجملة الاسمية والفعلية)
      ========================================================================= */}
      {activeTab === 6 && (
        <section className="bg-surface-container-lowest rounded-3xl p-space-md sm:p-space-lg shadow-sm border border-surface-container mb-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold text-base shadow-xs">
                ٦
              </div>
              <div>
                <h2 className="text-xl font-black text-on-surface m-0">
                  البنية النحوية والتركيبية: الجملة الاسمية والجملة الفعلية
                </h2>
                <p className="text-xs text-on-surface-variant m-0">
                  فهم أركان الجملة في لغة الضاد؛ المبتدأ والخبر في الاسمية، والفعل والفاعل والمفعول به في الفعلية.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {/* 1. NOMINAL SENTENCE CARD */}
            <div className="p-5 rounded-3xl bg-primary-fixed/20 border border-primary/30 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold">
                  الجُمْلَةُ الاسْمِيَّةُ
                </span>
                <span className="text-xs font-mono text-on-surface-variant font-bold">
                  [ Nominal Sentence ]
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-lowest border border-primary/20 text-center">
                <span className="text-xs text-on-surface-variant font-medium">النموذج القياسي:</span>
                <div className="text-2xl font-black text-primary mt-1">
                  « {showTashkeel ? "مَدْرَسَتُنَا جَمِيلَةٌ" : "مدرستنا جميلة"} »
                </div>
                <div className="flex items-center justify-center gap-2 mt-2 text-xs font-bold">
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800">
                    مَدْرَسَتُنَا = مُبْتَدَأ
                  </span>
                  <span>+</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-800">
                    جَمِيلَةٌ = خَبَر
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
                <div className="p-3 rounded-xl bg-surface-container-lowest">
                  <strong className="text-primary font-bold">المُبْتَدَأُ: </strong>
                  هو الاسم المرفوع الذي يقع في صدر الجملة ونبدأ به الكلام (المحور الرئيسي للحديث).
                </div>
                <div className="p-3 rounded-xl bg-surface-container-lowest">
                  <strong className="text-secondary font-bold">الخَبَرُ: </strong>
                  هو الجزء أو الاسم المرفوع الذي تتم به الفائدة مع المبتدأ وبه يكتمل المعنى.
                </div>
              </div>

              <button
                onClick={() => handlePlayText("مَدْرَسَتُنَا جَمِيلَةٌ. مَدْرَسَتُنَا مُبْتَدَأٌ، وَجَمِيلَةٌ خَبَرٌ.")}
                className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:brightness-105 transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-base">volume_up</span>
                <span>استمع للتحليل الصوتي</span>
              </button>
            </div>

            {/* 2. VERBAL SENTENCE CARD */}
            <div className="p-5 rounded-3xl bg-secondary-fixed/20 border border-secondary/30 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary text-xs font-bold">
                  الجُمْلَةُ الفِعْلِيَّةُ
                </span>
                <span className="text-xs font-mono text-on-surface-variant font-bold">
                  [ Verbal Sentence ]
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-lowest border border-secondary/20 text-center">
                <span className="text-xs text-on-surface-variant font-medium">النموذج القياسي:</span>
                <div className="text-2xl font-black text-secondary mt-1">
                  « {showTashkeel ? "أُحِبُّ مَدْرَسَتِي" : "أحب مدرستي"} »
                </div>
                <div className="flex items-center justify-center gap-2 mt-2 text-xs font-bold flex-wrap">
                  <span className="px-2 py-0.5 rounded-lg bg-red-100 text-red-800">
                    أُحِبُّ = فِعْل
                  </span>
                  <span>+</span>
                  <span className="px-2 py-0.5 rounded-lg bg-purple-100 text-purple-800">
                    (أَنَا) = فَاعِل
                  </span>
                  <span>+</span>
                  <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800">
                    مَدْرَسَتِي = مَفْعُول بِهِ
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
                <div className="p-2.5 rounded-xl bg-surface-container-lowest">
                  <strong className="text-red-600 font-bold">الفِعْلُ: </strong>
                  الحدث المقترن بزمن محدد (ماضٍ، مضارع، أو أمر).
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-lowest">
                  <strong className="text-purple-600 font-bold">الفَاعِلُ: </strong>
                  هو من قام بالفعل أو اتصف به (اسم مرفوع أو ضمير).
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-lowest">
                  <strong className="text-amber-600 font-bold">المَفْعُولُ بِهِ: </strong>
                  هو الاسم المنصوب الذي وقع عليه فعل الفاعل.
                </div>
              </div>

              <button
                onClick={() => handlePlayText("أُحِبُّ مَدْرَسَتِي. أُحِبُّ فِعْلٌ، وَالفَاعِلُ أَنَا، وَمَدْرَسَتِي مَفْعُولٌ بِهِ.")}
                className="w-full py-2.5 rounded-xl bg-secondary text-on-secondary font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:brightness-105 transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-base">volume_up</span>
                <span>استمع للتحليل الصوتي</span>
              </button>
            </div>
          </div>

          {/* Standardized Section Bottom Navigation */}
          {renderSectionFooter(6)}
        </section>
      )}

      {/* =========================================================================
          SECTION 7: المطابقة بين التذكير والتأنيث + تعريف أقسام الكلمة
      ========================================================================= */}
      {activeTab === 7 && (
        <section className="bg-surface-container-lowest rounded-3xl p-space-md sm:p-space-lg shadow-sm border border-surface-container mb-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-base shadow-xs">
                ٧
              </div>
              <div>
                <h2 className="text-xl font-black text-on-surface m-0">
                  المطابقة بين التذكير والتأنيث + تعريف أقسام الكلمة
                </h2>
                <p className="text-xs text-on-surface-variant m-0">
                  جدول التحويل بين المذكر والمؤنث للوظائف المدرسية السبع والقواعد النحوية الصريحة.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-full border border-surface-container text-xs font-bold">
              <button
                onClick={() => setGenderPracticeMode("table")}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  genderPracticeMode === "table" ? "bg-surface-container-lowest text-primary shadow-xs" : "text-on-surface-variant"
                }`}
                type="button"
              >
                جدول التحويل (٧ وظائف)
              </button>
              <button
                onClick={() => setGenderPracticeMode("quiz")}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  genderPracticeMode === "quiz" ? "bg-surface-container-lowest text-secondary shadow-xs" : "text-on-surface-variant"
                }`}
                type="button"
              >
                تحدي التحويل
              </button>
            </div>
          </div>

          {genderPracticeMode === "table" ? (
            <>
              {/* 7 Professions Gender Conversion Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
                {genderProfessionPairs.map((pair) => (
                  <div
                    key={pair.id}
                    className="p-4 rounded-3xl bg-surface-container-low border border-surface-container flex flex-col justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-primary text-xl">
                        {pair.icon}
                      </span>
                      <span className="text-[10px] font-mono text-on-surface-variant font-bold">
                        {pair.englishTitle}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-2xl bg-surface-container-lowest border border-surface-container text-center">
                      {/* Masculine */}
                      <button
                        onClick={() => handlePlayText(pair.masculineWithTashkeel)}
                        className="flex-1 p-1.5 rounded-xl hover:bg-primary-fixed/20 transition-colors text-right cursor-pointer"
                        type="button"
                      >
                        <span className="text-[10px] text-primary font-bold block">مُذَكَّر ♂</span>
                        <span className="text-sm font-extrabold text-on-surface">
                          {formatArabic(pair.masculineWithTashkeel, pair.masculinePlain)}
                        </span>
                      </button>

                      <span className="material-symbols-outlined text-outline text-base">
                        swap_horiz
                      </span>

                      {/* Feminine */}
                      <button
                        onClick={() => handlePlayText(pair.feminineWithTashkeel)}
                        className="flex-1 p-1.5 rounded-xl hover:bg-secondary-fixed/20 transition-colors text-right cursor-pointer"
                        type="button"
                      >
                        <span className="text-[10px] text-secondary font-bold block">مُؤَنَّث ♀</span>
                        <span className="text-sm font-extrabold text-on-surface">
                          {formatArabic(pair.feminineWithTashkeel, pair.femininePlain)}
                        </span>
                      </button>
                    </div>

                    <p className="text-[11px] text-on-surface-variant m-0 leading-relaxed">
                      {pair.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Grammar Definition Rules Box (Strictly per user prompt) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-3xl bg-surface-container-low border border-surface-container">
                {/* Gender Rule */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">gavel</span>
                    القاعدة النحوية للمذكر والمؤنث:
                  </span>
                  <div className="p-3 rounded-2xl bg-surface-container-lowest text-xs text-on-surface-variant space-y-1.5 leading-relaxed">
                    <div>
                      <strong className="text-on-surface font-bold">المُذَكَّرُ: </strong>
                      اسم يدل على ذكر حقيقة أو مجازاً (مثل: المدير، المدرس، الطالب).
                    </div>
                    <div>
                      <strong className="text-on-surface font-bold">المُؤَنَّثُ: </strong>
                      اسم يدل على أنثى، ويميز غالباً بالتاء المربوطة (مثل: المديرة، المدرسة، الطالبة).
                    </div>
                  </div>
                </div>

                {/* Parts of Speech Definitions */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-secondary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">menu_book</span>
                    تعريف أقسام الكلمة الثلاثة:
                  </span>
                  <div className="p-3 rounded-2xl bg-surface-container-lowest text-xs text-on-surface-variant space-y-1.5 leading-relaxed">
                    <div>
                      <strong className="text-primary font-bold">الاسْمُ: </strong>
                      الكلمة الدالة على معنى مجرد من الزمن (مثل: مدرستنا، المكاتب).
                    </div>
                    <div>
                      <strong className="text-secondary font-bold">الفِعْلُ: </strong>
                      الكلمة الدالة على حدث مقترن بزمن (مثل: يحترم، يلعب، يشرب).
                    </div>
                    <div>
                      <strong className="text-tertiary font-bold">الحَرْفُ: </strong>
                      الكلمة التي تدل على معنى في غيرها ولا يكتمل إلا مع غيرها (مثل: في، من، على).
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Interactive Gender Transformation Drill */
            <div className="p-6 rounded-3xl bg-surface-container-low border border-surface-container text-center max-w-lg mx-auto">
              <span className="text-xs font-bold text-on-surface-variant">حوّل المهنة إلى المؤنث:</span>
              <div className="text-3xl font-black text-on-surface my-3">
                {formatArabic(genderProfessionPairs[genderQuizIndex].masculineWithTashkeel)}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  genderProfessionPairs[genderQuizIndex].feminineWithTashkeel,
                  genderProfessionPairs[(genderQuizIndex + 1) % genderProfessionPairs.length].feminineWithTashkeel,
                ].sort().map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (opt === genderProfessionPairs[genderQuizIndex].feminineWithTashkeel) {
                        playFeedbackSound("success");
                        addPoints(10);
                        setGenderQuizAnswer("صحيح! أحسنت.");
                        setTimeout(() => {
                          setGenderQuizAnswer(null);
                          setGenderQuizIndex((prev) => (prev + 1) % genderProfessionPairs.length);
                        }, 1200);
                      } else {
                        playFeedbackSound("error");
                        setGenderQuizAnswer("حاول مرة أخرى!");
                      }
                    }}
                    className="p-3 rounded-2xl bg-surface-container-lowest hover:bg-primary hover:text-white border border-surface-container font-extrabold text-sm transition-all cursor-pointer"
                    type="button"
                  >
                    {formatArabic(opt)}
                  </button>
                ))}
              </div>

              {genderQuizAnswer && (
                <span className="text-xs font-bold text-primary">{genderQuizAnswer}</span>
              )}
            </div>
          )}

          {/* Standardized Section Bottom Navigation */}
          {renderSectionFooter(7)}
        </section>
      )}

      {/* =========================================================================
          SECTION 8: الفصل الدراسي وتطبيق ظروف المكان (الاتجاهات والمواقع)
      ========================================================================= */}
      {activeTab === 8 && (
        <section className="bg-surface-container-lowest rounded-3xl p-space-md sm:p-space-lg shadow-sm border border-surface-container mb-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold text-base shadow-xs">
                ٨
              </div>
              <div>
                <h2 className="text-xl font-black text-on-surface m-0">
                  الفصل الدراسي وتطبيق ظروف المكان (الاتجاهات والمواقع)
                </h2>
                <p className="text-xs text-on-surface-variant m-0">
                  رسم توضيحي لتوزيع الفصل: المدرس عند المنصة والسبورة وأمامه صفوف الطلاب؛ وتوظيف ظروف المكان الستة.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Classroom Seat Diagram */}
          <div className="relative w-full rounded-3xl bg-gradient-to-b from-surface-container-high to-surface-container p-6 sm:p-8 mb-6 border border-surface-container shadow-inner text-center">
            {/* Front Wall: Blackboard */}
            <div className="max-w-md mx-auto p-3.5 rounded-2xl bg-slate-900 text-white font-mono font-bold text-sm shadow-md mb-4 border-4 border-amber-800">
              <span className="material-symbols-outlined text-emerald-400 text-base align-middle ml-1">tv</span>
              <span>السَّبُّورَةُ المَدْرَسِيَّةُ (خَلْفَ المُدَرِّسِ)</span>
            </div>

            {/* Ceiling Fan Indicator */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-xs font-bold text-primary shadow-xs mb-4">
              <span className="material-symbols-outlined text-base animate-spin">mode_fan</span>
              <span>المِرْوَحَةُ (فَوْقَ الطُّلَّابِ)</span>
            </div>

            {/* Teacher Platform & Desk */}
            <div className="max-w-xs mx-auto p-3 rounded-2xl bg-primary text-on-primary font-bold text-xs shadow-md mb-6 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">school</span>
              <span>مِنَصَّةُ وَمَكْتَبُ المُعَلِّمِ (يَقِفُ مُوَاجِهاً لِلصَّفِّ)</span>
            </div>

            {/* Student Rows (Divided by Gender & Location relative to teacher) */}
            <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
              {/* Right of teacher: Boys */}
              <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 text-right">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-blue-900">صَفُّ الطُّلَّابِ (الذُّكُور)</span>
                  <span className="px-2 py-0.5 rounded bg-blue-200 text-blue-900 text-[10px] font-bold">
                    يَمِينَ المُدَرِّس
                  </span>
                </div>
                <div className="space-y-1 text-xs text-blue-800 font-medium">
                  <div>🪑 الكَرَاسِي (تَحْتَ الطُّلَّابِ)</div>
                  <div>👀 الطُّلَّابُ (أَمَامَ المُدَرِّسِ)</div>
                </div>
              </div>

              {/* Left of teacher: Girls */}
              <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-right">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-rose-900">صَفُّ الطَّالِبَاتِ (الإِنَاث)</span>
                  <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-900 text-[10px] font-bold">
                    يَسَارَ المُدَرِّس
                  </span>
                </div>
                <div className="space-y-1 text-xs text-rose-800 font-medium">
                  <div>🪑 الكَرَاسِي (تَحْتَ الطَّالِبَاتِ)</div>
                  <div>👀 الطَّالِبَاتُ (أَمَامَ المُدَرِّسِ)</div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Spatial Sentences Cards (Strictly per user prompt) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {spatialDirectionSentences.map((sp) => (
              <div
                key={sp.id}
                className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col justify-between gap-2.5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-xs font-bold font-mono">
                    ظرف: {sp.preposition}
                  </span>
                  <button
                    onClick={() => handlePlayText(sp.arabicWithTashkeel)}
                    className="w-8 h-8 rounded-full bg-surface-container-lowest hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">volume_up</span>
                  </button>
                </div>

                <div className="flex flex-col text-right">
                  <span className="text-lg font-black text-on-surface">
                    {formatArabic(sp.arabicWithTashkeel, sp.arabicPlain)}
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium mt-0.5">
                    “{sp.englishTranslation}”
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-surface-container/60 text-[11px] text-on-surface-variant">
                  <span>الموقع: {sp.subject}</span>
                  <span className="text-primary font-bold">بالنسبة لـ: {sp.referencePoint}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Standardized Section Bottom Navigation */}
          {renderSectionFooter(8)}
        </section>
      )}

      {/* =========================================================================
          SECTION 9: تدريب نسبي على الاتجاهات المكانية (Perspective & Relativity Quiz)
      ========================================================================= */}
      {activeTab === 9 && (
        <section className="bg-surface-container-lowest rounded-3xl p-space-md sm:p-space-lg shadow-sm border border-surface-container mb-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-surface-container">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center font-bold text-base shadow-xs">
                ٩
              </div>
              <div>
                <h2 className="text-xl font-black text-on-surface m-0">
                  تدريب نسبي على الاتجاهات المكانية (بحسب وجهة النظر)
                </h2>
                <p className="text-xs text-on-surface-variant m-0">
                  تمرين تحليلي لاختبار فهم المنظور: موقع العنصر (بالنسبة للطلاب) مقابل (بالنسبة للمدرس).
                </p>
              </div>
            </div>

            {perspectiveSubmitted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-on-primary text-xs font-bold">
                <span className="material-symbols-outlined text-base">emoji_events</span>
                <span>النتيجة: {perspectiveScore} من {perspectiveQuestions.length}</span>
              </div>
            )}
          </div>

          {/* Perspective Questions List */}
          <div className="space-y-4 mb-6">
            {perspectiveQuestions.map((q, idx) => {
              const selectedOption = perspectiveAnswers[q.id];
              const isCorrect = perspectiveSubmitted && selectedOption === q.correctAnswer;
              const isWrong = perspectiveSubmitted && selectedOption && selectedOption !== q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-3xl border transition-all text-right ${
                    isCorrect
                      ? "bg-emerald-50/70 border-emerald-400"
                      : isWrong
                      ? "bg-rose-50/70 border-rose-400"
                      : "bg-surface-container-low border-surface-container"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
                      وجهة النظر: {q.perspectiveTarget}
                    </span>
                    <span className="text-xs font-bold text-on-surface-variant">
                      سؤال {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-on-surface mb-3">
                    {formatArabic(q.questionText)}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                    {q.options.map((opt, i) => {
                      const isOptionSelected = selectedOption === opt;
                      return (
                        <button
                          key={i}
                          onClick={() => handlePerspectiveSelect(q.id, opt)}
                          disabled={perspectiveSubmitted}
                          className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer ${
                            isOptionSelected
                              ? "bg-primary text-on-primary border-primary shadow-xs"
                              : "bg-surface-container-lowest text-on-surface border-surface-container hover:bg-surface-container"
                          }`}
                          type="button"
                        >
                          {formatArabic(opt)}
                        </button>
                      );
                    })}
                  </div>

                  {perspectiveSubmitted && (
                    <div className="mt-2 p-2.5 rounded-xl bg-surface-container-lowest text-xs text-on-surface-variant flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-primary">info</span>
                      <span>{q.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submission and Celebration */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface">
              <span className="material-symbols-outlined text-primary text-lg">verified</span>
              <span>
                {perspectiveSubmitted
                  ? `أحسنت! أتممت بنجاح التدريب التحليلي لمرحلة «مدرستي وفصلي».`
                  : `أجب عن جميع الأسئلة ثم انقر على تصحيح التحدي.`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!perspectiveSubmitted ? (
                <button
                  onClick={handleGradePerspectiveQuiz}
                  className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs shadow-xs hover:brightness-105 transition-all cursor-pointer"
                  type="button"
                >
                  تصحيح وحساب النتيجة
                </button>
              ) : (
                <Link
                  href="/levels"
                  className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs shadow-xs hover:brightness-105 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>استعراض التقدم في خارطة المستويات</span>
                  <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                </Link>
              )}
            </div>
          </div>

          {/* Standardized Section Bottom Navigation */}
          {renderSectionFooter(9)}
        </section>
      )}
    </div>
  );
}
