import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { COURSES } from "@/lib/sahbi/data";
import { ArabicText } from "@/components/sahbi/ArabicText";
import { AudioButton } from "@/components/sahbi/AudioButton";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LessonStep } from "@/lib/sahbi/types";

export const Route = createFileRoute("/app/lesson/$lessonId")({
  component: LessonPage,
  notFoundComponent: () => (
    <main className="p-6 text-center">
      <h1 className="text-xl font-bold">Leçon introuvable</h1>
      <Link to="/app/learn" className="mt-4 inline-block text-forest font-bold">← Retour</Link>
    </main>
  ),
  errorComponent: () => <div className="p-6">Erreur.</div>,
  loader: ({ params }) => {
    for (const c of COURSES) {
      for (const m of c.modules) {
        const l = m.lessons.find((ll) => ll.id === params.lessonId);
        if (l) return { lesson: l };
      }
    }
    throw notFound();
  },
});

function LessonPage() {
  const { lesson } = Route.useLoaderData();
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const step = lesson.steps[i];
  const pct = Math.round((i / lesson.steps.length) * 100);

  const advance = (wasCorrect = true) => {
    if (wasCorrect) setCorrect((c) => c + 1);
    if (i + 1 >= lesson.steps.length) setDone(true);
    else setI(i + 1);
  };

  if (done) {
    const accuracy = Math.round((correct / lesson.steps.length) * 100);
    return (
      <main className="mx-auto max-w-md px-6 pt-16 pb-24 text-center animate-fade-in">
        <p className="font-mono text-[11px] uppercase tracking-widest text-clay">Leçon terminée</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Mabrouk !</h1>
        <div className="mt-10 grid grid-cols-3 gap-3">
          <StatBox label="Précision" value={`${accuracy}%`} />
          <StatBox label="XP" value={`+${lesson.xp}`} />
          <StatBox label="Temps" value={`${lesson.minutes}m`} />
        </div>
        <div className="mt-10 space-y-3">
          <button
            onClick={() => navigate({ to: "/app" })}
            className="w-full rounded-xl bg-forest py-3.5 text-sm font-bold text-ivory"
          >
            Continuer
          </button>
          <button
            onClick={() => { setI(0); setCorrect(0); setDone(false); }}
            className="ios-pressable w-full rounded-xl border border-night/15 bg-card py-3.5 text-sm font-bold"
          >
            Revoir mes erreurs
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen sahbi-bg pb-16">
      <header className="mx-auto max-w-md px-6 pt-8 flex items-center gap-4">
        <button onClick={() => navigate({ to: "/app/learn" })} className="text-night/60">
          <X className="size-5" />
        </button>
        <div className="flex-1 h-2 rounded-full bg-night/5 overflow-hidden">
          <div className="h-full bg-forest transition-all" style={{ width: `${pct}%` }} />
        </div>
      </header>

      <main className="mx-auto max-w-md px-6 pt-10">
        <StepRenderer step={step} onDone={advance} />
      </main>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="ios-card p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-night/40">{label}</p>
      <p className="mt-1 text-2xl font-extrabold">{value}</p>
    </div>
  );
}

function StepRenderer({ step, onDone }: { step: LessonStep; onDone: (correct?: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");

  if (step.type === "intro") {
    return (
      <div className="animate-fade-in">
        <p className="font-mono text-[10px] uppercase tracking-widest text-clay">Introduction</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight">{step.title}</h2>
        <p className="mt-4 text-night/60">{step.body}</p>
        <button onClick={() => onDone(true)} className="mt-10 w-full rounded-xl bg-forest py-3.5 text-sm font-bold text-ivory">
          C'est parti
        </button>
      </div>
    );
  }

  if (step.type === "flashcard") {
    return (
      <div className="animate-fade-in text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-clay mb-6">Nouveau mot</p>
        <div className="rounded-[28px] border border-clay/10 bg-clay/5 p-8 shadow-[var(--ios-shadow-sm)]">
          <ArabicText size="2xl" className="font-bold block">{step.arabic}</ArabicText>
          <p className="mt-4 font-mono text-sm italic text-night/50">/ {step.translit} /</p>
          <p className="mt-2 text-xl font-bold">{step.translation}</p>
          <div className="mt-6 flex justify-center"><AudioButton text={step.arabic} variant="fusha" /></div>
        </div>
        <button onClick={() => onDone(true)} className="mt-8 w-full rounded-xl bg-forest py-3.5 text-sm font-bold text-ivory">
          J'ai retenu
        </button>
      </div>
    );
  }

  if (step.type === "choice" || step.type === "listen") {
    return (
      <div className="animate-fade-in">
        <p className="font-mono text-[10px] uppercase tracking-widest text-clay mb-2">
          {step.type === "listen" ? "Écoute" : "Choisis"}
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight">
          {step.type === "choice" ? step.prompt : "Quelle prononciation entends-tu ?"}
        </h2>
        {step.arabic && (
          <div className="mt-6 ios-card-lg p-6 flex items-center justify-between">
            <ArabicText size="xl" className="font-bold">{step.arabic}</ArabicText>
            <AudioButton text={step.arabic} variant="fusha" />
          </div>
        )}
        <div className="mt-6 space-y-2">
          {step.options.map((o, oi) => {
            const isPicked = picked === oi;
            const isCorrect = oi === step.correct;
            const revealed = picked !== null;
            return (
              <button
                key={oi}
                disabled={revealed}
                onClick={() => setPicked(oi)}
                className={cn(
                  "ios-pressable w-full rounded-2xl border p-4 text-left font-semibold text-sm transition-all",
                  !revealed && "border-[var(--ios-hairline)] bg-card hover:border-forest/40",
                  revealed && isCorrect && "border-forest bg-forest/10 text-forest",
                  revealed && isPicked && !isCorrect && "border-clay bg-clay/10 text-clay",
                )}
              >
                {o}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <button
            onClick={() => { const wasRight = picked === step.correct; setPicked(null); onDone(wasRight); }}
            className="mt-6 w-full rounded-xl bg-forest py-3.5 text-sm font-bold text-ivory"
          >
            Continuer
          </button>
        )}
      </div>
    );
  }

  if (step.type === "translate") {
    const correct = answer.trim().toLowerCase() === step.answer.toLowerCase();
    return (
      <div className="animate-fade-in">
        <p className="font-mono text-[10px] uppercase tracking-widest text-clay mb-2">Traduction</p>
        <h2 className="text-2xl font-extrabold tracking-tight">{step.prompt}</h2>
        <div className="mt-6 ios-card-lg p-6 flex items-center justify-between">
          <ArabicText size="xl" className="font-bold">{step.arabic}</ArabicText>
          <AudioButton text={step.arabic} variant="fusha" />
        </div>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Ta traduction…"
          className="mt-6 w-full rounded-xl border border-night/10 bg-white px-4 py-3 outline-none focus:border-forest"
        />
        <button
          onClick={() => { const ok = correct; setAnswer(""); onDone(ok); }}
          disabled={!answer.trim()}
          className="mt-6 w-full rounded-xl bg-forest py-3.5 text-sm font-bold text-ivory disabled:opacity-40"
        >
          Valider
        </button>
      </div>
    );
  }

  if (step.type === "order") {
    return <OrderStep step={step} onDone={onDone} />;
  }

  return null;
}

function OrderStep({ step, onDone }: { step: Extract<LessonStep, { type: "order" }>; onDone: (c: boolean) => void }) {
  const [pool, setPool] = useState(step.tokens);
  const [chosen, setChosen] = useState<string[]>([]);
  const complete = chosen.length === step.correct.length;
  const isCorrect = complete && chosen.join(" ") === step.correct.join(" ");
  return (
    <div className="animate-fade-in">
      <p className="font-mono text-[10px] uppercase tracking-widest text-clay mb-2">Ordonne</p>
      <h2 className="text-2xl font-extrabold tracking-tight">{step.prompt}</h2>
      <div dir="rtl" className="mt-6 min-h-[80px] rounded-2xl border-2 border-dashed border-night/10 p-4 flex flex-wrap gap-2 font-arabic text-2xl">
        {chosen.map((t, ti) => (
          <button key={ti} onClick={() => { setChosen(chosen.filter((_, x) => x !== ti)); setPool([...pool, t]); }} className="rounded-lg bg-forest px-3 py-1 text-ivory">
            {t}
          </button>
        ))}
      </div>
      <div dir="rtl" className="mt-4 flex flex-wrap gap-2 font-arabic text-2xl">
        {pool.map((t, ti) => (
          <button key={ti} onClick={() => { setPool(pool.filter((_, x) => x !== ti)); setChosen([...chosen, t]); }} className="rounded-lg border border-night/15 bg-white px-3 py-1">
            {t}
          </button>
        ))}
      </div>
      <button
        disabled={!complete}
        onClick={() => onDone(isCorrect)}
        className="mt-6 w-full rounded-xl bg-forest py-3.5 text-sm font-bold text-ivory disabled:opacity-40"
      >
        Valider
      </button>
    </div>
  );
}