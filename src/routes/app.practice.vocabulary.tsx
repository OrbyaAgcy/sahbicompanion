import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { VOCAB } from "@/lib/sahbi/data";
import { useProfile } from "@/lib/sahbi/store";
import { PageHeader } from "@/components/sahbi/PageHeader";
import { ArabicText } from "@/components/sahbi/ArabicText";
import { AudioButton } from "@/components/sahbi/AudioButton";
import { VariantChip } from "@/components/sahbi/VariantChip";

export const Route = createFileRoute("/app/practice/vocabulary")({
  component: VocabPage,
});

function VocabPage() {
  const { profile } = useProfile();
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const words = VOCAB.filter((v) => v.variant === profile.mainVariant);
  const word = words[i] ?? VOCAB[0];

  const rate = () => {
    setFlipped(false);
    setI((x) => (x + 1) % words.length);
  };

  return (
    <main className="mx-auto max-w-md px-6 pt-10 pb-16">
      <Link to="/app/practice" className="font-mono text-[11px] uppercase tracking-widest text-night/40">← Pratiquer</Link>
      <PageHeader eyebrow="Répétition espacée" title="Flashcards" subtitle={`${words.length} mots à réviser aujourd'hui.`} />

      <button
        onClick={() => setFlipped(!flipped)}
        className="relative w-full min-h-[280px] rounded-3xl border border-night/10 bg-white p-8 text-center flex flex-col justify-center items-center gap-4"
      >
        <div className="absolute top-4 left-4"><VariantChip variant={word.variant} /></div>
        <div className="absolute top-4 right-4"><AudioButton size="sm" /></div>
        {flipped ? (
          <>
            <p className="font-mono text-xs text-night/50">/ {word.translit} /</p>
            <p className="text-3xl font-extrabold">{word.translation}</p>
            <p className="text-xs text-night/40 mt-2">{word.category}</p>
          </>
        ) : (
          <ArabicText size="2xl" className="font-bold">{word.arabic}</ArabicText>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-night/40">Touche la carte pour la retourner</p>

      {flipped && (
        <div className="mt-6 grid grid-cols-4 gap-2 text-xs font-bold">
          <button onClick={rate} className="rounded-xl bg-clay py-3 text-ivory">Oublié</button>
          <button onClick={rate} className="rounded-xl bg-gold py-3 text-night">Difficile</button>
          <button onClick={rate} className="rounded-xl bg-forest py-3 text-ivory">Correct</button>
          <button onClick={rate} className="rounded-xl border border-night/15 bg-white py-3">Facile</button>
        </div>
      )}

      <section className="mt-12">
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-night/40 mb-4">Ta bibliothèque</h3>
        <div className="space-y-2">
          {words.slice(0, 6).map((w) => (
            <div key={w.id} className="flex items-center justify-between rounded-2xl border border-night/5 bg-white p-3">
              <div className="flex items-center gap-3 min-w-0">
                <ArabicText size="md" className="text-clay shrink-0">{w.arabic}</ArabicText>
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate">{w.translation}</p>
                  <p className="text-[11px] text-night/40 truncate">{w.translit}</p>
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-forest shrink-0">Maîtrisé</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}