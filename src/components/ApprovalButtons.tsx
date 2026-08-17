"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ApprovalButtons({ quoteId }: { quoteId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function approve() {
    setBusy(true);
    await fetch(`/api/quote/${quoteId}/approve`, { method: "POST" });
    setBusy(false);
    router.refresh();
  }
  return (
    <button disabled={busy} onClick={approve} className="text-xs font-medium px-3 py-1.5 rounded-md bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white">{busy ? "…" : "Approve"}</button>
  );
}
