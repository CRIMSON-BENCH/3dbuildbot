import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blog";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getBlogPostBySlug(slug);
  if (!p) return { title: "Post" };
  return { title: `${p.title} — 3DBuildBot Blog`, description: p.subtitle };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getBlogPostBySlug(slug);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.subtitle, datePublished: p.publishedAt, dateModified: p.updatedAt ?? p.publishedAt, author: { "@type": "Person", name: p.author, jobTitle: p.authorRole }, keywords: p.keywords }} />
      <Section>
        <Container className="max-w-3xl">
          <div className="text-xs font-mono text-slate-500"><Link href="/blog" className="text-brand-600 hover:underline">Blog</Link></div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{p.title}</h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">{p.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-2 items-center text-xs text-slate-500">
            <Badge tone="brand">{p.category}</Badge>
            <span className="font-mono">{p.publishedAt} · {p.readMinutes} min read</span>
            <span>· {p.author}, {p.authorRole}</span>
          </div>
          <div className="mt-8 text-slate-700 dark:text-slate-300 leading-relaxed">
            <p className="text-lg font-medium">{p.intro}</p>
            {p.body.map((s, i) => (
              <div key={i} className="mt-6">
                {s.heading && <h2 className="text-lg font-semibold mb-2">{s.heading}</h2>}
                <p>{s.paragraph}</p>
              </div>
            ))}
          </div>
          {p.relatedPosts && p.relatedPosts.length > 0 && (
            <div className="mt-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Related</h2>
              <ul className="space-y-1 text-sm">
                {p.relatedPosts.map((r) => {
                  const rp = getBlogPostBySlug(r);
                  return rp ? <li key={r}>· <Link href={`/blog/${r}`} className="text-brand-600 hover:underline">{rp.title}</Link></li> : null;
                })}
              </ul>
            </div>
          )}
          <InlineQuoteCta label="Have a project? Get an instant quote in seconds" />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
