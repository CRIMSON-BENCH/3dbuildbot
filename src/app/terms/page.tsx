import { Container, Section } from "@/components/Card";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service" };
export default function TermsPage() {
  return (
    <Section>
      <Container className="max-w-3xl prose-brand">
        <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="text-sm text-slate-500">Last updated: August 2026</p>
        <p>By accessing 3DBuildBot you agree to these Terms of Service. 3DBuildBot provides on-demand manufacturing services and is not a professional engineering firm. All designs and specifications submitted remain the responsibility of the customer's qualified engineering staff.</p>
        <h2>Accounts</h2>
        <p>You are responsible for all activity that occurs under your account. Keep your credentials secure. Notify us at security@3dbuildbot.com if you suspect compromise.</p>
        <h2>Quotes and orders</h2>
        <p>Quotes are locked-price for 30 days from issuance. Orders are non-cancellable once production begins, per the timeline shown on the order detail page.</p>
        <h2>Intellectual property</h2>
        <p>You retain all rights to CAD files, drawings, and designs you upload. 3DBuildBot uses them solely to produce the parts you order and does not share them outside our contracted manufacturing partners.</p>
        <h2>Warranty and liability</h2>
        <p>Parts are manufactured to the tolerances and specifications quoted. Our liability is limited to replacement of non-conforming parts. We do not warrant fitness for any particular purpose.</p>
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the state of California, USA.</p>
      </Container>
    </Section>
  );
}
