// Process vs Process comparison — 5 choose 2 = 10 pages.
// URL: /processes/vs/cnc-machining/sls — captures "CNC vs SLS" search intent.
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PROCESSES, getProcessBySlug } from "@/data/processes";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  const combos: { a: string; b: string }[] = [];
  for (let i = 0; i < PROCESSES.length; i++) {
    for (let j = i + 1; j < PROCESSES.length; j++) {
      combos.push({ a: PROCESSES[i].slug, b: PROCESSES[j].slug });
    }
  }
  return combos;
}

export async function generateMetadata({ params }: { params: Promise<{ a: string; b: string }> }): Promise<Metadata> {
  const { a, b } = await params;
  const pa = getProcessBySlug(a);
  const pb = getProcessBySlug(b);
  if (!pa || !pb) return { title: "Process comparison" };
  return {
    title: `${pa.name} vs ${pb.name} — Which Process for Your Part?`,
    description: `Side-by-side comparison of ${pa.name} and ${pb.name}: tolerances, lead time, minimum feature size, cost tradeoffs, best applications.`,
  };
}

export default async function ProcessVsProcessPage({ params }: { params: Promise<{ a: string; b: string }> }) {
  const { a, b } = await params;
  const pa = getProcessBySlug(a);
  const pb = getProcessBySlug(b);
  if (!pa || !pb) notFound();

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: `${pa.name} vs ${pb.name}`, description: `Manufacturing process comparison.` }} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono text-slate-500"><Link href={`/processes/${pa.slug}`} className="text-brand-600 hover:underline">Processes</Link> · vs comparison</div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{pa.name} vs {pb.name}</h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">Which process fits your part? Side-by-side spec + best-application comparison.</p>

          <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-widest text-slate-500">Spec</th>
                  <th className="text-left px-4 py-3 font-semibold">{pa.name}</th>
                  <th className="text-left px-4 py-3 font-semibold">{pb.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                <tr><td className="px-4 py-3 text-slate-500">Lead time</td><td className="px-4 py-3">{pa.leadTimeDays}</td><td className="px-4 py-3">{pb.leadTimeDays}</td></tr>
                <tr><td className="px-4 py-3 text-slate-500">Tolerance</td><td className="px-4 py-3">{pa.toleranceMm}</td><td className="px-4 py-3">{pb.toleranceMm}</td></tr>
                <tr><td className="px-4 py-3 text-slate-500">Min feature</td><td className="px-4 py-3">{pa.minFeatureMm}</td><td className="px-4 py-3">{pb.minFeatureMm}</td></tr>
                <tr><td className="px-4 py-3 text-slate-500">Max build size</td><td className="px-4 py-3">{pa.maxBuildMm}</td><td className="px-4 py-3">{pb.maxBuildMm}</td></tr>
                {(pa.layerMicron || pb.layerMicron) && (
                  <tr><td className="px-4 py-3 text-slate-500">Layer thickness</td><td className="px-4 py-3">{pa.layerMicron ?? "n/a"}</td><td className="px-4 py-3">{pb.layerMicron ?? "n/a"}</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2">Choose {pa.name} when</div>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                {pa.bestFor.slice(0, 5).map((b) => <li key={b}>· {b}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2">Choose {pb.name} when</div>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                {pb.bestFor.slice(0, 5).map((b) => <li key={b}>· {b}</li>)}
              </ul>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">{pa.name} limitations</div>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                {pa.limitations.slice(0, 4).map((l) => <li key={l}>· {l}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">{pb.name} limitations</div>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                {pb.limitations.slice(0, 4).map((l) => <li key={l}>· {l}</li>)}
              </ul>
            </div>
          </div>

          <InlineQuoteCta label={`Quote a part in ${pa.name} or ${pb.name}`} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
