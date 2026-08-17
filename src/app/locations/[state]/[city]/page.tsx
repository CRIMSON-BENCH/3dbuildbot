import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCityBySlugAndState, getAllCityPaths } from "@/data/cities";
import { getStateBySlug } from "@/data/states";
import { PROCESSES } from "@/data/processes";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() { return getAllCityPaths(); }

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }): Promise<Metadata> {
  const { state, city } = await params;
  const c = getCityBySlugAndState(state, city);
  if (!c) return { title: "City" };
  const s = getStateBySlug(state);
  return { title: `Manufacturing services in ${c.name}, ${c.stateAbbr}`, description: `On-demand CNC + 3D printing serving ${c.name}. Ships to ${c.name}, ${s?.name} in 2–5 days domestic US ground.` };
}

export default async function CityPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state, city } = await params;
  const c = getCityBySlugAndState(state, city);
  const s = getStateBySlug(state);
  if (!c || !s) notFound();
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "LocalBusiness",
        name: `3DBuildBot — serving ${c.name}, ${c.stateAbbr}`,
        description: `On-demand manufacturing (FDM, SLS, SLA, MJF, 5-axis CNC) serving ${c.name} with domestic US shipping.`,
        areaServed: { "@type": "City", name: c.name, containedInPlace: s.name },
      }} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono text-slate-500"><Link href={`/locations/${state}`} className="text-brand-600 hover:underline">{s.name}</Link></div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Manufacturing in {c.name}, {c.stateAbbr}</h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">On-demand CNC + 3D printing serving {c.name} and the surrounding {c.county} County area. Domestic US ground ships in 2–5 days.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {c.nearbyIndustries.map((i) => <Badge key={i} tone="brand">{i}</Badge>)}
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Ship to {c.name}</h2>
              <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
                <li>· 2–5 day domestic US ground</li>
                <li>· Overnight FedEx available (+$45)</li>
                <li>· ITAR-registered US supply chain (defense-eligible)</li>
                <li>· White-glove delivery available for metro (+$150)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Available processes</h2>
              <div className="grid grid-cols-2 gap-2">
                {PROCESSES.map((p) => (
                  <Link key={p.slug} href={`/processes/${p.slug}`} className="text-xs font-mono px-2 py-2 rounded border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-center">
                    {p.short} · {p.leadTimeDays}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 prose-brand max-w-none">
            <h2>3DBuildBot in {c.name}</h2>
            <p>{c.name} is a hub for {c.nearbyIndustries.join(", ")}. Engineering teams in {c.name} rely on 3DBuildBot for instant CAD-quoted parts — from prototype brackets on FDM to production titanium components machined on 5-axis CNC with full ITAR traceability. Every order ships from our US-domiciled facility with domestic ground service to {c.name} in 2–5 days.</p>
            <h2>Local delivery expectations</h2>
            <p>Orders placed by 2pm ET typically enter production the same day. Metro {c.name} customers can request white-glove delivery for urgent handoffs. Rush 1-day and 2-day expedite options are available on FDM, SLA, and SLS.</p>
          </div>

          <InlineQuoteCta label={`Get a locked-price quote — ships to ${c.name}`} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
