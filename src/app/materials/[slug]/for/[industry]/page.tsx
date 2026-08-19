// Material × Industry combos — 20 materials × 6 industries = 120 pages.
// URL: /materials/aluminum-6061/for/aerospace-defense — closes the material-selection funnel
// for buyers researching "aluminum 6061 for aerospace" and similar queries.
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MATERIALS, getMaterialBySlug } from "@/data/materials";
import { INDUSTRIES } from "@/data/industries";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";

export function generateStaticParams() {
  const combos: { slug: string; industry: string }[] = [];
  for (const m of MATERIALS) {
    for (const i of INDUSTRIES) {
      combos.push({ slug: m.slug, industry: i.slug });
    }
  }
  return combos;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; industry: string }> }): Promise<Metadata> {
  const { slug, industry } = await params;
  const m = getMaterialBySlug(slug);
  const ind = INDUSTRIES.find((i) => i.slug === industry);
  if (!m || !ind) return { title: "Material" };
  return {
    title: `${m.name} for ${ind.name} — Spec, Cost, Applications`,
    description: `${m.name} in ${ind.name.toLowerCase()} manufacturing: mechanical properties, common part types, cost per cm³, machining time, certifications, sourcing.`,
  };
}

export default async function MaterialIndustryPage({ params }: { params: Promise<{ slug: string; industry: string }> }) {
  const { slug, industry } = await params;
  const m = getMaterialBySlug(slug);
  const ind = INDUSTRIES.find((i) => i.slug === industry);
  if (!m || !ind) notFound();
  const isRelevant = ind.materials?.some((im) => im.toLowerCase().includes(m.name.split(" ")[0].toLowerCase())) ?? false;
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: `${m.name} for ${ind.name}`, description: `${m.name} applications and specifications for ${ind.name} manufacturing.` }} />
      <JsonLdBreadcrumbs crumbs={[
        { name: "Home", url: "/" },
        { name: "Materials", url: "/materials" },
        { name: m.name, url: `/materials/${m.slug}` },
        { name: `For ${ind.name}`, url: `/materials/${m.slug}/for/${ind.slug}` },
      ]} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono text-slate-500"><Link href="/materials" className="text-brand-600 hover:underline">Materials</Link> · <Link href={`/materials/${m.slug}`} className="text-brand-600 hover:underline">{m.name}</Link> · for {ind.name}</div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{m.name} for {ind.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="brand">{m.name}</Badge>
            <Badge>{ind.name}</Badge>
            {isRelevant && <Badge tone="green">Common choice</Badge>}
          </div>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {m.name} in {ind.name.toLowerCase()} applications: {m.overview || `A widely-used ${m.category} material with well-characterized properties across ${ind.name.toLowerCase()} use cases.`}
            {isRelevant ? ` This material is one of ${ind.name}'s standard picks — it appears on our top-3 order list for this industry.` : ` This material sees occasional ${ind.name.toLowerCase()} use but is less common than the industry's mainline picks.`}
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">{m.name} — key specs</h2>
              <dl className="text-xs space-y-2 font-mono">
                {m.tensileMpa && <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1"><dt className="text-slate-500">Tensile</dt><dd>{m.tensileMpa} MPa</dd></div>}
                {m.densityGcc && <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1"><dt className="text-slate-500">Density</dt><dd>{m.densityGcc} g/cm³</dd></div>}
                {m.costPerCm3 && <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1"><dt className="text-slate-500">Cost / cm³</dt><dd>${m.costPerCm3.toFixed(2)}</dd></div>}
                {m.glassTransC && <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1"><dt className="text-slate-500">Glass transition</dt><dd>{m.glassTransC}°C</dd></div>}
              </dl>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Common {ind.name.toLowerCase()} part types</h2>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                {(ind.useCases ?? []).slice(0, 5).map((u) => <li key={u.title}>· {u.title}</li>)}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-6">
            <h2 className="text-lg font-semibold">Get a {m.name} part quoted for {ind.name.toLowerCase()}</h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Upload CAD, get instant pricing including material, machining, finishing, and lead time. Controlled-data workflow available on request.</p>
            <Link href="/quote" className="mt-4 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Start a quote →</Link>
          </div>

          <div className="mt-6 text-xs text-slate-500">Related: <Link href={`/materials/${m.slug}`} className="text-brand-600 hover:underline">{m.name} full spec</Link> · <Link href={`/industries/${ind.slug}`} className="text-brand-600 hover:underline">{ind.name} manufacturing</Link></div>

          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
