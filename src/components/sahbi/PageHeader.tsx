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
          <p className="text-[12px] font-semibold tracking-tight text-clay mb-1">{eyebrow}</p>
        )}
        <h1 className="text-[28px] font-bold tracking-[-0.03em] text-balance leading-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-[15px] text-night/55 max-w-xl leading-snug">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}