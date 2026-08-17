import { Container, Section, StatCard } from "@/components/Card";
import { db } from "@/lib/db";
import { PROCESSES } from "@/data/processes";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Live Production Capacity" };
export const dynamic = "force-dynamic";
export const revalidate = 900; // 15 min freshness signal

export default async function CapacityPage() {
  const orders = await db.orders.listAll();
  const inProd = orders.filter((o) => ["queued", "in-production", "post-processing", "qc"].includes(o.status));
  const quotes = await Promise.all(inProd.map((o) => db.quotes.findById(o.quoteId)));
  const queueByProc: Record<string, number> = {};
  for (const p of PROCESSES) queueByProc[p.slug] = 0;
  quotes.forEach((q) => { if (q) queueByProc[q.process] = (queueByProc[q.slug || q.process] || 0) + 1; });

  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Live · updates every 15 min</div>
        <h1 className="text-3xl font-semibold tracking-tight">Production capacity</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Public queue depth per process. Real numbers, updated hourly from the production floor.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROCESSES.map((p) => (
            <StatCard key={p.slug} value={String(queueByProc[p.slug] ?? 0)} label={p.name} sublabel={`Current queue · ${p.leadTimeDays} typical`} />
          ))}
        </div>
        <div className="mt-6 text-xs text-slate-500">Snapshot at {new Date().toLocaleString()}.</div>
      </Container>
    </Section>
  );
}
