import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ALPHABET_LETTERS } from "@/lib/sahbi/data";
import { PageHeader } from "@/components/sahbi/PageHeader";
import { AudioButton } from "@/components/sahbi/AudioButton";

export const Route = createFileRoute("/app/practice/alphabet")({
  component: Alphabet,
});

function Alphabet() {
  const [sel, setSel] = useState(0);
  const letter = ALPHABET_LETTERS[sel];

  return (
    <main className="mx-auto max-w-2xl px-6 pt-10 pb-16">
      <Link to="/app/practice" className="font-mono text-[11px] uppercase tracking-widest text-night/40">← Pratiquer</Link>
      <PageHeader eyebrow="Alphabet" title="Les 28 lettres." subtitle="Sons, tracés et paires proches." />

      <div className="rounded-3xl border border-clay/10 bg-clay/5 p-8 text-center">
        <span dir="rtl" className="font-arabic text-8xl font-bold text-night block">{letter.letter}</span>
        <p className="mt-4 font-mono text-sm italic text-night/50">{letter.name}</p>
        <p className="mt-1 text-sm">Son : <span className="font-bold">{letter.sound}</span></p>
        <div className="mt-6 flex justify-center"><AudioButton text={letter.letter} variant="fusha" /></div>
      </div>

      <div className="mt-8 grid grid-cols-6 sm:grid-cols-8 gap-2">
        {ALPHABET_LETTERS.map((l, i) => (
          <button
            key={l.letter}
            onClick={() => setSel(i)}
            className={`aspect-square rounded-xl border font-arabic text-2xl grid place-items-center transition-colors ${
              i === sel ? "border-forest bg-forest text-ivory" : "border-night/10 bg-white hover:border-forest/40"
            }`}
          >
            {l.letter}
          </button>
        ))}
      </div>

      <div className="mt-10 ios-card p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-clay mb-2">Paires proches</p>
        <p className="text-sm">ب / ت / ث · ج / ح / خ · د / ذ · ص / ض · ط / ظ · ع / غ · ف / ق</p>
      </div>
    </main>
  );
}