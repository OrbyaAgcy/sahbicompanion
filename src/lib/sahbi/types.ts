export type VariantSlug =
  | "fusha"
  | "libanais"
  | "darija"
  | "egyptien"
  | "algerien"
  | "tunisien"
  | "golfe"
  | "classique";

export interface ArabicVariant {
  slug: VariantSlug;
  name: string;
  nativeName: string;
  region: string;
  description: string;
  speakers: string;
  available: boolean;
}

export interface Vocab {
  id: string;
  variant: VariantSlug;
  arabic: string;
  translit: string;
  translation: string;
  category: string;
  example?: { arabic: string; translation: string };
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  minutes: number;
  xp: number;
  steps: LessonStep[];
}

export type LessonStep =
  | { type: "intro"; title: string; body: string }
  | { type: "flashcard"; arabic: string; translit: string; translation: string }
  | {
      type: "choice";
      prompt: string;
      arabic?: string;
      translit?: string;
      options: string[];
      correct: number;
    }
  | { type: "order"; prompt: string; tokens: string[]; correct: string[] }
  | { type: "translate"; prompt: string; arabic: string; translit: string; answer: string }
  | { type: "listen"; arabic: string; translit: string; options: string[]; correct: number };

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  xpReward: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  variant: VariantSlug;
  title: string;
  description: string;
  level: string;
  modules: Module[];
}

export interface Expression {
  id: string;
  variant: VariantSlug;
  arabic: string;
  translit: string;
  translation: string;
  note: string;
}

export interface DialectComparison {
  french: string;
  entries: { variant: VariantSlug; arabic: string; translit: string; note?: string }[];
}

export interface Achievement {
  slug: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}