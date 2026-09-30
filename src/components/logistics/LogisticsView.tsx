import React, { useState } from 'react';
import { 
  Truck, 
  Warehouse, 
  Route
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INDIAN_CITIES, evaluateLogisticsFeasibility } from '../../services/logistics';
import { CROP_METADATA_REGISTRY } from '../../services/cropMetadata';
import { CropType } from '../../types';

export const LogisticsView: React.FC = () => {
  const { buyerCity } = useApp();

  const [testCrop, setTestCrop] = useState<CropType>('Wheat');
  const [testOrigin, setTestOrigin] = useState<string>('Ludhiana');
  const [testDestination, setTestDestination] = useState<string>('Delhi');
  const [testQty, setTestQty] = useState<number>(100);

  const testEvaluation = evaluateLogisticsFeasibility(
    testCrop,
    testOrigin,
    testDestination,
    testQty
  );

  const cropMeta = CROP_METADATA_REGISTRY[testCrop];

  const setPreset = (crop: CropType, origin: string, dest: string) => {
    setTestCrop(crop);
    setTestOrigin(origin);
    setTestDestination(dest);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-2 transition-colors duration-150">
        <div className="flex items-center space-x-2">
          <Truck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Logistics & Crop Perishability Routing Engine
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl">
          Agricultural produce cannot be shipped indiscriminately like consumer electronics. Demand2Crop evaluates
          crop shelf-life, cold-chain temperature thresholds, and highway freight transit hours to enforce feasible routes and dynamic logistics pricing.
        </p>
      </div>

      {/* Visual Route Corridor */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm p-6 space-y-5 transition-colors duration-150">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Active Fulfillment Corridor: Ludhiana Farm Gate → Delhi NCR Hub → Customer
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 uppercase">
            Active Real-Time Corridor
          </span>
        </div>

        {/* 3-Node Logistics Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Node 1: Farm Gate */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">1. Origin Farm Gate</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center font-bold">
                🌾
              </div>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ravi Singh Farm</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Ludhiana, Punjab</p>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-0.5">
              <div>Harvest Weight: <strong className="text-slate-900 dark:text-white">1,000 kg</strong></div>
              <div>Moisture Grade: <strong className="text-emerald-700 dark:text-emerald-400">12.2% (Grade A)</strong></div>
            </div>
          </div>

          {/* Node 2: Dark Store Hub */}
          <div className="bg-emerald-50/70 dark:bg-slate-950 p-4 rounded-xl border border-emerald-300 dark:border-emerald-700/60 ring-1 ring-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase">2. Dark Store Hub</span>
              <Warehouse className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Delhi NCR Distribution Hub</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">Silo #04 • 310 km from Ludhiana</p>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-2 border-t border-emerald-200 dark:border-slate-800/80 space-y-0.5">
              <div>Inbound Transit: <strong className="text-slate-900 dark:text-white">6.8 hrs (NH-44 Freight)</strong></div>
              <div>Buffer Handling: <strong className="text-emerald-700 dark:text-emerald-400">Sort, Grade & Bin</strong></div>
            </div>
          </div>

          {/* Node 3: Last-Mile Customer */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">3. Last-Mile Delivery</span>
              <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-400 flex items-center justify-center font-bold">
                🏠
              </div>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Delhi Customer Doorstep</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Urban NCR Micro-Fulfillment</p>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-0.5">
              <div>Last Mile: <strong className="text-slate-900 dark:text-white">Electric Micro-Van</strong></div>
              <div>Settlement Trigger: <strong className="text-emerald-700 dark:text-emerald-400">OTP / NFC Receipt</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Perishability & Routing Feasibility Simulator */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5 transition-colors duration-150">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Route className="w-5 h-5 text-emerald-600 dark:text-cyan-400" />
              <span>Interactive Feasibility & Freight Pricing Simulator</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Crop perishability constraints dynamically govern marketplace availability and routing feasibility.
            </p>
          </div>

          {/* Quick Demo Presets */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreset('Tomatoes', 'Ludhiana', 'Delhi')}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-medium text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
            >
              Tomatoes → Delhi (Allowed)
            </button>
            <button
              onClick={() => setPreset('Tomatoes', 'Ludhiana', 'Chennai')}
              className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-xs font-medium text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50 transition"
            >
              Tomatoes → Chennai (Restricted)
            </button>
            <button
              onClick={() => setPreset('Wheat', 'Ludhiana', 'Chennai')}
              className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-xs font-medium text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 transition"
            >
              Wheat → Chennai (Allowed)
            </button>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Crop Tested
            </label>
            <select
              value={testCrop}
              onChange={(e) => setTestCrop(e.target.value as CropType)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
            >
              {Object.keys(CROP_METADATA_REGISTRY).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Farmer Origin
            </label>
            <select
              value={testOrigin}
              onChange={(e) => setTestOrigin(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
            >
              {Object.keys(INDIAN_CITIES).map((c) => (
                <option key={c} value={c}>{c} ({INDIAN_CITIES[c].state})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Buyer Destination
            </label>
            <select
              value={testDestination}
              onChange={(e) => setTestDestination(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
            >
              {Object.keys(INDIAN_CITIES).map((c) => (
                <option key={c} value={c}>{c} ({INDIAN_CITIES[c].state})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Quantity (kg)
            </label>
            <input
              type="number"
              value={testQty}
              onChange={(e) => setTestQty(Number(e.target.value))}
              min={10}
              step={10}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        {/* Feasibility Result Box */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            testEvaluation.isFeasible
              ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-700/50'
              : 'bg-rose-50 border-rose-300 dark:bg-rose-950/30 dark:border-rose-700/50'
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl border ${
                  testEvaluation.isFeasible
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30'
                    : 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30'
                }`}
              >
                {testEvaluation.isFeasible ? '✓' : '⚠️'}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {testEvaluation.isFeasible
                      ? `Logistics Corridor Approved: ${testOrigin} → ${testDestination}`
                      : `Logistics Corridor Prohibited: ${testOrigin} → ${testDestination}`}
                  </h4>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                      testEvaluation.isFeasible
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                        : 'bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                    }`}
                  >
                    {testEvaluation.statusBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  {testEvaluation.reason}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Estimated Logistics Fee</span>
              <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
                ₹{testEvaluation.totalLogisticsFee.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 block">
                (₹{testEvaluation.logisticsFeePerKg}/kg for {testQty} kg)
              </span>
            </div>
          </div>

          {/* Granular Logistics Specs Grid */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Highway Road Distance:</span>
              <span className="font-bold font-mono text-slate-900 dark:text-white">{testEvaluation.distanceKm} km</span>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Transit + Hub Handling:</span>
              <span className="font-bold font-mono text-slate-900 dark:text-white">~{testEvaluation.transitHours} hrs ({testEvaluation.transitDays} days)</span>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Crop Shelf Life:</span>
              <span className="font-bold font-mono text-slate-900 dark:text-white">{cropMeta.shelfLifeDays} days ({cropMeta.perishability})</span>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Recommended Hub:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">{testEvaluation.recommendedHub.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
