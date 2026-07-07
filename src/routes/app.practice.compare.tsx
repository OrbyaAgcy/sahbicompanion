import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DIALECT_COMPARISONS } from "@/lib/sahbi/data";
import { PageHeader } from "@/components/sahbi/PageHeader";
import { ArabicText } from "@/components/sahbi/ArabicText";
import { AudioButton } from "@/components/sahbi/AudioButton";
import { VariantChip } from "@/components/sahbi/VariantChip";
import { Search } from "lucide-react";

export const Route = createFileRoute("/app/practice/compare")({
  component: Compare,
});

function Compare() {
  const [q, setQ] = useState("");
  const filtered = q.trim()
    ? DIALECT_COMPARISONS.filter((c) => c.french.toLowerCase().includes(q.toLowerCase()))
    : DIALECT_COMPARISONS;

  return (
    <main className="mx-auto max-w-2xl px-6 pt-10 pb-16">
      <Link to="/app/practice" className="font-mono text-[11px] uppercase tracking-widest text-night/40">← Pratiquer</Link>
      <PageHeader
        eyebrow="Comment le dit-on ?"
        title="Une expression, plusieurs mondes."
        subtitle="Ton parcours principal reste ta boussole. Utilise-le pour explorer, pas pour mélanger."
      />

      <div className="relative">
        <Search className="absolute left-4 top-3.5 size-4 text-night/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Comment vas-tu, Merci, Combien…"
          className="w-full rounded-xl border border-night/10 bg-white pl-11 pr-4 py-3 outline-none focus:border-forest"
        />
      </div>

      <div className="mt-8 space-y-8">
        {filtered.map((c) => (
          <div key={c.french}>
            <h3 className="text-lg font-extrabold tracking-tight">{c.french}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {c.entries.map((e) => (
                <div key={e.variant} className="ios-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <VariantChip variant={e.variant} />
                    <AudioButton size="sm" />
                  </div>
                  <ArabicText size="lg" className="font-bold">{e.arabic}</ArabicText>
                  <p className="mt-2 font-mono text-xs italic text-night/50">/ {e.translit} /</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}