export interface FaqTopic {
  slug: string;
  title: string;
  description: string;
  intro: string;
  groups: { heading: string; items: { q: string; a: string }[] }[];
}

export const FAQ_TOPICS: FaqTopic[] = [
  {
    slug: "cnc-machining",
    title: "CNC Machining FAQ",
    description:
      "Everything about 3-axis and 5-axis CNC machining at 3DBuildBot — materials, tolerances, lead times, and cost.",
    intro:
      "3DBuildBot runs a mixed fleet of 3-axis mills, Swiss lathes, and 5-axis machining centers (DMG Mori DMU 50, Haas UMC-750, Mazak Integrex) across our vetted partner shops. These FAQs cover the questions we hear most from mechanical engineers, product teams, and buyers evaluating CNC as a process.",
    groups: [
      {
        heading: "Basics",
        items: [
          {
            q: "What is CNC machining?",
            a: "CNC (computer numerical control) machining is a subtractive process where cutting tools remove material from a solid billet — aluminum, steel, titanium, brass, or engineering plastics — guided by G-code generated from your CAD model. 3DBuildBot supports 3-axis milling and turning, live-tool Swiss, and full 5-axis simultaneous machining for complex geometry. It is the go-to process for functional prototypes and low-to-mid volume production (1–10,000 parts) where tight tolerances, superior surface finish, and true engineering materials matter — typically at a lower per-part cost than metal 3D printing above ~10 units.",
          },
          {
            q: "3-axis vs. 5-axis — which do I need?",
            a: "Pick 3-axis when your part has features accessible from one or two setups — brackets, plates, enclosures, simple housings. It is faster to program and typically 25–40% cheaper. Pick 5-axis when you have undercuts, compound angles, contoured surfaces (impellers, turbine blades, medical implants), or when consolidating setups improves stack-up tolerance below ±0.05 mm. 5-axis also reduces fixturing cost on complex prismatic parts. Our instant quote engine flags parts that benefit from 5-axis based on feature detection — you do not need to specify.",
          },
          {
            q: "What is the maximum part size you can machine?",
            a: "Our standard CNC envelope is 800 × 500 × 400 mm (31.5 × 19.7 × 15.7 in) with per-axis tolerance verified. For larger work we route to partners with 1500 × 800 × 800 mm bed capacity (Haas VF-7, Doosan DNM 6700) — upload the file and we will confirm capacity within the quote. Turned parts up to 500 mm Ø × 1500 mm are handled on our lathe network. Anything larger typically ships as a weldment or two-part assembly with dowel-pin alignment.",
          },
          {
            q: "Can you machine hardened steel?",
            a: "Yes — we routinely machine tool steels (A2, D2, S7, H13) and stainless (17-4 PH, 15-5 PH) in the 45–60 HRC range using ceramic and CBN inserts. Order of operations is typically rough → heat treat → grind or hard-mill to final. Expect a 3–5 day adder for heat treat and a 15–30% cost premium versus soft machining. For features tighter than ±0.005 mm we recommend post-heat-treat grinding.",
          },
        ],
      },
      {
        heading: "Tolerances and Finish",
        items: [
          {
            q: "What is your standard CNC tolerance?",
            a: "Standard tolerance is ±0.005 in (±0.127 mm) on machined features per ISO 2768-m unless your drawing specifies tighter. Precision tolerance is ±0.001 in (±0.025 mm) achievable on features under 100 mm with an inspection surcharge. Ultra-precision (±0.0002 in / ±0.005 mm) is available on Swiss and jig-grinding cells with CMM verification. Callouts on the drawing (PDF) always override defaults — upload both the STEP and a dimensioned PDF for anything critical.",
          },
          {
            q: "What surface finish comes standard?",
            a: "As-machined finish is 125 µin Ra (3.2 µm) or better, with visible tool marks. Bead blast to satin 63 µin Ra is a common upgrade ($8–15 per part). We also offer hand polish (32 µin Ra), electropolish for stainless, and mirror finish (4 µin Ra) for optical mold cavities. Anodize (Type II or Type III / hardcoat), powder coat, black oxide, zinc plating, and chem film per MIL-DTL-5541 Class 3 are all available in the surface-finish dropdown at quote time.",
          },
          {
            q: "Do you deburr and break sharp edges?",
            a: "Yes — all CNC parts are hand-deburred and edges broken to 0.005–0.010 in (0.13–0.25 mm) unless you specify SHARP EDGE or a specific chamfer/radius callout. For medical, food-contact, and aerospace parts we offer full radius deburring and vibratory tumbling. Cross-drilled hole intersections receive back-deburring on request — call this out on the drawing to avoid a swept-burr that could snag O-rings or fluid flow.",
          },
          {
            q: "Can I request an FAI or CMM report?",
            a: "Yes. First Article Inspection per AS9102 Rev C is $150–450 depending on feature count and is required on all aerospace, defense, and medical orders by default. Full CMM reports on every part (100% inspection) run 5–15% of part cost. Reports include ballooned drawing, actual dimensions with pass/fail, and material CoC. Turnaround adds 1–2 business days. Upload your ballooned drawing or we will balloon it for you at $75 setup.",
          },
        ],
      },
      {
        heading: "Materials",
        items: [
          {
            q: "What materials do you stock for CNC?",
            a: "Aluminum: 6061-T6, 7075-T6, 2024-T3, MIC-6 tool plate, 5052. Steel: 1018, 1045, 4140, 4340, A36, A2, D2. Stainless: 303, 304, 316L, 17-4 PH, 15-5 PH, 440C. Titanium: Grade 2, Grade 5 (Ti-6Al-4V), Grade 23 (ELI). Brass: C360, C260. Copper: C110. Plastics: Delrin (POM), PEEK, PEI (Ultem 1000/2300), PTFE, HDPE, UHMW, nylon 6/6, polycarbonate, acrylic. Exotic: Inconel 625/718, Monel 400, Invar 36, Hastelloy C-276 (quoted).",
          },
          {
            q: "Which aluminum should I pick?",
            a: "6061-T6 is the default — good machinability, weldable, anodizes well, and covers 80% of use cases at the lowest cost. Choose 7075-T6 when you need aerospace-grade strength (73 ksi yield vs. 40 ksi for 6061) and are okay giving up weldability and corrosion resistance. Pick MIC-6 (cast tool and jig plate) for large flat plates that must stay flat after machining. 2024-T3 for aircraft skin and structural work. 5052 for sheet-metal-style parts requiring formability.",
          },
          {
            q: "Do you supply material certs (MTRs)?",
            a: "Yes — a Mill Test Report (chemistry and mechanical properties) is included free on all aerospace, defense, and medical orders, and available on any order for $25 per material. MTRs are DFARS-compliant (melted and manufactured in a qualifying country) on request; specify DFARS at quote time. For flight hardware we can also provide raw material traceability back to the mill heat lot with retained samples per AS9100.",
          },
          {
            q: "Can you machine customer-supplied material?",
            a: "Yes, with conditions. Ship material to our routing address with a packing slip listing alloy, temper, dimensions, and heat lot. We inspect on receipt and quote from your stock — typically 10–15% cheaper than us sourcing. You accept scrap risk if we exceed the standard 15% overrun allowance on setup and first article. We do not accept customer material for AS9100 or ISO 13485 orders unless it arrives with a full MTR chain of custody.",
          },
        ],
      },
      {
        heading: "Lead Time and Cost",
        items: [
          {
            q: "How fast can you turn CNC parts?",
            a: "Standard lead time is 5–7 business days from PO for aluminum and mild steel; 7–10 for stainless and titanium; 10–14 for parts requiring heat treat, plating, or paint. Expedite options: 3-day (25% premium), 2-day (50% premium), and 1-day rush on aluminum only (100% premium, subject to capacity). Same-day is available on small aluminum parts under 100 × 100 × 50 mm — book by 8am PT via the rush queue.",
          },
          {
            q: "What drives CNC part cost?",
            a: "In order of impact: (1) cycle time — governed by material removal volume and feature complexity; (2) material — titanium is 8–12× the cost of 6061 aluminum; (3) setups — every re-fixturing adds 15–45 minutes of shop time; (4) tolerances tighter than ±0.005 in add inspection and slower feeds; (5) surface finishes and secondary ops; (6) quantity — economies of scale kick in around 10 units as setup amortizes.",
          },
          {
            q: "Is there a minimum order quantity?",
            a: "No MOQ — we quote quantity 1. Single-part orders are common for prototypes. That said, unit price drops steeply through 10 units as programming and fixturing amortize, and again at 50 and 250 units where we can shift to more efficient workholding or bar-fed lathe production. The instant quote engine shows a price-break table so you can see the crossover.",
          },
          {
            q: "Do you offer volume pricing or annual contracts?",
            a: "Yes. For repeating parts we offer blanket POs with releases (12-month term, forecast-based pricing), consignment inventory (VMI), and Kanban replenishment. Volume tiers unlock at 100/500/1000/5000 annual units. Contact sales@3dbuildbot.com with your 12-month forecast for a formal quote — typically 15–35% below spot pricing.",
          },
        ],
      },
    ],
  },
  {
    slug: "3d-printing",
    title: "3D Printing FAQ",
    description:
      "FDM, SLS, SLA, MJF, and DMLS — which additive process to pick, materials, and what to expect.",
    intro:
      "3DBuildBot runs an in-house additive floor plus a partner network covering every major 3D printing technology. This FAQ helps you choose the right process, understand material trade-offs, and set realistic expectations for tolerance, finish, and cost.",
    groups: [
      {
        heading: "Choosing a Process",
        items: [
          {
            q: "FDM vs. SLA vs. SLS vs. MJF vs. DMLS — quick decision guide?",
            a: "FDM for cheap, fast, functional plastic prototypes and jigs. SLA when you need smooth surfaces, sharp features, or clear/optical parts — visual models, dental, and casting patterns. SLS for durable nylon end-use parts with living hinges, snap fits, and complex internal geometry (no support needed). MJF (HP Multi Jet Fusion) for higher-throughput nylon production with better isotropy than SLS and finer detail. DMLS (metal laser sintering) for titanium, Inconel, or stainless parts you cannot machine — internal cooling channels, topology-optimized brackets, and aerospace hardware.",
          },
          {
            q: "When should I choose 3D printing over CNC?",
            a: "Choose additive when (1) geometry is impossible or expensive to machine — internal channels, lattices, thin organic surfaces; (2) you need 1–5 parts fast (24–72 hr); (3) you want to test fit and function before cutting a tool; or (4) you are producing 1–500 nylon or resin end-use parts and injection molding is not viable. Choose CNC when you need certified material properties, tolerances tighter than ±0.005 in, cosmetic surfaces, or engineering thermoplastics like PEEK and Delrin above prototype quantities.",
          },
          {
            q: "What is the largest 3D print you can produce?",
            a: "FDM: 500 × 500 × 500 mm single piece (BigRep, Stratasys F900); larger via bonded assemblies. SLA: 736 × 635 × 533 mm on Form 3L farms and up to 2100 × 700 × 800 mm on Massivit. SLS: 750 × 550 × 550 mm on EOS P 810. MJF: 380 × 284 × 380 mm build volume on HP 5210. DMLS: 400 × 400 × 400 mm on EOS M 400. Anything larger is sectioned with keyed joints and bonded — we handle the split automatically in DFM review.",
          },
          {
            q: "Do 3D printed parts hold pressure or seal?",
            a: "SLA and MJF parts are effectively watertight as-printed for low-pressure fluidic prototypes (< 50 psi). SLS is porous and requires infiltration (epoxy, cyanoacrylate, or Vapor Smoothing) to hold pressure. FDM is not sealed without post-processing — anneal, epoxy coat, or design for a compression seal. DMLS metal parts are 99.5–99.9% dense as-printed; add HIP (hot isostatic pressing) for full density and fatigue-critical applications. For aerospace pneumatic hardware we recommend DMLS + HIP + machined sealing surfaces.",
          },
        ],
      },
      {
        heading: "Materials",
        items: [
          {
            q: "What FDM materials do you offer?",
            a: "Standard: PLA, PLA+, PETG, ABS, ASA, TPU 95A. Engineering: nylon (PA12, PA6, PA-CF, PA-GF), polycarbonate, PC-ABS, PC-ISO (biocompatible). High-temp: PEI (Ultem 9085 and 1010), PEEK, PEKK, PPSU. Composites: carbon-fiber-reinforced nylon and PEI, glass-filled PA. All FDM parts print on Stratasys Fortus or industrial equivalents — we do not use hobby-grade Bambu or Prusa for production orders.",
          },
          {
            q: "What SLS and MJF materials are available?",
            a: "SLS: PA12 (nylon 12) is the workhorse, plus PA11 (bio-based, tougher), PA12 glass-filled, PA12 aluminum-filled (Alumide), TPU 90A/70A elastomer, and PP (polypropylene). MJF: PA12, PA12 glass bead, PA11, and TPU. Colored MJF PA12 is available in black as-printed; other colors via dye bath. All powders are run at 30–50% virgin content per HP/EOS spec for consistent mechanical properties.",
          },
          {
            q: "What SLA resins do you stock?",
            a: "General: Formlabs Grey Pro, Clear, White, Black. Engineering: Tough 2000, Tough 1500, Rigid 10K (glass-filled), Durable, High Temp (238°C HDT). Medical: BioMed Clear, BioMed Amber (USP Class VI, ISO 10993). Dental: Dental LT, Dental SG, IBT. Casting: Castable Wax 40, Castable Wax 20. Elastomer: Elastic 50A, Silicone 40A. Ceramic-filled and industrial resins on Carbon DLS and 3D Systems Figure 4 available for production programs.",
          },
          {
            q: "Which metals can you print via DMLS?",
            a: "Titanium: Ti-6Al-4V Grade 5 and Grade 23 ELI. Stainless: 316L, 17-4 PH, 15-5 PH. Aluminum: AlSi10Mg. Nickel superalloys: Inconel 625, Inconel 718, Hastelloy X. Tool steel: H13, Maraging 1.2709 (M300). Cobalt-chrome (CoCr) for medical implants and dental. Copper (CuCrZr) for thermal management. Post-processing: stress relief anneal, HIP, solution + age, machining of critical surfaces, and NDT (dye penetrant, CT scan) available.",
          },
        ],
      },
      {
        heading: "Tolerance and Finish",
        items: [
          {
            q: "What tolerance can I expect from 3D printing?",
            a: "FDM: ±0.5% with a lower bound of ±0.5 mm. SLA: ±0.15 mm on features up to 100 mm; ±0.2% above. SLS: ±0.3% with a lower bound of ±0.3 mm. MJF: ±0.2 mm on features up to 100 mm; ±0.2% above. DMLS: ±0.1–0.2 mm as-printed; ±0.025 mm after machining critical features. Tighter tolerances require post-machining — call out critical features on a PDF drawing and we will program a secondary CNC op.",
          },
          {
            q: "What surface finish do 3D printed parts have?",
            a: "SLA is smoothest — 5–10 µm Ra as-printed, near-injection-molded after light sanding. MJF and SLS have a matte, slightly grainy finish at ~10–15 µm Ra; bead blast is included. FDM shows layer lines at 0.1–0.3 mm layer height (Ra 20–40 µm); vapor smoothing (ABS/ASA) or sanding + filler primer + paint dramatically improves appearance. DMLS is rough as-printed (~10 µm Ra); machining, tumbling, or micro-machining brings it to 1–3 µm Ra.",
          },
          {
            q: "Can 3D printed parts be painted, plated, or dyed?",
            a: "Yes. SLS and MJF nylons dye beautifully (black is standard; RAL colors available). SLA parts prime and paint like injection-molded plastic. FDM parts benefit from XTC-3D or filler primer to hide layer lines before paint. Electroplating (copper + nickel + chrome) is available on SLA and FDM for RF shielding or decorative finish. DMLS metal parts accept all standard finishes: anodize, passivate, PVD, powder coat.",
          },
          {
            q: "What is the smallest feature you can print?",
            a: "SLA: 0.15 mm walls, 0.3 mm holes, 0.1 mm engraved text. MJF: 0.5 mm walls, 0.5 mm holes, 0.5 mm engraved text at 1 mm depth. SLS: 0.7 mm walls, 1.0 mm holes. FDM: 0.8 mm walls (2 perimeters at 0.4 nozzle), 2 mm holes. DMLS: 0.3 mm walls, 0.5 mm holes, though supports and thermal warping usually push practical minima higher. Threads below M3 should be tapped post-print rather than modeled.",
          },
        ],
      },
      {
        heading: "Design and Ordering",
        items: [
          {
            q: "What file formats do you accept for 3D printing?",
            a: "STL is universal and works for any process. STEP is preferred for DMLS and any print requiring post-machining — we keep the parametric feature tree. 3MF is accepted and preserves color/material data. OBJ, PLY, and IGES also work. Upload triangle counts under 5M for best DFM turnaround; we can decimate if needed. Wall thickness, support-free geometry, and hollowing suggestions are auto-generated in DFM within 1 hour of upload.",
          },
          {
            q: "How fast can I get a 3D printed part?",
            a: "FDM and SLA: as fast as next-day for small parts ordered before 2pm PT. SLS and MJF: 3 business days standard; 2-day expedite available. DMLS: 5–10 business days depending on volume and post-processing. Weekend printing available on FDM/SLA for critical prototypes at 40% premium. Same-day-shipping cutoffs are highlighted on the quote page for each process.",
          },
          {
            q: "Do you print end-use production parts?",
            a: "Yes — SLS, MJF, and DMLS are qualified production processes in our system. We have customers running 500–50,000 parts/year on MJF nylon (drone housings, medical wearables, robotic grippers) and 100–5,000 parts/year on DMLS titanium (bike components, dental abutments, satellite brackets). We provide PPAP-level documentation, statistical process control, and Cpk data on production programs.",
          },
          {
            q: "How do I hollow a large SLA or MJF part to reduce cost?",
            a: "Both processes charge partly by material volume. For SLA, add a 2–3 mm wall shell with two 4 mm drain holes (opposite sides, at the lowest point of orientation). For MJF, hollow with 1.5–2 mm walls and add 5 mm powder-escape holes — trapped powder is charged as consumed material. Our DFM engine flags solid parts over 50 cm³ with a hollowing suggestion and estimated savings — one click applies it.",
          },
        ],
      },
    ],
  },
  {
    slug: "sheet-metal",
    title: "Sheet Metal Fabrication FAQ",
    description:
      "Bending, welding, cutting, and finishing for sheet metal parts and enclosures.",
    intro:
      "3DBuildBot's sheet-metal service covers laser cutting, punching, forming, welding, hardware insertion, and finishing. This FAQ walks through material choice, tolerance realities, bend design rules, and lead time.",
    groups: [
      {
        heading: "Basics",
        items: [
          {
            q: "What sheet-metal processes do you offer?",
            a: "Laser cutting (fiber, up to 25 mm mild steel and 20 mm aluminum), CNC punching (Trumpf/Amada turrets for high-volume flat parts with formed features), press-brake forming (up to 3 m bed, 250 ton), TIG and MIG welding, spot welding, PEM hardware insertion (self-clinching nuts, standoffs, studs), and finishing (powder coat, wet paint, silkscreen, plating). Water jet is available for materials that cannot be lasered (copper, brass, thick titanium, composites).",
          },
          {
            q: "What thickness range do you handle?",
            a: "Standard range is 0.5 mm to 6 mm (0.020 in to 0.250 in) for laser and press-brake work. Thin gauge down to 0.3 mm (0.012 in) on foil-grade materials with light-etch laser cutting. Heavy plate up to 25 mm mild steel and 12 mm stainless via fiber laser; thicker plate (up to 100 mm) via water jet. Bending capacity is a function of tonnage: a 250-ton brake with 8-ft bed comfortably forms 6 mm mild steel and 4 mm stainless.",
          },
          {
            q: "What materials do you stock?",
            a: "Steel: cold-rolled (CRS), hot-rolled (HRS), galvanized (G30, G60, G90), electrogalvanized. Stainless: 304, 304L, 316, 316L, 430. Aluminum: 5052-H32 (default for forming), 6061-T6 (structural — cracks on tight bends), 3003-H14, 1100 (soft, for chassis). Copper C110, brass C260 and C360. Titanium Grade 2. Perforated and expanded sheet on request. Full material list with gauge chart is in the sheet-metal quote wizard.",
          },
          {
            q: "Can you weld and finish assemblies?",
            a: "Yes. TIG welding on stainless, aluminum, and titanium by AWS D17.1 or D1.1/D1.2 certified welders. MIG for higher-throughput steel and thick aluminum. Spot welding for enclosures and racks. We stich, seam, or full-weld per your callout, then grind, blend, and passivate stainless per ASTM A967. Aluminum assemblies are typically drilled, riveted, or Cleco'd first, then welded to control distortion.",
          },
        ],
      },
      {
        heading: "Design Rules",
        items: [
          {
            q: "What is your recommended bend radius?",
            a: "Default inside bend radius equals material thickness (1T) for CRS, HRS, and 5052 aluminum. Increase to 2T for 6061-T6 and 3T for hardened tempers to avoid cracking on the outside fiber. Stainless typically uses 1T. If you leave the radius unspecified we use the standard tool for your gauge — commonly a 0.030 in radius on 16 ga steel. Uploading a STEP file with actual bend geometry ensures the flat pattern matches.",
          },
          {
            q: "How close can holes and features be to a bend?",
            a: "Minimum hole-to-bend distance is 2.5× material thickness + bend radius, measured from the tangent point. Closer and the hole distorts into an oval. Slots parallel to the bend can go tighter (1.5T) if slight elongation is acceptable. For PEM hardware, keep the flange-to-hardware edge at 2× hardware diameter minimum. Our DFM engine highlights any violations before you check out.",
          },
          {
            q: "What tolerance can I expect on sheet metal?",
            a: "Laser-cut flat features: ±0.005 in (±0.13 mm). Bend angles: ±1° on a single bend, ±2° cumulative across 3+ bends. Flange lengths: ±0.010 in (±0.25 mm). Hole-to-hole across a bend: ±0.020 in (±0.5 mm) due to bend deduction variability. For tighter cross-bend tolerances design with slotted holes on one side, or specify a machining operation after bending.",
          },
          {
            q: "Should I model my part flat or folded?",
            a: "Send us the folded 3D model as a STEP or SolidWorks part — we generate the flat pattern using material-specific K-factors. If you have a preferred K-factor from prior production, note it on the drawing. DXF flat patterns are accepted but skip DFM checks like bend clearance and formability. For assemblies (weldments, enclosures with multiple parts), send the full assembly and we quote each piece.",
          },
        ],
      },
      {
        heading: "Hardware and Finishing",
        items: [
          {
            q: "Can you install PEM hardware (self-clinching nuts, studs)?",
            a: "Yes — we stock the full PennEngineering range: KF/KFS clinch nuts (M2–M12, #2-56 to 3/8-16), CLS studs, SO/SOS standoffs, PC pilot pins, and floating fasteners for stack-up alignment. Install cost is $0.30–0.75 per piece plus hardware cost. Specify the PEM part number on your drawing; if omitted we default to the standard clinch nut for the hole size in your material and thickness.",
          },
          {
            q: "What finishes do you offer on sheet metal?",
            a: "Powder coat: RAL, Pantone, or custom color match; standard textures include smooth, wrinkle, and hammertone. Wet paint (acrylic urethane, epoxy primer + topcoat) for outdoor applications requiring UV stability. Anodize (Type II, Type III / hardcoat, black, clear, and colors) on aluminum. Zinc, nickel, and chem film per MIL-DTL-5541 on steel and aluminum. Passivation per ASTM A967 on stainless. Silkscreen and pad printing for logos and labels.",
          },
          {
            q: "Can I get parts masked before painting or plating?",
            a: "Yes — masking is priced per feature. Standard is 3M vinyl or silicone plugs on threaded holes, PEM inserts, and mating surfaces. Provide a masking drawing (highlight areas in red on a PDF) or use the online annotation tool. Custom silicone masks for complex geometry add tooling cost but are cheaper above 100 pieces.",
          },
          {
            q: "Do you silkscreen or laser-etch labels?",
            a: "Both. Silkscreen is a two-step epoxy ink process, good for large logos and multi-color artwork; adds 2–3 days and $2–8 per part. Laser etching (annealing on stainless, ablation on painted or anodized surfaces) is included in-line at $0.50–2 per part and is the standard for serial numbers, QR codes, and safety labels. Upload artwork as vector (AI, SVG, PDF) at final size.",
          },
        ],
      },
      {
        heading: "Lead Time and Cost",
        items: [
          {
            q: "How fast can you turn sheet-metal parts?",
            a: "Laser-cut-only parts: 3 business days. Cut + form: 5 business days. Cut + form + weld: 7 business days. Cut + form + weld + powder coat: 10 business days. Rush at +50% brings weldments to 5 days. Powder coat and plating add 3–5 days on top of fabrication unless we schedule concurrently — we handle that when you select the finish in the quote.",
          },
          {
            q: "What drives sheet-metal cost?",
            a: "(1) Cut length and material area — a busy part with many small holes takes longer on the laser; (2) number of bends and re-tooling on the brake; (3) welding time and skill (TIG on titanium is 3× the shop rate of MIG on steel); (4) hardware count and install; (5) finish operations; (6) quantity — nesting efficiency improves dramatically above 25 parts.",
          },
          {
            q: "Is there a minimum quantity for sheet metal?",
            a: "No MOQ — we quote quantity 1. However, sheet-metal setup (programming the laser, setting up brake tooling) can dominate cost on single pieces. You will typically see a 40–60% per-unit price drop between qty 1 and qty 10 as setup amortizes. For prototypes we recommend ordering 3–5 pieces of any bracket you plan to iterate on.",
          },
          {
            q: "Can I re-order the same sheet-metal part?",
            a: "Yes — every quoted part gets a part number and a saved program. Re-orders skip programming and DFM and typically ship 1–2 days faster and 10–20% cheaper than the original. Log in to your dashboard, filter by part number, and click Reorder. For active production programs we set up a blanket PO with agreed pricing for 12 months.",
          },
        ],
      },
    ],
  },
  {
    slug: "injection-molding",
    title: "Injection Molding FAQ",
    description:
      "Tooling cost, cycle time, break-even analysis, and materials for injection-molded parts.",
    intro:
      "Injection molding is the lowest-cost-per-part process above ~1,000 units for most plastic geometries. 3DBuildBot offers aluminum bridge tooling for 100–10,000 shots and hardened steel production tools for 500,000+ shot life. This FAQ covers the questions we hear before committing to tooling.",
    groups: [
      {
        heading: "Getting Started",
        items: [
          {
            q: "How much does an injection mold cost?",
            a: "Bridge tooling (aluminum, 100–10,000 shot life): $1,500–8,000 for single-cavity, hand-loaded, unscrewing features excluded. Production tooling (P20 or H13 steel, 500K–1M shot life): $8,000–75,000 depending on cavity count, side actions, hot runners, and part complexity. Complex multi-shot or insert-molded tools run $50,000–250,000. Every project starts with a moldflow-informed tooling quote — you see the price before committing.",
          },
          {
            q: "How long does tooling take to build?",
            a: "Aluminum bridge tools: 10–15 business days from mold design approval. P20 steel single-cavity tools: 3–5 weeks. H13 hardened tools with side actions and hot runner: 6–10 weeks. First-article samples ship within 5 days of tool completion. Expedited 4-week production tooling is available on standard geometries at a 30–50% premium. Design review and moldflow analysis add 3–5 days before we cut steel.",
          },
          {
            q: "What is the break-even between machined and molded parts?",
            a: "As a rule of thumb, injection molding wins on cost above ~500 units for simple parts (tooling amortizes fast) and ~2,000 units for complex parts. Below that, CNC or MJF nylon is cheaper. Our quote tool runs a break-even chart for your specific part comparing CNC, MJF, and molded costs across 100/500/1K/5K/10K/50K quantities so you can pick the right process objectively.",
          },
          {
            q: "What is the minimum order for injection molding?",
            a: "No unit minimum — we can shoot 25 pieces off a bridge tool. That said, tooling cost dominates below ~500 units so you rarely see molding used at that scale. A common pattern: 500 bridge-tool parts to validate the design and market, then commit to production tooling for 10,000+ units. Bridge tool designs can often be reused as a family or reference for the production tool.",
          },
        ],
      },
      {
        heading: "Design for Molding",
        items: [
          {
            q: "What draft angle should I use?",
            a: "1° minimum on all vertical walls, 3° preferred, and 5° on textured surfaces (MT-11010, MT-11020, or similar). Ribs, bosses, and cores also need draft — 0.5° minimum. Zero-draft walls require expensive side actions or costly ejection strategies. Our DFM engine flags any face under 1° and suggests the fix; you can auto-add draft to selected faces in the browser preview.",
          },
          {
            q: "How thick should my walls be?",
            a: "Aim for uniform 1.5–3 mm walls for most thermoplastics. Wall thickness variation over 25% causes sink marks and warping. Ribs should be 40–60% of the nominal wall thickness to avoid sink on the opposite face. Bosses for screws follow the same rule with gussets rather than thick columns. Coring out thick sections is almost always cheaper and better than leaving mass — we auto-suggest coring in DFM.",
          },
          {
            q: "Do I need to design gates and ejectors?",
            a: "No — leave gate location, runner design, ejector layout, and parting line to us. We use moldflow simulation to place gates for optimal fill, minimal weld lines, and controlled warpage. If you have a preferred gate location for cosmetic reasons (hidden inside a boss, behind a snap), call it out on the drawing. We show the proposed layout in the mold design review before cutting steel.",
          },
          {
            q: "Can I mold undercuts and threads?",
            a: "Yes — with cost impact. Simple undercuts (snap fits, side windows) use side actions or lifters ($1,500–5,000 tooling adder each). Internal threads require unscrewing cores or collapsible cores ($5,000–20,000). External threads are straightforward with a split cavity. For low-volume work, consider molding a smooth boss and tapping post-mold or using a heat-set insert (Tri-Star or Heli-Coil) instead of molded threads.",
          },
        ],
      },
      {
        heading: "Materials",
        items: [
          {
            q: "What thermoplastic materials do you mold?",
            a: "Commodity: ABS, PP, PE (HDPE/LDPE), PS, PVC. Engineering: PC, PC/ABS, POM (Delrin/acetal), PA6, PA6/6, PBT, PET. High-performance: PEEK, PEI (Ultem), PPS, PPSU, LCP. Elastomers: TPE, TPU, TPV (Santoprene), silicone (LSR) via a partner. Glass-filled and carbon-filled grades of most engineering resins for stiffness and dimensional stability. UL-listed flame-retardant grades (V-0) and FDA-compliant food-contact grades on request.",
          },
          {
            q: "How do I pick between ABS, PC, and PC/ABS?",
            a: "ABS: cheapest, easy to mold, good impact, no UV resistance — consumer housings, toys, interior parts. PC (polycarbonate): 5× the impact of ABS, transparent, higher temp, more expensive and prone to sink — safety-critical parts, lenses. PC/ABS: the sweet spot — 80% of PC's toughness, easier processing, better cosmetic finish — automotive interiors, laptops, most premium consumer products. For UV outdoor use, ASA is a better swap for ABS.",
          },
          {
            q: "Can you match a specific color or Pantone?",
            a: "Yes. Color match to a Pantone, RAL, or physical sample runs $250–600 for a custom masterbatch and adds 5–7 days to lead time. Standard colors (black, white, gray, safety yellow) ship from stock at no adder. For runs under 500 parts we hand-blend colorant into natural resin; above 500 we order a custom pelletized masterbatch for shot-to-shot consistency.",
          },
          {
            q: "Do you mold silicone or overmolded parts?",
            a: "Yes. LSR (liquid silicone rubber) molding at durometers 20–80 Shore A on medical-grade Silastic and Elastosil resins. Two-shot overmolding (TPU or TPE grip on a rigid substrate) is available on 2K presses — common for tool handles, wearables, and medical devices. Insert molding (over metal threaded inserts, PCBs, or wire assemblies) is one of our specialties for connectors and sealed electronics.",
          },
        ],
      },
      {
        heading: "Quality and Delivery",
        items: [
          {
            q: "What tolerance can injection molding hold?",
            a: "Per DIN 16901: general tolerance ±0.1 mm on dimensions up to 30 mm, scaling with size. Precision moldings hold ±0.05 mm on small critical features by using shim-adjustable cores and controlled process windows. Shrinkage varies by resin (0.4% for PC to 2.0% for polyethylene) and is compensated in the tool. First-shot dimensional reports and process capability studies (Cpk ≥ 1.33) are standard on production programs.",
          },
          {
            q: "What is your typical cycle time?",
            a: "Cycle time ranges from 15 seconds (small thin-wall PP part) to 90 seconds (thick-wall PC housing). It is driven by cooling time, which scales with the square of wall thickness. Multi-cavity tools shoot 2–48 cavities per shot to hit higher throughput. We quote both cycle time and hourly press rate so you can model production capacity accurately.",
          },
          {
            q: "Where is the tool stored and who owns it?",
            a: "You own the tool. We store it free of charge in a climate-controlled warehouse for the life of the program plus 5 years. Tools are inventoried, photographed, and PM-serviced (cleaned, hobbed, pin-and-bushing check) every 25,000 shots or annually, whichever comes first. You can transfer the tool to another shop at any time at no fee — we ship it with all documentation.",
          },
          {
            q: "Do you provide PPAP for automotive or medical?",
            a: "Yes — full PPAP Level 3 documentation including design records, DFMEA, PFMEA, control plan, MSA, process capability studies, IMDS submission, and part-submission warrant. Level 5 available on request. For medical device programs we align to ISO 13485 with process validation (IQ/OQ/PQ), design history file support, and traceability from raw material lot through finished part.",
          },
        ],
      },
    ],
  },
  {
    slug: "materials-selection",
    title: "Materials Selection FAQ",
    description:
      "How to pick the right material for your part — strength, temperature, cost, and environment.",
    intro:
      "Choosing the right material is often the biggest lever on part performance and cost. This FAQ walks through the trade-offs by application and helps you translate a use case into a specific alloy or polymer.",
    groups: [
      {
        heading: "Metals",
        items: [
          {
            q: "6061 vs. 7075 aluminum — when to pick each?",
            a: "6061-T6: yield 40 ksi, tensile 45 ksi, excellent corrosion resistance, weldable, anodizes cosmetically — the default for 80% of aluminum parts. 7075-T6: yield 73 ksi, tensile 83 ksi, aerospace strength, but not weldable and poor corrosion resistance (needs anodize or paint for outdoor use). Pick 7075 for structural aircraft, tooling, and weight-critical brackets where you would otherwise use steel. 7075 is ~2.5× the material cost of 6061 and machines slightly slower.",
          },
          {
            q: "When should I choose stainless over carbon steel?",
            a: "Stainless when the part will see moisture, food or medical contact, chemicals, or outdoor exposure. 304/304L: general purpose, food-safe, weldable. 316/316L: adds molybdenum for chloride resistance — marine, medical, chemical processing. 17-4 PH: precipitation-hardening; strong (up to 180 ksi yield) with moderate corrosion resistance — pump shafts, valve stems. 440C: high-carbon for wear (blades, bearings). Carbon steel (1018, 4140) is 3–5× cheaper but rusts fast without paint or plating.",
          },
          {
            q: "When is titanium worth the cost?",
            a: "Titanium wins when strength-to-weight is critical (aerospace, motorsports, wearables), when biocompatibility is required (implants, dental), or when saltwater and chemical corrosion would eat stainless (marine, offshore). Ti-6Al-4V (Grade 5) is 45% lighter than steel with comparable strength. Downsides: 8–12× the material cost of steel, slow to machine (30% of stainless throughput), and requires flood coolant and sharp inserts. For most industrial parts, 17-4 PH stainless is a better cost/performance pick.",
          },
          {
            q: "What is the strongest steel you machine?",
            a: "Maraging 300 (Vascomax C300) in aged condition reaches ~290 ksi yield strength. Available in DMLS (M300) and wrought bar stock. We also machine 4340 (up to 260 ksi through heat treat), H13 (~230 ksi after aging), and 300M ultra-high-strength steel (~280 ksi) for landing gear and racing components. All ultra-high-strength steels require post-machining heat treat, grinding, and shot peening on fatigue-critical features.",
          },
        ],
      },
      {
        heading: "Plastics",
        items: [
          {
            q: "Delrin vs. nylon — which for gears and bushings?",
            a: "Delrin (POM, acetal): dimensionally stable in humidity, low friction, excellent fatigue life — first choice for precision gears, bushings, cams, and food-contact mechanical parts. Nylon (PA6/6): tougher and cheaper but absorbs 2–3% water, causing dimensional swelling — better for impact-loaded rollers, wear pads, and non-precision gears where humidity is controlled. For gears seeing water, glass-filled nylon (33% GF) is a solid middle ground.",
          },
          {
            q: "When should I use PEEK?",
            a: "PEEK when you need continuous operation above 200°C (HDT 315°C), aggressive chemical resistance, high wear life, or biocompatibility for long-term implants. Common uses: semiconductor wafer handling, aerospace bushings, downhole oilfield tooling, spinal implants. Downsides: $200–400/kg raw material (100× the cost of nylon), slow machining, and requires specific tooling. Glass-filled and carbon-filled grades add stiffness. For 80% of high-temp needs, PEI (Ultem) at $60/kg is a cost-effective alternative.",
          },
          {
            q: "What plastic should I pick for outdoor UV exposure?",
            a: "ASA (acrylonitrile styrene acrylate) is the standard for outdoor cosmetic housings — same processability as ABS with 5× the UV life. HDPE and polypropylene are UV-stable with black pigment (2% carbon black). Acrylic (PMMA) is UV-stable and clear. Avoid ABS, polycarbonate, and unfilled nylon outdoors — they yellow and embrittle within a season. For UV-critical outdoor optical parts, PC with UV-stabilizer package (Makrolon LQ) works but at a cost premium.",
          },
          {
            q: "What plastics are FDA food-contact compliant?",
            a: "Natural (unpigmented) POM, HDPE, LDPE, PP, PEEK, PET, and PPSU are FDA 21 CFR compliant for food contact in their virgin form. Pigmented versions require an FDA-compliant colorant (spec the resin as FDA-grade at quote time). Nylon, PC, and ABS have FDA-compliant grades but not all off-the-shelf resins qualify — always verify with the resin certificate. For repeat food contact, avoid additives, mold releases, and machining coolants; we swap to food-grade coolant on FDA parts.",
          },
        ],
      },
      {
        heading: "Application-Based Selection",
        items: [
          {
            q: "What should I use for a lightweight structural bracket?",
            a: "First pass: 6061-T6 aluminum, machined or MJF nylon (glass-filled PA12 for structural). For 30–50% more strength at similar weight: 7075-T6. For truly weight-critical (aerospace, motorsport): DMLS titanium (Ti-6Al-4V) with topology optimization can be 40–60% lighter than a machined equivalent. Carbon-fiber-reinforced PA-CF FDM is a fast prototype option — 50% the weight of aluminum at ~30% the stiffness.",
          },
          {
            q: "What material for a high-temp automotive under-hood part?",
            a: "Under-hood ambient runs 120–160°C, with hot spots to 200°C. Glass-filled PA6/6 (33% GF) is the workhorse — heat-stabilized grades (Zytel HTN) push continuous use to 180°C. For exhaust-adjacent, use PPS (polyphenylene sulfide) or PEEK. Metallic alternatives: aluminum for heat sinks and manifold covers, stainless 409 or 441 for exhaust brackets, and Inconel 625 for exhaust manifolds and turbo housings.",
          },
          {
            q: "What material for a corrosive fluid handling part?",
            a: "For chloride environments (seawater, chlorinated water): 316L stainless, super duplex 2507, or titanium Grade 2. For acids (sulfuric, hydrochloric): Hastelloy C-276, PTFE-lined stainless, or solid PVDF/PEEK plastic. For hydraulic fluids and fuels: standard 303 stainless or hard-anodized 6061. Always share the fluid spec (concentration, temperature, duty cycle) with our materials engineers — we route corrosion questions to a materials specialist within 4 business hours.",
          },
          {
            q: "How do I pick a material for medical device use?",
            a: "For long-term implants (>30 days): Ti-6Al-4V ELI, CoCr F75, PEEK Optima LT1, or UHMWPE per ISO 10993 with USP Class VI certification. Short-term/surface contact: 316LVM stainless, 6/6 nylon, silicone LSR. All medical-grade materials require full traceability — we supply cert of conformance and material lot data on every part. Sterilization compatibility varies (autoclave, EtO, gamma) — call it out at quote so we recommend compatible resins and finishes.",
          },
        ],
      },
      {
        heading: "Getting Help",
        items: [
          {
            q: "Do you offer materials consulting?",
            a: "Yes — every account gets access to our materials engineering team. Post your use case (loads, temperature, environment, regulatory requirements) in the quote notes or email materials@3dbuildbot.com. For active production programs we can run FEA on candidate materials, build a design-of-experiments across three material options, and coupon-test to failure. Consulting is free on quotes above $5K and $150/hr on standalone requests.",
          },
          {
            q: "Can you help with a datasheet cross-reference?",
            a: "Yes. Upload the datasheet or list the target properties (yield strength, HDT, dielectric constant, CTE, etc.) and we return 2–3 equivalent materials with cost/lead-time impact. Common asks: swap out obsolete Ultem 1000 grades, find a US-domestic alternative for a Chinese-sourced resin, or match a competitor's material on a reverse-engineered part.",
          },
          {
            q: "Do you keep RoHS and REACH documentation?",
            a: "Yes — RoHS 3 (2015/863/EU) and REACH SVHC compliance declarations are on file for every standard material we stock. Full material declarations (FMD) and IMDS entries are available for automotive customers at $75 per part. Conflict minerals reporting (3TG per Dodd-Frank Section 1502) available for publicly traded customers on their reporting template.",
          },
          {
            q: "How do I compare cost between materials?",
            a: "Our instant quote tool has a material dropdown — pick 2–3 candidates and compare price side by side on your part geometry. This captures material cost, machinability, and finish differences (e.g., titanium vs. stainless is not just a raw material swap — cycle time doubles). For polymer selection, upload the STEP and select 3 resins in the compare view; you get all-in per-piece cost across MJF, SLA, and injection molding.",
          },
        ],
      },
    ],
  },
  {
    slug: "tolerances-and-gd-t",
    title: "Tolerances and GD&T FAQ",
    description:
      "Reading callouts, choosing tolerances that matter, and the cost impact of tightening.",
    intro:
      "Tolerances directly drive part cost. Too loose and parts do not function; too tight and cost explodes. This FAQ helps engineers spec tolerances that manufacturing can actually hit at a reasonable price.",
    groups: [
      {
        heading: "Fundamentals",
        items: [
          {
            q: "What is GD&T?",
            a: "Geometric Dimensioning and Tolerancing (per ASME Y14.5-2018 or ISO 1101) is a symbolic language for specifying the allowable variation in form, orientation, location, and runout of features on a part. It replaces plus/minus dimensioning for critical features because it defines tolerance zones relative to a datum reference frame — which is how the part actually assembles. Common callouts: position (⌖), flatness (⌭), perpendicularity (⟂), profile (⌓), and runout (↗).",
          },
          {
            q: "What is the default tolerance if I do not specify?",
            a: "For CNC-machined parts we default to ISO 2768 medium (±0.005 in / ±0.13 mm on features up to 100 mm). For sheet metal we default to ±0.010 in linear and ±1° on bend angles. For 3D printing, defaults follow the process: SLA ±0.15 mm, MJF ±0.2 mm, FDM ±0.5 mm or 0.5%. If your part has any critical fit — bearing bore, dowel pin, seal groove — always upload a dimensioned PDF with explicit tolerances.",
          },
          {
            q: "Do I need a drawing, or is a STEP file enough?",
            a: "For anything mission-critical, provide both. The STEP file drives programming and toolpaths; the drawing specifies tolerances, surface finish callouts, thread specs, datums, and inspection requirements. We accept PDF drawings on any sheet size. Without a drawing we build to defaults and cannot be held to a tighter spec if the part fails a downstream inspection. Uploads under 500 KB with a title block get automatic OCR and are attached to your part record.",
          },
          {
            q: "What is a datum reference frame?",
            a: "A datum reference frame is the set of three mutually perpendicular planes (primary, secondary, tertiary) that establish the coordinate system used to measure a feature. Datums should reflect how the part assembles — the mounting face, a locating pin bore, and an alignment edge. Poor datum selection is the number one cause of parts that pass inspection but fail in assembly. Our DFM engineers review datum schemes on GD&T drawings and flag inconsistencies before production.",
          },
        ],
      },
      {
        heading: "Cost Impact",
        items: [
          {
            q: "How much does a tight tolerance actually cost?",
            a: "Going from ±0.005 in to ±0.001 in on a CNC feature typically adds 15–40% to that feature's machining time — the machine slows down, we take a finishing pass with a fresh insert, and the part gets inspected on a CMM. Going to ±0.0002 in typically requires grinding or lapping and 2–4× cost. The rule: spec tight tolerance only on the specific features that need it, not the entire part.",
          },
          {
            q: "Which features are cheap to hold tight?",
            a: "Reamed and honed holes: ±0.0002 in on diameter with H7/H8 reamers is essentially free. Ground surfaces: flatness of 0.0005 in is standard on surface-ground plates. Turned diameters on a Swiss lathe: ±0.0005 in on OD. Milled pockets and slots on the same setup: position tolerance of 0.002 in MMC is cheap. In general, features held in a single setup with a single tool are cheap; features spanning multiple setups are expensive.",
          },
          {
            q: "Which features are expensive to hold tight?",
            a: "Long distances across multiple setups (>200 mm true position under 0.005 in), perpendicularity between features on opposite sides of a large part, and thin-wall features that flex under cutting force. Also expensive: profile tolerance on freeform surfaces (requires 5-axis and CMM verification), and tight parallelism on large flat plates (usually cheaper to grind post-machining than to hit in one setup).",
          },
          {
            q: "Should I use MMC or LMC modifiers?",
            a: "Use maximum material condition (MMC, Ⓜ) on features that assemble with clearance — a bolt through a hole. It gives the manufacturer a bonus tolerance as the feature departs from MMC, which lowers scrap rates and cost with no assembly risk. Use least material condition (LMC) on features that need minimum wall thickness or maintain a critical distance to another feature. RFS (regardless of feature size, default in Y14.5-2018) is the strictest — reserve it for truly RFS applications like press-fit bearings.",
          },
        ],
      },
      {
        heading: "Reading Callouts",
        items: [
          {
            q: "What does a position callout with a diameter symbol mean?",
            a: "⌖ ⌀0.010 A B C means the center of the feature (typically a hole) must lie within a cylindrical tolerance zone of diameter 0.010 in, located at the true position defined by datums A, B, and C. A diameter symbol indicates a circular (2D) or cylindrical (3D) zone; without it the zone is square. Position callouts almost always reference three datums; missing datums are one of the most common drawing errors we flag in DFM review.",
          },
          {
            q: "What is the difference between profile of a surface and profile of a line?",
            a: "Profile of a surface (⌓) controls the entire 3D surface within a uniform 3D tolerance band — used for freeform surfaces, blade airfoils, and cosmetic contours. Profile of a line (◠) controls only 2D cross-sections at any point — cheaper to inspect but less complete. Both can be specified as unilateral (all material on one side) or bilateral (balanced) using the U symbol or offset notation.",
          },
          {
            q: "What is flatness vs. parallelism?",
            a: "Flatness (⌭) is a form control — all points on the surface must lie between two parallel planes some distance apart; no datum required. Parallelism (∥) is an orientation control — the surface must be parallel to a datum surface within the tolerance. Parallelism is always ≥ the flatness tolerance (a parallel surface must also be flat within the parallelism spec). Both should typically be looser than the sheet-thickness or bore diameter tolerance to avoid over-constraining.",
          },
          {
            q: "How do I read a thread callout?",
            a: "1/4-20 UNC-2B THRU: 1/4 in diameter, 20 threads per inch, Unified National Coarse, class 2B fit (internal, standard commercial). M6x1.0-6H THRU: 6 mm diameter, 1.0 mm pitch, class 6H fit. Class 3B or 5H is a tighter fit for precision assemblies. THRU means through hole; blind threads specify depth (e.g., 12 DP for 12 mm minimum thread engagement). Always leave 1–2 pitches of clearance below blind threads for tap runout — we auto-add this in DFM.",
          },
        ],
      },
      {
        heading: "Best Practices",
        items: [
          {
            q: "How do I decide which tolerance to tighten?",
            a: "Ask what assembly or function each dimension controls. Tight tolerance is needed on: press-fit bores, dowel pin locations, seal grooves, mating flange faces, and gear centers. Loose tolerance is fine on: clearance holes, cosmetic features, non-mating surfaces, and stock cuts. A useful heuristic: if you cannot explain in one sentence why a tolerance is tight, it should not be. Our DFM engineers will call out over-tolerancing and suggest opening up features where possible.",
          },
          {
            q: "Should I tolerance-stack analyze my assembly?",
            a: "Yes for any assembly with 3+ mating parts and a critical fit at the end. Worst-case stack is a quick pen-and-paper check; RSS (root-sum-square) statistical stack is more realistic for production quantities. Use MMC bonus tolerance and floating fasteners to absorb variation. We offer stack-up analysis as a paid service ($300–800) for critical assemblies — send the assembly and identify the critical clearance/interference.",
          },
          {
            q: "Can I use profile tolerance to replace multiple callouts?",
            a: "Yes — a single profile-of-surface callout referencing three datums controls form, size, location, and orientation in one symbol. It is common on cast, forged, and 3D-printed net-shape parts because the true surface is complex. Downside: inspection requires a CMM or scanner and a nominal CAD reference. On simple prismatic parts, traditional plus/minus with a few position callouts is cheaper to inspect.",
          },
          {
            q: "What tolerance can I hold on a 3D-printed part?",
            a: "Untreated FDM: ±0.5% or ±0.5 mm minimum. SLA: ±0.15 mm on small features. MJF and SLS: ±0.2–0.3 mm. DMLS metal: ±0.1–0.2 mm as-printed. If you need tighter — bearing bores, sealing surfaces, thread-fit datums — design in a machining stock allowance (0.5–1 mm on the critical feature) and we add a post-print CNC operation. The result: additive freedom in the bulk geometry with machined precision where it matters.",
          },
        ],
      },
    ],
  },
  {
    slug: "surface-finishes",
    title: "Surface Finishes FAQ",
    description:
      "Bead blast, anodize, powder coat, polish, plating — what to pick and what it costs.",
    intro:
      "Surface finish is often the difference between a prototype and a product. This FAQ covers the finishes we offer in-line, when to pick each, and how they affect lead time and cost.",
    groups: [
      {
        heading: "Common Finishes",
        items: [
          {
            q: "What is bead blasting?",
            a: "Bead blasting uses fine glass or ceramic beads (100–400 mesh) propelled by compressed air to create a uniform matte finish on metal parts. Removes tool marks, hides small cosmetic defects, and provides a great base for anodize or paint. Standard bead blast on aluminum yields a satin finish at ~63 µin Ra. Cost is $8–15 per part depending on size. Note: bead blast slightly reduces sharp edge crispness and small feature detail.",
          },
          {
            q: "What is Type II vs. Type III anodizing?",
            a: "Type II (sulfuric anodize) is the standard decorative and mild-wear finish on aluminum — 0.0002–0.001 in thick, dyeable in black, red, blue, gold, and clear. Type III (hardcoat anodize per MIL-A-8625) is a thicker (0.0015–0.003 in), harder, more wear-resistant layer typically left dark gray or dyed black. Type III raises surface hardness to ~60 HRC and is standard on aerospace, firearms, and industrial wear surfaces. Both add 0.0005–0.001 in per side to dimensions — account for it on tight fits.",
          },
          {
            q: "What is powder coating and when should I use it?",
            a: "Powder coating is an electrostatically applied polymer powder cured in an oven (typically 400°F / 205°C for 20 minutes). Yields a durable, chip-resistant, UV-stable finish 2–4 mils (0.05–0.10 mm) thick in any RAL, Pantone, or custom color. Superior to wet paint for durability and environmental resistance. Standard for sheet-metal enclosures, brackets, and industrial equipment. Not recommended for parts with tight thread fits or bearing surfaces unless masked; not for aluminum parts that must dissipate heat electrically.",
          },
          {
            q: "What is passivation and why does stainless need it?",
            a: "Passivation is a chemical treatment (typically nitric or citric acid per ASTM A967) that removes free iron and iron oxides from stainless steel surfaces after machining, creating a protective chromium oxide layer. Machining leaves behind carbon steel particles from cutting tools that will rust — passivation is essential for any stainless part that will see moisture or corrosive environments. Cost is $5–15 per part. Not needed on 316L parts that will be electropolished (electropolish accomplishes the same thing).",
          },
        ],
      },
      {
        heading: "Cosmetic Finishes",
        items: [
          {
            q: "How do I get a mirror polish?",
            a: "Mirror polish is a multi-step process: rough grind (120 grit) → medium (400 grit) → fine (1200 grit) → buff with rouge → mirror at 4 µin Ra. Applied to stainless, aluminum, and brass parts where aesthetics matter — medical instruments, watch cases, mold cavities. Cost is $50–300 per part depending on complexity. Design for polish: no sharp inside corners (radius them to 0.5 mm minimum), gently blended features, and no cross-drilled holes on polished faces.",
          },
          {
            q: "What is electropolishing?",
            a: "Electropolishing is an electrochemical process (reverse of plating) that removes 0.0002–0.001 in of material from a stainless steel or copper alloy surface, leaving a bright, smooth, deburred, and passive finish (~15 µin Ra). Excellent for medical and food processing where a hygienic, easy-to-clean surface is required. Cost is $15–75 per part depending on size and geometry. Note: electropolishing amplifies underlying defects — start with a well-machined or ground surface for best results.",
          },
          {
            q: "Can you brush-finish parts (like a MacBook)?",
            a: "Yes — DA (dual-action) sanding with 240–400 grit belts produces a linear brushed finish common on premium aluminum housings. We can specify direction (uniform for a linear look, or radial for round parts). Cost is $10–25 per part. Follow with clear Type II anodize to lock in the finish and prevent oxidation. Similar finish on stainless is #4 satin — standard on appliances and architectural hardware.",
          },
          {
            q: "What is a bead-blasted and anodized aluminum finish?",
            a: "The Apple/consumer-electronics finish. Machine → deburr → bead blast (fine glass bead, 200 mesh) → clear or dyed Type II anodize. The bead blast homogenizes surface texture and hides machining marks; the anodize seals it and adds color. Total adder: $15–40 per part depending on size. This is the go-to for premium enclosures, drone frames, and camera housings. Specify AL BEAD BLAST + TYPE II BLACK or similar on your drawing.",
          },
        ],
      },
      {
        heading: "Functional Finishes",
        items: [
          {
            q: "What plating options do you offer?",
            a: "Zinc plating (yellow or clear chromate) — cheapest corrosion protection for steel fasteners and brackets. Nickel plating — decorative and low-friction, RoHS. Electroless nickel (EN) — uniform coating on complex geometry, adds surface hardness (48–52 HRC), wear-resistant. Hard chrome — thick, hard (68 HRC), wear-resistant for hydraulic rods and dies. Silver, gold, and rhodium for electrical contacts. All plating specs conform to ASTM B633, B633, B733, B117 as applicable — call out thickness class and salt-spray requirement on the drawing.",
          },
          {
            q: "What is chem film (Alodine / Iridite)?",
            a: "Chem film (chromate conversion coating per MIL-DTL-5541 Class 1A or Class 3) is a thin gold, clear, or dark coating on aluminum that provides corrosion protection while remaining electrically conductive. Standard for aerospace grounding surfaces and bonding straps. Class 1A is thicker (yellow, 30–40 salt-spray hours) for maximum corrosion protection; Class 3 is thinner (clear, low electrical resistance) for electrical bonding. Cost is $8–25 per part. Note: RoHS parts require the hex-chrome-free version (typically Iridite NCP or Surtec 650).",
          },
          {
            q: "What is black oxide?",
            a: "Black oxide (per MIL-DTL-13924) is a chemical conversion coating on steel that produces a magnetite (Fe3O4) surface — matte black, 0.0002 in thick, no dimensional change worth measuring. Mild corrosion protection (better when oil-sealed), and reduces glare on optics and tooling. Cheap ($5–15 per part) and fast. Standard finish on tool steels, fasteners, and firearm parts. For real corrosion protection, use zinc plate or black zinc.",
          },
          {
            q: "Can you PVD coat parts?",
            a: "Yes — via partner shops. Physical Vapor Deposition applies thin (1–5 µm), very hard (2200–3500 HV) coatings such as TiN (gold), TiCN (rose gold), TiAlN (violet-gray), DLC (diamond-like carbon, black), and CrN (silver). Used on cutting tools, medical instruments, watch cases, and premium consumer products. Cost is $75–500 per part depending on batch size. Lead time adds 5–10 days. Substrate must be able to withstand 200–450°C during deposition — not for softened aluminum or heat-sensitive parts.",
          },
        ],
      },
      {
        heading: "Ordering and Cost",
        items: [
          {
            q: "How do I request masking for painted or plated parts?",
            a: "Mark up a PDF drawing with the areas to mask (highlight in red or annotate NO PAINT / NO PLATE) and upload with your quote. Standard masking is silicone plugs on threaded holes and PEM inserts (~$0.50 per feature), tape on flat faces (~$1–3 per part), and custom-cut vinyl on complex geometry. For production runs above 100 pieces, custom silicone masks are more economical and repeatable.",
          },
          {
            q: "How much lead time do finishes add?",
            a: "In-line finishes (bead blast, deburr, tumble): no adder. Type II anodize: 3–5 business days. Type III hardcoat: 5–7 days. Powder coat and wet paint: 5–7 days. Plating (zinc, nickel, chem film): 5–7 days. Hard chrome and complex plating stacks: 7–10 days. PVD: 7–14 days. Multi-step finishes (anodize + silkscreen) run concurrently where possible; sequential steps are additive. Rush finishing is available at +50–100% depending on the vendor.",
          },
          {
            q: "Do you color-match to a Pantone or RAL?",
            a: "Yes. RAL and Pantone colors are standard on powder coat and wet paint at no color-match adder. Custom color matches (from a physical swatch or photo) run $150–400 for the color match plus material cost. Anodize color matching is less precise — dye lots vary slightly between batches. For consumer product color consistency across large orders, we recommend a color-approval sample and lot-specific dyeing.",
          },
          {
            q: "Can I get finish samples before committing?",
            a: "Yes — we offer physical finish sample kits: a set of 25 × 25 mm plates showing bead blast, brushed, anodize colors, powder coat colors, and plating options. Free to customers with an active account or $50 for prospects. Custom color samples on your material of choice run $75 per sample. Samples typically ship within 3 business days.",
          },
        ],
      },
    ],
  },
  {
    slug: "lead-times",
    title: "Lead Times FAQ",
    description:
      "Process-by-process turnaround times, rush options, and how we hit tight deadlines.",
    intro:
      "3DBuildBot publishes real lead times based on actual shop capacity, not marketing promises. This FAQ covers standard and rush lead times by process, plus the operational realities behind them.",
    groups: [
      {
        heading: "Standard Lead Times",
        items: [
          {
            q: "What is your standard lead time for CNC parts?",
            a: "Aluminum and mild steel: 5–7 business days from PO. Stainless and titanium: 7–10 business days. Parts requiring heat treat, plating, paint, or complex secondary operations: 10–14 business days. Multi-part assemblies: add 3–5 days for assembly and inspection. Times start when we receive a clean PO and confirmed CAD — DFM back-and-forth pauses the clock. Every quote shows the actual ship date so you can plan downstream operations.",
          },
          {
            q: "What is your standard lead time for 3D printing?",
            a: "FDM and SLA: 2–3 business days for standard-size parts. SLS and MJF: 3–5 business days. DMLS metal: 7–10 business days for standard materials (AlSi10Mg, 316L, Ti-6Al-4V), 10–14 for Inconel and complex post-processing (HIP, machining, NDT). Same-day and next-day options available on FDM and SLA for small parts ordered before 2pm PT with the Rush Queue add-on.",
          },
          {
            q: "What is your standard lead time for sheet metal?",
            a: "Laser-cut flat parts: 3 business days. Cut + form: 5 business days. Cut + form + weld: 7 business days. Add 3–5 days for powder coat, paint, or plating (concurrent where possible). Complex weldments with multiple sub-assemblies: 10–14 days. All lead times include a same-day-of-completion QC pass; if a part fails inspection, we start over and communicate a new ship date within 24 hours.",
          },
          {
            q: "What is the lead time for injection molding?",
            a: "Bridge tooling (aluminum, 100–10K shot life): 10–15 business days to first shots. Steel production tooling: 3–5 weeks. First-article samples ship within 5 days of tool completion. Production runs from an existing tool: 5–10 business days for 500–10K parts, longer for higher volumes as press time is scheduled. We publish tool status weekly with photos and a burn-down chart on active tool builds.",
          },
        ],
      },
      {
        heading: "Rush Options",
        items: [
          {
            q: "What rush options do you offer?",
            a: "3-day expedite: +25% (most processes, subject to capacity). 2-day expedite: +50%. 1-day rush: +100%, aluminum CNC and FDM/SLA only, small parts, must book by 8am PT. Same-day: available on FDM/SLA parts under 100 × 100 × 50 mm ordered before 10am PT. Rush pricing is shown in the instant quote — select the shipping date you need and the tool prices accordingly.",
          },
          {
            q: "Can I get a part in 24 hours?",
            a: "Yes, in specific cases. Small aluminum CNC parts (under 100 × 100 × 50 mm, standard tolerance, no secondary ops): ship in 24 hours if ordered by 8am PT and you approve DFM within 2 hours. FDM prototypes: ship same-day for orders under $250 placed before 10am PT. For any 24-hour request, upload a clean STEP + drawing and call the rush line at +1-855-BUILD-BOT to confirm capacity before ordering.",
          },
          {
            q: "Do you work weekends?",
            a: "Our in-house FDM and SLA farms print 24/7 including weekends. CNC and sheet-metal partners run Saturday shifts on rush orders at a 40% premium. Sunday is reserved for critical rush programs (aerospace, medical, defense hot-line requests). For weekend expedite, tag your order with WEEKEND EXPEDITE at checkout — a coordinator confirms feasibility within 2 hours.",
          },
          {
            q: "Is there a rush option for large orders?",
            a: "Yes — for orders above $5,000, we can split production across multiple shops in our network to compress lead time (parallel run). Example: a 500-piece machined bracket that would normally ship in 3 weeks can ship in 8 business days across 4 shops, with unified inspection and CoC at the end. This service is priced case-by-case; contact rush@3dbuildbot.com with your requirement and target date.",
          },
        ],
      },
      {
        heading: "Delays and Communication",
        items: [
          {
            q: "What happens if my order is late?",
            a: "Every order has a confirmed ship date at PO. If we miss it by our fault (equipment failure, material shortage on our end, quality issue), we credit 100% of the expedite fee on the current order or apply a 10% credit on a standard-lead-time order. We proactively notify you 48 hours before any missed ship date with the new date and cause — you should never be surprised.",
          },
          {
            q: "How do you communicate order status?",
            a: "Real-time status in your dashboard: quoted → PO received → CAD reviewed → in production → in QC → shipped. Email notifications at each major stage. Slack integration available (see API and Integrations FAQ). For production programs above 100 units, you get a weekly status call and shared burndown dashboard. Any concern: reply to the order thread or call your account manager directly.",
          },
          {
            q: "What causes lead-time slippage?",
            a: "In order of frequency: (1) DFM back-and-forth — unclear tolerances, missing drawings, undecided material; (2) material availability — exotic alloys and specific PEEK grades can add 3–5 days; (3) finish vendor capacity — powder coat and plating are the most common bottlenecks; (4) inspection findings — a failed feature triggers a re-run. We call out risk factors in the quote confirmation so you know what could slip.",
          },
          {
            q: "Can I hold parts in inventory for a scheduled release?",
            a: "Yes. On production programs we offer Kanban replenishment (parts held at our warehouse and shipped on your Just-in-Time call), Vendor-Managed Inventory (parts consigned into your dock and invoiced on consumption), and scheduled monthly releases against a blanket PO. All included at no adder above 500 pieces per year.",
          },
        ],
      },
      {
        heading: "Planning",
        items: [
          {
            q: "How should I plan lead time for a new product launch?",
            a: "Typical NPI cadence: Prototype 1 (FDM/SLA, 3–5 days) → Prototype 2 (CNC or MJF, 7–10 days) → Engineering build (25–50 pieces, 2–3 weeks) → Design validation build (100–500 pieces on bridge tooling, 4–6 weeks) → Production tooling (5–10 weeks for injection molds) → Production launch. Front-load DFM reviews and material selection to compress the middle phases; we run parallel DFM on all three prototype phases to shave 5–10 days.",
          },
          {
            q: "Can you help me plan a production ramp?",
            a: "Yes — production planning support is included on programs above $25K annual spend. We build a capacity plan across the ramp (typically 4–8 months from first shot to full-rate production) with monthly delivery targets, safety stock, and dual-source scenarios. Our supply chain team runs weekly cadence with your operations lead. For automotive and aerospace we align to your APQP / AS9145 timeline.",
          },
          {
            q: "What lead time do finish operations add?",
            a: "Deburr, tumble, bead blast: no adder (in-line). Type II anodize: 3–5 days. Type III hardcoat: 5–7 days. Powder coat: 5–7 days. Plating (zinc, nickel): 5–7 days. Hard chrome, PVD: 7–14 days. Silkscreen and pad printing: 3–5 days. Where possible we run finishes concurrently with other operations; sequential finishes (anodize then silkscreen) are additive.",
          },
          {
            q: "How does DFM turnaround affect lead time?",
            a: "Standard DFM feedback ships within 4 business hours of upload. Complex parts (aerospace, medical, high-cavity molds) can take 24 hours. Every DFM cycle you spend clarifying tolerances or resolving issues pauses the production clock. To avoid delays: upload STEP + drawing together, spec material and finish before quoting, and check the DFM report the same day it lands. Our DFM engine catches ~80% of issues automatically; the rest are engineer reviews.",
          },
        ],
      },
    ],
  },
  {
    slug: "pricing-and-quotes",
    title: "Pricing and Quotes FAQ",
    description:
      "What drives cost, how the instant quote works, and how to make budget-conscious decisions.",
    intro:
      "Every 3DBuildBot quote is generated from real-time capacity, material cost, and machine time — not lookup tables. This FAQ explains what drives price, how the tool works, and how to structure orders for the best cost.",
    groups: [
      {
        heading: "How Quoting Works",
        items: [
          {
            q: "How does the instant quote engine work?",
            a: "Upload a STEP or STL, and our engine (a) auto-detects features and toolable geometry, (b) estimates cycle time using shop-specific feed and speed data across our network, (c) checks real-time capacity at qualified suppliers, (d) applies material and finish costs, and (e) returns a price and ship date within 60 seconds. For complex assemblies or custom finishes, an engineer reviews and confirms within 4 business hours.",
          },
          {
            q: "Is the quoted price fixed or can it change?",
            a: "Fixed for 30 days from the quote date, provided no scope changes. If you upload a revised CAD after PO, we re-quote the delta. Material price volatility (e.g., a titanium spike) is absorbed within the 30-day window; long-lead programs beyond 30 days include an index-based escalator clause. Rush upgrades after PO are priced at the difference between original and rush.",
          },
          {
            q: "Why is my quote different from a competitor's?",
            a: "Common reasons: (1) our quote includes inspection and CoC that others charge extra; (2) our default tolerance may be tighter (ISO 2768-m vs. ISO 2768-c); (3) our lead time may be faster; (4) we route to shops with actual capacity, not the cheapest lowball. If you have a competitor quote in hand, upload it — we will match it line-for-line and explain any differences.",
          },
          {
            q: "Can I get a quote without uploading CAD?",
            a: "For a ballpark, yes — describe the part (process, material, rough dimensions, quantity) in the quote form and we return a range within 24 hours. For a firm quote, we need a STEP and (for tight-tolerance parts) a PDF drawing. If you cannot share CAD due to IP restrictions, we sign a mutual NDA before you upload — standard turnaround 1 business day.",
          },
        ],
      },
      {
        heading: "Cost Drivers",
        items: [
          {
            q: "What are the biggest drivers of CNC cost?",
            a: "(1) Machine time — a function of material removal volume, cutter path complexity, and material machinability; (2) material — titanium is 8–12× 6061 aluminum; (3) setups — every re-fixturing adds 15–45 minutes; (4) tolerances tighter than ±0.005 in add finishing passes and CMM inspection; (5) finishes — anodize, plating, paint; (6) quantity — setup amortizes fast above 10 pieces.",
          },
          {
            q: "What are the biggest drivers of 3D printing cost?",
            a: "Print volume (bounding box for SLS/MJF, actual volume for SLA/FDM) is the primary driver — it dictates how much of the build plate you occupy. Wall thickness and infill matter on FDM. Support material adds cost on SLA. For DMLS, part height dominates because build time is proportional to height. Hollowing large parts and orienting them cleverly can drop cost 20–40%. Our DFM engine surfaces these optimizations automatically.",
          },
          {
            q: "Why do quantity discounts kick in?",
            a: "Setup costs (programming, fixturing, first-article inspection, machine warm-up) are fixed per order. On quantity 1, setup can be 60–80% of the price. As quantity grows, setup amortizes across more parts. Sharp price breaks typically occur at 10, 50, 100, and 500 pieces where we can shift to more efficient tooling — a bar feeder instead of chuck loading, a fixture plate instead of a vise, or a multi-cavity strategy on the mill.",
          },
          {
            q: "How does part complexity affect price?",
            a: "Complexity is measured in feature count and setup count. A simple plate with 4 holes runs in one setup. A complex bracket with pockets on 5 faces requires 3–5 setups or 5-axis machining. Every setup adds 15–45 minutes of shop labor. Tight-tolerance features (H7 bores, ground surfaces) add finishing passes. Freeform surfaces require ball-end tooling and slower feeds. Our quote engine breaks out setup and cycle time so you can see the drivers.",
          },
        ],
      },
      {
        heading: "Saving Money",
        items: [
          {
            q: "How can I reduce cost on my part?",
            a: "(1) Open up unnecessary tight tolerances; (2) switch from 316 stainless to 304 or 303 if corrosion allows; (3) use standard drill sizes and thread pitches; (4) design for a single setup where possible (no features on the back face); (5) request bead blast instead of hand polish; (6) order 10 pieces instead of 1 if you can use the spares — often the same price or cheaper per unit. Our DFM report auto-surfaces cost-saving suggestions.",
          },
          {
            q: "Should I combine multiple parts on one order?",
            a: "Yes — combining orders lowers per-part cost. We nest sheet-metal parts on the same sheet, batch CNC parts to share fixture time, and combine small 3D prints on a single build plate. If you have a bill-of-materials for an assembly, upload the entire BOM and we quote it holistically with combined shipping.",
          },
          {
            q: "Do you price-match?",
            a: "Yes, on comparable scope. Send us a competitor's quote (same CAD, same tolerance, same material, same lead time, same certifications) and we will match it or beat it by 5%. We do not match lowball quotes that omit inspection, use undocumented material, or skip DFM. Our match applies to any US-based competitor with a comparable quality system.",
          },
          {
            q: "Are there discounts for repeat customers or high volume?",
            a: "Yes. Volume discounts kick in automatically at 100, 500, 1K, 5K, and 10K units per year across your account. Repeat customer discounts (5–15% off list) apply after your third order. Enterprise agreements with annual commit above $250K unlock custom pricing, dedicated engineering support, and shared capacity guarantees. Contact sales@3dbuildbot.com for an enterprise consultation.",
          },
        ],
      },
      {
        heading: "Payment and Terms",
        items: [
          {
            q: "How do I pay for an order?",
            a: "Credit card (Visa, MC, Amex, Discover) — 3% surcharge waived. ACH bank transfer — no fees. Wire transfer — customer covers bank fees. Net 30 terms available for enterprise accounts after credit check (Dun & Bradstreet or similar). Purchase orders accepted from established customers and government agencies. Cryptocurrency (BTC, ETH, USDC) accepted via BitPay integration for international customers.",
          },
          {
            q: "Do you accept purchase orders (POs)?",
            a: "Yes. First-time PO customers are approved after a standard credit check (D&B, or trade references). Once approved, upload the PO PDF or send to po@3dbuildbot.com — production starts the same day. Payment terms are typically Net 30 with 1% net 10 discount. Government POs (GSA schedule, SEWP) accepted; we are registered in SAM.gov with CAGE code active.",
          },
          {
            q: "When do I pay — at order or on delivery?",
            a: "Standard: 50% deposit at PO for orders above $5K, balance due on shipment. Under $5K: full payment at PO by credit card or ACH. Net 30 accounts: invoiced on shipment, due 30 days from invoice date. For tooling orders, 50% down at design approval and 50% on first-article approval. Terms are flexible on established accounts — talk to your account manager.",
          },
          {
            q: "Can I get a quote in a currency other than USD?",
            a: "Yes. Quotes available in USD, EUR, GBP, CAD, AUD, and JPY at the current wire-transfer rate. Currency is locked at PO. For very large orders (>$100K) we offer forward-rate contracts to hedge against exchange volatility during long production runs. International orders may include duties, VAT, and customs fees — we ship DDP (Delivered Duty Paid) on request for a small surcharge.",
          },
        ],
      },
    ],
  },
  {
    slug: "aerospace-manufacturing",
    title: "Aerospace Manufacturing FAQ",
    description:
      "AS9100 certification, ITAR, aerospace materials, and flight hardware requirements.",
    intro:
      "3DBuildBot's aerospace program serves primes, tier-1 suppliers, and new-space startups with AS9100D-certified production, ITAR-registered facilities, and full traceability. This FAQ answers what aerospace buyers need to know before their first order.",
    groups: [
      {
        heading: "Certifications",
        items: [
          {
            q: "Are you AS9100 certified?",
            a: "Yes — 3DBuildBot is AS9100 Rev D certified for CNC machining, sheet-metal fabrication, and DMLS additive manufacturing. Our certificate is available in the dashboard under Certifications and is annually surveilled by NSF-ISR. Not all partner shops in our network are AS9100-certified — orders flagged as aerospace or requiring AS9100 are routed only to certified shops with documented flow-down.",
          },
          {
            q: "Are you ITAR-registered?",
            a: "Yes — 3DBuildBot is ITAR-registered with the US Department of State (DDTC). We hold an active registration and process ITAR-controlled parts through a US-persons-only workflow with segregated servers, US-based CNC and DMLS shops, and controlled access to CAD data. Non-US personnel are excluded from ITAR jobs from quote through shipment. Full ITAR compliance details in the Defense and ITAR FAQ.",
          },
          {
            q: "Do you support NADCAP special processes?",
            a: "Yes, via partner network. NADCAP-accredited processes available: heat treatment, chemical processing (anodize, chem film, passivation), non-destructive testing (dye penetrant, radiographic, ultrasonic), welding (fusion, brazing), coatings (PVD, thermal spray). Each certified process ships with the NADCAP-compliant CoC and process traceability. Add NADCAP compliance in the quote wizard under Special Processes.",
          },
          {
            q: "Do you support FAA PMA and TSO parts?",
            a: "Yes for build-to-print. We do not hold PMA authority ourselves; we manufacture to your PMA drawing package with full AS9100 documentation, dedicated part traceability, and any DER-approved special processes. For TSO parts we work under your DO-178C / DO-254 / DO-160 flow-down. For new PMA programs we can introduce a partner DER — turnaround is typically 3–6 months for FAA approval.",
          },
        ],
      },
      {
        heading: "Materials and Processes",
        items: [
          {
            q: "What aerospace materials do you stock?",
            a: "Aluminum: 2024-T3, 2219, 6061-T6, 7050-T7451, 7075-T6, MIC-6 tool plate. Titanium: Grade 2, Grade 5 (Ti-6Al-4V), Grade 23 (ELI). Steel: 4130 chromoly, 4340, 15-5 PH, 17-4 PH, 300M, 15-7 Mo PH stainless. Superalloys: Inconel 625, 718, Hastelloy X. All aerospace-grade with certified pedigree — AMS-QQ, AMS 4000-series specs, and DFARS-compliant sourcing on request.",
          },
          {
            q: "Do you produce flight-critical hardware?",
            a: "Yes. We routinely produce flight hardware for propulsion, structural, and secondary flight-control applications. Flight-critical parts get enhanced flow-down: 100% dimensional inspection, dye penetrant on machined titanium and stainless, X-ray on DMLS parts, and traceability from mill heat lot through final part serial number. Serial number etch or laser mark is included at no adder on aerospace orders.",
          },
          {
            q: "Do you support DMLS for aerospace?",
            a: "Yes. Our DMLS floor produces flight hardware in Ti-6Al-4V, Inconel 625, Inconel 718, and AlSi10Mg. Standard post-processing: stress relief anneal, HIP (hot isostatic pressing) for full density, solution + age heat treatment, CNC finishing of critical surfaces, and NDT. Parts ship with material certification, process history (build parameters, heat treat records), and inspection reports meeting AS9100 requirements. For a new aerospace DMLS application, we run a first-article qualification build with witness coupons.",
          },
          {
            q: "Can you handle raw material free-issue from my program?",
            a: "Yes. Free-issue material is common on aerospace programs — you ship us the qualified material with pedigree, we machine to your drawing. We track every piece by heat lot and serial number, retain scrap for return, and issue a material usage report at shipment. Scrap allowance is typically 15% (first article + normal machining loss); overrun is billed at cost with documentation.",
          },
        ],
      },
      {
        heading: "Quality and Inspection",
        items: [
          {
            q: "Is AS9102 First Article Inspection standard?",
            a: "Yes — AS9102 Rev C FAI is standard on all aerospace orders and included at no adder. Form 1 (part accountability), Form 2 (product accountability), and Form 3 (characteristic accountability) are populated for every ballooned dimension. FAI report ships with the parts. Delta FAIs available on subsequent lot changes (revision changes, process changes, tooling changes) per AS9102 Section 5.4.",
          },
          {
            q: "Do you provide full material certifications?",
            a: "Yes. Mill Test Reports (MTRs) traceable to the heat lot are included on every aerospace order. Material chemistry, mechanical properties, and lot certifications archived for 10 years minimum. DFARS-compliant material (melted and manufactured in a qualifying country) available on request. For flight programs we also provide raw material sample retention (retained coupon per lot for 10 years).",
          },
          {
            q: "Do you handle FOD (Foreign Object Debris) control?",
            a: "Yes. Aerospace parts are produced in FOD-controlled areas with segregated staging, log-in/log-out fixturing, and hand-count tool inventory at the end of each shift. Parts are bagged individually or in ESD-safe FOD trays, and shipped in tamper-evident containers. FOD-critical programs (satellite, engine internals) get a witness inspection and photographic evidence of the sealed shipment.",
          },
          {
            q: "Can you support source inspection at your facility?",
            a: "Yes. Your quality representative or a DCMA representative can source-inspect at any of our AS9100-certified shops. Provide 5 business days notice and the inspection scope; we prepare the parts, drawings, inspection records, and traceability documents in advance. Video source inspection (Teams or Zoom with our QA lead walking through the parts) is also supported — often more efficient than travel.",
          },
        ],
      },
      {
        heading: "Program Management",
        items: [
          {
            q: "Do you support long-term production programs?",
            a: "Yes. Long-term aerospace programs get a dedicated program manager, monthly production review, capacity guarantees under a long-term agreement (LTA), and configuration control down to revision level. We support APQP, PPAP, AS9145, and customer-specific quality plans. Typical program cadence: quarterly business review, monthly delivery tracking, weekly production status.",
          },
          {
            q: "Can you manage design-to-production transition?",
            a: "Yes — our aerospace engineering team supports the transition from design to production including tooling design, first-article qualification, process qualification (per AS9145 or your PPAP-equivalent), and rate readiness reviews. We manage the FAI, PFMEA, control plan, and process validation as deliverables tied to your production readiness milestone.",
          },
          {
            q: "Do you accept government POs (DPAS-rated)?",
            a: "Yes — DPAS-rated (Defense Priorities and Allocations System) orders are accepted and get priority scheduling per FAR 52.211-14. We track DO and DX ratings in our ERP and adjust ship schedules as required. Standard rating is DO-A3. Higher priority ratings should be called out at PO. All DPAS orders ship with DD-1149 documentation as needed.",
          },
          {
            q: "How do you handle counterfeit-parts prevention?",
            a: "Per AS5553 and AS6081, we source raw material only from authorized distributors and mills with documented pedigree. No brokered material without full traceability. All incoming material is inspected against the CoC and visually screened for tampering, mis-marking, or re-branding. Independent lab testing (chemistry, mechanicals) available on request for high-risk material lots.",
          },
        ],
      },
    ],
  },
  {
    slug: "medical-device-manufacturing",
    title: "Medical Device Manufacturing FAQ",
    description:
      "ISO 13485, biocompatibility, sterile packaging, and regulatory support for medical devices.",
    intro:
      "3DBuildBot manufactures Class I, II, and III medical device components under an ISO 13485-certified quality system. This FAQ covers materials, sterilization, biocompatibility, and the regulatory workflow for medical parts.",
    groups: [
      {
        heading: "Certifications",
        items: [
          {
            q: "Are you ISO 13485 certified?",
            a: "Yes — 3DBuildBot is ISO 13485:2016 certified for design and manufacture of components for medical devices. Certificate is issued by BSI, audited annually. Our QMS supports Class I, II, and III device components including custom implants, surgical instruments, delivery systems, and lab equipment. We are also FDA-registered as a contract manufacturer (registration number available on request).",
          },
          {
            q: "Do you support FDA design controls (21 CFR 820.30)?",
            a: "Yes. For clients developing medical devices, we support design controls including design history file (DHF) contributions, design verification testing, design transfer to production, and process validation (IQ/OQ/PQ). Deliverables include design outputs, verification records, test reports, and traceability matrix entries. We support 510(k) submissions, PMA applications, and De Novo requests through our regulatory partners.",
          },
          {
            q: "Can you support 510(k) and PMA submissions?",
            a: "Yes. We provide manufacturing sections of 510(k) submissions including facility description, quality system information, manufacturing flow, process validation summaries, and material certifications. For PMA and De Novo, we support the more extensive documentation package with risk analysis, sterilization validation, and biocompatibility data. Our regulatory consultants can be included as advisors on your submission.",
          },
          {
            q: "Do you support IEC 60601 electromechanical testing?",
            a: "Yes, via partner test labs. IEC 60601-1 basic safety and essential performance, plus applicable collaterals (60601-1-2 EMC, 60601-1-11 home healthcare, 60601-2 series device-specific). We coordinate test lab access, sample prep, and iterative design revisions to close findings. Typical certification cycle is 3–6 months for a new device.",
          },
        ],
      },
      {
        heading: "Materials",
        items: [
          {
            q: "What biocompatible materials do you stock?",
            a: "Metals: Ti-6Al-4V ELI (Grade 23), Ti Grade 2, 316LVM stainless, CoCr F75, tantalum, Nitinol. Polymers: PEEK Optima LT1 and NI1 (Invibio), UHMWPE (GUR 1020, 1050), medical-grade silicone (Silastic MDX4-4210, Nusil), PC-ISO (biocompatible polycarbonate), PSU. All materials with USP Class VI and ISO 10993-5 (cytotoxicity) documentation. Full biocompatibility test data (ISO 10993-1 through -18) available on request for regulatory submissions.",
          },
          {
            q: "Can you produce implantable parts?",
            a: "Yes — long-term implants in Ti-6Al-4V ELI, CoCr F75, PEEK Optima, and Nitinol. Common implant categories: orthopedic (screws, plates, cages), spinal (rods, interbody fusion cages), dental (abutments, custom prosthetics), and patient-specific implants from CT-scan-derived CAD. All implants ship with material traceability, cleaning validation, and packaging compatible with your sterilization method (gamma, EtO, or steam).",
          },
          {
            q: "Do you offer patient-specific implants?",
            a: "Yes — we work with imaging companies (Materialise, Mimics, 3D Slicer) or accept DICOM data with a signed HIPAA business associate agreement. Typical workflow: CT/MRI upload → segmentation to STL → surgeon review → CAD refinement → DMLS titanium or PEEK machining → cleaning and packaging. Turnaround for patient-specific implants is 5–10 business days depending on complexity and sterilization requirements.",
          },
          {
            q: "What plastics are suitable for sterilizable medical parts?",
            a: "For repeated autoclave (121–134°C): PEEK, PSU (Udel), PPSU (Radel), PC-ISO (limited cycles), silicone LSR. For gamma sterilization: PC, PP, PE, PMMA, and most engineering thermoplastics tolerate 25 kGy. For EtO: virtually all polymers are compatible but must be designed to aerate off residual EtO. Avoid uncertified nylon and ABS for repeat sterilization. Material cert with sterilization data is on file for all medical-grade resins.",
          },
        ],
      },
      {
        heading: "Cleanroom and Packaging",
        items: [
          {
            q: "Do you offer cleanroom manufacturing?",
            a: "Yes, via partner network. ISO Class 7 (Class 10,000) cleanroom capacity for final machining, deburring, cleaning, assembly, and packaging of medical components. ISO Class 8 (Class 100,000) for less sensitive components. Cleanroom orders ship with environmental monitoring data (particle counts, personnel gowning verification) and validated cleaning per ASTM F1877 or client-specific protocol.",
          },
          {
            q: "Can you clean and package for sterile presentation?",
            a: "Yes — parts are cleaned to a validated cleaning protocol (typically ultrasonic cleaning in DI water + alcohol rinse + IPA drying, with bioburden and residual monitoring). Packaging into Tyvek pouches, form-fill-seal, or rigid trays as required. We do not perform terminal sterilization ourselves; parts ship sterile-ready and are terminally sterilized at your ISO-13485-certified sterilizer of choice (Steris, Sterigenics, etc.).",
          },
          {
            q: "Do you provide bioburden and endotoxin testing?",
            a: "Yes, via ISO 17025 accredited partner labs. Standard tests: bioburden per USP <61> and <62>, endotoxin per USP <85>, cytotoxicity per ISO 10993-5. Sample size and acceptance criteria per your validated protocol or industry standard. Turnaround 3–5 business days plus shipping to the lab. We can build routine bioburden monitoring into a production plan for ongoing verification.",
          },
          {
            q: "How do you handle cross-contamination between medical and non-medical parts?",
            a: "Medical orders are segregated: dedicated fixturing, dedicated tooling, cleaning of the machine tool coolant path before medical runs, and isolated staging in FOD-controlled bins. Coolants and lubricants are medical-approved for parts in patient contact. Batch records document all controls and are archived for 15 years minimum per FDA requirements.",
          },
        ],
      },
      {
        heading: "Regulatory and Documentation",
        items: [
          {
            q: "What documentation ships with a medical order?",
            a: "Certificate of Conformance to drawing revision, material MTR with USP Class VI or ISO 10993 statement, dimensional inspection report (100% or AQL 1.0 sampling per your spec), cleaning validation records if cleaned, packaging inspection, and batch/lot record. For validated processes: process control charts, IQ/OQ/PQ references. All documents are electronic-signed per 21 CFR Part 11 and archived in your customer portal.",
          },
          {
            q: "How do you handle Corrective and Preventive Action (CAPA)?",
            a: "Under our ISO 13485 QMS, all customer complaints trigger a CAPA investigation within 5 business days. Root cause analysis (5-whys, Ishikawa, or DOE as needed), corrective actions with effectiveness verification, and preventive actions to eliminate recurrence. CAPA reports shared with customer within 30 days of complaint. Repeat issues trigger management review and process changes.",
          },
          {
            q: "Do you sign Quality Agreements?",
            a: "Yes — we sign Quality Agreements with all medical customers per FDA guidance and ISO 13485 §7.4. Standard agreement covers responsibilities for design, materials, process controls, inspection, documentation, changes, deviations, and complaints. We can also sign customer-specific agreements — typical review turnaround is 5–10 business days.",
          },
          {
            q: "How long do you retain medical records?",
            a: "Per ISO 13485 and 21 CFR 820.180, we retain device records for the design lifetime of the device plus 2 years, minimum 15 years. Records include batch history, inspection records, material certifications, personnel training, calibration, and change control. Records are stored electronically with audit trail and available on 5 business days notice for FDA inspections or customer audits.",
          },
        ],
      },
    ],
  },
  {
    slug: "defense-and-itar",
    title: "Defense and ITAR FAQ",
    description:
      "Export controls, US-persons workflow, DFARS, and defense-industrial compliance.",
    intro:
      "3DBuildBot is ITAR-registered and DFARS-compliant for defense manufacturing. This FAQ walks through export control basics, our compliance workflow, and what defense buyers need to know.",
    groups: [
      {
        heading: "ITAR Basics",
        items: [
          {
            q: "What is ITAR?",
            a: "The International Traffic in Arms Regulations (22 CFR 120-130) control the export of defense articles and services on the US Munitions List (USML). Any technical data, hardware, or service related to USML items is subject to ITAR — including drawings, CAD files, and manufactured parts. Violations carry criminal penalties. If your part is USML-controlled, we route it through our ITAR workflow at no additional charge.",
          },
          {
            q: "Are you ITAR-registered?",
            a: "Yes — 3DBuildBot holds an active ITAR registration with the US State Department Directorate of Defense Trade Controls (DDTC). Our registration is current and renewed annually. ITAR registration numbers are shared under NDA with defense customers requiring flow-down verification. We are also SAM.gov-registered with an active CAGE code.",
          },
          {
            q: "How do you protect ITAR-controlled data?",
            a: "ITAR jobs run on segregated, US-hosted servers with US-persons-only access. Non-US personnel are excluded from quote through shipment. CAD files, drawings, and technical data are encrypted at rest and in transit (AES-256, TLS 1.3). Access is logged and audited. Physical hardware is produced only at US-based, ITAR-registered partner shops with matching data controls.",
          },
          {
            q: "What is a US Person under ITAR?",
            a: "A US Person is a US citizen, US lawful permanent resident (green card holder), a protected individual under 8 USC 1324b(a)(3), or a US legal entity. All personnel touching ITAR-controlled technical data or hardware must be US Persons. We verify employee status at hire and re-verify annually. Foreign national access requires a specific TAA (Technical Assistance Agreement) or export license — a slow and expensive process we generally avoid.",
          },
        ],
      },
      {
        heading: "DFARS and Traceability",
        items: [
          {
            q: "Are you DFARS-compliant for material sourcing?",
            a: "Yes. Per DFARS 252.225-7009, we source specialty metals (titanium, corrosion-resistant steel, cobalt-based alloys, etc.) from qualifying countries only when the DFARS clause is invoked. Material certificates document origin. For non-DFARS orders we source globally for best cost. Call out DFARS at quote time — a small material premium may apply.",
          },
          {
            q: "Do you comply with DFARS 252.204-7012 (safeguarding)?",
            a: "Yes — our IT infrastructure meets NIST SP 800-171 controls for Covered Defense Information (CDI). We are SPRS-scored (Supplier Performance Risk System) with a score available on request. For customers requiring CMMC certification, we are working through CMMC Level 2 assessment with a target completion date shared under NDA.",
          },
          {
            q: "Can you support DPAS priority ratings?",
            a: "Yes — DO and DX rated orders per FAR 52.211-14 receive priority scheduling in our production system. DPAS priorities are tracked in our ERP and drive material sourcing and shop scheduling ahead of non-rated work. Provide the DPAS rating on the PO — we acknowledge within 5 business days per DPAS regulations.",
          },
          {
            q: "How do you handle counterfeit parts prevention?",
            a: "Per DFARS 252.246-7007 and AS5553, we source raw material only from authorized distributors and mills with documented pedigree — no brokered material. Incoming inspection verifies material chemistry against the CoC. High-risk material lots may be independently tested (XRF, spark spectroscopy). All findings are logged in GIDEP (Government-Industry Data Exchange Program) as required.",
          },
        ],
      },
      {
        heading: "Working with Us",
        items: [
          {
            q: "How do I flag an order as ITAR?",
            a: "Check the ITAR box at quote time. Our system immediately routes the quote to our US-persons-only ITAR workflow, disables access from non-qualifying accounts, and encrypts uploaded technical data. You will see an ITAR banner on the order throughout its lifecycle. If you are unsure whether your part is ITAR-controlled, err on the side of flagging it — we default to ITAR protections at no cost.",
          },
          {
            q: "Do you sign DD-2345 or NDAs?",
            a: "Yes. We sign DD Form 2345 (Militarily Critical Technical Data Agreement), mutual NDAs, and customer-specific security agreements. Standard NDA turnaround is 1 business day; DD-2345 is typically pre-signed and on file for JCP-approved customers. For classified programs above SECRET we work through cleared partner facilities — contact defense@3dbuildbot.com to discuss.",
          },
          {
            q: "Can you support classified programs?",
            a: "Directly, no — we do not hold a facility clearance (FCL) at present. We support classified programs via cleared subcontractors when the parts and drawings can be de-classified for manufacturing (e.g., a bracket drawing where the assembly is classified but the bracket itself is unclassified). We are pursuing FCL for future capacity; timeline shared under NDA.",
          },
          {
            q: "Do you support foreign military sales (FMS)?",
            a: "Yes, under State Department license or exemption. FMS programs typically flow through a US prime with the export license — we manufacture to your build package with matching flow-down. For direct FMS work involving license applications we can support the manufacturing sections and coordinate with your export compliance team.",
          },
        ],
      },
      {
        heading: "Materials and Capabilities",
        items: [
          {
            q: "What defense materials do you stock?",
            a: "Aluminum: 2024, 2219, 6061, 7050, 7075 in T-tempers per AMS-QQ. Steel: 4130, 4340, 300M, 15-5 PH, 17-4 PH, HP 9-4-30. Titanium: Grade 2, 5, 23 ELI per AMS 4901, 4911, 4928. Superalloys: Inconel 625, 718, Hastelloy X. Copper: C110, C122. Armor materials on request (typically customer-supplied). All materials with AMS specification and DFARS-compliant sourcing on request.",
          },
          {
            q: "Do you produce hardware for weapons systems?",
            a: "Yes — non-destructive and structural components for USML Category I (firearms), III (ammunition), IV (launch vehicles and missiles), VIII (aircraft), IX (military training), XI (military electronics), XII (fire control), and XIX (gas turbine engines). Reach out with a specific USML category and part type — we will confirm capability and route to a qualified shop.",
          },
          {
            q: "Can you build to MIL-STD drawings?",
            a: "Yes — MIL-STD drawings, MIL-SPEC materials, and MIL-DTL/MIL-PRF finishes are our defense default. Common: MIL-DTL-5541 (chem film), MIL-A-8625 (anodize), MIL-DTL-13924 (black oxide), MIL-STD-889 (dissimilar metal contact), MIL-STD-130 (marking). Latest revisions on file; older revisions honored on request with signoff.",
          },
          {
            q: "Do you support first-article and destructive testing?",
            a: "Yes. First-article inspection per AS9102 is standard. Destructive testing (tensile, hardness, metallography, chemistry) via ISO 17025 accredited labs. NDT via NADCAP-accredited partners (dye penetrant, radiographic, ultrasonic, eddy current, magnetic particle). All destructive-test samples are documented and retained per DOD retention requirements.",
          },
        ],
      },
    ],
  },
  {
    slug: "shipping-and-delivery",
    title: "Shipping and Delivery FAQ",
    description:
      "Domestic and international shipping, carriers, customs, and delivery guarantees.",
    intro:
      "3DBuildBot ships from multiple US shops via FedEx, UPS, and DHL with global coverage. This FAQ covers standard shipping options, international freight, and how we handle special situations.",
    groups: [
      {
        heading: "Standard Shipping",
        items: [
          {
            q: "Where do you ship from?",
            a: "Orders ship from the shop that produces them — typically Los Angeles, Austin, Chicago, Minneapolis, or Charlotte depending on process and capacity. Our routing algorithm picks the shop and shipping origin that minimizes total delivery time to your address. Multi-part orders may ship from multiple origins if that gets parts to you faster; we consolidate final invoicing.",
          },
          {
            q: "What carriers do you use?",
            a: "FedEx (primary), UPS, DHL Express (international), and USPS for small domestic shipments. LTL freight via SAIA, XPO, or Old Dominion for palletized orders. White-glove delivery via specialized carriers for large or sensitive equipment. We negotiate carrier rates at volume and pass through the actual carrier cost — no shipping markup on your invoice.",
          },
          {
            q: "How is shipping cost calculated?",
            a: "At quote time we estimate shipping based on the destination zip and estimated dimensional weight. Actual shipping is billed at cost from the carrier at pickup. For orders over $500 we typically eat the standard ground shipping cost as a courtesy. Expedited shipping (2-day, overnight) is billed at cost with our negotiated FedEx and UPS rates.",
          },
          {
            q: "Can you ship using my carrier account?",
            a: "Yes — provide your FedEx, UPS, or DHL account number and preferred service level in your account settings. We use your account for pickup and billing; you never see a shipping charge from us. Common for enterprise customers with negotiated carrier rates or specific compliance requirements (billing codes, GL accounts).",
          },
        ],
      },
      {
        heading: "International Shipping",
        items: [
          {
            q: "Do you ship internationally?",
            a: "Yes — we ship worldwide via FedEx International Priority, UPS Worldwide Express, and DHL Express. Standard delivery is 2–5 business days to most major cities. We handle export documentation (commercial invoice, packing list, EEI filing over $2,500), harmonized tariff classification, and country-of-origin declaration. Restricted destinations (per OFAC/BIS) are blocked at quote time.",
          },
          {
            q: "How are customs and duties handled?",
            a: "Default is DAP (Delivered at Place) — carrier collects duties and taxes from you at delivery. For a smoother experience we offer DDP (Delivered Duty Paid) at an added service fee — we prepay duties and consolidate on your invoice. For EU deliveries we can bill VAT via our EU IOSS registration on shipments under €150. Provide EORI, VAT number, and country-specific documents at quote time.",
          },
          {
            q: "Can you ship to Europe, Asia, and the Middle East?",
            a: "Yes — Europe (all EU + UK, Norway, Switzerland), Asia (Japan, South Korea, Taiwan, Singapore, Hong Kong, Australia, India), Middle East (UAE, Saudi Arabia, Israel with export license), and Latin America (Mexico, Brazil, Chile). Restricted: Russia, Iran, North Korea, Syria, Cuba, and regions under sanctions — orders auto-block. All ITAR-controlled parts require State Department export license before shipment.",
          },
          {
            q: "What documentation do you provide for international shipments?",
            a: "Standard: commercial invoice with harmonized tariff codes (HS/HTS), packing list, country-of-origin certificate (as applicable, USMCA/EUR.1/other trade agreement forms), and electronic export information (EEI) filing for shipments over $2,500. Additional documentation on request: ATR.1, GSP forms, ATA carnet for trade shows and demos, materials safety data sheets (MSDS) for controlled chemicals.",
          },
        ],
      },
      {
        heading: "Special Situations",
        items: [
          {
            q: "Can you drop-ship to my customer?",
            a: "Yes — enter your customer's address as the ship-to and yours as bill-to. We blank-ship (no 3DBuildBot branding on the box or paperwork) if you check the Blank Ship box. Optional white-label service: your logo on the packaging, your Certificate of Conformance letterhead, and your packing slip — set up in your account and applied automatically to all drop-shipments.",
          },
          {
            q: "Can you consolidate orders to reduce shipping?",
            a: "Yes. Multiple orders shipping to the same address within a 3-day window are auto-consolidated into one shipment when possible. For a specific consolidation request (e.g., wait for a specific order to complete before shipping), tag orders with the same consolidation code and we hold for shipment. You save shipping cost and get a single delivery.",
          },
          {
            q: "What about oversized or heavy parts?",
            a: "Parts over 150 lb, longer than 108 in, or exceeding standard parcel dimensions ship via LTL freight (palletized) or specialized carriers. We build custom crates or wood pallets as needed ($50–500 depending on size). Freight quotes take 24 hours and are billed at cost. For very large items (>1,000 lb) we may recommend rigger service or dedicated truckload with a scheduled delivery window.",
          },
          {
            q: "Do you offer white-glove delivery?",
            a: "Yes — for large or delicate equipment (medical devices, robotics, large enclosures) we coordinate white-glove delivery with inside placement, uncrating, and debris removal. Available in major US metros; international via partner carriers. Book at quote or up to 5 business days before shipment. Typical cost: $200–500 depending on distance and access.",
          },
        ],
      },
      {
        heading: "Tracking and Support",
        items: [
          {
            q: "How do I track my shipment?",
            a: "Every shipment gets a tracking number emailed at pickup with a direct link to the carrier's tracking page. Your dashboard also shows real-time tracking status. For enterprise accounts, tracking can be pushed to your ERP via API or automatically synced to your NetSuite/SAP receiving system. Delivery confirmations and photo proof-of-delivery are available for signature-required shipments.",
          },
          {
            q: "What happens if my package is damaged or lost?",
            a: "Report damage or loss within 5 business days of delivery attempt. We file the claim with the carrier and produce a replacement part immediately — you do not wait for the claim to resolve. Standard shipping includes carrier insurance up to $100; we add declared value insurance on orders over $500 automatically. Any shortage vs. packing slip is remade at no charge with expedited shipping.",
          },
          {
            q: "Can you deliver on a specific date?",
            a: "Yes — specify a required delivery date at PO. We schedule production and shipping to hit that date, sometimes holding parts in our warehouse for scheduled release. Common for factory launches, trade shows, and installation windows. For guaranteed delivery within a 2-hour window, book white-glove or dedicated courier service.",
          },
          {
            q: "How do I schedule a pickup at your facility?",
            a: "Local pickup is available at our Los Angeles and Austin facilities by appointment. Request pickup in the shipping settings; we notify you when parts are ready and confirm a pickup window. Bring a photo ID matching the account or a signed pickup authorization from your account admin. For ITAR orders, only US-persons on the approved-pickup list may collect parts.",
          },
        ],
      },
    ],
  },
  {
    slug: "quality-and-inspection",
    title: "Quality and Inspection FAQ",
    description:
      "FAI, CMM, Certificate of Conformance, Material Test Reports, and PPAP.",
    intro:
      "3DBuildBot's quality system covers everything from a simple Certificate of Conformance to full AS9102 First Article Inspection and PPAP Level 3 documentation. This FAQ explains what inspection artifacts you get and when to request each.",
    groups: [
      {
        heading: "Standard Inspection",
        items: [
          {
            q: "What inspection is included by default?",
            a: "Every part gets: (1) 100% visual inspection for cosmetic defects and burrs; (2) dimensional check of major features against the CAD model or drawing; (3) material verification from the MTR; and (4) a Certificate of Conformance stating the part meets drawing revision and material spec. Sampling per ANSI Z1.4 Level II with AQL 1.0 for larger production runs. All included at no adder.",
          },
          {
            q: "What is a Certificate of Conformance (CoC)?",
            a: "A CoC is a signed document from our QA team stating that the parts shipped meet the drawing revision, material specification, and any special process requirements called out on the drawing or PO. Standard CoC is issued electronically at shipment and available in your dashboard. Includes: part number, revision, material, quantity, lot/serial numbers, inspection method, and QA sign-off. AS9100 and ISO 13485 orders get the enhanced CoC template.",
          },
          {
            q: "What is a Material Test Report (MTR)?",
            a: "An MTR is the certificate from the material mill listing chemistry and mechanical properties for the specific heat lot of raw material used. Standard MTR includes carbon, alloying elements, tensile strength, yield strength, elongation, and hardness. DFARS-compliant MTRs specify country of melt and manufacture. MTRs are included free on all aerospace, defense, and medical orders; $25 per material on standard orders.",
          },
          {
            q: "Do you do 100% inspection or sampling?",
            a: "For prototypes and small production (qty < 25), we inspect 100%. For production runs, we default to AQL 1.0 sampling per ANSI Z1.4 Level II unless your drawing specifies 100% inspection or a different AQL. Aerospace, medical, and safety-critical parts are 100% inspected regardless of quantity. Specify your inspection level on the drawing or PO if you have a specific requirement.",
          },
        ],
      },
      {
        heading: "First Article Inspection",
        items: [
          {
            q: "What is a First Article Inspection (FAI)?",
            a: "An FAI is a comprehensive inspection of the first production part against every dimension and callout on the drawing. Per AS9102 Rev C: Form 1 (part accountability), Form 2 (product accountability, material and processes), Form 3 (dimensional characteristics with actual measured values). FAIs verify the manufacturing setup is correct before running the full lot. Standard on all aerospace orders; recommended on any complex or new part.",
          },
          {
            q: "How much does an FAI cost?",
            a: "AS9102 FAI: $150–450 depending on feature count. Includes ballooned drawing, form 1/2/3 population, actual measurements, and QA sign-off. Turnaround 1–2 business days after part completion. Included at no adder on aerospace, defense, and medical orders. For non-aerospace industries we offer a simplified FAI (dimensional report against the drawing) at $75–200.",
          },
          {
            q: "When is a Delta FAI needed?",
            a: "Delta FAIs are needed when there is a change to the part after the initial FAI: (1) drawing revision change, (2) material change, (3) process change (e.g., new heat treat vendor), (4) tooling change on a mold, (5) 2-year manufacturing gap. Delta FAI is quicker and cheaper than a full FAI — only affected features are re-inspected. Governed by AS9102 Section 5.4.",
          },
          {
            q: "Do you provide a ballooned drawing?",
            a: "Yes. If you supply a drawing PDF we balloon it (number every dimension and callout) as part of the FAI at no additional cost. If you have a ballooned drawing already, upload it and we use your ballooning. Ballooned drawings are archived in your account for delta FAIs and re-inspections.",
          },
        ],
      },
      {
        heading: "Advanced Inspection",
        items: [
          {
            q: "Do you offer CMM inspection?",
            a: "Yes — coordinate measuring machines (Zeiss, Mitutoyo, Hexagon) with 0.5 µm resolution are available at every AS9100-certified shop in our network. CMM reports document actual measurements against nominal, with pass/fail for each dimension. Cost is 5–15% of part cost for a full CMM report. Turnaround adds 1–2 business days. Recommended for tolerances below ±0.001 in or complex geometry with GD&T callouts.",
          },
          {
            q: "Do you scan or reverse-engineer parts?",
            a: "Yes — structured-light and blue-light 3D scanners (GOM ATOS, Artec Leo, Creaform HandySCAN) capture parts to point clouds at 5–50 µm accuracy. Common uses: reverse-engineering legacy parts (scan → CAD → new drawing → manufacture), first-article verification of complex surfaces, and inspection of freeform features. Scanning cost: $200–800 per part. CAD reconstruction from scan: $500–2500 depending on complexity.",
          },
          {
            q: "Can you do CT scanning for internal inspection?",
            a: "Yes, via partner labs. Industrial CT (Nikon MCT225, Zeiss Metrotom) reveals internal features, porosity, and inclusions in printed and cast parts. Common uses: DMLS porosity verification, weld quality inspection, potted assembly verification. Turnaround 3–7 business days plus lab time; cost $300–1500 per part depending on size and resolution. CT is standard on flight-critical DMLS parts.",
          },
          {
            q: "Do you perform non-destructive testing (NDT)?",
            a: "Yes, via NADCAP-accredited partners. Dye penetrant (FPI) per ASTM E1417 on non-ferrous parts — catches surface-breaking defects. Magnetic particle (MT) per ASTM E1444 on ferrous parts. Radiographic (RT) per ASTM E1742 — 2D X-ray for weld and casting defects. Ultrasonic (UT) per ASTM E317 — subsurface defects and thickness. Eddy current (ET) — surface defects on conductive parts. Add NDT in the quote wizard under Special Processes.",
          },
        ],
      },
      {
        heading: "Production Quality",
        items: [
          {
            q: "What is PPAP and do you offer it?",
            a: "Production Part Approval Process (PPAP) is an automotive quality standard (AIAG PPAP 4th edition) for validating that a supplier can produce parts consistently. Levels 1–5 differ by documentation depth; most customers require Level 3. We provide full PPAP Level 3 including design records, DFMEA, PFMEA, control plan, MSA, process capability studies (Cpk ≥ 1.33), IMDS submissions, and part-submission warrant. Available on production programs above 500 units/year.",
          },
          {
            q: "What is Statistical Process Control (SPC) and do you use it?",
            a: "SPC is real-time monitoring of critical dimensions using control charts (Xbar-R, individual-moving-range, p-charts). We apply SPC to production programs above 500 units/year, monitoring 3–8 critical dimensions per part. Control limits calculated from process capability data. Out-of-control conditions trigger an investigation and CAPA. SPC data is shared with customers in weekly quality reviews.",
          },
          {
            q: "How do you handle non-conforming product?",
            a: "Non-conforming parts are segregated (red-tag), documented in an NCR (Non-Conformance Report), and dispositioned: (1) rework to spec, (2) use-as-is with customer approval and MRB (Material Review Board) documentation, (3) scrap and remake. Customer is notified within 24 hours of any non-conformance that affects delivery or specification. Root cause analysis and CAPA follow standard AS9100 / ISO 13485 requirements.",
          },
          {
            q: "Can you support a customer audit?",
            a: "Yes — customer audits of our AS9100 and ISO 13485 QMS are supported with 10 business days notice. Typical audit lasts 1–2 days and covers QMS documentation, production floor walkthrough, records review, and process observation. We support both scheduled surveillance audits and unannounced audits for cause. Video audits via Teams or Zoom are also accepted for routine surveillance.",
          },
        ],
      },
    ],
  },
  {
    slug: "cad-file-formats",
    title: "CAD File Formats FAQ",
    description:
      "STEP, STL, IGES, SLDPRT, and other formats — what we accept and how to export.",
    intro:
      "3DBuildBot's quote engine accepts most common CAD formats. This FAQ covers which format to use for each process, how to export cleanly, and what to do when your file is not accepted.",
    groups: [
      {
        heading: "Accepted Formats",
        items: [
          {
            q: "What file formats do you accept?",
            a: "Native: SolidWorks (.SLDPRT, .SLDASM up to 2024), Autodesk Inventor (.IPT, .IAM), PTC Creo (.PRT, .ASM), Siemens NX (.PRT), CATIA (.CATPART, .CATPRODUCT V5 and V6). Neutral: STEP (AP203, AP214, AP242 — preferred), IGES, Parasolid (.X_T, .X_B), ACIS (.SAT). Mesh: STL, OBJ, 3MF, PLY. 2D drawings: PDF, DXF, DWG. Rhino (.3DM), Fusion 360 (.F3D), and Onshape links also accepted.",
          },
          {
            q: "What is the best format for CNC and sheet metal?",
            a: "STEP (AP214 or AP242) is the universal best choice — preserves parametric feature tree, tolerances, and PMI (Product Manufacturing Information) callouts on newer versions. Native format (SLDPRT, IPT) is second-best if we have that CAD system in-house. Avoid STL for CNC — it is a mesh approximation and requires reverse-engineering to smooth surfaces. Always upload a PDF drawing with STEP for tolerance-critical parts.",
          },
          {
            q: "What is the best format for 3D printing?",
            a: "STL is universal for 3D printing and is what our printers ultimately consume. STEP is preferred for parts requiring post-machining (we keep the parametric geometry for CNC ops). 3MF is a newer format that preserves color and material data — useful for MJF full-color prints and multi-material FDM. Keep triangle count under 5M for fast DFM turnaround; we can decimate high-poly files if needed.",
          },
          {
            q: "Can I upload an assembly?",
            a: "Yes — SLDASM, IAM, STEP assembly, CATProduct all supported. We break the assembly into individual parts, quote each, and price the sub-assembly labor if you want us to assemble. Alternately, upload individual STEP files if you have already broken the assembly out — that skips the extraction step. For assemblies with 100+ parts, contact us; we may recommend a BOM upload for faster quoting.",
          },
        ],
      },
      {
        heading: "Best Practices",
        items: [
          {
            q: "How should I export STEP from SolidWorks?",
            a: "File → Save As → STEP AP214 (.step). In options, check: Export sketch entities, Export 3D curve features, and select Solid/Surface geometry. Uncheck Split periodic faces (causes issues for some CAM systems). Untick Curve/wire tessellation. For assemblies, choose Export as: One file with all parts. Version-neutral (avoid vendor-specific extensions). Aim for STEP AP242 if your version supports it — it includes PMI.",
          },
          {
            q: "How should I export STL for 3D printing?",
            a: "Export as binary STL (smaller file) with high resolution: Deviation 0.01 mm, Angular deviation 5°. Larger deviation values create faceted surfaces that print with visible facets. If your STL is over 100 MB it is likely over-tessellated — reduce resolution and re-export. Watertight geometry is critical — run a mesh check (Fix Errors in SolidWorks or Netfabb) before uploading.",
          },
          {
            q: "Should I include drawings even if I upload a STEP file?",
            a: "Yes — always upload a PDF drawing for parts with any of the following: tolerances tighter than ±0.005 in, GD&T callouts, threads with specific fit class, surface finish callouts, critical inspection dimensions, or specific material specifications. STEP files may include PMI but our quote engine does not fully parse PMI yet — a PDF drawing removes ambiguity. Use the standard title block format for OCR of part number and revision.",
          },
          {
            q: "What units should I export in?",
            a: "Millimeters is our default. Inches is fully supported — our system auto-detects units from the STEP header or asks at upload if ambiguous. Mixing units within an assembly is discouraged (leads to scale errors). If you use inches, use decimal (0.250) not fractional (1/4) — fractional is prone to conversion errors. Sheet-metal DXF files should be in millimeters for the laser cutting workflow.",
          },
        ],
      },
      {
        heading: "Troubleshooting",
        items: [
          {
            q: "My file was rejected. What now?",
            a: "Common causes: (1) file corrupted during export (re-export and try again), (2) unsupported version (e.g., SolidWorks 2025 saved in 2026 format — save down or export STEP), (3) STL has non-manifold edges (repair in Netfabb, Meshmixer, or SolidWorks), (4) file too large (>500 MB — decimate mesh or simplify parametric model). If our system rejects your file, we email a specific error message and manual review turnaround is 4 hours.",
          },
          {
            q: "Can you fix a broken STL for me?",
            a: "Yes — mesh repair is included at no charge for small issues (holes, flipped normals, minor non-manifold edges). For heavily corrupted meshes requiring reconstruction we quote separately ($100–500 depending on complexity). If the underlying model is intact but the mesh export is bad, we recommend re-exporting from your CAD system rather than repairing the mesh.",
          },
          {
            q: "Do you accept 2D drawings only (no 3D model)?",
            a: "For sheet-metal parts, yes — DXF flat patterns are accepted with bend lines annotated. For turned parts, yes — a fully dimensioned PDF drawing works for simple lathe work. For anything else we require a 3D model. If you only have a legacy 2D drawing, we can create the 3D CAD from the drawing at $150–500 depending on complexity and share it back for approval before machining.",
          },
          {
            q: "How do I share files that are too large to upload?",
            a: "Files up to 500 MB upload directly. Larger files: use our secure link (share.3dbuildbot.com/upload) for up to 5 GB. For anything larger, we accept Dropbox, Google Drive, OneDrive, and WeTransfer links — paste in the notes field at quote time. For ITAR-controlled files, only our secure US-hosted portal is accepted (no third-party cloud services).",
          },
        ],
      },
      {
        heading: "Advanced Workflows",
        items: [
          {
            q: "Do you integrate with Onshape or Fusion 360?",
            a: "Yes — see the API and Integrations FAQ for full detail. Onshape: connect your workspace and share document links; we auto-pull the latest revision at quote time. Fusion 360: install our add-in to quote directly from the Fusion interface without exporting. Both integrations preserve revision history and update the quote when you push a design change.",
          },
          {
            q: "Do you support PMI (Product Manufacturing Information) in STEP?",
            a: "Yes, on STEP AP242. Our quote engine reads embedded tolerances, GD&T frames, and surface finish callouts and applies them to the DFM analysis. Not all CAD systems export PMI cleanly — verify by re-importing your STEP into a viewer (Autodesk Viewer, eDrawings, KISTERS 3DViewStation) and checking annotations are visible. For maximum clarity, still include a PDF drawing.",
          },
          {
            q: "Can I share revision-controlled files?",
            a: "Yes — every uploaded file gets a revision tag in your account. Upload a new revision and we track the delta, re-quote if needed, and archive prior revisions for reference. Enterprise accounts can integrate with PLM systems (Windchill, Teamcenter, Enovia) via API for auto-sync of released revisions to our production system.",
          },
          {
            q: "What if I only have a physical part, no CAD?",
            a: "We reverse-engineer. Ship us the physical part; we 3D scan (structured light, blue light, or CT depending on size and complexity), reconstruct the CAD model in SolidWorks or Fusion 360, and provide a STEP file and drawing for approval. Then we manufacture to the new CAD. Turnaround 5–10 business days. Cost $300–2000 depending on complexity; often free on production orders above 100 units.",
          },
        ],
      },
    ],
  },
  {
    slug: "account-and-billing",
    title: "Account and Billing FAQ",
    description:
      "Signup, payment methods, Net terms, purchase orders, invoicing, and taxes.",
    intro:
      "This FAQ covers account setup, payment options, and how billing works — from your first credit card order to enterprise Net-30 accounts with monthly invoicing.",
    groups: [
      {
        heading: "Account Setup",
        items: [
          {
            q: "How do I create an account?",
            a: "Sign up at 3dbuildbot.com/signup with email and password, or use Google, GitHub, or Apple SSO. Personal accounts activate immediately for credit card orders. Business accounts require a company name, address, and (for Net terms) tax ID and credit application. Team accounts support multiple users with role-based access — admin, buyer, engineer, and viewer roles.",
          },
          {
            q: "Can I have multiple users on one account?",
            a: "Yes — team accounts support unlimited users at no additional cost. Invite team members by email; each gets a personal login. Assign roles: Admin (full access, billing), Buyer (place orders), Engineer (upload CAD, review DFM), and Viewer (see orders and status). Approval workflows available for orders above a configurable threshold. SSO integration (Okta, Azure AD, Google Workspace) available on enterprise plans.",
          },
          {
            q: "How do I add a shipping or billing address?",
            a: "In the account dashboard under Addresses, click Add Address. Enter address, contact name, phone, and role (shipping, billing, or both). Multiple addresses supported for orgs with several offices or drop-ship customers. At checkout, choose from any saved address or add a new one. Address book syncs to your credit card and Net-30 records for tax reporting.",
          },
          {
            q: "Do I need a company to open an account?",
            a: "No — individual accounts are welcome (freelancers, hobbyists, makers, students). Individual accounts pay by credit card at PO. Enterprise features (Net terms, purchase orders, dedicated account manager) require a registered business. Students with an active .edu email get access to the education program — see the Student and Education FAQ.",
          },
        ],
      },
      {
        heading: "Payment Methods",
        items: [
          {
            q: "What payment methods do you accept?",
            a: "Credit card: Visa, MasterCard, American Express, Discover — no processing surcharge. ACH bank transfer — no fees, US accounts only. Wire transfer — customer covers bank fees (~$25–50). Net 30 terms — approved business accounts. Purchase order — approved business and government accounts. Cryptocurrency — BTC, ETH, USDC via BitPay for international customers. Apple Pay and Google Pay for individual accounts.",
          },
          {
            q: "How do I get Net 30 terms?",
            a: "Apply in your account dashboard under Payment Methods → Net Terms. Requires: US business entity, EIN, trade references (3), and D&B credit check. Approval typically 3–5 business days. Initial credit limit is set based on D&B score and trade history, typically $5K–50K starting. Limits are raised over time as you build a payment history with us. On-time payment reports contribute to your D&B score.",
          },
          {
            q: "Do you accept purchase orders?",
            a: "Yes. First-time PO customers submit a credit application; approved customers upload POs directly at checkout. PO number, buyer contact, and payment terms flow to your invoice. Government POs (GSA schedule, SEWP, GWACs) accepted — we are SAM.gov registered with active CAGE code. Standard payment terms on PO orders: Net 30 with 1% net 10 discount.",
          },
          {
            q: "Can I split payment across multiple methods?",
            a: "Yes — for large orders you can pay a deposit by wire and the balance by credit card or ACH. Common for tooling orders (50% down, 50% on first article). For enterprise programs with multiple cost centers, we support split invoicing with different POs and payment terms per invoice. Contact accounting@3dbuildbot.com to set up a multi-invoice workflow.",
          },
        ],
      },
      {
        heading: "Invoices and Taxes",
        items: [
          {
            q: "When do you invoice?",
            a: "Credit card orders: charged at PO, invoice emailed at shipment. Net-terms orders: invoiced at shipment, due Net 30 from invoice date. Tooling orders: 50% invoiced at design approval, 50% at first-article approval. Enterprise: monthly consolidated invoicing available on request — all orders in a month roll to one invoice, due Net 30 or Net 60 as agreed.",
          },
          {
            q: "How do I get a copy of my invoice?",
            a: "All invoices are available in your account dashboard under Billing → Invoices. Download as PDF, CSV, or push to your accounting system via API integration (QuickBooks, Xero, NetSuite, SAP). Invoices are emailed to the billing address on file when generated. Invoices include line items with part number, description, quantity, unit price, and any surcharges or discounts.",
          },
          {
            q: "How is sales tax handled?",
            a: "US sales tax is collected based on ship-to state and product classification. Tax-exempt customers upload a resale certificate or exemption certificate in the dashboard — we validate and exempt future orders. International shipments: no US sales tax; VAT/GST collected per destination country rules (see Shipping and Delivery FAQ for customs/duty handling). Automated tax calculation via TaxJar for accuracy.",
          },
          {
            q: "Can I get a W-9 or vendor setup documents?",
            a: "Yes — W-9 (US taxpayer identification), W-8BEN-E (foreign entity), Certificate of Insurance (COI), diversity certifications (small business, WOSB, VOSB, HUBZone as applicable), and ISO/AS certifications available on demand in the dashboard under Compliance Documents. New-vendor onboarding forms are completed and returned within 2 business days.",
          },
        ],
      },
      {
        heading: "Managing Orders",
        items: [
          {
            q: "How do I cancel or modify an order?",
            a: "Cancel or modify from the dashboard within 2 hours of PO at no charge. After 2 hours, cancellation may incur setup fees (up to 30% depending on how far into production we are). Design changes after production starts trigger a re-quote and a change fee. For urgent changes, call your account manager — we do our best to accommodate before machining starts.",
          },
          {
            q: "Can I re-order a previous part?",
            a: "Yes. In the dashboard under Order History, click Re-order next to any past order. All specs pre-fill: file, material, finish, quantity. Adjust quantity or delivery address as needed and check out. Re-orders skip DFM (unless the file has changed) and typically ship 1–2 days faster than the original. Volume discounts apply based on cumulative annual quantity.",
          },
          {
            q: "Can I get a refund if I am not satisfied?",
            a: "Yes — if parts do not meet the drawing spec, we remake at no charge or issue a full refund. Report issues within 30 days of delivery with photos and measurements. Non-conforming parts that shipped due to our error are also refunded shipping. Parts that meet spec but do not meet a design expectation (e.g., you underspec'd tolerance) are handled case-by-case — often a partial credit toward a re-order with corrected spec.",
          },
          {
            q: "How do I close my account?",
            a: "Email support@3dbuildbot.com with the closure request. All open orders complete normally; unpaid invoices settle per terms. Account data (order history, CAD files, drawings) is archived for 7 years for compliance and available on request. If you resume with us later, we restore the account to its prior state with all history intact.",
          },
        ],
      },
    ],
  },
  {
    slug: "api-and-integrations",
    title: "API and Integrations FAQ",
    description:
      "REST API, Onshape, Fusion 360, Slack notifications, and ERP integrations.",
    intro:
      "3DBuildBot's API and integrations let engineering and procurement teams quote, order, and track parts inside the tools they already use. This FAQ covers what is available, how to authenticate, and how to build production workflows.",
    groups: [
      {
        heading: "REST API",
        items: [
          {
            q: "Do you have a public API?",
            a: "Yes — REST API with JSON payloads, OAuth 2.0 authentication, and comprehensive endpoint coverage for quoting, ordering, tracking, and reporting. Docs at docs.3dbuildbot.com/api with interactive playground. Rate limits: 100 requests/minute per API key, 10K/day. Webhooks for order status changes push to any URL you configure — no polling needed.",
          },
          {
            q: "How do I get an API key?",
            a: "In the dashboard under Developer → API Keys, generate a new key with configurable scopes: read (quotes, orders), write (create orders), admin (manage users, billing). Keys are prefixed by environment — sk_test_ for sandbox, sk_live_ for production. Rotate keys anytime; retire old ones after a grace period. Store secrets in your secrets manager (Vault, AWS Secrets Manager, Doppler) — never in source code.",
          },
          {
            q: "Can I get a quote via the API?",
            a: "Yes — POST a STEP or STL file (multipart form or base64) to /v1/quotes with material, quantity, finish, and target lead time. Returns quote object with price, ship date, and DFM notes within 30 seconds for standard parts. Complex assemblies queue for engineer review — poll for status or use a webhook. Instant-quote endpoint works for CNC, sheet metal, and 3D printing across the full material library.",
          },
          {
            q: "How do I create an order via API?",
            a: "POST to /v1/orders with the quote ID, shipping address, PO reference, and payment method. Returns order confirmation with tracking URL. For enterprise customers, orders bill to your Net-30 account automatically. Sandbox environment (sandbox.3dbuildbot.com) lets you test the full ordering flow without incurring charges — sandbox orders are auto-cancelled after 24 hours.",
          },
        ],
      },
      {
        heading: "CAD Integrations",
        items: [
          {
            q: "Do you integrate with Onshape?",
            a: "Yes — connect your Onshape account to your 3DBuildBot dashboard under Integrations. Share document links directly at quote time; we pull the latest revision automatically. When you push a revision in Onshape, our system detects the change and re-quotes on request. Works for individual documents, versions, and workspaces. Multi-part assemblies are auto-broken into individual quotes.",
          },
          {
            q: "Do you have a Fusion 360 add-in?",
            a: "Yes — install from the Autodesk App Store (search 3DBuildBot). Quote directly from the Fusion 360 interface: right-click any body or component → Quote with 3DBuildBot. Material, quantity, and finish selected in a side panel; quote appears within 60 seconds without leaving Fusion. Approved quotes convert to orders with your saved payment method and shipping address.",
          },
          {
            q: "Do you integrate with SolidWorks?",
            a: "Yes — SolidWorks add-in on the SOLIDWORKS Partner Portal. Right-click any part → Quote with 3DBuildBot. Add-in reads the part configuration, tolerance callouts, and drawing sheets, and pre-fills the quote form. Works with SolidWorks 2019 and later. Similar add-ins in development for Inventor and Creo — contact us for early access.",
          },
          {
            q: "Can I integrate with my PLM system?",
            a: "Yes — direct integrations with Autodesk Vault, PTC Windchill, Siemens Teamcenter, and Dassault Enovia via our PLM connector (enterprise plans). Released revisions push automatically to your 3DBuildBot workspace; order status flows back to PLM for change management traceability. For unlisted PLM systems, our API provides all endpoints needed for custom integrations.",
          },
        ],
      },
      {
        heading: "Notification and Chat",
        items: [
          {
            q: "Do you push notifications to Slack?",
            a: "Yes — install the 3DBuildBot Slack app to receive order notifications in a channel of your choice. Configure event triggers: order placed, DFM ready, order shipped, delivery confirmed, quality issue. Direct-message individual users for orders they own. Interactive buttons let engineers approve DFM or accept quotes directly from Slack without leaving the app.",
          },
          {
            q: "Can I get email or webhook notifications?",
            a: "Yes — configure email preferences per user (all events, milestones only, digest, or off). Webhooks push JSON events to any URL you configure with retry logic (exponential backoff, up to 24 hours). Common webhook use cases: sync order status to your ERP, alert on QC events, or trigger downstream production planning workflows.",
          },
          {
            q: "Do you integrate with Microsoft Teams?",
            a: "Yes — Teams app available in the Microsoft AppSource. Same event configuration as Slack: order notifications in a specified channel or direct message. Adaptive Cards let engineers view quote details and DFM notes inline. SSO with Azure AD for automatic user provisioning on enterprise plans.",
          },
          {
            q: "Can I subscribe to production status updates?",
            a: "Yes — every order has a real-time status feed accessible via API, webhook, or the dashboard. Statuses include: quoted → PO received → CAD reviewed → in production → in QC → shipped. Enterprise customers get a live dashboard link they can embed in internal Confluence or Notion pages for stakeholders to watch progress without a 3DBuildBot login.",
          },
        ],
      },
      {
        heading: "ERP and Procurement",
        items: [
          {
            q: "Do you integrate with QuickBooks?",
            a: "Yes — QuickBooks Online and Desktop integration syncs invoices, payments, and vendor records automatically. Configure sync frequency (real-time, hourly, daily). Chart-of-accounts mapping lets you route different product categories to different GL accounts. Available on all plans.",
          },
          {
            q: "Do you integrate with NetSuite, SAP, or Oracle?",
            a: "Yes — enterprise ERP integrations for NetSuite (SuiteCloud connector), SAP S/4HANA (BAPI/OData connector), Oracle Fusion Cloud (REST connector). Standard syncs: purchase orders, order acknowledgements, ASNs, invoices, and receipts. Custom fields and workflows supported. Implementation typically 2–4 weeks with our integration team.",
          },
          {
            q: "Do you support Coupa, Ariba, or Jaggaer?",
            a: "Yes — punchout catalogs configured for Coupa, SAP Ariba, Jaggaer, GEP SMART, and Ivalua. Buyers punch out from their procurement portal to a hosted 3DBuildBot storefront, quote, and return the cart as a requisition. PO acknowledgements, ASNs, and cXML invoices flow back automatically. Contact enterprise-sales@3dbuildbot.com to configure your punchout site.",
          },
          {
            q: "Can you support EDI transactions?",
            a: "Yes — EDI 850 (PO), 855 (PO acknowledgement), 856 (ASN), 810 (invoice), 820 (payment remittance) supported via VAN or AS2. X12 and EDIFACT. Common with automotive and aerospace tier-1 buyers. Implementation 4–6 weeks including testing with your VAN.",
          },
        ],
      },
    ],
  },
  {
    slug: "student-and-education",
    title: "Student and Education FAQ",
    description:
      ".edu discount, FIRST Robotics, PLTW, capstone projects, and educational discounts.",
    intro:
      "3DBuildBot supports students, educators, and youth engineering programs with discounts, curriculum support, and rapid turnaround for capstone and competition timelines. This FAQ walks through the education program.",
    groups: [
      {
        heading: "Student Discount",
        items: [
          {
            q: "How do I get the student discount?",
            a: "Sign up with your .edu email. Once verified, a 20% education discount applies automatically to all CNC, sheet metal, and 3D printing orders under $2500 per month. Higher-value orders qualify for standard volume discounts stacked with a 15% student discount. Discount does not apply to injection molding tooling or expedite fees. Verify annually by re-confirming enrollment status.",
          },
          {
            q: "Do I need to prove I am a student?",
            a: "A valid .edu email is sufficient in most cases. For students at institutions without .edu addresses (many international universities, art schools, trade schools), email students@3dbuildbot.com with your student ID and enrollment verification — we manually add you within 2 business days.",
          },
          {
            q: "Are graduate students and postdocs eligible?",
            a: "Yes — undergraduate, graduate (MS, MEng, PhD), and postdoctoral researchers all qualify with a valid institutional email. Faculty and staff at educational institutions get a 10% discount (educator discount). If you are unsure of your eligibility, email us and we will sort it out.",
          },
          {
            q: "Can my whole lab or class share the discount?",
            a: "Yes — set up a team account with your PI or instructor as admin, and invite student members with their .edu emails. Each student's discount applies to their orders; lab-wide budgets and approval workflows keep spending under control. Ideal for design studios, capstone teams, and research labs. Consolidated monthly invoicing available for research accounts.",
          },
        ],
      },
      {
        heading: "Competitions and Teams",
        items: [
          {
            q: "Do you support FIRST Robotics teams?",
            a: "Yes — FRC, FTC, and FLL teams get a 25% competition discount, priority scheduling during build season (January-February for FRC), and free DFM engineering support. Register your team at 3dbuildbot.com/first with your team number and coach contact. We ship in-season orders within 3 business days when possible to keep your build on schedule.",
          },
          {
            q: "Do you support VEX Robotics?",
            a: "Yes — VEX EDR and VEX U teams get a 25% competition discount, similar to FIRST teams. Custom aluminum brackets, gearbox plates, and structural components are our most-requested items. We often nest multiple VEX team orders on shared sheet-metal runs to lower cost further. Contact vex@3dbuildbot.com to register.",
          },
          {
            q: "What about PLTW, SAE Baja, Formula SAE, and other university programs?",
            a: "PLTW (Project Lead The Way) high school engineering programs get a 20% education discount. Collegiate engineering competitions (Formula SAE, Baja SAE, HPVC, ASME Human-Powered Vehicle, AIAA Design/Build/Fly, NASA Robotic Mining, and similar) get a 15% competition discount and free DFM review. Register your team and provide competition dates so we can pre-schedule capacity.",
          },
          {
            q: "Do you sponsor teams?",
            a: "Yes — a limited number of sponsorships per year for high-impact teams (FRC world championship contenders, Formula SAE top-30 programs, first-time teams in underserved regions). Sponsorships range from parts credit to full team support. Apply at 3dbuildbot.com/sponsorships with your team's story, budget, and impact metrics. Deadline is October 31 for the following season.",
          },
        ],
      },
      {
        heading: "Curriculum and Learning",
        items: [
          {
            q: "Do you have educational resources?",
            a: "Yes — free curriculum modules at learn.3dbuildbot.com covering DFM (design for manufacturing) for CNC, sheet metal, and 3D printing. Videos, downloadable PDFs, and interactive quizzes. Aligned to NGSS, PLTW, and ITEEA standards. Instructor guides with sample assignments and rubrics available for verified educators. Modules used in 500+ high schools and universities.",
          },
          {
            q: "Can educators get sample parts for classroom use?",
            a: "Yes — instructors can request a free sample kit (5–10 parts showing different processes and materials) once per academic year. Kit includes CNC aluminum, sheet metal, FDM, SLA, MJF, and SLS parts, plus a matching curriculum guide comparing processes. Request at educators@3dbuildbot.com with your school and course details.",
          },
          {
            q: "Do you offer virtual factory tours?",
            a: "Yes — virtual tours via Zoom for classes of 5–100 students, led by a 3DBuildBot engineer. Live walkthrough of CNC, 3D printing, sheet metal, and inspection floors. Q&A with production engineers. Book 2 weeks in advance at tours@3dbuildbot.com. Free for K-12 and university classes. Physical tours available at our Los Angeles and Austin facilities.",
          },
          {
            q: "Can I do a research project or thesis with your data?",
            a: "Yes — we support academic research on additive manufacturing, DFM, supply chain, and manufacturing economics. Aggregate anonymized order data (process usage, material trends, lead-time distributions) available under a research agreement. Research partnerships have generated peer-reviewed publications in RPJ, AM, and JOM. Contact research@3dbuildbot.com to propose a collaboration.",
          },
        ],
      },
      {
        heading: "Capstone and Senior Design",
        items: [
          {
            q: "How do you support capstone projects?",
            a: "Senior design teams get the 15% student discount, priority DFM turnaround (2 business hours), and access to a dedicated engineering advisor for the semester. We support common capstone timelines with milestone-based ordering: prototype (week 6), engineering test (week 10), and final demo (week 14). Documentation package included: bill of materials, drawings, and inspection reports for your final report.",
          },
          {
            q: "Can you help with a design review for our capstone?",
            a: "Yes — free design review with a manufacturing engineer for capstone teams. 30-minute Zoom call to walk through your CAD, discuss material and process selection, and flag DFM issues before you commit to fabrication. Book at capstone@3dbuildbot.com at least 5 business days before your target order date.",
          },
          {
            q: "What lead time should I plan for a senior design project?",
            a: "For a semester project, plan 6 weeks lead time on custom parts: 1 week to finalize CAD, 1 week for DFM back-and-forth, 3 weeks for production and shipping (allowing for revisions), and 1 week buffer. For capstone teams targeting a design competition or industry showcase, we recommend hitting the DFM milestone by week 8 of a 16-week semester to leave time for iteration.",
          },
          {
            q: "Do you keep student CAD confidential?",
            a: "Yes — student and academic CAD is treated with the same confidentiality as commercial customer CAD. Standard mutual NDA on request; we do not share, publish, or use your designs. For patent-pending work or thesis research, request our Enhanced Confidentiality Agreement which extends the standard NDA to include restrictions on our own team members reviewing your files for training purposes.",
          },
        ],
      },
    ],
  },
  {
    slug: "partner-and-shop-network",
    title: "Partner and Shop Network FAQ",
    description:
      "For machine shops and fabricators considering joining the 3DBuildBot network.",
    intro:
      "3DBuildBot operates a vetted network of manufacturing partners across the US. This FAQ answers the questions we hear from job shops evaluating a partnership.",
    groups: [
      {
        heading: "Getting Started",
        items: [
          {
            q: "How do I join the 3DBuildBot partner network?",
            a: "Apply at 3dbuildbot.com/partners with your shop profile: capabilities (processes, machines, materials, capacity), certifications (ISO 9001, AS9100, ISO 13485, ITAR, NADCAP), location, and current utilization. Applications are reviewed within 5 business days. Approved partners complete a 4-week onboarding: quality audit, sample-part qualification, IT integration, and pricing calibration. Live orders begin after onboarding.",
          },
          {
            q: "What kind of shops do you partner with?",
            a: "We partner with US-based machine shops (3-axis, 5-axis, Swiss, turning), sheet-metal fabricators, additive service bureaus (FDM, SLA, SLS, MJF, DMLS), injection molders, and specialty finishers (anodize, plating, powder coat). Shop size typically 5–100 employees; we work with sole proprietors on specific specialty work. ISO 9001 minimum; AS9100 and ISO 13485 preferred for aerospace and medical work.",
          },
          {
            q: "What are the financial terms?",
            a: "Partners are paid Net 15 from job completion — the fastest terms in the industry. No factoring, no waiting on end-customer payments. Payment via ACH direct deposit. Weekly payment cycles; large jobs paid within 15 days of completion regardless of end-customer payment status. We absorb customer credit risk so you can focus on making parts.",
          },
          {
            q: "How much volume can I expect?",
            a: "Volume depends on your capabilities, capacity, and quality performance. New partners typically start at $10K–50K/month in the first quarter as we validate quality and turnaround. Established partners run $50K–500K/month depending on capacity. Top partners with unique capabilities (5-axis, exotic materials, specialty finishes) can exceed $1M/month. We do not require an exclusive relationship.",
          },
        ],
      },
      {
        heading: "How the Platform Works",
        items: [
          {
            q: "How are jobs routed to me?",
            a: "Our routing algorithm matches every job to the best-fit partner based on capability, capacity, location (for logistics), quality score, and current utilization. Jobs appear in your partner portal with all details (CAD, drawing, quantity, ship date, price). You accept or decline within 4 business hours. Accepted jobs are yours to complete; declined jobs re-route to the next-best partner.",
          },
          {
            q: "Do I set my own prices?",
            a: "Yes and no. We publish target prices based on market data and our quote engine. You can accept the target, counter with a higher price (which reduces your win rate), or offer a discount for capacity backfill. Over time our system learns your pricing preferences and offers jobs at prices you tend to accept. Top-performing partners set their own pricing floors and we route above the floor.",
          },
          {
            q: "Who owns the customer relationship?",
            a: "3DBuildBot owns the end-customer relationship. You do not communicate directly with the end customer except through us (unless a specific technical clarification is needed and we introduce you). This lets you focus on production while we handle sales, quoting, DFM, and customer service. If a customer wants to work with you directly outside our platform, we do not restrict that — we just do not fund it.",
          },
          {
            q: "What quality standards do you require?",
            a: "Minimum ISO 9001. On-time delivery target: 95%+. First-pass yield target: 98%+. Customer satisfaction (post-order survey): 4.5/5+ average. We track these metrics quarterly and share performance dashboards with you. Consistent underperformance triggers a corrective action plan; sustained failure results in offboarding. Top-performing partners get preferred routing, higher margins, and marketing exposure.",
          },
        ],
      },
      {
        heading: "Operations",
        items: [
          {
            q: "How do I receive job files and drawings?",
            a: "Through your partner portal — accessible via web and mobile app. Job cards include: CAD (STEP, STL, native), drawing PDF with ballooned dimensions, DFM notes from our engineering team, material spec, finish spec, inspection requirements, ship date, and price. You can also integrate our API with your ERP (Global Shop, JobBOSS, ProShop, Fulcrum) for automatic job import.",
          },
          {
            q: "How do I ship completed jobs?",
            a: "Ship direct to the end customer with our pre-paid FedEx or UPS shipping label (generated in your partner portal). Include our Certificate of Conformance and any required inspection documents. Ship notification triggers automatic payment scheduling per Net 15 terms. Blank shipping (no partner branding) is standard; end customers see 3DBuildBot as the supplier.",
          },
          {
            q: "What happens if I miss a delivery date?",
            a: "Late delivery is our biggest concern. First late job: coaching call. Repeated lateness: routing volume reduced until performance recovers. If you know a job will be late, notify us as early as possible via the portal — we can often re-route to a partner shop, expedite finishing, or negotiate with the customer. Proactive communication is strongly rewarded; surprise lateness is not.",
          },
          {
            q: "What if I produce a non-conforming part?",
            a: "Report it in the portal; we determine disposition (rework, remake, use-as-is with customer approval). Remakes are on your dime if the non-conformance is due to shop error (mis-programmed, wrong material, missed dimension). Non-conformance due to unclear drawings or DFM oversights is on us. First-time honest mistakes are handled coaching-style; recurring quality issues trigger a formal corrective action plan.",
          },
        ],
      },
      {
        heading: "Growing Your Business",
        items: [
          {
            q: "Can I use 3DBuildBot to fill spare capacity?",
            a: "Yes — many partners use us for capacity smoothing: accept jobs when you have open machine time, decline when you are full. Our system respects your availability signals (weekly capacity setting) and prioritizes jobs during your peak availability. Ideal for shops with variable-demand direct customers who want to keep machines humming during slow weeks.",
          },
          {
            q: "Can 3DBuildBot help me get certified?",
            a: "Yes — partner development includes support to achieve ISO 9001, AS9100, and ISO 13485. We share consultant recommendations, sample documentation, and provide the routing volume commitment that justifies the certification investment. Some partners have gone from ISO 9001 to full AS9100 in 6 months with our support and access to aerospace work.",
          },
          {
            q: "Do you provide marketing exposure for partners?",
            a: "Top-performing partners are featured in our customer-facing materials: partner spotlights, blog posts, case studies, and referrals. High-quality partners with unique capabilities get referrals for direct work outside our platform (customer wants to visit your shop, or wants a long-term supply agreement) — that direct work is fully your revenue with no fees to us.",
          },
          {
            q: "What if I want to leave the network?",
            a: "You can exit at any time with 30 days notice; we complete all in-flight jobs and stop routing new work. No exit fees, no non-competes. Your customer relationships, IP, and business remain 100% yours. We stay on good terms and encourage rejoining if your capacity or business needs change — many partners cycle in and out based on their direct-customer workload.",
          },
        ],
      },
    ],
  },
  {
    slug: "iso-9001-quality-management",
    title: "ISO 9001 Quality Management FAQ",
    description:
      "QMS structure, corrective actions, audits, and continuous improvement.",
    intro:
      "3DBuildBot operates under an ISO 9001:2015 certified Quality Management System. This FAQ explains what our QMS covers, how it protects your orders, and how we drive continuous improvement.",
    groups: [
      {
        heading: "Certification",
        items: [
          {
            q: "Are you ISO 9001 certified?",
            a: "Yes — 3DBuildBot is ISO 9001:2015 certified by BSI. Certificate available in the dashboard under Certifications. Annually surveilled; recertified every 3 years. Scope covers all core services: quoting, DFM, production coordination, quality inspection, and customer service. Our AS9100 and ISO 13485 certifications extend the ISO 9001 base for aerospace and medical work respectively.",
          },
          {
            q: "How does your QMS protect my orders?",
            a: "Documented procedures for every step: quote → DFM → PO → production → inspection → shipment → customer feedback. Every order has a traceable record with material lot, machine, operator, inspection results, and ship documentation. Non-conformances trigger a corrective action process. Customer feedback drives quarterly management review. This means fewer defects, faster resolution when issues do arise, and steady process improvement.",
          },
          {
            q: "Are all your partner shops ISO 9001 certified?",
            a: "Yes — ISO 9001 (or better) is a minimum requirement for all partner shops in our network. Many hold AS9100, ISO 13485, or NADCAP as well. We audit every partner annually to verify their QMS is active and effective, not just paper-certified. Partners falling out of certification are removed from the network until they recertify.",
          },
          {
            q: "Can I see your quality policy?",
            a: "Yes — our quality policy is publicly published at 3dbuildbot.com/quality along with our quality manual (redacted to remove internal-only procedures). Full QMS documentation is shared with customers under NDA during vendor qualification. Auditable at your request per ISO 9001 Section 8.4 (external provider control).",
          },
        ],
      },
      {
        heading: "Quality Processes",
        items: [
          {
            q: "How do you handle customer complaints?",
            a: "Every complaint gets a case number and dedicated case owner within 4 business hours. Response time target: initial acknowledgement within 4 hours, root cause analysis within 5 business days, corrective action within 10 business days for critical issues. Complaints tracked in our QMS with metrics on response time, resolution time, and effectiveness. Customer signoff required to close a case.",
          },
          {
            q: "What is your process for corrective actions (CAPA)?",
            a: "Non-conformances (internal or customer complaints) trigger a formal CAPA: (1) contain the immediate issue (segregate parts, stop production), (2) root cause analysis (5-whys, fishbone, or DOE), (3) corrective action (fix this instance), (4) preventive action (systemic change to prevent recurrence), (5) effectiveness verification (monitor for 30–90 days). CAPA reports shared with affected customers.",
          },
          {
            q: "How do you drive continuous improvement?",
            a: "Quarterly management review of quality metrics (on-time delivery, first-pass yield, customer complaints, audit findings). KPIs published internally and to enterprise customers. Kaizen events target the top 3 improvement opportunities each quarter. Employee suggestion program active — 40+ improvement ideas per quarter, top ideas funded and implemented. Annual customer satisfaction survey drives strategic priorities.",
          },
          {
            q: "What is your first-pass yield?",
            a: "Network-wide first-pass yield is 98.7% for the trailing 12 months (parts that pass inspection on first attempt). By process: CNC 99.1%, sheet metal 98.3%, FDM/SLA 99.4%, SLS/MJF 97.8%, DMLS 96.5%. Yield varies by complexity and specifically low on parts with tolerances below ±0.001 in. Yield metrics shared quarterly with enterprise customers and posted in the partner portal.",
          },
        ],
      },
      {
        heading: "Audits and Inspections",
        items: [
          {
            q: "Can I audit your QMS?",
            a: "Yes — customer audits welcome with 10 business days notice. Typical audit: 1–2 days on-site or virtual, covering QMS documentation, production floor walkthrough, records review, and process observation. Video audits via Teams or Zoom are common for routine surveillance. Audit findings tracked in our CAPA system with root cause analysis and corrective action shared within 30 days.",
          },
          {
            q: "How often is your QMS audited?",
            a: "External: annual surveillance audit by BSI. Internal: quarterly internal audits by our trained ISO 9001 lead auditors, covering all QMS elements over a 12-month cycle. Partner audits: annual for all network shops. Customer audits: as requested (typically 20–30 per year across our customer base). Findings from all audits feed our continuous improvement pipeline.",
          },
          {
            q: "What documentation do you retain?",
            a: "Per ISO 9001, we retain: quality records for 7 years, contract records for 7 years, calibration records for 5 years, training records for the life of employment plus 3 years, and CAPA records for 5 years. Aerospace records: 10 years minimum per AS9100. Medical records: 15 years minimum per ISO 13485 and FDA 21 CFR 820.180. Records stored electronically with audit trail.",
          },
          {
            q: "Do you calibrate your inspection equipment?",
            a: "Yes — all inspection equipment (CMMs, calipers, micrometers, gauges, hardness testers, surface finish profilometers) is calibrated on a documented schedule per ISO 10012 and traceable to NIST. Calibration certificates on file for every measurement instrument, with due-date tracking and out-of-service tagging for anything past due. Available for review during customer audits.",
          },
        ],
      },
      {
        heading: "Documentation and Training",
        items: [
          {
            q: "How are employees trained on the QMS?",
            a: "All employees complete new-hire QMS orientation within 30 days of start. Role-specific training on procedures they will use. Annual refresher training on QMS updates, corrective action lessons learned, and ISO 9001 requirements. Training records maintained in our LMS with expiration tracking and re-training reminders. Effectiveness verified via post-training assessment and periodic competency checks.",
          },
          {
            q: "What documented procedures do you have?",
            a: "Level 1: Quality Manual (policy). Level 2: Standard Operating Procedures (SOPs) for each major process — quoting, DFM, production coordination, inspection, shipping, complaints, CAPA, management review. Level 3: Work instructions (specific tasks). Level 4: Forms and records. Full document control per ISO 9001 with review cycle, approval workflow, and revision history.",
          },
          {
            q: "How do you handle change control?",
            a: "Product and process changes go through a documented change control process: change request → impact assessment → approval by QA and affected department heads → implementation plan → verification of effectiveness → close out. Changes affecting customer orders (material substitution, process substitution, etc.) require customer notification and approval before implementation.",
          },
          {
            q: "Can I get copies of your certificates?",
            a: "Yes — ISO 9001, AS9100, ISO 13485, ITAR registration statement (redacted), SAM.gov CAGE code registration, Certificate of Insurance (COI), and diversity certifications available in the dashboard under Compliance Documents. Any customer-specific documentation (Quality Agreement, NDA, SOC 2 report) available on request via your account manager.",
          },
        ],
      },
    ],
  },
];
