"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Team } from "@/lib/db";

export function NetTermsForm({ current }: { current: Team["netTerms"] }) {
  const router = useRouter();
  const [limit, setLimit] = useState(25000);
  const [days, setDays] = useState<30 | 60>(30);
  const [busy, setBusy] = useState(false);

  async function apply() {
    setBusy(true);
    await fetch("/api/net-terms", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ limitCents: limit * 100, days }) });
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold">NET-30 / NET-60 terms</h2>
        {current?.status && <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Status: {current.status}</span>}
      </div>
      {current?.status === "approved" ? (
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-3 text-sm text-emerald-800 dark:text-emerald-200">
          NET-{current.days} approved. Credit limit ${((current.limitCents ?? 0) / 100).toLocaleString()}. Approved orders now bill on account.
        </div>
      ) : current?.status === "pending" ? (
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 text-sm">
          Application in review. Typical decision within 2 business days.
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="block"><span className="text-xs font-medium">Credit limit (USD)</span><input type="number" min={500} step={500} value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
          <label className="block"><span className="text-xs font-medium">Terms</span>
            <select value={days} onChange={(e) => setDays(Number(e.target.value) as 30 | 60)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
              <option value={30}>NET-30</option>
              <option value={60}>NET-60</option>
            </select>
          </label>
          <div className="flex items-end"><button onClick={apply} disabled={busy} className="w-full px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium">{busy ? "…" : "Apply for NET terms"}</button></div>
        </div>
      )}
    </div>
  );
}
