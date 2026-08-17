"use client";
import { useState, useMemo } from "react";
import { SolverShell, Input, Select, Result, Card } from "@/components/SolverShell";

// CTE (α) in µm/(m·K), and E in MPa
const MATERIALS = [
  { value: "aluminum-6061", label: "Aluminum 6061", alpha: 23.6, E: 68900 },
  { value: "aluminum-7075", label: "Aluminum 7075", alpha: 23.2, E: 71700 },
  { value: "steel-1018", label: "Mild Steel (1018)", alpha: 11.7, E: 200000 },
  { value: "4140-steel", label: "4140 Steel", alpha: 12.3, E: 200000 },
  { value: "stainless-304", label: "Stainless 304", alpha: 17.3, E: 193000 },
  { value: "stainless-316", label: "Stainless 316", alpha: 16.0, E: 193000 },
  { value: "titanium-64", label: "Titanium Ti-6Al-4V", alpha: 8.6, E: 113800 },
  { value: "titanium-cp", label: "Titanium Grade 2 (CP)", alpha: 8.6, E: 105000 },
  { value: "invar", label: "Invar 36", alpha: 1.2, E: 141000 },
  { value: "kovar", label: "Kovar", alpha: 5.5, E: 138000 },
  { value: "copper", label: "Copper C110", alpha: 17.0, E: 117000 },
  { value: "brass-260", label: "Brass 260", alpha: 19.9, E: 110000 },
  { value: "inconel-718", label: "Inconel 718", alpha: 13.0, E: 200000 },
  { value: "tungsten", label: "Tungsten", alpha: 4.5, E: 411000 },
  { value: "pla", label: "PLA", alpha: 68, E: 3500 },
  { value: "abs", label: "ABS", alpha: 90, E: 2300 },
  { value: "pc", label: "Polycarbonate", alpha: 65, E: 2400 },
  { value: "pa12", label: "PA12 Nylon", alpha: 100, E: 1650 },
  { value: "pa-cf", label: "PA-CF Carbon-Fiber Nylon", alpha: 26, E: 4700 },
  { value: "peek", label: "PEEK", alpha: 47, E: 3600 },
  { value: "delrin", label: "Delrin / POM-C", alpha: 122, E: 3100 },
  { value: "glass-fused-silica", label: "Fused Silica Glass", alpha: 0.55, E: 73000 },
  { value: "carbon-fiber-composite", label: "Carbon Fiber Composite (0°)", alpha: -0.5, E: 130000 },
  { value: "concrete", label: "Concrete", alpha: 11, E: 30000 },
];

export function ThermalExpansionSolver() {
  const [mat, setMat] = useState("aluminum-6061");
  const [L, setL] = useState(1000); // mm
  const [T1, setT1] = useState(20); // °C
  const [T2, setT2] = useState(120); // °C
  const [constrained, setConstrained] = useState(false);

  const material = MATERIALS.find((m) => m.value === mat)!;
  const { deltaL, thermalStrain, thermalStress } = useMemo(() => {
    const dT = T2 - T1;
    // α in µm/(m·K) → convert: strain = α × 1e-6 × dT
    const strain = material.alpha * 1e-6 * dT;
    const dL = strain * L; // mm
    const stress = constrained ? -material.E * strain : 0; // if constrained, opposite sign
    return { deltaL: dL, thermalStrain: strain, thermalStress: stress };
  }, [material, L, T1, T2, constrained]);

  return (
    <SolverShell title="Thermal Expansion" category="Thermal" formula="ΔL = α · L₀ · ΔT · σ_thermal = −E · α · ΔT (constrained)">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold mb-3">Inputs</h2>
          <div className="space-y-3">
            <Select label="Material" value={mat} onChange={setMat} options={MATERIALS} />
            <Input label="Initial length L₀" unit="mm" value={L} onChange={setL} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Start temp T₁" unit="°C" value={T1} onChange={setT1} />
              <Input label="Final temp T₂" unit="°C" value={T2} onChange={setT2} />
            </div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={constrained} onChange={(e) => setConstrained(e.target.checked)} /> <span>Rigidly constrained (compute thermal stress)</span></label>
          </div>
        </Card>
        <div className="space-y-3">
          <Result label="Length change ΔL" value={deltaL.toFixed(3)} unit="mm" tone={Math.abs(deltaL) > 1 ? "amber" : "brand"} />
          <Result label="Thermal strain ε" value={(thermalStrain * 1e6).toFixed(1)} unit="µε (×10⁻⁶)" />
          {constrained && <Result label="Constrained thermal stress σ" value={thermalStress.toFixed(2)} unit="MPa" tone={Math.abs(thermalStress) > 250 ? "red" : "amber"} />}
          <Card>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Reference</div>
            <div className="text-xs font-mono space-y-1">
              <div>α = {material.alpha} µm/(m·K)</div>
              <div>E = {material.E.toLocaleString()} MPa</div>
              <div>ΔT = {T2 - T1} K</div>
              <div className="text-slate-500 pt-1">ΔL is positive for heating. Negative CTE materials (some carbon composites) contract on heating in the fiber direction.</div>
            </div>
          </Card>
        </div>
      </div>
    </SolverShell>
  );
}
