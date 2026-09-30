import React, { useState } from 'react';
import { X, AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HarvestListing } from '../../types';

interface PartialFulfillmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: HarvestListing;
}

export const PartialFulfillmentModal: React.FC<PartialFulfillmentModalProps> = ({
  isOpen,
  onClose,
  listing
}) => {
  const { simulatePartialFulfillment } = useApp();

  const [actualYieldKg, setActualYieldKg] = useState<number>(700);

  if (!isOpen) return null;

  const expectedKg = listing.expectedQuantityKg;
  const shortfallKg = Math.max(0, expectedKg - actualYieldKg);
  const fulfillmentRatio = Math.min(1, actualYieldKg / expectedKg);
  const fulfillmentPct = Math.round(fulfillmentRatio * 100);

  const totalEscrow = listing.escrowTotalLocked || (listing.committedQuantityKg * listing.pricePerKg);
  const farmerPayout = Math.round(totalEscrow * fulfillmentRatio);
  const buyerRefundTotal = totalEscrow - farmerPayout;

  const handleExecute = () => {
    simulatePartialFulfillment(listing.id, actualYieldKg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-amber-50 dark:bg-amber-950/20">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 flex items-center justify-center border border-amber-300 dark:border-amber-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Partial Harvest Fulfillment Simulator</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Simulate agricultural yield shortfall & automated smart contract settlement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Context Banner */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Contract: <strong className="text-slate-900 dark:text-white font-mono">{listing.contractId}</strong></span>
              <span>Farmer: <strong className="text-slate-900 dark:text-white">{listing.farmerName} ({listing.farmerLocation})</strong></span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800 dark:text-white mt-1">
              <span>Crop: {listing.crop} ({listing.variety})</span>
              <span>Target Yield: {expectedKg.toLocaleString()} kg @ ₹{listing.pricePerKg}/kg</span>
            </div>
          </div>

          {/* Interactive Yield Slider */}
          <div className="bg-slate-50/70 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Simulated Actual Farm Gate Harvest:
              </label>
              <div className="text-right">
                <span className="text-lg font-bold font-mono text-amber-700 dark:text-amber-400">
                  {actualYieldKg.toLocaleString()} kg
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-1.5">
                  ({fulfillmentPct}% of expected {expectedKg} kg)
                </span>
              </div>
            </div>

            <input
              type="range"
              min={200}
              max={expectedKg}
              step={50}
              value={actualYieldKg}
              onChange={(e) => setActualYieldKg(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>200 kg (Severe Drought)</span>
              <button 
                onClick={() => setActualYieldKg(700)} 
                className="text-emerald-700 dark:text-amber-400 font-bold underline font-sans"
              >
                Set 700 kg (Demo Standard)
              </button>
              <span>{expectedKg} kg (100% Target)</span>
            </div>
          </div>

          {/* Settlement Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Farmer Settlement */}
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-400 font-semibold mb-1">
                <span>Farmer Payout</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                ₹{farmerPayout.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Paid for {actualYieldKg.toLocaleString()} kg delivered at agreed ₹{listing.pricePerKg}/kg
              </p>
            </div>

            {/* Buyer Refund */}
            <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/40 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs text-cyan-800 dark:text-cyan-400 font-semibold mb-1">
                <span>Buyer Refund Pool</span>
                <RotateCcw className="w-4 h-4 text-cyan-600" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                ₹{buyerRefundTotal.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Automatically refunded for {shortfallKg.toLocaleString()} kg unfulfilled crop shortfall
              </p>
            </div>
          </div>

          {/* Mathematical Proof & Explainer */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-mono">
            <div className="text-slate-800 dark:text-slate-400 font-semibold font-sans text-xs flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Smart Contract Automated Settlement Formula:</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Fulfillment Ratio = {actualYieldKg} kg / {expectedKg} kg = <strong className="text-slate-900 dark:text-white">{fulfillmentRatio.toFixed(3)}</strong>
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Disbursed to Farmer = ₹{totalEscrow.toLocaleString()} × {fulfillmentRatio.toFixed(3)} = <strong className="text-emerald-700 dark:text-emerald-400">₹{farmerPayout.toLocaleString()}</strong>
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Returned to Buyers = ₹{totalEscrow.toLocaleString()} - ₹{farmerPayout.toLocaleString()} = <strong className="text-cyan-700 dark:text-cyan-400">₹{buyerRefundTotal.toLocaleString()}</strong>
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            Demonstrates real-world agricultural risk governance
          </span>
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleExecute}
              className="px-5 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm flex items-center space-x-2"
            >
              <span>Execute On-Chain Settlement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
