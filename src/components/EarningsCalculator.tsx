"use client";
import { useState, useMemo } from "react";

export function EarningsCalculator() {
  const [hourlyRate, setHourlyRate] = useState(75);
  const [currentUtilization, setCurrentUtilization] = useState(55);
  const [targetUtilization, setTargetUtilization] = useState(80);
  const [machineCount, setMachineCount] = useState(2);
  const [ourTake, setOurTake] = useState(30);

  const results = useMemo(() => {
    const workingHoursPerMonth = 160; // 8h × 5d × 4w
    const currentBillable = machineCount * workingHoursPerMonth * (currentUtilization / 100);
    const targetBillable = machineCount * workingHoursPerMonth * (targetUtilization / 100);
    const additionalHours = Math.max(0, targetBillable - currentBillable);
    const grossAdditional = additionalHours * hourlyRate;
    const ourFee = grossAdditional * (ourTake / 100);
    const yourNet = grossAdditional - ourFee;
    return { additionalHours, grossAdditional, yourNet, ourFee };
  }, [hourlyRate, currentUtilization, targetUtilization, machineCount, ourTake]);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Slider label="Your hourly rate (USD)" value={hourlyRate} onChange={setHourlyRate} min={20} max={300} step={5} suffix="/hr" />
        <Slider label="Number of machines" value={machineCount} onChange={setMachineCount} min={1} max={30} step={1} suffix="" />
        <Slider label="Current utilization %" value={currentUtilization} onChange={setCurrentUtilization} min={10} max={95} step={5} suffix="%" />
        <Slider label="Target utilization %" value={targetUtilization} onChange={setTargetUtilization} min={20} max={95} step={5} suffix="%" />
      </div>
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid sm:grid-cols-3 gap-3">
        <div className="rounded-lg bg-slate-50 dark:bg-slate-950 p-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500">Extra billable hours/mo</div>
          <div className="text-2xl font-semibold tabular-nums mt-1">{Math.round(results.additionalHours)}</div>
        </div>
        <div className="rounded-lg bg-slate-50 dark:bg-slate-950 p-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500">Gross additional revenue</div>
          <div className="text-2xl font-semibold tabular-nums mt-1">${Math.round(results.grossAdditional).toLocaleString()}</div>
        </div>
        <div className="rounded-lg bg-brand-50 dark:bg-brand-950/30 p-4 border border-brand-200 dark:border-brand-800">
          <div className="text-[11px] font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300">Your net take-home /mo</div>
          <div className="text-2xl font-semibold tabular-nums mt-1 text-brand-700 dark:text-brand-300">${Math.round(results.yourNet).toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">After 3DBuildBot's {ourTake}% fee</div>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 dark:text-slate-500">Estimates assume 160 machine-hours per month per unit at 8h × 5d × 4w. Real orders vary by material, complexity, and post-processing. Actual take-home reflects our 30% platform fee.</p>
    </div>
  );
}

function Slider({ label, value, onChange, min, max, step, suffix }: { label: string; value: number; onChange: (n: number) => void; min: number; max: number; step: number; suffix: string }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium">{label}</span>
        <span className="font-mono tabular-nums text-brand-600 dark:text-brand-400">{value}{suffix}</span>
      </div>
      <input type="range" value={value} onChange={(e) => onChange(Number(e.target.value))} min={min} max={max} step={step} className="mt-2 w-full accent-brand-600" />
    </label>
  );
}
