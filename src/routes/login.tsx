import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useProfile } from "@/lib/sahbi/store";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Connexion — Sahbi" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { update } = useProfile();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <div className="min-h-screen sahbi-bg grid place-items-center px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="text-2xl font-extrabold text-forest">Sahbi</Link>
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight">Content de te revoir.</h1>
        <p className="mt-2 text-sm text-night/60">Reprends ton parcours là où tu l'as laissé.</p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            update({ firstName: email.split("@")[0] || "Ami·e", onboardingCompleted: true });
            navigate({ to: "/app" });
          }}
        >
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-night/50">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-night/10 bg-white px-4 py-3 text-sm focus:border-forest outline-none"
              placeholder="toi@exemple.com"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-night/50">Mot de passe</label>
            <input
              type="password"
              required
              className="mt-1 w-full rounded-xl border border-night/10 bg-white px-4 py-3 text-sm focus:border-forest outline-none"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full rounded-xl bg-forest py-3.5 text-sm font-bold text-ivory">
            Se connecter
          </button>
          <button
            type="button"
            onClick={() => {
              update({ firstName: "Marc", onboardingCompleted: true });
              navigate({ to: "/app" });
            }}
            className="w-full rounded-xl border border-night/15 bg-white py-3.5 text-sm font-bold"
          >
            Continuer avec Google
          </button>
        </form>
        <div className="mt-6 flex justify-between text-xs">
          <Link to="/forgot-password" className="text-night/60">Mot de passe oublié ?</Link>
          <Link to="/signup" className="font-bold text-forest">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}