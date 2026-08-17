import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COMPETITORS, getCompetitorBySlug } from "@/data/competitors";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() { return COMPETITORS.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompetitorBySlug(slug);
  if (!c) return { title: "Compare" };
  return { title: `3DBuildBot vs ${c.name}`, description: c.headline };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCompetitorBySlug(slug);
  if (!c) notFound();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: `3DBuildBot vs ${c.name}`, description: c.headline }} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Comparison</div>
          <h1 className="text-4xl font-semibold tracking-tight">3DBuildBot vs {c.name}</h1>
          <p className="mt-3 text-sm text-slate-500">{c.tagline}</p>
          <p className="mt-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{c.headline}</p>

          <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
                <tr><th className="text-left px-4 py-3">Feature</th><th className="text-left px-4 py-3">3DBuildBot</th><th className="text-left px-4 py-3">{c.name}</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {c.weCompare.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-4 py-3 font-medium">{row.feature}</td>
                    <td className={`px-4 py-3 ${row.win === "us" ? "font-semibold text-emerald-700 dark:text-emerald-400" : ""}`}>{row.us}</td>
                    <td className={`px-4 py-3 text-slate-600 dark:text-slate-400 ${row.win === "them" ? "font-semibold text-slate-900 dark:text-slate-100" : ""}`}>{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">{c.name}'s strengths</h2>
              <ul className="text-sm space-y-1">{c.strengths.map((s) => <li key={s}>· {s}</li>)}</ul>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">{c.name}'s weaknesses</h2>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">{c.weaknesses.map((s) => <li key={s}>· {s}</li>)}</ul>
            </div>
          </div>

          <InlineQuoteCta label="See it yourself — instant quote" />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
