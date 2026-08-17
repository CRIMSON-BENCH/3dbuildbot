// Advanced DFM: overhang risk, support volume estimate, thin-wall check, draft-angle suggestion.
// Real math, no external calls.
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  processSlug: z.string(),
  bboxMm: z.object({ x: z.number(), y: z.number(), z: z.number() }),
  volumeCm3: z.number(),
  triangleCount: z.number().optional(),
  minWallMm: z.number().optional(),
});

export async function POST(req: Request) {
  try {
    const b = schema.parse(await req.json());
    const bboxV = b.bboxMm.x * b.bboxMm.y * b.bboxMm.z; // mm³
    const solidRatio = Math.min(1, (b.volumeCm3 * 1000) / (bboxV || 1));
    const maxDim = Math.max(b.bboxMm.x, b.bboxMm.y, b.bboxMm.z);
    const minDim = Math.min(b.bboxMm.x, b.bboxMm.y, b.bboxMm.z);
    const aspect = minDim > 0 ? maxDim / minDim : 1;

    const issues: { level: "info" | "warn" | "error"; text: string }[] = [];
    let supportVolumeCm3 = 0;
    let supportMassPct = 0;

    // Overhang / support prediction (FDM/SLA)
    if (["fdm", "sla"].includes(b.processSlug)) {
      const rough = solidRatio < 0.4 ? 0.4 : 0.15; // hollow parts need more supports
      supportMassPct = Math.round(rough * 100);
      supportVolumeCm3 = b.volumeCm3 * rough;
      if (rough > 0.25) issues.push({ level: "warn", text: `High support-material estimate (${supportMassPct}%). Consider reorienting to reduce overhangs.` });
      else issues.push({ level: "info", text: `Estimated support material ${supportMassPct}% of part volume (${supportVolumeCm3.toFixed(1)} cm³)` });
    }

    // Aspect ratio (warp risk)
    if (aspect > 8 && ["fdm", "mjf", "sls"].includes(b.processSlug)) {
      issues.push({ level: "warn", text: `Aspect ratio ${aspect.toFixed(1)}:1 — high warp risk on ${b.processSlug.toUpperCase()}. Consider adding rib pattern or splitting into sub-parts.` });
    }

    // Thin-wall check
    if (b.minWallMm) {
      const floors: Record<string, number> = { fdm: 1.0, sls: 0.7, sla: 0.4, mjf: 0.5, "cnc-machining": 0.5 };
      const floor = floors[b.processSlug] ?? 0.8;
      if (b.minWallMm < floor) {
        issues.push({ level: "error", text: `Min wall ${b.minWallMm}mm is below ${b.processSlug.toUpperCase()} floor (${floor}mm). Auto-thicken candidate.` });
      } else {
        issues.push({ level: "info", text: `Min wall ${b.minWallMm}mm passes ${b.processSlug.toUpperCase()} floor (${floor}mm)` });
      }
    }

    // Draft angle suggestion (injection molding proxy)
    if (b.processSlug === "cnc-machining") {
      issues.push({ level: "info", text: "5-axis CNC: no draft-angle required. All pockets and features can be manufactured with sharp draw." });
    } else {
      issues.push({ level: "info", text: "Additive process: draft angles are not required, but adding 1–2° to vertical walls improves surface finish on downward faces." });
    }

    // Feature density
    if (b.triangleCount && b.triangleCount > 300000) {
      issues.push({ level: "warn", text: `${b.triangleCount.toLocaleString()} triangles — very high complexity. Decimate to ≤200k for faster slicing.` });
    }

    return NextResponse.json({
      ok: true,
      supportVolumeCm3,
      supportMassPct,
      aspectRatio: aspect,
      solidRatio,
      issues,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
