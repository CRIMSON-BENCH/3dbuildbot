"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "3db-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch { /* SSR / privacy mode */ }
  }, []);
  function set(value: "all" | "essential") {
    try { localStorage.setItem(CONSENT_KEY, value); } catch {}
    setVisible(false);
    // Dispatch a custom event downstream components can subscribe to
    try { window.dispatchEvent(new CustomEvent("cookie-consent", { detail: value })); } catch {}
  }
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-4 sm:max-w-md z-50 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-4">
      <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">Cookies</div>
      <p className="text-sm text-slate-700 dark:text-slate-300">We use essential cookies to run the site + optional analytics cookies to see which pages help engineers. Choose what's on.</p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => set("all")} className="flex-1 px-3 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium">Accept all</button>
        <button onClick={() => set("essential")} className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium">Essential only</button>
      </div>
      <div className="mt-2 text-[10px] text-slate-500 text-center"><Link href="/privacy" className="hover:underline">Privacy policy</Link></div>
    </div>
  );
}
