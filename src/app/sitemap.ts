import type { MetadataRoute } from "next";
import { MATERIALS } from "@/data/materials";
import { PROCESSES } from "@/data/processes";
import { INDUSTRIES } from "@/data/industries";
import { COMPETITORS } from "@/data/competitors";
import { CERTIFICATIONS } from "@/data/certifications";
import { ALL_GUIDES as GUIDES } from "@/data/guides";
import { GLOSSARY } from "@/data/glossary";
import { STATES } from "@/data/states";
import { CITIES } from "@/data/cities";
import { SCHOOLS_LARGE } from "@/data/schools-large";
import { MACHINES } from "@/data/machines";
import { PERSONAS } from "@/data/personas";
import { SOLVERS } from "@/data/solvers";
import { STANDARD_PARTS, getAllPartCategories } from "@/data/standard-parts";
import { ALL_PUZZLES as PUZZLES } from "@/data/puzzles";
import { ALL_BLOG_POSTS as BLOG_POSTS } from "@/data/blog";
import { INTERNATIONAL_CITIES, getIntlCountries } from "@/data/cities-international";
import { caseStudies } from "@/data/case-studies";
import { FAQ_TOPICS } from "@/data/faq-topics";
import { PRINTABLES } from "@/data/printables";

const STATIC_EXTRAS = ["/faq", "/status", "/careers", "/press", "/search", "/changelog", "/security"];

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

  // Universities + colleges + community colleges
  for (const u of SCHOOLS_LARGE) {
    if (u.type === "university" || u.type === "college" || u.type === "community-college") urls.push({ url: `${BASE}/education/university/${u.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
    if (u.type === "high-school") urls.push({ url: `${BASE}/education/high-school/${u.stateAbbr.toLowerCase()}/${u.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.4 });
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

  // Puzzles
  for (const p of PUZZLES) urls.push({ url: `${BASE}/puzzles/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });

  // Blog
  urls.push({ url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  for (const p of BLOG_POSTS) urls.push({ url: `${BASE}/blog/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });

  // International locations (500+ cities, 40+ countries)
  urls.push({ url: `${BASE}/international`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  for (const country of getIntlCountries()) urls.push({ url: `${BASE}/international/${country}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  for (const c of INTERNATIONAL_CITIES) urls.push({ url: `${BASE}/international/${c.countrySlug}/${c.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });

  // Round 1 SEO combos — Industry × State (306), Material × Industry (120),
  // City × Process (497×5=2,485), International City × Process (499×5=2,495),
  // Material vs Material (20×19/2=190) = ~5,600 new pages
  for (const i of INDUSTRIES) for (const s of STATES) urls.push({ url: `${BASE}/industries/${i.slug}/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.55 });
  for (const m of MATERIALS) for (const i of INDUSTRIES) urls.push({ url: `${BASE}/materials/${m.slug}/for/${i.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
  for (const c of CITIES) for (const p of PROCESSES) urls.push({ url: `${BASE}/locations/${c.stateSlug}/${c.slug}/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.45 });
  for (const c of INTERNATIONAL_CITIES) for (const p of PROCESSES) urls.push({ url: `${BASE}/international/${c.countrySlug}/${c.slug}/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.45 });
  for (let i = 0; i < MATERIALS.length; i++) for (let j = i + 1; j < MATERIALS.length; j++) urls.push({ url: `${BASE}/materials/vs/${MATERIALS[i].slug}/${MATERIALS[j].slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });

  // Round 2 combos — Process×State (5×51=255), Machine×State (60×51=3060),
  // Process vs Process (5C2=10) = ~3,325 pages
  for (const p of PROCESSES) for (const s of STATES) urls.push({ url: `${BASE}/processes/${p.slug}/in/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
  for (const m of MACHINES) for (const s of STATES) urls.push({ url: `${BASE}/for-shops/machine/${m.slug}/in/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.4 });
  for (let i = 0; i < PROCESSES.length; i++) for (let j = i + 1; j < PROCESSES.length; j++) urls.push({ url: `${BASE}/processes/vs/${PROCESSES[i].slug}/${PROCESSES[j].slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.55 });

  // Certification × Industry combos (5 × 6 = 30)
  for (const c of CERTIFICATIONS) for (const i of INDUSTRIES) urls.push({ url: `${BASE}/certifications/${c.slug}/for/${i.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });

  // Free STL library
  urls.push({ url: `${BASE}/free-stl`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  for (const p of PRINTABLES) urls.push({ url: `${BASE}/free-stl/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.55 });

  // Ancillary landing pages
  urls.push({ url: `${BASE}/design-services`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  urls.push({ url: `${BASE}/for-resellers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  urls.push({ url: `${BASE}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.5 });
  urls.push({ url: `${BASE}/quote/custom`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });

  // FAQ topic pages (20)
  for (const t of FAQ_TOPICS) urls.push({ url: `${BASE}/faq/topic/${t.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.55 });

  // Case studies
  urls.push({ url: `${BASE}/case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  for (const cs of caseStudies) urls.push({ url: `${BASE}/case-studies/${cs.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });

  // Static extras added late (careers, press, faq, status, search)
  for (const path of STATIC_EXTRAS) urls.push({ url: `${BASE}${path}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });

  return urls;
}
