import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "3DBuildBot — Instant CAD Quotes. US-Made Parts. ITAR-Ready.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", background: "linear-gradient(135deg, #0f172a 0%, #1e40af 100%)", color: "white", padding: 80, fontFamily: "system-ui, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 12, background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700 }}>3D</div>
          <div style={{ fontSize: 32, fontWeight: 600 }}>3DBuildBot</div>
        </div>
        <div style={{ marginTop: 60, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 700, letterSpacing: -2 }}>Industrial manufacturing,</div>
          <div style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 700, letterSpacing: -2, color: "#60a5fa" }}>quoted instantly.</div>
        </div>
        <div style={{ marginTop: "auto", display: "flex", gap: 32, fontSize: 22, color: "#cbd5e1" }}>
          <div>FDM · SLS · SLA · MJF · 5-Axis CNC</div>
          <div>·</div>
          <div>ISO 9001 · AS9100D · ITAR</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
