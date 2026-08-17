"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AcceptInviteForm({ token, email }: { token: string; email: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const res = await fetch(`/api/invites/${token}/accept`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, password }) });
    const data = await res.json();
    setBusy(false);
    if (data.ok) { router.push("/dashboard"); router.refresh(); }
    else setErr(data.error || "failed");
  }
  return (
    <form onSubmit={submit} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
      <div className="text-xs font-mono text-slate-500">Email · {email}</div>
      <label className="block"><span className="text-xs font-medium">Full name</span><input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
      <label className="block"><span className="text-xs font-medium">Password (8+ chars)</span><input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" /></label>
      {err && <div className="text-xs text-red-600">{err}</div>}
      <button disabled={busy} type="submit" className="w-full rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium py-2.5 disabled:opacity-60">{busy ? "…" : "Accept invitation"}</button>
      <div className="text-xs text-slate-500 text-center">Already have an account with this email? Signing in below joins the team automatically.</div>
    </form>
  );
}
