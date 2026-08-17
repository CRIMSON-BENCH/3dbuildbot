import Link from "next/link";
import { Container, Section } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "404 — Page not found" };

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-2xl text-center py-16">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">404</div>
        <h1 className="text-4xl font-semibold tracking-tight">This page doesn't exist</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Try one of these instead, or head back to the homepage.</p>
        <div className="mt-8 grid sm:grid-cols-2 gap-3 text-left">
          <Link href="/quote" className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-brand-500">
            <div className="text-sm font-semibold">Get an instant quote</div>
            <div className="text-xs text-slate-500 mt-1">Upload CAD, get pricing in seconds</div>
          </Link>
          <Link href="/materials" className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-brand-500">
            <div className="text-sm font-semibold">Browse materials</div>
            <div className="text-xs text-slate-500 mt-1">20 engineering materials with real specs</div>
          </Link>
          <Link href="/tools/solvers" className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-brand-500">
            <div className="text-sm font-semibold">Engineering solvers</div>
            <div className="text-xs text-slate-500 mt-1">14 free interactive calculators</div>
          </Link>
          <Link href="/parts" className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-brand-500">
            <div className="text-sm font-semibold">Standard parts library</div>
            <div className="text-xs text-slate-500 mt-1">650+ hardware parts with free CAD</div>
          </Link>
        </div>
        <div className="mt-8"><Link href="/" className="text-brand-600 hover:underline text-sm">← Back to homepage</Link></div>
      </Container>
    </Section>
  );
}
