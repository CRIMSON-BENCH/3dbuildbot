import type { MaterialProcess } from "./materials";

export interface Process {
  slug: string;
  code: MaterialProcess;
  name: string;
  short: string;
  leadTimeDays: string;
  toleranceMm: string;
  layerMicron?: string;
  minFeatureMm: string;
  maxBuildMm: string;
  tagline?: string; // Short one-liner used on capability cards
  overview: string;
  bestFor: string[];
  limitations: string[];
  postProcess: string[];
  color: string;
}

export const PROCESSES: Process[] = [
  {
    slug: "fdm",
    code: "FDM",
    name: "FDM 3D Printing",
    short: "Fused Deposition Modeling",
    leadTimeDays: "2–4 days",
    toleranceMm: "±0.20 mm",
    layerMicron: "200 µm",
    minFeatureMm: "0.8 mm",
    maxBuildMm: "305 × 305 × 605 mm",
    tagline: "Fast, cost-effective prototypes and end-of-arm tooling in engineering thermoplastics like PC, PETG, and PA-CF.",
    color: "from-emerald-500/15 to-emerald-500/5",
    overview:
      "FDM extrudes molten thermoplastic through a nozzle layer by layer. The fastest, most economical 3D printing process for concept models, form-fit-function checks, and low-volume production of engineering thermoplastic parts (PC, PA-CF, ABS, ULTEM).",
    bestFor: ["Rapid concept models", "Large-format prototypes", "Robotics fixtures in engineering thermoplastics", "Cost-sensitive prototyping"],
    limitations: ["Visible layer lines", "Anisotropic strength (Z-axis weakest)", "Limited fine-feature resolution"],
    postProcess: ["Sanded", "Painted", "Vapor smoothed (ABS only)", "Machined post-print"],
  },
  {
    slug: "sls",
    code: "SLS",
    name: "SLS 3D Printing",
    short: "Selective Laser Sintering",
    leadTimeDays: "3–5 days",
    toleranceMm: "±0.30 mm",
    layerMicron: "100 µm",
    minFeatureMm: "0.7 mm",
    maxBuildMm: "365 × 365 × 460 mm",
    tagline: "Production-grade nylon parts with no support structures. Ideal for living hinges, lattices, and complex assemblies.",
    color: "from-amber-500/15 to-amber-500/5",
    overview:
      "SLS fuses nylon powder with a CO₂ laser, layer by layer, in a heated build chamber. Because parts are supported by unsintered powder, SLS handles complex geometries — interior cavities, lattices, snap-fits, living hinges — with production-grade PA11, PA12, and glass- or carbon-filled variants.",
    bestFor: ["Production-grade end-use parts", "Complex internal geometry", "Snap-fits and living hinges", "Small-batch bridge production"],
    limitations: ["Grainy surface finish (bead blast standard)", "Long lead time relative to FDM/SLA"],
    postProcess: ["Bead blasted (standard)", "Vapor smoothed", "Dyed (black, red, blue)", "Sealed for watertightness"],
  },
  {
    slug: "sla",
    code: "SLA",
    name: "SLA 3D Printing",
    short: "Stereolithography",
    leadTimeDays: "2–4 days",
    toleranceMm: "±0.15 mm",
    layerMicron: "50 µm",
    minFeatureMm: "0.4 mm",
    maxBuildMm: "335 × 200 × 300 mm",
    tagline: "Ultra-fine resolution photopolymer with injection-mold-grade surface finish for optics, fixtures, and master patterns.",
    color: "from-cyan-500/15 to-cyan-500/5",
    overview:
      "SLA cures liquid photopolymer resin with a UV laser or projector, layer by layer. The industry's finest surface finish and feature resolution — ideal for optical prototypes, dental / medical models, and any part where sub-100µm details matter.",
    bestFor: ["Optical prototypes and microfluidics", "Dental and medical models", "Injection-mold masters", "High-detail visual mockups"],
    limitations: ["Brittle under load", "UV degradation over time (yellows)", "Requires support removal + post-cure"],
    postProcess: ["Post-cured", "Sanded and polished", "Painted", "UV-stable coating"],
  },
  {
    slug: "mjf",
    code: "MJF",
    name: "MJF 3D Printing",
    short: "Multi Jet Fusion (HP)",
    leadTimeDays: "3–5 days",
    toleranceMm: "±0.30 mm",
    layerMicron: "80 µm",
    minFeatureMm: "0.5 mm",
    maxBuildMm: "380 × 285 × 380 mm",
    tagline: "HP's production-grade nylon process. Faster than SLS with better feature detail and near-isotropic mechanical properties.",
    color: "from-violet-500/15 to-violet-500/5",
    overview:
      "MJF jets fusing and detailing agents onto a nylon powder bed, then bulk-heats the layer to fuse selectively. Faster than SLS with better feature detail and more isotropic mechanical properties. HP's process is the go-to for production nylon parts at volume.",
    bestFor: ["Production nylon end-use parts", "High-throughput small-batch runs", "Complex geometries with tight tolerances", "Grey / dyeable finish"],
    limitations: ["Native color is grey (dye required for other colors)", "Same grainy finish as SLS unless smoothed"],
    postProcess: ["Bead blasted", "Vapor smoothed", "Dyed black (standard)", "Sealed"],
  },
  {
    slug: "cnc-machining",
    code: "CNC-5",
    name: "5-Axis CNC Machining",
    short: "Precision subtractive machining",
    leadTimeDays: "5–7 days",
    toleranceMm: "±0.05 mm (ISO 2768-fH)",
    layerMicron: "±0.025 mm on request",
    minFeatureMm: "0.5 mm",
    maxBuildMm: "800 × 500 × 400 mm",
    tagline: "Subtractive precision for aluminum, steel, titanium, and engineering plastics — production-scale tolerances.",
    color: "from-slate-500/15 to-slate-500/5",
    overview:
      "3- and 5-axis CNC machining removes material from a solid billet using rotating cutters. Delivers the highest achievable precision (±0.025mm / ±0.001″), the widest material selection (aluminum, stainless, titanium, brass, copper, PEEK, Delrin), and the best surface finish available without secondary polishing. ITAR-registered US shop.",
    bestFor: ["Aerospace and defense structural parts (ITAR)", "High-precision metal components", "PEEK / Delrin machined mechanical parts", "Production-grade titanium and Inconel"],
    limitations: ["Higher cost than 3DP for simple shapes", "Feature access limited by tool reach", "Complex geometry may require multi-setup"],
    postProcess: ["Anodize (Type II or III)", "Alodine / passivation", "Bead blast", "Powder coat", "Laser marked serial"],
  },
];

export const getProcessBySlug = (slug: string) => PROCESSES.find((p) => p.slug === slug);
export const getAllProcessSlugs = () => PROCESSES.map((p) => p.slug);
