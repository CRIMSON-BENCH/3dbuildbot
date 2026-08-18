// City × Process combos — 497 cities × 5 processes = 2,485 pages.
// URL: /locations/texas/austin/cnc-machining — local SEO for "CNC machining in Austin" etc.
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CITIES } from "@/data/cities";
import { STATES } from "@/data/states";
import { PROCESSES, getProcessBySlug } from "@/data/processes";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";

export function generateStaticParams() {
  const combos: { state: string; city: string; process: string }[] = [];
  for (const c of CITIES) {
    for (const p of PROCESSES) {
      combos.push({ state: c.stateSlug, city: c.slug, process: p.slug });
    }
  }
  return combos;
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string; process: string }> }): Promise<Metadata> {
  const { state, city, process } = await params;
  const cityData = CITIES.find((c) => c.slug === city && c.stateSlug === state);
  const p = getProcessBySlug(process);
  if (!cityData || !p) return { title: "Location" };
  return {
    title: `${p.name} in ${cityData.name}, ${cityData.stateAbbr} — Instant Quote`,
    description: `${p.name} manufacturing serving ${cityData.name}, ${cityData.stateAbbr}. 2-7 day turnaround, ITAR-eligible, US-based partner shops. Get an instant CAD quote.`,
  };
}

export default async function CityProcessPage({ params }: { params: Promise<{ state: string; city: string; process: string }> }) {
  const { state, city, process } = await params;
  const cityData = CITIES.find((c) => c.slug === city && c.stateSlug === state);
  const p = getProcessBySlug(process);
  if (!cityData || !p) notFound();
  const stateData = STATES.find((s) => s.slug === state);
  const otherProcesses = PROCESSES.filter((x) => x.slug !== process);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "LocalBusiness", name: `3DBuildBot ${p.name}`, areaServed: { "@type": "City", name: cityData.name, addressRegion: cityData.stateAbbr, addressCountry: "US" } }} />
      <JsonLdBreadcrumbs crumbs={[
        { name: "Home", url: "/" },
        { name: "Locations", url: "/locations/california" },
        { name: stateData?.name ?? cityData.stateAbbr, url: `/locations/${state}` },
        { name: cityData.name, url: `/locations/${state}/${city}` },
        { name: p.name, url: `/locations/${state}/${city}/${process}` },
      ]} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono text-slate-500"><Link href={`/locations/${state}`} className="text-brand-600 hover:underline">{stateData?.name ?? cityData.stateAbbr}</Link> · <Link href={`/locations/${state}/${city}`} className="text-brand-600 hover:underline">{cityData.name}</Link> · {p.name}</div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{p.name} in {cityData.name}, {cityData.stateAbbr}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="brand">{p.name}</Badge>
            <Badge>{cityData.name}, {cityData.stateAbbr}</Badge>
            <Badge tone="slate">2-7 day turnaround</Badge>
          </div>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {p.name} for engineering teams in {cityData.name}, {stateData?.name ?? cityData.stateAbbr}. {p.overview} 3DBuildBot's instant-quote engine + US-based partner network delivers parts to any {cityData.name} address in 2-7 business days — no local shop hunting, no email RFQ back-and-forth.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">{p.name} — quick specs</h2>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                <li>· Tolerance: {p.toleranceMm}</li>
                <li>· Lead time: {p.leadTimeDays}</li>
                <li>· Max build size: {p.maxBuildMm}</li>
                <li>· Ships to any {cityData.name} address</li>
              </ul>
            </div>
            <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2">Quote from {cityData.name}</div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Instant CAD-to-price + shipping to your {cityData.name} address.</p>
              <Link href="/quote" className="inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Get instant quote →</Link>
            </div>
          </div>

          {cityData.nearbyIndustries && cityData.nearbyIndustries.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-3">Local industries in {cityData.name}</h2>
              <div className="flex flex-wrap gap-2">
                {cityData.nearbyIndustries.map((i) => <Badge key={i} tone="slate">{i}</Badge>)}
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Common {p.name.toLowerCase()} demand in {cityData.name} — prototype parts, low-volume production runs, and bridge tooling for the sectors above.</p>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-3">Other processes available in {cityData.name}</h2>
            <div className="flex flex-wrap gap-2">
              {otherProcesses.map((op) => (
                <Link key={op.slug} href={`/locations/${state}/${city}/${op.slug}`} className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-brand-500">{op.name}</Link>
              ))}
            </div>
          </div>

          <InlineQuoteCta label={`Quote a ${p.name.toLowerCase()} part for delivery in ${cityData.name}`} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
