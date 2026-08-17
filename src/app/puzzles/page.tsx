import Link from "next/link";
import { Container, Section, FeatureCard } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "DFM Puzzles — Interactive Engineering Practice" };

const PUZZLES = [
  { slug: "unmoldable-part", title: "Unmoldable part", category: "Injection molding", difficulty: "Easy", desc: "This bracket has features that lock the mold. Redesign for straight-pull ejection without changing function." },
  { slug: "impossible-tolerance", title: "Impossible tolerance", category: "GD&T", difficulty: "Medium", desc: "A drawing calls out ±0.005mm on a 3D-printed part. Where is the tolerance actually needed, and what should the rest of the callouts be?" },
  { slug: "sls-trapped-powder", title: "Trapped powder", category: "SLS", difficulty: "Easy", desc: "This hollow drone airframe traps un-fused powder. Add escape holes without compromising aerodynamics." },
  { slug: "cnc-tool-access", title: "CNC tool-access failure", category: "5-axis CNC", difficulty: "Hard", desc: "This part requires a Ø2mm end mill in a Ø1.5mm pocket. Diagnose and redesign to enable manufacturing." },
  { slug: "warp-city", title: "Warp city", category: "FDM", difficulty: "Medium", desc: "This 300mm long PLA part warps 4mm off the bed. Redesign the base to reduce warp without changing the top geometry." },
  { slug: "as9102-callout", title: "AS9102 callout hunt", category: "Aerospace QMS", difficulty: "Hard", desc: "Given this drawing, list every characteristic that requires an AS9102 Form 3 entry." },
];

export default function PuzzlesIndex() {
  return (
    <Section>
      <Container>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Interactive · Free</div>
        <h1 className="text-3xl font-semibold tracking-tight">DFM Puzzles</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">Real-world design-for-manufacturing challenges from our engineering team. Practice on the same problems that trip up junior engineers on their first CAD review.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PUZZLES.map((p) => (
            <Link key={p.slug} href={`/puzzles/${p.slug}`} className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-500 transition-colors">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                <span>{p.category}</span><span>{p.difficulty}</span>
              </div>
              <h3 className="text-base font-semibold group-hover:text-brand-600">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
