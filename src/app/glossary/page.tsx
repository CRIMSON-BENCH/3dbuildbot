import Link from "next/link";
import { Container, Section } from "@/components/Card";
import { GLOSSARY } from "@/data/glossary";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Glossary" };

export default function GlossaryIndex() {
  const grouped = GLOSSARY.reduce((acc, t) => {
    (acc[t.category] ||= []).push(t);
    return acc;
  }, {} as Record<string, typeof GLOSSARY>);
  return (
    <Section>
      <Container>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Reference</div>
        <h1 className="text-3xl font-semibold tracking-tight">Manufacturing glossary</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">Rigorous definitions across processes, materials, tolerances, certifications, and design.</p>
        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          {Object.entries(grouped).map(([cat, terms]) => (
            <div key={cat}>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">{cat}</div>
              <ul className="space-y-2">
                {terms.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/glossary/${t.slug}`} className="block rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-slate-900">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.term}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{t.short}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
