import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Join 3DBuildBot",
  description: "Build the next generation of on-demand manufacturing. We hire engineers who care about hardware and want to see their code ship physical parts.",
};

const ROLES = [
  { title: "Senior Full-Stack Engineer", team: "Platform", location: "Remote (US)", type: "Full-time" },
  { title: "Manufacturing Engineer", team: "Operations", location: "San Francisco, CA", type: "Full-time" },
  { title: "DFM AI Engineer", team: "AI/ML", location: "Remote (US)", type: "Full-time" },
  { title: "Enterprise Account Executive", team: "Sales", location: "Remote (US)", type: "Full-time" },
  { title: "Machinist / CNC Programmer", team: "Production", location: "San Francisco, CA", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">Careers</div>
        <h1 className="text-4xl font-semibold tracking-tight">Build the next generation of manufacturing</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">We hire engineers who care about hardware and want to see their code ship physical parts. Every commit ships parts that end up in aerospace, medical devices, robotics, and consumer products. If that's your thing, we want to talk.</p>

        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"><div className="text-2xl font-semibold">Fully remote</div><div className="text-xs text-slate-500 mt-1">US-based teams, async-first, quarterly on-sites in SF</div></div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"><div className="text-2xl font-semibold">Equity + benefits</div><div className="text-xs text-slate-500 mt-1">Meaningful equity, health/dental/vision, 401(k), unlimited PTO</div></div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"><div className="text-2xl font-semibold">Real product</div><div className="text-xs text-slate-500 mt-1">Ship every day. Real customers. Real revenue. Real hardware.</div></div>
        </div>

        <h2 className="mt-12 text-2xl font-semibold">Open roles</h2>
        <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          {ROLES.map((r) => (
            <div key={r.title} className="px-5 py-4 flex items-center justify-between gap-3">
              <div className="flex-1">
                <div className="text-sm font-semibold">{r.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{r.team} · {r.location} · {r.type}</div>
              </div>
              <a href={`mailto:careers@3dbuildbot.com?subject=${encodeURIComponent(r.title)}`} className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium hover:border-brand-500">Apply →</a>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold mb-2">Don't see your role?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">If you're excited about the mission and think you could contribute, email <a href="mailto:careers@3dbuildbot.com" className="text-brand-600 hover:underline">careers@3dbuildbot.com</a> with what you've built and what you want to work on.</p>
        </div>
      </Container>
    </Section>
  );
}
