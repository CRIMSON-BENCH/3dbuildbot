export interface SolverMeta {
  slug: string;
  name: string;
  category: "mechanics" | "thermal" | "fluid" | "machining" | "electrical" | "math" | "materials";
  short: string;
  formula: string;
  keywords: string;
}

export const SOLVERS: SolverMeta[] = [
  // Mechanics — original 7
  { slug: "beam-deflection", name: "Beam Deflection Calculator", category: "mechanics", short: "Cantilever + simply-supported + fixed-fixed beam deflection under point and distributed loads.", formula: "δ = FL³ / (3EI) (cantilever, tip load)", keywords: "beam deflection cantilever simply supported EI moment of inertia elastic modulus" },
  { slug: "moment-of-inertia", name: "Second Moment of Area (I)", category: "mechanics", short: "Cross-section moment of inertia for rectangle, circle, hollow tube, I-beam, and channel.", formula: "I_rect = bh³/12 · I_circle = πd⁴/64", keywords: "moment of inertia second moment area section modulus I-beam" },
  { slug: "column-buckling", name: "Euler Column Buckling", category: "mechanics", short: "Critical buckling load for slender columns under compression with various end conditions.", formula: "P_cr = π²EI / (KL)²", keywords: "Euler buckling column critical load slenderness ratio effective length" },
  { slug: "bolt-torque", name: "Bolt Torque Calculator", category: "mechanics", short: "K-factor torque-tension for imperial and metric threaded fasteners across common materials.", formula: "T = K · D · F", keywords: "bolt torque preload K-factor thread grade 5 grade 8 metric class 8.8 10.9 12.9" },
  { slug: "hertzian-contact", name: "Hertzian Contact Stress", category: "mechanics", short: "Sphere-on-flat and cylinder-on-cylinder contact pressure, area, and deformation.", formula: "p_max = (3F)/(2πa²)", keywords: "Hertzian contact stress sphere cylinder bearing wear" },
  { slug: "pressure-vessel", name: "Thin-Wall Pressure Vessel", category: "mechanics", short: "Hoop and longitudinal stress for thin-walled cylindrical and spherical pressure vessels per ASME.", formula: "σ_hoop = PD/(2t)", keywords: "pressure vessel thin wall hoop stress ASME cylindrical spherical" },
  { slug: "natural-frequency", name: "Beam Natural Frequency", category: "mechanics", short: "First natural frequency of cantilever, simply-supported, and fixed-fixed beams for resonance avoidance.", formula: "f₁ = (1.875²/2π) · √(EI/mL⁴)", keywords: "natural frequency beam vibration modal resonance eigenfrequency" },
  // Mechanics — new
  { slug: "shaft-torsion", name: "Shaft Torsion", category: "mechanics", short: "Shear stress and angle of twist for solid and hollow shafts under torque.", formula: "τ = Tr/J · θ = TL/(GJ)", keywords: "shaft torsion twist shear stress polar moment inertia" },
  { slug: "combined-stress", name: "Combined Bending + Torsion", category: "mechanics", short: "Von Mises equivalent stress for shafts under combined bending moment and torque.", formula: "σ_eq = √(σ² + 3τ²)", keywords: "combined stress bending torsion von Mises equivalent shaft" },
  { slug: "bolt-preload", name: "Bolt Preload + Joint Stiffness", category: "mechanics", short: "Preload distribution between bolt and clamped member for a bolted joint.", formula: "F_bolt = F_preload + (k_b/(k_b+k_m)) · F_ext", keywords: "bolt preload joint stiffness clamped member external load" },
  { slug: "gear-lewis", name: "Gear Tooth Bending Strength (Lewis)", category: "mechanics", short: "Bending stress at gear tooth root using Lewis form factor.", formula: "σ = W_t / (F · m · Y)", keywords: "gear tooth Lewis bending strength spur gear module face width" },
  { slug: "spring-rate", name: "Helical Spring Rate", category: "mechanics", short: "Spring rate and max shear stress for round-wire compression springs.", formula: "k = Gd⁴ / (8D³N)", keywords: "spring rate helical compression wire diameter coils" },
  { slug: "bearing-life-l10", name: "Bearing L10 Life", category: "mechanics", short: "Rolling contact bearing life in millions of revolutions per ISO 281.", formula: "L₁₀ = (C/P)^p (p=3 ball, 10/3 roller)", keywords: "bearing life L10 dynamic load capacity ISO 281 ball roller" },

  // Thermal
  { slug: "thermal-expansion", name: "Thermal Expansion", category: "thermal", short: "Linear and volumetric expansion for common engineering materials — CTE lookup + delta length.", formula: "ΔL = α · L₀ · ΔT", keywords: "thermal expansion CTE coefficient aluminum steel titanium invar" },
  { slug: "heat-transfer-conduction", name: "1D Conduction Heat Transfer", category: "thermal", short: "Steady-state 1D conduction through single or composite walls with material R-values.", formula: "q = kAΔT/L", keywords: "heat transfer conduction Fourier's law thermal resistance R-value" },
  { slug: "convection-coefficient", name: "Convection Heat Coefficient", category: "thermal", short: "Convective heat transfer coefficient from Nusselt number correlations.", formula: "h = Nu · k / L", keywords: "convection heat transfer coefficient Nusselt Prandtl Reynolds forced free" },
  { slug: "radiation-heat", name: "Radiation Heat Transfer", category: "thermal", short: "Radiative heat flux between two gray surfaces using Stefan-Boltzmann + view factor.", formula: "q = εσ(T₁⁴ − T₂⁴)", keywords: "radiation heat transfer Stefan-Boltzmann emissivity view factor" },
  { slug: "fin-efficiency", name: "Fin Efficiency", category: "thermal", short: "Straight rectangular fin efficiency + total heat dissipation for extended-surface cooling.", formula: "η_fin = tanh(mL)/(mL)", keywords: "fin efficiency extended surface heat sink rectangular pin" },

  // Fluid
  { slug: "reynolds-number", name: "Reynolds Number + Flow Regime", category: "fluid", short: "Determine laminar, transitional, or turbulent flow for pipes, ducts, and external flow.", formula: "Re = ρVD/μ", keywords: "Reynolds number laminar turbulent pipe flow viscosity" },
  { slug: "pipe-pressure-drop", name: "Pipe Pressure Drop (Darcy-Weisbach)", category: "fluid", short: "Frictional pressure drop through pipes and ducts using Darcy friction factor.", formula: "ΔP = f · (L/D) · (ρV²/2)", keywords: "pipe pressure drop Darcy-Weisbach friction factor Moody head loss" },
  { slug: "orifice-flow", name: "Orifice Flow Rate", category: "fluid", short: "Volumetric flow rate through sharp-edged orifice from differential pressure.", formula: "Q = C_d · A · √(2ΔP/ρ)", keywords: "orifice flow discharge coefficient volumetric pressure drop" },
  { slug: "pump-npsh", name: "Pump NPSH Available", category: "fluid", short: "Net Positive Suction Head Available at pump inlet to avoid cavitation.", formula: "NPSH_a = (P_atm − P_vap)/(ρg) − h_loss ± h_stat", keywords: "pump NPSH cavitation suction head vapor pressure" },
  { slug: "drag-coefficient", name: "Drag Force Calculator", category: "fluid", short: "Drag force on immersed object using drag coefficient for common shapes.", formula: "F_d = ½ρV²C_d·A", keywords: "drag force coefficient sphere cylinder plate streamlined bluff body" },

  // Machining
  { slug: "feed-speed", name: "CNC Feed & Speed Calculator", category: "machining", short: "Surface speed (SFM/SMM), RPM, chip load, and feed rate for milling and turning across common tool/material combos.", formula: "RPM = (SFM · 3.82)/D · IPM = RPM · Chip Load · Flutes", keywords: "feed speed CNC milling turning SFM RPM chip load IPT IPM aluminum steel titanium" },
  { slug: "tap-drill", name: "Tap Drill Chart + Calculator", category: "machining", short: "Correct drill size for tapping — imperial coarse/fine + metric threads with % thread engagement.", formula: "Drill Ø = Nominal − (0.01299 × %thread)/TPI (imperial)", keywords: "tap drill chart metric imperial UNC UNF thread engagement" },
  { slug: "sheet-metal-bend", name: "Sheet Metal Bend Allowance (K-factor)", category: "machining", short: "Bend allowance, setback, and flat-pattern length for press-brake sheet metal.", formula: "BA = θ(π/180)(R + Kt)", keywords: "sheet metal bend allowance K-factor press brake flat pattern" },
  { slug: "punch-force", name: "Sheet Metal Punch Force", category: "machining", short: "Punching force for round + rectangular punches through sheet metal.", formula: "F = perimeter × t × τ_shear", keywords: "punch force sheet metal shear strength blanking punching" },
  { slug: "cnc-cost-time", name: "CNC Machining Time + Cost Estimator", category: "machining", short: "Rough machining time from material removal volume + machinist hourly rate.", formula: "t = V_removed / MRR · Cost = t × $/hr + material", keywords: "CNC machining time cost estimator material removal rate hourly" },

  // Math
  { slug: "gd-t-stack", name: "GD&T Tolerance Stack (Monte Carlo)", category: "math", short: "Chain feature tolerances and get worst-case + RSS + Monte-Carlo Cpk distribution.", formula: "σ_stack = √(Σσᵢ²) · Cpk = min((USL-μ), (μ-LSL))/(3σ)", keywords: "GD&T tolerance stack Monte Carlo Cpk process capability" },
  { slug: "unit-converter", name: "Engineering Unit Converter", category: "math", short: "Length, mass, force, pressure, temperature, torque, and power — metric ↔ imperial + SI ↔ engineering units.", formula: "1 in = 25.4 mm · 1 psi = 6894.76 Pa · 1 lbf = 4.448 N", keywords: "unit converter metric imperial SI engineering length mass force pressure torque" },
  { slug: "linear-system", name: "Linear Equation Solver (Ax=b)", category: "math", short: "Solve n×n linear system by Gaussian elimination, up to 6×6.", formula: "x = A⁻¹b (or Gauss-elim)", keywords: "linear system Gaussian elimination matrix equation solver Ax=b" },
  { slug: "polynomial-roots", name: "Polynomial Root Finder", category: "math", short: "Real roots of quadratic, cubic, and quartic polynomials with numerical bisection fallback.", formula: "ax² + bx + c = 0 → x = (-b ± √(b²-4ac))/2a", keywords: "polynomial roots quadratic cubic quartic bisection Newton-Raphson" },
  { slug: "statistics-basic", name: "Statistics Calculator", category: "math", short: "Mean, median, standard deviation, variance, percentiles for a set of data points.", formula: "σ = √(Σ(x−μ)²/n) · Cp = (USL−LSL)/(6σ)", keywords: "statistics mean median standard deviation variance percentile Cp Cpk" },

  // Electrical (new category)
  { slug: "ohms-law", name: "Ohm's Law + Power", category: "electrical", short: "Voltage, current, resistance, power calculations. Enter any two, get the rest.", formula: "V = IR · P = VI = I²R = V²/R", keywords: "Ohm's law voltage current resistance power watts" },
  { slug: "wire-gauge", name: "AWG Wire Gauge Selector", category: "electrical", short: "Correct wire gauge for ampacity + voltage-drop-limited length.", formula: "ΔV = 2 × I × R_wire × L", keywords: "AWG wire gauge ampacity voltage drop copper aluminum" },
  { slug: "led-resistor", name: "LED Series Resistor", category: "electrical", short: "Series resistor to safely drive an LED from a supply voltage.", formula: "R = (V_supply − V_LED) / I_LED", keywords: "LED resistor forward voltage current limiting" },
];

export const getSolverBySlug = (slug: string) => SOLVERS.find((s) => s.slug === slug);
export const solversByCategory = (cat: SolverMeta["category"]) => SOLVERS.filter((s) => s.category === cat);
