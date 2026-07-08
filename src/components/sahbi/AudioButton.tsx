import { Loader2, Volume2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { VARIANT_LANG } from "@/lib/sahbi/data";
import type { VariantSlug } from "@/lib/sahbi/types";

export function AudioButton({
  text,
  variant,
  label,
  size = "md",
}: {
  text?: string;
  variant?: VariantSlug;
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [speaking, setSpeaking] = useState(false);
  const s = size === "sm" ? "size-9" : size === "lg" ? "size-12" : "size-11";

  const speak = () => {
    if (!text) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast("Lecture audio non supportée par ce navigateur.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = variant ? (VARIANT_LANG[variant] ?? "ar") : "ar";
    utterance.rate = 0.85;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      aria-label={label ?? "Écouter"}
      onClick={speak}
      disabled={!text}
      className={`${s} ios-pressable rounded-full ios-material grid place-items-center text-clay active:text-clay/80 disabled:opacity-40`}
    >
      {speaking ? (
        <Loader2 className="size-[18px] animate-spin" strokeWidth={2} />
      ) : (
        <Volume2 className="size-[18px]" strokeWidth={2} />
      )}
    </button>
  );
}
