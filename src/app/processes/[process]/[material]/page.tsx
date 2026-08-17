import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PROCESSES, getProcessBySlug } from "@/data/processes";
import { MATERIALS, getMaterialBySlug } from "@/data/materials";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter, RelatedProducts } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  const params: { process: string; material: string }[] = [];
  for (const p of PROCESSES) {
    for (const m of MATERIALS) {
      if (m.processes.includes(p.code)) params.push({ process: p.slug, material: m.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ process: string; material: string }> }): Promise<Metadata> {
  const { process, material } = await params;
  const p = getProcessBySlug(process);
  const m = getMaterialBySlug(material);
  if (!p || !m) return { title: "Combination" };
  return {
    title: `${m.shortName} on ${p.short} — instant quote`,
    description: `${m.name} manufactured on ${p.name}. ${p.toleranceMm} tolerance, ${p.leadTimeDays} lead, $${m.costPerCm3.toFixed(2)}/cm³. Locked-price quote in seconds.`,
  };
}

export default async function ProcessMaterialPage({ params }: { params: Promise<{ process: string; material: string }> }) {
  const { process, material } = await params;
  const p = getProcessBySlug(process);
  const m = getMaterialBySlug(material);
  if (!p || !m || !m.processes.includes(p.code)) notFound();

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Product",
        name: `${m.name} — ${p.name}`,
        description: `${m.overview.slice(0, 200)}`,
        offers: { "@type": "Offer", priceCurrency: "USD", price: m.costPerCm3.toFixed(2), availability: "https://schema.org/InStock" },
      }} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono text-slate-500">
            <Link href={`/processes/${p.slug}`} className="text-brand-600 hover:underline">{p.name}</Link> · <Link href={`/materials/${m.slug}`} className="text-brand-600 hover:underline">{m.name}</Link>
          </div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{m.shortName} on {p.short}</h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">Combining {m.name} with {p.name} · {p.toleranceMm} tolerance · {p.leadTimeDays} lead · ${m.costPerCm3.toFixed(2)}/cm³.</p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Combined spec</h2>
              <dl className="text-sm space-y-2 font-mono">
                <Row k="Process tolerance" v={p.toleranceMm} />
                <Row k="Achievable min wall" v={`${m.minWallMm} mm`} />
                <Row k="Material tensile" v={`${m.tensileMpa} MPa`} />
                <Row k="Density" v={`${m.densityGcc} g/cm³`} />
                <Row k="Lead time" v={p.leadTimeDays} />
                <Row k="Cost per cm³" v={`$${m.costPerCm3.toFixed(2)}`} />
              </dl>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Certifications on this combo</h2>
              <div className="flex flex-wrap gap-2">
                <Badge tone="brand">ISO 9001</Badge>
                <Badge tone="amber">AS9100D-aligned</Badge>
                {m.itarEligible && <Badge tone="red">ITAR</Badge>}
                {m.dfarsCompliant && <Badge tone="amber">DFARS</Badge>}
                {m.bioCompatible && <Badge tone="green">Biocompatible</Badge>}
              </div>
              <div className="mt-4 text-xs text-slate-600 dark:text-slate-400">Material certificate + Certificate of Conformance included on every shipment. AS9102 FAI report available as a paid add-on.</div>
            </div>
          </div>

          <InlineQuoteCta label={`Quote ${m.shortName} on ${p.short}`} href={`/quote?process=${p.slug}&material=${m.slug}`} />
          <RelatedProducts context={{ process: p.slug, material: m.slug }} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2 last:border-0"><dt className="text-slate-500 text-xs">{k}</dt><dd className="text-slate-900 dark:text-slate-100">{v}</dd></div>;
}
