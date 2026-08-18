// Industry × State combos — 6 industries × 51 states = 306 pages.
// URL: /industries/aerospace-defense/texas — targets high-intent enterprise searches
// like "aerospace CNC Texas", "medical device manufacturing California", etc.
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { INDUSTRIES } from "@/data/industries";
import { STATES } from "@/data/states";
import { CITIES } from "@/data/cities";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";

export function generateStaticParams() {
  const combos: { slug: string; state: string }[] = [];
  for (const industry of INDUSTRIES) {
    for (const state of STATES) {
      combos.push({ slug: industry.slug, state: state.slug });
    }
  }
  return combos;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; state: string }> }): Promise<Metadata> {
  const { slug, state } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  const stateData = STATES.find((s) => s.slug === state);
  if (!industry || !stateData) return { title: "Industry" };
  return {
    title: `${industry.name} Manufacturing in ${stateData.name} — CNC + 3D Printing`,
    description: `On-demand manufacturing for ${industry.name} companies in ${stateData.name}. FDM, SLS, MJF, and 5-axis CNC. ITAR-registered US supply chain, 2-7 day turnaround.`,
  };
}

export default async function IndustryStatePage({ params }: { params: Promise<{ slug: string; state: string }> }) {
  const { slug, state } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  const stateData = STATES.find((s) => s.slug === state);
  if (!industry || !stateData) notFound();
  const stateCities = CITIES.filter((c) => c.stateSlug === state).slice(0, 12);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: `${industry.name} Manufacturing in ${stateData.name}`, provider: { "@type": "Organization", name: "3DBuildBot" }, areaServed: stateData.name }} />
      <JsonLdBreadcrumbs crumbs={[
        { name: "Home", url: "/" },
        { name: "Industries", url: `/industries/${industry.slug}` },
        { name: industry.name, url: `/industries/${industry.slug}` },
        { name: stateData.name, url: `/industries/${industry.slug}/${stateData.slug}` },
      ]} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono text-slate-500"><Link href="/industries/aerospace-defense" className="text-brand-600 hover:underline">Industries</Link> · <Link href={`/industries/${industry.slug}`} className="text-brand-600 hover:underline">{industry.name}</Link> · {stateData.name}</div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{industry.name} Manufacturing in {stateData.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="brand">{industry.name}</Badge>
            <Badge>{stateData.name}</Badge>
            {industry.certs?.slice(0, 2).map((c) => <Badge key={c} tone="slate">{c}</Badge>)}
          </div>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            3DBuildBot serves {industry.name.toLowerCase()} engineering teams across {stateData.name} with on-demand manufacturing — FDM, SLS, SLA, MJF, and 5-axis CNC — production-grade parts in 2-7 business days. Whether you're a startup prototyping a first product in {stateCities[0]?.name ?? stateData.name} or a Tier-1 supplier scaling bridge production, our instant-quote engine + US-based partner shops eliminate the RFQ back-and-forth.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">{industry.name} in {stateData.name} — quick facts</h2>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                <li>· Common processes: {industry.processes?.slice(0, 3).join(", ") ?? "5-axis CNC, SLS, DMLS"}</li>
                <li>· Typical materials: {industry.materials?.slice(0, 3).join(", ") ?? "aluminum, titanium, stainless"}</li>
                <li>· Certifications aligned: {industry.certs?.slice(0, 3).join(", ") ?? "ISO 9001, AS9100D"}</li>
                <li>· Lead time: 2-7 business days on standard orders</li>
              </ul>
            </div>
            <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2">Get quoted from {stateData.name}</div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Upload CAD from your desk in {stateCities[0]?.name ?? stateData.name}. Instant price. Ship to any address in {stateData.name} in 2-7 days.</p>
              <Link href="/quote" className="inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Get instant quote →</Link>
            </div>
          </div>

          {stateCities.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-3">Serving {stateData.name} cities</h2>
              <div className="flex flex-wrap gap-2">
                {stateCities.map((c) => (
                  <Link key={c.slug} href={`/locations/${state}/${c.slug}`} className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-brand-500">{c.name}</Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">Why {industry.name.toLowerCase()} teams in {stateData.name} use 3DBuildBot</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {industry.hero || `On-demand manufacturing purpose-built for ${industry.name.toLowerCase()}.`} We understand the {industry.name.toLowerCase()} manufacturing stack — from prototype-first design iteration to production-run compliance requirements. Every order routes through our US-based partner network, with materials traceability, certificates of conformance, and (on request) full AS9102 first-article inspection.
            </p>
          </div>

          <InlineQuoteCta label={`Quote a ${industry.name.toLowerCase()} part for delivery in ${stateData.name}`} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
