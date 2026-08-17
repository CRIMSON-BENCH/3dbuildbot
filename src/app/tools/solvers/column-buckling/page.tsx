import type { Metadata } from "next";
import { BucklingSolver } from "./client";
export const metadata: Metadata = { title: "column-buckling solver — 3DBuildBot" };
export default function Page() { return <BucklingSolver />; }
