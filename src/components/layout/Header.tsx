"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLearning } from "@/context/LearningContext";

export default function Header() {
  const {
    streakDays,
    points,
    hearts,
    isMuted,
    toggleMute,
    showTashkeel,
    toggleTashkeel,
    formatArabic,
    currentLevel,
    currentLevelId,
    setCurrentLevelId,
    levels,
    unlockedLevels,
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
    <header className="fixed top-0 inset-x-0 h-20 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 transition-all border-b border-surface-container">
      <div className="w-full h-full px-2.5 sm:px-space-md md:px-space-lg flex items-center justify-between gap-2 sm:gap-space-md max-w-7xl mx-auto">
        {/* Brand & Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-space-md shrink-0 group">
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
            <span className="text-xl sm:text-2xl font-bold text-primary tracking-tight font-sans">
              فصاحة
            </span>
            <span className="text-[10px] sm:text-xs text-on-surface-variant hidden sm:inline-block">
              تعلم العربية بمتعة وتفاعل
            </span>
          </div>
        </Link>

        {/* Central Interactive Level Progress & Switcher */}
        <div ref={menuRef} className="relative hidden lg:flex flex-col items-center flex-1 max-w-md mx-space-md">
          <button
            onClick={() => setIsLevelMenuOpen(!isLevelMenuOpen)}
            className="w-full flex flex-col p-1.5 px-3 rounded-2xl bg-surface-container-low/80 hover:bg-surface-container transition-all border border-surface-container cursor-pointer group text-right shadow-xs active:scale-[0.99]"
            type="button"
            title="انقر لتبديل المستوى أو استعراض الخارطة"
          >
            <div className="flex items-center justify-between w-full mb-1 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base group-hover:rotate-12 transition-transform">
                  layers
                </span>
                <span className="text-on-surface font-bold">
                  {formatArabic(currentLevel.titleArabic.split(":")[0])} • {formatArabic(currentLevel.units[0]?.titleArabic || currentLevel.subtitle)}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-[10px] font-bold text-on-surface-variant font-mono">
                  {currentLevel.code.split("•")[0].trim()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-primary font-bold">{currentLevel.progressPercent}٪</span>
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
                style={{ width: `${currentLevel.progressPercent}%` }}
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isLevelMenuOpen && (
            <div className="absolute top-full mt-2 w-96 max-w-[90vw] bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container px-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-lg">school</span>
                  <span className="text-xs font-bold text-on-surface">المستويات التعليمية</span>
                </div>
                <Link
                  href="/levels"
                  onClick={() => setIsLevelMenuOpen(false)}
                  className="text-xs text-primary hover:underline font-bold flex items-center gap-0.5"
                >
                  <span>خارطة المسار</span>
                  <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
                </Link>
              </div>

              <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto">
                {levels.map((lvl) => {
                  const isCurrent = lvl.id === currentLevelId;
                  const isUnlocked = unlockedLevels.includes(lvl.id);

                  return (
                    <div
                      key={lvl.id}
                      onClick={() => {
                        if (isUnlocked) {
                          setCurrentLevelId(lvl.id);
                          setIsLevelMenuOpen(false);
                        }
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                        isCurrent
                          ? "bg-primary/10 border-primary/40 shadow-xs"
                          : isUnlocked
                          ? "bg-surface-container-low border-surface-container hover:bg-surface-container cursor-pointer"
                          : "bg-surface-container-low/40 border-surface-container/50 opacity-60 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow-xs ${
                            isCurrent
                              ? "bg-primary text-on-primary"
                              : isUnlocked
                              ? "bg-surface-container-high text-on-surface"
                              : "bg-surface-container text-outline"
                          }`}
                        >
                          {lvl.number}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-on-surface">
                              {formatArabic(lvl.titleArabic.split(":")[0])}
                            </span>
                            <span className="text-[10px] font-mono px-1 py-0.2 bg-surface-container rounded text-on-surface-variant">
                              {lvl.code}
                            </span>
                          </div>
                          <span className="text-[10px] text-on-surface-variant truncate max-w-[190px]">
                            {formatArabic(lvl.subtitle)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isCurrent ? (
                          <span className="px-2 py-0.5 bg-primary text-on-primary rounded-full text-[10px] font-bold">
                            نشط
                          </span>
                        ) : isUnlocked ? (
                          <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded-full text-[10px] font-bold">
                            اختيار
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-outline text-base">
                            lock
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 mt-2 border-t border-surface-container">
                <Link
                  href="/levels"
                  onClick={() => setIsLevelMenuOpen(false)}
                  className="w-full py-2 px-3 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:brightness-105 transition-all"
                >
                  <span className="material-symbols-outlined text-base">map</span>
                  <span>عرض خارطة وتفاصيل المستويات كاملة</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Counters & Profile */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-space-md shrink-0">
          {/* Streak */}
          <div
            className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 bg-secondary-fixed/50 rounded-full shadow-[0_2px_0_#fea619] transition-transform hover:scale-105 shrink-0"
            title={`${streakDays} أيام متتالية`}
          >
            <span className="material-symbols-outlined text-secondary-container text-base sm:text-lg">
              local_fire_department
            </span>
            <span className="text-xs font-bold text-on-secondary-fixed">
              {streakDays} <span className="hidden sm:inline">أيام</span>
            </span>
          </div>

          {/* Points / XP */}
          <div
            className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 bg-tertiary-fixed/50 rounded-full shadow-[0_2px_0_#007bb9] transition-transform hover:scale-105 shrink-0"
            title={`${points} نقطة خبرة`}
          >
            <span className="material-symbols-outlined text-tertiary text-base sm:text-lg">
              diamond
            </span>
            <span className="text-xs font-bold text-on-tertiary-fixed">
              {points} <span className="hidden sm:inline">نقطة</span>
            </span>
          </div>

          {/* Hearts */}
          <div
            className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 bg-error-container/40 rounded-full shadow-[0_2px_0_#ba1a1a] transition-transform hover:scale-105 shrink-0"
            title={`${hearts} قلوب متبقية`}
          >
            <span className="material-symbols-outlined text-error text-base sm:text-lg">
              favorite
            </span>
            <span className="text-xs font-bold text-on-error-container">
              {hearts} <span className="hidden sm:inline">قلوب</span>
            </span>
          </div>

          {/* Tashkeel Global Toggle Switch */}
          <button
            onClick={toggleTashkeel}
            type="button"
            role="switch"
            aria-checked={showTashkeel}
            title={showTashkeel ? "تعطيل إظهار التشكيل في كامل المنصة" : "تفعيل إظهار التشكيل في كامل المنصة"}
            className={`flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border transition-all cursor-pointer select-none active:scale-95 shadow-xs shrink-0 ${
              showTashkeel
                ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/15"
                : "bg-surface-container border-surface-container-high text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[17px] sm:text-[18px]">
              format_size
            </span>
            <span className="text-xs font-bold hidden md:inline">
              {showTashkeel ? "التَّشْكِيل: مُفَعَّل" : "التشكيل: مُعطّل"}
            </span>
            <span className="text-xs font-bold hidden sm:inline md:hidden">
              {showTashkeel ? "تَشْكِيل" : "تشكيل"}
            </span>
            <div
              className={`w-6 h-3.5 sm:w-7 sm:h-4 rounded-full p-0.5 relative transition-colors duration-200 flex items-center ${
                showTashkeel ? "bg-primary" : "bg-outline-variant"
              }`}
            >
              <div
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full transition-transform duration-200 shadow-xs ${
                  showTashkeel ? "translate-x-0" : "-translate-x-2.5 sm:-translate-x-3"
                }`}
              />
            </div>
          </button>

          {/* Mute/Sound Toggle */}
          <button
            onClick={toggleMute}
            className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface transition-all active:scale-95 shrink-0"
            type="button"
            title={isMuted ? "تشغيل المؤثرات الصوتية" : "كتم المؤثرات الصوتية"}
          >
            <span className="material-symbols-outlined text-base sm:text-lg">
              {isMuted ? "volume_off" : "volume_up"}
            </span>
          </button>

          {/* Logo Avatar */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-2 ring-primary/20 shadow-sm shrink-0 bg-surface-container-lowest p-0.5">
            <Image
              src="/assets/logo.png"
              alt="Fasaha Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
