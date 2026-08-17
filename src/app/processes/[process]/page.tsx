import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PROCESSES, getProcessBySlug } from "@/data/processes";
import { MATERIALS } from "@/data/materials";
import { Container, Section, Badge } from "@/components/Card";
import { RelatedProducts, InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";

export function generateStaticParams() {
  return PROCESSES.map((p) => ({ process: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ process: string }> }): Promise<Metadata> {
  const { process: slug } = await params;
  const p = getProcessBySlug(slug);
  if (!p) return { title: "Process" };
  return {
    title: `${p.name} — ${p.toleranceMm} tolerance · ${p.leadTimeDays}`,
    description: `${p.name} at 3DBuildBot: ${p.tagline} Instant quote, ${p.leadTimeDays} lead, ITAR-registered US supply chain.`,
  };
}

export default async function ProcessPage({ params }: { params: Promise<{ process: string }> }) {
  const { process: slug } = await params;
  const p = getProcessBySlug(slug);
  if (!p) notFound();
  const materials = MATERIALS.filter((m) => m.processes.includes(p.code));

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Service",
        name: p.name, description: p.overview,
        provider: { "@type": "Organization", name: "3DBuildBot" },
        areaServed: "United States",
      }} />
      <JsonLdBreadcrumbs crumbs={[
        { name: "Home", url: "/" },
        { name: "Processes", url: "/processes/fdm" },
        { name: p.name, url: `/processes/${p.slug}` },
      ]} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">{p.short}</div>
          <h1 className="text-4xl font-semibold tracking-tight">{p.name}</h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{p.tagline ?? p.overview}</p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatBox k="Lead time" v={p.leadTimeDays} />
            <StatBox k="Tolerance" v={p.toleranceMm} />
            <StatBox k="Layer / precision" v={p.layerMicron ?? "—"} />
            <StatBox k="Max build" v={p.maxBuildMm} />
          </div>

          <div className="mt-8 prose-brand max-w-none">
            <h2>Overview</h2>
            <p>{p.overview}</p>
            <h2>Best for</h2>
            <ul>{p.bestFor.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <h2>Limitations</h2>
            <ul>{p.limitations.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <h2>Post-processing</h2>
            <ul>{p.postProcess.map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">Available materials on {p.short}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {materials.map((m) => (
                <Link key={m.slug} href={`/processes/${p.slug}/${m.slug}`} className="rounded-lg border border-slate-200 dark:border-slate-800 p-3 hover:border-brand-500">
                  <div className="text-sm font-medium">{m.name}</div>
                  <div className="text-xs text-slate-500 font-mono">${m.costPerCm3.toFixed(2)}/cm³ · σ<sub>t</sub> {m.tensileMpa} MPa</div>
                </Link>
              ))}
            </div>
          </div>

          <InlineQuoteCta label={`Get an instant ${p.short} quote`} href={`/quote?process=${p.slug}`} />
          <RelatedProducts context={{ process: p.slug }} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}

function StatBox({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{k}</div>
      <div className="text-sm font-mono font-semibold mt-1">{v}</div>
    </div>
  );
}
