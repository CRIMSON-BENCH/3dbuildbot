"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ImpersonateButton({ userId, disabled }: { userId: string; disabled?: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function go() {
    setBusy(true);
    await fetch(`/api/admin/impersonate/${userId}`, { method: "POST" });
    setBusy(false);
    router.push("/dashboard");
    router.refresh();
  }
  return (
    <button disabled={busy || disabled} onClick={go} className="text-xs font-medium px-2 py-1 rounded border border-slate-300 dark:border-slate-700 disabled:opacity-40">
      {busy ? "…" : "Impersonate"}
    </button>
  );
}
