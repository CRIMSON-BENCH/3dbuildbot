export interface Industry {
  slug: string;
  name: string;
  tagline: string;
  hero: string;
  processes: string[];
  materials: string[];
  certs: string[];
  useCases: { title: string; body: string }[];
  color: string;
  namedCustomers?: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "aerospace-defense",
    name: "Aerospace & Defense",
    tagline: "ITAR-registered supply chain for the parts that fly and the parts that don't come home.",
    hero:
      "3DBuildBot's US-domiciled, ITAR-registered facility produces flight hardware, ground support equipment, and tooling for aerospace primes and defense startups. AS9100D quality management, DFARS-compliant metal traceability, and NIST 800-171-aligned data handling on every quote.",
    processes: ["5-Axis CNC", "SLS PA-CF Nylon", "DMLS Titanium", "SLA High-Temp"],
    materials: ["Aluminum 6061 / 7075", "Titanium Ti-6Al-4V", "Inconel 718", "Carbon-Fiber Nylon", "PEEK"],
    certs: ["ISO 9001:2015", "AS9100D", "ITAR-Registered", "DFARS-Compliant", "NIST 800-171"],
    color: "from-slate-800/25 to-slate-800/5",
    namedCustomers: ["Anduril", "Northrop Grumman"],
    useCases: [
      { title: "Flight-critical brackets", body: "5-axis machined Al 7075 and Ti-6Al-4V with FAI, material cert, and CoC on every order." },
      { title: "UAV / drone frames", body: "SLS carbon-fiber nylon airframes and fixtures with sub-week turn and dyed-black finish." },
      { title: "Ground support tooling", body: "Robust FDM and machined fixtures for satellite integration, missile assembly, and range operations." },
      { title: "Radar and antenna housings", body: "Polycarbonate SLA masters and DMLS metal cavities for phased-array and radome fabrication." },
    ],
  },
  {
    slug: "robotics",
    name: "Robotics",
    tagline: "End-effectors, chassis, and structural components printed and machined for the iteration cycle a hardware team actually needs.",
    hero:
      "Robotics teams iterate on grippers, wrist plates, mounting brackets, and full chassis every week. 3DBuildBot ships carbon-fiber nylon and machined aluminum parts in days, with pricing that scales from a single prototype to a low-volume production run.",
    processes: ["SLS PA-CF Nylon", "5-Axis CNC", "FDM Polycarbonate"],
    materials: ["Carbon-Fiber Nylon", "PA12 Nylon", "Aluminum 6061", "Polycarbonate", "Delrin"],
    certs: ["ISO 9001:2015", "Custom NDA workflows"],
    color: "from-emerald-500/20 to-emerald-500/5",
    namedCustomers: ["Rivian"],
    useCases: [
      { title: "Grippers and end-effectors", body: "SLS carbon-fiber nylon end-effectors optimized for stiffness-to-weight." },
      { title: "Robot chassis panels", body: "Machined aluminum 6061 chassis panels with anodized finish, cut to millimeter tolerance." },
      { title: "Sensor mounts", body: "SLA and PC FDM sensor mounts with tight tolerancing for LiDAR, camera, and IMU placement." },
      { title: "Cable management brackets", body: "Bulk-priced SLS PA12 clips and guides for full-robot cable routing." },
    ],
  },
  {
    slug: "electric-vehicles",
    name: "Electric Vehicles",
    tagline: "Prototype tooling, interior mock-ups, and under-hood fixtures for EV programs at speed.",
    hero:
      "EV teams — from Rivian-scale OEMs to seed-stage startups — use 3DBuildBot for prototype interiors, cooling manifolds, battery test fixtures, and pre-tooling representative parts. High-temp SLA and machined aluminum ship in the same lead time.",
    processes: ["FDM Carbon-Fiber", "5-Axis CNC", "SLA High-Temp", "MJF PA12"],
    materials: ["Carbon-Fiber Nylon", "Aluminum 6061 / 7075", "High-Temp Resin", "PA12 Nylon"],
    certs: ["ISO 9001:2015", "IATF-aligned supplier relationships"],
    color: "from-sky-500/20 to-sky-500/5",
    namedCustomers: ["Rivian"],
    useCases: [
      { title: "Battery test fixtures", body: "Machined aluminum and PA-CF fixtures for cell characterization and pack-level testing." },
      { title: "Cooling manifolds", body: "SLA high-temp resin manifolds for pre-tooling flow visualization; DMLS metal for functional prototypes." },
      { title: "Interior mock-ups", body: "MJF PA12 dash panels, HVAC vents, and grab-handle prototypes with dyed finish." },
      { title: "Charging port housings", body: "PC FDM and machined ABS-like SLA housings for connector development." },
    ],
  },
  {
    slug: "medical",
    name: "Medical Devices",
    tagline: "Biocompatible materials, ISO-aligned traceability, and the surface finish surgeons actually approve.",
    hero:
      "From surgical guides in bio-compatible SLA to titanium instrument prototypes machined to ±0.025mm, 3DBuildBot supports med-device R&D with the material selection and documentation that regulated engineers need.",
    processes: ["SLA (biocompatible)", "5-Axis CNC (Ti / SS 316L)", "SLS PA11", "DMLS Titanium"],
    materials: ["Biocompatible SLA Resin", "PA11 Nylon", "Titanium Ti-6Al-4V", "Stainless Steel 316L", "PEEK"],
    certs: ["ISO 9001:2015", "Material biocompatibility documentation", "Traceability lot codes"],
    color: "from-rose-500/20 to-rose-500/5",
    useCases: [
      { title: "Surgical guides", body: "Biocompatible SLA resin surgical guides with autoclave-safe post-cure." },
      { title: "Instrument prototypes", body: "SS 316L and Ti-6Al-4V machined instrument prototypes with electropolish." },
      { title: "Implant R&D", body: "DMLS Ti-6Al-4V lattice structures for orthopedic and spinal implant research." },
      { title: "PEEK cage prototypes", body: "PEEK machining for spinal fusion cage development." },
    ],
  },
  {
    slug: "electronics",
    name: "Electronics & Consumer Products",
    tagline: "Housings, brackets, and structural components for teams shipping physical products.",
    hero:
      "Consumer-electronics and industrial-electronics teams need enclosures that fit, brackets that hold, and mounting hardware that ships. FDM polycarbonate and MJF PA12 handle 90% of pre-tooling housings; machined aluminum handles the rest.",
    processes: ["FDM PC", "MJF PA12", "SLA Clear", "3-Axis CNC"],
    materials: ["Polycarbonate", "PA12 Nylon", "Clear Resin", "Aluminum 6061", "ABS"],
    certs: ["ISO 9001:2015"],
    color: "from-violet-500/20 to-violet-500/5",
    useCases: [
      { title: "PCBA enclosures", body: "FDM PC and MJF PA12 enclosures with snap-fits, standoffs, and dyed finish." },
      { title: "Connector housings", body: "SLA clear resin and machined PC housings for USB, HDMI, and custom connector prototypes." },
      { title: "Heat-sink brackets", body: "Machined aluminum heat-sinks and mounting brackets with anodized finish." },
      { title: "Bezels and faceplates", body: "SLA and machined ABS-like SLA bezels with paint-ready surface." },
    ],
  },
  {
    slug: "industrial",
    name: "Industrial & MRO",
    tagline: "Replacement parts, jigs, and fixtures for the plants and shops that keep running.",
    hero:
      "MRO buyers need replacement parts fast — often from a photo, hand-sketch, or damaged sample. 3DBuildBot's reverse-engineering-from-photo AI, plus rapid FDM and machining capacity, gets obsolete-part replacements shipped in days, not months.",
    processes: ["FDM PC / ABS", "3-Axis CNC", "SLS PA12"],
    materials: ["Polycarbonate", "PA12 Nylon", "Aluminum 6061", "Stainless Steel 303 / 316L", "Delrin"],
    certs: ["ISO 9001:2015"],
    color: "from-amber-500/20 to-amber-500/5",
    useCases: [
      { title: "Obsolete part replacement", body: "Upload photos + a coin for scale; our reverse-engineering AI drafts a STEP and quotes fabrication in one flow." },
      { title: "Jigs and fixtures", body: "FDM PC and machined aluminum jigs for assembly-line reconfigurations." },
      { title: "Wear parts", body: "Delrin and PA12 wear-parts, bushings, and guides." },
      { title: "Custom hardware", body: "Machined stainless brackets, custom-length fasteners, and shims." },
    ],
  },
];

export const getIndustryBySlug = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
export const getAllIndustrySlugs = () => INDUSTRIES.map((i) => i.slug);
