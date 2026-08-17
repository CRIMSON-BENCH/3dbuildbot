import type { Metadata } from "next";
import { FeedSpeedSolver } from "./client";
export const metadata: Metadata = { title: "feed-speed solver — 3DBuildBot" };
export default function Page() { return <FeedSpeedSolver />; }
