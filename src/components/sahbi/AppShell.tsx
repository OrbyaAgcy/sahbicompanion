import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { House, BookOpenText, Sparkles, UserRound, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/app", label: "Accueil", icon: House },
  { to: "/app/learn", label: "Apprendre", icon: BookOpenText },
  { to: "/app/practice", label: "Pratiquer", icon: Dumbbell },
  { to: "/app/companion", label: "Compagnon", icon: Sparkles },
  { to: "/app/profile", label: "Profil", icon: UserRound },
] as const;

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => (to === "/app" ? pathname === "/app" : pathname.startsWith(to));

  return (
    <div className="min-h-screen bg-ivory text-night selection:bg-gold/20">
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col border-r border-[var(--ios-hairline)] bg-white/70 backdrop-blur-2xl p-6 z-40">
        <Link to="/app" className="mb-10 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-forest">Sahbi</span>
          <span className="font-arabic text-xl text-clay">صاحبي</span>
        </Link>
        <nav className="space-y-1">
          {TABS.map((t) => {
            const active = isActive(t.to);
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={cn(
                  "ios-pressable flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[15px] font-medium",
                  active ? "bg-forest text-ivory shadow-[var(--ios-shadow-sm)]" : "text-night/70 hover:text-night hover:bg-night/5",
                )}
              >
                <Icon className="size-[18px]" strokeWidth={active ? 2.2 : 1.8} /> {t.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-[22px] border border-gold/30 bg-gold/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-clay">Premium</p>
          <p className="mt-2 text-[13px] leading-snug text-night/80">Débloque tous les dialectes et le compagnon IA.</p>
          <Link to="/pricing" className="mt-3 inline-block text-xs font-bold text-forest underline">
            Découvrir →
          </Link>
        </div>
      </aside>

      <div className="lg:pl-64 pb-24 lg:pb-0">
        <Outlet />
      </div>

      <nav
        aria-label="Onglets"
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 ios-material-thick border-t border-[var(--ios-hairline)] pt-1.5 px-2"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 6px)" }}
      >
        <div className="max-w-md mx-auto flex justify-between items-stretch">
          {TABS.map((t) => {
            const active = isActive(t.to);
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={cn(
                  "ios-pressable flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 flex-1 rounded-[12px]",
                  active ? "text-forest" : "text-night/45",
                )}
              >
                <Icon className="size-[26px]" strokeWidth={active ? 2.2 : 1.7} />
                <span className={cn("text-[10px] font-medium tracking-tight", active ? "text-forest" : "text-night/50")}>
                  {t.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}