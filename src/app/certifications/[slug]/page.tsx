import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CERTIFICATIONS, getCertBySlug } from "@/data/certifications";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() { return CERTIFICATIONS.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCertBySlug(slug);
  if (!c) return { title: "Certification" };
  return { title: `${c.name} — 3DBuildBot`, description: c.overview.slice(0, 200) };
}

export default async function CertPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCertBySlug(slug);
  if (!c) notFound();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: c.name, description: c.overview }} />
      <Section>
        <Container className="max-w-3xl">
          <Badge tone="brand">Certification</Badge>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">{c.name}</h1>
          <p className="mt-2 text-sm text-slate-500">Authority: {c.authority} · Scope: {c.scope}</p>
          <p className="mt-6 text-slate-700 dark:text-slate-300 leading-relaxed">{c.overview}</p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Relevant for</h2>
              <ul className="text-sm space-y-1">{c.relevantFor.map((r) => <li key={r}>· {r}</li>)}</ul>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Documents included</h2>
              <ul className="text-sm space-y-1">{c.documentsIncluded.map((d) => <li key={d}>· {d}</li>)}</ul>
            </div>
          </div>

          <InlineQuoteCta label={`Start a ${c.short}-flowdown project`} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
