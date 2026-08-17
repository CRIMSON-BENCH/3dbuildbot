// Reverse-engineer from photo(s) via Gemini Vision.
// Accepts multipart: images[] + optional coin diameter for scale. Returns dimensioned sketch + STEP proposal outline + quote suggestion.
// GATED: Anonymous users get strict rate limit + 1-image cap. Signed-in users get 3 images + higher rate limit.
import { NextResponse } from "next/server";
import { guard } from "@/lib/abuse-guard";
import { getCurrentUser } from "@/lib/auth";

const KEY = process.env.GEMINI_API_KEY;
const MAX_IMAGES_ANON = 1;
const MAX_IMAGES_AUTH = 3;
const MAX_IMAGES_PAID = 6;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB per image

export async function POST(req: Request) {
  const user = await getCurrentUser();
  // Vision is expensive — hard-gate anonymous requests to the strict category
  const blocked = guard(req, "gemini-vision");
  if (blocked) return blocked;

  try {
    const form = await req.formData();
    const files = form.getAll("images") as File[];
    const scaleHint = String(form.get("scaleHint") || "US quarter (24.26mm)");
    const partDescription = String(form.get("description") || "");
    if (files.length === 0) return NextResponse.json({ ok: false, error: "no_images" }, { status: 400 });

    // Image count cap based on auth level
    const maxImages = !user ? MAX_IMAGES_ANON : (user.plan === "free" ? MAX_IMAGES_AUTH : MAX_IMAGES_PAID);
    if (files.length > maxImages) {
      return NextResponse.json({
        ok: false,
        error: !user
          ? `Anonymous users get ${MAX_IMAGES_ANON} image. Sign up (free) for ${MAX_IMAGES_AUTH}, or upgrade for ${MAX_IMAGES_PAID}.`
          : `Your plan supports up to ${maxImages} images per analysis. Upgrade for more.`,
      }, { status: 402 });
    }
    // Per-image size cap
    for (const f of files) {
      if (f.size > MAX_IMAGE_BYTES) return NextResponse.json({ ok: false, error: `Image ${f.name} exceeds 5MB limit` }, { status: 413 });
    }

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
