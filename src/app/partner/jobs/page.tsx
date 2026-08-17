import { redirect } from "next/navigation";
import { getPartner } from "@/lib/partner-auth";
import { db } from "@/lib/db";
import { Container, Badge } from "@/components/Card";
import { PartnerJobRow } from "@/components/PartnerJobRow";
import { formatUSD } from "@/lib/quote-engine";

export const dynamic = "force-dynamic";

export default async function PartnerJobs() {
  const p = await getPartner();
  if (!p) redirect("/partner/login");
  const orders = await db.orders.listAll();
  const mine = orders.filter((o) => o.routing?.partnerId === p.id);
  const assigned = mine.filter((o) => !o.routing?.acceptedAt);
  const active = mine.filter((o) => o.routing?.acceptedAt && !["shipped", "delivered", "cancelled"].includes(o.status));
  const shipped = mine.filter((o) => ["shipped", "delivered"].includes(o.status));
  return (
    <Container className="py-8 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400">Partner portal</div>
        <h1 className="text-2xl font-semibold tracking-tight">{p.name} · Jobs</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Processes: {p.processes.join(", ")}{p.itarEligible && " · ITAR-eligible"}</p>
      </div>

      <section>
        <h2 className="text-sm font-semibold mb-3">Assigned (awaiting your acceptance) · {assigned.length}</h2>
        {assigned.length === 0 ? <Empty text="Nothing waiting." /> : (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
            {assigned.map((o) => <PartnerJobRow key={o.id} orderId={o.id} status={o.status} totalCents={o.totalPaidCents} itar={!!o.itarFlagged} mode="assigned" />)}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3">In production · {active.length}</h2>
        {active.length === 0 ? <Empty text="No active jobs." /> : (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
            {active.map((o) => <PartnerJobRow key={o.id} orderId={o.id} status={o.status} totalCents={o.totalPaidCents} itar={!!o.itarFlagged} mode="active" />)}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3">Shipped · {shipped.length}</h2>
        {shipped.length === 0 ? <Empty text="Nothing shipped yet." /> : (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
            {shipped.slice(0, 10).map((o) => (
              <div key={o.id} className="p-4 flex items-center justify-between text-sm">
                <div className="font-mono">{o.id}</div>
                <div className="flex items-center gap-3">
                  <Badge tone="brand">{o.status}</Badge>
                  <div className="tabular-nums font-mono">{formatUSD(o.totalPaidCents)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 text-center text-sm text-slate-500">{text}</div>;
}
