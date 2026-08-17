"use client";
import { useState } from "react";

export function ShopApplicationForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    await fetch("/api/for-shops/apply", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(fd)) });
    setBusy(false);
    setSent(true);
  }
  if (sent) {
    return (
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-6">
        <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200">Application received ✓</h2>
        <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-300">We'll review within 2 business days. If approved, you'll get onboarding credentials + a test order to run through your queue.</p>
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs font-medium">Shop name</span><input required name="companyName" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
        <label className="block"><span className="text-xs font-medium">Your name</span><input required name="contactName" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
        <label className="block"><span className="text-xs font-medium">Contact email</span><input required type="email" name="email" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
        <label className="block"><span className="text-xs font-medium">Phone</span><input required name="phone" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
        <label className="block"><span className="text-xs font-medium">Region (state)</span><input required name="region" placeholder="e.g. California" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
        <label className="block"><span className="text-xs font-medium">Years in operation</span><input required type="number" name="years" min={0} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
      </div>
      <div>
        <span className="text-xs font-medium">Processes you offer (check all)</span>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
          {["FDM", "SLS", "SLA", "MJF", "5-Axis CNC", "3-Axis CNC", "CNC Turning", "Swiss", "Wire EDM", "DMLS"].map((p) => (
            <label key={p} className="flex items-center gap-1.5"><input type="checkbox" name={`process_${p}`} value="yes" /> <span>{p}</span></label>
          ))}
        </div>
      </div>
      <div>
        <span className="text-xs font-medium">Certifications held (check all)</span>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          {["ISO 9001", "AS9100D", "ISO 13485", "IATF 16949", "ITAR-registered", "NIST 800-171", "CMMC L2", "NADCAP"].map((c) => (
            <label key={c} className="flex items-center gap-1.5"><input type="checkbox" name={`cert_${c}`} value="yes" /> <span>{c}</span></label>
          ))}
        </div>
      </div>
      <label className="block"><span className="text-xs font-medium">Machine inventory (list models + count)</span><textarea required name="machines" rows={4} placeholder="e.g. 2× Haas VF-2, 1× DMG Mori DMU 50, 3× Formlabs Form 3, 1× HP MJF 5210" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono" /></label>
      <label className="block"><span className="text-xs font-medium">Current monthly capacity (parts/mo, rough)</span><input required name="capacity" placeholder="e.g. 200 SLS parts + 50 CNC jobs" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
      <label className="block"><span className="text-xs font-medium">Current idle capacity you'd like to fill (%)</span><input required type="number" name="idlePct" min={0} max={100} placeholder="30" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
      <label className="block"><span className="text-xs font-medium">Anything else? (specialty, references, questions)</span><textarea name="notes" rows={3} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
      <button disabled={busy} type="submit" className="w-full rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium py-3">{busy ? "Submitting…" : "Submit application"}</button>
      <p className="text-[10px] text-slate-500 text-center">By submitting you agree to our partner NDA. We share zero customer data with third parties.</p>
    </form>
  );
}
