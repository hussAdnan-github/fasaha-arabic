"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLearning } from "@/context/LearningContext";

const navItems = [
  {
    title: "خارطة المستويات",
    href: "/levels",
    icon: "layers",
    badge: "شامل",
  },
  {
    title: "المفردات المصورة",
    href: "/",
    icon: "menu_book",
  },
  {
    title: "أفراد الأسرة والإشارة",
    href: "/family-and-gender",
    icon: "group",
  },
  {
    title: "سلم القواعد: النحو",
    href: "/grammar-ladder",
    icon: "stairs",
  },
  {
    title: "المحادثة اليومية",
    href: "/daily-dialogue",
    icon: "forum",
  },
  {
    title: "التمارين التفاعلية",
    href: "/interactive-practice",
    icon: "sports_esports",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { currentLevel, formatArabic } = useLearning();

  return (
    <aside className="fixed right-0 top-20 bottom-0 w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 hidden md:flex flex-col py-space-lg px-space-md border-l border-surface-container overflow-y-auto">
      {/* Active Level Widget Card */}
      <Link
        href="/levels"
        className="mb-space-md p-3 rounded-2xl bg-primary-fixed/20 border border-primary/25 hover:border-primary/50 transition-all group flex flex-col gap-1.5 shadow-xs"
        title="انقر لاستعراض خارطة المستويات التعليمية كاملة"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform">
              workspace_premium
            </span>
            <span className="text-xs font-bold text-primary">
              {formatArabic(currentLevel.titleArabic.split(":")[0])}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
            {currentLevel.code.split("•")[0].trim()}
          </span>
        </div>
        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${currentLevel.progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-medium">
          <span>{currentLevel.completedLessons} من {currentLevel.totalLessons} دروس</span>
          <span className="text-primary font-bold">{currentLevel.progressPercent}٪</span>
        </div>
      </Link>

      <div className="px-space-md mb-2">
        <span className="text-xs uppercase text-on-surface-variant tracking-wider font-bold">
          وحدات المنهج التفاعلي
        </span>
      </div>

      <nav className="flex flex-col gap-1.5 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-space-md py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary-container text-on-primary-container font-bold shadow-[0_3px_0_#005137] translate-y-[-1px]"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface hover:translate-x-[-2px]"
              }`}
            >
              <div className="flex items-center gap-space-md">
                <span className="material-symbols-outlined text-xl">
                  {item.icon}
                </span>
                <span className="text-sm font-semibold">{item.title}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Daily Study Reminder Card */}
      <div className="p-space-md bg-surface-container-low rounded-xl mt-auto border border-surface-container shadow-sm">
        <div className="flex items-center gap-space-sm mb-1">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-lg">
              school
            </span>
          </div>
          <span className="text-sm text-on-surface font-bold">
            تذكير التعلم اليومي
          </span>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          حافظ على استمرارية شعلة الحماس بإكمال تمرينين يومياً لتثبيت القواعد والمفردات!
        </p>
      </div>
    </aside>
  );
}
