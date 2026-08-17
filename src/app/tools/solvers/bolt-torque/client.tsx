"use client";
import { useState, useMemo } from "react";
import { SolverShell, Input, Select, Result, Card } from "@/components/SolverShell";

// Nominal diameter in mm and proof load in kN by grade
const BOLTS = [
  { value: "m4-8.8", label: "M4 · 8.8", d: 4, proof: 2.4, ultimate: 3.4 },
  { value: "m5-8.8", label: "M5 · 8.8", d: 5, proof: 3.9, ultimate: 5.6 },
  { value: "m6-8.8", label: "M6 · 8.8", d: 6, proof: 5.5, ultimate: 7.9 },
  { value: "m6-10.9", label: "M6 · 10.9", d: 6, proof: 7.8, ultimate: 11.6 },
  { value: "m8-8.8", label: "M8 · 8.8", d: 8, proof: 10, ultimate: 14.5 },
  { value: "m8-10.9", label: "M8 · 10.9", d: 8, proof: 14.3, ultimate: 21.2 },
  { value: "m8-12.9", label: "M8 · 12.9", d: 8, proof: 17.1, ultimate: 24.9 },
  { value: "m10-8.8", label: "M10 · 8.8", d: 10, proof: 15.9, ultimate: 23 },
  { value: "m10-10.9", label: "M10 · 10.9", d: 10, proof: 22.6, ultimate: 33.7 },
  { value: "m10-12.9", label: "M10 · 12.9", d: 10, proof: 27.1, ultimate: 39.4 },
  { value: "m12-8.8", label: "M12 · 8.8", d: 12, proof: 23.2, ultimate: 33.4 },
  { value: "m12-10.9", label: "M12 · 10.9", d: 12, proof: 32.9, ultimate: 49 },
  { value: "m12-12.9", label: "M12 · 12.9", d: 12, proof: 39.4, ultimate: 57.3 },
  { value: "m16-8.8", label: "M16 · 8.8", d: 16, proof: 43.4, ultimate: 62.5 },
  { value: "m16-10.9", label: "M16 · 10.9", d: 16, proof: 61.5, ultimate: 91.5 },
  { value: "m20-8.8", label: "M20 · 8.8", d: 20, proof: 67.7, ultimate: 97.7 },
  { value: "1-4-grade5", label: "1/4-20 · Gr 5", d: 6.35, proof: 5, ultimate: 7.4 },
  { value: "1-4-grade8", label: "1/4-20 · Gr 8", d: 6.35, proof: 7.1, ultimate: 10.4 },
  { value: "5-16-grade5", label: "5/16-18 · Gr 5", d: 7.94, proof: 8.2, ultimate: 12 },
  { value: "5-16-grade8", label: "5/16-18 · Gr 8", d: 7.94, proof: 11.6, ultimate: 17 },
  { value: "3-8-grade5", label: "3/8-16 · Gr 5", d: 9.53, proof: 12.2, ultimate: 17.9 },
  { value: "3-8-grade8", label: "3/8-16 · Gr 8", d: 9.53, proof: 17.3, ultimate: 25.3 },
  { value: "1-2-grade5", label: "1/2-13 · Gr 5", d: 12.7, proof: 22.5, ultimate: 32.9 },
  { value: "1-2-grade8", label: "1/2-13 · Gr 8", d: 12.7, proof: 31.8, ultimate: 46.5 },
];

const K_FACTORS = [
  { value: 0.20, label: "K = 0.20 (dry, as-received steel)" },
  { value: 0.18, label: "K = 0.18 (plated / zinc)" },
  { value: 0.15, label: "K = 0.15 (light oil / anti-seize)" },
  { value: 0.12, label: "K = 0.12 (moly / graphite lube)" },
];

export function BoltTorqueSolver() {
  const [bolt, setBolt] = useState("m8-10.9");
  const [K, setK] = useState(0.20);
  const [preloadPct, setPreloadPct] = useState(75); // % of proof

  const b = BOLTS.find((x) => x.value === bolt)!;
  const F = (b.proof * 1000) * (preloadPct / 100); // N
  const T_Nm = (K * b.d * F) / 1000; // N·m (d in mm → /1000)
  const T_lbft = T_Nm * 0.7376;
  const T_inlb = T_Nm * 8.851;

  return (
    <SolverShell title="Bolt Torque Calculator" category="Mechanics" formula="T = K · D · F (F = preload target)">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold mb-3">Fastener & lubrication</h2>
          <div className="space-y-3">
            <Select label="Bolt size & grade" value={bolt} onChange={setBolt} options={BOLTS} />
            <Select label="Nut factor K (lubrication)" value={String(K)} onChange={(v) => setK(Number(v))} options={K_FACTORS.map((k) => ({ value: String(k.value), label: k.label }))} />
            <Input label="Target preload (% of proof load)" unit="%" value={preloadPct} onChange={setPreloadPct} min={10} max={100} />
          </div>
        </Card>
        <div className="space-y-3">
          <Result label="Torque" value={T_Nm.toFixed(1)} unit="N·m" />
          <Result label="Torque (ft·lb)" value={T_lbft.toFixed(1)} unit="ft·lb" />
          <Result label="Torque (in·lb)" value={T_inlb.toFixed(0)} unit="in·lb" />
          <Card>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Preload details</div>
            <div className="text-xs font-mono space-y-1">
              <div>Target preload F = {(F / 1000).toFixed(2)} kN</div>
              <div>Bolt proof load = {b.proof} kN</div>
              <div>Bolt ultimate = {b.ultimate} kN</div>
              <div>Ø nominal = {b.d} mm</div>
              <div className="text-slate-500 pt-1">±25% preload scatter typical. Torque-turn or hydraulic tensioning for critical joints. Always follow manufacturer torque spec if provided.</div>
            </div>
          </Card>
        </div>
      </div>
    </SolverShell>
  );
}
