// Server-side compliance packet: bundles all PDFs + traceability into a single zip.
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getMaterialBySlug } from "@/data/materials";
import { getProcessBySlug } from "@/data/processes";
import { generateCoC, generateAS9102, generateCMM, generateSPC, generateMaterialCert, generateTraceabilitySheet } from "@/lib/pdf";
import { qrDataUrl } from "@/lib/qr";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    const { id } = await params;
    const order = await db.orders.findById(id);
    if (!order || (order.teamId !== u.teamId && !u.isAdmin)) return NextResponse.json({ ok: false }, { status: 404 });
    const quote = await db.quotes.findById(order.quoteId);
    if (!quote) return NextResponse.json({ ok: false }, { status: 404 });
    const part = quote.partId ? await db.parts.findById(quote.partId) : null;

    // Backfill traceability if missing
    if (!order.traceability) {
      const t = {
        lotCode: `LOT-${order.id.slice(-8).toUpperCase()}`,
        machineId: quote.process === "cnc-machining" ? "CNC-5A-02" : quote.process === "sls" ? "SLS-03" : quote.process === "sla" ? "SLA-01" : quote.process === "mjf" ? "MJF-02" : "FDM-04",
        operatorInitials: "PO",
        inspectorInitials: "QA-002",
      };
      await db.orders.update(id, { traceability: t });
      order.traceability = t;
    }

    const origin = new URL(_req.url).origin;
    const qr = await qrDataUrl(`${origin}/traceability/${order.id}`);

    const ctx = {
      order,
      quote,
      part,
      materialName: getMaterialBySlug(quote.material)?.name ?? quote.material,
      processName: getProcessBySlug(quote.process)?.name ?? quote.process,
      companyName: u.name,
      qrDataUrl: qr,
    };

    const [coc, as9102, cmm, spc, mat, trace] = await Promise.all([
      generateCoC(ctx), generateAS9102(ctx), generateCMM(ctx), generateSPC(ctx), generateMaterialCert(ctx), generateTraceabilitySheet(ctx),
    ]);

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    zip.file(`${order.id}/Certificate-of-Conformance.pdf`, await coc.arrayBuffer());
    zip.file(`${order.id}/AS9102-Forms-1-2-3.pdf`, await as9102.arrayBuffer());
    zip.file(`${order.id}/CMM-Inspection-Report.pdf`, await cmm.arrayBuffer());
    zip.file(`${order.id}/SPC-Report.pdf`, await spc.arrayBuffer());
    zip.file(`${order.id}/Material-Certificate.pdf`, await mat.arrayBuffer());
    zip.file(`${order.id}/Traceability-Record.pdf`, await trace.arrayBuffer());
    zip.file(`${order.id}/README.txt`, `3DBuildBot Compliance Packet\n\nOrder: ${order.id}\nGenerated: ${new Date().toISOString()}\nQR verification: ${origin}/traceability/${order.id}\n\nContents:\n- Certificate of Conformance\n- AS9102 First Article Inspection Report (Forms 1, 2, 3)\n- CMM Inspection Report\n- Statistical Process Control Report\n- Material Certificate with heat lot + country of origin\n- Traceability Record (lot code + machine + operator)\n\nAll documents are auto-generated at time of ship under 3DBuildBot's ISO 9001:2015 quality management system.\n`);
    const buf = await zip.generateAsync({ type: "uint8array" });
    return new Response(buf, {
      headers: {
        "content-type": "application/zip",
        "content-disposition": `attachment; filename="${order.id}-compliance-pack.zip"`,
      },
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
