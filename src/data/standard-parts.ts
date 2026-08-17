// Standard parts library — curated hardware every engineer looks up.
// Each entry generates /parts/[category]/[slug]. Real specs from McMaster-Carr, MISUMI, SKF, RS Components catalogs.

export type PartCategory = "fastener" | "bearing" | "motor" | "linear-motion" | "shaft-coupling" | "spring" | "gasket" | "hinge" | "standoff" | "insert" | "bushing" | "pulley" | "gear" | "connector" | "washer" | "nut";

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

const HEX_CAP_METRIC = [
  { d: 4, pitch: "0.7", lengths: [8, 10, 12, 16, 20, 25, 30] },
  { d: 5, pitch: "0.8", lengths: [8, 10, 12, 16, 20, 25, 30, 40] },
  { d: 6, pitch: "1.0", lengths: [10, 12, 16, 20, 25, 30, 40, 50] },
  { d: 8, pitch: "1.25", lengths: [12, 16, 20, 25, 30, 40, 50, 60, 80] },
  { d: 10, pitch: "1.5", lengths: [16, 20, 25, 30, 40, 50, 60, 80, 100] },
  { d: 12, pitch: "1.75", lengths: [20, 25, 30, 40, 50, 60, 80, 100] },
];

const HEX_CAP_GRADES = [
  { grade: "8.8", material: "Medium-carbon steel, quenched + tempered", tensileMpa: 800 },
  { grade: "10.9", material: "Alloy steel, quenched + tempered", tensileMpa: 1040 },
  { grade: "12.9", material: "Alloy steel, quenched + tempered", tensileMpa: 1220 },
  { grade: "A2-70", material: "Stainless 304 (18/8)", tensileMpa: 700 },
  { grade: "A4-70", material: "Stainless 316 (marine)", tensileMpa: 700 },
];

function generateFasteners(): StandardPart[] {
  const out: StandardPart[] = [];
  for (const s of HEX_CAP_METRIC) {
    for (const g of HEX_CAP_GRADES.slice(0, 3)) { // steel grades only for volume
      out.push({
        slug: `m${s.d}-hex-cap-${g.grade.replace(".", "-").toLowerCase()}`,
        name: `M${s.d} × pitch ${s.pitch} Hex Cap Screw — Grade ${g.grade}`,
        category: "fastener",
        material: g.material,
        specs: {
          "Nominal Ø": `${s.d} mm`,
          "Thread pitch": `${s.pitch} mm (coarse)`,
          "Head type": "Hex cap",
          "Grade": g.grade,
          "Tensile strength": `${g.tensileMpa} MPa`,
          "Standard": "DIN 933 / ISO 4017",
          "Available lengths": `${s.lengths.join(", ")} mm`,
        },
        useCases: ["Structural fastening", "Machine tool assembly", "Bolt-together frames"],
        customizable: ["Special lengths outside stock range", "Different plating (zinc, black oxide, anodize)", "Drilled head for safety wire"],
        approxPrice: g.grade === "12.9" ? "$0.30–$2.00 ea" : "$0.10–$1.00 ea",
        keywords: `M${s.d} hex cap screw grade ${g.grade} DIN 933 metric bolt`,
      });
    }
  }
  return out;
}

const BEARINGS: StandardPart[] = [
  { slug: "608-2rs-skf", name: "608-2RS Deep-Groove Ball Bearing", category: "bearing", brand: "SKF", material: "Chrome steel (52100), NBR rubber seals", specs: { "Bore Ø": "8 mm", "Outer Ø": "22 mm", "Width": "7 mm", "Dynamic load": "3.45 kN", "Static load": "1.37 kN", "Max speed (open)": "40,000 RPM", "Max speed (sealed)": "24,000 RPM", "Standard": "ISO 15" }, useCases: ["Skateboard wheels", "Fidget spinners", "General small-machinery"], customizable: ["Custom seal material for chemical resistance", "Ceramic hybrid for high speed"], approxPrice: "$3–$8 ea", keywords: "608-2RS SKF deep groove ball bearing 8mm bore" },
  { slug: "6205-2rs-skf", name: "6205-2RS Deep-Groove Ball Bearing", category: "bearing", brand: "SKF", material: "Chrome steel, NBR seals", specs: { "Bore Ø": "25 mm", "Outer Ø": "52 mm", "Width": "15 mm", "Dynamic load": "14.0 kN", "Static load": "7.8 kN", "Max speed": "13,000 RPM", "Standard": "ISO 15" }, useCases: ["Electric motor shafts", "Pump shafts", "Robotics joints"], customizable: ["Custom shaft-adapter housing", "Ceramic ball hybrid"], approxPrice: "$8–$25 ea", keywords: "6205-2RS SKF bearing 25mm bore electric motor" },
  { slug: "6206-2rs-skf", name: "6206-2RS Deep-Groove Ball Bearing", category: "bearing", brand: "SKF", material: "Chrome steel, NBR seals", specs: { "Bore Ø": "30 mm", "Outer Ø": "62 mm", "Width": "16 mm", "Dynamic load": "20.3 kN", "Static load": "11.2 kN" }, useCases: ["Larger electric motors", "Gearbox input shafts", "Conveyor rollers"], customizable: ["Housing block with mounting flange"], approxPrice: "$12–$30 ea", keywords: "6206-2RS SKF bearing 30mm bore" },
  { slug: "6001-2rs-skf", name: "6001-2RS Deep-Groove Ball Bearing", category: "bearing", brand: "SKF", material: "Chrome steel, NBR seals", specs: { "Bore Ø": "12 mm", "Outer Ø": "28 mm", "Width": "8 mm", "Dynamic load": "5.4 kN" }, useCases: ["Small motors", "Fan hubs", "Camera gimbals"], customizable: ["Ceramic hybrid", "Extended-life grease"], approxPrice: "$3–$10 ea", keywords: "6001-2RS SKF bearing 12mm bore" },
  { slug: "linear-ball-bushing-lm8uu", name: "LM8UU Linear Ball Bushing", category: "bearing", brand: "MISUMI", material: "Bearing steel, PTFE seals", specs: { "Shaft Ø": "8 mm", "Outer Ø": "15 mm", "Length": "24 mm", "Dynamic load": "195 N", "Max speed": "3 m/s" }, useCases: ["3D printer axis", "DIY CNC gantries", "Small robotics slides"], customizable: ["Custom mounting bracket in aluminum"], approxPrice: "$3–$8 ea", keywords: "LM8UU linear bearing 8mm shaft 3d printer" },
  { slug: "hk-1010-needle-bearing", name: "HK 1010 Needle Roller Bearing (drawn cup)", category: "bearing", brand: "INA", material: "Bearing steel", specs: { "Bore Ø": "10 mm", "Outer Ø": "14 mm", "Width": "10 mm" }, useCases: ["Automotive linkages", "Gearbox internals", "Rotary tools"], customizable: ["Housing with press fit +0.020mm interference"], approxPrice: "$3–$8 ea", keywords: "HK 1010 needle bearing drawn cup 10mm" },
];

const MOTORS: StandardPart[] = [
  { slug: "nema-17-stepper-1-8", name: "NEMA 17 Stepper Motor · 1.8° / step", category: "motor", material: "Aluminum + laminated steel + neodymium", specs: { "Frame": "42mm × 42mm", "Step angle": "1.8° (200 steps/rev)", "Rated current": "1.68 A", "Holding torque": "0.44 N·m", "Shaft Ø": "5 mm", "Shaft length": "22 mm", "Weight": "280 g" }, useCases: ["3D printers", "Small CNC gantries", "Robotics", "Camera pans"], customizable: ["Custom motor mount in machined aluminum", "Extended-shaft variant", "Shaft coupler + pulley matched"], approxPrice: "$14–$25 ea", keywords: "NEMA 17 stepper motor 1.8 degree 3d printer" },
  { slug: "nema-23-stepper-1-8", name: "NEMA 23 Stepper Motor · 1.8° / step", category: "motor", material: "Aluminum + laminated steel + neodymium", specs: { "Frame": "57mm × 57mm", "Step angle": "1.8° (200 steps/rev)", "Rated current": "2.8 A", "Holding torque": "1.9 N·m", "Shaft Ø": "6.35 mm (1/4 in)", "Weight": "1.0 kg" }, useCases: ["CNC routers", "Lathe axis drives", "Industrial robotics"], customizable: ["Machined aluminum mount", "Shaft coupler package"], approxPrice: "$35–$60 ea", keywords: "NEMA 23 stepper motor CNC" },
  { slug: "brushless-2212-1400kv", name: "Brushless Outrunner Motor 2212 · 1400 KV", category: "motor", material: "Aluminum + neodymium magnets", specs: { "Stator diameter": "22 mm", "Stator height": "12 mm", "KV rating": "1400", "Voltage": "2-3S LiPo (7.4-11.1V)", "Weight": "56 g", "Shaft Ø": "3.17 mm" }, useCases: ["FPV quadcopter builds", "Small drone frames", "Model aircraft"], customizable: ["3D-printed motor mount", "Ducted-fan housing"], approxPrice: "$15–$30 ea", keywords: "brushless motor 2212 1400 KV FPV drone" },
  { slug: "servo-mg996r", name: "MG996R Metal-Gear Servo", category: "motor", material: "ABS + metal gears", specs: { "Torque (4.8V)": "9.4 kg·cm", "Torque (6.0V)": "11 kg·cm", "Speed": "0.14 sec/60°", "Gear type": "Metal", "Weight": "55 g" }, useCases: ["RC vehicles", "Robot arm joints", "Small automation"], customizable: ["Custom horn in aluminum", "Servo mount bracket"], approxPrice: "$8–$15 ea", keywords: "MG996R servo metal gear robotics" },
];

const STANDOFFS: StandardPart[] = [
  { slug: "m3-brass-standoff-female-female", name: "M3 Brass Standoff · Female-Female", category: "standoff", material: "Brass, nickel-plated", specs: { "Thread": "M3", "OD": "5 mm hex", "Length range": "5–30 mm", "Torque limit": "0.6 N·m" }, useCases: ["PCB mounting", "Multi-board electronics stacks", "Raspberry Pi cases"], customizable: ["Custom length in 1mm increments", "Machined aluminum variant"], approxPrice: "$0.15–$0.30 ea", keywords: "M3 standoff brass PCB electronics" },
  { slug: "m2.5-brass-standoff-female-female", name: "M2.5 Brass Standoff · Female-Female", category: "standoff", material: "Brass, nickel-plated", specs: { "Thread": "M2.5", "OD": "4 mm hex", "Length range": "5–20 mm" }, useCases: ["Raspberry Pi cases", "Small PCBs"], customizable: ["Custom length"], approxPrice: "$0.15–$0.30 ea", keywords: "M2.5 standoff Raspberry Pi PCB" },
  { slug: "4-40-brass-standoff", name: "4-40 Brass Standoff · Female-Female", category: "standoff", material: "Brass", specs: { "Thread": "4-40 UNC", "OD": "3/16 in hex", "Length range": "1/4–1 in" }, useCases: ["US-spec electronics", "Legacy hardware"], customizable: ["Custom length", "Imperial to metric adapters"], approxPrice: "$0.20–$0.50 ea", keywords: "4-40 imperial standoff PCB" },
];

const INSERTS: StandardPart[] = [
  { slug: "helicoil-m4-x-6mm", name: "Heli-Coil Screw-Thread Insert · M4 × 6mm", category: "insert", brand: "Heli-Coil", material: "Stainless 304", specs: { "Thread": "M4 × 0.7", "Length": "1.5 × Ø (6mm)", "Installation": "Requires 4.2mm STI tap", "Standard": "MIL-I-8846" }, useCases: ["Reinforcing threads in aluminum + plastics", "Field-repair stripped threads"], customizable: ["Custom length in 0.5×, 1×, 1.5×, 2×, 3× diameter"], approxPrice: "$1.00–$3.00 ea", keywords: "Heli-Coil M4 stainless insert thread repair" },
  { slug: "helicoil-1-4-20-inch", name: "Heli-Coil Screw-Thread Insert · 1/4-20", category: "insert", brand: "Heli-Coil", material: "Stainless 304", specs: { "Thread": "1/4-20 UNC", "Standard length": "1× Ø (0.25 in)" }, useCases: ["Aerospace threaded holes in aluminum", "Repair"], customizable: ["Custom drilled boss with STI thread"], approxPrice: "$1.20–$3.50 ea", keywords: "Heli-Coil 1/4-20 stainless insert aerospace" },
  { slug: "heat-set-brass-m3-4mm", name: "Heat-Set Brass Insert · M3 · 4mm OD", category: "insert", material: "Brass, nickel-plated", specs: { "Thread": "M3 × 0.5", "OD": "4 mm", "Length": "5.7 mm", "Install temp": "220–260°C soldering iron" }, useCases: ["Threaded hole in 3D-printed parts", "Injection-molded parts"], customizable: ["Pre-drilled boss geometry to fit your CAD"], approxPrice: "$0.10–$0.30 ea", keywords: "heat set insert M3 brass 3d printed part" },
  { slug: "heat-set-brass-m4-6mm", name: "Heat-Set Brass Insert · M4 · 6mm OD", category: "insert", material: "Brass, nickel-plated", specs: { "Thread": "M4 × 0.7", "OD": "6 mm", "Length": "8.1 mm", "Install temp": "220–260°C" }, useCases: ["3D-printed enclosure fasteners", "Structural threaded joints in prints"], customizable: ["Machined aluminum boss", "Custom insertion tool"], approxPrice: "$0.15–$0.40 ea", keywords: "heat set insert M4 brass 3d printed" },
];

const LINEAR_MOTION: StandardPart[] = [
  { slug: "8mm-linear-shaft-hardened", name: "8mm Hardened Linear Shaft", category: "linear-motion", material: "Case-hardened chrome-plated steel", specs: { "Ø": "8 mm ±0.010", "Hardness": "60 HRC surface", "Surface finish": "Ra 0.2 µm", "Available lengths": "100mm to 2000mm cut-to-order" }, useCases: ["3D printer X/Y/Z axes", "DIY CNC linear rails", "Small automation"], customizable: ["Cut-to-length in 1mm increments", "Custom end machining (flats, drilled holes, threads)"], approxPrice: "$3–$30 (length dependent)", keywords: "8mm linear shaft hardened chrome 3d printer" },
  { slug: "12mm-linear-shaft-hardened", name: "12mm Hardened Linear Shaft", category: "linear-motion", material: "Case-hardened chrome-plated steel", specs: { "Ø": "12 mm ±0.011", "Hardness": "60 HRC surface", "Available lengths": "100–3000 mm" }, useCases: ["Larger CNC gantries", "Industrial linear guides"], customizable: ["Cut + end machining"], approxPrice: "$5–$50", keywords: "12mm linear shaft hardened CNC" },
  { slug: "misumi-linear-guide-hgh-15", name: "MISUMI HGH15 Linear Guide Rail (Hiwin style)", category: "linear-motion", brand: "MISUMI", material: "GCr15 bearing steel", specs: { "Rail width": "15 mm", "Rail height": "15 mm", "Preload options": "Z0, Z1, Z2", "Available lengths": "100–4000 mm" }, useCases: ["Precision CNC axes", "Robot arms", "Semiconductor equipment"], customizable: ["Cut rails", "Custom carriage machining"], approxPrice: "$40–$400 per assembly", keywords: "HGH15 linear guide rail MISUMI Hiwin CNC" },
];

const SPRINGS: StandardPart[] = [
  { slug: "compression-spring-10x25mm", name: "Compression Spring · Ø10 × 25mm free length", category: "spring", material: "Music wire (ASTM A228)", specs: { "OD": "10 mm", "Wire Ø": "1.0 mm", "Free length": "25 mm", "Solid length": "8 mm", "Rate": "2.4 N/mm", "Max deflection": "17 mm" }, useCases: ["Push-buttons", "Return mechanisms", "Latching hinges"], customizable: ["Custom rate, wire diameter, or coil count", "Stainless variant for corrosion"], approxPrice: "$0.30–$1.00 ea", keywords: "compression spring 10mm music wire" },
  { slug: "extension-spring-8x30mm", name: "Extension Spring · Ø8 × 30mm free length", category: "spring", material: "Music wire", specs: { "OD": "8 mm", "Wire Ø": "0.8 mm", "Free length": "30 mm", "Max extension": "45 mm", "Initial tension": "3 N" }, useCases: ["Screen door closers", "Trigger return mechanisms"], customizable: ["Custom hooks (loop, threaded, ball)"], approxPrice: "$0.50–$1.50 ea", keywords: "extension spring music wire" },
];

const GEARS: StandardPart[] = [
  { slug: "spur-gear-module-1-20t", name: "Spur Gear · Module 1 · 20 teeth", category: "gear", material: "Acetal (Delrin)", specs: { "Module": "1.0", "Teeth": "20", "Pitch Ø": "20 mm", "OD": "22 mm", "Bore Ø": "6 mm" }, useCases: ["Small robotics", "Educational kits", "Timing mechanisms"], customizable: ["Custom bore size", "Machined aluminum or steel variant", "Custom face width"], approxPrice: "$3–$8 ea", keywords: "spur gear module 1 20 teeth Delrin" },
  { slug: "timing-pulley-gt2-20t", name: "GT2 Timing Pulley · 20 teeth · 6mm belt", category: "pulley", material: "Anodized aluminum", specs: { "Pitch": "2 mm", "Teeth": "20", "Bore Ø": "5 mm", "Belt width": "6 mm", "OD": "13 mm" }, useCases: ["3D printer belt drives", "Small conveyors", "Camera slides"], customizable: ["Custom bore, custom tooth count"], approxPrice: "$3–$8 ea", keywords: "GT2 timing pulley 20 teeth 3D printer" },
];

const COUPLINGS: StandardPart[] = [
  { slug: "flexible-shaft-coupling-5-8mm", name: "Flexible Beam Shaft Coupling · 5mm × 8mm", category: "shaft-coupling", material: "Aluminum body", specs: { "Bore 1": "5 mm", "Bore 2": "8 mm", "OD": "18 mm", "Length": "25 mm", "Torque": "1.2 N·m", "Max misalignment": "±1°" }, useCases: ["Stepper motor to leadscrew", "Encoder to shaft"], customizable: ["Custom bore combinations", "Higher torque variant"], approxPrice: "$3–$10 ea", keywords: "flexible shaft coupling 5mm 8mm stepper" },
];

const HINGES: StandardPart[] = [
  { slug: "small-butt-hinge-stainless", name: "Small Butt Hinge · Stainless 304 · 25mm", category: "hinge", material: "Stainless 304", specs: { "Leaf": "25 × 12 mm", "Pin Ø": "3 mm", "Thickness": "1 mm" }, useCases: ["Small enclosures", "Access panels", "Instrument covers"], customizable: ["Custom leaf size", "Countersunk or non-CSK holes"], approxPrice: "$1–$3 ea", keywords: "butt hinge stainless small enclosure" },
];

export const STANDARD_PARTS: StandardPart[] = [
  ...generateFasteners(),
  ...BEARINGS,
  ...MOTORS,
  ...STANDOFFS,
  ...INSERTS,
  ...LINEAR_MOTION,
  ...SPRINGS,
  ...GEARS,
  ...COUPLINGS,
  ...HINGES,
];

export const CATEGORY_LABELS: Record<PartCategory, { label: string; description: string }> = {
  fastener: { label: "Fasteners", description: "Bolts, screws, hex caps, socket heads. Metric + imperial." },
  bearing: { label: "Bearings", description: "Ball, roller, needle, linear. SKF / NSK / MISUMI stock." },
  motor: { label: "Motors", description: "Steppers, brushless, servos. NEMA + hobby sizes." },
  "linear-motion": { label: "Linear motion", description: "Shafts, rails, ball screws, carriages." },
  "shaft-coupling": { label: "Shaft couplings", description: "Flexible, rigid, jaw couplers." },
  spring: { label: "Springs", description: "Compression, extension, torsion." },
  gasket: { label: "Gaskets & seals", description: "O-rings, flat gaskets, U-cups." },
  hinge: { label: "Hinges", description: "Butt, piano, concealed, gas struts." },
  standoff: { label: "Standoffs & spacers", description: "PCB standoffs, spacers, jack posts." },
  insert: { label: "Threaded inserts", description: "Heli-Coil, heat-set, press-fit." },
  bushing: { label: "Bushings", description: "Oilite, DU, PTFE-lined, flanged." },
  pulley: { label: "Pulleys & belts", description: "GT2, HTD, V-belt sheaves." },
  gear: { label: "Gears", description: "Spur, helical, bevel, worm." },
  connector: { label: "Connectors", description: "USB, JST, XT60, Molex, Deutsch." },
  washer: { label: "Washers", description: "Flat, split-lock, tooth-lock, Belleville." },
  nut: { label: "Nuts", description: "Hex, nylon-lock, wing, cap." },
};

export const getPartBySlug = (slug: string) => STANDARD_PARTS.find((p) => p.slug === slug);
export const getPartsByCategory = (cat: PartCategory) => STANDARD_PARTS.filter((p) => p.category === cat);
export const getAllPartCategories = (): PartCategory[] => Array.from(new Set(STANDARD_PARTS.map((p) => p.category)));
