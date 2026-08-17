import type { MetadataRoute } from "next";

const BASE = "https://www.3dbuildbot.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/pricing",
    "/about",
    "/contact",
    "/for-education",
    "/api-docs",
    "/itar-workspace",
    "/quote",
    "/login",
    "/signup",
    "/terms",
    "/privacy",
    "/refund",
    "/materials",
    "/processes",
    "/industries",
    "/guides",
    "/glossary",
    "/certifications",
  ];
  return pages.map((p) => ({ url: `${BASE}${p}`, lastModified: new Date(), changeFrequency: "weekly", priority: p === "/" ? 1 : 0.6 }));
}
