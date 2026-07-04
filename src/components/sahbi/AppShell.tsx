import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, Sparkles, User, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/app", label: "Accueil", icon: Home },
  { to: "/app/learn", label: "Apprendre", icon: BookOpen },
  { to: "/app/practice", label: "Pratiquer", icon: Dumbbell },
  { to: "/app/companion", label: "Compagnon", icon: Sparkles },
  { to: "/app/profile", label: "Profil", icon: User },
] as const;

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => (to === "/app" ? pathname === "/app" : pathname.startsWith(to));

  return (
    <div className="min-h-screen bg-ivory text-night selection:bg-gold/20">
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col border-r border-night/5 bg-white p-6 z-40">
        <Link to="/app" className="mb-10 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-forest">Sahbi</span>
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
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                  active ? "bg-forest text-ivory" : "text-night/60 hover:text-night hover:bg-night/5",
                )}
              >
                <Icon className="size-4" /> {t.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-2xl border border-gold/30 bg-gold/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-clay">Premium</p>
          <p className="mt-2 text-sm text-night/80">Débloque tous les dialectes et le compagnon IA.</p>
          <Link to="/pricing" className="mt-3 inline-block text-xs font-bold text-forest underline">
            Découvrir →
          </Link>
        </div>
      </aside>

      <div className="lg:pl-64 pb-24 lg:pb-0">
        <Outlet />
      </div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-ivory/90 backdrop-blur-xl border-t border-night/5 pt-2 pb-6 px-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          {TABS.map((t) => {
            const active = isActive(t.to);
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={cn(
                  "flex flex-col items-center gap-1 px-2 py-1 flex-1",
                  active ? "text-forest" : "text-night/40",
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.3 : 1.8} />
                <span className={cn("text-[10px] uppercase tracking-tighter font-bold", active && "text-forest")}>
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