"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ClientOrderButton({ quoteId }: { quoteId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function order() {
    setBusy(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ quoteId }),
    });
    const data = await res.json();
    setBusy(false);
    if (data.ok) {
      if (data.checkoutUrl) window.location.href = data.checkoutUrl;
      else router.push(`/dashboard/orders/${data.order.id}`);
    } else alert(data.error || "Order failed");
  }
  return (
    <button onClick={order} disabled={busy} className="text-xs font-medium px-3 py-1.5 rounded-md bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white">
      {busy ? "…" : "Order"}
    </button>
  );
}
