import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { GUIDES, getGuideBySlug } from "@/data/guides";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() { return GUIDES.map((g) => ({ slug: g.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuideBySlug(slug);
  if (!g) return { title: "Guide" };
  return { title: g.title, description: g.description };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuideBySlug(slug);
  if (!g) notFound();
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "TechArticle",
        headline: g.title, description: g.description,
        datePublished: g.updated, dateModified: g.updated,
      }} />
      <Section>
        <Container className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
            <Badge tone="brand">{g.category}</Badge>
            <span>{g.readTime}</span>
            <span>· Updated {g.updated}</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">{g.title}</h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">{g.description}</p>

          <div className="mt-8 prose-brand max-w-none">
            {g.sections.map((s, i) => (
              <div key={i}>
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>

          {g.relatedGuides && g.relatedGuides.length > 0 && (
            <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Related guides</h2>
              <ul className="space-y-2">
                {g.relatedGuides.map((r) => (
                  <li key={r}><Link href={`/guides/${r}`} className="text-sm text-brand-600 hover:underline">{r.replace(/-/g, " ")}</Link></li>
                ))}
              </ul>
            </div>
          )}

          <InlineQuoteCta label="Ready to quote a real part?" />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
