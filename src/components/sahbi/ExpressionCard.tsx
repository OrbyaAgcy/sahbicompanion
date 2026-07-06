import { AudioButton } from "./AudioButton";
import { ArabicText } from "./ArabicText";
import { VariantChip } from "./VariantChip";
import type { Expression } from "@/lib/sahbi/types";

export function ExpressionCard({ expr, showTranslit = true }: { expr: Expression; showTranslit?: boolean }) {
  return (
    <div className="ios-card-lg p-6 animate-ios-in bg-[linear-gradient(180deg,color-mix(in_oklab,var(--clay)_6%,var(--card)),var(--card))]">
      <div className="mb-6 flex items-start justify-between">
        <VariantChip variant={expr.variant} />
        <AudioButton />
      </div>
      <div className="mb-4">
        <ArabicText size="xl" className="font-semibold text-night">
          {expr.arabic}
        </ArabicText>
      </div>
      <div className="space-y-1">
        {showTranslit && (
          <p className="font-mono text-[11px] text-night/45">/ {expr.translit} /</p>
        )}
        <p className="text-[17px] font-semibold tracking-tight">{expr.translation}</p>
      </div>
      <div className="mt-6 border-t border-[var(--ios-hairline)] pt-4">
        <p className="text-[13px] leading-relaxed text-night/60">{expr.note}</p>
      </div>
    </div>
  );
}