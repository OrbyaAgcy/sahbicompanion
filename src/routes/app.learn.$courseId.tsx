import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { COURSES } from "@/lib/sahbi/data";
import { PageHeader } from "@/components/sahbi/PageHeader";

export const Route = createFileRoute("/app/learn/$courseId")({
  component: ModuleView,
  notFoundComponent: () => (
    <main className="mx-auto max-w-2xl px-6 pt-16 text-center">
      <h1 className="text-2xl font-bold">Module introuvable</h1>
      <Link to="/app/learn" className="mt-4 inline-block text-forest font-bold">← Retour au parcours</Link>
    </main>
  ),
  loader: ({ params }) => {
    for (const c of COURSES) {
      const m = c.modules.find((mm) => mm.id === params.courseId);
      if (m) return { module: m, course: c };
    }
    throw notFound();
  },
  errorComponent: () => <div className="p-6">Erreur.</div>,
});

function ModuleView() {
  const { module, course } = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-2xl px-6 pt-10 pb-16">
      <Link to="/app/learn" className="font-mono text-[11px] uppercase tracking-widest text-night/40">← Parcours</Link>
      <PageHeader eyebrow={course.title} title={module.title} subtitle={module.description} />

      <div className="space-y-3">
        {module.lessons.map((l, i) => (
          <Link
            key={l.id}
            to="/app/lesson/$lessonId"
            params={{ lessonId: l.id }}
            className="flex items-center justify-between rounded-2xl border border-night/5 bg-white p-4 hover:border-forest/40 transition-colors"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="size-10 rounded-full bg-forest/10 text-forest grid place-items-center font-bold">
                {i + 1}
              </div>
              <div className="min-w-0">
                <p className="font-bold truncate">{l.title}</p>
                <p className="text-xs text-night/50 truncate">{l.description}</p>
              </div>
            </div>
            <span className="font-mono text-xs text-night/40 shrink-0">{l.minutes} min</span>
          </Link>
        ))}
      </div>
    </main>
  );
}