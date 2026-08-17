import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import type { Metadata } from "next";

const PUZZLES: Record<string, { title: string; category: string; difficulty: string; brief: string; hints: string[]; solution: string }> = {
  "unmoldable-part": {
    title: "Unmoldable part",
    category: "Injection molding",
    difficulty: "Easy",
    brief: "You've been handed a bracket design with a Ø8mm through-hole that runs perpendicular to the primary draw direction. The mold can't release without a slide action.",
    hints: [
      "Slide actions add ~$5,000 to tooling cost per action.",
      "The bracket is a fastener guide — the hole is critical.",
      "Can you achieve the same function with a redesign?",
    ],
    solution: "Change the through-hole to a two-sided open channel or a slotted feature accessible from the primary draw direction. Alternatively, split into two parts and snap-fit. Both eliminate the slide.",
  },
  "impossible-tolerance": {
    title: "Impossible tolerance",
    category: "GD&T",
    difficulty: "Medium",
    brief: "A drawing calls out ±0.005mm on the outer profile of an SLS PA12 part. That's 6× tighter than the SLS process floor of ±0.030mm.",
    hints: [
      "SLS floor: ±0.30mm on 100mm features.",
      "Only 1 in ~10,000 features actually needs ±0.005mm.",
      "What's the tolerance driver on this part?",
    ],
    solution: "Only bearing interfaces, mating features, and datum surfaces need tight tolerances. Loosen the outer profile to ±0.30mm (process-native) and add a precision datum on only the critical interface. Cost drops 60%+ without any functional change.",
  },
  "sls-trapped-powder": {
    title: "Trapped powder",
    category: "SLS",
    difficulty: "Easy",
    brief: "A drone airframe is designed as a fully-enclosed hollow shell for aerodynamic efficiency. SLS PA12 will trap ~40cm³ of un-fused powder inside.",
    hints: [
      "SLS builds parts by fusing powder in a bed of un-fused powder.",
      "Trapped powder cannot be removed without an escape hole.",
      "Escape holes should be ≥Ø5mm; larger is better.",
    ],
    solution: "Add at least two Ø5mm+ escape holes at opposite corners of the shell, positioned on surfaces that face away from primary airflow. The holes can be sealed with vapor-smoothed plugs post-print if aerodynamic performance is critical.",
  },
  "cnc-tool-access": {
    title: "CNC tool-access failure",
    category: "5-axis CNC",
    difficulty: "Hard",
    brief: "A part requires a Ø2mm end mill to machine a Ø1.5mm pocket. The pocket geometry cannot be reached.",
    hints: [
      "End mills have a physical diameter — they cannot machine features smaller than themselves.",
      "Internal corner radii equal end-mill radius.",
      "The pocket depth may also drive minimum tool length.",
    ],
    solution: "Either open the pocket to ≥Ø2.1mm (giving 0.05mm clearance for the tool) or redesign to eliminate the internal feature. If Ø1.5mm is truly required, switch to EDM or laser cutting for that feature.",
  },
  "warp-city": {
    title: "Warp city",
    category: "FDM",
    difficulty: "Medium",
    brief: "A 300mm long PLA base plate warps 4mm off the bed during FDM printing. The top geometry is critical and can't change.",
    hints: [
      "FDM warp is caused by non-uniform cooling stresses.",
      "Long unsupported base plates warp the most.",
      "A brim, raft, or rib pattern under the base can reduce warp without altering the top.",
    ],
    solution: "Add a 3mm-thick 40%-infill grid rib pattern to the underside of the base plate, connected only at the mount points. The rib pattern equalizes thermal stress. Add a 5mm brim during slicing for extra bed adhesion. Result: <0.5mm warp with no change to the top geometry.",
  },
  "as9102-callout": {
    title: "AS9102 callout hunt",
    category: "Aerospace QMS",
    difficulty: "Hard",
    brief: "You have a drawing with 47 dimensions, 12 GD&T callouts, and 3 material specifications. How many characteristics require AS9102 Form 3 entries?",
    hints: [
      "AS9102 requires every 'designed characteristic' to be verified.",
      "Basic dimensions (theoretically exact) are datum-defining but not measured.",
      "General notes (surface finish, edge break) may or may not require individual entries.",
    ],
    solution: "Every dimension with an explicit tolerance callout (not general-tolerance) requires a Form 3 entry, plus every GD&T callout, plus material verification. Typical answer: 47 - (basics) + 12 = ~50 characteristics. General tolerances (per ISO 2768) get one blanket entry.",
  },
};

export function generateStaticParams() {
  return Object.keys(PUZZLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PUZZLES[slug];
  return { title: p ? `${p.title} · DFM Puzzle` : "Puzzle" };
}

export default async function PuzzlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PUZZLES[slug];
  if (!p) notFound();
  return (
    <Section>
      <Container className="max-w-3xl">
        <Link href="/puzzles" className="text-xs text-brand-600">← All puzzles</Link>
        <div className="mt-3 flex items-center gap-2"><Badge tone="brand">{p.category}</Badge><Badge tone={p.difficulty === "Easy" ? "green" : p.difficulty === "Medium" ? "amber" : "red"}>{p.difficulty}</Badge></div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{p.title}</h1>
        <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold mb-2">Brief</h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{p.brief}</p>
        </div>
        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold mb-3">Hints</h2>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            {p.hints.map((h, i) => <li key={i}>{h}</li>)}
          </ol>
        </div>
        <details className="mt-4 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5 group">
          <summary className="cursor-pointer text-sm font-semibold text-brand-800 dark:text-brand-200">Show solution</summary>
          <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{p.solution}</p>
        </details>
      </Container>
    </Section>
  );
}
