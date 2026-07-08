import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SCENARIOS } from "@/lib/sahbi/data";
import { PageHeader } from "@/components/sahbi/PageHeader";

export const Route = createFileRoute("/app/companion")({
  component: () => {
    const p = useRouterState({ select: (s) => s.location.pathname });
    return p === "/app/companion" ? <CompanionIndex /> : <Outlet />;
  },
});

function CompanionIndex() {
  return (
    <main className="mx-auto max-w-2xl px-6 pt-10 pb-16">
      <PageHeader
        eyebrow="Compagnon IA · bientôt disponible"
        title="Discute en arabe, sans peur."
        subtitle="Sahbi s'adapte à ton niveau, corrige en douceur, retient ce que tu apprends. Arrive à la prochaine mise à jour."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {SCENARIOS.map((s) => (
          <Link
            key={s.id}
            to="/app/companion/$conversationId"
            params={{ conversationId: s.id }}
            className="ios-card ios-pressable p-5 hover:shadow-[var(--ios-shadow-md)] transition-shadow"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-clay">Scénario</p>
            <h3 className="mt-2 font-bold">{s.title}</h3>
            <p className="mt-1 text-xs text-night/60">{s.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}