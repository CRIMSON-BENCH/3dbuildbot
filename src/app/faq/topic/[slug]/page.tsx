import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FAQ_TOPICS } from "@/data/faq-topics";
import { Container, Section, Badge } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { DisclaimerFooter } from "@/components/Upsell";

export function generateStaticParams() {
  return FAQ_TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = FAQ_TOPICS.find((t) => t.slug === slug);
  if (!topic) return { title: "FAQ Topic" };
  return {
    title: `${topic.title} — 3DBuildBot`,
    description: topic.description,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = FAQ_TOPICS.find((t) => t.slug === slug);
  if (!topic) notFound();
  const related = FAQ_TOPICS.filter((t) => t.slug !== topic.slug).slice(0, 6);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: topic.groups.flatMap((g) => g.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    }))),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <Section>
        <Container className="max-w-3xl">
          <div className="text-xs font-mono text-slate-500">
            <Link href="/faq" className="text-brand-600 hover:underline">FAQ</Link> · {topic.title}
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{topic.title}</h1>
          <Badge tone="brand" className="mt-3">{topic.groups.reduce((n, g) => n + g.items.length, 0)} answers</Badge>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{topic.intro}</p>

          <div className="mt-10 space-y-10">
            {topic.groups.map((g, gi) => (
              <section key={gi}>
                <h2 className="text-sm font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-4">{g.heading}</h2>
                <div className="space-y-6">
                  {g.items.map((qa, qi) => (
                    <div key={qi} className="border-b border-slate-200 dark:border-slate-800 pb-6">
                      <h3 className="text-base font-semibold">{qa.q}</h3>
                      <p className="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed">{qa.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-3">Related topics</h2>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/faq/topic/${r.slug}`} className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-brand-500">
                  {r.title.replace(" FAQ", "")}
                </Link>
              ))}
            </div>
          </div>

          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
