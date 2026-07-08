import { createServerFn } from "@tanstack/react-start";
import { VARIANT_LABEL } from "./data";
import type { VariantSlug } from "./types";

export interface CompanionTurn {
  role: "user" | "companion";
  text: string;
}

export interface CompanionReply {
  arabic: string;
  translit: string;
  translation: string;
  note?: string;
  demo?: boolean;
}

interface CompanionRequest {
  variant: VariantSlug;
  level: string;
  scenarioTitle: string;
  scenarioDesc: string;
  history: CompanionTurn[];
  message: string;
}

const LEVEL_LABEL: Record<string, string> = {
  zero: "débutant complet, ne connaît quasiment aucun mot",
  few: "connaît quelques mots isolés",
  sentences: "comprend et forme des phrases simples",
  conversation: "peut tenir une petite conversation",
  advanced: "niveau avancé, à l'aise à l'oral",
};

function buildSystemPrompt(req: CompanionRequest): string {
  const variantName = VARIANT_LABEL[req.variant] ?? req.variant;
  const levelLabel = LEVEL_LABEL[req.level] ?? req.level;
  return [
    `Tu es "Sahbi", un compagnon de conversation chaleureux qui aide un francophone à apprendre l'arabe (variante : ${variantName}).`,
    `Niveau de l'utilisateur : ${levelLabel}.`,
    `Scénario de la conversation en cours : "${req.scenarioTitle}" (${req.scenarioDesc}).`,
    "",
    "Règles strictes :",
    "- Réponds UNIQUEMENT avec un objet JSON valide, sans aucun texte avant ou après, au format exact :",
    `{"arabic": "...", "translit": "...", "translation": "...", "note": "..."}`,
    `- "arabic" : ta réplique en arabe (variante ${variantName}), 1 à 2 phrases courtes, adaptée au niveau de l'utilisateur.`,
    `- "translit" : translittération latine simple de "arabic".`,
    `- "translation" : traduction française naturelle de "arabic".`,
    `- "note" : optionnel — une courte correction bienveillante si le dernier message de l'utilisateur contient une erreur d'arabe, sinon une chaîne vide.`,
    "- Reste dans le scénario, encourage l'utilisateur, ne romps jamais le personnage, ne mentionne jamais que tu es une IA.",
  ].join("\n");
}

const DEMO_POOL: { arabic: string; translit: string; translation: string }[] = [
  { arabic: "تمام! خبّرني أكتر.", translit: "tamām! khabbirni aktar.", translation: "Très bien ! Dis-m'en plus." },
  { arabic: "ممتاز، كمّل معايا.", translit: "mumtāz, kammil ma'āya.", translation: "Excellent, continue avec moi." },
  { arabic: "فاهم عليك، شو رأيك نكمل؟", translit: "fāhem 'alayk, shu ra'yak nkammil?", translation: "Je te comprends, on continue ?" },
  { arabic: "حلو كتير! جرّب تعيد الجملة.", translit: "ḥelou ktīr! jarreb t'īd al-jumla.", translation: "Très bien ! Essaie de répéter la phrase." },
  { arabic: "برافو عليك، تتقدّم بسرعة.", translit: "brāvo 'alayk, tetqaddam bisur'a.", translation: "Bravo, tu progresses vite." },
];

function fallbackReply(seed: string): CompanionReply {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const pick = DEMO_POOL[(hash + seed.length) % DEMO_POOL.length];
  return { ...pick, demo: true };
}

function parseReply(text: string): CompanionReply | null {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    const raw = match ? match[0] : text;
    const obj = JSON.parse(raw) as Record<string, unknown>;
    if (typeof obj.arabic !== "string" || typeof obj.translation !== "string") return null;
    return {
      arabic: obj.arabic,
      translit: typeof obj.translit === "string" ? obj.translit : "",
      translation: obj.translation,
      note: typeof obj.note === "string" && obj.note.trim() ? obj.note : undefined,
    };
  } catch {
    return null;
  }
}

export const sendCompanionMessage = createServerFn({ method: "POST" })
  .validator((data: CompanionRequest) => data)
  .handler(async ({ data }): Promise<CompanionReply> => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return fallbackReply(data.message);
    }

    const messages = [
      ...data.history.map((turn) => ({
        role: turn.role === "user" ? ("user" as const) : ("assistant" as const),
        content: turn.text,
      })),
      { role: "user" as const, content: data.message },
    ];

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-opus-4-8",
          max_tokens: 400,
          system: buildSystemPrompt(data),
          messages,
        }),
      });

      if (!res.ok) {
        console.error("Anthropic API error", res.status, await res.text().catch(() => ""));
        return fallbackReply(data.message);
      }

      const json = (await res.json()) as {
        stop_reason?: string;
        content?: { type: string; text?: string }[];
      };

      if (json.stop_reason === "refusal") {
        return fallbackReply(data.message);
      }

      const textBlock = json.content?.find((b) => b.type === "text" && b.text);
      if (!textBlock?.text) return fallbackReply(data.message);

      return parseReply(textBlock.text) ?? fallbackReply(data.message);
    } catch (err) {
      console.error("Companion request failed", err);
      return fallbackReply(data.message);
    }
  });
