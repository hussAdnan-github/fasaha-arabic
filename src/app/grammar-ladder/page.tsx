"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLearning } from "@/context/LearningContext";
import {
  grammarProgressions,
  transformerItems,
  GrammarProgressionRow,
  TransformerItem,
} from "@/data/grammarData";

export default function GrammarLadderPage() {
  const { showTashkeel, playPronunciation, playFeedbackSound } = useLearning();
  const [selectedCountState, setSelectedCountState] = useState<1 | 2 | 3>(1);

  const handlePlayWord = (word: string) => {
    playFeedbackSound("tap");
    playPronunciation(word);
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* 1. Header Banner */}
      <section className="relative rounded-2xl bg-surface-container-lowest p-space-md sm:p-space-lg shadow-sm overflow-hidden mb-space-lg border border-surface-container">
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-primary-fixed/20 pointer-events-none blur-2xl" />
        <div className="absolute top-1/2 -right-8 w-36 h-36 rounded-full bg-tertiary-fixed/30 pointer-events-none blur-xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant flex-wrap">
              <span className="text-primary font-bold">المستوى الأول</span>
              <span className="material-symbols-outlined text-[14px]">arrow_back_ios</span>
              <span className="text-on-surface-variant font-medium">الوحدة الأولى: أسرتي</span>
              <span className="material-symbols-outlined text-[14px]">arrow_back_ios</span>
              <span className="text-secondary font-bold">الدرس ٣: سلم القواعد والنحو</span>
            </div>

            <div className="flex items-baseline gap-space-sm flex-wrap mt-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface m-0 tracking-tight">
                {showTashkeel ? "سُلَّمُ التَّدَرُّجِ البَصَرِيِّ لِلأَسْمَاء" : "سلم التدرج البصري للأسماء"}
              </h1>
              <span className="text-xs font-bold text-on-surface-variant tracking-wide">
                [ Sullam Al-Qawā‘id: Singular • Dual • Plural ]
              </span>
            </div>

            <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed mt-1">
              من المفرد إلى المثنى والجمع: اكتشف كيف تتغير الكلمات واللواحق النحوية العربية بسلاسة ووضوح، ولاحظ اللاحقة المتميزة للمثنى (ـان).
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-surface-container text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-primary text-base">volume_up</span>
            <span>اضغط على أيقونة الصوت للاستماع للنطق الفصيح</span>
          </div>
        </div>
      </section>

      {/* 2. The 4-Row Visual Progression Matrix */}
      <section className="flex flex-col gap-space-lg mb-space-xl">
        {grammarProgressions.map((prog) => (
          <div
            key={prog.id}
            className="rounded-2xl bg-surface-container-lowest p-space-md sm:p-space-lg shadow-sm border border-surface-container hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-surface-container">
              <div className="flex items-center gap-space-sm">
                <span
                  className={`w-8 h-8 rounded-full ${prog.badgeBg} flex items-center justify-center font-bold ${prog.badgeTextColor} text-sm`}
                >
                  {prog.stepNumber}
                </span>
                <span className="text-xl font-bold text-on-surface">
                  {prog.titleArabic}
                </span>
                <span className="text-xs text-on-surface-variant font-mono">
                  {prog.titleEnglish}
                </span>
              </div>

              <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                {prog.pluralTypeBadge}
              </span>
            </div>

            {/* 3 Columns: Singular, Dual, Plural */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {/* Singular Column */}
              <div className="flex flex-col items-center text-center p-space-md rounded-xl bg-surface-container-low border border-surface-container shadow-[0_3px_0_#dae2fd]">
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-on-surface text-xs font-bold shadow-xs">
                    {prog.singular.stateLabel}
                  </span>
                  <button
                    onClick={() =>
                      handlePlayWord(
                        showTashkeel
                          ? prog.singular.wordWithTashkeel
                          : prog.singular.wordPlain
                      )
                    }
                    className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_2px_0_#006194] cursor-pointer"
                    title="استمع للنطق"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">volume_up</span>
                  </button>
                </div>

                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-surface-container">
                  <Image
                    src={prog.singular.imageUrl}
                    alt={prog.singular.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <span className="text-3xl font-extrabold text-primary tracking-wide">
                  {showTashkeel
                    ? prog.singular.wordWithTashkeel
                    : prog.singular.wordPlain}
                </span>
                <span className="text-xs font-bold text-on-surface-variant font-mono mt-0.5">
                  {prog.singular.phonetic}
                </span>
                <span className="text-xs text-on-surface-variant mt-1">
                  {prog.singular.englishMeaning}
                </span>
              </div>

              {/* Dual Column (Hero feature with suffix highlight) */}
              <div className="flex flex-col items-center text-center p-space-md rounded-xl bg-primary-container/10 border border-primary/30 shadow-[0_4px_0_#006948] relative">
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-xs">
                    {prog.dual.stateLabel}
                  </span>
                  <button
                    onClick={() =>
                      handlePlayWord(
                        showTashkeel
                          ? prog.dual.wordWithTashkeel
                          : prog.dual.wordPlain
                      )
                    }
                    className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_2px_0_#005137] cursor-pointer"
                    title="استمع للنطق"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">volume_up</span>
                  </button>
                </div>

                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-surface-container">
                  <Image
                    src={prog.dual.imageUrl}
                    alt={prog.dual.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="text-3xl font-extrabold text-on-surface tracking-wide">
                  {prog.dual.wordPlain.slice(0, -2)}
                  <span className="text-primary font-black bg-primary-fixed px-1 rounded-md mx-0.5 shadow-xs">
                    {prog.dual.suffixHighlight}
                  </span>
                </div>
                <span className="text-xs font-bold text-primary font-mono mt-0.5">
                  {prog.dual.phonetic}
                </span>
                <span className="text-xs text-on-surface-variant mt-1">
                  {prog.dual.englishMeaning}
                </span>
              </div>

              {/* Plural Column */}
              <div className="flex flex-col items-center text-center p-space-md rounded-xl bg-surface-container-low border border-surface-container shadow-[0_3px_0_#dae2fd]">
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold shadow-xs">
                    {prog.plural.stateLabel}
                  </span>
                  <button
                    onClick={() =>
                      handlePlayWord(
                        showTashkeel
                          ? prog.plural.wordWithTashkeel
                          : prog.plural.wordPlain
                      )
                    }
                    className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_2px_0_#855300] cursor-pointer"
                    title="استمع للنطق"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">volume_up</span>
                  </button>
                </div>

                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-surface-container">
                  <Image
                    src={prog.plural.imageUrl}
                    alt={prog.plural.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <span className="text-3xl font-extrabold text-secondary tracking-wide">
                  {showTashkeel
                    ? prog.plural.wordWithTashkeel
                    : prog.plural.wordPlain}
                </span>
                <span className="text-xs font-bold text-on-surface-variant font-mono mt-0.5">
                  {prog.plural.phonetic}
                </span>
                <span className="text-xs text-on-surface-variant mt-1">
                  {prog.plural.englishMeaning}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Interactive Count Selector & Transformer Widget */}
      <section className="w-full mb-space-xl p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg pb-4 border-b border-surface-container">
          <div>
            <div className="flex items-center gap-space-xs mb-1">
              <span className="material-symbols-outlined text-primary text-2xl">tune</span>
              <h3 className="text-2xl font-bold text-on-surface m-0">مختبر التحويل التفاعلي</h3>
            </div>
            <p className="text-sm text-on-surface-variant m-0">
              اختر العدد لمشاهدة كيف يتحول الاسم وقواعد إشارته فورياً بين المفرد والمثنى والجمع!
            </p>
          </div>

          {/* Tactile Switcher Buttons (1, 2, 3+) */}
          <div className="flex items-center gap-1 bg-surface-container-high p-1 rounded-full shadow-inner text-xs font-bold self-start md:self-auto">
            <button
              onClick={() => {
                setSelectedCountState(1);
                playFeedbackSound("tap");
              }}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                selectedCountState === 1
                  ? "bg-primary text-on-primary shadow-[0_2px_0_#005137]"
                  : "text-on-surface hover:bg-surface-container"
              }`}
              type="button"
            >
              ١ واحد (مفرد)
            </button>
            <button
              onClick={() => {
                setSelectedCountState(2);
                playFeedbackSound("tap");
              }}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                selectedCountState === 2
                  ? "bg-primary text-on-primary shadow-[0_2px_0_#005137]"
                  : "text-on-surface hover:bg-surface-container"
              }`}
              type="button"
            >
              ٢ اثنان (مثنى)
            </button>
            <button
              onClick={() => {
                setSelectedCountState(3);
                playFeedbackSound("tap");
              }}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                selectedCountState === 3
                  ? "bg-primary text-on-primary shadow-[0_2px_0_#005137]"
                  : "text-on-surface hover:bg-surface-container"
              }`}
              type="button"
            >
              ٣+ ثلاثة فأكثر (جمع)
            </button>
          </div>
        </div>

        {/* Live Preview Dynamic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {transformerItems.map((item) => {
            const data =
              selectedCountState === 1
                ? item.singular
                : selectedCountState === 2
                ? item.dual
                : item.plural;

            return (
              <div
                key={item.id}
                className="p-space-md rounded-2xl bg-surface-container-low border border-surface-container shadow-[0_3px_0_#dae2fd] flex flex-col items-center text-center transition-all hover:-translate-y-1"
              >
                <span className="text-xs text-on-surface-variant font-medium mb-1">
                  {item.label}
                </span>
                <div className="text-4xl mb-2">{item.icon}</div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-xs font-bold text-primary mb-2 shadow-xs">
                  <span>اسم الإشارة:</span>
                  <span className="text-sm font-extrabold">{data.demonstrative}</span>
                </div>

                <span className="text-2xl font-extrabold text-on-surface mt-1">
                  {showTashkeel ? data.tashkeel : data.word}
                </span>
                <span className="text-xs font-mono text-on-surface-variant mt-0.5">
                  {data.phonetic}
                </span>
                <span className="text-xs text-on-surface-variant mt-1">
                  {data.english}
                </span>

                <button
                  onClick={() => handlePlayWord(data.word)}
                  className="mt-3 w-8 h-8 rounded-full bg-primary/10 hover:bg-primary hover:text-on-primary text-primary flex items-center justify-center transition-colors cursor-pointer"
                  title="استمع"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">volume_up</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Bottom Sticky Milestone Bar */}
      <section className="sticky bottom-4 z-40 w-full mt-auto">
        <div className="p-space-md sm:p-space-lg bg-surface-container-lowest/95 backdrop-blur-xl rounded-2xl shadow-xl border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md w-full sm:w-auto">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-[0_2px_0_#68dba9] shrink-0">
              <span className="material-symbols-outlined text-2xl">stairs</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-on-surface">
                أكملت دراسة سلم القواعد بنجاح!
              </span>
              <span className="text-xs text-on-surface-variant">
                أنت الآن مستعد لتطبيق هذه القواعد في المحادثة اليومية الحية.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
            <Link
              href="/family-and-gender"
              className="flex items-center justify-center gap-1.5 px-space-lg h-12 sm:h-14 rounded-full bg-surface-container text-on-surface text-sm font-bold shadow-[0_4px_0_#d2d9f4] active:translate-y-[2px] active:shadow-[0_2px_0_#d2d9f4] hover:bg-surface-container-high transition-all"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
              <span>أفراد الأسرة</span>
            </Link>

            <Link
              href="/daily-dialogue"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-space-xl h-12 sm:h-14 rounded-full bg-primary text-on-primary text-base font-bold shadow-[0_4px_0_#005137] active:translate-y-[2px] active:shadow-[0_2px_0_#005137] hover:bg-primary-container transition-all text-center"
            >
              <span>الانتقال للمحادثة اليومية</span>
              <span className="material-symbols-outlined text-xl rotate-180">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
