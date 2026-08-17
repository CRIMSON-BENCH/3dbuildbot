import type { Metadata } from "next";
import { ThermalExpansionSolver } from "./client";
export const metadata: Metadata = { title: "thermal-expansion solver — 3DBuildBot" };
export default function Page() { return <ThermalExpansionSolver />; }
