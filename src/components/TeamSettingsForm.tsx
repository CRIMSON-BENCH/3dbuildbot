"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Team } from "@/lib/db";

export function TeamSettingsForm({ team, isOwner }: { team: Team; isOwner: boolean }) {
  const router = useRouter();
  const [threshold, setThreshold] = useState((team.approvalThresholdCents ?? 0) / 100);
  const [ccInput, setCcInput] = useState((team.costCenters ?? []).join(", "));
  const [itar, setItar] = useState(team.itarEnabled ?? false);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setBusy(true); setSaved(false);
    const res = await fetch("/api/team", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        approvalThresholdCents: Math.round(threshold * 100),
        costCenters: ccInput.split(",").map((s) => s.trim()).filter(Boolean),
        itarEnabled: itar,
      }),
    });
    await res.json();
    setBusy(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <h2 className="text-sm font-semibold mb-3">Team settings</h2>
      {!isOwner && <div className="text-xs text-slate-500 mb-3">Read-only. Ask a team owner or admin to change these.</div>}
      <div className="grid sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs font-medium">Approval threshold (USD)</span>
          <input disabled={!isOwner} type="number" min={0} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm disabled:opacity-60" />
          <span className="text-[10px] text-slate-500 block mt-1">Quotes above this need approver sign-off. 0 = no gating.</span>
        </label>
        <label className="block">
          <span className="text-xs font-medium">Cost centers (comma-separated)</span>
          <input disabled={!isOwner} value={ccInput} onChange={(e) => setCcInput(e.target.value)} placeholder="e.g. R&D-101, Ops-220, Test-Ops" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm disabled:opacity-60" />
        </label>
        <label className="block">
          <span className="text-xs font-medium">ITAR mode</span>
          <div className="mt-1"><label className="inline-flex items-center gap-2"><input disabled={!isOwner} type="checkbox" checked={itar} onChange={(e) => setItar(e.target.checked)} /> <span className="text-sm">Route ITAR-flagged jobs to segregated cell</span></label></div>
        </label>
      </div>
      {isOwner && (
        <div className="mt-4 flex items-center gap-3">
          <button onClick={save} disabled={busy} className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium">{busy ? "Saving…" : "Save settings"}</button>
          {saved && <span className="text-xs text-emerald-600">Saved ✓</span>}
        </div>
      )}
    </div>
  );
}
