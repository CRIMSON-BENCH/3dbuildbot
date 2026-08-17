"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as unknown as { Sentry?: { captureException: (e: Error) => void } }).Sentry) {
      (window as unknown as { Sentry: { captureException: (e: Error) => void } }).Sentry.captureException(error);
    }
    console.error("app-level error:", error);
  }, [error]);
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
        <div className="text-xs font-mono uppercase tracking-widest text-red-600 mb-2">Something went wrong</div>
        <h1 className="text-2xl font-semibold tracking-tight">Unexpected error</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">The engineering team has been notified. Try again, or head back to the homepage.</p>
        {error.digest && <p className="mt-2 text-[10px] font-mono text-slate-500">ref: {error.digest}</p>}
        <div className="mt-6 flex gap-2 justify-center">
          <button onClick={reset} className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Try again</button>
          <Link href="/" className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm">Home</Link>
        </div>
      </div>
    </div>
  );
}
