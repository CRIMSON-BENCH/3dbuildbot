import { Container, Section } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Book a manufacturing engineer" };

export default function BookACallPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Talk to sales</div>
        <h1 className="text-3xl font-semibold tracking-tight">Book a manufacturing engineer</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">30 minutes with a real engineer. Bring your CAD, tolerance callouts, or volume projection — we'll walk through process/material fit and pricing.</p>

        <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <iframe
            src="https://cal.com/team/3dbuildbot/manufacturing-eng-30min"
            className="w-full h-[700px]"
            allow="camera; microphone; autoplay; encrypted-media; fullscreen; picture-in-picture"
            title="Book with 3DBuildBot"
          />
        </div>
        <div className="mt-4 text-xs text-slate-500">Powered by Cal.com. If the embed doesn't load in your browser, email <a href="mailto:sales@3dbuildbot.com" className="text-brand-600 dark:text-brand-400">sales@3dbuildbot.com</a> to book.</div>
      </Container>
    </Section>
  );
}
