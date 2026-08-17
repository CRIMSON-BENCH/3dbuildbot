import { Container, Section } from "@/components/Card";
import { ReverseEngineerTool } from "@/components/ReverseEngineerTool";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Reverse-Engineer from Photos",
  description: "Upload photos of a broken or obsolete part with a coin for scale. Gemini AI produces a dimensioned sketch and quote-ready spec.",
};

export default function RevEngPage() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Free tool · Gemini Vision</div>
        <h1 className="text-3xl font-semibold tracking-tight">Reverse-engineer from photos</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Broken part, obsolete replacement, or a physical prototype without CAD? Upload up to 6 photos + a coin for scale, and Gemini Vision drafts a dimensioned analysis + quote-ready spec.</p>
        <div className="mt-8"><ReverseEngineerTool /></div>
      </Container>
    </Section>
  );
}
