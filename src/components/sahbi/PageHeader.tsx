export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-clay mb-1">{eyebrow}</p>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-balance">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-night/60 max-w-xl">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}