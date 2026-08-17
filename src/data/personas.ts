// Prototyper persona pages — each represents a distinct buyer we serve.
// Generates one landing page per persona with hyper-specific copy.

export interface Persona {
  slug: string;
  name: string;
  tagline: string;
  audience: string;
  hero: string;
  painPoints: string[];
  useCases: { title: string; body: string }[];
  processes: string[];
  materials: string[];
  socialProof?: string;
  pricingHook: string;
  cta: string;
}

export const PERSONAS: Persona[] = [
  {
    slug: "hardware-startups",
    name: "Hardware startups",
    tagline: "Pre-seed to Series A hardware companies that ship parts weekly",
    audience: "Founders + first eng hires at hardware startups",
    hero: "You're 3 people in a garage or 12 in a warehouse. You don't have a supply chain team. You need a bracket revision by Friday and you refuse to email another vendor about lead times. That's exactly the flow 3DBuildBot was built for.",
    painPoints: [
      "No manufacturing engineer on the team yet",
      "Every supplier email takes 3 days to get a quote",
      "Xometry quotes creep up after order",
      "Enterprise suppliers won't take single-part orders",
      "Chinese suppliers = 3 weeks, tariff surprises, quality variance",
    ],
    useCases: [
      { title: "Sensor mounts + PCB standoffs", body: "SLS PA12 or FDM PC — quote and ship in the same week." },
      { title: "Custom brackets for early prototypes", body: "5-axis CNC aluminum from $120, ready in a week." },
      { title: "Enclosure iterations", body: "FDM PC or SLA tough resin — rev A Monday, rev B Friday." },
      { title: "Motor mounts for drone / robotics prototypes", body: "PA-CF carbon-fiber nylon for stiffness at low weight." },
    ],
    processes: ["FDM", "SLS", "SLA", "5-Axis CNC"],
    materials: ["PC", "PA12", "PA-CF", "Al 6061", "Al 7075"],
    socialProof: "Trusted by early-stage teams at Rivian, Anduril, Formlabs, Relativity",
    pricingHook: "Starter parts from $18. No MOQ.",
    cta: "Start your first prototype",
  },
  {
    slug: "students",
    name: "Engineering students",
    tagline: "Capstone, Formula SAE, Solar Car, Rocketry, robotics teams",
    audience: "Undergraduate + graduate engineering students",
    hero: "You have $200 in team budget, a capstone due in 6 weeks, and a bracket that needs to survive 5g. 3DBuildBot verified .edu accounts get $50 in free credit + 25% off the first order — usually enough to print your first draft for free.",
    painPoints: [
      "Team budgets are always underfunded",
      "Faculty machine shop has a 3-week queue",
      "Formula SAE + rocketry teams need aerospace materials at student prices",
      "First-time CAD → real-part conversion is intimidating",
    ],
    useCases: [
      { title: "Formula SAE steering brackets", body: "5-axis CNC Al 7075, DFARS-compliant material, in your budget." },
      { title: "Solar car body panels", body: "FDM carbon-fiber nylon or SLS PA-CF — light, stiff, cheap." },
      { title: "Rocketry fin cans + motor mounts", body: "SLS PA12 nylon, high-temp SLA resin, or DMLS metal for high-power rocketry." },
      { title: "Robotics chassis + end effectors", body: "SLS PA-CF for gripper stiffness, machined aluminum for frame." },
      { title: "Capstone senior design projects", body: "One-off custom parts, quoted and shipped in the same week." },
    ],
    processes: ["FDM", "SLS", "SLA", "5-Axis CNC"],
    materials: ["PLA", "PA12", "PA-CF", "Al 6061", "Al 7075"],
    socialProof: "Verified .edu email = $50 credit + 25% off first order",
    pricingHook: "Free credit unlocks most students' first prototype at $0",
    cta: "Verify your .edu account",
  },
  {
    slug: "indie-makers",
    name: "Indie makers + creators",
    tagline: "Personal projects, cosplay, YouTube builds, one-off custom parts",
    audience: "Solo makers, DIYers, hobbyists, YouTube creators",
    hero: "You're making a thing. Maybe it's a cosplay prop, a tool for your workshop, a replacement for a broken appliance part, or something you want to sell on Etsy. You don't need a factory — you need one good part, printed on real industrial machines, shipped in a week.",
    painPoints: [
      "Your Prusa can't print engineering materials",
      "Local 3D printing services charge $200 minimums",
      "Etsy sellers of custom parts have inconsistent quality",
      "You want to prototype before committing to a mold",
    ],
    useCases: [
      { title: "Cosplay props + LARP gear", body: "FDM PC or SLA for high-detail parts with paintable surfaces." },
      { title: "Custom tools + fixtures", body: "PA-CF nylon for strength, PA12 for standard use." },
      { title: "Replacement household parts", body: "Upload photos → Gemini reverse-engineers a STEP → we print it. Broken dishwasher latches, obsolete fridge handles." },
      { title: "Etsy / craft business prototypes", body: "Test one design before ordering 100 for your shop." },
    ],
    processes: ["FDM", "SLA", "SLS"],
    materials: ["PLA", "PC", "PA12", "TPU", "Clear resin"],
    pricingHook: "FDM PLA from $18. SLA from $22. Ships in 2 days.",
    cta: "Print your one-off part",
  },
  {
    slug: "hardware-founders",
    name: "First-time hardware founders",
    tagline: "Software founders getting into hardware for the first time",
    audience: "Founders new to physical products",
    hero: "You built software your whole career. Now you're building a physical thing. You don't know what SLS means. You don't know what tolerance to spec. You just need a part that works. Our AI DFM catches everything your junior CAD self would miss.",
    painPoints: [
      "Don't know process to pick",
      "Don't know material to pick",
      "Don't know what tolerances to spec",
      "Terrified of ordering the wrong thing",
    ],
    useCases: [
      { title: "AI Material Selection Wizard", body: "6 questions about your use case → top 3 materials ranked by Gemini." },
      { title: "AI DFM catches issues", body: "Thin walls, tool-access, warp risk — flagged before you hit Order." },
      { title: "Human engineer 30-min consult", body: "For $150 you can just talk to a real MFG engineer. No sales script." },
    ],
    processes: ["FDM", "SLS", "SLA", "MJF", "5-Axis CNC"],
    materials: ["All 20"],
    pricingHook: "$150 human consult if you want it. $0 for AI-guided flow.",
    cta: "Try the material wizard",
  },
  {
    slug: "yc-companies",
    name: "YC + accelerator hardware companies",
    tagline: "YC, Techstars, Founders Fund portfolio companies building hardware",
    audience: "Batch companies in YC / a16z / Founders Fund / etc.",
    hero: "You're in an 8- or 12-week batch. Your MVP has to work by demo day. Every day spent waiting on a quote is a day you're not iterating. We're the fastest way to prototype without hiring a supplier.",
    painPoints: [
      "8 weeks to demo day and no supplier relationship yet",
      "Every day is precious",
      "Batch companies get zero patience from enterprise-focused vendors",
      "Need to move fast, then scale fast",
    ],
    useCases: [
      { title: "Full-cycle MVP hardware in 8 weeks", body: "Rev A → Rev D in a batch. Weekly iteration cadence." },
      { title: "Demo-day-ready polished parts", body: "SLA for hero shots, machined aluminum for functional demos." },
      { title: "First 100 units for early customers", body: "SLS/MJF bridge production while you finalize injection molding." },
    ],
    processes: ["FDM", "SLS", "SLA", "MJF", "5-Axis CNC"],
    materials: ["PA12", "PA-CF", "Al 6061", "Clear resin", "Tough resin"],
    pricingHook: "Free tier for the whole batch. Upgrade to Business only when you're funded.",
    cta: "Get started for the batch",
  },
  {
    slug: "product-designers",
    name: "Product designers + agencies",
    tagline: "Industrial design studios, agencies, freelance PDs",
    audience: "Product designers, industrial designers, design agencies",
    hero: "Your renders look amazing. Now you need a physical model that looks just as good — for the pitch, the client review, the user test, or the hero photo. SLA clear resin from $22. MJF grey nylon that photographs like injection-molded. Ship in 2–5 days.",
    painPoints: [
      "Physical models sell design work — but taking a week to get one kills momentum",
      "SLS parts always look rough in photos without post-processing",
      "Clear parts need optical polish",
      "Multi-part assemblies need to fit together on first try",
    ],
    useCases: [
      { title: "Pitch-deck hero models", body: "SLA clear or high-detail resin, polished. Photographs like production." },
      { title: "User testing dimensional models", body: "FDM PC or MJF PA12 — functional at fraction of tooling cost." },
      { title: "Multi-part assembly proofs", body: "5 processes in one PO — mix and match materials per subassembly." },
    ],
    processes: ["SLA", "MJF", "SLS", "5-Axis CNC"],
    materials: ["Clear resin", "PA12", "Al 6061", "Delrin"],
    pricingHook: "SLA from $22. Bead-blast, vapor-smooth, dye — all one-click add-ons.",
    cta: "Model your next pitch",
  },
];

export const getPersonaBySlug = (slug: string) => PERSONAS.find((p) => p.slug === slug);
export const getAllPersonaSlugs = () => PERSONAS.map((p) => p.slug);
