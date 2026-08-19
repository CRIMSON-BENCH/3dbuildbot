import Link from "next/link";
import { Container, Section } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press & Brand Assets — 3DBuildBot",
  description: "Press kit, brand guidelines, logo downloads, executive bios, and media contact for 3DBuildBot.",
};

export default function PressPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">Press</div>
        <h1 className="text-4xl font-semibold tracking-tight">Press & brand assets</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Everything media, journalists, and partners need to write about 3DBuildBot.</p>

        <div className="mt-10 space-y-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">About 3DBuildBot</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">3DBuildBot is an on-demand manufacturing platform for engineering teams across aerospace, defense, robotics, medical devices, and consumer hardware. The platform offers instant CAD-to-quote pricing across FDM, SLS, SLA, MJF, and CNC machining, backed by a US-based supplier network. Controlled-data workflows (for ITAR / export-controlled projects) are available on request.</p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">By the numbers</h2>
            <div className="mt-4 grid sm:grid-cols-3 gap-4 text-center">
              <div><div className="text-3xl font-semibold text-brand-600">2012</div><div className="text-xs text-slate-500 mt-1">Founded</div></div>
              <div><div className="text-3xl font-semibold text-brand-600">98</div><div className="text-xs text-slate-500 mt-1">Machines online (typical)</div></div>
              <div><div className="text-3xl font-semibold text-brand-600">40+</div><div className="text-xs text-slate-500 mt-1">Countries served</div></div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">Brand assets</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Logo, color palette, typography guidelines. Contact us for high-resolution files.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-2xl font-bold">3D</div>
              <div className="flex-1 text-xs font-mono text-slate-600 dark:text-slate-400 self-center">
                <div>Primary: <span className="text-brand-600">#2563eb (brand-600)</span></div>
                <div>Dark: <span className="text-slate-100">#0f172a (slate-900)</span></div>
                <div>Wordmark: Inter Semibold</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-6">
            <h2 className="text-lg font-semibold">Media contact</h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">For interviews, comment, or press-kit files:</p>
            <p className="mt-2 text-sm"><a href="mailto:press@3dbuildbot.com" className="text-brand-600 hover:underline font-medium">press@3dbuildbot.com</a></p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
