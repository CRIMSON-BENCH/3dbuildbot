// Machine × State — 60 machines × 51 states = 3,060 pages.
// URL: /for-shops/machine/haas-vf-2ss/in/texas — recruits shops with specific machines in specific states.
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MACHINES, getMachineBySlug } from "@/data/machines";
import { STATES } from "@/data/states";
import { Container, Section, Badge } from "@/components/Card";
import { DisclaimerFooter } from "@/components/Upsell";

export function generateStaticParams() {
  const combos: { slug: string; state: string }[] = [];
  for (const m of MACHINES) for (const s of STATES) combos.push({ slug: m.slug, state: s.slug });
  return combos;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; state: string }> }): Promise<Metadata> {
  const { slug, state } = await params;
  const machine = getMachineBySlug(slug);
  const stateData = STATES.find((s) => s.slug === state);
  if (!machine || !stateData) return { title: "Machine × Location" };
  const displayName = `${machine.brand} ${machine.model}`;
  return {
    title: `${displayName} Shop Owners in ${stateData.name} — Join 3DBuildBot`,
    description: `Do you own a ${displayName} in ${stateData.name}? Join the 3DBuildBot partner network. Fill your capacity, keep 70%+ of order value, no upfront cost.`,
  };
}

export default async function MachineStatePage({ params }: { params: Promise<{ slug: string; state: string }> }) {
  const { slug, state } = await params;
  const machine = getMachineBySlug(slug);
  const stateData = STATES.find((s) => s.slug === state);
  if (!machine || !stateData) notFound();
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="text-xs font-mono text-slate-500"><Link href="/for-shops" className="text-brand-600 hover:underline">For Shops</Link> · <Link href={`/for-shops/machine/${machine.slug}`} className="text-brand-600 hover:underline">{`${machine.brand} ${machine.model}`}</Link> · in {stateData.name}</div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{`${machine.brand} ${machine.model}`} shop owners in {stateData.name}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="brand">Partner recruitment</Badge>
          <Badge>{stateData.name}</Badge>
          <Badge tone="slate">{machine.category.toUpperCase()}</Badge>
        </div>

        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Do you own a {machine.brand} {machine.model} shop in {stateData.name}? 3DBuildBot's partner network feeds qualified orders directly to your machine. Fill your idle capacity, keep {"70%+"} of every order's value, no upfront costs — you accept only the jobs that fit your schedule.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">{machine.brand} {machine.model} — capabilities matched</h2>
            <dl className="text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1"><dt className="text-slate-500">Brand</dt><dd>{machine.brand}</dd></div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1"><dt className="text-slate-500">Category</dt><dd>{machine.category}</dd></div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1"><dt className="text-slate-500">Typical utilization</dt><dd>{machine.typicalUtilizationPct}%</dd></div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1"><dt className="text-slate-500">Approx hourly rate</dt><dd>${machine.approxHourlyRate}/hr</dd></div>
            </dl>
          </div>
          <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
            <h2 className="text-sm font-semibold mb-2">What you get</h2>
            <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
              <li>· Qualified orders matched to your machine</li>
              <li>· 70%+ of order value paid to you</li>
              <li>· Net 15 payment terms</li>
              <li>· No upfront cost, no monthly fee</li>
              <li>· Accept only the jobs you want</li>
            </ul>
            <Link href="/for-shops/apply" className="mt-3 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Apply to join →</Link>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold mb-2">Why {stateData.name} shops with a {machine.brand} {machine.model} join us</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {stateData.name} has strong demand for {machine.category.replace("-", " ")} services — aerospace, medical, robotics, and consumer hardware customers all order regularly from 3DBuildBot. When our routing engine sees a job spec that matches your machine, it goes to you first (before we search elsewhere in {stateData.name} or nationally). This means faster turn times, higher acceptance rates, and a steady stream of work you'd otherwise chase individually.
          </p>
        </div>

        <DisclaimerFooter />
      </Container>
    </Section>
  );
}
