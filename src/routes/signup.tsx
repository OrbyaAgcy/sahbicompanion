import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useProfile } from "@/lib/sahbi/store";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Créer un compte — Sahbi" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { update } = useProfile();
  const [name, setName] = useState("");
  return (
    <div className="min-h-screen sahbi-bg grid place-items-center px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="text-2xl font-extrabold text-forest">Sahbi</Link>
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight">Créons ton parcours.</h1>
        <p className="mt-2 text-sm text-night/60">3 minutes pour un plan sur mesure.</p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            update({ firstName: name || "Ami·e" });
            navigate({ to: "/onboarding" });
          }}
        >
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-night/50">Prénom</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-night/10 bg-white px-4 py-3 text-sm outline-none focus:border-forest"
              placeholder="Marc"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-night/50">Email</label>
            <input type="email" required className="mt-1 w-full rounded-xl border border-night/10 bg-white px-4 py-3 text-sm outline-none focus:border-forest" placeholder="toi@exemple.com" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-night/50">Mot de passe</label>
            <input type="password" required className="mt-1 w-full rounded-xl border border-night/10 bg-white px-4 py-3 text-sm outline-none focus:border-forest" placeholder="••••••••" />
          </div>
          <button className="w-full rounded-xl bg-forest py-3.5 text-sm font-bold text-ivory">
            Continuer
          </button>
        </form>
        <p className="mt-6 text-xs text-night/60">
          Déjà inscrit ? <Link to="/login" className="font-bold text-forest">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}