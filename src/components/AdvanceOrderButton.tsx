"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdvanceOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function advance() {
    setBusy(true);
    await fetch(`/api/orders/${orderId}/advance`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({}) });
    setBusy(false);
    router.refresh();
  }
  return <button onClick={advance} disabled={busy} className="text-xs font-medium px-2 py-1 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 disabled:opacity-60">{busy ? "…" : "Advance →"}</button>;
}
