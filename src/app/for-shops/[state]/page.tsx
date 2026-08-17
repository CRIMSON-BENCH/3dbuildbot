import { notFound } from "next/navigation";
import Link from "next/link";
import { STATES, getStateBySlug } from "@/data/states";
import { Container, Section, Badge } from "@/components/Card";
import type { Metadata } from "next";

export function generateStaticParams() { return STATES.map((s) => ({ state: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) return { title: "State" };
  return {
    title: `${s.name} Job Shops — Join the 3DBuildBot Partner Network`,
    description: `${s.name}-based CNC, 3D printing, and machining shops: fill your machines with US-sourced work. Keep 70% of every order.`,
  };
}

export default async function ForShopsState({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) notFound();
  return (
    <Section>
      <Container className="max-w-3xl">
        <Badge tone="green">Now recruiting in {s.name}</Badge>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Fill your {s.name} machines with recurring work</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {s.name}-based job shops: we route customer orders to your queue based on region, capability, and certification match. You accept, produce, ship. We handle sales, marketing, customer support, and collections. You keep 70% of every order.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/for-shops/apply" className="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium">Apply — {s.name} shops →</Link>
          <Link href="/for-shops#calculator" className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 font-medium">Earnings calculator</Link>
        </div>

        <div className="mt-8 prose-brand max-w-none">
          <h2>Why {s.name}?</h2>
          <p>{s.hubDescription} That means engineering teams in {s.name} are constantly ordering — CNC brackets, 3D-printed prototypes, precision-machined production parts. We're actively recruiting {s.name} shops to serve that regional demand with in-state routing (faster ship, no cross-country freight, DFARS-compliant sourcing on defense work).</p>
          <h2>Preferred process capabilities for {s.name}</h2>
          <p>Given the local industry mix, we're especially interested in shops offering: {s.industries.map((i) => i).join(", ")}-relevant work. If you serve any of those verticals or hold AS9100D / ITAR, you'll see priority routing.</p>
          <h2>What we ship to your queue</h2>
          <ul>
            <li>3D printing: FDM, SLS, SLA, MJF, DMLS metal</li>
            <li>Machining: 3-axis, 5-axis, Swiss, wire EDM, waterjet</li>
            <li>Post-processing: anodize, powder coat, plating, laser marking, insert install, heat treat</li>
            <li>Compliance-heavy work: AS9100D, ITAR-flagged, DFARS-compliant material sourcing</li>
          </ul>
          <h2>What we handle for you</h2>
          <ul>
            <li>All customer sourcing, marketing, and lead generation (our SEO drives ~1M+ page views/mo target)</li>
            <li>Instant CAD-based quoting (you never write a quote)</li>
            <li>Customer service, revisions, technical questions</li>
            <li>Payment collection + NET-15 to you on shipped orders</li>
            <li>Compliance PDF generation (CoC, FAI, material cert) from your production data</li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
