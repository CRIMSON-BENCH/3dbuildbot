export interface CaseStudy {
  slug: string;
  title: string;
  customer: string;
  industry: string;
  processUsed: string[];
  material: string;
  challenge: string;
  approach: string;
  results: {
    label: string;
    value: string;
  }[];
  quote?: {
    text: string;
    role: string;
    company: string;
  };
  timeline: string;
  keywords: string;
}

export const caseStudies: CaseStudy[] = [
  // ============================================================
  // AEROSPACE & DEFENSE (5)
  // ============================================================
  {
    slug: "aerospace-bracket-topology-iteration",
    title: "23 bracket iterations in 6 weeks: closing a flight-hardware design loop",
    customer: "Series B New-Space Launch Startup",
    industry: "Aerospace & Defense",
    processUsed: ["5-Axis CNC", "DMLS (Direct Metal Laser Sintering)", "HIP + Heat Treat"],
    material: "Ti-6Al-4V ELI (Grade 23)",
    challenge:
      "The customer's structures team was iterating a load-bearing avionics bay bracket that had failed to converge after four topology-optimization loops with their incumbent supplier. Each iteration cost roughly $4,800 and returned in 5-6 weeks, meaning a single bad FEA guess burned a full sprint. The bracket had to survive a 12-g quasi-static load case at 180 C, mate to two existing bulkhead patterns, and hit a mass target of under 340 g. With a static-fire test date locked and long-lead composite tooling already downstream, the team needed a supplier who could turn geometry in days, not weeks, without sacrificing traceable Ti-6Al-4V ELI stock or heat-treat certifications required for eventual flight qualification.",
    approach:
      "3DBuildBot moved the program onto a hybrid additive-then-subtractive workflow. Initial iterations were printed on an EOS M290 in Ti-6Al-4V ELI using a 30 um layer thickness, stress-relieved in argon at 800 C for 2 hours, then wire-EDM'd off the build plate. HIP was applied selectively (only iterations 14+, once geometry stabilized) to close residual porosity below 0.05% for fatigue-critical regions. Critical mating faces and the two bulkhead bolt patterns were finish-machined on a DMG Mori NHX 5000 5-axis mill to hold a true position of 0.025 mm, with datum schemes locked from iteration one so fixtures could be reused. Our platform's instant-DFM feedback flagged three overhang regions in the first upload that would have required support structures inside a closed pocket - the customer's own slicer had missed them. Later iterations moved to a nested build plate stacking four variants per print, cutting per-iteration material cost by 62%. Full CoC, mill certs, and CT-scan porosity maps were delivered with every article to keep the AS9100 paper trail intact for later flight qualification.",
    results: [
      { label: "Iterations shipped", value: "23 in 6 weeks" },
      { label: "Cost per iteration", value: "$4,800 -> $1,150" },
      { label: "Turnaround per iteration", value: "5-6 weeks -> 4-6 days" },
      { label: "Final bracket mass", value: "312 g (8% under target)" },
      { label: "Static-fire test", value: "Passed on first article" },
    ],
    quote: {
      text: "We stopped treating hardware iterations as a scheduling constraint. Our structures engineer could push a new topology on Monday and hold the printed part on Friday. That completely changed how aggressively we could optimize.",
      role: "Director of Structures",
      company: "Series B New-Space Launch Startup",
    },
    timeline: "6 weeks (23 iterations), first-article delivered in 5 days from RFQ",
    keywords: "titanium bracket, DMLS Ti-6Al-4V, aerospace topology optimization, flight hardware prototyping, AS9100 additive",
  },
  {
    slug: "itar-controlled-defense-housing",
    title: "ITAR-controlled electro-optical housing produced without an export headache",
    customer: "Prime Defense Contractor (DoD Tier-1)",
    industry: "Aerospace & Defense",
    processUsed: ["5-Axis CNC", "Wire EDM", "Type III Hard Anodize"],
    material: "Aluminum 6061-T651",
    challenge:
      "The customer needed a run of 48 electro-optical sensor housings for a classified ISR program. The part carried export-controlled geometry under ITAR Category XII, required full DFARS-compliant material sourcing, and needed a Type III hard-anodize coating stack that specific overseas vendors had botched on a previous lot. Prior lead time from their in-house shop was 14 weeks and the program manager needed articles in under 6 weeks to feed environmental testing. Complicating things, several offshore suppliers were already disqualified, and the customer's compliance team wanted a single US-based supplier who could handle machining, plating, and inspection under one ITAR-registered roof to eliminate cross-border data handoffs.",
    approach:
      "The job ran entirely inside our ITAR-registered US supplier network with data isolated to cleared personnel and an air-gapped file-review path. Material was sourced from a DFARS-compliant domestic mill with full CMTRs traced to melt. The housings were roughed on a 4-axis Haas VF-4SS to leave a 0.5 mm envelope, then finish-machined on a Matsuura MX-520 5-axis to hold a bore true position of 0.015 mm across three optical mounting features. A tight-tolerance internal channel that would have required EDM at the incumbent shop was replaced with a 3.0 mm ball-nose helical toolpath generated in WorkNC, cutting cycle time on that feature by 44%. Post-machining, parts were vibratory-deburred, chem-filmed per MIL-DTL-5541 Class 1A on internal threads, and hard-anodized to MIL-A-8625 Type III Class 2 at 0.002 in thickness with dyed-black seal. Every part received CMM inspection with a full FAI package per AS9102 Rev C, and export-controlled drawings were handled through our internal ITAR portal - no ad-hoc email attachments, no offshore CAM.",
    results: [
      { label: "Lead time", value: "14 weeks -> 5.5 weeks" },
      { label: "Housings delivered", value: "48/48 accepted" },
      { label: "Anodize rework rate", value: "0% (prior vendor: 22%)" },
      { label: "FAI package", value: "First-pass acceptance" },
      { label: "ITAR incidents", value: "Zero (single-domain data)" },
    ],
    timeline: "5.5 weeks from PO to shipment, FAI approved on first article",
    keywords: "ITAR machining, DFARS aluminum, hard anodize MIL-A-8625, defense sensor housing, AS9102 FAI",
  },
  {
    slug: "prototype-to-flight-cubesat-structure",
    title: "CubeSat primary structure: from PLA prototype to flight-qualified in one supplier",
    customer: "University-Spinout Smallsat Startup",
    industry: "Aerospace & Defense",
    processUsed: ["FDM (Prototype)", "5-Axis CNC (Flight)", "Chromate Conversion Coating"],
    material: "Aluminum 7075-T7351",
    challenge:
      "A three-founder smallsat startup had a 6U CubeSat launch slot 11 months out and no flight-qualified primary structure. They had been iterating an aluminum chassis in FDM PLA on a desktop Prusa and needed to move to a machined flight article, but every quote they got either treated them as a one-off (18-week lead, $32k NRE) or refused to work below MOQ. Their bus needed to hold thermal-vac cycling from -40 to +85 C, survive a 14 g-rms random vibration profile per GEVS, and mate to a standard 6U dispenser to a 0.05 mm envelope tolerance. They needed the same shop to help them evolve the prototype into a flight article without restarting fixture design each round.",
    approach:
      "We treated the program as a two-phase engagement on a single quote structure. Phase 1 shipped six FDM prototype chassis in PA-CF over four weeks so mechanical and thermal integration could proceed in parallel. Every prototype used the same reference datum scheme we would ultimately machine to, so integration fit-checks translated directly to flight geometry. Phase 2 machined the flight article from 7075-T7351 plate stock on a Mazak Integrex i-200, with critical mounting features held to 0.020 mm true position and internal pocket walls thinned to 1.2 mm through adaptive-clearing toolpaths in Mastercam. Stress relief was performed pre-finishing to prevent warp on the thin-walled sections. The structure was chromate-conversion-coated per MIL-DTL-5541 Class 3 (low resistance for grounding paths), fastener inserts were installed with Loctite 262 and torque-witnessed. Full CMM inspection, material CoC, and a compliance matrix mapped to GEVS were delivered with the flight article. Because the datum scheme carried across both phases, no fixture rework was needed between prototype and flight - a fact that saved roughly 3 weeks of program schedule.",
    results: [
      { label: "Total program cost", value: "$32k NRE quote -> $9,400 all-in" },
      { label: "Prototype to flight", value: "9 weeks (was 18+ weeks)" },
      { label: "Vibration test", value: "Passed GEVS 14 g-rms first shake" },
      { label: "Thermal-vac", value: "8 cycles, no dimensional drift" },
      { label: "Launch slot", value: "Met by 6 weeks" },
    ],
    quote: {
      text: "We are three people. Getting a flight-qualified aluminum chassis on the same PO as our first plastic prototype was the difference between making our launch window and losing our slot.",
      role: "Co-founder / Mechanical Lead",
      company: "University-Spinout Smallsat Startup",
    },
    timeline: "9 weeks from initial PLA prototype to delivered flight article",
    keywords: "CubeSat structure, 7075 aluminum machining, GEVS vibration, smallsat flight hardware, aerospace prototype to production",
  },
  {
    slug: "weight-optimization-uav-arm",
    title: "38% weight reduction on a Group 2 UAV arm via topology + lattice hybrid",
    customer: "Tactical UAV OEM (Anduril-tier)",
    industry: "Aerospace & Defense",
    processUsed: ["SLS (PA-CF Nylon)", "DMLS (Aluminum)", "Post-Machined Interfaces"],
    material: "Nylon 12 PA-CF (arm shell), AlSi10Mg (bracketry)",
    challenge:
      "A Group 2 UAV OEM needed to shave 400 g off the wet mass of a folding rotor arm to hit a new endurance target of 92 minutes hover time. The existing arm was machined 6061-T6 with a bonded-in carbon skin, weighed 1.12 kg per arm, and cost $840 per unit at 400/year volume. Aggressive topology optimization was blocked by traditional-machining draft and access constraints, and any redesign had to preserve the existing motor-mount pattern, servo actuation, and folding-latch interface so the wing-tree BOM did not cascade.",
    approach:
      "We ran a hybrid design study with the customer's mechanical team. The primary shell was redesigned as an SLS PA-CF part with an internal gyroid infill lattice (18% relative density) generated in nTop, keeping wall thickness at 1.8 mm and using engineered lattice transitions in high-stress corner regions. Parts were printed on an EOS P 500 at 175 C build-chamber temperature with a 12-hour cool-down cycle to minimize warp on the 380 mm-long geometry. Motor-mount inserts and the folding-latch bosses were printed separately in AlSi10Mg on a DMLS platform, HIP'd, and finish-machined to hold the M4 fastener pattern to 0.05 mm true position, then bonded into the SLS shell with 3M DP460 through a knurled interface. FEA correlated the hybrid to within 6% of test data on a static three-point-bend rig, and 20 arms were subjected to full flight-cycle endurance testing (2,000 folds, 40 h vibration) without failure. Volume production shifted to a nested SLS build packing 22 arms per plate, driving per-arm cost below the incumbent machined design.",
    results: [
      { label: "Arm weight", value: "1.12 kg -> 690 g (38% reduction)" },
      { label: "Endurance improvement", value: "+11.5 minutes hover time" },
      { label: "Unit cost at 400/yr", value: "$840 -> $415" },
      { label: "Fold cycles to failure", value: "2,000+ (no failure)" },
      { label: "BOM interfaces preserved", value: "100% (no downstream changes)" },
    ],
    timeline: "10 weeks concept to qualified article; 6 weeks to first production lot",
    keywords: "UAV arm topology, SLS PA-CF nylon, gyroid lattice, DMLS aluminum, weight reduction aerospace",
  },
  {
    slug: "as9102-first-article-hydraulic-manifold",
    title: "AS9102 first article on a 47-feature hydraulic manifold, accepted on first submission",
    customer: "Tier-1 Aerospace Hydraulics Supplier",
    industry: "Aerospace & Defense",
    processUsed: ["5-Axis CNC", "Cross-Drilled Bore Deburring", "Hydrostatic Pressure Test"],
    material: "Aluminum 2024-T351",
    challenge:
      "The customer's incumbent shop had failed an AS9102 Rev C first article submission twice on a flight-control hydraulic manifold - once on true position of cross-drilled ports, once on documentation completeness (missing ballooned drawing and Form 3 traceability). With the program review 8 weeks out, they needed a supplier who could deliver 12 first-article manifolds with a fully compliant FAI package on first submission. The part had 47 inspected features including cross-drilled 6.35 mm ports intersecting at 60 degrees, an internal cavity that required specialized deburring, and hydrostatic-test qualification at 4,500 psi.",
    approach:
      "We ran a full DFM review before quoting - flagging two feature callouts where the customer's drawing tolerance stack made assembly infeasible and jointly issuing an ECN before machining started. The manifolds were machined from 2024-T351 plate on a Mazak Variaxis j-600, using a fixture that presented all six sides in a single setup to eliminate stack-up error on the 47 inspected features. Cross-drilled ports were finish-reamed with carbide-tipped tools at 1,800 RPM to hold bore roundness under 0.008 mm. The critical intersecting-port deburr was accomplished with abrasive-flow machining (Extrude Hone), verified by borescope on 100% of parts. Every dimension on the drawing was ballooned and inspected on a Zeiss Contura CMM; Form 1, Form 2, and Form 3 were completed in-house with material CoCs traced back to melt. Hydrostatic test was performed at 1.5x working pressure (6,750 psi) for 5 minutes per part with pressure-decay logging. The FAI package - 214 pages including ballooned drawing, inspection reports, material CoCs, process CoCs, and non-conformance summary (zero NCRs) - was submitted 3 days after part completion and accepted without comment.",
    results: [
      { label: "FAI acceptance", value: "First submission, zero NCRs" },
      { label: "Features inspected", value: "47 of 47 in tolerance" },
      { label: "Hydrostatic test", value: "12/12 passed at 6,750 psi" },
      { label: "Program review", value: "Met with 3 weeks margin" },
      { label: "Documentation completeness", value: "214-page package, no back-and-forth" },
    ],
    timeline: "5 weeks from RFQ to FAI acceptance",
    keywords: "AS9102 FAI, hydraulic manifold machining, 2024 aluminum aerospace, cross-drilled ports, aerospace first article",
  },

  // ============================================================
  // ROBOTICS (3)
  // ============================================================
  {
    slug: "robotics-end-effector-adaptive-gripper",
    title: "Adaptive gripper end-effector: 4 designs converged to production in 5 weeks",
    customer: "Series C Warehouse Robotics Company",
    industry: "Robotics",
    processUsed: ["SLS (PA12)", "SLA (Elastomeric)", "5-Axis CNC (Interface Plate)"],
    material: "Nylon 12 (fingers), TPU 90A (contact pads), 7075-T6 (mounting plate)",
    challenge:
      "The robotics team was designing a bin-picking end-effector that had to grip 320 SKUs ranging from crushed cans to 2 kg boxed electronics. Their internal 3D printer could not produce the elastomeric contact pads at durometer, and they had been outsourcing to three different suppliers - one for the nylon backbone, one for TPU pads, one for the aluminum mounting plate - which meant every design iteration required assembly-fit debugging across three separate lead times. They needed a supplier who could co-print the assembly, keep interface tolerances stacked correctly, and turn iterations under a week to feed pick-success testing.",
    approach:
      "We collapsed the multi-vendor supply chain into a single production quote covering all three sub-components. The finger backbones were printed in PA12 on an EOS P 396 with a 100 um layer thickness, glass-bead blasted, then vapor-smoothed for surface finish (Ra 3.2 um) so gripped surfaces did not scuff cardboard. Elastomeric contact pads were produced on a Formlabs Form 3L using Elastic 50A resin - four durometer variants (50A, 70A, 90A, and a dual-shore stack) were run in parallel on a single build plate to accelerate the empirical grip study. The mounting plate was machined from 7075-T6 on a 5-axis Doosan DVF 5000 with tapped M3 patterns held to 0.020 mm true position so the printed fingers snapped into locating features with zero shim. Full assemblies were kitted at our facility - four gripper variants delivered per iteration - so the customer's robotics engineer received a bagged, labeled, ready-to-test kit every Friday. By iteration 4, the design converged; production ramped to 40 gripper assemblies per month on a standing PO.",
    results: [
      { label: "Iteration cadence", value: "3+ weeks -> 5 days" },
      { label: "Design iterations to convergence", value: "4 (vs. 9 estimated)" },
      { label: "Pick-success on 320 SKUs", value: "94.2% (target: 90%)" },
      { label: "Assembly time (customer side)", value: "Eliminated (kitted delivery)" },
      { label: "Cost per gripper", value: "$610 -> $340 (multi-vendor collapse)" },
    ],
    quote: {
      text: "The kitting was the unlock. We stopped being an integrator of three vendors and started being an end-user of one supplier. Iteration velocity roughly tripled.",
      role: "Robotics Hardware Lead",
      company: "Series C Warehouse Robotics Company",
    },
    timeline: "5 weeks concept to production release; 5-day iteration loop",
    keywords: "robotics end effector, SLS nylon gripper, TPU compliant fingers, adaptive gripper prototyping, robotics multi-material",
  },
  {
    slug: "robotics-chassis-humanoid",
    title: "Humanoid robot pelvis chassis: 4 kg mass target with integrated cable routing",
    customer: "Well-Funded Humanoid Robotics Startup",
    industry: "Robotics",
    processUsed: ["5-Axis CNC", "DMLS (Titanium ribs)", "Hardcoat Anodize"],
    material: "Aluminum 7075-T7351 (chassis), Ti-6Al-4V (ribs)",
    challenge:
      "A humanoid robotics startup needed a pelvis chassis that housed 14 actuators, routed 62 cables through internal channels, resisted 800 Nm of peak torque at the hip joints, and hit a mass budget of 4.0 kg. Their prior design was machined from a solid 7075 block, weighed 6.8 kg, and had external cable routing that snagged during gait testing. They wanted a stiffness-to-weight breakthrough without going to a full carbon layup (which would blow their per-unit cost budget at their planned 200-unit pilot run).",
    approach:
      "We proposed a hybrid design: a machined 7075-T7351 shell handling the primary hip-joint interfaces, with internal Ti-6Al-4V ribs printed on an EOS M290 in DMLS and bonded into the shell via cold-cure structural adhesive (Loctite EA 9394). The rib topology was optimized in nTop against the 800 Nm torque case, converging on a spaceframe pattern that carried load along principal stress paths. The 7075 shell was machined on a Mazak Variaxis j-600 in a single-setup fixture presenting six sides; internal cable channels (2.5 mm to 6 mm diameter, curved to R10 minimum) were 5-axis-milled with ball-nose finishing tools then vapor-honed to prevent cable jacket wear. The titanium ribs were HIP'd (100 MPa, 920 C, 2 h) to close residual porosity, precision-ground on the bond interfaces to 0.4 um Ra, and assembled into the shell with a keyed-and-bonded fit that let the joint carry both shear and moment loads. The finished chassis was hardcoat-anodized (MIL-A-8625 Type III Class 2, black) for wear resistance at cable exit points.",
    results: [
      { label: "Chassis mass", value: "6.8 kg -> 3.94 kg (42% reduction)" },
      { label: "Torsional stiffness", value: "+18% vs. original solid design" },
      { label: "Cable snag events (gait test)", value: "12/hr -> 0" },
      { label: "Unit cost at 200/yr", value: "$4,200 -> $2,850" },
      { label: "Peak torque test", value: "Passed 1.2x margin (960 Nm)" },
    ],
    timeline: "8 weeks concept to first article; 4 weeks per production article",
    keywords: "humanoid robot chassis, hybrid additive machining, 7075 titanium bonded assembly, internal cable routing, robotics topology optimization",
  },
  {
    slug: "robotics-harmonic-gearbox-housing",
    title: "Harmonic-drive gearbox housing: replacing MIM with SLM at pilot volume",
    customer: "Industrial Cobot Manufacturer",
    industry: "Robotics",
    processUsed: ["SLM (17-4 PH Stainless)", "Precision Grind", "Nitride Heat Treat"],
    material: "17-4 PH Stainless Steel (H900 condition)",
    challenge:
      "The cobot manufacturer's gearbox housing was traditionally metal-injection-molded (MIM) with a 22-week tool lead time and a $180k tooling NRE, viable only above 25,000 units/year. Their new mid-payload cobot was projected at 800 units in year one, ramping to 4,000. MIM tooling economics did not work at pilot volumes, but their existing machined alternative cost $340/housing and required a 15-day cycle that could not scale past 200/month. They needed a bridge process that landed near MIM piece-price at 800-4,000/year and could ramp without a tool refresh.",
    approach:
      "We qualified an SLM production line running 17-4 PH stainless on an SLM Solutions NXG XII 600 with a 60 um layer, then solution-annealed and precipitation-hardened to H900 condition (targeting 190 ksi UTS, HRC 44-48). The build plate nested 32 housings per print, driving per-part material cost down to $18. Critical bore surfaces (where the harmonic drive's flex-spline rides) were left with 0.4 mm stock and finish-ground on a Studer S33 cylindrical grinder to hold roundness under 0.005 mm and Ra 0.2 um. The mating flange face was ground on a Blanchard rotary grinder to 0.010 mm flatness. Housings received a gas nitride treatment (48 hours at 525 C) to build a 0.15 mm hardened case (65 HRC surface) on the wear interfaces, then were passivated per ASTM A967. First-article durability testing showed the SLM housings ran 12 million cycles at rated torque with zero measurable bore wear - matching MIM control samples. Production standard-worked at 320 housings/month with a 4-day lead time, with capacity headroom to 800/month by adding a second print plate.",
    results: [
      { label: "Per-housing cost", value: "$340 -> $87 (74% reduction)" },
      { label: "Tooling NRE avoided", value: "$180,000" },
      { label: "Lead time", value: "15 days -> 4 days" },
      { label: "Durability test", value: "12M cycles, zero bore wear" },
      { label: "Production capacity", value: "320/month, headroom to 800/month" },
    ],
    timeline: "12 weeks qualification (durability + FAI); production release week 13",
    keywords: "SLM 17-4 PH, harmonic drive housing, MIM alternative, cobot gearbox, precision ground bore",
  },

  // ============================================================
  // EV / AUTOMOTIVE (2)
  // ============================================================
  {
    slug: "ev-battery-pack-bracket",
    title: "EV battery-pack cell holder: 320 units to close a launch-blocking gap",
    customer: "Volume EV OEM (Rivian-tier)",
    industry: "EV / Automotive",
    processUsed: ["MJF (HP Multi Jet Fusion)", "Dyed Black"],
    material: "Nylon 12 (PA12)",
    challenge:
      "Two weeks before pilot-line commissioning, the customer's cell-holder bracket vendor failed to hit dimensional tolerance on the injection-molded part (draft angles were interfering with cell insertion), and a new mold would take 9 weeks. The battery pack integration team needed 320 replacement bracket sets to keep pilot-line commissioning on schedule, with mechanical properties that would survive 60 C pack operating temp and standard rework operations without cracking. Late delivery risked slipping SOP by 6 weeks - a multi-million-dollar hit.",
    approach:
      "We turned the file around in 36 hours. Parts were nested across two HP Multi Jet Fusion 5210 build chambers (running in tandem to compress schedule) in Nylon 12 with a 175 C bed temp and 80 um layer thickness. The MJF process avoided the draft-angle geometry problem entirely - vertical walls could stay vertical without any lift issue. Parts were bead-blasted, dyed black in a bulk dye tank at 90 C for 45 minutes (both for cosmetic parity with the injection-molded target and to protect the cell interface from micro-UV degradation), and 100%-CMM-sampled at a 10% AQL to confirm dimensional accuracy against the original tooled drawing. First lot of 80 parts shipped in 4 days from RFQ; the balance shipped over the following two weeks as build chambers cycled. The customer's incoming inspection team accepted all 320 parts with zero rejects.",
    results: [
      { label: "First lot delivery", value: "4 days from RFQ" },
      { label: "Full 320-unit delivery", value: "18 days" },
      { label: "Incoming inspection acceptance", value: "320/320 (100%)" },
      { label: "SOP schedule", value: "Held (vs. 6-week slip risk)" },
      { label: "Molded-tool bridge duration", value: "10 weeks (spanned to new tool)" },
    ],
    timeline: "18 days for 320 parts; 4-day turnaround on first lot of 80",
    keywords: "EV battery bracket, MJF Nylon 12, injection molding bridge, cell holder production, automotive rapid response",
  },
  {
    slug: "ev-thermal-manifold-conformal",
    title: "Battery-cooling manifold with conformal channels: 34% thermal-uniformity improvement",
    customer: "Publicly-Traded EV Charging Company",
    industry: "EV / Automotive",
    processUsed: ["DMLS (AlSi10Mg)", "Solution Heat Treat", "Post-Machined Ports"],
    material: "AlSi10Mg",
    challenge:
      "A DC fast-charging supplier had a thermal-uniformity problem in their battery-conditioning module: a machined-aluminum coolant manifold produced hot spots at cell 12 and cell 24 in a 32-cell stack, causing the pack to derate charge current during high-power events. The manifold's straight-drilled channels could not match the cell-heat-generation profile, and moving to a two-plate brazed design added leak risk and cost. They wanted to test whether conformal cooling channels - produced additively - would deliver enough uniformity gain to remove the derate.",
    approach:
      "We designed and printed a redesigned manifold in AlSi10Mg on an EOS M290, using conformal channels (2.5 mm to 5 mm cross-section) whose local hydraulic diameter and pitch varied to match the cell-heat-generation profile from the customer's CFD model. Channels were self-supporting via teardrop cross-section geometry, eliminating internal supports and their post-processing risk. After the print, parts were solution-treated at 500 C for 2 hours and quenched, achieving 300 MPa UTS. Coolant inlet/outlet ports were finish-machined on a 5-axis mill to hold O-ring groove geometry within 0.03 mm. Every manifold was pressure-tested at 8 bar (2x working pressure) and helium-leak-checked to below 1e-9 mbar-L/s. Bench-testing against the incumbent showed cell-to-cell temperature spread reduced from 8.4 C to 2.1 C at 350 kW charge power - eliminating the derate condition and enabling full charge current for the entire session. The additive manifold also weighed 220 g less (a 28% mass reduction) because of internal wall-thickness optimization.",
    results: [
      { label: "Cell-to-cell temp spread", value: "8.4 C -> 2.1 C (75% improvement)" },
      { label: "Charge derate event elimination", value: "100% (at 350 kW)" },
      { label: "Manifold mass", value: "-28% (220 g reduction)" },
      { label: "Helium leak test", value: "<1e-9 mbar-L/s, all units" },
      { label: "Time to test-ready manifold", value: "9 days from CFD file" },
    ],
    quote: {
      text: "We proved conformal cooling was worth the process shift in 9 days. Trying to prove it via a new machined design would have taken us a full quarter.",
      role: "Thermal Systems Manager",
      company: "Publicly-Traded EV Charging Company",
    },
    timeline: "9 days from CFD-informed geometry to tested manifold",
    keywords: "conformal cooling manifold, DMLS AlSi10Mg, EV thermal management, battery cooling, additive manufacturing thermal",
  },

  // ============================================================
  // MEDICAL DEVICES (3)
  // ============================================================
  {
    slug: "medical-surgical-instrument",
    title: "Reusable surgical instrument: 60-cycle autoclave validation on a redesigned handle",
    customer: "Publicly-Traded MedTech Company",
    industry: "Medical Devices",
    processUsed: ["5-Axis CNC", "Electropolish", "Passivation ASTM A967"],
    material: "316L Stainless Steel",
    challenge:
      "The customer was redesigning a Class II laparoscopic instrument handle to improve ergonomics and reduce weight. The redesign added an internal cavity for a strain-relief spring, requiring a new machining approach. The instrument had to pass 60 autoclave cycles (134 C, 3 bar, saturated steam) without dimensional drift, corrosion, or crevice-driven biofilm formation, and meet ISO 10993-5 cytotoxicity requirements. Their previous supplier had produced instruments that failed on cycle 42 with visible pitting at the internal cavity - a crevice-corrosion signature that indicated inadequate passivation.",
    approach:
      "The instrument was machined from 316L bar stock on a Mazak Integrex i-200 (a 5-axis mill-turn) in a single-setup cycle that eliminated re-fixturing between the external ergonomic contour and the internal spring cavity. Cutting parameters were tuned to leave a chip load below 0.05 mm/tooth on finishing passes, minimizing work-hardening on the 316L surface. Post-machining, parts were vibratory-deburred with ceramic media, then electropolished (H2SO4/H3PO4 bath at 55 C, 8 minutes) to remove 25 um of surface metal, exposing a clean chromium-rich oxide layer and eliminating crevice-initiation sites. Passivation followed ASTM A967 Nitric 2 (25% nitric acid, 30 min at 30 C), then verified via copper sulfate spot test on 100% of parts. The internal cavity - the failure region on the incumbent - was borescope-inspected after electropolish to confirm no residual burr or media. Autoclave validation ran to 90 cycles (1.5x requirement) with dimensional checks at 30, 60, and 90 cycles - all within 0.010 mm of nominal, with zero pitting or discoloration. Cytotoxicity per ISO 10993-5 passed with no observable cellular response.",
    results: [
      { label: "Autoclave cycles passed", value: "90 (1.5x requirement)" },
      { label: "Dimensional drift", value: "<0.010 mm at 90 cycles" },
      { label: "Pitting/corrosion events", value: "Zero" },
      { label: "ISO 10993-5 cytotoxicity", value: "Pass" },
      { label: "First-article delivery", value: "3 weeks from RFQ" },
    ],
    timeline: "3 weeks to first article; 8 weeks to full validation package",
    keywords: "316L surgical instrument, electropolish passivation, autoclave validation, ISO 10993, medical device machining",
  },
  {
    slug: "medical-implant-prototype-cranial",
    title: "Patient-specific cranial implant prototype: 5 days from CT scan to sterile package",
    customer: "Neurosurgery Research Hospital",
    industry: "Medical Devices",
    processUsed: ["EBM (Electron Beam Melting)", "Chemical Etch", "Gamma Sterilization"],
    material: "Ti-6Al-4V ELI (Grade 23)",
    challenge:
      "A neurosurgery team needed a patient-specific cranial implant prototype for a pre-surgical planning cadaver study. The implant had to match a 137 mm x 92 mm defect geometry derived from a patient CT scan, incorporate a porous osseointegration surface on the bone-facing side, and be sterile-packaged for the cadaver lab. Prior prototypes had taken 3 weeks from scan to delivery; the team was trying to hit a 1-week cadence to test iterative designs before the actual patient case, scheduled 6 weeks out.",
    approach:
      "The workflow started with the CT scan converted to STL via segmentation in Materialise Mimics (customer-provided), which we imported and design-reviewed for print orientation and support strategy. Parts were printed on an Arcam EBM Q10plus (electron beam melting is preferred for Ti implants because the vacuum environment eliminates alpha-case contamination). Layer thickness was 50 um, and the bone-facing surface incorporated a stochastic porous lattice (60% porosity, 700 um average pore size) designed to encourage bone in-growth - a geometry impossible to produce by machining. Post-print, parts were HIP'd (100 MPa argon at 920 C, 2 h) to close residual porosity in the solid regions. A chemical etch (HF/HNO3 bath, 60 seconds) removed partially-sintered surface particles and produced a clean topography validated by SEM. Parts were double-bagged in medical-grade Tyvek pouches, gamma-sterilized at 25 kGy per ISO 11137, and shipped with sterility indicators and a complete traceability packet. The 5-day turnaround gave the surgical team four full iteration loops in the 6-week window before the patient case.",
    results: [
      { label: "Scan-to-sterile turnaround", value: "3 weeks -> 5 days" },
      { label: "Iterations completed", value: "4 (in 6-week window)" },
      { label: "Porosity of osseointegration surface", value: "60% (700 um pore)" },
      { label: "Sterility validation", value: "25 kGy gamma per ISO 11137" },
      { label: "Fit-check accuracy on cadaver", value: "0.4 mm mean deviation" },
    ],
    quote: {
      text: "Getting a printed titanium implant back in 5 days changed how we plan cases. We iterate on the fixture, not just on the plan.",
      role: "Attending Neurosurgeon",
      company: "Neurosurgery Research Hospital",
    },
    timeline: "5 days from CT scan to sterile-packaged implant",
    keywords: "cranial implant prototype, EBM titanium, patient-specific implant, osseointegration lattice, medical additive manufacturing",
  },
  {
    slug: "medical-fda-prep-diagnostic-housing",
    title: "IVD instrument housing: FDA 510(k) documentation package built alongside the parts",
    customer: "Series B In-Vitro Diagnostics Startup",
    industry: "Medical Devices",
    processUsed: ["5-Axis CNC", "Chemical Etch for Passivation", "Cleanroom Assembly"],
    material: "Medical-Grade Aluminum 6061-T6 (chassis), PEEK (fluidics)",
    challenge:
      "A diagnostics startup was 4 months from their planned FDA 510(k) submission for a benchtop molecular-diagnostics instrument. Their supplier chain was fragmented across four vendors and their design controls file (per 21 CFR 820) was falling behind actual hardware iteration. They needed a partner who could produce the aluminum chassis and PEEK fluidic manifold to production tolerance, deliver material traceability and process CoCs formatted to plug directly into their DHF (Design History File), and support one design change without restarting documentation.",
    approach:
      "We agreed a document-first workflow before machining started. Every drawing was ballooned in-house, every CoC and material cert was pre-formatted to the customer's DHF template, and every process CoC (machining, cleaning, passivation) was written to the customer's specification numbering scheme. The chassis was machined from medical-grade 6061-T6 on a Doosan DVF 5000 5-axis mill; the PEEK fluidic manifold was machined from virgin-resin round stock on a Nakamura-Tome mill-turn with cutting parameters (tool feeds, cooling flood) tuned to avoid delamination on the 0.4 mm-wall channel walls. Both were cleaned to ISO 14644-1 Class 8 cleanroom standard, chemically passivated (aluminum: chromate conversion coat per MIL-DTL-5541; PEEK: IPA wipe + N2 blow-off), and packaged in cleanroom bags. Every kit shipped with a 60-page DHF-formatted packet: material CoCs, dimensional inspection with GD&T callouts, process CoCs, cleaning validation, and a design-change log. When the customer issued one ECN mid-program (a fluidic port relocation), we processed the change through a formal ECN workflow, updated all documentation in-place, and re-shipped within 9 days without disrupting their submission timeline. The final 510(k) submission included our documentation intact - no reformatting needed.",
    results: [
      { label: "510(k) submission timing", value: "Met (no docs-related delays)" },
      { label: "DHF documentation pages delivered", value: "60+ per unit, DHF-ready format" },
      { label: "ECN turnaround", value: "9 days (with full doc update)" },
      { label: "Vendor consolidation", value: "4 vendors -> 1" },
      { label: "FDA questions on supplier docs", value: "Zero" },
    ],
    timeline: "16 weeks concept to production release; ECN cycle: 9 days",
    keywords: "FDA 510k, IVD instrument, PEEK machining, medical device DHF, 21 CFR 820 documentation",
  },

  // ============================================================
  // CONSUMER HARDWARE (3)
  // ============================================================
  {
    slug: "consumer-drone-frame",
    title: "Cinema drone unibody frame: 1,200-unit production run at pre-tooling price",
    customer: "Well-Known Cinema Drone Brand",
    industry: "Consumer Hardware",
    processUsed: ["5-Axis CNC", "Anodize Type II Black"],
    material: "Aluminum 6061-T6",
    challenge:
      "A cinema-drone brand needed to launch a new prosumer model at 1,200 units for the holiday season, but their planned die-cast unibody frame required a $220k tool with a 14-week lead time. The tool would not pay back at 1,200 units, and the launch window did not survive the tool lead time. They needed a bridge production strategy that could deliver 1,200 airframes on 6-week notice at a landed unit cost under $95.",
    approach:
      "We standard-worked a 5-axis machined unibody on a bank of six Haas UMC-750SS 5-axis mills, running the fixture in a two-setup cycle (roughing pallet, finishing pallet) so a single operator could tend three machines. The design was DFM-reviewed to eliminate one deep pocket that would have required a long-reach tool, replacing it with two shallower reliefs that cut cycle time by 22%. Frames were run in 40-unit batches with dedicated soft-jaw fixturing; each machine turned out 45 frames/week for 4 weeks. Post-machining, frames were vibratory-deburred, anodized Type II Class 2 (MIL-A-8625) black at 0.001 in thickness for cosmetic parity with die-cast, and laser-etched with the customer's serialization scheme. In-line dimensional sampling caught one drift event on machine 4 (thermal offset on a long shift) and corrected it within a lot of 12. Full 1,200-unit delivery closed at 5.5 weeks. Landed cost was $91/unit, comfortably under the $95 target and roughly equivalent to what die-cast would have cost at this volume including tool amortization.",
    results: [
      { label: "Frames delivered", value: "1,200 in 5.5 weeks" },
      { label: "Landed unit cost", value: "$91 (target: $95)" },
      { label: "Tooling NRE avoided", value: "$220,000" },
      { label: "Launch window", value: "Met with 3 weeks margin" },
      { label: "Dimensional yield", value: "99.6% (5 rejects out of 1,200)" },
    ],
    timeline: "5.5 weeks for 1,200 units; first article approved in 6 days",
    keywords: "drone frame machining, aluminum 6061 unibody, anodized Type II, die-cast bridge production, consumer hardware launch",
  },
  {
    slug: "consumer-product-enclosure",
    title: "Smart-home device enclosure: bridging soft-tool injection to hard tooling",
    customer: "Kickstarter-Funded Smart-Home Startup",
    industry: "Consumer Hardware",
    processUsed: ["MJF (Multi Jet Fusion)", "Vapor Smoothing", "Painted + Screen Printed"],
    material: "Nylon 12 (PA12)",
    challenge:
      "A Kickstarter-funded smart-home startup shipped their first 2,000 units against soft-tool aluminum injection molds. Backer response drove a decision to redesign the enclosure (better USB-C port geometry, added light-pipe cutouts) before committing to hard steel tooling. They needed 4,500 revised enclosures to fulfill their Amazon launch window while hard steel tooling was cut - a bridge run that had to be cosmetically indistinguishable from an injection-molded surface finish.",
    approach:
      "Enclosures ran on four HP Multi Jet Fusion 5210 machines in Nylon 12, nested at 42 enclosures per build chamber and running back-to-back print cycles. Post-processing was the differentiator: parts were bead-blasted with fine glass media, vapor-smoothed in a Postpro3D chamber (12 minute cycle, tetrahydrofuran) to close the MJF surface texture to Ra 1.2 um, primed with a two-part polyurethane primer, painted with a matte white topcoat matched to Pantone Cool Grey 1C, and screen-printed with the customer's logo and regulatory marks (FCC, CE, WEEE). Painted parts were UV-cured for 20 seconds under a bank of 395 nm LEDs to harden the finish. Cosmetic AQL sampled at 4% (Level II, AQL 0.65) confirmed side-by-side indistinguishability from the customer's original injection-molded reference. Enclosures shipped in 4 weekly waves of ~1,100 units each, feeding directly into the customer's contract-manufacturer assembly line. Steel-tool bridge covered 7 weeks; when steel tools finished, the customer had already fulfilled their launch and captured a Prime Day sales spike that would have been missed by 6 weeks otherwise.",
    results: [
      { label: "Bridge units delivered", value: "4,500 in 4 weeks" },
      { label: "Cosmetic AQL", value: "0.65 (indistinguishable from injection)" },
      { label: "Launch delay avoided", value: "6+ weeks (Prime Day captured)" },
      { label: "Landed cost per unit", value: "$8.40 (bridge run)" },
      { label: "Backer refund requests due to enclosure", value: "Zero" },
    ],
    timeline: "4 weeks for 4,500 units, delivered in 4 weekly waves",
    keywords: "MJF Nylon 12, injection molding bridge, vapor smoothing PA12, consumer enclosure production, Multi Jet Fusion painted",
  },
  {
    slug: "consumer-wearable-titanium-case",
    title: "Wearable device case: titanium alloy production at 800/month with fashion-tier finish",
    customer: "Premium Wearable Brand",
    industry: "Consumer Hardware",
    processUsed: ["5-Axis CNC", "Vapor Blast", "PVD Coating"],
    material: "Ti-6Al-4V (Grade 5)",
    challenge:
      "A premium wearable brand wanted a titanium case for their flagship model but their prior supplier had struggled to hit cosmetic consistency across production lots. Batch-to-batch color variation (from vapor-blast finish inconsistency) was rejecting 18% of units at incoming inspection. They needed 800 titanium cases per month at cosmetic-consumer-tier finish quality with a defect rate under 1.5%, and needed to hit that yield inside 60 days to support a spring product launch.",
    approach:
      "We qualified a machining-and-finishing cell dedicated to this program. Cases were machined from Ti-6Al-4V bar stock on a Mazak Integrex i-200 mill-turn in a two-setup cycle (turning the OD profile, then 5-axis-milling the internal cavity and button reliefs). Cutting parameters used flood coolant and a 0.02 mm/tooth chip load on finishing passes to prevent surface work-hardening that would show up as color banding in vapor blast. The finishing process was the yield lever. We standardized the vapor-blast recipe (Guyson Formula 1400 with fine glass bead at 45 psi for exactly 90 seconds per case, held in a rotational fixture) and controlled bead media replenishment on a per-lot cycle. Cases were then PVD-coated with a black titanium nitride (TiN) layer at 1.8 um thickness on a Kobelco AIP-S20 platform, batch-processed at 40 cases per fixture. Every case received 100% visual inspection under standardized D65 lighting against a golden sample, with color-delta measurements taken on a Konica Minolta CM-700d spectrophotometer at three points per case. Quality plan required delta-E below 1.2 across the batch. First month yielded at 99.1%; by month 3 the process was standard-worked at 99.4% yield across 2,400 cases produced.",
    results: [
      { label: "Cosmetic yield", value: "82% -> 99.4% (over 3 months)" },
      { label: "Monthly production capacity", value: "800 cases/month" },
      { label: "Color delta-E across batch", value: "<1.2 (target: <2.0)" },
      { label: "PVD coating thickness consistency", value: "1.8 um +/- 0.15" },
      { label: "Spring launch window", value: "Met" },
    ],
    timeline: "60 days to production yield; 800 cases/month standard-worked",
    keywords: "titanium wearable case, Ti-6Al-4V machining, PVD TiN coating, vapor blast finish, premium consumer manufacturing",
  },

  // ============================================================
  // INDUSTRIAL / OIL & GAS (2)
  // ============================================================
  {
    slug: "oil-gas-downhole-tool-sleeve",
    title: "Downhole flow-control sleeve: Inconel 718 production against a 6-day well window",
    customer: "Independent Oilfield Services Company",
    industry: "Industrial / Oil & Gas",
    processUsed: ["5-Axis CNC", "Precision Grind", "Age Hardening"],
    material: "Inconel 718 (AMS 5662)",
    challenge:
      "The customer had a flow-control tool failure in a Permian Basin well - the flow-control sleeve had eroded through, and they needed 4 replacement sleeves plus 8 spares delivered inside 6 days to meet the next rig-availability window. The sleeves were Inconel 718 with a hardened ID bore (target 42 HRC), tight surface finish (Ra 0.4 um) on the seal contact, and a service temp of 165 C at 10,000 psi differential. Standard lead time from their normal supplier was 6 weeks.",
    approach:
      "We pulled the job onto a Nakamura-Tome WT-3100 mill-turn as an emergency insertion. Inconel 718 bar stock was staged pre-machined to size the same day. Cutting used ceramic inserts (SiAlON grade) with high-pressure through-tool coolant at 1,000 psi to manage the extreme heat of finishing 718 - a technique that let us cut cycle time by 35% vs. standard carbide tooling. The ID bore was left at 0.4 mm stock and finish-ground on a Studer S33 cylindrical grinder with a CBN wheel to hold roundness under 0.005 mm and surface finish at Ra 0.35 um. Age-hardening was performed on a compressed thermal cycle (solution treat at 980 C for 1 hour, then age at 720 C for 8 hours + 620 C for 8 hours) matched exactly to AMS 5662 - no cycle-time compromises on the material spec even under time pressure. Hardness was tested on 100% of parts (all in the 42-44 HRC target). Every sleeve received liquid-penetrant inspection per ASTM E165 on the sealing surfaces. Full material CoCs, heat-treat charts, and inspection reports shipped with the parts. Delivery hit day 6 - 12 sleeves, all accepted, well window preserved.",
    results: [
      { label: "Delivery", value: "12 sleeves in 6 days" },
      { label: "Standard lead time avoided", value: "6 weeks" },
      { label: "Hardness spec (target 42 HRC)", value: "42-44 HRC across 12 units" },
      { label: "Seal-surface finish", value: "Ra 0.35 um (target: 0.4)" },
      { label: "Well downtime saved (est.)", value: "$180k/day x 5 days" },
    ],
    quote: {
      text: "A shop that can hit heat-treat spec on Inconel under a 6-day compression is not something we knew existed. We have three more standing quotes with them now.",
      role: "Completion Tools Manager",
      company: "Independent Oilfield Services Company",
    },
    timeline: "6 days from RFQ to delivery",
    keywords: "Inconel 718 machining, downhole tool sleeve, oil gas emergency production, age hardening AMS 5662, precision grind Inconel",
  },
  {
    slug: "industrial-pump-housing-duplex",
    title: "Duplex-stainless pump housing: 34-week casting lead time replaced with 5-week machined article",
    customer: "Chemical Process Equipment OEM",
    industry: "Industrial / Oil & Gas",
    processUsed: ["5-Axis CNC (Rough)", "5-Axis CNC (Finish)", "Passivation"],
    material: "Duplex 2205 Stainless Steel (UNS S31803)",
    challenge:
      "A chemical-process pump OEM needed 6 pump housings for a customer's plant expansion, but the cast-and-machined housings from their normal foundry had a 34-week lead time (raw casting: 22 weeks; machining and finishing: 12 weeks). Their end customer was threatening a $2.1M liquidated-damages claim if the plant expansion missed its commissioning date, 8 weeks out. They needed a fully machined-from-billet alternative that would hit the same drawing and pass hydrostatic + salt-spray qualification.",
    approach:
      "We priced and scheduled 6 housings machined-from-solid from Duplex 2205 forged billet stock (which we sourced in 4 days from a domestic supplier holding inventory). Machining ran across two Mazak Variaxis j-600 5-axis mills in parallel - three housings each - with a two-fixture strategy: a roughing pallet removing 78% of the material (leaving 2 mm envelope), then a finishing pallet with soft jaws locating from three datum surfaces to hold assembly-critical bores within 0.025 mm true position. Duplex 2205 is a difficult machining material - work-hardens fast, needs rigid setup and specific chip-load control - so cutting parameters used carbide-carbide tooling with high-pressure coolant and were tuned to a chip load of 0.10 mm/tooth on roughing and 0.04 mm/tooth on finishing. Post-machining, all six housings were passivated per ASTM A967 Nitric 4 with dedicated Duplex parameters, then salt-spray-tested per ASTM B117 for 1,000 hours (matching the incumbent casting qualification). Hydrostatic testing at 1.5x working pressure (900 psi) passed on all six units. Full FAT (Factory Acceptance Test) package delivered with parts. Total elapsed time from PO to shipped, qualified article: 5 weeks.",
    results: [
      { label: "Lead time reduction", value: "34 weeks -> 5 weeks" },
      { label: "Liquidated damages avoided", value: "$2.1M" },
      { label: "Housings delivered", value: "6/6 accepted" },
      { label: "Salt-spray qualification (1,000 hr)", value: "Pass, no pitting" },
      { label: "Hydrostatic test", value: "6/6 passed at 900 psi" },
    ],
    timeline: "5 weeks from PO to shipped-and-qualified housings",
    keywords: "Duplex 2205 machining, pump housing production, chemical process equipment, casting alternative, ASTM A967 passivation",
  },

  // ============================================================
  // SEMICONDUCTOR (1)
  // ============================================================
  {
    slug: "semiconductor-wafer-carrier",
    title: "300 mm wafer carrier redesign: eliminating a particle-generation source at a fab",
    customer: "Semiconductor Fab Equipment OEM",
    industry: "Semiconductor",
    processUsed: ["5-Axis CNC", "Ultrasonic Clean", "Cleanroom Packaging"],
    material: "PEEK GF30 (glass-filled polyether ether ketone)",
    challenge:
      "A wafer-handling equipment OEM was seeing particle-contamination events traced to their carrier's edge-support features, which had micro-flash residue from the incumbent injection-molded PEEK-GF30 part. The molded flash was intermittent (batch-dependent) and drove customer complaints from a Tier-1 fab. The team needed to test whether machined-from-solid PEEK carriers would eliminate the particle source, and needed 40 test carriers cleanroom-packaged for a 30-day fab trial - inside 4 weeks so as not to slip the trial slot.",
    approach:
      "Carriers were machined from PEEK-GF30 round stock on a Nakamura-Tome mill-turn, with cutting parameters specifically tuned for glass-filled PEEK (which is abrasive on tooling and prone to fiber pull-out on trailing edges if feed rate is off). We used diamond-coated carbide finishing tools at 0.03 mm/tooth chip load and low-flood coolant (deionized water only - no oil-based coolants that could leave residue). Edge features were finished with a 0.5 mm ball-nose in a light-load helical path to eliminate the fiber pull-out that would have generated particulate in service. Post-machining, carriers were ultrasonic-cleaned in DI water at 45 kHz (3 cycles of 8 minutes with fresh water each cycle), then IPA-rinsed, then vacuum-dried at 60 C for 4 hours. Particle-count validation was performed on a Particle Measuring Systems liquid particle counter - target of fewer than 50 particles per cm-squared above 0.5 um. All 40 carriers hit the target, mean 22 particles/cm-squared. Cleanroom packaging (ISO 14644-1 Class 5 double-bag) shipped in temperature-monitored coolers. The fab trial ran 30 days and showed the machined carriers produced zero attributable particle events (vs. an average of 3.2/week from the incumbent molded part), and the OEM converted the volume to machined production.",
    results: [
      { label: "Particle events (30-day trial)", value: "3.2/wk (molded) -> 0 (machined)" },
      { label: "Particle count per carrier", value: "22 particles/cm-squared (target: <50)" },
      { label: "Delivery to trial", value: "4 weeks (met slot)" },
      { label: "Full conversion volume", value: "600 carriers/quarter" },
      { label: "Fab customer complaints", value: "Zero (post-conversion)" },
    ],
    timeline: "4 weeks to trial-ready carriers; full production release week 10",
    keywords: "PEEK wafer carrier, semiconductor cleanroom, particle contamination, PEEK-GF30 machining, fab equipment",
  },

  // ============================================================
  // FORMULA SAE (1)
  // ============================================================
  {
    slug: "formula-sae-suspension-mount",
    title: "Formula SAE suspension pickup: turning a student team's design into a competition-ready weldment",
    customer: "University Formula SAE Team",
    industry: "Education / Student Competition",
    processUsed: ["5-Axis CNC", "TIG Welding", "Ultrasonic Test"],
    material: "Aluminum 7075-T651 (pickup), 4130 Chromoly (tabs)",
    challenge:
      "A university Formula SAE team was 8 weeks from competition and had discovered their front-suspension upper-a-arm pickup point had cracked in fatigue testing (a design flaw in the weld heat-affected zone). They needed a redesigned pickup produced quickly, with correct heat-treat and weld qualification, on a student-team budget. Their prior supplier had quoted $2,400/pickup for 4 units, which was more than the team's monthly parts budget.",
    approach:
      "We treated this as a discounted student-team engagement (a program 3DBuildBot runs for Formula SAE, Formula Hybrid, and university robotics teams) and provided free DFM feedback that identified two additional stress-concentration issues in the initial design. The redesigned pickup was machined from 7075-T651 plate on a 5-axis mill in a two-setup fixture. The 4130 chromoly tabs (which welded to the pickup) were laser-cut to profile, then TIG-welded to the machined block by a qualified AWS D17.1-certified welder using ER70S-2 filler and a controlled interpass temperature under 200 C to protect the 7075 HAZ. Post-weld, assemblies were stress-relieved at 175 C for 4 hours and dye-penetrant tested per ASTM E165 on the weld crown. Given the fatigue-critical nature, we also ran ultrasonic thickness testing on the weld root to confirm full penetration. Static load testing to 1.5x design load (verified against team's FEA) confirmed the redesign. Full package delivered in 3 weeks for $340/pickup at 4 units - a price that fit the team's budget and let them refocus schedule on driver training instead of parts-chasing. The team qualified at competition with the parts installed.",
    results: [
      { label: "Cost per pickup", value: "$2,400 -> $340 (student program pricing)" },
      { label: "Delivery time", value: "3 weeks (fit competition prep)" },
      { label: "Fatigue redesign iterations", value: "2 (DFM feedback caught issues before machining)" },
      { label: "Weld inspection", value: "100% DPT pass, 100% UT pass" },
      { label: "Competition finish", value: "Team qualified, no chassis-related DNFs" },
    ],
    quote: {
      text: "As a student team we were resigned to compromising on either quality or budget. We did not have to. The DFM feedback alone probably saved us the entire competition.",
      role: "Chassis Lead",
      company: "University Formula SAE Team",
    },
    timeline: "3 weeks concept-through-delivery, aligned to competition timeline",
    keywords: "Formula SAE suspension, 7075 aluminum machining, TIG welded weldment, student team manufacturing, university engineering",
  },
];

export default caseStudies;
