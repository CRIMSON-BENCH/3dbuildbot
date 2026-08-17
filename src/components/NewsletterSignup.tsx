"use client";
import { useState } from "react";

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const r = await fetch("/api/newsletter", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error ?? "signup_failed");
      setState("ok");
      setEmail("");
    } catch (e) {
      setState("error");
      setError((e as Error).message);
    }
  }

  if (state === "ok") {
    return <div className={`text-sm ${compact ? "" : "p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800"} text-emerald-700 dark:text-emerald-300`}>Thanks — you're subscribed. New engineering content every other Tuesday.</div>;
  }

  return (
    <form onSubmit={submit} className={compact ? "flex gap-2" : "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"}>
      {!compact && (
        <>
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">Newsletter</div>
          <h3 className="text-lg font-semibold mb-1">Engineering + manufacturing insights</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">DFM tips, material selection, cost breakdowns. Every other Tuesday. Unsubscribe anytime.</p>
        </>
      )}
      <div className={compact ? "flex gap-2 flex-1" : "flex gap-2"}>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
        <button type="submit" disabled={state === "loading"} className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-medium">{state === "loading" ? "…" : "Subscribe"}</button>
      </div>
      {state === "error" && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </form>
  );
}
