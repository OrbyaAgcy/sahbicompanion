import { Volume2 } from "lucide-react";
import { toast } from "sonner";

export function AudioButton({ label, size = "md" }: { label?: string; size?: "sm" | "md" | "lg" }) {
  const s = size === "sm" ? "size-9" : size === "lg" ? "size-12" : "size-11";
  return (
    <button
      type="button"
      aria-label={label ?? "Écouter"}
      onClick={() => toast("Audio bientôt disponible", { description: "La prononciation native arrive vite." })}
      className={`${s} ios-pressable rounded-full ios-material grid place-items-center text-clay active:text-clay/80`}
    >
      <Volume2 className="size-[18px]" strokeWidth={2} />
    </button>
  );
}