import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LiveChat } from "@/components/LiveChat";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLdOrg } from "@/components/JsonLdOrg";
import { AnalyticsGated } from "@/components/AnalyticsGated";
import { SkipToContent } from "@/components/SkipToContent";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ClerkProvider } from "@clerk/nextjs";

const clerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.3dbuildbot.com"),
  title: { default: "3DBuildBot — Instant CAD Quotes. US Supplier Network.", template: "%s · 3DBuildBot" },
  description:
    "Upload a CAD file, get a locked-price quote in seconds, and ship in 5–10 days. FDM, SLS, SLA, MJF, and 5-axis CNC. US-based supplier network.",
  openGraph: {
    type: "website",
    siteName: "3DBuildBot",
    title: "3DBuildBot — Instant CAD Quotes for US-Made Parts",
    description: "FDM · SLS · SLA · 5-axis CNC. US supplier network. Locked-price quotes.",
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

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Preconnect + DNS-prefetch to reduce TTFB on third-party fetches */}
        <link rel="preconnect" href="https://api.stripe.com" />
        <link rel="preconnect" href="https://js.stripe.com" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.resend.com" />
        <link rel="alternate" type="application/rss+xml" title="3DBuildBot Blog" href="/blog/rss.xml" />
        <link rel="alternate" type="application/rss+xml" title="3DBuildBot Guides" href="/guides/rss.xml" />
        <JsonLdOrg />
      </head>
      <body>
        <SkipToContent />
        <Nav />
        <main id="main-content" className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
        <LiveChat />
        <CookieBanner />
        <ScrollToTop />
        <AnalyticsGated />
      </body>
    </html>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (clerkConfigured) {
    return (
      <ClerkProvider appearance={{ variables: { colorPrimary: "#3b82f6" } }}>
        <Shell>{children}</Shell>
      </ClerkProvider>
    );
  }
  // Clerk not configured yet — render without provider. Legacy /login + /signup
  // remain functional via the existing bcrypt/JWT flow.
  return <Shell>{children}</Shell>;
}
