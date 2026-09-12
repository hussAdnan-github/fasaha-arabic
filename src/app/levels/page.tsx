"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLearning } from "@/context/LearningContext";
import { LevelItem } from "@/data/levelsData";

export default function LevelsPage() {
  const {
    showTashkeel,
    formatArabic,
    currentLevelId,
    currentLevel,
    setCurrentLevelId,
    levels,
    unlockedLevels,
    points,
    streakDays,
    playFeedbackSound,
    playPronunciation,
  } = useLearning();

  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedLevelDetails, setSelectedLevelDetails] = useState<LevelItem | null>(null);

  const filteredLevels =
    selectedFilter === "all"
      ? levels
      : levels.filter((lvl) => lvl.id === selectedFilter);

  const handleSelectLevel = (levelId: string) => {
    if (!unlockedLevels.includes(levelId)) {
      playFeedbackSound("error");
      return;
    }
    setCurrentLevelId(levelId);
  };

  const handlePlayWord = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    playFeedbackSound("tap");
    playPronunciation(word);
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* 1. Hero Header & Gamification Bar */}
      <section className="relative rounded-3xl bg-surface-container-lowest p-space-md sm:p-space-lg shadow-sm overflow-hidden mb-space-lg border border-surface-container">
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-primary-fixed/20 pointer-events-none blur-3xl" />
        <div className="absolute top-1/3 -right-12 w-48 h-48 rounded-full bg-secondary-fixed/20 pointer-events-none blur-2xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-lg">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant flex-wrap">
              <Link href="/" className="text-primary font-bold hover:underline">
                الرئيسية
              </Link>
              <span className="material-symbols-outlined text-[14px]">arrow_back_ios</span>
              <span className="text-on-surface-variant font-medium">المنهج التعليمي</span>
              <span className="material-symbols-outlined text-[14px]">arrow_back_ios</span>
              <span className="text-secondary font-bold">خارطة المستويات</span>
            </div>

            <div className="flex items-baseline gap-space-sm flex-wrap mt-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface m-0 tracking-tight">
                {showTashkeel
                  ? "خَارِطَةُ المَسَارِ وَالمُسْتَوَيَاتِ التَّعْلِيمِيَّة"
                  : "خارطة المسار والمستويات التعليمية"}
              </h1>
              <span className="text-xs font-bold text-on-surface-variant tracking-wide font-mono">
                [ Curriculum Roadmap • CEFR A1 → B2 ]
              </span>
            </div>

            <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed mt-1">
              تدرج متزن في رحاب لغة الضاد؛ من الحروف والكلمات الأساسية للأسرة والبيت إلى الطلاقة الكاملة وفنون البلاغة والأدب.
            </p>
          </div>

          {/* User Progress Ribbon */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center bg-surface-container-low/80 p-2 rounded-2xl border border-surface-container">
            {/* Active Level Badge */}
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-lowest rounded-xl shadow-xs">
              <span className="material-symbols-outlined text-primary text-xl">
                layers
              </span>
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-on-surface-variant font-medium">
                  المستوى النشط
                </span>
                <span className="text-xs font-bold text-primary">
                  {formatArabic(currentLevel.titleArabic.split(":")[0])}
                </span>
              </div>
            </div>

            {/* Total XP */}
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-lowest rounded-xl shadow-xs">
              <span className="material-symbols-outlined text-tertiary text-xl">
                diamond
              </span>
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-on-surface-variant font-medium">
                  مجموع النقاط
                </span>
                <span className="text-xs font-bold text-on-tertiary-fixed">
                  {points} XP
                </span>
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-lowest rounded-xl shadow-xs">
              <span className="material-symbols-outlined text-secondary-container text-xl">
                local_fire_department
              </span>
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-on-surface-variant font-medium">
                  شعلة الالتزام
                </span>
                <span className="text-xs font-bold text-on-secondary-fixed">
                  {streakDays} أيام
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Level Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-space-lg scrollbar-none">
        <button
          onClick={() => {
            setSelectedFilter("all");
            playFeedbackSound("tap");
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            selectedFilter === "all"
              ? "bg-primary text-on-primary shadow-[0_2px_0_#005137]"
              : "bg-surface-container text-on-surface hover:bg-surface-container-high"
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-base">view_carousel</span>
          <span>جميع المستويات ({levels.length})</span>
        </button>

        {levels.map((lvl) => {
          const isSelected = selectedFilter === lvl.id;
          const isUnlocked = unlockedLevels.includes(lvl.id);

          return (
            <button
              key={lvl.id}
              onClick={() => {
                setSelectedFilter(lvl.id);
                playFeedbackSound("tap");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-primary text-on-primary shadow-[0_2px_0_#005137]"
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high"
              }`}
              type="button"
            >
              <span>{lvl.number}.</span>
              <span>{formatArabic(lvl.titleArabic.split(":")[0])}</span>
              <span className="text-[10px] font-mono opacity-80 font-normal">
                ({lvl.code.split("•")[0].trim()})
              </span>
              {!isUnlocked && (
                <span className="material-symbols-outlined text-[13px] opacity-70">
                  lock
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Detailed Curriculum Levels List */}
      <div className="flex flex-col gap-space-xl">
        {filteredLevels.map((lvl) => {
          const isCurrent = lvl.id === currentLevelId;
          const isUnlocked = unlockedLevels.includes(lvl.id);

          return (
            <div
              key={lvl.id}
              className={`relative rounded-3xl p-space-md sm:p-space-lg transition-all border ${
                isCurrent
                  ? "bg-surface-container-lowest border-primary shadow-md ring-2 ring-primary/20"
                  : isUnlocked
                  ? "bg-surface-container-lowest border-surface-container shadow-xs hover:shadow-sm"
                  : "bg-surface-container-low/60 border-surface-container/60 opacity-85"
              }`}
            >
              {/* Level Header Ribbon */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-md mb-space-md border-b border-surface-container">
                <div className="flex items-center gap-space-md">
                  {/* Big Number Badge */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold shadow-xs shrink-0 ${
                      isCurrent
                        ? "bg-primary text-on-primary shadow-[0_3px_0_#005137]"
                        : isUnlocked
                        ? "bg-secondary-fixed text-on-secondary-fixed"
                        : "bg-surface-container-high text-outline"
                    }`}
                  >
                    <span className="text-xl font-extrabold">{lvl.number}</span>
                    <span className="text-[9px] uppercase tracking-tighter opacity-80">
                      {lvl.code.split("•")[0].trim()}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface m-0">
                        {formatArabic(lvl.titleArabic)}
                      </h2>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${lvl.badgeBg}`}>
                        {lvl.code}
                      </span>
                    </div>
                    <span className="text-xs text-on-surface-variant font-medium mt-0.5">
                      {formatArabic(lvl.subtitle)} • {lvl.titleEnglish}
                    </span>
                  </div>
                </div>

                {/* Status and Action Buttons */}
                <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
                  {isCurrent ? (
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30 text-xs font-bold shadow-xs">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      <span>المستوى النشط حالياً</span>
                    </div>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => handleSelectLevel(lvl.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container hover:brightness-105 font-bold text-xs shadow-[0_3px_0_#855300] active:translate-y-0.5 transition-all cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base">swap_horiz</span>
                      <span>التبديل إلى هذا المستوى</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container text-outline text-xs font-medium">
                      <span className="material-symbols-outlined text-base">lock</span>
                      <span>{lvl.lockReason || "مغلق حالياً"}</span>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setSelectedLevelDetails(lvl);
                      playFeedbackSound("tap");
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-semibold border border-surface-container transition-colors cursor-pointer"
                    type="button"
                    title="تفاصيل الكفايات والأهداف"
                  >
                    <span className="material-symbols-outlined text-base">info</span>
                    <span>تفاصيل</span>
                  </button>
                </div>
              </div>

              {/* Description paragraph */}
              <p className="text-sm text-on-surface-variant leading-relaxed mb-space-md max-w-4xl">
                {lvl.description}
              </p>

              {/* Progress Bar & Stats */}
              <div className="bg-surface-container-low p-3 sm:p-4 rounded-2xl mb-space-md border border-surface-container">
                <div className="flex items-center justify-between text-xs font-bold text-on-surface mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-base">
                      trending_up
                    </span>
                    <span>معدل إنجاز المستوى:</span>
                    <span className="text-primary font-extrabold">{lvl.progressPercent}٪</span>
                  </div>
                  <span className="text-on-surface-variant font-mono">
                    {lvl.completedLessons} من {lvl.totalLessons} دروس منجزة
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden p-[1px] shadow-inner">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-700 shadow-sm"
                    style={{ width: `${lvl.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* LEVEL 1: UNITS & ACTUAL LESSONS SHOWCASE */}
              {lvl.id === "level-1" && lvl.units[0] && (
                <div className="mt-space-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-base">
                        menu_book
                      </span>
                      دروس الوحدة الأولى المتاحة للدراسة المباشرة:
                    </span>
                    <span className="text-xs text-primary font-bold">
                      {lvl.units[0].titleArabic} • {lvl.units[0].titleEnglish}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {lvl.units[0].lessons.map((lesson, idx) => (
                      <Link
                        key={lesson.id}
                        href={lesson.href}
                        className={`group p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          lesson.completed
                            ? "bg-surface-container-lowest hover:bg-surface-container-low border-surface-container hover:border-primary/40 shadow-xs"
                            : "bg-primary/5 border-primary/30 shadow-xs hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                              lesson.completed
                                ? "bg-primary-fixed/40 text-primary"
                                : "bg-primary text-on-primary shadow-xs"
                            }`}
                          >
                            <span className="material-symbols-outlined text-xl">
                              {lesson.icon}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-on-surface-variant font-mono">
                                درس {idx + 1}
                              </span>
                              <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                                {formatArabic(lesson.titleArabic)}
                              </span>
                            </div>
                            <span className="text-[11px] text-on-surface-variant">
                              {lesson.titleEnglish}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {lesson.completed ? (
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                              ✓
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold animate-pulse">
                              ابدأ
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* LEVEL 2, 3, 4: PREVIEW COMPETENCIES & SAMPLE VOCABULARY */}
              {lvl.id !== "level-1" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-space-md pt-space-md border-t border-surface-container">
                  {/* Target Competencies */}
                  <div className="flex flex-col gap-2 bg-surface-container-low/50 p-3.5 rounded-2xl border border-surface-container">
                    <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-base">
                        verified
                      </span>
                      الكفايات اللغوية المستهدفة في هذا المستوى:
                    </span>
                    <ul className="m-0 p-0 pr-4 list-disc text-xs text-on-surface-variant flex flex-col gap-1">
                      {lvl.previewCompetencies.map((comp, i) => (
                        <li key={i}>{comp}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Sample Vocabulary with Audio Pronunciation */}
                  {lvl.sampleVocab && lvl.sampleVocab.length > 0 && (
                    <div className="flex flex-col gap-2 bg-surface-container-low/50 p-3.5 rounded-2xl border border-surface-container">
                      <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-tertiary text-base">
                          volume_up
                        </span>
                        نماذج كلمات هذا المستوى (انقر للاستماع للنطق):
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {lvl.sampleVocab.map((v, i) => (
                          <button
                            key={i}
                            onClick={(e) => handlePlayWord(e, v.word)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-primary-fixed/25 border border-surface-container hover:border-primary/40 text-xs font-bold text-on-surface transition-all cursor-pointer shadow-xs active:scale-95"
                            type="button"
                            title="استمع للنطق الفصيح"
                          >
                            <span className="text-primary font-extrabold">
                              {formatArabic(v.word)}
                            </span>
                            <span className="text-[10px] text-on-surface-variant font-normal">
                              ({v.meaning})
                            </span>
                            <span className="material-symbols-outlined text-[14px] text-primary/70">
                              play_circle
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Level Details Modal Drawer */}
      {selectedLevelDetails && (
        <div
          onClick={() => setSelectedLevelDetails(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-surface-container flex flex-col gap-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-lg">
                  {selectedLevelDetails.number}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-on-surface m-0">
                    {formatArabic(selectedLevelDetails.titleArabic)}
                  </h3>
                  <span className="text-xs text-on-surface-variant font-mono">
                    {selectedLevelDetails.code}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLevelDetails(null)}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed m-0">
              {selectedLevelDetails.description}
            </p>

            <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-2xl border border-surface-container">
              <span className="text-xs font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-base">military_tech</span>
                الوسام المستحق عند الإتمام:
              </span>
              <span className="text-sm font-bold text-on-surface">
                {selectedLevelDetails.badge}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-on-surface">
                الكفايات والمهارات المكتسبة:
              </span>
              <ul className="m-0 p-0 pr-4 list-disc text-xs text-on-surface-variant flex flex-col gap-1">
                {selectedLevelDetails.previewCompetencies.map((comp, i) => (
                  <li key={i}>{comp}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-surface-container flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedLevelDetails(null)}
                className="px-5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors cursor-pointer"
                type="button"
              >
                إغلاق
              </button>
              {unlockedLevels.includes(selectedLevelDetails.id) && (
                <button
                  onClick={() => {
                    handleSelectLevel(selectedLevelDetails.id);
                    setSelectedLevelDetails(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm hover:brightness-105 transition-all cursor-pointer"
                  type="button"
                >
                  تعيين كمستوى نشط
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
