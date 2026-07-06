import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { INTERESTS, OBJECTIVES, VARIANTS } from "@/lib/sahbi/data";
import { useProfile } from "@/lib/sahbi/store";
import type { VariantSlug } from "@/lib/sahbi/types";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  ssr: false,
  head: () => ({ meta: [{ title: "Créons ton parcours — Sahbi" }] }),
  component: Onboarding,
});

const STEPS = ["welcome", "objective", "variant", "level", "alphabet", "time", "interests", "plan"] as const;
type Step = (typeof STEPS)[number];

function Onboarding() {
  const navigate = useNavigate();
  const { profile, update } = useProfile();
  const [step, setStep] = useState<Step>("welcome");

  const idx = STEPS.indexOf(step);
  const next = () => {
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  };
  const back = () => {
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  return (
    <div className="min-h-screen bg-ivory text-night flex flex-col">
      <header className="px-6 pt-8 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <span className="text-xl font-extrabold text-forest">Sahbi</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-night/40">
            {idx + 1} / {STEPS.length}
          </span>
        </div>
        <div className="mt-4 h-1 rounded-full bg-night/5 overflow-hidden">
          <div className="h-full bg-forest transition-all" style={{ width: `${((idx + 1) / STEPS.length) * 100}%` }} />
        </div>
      </header>

      <main className="flex-1 flex flex-col px-6 pt-10 pb-8 max-w-2xl mx-auto w-full">
        {step === "welcome" && (
          <div className="flex-1 flex flex-col justify-center animate-fade-in">
            <p className="font-mono text-[11px] uppercase tracking-widest text-clay mb-3">Marhaba</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-balance">
              Ton compagnon personnel pour enfin parler arabe.
            </h1>
            <p className="mt-4 text-night/60">Créons ensemble un parcours qui te ressemble.</p>
          </div>
        )}

        {step === "objective" && (
          <Choice
            title="Pourquoi apprends-tu l'arabe ?"
            subtitle="On adapte ton parcours à ta motivation."
            options={OBJECTIVES}
            value={profile.objective}
            onChange={(v) => update({ objective: v })}
          />
        )}

        {step === "variant" && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold tracking-tight">Quelle forme d'arabe veux-tu maîtriser ?</h2>
            <p className="mt-2 text-sm text-night/60 mb-6">Tu pourras en ajouter d'autres plus tard.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {VARIANTS.map((v) => {
                const selected = profile.mainVariant === v.slug;
                return (
                  <button
                    key={v.slug}
                    disabled={!v.available}
                    onClick={() => update({ mainVariant: v.slug })}
                    className={cn(
                      "text-left rounded-2xl border p-4 transition-all",
                      selected ? "border-forest bg-forest/5 ring-2 ring-forest/30" : "border-night/10 bg-white",
                      !v.available && "opacity-40 cursor-not-allowed",
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-sm">{v.name}</p>
                        <p className="font-arabic text-lg text-clay">{v.nativeName}</p>
                      </div>
                      {!v.available && (
                        <span className="font-mono text-[9px] uppercase tracking-widest text-night/40">Bientôt</span>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-night/60 leading-relaxed">{v.description}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-night/40">
                      {v.region} · {v.speakers}
                    </p>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl border border-clay/20 bg-clay/5 p-4 text-xs text-night/70">
              Les dialectes arabes peuvent être très différents. Ton parcours principal restera clairement séparé des autres variantes pour éviter toute confusion.
            </div>
          </div>
        )}

        {step === "level" && (
          <Choice
            title="Où en es-tu ?"
            subtitle="Sois honnête, on t'ajuste au bon niveau."
            options={[
              { v: "zero", label: "Je pars de zéro" },
              { v: "few", label: "Je connais quelques mots" },
              { v: "sentences", label: "Je comprends des phrases simples" },
              { v: "conversation", label: "Je peux tenir une petite conversation" },
              { v: "advanced", label: "Niveau avancé" },
            ]}
            value={profile.level}
            onChange={(v) => update({ level: v as any })}
          />
        )}

        {step === "alphabet" && (
          <Choice
            title="Sais-tu lire l'alphabet arabe ?"
            subtitle="On adaptera tes premières leçons."
            options={[
              { v: "no", label: "Pas du tout" },
              { v: "some", label: "Un peu" },
              { v: "yes", label: "Oui, je lis" },
            ]}
            value={profile.reads}
            onChange={(v) => update({ reads: v as any })}
          />
        )}

        {step === "time" && (
          <Choice
            title="Combien de temps par jour ?"
            subtitle="Même 5 minutes suffisent pour progresser."
            options={[5, 10, 15, 20, 30].map((m) => ({ v: m, label: `${m} minutes` }))}
            value={profile.dailyMinutes}
            onChange={(v) => update({ dailyMinutes: Number(v) })}
          />
        )}

        {step === "interests" && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold tracking-tight">Qu'est-ce qui te passionne ?</h2>
            <p className="mt-2 text-sm text-night/60 mb-6">Choisis plusieurs thèmes.</p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => {
                const sel = profile.interests.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() =>
                      update({
                        interests: sel ? profile.interests.filter((x) => x !== i) : [...profile.interests, i],
                      })
                    }
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                      sel ? "bg-forest text-ivory border-forest" : "border-night/15 bg-white text-night",
                    )}
                  >
                    {i}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === "plan" && (
          <div className="flex-1 flex flex-col justify-center animate-fade-in text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-clay mb-3">Ton plan est prêt</p>
            <h2 className="text-4xl font-extrabold tracking-tight">Yalla, {profile.firstName}.</h2>
            <p className="mt-4 text-night/60 max-w-md mx-auto">
              Un parcours en {profile.mainVariant === "fusha" ? "Fusha" : profile.mainVariant === "libanais" ? "libanais" : "darija"},
              {" "}{profile.dailyMinutes} minutes par jour, adapté à ton niveau.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-sm mx-auto">
              <Stat label="Niveau" value="A1" />
              <Stat label="Objectif" value={`${profile.dailyMinutes} min`} />
              <Stat label="Leçons" value="15+" />
            </div>
          </div>
        )}

        <div className="mt-10 flex items-center justify-between">
          <button onClick={back} className="text-sm font-bold text-night/40" disabled={idx === 0}>
            {idx > 0 ? "← Retour" : ""}
          </button>
          {step === "plan" ? (
            <button
              onClick={() => {
                update({ onboardingCompleted: true });
                navigate({ to: "/app" });
              }}
              className="rounded-full bg-forest px-8 py-3.5 text-sm font-bold text-ivory"
            >
              Commencer ma première leçon
            </button>
          ) : (
            <button onClick={next} className="rounded-full bg-forest px-8 py-3.5 text-sm font-bold text-ivory">
              Continuer →
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-night/10 bg-white p-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-night/40">{label}</p>
      <p className="mt-1 text-lg font-extrabold">{value}</p>
    </div>
  );
}

function Choice({
  title,
  subtitle,
  options,
  value,
  onChange,
}: {
  title: string;
  subtitle?: string;
  options: (string | { v: string | number; label: string })[];
  value: string | number;
  onChange: (v: any) => void;
}) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-extrabold tracking-tight text-balance">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-night/60">{subtitle}</p>}
      <div className="mt-6 space-y-2">
        {options.map((opt) => {
          const v = typeof opt === "string" ? opt : opt.v;
          const label = typeof opt === "string" ? opt : opt.label;
          const sel = value === v;
          return (
            <button
              key={String(v)}
              onClick={() => onChange(v)}
              className={cn(
                "w-full flex items-center justify-between rounded-2xl border p-4 text-left transition-all",
                sel ? "border-forest bg-forest/5 ring-2 ring-forest/30" : "border-night/10 bg-white",
              )}
            >
              <span className="font-semibold text-sm">{label}</span>
              {sel && <Check className="size-4 text-forest" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}