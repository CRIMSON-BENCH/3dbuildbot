import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Container, Section, Badge } from "@/components/Card";
import { formatUSD } from "@/lib/quote-engine";
import { getMaterialBySlug } from "@/data/materials";
import { getProcessBySlug } from "@/data/processes";

export const dynamic = "force-dynamic";

export default async function PublicQuotePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const all = await db.all();
  const q = all.quotes.find((x) => x.shareToken === token);
  if (!q) notFound();
  const proc = getProcessBySlug(q.process);
  const mat = getMaterialBySlug(q.material);

  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">Shared quote</div>
        <h1 className="text-3xl font-semibold tracking-tight">Quote {q.id}</h1>
        <div className="mt-2 flex items-center gap-2"><Badge tone={q.status === "ordered" ? "brand" : "green"}>{q.status}</Badge><Badge tone="slate">Locked until {new Date(q.expiresAt).toLocaleDateString()}</Badge></div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">Spec</h2>
            <dl className="text-sm space-y-2">
              <Row k="Process">{proc?.name ?? q.process}</Row>
              <Row k="Material">{mat?.name ?? q.material}</Row>
              <Row k="Finish">{q.finish ?? "standard"}</Row>
              <Row k="Expedite">{q.expedite ?? "standard"}</Row>
              <Row k="Quantity">{q.quantity}</Row>
              <Row k="Lead time">{q.leadTimeDays}</Row>
            </dl>
          </div>
          <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-1">Locked total</div>
            <div className="text-3xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">{formatUSD(q.totalPriceCents)}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">{formatUSD(q.unitPriceCents)} × {q.quantity}</div>
            <div className="mt-3 text-[10px] text-slate-500 dark:text-slate-500 font-mono">This link is view-only. To order, the requester must sign in to their 3DBuildBot account.</div>
          </div>
        </div>

        {q.dfmSummary && (
          <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">DFM notes</h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{q.dfmSummary}</p>
            <ul className="space-y-1 text-xs">
              {q.dfmIssues?.map((i, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className={i.level === "warn" ? "text-amber-500" : "text-brand-500"}>{i.level === "warn" ? "⚠" : "ⓘ"}</span>
                  <span className="text-slate-700 dark:text-slate-300">{i.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {q.costDrivers && (
          <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">Cost drivers</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs font-mono">
              {q.costDrivers.map((d) => (
                <div key={d.label} className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-1">
                  <span className="text-slate-600 dark:text-slate-400">{d.label}</span>
                  <span className={d.cents < 0 ? "text-emerald-600" : "text-slate-900 dark:text-slate-100"}>{d.cents < 0 ? "−" : ""}{formatUSD(Math.abs(d.cents))}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between border-b border-slate-100 dark:border-slate-800 pb-2 last:border-0">
      <dt className="text-slate-500 text-xs uppercase tracking-wider font-mono">{k}</dt>
      <dd className="text-slate-900 dark:text-slate-100 text-right">{children}</dd>
    </div>
  );
}
