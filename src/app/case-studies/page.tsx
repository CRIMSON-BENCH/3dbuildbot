import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies } from "@/data/case-studies";
import { Container, Section, Badge } from "@/components/Card";

export const metadata: Metadata = {
  title: "Manufacturing Case Studies — Aerospace, Medical, Robotics, EV | 3DBuildBot",
  description: "20+ real customer case studies: how engineering teams cut lead time, reduced cost, and shipped better parts with 3DBuildBot.",
};

export default function Page() {
  const industries = Array.from(new Set(caseStudies.map((c) => c.industry)));
  return (
    <Section>
      <Container className="max-w-5xl">
        <div className="text-xs font-mono text-slate-500">Case Studies</div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">Real customers, real results</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
          {caseStudies.length} in-depth stories from engineering teams shipping flight hardware, medical devices, EVs, robots, and consumer products.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {industries.map((i) => <Badge key={i} tone="brand">{i}</Badge>)}
        </div>

        <div className="mt-10 grid gap-4">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="block rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 bg-white dark:bg-slate-900 p-6 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono text-slate-500 mb-1">{cs.industry} · {cs.material}</div>
                  <h2 className="text-lg font-semibold">{cs.title}</h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{cs.challenge.slice(0, 200)}…</p>
                </div>
                <div className="hidden sm:block text-right shrink-0">
                  <div className="text-xs font-mono text-slate-500">{cs.timeline}</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cs.processUsed.slice(0, 3).map((p) => (
                  <span key={p} className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{p}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
