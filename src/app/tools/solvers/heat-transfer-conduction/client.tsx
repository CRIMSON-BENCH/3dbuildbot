"use client";
import { useState, useMemo } from "react";
import { SolverShell, Input, Select, Result, Card } from "@/components/SolverShell";

// k in W/(m·K)
const MATS = [
  { value: "copper", label: "Copper", k: 401 },
  { value: "aluminum", label: "Aluminum", k: 237 },
  { value: "brass", label: "Brass", k: 109 },
  { value: "steel-mild", label: "Mild Steel", k: 50 },
  { value: "stainless-304", label: "Stainless 304", k: 16 },
  { value: "titanium", label: "Titanium", k: 22 },
  { value: "concrete", label: "Concrete", k: 1.4 },
  { value: "glass", label: "Glass", k: 1.0 },
  { value: "brick", label: "Brick", k: 0.72 },
  { value: "wood-oak", label: "Wood (oak)", k: 0.17 },
  { value: "gypsum", label: "Gypsum board", k: 0.17 },
  { value: "pla", label: "PLA plastic", k: 0.13 },
  { value: "pc", label: "Polycarbonate", k: 0.20 },
  { value: "peek", label: "PEEK", k: 0.25 },
  { value: "fiberglass", label: "Fiberglass insulation", k: 0.040 },
  { value: "polyurethane-foam", label: "Polyurethane foam", k: 0.024 },
  { value: "vacuum-panel", label: "Vacuum insulation panel", k: 0.005 },
  { value: "air-still", label: "Still air", k: 0.026 },
];

export function ConductionSolver() {
  const [mat, setMat] = useState("aluminum");
  const [A, setA] = useState(0.1); // m²
  const [thickness, setThickness] = useState(10); // mm
  const [T1, setT1] = useState(100); // °C
  const [T2, setT2] = useState(20); // °C

  const m = MATS.find((x) => x.value === mat)!;
  const L_m = thickness / 1000;
  const dT = T1 - T2;
  const q = (m.k * A * dT) / L_m; // W
  const flux = q / A; // W/m²
  const R = L_m / (m.k * A); // K/W

  return (
    <SolverShell title="1D Heat Conduction" category="Thermal" formula="q = k · A · ΔT / L · R = L / (kA)">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold mb-3">Inputs</h2>
          <div className="space-y-3">
            <Select label="Wall material" value={mat} onChange={setMat} options={MATS} />
            <Input label="Cross-sectional area A" unit="m²" value={A} onChange={setA} step={0.01} />
            <Input label="Wall thickness L" unit="mm" value={thickness} onChange={setThickness} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Hot side T₁" unit="°C" value={T1} onChange={setT1} />
              <Input label="Cold side T₂" unit="°C" value={T2} onChange={setT2} />
            </div>
          </div>
        </Card>
        <div className="space-y-3">
          <Result label="Heat rate q" value={q.toFixed(2)} unit="W" />
          <Result label="Heat flux q″" value={flux.toFixed(1)} unit="W/m²" />
          <Result label="Thermal resistance R" value={R.toFixed(4)} unit="K/W" />
          <Card>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Properties</div>
            <div className="text-xs font-mono space-y-1">
              <div>k = {m.k} W/(m·K)</div>
              <div>ΔT = {dT} K</div>
              <div>R-value (US, ft²·°F·h/BTU) = {(R * A * 5.678).toFixed(2)}</div>
            </div>
          </Card>
        </div>
      </div>
    </SolverShell>
  );
}
