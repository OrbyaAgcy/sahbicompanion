import { VARIANT_LABEL } from "@/lib/sahbi/data";
import type { VariantSlug } from "@/lib/sahbi/types";

export function VariantChip({ variant }: { variant: VariantSlug }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-clay/10 px-2.5 py-1 text-[11px] font-semibold tracking-tight text-clay">
      {VARIANT_LABEL[variant] ?? variant}
    </span>
  );
}