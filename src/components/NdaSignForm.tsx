"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function NdaSignForm({ id }: { id: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) { setErr("Confirm you have authority to bind your organization"); return; }
    setBusy(true); setErr(null);
    const res = await fetch(`/api/nda/${id}/sign`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, email, title }) });
    const data = await res.json();
    setBusy(false);
    if (data.ok) router.refresh();
    else setErr(data.error || "failed");
  }
  return (
    <form onSubmit={submit} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
      <div className="text-sm font-semibold">Sign electronically</div>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs font-medium">Full legal name</span><input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
        <label className="block"><span className="text-xs font-medium">Work email</span><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
      </div>
      <label className="block"><span className="text-xs font-medium">Title (optional)</span><input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
      <label className="flex items-start gap-2 text-xs"><input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5" /> <span>I represent that I have authority to bind my organization to this Agreement.</span></label>
      {err && <div className="text-xs text-red-600">{err}</div>}
      <button disabled={busy} type="submit" className="w-full rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium py-2.5">{busy ? "…" : "Sign and execute NDA"}</button>
      <div className="text-[10px] text-slate-500 text-center">Electronic signature per E-SIGN Act · IP address and timestamp captured</div>
    </form>
  );
}
