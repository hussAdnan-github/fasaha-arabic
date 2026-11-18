"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLearning } from "@/context/LearningContext";

interface StageOperationsNavProps {
  compact?: boolean;
}

export default function StageOperationsNav({ compact = false }: StageOperationsNavProps) {
  const pathname = usePathname();
  const { formatArabic, playFeedbackSound } = useLearning();

  const isStage2 = pathname.startsWith("/stage-2");

  // Stage 1 operations
  const stage1Operations = [
    {
      id: "vocab",
      number: 1,
      title: "المفردات المصورة",
      englishTitle: "Vocabulary",
      href: "/vocabulary",
      icon: "menu_book",
    },
    {
      id: "family",
      number: 2,
      title: "أفراد الأسرة والإشارة",
      englishTitle: "Family & Demonstratives",
      href: "/family-and-gender",
      icon: "group",
    },
    {
      id: "grammar",
      number: 3,
      title: "سلم القواعد: النحو",
      englishTitle: "Grammar Ladder",
      href: "/grammar-ladder",
      icon: "stairs",
    },
    {
      id: "dialogue",
      number: 4,
      title: "المحادثة اليومية",
      englishTitle: "Daily Dialogue",
      href: "/daily-dialogue",
      icon: "forum",
    },
    {
      id: "practice",
      number: 5,
      title: "التمارين التفاعلية",
      englishTitle: "Interactive Practice",
      href: "/interactive-practice",
      icon: "sports_esports",
    },
  ];

  const currentOpIndex = stage1Operations.findIndex((op) => op.href === pathname);
  const currentOp = currentOpIndex !== -1 ? stage1Operations[currentOpIndex] : null;
  const prevOp = currentOpIndex > 0 ? stage1Operations[currentOpIndex - 1] : null;
  const nextOp = currentOpIndex !== -1 && currentOpIndex < stage1Operations.length - 1
    ? stage1Operations[currentOpIndex + 1]
    : null;

  return (
    <div className="w-full mb-space-md">
      {/* 1. Main Stage Breadcrumb & Controls Bar */}
      <div className="rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs p-3 sm:px-4 sm:py-2.5 mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Main Context Hierarchy Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant flex-wrap font-medium">
            <Link
              href="/"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-colors"
              title="العودة إلى لوحة تحكم المستوى الأول"
            >
              <span className="material-symbols-outlined text-[15px]">layers</span>
              <span>{formatArabic("المستوى الأول")}</span>
            </Link>

            <span className="material-symbols-outlined text-[13px] text-on-surface-variant/60">
              arrow_back_ios
            </span>

            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold ${
                isStage2
                  ? "bg-secondary-fixed text-on-secondary-fixed"
                  : "bg-surface-container text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">
                {isStage2 ? "school" : "home"}
              </span>
              <span>
                {isStage2
                  ? formatArabic("المرحلة الثانية: مدرستي وفصلي")
                  : formatArabic("المرحلة الأولى: أسرتي وبيتي")}
              </span>
            </span>

            {currentOp && (
              <>
                <span className="material-symbols-outlined text-[13px] text-on-surface-variant/60">
                  arrow_back_ios
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-surface-container-high text-primary font-bold">
                  <span>الدرس {currentOp.number}:</span>
                  <span>{currentOp.title}</span>
                </span>
              </>
            )}
          </div>

          {/* Quick Stage 1 / Stage 2 Switcher Tabs */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <Link
              href="/vocabulary"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                !isStage2
                  ? "bg-primary-container text-on-primary-container border-primary shadow-xs"
                  : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant border-surface-container"
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">home</span>
              <span>المرحلة الأولى</span>
              <span className="text-[10px] px-1 rounded bg-primary-fixed text-on-primary-fixed">٥ دروس</span>
            </Link>

            <Link
              href="/stage-2"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                isStage2
                  ? "bg-secondary-container text-on-secondary-container border-secondary shadow-xs"
                  : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant border-surface-container"
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">school</span>
              <span>المرحلة الثانية</span>
              <span className="text-[10px] px-1 rounded bg-secondary-fixed text-on-secondary-fixed">٩ أقسام</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Linear Step Progress Track (Shown on Stage 1 lesson pages) */}
      {!compact && !isStage2 && (
        <div className="rounded-2xl bg-surface-container-low/70 border border-surface-container p-2 sm:p-2.5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            {/* Step Pills 1 -> 5 */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-0.5 no-scrollbar">
              {stage1Operations.map((op) => {
                const isActive = pathname === op.href;
                return (
                  <Link
                    key={op.id}
                    href={op.href}
                    onClick={() => playFeedbackSound("tap")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-primary text-on-primary shadow-sm ring-2 ring-primary/30"
                        : "bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-on-surface border border-surface-container"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-surface-container-high text-on-surface-variant"
                      }`}
                    >
                      {op.number}
                    </span>
                    <span>{op.title}</span>
                  </Link>
                );
              })}
            </div>

            {/* Previous / Next Quick Jumps */}
            <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
              {prevOp ? (
                <Link
                  href={prevOp.href}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-bold border border-surface-container transition-all"
                  title={`السابق: ${prevOp.title}`}
                >
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  <span className="hidden md:inline">السابق</span>
                </Link>
              ) : (
                <span className="text-on-surface-variant/40 text-xs px-2 select-none">البداية</span>
              )}

              {nextOp ? (
                <Link
                  href={nextOp.href}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-xs hover:bg-primary-container transition-all"
                  title={`التالي: ${nextOp.title}`}
                >
                  <span>التالي</span>
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                </Link>
              ) : (
                <Link
                  href="/stage-2"
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-secondary text-on-secondary text-xs font-bold shadow-xs hover:brightness-105 transition-all"
                >
                  <span>المرحلة ٢</span>
                  <span className="material-symbols-outlined text-sm">school</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
