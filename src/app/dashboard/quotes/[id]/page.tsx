import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatUSD } from "@/lib/quote-engine";
import { getMaterialBySlug } from "@/data/materials";
import { getProcessBySlug } from "@/data/processes";
import { Badge } from "@/components/Card";

export const dynamic = "force-dynamic";

export default async function QuoteDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const u = (await getCurrentUser())!;
  const q = await db.quotes.findById(id);
  if (!q || q.teamId !== u.teamId) notFound();
  const parent = q.parentQuoteId ? await db.quotes.findById(q.parentQuoteId) : null;
  const revs = (await db.quotes.listByTeam(u.teamId)).filter((x) => x.parentQuoteId === q.id);
  const material = getMaterialBySlug(q.material);
  const process = getProcessBySlug(q.process);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/quotes" className="text-xs text-brand-600">← All quotes</Link>
        <div className="mt-2 flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="text-xs font-mono uppercase text-slate-500">Quote</div>
            <h1 className="text-2xl font-semibold tracking-tight">{q.id}</h1>
          </div>
          <Badge tone={q.status === "ordered" ? "brand" : "green"}>{q.status}</Badge>
        </div>
      </div>

      {parent && <RevisionDiff parent={parent} child={q} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold mb-3">Spec</h2>
          <dl className="text-sm space-y-2">
            <Row k="Process">{process?.name ?? q.process}</Row>
            <Row k="Material">{material?.name ?? q.material}</Row>
            <Row k="Finish">{q.finish ?? "standard"}</Row>
            <Row k="Expedite">{q.expedite ?? "standard"}</Row>
            <Row k="Quantity">{q.quantity}</Row>
            <Row k="Unit price">{formatUSD(q.unitPriceCents)}</Row>
            <Row k="Total">{formatUSD(q.totalPriceCents)}</Row>
            <Row k="Lead time">{q.leadTimeDays}</Row>
          </dl>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold mb-3">DFM</h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">{q.dfmSummary ?? "—"}</p>
          <ul className="text-xs space-y-1">
            {q.dfmIssues?.map((i, idx) => (
              <li key={idx} className="flex items-start gap-2"><span className={i.level === "warn" ? "text-amber-500" : "text-brand-500"}>{i.level === "warn" ? "⚠" : "ⓘ"}</span><span>{i.text}</span></li>
            ))}
          </ul>
        </div>
      </div>

      {revs.length > 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold mb-3">Revisions ({revs.length})</h2>
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {revs.map((r) => (
              <li key={r.id} className="py-2 flex items-center justify-between">
                <Link href={`/dashboard/quotes/${r.id}`} className="font-mono text-xs text-brand-600 hover:underline">{r.id}</Link>
                <div className="tabular-nums font-mono text-xs">{formatUSD(r.totalPriceCents)} · {new Date(r.createdAt).toLocaleDateString()}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function RevisionDiff({ parent, child }: { parent: import("@/lib/db").Quote; child: import("@/lib/db").Quote }) {
  const rows: { field: string; a: string; b: string; changed: boolean }[] = [
    { field: "Process", a: parent.process, b: child.process, changed: parent.process !== child.process },
    { field: "Material", a: parent.material, b: child.material, changed: parent.material !== child.material },
    { field: "Finish", a: parent.finish ?? "standard", b: child.finish ?? "standard", changed: (parent.finish ?? "") !== (child.finish ?? "") },
    { field: "Expedite", a: parent.expedite ?? "standard", b: child.expedite ?? "standard", changed: (parent.expedite ?? "") !== (child.expedite ?? "") },
    { field: "Quantity", a: String(parent.quantity), b: String(child.quantity), changed: parent.quantity !== child.quantity },
    { field: "Unit price", a: formatUSD(parent.unitPriceCents), b: formatUSD(child.unitPriceCents), changed: parent.unitPriceCents !== child.unitPriceCents },
    { field: "Total", a: formatUSD(parent.totalPriceCents), b: formatUSD(child.totalPriceCents), changed: parent.totalPriceCents !== child.totalPriceCents },
  ];
  const delta = child.totalPriceCents - parent.totalPriceCents;
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold">Revision of {parent.id}</h2>
        <div className={`text-sm font-mono ${delta >= 0 ? "text-red-600" : "text-emerald-600"}`}>Δ {delta >= 0 ? "+" : ""}{formatUSD(delta)}</div>
      </div>
      <table className="w-full text-sm">
        <thead className="text-xs font-mono uppercase tracking-widest text-slate-500">
          <tr><th className="text-left py-2">Field</th><th className="text-left py-2">Rev A ({parent.id.slice(-5)})</th><th className="text-left py-2">Rev B ({child.id.slice(-5)})</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {rows.map((r) => (
            <tr key={r.field} className={r.changed ? "bg-amber-50/40 dark:bg-amber-950/10" : ""}>
              <td className="py-2 font-medium">{r.field}</td>
              <td className="py-2 font-mono text-xs text-slate-500 line-through">{r.a}</td>
              <td className="py-2 font-mono text-xs">{r.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
