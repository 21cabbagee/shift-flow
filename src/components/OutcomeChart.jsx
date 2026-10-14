import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Zap, DollarSign, CheckCircle2, Car, Fuel } from 'lucide-react';

/**
 * OutcomeChart for ShiftFlow (Bklit UI + Julien Bek $1:$6 Sequoia Framework + Larry Ellison ROI Engine)
 * Compares predatory microfinance loan sharks & manual debt recovery ($6 human collections) with Autonomous Closed-Loop Source Splitters ($1 software).
 */
export default function OutcomeChart({
  serviceName = "Fleet Driver Fuel Advances & Micro-Insurance",
  defaultFleetDrivers = 400,
  onCtaClick
}) {
  const [drivers, setDrivers] = useState(defaultFleetDrivers);
  
  // Traditional loan collection agencies & driver downtime costs ~$190/mo per active driver
  const legacyCostPerDriver = 190;
  const legacyTotalExpense = drivers * legacyCostPerDriver;

  // ShiftFlow closed-loop software cost is $22/mo per active driver
  const shiftFlowSoftwareCost = drivers * 22;
  const netFleetSavings = legacyTotalExpense - shiftFlowSoftwareCost;
  const savingsPercent = Math.round(((legacyTotalExpense - shiftFlowSoftwareCost) / legacyTotalExpense) * 100);

  const maxCost = Math.max(legacyTotalExpense, 1);
  const legacyBarHeight = 100;
  const autoBarHeight = Math.max(Math.round((shiftFlowSoftwareCost / maxCost) * 100), 12);

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border bg-slate-950 border-orange-500/30 text-orange-400">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping"></span>
            The Sequoia Equation: Software ($1) vs Debt Collectors ($6)
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Fleet Margin Economics: <span className="text-orange-400">{savingsPercent}% Overhead Elimination</span>
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Legacy fleet credit relies on high-interest loan agents and repossession squads. We replace the entire $6 human collections apparatus with a 15% automated source-deduction webhook on every trip.
          </p>
        </div>

        <div className="text-right bg-slate-950/60 border border-slate-800 rounded-xl p-3 px-4 min-w-[190px]">
          <span className="text-[11px] text-slate-400 block font-medium">Monthly Fleet Savings</span>
          <span className="text-2xl md:text-3xl font-black text-orange-400">
            ${netFleetSavings.toLocaleString()}
          </span>
          <span className="text-[10px] text-amber-400/80 flex items-center justify-end gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> 0% Unpaid Defaults
          </span>
        </div>
      </div>

      {/* Interactive Volume Slider */}
      <div className="py-6 border-b border-slate-800">
        <div className="flex items-center justify-between text-sm mb-3">
          <label className="text-slate-300 font-semibold flex items-center gap-2">
            <Car className="w-4 h-4 text-orange-400" />
            Active Fleet Vehicle Count:
          </label>
          <span className="text-base font-bold text-white bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
            {drivers.toLocaleString()} Drivers ($10k+ Daily Payout Volume)
          </span>
        </div>
        <input 
          type="range" 
          min={50} 
          max={2500} 
          step={50}
          value={drivers}
          onChange={(e) => setDrivers(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-400"
        />
        <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
          <span>50 Drivers (Mid-Fleet)</span>
          <span>500 Drivers (Regional Depot)</span>
          <span>2,500+ Drivers (Tier-1 Ride-Hailing Partner)</span>
        </div>
      </div>

      {/* Bklit UI Visual Comparison Chart & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
        {/* SVG Visual Bars */}
        <div className="md:col-span-5 bg-slate-950/70 rounded-xl p-5 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Monthly Fleet Cost Burden</span>
            <span className="text-[10px] text-slate-500">Manual vs Closed-Loop</span>
          </div>

          <div className="space-y-4">
            {/* Legacy Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Loan Sharks + Idle Shift Losses ($6 Layer)
                </span>
                <span className="font-mono font-bold text-rose-300">${legacyTotalExpense.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden border border-rose-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300 rounded-lg"
                  style={{ width: `${legacyBarHeight}%` }}
                />
              </div>
            </div>

            {/* Autonomous Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-orange-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  ShiftFlow Programmatic Splitter ($1 Layer)
                </span>
                <span className="font-mono font-bold text-orange-300">${shiftFlowSoftwareCost.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden border border-orange-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300 rounded-lg shadow-lg shadow-orange-500/30"
                  style={{ width: `${autoBarHeight}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Annual Bottom-Line Recovery:</span>
            <span className="text-sm font-bold text-orange-400 font-mono">+${(netFleetSavings * 12).toLocaleString()}</span>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="md:col-span-7 space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
              <Fuel className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Closed-Loop Station QR Fuel Wallets</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Advances cannot be diverted to cash gambling. Fuel balances unlock exclusively via merchant QR codes at TotalEnergies, Shell, and Rubis stations.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Programmatic 15% Platform Deduction</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every fare completed deducts pennies at the API source until the advance is settled. Zero phone calls, zero human collection agency fees.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Real-Time Telematics Credit Engine</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Credit limits automatically expand as drivers log more safe hours and maintain low cancellation metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
