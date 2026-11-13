"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLearning } from "@/context/LearningContext";

const stage1Operations = [
  { number: 1, title: "المفردات المصورة", href: "/", icon: "menu_book" },
  { number: 2, title: "أفراد الأسرة والإشارة", href: "/family-and-gender", icon: "group" },
  { number: 3, title: "سلم القواعد: النحو", href: "/grammar-ladder", icon: "stairs" },
  { number: 4, title: "المحادثة اليومية", href: "/daily-dialogue", icon: "forum" },
  { number: 5, title: "التمارين التفاعلية", href: "/interactive-practice", icon: "sports_esports" },
];

const stage2Operations = [
  { number: 1, title: "المشهد البصري للمدرسة", href: "/stage-2#campus", icon: "domain" },
  { number: 2, title: "الجمل النموذجية (مدرستي)", href: "/stage-2#sentences", icon: "article" },
  { number: 3, title: "أقسام الكلمة (تصنيف)", href: "/stage-2#word-types", icon: "category" },
  { number: 4, title: "مرافق المدرسة الأساسية", href: "/stage-2#facilities", icon: "apartment" },
  { number: 5, title: "تدريب الاستيعاب والتذكر", href: "/stage-2#facility-quiz", icon: "quiz" },
  { number: 6, title: "البنية النحوية والتركيبية", href: "/stage-2#grammar-structure", icon: "schema" },
  { number: 7, title: "المطابقة والتذكير والتأنيث", href: "/stage-2#gender-professions", icon: "switch_account" },
  { number: 8, title: "الفصل وظروف المكان", href: "/stage-2#spatial-classroom", icon: "explore" },
  { number: 9, title: "التدريب النسبي على الاتجاهات", href: "/stage-2#perspective-test", icon: "compare_arrows" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { currentLevel, formatArabic, playFeedbackSound } = useLearning();

  const isStage2Route = pathname.startsWith("/stage-2");
  const [activeStageTab, setActiveStageTab] = useState<"stage1" | "stage2">(
    isStage2Route ? "stage2" : "stage2" // Set stage2 as default active stage!
  );

  useEffect(() => {
    if (pathname.startsWith("/stage-2")) {
      setActiveStageTab("stage2");
    }
  }, [pathname]);

  const stage1 = currentLevel.stages[0];
  const stage2 = currentLevel.stages[1];

  const currentDisplayStage = activeStageTab === "stage2" ? stage2 : stage1;

  return (
    <aside className="fixed right-0 top-20 bottom-0 w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 hidden md:flex flex-col py-space-md px-space-md border-l border-surface-container overflow-y-auto">
      {/* 1. Active Level & Stage Header Card */}
      <div className="mb-space-md p-3.5 rounded-2xl bg-gradient-to-br from-primary-fixed/30 to-secondary-fixed/20 border border-primary/25 shadow-xs flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-lg">
              workspace_premium
            </span>
            <span className="text-xs font-black text-primary">
              {formatArabic("المستوى الأول")}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
            {currentLevel.code.split("•")[0].trim()}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-bold text-on-surface">
            {activeStageTab === "stage2"
              ? formatArabic("المرحلة الثانية: مدرستي وفصلي")
              : formatArabic("المرحلة الأولى: أسرتي وبيتي")}
          </span>
          <span className="text-[11px] text-on-surface-variant">
            {activeStageTab === "stage2"
              ? "المرحلة النشطة الحالية • ٩ أقسام تفاعلية"
              : "المرحلة الأولى • مكتملة بنجاح (٥/٥)"}
          </span>
        </div>

        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${activeStageTab === "stage2" ? 45 : 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-medium pt-0.5">
          <span className="text-on-surface-variant">
            {activeStageTab === "stage2" ? "إنجاز المرحلة الثانية" : "إنجاز المرحلة الأولى"}
          </span>
          <span className="text-primary font-bold">
            {activeStageTab === "stage2" ? "٤٥٪" : "١٠٠٪ ✓"}
          </span>
        </div>
      </div>

      {/* 2. Stages Switcher Tabs in Level 1 */}
      <div className="flex items-center p-1 bg-surface-container-low rounded-xl mb-3 border border-surface-container text-xs font-bold">
        <button
          onClick={() => {
            setActiveStageTab("stage1");
            playFeedbackSound("tap");
          }}
          className={`flex-1 py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
            activeStageTab === "stage1"
              ? "bg-surface-container-lowest text-primary shadow-xs"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
          type="button"
        >
          <span>المرحلة ١</span>
          <span className="text-[9px] px-1 rounded bg-primary/20 text-primary font-bold">
            ✓
          </span>
        </button>

        <button
          onClick={() => {
            setActiveStageTab("stage2");
            playFeedbackSound("tap");
          }}
          className={`flex-1 py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
            activeStageTab === "stage2"
              ? "bg-surface-container-lowest text-secondary shadow-xs"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
          type="button"
        >
          <span>المرحلة ٢</span>
          <span className="text-[9px] px-1 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">
            النشطة
          </span>
        </button>
      </div>

      {/* 3. Stage Operations List */}
      {activeStageTab === "stage2" ? (
        <div className="flex flex-col flex-1">
          <div className="px-2 mb-2 flex items-center justify-between">
            <span className="text-[11px] uppercase text-on-surface-variant tracking-wider font-bold">
              أقسام المرحلة الثانية (٩)
            </span>
            <Link href="/stage-2" className="text-[10px] font-bold text-secondary hover:underline">
              فتح الصفحة
            </Link>
          </div>

          <nav className="flex flex-col gap-1 overflow-y-auto max-h-[380px] pr-0.5">
            {stage2Operations.map((op) => {
              const isActive = pathname === "/stage-2";
              return (
                <Link
                  key={op.number}
                  href={op.href}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-secondary-fixed/30 text-on-secondary-fixed font-bold hover:bg-secondary-fixed/50"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-surface-container-high flex items-center justify-center text-[10px] font-bold font-mono">
                      {op.number}
                    </span>
                    <span className="text-xs font-bold leading-tight line-clamp-1">{op.title}</span>
                  </div>
                  <span className="material-symbols-outlined text-base opacity-70">
                    {op.icon}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          <div className="px-2 mb-2 flex items-center justify-between">
            <span className="text-[11px] uppercase text-on-surface-variant tracking-wider font-bold">
              عمليات المرحلة الأولى (مكتملة)
            </span>
            <span className="text-[10px] font-mono text-primary font-bold">
              ٥/٥ ✓
            </span>
          </div>

          <nav className="flex flex-col gap-1.5">
            {stage1Operations.map((op) => {
              const isActive = pathname === op.href;
              return (
                <Link
                  key={op.href}
                  href={op.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-primary-container text-on-primary-container font-bold shadow-xs"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold bg-primary-fixed/50 text-primary">
                      ✓
                    </span>
                    <span className="text-xs font-bold leading-tight">{op.title}</span>
                  </div>
                  <span className="material-symbols-outlined text-base opacity-80">
                    {op.icon}
                  </span>
                </Link>
              );
            })}
          </nav>

          <Link
            href="/stage-2"
            className="mt-3 p-3 rounded-2xl bg-secondary text-on-secondary text-xs font-bold text-center shadow-xs hover:brightness-105 transition-all block"
          >
            الانتقال إلى المرحلة الثانية (النشطة) ◂
          </Link>
        </div>
      )}

      {/* Roadmap Link */}
      <Link
        href="/levels"
        className="mt-auto pt-3 border-t border-surface-container flex items-center justify-between text-xs font-bold text-on-surface-variant hover:text-primary transition-colors"
      >
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base text-primary">account_tree</span>
          <span>خارطة مراحل المنهج كاملة</span>
        </div>
        <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
      </Link>
    </aside>
  );
}
