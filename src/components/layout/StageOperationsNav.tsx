"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLearning } from "@/context/LearningContext";

export default function StageOperationsNav() {
  const pathname = usePathname();
  const { playFeedbackSound } = useLearning();

  const isStage2 = pathname.startsWith("/stage-2");

  // Stage 1 operations (5 focused lessons)
  const stage1Operations = [
    { id: "vocab", number: 1, title: "المفردات المصورة", shortTitle: "المفردات", href: "/vocabulary", icon: "menu_book" },
    { id: "family", number: 2, title: "أفراد الأسرة والإشارة", shortTitle: "الأسرة", href: "/family-and-gender", icon: "home" },
    { id: "grammar", number: 3, title: "سلم القواعد: النحو", shortTitle: "القواعد", href: "/grammar-ladder", icon: "stairs" },
    { id: "dialogue", number: 4, title: "المحادثة اليومية", shortTitle: "المحادثة", href: "/daily-dialogue", icon: "forum" },
    { id: "practice", number: 5, title: "التمارين التفاعلية", shortTitle: "التمارين", href: "/interactive-practice", icon: "sports_esports" },
  ];

  const currentOpIndex = stage1Operations.findIndex((op) => op.href === pathname);
  const currentOp = currentOpIndex !== -1 ? stage1Operations[currentOpIndex] : null;
  const prevOp = currentOpIndex > 0 ? stage1Operations[currentOpIndex - 1] : null;
  const nextOp = currentOpIndex !== -1 && currentOpIndex < stage1Operations.length - 1
    ? stage1Operations[currentOpIndex + 1]
    : null;

  return (
    <div className="w-full mb-3 sm:mb-4">
      {/* Sleek Compact Bar */}
      <div className="rounded-2xl bg-surface-container-lowest border border-surface-container shadow-2xs p-2 sm:px-4 sm:py-2 flex items-center justify-between gap-2">
        {/* Breadcrumb Left */}
        <div className="flex items-center gap-1.5 text-xs">
          <Link
            href="/"
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-bold transition-colors"
            title="العودة لبوابة المستوى الأول"
          >
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
            <span className="hidden sm:inline">المستوى الأول</span>
          </Link>

          <span className="text-on-surface-variant/50 text-[11px] hidden sm:inline">/</span>

          <span className="text-xs font-bold text-on-surface flex items-center gap-1">
            <span className="text-on-surface-variant text-[11px] hidden sm:inline">المرحلة ١:</span>
            {currentOp ? currentOp.shortTitle : isStage2 ? "المرحلة ٢: مدرستي" : "المرحلة الأولى"}
          </span>

          {currentOp && (
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-primary-fixed/50 text-primary">
              {currentOp.number}/٥
            </span>
          )}
        </div>

        {/* Step Indicator (1 to 5) for Stage 1 */}
        {!isStage2 && (
          <div className="flex items-center gap-1">
            {stage1Operations.map((op) => {
              const isActive = pathname === op.href;
              const isPassed = currentOpIndex > -1 && op.number < currentOpIndex + 1;

              return (
                <Link
                  key={op.id}
                  href={op.href}
                  onClick={() => playFeedbackSound("tap")}
                  title={op.title}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs font-bold font-mono transition-all ${
                    isActive
                      ? "bg-primary text-on-primary shadow-xs scale-105 ring-2 ring-primary/20"
                      : isPassed
                      ? "bg-primary-fixed/40 text-primary hover:bg-primary-fixed"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  {isPassed ? "✓" : op.number}
                </Link>
              );
            })}
          </div>
        )}

        {/* Quick Prev / Next Jump */}
        <div className="flex items-center gap-1">
          {prevOp && (
            <Link
              href={prevOp.href}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-all"
              title={`السابق: ${prevOp.title}`}
            >
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          )}

          {nextOp ? (
            <Link
              href={nextOp.href}
              className="px-2.5 py-1 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-xs hover:bg-primary-container transition-all flex items-center gap-0.5"
              title={`التالي: ${nextOp.title}`}
            >
              <span className="hidden sm:inline">التالي</span>
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </Link>
          ) : isStage2 ? (
            <Link
              href="/"
              className="px-2.5 py-1 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition-all"
            >
              <span>الرئيسية</span>
            </Link>
          ) : (
            <Link
              href="/stage-2"
              className="px-2.5 py-1 rounded-xl bg-secondary text-on-secondary text-xs font-bold shadow-xs hover:brightness-105 transition-all flex items-center gap-1"
            >
              <span>المرحلة ٢</span>
              <span className="material-symbols-outlined text-sm">school</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
