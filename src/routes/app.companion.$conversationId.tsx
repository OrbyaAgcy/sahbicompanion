import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SCENARIOS } from "@/lib/sahbi/data";
import { sendCompanionMessage, type CompanionTurn } from "@/lib/sahbi/companion";
import { useProfile } from "@/lib/sahbi/store";
import { ArabicText } from "@/components/sahbi/ArabicText";
import { AudioButton } from "@/components/sahbi/AudioButton";
import { Send, X, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/companion/$conversationId")({
  component: Chat,
});

interface Msg {
  role: "companion" | "you";
  arabic?: string;
  translit?: string;
  translation?: string;
  text?: string;
  demo?: boolean;
}

function Chat() {
  const { conversationId } = Route.useParams();
  const scenario = SCENARIOS.find((s) => s.id === conversationId) ?? SCENARIOS[0];
  const { profile } = useProfile();
  const [showT, setShowT] = useState(true);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "companion",
      arabic: "أهلاً بيك ! جاهز نتكلّم شوي ؟",
      translit: "ahla bik ! jāhez nitkallam shwayy?",
      translation: "Bienvenue ! On est prêt à parler un peu ?",
    },
  ]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setSending(true);
    const history: CompanionTurn[] = messages.map((m) => ({
      role: m.role === "you" ? "user" : "companion",
      text: m.role === "you" ? (m.text ?? "") : (m.arabic ?? ""),
    }));
    setMessages((m) => [...m, { role: "you", text }]);
    try {
      const reply = await sendCompanionMessage({
        data: {
          variant: profile.mainVariant,
          level: profile.level,
          scenarioTitle: scenario.title,
          scenarioDesc: scenario.desc,
          history,
          message: text,
        },
      });
      if (reply.demo) setDemoMode(true);
      setMessages((m) => [
        ...m,
        {
          role: "companion",
          arabic: reply.arabic,
          translit: reply.translit,
          translation: reply.translation,
          demo: reply.demo,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen sahbi-bg flex flex-col">
      <header className="border-b border-[var(--ios-hairline)] ios-material-thick sticky top-0 z-10">
        <div className="mx-auto max-w-2xl px-6 py-4 flex items-center justify-between">
          <Link to="/app/companion" className="text-night/60"><X className="size-5" /></Link>
          <div className="text-center min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-clay">Compagnon</p>
            <p className="text-sm font-bold truncate">{scenario.title}</p>
          </div>
          <button
            onClick={() => setShowT(!showT)}
            className="font-mono text-[10px] uppercase tracking-widest text-forest"
          >
            {showT ? "Masquer trad." : "Afficher trad."}
          </button>
        </div>
        {demoMode && (
          <div className="bg-gold/15 px-6 py-1.5 text-center">
            <p className="text-[11px] font-medium text-clay">
              Mode démo — ajoute une clé ANTHROPIC_API_KEY pour activer l'IA complète
            </p>
          </div>
        )}
      </header>

      <main className="flex-1 mx-auto max-w-2xl w-full px-6 py-6 space-y-4 overflow-y-auto">
        {messages.map((m, i) =>
          m.role === "companion" ? (
            <div key={i} className="max-w-[80%] animate-ios-in">
              <div className="ios-card rounded-tl-md p-4">
                <ArabicText size="lg" className="font-bold">{m.arabic}</ArabicText>
                {showT && (
                  <>
                    <p className="mt-2 font-mono text-xs italic text-night/50">/ {m.translit} /</p>
                    <p className="mt-1 text-sm">{m.translation}</p>
                  </>
                )}
                <div className="mt-3 flex items-center gap-2">
                  <AudioButton size="sm" text={m.arabic} variant={profile.mainVariant} />
                  <button className="font-mono text-[10px] uppercase tracking-widest text-forest">Explique-moi</button>
                  {m.demo && (
                    <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-gold">
                      <Sparkles className="size-3" /> démo
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div key={i} className="ml-auto max-w-[80%] animate-ios-in">
              <div className="rounded-3xl rounded-tr-md bg-forest text-ivory p-4 shadow-[var(--ios-shadow-sm)]">
                <p className="text-sm">{m.text}</p>
              </div>
            </div>
          ),
        )}
        {sending && (
          <div className="max-w-[80%] animate-ios-in">
            <div className="ios-card rounded-tl-md p-4 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-forest/40 animate-bounce [animation-delay:-0.3s]" />
              <span className="size-1.5 rounded-full bg-forest/40 animate-bounce [animation-delay:-0.15s]" />
              <span className="size-1.5 rounded-full bg-forest/40 animate-bounce" />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[var(--ios-hairline)] ios-material-thick">
        <div className="mx-auto max-w-2xl px-6 py-4 flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            disabled={sending}
            placeholder="Réponds en arabe ou en français…"
            className="flex-1 rounded-full border border-night/10 bg-card px-4 py-3 text-sm outline-none focus:border-forest disabled:opacity-60"
          />
          <button
            onClick={send}
            disabled={sending || !input.trim()}
            className="ios-pressable size-11 rounded-full bg-forest text-ivory grid place-items-center disabled:opacity-40"
          >
            <Send className="size-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}