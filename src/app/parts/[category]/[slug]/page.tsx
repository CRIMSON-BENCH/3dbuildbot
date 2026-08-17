import { notFound } from "next/navigation";
import Link from "next/link";
import { STANDARD_PARTS, CATEGORY_LABELS, getPartBySlug, PartCategory } from "@/data/standard-parts";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export function generateStaticParams() {
  return STANDARD_PARTS.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPartBySlug(slug);
  if (!p) return { title: "Part" };
  return { title: `${p.name} — Spec + Free CAD + Custom Variant Quote`, description: `${p.name}: ${p.material}. Standard spec + downloadable CAD. Need a custom variant? Quote in seconds.` };
}

export default async function PartPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const p = getPartBySlug(slug);
  if (!p) notFound();
  const catMeta = CATEGORY_LABELS[category as PartCategory];
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Product", name: p.name, category: catMeta?.label, brand: p.brand ? { "@type": "Brand", name: p.brand } : undefined, description: p.keywords, offers: p.approxPrice ? { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock" } : undefined }} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono text-slate-500"><Link href="/parts" className="text-brand-600 hover:underline">Parts</Link> · <Link href={`/parts/${category}`} className="text-brand-600 hover:underline">{catMeta?.label}</Link></div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{p.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.brand && <Badge tone="brand">{p.brand}</Badge>}
            <Badge>{p.material}</Badge>
            {p.approxPrice && <Badge tone="slate">{p.approxPrice}</Badge>}
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Specifications</h2>
              <dl className="text-sm space-y-2 font-mono">
                {Object.entries(p.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2 last:border-0">
                    <dt className="text-slate-500 text-xs">{k}</dt>
                    <dd className="text-slate-900 dark:text-slate-100 text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
                <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2">Need a custom variant?</div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">3DBuildBot can machine or 3D-print any of the customizable variants below in 2–7 days.</p>
                <ul className="text-sm space-y-1">
                  {p.customizable.map((c) => (
                    <li key={c} className="flex items-start gap-2"><span className="text-brand-500 mt-0.5">→</span>{c}</li>
                  ))}
                </ul>
                <Link href={`/quote?part=${p.slug}`} className="mt-4 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Quote a custom variant →</Link>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <h2 className="text-sm font-semibold mb-3">Typical use cases</h2>
                <ul className="text-sm space-y-1">{p.useCases.map((u) => <li key={u}>· {u}</li>)}</ul>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-2">Standard CAD (free download)</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">Standard-catalog CAD files for this part are available free from McMaster-Carr, MISUMI, TraceParts, and the manufacturer's site. 3DBuildBot doesn't distribute other manufacturers' proprietary CAD — but we'll happily machine or print any variant you design from that starting file.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={`https://www.mcmaster.com/products/search?query=${encodeURIComponent(p.name)}`} target="_blank" rel="noopener" className="text-xs font-medium px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 hover:border-brand-500">McMaster-Carr →</a>
              <a href={`https://us.misumi-ec.com/vona2/mech/M0104010000/`} target="_blank" rel="noopener" className="text-xs font-medium px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 hover:border-brand-500">MISUMI →</a>
              <a href={`https://www.traceparts.com/en/search/all-classifications?Keywords=${encodeURIComponent(p.name)}`} target="_blank" rel="noopener" className="text-xs font-medium px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 hover:border-brand-500">TraceParts →</a>
              <a href={`https://grabcad.com/library?query=${encodeURIComponent(p.name)}`} target="_blank" rel="noopener" className="text-xs font-medium px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 hover:border-brand-500">GrabCAD →</a>
            </div>
          </div>

          <InlineQuoteCta label="Design a custom variant → get a locked-price quote" />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
