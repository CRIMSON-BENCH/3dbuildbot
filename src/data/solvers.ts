export interface SolverMeta {
  slug: string;
  name: string;
  category: "mechanics" | "thermal" | "fluid" | "machining" | "electrical" | "math" | "materials";
  short: string;
  formula: string;
  keywords: string;
}

export const SOLVERS: SolverMeta[] = [
  { slug: "beam-deflection", name: "Beam Deflection Calculator", category: "mechanics", short: "Cantilever + simply-supported + fixed-fixed beam deflection under point and distributed loads.", formula: "δ = FL³ / (3EI) (cantilever, tip load)", keywords: "beam deflection cantilever simply supported EI moment of inertia elastic modulus" },
  { slug: "moment-of-inertia", name: "Second Moment of Area (I)", category: "mechanics", short: "Cross-section moment of inertia for rectangle, circle, hollow tube, I-beam, and channel.", formula: "I_rect = bh³/12 · I_circle = πd⁴/64", keywords: "moment of inertia second moment area section modulus I-beam" },
  { slug: "column-buckling", name: "Euler Column Buckling", category: "mechanics", short: "Critical buckling load for slender columns under compression with various end conditions.", formula: "P_cr = π²EI / (KL)²", keywords: "Euler buckling column critical load slenderness ratio effective length" },
  { slug: "bolt-torque", name: "Bolt Torque Calculator", category: "mechanics", short: "K-factor torque-tension for imperial and metric threaded fasteners across common materials.", formula: "T = K · D · F", keywords: "bolt torque preload K-factor thread grade 5 grade 8 metric class 8.8 10.9 12.9" },
  { slug: "hertzian-contact", name: "Hertzian Contact Stress", category: "mechanics", short: "Sphere-on-flat and cylinder-on-cylinder contact pressure, area, and deformation.", formula: "p_max = (3F)/(2πa²)", keywords: "Hertzian contact stress sphere cylinder bearing wear" },
  { slug: "pressure-vessel", name: "Thin-Wall Pressure Vessel", category: "mechanics", short: "Hoop and longitudinal stress for thin-walled cylindrical and spherical pressure vessels per ASME.", formula: "σ_hoop = PD/(2t)", keywords: "pressure vessel thin wall hoop stress ASME cylindrical spherical" },
  { slug: "natural-frequency", name: "Beam Natural Frequency", category: "mechanics", short: "First natural frequency of cantilever, simply-supported, and fixed-fixed beams for resonance avoidance.", formula: "f₁ = (1.875²/2π) · √(EI/mL⁴)", keywords: "natural frequency beam vibration modal resonance eigenfrequency" },
  { slug: "thermal-expansion", name: "Thermal Expansion", category: "thermal", short: "Linear and volumetric expansion for common engineering materials — CTE lookup + delta length.", formula: "ΔL = α · L₀ · ΔT", keywords: "thermal expansion CTE coefficient aluminum steel titanium invar" },
  { slug: "heat-transfer-conduction", name: "1D Conduction Heat Transfer", category: "thermal", short: "Steady-state 1D conduction through single or composite walls with material R-values.", formula: "q = kAΔT/L", keywords: "heat transfer conduction Fourier's law thermal resistance R-value" },
  { slug: "reynolds-number", name: "Reynolds Number + Flow Regime", category: "fluid", short: "Determine laminar, transitional, or turbulent flow for pipes, ducts, and external flow.", formula: "Re = ρVD/μ", keywords: "Reynolds number laminar turbulent pipe flow viscosity" },
  { slug: "feed-speed", name: "CNC Feed & Speed Calculator", category: "machining", short: "Surface speed (SFM/SMM), RPM, chip load, and feed rate for milling and turning across common tool/material combos.", formula: "RPM = (SFM · 3.82)/D · IPM = RPM · Chip Load · Flutes", keywords: "feed speed CNC milling turning SFM RPM chip load IPT IPM aluminum steel titanium" },
  { slug: "tap-drill", name: "Tap Drill Chart + Calculator", category: "machining", short: "Correct drill size for tapping — imperial coarse/fine + metric threads with % thread engagement.", formula: "Drill Ø = Nominal − (0.01299 × %thread)/TPI (imperial)", keywords: "tap drill chart metric imperial UNC UNF thread engagement" },
  { slug: "gd-t-stack", name: "GD&T Tolerance Stack (Monte Carlo)", category: "math", short: "Chain feature tolerances and get worst-case + RSS + Monte-Carlo Cpk distribution.", formula: "σ_stack = √(Σσᵢ²) · Cpk = min((USL-μ), (μ-LSL))/(3σ)", keywords: "GD&T tolerance stack Monte Carlo Cpk process capability" },
  { slug: "unit-converter", name: "Engineering Unit Converter", category: "math", short: "Length, mass, force, pressure, temperature, torque, and power — metric ↔ imperial + SI ↔ engineering units.", formula: "1 in = 25.4 mm · 1 psi = 6894.76 Pa · 1 lbf = 4.448 N", keywords: "unit converter metric imperial SI engineering length mass force pressure torque" },
];

export const getSolverBySlug = (slug: string) => SOLVERS.find((s) => s.slug === slug);
export const solversByCategory = (cat: SolverMeta["category"]) => SOLVERS.filter((s) => s.category === cat);
