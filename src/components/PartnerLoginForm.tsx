"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function PartnerLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const res = await fetch("/api/partner/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    setBusy(false);
    if (data.ok) { router.push("/partner/jobs"); router.refresh(); }
    else setErr(data.error || "failed");
  }
  return (
    <form onSubmit={submit} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
      <label className="block"><span className="text-xs font-medium">Email</span><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
      <label className="block"><span className="text-xs font-medium">Password</span><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
      {err && <div className="text-xs text-red-600">{err}</div>}
      <button disabled={busy} type="submit" className="w-full rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium py-2.5">{busy ? "…" : "Sign in"}</button>
      <div className="text-xs text-slate-500 text-center">Not a partner yet? <a href="/contact" className="text-brand-600 underline">Apply here.</a></div>
    </form>
  );
}
