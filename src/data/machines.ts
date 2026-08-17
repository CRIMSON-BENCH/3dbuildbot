// Top CNC, 3D-printing, and manufacturing machine models — one landing page per model
// aimed at owner-operators of that specific machine.

export interface Machine {
  slug: string;
  brand: string;
  model: string;
  category: "cnc-vmc" | "cnc-lathe" | "cnc-swiss" | "sls" | "mjf" | "sla" | "fdm" | "dmls" | "wire-edm" | "waterjet";
  approxHourlyRate: number; // USD/hr what shops typically charge
  typicalUtilizationPct: number;
  keyword: string; // for meta description
}

export const MACHINES: Machine[] = [
  // Haas — dominant US CNC
  { slug: "haas-vf-1", brand: "Haas", model: "VF-1", category: "cnc-vmc", approxHourlyRate: 65, typicalUtilizationPct: 55, keyword: "Haas VF-1 vertical machining center" },
  { slug: "haas-vf-2", brand: "Haas", model: "VF-2", category: "cnc-vmc", approxHourlyRate: 75, typicalUtilizationPct: 60, keyword: "Haas VF-2 vertical machining center" },
  { slug: "haas-vf-2ss", brand: "Haas", model: "VF-2SS", category: "cnc-vmc", approxHourlyRate: 85, typicalUtilizationPct: 60, keyword: "Haas VF-2SS super-speed vertical machining center" },
  { slug: "haas-vf-3", brand: "Haas", model: "VF-3", category: "cnc-vmc", approxHourlyRate: 90, typicalUtilizationPct: 55, keyword: "Haas VF-3 vertical machining center" },
  { slug: "haas-vf-4", brand: "Haas", model: "VF-4", category: "cnc-vmc", approxHourlyRate: 100, typicalUtilizationPct: 50, keyword: "Haas VF-4 vertical machining center" },
  { slug: "haas-vf-5", brand: "Haas", model: "VF-5", category: "cnc-vmc", approxHourlyRate: 110, typicalUtilizationPct: 45, keyword: "Haas VF-5 large-envelope VMC" },
  { slug: "haas-umc-750", brand: "Haas", model: "UMC-750", category: "cnc-vmc", approxHourlyRate: 130, typicalUtilizationPct: 55, keyword: "Haas UMC-750 5-axis universal machining center" },
  { slug: "haas-umc-1000", brand: "Haas", model: "UMC-1000", category: "cnc-vmc", approxHourlyRate: 160, typicalUtilizationPct: 50, keyword: "Haas UMC-1000 large 5-axis machining center" },
  { slug: "haas-mini-mill", brand: "Haas", model: "Mini Mill 2", category: "cnc-vmc", approxHourlyRate: 55, typicalUtilizationPct: 65, keyword: "Haas Mini Mill 2 compact VMC" },
  { slug: "haas-st-10", brand: "Haas", model: "ST-10", category: "cnc-lathe", approxHourlyRate: 65, typicalUtilizationPct: 60, keyword: "Haas ST-10 CNC lathe" },
  { slug: "haas-st-20", brand: "Haas", model: "ST-20", category: "cnc-lathe", approxHourlyRate: 75, typicalUtilizationPct: 60, keyword: "Haas ST-20 CNC lathe" },
  { slug: "haas-st-30", brand: "Haas", model: "ST-30", category: "cnc-lathe", approxHourlyRate: 85, typicalUtilizationPct: 55, keyword: "Haas ST-30 large CNC lathe" },
  { slug: "haas-tl-2", brand: "Haas", model: "TL-2", category: "cnc-lathe", approxHourlyRate: 50, typicalUtilizationPct: 50, keyword: "Haas TL-2 toolroom lathe" },

  // DMG Mori — high-end
  { slug: "dmg-mori-dmu-50", brand: "DMG Mori", model: "DMU 50", category: "cnc-vmc", approxHourlyRate: 160, typicalUtilizationPct: 60, keyword: "DMG Mori DMU 50 5-axis" },
  { slug: "dmg-mori-dmu-65", brand: "DMG Mori", model: "DMU 65 monoBLOCK", category: "cnc-vmc", approxHourlyRate: 180, typicalUtilizationPct: 60, keyword: "DMG Mori DMU 65 monoBLOCK 5-axis" },
  { slug: "dmg-mori-nlx-2500", brand: "DMG Mori", model: "NLX 2500", category: "cnc-lathe", approxHourlyRate: 140, typicalUtilizationPct: 60, keyword: "DMG Mori NLX 2500 turning center" },
  { slug: "dmg-mori-ctx-beta-800", brand: "DMG Mori", model: "CTX beta 800 TC", category: "cnc-lathe", approxHourlyRate: 160, typicalUtilizationPct: 55, keyword: "DMG Mori CTX beta 800 TC turn-mill" },

  // Mazak
  { slug: "mazak-integrex-i-200", brand: "Mazak", model: "INTEGREX i-200", category: "cnc-lathe", approxHourlyRate: 165, typicalUtilizationPct: 60, keyword: "Mazak INTEGREX i-200 mill-turn" },
  { slug: "mazak-vcn-530c", brand: "Mazak", model: "VCN-530C", category: "cnc-vmc", approxHourlyRate: 95, typicalUtilizationPct: 60, keyword: "Mazak VCN-530C vertical machining center" },
  { slug: "mazak-variaxis-i-500", brand: "Mazak", model: "VARIAXIS i-500", category: "cnc-vmc", approxHourlyRate: 175, typicalUtilizationPct: 55, keyword: "Mazak VARIAXIS i-500 5-axis" },

  // Okuma
  { slug: "okuma-mb-56v", brand: "Okuma", model: "MB-56V", category: "cnc-vmc", approxHourlyRate: 105, typicalUtilizationPct: 60, keyword: "Okuma MB-56V vertical machining center" },
  { slug: "okuma-genos-l3000", brand: "Okuma", model: "GENOS L3000-e", category: "cnc-lathe", approxHourlyRate: 85, typicalUtilizationPct: 60, keyword: "Okuma GENOS L3000-e CNC lathe" },
  { slug: "okuma-mu-6300v", brand: "Okuma", model: "MU-6300V", category: "cnc-vmc", approxHourlyRate: 160, typicalUtilizationPct: 55, keyword: "Okuma MU-6300V 5-axis machining center" },

  // Doosan / DN Solutions
  { slug: "doosan-dnm-500", brand: "DN Solutions (Doosan)", model: "DNM 500", category: "cnc-vmc", approxHourlyRate: 85, typicalUtilizationPct: 60, keyword: "DN Solutions DNM 500 VMC" },
  { slug: "doosan-lynx-2100", brand: "DN Solutions (Doosan)", model: "Lynx 2100", category: "cnc-lathe", approxHourlyRate: 75, typicalUtilizationPct: 60, keyword: "DN Solutions Lynx 2100 CNC lathe" },
  { slug: "doosan-nhp-4000", brand: "DN Solutions (Doosan)", model: "NHP 4000", category: "cnc-vmc", approxHourlyRate: 150, typicalUtilizationPct: 65, keyword: "DN Solutions NHP 4000 horizontal machining center" },

  // Swiss lathes
  { slug: "tornos-swiss-gt-26", brand: "Tornos", model: "Swiss GT 26", category: "cnc-swiss", approxHourlyRate: 145, typicalUtilizationPct: 65, keyword: "Tornos Swiss GT 26 Swiss lathe" },
  { slug: "citizen-l20", brand: "Citizen", model: "L20 Type XII", category: "cnc-swiss", approxHourlyRate: 130, typicalUtilizationPct: 65, keyword: "Citizen L20 Swiss-type lathe" },
  { slug: "star-sr-20jn", brand: "Star", model: "SR-20JN", category: "cnc-swiss", approxHourlyRate: 125, typicalUtilizationPct: 65, keyword: "Star SR-20JN Swiss automatic lathe" },

  // Hurco
  { slug: "hurco-vm10i", brand: "Hurco", model: "VM10i", category: "cnc-vmc", approxHourlyRate: 70, typicalUtilizationPct: 60, keyword: "Hurco VM10i VMC" },
  { slug: "hurco-vmx42i", brand: "Hurco", model: "VMX42i", category: "cnc-vmc", approxHourlyRate: 95, typicalUtilizationPct: 55, keyword: "Hurco VMX42i machining center" },

  // Bridgeport / Hardinge
  { slug: "bridgeport-mill", brand: "Bridgeport", model: "Series 1 Mill", category: "cnc-vmc", approxHourlyRate: 40, typicalUtilizationPct: 40, keyword: "Bridgeport Series 1 knee mill" },

  // ============ 3D Printing ============
  { slug: "eos-p-396", brand: "EOS", model: "P 396", category: "sls", approxHourlyRate: 65, typicalUtilizationPct: 65, keyword: "EOS P 396 industrial SLS" },
  { slug: "eos-p-500", brand: "EOS", model: "P 500", category: "sls", approxHourlyRate: 95, typicalUtilizationPct: 60, keyword: "EOS P 500 SLS" },
  { slug: "eos-m-290", brand: "EOS", model: "M 290", category: "dmls", approxHourlyRate: 120, typicalUtilizationPct: 55, keyword: "EOS M 290 direct metal laser sintering" },
  { slug: "eos-m-400", brand: "EOS", model: "M 400", category: "dmls", approxHourlyRate: 165, typicalUtilizationPct: 50, keyword: "EOS M 400 large-envelope DMLS" },

  { slug: "hp-jet-fusion-5200", brand: "HP", model: "Jet Fusion 5200", category: "mjf", approxHourlyRate: 75, typicalUtilizationPct: 65, keyword: "HP Multi Jet Fusion 5200" },
  { slug: "hp-jet-fusion-5210-pro", brand: "HP", model: "Jet Fusion 5210 Pro", category: "mjf", approxHourlyRate: 85, typicalUtilizationPct: 65, keyword: "HP Jet Fusion 5210 Pro industrial MJF" },
  { slug: "hp-jet-fusion-540", brand: "HP", model: "Jet Fusion 540", category: "mjf", approxHourlyRate: 55, typicalUtilizationPct: 60, keyword: "HP Jet Fusion 540 desktop MJF" },

  { slug: "3d-systems-prox-800", brand: "3D Systems", model: "ProX SLS 6100", category: "sls", approxHourlyRate: 75, typicalUtilizationPct: 60, keyword: "3D Systems ProX SLS 6100" },
  { slug: "3d-systems-figure-4", brand: "3D Systems", model: "Figure 4 Standalone", category: "sla", approxHourlyRate: 40, typicalUtilizationPct: 55, keyword: "3D Systems Figure 4 SLA" },

  { slug: "formlabs-form-3", brand: "Formlabs", model: "Form 3", category: "sla", approxHourlyRate: 25, typicalUtilizationPct: 55, keyword: "Formlabs Form 3 desktop SLA" },
  { slug: "formlabs-form-3l", brand: "Formlabs", model: "Form 3L", category: "sla", approxHourlyRate: 40, typicalUtilizationPct: 50, keyword: "Formlabs Form 3L large-format SLA" },
  { slug: "formlabs-fuse-1", brand: "Formlabs", model: "Fuse 1+", category: "sls", approxHourlyRate: 35, typicalUtilizationPct: 60, keyword: "Formlabs Fuse 1+ benchtop SLS" },
  { slug: "formlabs-form-4", brand: "Formlabs", model: "Form 4", category: "sla", approxHourlyRate: 30, typicalUtilizationPct: 55, keyword: "Formlabs Form 4 desktop SLA" },

  { slug: "stratasys-fortus-450mc", brand: "Stratasys", model: "Fortus 450mc", category: "fdm", approxHourlyRate: 65, typicalUtilizationPct: 55, keyword: "Stratasys Fortus 450mc industrial FDM" },
  { slug: "stratasys-f770", brand: "Stratasys", model: "F770", category: "fdm", approxHourlyRate: 75, typicalUtilizationPct: 50, keyword: "Stratasys F770 large-format FDM" },
  { slug: "stratasys-j850", brand: "Stratasys", model: "J850", category: "sla", approxHourlyRate: 95, typicalUtilizationPct: 50, keyword: "Stratasys J850 PolyJet full-color" },

  { slug: "markforged-x7", brand: "Markforged", model: "X7", category: "fdm", approxHourlyRate: 45, typicalUtilizationPct: 60, keyword: "Markforged X7 continuous fiber" },
  { slug: "markforged-fx20", brand: "Markforged", model: "FX20", category: "fdm", approxHourlyRate: 65, typicalUtilizationPct: 55, keyword: "Markforged FX20 industrial composite" },
  { slug: "markforged-metal-x", brand: "Markforged", model: "Metal X", category: "dmls", approxHourlyRate: 55, typicalUtilizationPct: 50, keyword: "Markforged Metal X bound metal deposition" },

  { slug: "carbon-m2", brand: "Carbon", model: "M2", category: "sla", approxHourlyRate: 65, typicalUtilizationPct: 60, keyword: "Carbon M2 DLS printer" },
  { slug: "carbon-l1", brand: "Carbon", model: "L1", category: "sla", approxHourlyRate: 95, typicalUtilizationPct: 55, keyword: "Carbon L1 large-format DLS" },

  { slug: "prusa-mk4", brand: "Prusa", model: "MK4", category: "fdm", approxHourlyRate: 12, typicalUtilizationPct: 60, keyword: "Prusa MK4 open-source FDM" },
  { slug: "prusa-xl", brand: "Prusa", model: "XL", category: "fdm", approxHourlyRate: 18, typicalUtilizationPct: 55, keyword: "Prusa XL toolchanger FDM" },
  { slug: "bambu-x1c", brand: "Bambu Lab", model: "X1 Carbon", category: "fdm", approxHourlyRate: 14, typicalUtilizationPct: 65, keyword: "Bambu Lab X1 Carbon fast FDM" },
  { slug: "bambu-p1s", brand: "Bambu Lab", model: "P1S", category: "fdm", approxHourlyRate: 10, typicalUtilizationPct: 70, keyword: "Bambu Lab P1S enclosed FDM" },

  { slug: "raise3d-e2", brand: "Raise3D", model: "E2", category: "fdm", approxHourlyRate: 22, typicalUtilizationPct: 55, keyword: "Raise3D E2 dual-extrusion FDM" },
  { slug: "raise3d-pro3", brand: "Raise3D", model: "Pro3 Plus", category: "fdm", approxHourlyRate: 28, typicalUtilizationPct: 55, keyword: "Raise3D Pro3 Plus industrial FDM" },

  { slug: "ultimaker-s5", brand: "UltiMaker", model: "S5", category: "fdm", approxHourlyRate: 24, typicalUtilizationPct: 55, keyword: "UltiMaker S5 dual-extruder FDM" },
  { slug: "ultimaker-s7", brand: "UltiMaker", model: "S7 Pro", category: "fdm", approxHourlyRate: 30, typicalUtilizationPct: 55, keyword: "UltiMaker S7 Pro FDM" },

  { slug: "sinterit-lisa", brand: "Sinterit", model: "Lisa Pro", category: "sls", approxHourlyRate: 22, typicalUtilizationPct: 55, keyword: "Sinterit Lisa Pro benchtop SLS" },
  { slug: "farsoon-flight", brand: "Farsoon", model: "FLIGHT HT403P", category: "sls", approxHourlyRate: 55, typicalUtilizationPct: 60, keyword: "Farsoon FLIGHT HT403P SLS" },

  // Wire EDM
  { slug: "sodick-alc-400g", brand: "Sodick", model: "ALC 400G", category: "wire-edm", approxHourlyRate: 85, typicalUtilizationPct: 60, keyword: "Sodick ALC 400G wire EDM" },
  { slug: "mitsubishi-mv1200s", brand: "Mitsubishi", model: "MV1200S", category: "wire-edm", approxHourlyRate: 90, typicalUtilizationPct: 60, keyword: "Mitsubishi MV1200S wire EDM" },

  // Waterjet
  { slug: "omax-55100", brand: "OMAX", model: "55100", category: "waterjet", approxHourlyRate: 95, typicalUtilizationPct: 55, keyword: "OMAX 55100 abrasive waterjet" },
  { slug: "flow-mach-500", brand: "Flow", model: "Mach 500", category: "waterjet", approxHourlyRate: 110, typicalUtilizationPct: 55, keyword: "Flow Mach 500 waterjet" },
];

export const getMachineBySlug = (slug: string) => MACHINES.find((m) => m.slug === slug);
export const getMachinesByCategory = (cat: Machine["category"]) => MACHINES.filter((m) => m.category === cat);
