"use client";
import { useState } from "react";

const PROCESS_OPTIONS = ["SLA", "SLS", "MJF", "CNC (3-axis)", "CNC (5-axis)", "DMLS metal 3D print", "Sheet metal", "Injection molding", "Cast urethane", "Other"];

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [process, setProcess] = useState("SLA");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, process, material, quantity, notes: notes || undefined }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "submit failed");
      setState("ok");
      setMsg("Got it — we'll email a quote within one business day.");
    } catch (e) {
      setState("err");
      setMsg(e instanceof Error ? e.message : "submit failed");
    }
  }

  if (state === "ok") {
    return (
      <div className="rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-5 text-sm text-emerald-800 dark:text-emerald-200">
        ✓ {msg}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
      <div className="text-sm font-semibold">Get a hand-quote in 1 business day</div>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block text-xs">
          <span className="text-slate-500 font-mono uppercase tracking-widest">Email</span>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
        </label>
        <label className="block text-xs">
          <span className="text-slate-500 font-mono uppercase tracking-widest">Process</span>
          <select value={process} onChange={(e) => setProcess(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
            {PROCESS_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <label className="block text-xs">
          <span className="text-slate-500 font-mono uppercase tracking-widest">Material</span>
          <input required value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="e.g. Aluminum 6061, PA12 Nylon" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
        </label>
        <label className="block text-xs">
          <span className="text-slate-500 font-mono uppercase tracking-widest">Quantity</span>
          <input required type="number" min={1} value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
        </label>
      </div>
      <label className="block text-xs">
        <span className="text-slate-500 font-mono uppercase tracking-widest">Notes (optional)</span>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tolerance requirements, finish, deadline, CAD link…" rows={3} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
      </label>
      <button type="submit" disabled={state === "busy"} className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium">
        {state === "busy" ? "Sending…" : "Request hand-quote →"}
      </button>
      {state === "err" && <div className="text-xs text-red-600">{msg}</div>}
    </form>
  );
}
