import { Container, Section } from "@/components/Card";
import { ContactForm } from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Contact</div>
        <h1 className="text-3xl font-semibold tracking-tight">Talk to a manufacturing engineer.</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Volume tooling, hybrid workflows, dedicated capacity, ITAR onboarding, PunchOut integrations — anything that needs a human on the other end.</p>
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <ContactForm />
          <div className="text-sm text-slate-600 dark:text-slate-400 space-y-3">
            <div><div className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-1">Sales</div><a href="mailto:sales@3dbuildbot.com" className="text-brand-600 dark:text-brand-400">sales@3dbuildbot.com</a></div>
            <div><div className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-1">Support</div><a href="mailto:support@3dbuildbot.com" className="text-brand-600 dark:text-brand-400">support@3dbuildbot.com</a></div>
            <div><div className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-1">Security / ITAR</div><a href="mailto:security@3dbuildbot.com" className="text-brand-600 dark:text-brand-400">security@3dbuildbot.com</a></div>
            <div><div className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-1">Response SLA</div><span>Business plan: 4 business hours · Enterprise: 1 hour · Free: same day</span></div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
