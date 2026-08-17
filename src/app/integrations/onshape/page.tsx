import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Onshape App — Quote from CAD" };

export default function OnshapePage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <Badge tone="brand">Onshape App Store</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">3DBuildBot for Onshape</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Quote and order parts without leaving Onshape. Right-click any part → "Get instant quote."</p>
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          {["Right-click quoting", "Auto-sync revs", "Team billing"].map((f) => (
            <div key={f} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4"><div className="text-sm font-semibold">{f}</div></div>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold mb-2">Install</h2>
          <ol className="list-decimal pl-5 text-sm space-y-1 text-slate-700 dark:text-slate-300">
            <li>Open the Onshape App Store</li>
            <li>Search "3DBuildBot"</li>
            <li>Click Install and grant workspace access</li>
            <li>Right-click any Part Studio → "Get 3DBuildBot quote"</li>
          </ol>
          <a className="mt-4 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium" href="https://appstore.onshape.com/">Open Onshape App Store →</a>
        </div>
        <div className="mt-6 text-xs text-slate-500">Prefer to test locally? Grab a Bearer key from <Link href="/dashboard/api-keys" className="text-brand-600 underline">/dashboard/api-keys</Link> and use it in the app's OAuth-substitute developer mode.</div>
      </Container>
    </Section>
  );
}
