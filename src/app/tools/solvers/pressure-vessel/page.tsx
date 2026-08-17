import type { Metadata } from "next";
import { PressureVesselSolver } from "./client";
export const metadata: Metadata = { title: "pressure-vessel solver — 3DBuildBot" };
export default function Page() { return <PressureVesselSolver />; }
