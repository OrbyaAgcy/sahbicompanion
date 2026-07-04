import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArabicText } from "@/components/sahbi/ArabicText";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-ivory text-night">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-forest">Sahbi</span>
          <span className="font-arabic text-xl text-clay">صاحبي</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link to="/pricing" className="hidden sm:inline text-night/60 hover:text-night">Tarifs</Link>
          <Link to="/login" className="text-night/60 hover:text-night">Connexion</Link>
          <Link to="/signup" className="rounded-full bg-forest px-4 py-2 text-ivory">Commencer</Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <section className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div className="animate-fade-in">
            <p className="font-mono text-[11px] uppercase tracking-widest text-clay mb-4">
              Ton compagnon d'arabe · صاحبي
            </p>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-balance leading-[1.05]">
              Enfin parler arabe. <span className="text-forest">Vraiment.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-night/70 leading-relaxed">
              Choisis ton dialecte — Fusha, libanais, darija — et laisse Sahbi t'accompagner chaque jour.
              Leçons courtes, conversations réelles, prononciation guidée.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/onboarding" className="rounded-full bg-forest px-6 py-3.5 font-bold text-ivory">
                Créer mon parcours
              </Link>
              <Link to="/login" className="rounded-full border border-night/20 px-6 py-3.5 font-bold text-night">
                J'ai déjà un compte
              </Link>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-night/40">
              Sans carte bancaire · 5 min pour démarrer
            </p>
          </div>

          <div className="relative">
            <div className="relative rounded-[2rem] bg-forest p-8 text-ivory shadow-2xl">
              <div className="absolute -right-4 -top-8 select-none font-arabic text-9xl font-bold text-ivory/5">ص</div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold mb-3">Expression du jour · Libanais</p>
              <ArabicText size="2xl" className="font-bold block mb-3">كيفك؟</ArabicText>
              <p className="font-mono text-xs italic text-ivory/50">/ kifak? /</p>
              <p className="mt-2 text-lg">Comment vas-tu ?</p>
              <div className="mt-8 rounded-2xl bg-ivory/5 p-4">
                <p className="text-sm">
                  À Beyrouth, dis « <span className="font-bold">kifak</span> » à un homme, « <span className="font-bold">kifik</span> » à une femme.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block rounded-2xl bg-white border border-night/5 p-4 shadow-xl">
              <p className="font-mono text-[10px] uppercase tracking-widest text-clay">Série</p>
              <p className="mt-1 text-2xl font-extrabold">8 jours</p>
            </div>
          </div>
        </section>

        <section className="mt-32 grid gap-6 sm:grid-cols-3">
          {[
            { t: "Un dialecte à la fois", d: "Fusha, libanais, darija — ton parcours principal reste clair, sans confusion." },
            { t: "Compagnon IA", d: "Discute en arabe adapté à ton niveau. Corrections douces, pas d'interruptions." },
            { t: "Répétition espacée", d: "Ton vocabulaire revient au bon moment. Retiens vraiment, pas juste pour la leçon." },
          ].map((f) => (
            <div key={f.t} className="rounded-3xl border border-night/5 bg-white p-6">
              <h3 className="text-lg font-bold">{f.t}</h3>
              <p className="mt-2 text-sm text-night/60 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-6 pb-10 flex items-center justify-between text-xs text-night/40 border-t border-night/5 pt-6">
        <span>© Sahbi — 2026</span>
        <div className="flex gap-4">
          <Link to="/pricing">Tarifs</Link>
          <Link to="/login">Connexion</Link>
        </div>
      </footer>
    </div>
  );
}
