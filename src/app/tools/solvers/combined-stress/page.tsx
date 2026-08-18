import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GenericSolverStub } from "@/components/GenericSolverStub";
import { getSolverBySlug } from "@/data/solvers";

const SLUG = "combined-stress";
const solver = getSolverBySlug(SLUG)!;

export const metadata: Metadata = {
  title: `${solver.name} — Free Online Calculator | 3DBuildBot`,
  description: solver.short,
  keywords: solver.keywords,
};

export default function Page() {
  if (!solver) notFound();
  return <GenericSolverStub solver={solver} />;
}
