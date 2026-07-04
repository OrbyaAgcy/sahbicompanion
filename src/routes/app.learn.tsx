import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { COURSES, VARIANT_LABEL } from "@/lib/sahbi/data";
import { useProfile } from "@/lib/sahbi/store";
import { PageHeader } from "@/components/sahbi/PageHeader";
import { ProgressRing } from "@/components/sahbi/ProgressRing";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/app/learn")({
  component: LearnLayout,
});

function LearnLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path === "/app/learn") return <LearnIndex />;
  return <Outlet />;
}

function LearnIndex() {
  const { profile } = useProfile();
  const course = COURSES.find((c) => c.variant === profile.mainVariant) ?? COURSES[0];
  const progresses = [72, 35, 0];

  return (
    <main className="mx-auto max-w-2xl px-6 pt-10 pb-16">
      <PageHeader eyebrow={VARIANT_LABEL[course.variant]} title={course.title} subtitle={course.description} />

      <div className="relative">
        <div className="absolute left-8 top-4 bottom-4 w-px bg-night/10" />
        <div className="space-y-4">
          {course.modules.map((m, i) => {
            const pct = progresses[i] ?? 0;
            const locked = i > 0 && (progresses[i - 1] ?? 0) < 30;
            return (
              <Link
                key={m.id}
                to="/app/learn/$courseId"
                params={{ courseId: m.id }}
                className={`relative flex items-center gap-4 rounded-3xl border p-4 ${
                  locked ? "border-night/5 bg-night/[0.02] opacity-60 pointer-events-none" : "border-night/5 bg-white"
                }`}
              >
                <div className="shrink-0 relative z-10 bg-ivory rounded-full">
                  {locked ? (
                    <div className="size-16 rounded-full bg-night/5 grid place-items-center">
                      <Lock className="size-4 text-night/40" />
                    </div>
                  ) : pct >= 100 ? (
                    <div className="size-16 rounded-full bg-forest text-ivory grid place-items-center font-bold">
                      {i + 1}
                    </div>
                  ) : (
                    <ProgressRing value={pct} size={64} stroke={5}>
                      <span className="font-mono text-[10px] text-night/60">{pct}%</span>
                    </ProgressRing>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-clay">Module {i + 1}</p>
                  <p className="mt-1 font-bold truncate">{m.title}</p>
                  <p className="text-xs text-night/50 truncate">{m.lessons.length} leçons · {m.xpReward} XP</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}