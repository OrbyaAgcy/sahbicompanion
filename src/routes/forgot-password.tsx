import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Mot de passe oublié — Sahbi" }] }),
  component: () => (
    <div className="min-h-screen bg-ivory grid place-items-center px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="text-2xl font-extrabold text-forest">Sahbi</Link>
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight">Mot de passe oublié.</h1>
        <p className="mt-2 text-sm text-night/60">On t'envoie un lien pour le réinitialiser.</p>
        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input type="email" required className="w-full rounded-xl border border-night/10 bg-white px-4 py-3 text-sm outline-none focus:border-forest" placeholder="toi@exemple.com" />
          <button className="w-full rounded-xl bg-forest py-3.5 text-sm font-bold text-ivory">Envoyer le lien</button>
        </form>
        <Link to="/login" className="mt-6 inline-block text-xs font-bold text-forest">← Retour</Link>
      </div>
    </div>
  ),
});