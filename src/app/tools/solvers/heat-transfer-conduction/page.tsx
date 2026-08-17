import type { Metadata } from "next";
import { ConductionSolver } from "./client";
export const metadata: Metadata = { title: "heat-transfer-conduction solver — 3DBuildBot" };
export default function Page() { return <ConductionSolver />; }
