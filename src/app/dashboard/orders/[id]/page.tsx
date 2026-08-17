import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getMaterialBySlug } from "@/data/materials";
import { getProcessBySlug } from "@/data/processes";
import { Badge } from "@/components/Card";
import { formatUSD } from "@/lib/quote-engine";
import { CompliancePackButton } from "@/components/CompliancePackButton";

export const dynamic = "force-dynamic";

const STEPS = ["quoted", "paid", "queued", "in-production", "post-processing", "qc", "shipped", "delivered"];

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const u = (await getCurrentUser())!;
  const order = await db.orders.findById(id);
  if (!order || (order.teamId !== u.teamId && !u.isAdmin)) notFound();
  const quote = await db.quotes.findById(order.quoteId);
  const part = quote?.partId ? await db.parts.findById(quote.partId) : null;
  const mat = quote ? getMaterialBySlug(quote.material) : null;
  const proc = quote ? getProcessBySlug(quote.process) : null;

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/orders" className="text-xs text-brand-600 dark:text-brand-400">← All orders</Link>
        <div className="mt-2 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Order</div>
            <h1 className="text-2xl font-semibold tracking-tight">{order.id}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone={order.status === "shipped" || order.status === "delivered" ? "brand" : "amber"}>{order.status}</Badge>
            {order.itarFlagged && <Badge tone="red">ITAR</Badge>}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <h2 className="text-sm font-semibold mb-4">Production timeline</h2>
        <ol className="grid grid-cols-4 sm:grid-cols-8 gap-1">
          {STEPS.map((s, i) => {
            const currentIdx = STEPS.indexOf(order.status);
            const reached = currentIdx >= i;
            return (
              <li key={s} className={`text-center text-[10px] font-mono uppercase py-2 rounded ${reached ? "bg-brand-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                {s}
              </li>
            );
          })}
        </ol>
        <div className="mt-6 space-y-2 text-sm">
          {order.timeline.slice().reverse().map((t, i) => (
            <div key={i} className="flex items-start gap-3 text-xs">
              <div className="text-slate-500 tabular-nums shrink-0 w-40">{new Date(t.at).toLocaleString()}</div>
              <Badge tone={t.status === "shipped" ? "brand" : "slate"}>{t.status}</Badge>
              {t.note && <span className="text-slate-600 dark:text-slate-400">{t.note}</span>}
              {t.operator && <span className="text-slate-500 ml-auto">by {t.operator}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h3 className="text-sm font-semibold mb-3">Part & spec</h3>
          <dl className="text-sm space-y-2">
            <Row k="Part">{part?.name ?? "—"}</Row>
            <Row k="Process">{proc?.name ?? quote?.process ?? "—"}</Row>
            <Row k="Material">{mat?.name ?? quote?.material ?? "—"}</Row>
            <Row k="Quantity">{quote?.quantity ?? "—"}</Row>
            <Row k="Lead time">{quote?.leadTimeDays ?? "—"}</Row>
            <Row k="Finish">{quote?.finish ?? "standard"}</Row>
          </dl>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h3 className="text-sm font-semibold mb-3">Billing & ship</h3>
          <dl className="text-sm space-y-2">
            <Row k="Total paid">{formatUSD(order.totalPaidCents)}</Row>
            <Row k="Currency">{order.currency}</Row>
            <Row k="PO number">{order.poNumber ?? "—"}</Row>
            <Row k="Payment id">{order.stripePaymentIntentId ?? "—"}</Row>
            <Row k="Ship address">{order.shipAddress ? `${order.shipAddress.city}, ${order.shipAddress.state}` : "—"}</Row>
            <Row k="Tracking">{order.trackingNumber ?? "Pending"}</Row>
          </dl>
        </div>
      </div>

      {/* Compliance packet */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Compliance packet</h3>
          <Badge tone="green">Auto-generated</Badge>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Download signed PDFs for QA archive. Included on every shipment as a digital traveler.</p>
        <CompliancePackButton
          orderId={order.id}
          quoteId={order.quoteId}
          partName={part?.name ?? "Untitled part"}
          materialName={mat?.name ?? quote?.material ?? ""}
          processName={proc?.name ?? quote?.process ?? ""}
          quantity={quote?.quantity ?? 1}
          leadTime={quote?.leadTimeDays ?? ""}
          bbox={part?.bboxMm}
        />
      </div>
    </div>
  );
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 justify-between border-b border-slate-100 dark:border-slate-800 pb-2 last:border-0">
      <dt className="text-slate-500 text-xs uppercase tracking-wider font-mono">{k}</dt>
      <dd className="text-slate-900 dark:text-slate-100 text-right">{children}</dd>
    </div>
  );
}
