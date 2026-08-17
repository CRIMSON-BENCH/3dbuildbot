"use client";
import { useState, useMemo } from "react";
import { SolverShell, Card } from "@/components/SolverShell";

type Category = "length" | "mass" | "force" | "pressure" | "temperature" | "torque" | "power" | "area" | "volume" | "velocity" | "energy";

// Each entry: [label, factor-from-SI-base]. Convert: value_in_unit = value_in_SI / factor.
// For temperature we handle specially.
const UNITS: Record<Category, { label: string; factor: number }[]> = {
  length: [
    { label: "meters (m)", factor: 1 },
    { label: "millimeters (mm)", factor: 1000 },
    { label: "centimeters (cm)", factor: 100 },
    { label: "kilometers (km)", factor: 0.001 },
    { label: "inches (in)", factor: 39.3701 },
    { label: "feet (ft)", factor: 3.28084 },
    { label: "yards (yd)", factor: 1.09361 },
    { label: "miles (mi)", factor: 0.000621371 },
    { label: "mils (thou)", factor: 39370.1 },
    { label: "micrometers (µm)", factor: 1e6 },
  ],
  mass: [
    { label: "kilograms (kg)", factor: 1 },
    { label: "grams (g)", factor: 1000 },
    { label: "milligrams (mg)", factor: 1e6 },
    { label: "pounds-mass (lbm)", factor: 2.20462 },
    { label: "ounces (oz)", factor: 35.274 },
    { label: "short tons (US)", factor: 0.00110231 },
    { label: "metric tons (t)", factor: 0.001 },
    { label: "slugs", factor: 0.0685218 },
  ],
  force: [
    { label: "newtons (N)", factor: 1 },
    { label: "kilonewtons (kN)", factor: 0.001 },
    { label: "pounds-force (lbf)", factor: 0.224809 },
    { label: "kilogram-force (kgf)", factor: 0.101972 },
    { label: "kips (1000 lbf)", factor: 0.000224809 },
    { label: "dynes", factor: 100000 },
  ],
  pressure: [
    { label: "pascals (Pa)", factor: 1 },
    { label: "kilopascals (kPa)", factor: 0.001 },
    { label: "megapascals (MPa / N/mm²)", factor: 1e-6 },
    { label: "PSI (lbf/in²)", factor: 0.000145038 },
    { label: "KSI (1000 psi)", factor: 1.45038e-7 },
    { label: "bar", factor: 1e-5 },
    { label: "atmospheres (atm)", factor: 9.86923e-6 },
    { label: "torr / mmHg", factor: 0.00750062 },
    { label: "inches of water (inH₂O)", factor: 0.004014 },
  ],
  temperature: [
    { label: "Celsius (°C)", factor: 1 }, // handled specially
    { label: "Kelvin (K)", factor: 1 },
    { label: "Fahrenheit (°F)", factor: 1 },
    { label: "Rankine (°R)", factor: 1 },
  ],
  torque: [
    { label: "newton-meters (N·m)", factor: 1 },
    { label: "kilogram-force-meters (kgf·m)", factor: 0.101972 },
    { label: "pound-feet (lbf·ft)", factor: 0.737562 },
    { label: "pound-inches (lbf·in)", factor: 8.85075 },
    { label: "ounce-inches (oz·in)", factor: 141.612 },
  ],
  power: [
    { label: "watts (W)", factor: 1 },
    { label: "kilowatts (kW)", factor: 0.001 },
    { label: "horsepower (hp, mech)", factor: 0.00134102 },
    { label: "BTU/hour", factor: 3.41214 },
    { label: "foot-lb/second", factor: 0.737562 },
  ],
  area: [
    { label: "square meters (m²)", factor: 1 },
    { label: "square millimeters (mm²)", factor: 1e6 },
    { label: "square inches (in²)", factor: 1550.0031 },
    { label: "square feet (ft²)", factor: 10.7639 },
    { label: "acres", factor: 0.000247105 },
    { label: "hectares", factor: 0.0001 },
  ],
  volume: [
    { label: "cubic meters (m³)", factor: 1 },
    { label: "liters (L)", factor: 1000 },
    { label: "cubic centimeters (cm³ / mL)", factor: 1e6 },
    { label: "cubic inches (in³)", factor: 61023.7 },
    { label: "cubic feet (ft³)", factor: 35.3147 },
    { label: "US gallons", factor: 264.172 },
    { label: "UK gallons", factor: 219.969 },
  ],
  velocity: [
    { label: "m/s", factor: 1 },
    { label: "km/h", factor: 3.6 },
    { label: "mph", factor: 2.23694 },
    { label: "ft/s", factor: 3.28084 },
    { label: "knots", factor: 1.94384 },
  ],
  energy: [
    { label: "joules (J)", factor: 1 },
    { label: "kilojoules (kJ)", factor: 0.001 },
    { label: "calories (cal)", factor: 0.239006 },
    { label: "kilocalories (kcal)", factor: 0.000239006 },
    { label: "BTU", factor: 0.000947817 },
    { label: "watt-hours (Wh)", factor: 0.000277778 },
    { label: "electron volts (eV)", factor: 6.242e18 },
  ],
};

function convertTemperature(v: number, from: string, to: string): number {
  // Normalize to Kelvin
  let K = v;
  if (from === "Celsius (°C)") K = v + 273.15;
  else if (from === "Kelvin (K)") K = v;
  else if (from === "Fahrenheit (°F)") K = (v - 32) * (5 / 9) + 273.15;
  else if (from === "Rankine (°R)") K = v * (5 / 9);

  if (to === "Celsius (°C)") return K - 273.15;
  if (to === "Kelvin (K)") return K;
  if (to === "Fahrenheit (°F)") return (K - 273.15) * (9 / 5) + 32;
  if (to === "Rankine (°R)") return K * (9 / 5);
  return K;
}

export function UnitConverterSolver() {
  const [cat, setCat] = useState<Category>("length");
  const [value, setValue] = useState(1);
  const [fromU, setFromU] = useState<string>(UNITS.length[0].label);
  const [toU, setToU] = useState<string>(UNITS.length[3].label);

  const result = useMemo(() => {
    if (cat === "temperature") return convertTemperature(value, fromU, toU);
    const fromF = UNITS[cat].find((u) => u.label === fromU)?.factor ?? 1;
    const toF = UNITS[cat].find((u) => u.label === toU)?.factor ?? 1;
    // Value_SI = value / fromF; result = Value_SI * toF
    return (value / fromF) * toF;
  }, [cat, value, fromU, toU]);

  function changeCat(c: Category) {
    setCat(c);
    setFromU(UNITS[c][0].label);
    setToU(UNITS[c][Math.min(3, UNITS[c].length - 1)].label);
  }

  return (
    <SolverShell title="Engineering Unit Converter" category="Math" formula="1 in = 25.4 mm · 1 PSI = 6894.76 Pa · 1 lbf = 4.448 N">
      <Card>
        <div className="flex flex-wrap gap-1 mb-4">
          {(Object.keys(UNITS) as Category[]).map((c) => (
            <button key={c} onClick={() => changeCat(c)} className={`text-xs px-3 py-1.5 rounded-md ${cat === c ? "bg-brand-600 text-white" : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
              {c[0].toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-3 items-end">
          <label className="block sm:col-span-1">
            <span className="text-xs font-medium">Value</span>
            <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} step="any" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-lg font-mono text-right" />
          </label>
          <label className="block sm:col-span-1">
            <span className="text-xs font-medium">From</span>
            <select value={fromU} onChange={(e) => setFromU(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
              {UNITS[cat].map((u) => <option key={u.label} value={u.label}>{u.label}</option>)}
            </select>
          </label>
          <label className="block sm:col-span-1">
            <span className="text-xs font-medium">To</span>
            <select value={toU} onChange={(e) => setToU(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
              {UNITS[cat].map((u) => <option key={u.label} value={u.label}>{u.label}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-6 rounded-xl bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 p-6 text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300">Result</div>
          <div className="mt-2 text-4xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">{result.toLocaleString(undefined, { maximumFractionDigits: 8, minimumFractionDigits: 0 })}</div>
          <div className="mt-1 text-xs font-mono text-slate-500">{toU}</div>
        </div>
      </Card>
    </SolverShell>
  );
}
