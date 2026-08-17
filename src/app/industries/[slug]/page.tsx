import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES, getIndustryBySlug } from "@/data/industries";
import { Container, Section, Badge, FeatureCard } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter, RelatedProducts } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustryBySlug(slug);
  if (!i) return { title: "Industry" };
  return { title: `Manufacturing for ${i.name}`, description: i.tagline };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);
  if (!ind) notFound();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: `Manufacturing for ${ind.name}`, description: ind.hero }} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Industry</div>
          <h1 className="text-4xl font-semibold tracking-tight">{ind.name}</h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{ind.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {ind.certs.map((c) => <Badge key={c} tone="brand">{c}</Badge>)}
          </div>

          <div className="mt-8 prose-brand max-w-none">
            <p>{ind.hero}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold tracking-tight">Common use cases</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {ind.useCases.map((u) => (
                <div key={u.title} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                  <div className="text-sm font-semibold">{u.title}</div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{u.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Preferred processes</h2>
              <ul className="text-sm space-y-1">
                {ind.processes.map((p) => <li key={p}>· {p}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Common materials</h2>
              <ul className="text-sm space-y-1">
                {ind.materials.map((m) => <li key={m}>· {m}</li>)}
              </ul>
            </div>
          </div>

          {ind.namedCustomers && ind.namedCustomers.length > 0 && (
            <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Named references</h2>
              <div className="flex flex-wrap gap-4 text-lg font-semibold">
                {ind.namedCustomers.map((c) => <span key={c} className="text-slate-700 dark:text-slate-300">{c}</span>)}
              </div>
            </div>
          )}

          <InlineQuoteCta label={`Start a ${ind.name} project`} href={`/quote?industry=${ind.slug}`} />
          <RelatedProducts context={{ industry: ind.slug }} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
