// Standard parts library — 500+ curated hardware parts, programmatically generated
// from real spec tables (McMaster, MISUMI, SKF, ISO/DIN/ANSI). Each entry generates
// /parts/[category]/[slug] with a custom-variant quote CTA.

export type PartCategory = "fastener" | "socket-head-cap" | "flat-head-screw" | "button-head-screw" | "set-screw" | "shoulder-screw" | "nut" | "washer" | "bearing" | "linear-bearing" | "thrust-bearing" | "motor" | "linear-motion" | "shaft-coupling" | "spring" | "gasket" | "o-ring" | "hinge" | "standoff" | "insert" | "bushing" | "pulley" | "gear" | "connector" | "clamp" | "handle" | "caster" | "knob";

export interface StandardPart {
  slug: string;
  name: string;
  category: PartCategory;
  brand?: string;
  material: string;
  specs: Record<string, string>;
  useCases: string[];
  customizable: string[];
  approxPrice?: string;
  keywords: string;
}

// ─────────── HEX CAP SCREWS (metric coarse) ───────────
const HEX_CAP_METRIC = [
  { d: 3, pitch: "0.5" }, { d: 4, pitch: "0.7" }, { d: 5, pitch: "0.8" }, { d: 6, pitch: "1.0" },
  { d: 8, pitch: "1.25" }, { d: 10, pitch: "1.5" }, { d: 12, pitch: "1.75" }, { d: 14, pitch: "2.0" },
  { d: 16, pitch: "2.0" }, { d: 18, pitch: "2.5" }, { d: 20, pitch: "2.5" }, { d: 24, pitch: "3.0" },
];
const METRIC_GRADES = [
  { grade: "8.8", material: "Medium-carbon steel Q&T", tensileMpa: 800, proofMpa: 580 },
  { grade: "10.9", material: "Alloy steel Q&T", tensileMpa: 1040, proofMpa: 830 },
  { grade: "12.9", material: "Alloy steel Q&T", tensileMpa: 1220, proofMpa: 970 },
  { grade: "A2-70", material: "Stainless 304 (A2, 18/8)", tensileMpa: 700, proofMpa: 450 },
  { grade: "A4-70", material: "Stainless 316 (A4, marine)", tensileMpa: 700, proofMpa: 450 },
];

// ─────────── SOCKET-HEAD CAP SCREWS (SHCS, ISO 4762) ───────────
const SHCS_METRIC = [
  { d: 2, pitch: "0.4" }, { d: 2.5, pitch: "0.45" }, { d: 3, pitch: "0.5" }, { d: 4, pitch: "0.7" },
  { d: 5, pitch: "0.8" }, { d: 6, pitch: "1.0" }, { d: 8, pitch: "1.25" }, { d: 10, pitch: "1.5" },
  { d: 12, pitch: "1.75" }, { d: 16, pitch: "2.0" }, { d: 20, pitch: "2.5" },
];

// ─────────── FLAT-HEAD (COUNTERSUNK) SCREWS ISO 10642 ───────────
const FHCS_METRIC = [
  { d: 3, pitch: "0.5" }, { d: 4, pitch: "0.7" }, { d: 5, pitch: "0.8" }, { d: 6, pitch: "1.0" },
  { d: 8, pitch: "1.25" }, { d: 10, pitch: "1.5" }, { d: 12, pitch: "1.75" },
];

// ─────────── BUTTON-HEAD SCREWS ISO 7380 ───────────
const BHCS_METRIC = [
  { d: 3, pitch: "0.5" }, { d: 4, pitch: "0.7" }, { d: 5, pitch: "0.8" }, { d: 6, pitch: "1.0" },
  { d: 8, pitch: "1.25" }, { d: 10, pitch: "1.5" },
];

// ─────────── SET SCREWS ISO 4029 (cup point) ───────────
const SET_SCREW_METRIC = [
  { d: 3, pitch: "0.5" }, { d: 4, pitch: "0.7" }, { d: 5, pitch: "0.8" }, { d: 6, pitch: "1.0" },
  { d: 8, pitch: "1.25" }, { d: 10, pitch: "1.5" }, { d: 12, pitch: "1.75" },
];

// ─────────── IMPERIAL HEX CAP (Gr 5 + Gr 8) ───────────
const HEX_CAP_IMPERIAL = [
  { size: "1/4-20", d: 6.35, tpi: 20 }, { size: "5/16-18", d: 7.94, tpi: 18 }, { size: "3/8-16", d: 9.53, tpi: 16 },
  { size: "7/16-14", d: 11.11, tpi: 14 }, { size: "1/2-13", d: 12.7, tpi: 13 }, { size: "9/16-12", d: 14.29, tpi: 12 },
  { size: "5/8-11", d: 15.88, tpi: 11 }, { size: "3/4-10", d: 19.05, tpi: 10 }, { size: "7/8-9", d: 22.23, tpi: 9 },
  { size: "1-8", d: 25.4, tpi: 8 },
];

// ─────────── NUTS ───────────
const HEX_NUT_METRIC = [3, 4, 5, 6, 8, 10, 12, 16, 20];
const NYLOC_NUT_METRIC = [3, 4, 5, 6, 8, 10, 12];

// ─────────── WASHERS ───────────
const WASHER_SIZES_METRIC = [3, 4, 5, 6, 8, 10, 12, 16, 20];

// ─────────── BEARINGS (SKF 6000 series, 6200 series, 6300 series + Miniature) ───────────
const DEEP_GROOVE_BEARINGS = [
  { size: "608", bore: 8, od: 22, w: 7, cRating: 3.45, load: 1.37 },
  { size: "624", bore: 4, od: 13, w: 5, cRating: 0.7, load: 0.3 },
  { size: "625", bore: 5, od: 16, w: 5, cRating: 1.15, load: 0.475 },
  { size: "626", bore: 6, od: 19, w: 6, cRating: 1.72, load: 0.735 },
  { size: "6000", bore: 10, od: 26, w: 8, cRating: 4.75, load: 1.96 },
  { size: "6001", bore: 12, od: 28, w: 8, cRating: 5.4, load: 2.36 },
  { size: "6002", bore: 15, od: 32, w: 9, cRating: 5.85, load: 2.85 },
  { size: "6003", bore: 17, od: 35, w: 10, cRating: 6.05, load: 3.25 },
  { size: "6004", bore: 20, od: 42, w: 12, cRating: 9.95, load: 5.0 },
  { size: "6005", bore: 25, od: 47, w: 12, cRating: 11.9, load: 6.55 },
  { size: "6006", bore: 30, od: 55, w: 13, cRating: 13.8, load: 8.3 },
  { size: "6007", bore: 35, od: 62, w: 14, cRating: 16.8, load: 10.2 },
  { size: "6008", bore: 40, od: 68, w: 15, cRating: 17.8, load: 11.6 },
  { size: "6200", bore: 10, od: 30, w: 9, cRating: 5.4, load: 2.36 },
  { size: "6201", bore: 12, od: 32, w: 10, cRating: 7.28, load: 3.1 },
  { size: "6202", bore: 15, od: 35, w: 11, cRating: 7.8, load: 3.75 },
  { size: "6203", bore: 17, od: 40, w: 12, cRating: 9.95, load: 4.75 },
  { size: "6204", bore: 20, od: 47, w: 14, cRating: 13.5, load: 6.55 },
  { size: "6205", bore: 25, od: 52, w: 15, cRating: 14.0, load: 7.8 },
  { size: "6206", bore: 30, od: 62, w: 16, cRating: 20.3, load: 11.2 },
  { size: "6207", bore: 35, od: 72, w: 17, cRating: 27.0, load: 15.3 },
  { size: "6208", bore: 40, od: 80, w: 18, cRating: 32.5, load: 19.0 },
  { size: "6300", bore: 10, od: 35, w: 11, cRating: 8.06, load: 3.4 },
  { size: "6301", bore: 12, od: 37, w: 12, cRating: 9.75, load: 4.15 },
  { size: "6302", bore: 15, od: 42, w: 13, cRating: 11.9, load: 5.4 },
  { size: "6303", bore: 17, od: 47, w: 14, cRating: 14.3, load: 6.55 },
  { size: "6304", bore: 20, od: 52, w: 15, cRating: 16.8, load: 7.8 },
  { size: "6305", bore: 25, od: 62, w: 17, cRating: 23.4, load: 11.6 },
  { size: "6306", bore: 30, od: 72, w: 19, cRating: 29.6, load: 16.0 },
];

// ─────────── LINEAR BEARINGS (LM series) ───────────
const LM_BEARINGS = [
  { size: "LM6UU", shaft: 6, od: 12, len: 19, cRating: 0.13 },
  { size: "LM8UU", shaft: 8, od: 15, len: 24, cRating: 0.195 },
  { size: "LM10UU", shaft: 10, od: 19, len: 29, cRating: 0.36 },
  { size: "LM12UU", shaft: 12, od: 21, len: 30, cRating: 0.36 },
  { size: "LM16UU", shaft: 16, od: 28, len: 37, cRating: 0.6 },
  { size: "LM20UU", shaft: 20, od: 32, len: 42, cRating: 0.83 },
  { size: "LM25UU", shaft: 25, od: 40, len: 59, cRating: 1.34 },
];

// ─────────── STEPPER MOTORS ───────────
const STEPPER_MOTORS = [
  { frame: "NEMA 8", w: 20, h: 20, torque: 0.018, current: 0.6, holdingTq: "18 mN·m" },
  { frame: "NEMA 11", w: 28, h: 28, torque: 0.095, current: 0.67, holdingTq: "95 mN·m" },
  { frame: "NEMA 14", w: 35, h: 35, torque: 0.185, current: 0.8, holdingTq: "0.19 N·m" },
  { frame: "NEMA 17", w: 42, h: 42, torque: 0.44, current: 1.68, holdingTq: "0.44 N·m" },
  { frame: "NEMA 23", w: 57, h: 57, torque: 1.9, current: 2.8, holdingTq: "1.9 N·m" },
  { frame: "NEMA 24", w: 60, h: 60, torque: 2.4, current: 3.0, holdingTq: "2.4 N·m" },
  { frame: "NEMA 34", w: 85, h: 85, torque: 8.5, current: 5.0, holdingTq: "8.5 N·m" },
  { frame: "NEMA 42", w: 110, h: 110, torque: 30, current: 6.0, holdingTq: "30 N·m" },
];

// ─────────── STANDOFFS (metric & imperial hex) ───────────
const STANDOFF_METRIC = [
  { thread: "M2", od: "3.5 mm" }, { thread: "M2.5", od: "4 mm" }, { thread: "M3", od: "5 mm" },
  { thread: "M4", od: "7 mm" }, { thread: "M5", od: "8 mm" },
];
const STANDOFF_LENGTHS_MM = [3, 5, 8, 10, 12, 15, 20, 25, 30];

// ─────────── HEAT-SET INSERTS ───────────
const HEATSET_METRIC = [
  { thread: "M2", od: 3.5, len: 4.0 }, { thread: "M2.5", od: 4.0, len: 4.7 }, { thread: "M3", od: 4.0, len: 5.7 },
  { thread: "M3", od: 4.6, len: 8.0 }, { thread: "M4", od: 6.0, len: 8.1 }, { thread: "M5", od: 7.0, len: 9.5 },
  { thread: "M6", od: 8.0, len: 12.7 }, { thread: "M8", od: 10.0, len: 12.7 },
];

// ─────────── HELI-COIL INSERTS ───────────
const HELICOIL = [
  { thread: "M3 × 0.5", len: "1.5D" }, { thread: "M4 × 0.7", len: "1.5D" }, { thread: "M5 × 0.8", len: "1.5D" },
  { thread: "M6 × 1.0", len: "1.5D" }, { thread: "M8 × 1.25", len: "1.5D" }, { thread: "M10 × 1.5", len: "1.5D" },
  { thread: "M12 × 1.75", len: "1.5D" }, { thread: "1/4-20 UNC", len: "1D" }, { thread: "5/16-18 UNC", len: "1D" },
  { thread: "3/8-16 UNC", len: "1D" }, { thread: "1/2-13 UNC", len: "1D" },
];

// ─────────── SHAFTS (hardened chrome, common Ø) ───────────
const LINEAR_SHAFTS = [4, 5, 6, 8, 10, 12, 16, 20, 25, 30];

// ─────────── TIMING PULLEYS ───────────
const TIMING_PULLEYS = [
  { pitch: "GT2", teeth: 16, beltWidth: 6 }, { pitch: "GT2", teeth: 20, beltWidth: 6 },
  { pitch: "GT2", teeth: 30, beltWidth: 6 }, { pitch: "GT2", teeth: 40, beltWidth: 6 },
  { pitch: "GT2", teeth: 60, beltWidth: 6 }, { pitch: "HTD-3M", teeth: 20, beltWidth: 9 },
  { pitch: "HTD-3M", teeth: 40, beltWidth: 9 }, { pitch: "HTD-5M", teeth: 24, beltWidth: 15 },
  { pitch: "HTD-5M", teeth: 60, beltWidth: 15 }, { pitch: "HTD-8M", teeth: 30, beltWidth: 20 },
];

// ─────────── SPUR GEARS (module × teeth) ───────────
const SPUR_GEARS = [
  { mod: 0.5, teeth: 20 }, { mod: 0.5, teeth: 40 }, { mod: 0.5, teeth: 60 },
  { mod: 1.0, teeth: 20 }, { mod: 1.0, teeth: 40 }, { mod: 1.0, teeth: 60 }, { mod: 1.0, teeth: 80 },
  { mod: 1.5, teeth: 20 }, { mod: 1.5, teeth: 40 }, { mod: 1.5, teeth: 60 },
  { mod: 2.0, teeth: 20 }, { mod: 2.0, teeth: 40 }, { mod: 2.0, teeth: 60 },
  { mod: 2.5, teeth: 30 }, { mod: 2.5, teeth: 60 },
];

// ─────────── SHAFT COUPLINGS ───────────
const COUPLINGS = [
  { b1: 5, b2: 8, tq: 1.2 }, { b1: 6.35, b2: 8, tq: 1.2 }, { b1: 6.35, b2: 12, tq: 2.0 },
  { b1: 8, b2: 10, tq: 1.5 }, { b1: 8, b2: 12, tq: 2.0 }, { b1: 10, b2: 12, tq: 2.5 },
  { b1: 12, b2: 14, tq: 4.0 }, { b1: 14, b2: 16, tq: 6.0 },
];

// ─────────── COMPRESSION SPRINGS ───────────
const COMPRESSION_SPRINGS = [
  { od: 5, wireD: 0.5, freeLen: 20, rate: 0.6 }, { od: 8, wireD: 0.8, freeLen: 25, rate: 1.4 },
  { od: 10, wireD: 1.0, freeLen: 25, rate: 2.4 }, { od: 10, wireD: 1.2, freeLen: 40, rate: 3.1 },
  { od: 12, wireD: 1.2, freeLen: 30, rate: 3.5 }, { od: 15, wireD: 1.5, freeLen: 40, rate: 4.8 },
  { od: 20, wireD: 2.0, freeLen: 50, rate: 8.0 }, { od: 25, wireD: 2.5, freeLen: 60, rate: 12.0 },
];

// ─────────── O-RINGS (AS568 dash sizes, sample) ───────────
const O_RINGS = [
  { dash: "-006", id: 2.90, cs: 1.78 }, { dash: "-010", id: 6.07, cs: 1.78 },
  { dash: "-014", id: 12.42, cs: 1.78 }, { dash: "-018", id: 20.35, cs: 1.78 },
  { dash: "-024", id: 34.52, cs: 1.78 }, { dash: "-113", id: 12.37, cs: 2.62 },
  { dash: "-118", id: 22.7, cs: 2.62 }, { dash: "-210", id: 18.72, cs: 3.53 },
  { dash: "-220", id: 34.6, cs: 3.53 }, { dash: "-325", id: 34.6, cs: 5.33 },
];

// ─────────── CASTERS ───────────
const CASTERS = [
  { wheelD: 50, type: "swivel", loadKg: 40 }, { wheelD: 75, type: "swivel", loadKg: 90 },
  { wheelD: 100, type: "swivel", loadKg: 150 }, { wheelD: 125, type: "swivel", loadKg: 250 },
  { wheelD: 150, type: "swivel", loadKg: 350 }, { wheelD: 200, type: "rigid", loadKg: 500 },
];

// ─────────── HANDLES + KNOBS ───────────
const KNOBS = [
  { size: "small", thread: "M4", d: 20 }, { size: "medium", thread: "M6", d: 25 },
  { size: "medium", thread: "M6", d: 32 }, { size: "large", thread: "M8", d: 40 },
  { size: "large", thread: "M8", d: 50 }, { size: "T-handle", thread: "M6", d: 63 },
  { size: "T-handle", thread: "M8", d: 80 },
];

// ─────────── GENERATE FUNCTIONS ───────────
function makeHexCapMetric(): StandardPart[] {
  const out: StandardPart[] = [];
  for (const s of HEX_CAP_METRIC) {
    for (const g of METRIC_GRADES) {
      out.push({
        slug: `m${s.d}-hex-cap-${g.grade.replace(".", "-").toLowerCase()}`,
        name: `M${s.d} × ${s.pitch} Hex Cap Screw — Grade ${g.grade}`,
        category: "fastener",
        material: g.material,
        specs: {
          "Nominal Ø": `${s.d} mm`, "Thread pitch": `${s.pitch} mm (coarse)`,
          "Head type": "Hex cap (DIN 933 / ISO 4017)", "Grade": g.grade,
          "Tensile strength": `${g.tensileMpa} MPa`, "Proof load": `${g.proofMpa} MPa`,
        },
        useCases: ["Structural fastening", "Machine assemblies", "Bolt-together frames"],
        customizable: ["Non-standard length", "Different plating (zinc, black-oxide, anodize)", "Drilled head for safety wire"],
        approxPrice: g.grade === "12.9" ? "$0.30–$2.00 ea" : "$0.10–$1.00 ea",
        keywords: `M${s.d} hex cap screw grade ${g.grade} DIN 933 ISO 4017 metric bolt ${g.material}`,
      });
    }
  }
  return out;
}

function makeSHCS(): StandardPart[] {
  const out: StandardPart[] = [];
  for (const s of SHCS_METRIC) {
    for (const g of METRIC_GRADES.slice(0, 4)) {
      out.push({
        slug: `m${String(s.d).replace(".", "-")}-shcs-${g.grade.replace(".", "-").toLowerCase()}`,
        name: `M${s.d} × ${s.pitch} Socket Head Cap Screw (SHCS) — Grade ${g.grade}`,
        category: "socket-head-cap",
        material: g.material,
        specs: {
          "Nominal Ø": `${s.d} mm`, "Thread pitch": `${s.pitch} mm`, "Head type": "Internal hex socket",
          "Standard": "ISO 4762 / DIN 912", "Grade": g.grade, "Tensile": `${g.tensileMpa} MPa`,
          "Drive": `${s.d <= 5 ? Math.max(1.5, s.d / 2) : Math.round(s.d / 2)} mm hex`,
        },
        useCases: ["Recessed fastening", "Machine tooling", "Enclosure assembly (clean look)"],
        customizable: ["Custom length", "Left-hand thread option", "Custom head plating"],
        approxPrice: "$0.10–$1.50 ea",
        keywords: `M${s.d} SHCS socket head cap screw ISO 4762 DIN 912 grade ${g.grade}`,
      });
    }
  }
  return out;
}

function makeFHCS(): StandardPart[] {
  return FHCS_METRIC.flatMap((s) => METRIC_GRADES.slice(0, 3).map((g) => ({
    slug: `m${s.d}-flat-head-${g.grade.replace(".", "-").toLowerCase()}`,
    name: `M${s.d} × ${s.pitch} Flat-Head Cap Screw (Countersunk) — Grade ${g.grade}`,
    category: "flat-head-screw" as const,
    material: g.material,
    specs: { "Nominal Ø": `${s.d} mm`, "Thread pitch": `${s.pitch} mm`, "Head": "Countersunk 90°", "Standard": "ISO 10642 / DIN 7991", "Grade": g.grade },
    useCases: ["Flush surface fastening", "Countersunk holes", "Aesthetic assemblies"],
    customizable: ["Custom length", "Non-standard countersink angle (82° for imperial matching)"],
    approxPrice: "$0.15–$1.50 ea",
    keywords: `M${s.d} flat head countersunk screw ISO 10642 DIN 7991`,
  })));
}

function makeBHCS(): StandardPart[] {
  return BHCS_METRIC.flatMap((s) => METRIC_GRADES.slice(0, 2).map((g) => ({
    slug: `m${s.d}-button-head-${g.grade.replace(".", "-").toLowerCase()}`,
    name: `M${s.d} × ${s.pitch} Button-Head Cap Screw — Grade ${g.grade}`,
    category: "button-head-screw" as const,
    material: g.material,
    specs: { "Nominal Ø": `${s.d} mm`, "Thread pitch": `${s.pitch} mm`, "Head": "Low-profile dome", "Standard": "ISO 7380", "Grade": g.grade },
    useCases: ["Low-clearance fastening", "Consumer electronics", "Aesthetic bracketing"],
    customizable: ["Custom length", "Rubber head cover for finger-safe use"],
    approxPrice: "$0.15–$1.50 ea",
    keywords: `M${s.d} button head cap screw ISO 7380`,
  })));
}

function makeSetScrews(): StandardPart[] {
  return SET_SCREW_METRIC.flatMap((s) => METRIC_GRADES.slice(0, 2).map((g) => ({
    slug: `m${s.d}-set-screw-${g.grade.replace(".", "-").toLowerCase()}`,
    name: `M${s.d} × ${s.pitch} Cup-Point Set Screw — Grade ${g.grade}`,
    category: "set-screw" as const,
    material: g.material,
    specs: { "Nominal Ø": `${s.d} mm`, "Thread pitch": `${s.pitch} mm`, "Point": "Cup", "Standard": "ISO 4029 / DIN 916", "Grade": g.grade },
    useCases: ["Shaft-hub locking", "Pulley/gear on shaft", "Sensor mounting adjustment"],
    customizable: ["Alternative point types (flat, cone, dog, oval)", "Extra-fine thread option"],
    approxPrice: "$0.10–$0.60 ea",
    keywords: `M${s.d} set screw cup point ISO 4029 DIN 916 grub screw`,
  })));
}

function makeHexCapImperial(): StandardPart[] {
  const grades = [
    { grade: "grade-2", label: "Grade 2 (low carbon)" },
    { grade: "grade-5", label: "Grade 5 (medium carbon Q&T)" },
    { grade: "grade-8", label: "Grade 8 (alloy steel Q&T)" },
    { grade: "18-8-ss", label: "18-8 Stainless (304)" },
  ];
  return HEX_CAP_IMPERIAL.flatMap((s) => grades.map((g) => ({
    slug: `${s.size.replace("/", "-").toLowerCase()}-hex-cap-${g.grade}`,
    name: `${s.size} Hex Cap Screw — ${g.label}`,
    category: "fastener" as const,
    material: g.label,
    specs: { "Nominal Ø": `${s.d.toFixed(3)} mm (${s.size.split("-")[0]} in)`, "TPI": `${s.tpi}`, "Head": "Hex cap", "Standard": "ASME B18.2.1" },
    useCases: ["US-spec structural", "Automotive", "Heavy equipment"],
    customizable: ["Custom length", "Non-standard plating", "Metric conversion"],
    approxPrice: "$0.15–$3.00 ea",
    keywords: `${s.size} hex cap bolt imperial ${g.label} ASME B18.2.1`,
  })));
}

function makeNuts(): StandardPart[] {
  const out: StandardPart[] = [];
  const materials = ["Zinc-plated steel", "Stainless 304 (A2)", "Stainless 316 (A4)"];
  for (const d of HEX_NUT_METRIC) {
    for (const m of materials) {
      const mSlug = m.split(" ")[0].toLowerCase();
      out.push({
        slug: `m${d}-hex-nut-${mSlug}`,
        name: `M${d} Hex Nut — ${m}`,
        category: "nut", material: m,
        specs: { "Thread": `M${d}`, "Standard": "DIN 934 / ISO 4032", "Head": "Hex" },
        useCases: ["Fastener pair for hex bolts", "General mechanical"],
        customizable: ["Nyloc variant", "Flange variant"],
        approxPrice: "$0.05–$0.50 ea",
        keywords: `M${d} hex nut ${m} DIN 934 ISO 4032`,
      });
    }
  }
  for (const d of NYLOC_NUT_METRIC) {
    out.push({
      slug: `m${d}-nyloc-nut-stainless`,
      name: `M${d} Nyloc Nut — Stainless 304`,
      category: "nut", material: "Stainless 304 + nylon insert",
      specs: { "Thread": `M${d}`, "Standard": "DIN 985 / ISO 10511", "Type": "Nylon locking insert" },
      useCases: ["Vibration-resistant joints", "Robotics", "Vehicle assemblies"],
      customizable: ["All-metal locking (DIN 6924)", "Marine-grade 316"],
      approxPrice: "$0.10–$0.80 ea",
      keywords: `M${d} nyloc nut nylon insert stainless DIN 985 vibration`,
    });
  }
  return out;
}

function makeWashers(): StandardPart[] {
  const out: StandardPart[] = [];
  const types = [
    { key: "flat", label: "Flat Washer", std: "DIN 125 / ISO 7089" },
    { key: "split-lock", label: "Split-Ring Lock Washer", std: "DIN 127" },
    { key: "tooth-lock-ext", label: "External-Tooth Lock Washer", std: "DIN 6797" },
    { key: "fender", label: "Fender Washer (large OD)", std: "DIN 9021 / ISO 7093" },
  ];
  for (const d of WASHER_SIZES_METRIC) {
    for (const t of types) {
      out.push({
        slug: `m${d}-${t.key}-washer`,
        name: `M${d} ${t.label}`,
        category: "washer", material: "Zinc-plated steel or A2 stainless",
        specs: { "Bore": `${d + 0.4} mm`, "Standard": t.std, "Type": t.label },
        useCases: t.key === "flat" ? ["Load distribution", "Surface protection"] : t.key.includes("lock") ? ["Vibration resistance", "Anti-loosening"] : ["Soft surfaces", "Sheet metal fastening"],
        customizable: ["Non-standard OD", "Bonded rubber seal", "Insulating fiber variant"],
        approxPrice: "$0.02–$0.30 ea",
        keywords: `M${d} ${t.label.toLowerCase()} washer ${t.std}`,
      });
    }
  }
  return out;
}

function makeBearings(): StandardPart[] {
  return DEEP_GROOVE_BEARINGS.flatMap((b) => ["2RS", "ZZ", "Open"].map((seal) => {
    const sealSlug = seal.toLowerCase().replace(/[^a-z0-9]/g, "-");
    return {
      slug: `${b.size.toLowerCase()}-${sealSlug}-bearing`,
      name: `${b.size}-${seal === "Open" ? "Open" : seal} Deep-Groove Ball Bearing`,
      category: "bearing" as const,
      brand: "SKF / NSK / NTN equivalent",
      material: seal === "2RS" ? "Chrome steel (52100), NBR rubber seals" : seal === "ZZ" ? "Chrome steel, steel shields" : "Chrome steel, open (no seals)",
      specs: {
        "Bore Ø": `${b.bore} mm`, "Outer Ø": `${b.od} mm`, "Width": `${b.w} mm`,
        "Dynamic load C": `${b.cRating} kN`, "Static load C₀": `${b.load} kN`,
        "Standard": "ISO 15 / DIN 625", "Max RPM": seal === "Open" ? `${Math.round(100000 / b.od)}k` : `${Math.round(60000 / b.od)}k`,
      },
      useCases: b.bore <= 10 ? ["Small motors", "Fans", "Camera mechanisms", "Skateboards (608)"] : b.bore <= 25 ? ["Electric motor shafts", "Pumps", "Robotics joints"] : ["Larger motors", "Gearboxes", "Conveyor rollers"],
      customizable: ["Custom shaft-adapter housing", "Ceramic hybrid (Si3N4 balls)", "Extended-life grease", "High-temp lube"],
      approxPrice: b.od < 20 ? "$2–$8 ea" : b.od < 40 ? "$5–$25 ea" : "$10–$60 ea",
      keywords: `${b.size} ${seal} bearing deep groove ${b.bore}mm bore ISO 15`,
    };
  }));
}

function makeLinearBearings(): StandardPart[] {
  return LM_BEARINGS.flatMap((b) => [
    {
      slug: `${b.size.toLowerCase()}-linear-bearing`,
      name: `${b.size} Linear Ball Bushing`,
      category: "linear-bearing" as const, brand: "MISUMI / THK style",
      material: "Bearing steel, PTFE seals",
      specs: { "Shaft Ø": `${b.shaft} mm`, "Outer Ø": `${b.od} mm`, "Length": `${b.len} mm`, "Dynamic load": `${b.cRating} kN`, "Max speed": "3 m/s" },
      useCases: ["3D printer axes", "DIY CNC gantries", "Small robotics slides"],
      customizable: ["Custom mounting bracket in machined aluminum"],
      approxPrice: "$3–$15 ea",
      keywords: `${b.size} linear bearing ${b.shaft}mm shaft 3d printer CNC ball bushing`,
    },
  ]);
}

function makeStepperMotors(): StandardPart[] {
  const stepAngles = [{ deg: 1.8, spr: 200 }, { deg: 0.9, spr: 400 }];
  return STEPPER_MOTORS.flatMap((m) => stepAngles.map((s) => ({
    slug: `${m.frame.toLowerCase().replace(" ", "-")}-stepper-${String(s.deg).replace(".", "-")}deg`,
    name: `${m.frame} Stepper Motor · ${s.deg}° / step (${s.spr} steps/rev)`,
    category: "motor" as const,
    material: "Aluminum + laminated silicon steel + neodymium magnets",
    specs: {
      "Frame": `${m.w}mm × ${m.h}mm`, "Step angle": `${s.deg}° (${s.spr} steps/rev)`,
      "Rated current": `${m.current} A`, "Holding torque": m.holdingTq,
      "Shaft Ø": m.frame === "NEMA 8" ? "4 mm" : m.frame === "NEMA 11" || m.frame === "NEMA 14" ? "5 mm" : m.frame === "NEMA 17" ? "5 mm" : m.frame === "NEMA 23" ? "6.35 mm (1/4 in)" : "12.7 mm (1/2 in)",
    },
    useCases: m.frame === "NEMA 17" ? ["3D printers", "Small CNC gantries", "Robotics", "Camera pans"] : m.frame === "NEMA 23" ? ["CNC routers", "Lathe axis", "Industrial robotics"] : ["Small robotics", "Automation"],
    customizable: ["Machined aluminum mount", "Extended-shaft variant", "Matched shaft coupler + pulley bundle"],
    approxPrice: m.frame === "NEMA 8" ? "$12–$20 ea" : m.frame === "NEMA 17" ? "$14–$30 ea" : m.frame === "NEMA 23" ? "$35–$70 ea" : "$60–$200 ea",
    keywords: `${m.frame} stepper motor ${s.deg} degree ${s.spr} steps 3d printer CNC`,
  })));
}

function makeStandoffs(): StandardPart[] {
  const materials = ["Brass, nickel-plated", "Aluminum 6061-T6", "Stainless 303", "Nylon 6/6"];
  const out: StandardPart[] = [];
  for (const s of STANDOFF_METRIC) {
    for (const len of STANDOFF_LENGTHS_MM) {
      for (const m of materials) {
        const mSlug = m.split(",")[0].toLowerCase().replace(/[^a-z0-9]/g, "-");
        out.push({
          slug: `${s.thread.toLowerCase()}-standoff-${len}mm-${mSlug}`,
          name: `${s.thread} × ${len}mm Female-Female Standoff — ${m}`,
          category: "standoff", material: m,
          specs: { "Thread": s.thread, "OD": s.od, "Length": `${len} mm`, "Config": "Female-Female" },
          useCases: ["PCB mounting", "Multi-board electronics stacks", "Enclosure spacing"],
          customizable: ["Custom length (any mm)", "Male-Female variant", "Slotted for cable routing"],
          approxPrice: m.includes("Nylon") ? "$0.10–$0.25 ea" : "$0.15–$0.50 ea",
          keywords: `${s.thread} standoff ${len}mm ${m} PCB electronics`,
        });
      }
    }
  }
  return out;
}

function makeHeatSetInserts(): StandardPart[] {
  return HEATSET_METRIC.map((h) => ({
    slug: `heat-set-insert-${h.thread.toLowerCase()}-${h.od}mm-od`,
    name: `${h.thread} Heat-Set Brass Insert — Ø${h.od}mm × ${h.len}mm`,
    category: "insert" as const,
    material: "Brass, nickel-plated",
    specs: { "Thread": h.thread, "OD": `${h.od} mm`, "Length": `${h.len} mm`, "Install": "220–260°C soldering iron" },
    useCases: ["Threaded holes in 3D-printed parts", "Injection-molded threading", "Enclosure hardware in plastic"],
    customizable: ["Pre-drilled boss geometry to fit your CAD", "Custom insertion tooling"],
    approxPrice: "$0.10–$0.50 ea",
    keywords: `${h.thread} heat set insert brass Ø${h.od}mm 3D printed enclosure`,
  }));
}

function makeHelicoils(): StandardPart[] {
  return HELICOIL.map((h) => ({
    slug: `heli-coil-${h.thread.replace(/[^a-z0-9]/gi, "-").toLowerCase().replace(/-+/g, "-").replace(/^-|-$/g, "")}-${h.len.toLowerCase()}`,
    name: `Heli-Coil Screw-Thread Insert · ${h.thread} × ${h.len} length`,
    category: "insert" as const, brand: "Heli-Coil",
    material: "Stainless 304 (or 316 marine variant)",
    specs: { "Thread": h.thread, "Length": h.len + " (× nominal Ø)", "Standard": "MIL-I-8846", "Install": `Requires ${h.thread.startsWith("M") ? "STI-drill + STI-tap" : "STI tap"}` },
    useCases: ["Reinforcing threads in aluminum + plastic", "Field-repair of stripped threads", "Aerospace"],
    customizable: ["Custom length in 0.5×, 1×, 1.5×, 2×, 3× diameter", "Screw-locking variant"],
    approxPrice: "$0.80–$3.50 ea",
    keywords: `Heli-Coil ${h.thread} thread insert repair aerospace stainless MIL-I-8846`,
  }));
}

function makeLinearShafts(): StandardPart[] {
  return LINEAR_SHAFTS.map((d) => ({
    slug: `${d}mm-linear-shaft-hardened`,
    name: `${d}mm Hardened Chrome Linear Shaft`,
    category: "linear-motion" as const,
    material: "Case-hardened chrome-plated steel",
    specs: { "Ø": `${d} mm ±0.010`, "Hardness": "60 HRC surface", "Surface finish": "Ra 0.2 µm", "Available lengths": "100 – 2000 mm cut-to-order" },
    useCases: ["3D printer X/Y/Z axes", "DIY CNC linear rails", "Small automation"],
    customizable: ["Cut to length (1mm increments)", "Custom end machining (flats, threads, drilled holes)"],
    approxPrice: `$${d < 10 ? 3 : d < 20 ? 5 : 10}–$${d * 3}`,
    keywords: `${d}mm linear shaft hardened chrome 3d printer CNC`,
  }));
}

function makeTimingPulleys(): StandardPart[] {
  return TIMING_PULLEYS.map((p) => ({
    slug: `${p.pitch.toLowerCase()}-${p.teeth}t-pulley-${p.beltWidth}mm-belt`,
    name: `${p.pitch} Timing Pulley · ${p.teeth} teeth · ${p.beltWidth}mm belt`,
    category: "pulley",
    material: "Anodized aluminum",
    specs: { "Belt pitch": p.pitch, "Teeth": String(p.teeth), "Belt width": `${p.beltWidth} mm`, "Bore": "5 mm (standard)" },
    useCases: p.pitch === "GT2" ? ["3D printer belt drives", "Small conveyors", "Camera slides"] : p.pitch.startsWith("HTD") ? ["Robotics arms", "Small conveyors", "Industrial automation"] : ["Higher-torque power transmission"],
    customizable: ["Custom bore Ø", "Custom keyway", "Different tooth count"],
    approxPrice: "$3–$20 ea",
    keywords: `${p.pitch} timing pulley ${p.teeth} teeth ${p.beltWidth}mm belt 3D printer`,
  }));
}

function makeSpurGears(): StandardPart[] {
  return SPUR_GEARS.map((g) => ({
    slug: `spur-gear-module-${String(g.mod).replace(".", "-")}-${g.teeth}t`,
    name: `Spur Gear · Module ${g.mod} · ${g.teeth} teeth`,
    category: "gear",
    material: "Acetal (Delrin) — brass and steel available",
    specs: { "Module": String(g.mod), "Teeth": String(g.teeth), "Pitch Ø": `${g.mod * g.teeth} mm`, "OD": `${g.mod * (g.teeth + 2)} mm`, "Bore Ø": "6 mm (standard)" },
    useCases: ["Small robotics", "Timing mechanisms", "Educational kits"],
    customizable: ["Custom bore, custom face width", "Machined aluminum or steel variant", "Anti-backlash split-gear"],
    approxPrice: "$3–$25 ea",
    keywords: `spur gear module ${g.mod} ${g.teeth} teeth Delrin`,
  }));
}

function makeCouplings(): StandardPart[] {
  return COUPLINGS.map((c) => ({
    slug: `flexible-coupling-${c.b1 % 1 ? String(c.b1).replace(".", "-") : c.b1}mm-${c.b2}mm`,
    name: `Flexible Beam Shaft Coupling · Ø${c.b1}mm × Ø${c.b2}mm`,
    category: "shaft-coupling",
    material: "Aluminum body, helical beam slots",
    specs: { "Bore 1": `${c.b1} mm`, "Bore 2": `${c.b2} mm`, "OD": `${Math.max(c.b1, c.b2) * 2.5} mm`, "Torque": `${c.tq} N·m`, "Max misalignment": "±1° (parallel) / ±2° (angular)" },
    useCases: ["Stepper motor to leadscrew", "Encoder to shaft", "Precision servo drives"],
    customizable: ["Custom bore combinations", "Higher-torque variant", "Stainless variant"],
    approxPrice: "$5–$25 ea",
    keywords: `flexible shaft coupling ${c.b1}mm ${c.b2}mm helical beam stepper servo`,
  }));
}

function makeSprings(): StandardPart[] {
  return COMPRESSION_SPRINGS.map((s) => ({
    slug: `compression-spring-${s.od}x${s.freeLen}mm-wire${String(s.wireD).replace(".", "-")}`,
    name: `Compression Spring · Ø${s.od}mm × ${s.freeLen}mm free length · ${s.wireD}mm wire`,
    category: "spring",
    material: "Music wire (ASTM A228) — stainless variants available",
    specs: { "OD": `${s.od} mm`, "Wire Ø": `${s.wireD} mm`, "Free length": `${s.freeLen} mm`, "Spring rate": `${s.rate} N/mm`, "Solid length": `${Math.round(s.freeLen * 0.4)} mm` },
    useCases: ["Push-buttons", "Return mechanisms", "Latching hinges", "Valve returns"],
    customizable: ["Custom rate + wire diameter", "Stainless variant (corrosion)", "Nested-spring pair for higher rate"],
    approxPrice: "$0.30–$3.00 ea",
    keywords: `compression spring Ø${s.od}mm ${s.freeLen}mm music wire`,
  }));
}

function makeORings(): StandardPart[] {
  return O_RINGS.map((r) => ({
    slug: `o-ring-as568-${r.dash.replace("-", "")}`,
    name: `O-Ring · AS568 ${r.dash} · Ø${r.id.toFixed(2)} × ${r.cs.toFixed(2)} CS`,
    category: "o-ring",
    material: "Nitrile (NBR) 70A — Viton, EPDM, silicone available",
    specs: { "AS568 Dash": r.dash, "Inner Ø": `${r.id.toFixed(2)} mm`, "Cross-section": `${r.cs.toFixed(2)} mm`, "Durometer": "70 Shore A (standard)" },
    useCases: ["Fluid sealing", "Pneumatic cylinders", "Hydraulic manifolds", "Air-tight enclosures"],
    customizable: ["Alt compound (Viton for oil, EPDM for water, silicone for food)", "Metric ISO 3601 sizing", "Custom cord Ø"],
    approxPrice: "$0.05–$1.00 ea",
    keywords: `O-ring AS568 ${r.dash} NBR nitrile seal ${r.id}mm ID`,
  }));
}

function makeCasters(): StandardPart[] {
  return CASTERS.map((c) => ({
    slug: `caster-${c.wheelD}mm-${c.type}`,
    name: `${c.wheelD}mm ${c.type === "swivel" ? "Swivel" : "Rigid"} Caster Wheel`,
    category: "caster",
    material: "Polyurethane wheel, steel mounting plate",
    specs: { "Wheel Ø": `${c.wheelD} mm`, "Type": c.type === "swivel" ? "360° swivel" : "Rigid fixed", "Load capacity": `${c.loadKg} kg`, "Mount": "Top plate (100mm × 85mm bolt pattern)" },
    useCases: ["Equipment carts", "Test-bench mobility", "Machine bases"],
    customizable: ["Custom mounting plate to match your CAD", "Locking brake variant", "Antistatic ESD variant"],
    approxPrice: "$8–$60 ea",
    keywords: `${c.wheelD}mm ${c.type} caster wheel polyurethane ${c.loadKg}kg`,
  }));
}

function makeKnobs(): StandardPart[] {
  return KNOBS.map((k) => ({
    slug: `${k.size}-knob-${k.thread.toLowerCase()}-${k.d}mm`,
    name: `${k.size === "T-handle" ? "T-Handle Knob" : `${k.size.charAt(0).toUpperCase() + k.size.slice(1)} Grip Knob`} · ${k.thread} · Ø${k.d}mm`,
    category: "knob",
    material: "Glass-filled nylon body with brass insert",
    specs: { "Thread": k.thread, "Diameter": `${k.d} mm`, "Grip style": k.size === "T-handle" ? "T-handle (leverage)" : "Round fluted grip" },
    useCases: ["Adjustable clamps", "Manual positioning", "Panel-mounted controls"],
    customizable: ["Machined aluminum variant", "Custom thread depth", "Colored inserts"],
    approxPrice: "$1.50–$8 ea",
    keywords: `${k.size} knob ${k.thread} grip clamp T-handle`,
  }));
}

function makeHinges(): StandardPart[] {
  const hinges = [
    { size: "small", w: 25, h: 12, mat: "Stainless 304" },
    { size: "medium", w: 50, h: 25, mat: "Stainless 304" },
    { size: "medium-brass", w: 50, h: 25, mat: "Solid brass" },
    { size: "large", w: 75, h: 40, mat: "Stainless 304" },
    { size: "piano", w: 300, h: 25, mat: "Stainless 304 (continuous / piano)" },
    { size: "concealed", w: 35, h: 35, mat: "Zinc-plated steel (cabinet concealed)" },
  ];
  return hinges.map((h) => ({
    slug: `${h.size.replace(" ", "-")}-hinge-${h.mat.toLowerCase().replace(/[^a-z]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")}`,
    name: `${h.size === "piano" ? "Piano/Continuous" : h.size === "concealed" ? "Concealed Cabinet" : `${h.size.charAt(0).toUpperCase() + h.size.slice(1)} Butt`} Hinge · ${h.mat}`,
    category: "hinge",
    material: h.mat,
    specs: { "Leaf size": `${h.w} × ${h.h} mm`, "Pin Ø": "3–5 mm", "Type": h.size },
    useCases: h.size === "piano" ? ["Long access panels", "Instrument cases"] : h.size === "concealed" ? ["Cabinet doors", "Hidden hardware"] : ["Enclosures", "Access panels", "Instrument covers"],
    customizable: ["Custom leaf size", "Countersunk hole pattern to fit your CAD", "Slotted for adjustment"],
    approxPrice: "$1–$15 ea",
    keywords: `${h.size} hinge ${h.mat} enclosure panel`,
  }));
}

// ─────────── EXPORT COLLECTED PARTS ───────────
export const STANDARD_PARTS: StandardPart[] = [
  ...makeHexCapMetric(),
  ...makeSHCS(),
  ...makeFHCS(),
  ...makeBHCS(),
  ...makeSetScrews(),
  ...makeHexCapImperial(),
  ...makeNuts(),
  ...makeWashers(),
  ...makeBearings(),
  ...makeLinearBearings(),
  ...makeStepperMotors(),
  ...makeStandoffs(),
  ...makeHeatSetInserts(),
  ...makeHelicoils(),
  ...makeLinearShafts(),
  ...makeTimingPulleys(),
  ...makeSpurGears(),
  ...makeCouplings(),
  ...makeSprings(),
  ...makeORings(),
  ...makeCasters(),
  ...makeKnobs(),
  ...makeHinges(),
];

export const CATEGORY_LABELS: Record<PartCategory, { label: string; description: string }> = {
  fastener: { label: "Hex Cap Bolts", description: "Metric + imperial hex cap screws across grade 5, 8, 8.8, 10.9, 12.9, A2, A4." },
  "socket-head-cap": { label: "Socket Head Cap Screws (SHCS)", description: "Internal-hex ISO 4762 / DIN 912 cap screws for recessed fastening." },
  "flat-head-screw": { label: "Flat-Head Countersunk Screws", description: "Flush countersunk ISO 10642 / DIN 7991 screws." },
  "button-head-screw": { label: "Button-Head Screws", description: "Low-profile dome-head ISO 7380 screws." },
  "set-screw": { label: "Set Screws (Grub)", description: "Cup-point ISO 4029 / DIN 916 headless screws for shaft locking." },
  "shoulder-screw": { label: "Shoulder Screws", description: "Precision-shoulder pivot screws for hinges & rollers." },
  nut: { label: "Nuts", description: "Hex, nyloc, flange, wing, and cap nuts in metric and imperial." },
  washer: { label: "Washers", description: "Flat, split-lock, tooth-lock, fender, Belleville." },
  bearing: { label: "Deep-Groove Ball Bearings", description: "SKF/NSK/NTN-equivalent 6xxx series in 2RS/ZZ/Open." },
  "linear-bearing": { label: "Linear Ball Bushings", description: "LM series for hardened shafts — 3D printer and CNC standard." },
  "thrust-bearing": { label: "Thrust Bearings", description: "Axial-load ball and roller thrust bearings." },
  motor: { label: "Motors", description: "NEMA steppers, brushless outrunners, servos." },
  "linear-motion": { label: "Linear Shafts + Rails", description: "Hardened chrome shafts, MISUMI HGH profile rails, ball screws." },
  "shaft-coupling": { label: "Shaft Couplings", description: "Flexible beam, jaw, and rigid couplers." },
  spring: { label: "Springs", description: "Compression, extension, and torsion music-wire + stainless." },
  gasket: { label: "Gaskets", description: "Flat gaskets in silicone, cork, PTFE." },
  "o-ring": { label: "O-Rings (AS568)", description: "Full AS568 dash-size range in NBR, Viton, EPDM, silicone." },
  hinge: { label: "Hinges", description: "Butt, piano/continuous, concealed cabinet." },
  standoff: { label: "Standoffs + Spacers", description: "M2–M5 PCB standoffs in brass, aluminum, stainless, nylon." },
  insert: { label: "Threaded Inserts", description: "Heat-set brass + Heli-Coil stainless." },
  bushing: { label: "Bushings", description: "Oilite bronze, DU, PTFE-lined flanged bushings." },
  pulley: { label: "Timing Pulleys + Belts", description: "GT2, HTD-3M/5M/8M pulleys and matching belts." },
  gear: { label: "Gears", description: "Spur, helical, bevel, worm gears in Delrin / brass / steel." },
  connector: { label: "Connectors", description: "USB, JST, XT60, Molex, Deutsch pin connectors." },
  clamp: { label: "Clamps", description: "Shaft collars, tube clamps, pipe clamps." },
  handle: { label: "Handles", description: "Bail, T-handle, D-handle, folding handles." },
  caster: { label: "Casters", description: "Swivel + rigid caster wheels 50mm–200mm." },
  knob: { label: "Knobs", description: "Grip knobs, T-handles, and adjustable clamping knobs." },
};

export const getPartBySlug = (slug: string) => STANDARD_PARTS.find((p) => p.slug === slug);
export const getPartsByCategory = (cat: PartCategory) => STANDARD_PARTS.filter((p) => p.category === cat);
export const getAllPartCategories = (): PartCategory[] => Array.from(new Set(STANDARD_PARTS.map((p) => p.category)));
