import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { STATES, getStateBySlug } from "@/data/states";
import { getCitiesForState } from "@/data/cities";
import { getUniversitiesByState } from "@/data/schools-large";
import { PROCESSES } from "@/data/processes";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";

export function generateStaticParams() { return STATES.map((s) => ({ state: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) return { title: "State" };
  return { title: `Manufacturing in ${s.name}`, description: s.hubDescription };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) notFound();
  const cities = getCitiesForState(state);
  const unis = getUniversitiesByState(s.abbr);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: `Manufacturing in ${s.name}`, description: s.hubDescription, areaServed: s.name }} />
      <JsonLdBreadcrumbs crumbs={[
        { name: "Home", url: "/" },
        { name: "Locations", url: "/locations/california" },
        { name: s.name, url: `/locations/${s.slug}` },
      ]} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">{s.region}</div>
          <h1 className="text-4xl font-semibold tracking-tight">Manufacturing services in {s.name}</h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">{s.hubDescription}</p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Cities we ship to in {s.abbr}</h2>
              <div className="grid grid-cols-2 gap-1 text-sm">
                {cities.slice(0, 12).map((c) => (
                  <Link key={c.slug} href={`/locations/${state}/${c.slug}`} className="text-brand-600 hover:underline">{c.name}</Link>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Key industries</h2>
              <div className="flex flex-wrap gap-2">
                {s.industries.map((i) => <Badge key={i} tone="brand">{i}</Badge>)}
              </div>
              <h3 className="text-sm font-semibold mt-4 mb-2">Ship time</h3>
              <p className="text-xs text-slate-500">Domestic US ground · 2–5 days from our US facility to any {s.abbr} address.</p>
            </div>
          </div>

          {unis.length > 0 && (
            <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Universities in {s.name} with engineering programs</h2>
              <div className="grid sm:grid-cols-2 gap-1 text-sm">
                {unis.slice(0, 15).map((u) => (
                  <Link key={u.slug} href={`/education/university/${u.slug}`} className="text-brand-600 hover:underline">{u.name}</Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 grid sm:grid-cols-5 gap-2">
            {PROCESSES.map((p) => (
              <Link key={p.slug} href={`/processes/${p.slug}`} className="rounded-lg border border-slate-200 dark:border-slate-800 p-3 text-center text-xs font-mono hover:border-brand-500">
                {p.short}
              </Link>
            ))}
          </div>

          <InlineQuoteCta label={`Ship a part to ${s.name}`} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
