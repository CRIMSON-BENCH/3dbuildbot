"use client";
import { useState } from "react";

export function SubscribeButton({ plan, label, className }: { plan: "teams-monthly" | "teams-annual"; label: string; className?: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function go() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/checkout/subscription", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "checkout failed");
      window.location.href = data.url;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "checkout failed");
      setBusy(false);
    }
  }
  return (
    <>
      <button onClick={go} disabled={busy} className={className}>
        {busy ? "Loading…" : label}
      </button>
      {err && <div className="mt-2 text-xs text-red-600">{err}</div>}
    </>
  );
}
