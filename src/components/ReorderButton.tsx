"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ReorderButton({ orderId, className = "" }: { orderId: string; className?: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function reorder() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/reorder`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "reorder failed");
      router.push(`/dashboard/quotes`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "reorder failed");
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        onClick={reorder}
        disabled={busy}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-xs font-medium ${className}`}
      >
        {busy ? "Cloning…" : "Reorder →"}
      </button>
      {err && <div className="mt-1 text-xs text-red-600">{err}</div>}
    </div>
  );
}
