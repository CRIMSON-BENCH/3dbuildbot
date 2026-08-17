import type { MetadataRoute } from "next";

// PWA manifest — enables "Add to Home Screen" on mobile + iOS
// standalone mode when installed via Capacitor.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "3DBuildBot — Instant CAD Quotes",
    short_name: "3DBuildBot",
    description: "Upload CAD, get a locked-price manufacturing quote in seconds. FDM, SLS, SLA, MJF, and 5-axis CNC.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    orientation: "portrait-primary",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
    categories: ["business", "productivity", "utilities"],
    lang: "en",
  };
}
