import type { Metadata } from "next";
import { NatFreqSolver } from "./client";
export const metadata: Metadata = { title: "natural-frequency solver — 3DBuildBot" };
export default function Page() { return <NatFreqSolver />; }
