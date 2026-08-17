import { Container, Section } from "@/components/Card";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Refund Policy" };
export default function RefundPage() {
  return (
    <Section>
      <Container className="max-w-3xl prose-brand">
        <h1 className="text-3xl font-semibold tracking-tight">Refund Policy</h1>
        <p className="text-sm text-slate-500">Last updated: August 2026</p>
        <p>Because parts are made-to-order, orders are non-cancellable once production begins. However, we stand behind every part we ship.</p>
        <h2>Non-conforming parts</h2>
        <p>If a part does not meet the tolerances or specifications quoted, we will replace it at no charge or issue a full refund at your option. Report non-conforming parts within 30 days of delivery to support@3dbuildbot.com with photos and a brief description.</p>
        <h2>Damage in transit</h2>
        <p>Parts damaged in transit are our responsibility. Report within 5 business days of receipt with photos of the packaging and part.</p>
        <h2>Cancellation before production</h2>
        <p>Orders can be cancelled at no charge before entering the "queued" status. After the "in-production" status, cancellation is at our sole discretion and may incur a materials fee.</p>
        <h2>Subscription refunds</h2>
        <p>Subscription plans are refundable on a pro-rata basis for the current billing period. Cancel any time from your billing dashboard.</p>
      </Container>
    </Section>
  );
}
