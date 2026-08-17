import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LiveChat } from "@/components/LiveChat";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLdOrg } from "@/components/JsonLdOrg";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.3dbuildbot.com"),
  title: { default: "3DBuildBot — Instant CAD Quotes. US-Made Parts. ITAR-Ready.", template: "%s · 3DBuildBot" },
  description:
    "Upload a CAD file, get a locked-price quote in seconds, and ship in 2–7 days. FDM, SLS, SLA, and 5-axis CNC. ISO 9001, AS9100D, ITAR-registered US supply chain.",
  openGraph: {
    type: "website",
    siteName: "3DBuildBot",
    title: "3DBuildBot — Instant CAD Quotes for US-Made Parts",
    description: "FDM · SLS · SLA · 5-axis CNC. ITAR-registered. Locked-price quotes.",
    url: "https://www.3dbuildbot.com",
  },
  twitter: { card: "summary_large_image", title: "3DBuildBot", description: "Instant CAD quotes. US-made. ITAR-ready." },
};

const themeScript = `
  try {
    const t = localStorage.getItem('theme') || 'system';
    const dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLdOrg />
      </head>
      <body>
        <Nav />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
        <LiveChat />
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
