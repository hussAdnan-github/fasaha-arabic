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
  const { currentLevel, formatArabic } = useLearning();

  const isStage2 = pathname.startsWith("/stage-2");
  const stage1 = currentLevel.stages[0];
  const stage2 = currentLevel.stages[1];

  // Stage 1 operations
  const stage1Operations = [
    {
      id: "vocab",
      number: 1,
      title: "المفردات المصورة",
      href: "/",
      icon: "menu_book",
      completed: true,
    },
    {
      id: "family",
      number: 2,
      title: "أفراد الأسرة والإشارة",
      href: "/family-and-gender",
      icon: "group",
      completed: true,
    },
    {
      id: "grammar",
      number: 3,
      title: "سلم القواعد: النحو",
      href: "/grammar-ladder",
      icon: "stairs",
      completed: true,
    },
    {
      id: "dialogue",
      number: 4,
      title: "المحادثة اليومية",
      href: "/daily-dialogue",
      icon: "forum",
      completed: true,
    },
    {
      id: "practice",
      number: 5,
      title: "التمارين التفاعلية",
      href: "/interactive-practice",
      icon: "sports_esports",
      completed: true,
    },
  ];

  // Stage 2 operations (9 Sections)
  const stage2Operations = [
    { number: 1, title: "المشهد البصري", href: "/stage-2#campus", icon: "domain" },
    { number: 2, title: "الجمل النموذجية", href: "/stage-2#sentences", icon: "article" },
    { number: 3, title: "أقسام الكلمة", href: "/stage-2#word-types", icon: "category" },
    { number: 4, title: "مرافق المدرسة", href: "/stage-2#facilities", icon: "apartment" },
    { number: 5, title: "تمرين التذكر", href: "/stage-2#facility-quiz", icon: "quiz" },
    { number: 6, title: "البنية النحوية", href: "/stage-2#grammar-structure", icon: "schema" },
    { number: 7, title: "التذكير والتأنيث", href: "/stage-2#gender-professions", icon: "switch_account" },
    { number: 8, title: "ظروف المكان", href: "/stage-2#spatial-classroom", icon: "explore" },
    { number: 9, title: "التدريب النسبي", href: "/stage-2#perspective-test", icon: "compare_arrows" },
  ];

  const currentOpIndex = isStage2
    ? -1
    : stage1Operations.findIndex((op) => op.href === pathname);

  return (
    <div className="w-full mb-space-md">
      {/* 1. Header Banner & Hierarchy Breadcrumb Strip */}
      <div className="rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs p-3 sm:px-4 sm:py-2.5 mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Main Context Hierarchy */}
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant flex-wrap font-medium">
            <Link
              href="/levels"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold hover:underline transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">layers</span>
              {formatArabic("المستوى الأول")}
            </Link>
            <span className="material-symbols-outlined text-[13px] text-on-surface-variant/70">
              arrow_back_ios
            </span>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold ${
                isStage2
                  ? "bg-secondary-fixed text-on-secondary-fixed"
                  : "bg-surface-container text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">
                {isStage2 ? "school" : "flag"}
              </span>
              {isStage2 ? formatArabic("المرحلة الثانية: مدرستي وفصلي") : formatArabic("المرحلة الأولى: أسرتي وبيتي")}
            </span>
            {!isStage2 && currentOpIndex !== -1 && (
              <>
                <span className="material-symbols-outlined text-[13px] text-on-surface-variant/70">
                  arrow_back_ios
                </span>
                <span className="text-on-surface font-bold">
                  العملية {stage1Operations[currentOpIndex].number}: {stage1Operations[currentOpIndex].title}
                </span>
              </>
            )}
            {isStage2 && (
              <span className="text-[11px] font-bold text-primary hidden md:inline">
                • ٤ محطات رئيسية • ٩ أقسام تفاعلية
              </span>
            )}
          </div>

          {/* Stage Switcher Pills */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            {/* Stage 1 Tab */}
            <Link
              href="/"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                !isStage2
                  ? "bg-surface-container text-primary border-primary/40 shadow-xs"
                  : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant border-surface-container"
              }`}
            >
              <span className="material-symbols-outlined text-[15px] text-primary">check_circle</span>
              <span>المرحلة الأولى (مكتملة ✓)</span>
            </Link>

            {/* Stage 2 Tab */}
            <Link
              href="/stage-2"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                isStage2
                  ? "bg-primary text-on-primary border-primary shadow-xs"
                  : "bg-secondary text-on-secondary border-secondary hover:brightness-105 shadow-xs"
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">school</span>
              <span>المرحلة الثانية: مدرستي</span>
              {isStage2 ? (
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[9px]">النشطة</span>
              ) : (
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[9px] animate-pulse">ادخل الآن</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Operations Flow Steps Track (Shown only for Stage 1) */}
      {!compact && !isStage2 && (
        <div className="w-full">
          {/* Stage 1: 5 Operations */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {stage1Operations.map((op) => {
              const isActive = pathname === op.href;
              return (
                <Link
                  key={op.id}
                  href={op.href}
                  className={`group relative p-2.5 sm:p-3 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                    isActive
                      ? "bg-primary-container text-on-primary-container border-primary/40 shadow-xs ring-2 ring-primary/20 -translate-y-0.5"
                      : "bg-surface-container-lowest hover:bg-surface-container-low border-surface-container text-on-surface hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold bg-primary-fixed/50 text-primary">
                      ✓
                    </span>
                    <span className="material-symbols-outlined text-lg opacity-80 group-hover:scale-110 transition-transform">
                      {op.icon}
                    </span>
                  </div>

                  <div className="flex flex-col text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono text-on-surface-variant font-bold">
                        عملية {op.number}
                      </span>
                      {isActive && (
                        <span className="px-1.5 py-0.2 rounded-full bg-primary text-on-primary text-[9px] font-bold">
                          أنت هنا
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                      {op.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
