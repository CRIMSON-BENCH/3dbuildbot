// Process × State combos — 5 processes × 51 states = 255 pages.
// URL: /processes/cnc-machining/in/california — broad state-level SEO for "CNC machining in California"
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PROCESSES, getProcessBySlug } from "@/data/processes";
import { STATES } from "@/data/states";
import { CITIES } from "@/data/cities";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  const combos: { process: string; state: string }[] = [];
  for (const p of PROCESSES) for (const s of STATES) combos.push({ process: p.slug, state: s.slug });
  return combos;
}

export async function generateMetadata({ params }: { params: Promise<{ process: string; state: string }> }): Promise<Metadata> {
  const { process, state } = await params;
  const p = getProcessBySlug(process);
  const s = STATES.find((x) => x.slug === state);
  if (!p || !s) return { title: "Process in State" };
  return {
    title: `${p.name} in ${s.name} — Instant Quote + Fast Delivery`,
    description: `${p.name} manufacturing serving ${s.name} engineering teams. 3-14 day turnaround, US-based partner-shop network.`,
  };
}

export default async function ProcessStatePage({ params }: { params: Promise<{ process: string; state: string }> }) {
  const { process, state } = await params;
  const p = getProcessBySlug(process);
  const s = STATES.find((x) => x.slug === state);
  if (!p || !s) notFound();
  const topCities = CITIES.filter((c) => c.stateSlug === state).slice(0, 15);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: `${p.name} in ${s.name}`, areaServed: s.name }} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono text-slate-500"><Link href={`/processes/${p.slug}`} className="text-brand-600 hover:underline">{p.name}</Link> · in {s.name}</div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{p.name} in {s.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="brand">{p.name}</Badge>
            <Badge>{s.name}</Badge>
            <Badge tone="slate">3-14 day turnaround</Badge>
          </div>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {p.name} for engineering teams across {s.name}. {p.overview} 3DBuildBot ships to every city in {s.name} — from major metros to smaller communities — via UPS Ground (2-4 days) or FedEx (overnight available).
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">{p.name} specs</h2>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                <li>· Tolerance: {p.toleranceMm}</li>
                <li>· Lead time: {p.leadTimeDays}</li>
                <li>· Min feature: {p.minFeatureMm}</li>
                <li>· Max build size: {p.maxBuildMm}</li>
              </ul>
            </div>
            <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2">Quote from {s.name}</div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Upload CAD from anywhere in {s.name}. Instant price. Ship anywhere in state.</p>
              <Link href="/quote" className="inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Get instant quote →</Link>
            </div>
          </div>

          {topCities.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-3">{p.name} in {s.name} cities</h2>
              <div className="flex flex-wrap gap-2">
                {topCities.map((c) => (
                  <Link key={c.slug} href={`/locations/${state}/${c.slug}/${process}`} className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-brand-500">{c.name}</Link>
                ))}
              </div>
            </div>
          )}

          <InlineQuoteCta label={`Quote a ${p.name.toLowerCase()} part for delivery in ${s.name}`} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
