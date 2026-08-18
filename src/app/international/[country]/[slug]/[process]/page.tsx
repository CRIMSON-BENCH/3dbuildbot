// International city × Process — 499 international cities × 5 processes = 2,495 pages.
// URL: /international/germany/berlin/cnc-machining
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { INTERNATIONAL_CITIES, getIntlCityBySlug } from "@/data/cities-international";
import { PROCESSES, getProcessBySlug } from "@/data/processes";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";

export function generateStaticParams() {
  const combos: { country: string; slug: string; process: string }[] = [];
  for (const c of INTERNATIONAL_CITIES) {
    for (const p of PROCESSES) {
      combos.push({ country: c.countrySlug, slug: c.slug, process: p.slug });
    }
  }
  return combos;
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; slug: string; process: string }> }): Promise<Metadata> {
  const { slug, process } = await params;
  const c = getIntlCityBySlug(slug);
  const p = getProcessBySlug(process);
  if (!c || !p) return { title: "Location" };
  return {
    title: `${p.name} in ${c.name}, ${c.country} — Instant Quote`,
    description: `${p.name} manufacturing delivered to ${c.name}, ${c.country}. 3-7 day international shipping via DHL/FedEx, landed-cost pricing.`,
  };
}

export default async function IntlCityProcessPage({ params }: { params: Promise<{ country: string; slug: string; process: string }> }) {
  const { country, slug, process } = await params;
  const c = getIntlCityBySlug(slug);
  const p = getProcessBySlug(process);
  if (!c || !p) notFound();
  const otherProcesses = PROCESSES.filter((x) => x.slug !== process);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: `${p.name} for ${c.name}`, areaServed: { "@type": "City", name: c.name, addressCountry: c.country } }} />
      <JsonLdBreadcrumbs crumbs={[
        { name: "Home", url: "/" },
        { name: "International", url: "/international" },
        { name: c.country, url: `/international/${c.countrySlug}` },
        { name: c.name, url: `/international/${c.countrySlug}/${c.slug}` },
        { name: p.name, url: `/international/${c.countrySlug}/${c.slug}/${process}` },
      ]} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono text-slate-500"><Link href="/international" className="text-brand-600 hover:underline">International</Link> · <Link href={`/international/${country}`} className="text-brand-600 hover:underline">{c.country}</Link> · <Link href={`/international/${country}/${slug}`} className="text-brand-600 hover:underline">{c.name}</Link> · {p.name}</div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{p.name} in {c.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="brand">{p.name}</Badge>
            <Badge>{c.country}</Badge>
            <Badge tone="slate">3-7 day international ship</Badge>
          </div>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {p.name} delivered to engineering teams in {c.name}, {c.country}. {p.overview} 3DBuildBot ships internationally via DHL Express and FedEx International Priority — landed-cost quotes (duty + VAT included), local currency invoicing available.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">{p.name} specs</h2>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                <li>· Tolerance: {p.toleranceMm}</li>
                <li>· Lead time: {p.leadTimeDays} + international shipping</li>
                <li>· Max build size: {p.maxBuildMm}</li>
              </ul>
            </div>
            <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2">Ship to {c.name}</div>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>· DHL Express: 2-4 business days from US</li>
                <li>· FedEx International Priority: 3-5 days</li>
                <li>· Landed cost pricing (duty + VAT included)</li>
              </ul>
              <Link href="/quote" className="mt-3 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Get instant quote →</Link>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-3">Other processes for {c.name}</h2>
            <div className="flex flex-wrap gap-2">
              {otherProcesses.map((op) => (
                <Link key={op.slug} href={`/international/${country}/${slug}/${op.slug}`} className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-brand-500">{op.name}</Link>
              ))}
            </div>
          </div>

          <InlineQuoteCta label={`Quote a ${p.name.toLowerCase()} part for ${c.name}`} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
