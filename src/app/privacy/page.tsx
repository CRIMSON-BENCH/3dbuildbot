import { Container, Section } from "@/components/Card";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() {
  return (
    <Section>
      <Container className="max-w-3xl prose-brand">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Last updated: August 2026</p>
        <p>3DBuildBot respects your privacy. This policy explains what we collect and how we use it.</p>
        <h2>Data we collect</h2>
        <ul>
          <li>Account info: name, email, hashed password.</li>
          <li>Order info: parts you upload, quotes, orders, invoices.</li>
          <li>Usage info: pages viewed, API calls made.</li>
        </ul>
        <h2>How we use it</h2>
        <p>Only to provide the service — quote, produce, ship, invoice, support. We do not sell your data.</p>
        <h2>CAD files</h2>
        <p>Files are analyzed client-side and do not upload to our servers unless you order. Ordered parts' CAD files are stored encrypted at rest (AES-256), accessible only to authorized production staff.</p>
        <h2>ITAR-flagged projects</h2>
        <p>ITAR projects are stored in a network-segregated production cell on US soil, accessible only by US persons, with per-project audit logs.</p>
        <h2>Your rights</h2>
        <p>You may export or delete your data at any time from your account settings, or by emailing privacy@3dbuildbot.com.</p>
      </Container>
    </Section>
  );
}
