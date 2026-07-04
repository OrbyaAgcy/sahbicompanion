import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SCENARIOS } from "@/lib/sahbi/data";
import { ArabicText } from "@/components/sahbi/ArabicText";
import { AudioButton } from "@/components/sahbi/AudioButton";
import { Send, X } from "lucide-react";

export const Route = createFileRoute("/app/companion/$conversationId")({
  component: Chat,
});

interface Msg {
  role: "companion" | "you";
  arabic?: string;
  translit?: string;
  translation?: string;
  text?: string;
}

function Chat() {
  const { conversationId } = Route.useParams();
  const scenario = SCENARIOS.find((s) => s.id === conversationId) ?? SCENARIOS[0];
  const [showT, setShowT] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "companion",
      arabic: "أهلاً بيك ! جاهز نتكلّم شوي ؟",
      translit: "ahla bik ! jāhez nitkallam shwayy?",
      translation: "Bienvenue ! On est prêt à parler un peu ?",
    },
  ]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "you", text: input.trim() },
      {
        role: "companion",
        arabic: "تمام ! خبّرني أكتر عن حالك اليوم.",
        translit: "tamām ! khabbirni aktar ʿan ḥālak al-yōm.",
        translation: "Super ! Dis-m'en plus sur ta journée.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <header className="border-b border-night/5 bg-white/80 backdrop-blur-md sticky top-0 z-10">
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
      </header>

      <main className="flex-1 mx-auto max-w-2xl w-full px-6 py-6 space-y-4 overflow-y-auto">
        {messages.map((m, i) =>
          m.role === "companion" ? (
            <div key={i} className="max-w-[80%]">
              <div className="rounded-3xl rounded-tl-md bg-white border border-night/5 p-4">
                <ArabicText size="lg" className="font-bold">{m.arabic}</ArabicText>
                {showT && (
                  <>
                    <p className="mt-2 font-mono text-xs italic text-night/50">/ {m.translit} /</p>
                    <p className="mt-1 text-sm">{m.translation}</p>
                  </>
                )}
                <div className="mt-3 flex items-center gap-2">
                  <AudioButton size="sm" />
                  <button className="font-mono text-[10px] uppercase tracking-widest text-forest">Explique-moi</button>
                </div>
              </div>
            </div>
          ) : (
            <div key={i} className="ml-auto max-w-[80%]">
              <div className="rounded-3xl rounded-tr-md bg-forest text-ivory p-4">
                <p className="text-sm">{m.text}</p>
              </div>
            </div>
          ),
        )}
      </main>

      <footer className="border-t border-night/5 bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-6 py-4 flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Réponds en arabe ou en français…"
            className="flex-1 rounded-full border border-night/10 bg-white px-4 py-3 text-sm outline-none focus:border-forest"
          />
          <button onClick={send} className="size-11 rounded-full bg-forest text-ivory grid place-items-center">
            <Send className="size-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}