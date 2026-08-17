// Reverse-engineer from photo(s) via Gemini Vision.
// Accepts multipart: images[] + optional coin diameter for scale. Returns dimensioned sketch + STEP proposal outline + quote suggestion.
import { NextResponse } from "next/server";

const KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const files = form.getAll("images") as File[];
    const scaleHint = String(form.get("scaleHint") || "US quarter (24.26mm)");
    const partDescription = String(form.get("description") || "");
    if (files.length === 0) return NextResponse.json({ ok: false, error: "no_images" }, { status: 400 });

    if (!KEY) return NextResponse.json({ ok: true, ...mockReverseEng(files, scaleHint, partDescription), usingMock: true });

    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const model = new GoogleGenerativeAI(KEY).getGenerativeModel({ model: "gemini-2.5-pro" });
    const parts = await Promise.all(files.slice(0, 6).map(async (f) => {
      const b64 = Buffer.from(await f.arrayBuffer()).toString("base64");
      return { inlineData: { data: b64, mimeType: f.type || "image/jpeg" } };
    }));
    const prompt = `You are a reverse-engineering CAD engineer. The user uploaded ${files.length} photo(s) of a broken or obsolete part they need replaced. Scale reference: ${scaleHint}.
User description: ${partDescription || "None provided."}

Return STRICT JSON:
{
  "summary": "one-paragraph description of what the part is",
  "estimatedDimensionsMm": { "x": number, "y": number, "z": number },
  "estimatedVolumeCm3": number,
  "materialGuess": "material slug from: pa12-nylon, aluminum-6061, stainless-steel-303, polycarbonate, abs, delrin-pom",
  "processRecommendation": "fdm | sls | sla | cnc-machining | mjf",
  "featureList": ["notable features"],
  "confidence": 0.0-1.0,
  "notes": "engineering notes for the customer",
  "manufacturable": true
}`;

    const res = await model.generateContent({
      contents: [{ role: "user", parts: [...parts, { text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    });
    const analysis = JSON.parse(res.response.text());
    return NextResponse.json({ ok: true, analysis, usingMock: false });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}

function mockReverseEng(files: File[], scaleHint: string, description: string) {
  const seed = files.reduce((a, f) => a + f.size, 0);
  return {
    analysis: {
      summary: `Analyzed ${files.length} photo(s). ${description ? "User described: " + description + ". " : ""}Detected a rectangular bracket-style component with mounting features and a central bore. Scale reference: ${scaleHint}.`,
      estimatedDimensionsMm: { x: 40 + (seed % 30), y: 25 + ((seed >> 3) % 20), z: 6 + ((seed >> 6) % 8) },
      estimatedVolumeCm3: 8 + ((seed % 30) / 3),
      materialGuess: "aluminum-6061",
      processRecommendation: "cnc-machining",
      featureList: ["Central Ø8mm bore", "Two Ø4mm mounting holes on 30mm centers", "3mm radiused corners", "Chamfered edges", "1.6μm surface finish"],
      confidence: 0.68,
      notes: "Mock analysis (no GEMINI_API_KEY set). Set the key to run real Gemini Vision. Recommend uploading orthogonal views (top, front, side) + a coin for scale, and calling out any features that must match exactly.",
      manufacturable: true,
    },
  };
}
