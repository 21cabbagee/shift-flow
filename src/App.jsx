import React, { useState } from 'react';
import { 
  Zap, ShieldCheck, ArrowRight, CheckCircle2, AlertTriangle, 
  RefreshCw, Layers, DollarSign, Database, Activity, Smartphone,
  Bike, Car, Fuel, Wrench, HeartPulse, ChevronRight, X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState('underwriter'); // 'underwriter' | 'splitter' | 'insurance' | 'fleet_api'
  const [dailyEarnings, setDailyEarnings] = useState(45); // $45/day average
  const [driverPlatform, setDriverPlatform] = useState('GRAB'); // Grab, Yassir, Bolt, InDrive
  const [advanceAmount, setAdvanceAmount] = useState(25); // $25 fuel advance
  const [enableInsurance, setEnableInsurance] = useState(true); // $1/day takaful
  const [simActive, setSimActive] = useState(false);
  const [simTrips, setSimTrips] = useState([]);
  const [remainingBalance, setRemainingBalance] = useState(25);

  // CAB Modal
  const [cabModalOpen, setCabModalOpen] = useState(false);
  const [cabForm, setCabForm] = useState({ fleetName: '', contactEmail: '', driverCount: '1,000 - 5,000' });
  const [cabSubmitted, setCabSubmitted] = useState(false);

  const platforms = [
    { id: 'GRAB', name: 'Grab / GoTo (Southeast Asia)', currency: 'USD / IDR', feeRate: '15% split', type: 'Motorcycle & Delivery' },
    { id: 'YASSIR', name: 'Yassir (North Africa / Cairo / Algiers)', currency: 'USD / DZD', feeRate: '15% split', type: 'Ride-Hailing & Courier' },
    { id: 'BOLT', name: 'Bolt (Sub-Saharan Africa / Lagos)', currency: 'USD / NGN', feeRate: '15% split', type: 'Sedan & Moto Fleet' },
    { id: 'INDRIVE', name: 'InDrive Fleet Syndicate (LatAm)', currency: 'USD / MXN', feeRate: '15% split', type: 'Driver Cooperative' }
  ];

  const selectedPlatform = platforms.find(p => p.id === driverPlatform) || platforms[0];

  // Underwriting rule: Max advance is 30% of trailing 7-day average daily earnings
  const maxSafeCreditCap = Math.round(dailyEarnings * 0.30 * 7 * 0.25); // roughly ~50% of single day or 30% of weekly capacity
  const borrowingLimit = Math.max(15, Math.min(120, Math.round(dailyEarnings * 0.75)));
  const dailyFee = advanceAmount * 0.04; // 4% flat origination fee
  const insuranceFee = enableInsurance ? 1.00 : 0.00;
  const totalRepaymentTarget = advanceAmount + dailyFee + insuranceFee;

  const startTripSimulation = () => {
    setSimActive(true);
    setRemainingBalance(totalRepaymentTarget);
    setSimTrips([]);

    const tripFares = [12.50, 9.00, 16.00, 11.20, 14.80];
    let currentBalance = totalRepaymentTarget;
    let accumulated = [];

    tripFares.forEach((fare, idx) => {
      setTimeout(() => {
        const deduction = Math.min(currentBalance, fare * 0.15);
        currentBalance = Math.max(0, currentBalance - deduction);
        const netDriver = fare - deduction;

        accumulated.push({
          tripNumber: idx + 1,
          fare: fare.toFixed(2),
          deduction: deduction.toFixed(2),
          netDriver: netDriver.toFixed(2),
          remaining: currentBalance.toFixed(2),
          time: new Date().toLocaleTimeString()
        });

        setSimTrips([...accumulated]);
        setRemainingBalance(currentBalance);

        if (idx === tripFares.length - 1) {
          setSimActive(false);
          try {
            confetti({ particleCount: 75, spread: 60, origin: { y: 0.8 } });
          } catch (e) {}
        }
      }, (idx + 1) * 900);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-orange-500 selection:text-black">
      {/* Top Notification */}
      <div className="border-b border-orange-500/20 bg-orange-950/40 px-4 py-2 text-center text-xs font-medium text-orange-300">
        ⚡ <span className="font-semibold text-orange-200">ShiftFlow V1 Engine:</span> Closed-loop driver fuel advances & daily hospital cash deducted at source.
        <button onClick={() => setCabModalOpen(true)} className="ml-2 underline hover:text-white">Join 10-Fleet Design Partner Cohort (70% Fee Off)</button>
      </div>

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center font-black text-black text-lg shadow-lg shadow-orange-500/20">
              SF
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                ShiftFlow
                <span className="text-[10px] uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full font-semibold">Driver Fintech</span>
              </span>
              <p className="text-[11px] text-slate-400">Closed-Loop Payout-Deducted Credit</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <button onClick={() => setActiveTab('underwriter')} className={`hover:text-orange-400 transition ${activeTab === 'underwriter' ? 'text-orange-400 border-b-2 border-orange-400 pb-1' : ''}`}>Underwriting Engine</button>
            <button onClick={() => setActiveTab('splitter')} className={`hover:text-orange-400 transition ${activeTab === 'splitter' ? 'text-orange-400 border-b-2 border-orange-400 pb-1' : ''}`}>15% Source-Deduction Splitter</button>
            <button onClick={() => setActiveTab('insurance')} className={`hover:text-orange-400 transition ${activeTab === 'insurance' ? 'text-orange-400 border-b-2 border-orange-400 pb-1' : ''}`}>$1/Shift Micro-Insurance</button>
            <button onClick={() => setActiveTab('fleet_api')} className={`hover:text-orange-400 transition ${activeTab === 'fleet_api' ? 'text-orange-400 border-b-2 border-orange-400 pb-1' : ''}`}>Fleet Webhook API</button>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setCabModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-slate-950 font-semibold text-xs tracking-wide transition shadow-lg shadow-orange-500/25 flex items-center gap-1.5"
            >
              Fleet Operator Pilot
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            Bolt / Grab / Yassir Payout Webhooks ➔ 0% Unpaid Default Guarantee
          </div>

          {/* EXACT H1 TAG */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Embedded Fintech for Gig Workers: Closed-Loop Micro-Credit & Daily Protection
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Give rideshare drivers $25 instant fuel advances and $1/day accident protection with zero credit checks. Automatically auto-repaid via 15% deductions from daily platform trips.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button 
              onClick={() => { setActiveTab('splitter'); startTripSimulation(); }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 font-bold text-sm hover:from-orange-400 hover:to-amber-300 transition shadow-xl shadow-orange-500/20 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              Simulate 5-Trip Source Repayment
            </button>
            <button 
              onClick={() => setActiveTab('underwriter')}
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 font-semibold text-sm hover:bg-slate-800 transition flex items-center gap-2"
            >
              Adjust Daily Underwriting Limits
            </button>
          </div>

          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-3xl mx-auto">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Default Rate (NPL)</span>
              <span className="text-lg font-bold text-orange-400">&lt; 1.2% NPL</span>
              <span className="text-[10px] text-slate-500 block">vs. 25%+ Open-Banking</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Advance Approval</span>
              <span className="text-lg font-bold text-white">Instant (&lt; 30s)</span>
              <span className="text-[10px] text-slate-500 block">Zero Credit Bureau Check</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Repayment Mechanism</span>
              <span className="text-lg font-bold text-amber-400">15% Split/Trip</span>
              <span className="text-[10px] text-slate-500 block">Direct Platform Deduction</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Daily Protection</span>
              <span className="text-lg font-bold text-orange-300">$1/Shift</span>
              <span className="text-[10px] text-slate-500 block">Hospital Cash & Bike Repair</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspaces */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('underwriter')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'underwriter' ? 'border-orange-500 text-orange-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Activity className="w-4 h-4" />
            Capacity Underwriting Engine
          </button>
          <button 
            onClick={() => setActiveTab('splitter')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'splitter' ? 'border-orange-500 text-orange-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Zap className="w-4 h-4" />
            15% Closed-Loop Splitter
          </button>
          <button 
            onClick={() => setActiveTab('insurance')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'insurance' ? 'border-orange-500 text-orange-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <HeartPulse className="w-4 h-4" />
            Daily Micro-Insurance Takaful
          </button>
          <button 
            onClick={() => setActiveTab('fleet_api')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-2 ${activeTab === 'fleet_api' ? 'border-orange-500 text-orange-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Database className="w-4 h-4" />
            Platform Payout Webhook API
          </button>
        </div>

        {/* Tab 1: Underwriting */}
        {activeTab === 'underwriter' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-2xl">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-400" />
                  Algorithmic Daily Capacity Calculator
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Rideshare / Courier Platform</label>
                    <select 
                      value={driverPlatform}
                      onChange={(e) => setDriverPlatform(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                    >
                      {platforms.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-300">Trailing 7-Day Gross Earnings ($/Day)</label>
                      <span className="text-xs font-mono text-orange-400 font-bold">${dailyEarnings}/day</span>
                    </div>
                    <input 
                      type="range" 
                      min="15" 
                      max="100" 
                      value={dailyEarnings}
                      onChange={(e) => setDailyEarnings(Number(e.target.value))}
                      className="w-full accent-orange-500 bg-slate-800"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                      <span>$15 (Part-Time)</span>
                      <span>$50 (Average Courier)</span>
                      <span>$100 (Top Earner)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Requested Advance Purpose</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={() => setAdvanceAmount(20)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 ${advanceAmount === 20 ? 'bg-orange-500/20 border-orange-500 text-orange-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                      >
                        <Fuel className="w-4 h-4" />
                        $20 Fuel Tank
                      </button>
                      <button 
                        onClick={() => setAdvanceAmount(40)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 ${advanceAmount === 40 ? 'bg-orange-500/20 border-orange-500 text-orange-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                      >
                        <Wrench className="w-4 h-4" />
                        $40 Brake / Tyre
                      </button>
                      <button 
                        onClick={() => setAdvanceAmount(65)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 ${advanceAmount === 65 ? 'bg-orange-500/20 border-orange-500 text-orange-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                      >
                        <ShieldCheck className="w-4 h-4" />
                        $65 Shift Kit
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-400">
                      <span>Authorized Credit Ceiling:</span>
                      <span className="font-mono text-emerald-400 font-bold">${borrowingLimit}.00</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Advance Fee (4% Flat):</span>
                      <span className="font-mono text-white font-bold">${dailyFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Repayment Method:</span>
                      <span className="text-orange-400 font-semibold">15% Split per Completed Trip</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setActiveTab('splitter'); startTripSimulation(); }}
                    className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-sm tracking-wide transition shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    Disburse ${advanceAmount} Advance & Start Shift
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Underwriting Metrics */}
            <div className="lg:col-span-7 space-y-4">
              <div className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-base">Closed-Loop Underwriting Architecture</h3>
                  <span className="text-xs font-mono text-orange-400 bg-orange-950/60 px-2.5 py-1 rounded-full border border-orange-500/30">
                    NPL Rate: 1.1%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-500 block">Weekly Driver Velocity</span>
                    <span className="text-lg font-bold text-white">42 Completed Trips</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-500 block">Acceptance Ratio</span>
                    <span className="text-lg font-bold text-orange-400">94.2% Rating</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-500 block">Avg Repayment Duration</span>
                    <span className="text-lg font-bold text-amber-400">1.8 Shifts</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 text-slate-300">
                  <span className="font-bold text-white block">Why ShiftFlow Replaces Predatory Loan Sharks:</span>
                  <p>In Cairo, Jakarta, and Lagos, rideshare drivers needing $15 for fuel turn to street lenders charging 20% weekly interest. ShiftFlow embeds directly inside the driver app: 4% flat fee, zero compound debt spirals, and painless auto-repayment from daily rides.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Splitter Simulation */}
        {activeTab === 'splitter' && (
          <div className="glass-card rounded-2xl p-8 border border-slate-800/80 max-w-4xl mx-auto shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Live Source-Deducted Repayment Simulator</h2>
                <p className="text-xs text-slate-400">Observe how completed platform trips automatically repay the ${advanceAmount} fuel advance without driver intervention.</p>
              </div>
              <button 
                disabled={simActive}
                onClick={startTripSimulation}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg transition flex items-center gap-1.5"
              >
                {simActive ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-current" />}
                Run Shift Simulation
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400 block">Total Due (Principal + 4% + $1 Insurance)</span>
                <span className="text-2xl font-black text-white font-mono">${totalRepaymentTarget.toFixed(2)}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400 block">Remaining Balance</span>
                <span className={`text-2xl font-black font-mono ${remainingBalance === 0 ? 'text-emerald-400' : 'text-orange-400'}`}>
                  ${remainingBalance.toFixed(2)}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400 block">Repayment Status</span>
                <span className={`text-sm font-bold block mt-1 ${remainingBalance === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {remainingBalance === 0 ? '✅ 100% REPAID' : 'DEDUCTING 15% / FARE'}
                </span>
              </div>
            </div>

            {/* Trips Table */}
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 font-medium">
                  <tr>
                    <th className="p-3">Trip #</th>
                    <th className="p-3">Gross Fare</th>
                    <th className="p-3">15% Source Deduction</th>
                    <th className="p-3">Net Cash to Driver Wallet</th>
                    <th className="p-3">Remaining Advance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {simTrips.length > 0 ? (
                    simTrips.map((t) => (
                      <tr key={t.tripNumber} className="hover:bg-slate-900/40">
                        <td className="p-3 font-sans font-bold text-white flex items-center gap-1.5">
                          <Bike className="w-3.5 h-3.5 text-orange-400" />
                          Trip #{t.tripNumber}
                        </td>
                        <td className="p-3 text-slate-200">${t.fare}</td>
                        <td className="p-3 text-orange-400 font-bold">-${t.deduction}</td>
                        <td className="p-3 text-emerald-400 font-semibold">${t.netDriver}</td>
                        <td className="p-3 text-slate-400">${t.remaining}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-6 text-center text-slate-500 font-sans italic">
                        Click "Run Shift Simulation" to simulate live trip fares and automatic 15% source deductions.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Micro-Insurance */}
        {activeTab === 'insurance' && (
          <div className="glass-card rounded-2xl p-8 border border-slate-800/80 max-w-4xl mx-auto shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Daily Micro-Insurance Takaful ($1/Shift)</h2>
              <p className="text-xs text-slate-400">Gig workers don't buy annual policies. ShiftFlow activates coverage per working shift, deducted effortlessly when the driver logs online.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <HeartPulse className="w-5 h-5 text-orange-400" />
                <h3 className="font-bold text-white text-sm">Emergency Hospital Cash</h3>
                <p className="text-xs text-slate-400">If a driver experiences an accident on shift, $35/day hospital cash is paid directly via mobile money for up to 14 days, protecting family groceries.</p>
              </div>
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-sm">Motorcycle Repair Subsidies</h3>
                <p className="text-xs text-slate-400">Covers urgent tyre replacement or chain repairs at certified network garages so the driver returns to road within 4 hours.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Fleet API */}
        {activeTab === 'fleet_api' && (
          <div className="glass-card rounded-2xl p-8 border border-slate-800/80 max-w-4xl mx-auto shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Fleet Payout Splitter Webhook Schema</h2>
              <p className="text-xs text-slate-400">Plug-and-play REST API for rideshare and logistics fleets. Ingest trip logs and split earnings before mobile wallet dispatch.</p>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs overflow-x-auto text-orange-400">
              <pre>{`POST /v1/fleet/deductions/split
Authorization: Bearer sf_live_fleet_sec_991823

{
  "driver_id": "DRV-CAIRO-88190",
  "fleet_provider": "YASSIR_MOTO_EGYPT",
  "completed_trip": {
    "trip_id": "TRP-2026-77821",
    "gross_fare_egp": 380.00,
    "platform_commission_egp": 57.00,
    "net_fare_egp": 323.00
  },
  "shiftflow_split": {
    "deduction_rate_pct": 15.0,
    "deducted_advance_egp": 48.45,
    "insurance_shift_fee_egp": 15.00,
    "driver_disbursement_egp": 259.55
  },
  "destination_wallet": {
    "rail": "VODAFONE_CASH_INSTANT",
    "phone": "+20 10 1234 5678",
    "clearing_time": "IMMEDIATE"
  }
}`}</pre>
            </div>
          </div>
        )}
      </main>

      {/* CAB Modal */}
      {cabModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card rounded-2xl max-w-lg w-full p-6 border border-orange-500/30 shadow-2xl relative">
            <button 
              onClick={() => setCabModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {cabSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-orange-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Pilot Application Received</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Our Fleet Integration team will contact your operations director within 12 hours to provision API sandbox keys and review your driver payout schedule.
                </p>
                <button 
                  onClick={() => { setCabModalOpen(false); setCabSubmitted(false); }}
                  className="px-6 py-2 rounded-lg bg-orange-500 text-slate-950 font-bold text-xs"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setCabSubmitted(true); }} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Design Partner Cohort</span>
                  <h3 className="text-xl font-bold text-white">Join the ShiftFlow 10-Fleet Pilot</h3>
                  <p className="text-xs text-slate-400">
                    We are launching a pilot cohort of 10 commercial partners for ShiftFlow (fleet owners, gig driver unions, delivery cooperatives). Dedicated integration and preferential locked partner pricing.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Fleet / Union Organization Legal Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Cairo Riders Union / Jakarta Courier Fleet"
                      value={cabForm.fleetName}
                      onChange={(e) => setCabForm({ ...cabForm, fleetName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Operations Lead Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="ops@fleet.com"
                      value={cabForm.contactEmail}
                      onChange={(e) => setCabForm({ ...cabForm, contactEmail: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Active Driver Fleet Size</label>
                    <select 
                      value={cabForm.driverCount}
                      onChange={(e) => setCabForm({ ...cabForm, driverCount: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                    >
                      <option value="500 - 2,000">500 - 2,000 Couriers</option>
                      <option value="2,000 - 10,000">2,000 - 10,000 Couriers</option>
                      <option value="10,000+">10,000+ Couriers</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-orange-950/40 border border-orange-500/30 text-[11px] text-orange-300">
                  🎁 <strong>Pilot Privileges:</strong> Zero API integration fee, locked 70% preferential credit margin split, and customized mobile money wallet connectors.
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-sm tracking-wide transition shadow-lg shadow-orange-500/25"
                >
                  Apply for Fleet Pilot (3 Slots Remaining)
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 ShiftFlow Technologies Ltd. Closed-loop driver fintech infrastructure.</p>
          <div className="flex gap-4">
            <span className="text-slate-400">Canonical: /solutions/gig-worker-embedded-fintech</span>
            <span className="text-orange-500 font-semibold">Flutterwave • Xendit • Mercado Pago Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
