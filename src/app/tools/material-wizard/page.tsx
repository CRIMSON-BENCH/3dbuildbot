import { Container, Section } from "@/components/Card";
import { MaterialWizard } from "@/components/MaterialWizard";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "AI Material Selection Wizard", description: "Answer 6 questions about your part's use case. Gemini AI recommends the top 3 materials from our catalog." };

export default function WizardPage() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Free tool · AI-powered</div>
        <h1 className="text-3xl font-semibold tracking-tight">Material Selection Wizard</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Six questions. Gemini AI recommends the top 3 materials from our catalog, ranked by fit. Every material is a real datasheet — no marketing bias.</p>
        <div className="mt-8"><MaterialWizard /></div>
      </Container>
    </Section>
  );
}
