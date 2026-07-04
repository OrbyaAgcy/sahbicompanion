import { useEffect, useState } from "react";
import type { VariantSlug } from "./types";

export interface SahbiProfile {
  firstName: string;
  mainVariant: VariantSlug;
  secondaryVariant: VariantSlug | null;
  level: "zero" | "few" | "sentences" | "conversation" | "advanced";
  reads: "no" | "some" | "yes";
  dailyMinutes: number;
  interests: string[];
  objective: string;
  transliteration: boolean;
  diacritics: boolean;
  darkMode: boolean;
  onboardingCompleted: boolean;
  streak: number;
  xp: number;
  minutesToday: number;
  minutesWeek: number;
  wordsLearned: number;
  lessonsCompleted: number;
}

const DEFAULT: SahbiProfile = {
  firstName: "Ami·e",
  mainVariant: "fusha",
  secondaryVariant: null,
  level: "zero",
  reads: "no",
  dailyMinutes: 10,
  interests: [],
  objective: "",
  transliteration: true,
  diacritics: true,
  darkMode: false,
  onboardingCompleted: false,
  streak: 8,
  xp: 340,
  minutesToday: 12,
  minutesWeek: 85,
  wordsLearned: 47,
  lessonsCompleted: 6,
};

const KEY = "sahbi.profile.v1";

function read(): SahbiProfile {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

function write(p: SahbiProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new CustomEvent("sahbi:profile"));
}

export function useProfile() {
  const [profile, setProfile] = useState<SahbiProfile>(DEFAULT);
  useEffect(() => {
    setProfile(read());
    const on = () => setProfile(read());
    window.addEventListener("sahbi:profile", on);
    window.addEventListener("storage", on);
    return () => {
      window.removeEventListener("sahbi:profile", on);
      window.removeEventListener("storage", on);
    };
  }, []);
  const update = (patch: Partial<SahbiProfile>) => {
    const next = { ...read(), ...patch };
    write(next);
    setProfile(next);
  };
  return { profile, update, reset: () => write(DEFAULT) };
}

export function readProfile() {
  return read();
}