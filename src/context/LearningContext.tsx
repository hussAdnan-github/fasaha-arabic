"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { removeTashkeel } from "@/utils/arabic";
import { curriculumLevels, LevelItem } from "@/data/levelsData";

interface LearningContextType {
  streakDays: number;
  points: number;
  hearts: number;
  isMuted: boolean;
  audioSpeed: number;
  showTashkeel: boolean;
  currentLevelId: string;
  currentLevel: LevelItem;
  levels: LevelItem[];
  unlockedLevels: string[];
  setCurrentLevelId: (id: string) => void;
  unlockLevel: (id: string) => void;
  addPoints: (amount: number) => void;
  decrementHeart: () => void;
  toggleMute: () => void;
  setAudioSpeed: (speed: number) => void;
  setShowTashkeel: (val: boolean) => void;
  toggleTashkeel: () => void;
  formatArabic: (text: string, plainFallback?: string) => string;
  playPronunciation: (text: string) => void;
  playFeedbackSound: (type: "success" | "tap" | "complete" | "error") => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [streakDays, setStreakDays] = useState(7);
  const [points, setPoints] = useState(450);
  const [hearts, setHearts] = useState(5);
  const [isMuted, setIsMuted] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1);
  const [showTashkeel, setShowTashkeelState] = useState(true);
  const [currentLevelId, setCurrentLevelIdState] = useState("level-1");
  const [unlockedLevels, setUnlockedLevels] = useState<string[]>(["level-1", "level-2"]);

  // Load Tashkeel & Level preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("fasaha_show_tashkeel");
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          setShowTashkeelState(parsed);
          document.documentElement.setAttribute("data-tashkeel", parsed ? "enabled" : "disabled");
        } else {
          document.documentElement.setAttribute("data-tashkeel", "enabled");
        }

        const savedLvl = localStorage.getItem("fasaha_current_level");
        if (savedLvl && curriculumLevels.some((l) => l.id === savedLvl)) {
          setCurrentLevelIdState(savedLvl);
        }

        const savedUnlocked = localStorage.getItem("fasaha_unlocked_levels");
        if (savedUnlocked) {
          setUnlockedLevels(JSON.parse(savedUnlocked));
        }
      } catch {
        // Ignore localStorage errors
      }
    }
  }, []);

  const setCurrentLevelId = (id: string) => {
    setCurrentLevelIdState(id);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("fasaha_current_level", id);
      } catch {
        // Ignore
      }
    }
    playFeedbackSound("tap");
  };

  const unlockLevel = (id: string) => {
    setUnlockedLevels((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("fasaha_unlocked_levels", JSON.stringify(next));
        } catch {
          // Ignore
        }
      }
      return next;
    });
    playFeedbackSound("complete");
  };

  const currentLevel =
    curriculumLevels.find((l) => l.id === currentLevelId) || curriculumLevels[0];

  const setShowTashkeel = (val: boolean) => {
    setShowTashkeelState(val);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("fasaha_show_tashkeel", JSON.stringify(val));
        document.documentElement.setAttribute("data-tashkeel", val ? "enabled" : "disabled");
      } catch {
        // Ignore localStorage errors
      }
    }
  };

  const toggleTashkeel = () => {
    setShowTashkeelState((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("fasaha_show_tashkeel", JSON.stringify(next));
          document.documentElement.setAttribute("data-tashkeel", next ? "enabled" : "disabled");
        } catch {
          // Ignore localStorage errors
        }
      }
      return next;
    });
    playFeedbackSound("tap");
  };

  const formatArabic = useCallback(
    (text: string, plainFallback?: string): string => {
      if (!text) return "";
      if (showTashkeel) return text;
      return plainFallback !== undefined ? plainFallback : removeTashkeel(text);
    },
    [showTashkeel]
  );

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
    playFeedbackSound("success");
  };

  const decrementHeart = () => {
    setHearts((prev) => Math.max(0, prev - 1));
    playFeedbackSound("error");
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const playFeedbackSound = (type: "success" | "tap" | "complete" | "error") => {
    if (isMuted || typeof window === "undefined") return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === "tap") {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } else if (type === "success") {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === "complete") {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.12);
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.24); // G5
        osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.36); // C6
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } else if (type === "error") {
        osc.frequency.setValueAtTime(260, audioCtx.currentTime);
        osc.frequency.setValueAtTime(220, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const playPronunciation = (text: string) => {
    if (isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    
    // Clean string for speech synthesis
    const cleanText = text.replace(/\[.*?\]/g, "").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "ar-SA";
    utterance.rate = audioSpeed;

    // Try to find Arabic voice
    const voices = window.speechSynthesis.getVoices();
    const arVoice = voices.find((v) => v.lang.startsWith("ar"));
    if (arVoice) {
      utterance.voice = arVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  return (
    <LearningContext.Provider
      value={{
        streakDays,
        points,
        hearts,
        isMuted,
        audioSpeed,
        showTashkeel,
        currentLevelId,
        currentLevel,
        levels: curriculumLevels,
        unlockedLevels,
        setCurrentLevelId,
        unlockLevel,
        addPoints,
        decrementHeart,
        toggleMute,
        setAudioSpeed,
        setShowTashkeel,
        toggleTashkeel,
        formatArabic,
        playPronunciation,
        playFeedbackSound,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error("useLearning must be used within a LearningProvider");
  }
  return context;
}
