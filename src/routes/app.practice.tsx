import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { PageHeader } from "@/components/sahbi/PageHeader";
import { BookMarked, Mic, TypeOutline, GitCompare } from "lucide-react";

export const Route = createFileRoute("/app/practice")({
  component: () => {
    const p = useRouterState({ select: (s) => s.location.pathname });
    return p === "/app/practice" ? <PracticeIndex /> : <Outlet />;
  },
});

const CARDS = [
  { to: "/app/practice/vocabulary" as const, icon: BookMarked, title: "Vocabulaire", desc: "Flashcards & répétition espacée", iconClass: "bg-forest/10 text-forest" },
  { to: "/app/practice/pronunciation" as const, icon: Mic, title: "Prononciation", desc: "Enregistre-toi, compare, améliore", iconClass: "bg-clay/10 text-clay" },
  { to: "/app/practice/alphabet" as const, icon: TypeOutline, title: "Alphabet", desc: "Lettres, formes et tracés", iconClass: "bg-gold/20 text-clay" },
  { to: "/app/practice/compare" as const, icon: GitCompare, title: "Comment le dit-on ?", desc: "Compare une expression entre dialectes", iconClass: "bg-night/10 text-night" },
];

function PracticeIndex() {
  return (
    <main className="mx-auto max-w-2xl px-6 pt-10 pb-16">
      <PageHeader eyebrow="Pratiquer" title="Muscler son arabe." subtitle="Choisis ta séance selon ton envie du jour." />
      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.to} to={c.to} className="group rounded-3xl border border-night/5 bg-white p-6 hover:border-forest/40 transition-colors">
              <div className={`size-12 rounded-2xl ${c.iconClass} grid place-items-center mb-4`}>
                <Icon className="size-5" />
              </div>
              <h3 className="font-bold">{c.title}</h3>
              <p className="mt-1 text-xs text-night/60">{c.desc}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}