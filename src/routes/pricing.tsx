import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Tarifs — Sahbi" },
      { name: "description", content: "Choisis l'offre qui te ressemble : Gratuit, Premium ou Famille." },
      { property: "og:title", content: "Tarifs — Sahbi" },
      { property: "og:description", content: "Gratuit, Premium et Famille — commence sans carte." },
    ],
  }),
  component: Pricing,
});

const PLANS = [
  {
    name: "Gratuit",
    price: "0€",
    period: "pour toujours",
    features: ["Premières leçons de chaque parcours", "5 min de Compagnon IA / semaine", "Révisions limitées", "Statistiques de base"],
    cta: "Commencer",
    to: "/onboarding" as const,
    featured: false,
  },
  {
    name: "Premium",
    price: "9,90€",
    period: "/ mois",
    features: ["Tous les cours & dialectes", "Compagnon IA illimité", "Prononciation guidée", "Répétition espacée illimitée", "Statistiques avancées"],
    cta: "Essayer 7 jours",
    to: "/signup" as const,
    featured: true,
  },
  {
    name: "Famille",
    price: "16,90€",
    period: "/ mois",
    features: ["Jusqu'à 5 profils", "Suivi individuel", "Défis en famille", "Toutes les fonctions Premium"],
    cta: "Rejoindre",
    to: "/signup" as const,
    featured: false,
  },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-ivory text-night">
      <header className="mx-auto max-w-6xl px-6 pt-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-forest">Sahbi</Link>
        <Link to="/login" className="text-sm font-bold text-night/60">Connexion</Link>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono text-[11px] uppercase tracking-widest text-clay">Tarifs</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">Simple, honnête, à ton rythme.</h1>
        <p className="mt-4 max-w-xl text-night/60">
          Commence gratuitement. Passe Premium quand tu es prêt. Aucun engagement.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={
                p.featured
                  ? "rounded-3xl bg-forest p-8 text-ivory ring-4 ring-gold/30"
                  : "rounded-3xl border border-night/10 bg-white p-8"
              }
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold">{p.name}</h3>
                {p.featured && <span className="font-mono text-[10px] uppercase tracking-widest text-gold">Populaire</span>}
              </div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{p.price}</span>
                <span className={p.featured ? "text-ivory/60 text-sm" : "text-night/50 text-sm"}>{p.period}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={p.featured ? "size-4 mt-0.5 text-gold shrink-0" : "size-4 mt-0.5 text-forest shrink-0"} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={p.to}
                className={
                  p.featured
                    ? "mt-8 block rounded-xl bg-ivory py-3 text-center text-sm font-bold text-forest"
                    : "mt-8 block rounded-xl bg-forest py-3 text-center text-sm font-bold text-ivory"
                }
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}