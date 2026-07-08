import { createFileRoute, Link } from "@tanstack/react-router";
import { SCENARIOS, VARIANT_LABEL } from "@/lib/sahbi/data";
import { useProfile } from "@/lib/sahbi/store";
import { Sparkles, X } from "lucide-react";

export const Route = createFileRoute("/app/companion/$conversationId")({
  component: ComingSoon,
});

function ComingSoon() {
  const { conversationId } = Route.useParams();
  const scenario = SCENARIOS.find((s) => s.id === conversationId) ?? SCENARIOS[0];
  const { profile } = useProfile();

  return (
    <div className="min-h-screen sahbi-bg flex flex-col">
      <header className="border-b border-[var(--ios-hairline)] ios-material-thick sticky top-0 z-10">
        <div className="mx-auto max-w-2xl px-6 py-4 flex items-center justify-between">
          <Link to="/app/companion" className="text-night/60"><X className="size-5" /></Link>
          <div className="text-center min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-clay">Compagnon</p>
            <p className="text-sm font-bold truncate">{scenario.title}</p>
          </div>
          <span className="size-5" />
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-md w-full px-6 py-16 flex flex-col items-center text-center animate-ios-in">
        <div className="size-16 rounded-full ios-material grid place-items-center text-clay mb-6">
          <Sparkles className="size-7" />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-clay mb-3">Bientôt disponible</p>
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          Ton compagnon IA arrive à la prochaine mise à jour.
        </h1>
        <p className="mt-3 text-sm text-night/60 leading-relaxed">
          Tu pourras bientôt discuter en {VARIANT_LABEL[profile.mainVariant]}, avec des corrections en douceur, dans le scénario « {scenario.title} ».
        </p>
        <Link
          to="/app/companion"
          className="ios-pressable mt-8 rounded-full bg-forest px-6 py-3 text-sm font-bold text-ivory"
        >
          Retour aux scénarios
        </Link>
      </main>
    </div>
  );
}
