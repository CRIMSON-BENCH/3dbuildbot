import type { Metadata } from "next";
import { ReynoldsSolver } from "./client";
export const metadata: Metadata = { title: "reynolds-number solver — 3DBuildBot" };
export default function Page() { return <ReynoldsSolver />; }
