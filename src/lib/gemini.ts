// Gemini client with graceful fallback.
// Real calls when GEMINI_API_KEY is set; deterministic mock otherwise so the app runs demo-ready.

import type { QuoteInput } from "./quote-engine";

let genAI: unknown = null;
const KEY = process.env.GEMINI_API_KEY;

async function getModel(model: "gemini-2.5-flash" | "gemini-2.5-pro") {
  if (!KEY) return null;
  if (!genAI) {
    const mod = await import("@google/generative-ai");
    genAI = new mod.GoogleGenerativeAI(KEY);
  }
  const client = genAI as { getGenerativeModel: (opts: { model: string }) => unknown };
  return client.getGenerativeModel({ model }) as {
    generateContent: (arg: unknown) => Promise<{ response: { text: () => string } }>;
  };
}

export interface DfmIssue { level: "info" | "warn" | "error"; text: string; }

export interface DfmResult {
  summary: string;
  issues: DfmIssue[];
  suggestedFinish?: string;
  suggestedMaterial?: string;
  costOptimizations?: string[];
  usingMock: boolean;
}

export async function analyzeDfm(input: QuoteInput & { name: string }): Promise<DfmResult> {
  const model = await getModel("gemini-2.5-flash");
  if (!model) return mockDfm(input);
  const prompt = `You are a manufacturing DFM (design-for-manufacturing) engineer at 3DBuildBot. A customer submitted the part below for an instant quote.

Part: ${input.name}
Process: ${input.processSlug}
Material: ${input.materialSlug}
Quantity: ${input.quantity}
Bounding box (mm): ${input.bboxMm.x} × ${input.bboxMm.y} × ${input.bboxMm.z}
Volume: ${input.volumeCm3.toFixed(2)} cm³
Triangle count: ${input.triangleCount ?? "unknown"}

Return STRICT JSON matching this schema:
{
  "summary": "one-sentence DFM verdict",
  "issues": [{"level": "info"|"warn"|"error", "text": "concise issue"}],
  "suggestedFinish": "optional finish key: standard | bead-blast | vapor-smooth | anodize2 | anodize3 | alodine | powder-coat | passivate",
  "suggestedMaterial": "optional material slug if a better fit exists",
  "costOptimizations": ["array of concrete cost-reduction ideas"]
}`;
  try {
    const res = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    });
    const parsed = JSON.parse(res.response.text());
    return { ...parsed, usingMock: false };
  } catch {
    return mockDfm(input);
  }
}

function mockDfm(input: QuoteInput & { name: string }): DfmResult {
  const seed = hashStr(input.name + input.processSlug + input.materialSlug);
  const issues: DfmIssue[] = [];
  const minWall = 0.8 + ((seed % 25) / 30);
  issues.push({ level: "info", text: `Estimated min wall: ${minWall.toFixed(2)}mm — within ${input.processSlug.toUpperCase()} guidelines` });
  if (seed % 3 === 0) issues.push({ level: "warn", text: "Two features detected below recommended thickness. Auto-thickened proposal available on request." });
  if (seed % 5 === 0) issues.push({ level: "warn", text: "Trapped cavity detected — recommend adding a 5mm escape hole for powder removal." });
  if (seed % 7 === 0) issues.push({ level: "info", text: `Volume ${input.volumeCm3.toFixed(1)} cm³ is near lower economy bound; consider nesting multiple parts per build.` });
  issues.push({ level: "info", text: `${1 + (seed % 4)} candidate orientations analyzed for support optimization` });
  return {
    summary: `Part is compatible with ${input.processSlug.toUpperCase()} in ${input.materialSlug}. Manufacturable as designed.`,
    issues,
    suggestedFinish: input.processSlug === "sls" ? "bead-blast" : input.processSlug === "cnc-machining" ? "anodize2" : "standard",
    costOptimizations: input.quantity > 10 ? ["Nest multiple parts in same build to reduce per-part setup cost."] : ["Batch to ≥5 units for 8% volume discount."],
    usingMock: true,
  };
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export async function materialsChat(userMessage: string, history: { role: "user" | "model"; text: string }[] = []): Promise<{ text: string; usingMock: boolean }> {
  const model = await getModel("gemini-2.5-flash");
  if (!model) return { text: mockMaterialsChat(userMessage), usingMock: true };
  try {
    const contents = [
      ...history.map((h) => ({ role: h.role, parts: [{ text: h.text }] })),
      { role: "user", parts: [{ text: `You are 3DBuildBot's manufacturing engineer chatbot. Answer concisely using real datasheet values. If asked something outside 3DBuildBot's scope (materials, processes, tolerances, DFM), politely redirect.\n\nUser: ${userMessage}` }] },
    ];
    const res = await model.generateContent({ contents });
    return { text: res.response.text(), usingMock: false };
  } catch {
    return { text: mockMaterialsChat(userMessage), usingMock: true };
  }
}

function mockMaterialsChat(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("carbon") || lower.includes("pa-cf")) return "PA-CF (carbon-fiber nylon) is our stiffness champion — 105 MPa tensile, dimensionally stable, glass transition 180°C. Runs on FDM, SLS, and MJF. Common for robotics grippers, drone frames, and production fixtures. ~$0.85/cm³. Add GEMINI_API_KEY for personalized recommendations.";
  if (lower.includes("titanium") || lower.includes("ti-6al-4v")) return "Ti-6Al-4V Grade 5 — the aerospace/defense workhorse. 950 MPa tensile, biocompatible, ITAR-eligible, DFARS-compliant. Machined on 5-axis and printable via DMLS. ~$6.80/cm³. Set GEMINI_API_KEY for a live chat.";
  return "Ask about materials, processes, tolerances, or design-for-manufacturing. Set GEMINI_API_KEY in .env.local for real AI answers.";
}

export const isGeminiConfigured = () => !!KEY;
