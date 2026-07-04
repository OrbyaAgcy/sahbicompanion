import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useProfile } from "@/lib/sahbi/store";
import { VARIANT_LABEL } from "@/lib/sahbi/data";
import { PageHeader } from "@/components/sahbi/PageHeader";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/profile")({
  component: Profile,
});

function Profile() {
  const { profile, reset } = useProfile();
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-2xl px-6 pt-10 pb-16">
      <PageHeader eyebrow="Profil" title={profile.firstName} subtitle={VARIANT_LABEL[profile.mainVariant]} />

      <div className="grid grid-cols-3 gap-3">
        <Kpi label="XP" value={String(profile.xp)} />
        <Kpi label="Série" value={`${profile.streak}j`} />
        <Kpi label="Mots" value={String(profile.wordsLearned)} />
      </div>

      <section className="mt-10 space-y-2">
        <Row label="Progression" to="/app/progress" />
        <Row label="Récompenses" to="/app/achievements" />
        <Row label="Paramètres" to="/app/settings" />
        <Row label="Tarifs" to="/pricing" />
      </section>

      <button
        onClick={() => { reset(); navigate({ to: "/" }); }}
        className="mt-10 w-full rounded-xl border border-night/15 bg-white py-3.5 text-sm font-bold text-clay"
      >
        Se déconnecter
      </button>
    </main>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-night/5 bg-white p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-night/40">{label}</p>
      <p className="mt-1 text-xl font-extrabold">{value}</p>
    </div>
  );
}

function Row({ label, to }: { label: string; to: "/app/progress" | "/app/achievements" | "/app/settings" | "/pricing" }) {
  return (
    <Link to={to} className="flex items-center justify-between rounded-2xl border border-night/5 bg-white p-4">
      <span className="font-semibold">{label}</span>
      <ChevronRight className="size-4 text-night/40" />
    </Link>
  );
}