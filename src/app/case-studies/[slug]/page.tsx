import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies } from "@/data/case-studies";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return { title: "Case Study" };
  return {
    title: `${cs.title} — Case Study | 3DBuildBot`,
    description: cs.challenge.slice(0, 155),
    keywords: cs.keywords,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();
  const related = caseStudies.filter((c) => c.industry === cs.industry && c.slug !== cs.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: cs.title,
        articleSection: cs.industry,
        about: cs.material,
      }} />
      <Section>
        <Container className="max-w-3xl">
          <div className="text-xs font-mono text-slate-500">
            <Link href="/case-studies" className="text-brand-600 hover:underline">Case Studies</Link> · {cs.industry}
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{cs.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="brand">{cs.industry}</Badge>
            <Badge>{cs.material}</Badge>
            {cs.processUsed.slice(0, 3).map((p) => <Badge key={p} tone="slate">{p}</Badge>)}
          </div>

          <dl className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
              <dt className="text-xs font-mono uppercase tracking-widest text-slate-500">Customer</dt>
              <dd className="mt-1 font-medium">{cs.customer}</dd>
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
              <dt className="text-xs font-mono uppercase tracking-widest text-slate-500">Timeline</dt>
              <dd className="mt-1 font-medium">{cs.timeline}</dd>
            </div>
          </dl>

          <section className="mt-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Challenge</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{cs.challenge}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Approach</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{cs.approach}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3">Results</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {cs.results.map((r, i) => (
                <div key={i} className="rounded-lg border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300">{r.label}</div>
                  <div className="mt-1 text-lg font-semibold">{r.value}</div>
                </div>
              ))}
            </div>
          </section>

          {cs.quote && (
            <blockquote className="mt-8 border-l-4 border-brand-500 pl-4 py-2">
              <p className="text-lg italic text-slate-700 dark:text-slate-300">"{cs.quote.text}"</p>
              <footer className="mt-2 text-sm text-slate-500">
                — {cs.quote.role}, {cs.quote.company}
              </footer>
            </blockquote>
          )}

          <InlineQuoteCta label={`Get a quote for a similar ${cs.industry.toLowerCase()} project`} />

          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-3">Related in {cs.industry}</h2>
              <div className="grid gap-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/case-studies/${r.slug}`} className="rounded-lg border border-slate-200 dark:border-slate-800 hover:border-brand-500 p-4 block">
                    <div className="text-xs font-mono text-slate-500">{r.material}</div>
                    <div className="mt-1 font-medium">{r.title}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
