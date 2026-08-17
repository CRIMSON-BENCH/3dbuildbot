import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MATERIALS, getMaterialBySlug } from "@/data/materials";
import { getProcessBySlug } from "@/data/processes";
import { Container, Section, Badge } from "@/components/Card";
import { RelatedProducts, InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return MATERIALS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = getMaterialBySlug(slug);
  if (!m) return { title: "Material" };
  return {
    title: `${m.name} — Datasheet, Cost, Processes`,
    description: `${m.name}: ${m.tensileMpa} MPa tensile, ${m.densityGcc} g/cm³, ${m.glassTransC}°C glass transition. Real datasheet values, indicative cost per cm³, and every process 3DBuildBot offers it in.`,
  };
}

export default async function MaterialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = getMaterialBySlug(slug);
  if (!m) notFound();

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Product",
        name: m.name,
        description: m.overview,
        brand: { "@type": "Brand", name: "3DBuildBot" },
        offers: { "@type": "Offer", priceCurrency: "USD", price: m.costPerCm3.toFixed(2), priceSpecification: { "@type": "UnitPriceSpecification", price: m.costPerCm3, priceCurrency: "USD", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "CMK" } } },
      }} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Material · {m.category}</div>
          <h1 className="text-4xl font-semibold tracking-tight">{m.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {m.itarEligible && <Badge tone="red">ITAR-eligible</Badge>}
            {m.dfarsCompliant && <Badge tone="amber">DFARS-compliant</Badge>}
            {m.bioCompatible && <Badge tone="green">Biocompatible</Badge>}
            {m.outdoorRated && <Badge>UV-stable</Badge>}
          </div>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{m.overview}</p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Datasheet</h2>
              <dl className="text-sm space-y-2 font-mono">
                <Row k="Tensile strength (σt)" v={`${m.tensileMpa} MPa`} />
                <Row k="Elongation at break (ε)" v={`${m.elongationPct}%`} />
                <Row k="Glass transition (Tg)" v={`${m.glassTransC}°C`} />
                <Row k="Density (ρ)" v={`${m.densityGcc} g/cm³`} />
                <Row k="Min wall thickness" v={`${m.minWallMm} mm`} />
                <Row k="Tolerance" v={`±${m.toleranceMm} mm`} />
                <Row k="Cost per cm³" v={`$${m.costPerCm3.toFixed(2)}`} />
              </dl>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Manufacturing processes</h2>
              <div className="space-y-2">
                {m.processes.map((code) => {
                  const p = getProcessBySlug(code === "CNC-3" || code === "CNC-5" ? "cnc-machining" : code.toLowerCase());
                  return (
                    <Link key={code} href={`/processes/${p?.slug ?? "cnc-machining"}`} className="block rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 hover:border-brand-500">
                      <div className="text-sm font-medium">{p?.name ?? code}</div>
                      <div className="text-xs text-slate-500 font-mono">{p?.leadTimeDays} · {p?.toleranceMm}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Best for</h2>
              <ul className="text-sm space-y-1">
                {m.bestFor.map((b, i) => <li key={i} className="flex items-start gap-2"><span className="text-brand-500">·</span>{b}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Not recommended for</h2>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                {m.weakFor.map((w, i) => <li key={i} className="flex items-start gap-2"><span className="text-red-500">·</span>{w}</li>)}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">Post-processing options</h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {m.postProcess.map((p) => <Badge key={p}>{p}</Badge>)}
            </div>
          </div>

          <InlineQuoteCta label={`Quote a part in ${m.shortName}`} href={`/quote?material=${m.slug}`} />
          <RelatedProducts context={{ material: m.slug }} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2 last:border-0">
      <dt className="text-slate-500 text-xs">{k}</dt>
      <dd className="text-slate-900 dark:text-slate-100">{v}</dd>
    </div>
  );
}
