import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { GLOSSARY, getGlossaryTermBySlug } from "@/data/glossary";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() { return GLOSSARY.map((t) => ({ slug: t.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getGlossaryTermBySlug(slug);
  if (!t) return { title: "Glossary" };
  return { title: `${t.term} — Manufacturing Glossary`, description: t.short };
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getGlossaryTermBySlug(slug);
  if (!t) notFound();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "DefinedTerm", name: t.term, description: t.definition, inDefinedTermSet: "https://www.3dbuildbot.com/glossary" }} />
      <Section>
        <Container className="max-w-3xl">
          <Badge tone="brand">{t.category}</Badge>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">{t.term}</h1>
          <p className="mt-2 text-sm text-slate-500">{t.short}</p>
          <p className="mt-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{t.definition}</p>

          {t.relatedTerms && t.relatedTerms.length > 0 && (
            <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Related terms</h2>
              <div className="flex flex-wrap gap-2">
                {t.relatedTerms.map((r) => (
                  <Link key={r} href={`/glossary/${r}`} className="text-xs font-mono px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:text-brand-600">{r}</Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 text-xs text-slate-500 dark:text-slate-500"><Link href="/glossary" className="text-brand-600 hover:underline">← All glossary terms</Link></div>
          <InlineQuoteCta label="Ready to manufacture?" />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
