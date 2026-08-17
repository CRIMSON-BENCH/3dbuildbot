import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Fusion 360 Add-in — Quote from CAD" };

export default function FusionPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <Badge tone="brand">Autodesk App Store</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">3DBuildBot Add-in for Fusion 360</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Quote any body or component from the Fusion 360 ribbon. Ship without exporting.</p>
        <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold mb-2">Install</h2>
          <ol className="list-decimal pl-5 text-sm space-y-1 text-slate-700 dark:text-slate-300">
            <li>Open the Autodesk App Store and search "3DBuildBot"</li>
            <li>Download and run the installer (Windows / macOS)</li>
            <li>Restart Fusion 360 → the "3DBuildBot" ribbon appears under Utilities</li>
            <li>Sign in with your 3DBuildBot account</li>
          </ol>
          <a className="mt-4 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium" href="https://apps.autodesk.com/">Open Autodesk App Store →</a>
        </div>
      </Container>
    </Section>
  );
}
