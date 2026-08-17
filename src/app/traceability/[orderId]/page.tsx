import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Container, Section, Badge } from "@/components/Card";
import { getMaterialBySlug } from "@/data/materials";
import { getProcessBySlug } from "@/data/processes";

export const dynamic = "force-dynamic";

export default async function TraceabilityPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const order = await db.orders.findById(orderId);
  if (!order) notFound();
  const quote = await db.quotes.findById(order.quoteId);
  const material = quote ? getMaterialBySlug(quote.material) : null;
  const process = quote ? getProcessBySlug(quote.process) : null;
  const t = order.traceability;

  return (
    <Section>
      <Container className="max-w-3xl">
        <Badge tone="brand">Live traceability record</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Part traceability · {order.id}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">Every 3DBuildBot part carries a QR-tagged traceability record. Scan the QR on the part to arrive here and verify the manufacturing lot, material heat lot, operator, and inspection artifacts.</p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">Manufacturing lot</h2>
            <dl className="text-sm space-y-2">
              <Row k="Lot code">{t?.lotCode ?? "—"}</Row>
              <Row k="Machine ID">{t?.machineId ?? "—"}</Row>
              <Row k="Operator">{t?.operatorInitials ?? "—"}</Row>
              <Row k="Inspector">{t?.inspectorInitials ?? "—"}</Row>
              <Row k="US-persons verified">{t?.usPersonsVerified ? "Yes" : order.itarFlagged ? "Required — see order" : "N/A"}</Row>
            </dl>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">Material</h2>
            <dl className="text-sm space-y-2">
              <Row k="Material">{material?.name ?? "—"}</Row>
              <Row k="Process">{process?.name ?? "—"}</Row>
              <Row k="Heat lot">{t?.heatLot ?? "—"}</Row>
              <Row k="Supplier">{t?.supplier ?? "Domestic Mill (DFARS-compliant)"}</Row>
              <Row k="Country of origin">{t?.countryOfOrigin ?? "United States"}</Row>
            </dl>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold mb-3">Order timeline</h2>
          <ul className="space-y-2 text-xs font-mono">
            {order.timeline.slice().reverse().map((tl, i) => (
              <li key={i} className="flex gap-3 py-1">
                <span className="text-slate-500 tabular-nums w-40 shrink-0">{new Date(tl.at).toLocaleString()}</span>
                <span className="text-brand-600 dark:text-brand-400 w-28 shrink-0">{tl.status}</span>
                <span className="text-slate-600 dark:text-slate-400 truncate">{tl.note ?? ""}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 text-xs text-slate-500 dark:text-slate-500 text-center">
          Verify this record via 3DBuildBot QMS · order state persisted at time of ship
        </div>
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
