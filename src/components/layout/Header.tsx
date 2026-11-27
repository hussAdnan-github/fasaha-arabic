"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLearning } from "@/context/LearningContext";

export default function Header() {
  const pathname = usePathname();
  const isStage2 = pathname.startsWith("/stage-2");
  const isHub = pathname === "/";
  const {
    streakDays,
    points,
    hearts,
    isMuted,
    toggleMute,
    showTashkeel,
    toggleTashkeel,
    formatArabic,
  } = useLearning();

  const [isLevelMenuOpen, setIsLevelMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsLevelMenuOpen(false);
      }
    };
    if (isLevelMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLevelMenuOpen]);

  return (
    <header className="fixed top-0 inset-x-0 h-16 sm:h-20 bg-surface-container-lowest/95 backdrop-blur-xl shadow-xs z-50 transition-all border-b border-surface-container">
      <div className="w-full h-full px-3 sm:px-space-md md:px-space-lg flex items-center justify-between gap-2 max-w-7xl mx-auto">
        {/* Brand & Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 transition-transform group-hover:scale-105 shrink-0">
            <Image
              src="/assets/logo.svg"
              alt="Fasaha Arabic Learning Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-2xl font-black text-primary tracking-tight font-sans leading-none">
              لغتي
            </span>
            <span className="text-[10px] sm:text-xs text-on-surface-variant font-bold hidden sm:inline-block mt-0.5">
              المستوى الأول • A1
            </span>
          </div>
        </Link>

        {/* Central Interactive Level 1 Progress & Stage Switcher (Desktop) */}
        <div ref={menuRef} className="relative hidden lg:flex flex-col items-center flex-1 max-w-md mx-space-md">
          <button
            onClick={() => setIsLevelMenuOpen(!isLevelMenuOpen)}
            className="w-full flex flex-col p-2 px-3.5 rounded-2xl bg-surface-container-low/90 hover:bg-surface-container transition-all border border-surface-container cursor-pointer group text-right shadow-2xs active:scale-[0.99]"
            type="button"
            title="انقر للتنقل بين مراحل المستوى الأول"
          >
            <div className="flex items-center justify-between w-full mb-1 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base group-hover:rotate-12 transition-transform">
                  layers
                </span>
                <span className="text-on-surface font-extrabold">
                  {formatArabic("المستوى الأول")} • {isStage2 ? formatArabic("المرحلة الثانية: مدرستي") : isHub ? formatArabic("مركز التعلم والمسار") : formatArabic("المرحلة الأولى: أسرتي")}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isStage2
                    ? "bg-secondary-fixed text-on-secondary-fixed"
                    : isHub
                    ? "bg-primary-fixed text-on-primary-fixed"
                    : "bg-surface-container-high text-on-surface"
                }`}>
                  {isStage2 ? "المرحلة ٢" : isHub ? "نظرة عامة" : "المرحلة ١"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-primary font-bold">٥٠٪</span>
                <span
                  className={`material-symbols-outlined text-[16px] text-on-surface-variant transition-transform duration-200 ${
                    isLevelMenuOpen ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden p-[1px] shadow-inner">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"
                style={{ width: isStage2 ? "65%" : isHub ? "50%" : "40%" }}
              />
            </div>
          </button>

          {/* Level 1 Focused Dropdown Menu */}
          {isLevelMenuOpen && (
            <div className="absolute top-full mt-2 w-80 max-w-[90vw] bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container px-1">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">layers</span>
                  <span className="text-xs font-bold text-on-surface">خريطة المستوى الأول</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-primary bg-primary-fixed/40 px-2 py-0.5 rounded-full">
                  CEFR A1
                </span>
              </div>

              {/* Level 1 Only Navigation */}
              <div className="flex flex-col gap-1.5">
                {/* 1. Hub */}
                <Link
                  href="/"
                  onClick={() => setIsLevelMenuOpen(false)}
                  className={`flex items-center justify-between p-2 rounded-xl transition-all border ${
                    isHub
                      ? "bg-primary-fixed/30 border-primary text-primary font-bold"
                      : "bg-surface-container-low hover:bg-surface-container text-on-surface border-surface-container"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center text-xs font-bold shrink-0">
                      <span className="material-symbols-outlined text-sm">dashboard</span>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold leading-tight">مركز المستوى الأول</span>
                      <span className="text-[10px] text-on-surface-variant">نظرة عامة والمسار التعليمي</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm rotate-180 opacity-70">arrow_forward</span>
                </Link>

                {/* 2. Stage 1 */}
                <Link
                  href="/vocabulary"
                  onClick={() => setIsLevelMenuOpen(false)}
                  className={`flex items-center justify-between p-2 rounded-xl transition-all border ${
                    !isHub && !isStage2
                      ? "bg-primary-fixed/30 border-primary text-primary font-bold"
                      : "bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border-surface-container"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center text-xs font-bold shrink-0">
                      ١
                    </span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold leading-tight">المرحلة الأولى: أسرتي وبيتي</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-primary/10 text-primary text-[9px] font-bold">٥ دروس</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant">الكلمات، الإشارة، سلم القواعد، المحادثة</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm rotate-180 opacity-70">arrow_forward</span>
                </Link>

                {/* 3. Stage 2 */}
                <Link
                  href="/stage-2"
                  onClick={() => setIsLevelMenuOpen(false)}
                  className={`flex items-center justify-between p-2 rounded-xl transition-all border ${
                    isStage2
                      ? "bg-secondary-fixed/40 border-secondary text-secondary font-bold"
                      : "bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border-surface-container"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-secondary text-on-secondary flex items-center justify-center text-xs font-bold shrink-0">
                      ٢
                    </span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold leading-tight">المرحلة الثانية: مدرستي وفصلي</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[9px] font-bold">٩ أقسام</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant">صرح المدرسة، النحو، وظروف المكان</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm rotate-180 opacity-70">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Counters & Controls (Mobile & Desktop) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Streak Badge */}
          <div
            className="flex items-center gap-0.5 sm:gap-1 px-2 py-1 bg-secondary-fixed/40 rounded-full shadow-2xs shrink-0"
            title={`${streakDays} أيام متتالية`}
          >
            <span className="material-symbols-outlined text-secondary-container text-sm sm:text-base">
              local_fire_department
            </span>
            <span className="text-xs font-bold text-on-secondary-fixed font-mono">
              {streakDays}
            </span>
          </div>

          {/* Points / XP */}
          <div
            className="flex items-center gap-0.5 sm:gap-1 px-2 py-1 bg-tertiary-fixed/40 rounded-full shadow-2xs shrink-0"
            title={`${points} نقطة XP`}
          >
            <span className="material-symbols-outlined text-tertiary text-sm sm:text-base">
              diamond
            </span>
            <span className="text-xs font-bold text-on-tertiary-fixed font-mono">
              {points}
            </span>
          </div>

          {/* Hearts */}
          <div
            className="flex items-center gap-0.5 sm:gap-1 px-2 py-1 bg-error-container/30 rounded-full shadow-2xs shrink-0"
            title={`${hearts} قلوب`}
          >
            <span className="material-symbols-outlined text-error text-sm sm:text-base">
              favorite
            </span>
            <span className="text-xs font-bold text-on-error-container font-mono">
              {hearts}
            </span>
          </div>

          {/* Tashkeel Quick Switch Button */}
          <button
            onClick={toggleTashkeel}
            type="button"
            role="switch"
            aria-checked={showTashkeel}
            title={showTashkeel ? "إخفاء التشكيل" : "إظهار التشكيل"}
            className={`w-8 h-8 sm:w-auto sm:px-2.5 sm:py-1 rounded-full border transition-all flex items-center justify-center gap-1 cursor-pointer select-none active:scale-95 shadow-2xs shrink-0 ${
              showTashkeel
                ? "bg-primary text-on-primary border-primary shadow-xs"
                : "bg-surface-container border-surface-container-high text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span className="text-xs font-bold font-sans">
              {showTashkeel ? "تَ" : "ت"}
            </span>
            <span className="text-xs font-bold hidden md:inline">
              {showTashkeel ? "تشكيل" : "بدون"}
            </span>
          </button>

          {/* Sound Mute/Unmute Quick Button */}
          <button
            onClick={toggleMute}
            type="button"
            title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all cursor-pointer border border-surface-container shrink-0"
          >
            <span className="material-symbols-outlined text-base">
              {isMuted ? "volume_off" : "volume_up"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
