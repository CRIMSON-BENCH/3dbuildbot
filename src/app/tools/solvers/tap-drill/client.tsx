"use client";
import { useState, useMemo } from "react";
import { SolverShell, Input, Select, Result, Card } from "@/components/SolverShell";

interface Thread { value: string; label: string; nominal: number; pitch: number; system: "metric" | "imperial"; }

const THREADS: Thread[] = [
  { value: "m2-0.4", label: "M2 × 0.4 (coarse)", nominal: 2.0, pitch: 0.4, system: "metric" },
  { value: "m2.5-0.45", label: "M2.5 × 0.45", nominal: 2.5, pitch: 0.45, system: "metric" },
  { value: "m3-0.5", label: "M3 × 0.5 (coarse)", nominal: 3.0, pitch: 0.5, system: "metric" },
  { value: "m3-0.35", label: "M3 × 0.35 (fine)", nominal: 3.0, pitch: 0.35, system: "metric" },
  { value: "m4-0.7", label: "M4 × 0.7 (coarse)", nominal: 4.0, pitch: 0.7, system: "metric" },
  { value: "m4-0.5", label: "M4 × 0.5 (fine)", nominal: 4.0, pitch: 0.5, system: "metric" },
  { value: "m5-0.8", label: "M5 × 0.8 (coarse)", nominal: 5.0, pitch: 0.8, system: "metric" },
  { value: "m5-0.5", label: "M5 × 0.5 (fine)", nominal: 5.0, pitch: 0.5, system: "metric" },
  { value: "m6-1.0", label: "M6 × 1.0 (coarse)", nominal: 6.0, pitch: 1.0, system: "metric" },
  { value: "m6-0.75", label: "M6 × 0.75 (fine)", nominal: 6.0, pitch: 0.75, system: "metric" },
  { value: "m8-1.25", label: "M8 × 1.25 (coarse)", nominal: 8.0, pitch: 1.25, system: "metric" },
  { value: "m8-1.0", label: "M8 × 1.0 (fine)", nominal: 8.0, pitch: 1.0, system: "metric" },
  { value: "m10-1.5", label: "M10 × 1.5 (coarse)", nominal: 10.0, pitch: 1.5, system: "metric" },
  { value: "m10-1.25", label: "M10 × 1.25 (fine)", nominal: 10.0, pitch: 1.25, system: "metric" },
  { value: "m12-1.75", label: "M12 × 1.75 (coarse)", nominal: 12.0, pitch: 1.75, system: "metric" },
  { value: "m12-1.5", label: "M12 × 1.5 (fine)", nominal: 12.0, pitch: 1.5, system: "metric" },
  { value: "m16-2.0", label: "M16 × 2.0 (coarse)", nominal: 16.0, pitch: 2.0, system: "metric" },
  { value: "m20-2.5", label: "M20 × 2.5 (coarse)", nominal: 20.0, pitch: 2.5, system: "metric" },
  // Imperial (TPI stored as pitch = 25.4/TPI mm)
  { value: "2-56-unc", label: "#2-56 UNC", nominal: 0.086 * 25.4, pitch: 25.4 / 56, system: "imperial" },
  { value: "4-40-unc", label: "#4-40 UNC", nominal: 0.112 * 25.4, pitch: 25.4 / 40, system: "imperial" },
  { value: "6-32-unc", label: "#6-32 UNC", nominal: 0.138 * 25.4, pitch: 25.4 / 32, system: "imperial" },
  { value: "8-32-unc", label: "#8-32 UNC", nominal: 0.164 * 25.4, pitch: 25.4 / 32, system: "imperial" },
  { value: "10-24-unc", label: "#10-24 UNC", nominal: 0.190 * 25.4, pitch: 25.4 / 24, system: "imperial" },
  { value: "10-32-unf", label: "#10-32 UNF", nominal: 0.190 * 25.4, pitch: 25.4 / 32, system: "imperial" },
  { value: "1-4-20-unc", label: "1/4-20 UNC", nominal: 0.25 * 25.4, pitch: 25.4 / 20, system: "imperial" },
  { value: "1-4-28-unf", label: "1/4-28 UNF", nominal: 0.25 * 25.4, pitch: 25.4 / 28, system: "imperial" },
  { value: "5-16-18-unc", label: "5/16-18 UNC", nominal: 0.3125 * 25.4, pitch: 25.4 / 18, system: "imperial" },
  { value: "3-8-16-unc", label: "3/8-16 UNC", nominal: 0.375 * 25.4, pitch: 25.4 / 16, system: "imperial" },
  { value: "1-2-13-unc", label: "1/2-13 UNC", nominal: 0.5 * 25.4, pitch: 25.4 / 13, system: "imperial" },
];

export function TapDrillSolver() {
  const [thread, setThread] = useState("m6-1.0");
  const [engagement, setEngagement] = useState(75); // %

  const t = THREADS.find((x) => x.value === thread)!;
  // Metric formula: Drill = D - (P × %eng/100 × 1.08253)  [approximates 60° thread form]
  // Simpler: Minor Ø ≈ D - 1.0825 * P, and adjust for % engagement
  const minorFull = t.nominal - 1.0825 * t.pitch;
  const drillMm = t.nominal - 1.0825 * t.pitch * (engagement / 100);
  const drillIn = drillMm / 25.4;

  return (
    <SolverShell title="Tap Drill Calculator" category="Machining" formula="Drill Ø ≈ Nominal − (1.0825 × pitch × %engagement)">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold mb-3">Thread</h2>
          <div className="space-y-3">
            <Select label="Thread size" value={thread} onChange={setThread} options={THREADS} />
            <Input label="% thread engagement" unit="%" value={engagement} onChange={setEngagement} min={50} max={100} />
            <div className="text-xs text-slate-500 pt-1">75% is standard (75% of theoretical thread depth). 60% is common for hard materials to reduce tap torque. 100% = full thread, requires precision drilling.</div>
          </div>
        </Card>
        <div className="space-y-3">
          <Result label="Recommended drill Ø" value={drillMm.toFixed(3)} unit="mm" />
          <Result label="Drill Ø (imperial)" value={drillIn.toFixed(4)} unit="in" />
          <Card>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Thread reference</div>
            <div className="text-xs font-mono space-y-1">
              <div>Nominal Ø = {t.nominal.toFixed(3)} mm ({(t.nominal / 25.4).toFixed(4)} in)</div>
              <div>Pitch = {t.pitch.toFixed(3)} mm ({(25.4 / t.pitch).toFixed(1)} TPI)</div>
              <div>Full minor Ø (100% thread) = {minorFull.toFixed(3)} mm</div>
              <div className="text-slate-500 pt-1">For blind holes, drill 1-2 pitches deeper than thread depth to allow chip clearance. Peck-drill in soft materials.</div>
            </div>
          </Card>
        </div>
      </div>
    </SolverShell>
  );
}
