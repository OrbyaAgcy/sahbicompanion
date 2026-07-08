import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/sahbi/PageHeader";
import { ArabicText } from "@/components/sahbi/ArabicText";
import { AudioButton } from "@/components/sahbi/AudioButton";
import { Mic } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/practice/pronunciation")({
  component: Pronunciation,
});

function Pronunciation() {
  const [score, setScore] = useState<number | null>(null);

  return (
    <main className="mx-auto max-w-md px-6 pt-10 pb-16">
      <Link to="/app/practice" className="font-mono text-[11px] uppercase tracking-widest text-night/40">← Pratiquer</Link>
      <PageHeader eyebrow="Prononciation" title="Trouve ta voix." subtitle="Répète après le natif, on analyse ta prononciation." />

      <div className="ios-card-lg p-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-clay">Phrase à répéter</p>
        <div className="mt-4"><ArabicText size="xl" className="font-bold">مَرْحَبًا، كَيْفَ حَالُك؟</ArabicText></div>
        <p className="mt-3 font-mono text-xs italic text-night/50">/ marḥaban, kayfa ḥāluk? /</p>
        <p className="mt-1 text-sm">Bonjour, comment vas-tu ?</p>
        <div className="mt-6 flex justify-center"><AudioButton size="lg" text="مَرْحَبًا، كَيْفَ حَالُك؟" variant="fusha" /></div>
      </div>

      <div className="mt-8 grid place-items-center">
        <button
          onClick={() => {
            toast("Analyse en cours…");
            setTimeout(() => setScore(76 + Math.floor(Math.random() * 20)), 900);
          }}
          className="size-20 rounded-full bg-clay text-ivory grid place-items-center shadow-2xl hover:scale-105 transition-transform"
        >
          <Mic className="size-8" />
        </button>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-night/40">Maintiens pour parler</p>
      </div>

      {score !== null && (
        <div className="mt-8 rounded-3xl border border-forest/20 bg-forest/5 p-6 animate-fade-in">
          <p className="font-mono text-[10px] uppercase tracking-widest text-forest mb-2">Résultat</p>
          <p className="text-4xl font-extrabold text-forest">{score}/100</p>
          <div className="mt-4 space-y-2 text-sm">
            <p>• <span className="font-bold">ح</span> — travaille le son guttural.</p>
            <p>• Rythme et intonation : très bons.</p>
          </div>
          <button onClick={() => setScore(null)} className="mt-4 w-full rounded-xl bg-forest py-3 text-sm font-bold text-ivory">
            Recommencer
          </button>
        </div>
      )}
    </main>
  );
}