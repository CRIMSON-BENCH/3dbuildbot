import type { Metadata } from "next";
import { BoltTorqueSolver } from "./client";
export const metadata: Metadata = { title: "bolt-torque solver — 3DBuildBot" };
export default function Page() { return <BoltTorqueSolver />; }
