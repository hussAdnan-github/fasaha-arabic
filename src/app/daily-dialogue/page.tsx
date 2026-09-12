"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLearning } from "@/context/LearningContext";
import { dialogueExchanges, DialogueMessage } from "@/data/dialogueData";

export default function DailyDialoguePage() {
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

  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [showEnglishTranslation, setShowEnglishTranslation] = useState(true);
  const [isRecordingMaster, setIsRecordingMaster] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);

  const handlePlayMessage = (msg: DialogueMessage) => {
    setActiveMessageId(msg.id);
    playFeedbackSound("tap");
    playPronunciation(showTashkeel ? msg.textWithTashkeel : msg.textPlain);
    setTimeout(() => setActiveMessageId(null), 1500);
  };

  const handlePlayAll = async () => {
    if (isPlayingAll) {
      setIsPlayingAll(false);
      window.speechSynthesis?.cancel();
      return;
    }

    setIsPlayingAll(true);
    const allMessages: DialogueMessage[] = [];
    dialogueExchanges.forEach((ex) => allMessages.push(...ex.messages));

    for (const msg of allMessages) {
      setActiveMessageId(msg.id);
      playPronunciation(showTashkeel ? msg.textWithTashkeel : msg.textPlain);
      await new Promise((r) => setTimeout(r, 2400 / audioSpeed));
    }
    setActiveMessageId(null);
    setIsPlayingAll(false);
    playFeedbackSound("success");
    addPoints(15);
  };

  const handleToggleVoiceRecord = () => {
    if (!isRecordingMaster) {
      setIsRecordingMaster(true);
      setHasRecorded(false);
      playFeedbackSound("tap");
    } else {
      setIsRecordingMaster(false);
      setHasRecorded(true);
      playFeedbackSound("success");
      addPoints(25);
    }
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* 1. Top Hero Context Panel */}
      <section className="relative w-full rounded-2xl bg-surface-container-lowest shadow-sm p-space-md md:p-space-lg overflow-hidden mb-space-lg border border-surface-container">
        <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-primary-fixed/20 pointer-events-none blur-2xl" />
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-tertiary-fixed/30 pointer-events-none blur-xl" />

        <div className="relative flex flex-col gap-space-md">
          {/* Breadcrumb + Scenario Badges */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/50 text-on-primary-fixed text-xs font-bold shadow-[0_2px_0_#85f8c4]">
                <span className="material-symbols-outlined text-[16px]">chat</span>
                المُحَادَثَةُ التَّفَاعُلِيَّة
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed text-xs font-bold shadow-[0_2px_0_#fea619]">
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  place
                </span>
                فِي فِنَاءِ المَدْرَسَةِ (In the Courtyard)
              </span>
            </div>

            <div className="flex items-center gap-space-xs text-on-surface-variant text-xs font-medium">
              <span className="material-symbols-outlined text-[18px] text-tertiary">
                schedule
              </span>
              <span>الوقت المقدر: ٣ دقائق</span>
              <span className="mx-1">•</span>
              <span className="text-primary font-bold">٣ تبادلات حوارية</span>
            </div>
          </div>

          {/* Dialogue Title and Action */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface m-0 leading-tight">
                {showTashkeel
                  ? "حِوَارُ التَّحِيَّاتِ وَالسُّؤَالِ عَنِ الحَال"
                  : "حوار التحيات والسؤال عن الحال"}
              </h1>
              <p className="text-sm text-on-surface-variant m-0 mt-1 max-w-2xl leading-relaxed">
                تَعَلَّمْ أُصُولَ إِلقَاءِ التَّحِيَّةِ الرَّسْمِيَّةِ وَالاطْمِئْنَانِ عَلَى الأَصْدِقَاءِ بِالعَرَبِيَّةِ الفُصْحَى بَيْنَ زَيْنَب وَعَلِيّ.
              </p>
            </div>

            {/* Master Playback CTA */}
            <button
              onClick={handlePlayAll}
              className="flex-shrink-0 flex items-center justify-center gap-space-sm px-6 py-3.5 rounded-full bg-primary text-on-primary font-bold shadow-[0_4px_0_#005137] hover:brightness-105 active:translate-y-[2px] active:shadow-[0_2px_0_#005137] transition-all cursor-pointer"
              type="button"
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlayingAll ? "pause" : "play_arrow"}
              </span>
              <span className="text-base">
                {isPlayingAll ? "إيقاف مؤقت للحوار" : "اسْتَمِعْ لِلْحِوَارِ كَامِلاً"}
              </span>
            </button>
          </div>

          {/* Settings Tooling Bar */}
          <div className="flex flex-wrap items-center justify-between gap-space-md pt-2 border-t border-surface-container">
            {/* Speed Selection Controls */}
            <div className="flex items-center gap-1 bg-surface-container rounded-full p-1 shadow-inner text-xs">
              <span className="text-on-surface-variant px-2 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">speed</span>
                السُّرْعَة:
              </span>
              <button
                onClick={() => {
                  setAudioSpeed(1.0);
                  playFeedbackSound("tap");
                }}
                className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                  audioSpeed === 1.0
                    ? "bg-tertiary text-on-tertiary shadow-[0_2px_0_#004b73]"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                type="button"
              >
                ١.٠x عادي
              </button>
              <button
                onClick={() => {
                  setAudioSpeed(0.75);
                  playFeedbackSound("tap");
                }}
                className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                  audioSpeed === 0.75
                    ? "bg-tertiary text-on-tertiary shadow-[0_2px_0_#004b73]"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                type="button"
              >
                ٠.٧٥x للمبتدئين 🐢
              </button>
            </div>

            {/* Toggle Controls (Subtitles & Tashkeel) */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <button
                onClick={toggleTashkeel}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                  showTashkeel
                    ? "bg-primary text-on-primary shadow-[0_2px_0_#005137]"
                    : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">format_size</span>
                <span>التَّشْكِيل: {showTashkeel ? "تَفْعِيل ✓" : "تَعْطِيل"}</span>
              </button>

              <button
                onClick={() => {
                  setShowEnglishTranslation(!showEnglishTranslation);
                  playFeedbackSound("tap");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                  showEnglishTranslation
                    ? "bg-tertiary text-on-tertiary shadow-[0_2px_0_#004b73]"
                    : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">translate</span>
                <span>الترجمة: {showEnglishTranslation ? "تَفْعِيل ✓" : "إِخْفَاء"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Chat Flow Section */}
      <div className="flex flex-col gap-space-lg max-w-4xl mx-auto w-full mb-space-xl">
        {dialogueExchanges.map((exchange) => (
          <div key={exchange.id} className="flex flex-col gap-space-md">
            {/* Step Notice Ribbon */}
            <div className="flex items-center justify-center gap-space-md my-1">
              <div className="h-0.5 flex-1 bg-surface-container-highest" />
              <span className="px-4 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold shadow-xs">
                {formatArabic(exchange.exchangeTitle)}
              </span>
              <div className="h-0.5 flex-1 bg-surface-container-highest" />
            </div>

            {/* Alternating Message Stream */}
            {exchange.messages.map((msg) => {
              const isZainab = msg.speaker === "zainab";
              const isActive = activeMessageId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-space-md w-full ${
                    isZainab ? "flex-row justify-start" : "flex-row-reverse justify-start"
                  }`}
                >
                  {/* Speaker Avatar */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`relative w-14 h-14 rounded-full p-1 shadow-sm ${
                        isZainab
                          ? "bg-primary-fixed ring-2 ring-primary/30"
                          : "bg-tertiary-fixed ring-2 ring-tertiary/30"
                      }`}
                    >
                      <Image
                        src={msg.speakerAvatar}
                        alt={msg.speakerName}
                        fill
                        className="rounded-full object-cover p-0.5"
                        sizes="56px"
                      />
                      <span
                        className={`absolute -bottom-1 ${
                          isZainab ? "-left-1" : "-right-1"
                        } w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm ${
                          isZainab ? "bg-primary text-on-primary" : "bg-tertiary text-on-tertiary"
                        }`}
                      >
                        {msg.speakerBadge}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-on-surface mt-1">
                      {formatArabic(msg.speakerName)}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">
                      {msg.speakerRole}
                    </span>
                  </div>

                  {/* Bubble Container */}
                  <div className="flex flex-col max-w-xl w-full">
                    <div
                      className={`relative p-space-md transition-all duration-200 ${
                        isZainab
                          ? "bg-primary-fixed/25 rounded-2xl rounded-tr-none shadow-[0_4px_0_#85f8c4]"
                          : "bg-surface-container rounded-2xl rounded-tl-none shadow-[0_4px_0_#d2d9f4]"
                      } ${isActive ? "ring-2 ring-primary scale-[1.01]" : ""}`}
                    >
                      {/* Sub-header */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold ${msg.badgeBg}`}
                        >
                          {formatArabic(msg.indicatorText)}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handlePlayMessage(msg)}
                            className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                            title="استمع للنطق"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              volume_up
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Arabic Script */}
                      <p className="text-2xl sm:text-3xl font-extrabold text-on-surface leading-loose m-0">
                        {showTashkeel ? msg.textWithTashkeel : msg.textPlain}
                      </p>

                      {/* Phonetics */}
                      <div className="text-xs font-mono font-semibold text-primary mt-1 text-left dir-ltr">
                        {msg.phonetic}
                      </div>

                      {/* Translation */}
                      {showEnglishTranslation && (
                        <div className="mt-1.5 pt-1.5 border-t border-black/5 text-xs text-on-surface-variant text-left dir-ltr">
                          {msg.translation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 3. Interactive Speaking Practice Station */}
      <section className="mt-space-lg max-w-4xl mx-auto w-full bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container relative overflow-hidden mb-space-xl">
        <div className="flex items-center justify-between flex-wrap gap-space-sm mb-space-md">
          <div className="flex items-center gap-space-sm">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary-fixed text-secondary shadow-[0_2px_0_#fea619]">
              <span className="material-symbols-outlined text-2xl">record_voice_over</span>
            </span>
            <div>
              <h2 className="text-xl font-bold text-on-surface m-0">
                دَوْرُكَ فِي الكَلَامِ! (Your Turn to Speak)
              </h2>
              <p className="text-xs text-on-surface-variant m-0">
                انْطِقِ الجُمْلَةَ التَّالِيَةَ بِمَخَارِجِ حُرُوفٍ صَحِيحَةٍ لِقِيَاسِ فَصَاحَتِك
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed text-xs font-bold">
            +٢٥ نقطة خبرة XP 💎
          </span>
        </div>

        {/* Speech Challenge Card */}
        <div className="bg-surface-container-low rounded-2xl p-space-lg text-center flex flex-col items-center justify-center gap-2 border border-surface-container">
          <span className="text-xs text-on-surface-variant font-semibold">
            الجُمْلَةُ المَطْلُوبُ نُطْقُهَا:
          </span>
          <div className="text-3xl font-extrabold text-primary tracking-normal py-1">
            « بِخَيْرٍ وَالحَمْدُ للهِ »
          </div>
          <div className="text-xs text-on-surface-variant font-mono dir-ltr">
            [ Bi-khay-rin wal-ḥam-du lil-lāh ]
          </div>

          {/* Animated Sound Wave Visualizer Mock */}
          <div
            className={`flex items-center justify-center gap-1.5 h-10 my-2 transition-opacity duration-300 ${
              isRecordingMaster ? "opacity-100" : "opacity-25"
            }`}
          >
            <span className="w-1.5 h-4 bg-primary rounded-full animate-bounce" />
            <span className="w-1.5 h-8 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
            <span className="w-1.5 h-10 bg-primary-container rounded-full animate-bounce [animation-delay:0.3s]" />
            <span className="w-1.5 h-6 bg-primary rounded-full animate-bounce [animation-delay:0.45s]" />
            <span className="w-1.5 h-9 bg-primary-container rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-5 bg-primary rounded-full animate-bounce [animation-delay:0.35s]" />
            <span className="w-1.5 h-7 bg-primary rounded-full animate-bounce [animation-delay:0.1s]" />
          </div>

          {/* Main Action Recording Button */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleToggleVoiceRecord}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isRecordingMaster
                  ? "bg-error text-on-error animate-pulse shadow-[0_4px_0_#93000a]"
                  : "bg-primary text-on-primary shadow-[0_4px_0_#005137] active:translate-y-[2px] active:shadow-[0_2px_0_#005137] hover:brightness-105"
              }`}
              type="button"
              title={isRecordingMaster ? "إيقاف التسجيل" : "ابدأ التسجيل"}
            >
              <span className="material-symbols-outlined text-4xl">
                {isRecordingMaster ? "graphic_eq" : "mic"}
              </span>
            </button>
            <span className="text-sm font-bold text-on-surface">
              {isRecordingMaster
                ? "جَارٍ الاسْتِمَاعُ... تَحَدَّثْ الآنَ بِوُضُوحٍ!"
                : "اضْغَطْ هُنَا وَاقْرَأْ الجُمْلَةَ بِصَوْتٍ وَاضِحٍ"}
            </span>
          </div>

          {/* Pronunciation Score Result Display */}
          {hasRecorded && (
            <div className="mt-4 p-4 w-full max-w-md rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between gap-space-md border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary text-sm">
                  ٩٨٪
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-bold text-on-surface">
                    نطق ممتاز ومخارج حروف متقنة!
                  </h4>
                  <p className="text-xs text-primary font-bold">
                    +٢٥ نقطة خبرة إضافية لطلاقة اللسان
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary text-2xl">
                verified
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 4. Bottom Sticky Milestone Bar */}
      <section className="sticky bottom-4 z-40 w-full mt-auto">
        <div className="p-space-md sm:p-space-lg bg-surface-container-lowest/95 backdrop-blur-xl rounded-2xl shadow-xl border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md w-full sm:w-auto">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-[0_2px_0_#fea619] shrink-0">
              <span className="material-symbols-outlined text-2xl">forum</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-on-surface">
                أكملت حوار التحيات بطلاقة!
              </span>
              <span className="text-xs text-on-surface-variant">
                أنت الآن مستعد لاختبار معلوماتك وتثبيتها في قسم التمارين التفاعلية.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
            <Link
              href="/grammar-ladder"
              className="flex items-center justify-center gap-1.5 px-space-lg h-12 sm:h-14 rounded-full bg-surface-container text-on-surface text-sm font-bold shadow-[0_4px_0_#d2d9f4] active:translate-y-[2px] active:shadow-[0_2px_0_#d2d9f4] hover:bg-surface-container-high transition-all"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
              <span>سلم القواعد</span>
            </Link>

            <Link
              href="/interactive-practice"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-space-xl h-12 sm:h-14 rounded-full bg-primary text-on-primary text-base font-bold shadow-[0_4px_0_#005137] active:translate-y-[2px] active:shadow-[0_2px_0_#005137] hover:bg-primary-container transition-all text-center"
            >
              <span>الانتقال للتمارين التفاعلية</span>
              <span className="material-symbols-outlined text-xl rotate-180">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
