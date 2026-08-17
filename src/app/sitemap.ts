import type { MetadataRoute } from "next";
import { MATERIALS } from "@/data/materials";
import { PROCESSES } from "@/data/processes";
import { INDUSTRIES } from "@/data/industries";
import { COMPETITORS } from "@/data/competitors";
import { CERTIFICATIONS } from "@/data/certifications";
import { GUIDES } from "@/data/guides";
import { GLOSSARY } from "@/data/glossary";
import { STATES } from "@/data/states";
import { CITIES } from "@/data/cities";
import { SCHOOLS_LARGE } from "@/data/schools-large";
import { MACHINES } from "@/data/machines";
import { PERSONAS } from "@/data/personas";
import { SOLVERS } from "@/data/solvers";
import { STANDARD_PARTS, getAllPartCategories } from "@/data/standard-parts";

const BASE = "https://www.3dbuildbot.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/for-education`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/api-docs`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/itar-workspace`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/quote`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/integrations`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/design-essentials`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/tools/tolerance-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/tools/cost-estimator`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/tools/material-wizard`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/tools/reverse-engineer`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/capacity`, lastModified: now, changeFrequency: "hourly", priority: 0.6 },
    { url: `${BASE}/puzzles`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/education/universities`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/book-a-call`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Materials
  for (const m of MATERIALS) urls.push({ url: `${BASE}/materials/${m.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });

  // Processes + process×material combos
  for (const p of PROCESSES) {
    urls.push({ url: `${BASE}/processes/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 });
    for (const m of MATERIALS) {
      if (m.processes.includes(p.code)) urls.push({ url: `${BASE}/processes/${p.slug}/${m.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
    }
  }

  // Industries
  for (const i of INDUSTRIES) urls.push({ url: `${BASE}/industries/${i.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });

  // Comparisons
  for (const c of COMPETITORS) urls.push({ url: `${BASE}/compare/${c.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });

  // Certifications
  for (const c of CERTIFICATIONS) urls.push({ url: `${BASE}/certifications/${c.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });

  // Guides
  for (const g of GUIDES) urls.push({ url: `${BASE}/guides/${g.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });

  // Glossary
  for (const t of GLOSSARY) urls.push({ url: `${BASE}/glossary/${t.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });

  // States + cities
  for (const s of STATES) urls.push({ url: `${BASE}/locations/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  for (const c of CITIES) urls.push({ url: `${BASE}/locations/${c.stateSlug}/${c.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });

  // Universities
  for (const u of SCHOOLS_LARGE) {
    if (u.type === "university" || u.type === "college") urls.push({ url: `${BASE}/education/university/${u.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
  }

  // Partner recruitment SEO
  urls.push({ url: `${BASE}/for-shops`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
  urls.push({ url: `${BASE}/for-shops/apply`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  urls.push({ url: `${BASE}/for-shops/vs-xometry`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  for (const s of STATES) urls.push({ url: `${BASE}/for-shops/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  for (const m of MACHINES) urls.push({ url: `${BASE}/for-shops/machine/${m.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });

  // Prototyper / creator persona SEO
  urls.push({ url: `${BASE}/for-prototypers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
  for (const p of PERSONAS) urls.push({ url: `${BASE}/for-prototypers/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });

  // Engineering solvers
  urls.push({ url: `${BASE}/tools/solvers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  for (const s of SOLVERS) urls.push({ url: `${BASE}/tools/solvers/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });

  // Standard parts library
  urls.push({ url: `${BASE}/parts`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  for (const cat of getAllPartCategories()) urls.push({ url: `${BASE}/parts/${cat}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  for (const p of STANDARD_PARTS) urls.push({ url: `${BASE}/parts/${p.category}/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });

  return urls;
}
