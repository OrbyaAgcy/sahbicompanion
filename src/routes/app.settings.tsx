import { createFileRoute, Link } from "@tanstack/react-router";
import { useProfile } from "@/lib/sahbi/store";
import { PageHeader } from "@/components/sahbi/PageHeader";
import { VARIANTS, VARIANT_LABEL } from "@/lib/sahbi/data";

export const Route = createFileRoute("/app/settings")({
  component: Settings,
});

function Settings() {
  const { profile, update } = useProfile();

  return (
    <main className="mx-auto max-w-2xl px-6 pt-10 pb-16">
      <Link to="/app/profile" className="font-mono text-[11px] uppercase tracking-widest text-night/40">← Profil</Link>
      <PageHeader eyebrow="Paramètres" title="Ton confort d'abord." />

      <section className="space-y-3">
        <Group title="Apprentissage">
          <Toggle label="Afficher la translittération" checked={profile.transliteration} onChange={(v) => update({ transliteration: v })} />
          <Toggle label="Afficher les voyelles courtes" checked={profile.diacritics} onChange={(v) => update({ diacritics: v })} />
          <Select
            label="Dialecte principal"
            value={profile.mainVariant}
            onChange={(v) => update({ mainVariant: v as any })}
            options={VARIANTS.filter((v) => v.available).map((v) => ({ v: v.slug, label: VARIANT_LABEL[v.slug] }))}
          />
          <Select
            label="Objectif quotidien"
            value={String(profile.dailyMinutes)}
            onChange={(v) => update({ dailyMinutes: Number(v) })}
            options={[5, 10, 15, 20, 30].map((m) => ({ v: String(m), label: `${m} minutes` }))}
          />
        </Group>

        <Group title="Interface">
          <Toggle label="Mode sombre" checked={profile.darkMode} onChange={(v) => update({ darkMode: v })} />
        </Group>

        <Group title="Compte">
          <button className="w-full text-left px-4 py-3 text-sm font-semibold">Exporter mes données</button>
          <button className="w-full text-left px-4 py-3 text-sm font-semibold text-clay">Supprimer mon compte</button>
        </Group>
      </section>
    </main>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-night/5 bg-white overflow-hidden">
      <p className="px-4 pt-4 font-mono text-[10px] uppercase tracking-widest text-clay">{title}</p>
      <div className="mt-2 divide-y divide-night/5">{children}</div>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between px-4 py-3">
      <span className="text-sm font-semibold">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`h-6 w-11 rounded-full transition-colors ${checked ? "bg-forest" : "bg-night/15"}`}
      >
        <span
          className={`block size-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </button>
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { v: string; label: string }[] }) {
  return (
    <label className="flex items-center justify-between px-4 py-3 gap-3">
      <span className="text-sm font-semibold min-w-0 truncate">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-night/10 bg-ivory px-3 py-1.5 text-sm font-semibold"
      >
        {options.map((o) => (
          <option key={o.v} value={o.v}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}