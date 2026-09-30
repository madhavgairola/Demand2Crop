import React, { useState } from 'react';
import { 
  TrendingUp, 
  Building2, 
  Plus, 
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AGGREGATED_MARKET_DEMAND } from '../../services/seedData';
import { DemandPool } from '../../types';

export const DemandDashboard: React.FC = () => {
  const { demandPools, contributeToDemandPool } = useApp();

  const [pledgeModalPool, setPledgeModalPool] = useState<DemandPool | null>(null);
  const [pledgeQty, setPledgeQty] = useState<number>(1000);
  const [pledgeFarmerName, setPledgeFarmerName] = useState<string>('Ravi Singh (Ludhiana)');

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeModalPool) return;
    contributeToDemandPool(pledgeModalPool.id, pledgeQty, pledgeFarmerName);
    setPledgeModalPool(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-2 transition-colors duration-150">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Aggregated Forward Demand & Institutional Pools</h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl">
          Instead of individual farmers guessing what crops to grow, buyers aggregate binding forward demand.
          Farmers review open demand deficits and plant with guaranteed demand certainty.
        </p>
      </div>

      {/* Aggregated Buyer Demand Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 transition-colors duration-150">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Aggregated Buyer Demand Radar (Total Market Deficit)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live consolidated requirements posted by retail buyers, restaurants, and food processors.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 font-semibold font-mono">
            8 Crops Monitored
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AGGREGATED_MARKET_DEMAND.map((item) => {
            const fulfilledPct = Math.round((item.committedSupplyKg / item.demandKg) * 100);

            return (
              <div
                key={item.crop}
                className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.crop}</h4>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                      item.urgency === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                        : item.urgency === 'HIGH'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.urgency} DEFICIT
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Demand: <strong className="text-slate-900 dark:text-white font-mono">{item.demandKg.toLocaleString()} kg</strong></span>
                    <span>Supply: <strong className="text-emerald-700 dark:text-emerald-400 font-mono font-semibold">{item.committedSupplyKg.toLocaleString()} kg</strong></span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div
                      className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full"
                      style={{ width: `${fulfilledPct}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Open Gap:</span>
                  <span className="font-bold font-mono text-amber-700 dark:text-amber-400">
                    +{item.gapKg.toLocaleString()} kg needed
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Institutional Demand Pools */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-emerald-600 dark:text-teal-400" />
              <span>Institutional B2B Demand Pools</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Large institutional orders fulfilled collectively by a decentralized agricultural supply network.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {demandPools.map((pool) => {
            const committedPct = Math.round((pool.currentCommittedKg / pool.totalRequiredKg) * 100);
            const remainingKg = Math.max(0, pool.totalRequiredKg - pool.currentCommittedKg);

            return (
              <div
                key={pool.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between transition-colors duration-150"
              >
                <div className="p-6 space-y-4">
                  {/* Pool Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800 uppercase font-mono">
                        {pool.buyerType}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">{pool.buyerName}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        Crop: <strong className="text-slate-900 dark:text-white">{pool.crop}</strong> ({pool.variety})
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Guaranteed Offer</span>
                      <span className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400">₹{pool.targetPricePerKg}/kg</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                    {pool.description}
                  </p>

                  {/* Commitment Progress */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Pooled Supply: <strong className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">{pool.currentCommittedKg.toLocaleString()} / {pool.totalRequiredKg.toLocaleString()} kg</strong></span>
                      <span><strong>{committedPct}% Funded</strong></span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                      <div
                        className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${committedPct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                      <span>Deadline: {pool.requiredDeliveryDate}</span>
                      <span className="text-amber-700 dark:text-amber-400 font-semibold">{remainingKg.toLocaleString()} kg still needed</span>
                    </div>
                  </div>

                  {/* Multi-Farmer Contribution Allocations */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
                      Farmer Supply Allocations ({pool.contributions.length} Farmers Contributing):
                    </span>
                    <div className="space-y-1.5">
                      {pool.contributions.map((c, i) => (
                        <div
                          key={i}
                          className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{c.farmerName}</span>
                            <span className="text-slate-500">({c.location})</span>
                          </div>
                          <div className="flex items-center space-x-2 font-mono">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">{c.quantityKg.toLocaleString()} kg</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">Verified</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action: Pledge supply */}
                <div className="p-6 pt-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                  <button
                    onClick={() => setPledgeModalPool(pool)}
                    disabled={remainingKg <= 0}
                    className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm flex items-center justify-center space-x-2 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-500"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Pledge Supply as Farmer ({pool.crop} @ ₹{pool.targetPricePerKg}/kg)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pledge Allocation Modal */}
      {pledgeModalPool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-emerald-50 dark:bg-teal-950/30">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Pledge Supply to Demand Pool</h3>
              <button
                onClick={() => setPledgeModalPool(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePledgeSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Institutional Buyer
                </label>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{pledgeModalPool.buyerName}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Target Price: ₹{pledgeModalPool.targetPricePerKg}/kg • Crop: {pledgeModalPool.crop}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Contributing Farmer
                </label>
                <input
                  type="text"
                  value={pledgeFarmerName}
                  onChange={(e) => setPledgeFarmerName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Pledged Quantity (kg)
                </label>
                <input
                  type="number"
                  min={100}
                  step={100}
                  value={pledgeQty}
                  onChange={(e) => setPledgeQty(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Guaranteed Escrow Allocation:</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  ₹{(pledgeQty * pledgeModalPool.targetPricePerKg).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPledgeModalPool(null)}
                  className="px-4 py-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-sm"
                >
                  Confirm Supply Pledge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
