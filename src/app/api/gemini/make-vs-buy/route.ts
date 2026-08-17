// Assembly BOM analysis — for each line, recommend make (3DBuildBot) vs buy (McMaster / Digi-Key / etc.)
import { NextResponse } from "next/server";
import { z } from "zod";
import { guard } from "@/lib/abuse-guard";

const schema = z.object({
  lines: z.array(z.object({ name: z.string(), qty: z.number().int().min(1), material: z.string().optional(), notes: z.string().optional() })),
});

const KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  const blocked = guard(req, "gemini-cheap");
  if (blocked) return blocked;
  try {
    const b = schema.parse(await req.json());
    if (!KEY) return NextResponse.json({ ok: true, ...mockAnalysis(b.lines), usingMock: true });
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const model = new GoogleGenerativeAI(KEY).getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `You are a procurement engineer. Given this BOM, recommend make vs buy for each line and a supplier if buy. Return STRICT JSON: { "lines": [{ "name": string, "recommendation": "make" | "buy", "supplierIfBuy": string, "reason": string }] }.

BOM:
${b.lines.map((l, i) => `${i + 1}. ${l.name} — qty ${l.qty}${l.material ? " · " + l.material : ""}${l.notes ? " · " + l.notes : ""}`).join("\n")}`;
    const res = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } });
    return NextResponse.json({ ok: true, ...JSON.parse(res.response.text()), usingMock: false });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}

function mockAnalysis(lines: { name: string; qty: number; material?: string }[]) {
  return {
    lines: lines.map((l) => {
      const isStandardHardware = /screw|bolt|nut|washer|bearing|o-ring|spring/i.test(l.name);
      const isCustom = /bracket|housing|panel|mount|plate|adapter|enclosure/i.test(l.name);
      if (isStandardHardware) return { name: l.name, recommendation: "buy", supplierIfBuy: "McMaster-Carr", reason: "Standard hardware — commodity item, no design value in making it." };
      if (isCustom) return { name: l.name, recommendation: "make", supplierIfBuy: "", reason: "Custom part — 3DBuildBot can make in FDM, SLS, or CNC per material spec." };
      return { name: l.name, recommendation: "buy", supplierIfBuy: "Digi-Key / Grainger", reason: "Likely a commodity electronic or mechanical part — check catalog before designing." };
    }),
  };
}
