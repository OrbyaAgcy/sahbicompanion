import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/sahbi/PageHeader";
import { ACHIEVEMENTS } from "@/lib/sahbi/data";

export const Route = createFileRoute("/app/achievements")({
  component: () => (
    <main className="mx-auto max-w-2xl px-6 pt-10 pb-16">
      <PageHeader eyebrow="Récompenses" title="Ta collection." subtitle="Débloque des jalons en gardant le rythme." />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((a) => (
          <div
            key={a.slug}
            className={`rounded-3xl border p-5 text-center ${
              a.unlocked ? "border-gold/40 bg-gold/10" : "border-night/10 bg-white opacity-60"
            }`}
          >
            <div className="text-3xl">{a.icon}</div>
            <p className="mt-3 font-bold text-sm text-balance">{a.title}</p>
            <p className="mt-1 text-[11px] text-night/50">{a.description}</p>
          </div>
        ))}
      </div>
    </main>
  ),
});