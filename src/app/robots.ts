import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow major search engines everything
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "Slurp", allow: "/" }, // Yahoo
      // Block gated app + admin surfaces from indexing
      { userAgent: "*", allow: "/", disallow: ["/dashboard/", "/admin/", "/partner/", "/api/", "/nda/", "/q/", "/promo/", "/traceability/", "/invites/", "/procurement/session/"] },
      // Block noisy AI training scrapers — allow legit search but not bulk model training
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" }, // opt out of Bard training while keeping Google Search
      { userAgent: "PerplexityBot", disallow: "/" },
      { userAgent: "Amazonbot", disallow: "/" },
    ],
    sitemap: "https://www.3dbuildbot.com/sitemap.xml",
    host: "https://www.3dbuildbot.com",
  };
}
