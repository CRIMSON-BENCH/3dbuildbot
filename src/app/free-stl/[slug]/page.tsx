import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRINTABLES, getPrintableBySlug } from "@/data/printables";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";

export function generateStaticParams() {
  return PRINTABLES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPrintableBySlug(slug);
  if (!p) return { title: "Free STL" };
  return {
    title: `Free STL — ${p.name} · Print or Ship | 3DBuildBot`,
    description: `${p.description} Free STL file for ${p.name.toLowerCase()}. Print at home or get printed + shipped starting under $10.`,
    keywords: p.keywords,
  };
}

// Naive per-part price estimate using our FDM PLA formula. Real quote runs
// through the regular /quote flow with the actual STL.
function estimateCents(volumeCm3: number): number {
  const material = volumeCm3 * 0.15 * 100; // $0.15/cm³ PLA
  const machineTime = volumeCm3 * 6 * 0.30; // ~6 sec/cm³ FDM
  const setup = 800;
  const perPart = Math.max(1500, material + machineTime + setup);
  return Math.round(perPart);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPrintableBySlug(slug);
  if (!p) notFound();
  const priceCents = estimateCents(p.volumeCm3Approx);
  const related = PRINTABLES.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);

  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="text-xs font-mono text-slate-500">
          <Link href="/free-stl" className="text-brand-600 hover:underline">Free STL library</Link> · {p.category}
        </div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{p.name}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="brand">Free STL</Badge>
          <Badge>{p.suggestedMaterial}</Badge>
          <Badge tone="slate">{p.difficulty}</Badge>
        </div>

        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{p.description}</p>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">Print specs</h2>
            <dl className="text-xs space-y-1.5">
              <div className="flex justify-between"><dt className="text-slate-500 font-mono">Volume</dt><dd>{p.volumeCm3Approx} cm³</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500 font-mono">Bounding box</dt><dd>{p.bboxMmApprox.x}×{p.bboxMmApprox.y}×{p.bboxMmApprox.z} mm</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500 font-mono">Print time</dt><dd>~{p.printTimeHours}h</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500 font-mono">Material</dt><dd>{p.suggestedMaterial}</dd></div>
            </dl>
            {p.stlUrl ? (
              <a href={p.stlUrl} download className="mt-4 inline-block text-sm text-brand-600 dark:text-brand-400 hover:underline">
                ↓ Download STL
              </a>
            ) : (
              <div className="mt-4 text-xs text-slate-500">STL download coming soon — <Link href="/contact?topic=stl-request" className="text-brand-600 hover:underline">request early access</Link>.</div>
            )}
          </div>

          <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2">Don't have a printer?</div>
            <h2 className="text-2xl font-semibold">~${(priceCents / 100).toFixed(2)}</h2>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Estimated price, ships in 3-6 days.</p>
            <Link href="/quote" className="mt-3 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">
              Get it printed →
            </Link>
          </div>
        </div>

        <InlineQuoteCta label={`Order the ${p.name.toLowerCase()} — ships in 3-6 days`} />

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-3">Related in {p.category}</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/free-stl/${r.slug}`} className="rounded-lg border border-slate-200 dark:border-slate-800 hover:border-brand-500 p-3 block">
                  <div className="text-xs font-mono text-slate-500">{r.volumeCm3Approx} cm³</div>
                  <div className="mt-1 font-medium text-sm">{r.name}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <DisclaimerFooter />
      </Container>
    </Section>
  );
}
