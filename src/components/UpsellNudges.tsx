"use client";
// Post-quote upsell nudges. Small green-box widget under the price card that
// suggests a next-tier volume price (unlocks discount) OR a rush upgrade
// (higher AOV). Non-invasive; disappears when the user already picked them.

export function UpsellNudges({
  currentQty,
  tierPrices,
  expedite,
  onQty,
  onExpedite,
}: {
  currentQty: number;
  tierPrices: Record<number, number>;
  expedite: string;
  onQty: (n: number) => void;
  onExpedite: (v: "standard" | "economy" | "rush2" | "rush1" | "weekend") => void;
}) {
  // Suggest next volume tier with a discount jump
  const tiers = Object.keys(tierPrices).map(Number).sort((a, b) => a - b);
  const nextTier = tiers.find((t) => t > currentQty);
  const currentUnit = tierPrices[currentQty];
  const nextUnit = nextTier ? tierPrices[nextTier] : undefined;
  const savingsPct = currentUnit && nextUnit ? Math.round(((currentUnit - nextUnit) / currentUnit) * 100) : 0;
  const showVolumeUpsell = nextTier && savingsPct >= 5;

  const showRushUpsell = expedite === "standard";

  if (!showVolumeUpsell && !showRushUpsell) return null;

  return (
    <div className="mt-3 space-y-2">
      {showVolumeUpsell && (
        <button
          onClick={() => onQty(nextTier!)}
          className="w-full text-left rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-3 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-colors"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Volume discount unlocks</div>
          <div className="mt-0.5 text-sm text-slate-800 dark:text-slate-200">
            <strong>Order {nextTier}</strong> and drop your per-part price by <strong>{savingsPct}%</strong> — one tap.
          </div>
        </button>
      )}
      {showRushUpsell && (
        <button
          onClick={() => onExpedite("rush2")}
          className="w-full text-left rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-3 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-300">Rush upgrade</div>
          <div className="mt-0.5 text-sm text-slate-800 dark:text-slate-200">
            Need it sooner? <strong>Ship in 2 days</strong> for a small surcharge — click to preview.
          </div>
        </button>
      )}
    </div>
  );
}
