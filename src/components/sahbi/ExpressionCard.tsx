import { AudioButton } from "./AudioButton";
import { ArabicText } from "./ArabicText";
import { VariantChip } from "./VariantChip";
import type { Expression } from "@/lib/sahbi/types";

export function ExpressionCard({ expr, showTranslit = true }: { expr: Expression; showTranslit?: boolean }) {
  return (
    <div className="rounded-3xl border border-clay/10 bg-clay/5 p-6">
      <div className="mb-6 flex items-start justify-between">
        <VariantChip variant={expr.variant} />
        <AudioButton />
      </div>
      <div className="mb-4">
        <ArabicText size="xl" className="font-bold text-night">
          {expr.arabic}
        </ArabicText>
      </div>
      <div className="space-y-1">
        {showTranslit && (
          <p className="font-mono text-xs italic text-night/50">/ {expr.translit} /</p>
        )}
        <p className="text-lg font-bold">{expr.translation}</p>
      </div>
      <div className="mt-6 border-t border-clay/10 pt-4">
        <p className="text-xs leading-relaxed text-night/60">{expr.note}</p>
      </div>
    </div>
  );
}