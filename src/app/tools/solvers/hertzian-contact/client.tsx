"use client";
import { useState, useMemo } from "react";
import { SolverShell, Input, Select, Result, Card } from "@/components/SolverShell";

const MATS = [
  { value: "steel", label: "Steel (E=200 GPa, ν=0.30)", E: 200000, nu: 0.3 },
  { value: "aluminum", label: "Aluminum (E=70 GPa, ν=0.33)", E: 70000, nu: 0.33 },
  { value: "titanium", label: "Titanium (E=114 GPa, ν=0.34)", E: 114000, nu: 0.34 },
  { value: "ceramic", label: "Ceramic Si3N4 (E=310 GPa, ν=0.27)", E: 310000, nu: 0.27 },
  { value: "brass", label: "Brass (E=110 GPa, ν=0.34)", E: 110000, nu: 0.34 },
];

type Case = "sphere-flat" | "sphere-sphere" | "cyl-cyl-parallel";

export function HertzianSolver() {
  const [contactCase, setContactCase] = useState<Case>("sphere-flat");
  const [F, setF] = useState(100); // N
  const [R1, setR1] = useState(10); // mm
  const [R2, setR2] = useState(1e12); // mm (large = flat)
  const [L, setL] = useState(20); // mm (only used for cyl-cyl)
  const [m1, setM1] = useState("steel");
  const [m2, setM2] = useState("steel");

  const mat1 = MATS.find((m) => m.value === m1)!;
  const mat2 = MATS.find((m) => m.value === m2)!;

  const { pMax, contactArea, delta } = useMemo(() => {
    // Effective modulus
    const Estar = 1 / ((1 - mat1.nu ** 2) / mat1.E + (1 - mat2.nu ** 2) / mat2.E);
    if (contactCase === "sphere-flat" || contactCase === "sphere-sphere") {
      const Rprime = 1 / (1 / R1 + 1 / (contactCase === "sphere-flat" ? 1e12 : R2));
      const a = Math.cbrt((3 * F * Rprime) / (4 * Estar));
      const pMax = (3 * F) / (2 * Math.PI * a ** 2);
      const delta = a ** 2 / Rprime;
      return { pMax, contactArea: Math.PI * a ** 2, delta };
    } else {
      // cylinder-cylinder parallel axes → line contact
      const Rprime = 1 / (1 / R1 + 1 / R2);
      const halfWidth = Math.sqrt((4 * F * Rprime) / (Math.PI * L * Estar));
      const pMax = (2 * F) / (Math.PI * halfWidth * L);
      const delta = halfWidth ** 2 / (2 * Rprime); // rough
      return { pMax, contactArea: 2 * halfWidth * L, delta };
    }
  }, [contactCase, F, R1, R2, L, mat1, mat2]);

  return (
    <SolverShell title="Hertzian Contact Stress" category="Mechanics" formula="p_max = (3F)/(2πa²) sphere · a = ∛(3FR′/4E*)">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold mb-3">Contact geometry</h2>
          <div className="space-y-3">
            <Select label="Contact type" value={contactCase} onChange={setContactCase} options={[
              { value: "sphere-flat" as Case, label: "Sphere on flat" },
              { value: "sphere-sphere" as Case, label: "Sphere on sphere" },
              { value: "cyl-cyl-parallel" as Case, label: "Cylinder on cylinder (parallel axes)" },
            ]} />
            <Input label="Normal load F" unit="N" value={F} onChange={setF} />
            <Input label="Radius body 1" unit="mm" value={R1} onChange={setR1} />
            {(contactCase === "sphere-sphere" || contactCase === "cyl-cyl-parallel") && (
              <Input label="Radius body 2" unit="mm" value={R2} onChange={setR2} />
            )}
            {contactCase === "cyl-cyl-parallel" && (
              <Input label="Contact line length L" unit="mm" value={L} onChange={setL} />
            )}
            <div className="grid grid-cols-2 gap-3">
              <Select label="Body 1 material" value={m1} onChange={setM1} options={MATS} />
              <Select label="Body 2 material" value={m2} onChange={setM2} options={MATS} />
            </div>
          </div>
        </Card>
        <div className="space-y-3">
          <Result label="Max contact pressure p_max" value={pMax.toFixed(1)} unit="MPa" tone={pMax > 500 ? "red" : "brand"} />
          <Result label="Contact area (or line width × L)" value={contactArea.toFixed(3)} unit="mm²" />
          <Result label="Approach δ" value={(delta * 1000).toFixed(2)} unit="µm" />
          <Card>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Notes</div>
            <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
              <div>Compare p_max to material's yield stress in shear (~0.55 · σ_y) to check for plastic deformation.</div>
              <div>Sub-surface shear peak is at ~0.48a below the surface — this is where fatigue cracks nucleate.</div>
              <div>Rolling contact fatigue: allowable p_max ~4-5 GPa for hardened bearing steel, cyclic.</div>
            </div>
          </Card>
        </div>
      </div>
    </SolverShell>
  );
}
