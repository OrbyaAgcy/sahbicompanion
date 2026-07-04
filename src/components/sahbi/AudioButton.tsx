import { Volume2 } from "lucide-react";
import { toast } from "sonner";

export function AudioButton({ label, size = "md" }: { label?: string; size?: "sm" | "md" | "lg" }) {
  const s = size === "sm" ? "size-8" : size === "lg" ? "size-12" : "size-10";
  return (
    <button
      type="button"
      aria-label={label ?? "Écouter"}
      onClick={() => toast("Audio bientôt disponible", { description: "La prononciation native arrive vite." })}
      className={`${s} rounded-full border border-clay/30 bg-white grid place-items-center text-clay hover:bg-clay hover:text-ivory transition-colors`}
    >
      <Volume2 className="size-4" />
    </button>
  );
}