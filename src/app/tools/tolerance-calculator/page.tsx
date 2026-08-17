import { Container, Section } from "@/components/Card";
import { ToleranceCalculator } from "@/components/ToleranceCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tolerance Stack Calculator",
  description: "Free interactive GD&T tolerance stack calculator. Chain feature tolerances by process and material, get achievable ranges and Cpk estimates instantly.",
};

export default function TolerancePage() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Free tool · no login</div>
        <h1 className="text-3xl font-semibold tracking-tight">Tolerance Stack Calculator</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Chain feature tolerances and get achievable stack + Cpk estimates. Numbers update live as you edit. Shareable via URL.</p>
        <div className="mt-8">
          <ToleranceCalculator />
        </div>
      </Container>
    </Section>
  );
}
