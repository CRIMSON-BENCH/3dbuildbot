"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function UsPersonsForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [ssn4, setSsn4] = useState("");
  const [visa, setVisa] = useState("");
  const [category, setCategory] = useState<"citizen" | "permanent-resident" | "protected-individual" | "">("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!category || !agreed) { setErr("Select a category and confirm attestation"); return; }
    setBusy(true); setErr(null);
    const res = await fetch("/api/us-persons", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ fullLegalName: name, ssn4Last: ssn4 || undefined, visaClass: category === "permanent-resident" ? visa : undefined, attestation: true }),
    });
    const data = await res.json();
    setBusy(false);
    if (data.ok) router.refresh();
    else setErr(data.error || "failed");
  }
  return (
    <form onSubmit={submit} className="rounded-lg bg-white dark:bg-slate-900 border border-red-200 dark:border-red-800 p-4 space-y-3">
      <label className="block"><span className="text-xs font-medium">Full legal name</span><input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
      <div>
        <span className="text-xs font-medium">I am a US person as defined in 22 CFR § 120.15 by virtue of being a:</span>
        <div className="mt-2 space-y-1 text-sm">
          {[
            ["citizen", "US Citizen"],
            ["permanent-resident", "Lawful Permanent Resident (green card)"],
            ["protected-individual", "Protected Individual (asylum, refugee, etc.)"],
          ].map(([v, label]) => (
            <label key={v} className="flex items-center gap-2"><input type="radio" name="cat" value={v} checked={category === v} onChange={() => setCategory(v as typeof category)} /> {label}</label>
          ))}
        </div>
      </div>
      {category === "permanent-resident" && (
        <label className="block"><span className="text-xs font-medium">Visa / status class (optional)</span><input value={visa} onChange={(e) => setVisa(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
      )}
      <label className="block"><span className="text-xs font-medium">Last 4 of SSN or A-number (optional, for verification)</span><input value={ssn4} onChange={(e) => setSsn4(e.target.value.replace(/\D/g, "").slice(0, 4))} maxLength={4} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono" /></label>
      <label className="flex items-start gap-2 text-xs"><input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5" /> <span>I attest under penalty of perjury that the information above is accurate. I understand that this attestation is retained as an audit record and may be produced under DDTC compliance review.</span></label>
      {err && <div className="text-xs text-red-600">{err}</div>}
      <button disabled={busy} type="submit" className="w-full rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-medium py-2.5">{busy ? "…" : "Complete attestation"}</button>
    </form>
  );
}
