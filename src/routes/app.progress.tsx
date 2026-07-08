import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/sahbi/PageHeader";
import { useProfile } from "@/lib/sahbi/store";
import { SKILL_SCORES, WEEKLY_ACTIVITY } from "@/lib/sahbi/data";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Line, LineChart, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/app/progress")({
  component: Progress,
});

function Progress() {
  const { profile } = useProfile();
  const monthly = Array.from({ length: 30 }).map((_, i) => ({
    d: i + 1,
    v: Math.round(6 + Math.sin(i / 3) * 5 + Math.random() * 6),
  }));

  return (
    <main className="mx-auto max-w-2xl px-6 pt-10 pb-16">
      <PageHeader eyebrow="Progression" title="Ton voyage, en clair." />

      <div className="grid grid-cols-2 gap-3">
        <Kpi label="Niveau CECR" value="A1+" />
        <Kpi label="XP total" value={String(profile.xp)} />
        <Kpi label="Série actuelle" value={`${profile.streak}j`} />
        <Kpi label="Mots appris" value={String(profile.wordsLearned)} />
        <Kpi label="Leçons" value={String(profile.lessonsCompleted)} />
        <Kpi label="Précision" value="82%" />
      </div>

      <section className="mt-10">
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-night/40 mb-4">30 derniers jours</h3>
        <div className="ios-card-lg p-4 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly}>
              <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Line type="monotone" dataKey="v" stroke="var(--forest)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-night/40 mb-4">Roue des compétences</h3>
        <div className="ios-card-lg p-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={SKILL_SCORES}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "#334155" }} />
              <Radar dataKey="value" stroke="var(--forest)" fill="var(--forest)" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-night/40 mb-4">Jalons</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { l: "Première leçon", d: "Débloqué" },
            { l: "50 mots", d: "Débloqué" },
            { l: "7 jours", d: "Débloqué" },
            { l: "100 mots", d: "53 restants" },
          ].map((j) => (
            <div key={j.l} className="ios-card p-4">
              <p className="font-bold text-sm">{j.l}</p>
              <p className="mt-1 text-xs text-night/50">{j.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="ios-card p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-night/40">{label}</p>
      <p className="mt-1 text-2xl font-extrabold">{value}</p>
    </div>
  );
}