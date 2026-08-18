export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: "dfm" | "materials" | "tolerances" | "post-processing" | "cost" | "certifications";
  readTime: string;
  updated: string;
  sections: { heading: string; body: string }[];
  relatedGuides?: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: "designing-for-sls-3d-printing",
    title: "Designing for SLS 3D Printing: A Complete DFM Guide",
    description: "Wall thickness, escape holes, feature resolution, and the design rules that separate a $12 SLS part from a $120 one.",
    category: "dfm",
    readTime: "9 min",
    updated: "2026-08-15",
    sections: [
      { heading: "How SLS actually works", body: "Selective Laser Sintering fuses polymer powder (typically PA11 or PA12 nylon) layer by layer using a CO₂ laser scanning across a heated build chamber. Because the un-fused powder supports the part throughout the build, SLS uniquely handles complex geometry — interior cavities, snap-fits, lattice structures, and living hinges — without any secondary support material to remove." },
      { heading: "Wall thickness", body: "Minimum walls are 0.7mm for PA12 and 0.8mm for PA11 or PA-CF. Below that, the laser can't reliably fuse a coherent wall through the layer height. For structural walls carrying load, target 1.5–2.0mm. Ribbing pattern on wider spans reduces mass without losing stiffness." },
      { heading: "Escape holes for hollow parts", body: "SLS's biggest advantage — self-supporting powder inside cavities — is also its biggest gotcha. Un-fused powder trapped inside a sealed hollow will not come out. Design at least two escape holes per cavity, minimum 5mm diameter. Larger is better if aesthetic constraints allow." },
      { heading: "Feature resolution and tolerance", body: "Achievable tolerance is ±0.30mm on features under 100mm, degrading to ±0.5% on larger dimensions. Minimum feature detail is roughly 0.5mm (embossed text, small holes). Threads should be M4 or larger; below that, use a threaded insert or tapping post-print." },
      { heading: "Living hinges and snap-fits", body: "SLS shines here. PA11 (more ductile) handles repeated flexing better than PA12; expect 500+ cycles on well-designed PA11 hinges. Snap-fit beam thickness typically 1.5–2× wall thickness; keep the beam flex angle under 3° for durability." },
      { heading: "Orientation and cost", body: "SLS pricing is dominated by part volume in the build chamber (which drives energy + powder use) and build height (which drives time). Nesting many parts per build lowers per-part cost dramatically — one reason SLS shines at 50–1,000 part runs. Design for orientation-agnostic geometry when possible." },
      { heading: "Post-processing options", body: "Standard finish is bead-blasted matte grey. Options: vapor smoothing (near-injection-molded surface), dyeing (black, red, blue), sealing for watertightness, and coloring pigments. Machined post-features (threads, precision holes) are common." },
    ],
    relatedGuides: ["designing-for-fdm-3d-printing", "designing-for-cnc-machining", "sls-vs-mjf-comparison"],
  },
  {
    slug: "designing-for-fdm-3d-printing",
    title: "Designing for FDM 3D Printing: Wall Thickness, Overhangs, and Layer Adhesion",
    description: "How to get FDM parts that survive the intended use case — and how to avoid the layer-line failure modes most engineers underestimate.",
    category: "dfm",
    readTime: "7 min",
    updated: "2026-08-14",
    sections: [
      { heading: "The anisotropy problem", body: "FDM parts are ~30–40% weaker in the Z-axis (perpendicular to layer lines) than they are in-plane. Design load-bearing features to align with the print plane. When that's not possible, use higher-strength thermoplastics (PC, PA-CF) that partially compensate through better inter-layer bonding." },
      { heading: "Wall thickness by material", body: "Minimums: PLA 1.0mm, ABS 1.2mm, PC 1.0mm, PA-CF 0.8mm. For structural walls, target 2.0–3.0mm. Nozzle diameter (typically 0.4mm) dictates minimum feature size — sub-0.4mm features get skipped." },
      { heading: "Overhangs and support", body: "Overhangs greater than 45° from vertical require support material, which leaves witness marks after removal. Design chamfers and fillets to keep overhangs under 45° where possible. Bridges up to 5mm print unsupported reliably; longer bridges sag." },
      { heading: "Infill and rigidity", body: "20% gyroid infill is the default for most parts and delivers 60–70% of solid-part stiffness at 20% of the material cost. Load-bearing structural parts warrant 50–100% infill in specific reinforced zones — most slicers now support variable infill." },
      { heading: "Layer height tradeoffs", body: "0.2mm layer height is the FDM default — good balance of speed and surface finish. 0.1mm doubles print time for noticeably smoother surfaces (worth it for aesthetic parts). 0.3mm halves print time for structural parts where surface finish doesn't matter." },
    ],
    relatedGuides: ["designing-for-sls-3d-printing", "fdm-material-selection-guide"],
  },
  {
    slug: "designing-for-cnc-machining",
    title: "Designing for 5-Axis CNC Machining: Corner Radii, Tool Access, and Setup Reduction",
    description: "The design decisions that make the difference between a $200 CNC part and a $2,000 one — often without the customer knowing.",
    category: "dfm",
    readTime: "8 min",
    updated: "2026-08-15",
    sections: [
      { heading: "Internal corner radii", body: "CNC end mills leave a corner radius equal to their radius — you cannot machine a true sharp internal corner. Design internal corners with a radius equal to or greater than the largest end mill that will fit the feature. Typical: R2mm minimum for pocket corners." },
      { heading: "Feature accessibility", body: "5-axis machining reaches most features in one setup, but blind pockets, deep undercuts, and features on opposite faces still add setup complexity and cost. Design features accessible from a single primary orientation when possible." },
      { heading: "Threading and tapping", body: "Tapped threads are cheaper than machined threads for M4 and larger. For high-strength or high-cycle threading, specify a Heli-Coil or Timesert insert instead of tapping soft materials directly. Callout depth = 1.5× diameter minimum." },
      { heading: "Tolerance callouts", body: "Default machining tolerance is ±0.125mm. Callouts tighter than ±0.05mm add cost proportionally (each tenth of a mm below default roughly doubles the cost of that feature). Reserve tight tolerances for interfaces that need them." },
      { heading: "Material selection for cost", body: "Aluminum 6061 is 4–8× faster to machine than titanium and 2–3× faster than stainless. If mechanical properties allow, 6061 is nearly always the right first choice. Only step up to 7075 for load or Ti/SS for corrosion, thermal, or biocompat reasons." },
      { heading: "Setup reduction", body: "A part machinable in one setup is ~2–3× cheaper than one requiring flipping. When possible, design so the entire feature set is accessible from a single orientation on our 5-axis machines." },
    ],
    relatedGuides: ["material-selection-cnc", "cnc-tolerances-guide"],
  },
  {
    slug: "sls-vs-mjf-comparison",
    title: "SLS vs MJF: Which Nylon Process Should You Choose?",
    description: "Both make production-grade nylon parts. Here's how to pick based on part geometry, quantity, finish, and lead time.",
    category: "materials",
    readTime: "6 min",
    updated: "2026-08-13",
    sections: [
      { heading: "How they differ", body: "SLS uses a scanning CO₂ laser to fuse powder point-by-point. MJF (HP's Multi Jet Fusion) prints fusing and detailing agents onto the powder bed, then bulk-heats the whole layer to fuse selectively. MJF is faster per layer; SLS handles a wider material range." },
      { heading: "Mechanical properties", body: "MJF parts have slightly more isotropic strength (~5–10% closer to Z-axis parity) and marginally better feature detail. For most engineering applications, mechanical differences are negligible — pick based on other factors." },
      { heading: "Surface finish", body: "Both print with a matte grainy finish requiring bead-blasting. MJF's native color is dark grey; SLS is natural white/tan. For dyed-black parts, MJF has a slight edge (starts closer to black). For custom colors, SLS accepts dye better." },
      { heading: "Cost and lead time", body: "MJF is ~10–20% cheaper on high-volume runs (50+ parts) due to faster build times. SLS is cheaper on prototyping quantities (1–10 parts) due to lower minimum charges. Lead time is typically identical: 3–5 business days for both." },
      { heading: "When to choose SLS", body: "Choose SLS for: prototyping (1–20 parts), PA11 (SLS-exclusive), TPU flexible parts, glass-filled or carbon-filled nylons, dyed non-black colors." },
      { heading: "When to choose MJF", body: "Choose MJF for: production batches (50–5000 parts), consistent black or grey finish, marginally better feature detail, marginally more isotropic mechanical properties." },
    ],
    relatedGuides: ["designing-for-sls-3d-printing", "pa12-vs-pa11-nylon"],
  },
  {
    slug: "cnc-tolerances-guide",
    title: "CNC Machining Tolerances: What's Achievable, What's Standard, What's Expensive",
    description: "A published tolerance table and the design guidance to keep parts affordable without over-specifying.",
    category: "tolerances",
    readTime: "5 min",
    updated: "2026-08-15",
    sections: [
      { heading: "Standard tolerance", body: "3DBuildBot's default 5-axis machining tolerance is ±0.025mm (±0.001″) on features up to 100mm. This is achievable on aluminum, stainless, and titanium with no callout adjustment or cost premium." },
      { heading: "Feature-by-feature callouts", body: "Bore diameter (H7 fit): ±0.013mm. External features (h6): ±0.013mm. Position tolerance: ±0.05mm. Flatness on machined surfaces up to 100mm: 0.025mm. Surface finish (Ra): 1.6μm standard, 0.4μm on request." },
      { heading: "When to tighten tolerances", body: "Tighten tolerances only for interfaces — press-fits, bearing races, mating features. For everything else, the standard tolerance is more than enough. Overspecifying tolerances is the #1 cost driver in CNC quotes." },
      { heading: "GD&T on drawings", body: "For inspection-critical features, include a GD&T drawing with your CAD upload. Our engineers will match the callouts and, if you request, deliver a first-article inspection report with each shipment." },
    ],
    relatedGuides: ["designing-for-cnc-machining", "material-selection-cnc"],
  },
  {
    slug: "pa12-vs-pa11-nylon",
    title: "PA12 vs PA11 Nylon: Choose the Right SLS Material",
    description: "PA12 is the default; PA11 is the flex-part specialist. Here's when the price premium pays off.",
    category: "materials",
    readTime: "4 min",
    updated: "2026-08-13",
    sections: [
      { heading: "PA12: the default", body: "PA12 is petroleum-derived, isotropic, chemical-resistant, and dimensionally stable. Handles snap-fits, threaded features, and enclosures that live in the field. Costs ~30% less than PA11." },
      { heading: "PA11: the ductile alternative", body: "PA11 is bio-derived (castor oil) with ~2× the elongation-at-break of PA12. This makes it the right choice for parts that flex repeatedly (living hinges, clips, snap fasteners), impact-critical parts, and skin-contact applications requiring biocompatibility." },
      { heading: "Cost comparison", body: "PA12: ~$0.75/cm³. PA11: ~$1.10/cm³. For most parts, PA12 is the right choice. Only go to PA11 when the ductility, biocompat, or environmental (bio-derived) requirements specifically demand it." },
    ],
    relatedGuides: ["sls-vs-mjf-comparison", "designing-for-sls-3d-printing"],
  },
  {
    slug: "material-selection-cnc",
    title: "CNC Material Selection: A Decision Tree",
    description: "Aluminum, stainless, titanium, brass, PEEK, Delrin — how to choose and what it'll cost you.",
    category: "materials",
    readTime: "6 min",
    updated: "2026-08-14",
    sections: [
      { heading: "Start with aluminum 6061", body: "Al 6061 is the default machining material — cheap, fast to machine, corrosion-resistant, anodize-friendly. Cover 80% of general-purpose parts with 6061 unless a specific requirement drives you elsewhere." },
      { heading: "Aluminum 7075 for high-strength", body: "7075-T6 has ~2× the tensile strength of 6061 at slightly higher weight and 2× the material cost. Use for aerospace structural components, motorsport, and high-load brackets. Not weldable." },
      { heading: "Stainless 303 for corrosion + speed", body: "303 is the free-machining austenitic stainless — 2× faster to machine than 316L. Corrosion-resistant enough for most non-marine applications. Use for shafts, fittings, general corrosion-resistant hardware." },
      { heading: "Stainless 316L for medical + marine", body: "316L adds molybdenum for chloride/pitting resistance and biocompatibility. Use for medical implants and instruments, marine hardware, chemical process equipment. Costs ~30% more than 303." },
      { heading: "Titanium Ti-6Al-4V for weight-critical + biocompat", body: "Ti Grade 5 has ~1/2 the density of steel with steel-adjacent strength. Biocompatible. ITAR-eligible for defense work. Expensive: ~7× aluminum on material, plus slower machining." },
      { heading: "PEEK for extreme thermal + chemical", body: "PEEK is the highest-performance machinable thermoplastic — 250°C continuous service, chemical-resistant, biocompatible. ~5× the cost of Delrin. Reserve for aerospace, medical, and oil-and-gas applications that need it." },
      { heading: "Delrin for gears and low-friction parts", body: "POM-C (Delrin) is the self-lubricating engineering plastic. Excellent for gears, bushings, precision sliders. Cheap and fast to machine." },
    ],
    relatedGuides: ["designing-for-cnc-machining", "cnc-tolerances-guide"],
  },
  {
    slug: "fdm-material-selection-guide",
    title: "FDM Material Selection: PLA, ABS, PC, and Carbon-Fiber Nylon",
    description: "The four materials that cover 90% of FDM use cases and how to pick between them.",
    category: "materials",
    readTime: "5 min",
    updated: "2026-08-12",
    sections: [
      { heading: "PLA: concept models only", body: "PLA is dimensionally stable at room temperature, prints beautifully, and is bio-derived. But glass transition at 60°C means anything left in a hot car warps. Use for concept models, fixtures, and non-load-bearing housings only." },
      { heading: "ABS: the workhorse", body: "ABS is impact-resistant, stable to 100°C, and can be acetone-vapor-smoothed for a near-injection-molded surface. The default engineering thermoplastic. Warps on large flat parts without a heated chamber." },
      { heading: "Polycarbonate: transparent + tough", body: "PC is one of the toughest engineering plastics — optically clear or opaque, stable to 145°C, excellent impact strength. Ideal for enclosures that must survive drops, thermal cycling, or transparent-window applications." },
      { heading: "Carbon-fiber nylon (PA-CF): metal-adjacent stiffness", body: "PA-CF combines nylon's toughness with fiber-boosted stiffness and dimensional stability. Preferred for robotics end-effectors, drone frames, and jigs that need aluminum-adjacent stiffness at a fraction of the weight. ~5× the cost of PLA." },
    ],
    relatedGuides: ["designing-for-fdm-3d-printing", "sls-vs-mjf-comparison"],
  },
  {
    slug: "surface-finishes-explained",
    title: "Surface Finish Options: Anodize, Powder Coat, Bead Blast, and Vapor Smoothing",
    description: "The finishes we offer, when to use them, and what they cost per part.",
    category: "post-processing",
    readTime: "6 min",
    updated: "2026-08-12",
    sections: [
      { heading: "Anodize Type II (color)", body: "Standard decorative anodize for aluminum. Available in black, clear, red, blue, gold, and custom colors on request. Adds 0.005–0.020mm to feature dimensions — call this out for tight-tolerance features. Cost: +$3–$8 per part depending on volume." },
      { heading: "Anodize Type III (hardcoat)", body: "Wear-resistant hardcoat anodize for aluminum, typically 0.025–0.075mm thick. Increases surface hardness to Rc60+. Available in natural (grey/olive) or black. Use for high-wear surfaces, sliding interfaces, and defense hardware. Cost: +$8–$20." },
      { heading: "Alodine (chem-film)", body: "Chromate conversion coating that provides corrosion resistance without insulating the surface — critical for grounded aerospace electrical assemblies. Doesn't affect dimensions. Available in clear or yellow (mil-spec)." },
      { heading: "Bead blast", body: "Uniform matte finish, common on SLS/MJF nylon and CNC-machined parts. Removes machining witness marks and prepares surfaces for painting or coating. Standard on all SLS/MJF orders." },
      { heading: "Powder coat", body: "Durable colored finish for aluminum or steel parts. Available in every RAL color plus custom matches. Cost: +$5–$15 per part depending on size and color." },
      { heading: "Vapor smoothing (SLS/MJF)", body: "Chemical vapor process that melts the surface of nylon parts, producing a near-injection-molded surface finish. Watertight, paintable, and eliminates the grainy powder-bed finish. Cost: +$4–$12 per part." },
    ],
    relatedGuides: ["designing-for-sls-3d-printing", "material-selection-cnc"],
  },
  {
    slug: "understanding-lead-times",
    title: "Understanding Manufacturing Lead Times",
    description: "How we calculate lead time and what actually drives your part from quote to shipped.",
    category: "cost",
    readTime: "4 min",
    updated: "2026-08-10",
    sections: [
      { heading: "Standard lead times by process", body: "FDM: 2–4 business days. SLA: 2–4 days. SLS/MJF: 3–5 days. 5-Axis CNC: 5–7 days. DMLS metal 3DP: 5–10 days. Add 1–2 days for post-processing steps (anodize, powder coat, vapor smooth)." },
      { heading: "What drives longer lead times", body: "Complex 5-axis geometry requiring multiple setups. Heat-treat or anodize post-processing. Full first-article inspection (FAI) reports. AS9102 documentation packages. Rush-hour material sourcing (Inconel, Ti Grade 23)." },
      { heading: "Rush options", body: "1-day expedite: +50% surcharge. 2-day expedite: +30%. Weekend production: +$99 flat. Available on FDM, SLA, SLS, MJF for parts fitting standard capacity." },
      { heading: "Economy tier", body: "10% discount on quote in exchange for ~2× standard lead time. Available on non-time-critical prototyping runs. Choose at quote time." },
    ],
    relatedGuides: ["designing-for-cnc-machining", "surface-finishes-explained"],
  },
];

import { GUIDES_MORE } from "./guides-more";
import { GUIDES_MORE2 } from "./guides-more2";

export const ALL_GUIDES: Guide[] = [...GUIDES, ...GUIDES_MORE, ...GUIDES_MORE2];

export const getGuideBySlug = (slug: string) => ALL_GUIDES.find((g) => g.slug === slug);
export const getAllGuideSlugs = () => ALL_GUIDES.map((g) => g.slug);
export const getGuidesByCategory = (category: Guide["category"]) => ALL_GUIDES.filter((g) => g.category === category);
