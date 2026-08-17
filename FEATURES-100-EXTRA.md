# 100 Novel Features Nobody Else Has (SEO-Focused)
_Draft, 2026-08-16 · brainstormed to complement FEATURES.md_

Every feature below is designed to (1) not exist at any competitor, (2) naturally generate indexable pages / freshness signals, and (3) be buildable with Gemini + Next.js.

## 1. AI-Powered Interactive Tools

1. **STL Whisperer** — Upload any STL and Gemini narrates print-readiness in plain English with a shareable diagnostic URL. _SEO: every upload creates `/analysis/[hash]` indexed with the model's fingerprint keywords._ [AI-tool + UGC]
2. **Photo-to-Print** — Snap a broken part, Gemini Vision proposes replacement geometry + material + process. _SEO: `/fix/[category]/[hash]` pages rank for "replace broken [thing]"._ [AI-tool]
3. **Napkin Sketch to CAD** — Draw on paper, upload, get parametric STEP back. _SEO: `/sketches/` becomes a Pinterest-style discovery hub._ [AI-tool + UGC]
4. **Patent-to-Prototype** — Paste a USPTO patent number, Gemini extracts figures and quotes a printable prototype. _SEO: `/patents/[patent-number]` catches every patent search._ [AI-tool + Content-engine]
5. **BOM Explainer** — Drop a BOM CSV, Gemini flags which lines are cheaper to 3D print vs source. _SEO: `/bom-review/[hash]` captures "should I 3D print [part]"._ [AI-tool + Calculator]
6. **RFQ Autopilot** — Forward supplier emails to a magic address, Gemini drafts counter-quotes with margin analysis. _SEO: anonymized case pages at `/rfq-battles/`._ [AI-tool + B2B]
7. **Design-Intent Reverser** — Upload a mesh, Gemini describes probable function, load paths, and failure modes. _SEO: `/reverse-engineer/[hash]` populated with descriptive text._ [AI-tool + Education]
8. **Materials Chat** — Conversational Gemini agent on our full materials datasheets. _SEO: every 20th convo becomes a canonical Q&A page at `/ask/[slug]`._ [AI-tool + Content-engine]
9. **Tolerance Translator** — Paste customer tolerance callouts, get equivalent achievable specs across our processes. _SEO: `/tolerance/[spec]/fdm-vs-sls`._ [AI-tool + Vertical-tool]
10. **Print-or-Machine Advisor** — Upload part + volume + deadline → Gemini recommends process with cost/time tradeoff. _SEO: `/decisions/[hash]` shareable pages engineering managers link internally._ [AI-tool + Calculator]

## 2. Engineering Calculators & Simulators

11. **Infill Cost Curve Explorer** — Slide infill % 0–100; cost/strength/weight update live. _SEO: `/calc/infill/[material]-[pct]` → 500+ combos._ [Calculator + Data-viz]
12. **Warpage Predictor** — Bed size + material + geometry aspect ratio → warpage risk heatmap. _SEO: `/warpage/[material]/[size]`._ [Calculator]
13. **GD&T Stack Monte Carlo** — Chain tolerances, get Cpk distribution with 10k-iter URL state. _SEO: `/stack-sim/[hash]` UGC pages._ [Calculator + UGC]
14. **Break-Even vs Injection Mold** — Enter volume ramp; compare 3DP total cost vs tooling amortization. _SEO: `/mold-vs-print/[qty]/[material]`._ [Calculator]
15. **Layer Time Estimator** — Any STL + printer profile → second-by-second time breakdown. _SEO: `/print-time/[printer]/[hash]`._ [Calculator]
16. **Support Volume Optimizer** — Rotate part in 3D; watch support material + cost drop. _SEO: shareable `/support-opt/[hash]`._ [Calculator + Data-viz]
17. **Post-Processing Cost Compiler** — Stack tumbling, dyeing, machining, inserts → itemized quote. _SEO: `/post/[chain]/[material]`._ [Calculator]
18. **Vibration/Modal Predictor** — Geometry + mount points → first-3 natural frequencies. _SEO: `/modal/[hash]` catches drone-arm-resonance style queries._ [Calculator]
19. **Thermal Deflection Sim** — Load bracket + temp gradient → deflection color map. _SEO: `/thermal/[hash]` snapshots._ [Calculator + Data-viz]
20. **Packing Density Calculator** — SLS build-tray optimization: parts + qty → nested tray + per-part cost. _SEO: `/nesting/[hash]` "how to lower SLS cost" pages._ [Calculator]

## 3. Live-Data Widgets

21. **Aluminum Spot → Bracket Cost** — Live LME feed powers a canonical `/markets/aluminum-parts` daily-recrawled page. _SEO: freshness signal + "aluminum machining cost today"._ [Live-data]
22. **Titanium Ti-6Al-4V Watch** — Same for Ti with defense-industry angle at `/markets/titanium-aerospace`. _SEO: high-CPC defense procurement traffic._ [Live-data]
23. **Resin Price Index** — Aggregate 20 photopolymer prices weekly at `/markets/sla-resin-index`. _SEO: citation source competitors + journalists link to._ [Live-data + Content-engine]
24. **Lead-Time Leaderboard** — Live median lead time per material/process at `/lead-times`. _SEO: `/lead-times/pa12-sls` refresh daily for freshness._ [Live-data]
25. **Capacity Heatmap** — Public "how busy is 3DBuildBot" dashboard by process, updated every 15 min. _SEO: `/capacity/fdm`._ [Live-data + Data-viz]
26. **Tariff Tracker** — Live US import tariffs on CNC/print materials, keyed to HTS codes. _SEO: `/tariffs/[hts-code]` rides policy-news spikes._ [Live-data + B2B]
27. **Reshoring Index** — Monthly metric comparing our US quotes vs published overseas benchmarks. _SEO: `/reshoring-index/[YYYY-MM]` recurring press-release citation._ [Live-data + Content-engine]
28. **Weather-Impact Shipping Widget** — Current shipping delays by US region with map overlay. _SEO: refreshes during storms, catching urgent-procurement queries._ [Live-data]
29. **AM Machine-Hour Auction** — Live spot-market view of available print hours priced dynamically. _SEO: `/spot/[process]` novelty backlinks._ [Live-data]
30. **Defense-Contract Materials Watch** — Scrape DoD announcements; flag trending alloys/parts. _SEO: `/defense-trends/[YYYY-Wxx]` weekly indexed._ [Live-data + Vertical-tool]

## 4. Educational Depth

31. **Interactive DFM Puzzles** — Fix a badly-designed part in-browser; unlock harder challenges. _SEO: 200+ `/puzzles/[slug]` rank for "dfm example [feature]"._ [Education + UGC]
32. **Print-Fail Autopsy Library** — Photos + AI-diagnosed root cause for common failures. _SEO: `/fails/[symptom]` owns "why did my print [fail]"._ [Education + Content-engine]
33. **Materials Family Tree** — D3 viz of polymers/metals with click-through pairwise comparisons. _SEO: `/materials/tree` + hundreds of `/vs/[a]-vs-[b]`._ [Education + Data-viz]
34. **Slicer Setting Explainer** — Every Cura/PrusaSlicer setting → visual before/after page. _SEO: 300+ `/slicer/[setting]`._ [Education + Content-engine]
35. **Print-Along Video Companion** — YouTube tutorials with synced timeline + our part-order button. _SEO: `/watch/[video-id]` bounce traffic._ [Education]
36. **Glossary-Plus** — 500-term glossary where each term links to a real print sample you can order. _SEO: `/glossary/[term]` beats Wikipedia by adding buyable examples._ [Education + Content-engine]
37. **Additive Physics Sandbox** — WebGL toy sim showing laser sintering, adjustable parameters. _SEO: `/physics/sls-sim` shared by educators._ [Education + Data-viz]
38. **Certification Prep Modules** — Study guides for ASME, AS9100, ISO 9001 print-shop exams. _SEO: `/certify/[cert]/study` high-intent professional-dev queries._ [Education + B2B]
39. **Manufacturing History Timeline** — Interactive timeline of AM patents with printable examples. _SEO: `/history/[year]` student-research queries._ [Education + Content-engine]
40. **Failure-Mode Encyclopedia** — For every FMEA mode, printed exemplar + mitigation. _SEO: `/fmea/[mode]` reliability-eng long-tail._ [Education + Vertical-tool]

## 5. Community & UGC

41. **PartBook** — Users publish their prints with settings, materials, cost, story. _SEO: `/parts/[slug]` accumulates long-tail model-name searches._ [UGC + Community]
42. **Design Reviews Open House** — Post your part, get community + Gemini critique with public thread. _SEO: `/review/[hash]` "review my 3d print"._ [UGC + Community]
43. **Print-of-the-Week Voting** — Weekly showcase; winners get free reprint + press. _SEO: `/potw/[YYYY-Wxx]` archive freshness._ [Community + Content-engine]
44. **Ask an Engineer AMA Log** — Monthly AMAs transcribed to indexable pages. _SEO: `/ama/[expert]/[date]` expert-name searches._ [Community + Education]
45. **Print-Setting Marketplace** — Users sell tuned .3mf profiles; buyers rate outcomes. _SEO: `/profiles/[printer]/[material]` tuning searches._ [UGC + Vertical-tool]
46. **Fail Wall of Fame** — Spectacular fails with lessons + captions. _SEO: `/wall-of-fail/[slug]` viral social backlinks._ [UGC + Community]
47. **Remix Trees** — Fork any public design; visualize genealogy like Git. _SEO: `/design/[id]/tree` compound backlinks per lineage node._ [UGC + Data-viz]
48. **Local Meetups Board** — Users post AM meetups by city. _SEO: `/meetups/[city]` geo-searches for AM community._ [Community + Vertical-tool]
49. **Peer Certification** — Community-issued badges for DFM skill on our puzzles. _SEO: `/u/[handle]` searchable engineer portfolios._ [UGC + Community]
50. **Comment-Threaded Datasheets** — Every material datasheet allows footnote-style engineer comments. _SEO: comment volume adds unique content to `/materials/[name]`._ [UGC + Content-engine]

## 6. Original Research & Data Publications

51. **State of US Additive Manufacturing Report** — Annual PDF + interactive charts, press-released. _SEO: `/report/state-of-am/[YYYY]` cited by every AM journalist._ [Content-engine]
52. **Real-World Tensile Test Vault** — Publish tensile results for every material/orientation combo we run. _SEO: `/testing/[material]/[orientation]` citation-magnet reference._ [Content-engine + Data-viz]
53. **Print-Farm Energy Consumption Study** — kWh/part data by process, monthly. _SEO: ESG-procurement search + sustainability report citations._ [Live-data + Content-engine]
54. **Aerospace Bracket Benchmark** — Standard bracket printed monthly across all machines; weight/cost/strength tracked. _SEO: `/benchmark/aerospace-bracket` industry reference part._ [Content-engine + Vertical-tool]
55. **Print vs Machine LCA** — Life-cycle CO₂ per part class, quarterly. _SEO: `/lca/[part-class]` corporate ESG intent._ [Content-engine + Data-viz]
56. **Salary Report: US AM Engineers** — Anonymous crowd-sourced compensation data by role/region. _SEO: `/salary/am-engineer/[region]` HR/recruiter traffic._ [Content-engine + UGC]
57. **Print-Farm Downtime Index** — Honest MTBF data per machine model. _SEO: `/reliability/[printer-model]` outranks manufacturer marketing._ [Content-engine]
58. **Material Aging Study** — Tensile at 30/60/90/180 day intervals for retested parts. _SEO: `/aging/[material]/[days]` "does PLA get brittle" queries._ [Content-engine]
59. **US Manufacturing Zip-Code Density Map** — Where AM/CNC shops cluster with drill-down. _SEO: `/map/[zip]` local-SEO compounding._ [Data-viz + Content-engine]
60. **Defense-Prime Supplier Traceability Whitepaper** — Quarterly ITAR supply-chain deep-dive. _SEO: `/whitepapers/itar-[YYYY-Q]` high-value defense inbound._ [Content-engine + B2B]

## 7. Design-File Libraries

61. **Verified STEP Library** — Curated STEP files with print-tested parameters. _SEO: `/step/[part-name]` "free step file [thing]"._ [Content-engine + UGC]
62. **Parametric OpenSCAD Playground** — Fork/edit parametric parts in-browser; each variant gets a URL. _SEO: infinite `/scad/[hash]`._ [UGC + Content-engine]
63. **Threaded Insert Boss Library** — Every heat-set × wall thickness combo as a downloadable part. _SEO: `/insert/[m3-brass]/[3mm-wall]`._ [Vertical-tool + Content-engine]
64. **Enclosure Wizard Outputs** — Each generated enclosure gets a permanent shareable STEP link. _SEO: `/enclosure/[dims-hash]` "custom electronics enclosure"._ [AI-tool + UGC]
65. **Standard Fixture Library** — Machinist workholding fixtures parametrized for our CNC. _SEO: `/fixture/[type]/[size]`._ [Vertical-tool]
66. **Prosthetics Open-Source Hub** — Verified e-NABLE + custom prosthetic designs with size guides. _SEO: `/prosthetics/[design]/[size]` mission-driven + editorial backlinks._ [Vertical-tool + Community]
67. **Repair-Parts Catalog** — Community-submitted replacements for discontinued household parts. _SEO: `/repair/[brand]/[model]/[part]` massive long-tail._ [UGC + Content-engine]
68. **Educational Model Vault** — Curated STL of anatomy, molecules, math shapes, tagged by curriculum standard. _SEO: `/edu/[grade]/[topic]` teacher traffic._ [Education + Content-engine]
69. **Tabletop Miniature Bureau** — CC-licensed minis with orientation-optimized files. _SEO: `/minis/[game]/[faction]` hobby volume._ [Content-engine + Community]
70. **Museum Replica Archive** — Partner with museums to host public-domain scan STLs. _SEO: `/museum/[institution]/[artifact]` heritage + PR backlinks._ [Content-engine]

## 8. School / Student / Academic Tools

71. **ABET School Credit Pages** — For every ABET-accredited program (~400), a page offering print credits. _SEO: `/edu/[university]/free-printing` "[school] 3d printing"._ [Vertical-tool + Education]
72. **Capstone Sponsor Portal** — Companies post capstone briefs; students apply through us. _SEO: `/capstone/[year]/[school]/[project]`._ [Vertical-tool + B2B]
73. **Thesis Print Grants** — Application for PhD candidates; awardees get case-study pages. _SEO: `/grants/[recipient]/[thesis]` academic-citation SEO._ [Education + Content-engine]
74. **Course Companion Kits** — Pre-built print packs for named courses (MIT 2.007, Stanford ME101). _SEO: `/course/[school]/[code]` course-code searches._ [Vertical-tool + Education]
75. **Student-Team Sponsor Registry** — Formula SAE, Solar Car, Rocketry with sponsorship pages. _SEO: `/teams/[school]/[team]` team-site backlinks._ [Community + Vertical-tool]
76. **STEM Teacher Lesson Marketplace** — Teachers publish + sell lesson plans printable via us. _SEO: `/lessons/[subject]/[grade]` K-12 teacher volume._ [UGC + Education]
77. **Science Fair Project Kits** — Pre-scoped project ideas with printable components + rubrics. _SEO: `/sciencefair/[grade]/[category]` seasonal spikes._ [Education + Content-engine]
78. **Dorm-Room Print Discount** — .edu verification unlocks student pricing. _SEO: `/students/[campus]` local campus pages._ [Vertical-tool]
79. **Library Partnership Program** — For every university library with a makerspace, a partnership page. _SEO: `/library/[institution]` "[school] makerspace"._ [Vertical-tool + Community]
80. **Academic Citation Widget** — One-click "cite this datasheet" in BibTeX/APA/MLA. _SEO: cited pages accumulate .edu backlinks._ [Education + Content-engine]

## 9. Industry-Specific Micro-Tools

81. **Aerospace Bracket Stress Estimator** — Load case + geometry → FEA-lite result + material rec. _SEO: `/aero/bracket-stress/[hash]`._ [Vertical-tool + Calculator]
82. **Medical Device Biocompat Checker** — Material → ISO 10993 compliance summary + regulatory notes. _SEO: `/medical/biocompat/[material]`._ [Vertical-tool]
83. **Drone Frame Weight Optimizer** — Payload + flight time → lightweighted frame options. _SEO: `/drone/frame/[payload]-[minutes]`._ [Vertical-tool + Calculator]
84. **EV Battery Enclosure Calculator** — Cell type + count → enclosure with thermal + IP rating. _SEO: `/ev/battery-box/[cells]`._ [Vertical-tool + Calculator]
85. **Robotics Gripper Configurator** — Object type + weight + surface → printable gripper. _SEO: `/robotics/gripper/[object-class]`._ [Vertical-tool + AI-tool]
86. **Dental Model Print Estimator** — Upload intraoral scan STL → print quote + turnaround. _SEO: `/dental/[model-type]`._ [Vertical-tool]
87. **Semiconductor Fixture Tool** — Wafer-handling fixture generator with ESD-safe material recs. _SEO: `/semi/fixture/[wafer-size]`._ [Vertical-tool]
88. **Oil & Gas Threaded Fitting Library** — API-standard fittings with pressure ratings. _SEO: `/oilgas/fitting/[api-spec]`._ [Vertical-tool + Content-engine]
89. **Film & FX Prop Rush Service** — 48-hour prop print with film-industry finish options. _SEO: `/film/props/[category]`._ [Vertical-tool]
90. **Architectural Model Scaling Wizard** — Building CAD in → per-scale print quote out. _SEO: `/arch/model/[scale]/[stories]`._ [Vertical-tool + Calculator]

## 10. B2B / Procurement Tools

91. **Per-Certification Landing Pages** — AS9100, ISO 13485, ITAR, NADCAP, DFARS each get a deep page. _SEO: `/cert/[name]` every compliance search from procurement._ [B2B + Content-engine]
92. **Company Print History Portals** — Each enterprise customer gets a private+public case-study page. _SEO: `/customers/[company]` (with permission) captures brand-name searches._ [B2B + Content-engine]
93. **Supplier Diversity Scorecard** — Public dashboard of subcontractor diversity metrics. _SEO: `/diversity` Fortune-500 procurement compliance backlinks._ [B2B + Live-data]
94. **NAICS Code Directory** — Every NAICS code relevant to AM/CNC gets a page. _SEO: `/naics/[code]` federal-procurement traffic._ [B2B + Vertical-tool]
95. **SAM.gov Contract-Vehicle Explainer** — For each GSA schedule / IDIQ we're on, a page. _SEO: `/gov/[vehicle]` federal buyer traffic._ [B2B + Content-engine]
96. **Purchase-Order Template Library** — Free PO templates by industry with our SKU codes prefilled. _SEO: `/po-template/[industry]`._ [B2B + Content-engine]
97. **Vendor Onboarding Package Generator** — Enter buyer's system (Ariba/Coupa) → pre-filled onboarding docs. _SEO: `/onboard/[system]`._ [B2B + AI-tool]
98. **Procurement Manager AI Advisor** — Gemini agent trained on buyer scenarios. _SEO: `/advisor/[scenario]`._ [AI-tool + B2B]
99. **DUNS & NAICS Certification Checker** — Enter DUNS, see which of our certs match their reqs. _SEO: `/qualify/[duns]` inbound buyer traffic._ [B2B + Live-data]
100. **Reciprocal Supplier Discovery** — We publish our subcontractor tiers publicly; they link back. _SEO: `/network/[supplier]` reciprocal backlink engine._ [B2B + Community]
