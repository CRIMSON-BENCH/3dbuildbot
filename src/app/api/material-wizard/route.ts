// Gemini-powered material selection wizard. Falls back to deterministic ranking if no key.
import { NextResponse } from "next/server";
import { z } from "zod";
import { MATERIALS } from "@/data/materials";
import { guard } from "@/lib/abuse-guard";

const schema = z.object({
  loadKind: z.enum(["low", "medium", "high", "impact", "cyclic"]),
  maxTempC: z.number().int().min(-50).max(500),
  environment: z.enum(["indoor", "outdoor", "chemical", "medical", "cryogenic", "food-contact"]),
  cosmetic: z.enum(["not-important", "important", "critical"]),
  cost: z.enum(["cheap", "balanced", "premium"]),
  cert: z.enum(["none", "iso-9001", "as9100", "iso-13485", "itar", "dfars"]).optional(),
  itar: z.boolean().optional(),
  bio: z.boolean().optional(),
});

const KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  const blocked = guard(req, "gemini-cheap");
  if (blocked) return blocked;
  const body = schema.parse(await req.json());

  // Deterministic scoring
  const scored = MATERIALS.map((m) => {
    let score = 50;
    if (body.loadKind === "high" && m.tensileMpa >= 300) score += 20;
    if (body.loadKind === "impact" && m.elongationPct >= 25) score += 15;
    if (body.loadKind === "cyclic" && m.tensileMpa >= 200 && m.elongationPct >= 10) score += 12;
    if (m.glassTransC >= body.maxTempC) score += 10;
    else score -= Math.min(30, (body.maxTempC - m.glassTransC) / 3);
    if (body.environment === "outdoor" && m.outdoorRated) score += 10;
    if (body.environment === "medical" && m.bioCompatible) score += 20;
    if (body.environment === "chemical" && (m.category === "metal" || m.slug === "peek")) score += 10;
    if (body.cost === "cheap") score += Math.max(0, 15 - m.costPerCm3 * 3);
    if (body.cost === "premium" && m.costPerCm3 > 2) score += 5;
    if (body.itar && !m.itarEligible) score -= 40;
    if (body.bio && !m.bioCompatible) score -= 30;
    if (body.cosmetic === "critical" && (m.category === "photopolymer" || m.slug === "clear-resin")) score += 10;
    return { m, score };
  }).sort((a, b) => b.score - a.score);

  const top3 = scored.slice(0, 3);

  let aiRationale = "Ranked by fit against your criteria (load, temperature, environment, cost, and certifications).";
  if (KEY) {
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const model = new GoogleGenerativeAI(KEY).getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `You are a manufacturing DFM engineer. Given the user's criteria (load: ${body.loadKind}, max temp: ${body.maxTempC}°C, environment: ${body.environment}, cosmetic: ${body.cosmetic}, cost target: ${body.cost}${body.itar ? ", ITAR required" : ""}${body.bio ? ", biocompatible required" : ""}), explain in 3 sentences why ${top3[0].m.name} is the best choice from these 3 candidates: ${top3.map((t) => t.m.name).join(", ")}. Be concise and technical.`;
      const res = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
      aiRationale = res.response.text();
    } catch { /* fall through */ }
  }

  return NextResponse.json({
    ok: true,
    top3: top3.map(({ m, score }) => ({
      slug: m.slug,
      name: m.name,
      shortName: m.shortName,
      score,
      tensileMpa: m.tensileMpa,
      elongationPct: m.elongationPct,
      glassTransC: m.glassTransC,
      densityGcc: m.densityGcc,
      costPerCm3: m.costPerCm3,
      processes: m.processes,
      itarEligible: m.itarEligible,
      bioCompatible: m.bioCompatible,
    })),
    rationale: aiRationale,
    usingMock: !KEY,
  });
}
