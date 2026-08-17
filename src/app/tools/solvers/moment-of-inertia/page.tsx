import type { Metadata } from "next";
import { MoISolver } from "./client";

export const metadata: Metadata = {
  title: "Second Moment of Area (I) — Rectangle, Circle, Tube, I-beam Calculator",
  description: "Free interactive moment-of-inertia calculator. Rectangle, circle, hollow tube, I-beam, channel. Also computes section modulus S = I/c.",
};

export default function Page() { return <MoISolver />; }
