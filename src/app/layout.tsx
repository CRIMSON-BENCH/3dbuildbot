import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LiveChat } from "@/components/LiveChat";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLdOrg } from "@/components/JsonLdOrg";
import { AnalyticsGated } from "@/components/AnalyticsGated";
import { SkipToContent } from "@/components/SkipToContent";

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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  alternates: { canonical: "https://www.3dbuildbot.com" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
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
        <SkipToContent />
        <Nav />
        <main id="main-content" className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
        <LiveChat />
        <CookieBanner />
        <AnalyticsGated />
      </body>
    </html>
  );
}
