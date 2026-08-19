import { MATERIALS, getMaterialBySlug } from "@/data/materials";
import { PROCESSES, getProcessBySlug } from "@/data/processes";

export interface QuoteInput {
  volumeCm3: number;
  bboxMm: { x: number; y: number; z: number };
  triangleCount?: number;
  processSlug: string;
  materialSlug: string;
  quantity: number;
  finish?: string;
  expedite?: "standard" | "economy" | "rush2" | "rush1" | "weekend";
  loyaltyDiscountPct?: number; // auto-applied for repeat customers (see /api/quote)
}

export interface QuoteResult {
  unitPriceCents: number;
  totalPriceCents: number;
  currency: "USD";
  leadTimeDays: string;
  costDrivers: { label: string; cents: number; pct: number }[];
  volumeDiscountPct: number;
  compatible: boolean;
  reason?: string;
}

// Machine setup + minimum-charge per process
const PROCESS_BASE = {
  fdm: { setupCents: 800, minChargeCents: 1500, timePerCm3Sec: 6 },
  sls: { setupCents: 1200, minChargeCents: 3500, timePerCm3Sec: 12 },
  sla: { setupCents: 1000, minChargeCents: 2200, timePerCm3Sec: 20 },
  mjf: { setupCents: 1400, minChargeCents: 3200, timePerCm3Sec: 8 },
  "cnc-machining": { setupCents: 6500, minChargeCents: 12000, timePerCm3Sec: 45 },
} as const;

const FINISH_MULT: Record<string, number> = {
  standard: 1.0,
  "bead-blast": 1.08,
  "vapor-smooth": 1.35,
  anodize2: 1.22,
  anodize3: 1.55,
  alodine: 1.18,
  "powder-coat": 1.28,
  passivate: 1.12,
};

const EXPEDITE_MULT: Record<string, number> = {
  economy: 0.9,
  standard: 1.0,
  rush2: 1.3,
  rush1: 1.5,
  weekend: 1.15,
};

export function quote({
  volumeCm3,
  bboxMm,
  triangleCount = 0,
  processSlug,
  materialSlug,
  quantity,
  finish = "standard",
  expedite = "standard",
  loyaltyDiscountPct = 0,
}: QuoteInput): QuoteResult {
  const proc = getProcessBySlug(processSlug);
  const mat = getMaterialBySlug(materialSlug);
  if (!proc || !mat) return { unitPriceCents: 0, totalPriceCents: 0, currency: "USD", leadTimeDays: "—", costDrivers: [], volumeDiscountPct: 0, compatible: false, reason: "Unknown process or material" };

  // Compatibility check
  const okProcess = mat.processes.includes(proc.code);
  if (!okProcess) {
    return { unitPriceCents: 0, totalPriceCents: 0, currency: "USD", leadTimeDays: "—", costDrivers: [], volumeDiscountPct: 0, compatible: false, reason: `${mat.shortName} is not offered on ${proc.short}` };
  }

  const base = PROCESS_BASE[processSlug as keyof typeof PROCESS_BASE] ?? PROCESS_BASE.fdm;

  // Cost drivers (all in cents, per-part)
  const materialCents = Math.round(volumeCm3 * mat.costPerCm3 * 100);
  const machineTimeCents = Math.round(base.timePerCm3Sec * volumeCm3 * 0.30); // $0.30/sec of machine time = $18/min
  const setupCents = base.setupCents;
  const bboxComplexity = Math.max(1, (bboxMm.x * bboxMm.y * bboxMm.z) / 100000);
  const complexityCents = Math.round(bboxComplexity * 30);
  const finishMult = FINISH_MULT[finish] ?? 1.0;
  const expediteMult = EXPEDITE_MULT[expedite] ?? 1.0;

  const preFinishPerPart = materialCents + machineTimeCents + setupCents + complexityCents;
  const withFinish = Math.round(preFinishPerPart * finishMult);
  const withExpedite = Math.round(withFinish * expediteMult);

  const perPart = Math.max(base.minChargeCents, withExpedite);

  // Volume discount
  const volumeDiscountPct = quantity >= 500 ? 40 : quantity >= 100 ? 30 : quantity >= 25 ? 18 : quantity >= 5 ? 8 : 0;
  // Loyalty discount stacks on top of volume, capped at 15% additional.
  const loyaltyPct = Math.max(0, Math.min(15, loyaltyDiscountPct));
  const combinedDiscountFactor = (1 - volumeDiscountPct / 100) * (1 - loyaltyPct / 100);
  const discountedPerPart = Math.round(perPart * combinedDiscountFactor);
  const total = discountedPerPart * quantity;

  const drivers = [
    { label: "Material", cents: Math.round(materialCents * finishMult * expediteMult) },
    { label: "Machine time", cents: Math.round(machineTimeCents * finishMult * expediteMult) },
    { label: "Setup + tooling", cents: Math.round(setupCents * finishMult * expediteMult) },
    { label: "Geometry complexity", cents: Math.round(complexityCents * finishMult * expediteMult) },
  ];
  if (finishMult !== 1) drivers.push({ label: `Finish (${finish})`, cents: Math.round(preFinishPerPart * (finishMult - 1)) });
  if (expediteMult !== 1) drivers.push({ label: `Expedite (${expedite})`, cents: Math.round(withFinish * (expediteMult - 1)) });
  if (volumeDiscountPct > 0) drivers.push({ label: `Volume discount (${volumeDiscountPct}%)`, cents: -Math.round(perPart * (volumeDiscountPct / 100)) });
  if (loyaltyPct > 0) drivers.push({ label: `Loyalty discount (${loyaltyPct}%)`, cents: -Math.round(perPart * (loyaltyPct / 100) * (1 - volumeDiscountPct / 100)) });

  const totalDriversAbs = drivers.reduce((a, d) => a + Math.abs(d.cents), 0);
  const driversWithPct = drivers.map((d) => ({ ...d, pct: Math.round((Math.abs(d.cents) / totalDriversAbs) * 100) }));

  return {
    unitPriceCents: discountedPerPart,
    totalPriceCents: total,
    currency: "USD",
    leadTimeDays: expedite === "rush1" ? "1 day" : expedite === "rush2" ? "2 days" : expedite === "economy" ? doubleLead(proc.leadTimeDays) : proc.leadTimeDays,
    costDrivers: driversWithPct,
    volumeDiscountPct,
    compatible: true,
  };
}

function doubleLead(range: string): string {
  const m = range.match(/(\d+)–(\d+)/);
  if (!m) return range;
  return `${Number(m[1]) * 2}–${Number(m[2]) * 2} days`;
}

export const formatUSD = (cents: number) => `$${(cents / 100).toFixed(2)}`;
