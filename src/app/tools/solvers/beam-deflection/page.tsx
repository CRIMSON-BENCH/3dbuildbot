import type { Metadata } from "next";
import { BeamDeflectionSolver } from "./client";

export const metadata: Metadata = {
  title: "Beam Deflection Calculator — Cantilever, Simply-Supported, Fixed-Fixed",
  description: "Free interactive beam deflection calculator. Point loads, distributed loads, all common end conditions. E, I, L inputs → deflection + slope + max stress.",
};

export default function Page() { return <BeamDeflectionSolver />; }
