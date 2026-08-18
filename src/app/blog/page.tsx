import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import { ALL_BLOG_POSTS as BLOG_POSTS } from "@/data/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Blog — Manufacturing, Engineering & Industry (${BLOG_POSTS.length} posts)`,
  description: "Real engineering + manufacturing content from 3DBuildBot. Process comparisons, cost breakdowns, case studies, industry insights.",
};

const CAT_LABELS: Record<string, string> = {
  process: "Process", materials: "Materials", "case-study": "Case Study", cost: "Cost", industry: "Industry", engineering: "Engineering", news: "News",
};

export default function BlogIndex() {
  const cats = Array.from(new Set(BLOG_POSTS.map((p) => p.category)));
  const sorted = [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <>
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">Blog</div>
          <h1 className="text-4xl font-semibold tracking-tight">Manufacturing + Engineering</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Real posts from our engineering team. Process comparisons, cost breakdowns, case studies, industry analysis.</p>
        </Container>
      </Section>
      <Section className="py-4">
        <Container className="max-w-4xl space-y-5">
          {sorted.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="block rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-500 transition-colors group">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Badge tone="brand">{CAT_LABELS[p.category] ?? p.category}</Badge>
                <span className="font-mono">{p.publishedAt}</span>
                <span>· {p.readMinutes} min read</span>
              </div>
              <h2 className="mt-2 text-xl font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">{p.title}</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{p.subtitle}</p>
              <div className="mt-2 text-xs text-slate-500 font-mono">{p.author}, {p.authorRole}</div>
            </Link>
          ))}
        </Container>
      </Section>
    </>
  );
}
