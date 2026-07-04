import { createFileRoute, Link } from "@tanstack/react-router";
import { useProfile } from "@/lib/sahbi/store";
import { COURSES, EXPRESSIONS, WEEKLY_ACTIVITY } from "@/lib/sahbi/data";
import { ArabicText } from "@/components/sahbi/ArabicText";
import { ExpressionCard } from "@/components/sahbi/ExpressionCard";
import { ProgressRing } from "@/components/sahbi/ProgressRing";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts";
import { Flame, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: Home,
});

function Home() {
  const { profile } = useProfile();
  const course = COURSES.find((c) => c.variant === profile.mainVariant) ?? COURSES[0];
  const currentLesson = course.modules[1]?.lessons[0] ?? course.modules[0].lessons[0];
  const expression = EXPRESSIONS.find((e) => e.variant === profile.mainVariant) ?? EXPRESSIONS[0];
  const goalPct = Math.min(100, Math.round((profile.minutesToday / profile.dailyMinutes) * 100));

  return (
    <main className="mx-auto max-w-2xl px-6 pt-10 pb-16">
      <header className="flex items-end justify-between animate-fade-in">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-clay mb-1">
            {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight truncate">Marhaba, {profile.firstName}.</h1>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-forest px-3 py-1.5 text-xs font-bold text-ivory shrink-0">
          <Flame className="size-3.5 text-gold" /> {profile.streak} jours
        </div>
      </header>

      <section className="mt-8 animate-fade-in">
        <div className="relative overflow-hidden rounded-3xl bg-forest p-6 text-ivory">
          <div className="absolute -right-4 -top-8 select-none font-arabic text-9xl font-bold text-ivory/5">ص</div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-gold mb-2">
            Niveau 2 · {course.title}
          </p>
          <h2 className="text-2xl font-bold text-balance">{currentLesson.title}</h2>
          <p className="mt-2 text-sm text-ivory/70">{currentLesson.description}</p>
          <Link
            to="/app/lesson/$lessonId"
            params={{ lessonId: currentLesson.id }}
            className="mt-6 flex w-full items-center justify-between rounded-xl bg-ivory px-4 py-3.5 text-sm font-bold text-forest"
          >
            Continuer ma leçon <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-night/5 bg-white p-4 flex items-center gap-3">
          <ProgressRing value={goalPct} size={54} stroke={5}>
            <span className="text-xs font-extrabold">{goalPct}%</span>
          </ProgressRing>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-night/40">Objectif</p>
            <p className="text-sm font-bold">
              {profile.minutesToday}/{profile.dailyMinutes} min
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-night/5 bg-white p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-night/40">Cette semaine</p>
          <p className="mt-1 text-2xl font-extrabold">{profile.minutesWeek} min</p>
          <p className="text-xs text-night/50">{profile.wordsLearned} mots appris</p>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-night/40 mb-4">Mission du jour</h3>
        <div className="space-y-3">
          <MissionRow label="Apprendre 5 mots" current={2} total={5} done={false} />
          <MissionRow label="Terminer une leçon" current={0} total={1} done={false} />
          <MissionRow label="Parler 2 min avec le compagnon" current={0} total={2} done={false} />
        </div>
      </section>

      <section className="mt-10">
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-night/40 mb-4">Tes progrès cette semaine</h3>
        <div className="rounded-3xl border border-night/5 bg-white p-4 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_ACTIVITY} margin={{ top: 8, right: 4, bottom: 0, left: -20 }}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
              <YAxis hide />
              <Bar dataKey="minutes" radius={[8, 8, 0, 0]}>
                {WEEKLY_ACTIVITY.map((d, i) => (
                  <Cell key={i} fill={d.minutes >= 15 ? "var(--forest)" : d.minutes > 0 ? "var(--gold)" : "#e5e7eb"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-night/40 mb-4">Expression du jour</h3>
        <ExpressionCard expr={expression} showTranslit={profile.transliteration} />
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-night/40">À réviser aujourd'hui</h3>
          <Link to="/app/practice/vocabulary" className="text-xs font-bold text-forest">Voir tout →</Link>
        </div>
        <div className="rounded-3xl border border-night/5 bg-white p-6 flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-clay/10 grid place-items-center text-clay">
            <ArabicText size="md" className="text-clay">شكرا</ArabicText>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold">6 mots en attente</p>
            <p className="text-xs text-night/50">Répétition espacée · 3 min</p>
          </div>
          <Link to="/app/practice/vocabulary" className="rounded-full bg-forest px-4 py-2 text-xs font-bold text-ivory">
            Réviser
          </Link>
        </div>
      </section>
    </main>
  );
}

function MissionRow({ label, current, total, done }: { label: string; current: number; total: number; done: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-night/5 bg-white p-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="size-9 rounded-full border-2 border-forest/20 grid place-items-center shrink-0">
          {done && <div className="size-2 rounded-full bg-forest" />}
          {!done && current > 0 && <div className="size-2 rounded-full bg-forest/40" />}
        </div>
        <span className="text-sm font-semibold truncate">{label}</span>
      </div>
      <span className="font-mono text-xs text-night/40 shrink-0">{current}/{total}</span>
    </div>
  );
}