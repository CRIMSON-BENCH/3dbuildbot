"use client";
import { useState, useMemo } from "react";
import { SolverShell, Input, Select, Result, Card } from "@/components/SolverShell";

const K_ENDS = [
  { value: "1", label: "K = 1.0 · Pinned-Pinned (both ends)" },
  { value: "0.5", label: "K = 0.5 · Fixed-Fixed" },
  { value: "0.7", label: "K = 0.7 · Fixed-Pinned" },
  { value: "2.0", label: "K = 2.0 · Fixed-Free (cantilever column)" },
];

const MATS = [
  { value: "al-6061", label: "Aluminum 6061", E: 68900, sy: 276 },
  { value: "al-7075", label: "Aluminum 7075", E: 71700, sy: 503 },
  { value: "steel-1018", label: "Mild Steel 1018", E: 200000, sy: 370 },
  { value: "4140", label: "4140 Steel", E: 200000, sy: 655 },
  { value: "ss-304", label: "Stainless 304", E: 193000, sy: 215 },
  { value: "ti-64", label: "Ti-6Al-4V", E: 113800, sy: 880 },
  { value: "pla", label: "PLA (3DP)", E: 3500, sy: 60 },
  { value: "pa12", label: "PA12 Nylon", E: 1650, sy: 48 },
];

export function BucklingSolver() {
  const [K, setK] = useState("1");
  const [L, setL] = useState(500); // mm
  const [mat, setMat] = useState("al-6061");
  const [d, setD] = useState(15); // outer Ø
  const [di, setDi] = useState(0); // inner Ø (0 = solid)

  const m = MATS.find((x) => x.value === mat)!;
  const I = (Math.PI * (d ** 4 - di ** 4)) / 64;
  const A = (Math.PI * (d ** 2 - di ** 2)) / 4;
  const r = Math.sqrt(I / A); // radius of gyration
  const KL_r = (Number(K) * L) / r;

  const P_cr_euler = (Math.PI ** 2 * m.E * I) / ((Number(K) * L) ** 2); // N
  const Cc = Math.PI * Math.sqrt((2 * m.E) / m.sy);
  const useJohnson = KL_r < Cc;
  const johnsonP = A * m.sy * (1 - (m.sy * KL_r ** 2) / (4 * Math.PI ** 2 * m.E));
  const critical = useJohnson ? johnsonP : P_cr_euler;
  const method = useJohnson ? "Johnson (short column)" : "Euler (slender column)";

  return (
    <SolverShell title="Column Buckling (Euler / Johnson)" category="Mechanics" formula="P_cr = π²EI / (KL)² · KL/r vs Cc = π√(2E/σ_y)">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold mb-3">Inputs</h2>
          <div className="space-y-3">
            <Select label="End conditions (effective length factor)" value={K} onChange={setK} options={K_ENDS} />
            <Input label="Column length L" unit="mm" value={L} onChange={setL} />
            <Select label="Material" value={mat} onChange={setMat} options={MATS} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Outer Ø" unit="mm" value={d} onChange={setD} />
              <Input label="Inner Ø (0 = solid)" unit="mm" value={di} onChange={setDi} />
            </div>
          </div>
        </Card>
        <div className="space-y-3">
          <Result label="Critical buckling load" value={(critical / 1000).toFixed(2)} unit="kN" tone={critical < 1000 ? "amber" : "brand"} />
          <Result label="Method used" value={method} />
          <Card>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Details</div>
            <div className="text-xs font-mono space-y-1">
              <div>KL/r = {KL_r.toFixed(1)} (slenderness ratio)</div>
              <div>Cc = {Cc.toFixed(1)} (critical slenderness)</div>
              <div>I = {I.toFixed(1)} mm⁴</div>
              <div>r = {r.toFixed(2)} mm</div>
              <div>Euler alone = {(P_cr_euler / 1000).toFixed(2)} kN</div>
              <div>Johnson alone = {(johnsonP / 1000).toFixed(2)} kN</div>
              <div className="text-slate-500 pt-1">Apply a safety factor (typically 2.5–4×) below the critical load in real designs.</div>
            </div>
          </Card>
        </div>
      </div>
    </SolverShell>
  );
}
