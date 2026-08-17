"use client";
import { useState, useMemo } from "react";
import { SolverShell, Input, Select, Result, Card } from "@/components/SolverShell";

// ρ in kg/m³, μ in Pa·s (at ~20°C)
const FLUIDS = [
  { value: "water", label: "Water (20°C)", rho: 998, mu: 1.002e-3 },
  { value: "water-100c", label: "Water (100°C)", rho: 958, mu: 0.282e-3 },
  { value: "air", label: "Air (20°C)", rho: 1.204, mu: 1.825e-5 },
  { value: "air-hot", label: "Air (200°C)", rho: 0.746, mu: 2.577e-5 },
  { value: "oil-sae-10", label: "SAE 10W Oil (40°C)", rho: 875, mu: 0.038 },
  { value: "oil-sae-30", label: "SAE 30 Oil (40°C)", rho: 880, mu: 0.10 },
  { value: "glycerin", label: "Glycerin (20°C)", rho: 1261, mu: 1.4 },
  { value: "ethanol", label: "Ethanol (20°C)", rho: 789, mu: 1.2e-3 },
  { value: "argon", label: "Argon (20°C)", rho: 1.66, mu: 2.23e-5 },
  { value: "nitrogen", label: "Nitrogen (20°C)", rho: 1.165, mu: 1.76e-5 },
];

export function ReynoldsSolver() {
  const [fluid, setFluid] = useState("water");
  const [V, setV] = useState(2); // m/s
  const [D, setD] = useState(50); // mm
  const [customRho, setCustomRho] = useState(998);
  const [customMu, setCustomMu] = useState(1e-3);
  const [useCustom, setUseCustom] = useState(false);

  const f = FLUIDS.find((x) => x.value === fluid)!;
  const rho = useCustom ? customRho : f.rho;
  const mu = useCustom ? customMu : f.mu;
  const Re = (rho * V * (D / 1000)) / mu;

  const regime = Re < 2300 ? "Laminar" : Re < 4000 ? "Transitional" : "Turbulent";
  const tone = Re < 2300 ? "brand" : Re < 4000 ? "amber" : "red";

  return (
    <SolverShell title="Reynolds Number" category="Fluid Dynamics" formula="Re = ρVD/μ · Laminar < 2300 · Turbulent > 4000">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold mb-3">Flow inputs</h2>
          <div className="space-y-3">
            <Select label="Fluid" value={fluid} onChange={setFluid} options={FLUIDS} />
            <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={useCustom} onChange={(e) => setUseCustom(e.target.checked)} /> <span>Override with custom ρ and µ</span></label>
            {useCustom && (
              <div className="grid grid-cols-2 gap-3">
                <Input label="Custom ρ" unit="kg/m³" value={customRho} onChange={setCustomRho} />
                <Input label="Custom µ" unit="Pa·s" value={customMu} onChange={setCustomMu} step={0.0001} />
              </div>
            )}
            <Input label="Velocity V" unit="m/s" value={V} onChange={setV} step={0.1} />
            <Input label="Characteristic diameter D" unit="mm" value={D} onChange={setD} />
          </div>
        </Card>
        <div className="space-y-3">
          <Result label="Reynolds number" value={Re.toFixed(0)} tone={tone as "brand" | "amber" | "red"} />
          <Result label="Flow regime" value={regime} tone={tone as "brand" | "amber" | "red"} />
          <Card>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Fluid properties used</div>
            <div className="text-xs font-mono space-y-1">
              <div>ρ = {rho.toFixed(2)} kg/m³</div>
              <div>µ = {mu.toExponential(2)} Pa·s</div>
              <div>Kinematic ν = µ/ρ = {(mu / rho).toExponential(2)} m²/s</div>
            </div>
          </Card>
          <Card>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Regime rules of thumb</div>
            <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
              <div><b>Re &lt; 2300:</b> laminar — parabolic velocity profile, low pressure drop, predictable</div>
              <div><b>2300 &lt; Re &lt; 4000:</b> transitional — unpredictable, avoid in design</div>
              <div><b>Re &gt; 4000:</b> turbulent — mixed velocity, higher heat transfer, higher pressure drop</div>
            </div>
          </Card>
        </div>
      </div>
    </SolverShell>
  );
}
