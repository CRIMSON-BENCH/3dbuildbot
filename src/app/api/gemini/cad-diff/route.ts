// CAD version-diff assistant: given two parsed CAD summaries, return a plain-English change list + cost delta.
import { NextResponse } from "next/server";
import { z } from "zod";
import { guard } from "@/lib/abuse-guard";

const schema = z.object({
  a: z.object({ filename: z.string(), volumeCm3: z.number(), bboxMm: z.object({ x: z.number(), y: z.number(), z: z.number() }), triangleCount: z.number().optional() }),
  b: z.object({ filename: z.string(), volumeCm3: z.number(), bboxMm: z.object({ x: z.number(), y: z.number(), z: z.number() }), triangleCount: z.number().optional() }),
  process: z.string().optional(),
  material: z.string().optional(),
});

const KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  const blocked = guard(req, "gemini-cheap");
  if (blocked) return blocked;
  try {
    const b = schema.parse(await req.json());
    const dV = b.b.volumeCm3 - b.a.volumeCm3;
    const dX = b.b.bboxMm.x - b.a.bboxMm.x;
    const dY = b.b.bboxMm.y - b.a.bboxMm.y;
    const dZ = b.b.bboxMm.z - b.a.bboxMm.z;
    const dTri = (b.b.triangleCount ?? 0) - (b.a.triangleCount ?? 0);
    const basicSummary = `Volume: ${dV >= 0 ? "+" : ""}${dV.toFixed(2)} cm³ (${((dV / b.a.volumeCm3) * 100).toFixed(1)}%). Bbox: X ${dX >= 0 ? "+" : ""}${dX.toFixed(2)}, Y ${dY >= 0 ? "+" : ""}${dY.toFixed(2)}, Z ${dZ >= 0 ? "+" : ""}${dZ.toFixed(2)} mm. Triangles: ${dTri >= 0 ? "+" : ""}${dTri.toLocaleString()}.`;

    if (!KEY) return NextResponse.json({ ok: true, summary: basicSummary, usingMock: true });

    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const model = new GoogleGenerativeAI(KEY).getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `You are a CAD reviewer. Two versions of a part have been analyzed. Describe the changes in 2 sentences of engineering English, focusing on cost/manufacturing implications.

Rev A: ${b.a.filename} · ${b.a.volumeCm3.toFixed(2)}cm³ · ${b.a.bboxMm.x}×${b.a.bboxMm.y}×${b.a.bboxMm.z}mm
Rev B: ${b.b.filename} · ${b.b.volumeCm3.toFixed(2)}cm³ · ${b.b.bboxMm.x}×${b.b.bboxMm.y}×${b.b.bboxMm.z}mm

Process: ${b.process ?? "unspecified"} · Material: ${b.material ?? "unspecified"}`;
    const res = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
    return NextResponse.json({ ok: true, summary: res.response.text(), rawDiff: basicSummary, usingMock: false });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
