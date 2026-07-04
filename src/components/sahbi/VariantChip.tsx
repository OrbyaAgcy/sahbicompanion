import { VARIANT_LABEL } from "@/lib/sahbi/data";
import type { VariantSlug } from "@/lib/sahbi/types";

export function VariantChip({ variant }: { variant: VariantSlug }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded bg-clay px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ivory">
      {VARIANT_LABEL[variant] ?? variant}
    </span>
  );
}