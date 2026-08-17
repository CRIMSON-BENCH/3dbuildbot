// Public status page — enterprise buyers ask "what's your uptime?" and
// expect a status URL to link to in their vendor security review packet.
import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status — 3DBuildBot Platform Uptime",
  description: "Real-time status of 3DBuildBot's quote engine, API, and manufacturing pipeline.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function fetchHealth(): Promise<{ ok: boolean; version?: string; env?: string; totalMs?: number; checks?: Record<string, { ok: boolean; ms: number; error?: string }> }> {
  try {
    const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
    const r = await fetch(`${base}/api/health?deep=1`, { cache: "no-store" });
    return await r.json();
  } catch {
    return { ok: false };
  }
}

const COMPONENTS: { name: string; desc: string; check?: string }[] = [
  { name: "Web application", desc: "Marketing pages + dashboard + quote UI", check: "process" },
  { name: "Quote engine", desc: "CAD parsing + instant pricing calculations" },
  { name: "Database", desc: "Users, orders, quotes, parts, teams", check: "db" },
  { name: "Payments (Stripe)", desc: "Checkout + subscription + webhook processing" },
  { name: "AI services (Gemini)", desc: "DFM analysis + material wizard + reverse-engineer" },
  { name: "Manufacturing pipeline", desc: "Partner shop routing + order tracking" },
  { name: "API v1", desc: "Public REST API for quote / order create / order status" },
];

export default async function StatusPage() {
  const health = await fetchHealth();
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">Status</div>
            <h1 className="text-3xl font-semibold tracking-tight">Platform status</h1>
          </div>
          <div className={`px-4 py-2 rounded-full text-xs font-semibold ${health.ok ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"}`}>
            {health.ok ? "● All systems operational" : "● Degraded — investigating"}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
          {COMPONENTS.map((c) => {
            const check = c.check ? health.checks?.[c.check] : undefined;
            const ok = check ? check.ok : health.ok;
            return (
              <div key={c.name} className="px-5 py-4 flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{c.desc}</div>
                </div>
                <Badge tone={ok ? "brand" : "amber"}>{ok ? "Operational" : "Degraded"}</Badge>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-4 text-center">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">Version</div>
            <div className="text-sm font-mono">{health.version ?? "—"}</div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">Environment</div>
            <div className="text-sm font-mono">{health.env ?? "—"}</div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">Health check</div>
            <div className="text-sm font-mono">{health.totalMs ?? "—"}ms</div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold mb-2">Reporting an incident</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">See something we don't? Email <a href="mailto:status@3dbuildbot.com" className="text-brand-600 hover:underline">status@3dbuildbot.com</a>. Vendor security review teams can request our SOC 2 report + uptime SLA at <Link href="/contact" className="text-brand-600 hover:underline">/contact</Link>.</p>
        </div>
        <div className="mt-3 text-[11px] text-slate-500">This page is auto-refreshed every 30 seconds by external uptime monitors. Underlying data: <Link href="/api/health?deep=1" className="hover:underline">/api/health?deep=1</Link></div>
      </Container>
    </Section>
  );
}
