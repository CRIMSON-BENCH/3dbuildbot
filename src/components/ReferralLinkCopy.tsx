"use client";
import { useState } from "react";

export function ReferralLinkCopy({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const link = typeof window !== "undefined" ? `${window.location.origin}/promo/${code}` : "";
  function copy() {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
      <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-1">Your referral link</div>
      <div className="flex items-center gap-2">
        <code className="flex-1 text-sm font-mono bg-white dark:bg-slate-950 border border-brand-200 dark:border-brand-800 rounded p-2 break-all">{link}</code>
        <button onClick={copy} className="px-3 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium shrink-0">{copied ? "Copied ✓" : "Copy"}</button>
      </div>
      <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">Promo code embedded: <code className="font-mono">{code}</code></div>
    </div>
  );
}
