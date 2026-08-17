import { notFound } from "next/navigation";
import Link from "next/link";
import { MACHINES, getMachineBySlug } from "@/data/machines";
import { Container, Section, Badge, StatCard } from "@/components/Card";
import type { Metadata } from "next";

export function generateStaticParams() { return MACHINES.map((m) => ({ slug: m.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = getMachineBySlug(slug);
  if (!m) return { title: "Machine" };
  return {
    title: `Own a ${m.brand} ${m.model}? Fill it with 3DBuildBot orders`,
    description: `${m.keyword} owners: turn idle machine hours into recurring revenue. Keep 70% of every order routed to your shop.`,
  };
}

export default async function ForShopsMachine({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = getMachineBySlug(slug);
  if (!m) notFound();
  const workingHoursPerMonth = 160;
  const idlePct = 100 - m.typicalUtilizationPct;
  const idleHours = Math.round((workingHoursPerMonth * idlePct) / 100);
  const grossPotential = idleHours * m.approxHourlyRate;
  const netPotential = Math.round(grossPotential * 0.7);
  return (
    <Section>
      <Container className="max-w-3xl">
        <Badge tone="green">{m.category.toUpperCase()}</Badge>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Own a {m.brand} {m.model}? Turn its idle hours into ${netPotential.toLocaleString()}/mo.</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          The {m.brand} {m.model} typically runs at ~{m.typicalUtilizationPct}% utilization — leaving roughly {idleHours} billable hours idle every month. At your ${m.approxHourlyRate}/hr rate, that's ${grossPotential.toLocaleString()} of potential monthly revenue you're not capturing. Route those idle hours to us and net ~${netPotential.toLocaleString()}/mo after our 30% platform fee.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/for-shops/apply" className="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium">Apply — {m.brand} {m.model} shops →</Link>
          <Link href="/for-shops#calculator" className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 font-medium">Custom estimate</Link>
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          <StatCard value={`${idleHours} hr`} label="Typical idle hours/mo" sublabel={`${idlePct}% of a standard 160hr month`} />
          <StatCard value={`$${grossPotential.toLocaleString()}`} label="Gross potential/mo" sublabel={`At $${m.approxHourlyRate}/hr your rate`} />
          <StatCard value={`$${netPotential.toLocaleString()}`} label="Your net take-home" sublabel="After 3DBuildBot 30% fee" />
        </div>

        <div className="mt-8 prose-brand max-w-none">
          <h2>What we route to {m.brand} {m.model} shops</h2>
          <p>Orders auto-route to shops with matching machine capability, material inventory, and region. If a customer uploads a CAD file that fits {m.brand} {m.model} envelope + material capability, and you're closer than other partners, the order lands in your queue.</p>
          <h2>How to accept and produce</h2>
          <p>Login to your partner portal, see the assigned job with CAD file + material spec + quantity + deadline. Click Accept — the customer sees your ETA. Produce on your {m.brand} {m.model}, ship direct with our label. Payment lands in your account NET-15 following month.</p>
          <h2>What we handle so you don't have to</h2>
          <ul>
            <li>Marketing + sales — our SEO drives the buyers</li>
            <li>Customer support — questions, revisions, order changes</li>
            <li>Quoting — instant AI-quoted, locked-price</li>
            <li>Compliance PDFs (CoC, material cert, traceability) generated from your production data</li>
            <li>Payment collection + NET-15 payout to you</li>
          </ul>
          <div className="text-xs text-slate-500 dark:text-slate-500 italic pt-4">Estimates assume typical utilization from industry surveys. Actual routing volume depends on customer demand in your region and match against your capability profile.</div>
        </div>
      </Container>
    </Section>
  );
}
