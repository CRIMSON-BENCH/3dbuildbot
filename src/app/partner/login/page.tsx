import { Container, Section } from "@/components/Card";
import { PartnerLoginForm } from "@/components/PartnerLoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Partner shop login" };

export default function PartnerLoginPage() {
  return (
    <Section>
      <Container className="max-w-md">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Partner network</div>
          <h1 className="text-2xl font-semibold tracking-tight">Partner shop portal</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Log in to accept assigned jobs, upload QC photos, and mark orders shipped.</p>
        </div>
        <PartnerLoginForm />
      </Container>
    </Section>
  );
}
