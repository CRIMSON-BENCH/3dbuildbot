// Material-vs-Material comparison pages — 20 × 19 / 2 = 190 unique pairs.
// URL: /materials/vs/aluminum-6061/aluminum-7075 — captures "6061 vs 7075" type searches.
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MATERIALS, getMaterialBySlug } from "@/data/materials";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  const combos: { a: string; b: string }[] = [];
  for (let i = 0; i < MATERIALS.length; i++) {
    for (let j = i + 1; j < MATERIALS.length; j++) {
      combos.push({ a: MATERIALS[i].slug, b: MATERIALS[j].slug });
    }
  }
  return combos;
}

export async function generateMetadata({ params }: { params: Promise<{ a: string; b: string }> }): Promise<Metadata> {
  const { a, b } = await params;
  const ma = getMaterialBySlug(a);
  const mb = getMaterialBySlug(b);
  if (!ma || !mb) return { title: "Materials comparison" };
  return {
    title: `${ma.name} vs ${mb.name} — Spec + Cost + Application Comparison`,
    description: `Side-by-side comparison of ${ma.name} and ${mb.name}: tensile strength, density, cost per cm³, machinability, temperature range, best applications.`,
  };
}

function fmt(n: number | undefined, unit: string, decimals = 1): string {
  if (n === undefined) return "—";
  return `${n.toFixed(decimals)}${unit}`;
}

export default async function MaterialVsMaterialPage({ params }: { params: Promise<{ a: string; b: string }> }) {
  const { a, b } = await params;
  const ma = getMaterialBySlug(a);
  const mb = getMaterialBySlug(b);
  if (!ma || !mb) notFound();

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: `${ma.name} vs ${mb.name}`, description: `Comparison of ${ma.name} and ${mb.name} for engineering applications.` }} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono text-slate-500"><Link href="/materials" className="text-brand-600 hover:underline">Materials</Link> · vs comparison</div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{ma.name} vs {mb.name}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Side-by-side spec comparison for engineering material selection.</p>

          <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-widest text-slate-500">Property</th>
                  <th className="text-left px-4 py-3 font-semibold">{ma.name}</th>
                  <th className="text-left px-4 py-3 font-semibold">{mb.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                <tr><td className="px-4 py-3 text-xs text-slate-500">Category</td><td className="px-4 py-3">{ma.category}</td><td className="px-4 py-3">{mb.category}</td></tr>
                <tr><td className="px-4 py-3 text-xs text-slate-500">Tensile strength</td><td className="px-4 py-3">{fmt(ma.tensileMpa, " MPa", 0)}</td><td className="px-4 py-3">{fmt(mb.tensileMpa, " MPa", 0)}</td></tr>
                <tr><td className="px-4 py-3 text-xs text-slate-500">Density</td><td className="px-4 py-3">{fmt(ma.densityGcc, " g/cm³", 2)}</td><td className="px-4 py-3">{fmt(mb.densityGcc, " g/cm³", 2)}</td></tr>
                <tr><td className="px-4 py-3 text-xs text-slate-500">Cost / cm³</td><td className="px-4 py-3">${(ma.costPerCm3 ?? 0).toFixed(2)}</td><td className="px-4 py-3">${(mb.costPerCm3 ?? 0).toFixed(2)}</td></tr>
                <tr><td className="px-4 py-3 text-xs text-slate-500">Glass transition</td><td className="px-4 py-3">{fmt(ma.glassTransC, "°C", 0)}</td><td className="px-4 py-3">{fmt(mb.glassTransC, "°C", 0)}</td></tr>
                <tr><td className="px-4 py-3 text-xs text-slate-500">Elongation</td><td className="px-4 py-3">{fmt(ma.elongationPct, "%", 1)}</td><td className="px-4 py-3">{fmt(mb.elongationPct, "%", 1)}</td></tr>
                <tr><td className="px-4 py-3 text-xs text-slate-500">Processes</td><td className="px-4 py-3 text-xs">{ma.processes?.join(", ")}</td><td className="px-4 py-3 text-xs">{mb.processes?.join(", ")}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">When to choose {ma.name}</div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{ma.overview?.split(".")[0] ?? `Best when ${ma.name}'s spec profile matches your requirements.`}.</p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">When to choose {mb.name}</div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{mb.overview?.split(".")[0] ?? `Best when ${mb.name}'s spec profile matches your requirements.`}.</p>
            </div>
          </div>

          <InlineQuoteCta label={`Quote a part in ${ma.name} or ${mb.name}`} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
