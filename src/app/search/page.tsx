import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import { MATERIALS } from "@/data/materials";
import { PROCESSES } from "@/data/processes";
import { INDUSTRIES } from "@/data/industries";
import { GLOSSARY } from "@/data/glossary";
import { ALL_GUIDES } from "@/data/guides";
import { STATES } from "@/data/states";
import { CITIES } from "@/data/cities";
import { SCHOOLS_LARGE } from "@/data/schools-large";
import { SOLVERS } from "@/data/solvers";
import { STANDARD_PARTS } from "@/data/standard-parts";
import { ALL_BLOG_POSTS as BLOG_POSTS } from "@/data/blog";
import { ALL_PUZZLES as PUZZLES } from "@/data/puzzles";
import type { Metadata } from "next";

interface Hit { title: string; sub: string; href: string; category: string; }

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();

  const hits: Hit[] = [];
  if (query) {
    const match = (needle: string) => needle.toLowerCase().includes(query);
    for (const m of MATERIALS) if (match(m.name) || match(m.slug)) hits.push({ title: m.name, sub: "Material", href: `/materials/${m.slug}`, category: "Material" });
    for (const p of PROCESSES) if (match(p.name) || match(p.slug)) hits.push({ title: p.name, sub: "Manufacturing process", href: `/processes/${p.slug}`, category: "Process" });
    for (const i of INDUSTRIES) if (match(i.name) || match(i.slug)) hits.push({ title: i.name, sub: "Industry", href: `/industries/${i.slug}`, category: "Industry" });
    for (const g of GLOSSARY) if (match(g.term) || match(g.slug)) hits.push({ title: g.term, sub: "Glossary term", href: `/glossary/${g.slug}`, category: "Glossary" });
    for (const g of ALL_GUIDES) if (match(g.title) || match(g.description) || match(g.slug)) hits.push({ title: g.title, sub: g.description, href: `/guides/${g.slug}`, category: "Guide" });
    for (const s of STATES) if (match(s.name) || match(s.slug)) hits.push({ title: s.name, sub: "Location", href: `/locations/${s.slug}`, category: "Location" });
    for (const c of CITIES) if (match(c.name) || match(c.slug)) hits.push({ title: `${c.name}, ${c.stateAbbr}`, sub: "US city", href: `/locations/${c.stateSlug}/${c.slug}`, category: "City" });
    for (const u of SCHOOLS_LARGE) if (match(u.name) || match(u.slug)) hits.push({ title: u.name, sub: `${u.type} · ${u.stateAbbr}`, href: u.type === "high-school" ? `/education/high-school/${u.stateAbbr.toLowerCase()}/${u.slug}` : `/education/university/${u.slug}`, category: "School" });
    for (const s of SOLVERS) if (match(s.name) || match(s.short) || match(s.slug)) hits.push({ title: s.name, sub: s.short, href: `/tools/solvers/${s.slug}`, category: "Solver" });
    for (const p of STANDARD_PARTS) if (match(p.name) || match(p.slug) || match(p.keywords)) hits.push({ title: p.name, sub: p.material, href: `/parts/${p.category}/${p.slug}`, category: "Part" });
    for (const p of BLOG_POSTS) if (match(p.title) || match(p.subtitle) || match(p.keywords)) hits.push({ title: p.title, sub: p.subtitle, href: `/blog/${p.slug}`, category: "Blog" });
    for (const p of PUZZLES) if (match(p.title) || match(p.desc)) hits.push({ title: p.title, sub: p.desc, href: `/puzzles/${p.slug}`, category: "Puzzle" });
  }

  const capped = hits.slice(0, 200);

  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">Search</h1>
        <form method="get" className="mt-4 flex gap-2">
          <input name="q" defaultValue={q} placeholder="Search materials, processes, cities, universities, parts, guides…" className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-base" autoFocus />
          <button type="submit" className="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium">Search</button>
        </form>

        {query && (
          <>
            <div className="mt-4 text-xs font-mono text-slate-500">{hits.length} result{hits.length === 1 ? "" : "s"} {hits.length > 200 && `— showing first 200`}</div>
            {capped.length === 0 && (
              <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-slate-500">
                No results for "{q}". Try a shorter or different query.
              </div>
            )}
            <div className="mt-6 space-y-2">
              {capped.map((h) => (
                <Link key={`${h.category}-${h.href}`} href={h.href} className="block rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 hover:border-brand-500 group">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold group-hover:text-brand-600 truncate">{h.title}</div>
                      <div className="text-xs text-slate-500 truncate">{h.sub}</div>
                    </div>
                    <Badge tone="slate">{h.category}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {!query && (
          <div className="mt-8 text-sm text-slate-600 dark:text-slate-400">
            Search the full 3DBuildBot library: 20 materials, 5 processes, 50 engineering guides, 30 glossary terms, 493 US cities, 500 international cities, 2,082 universities, 650 standard parts, 25 blog posts, 50 puzzles, 14 solvers.
          </div>
        )}
      </Container>
    </Section>
  );
}
