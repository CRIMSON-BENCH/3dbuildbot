import { Container, Section, Badge } from "@/components/Card";
import { ShopApplicationForm } from "@/components/ShopApplicationForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Apply to Join — 3DBuildBot Partner Network" };

export default function ApplyPage() {
  return (
    <Section>
      <Container className="max-w-2xl">
        <Badge tone="green">Partner application</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Apply to join the network</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">10 minutes. We review within 2 business days. No commitment — you can leave with 90 days notice any time after onboarding.</p>
        <div className="mt-8"><ShopApplicationForm /></div>
      </Container>
    </Section>
  );
}
