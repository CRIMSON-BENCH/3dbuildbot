// Lead-magnet PDF per process. Generated on demand.
import { NextResponse } from "next/server";
import { PROCESSES } from "@/data/processes";

async function getJsPDF() {
  const mod = await import("jspdf");
  return (mod.default || mod.jsPDF) as new () => {
    setFontSize: (n: number) => void; setFont: (f: string, s?: string) => void; setTextColor: (r: number, g?: number, b?: number) => void;
    setDrawColor: (r: number, g?: number, b?: number) => void; setLineWidth: (n: number) => void; setFillColor: (r: number, g?: number, b?: number) => void;
    line: (a: number, b: number, c: number, d: number) => void; rect: (x: number, y: number, w: number, h: number, style?: string) => void;
    text: (t: string | string[], x: number, y: number, opts?: unknown) => void; addPage: () => void; output: (type: string) => unknown;
  };
}

const GUIDES: Record<string, { title: string; sections: { h: string; body: string[] }[] }> = {
  fdm: { title: "FDM Design Essentials", sections: [
    { h: "Wall thickness", body: ["Minimum: PLA 1.0mm · ABS 1.2mm · PC 1.0mm · PA-CF 0.8mm.", "Structural walls: 2.0–3.0mm.", "Sub-nozzle-diameter features (typ. 0.4mm) will not print."] },
    { h: "Anisotropy", body: ["Layer bond in Z is 30–40% weaker than in-plane.", "Design load-bearing features to align with the print plane.", "PA-CF and PC partially compensate through better inter-layer bonding."] },
    { h: "Overhangs & support", body: ["Overhangs >45° from vertical require support material.", "Design chamfers and fillets to stay under 45°.", "Bridges to 5mm print unsupported reliably; beyond that they sag."] },
    { h: "Infill", body: ["20% gyroid is the default: 60–70% of solid stiffness at 20% cost.", "Reinforce load-bearing zones with variable infill (50–100%).", "Solid brick is only for compressive load applications."] },
    { h: "Post-processing", body: ["ABS: acetone smoothing for near-injection-molded finish.", "All materials: sand, prime, paint.", "PC / PA-CF: machine threads with a tap after print."] },
  ] },
  sls: { title: "SLS Design Essentials", sections: [
    { h: "Wall thickness", body: ["Minimum: PA12 0.7mm · PA11 0.8mm · PA-CF 0.8mm.", "Structural walls: 1.5–2.0mm.", "Ribbed patterns reduce mass without losing stiffness."] },
    { h: "Escape holes for hollow parts", body: ["Un-fused powder trapped inside sealed hollows will not come out.", "Design ≥2 escape holes per cavity, minimum Ø5mm.", "Larger holes are better if aesthetic constraints allow."] },
    { h: "Feature resolution", body: ["Achievable tolerance: ±0.30mm on features under 100mm.", "Minimum feature detail: ~0.5mm (embossed text, small holes).", "Threads: M4 or larger; below M4 use inserts or tap post-print."] },
    { h: "Living hinges & snap-fits", body: ["PA11 handles repeated flexing better than PA12 (2× elongation at break).", "Snap-fit beam thickness typically 1.5–2× wall thickness.", "Keep beam flex angle under 3° for durability."] },
    { h: "Cost & orientation", body: ["Pricing is dominated by volume in the build chamber and build height.", "Nesting many parts per build lowers per-part cost dramatically.", "SLS shines at 50–1,000 part runs; design for orientation-agnostic geometry."] },
  ] },
  sla: { title: "SLA Design Essentials", sections: [
    { h: "Wall thickness", body: ["Minimum: 0.4–0.5mm.", "Structural walls: 1.0–2.0mm.", "SLA is brittle under load — prioritize surface finish, not load-bearing use."] },
    { h: "Support and cure", body: ["Every SLA part needs supports on downward-facing surfaces.", "Orient to minimize support witness marks on cosmetic faces.", "Post-cure at manufacturer-specified temperature and duration for full mechanical properties."] },
    { h: "Clear resin", body: ["Achievable optical clarity after wet-sanding + polishing.", "For microfluidics, keep channel walls ≥0.6mm and use a smooth-orientation strategy.", "UV-degrades over time — coat clear parts for outdoor use."] },
    { h: "High-temp resin", body: ["Holds dimensional stability at 200°C+ after post-cure.", "Preferred for injection mold masters and hot-air fixtures.", "Brittle — not for impact applications."] },
    { h: "Tolerance", body: ["Achievable: ±0.15mm on features under 100mm.", "Feature-to-feature: ±0.05mm on well-supported geometry.", "For tight-fit assemblies, prototype and dial in per-batch."] },
  ] },
  mjf: { title: "MJF Design Essentials", sections: [
    { h: "How MJF differs from SLS", body: ["Jets fusing + detailing agents onto powder bed, then bulk-heats to fuse selectively.", "Faster than SLS with slightly more isotropic mechanical properties.", "Native color is dark grey (dye to black is standard)."] },
    { h: "Wall thickness", body: ["Minimum: 0.5mm.", "Structural walls: 1.5–2.0mm.", "Feature resolution slightly better than SLS."] },
    { h: "Dyeing", body: ["Black dye is the industry standard, near-uniform saturation.", "Custom colors are limited relative to SLS.", "Vapor smoothing produces near-injection-molded surface finish."] },
    { h: "Volume production", body: ["MJF wins on 50+ part runs.", "Per-part cost drops ~10–20% vs SLS due to faster build times.", "Bulk order gets more isotropic mechanical properties within lot."] },
  ] },
  "cnc-machining": { title: "5-Axis CNC Design Essentials", sections: [
    { h: "Internal corner radii", body: ["End mills leave a radius equal to their radius — no true sharp internal corners.", "Design internal corners with R ≥ largest end mill radius fitting the feature.", "Typical: R2mm minimum for pocket corners."] },
    { h: "Feature accessibility", body: ["5-axis reaches most features in one setup.", "Blind pockets, deep undercuts, and features on opposite faces add setup complexity.", "Design features accessible from a single primary orientation when possible."] },
    { h: "Threading", body: ["Tapped threads cheaper than machined for M4 and larger.", "For high-strength or high-cycle threading, use Heli-Coil or Timesert inserts.", "Callout depth ≥1.5× diameter minimum."] },
    { h: "Tolerance callouts", body: ["Default: ±0.125mm.", "Callouts <±0.05mm add cost proportionally — reserve for interfaces.", "GD&T on drawings for inspection-critical features."] },
    { h: "Material selection for cost", body: ["Aluminum 6061 is 4–8× faster to machine than titanium and 2–3× faster than stainless.", "Reserve 7075 for load, Ti/SS for corrosion/thermal/biocompat reasons.", "Delrin and PEEK have their own tool-wear characteristics — plan for it."] },
    { h: "Setup reduction", body: ["One-setup parts are ~2–3× cheaper than parts requiring flipping.", "When possible, design so the entire feature set is accessible from a single orientation."] },
  ] },
};

export async function GET(_req: Request, { params }: { params: Promise<{ process: string }> }) {
  const { process } = await params;
  const proc = PROCESSES.find((p) => p.slug === process);
  const guide = GUIDES[process];
  if (!proc || !guide) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

  const Doc = await getJsPDF();
  const doc = new Doc();
  doc.setFillColor(37, 99, 235); doc.rect(0, 0, 210, 40, "F");
  doc.setTextColor(255); doc.setFontSize(24); doc.setFont("helvetica", "bold");
  doc.text("Design Essentials", 20, 22);
  doc.setFontSize(14); doc.setFont("helvetica", "normal");
  doc.text(guide.title, 20, 32);
  doc.setTextColor(30);
  let y = 55;
  doc.setFontSize(10);
  doc.text(`Process specifications`, 20, y); y += 5;
  doc.setDrawColor(180); doc.line(20, y, 190, y); y += 5;
  const spec = [
    ["Lead time", proc.leadTimeDays],
    ["Tolerance", proc.toleranceMm],
    ["Layer / precision", proc.layerMicron || "—"],
    ["Min feature", proc.minFeatureMm],
    ["Max build volume", proc.maxBuildMm],
  ];
  for (const [k, v] of spec) {
    doc.setFont("helvetica", "bold"); doc.text(`${k}:`, 20, y);
    doc.setFont("helvetica", "normal"); doc.text(v, 60, y); y += 5;
  }
  y += 8;

  for (const section of guide.sections) {
    if (y > 240) { doc.addPage(); y = 25; }
    doc.setFontSize(13); doc.setFont("helvetica", "bold"); doc.setTextColor(37, 99, 235);
    doc.text(section.h, 20, y); y += 6;
    doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.setTextColor(30);
    for (const line of section.body) {
      if (y > 270) { doc.addPage(); y = 25; }
      doc.text(`• ${line}`, 22, y, { maxWidth: 165 });
      y += 7;
    }
    y += 4;
  }
  doc.setFontSize(9); doc.setTextColor(120);
  doc.text("3DBuildBot Industries · https://www.3dbuildbot.com · Get an instant quote at /quote", 20, 285);
  const buf = doc.output("blob") as Blob;
  return new Response(buf, {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `inline; filename="Design-Essentials-${process}.pdf"`,
    },
  });
}
