import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Truck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HarvestListing } from '../../types';
import { evaluateLogisticsFeasibility } from '../../services/logistics';

interface CommitmentTxModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: HarvestListing;
}

type TxStep = 'IDLE' | 'DEPLOYING_ESCROW' | 'LOCKING_PAYMENT' | 'RECORDING_LEDGER' | 'CONFIRMED';

export const CommitmentTxModal: React.FC<CommitmentTxModalProps> = ({
  isOpen,
  onClose,
  listing
}) => {
  const { preCommitToHarvest, buyerCity, setActiveView, setActiveRole } = useApp();

  const [quantityKg, setQuantityKg] = useState<number>(100);
  const [txStep, setTxStep] = useState<TxStep>('IDLE');
  const [txDetails, setTxDetails] = useState<{
    txHash: string;
    contractId: string;
    orderId: string;
  } | null>(null);

  if (!isOpen) return null;

  const maxRemaining = Math.max(10, listing.expectedQuantityKg - listing.committedQuantityKg);
  const validatedQty = Math.min(quantityKg, maxRemaining);

  const logistics = evaluateLogisticsFeasibility(
    listing.crop,
    listing.farmerLocation,
    buyerCity,
    validatedQty
  );

  const productCost = validatedQty * listing.pricePerKg;
  const logisticsFee = logistics.totalLogisticsFee;
  const totalAmount = productCost + logisticsFee;

  const handleConfirmPreCommit = async () => {
    setTxStep('DEPLOYING_ESCROW');

    setTimeout(() => {
      setTxStep('LOCKING_PAYMENT');
      setTimeout(() => {
        setTxStep('RECORDING_LEDGER');
        setTimeout(() => {
          const result = preCommitToHarvest(listing.id, validatedQty, buyerCity);
          setTxDetails({
            txHash: result.txHash,
            contractId: result.contractId,
            orderId: result.order.id
          });
          setTxStep('CONFIRMED');
        }, 800);
      }, 800);
    }, 800);
  };

  const handleResetAndClose = () => {
    setTxStep('IDLE');
    setTxDetails(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-xl overflow-hidden shadow-xl transition-colors duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center border border-emerald-300 dark:border-emerald-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Pre-Commit to Future Harvest</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Lock payment in smart contract escrow prior to harvest</p>
            </div>
          </div>
          {txStep === 'IDLE' && (
            <button
              onClick={handleResetAndClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* State 1: Configuration Form */}
        {txStep === 'IDLE' && (
          <div className="p-6 space-y-5">
            {/* Listing Summary Card */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>{listing.crop}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">({listing.variety})</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Farmer: <strong className="text-slate-900 dark:text-white">{listing.farmerName}</strong> • {listing.farmerLocation}, {listing.farmerState}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Pre-Commit Price</span>
                  <span className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400">₹{listing.pricePerKg}/kg</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Expected Harvest: <strong className="text-slate-800 dark:text-slate-200">{listing.expectedHarvestDate}</strong></span>
                <span>Available: <strong className="text-emerald-700 dark:text-emerald-400 font-medium">{maxRemaining} kg remaining</strong></span>
              </div>
            </div>

            {/* Quantity Selector Slider & Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Select Pre-Commit Quantity:
                </label>
                <div className="flex items-center space-x-1.5">
                  <input
                    type="number"
                    min={10}
                    max={maxRemaining}
                    step={10}
                    value={validatedQty}
                    onChange={(e) => setQuantityKg(Number(e.target.value))}
                    className="w-24 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-sm font-bold font-mono text-slate-900 dark:text-white text-right focus:outline-none focus:border-emerald-600"
                  />
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">kg</span>
                </div>
              </div>

              <input
                type="range"
                min={10}
                max={Math.min(500, maxRemaining)}
                step={10}
                value={validatedQty}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>10 kg</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold cursor-pointer" onClick={() => setQuantityKg(100)}>
                  100 kg (Quick Select)
                </span>
                <span>{Math.min(500, maxRemaining)} kg</span>
              </div>
            </div>

            {/* Price & Logistics Breakdown */}
            <div className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                <span>Produce Cost ({validatedQty} kg × ₹{listing.pricePerKg}/kg):</span>
                <span className="font-mono font-medium text-slate-900 dark:text-white">₹{productCost.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                <span className="flex items-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Logistics to {buyerCity} ({logistics.distanceKm} km via {logistics.recommendedHub.name}):</span>
                </span>
                <span className="font-mono font-medium text-slate-900 dark:text-white">₹{logisticsFee.toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm font-bold text-slate-900 dark:text-white">
                <span>Total Escrow Lock Amount:</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 text-lg">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Explanation Note */}
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl p-3.5 flex items-start space-x-3 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">
                  "Funds Secured Through Harvest Contract Escrow"
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  You are pre-committing to <strong>{validatedQty} kg</strong> from this future harvest. 
                  Your funds remain locked in smart contract escrow until produce is verified and delivered to your doorstep.
                </p>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPreCommit}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm flex items-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>PRE-COMMIT / BUY (LOCK ESCROW)</span>
              </button>
            </div>
          </div>
        )}

        {/* State 2: Transaction In Progress */}
        {(txStep === 'DEPLOYING_ESCROW' || txStep === 'LOCKING_PAYMENT' || txStep === 'RECORDING_LEDGER') && (
          <div className="p-8 text-center space-y-6">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-emerald-600 animate-spin" />
              <Lock className="w-7 h-7 text-emerald-600" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Executing Distributed Ledger Escrow</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Interacting with Demand2Crop EVM Consensus Node...</p>
            </div>

            {/* Stepper Progress */}
            <div className="space-y-3 text-left max-w-sm mx-auto bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center space-x-3">
                {txStep === 'DEPLOYING_ESCROW' ? (
                  <Clock className="w-4 h-4 text-amber-500 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
                <span className={txStep === 'DEPLOYING_ESCROW' ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-500 dark:text-slate-400'}>
                  1. Creating Harvest Contract...
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {txStep === 'LOCKING_PAYMENT' ? (
                  <Clock className="w-4 h-4 text-amber-500 animate-spin" />
                ) : txStep === 'RECORDING_LEDGER' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700" />
                )}
                <span className={txStep === 'LOCKING_PAYMENT' ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-500 dark:text-slate-400'}>
                  2. Locking payment in Escrow Vault (₹{totalAmount.toLocaleString()})...
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {txStep === 'RECORDING_LEDGER' ? (
                  <Clock className="w-4 h-4 text-amber-500 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700" />
                )}
                <span className={txStep === 'RECORDING_LEDGER' ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-500 dark:text-slate-400'}>
                  3. Recording commitment on distributed ledger...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* State 3: Transaction Confirmed */}
        {txStep === 'CONFIRMED' && txDetails && (
          <div className="p-6 space-y-5 animate-fade-in">
            {/* Success Icon */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Transaction Confirmed ✓</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Harvest pre-commitment locked into cryptographic escrow. Forward contract registered on distributed ledger.
              </p>
            </div>

            {/* Transaction Receipt Details */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">Contract ID:</span>
                <span className="text-emerald-700 dark:text-cyan-400 font-bold">{txDetails.contractId}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">Transaction Hash:</span>
                <span className="text-slate-700 dark:text-slate-300 truncate max-w-[240px] text-[11px]" title={txDetails.txHash}>
                  {txDetails.txHash}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">Buyer:</span>
                <span className="text-slate-900 dark:text-white">Authorized Buyer (You)</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">Farmer:</span>
                <span className="text-slate-900 dark:text-white">{listing.farmerName} ({listing.farmerLocation})</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">Quantity Pre-Committed:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">{validatedQty} kg</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">Agreed Target Price:</span>
                <span className="text-slate-900 dark:text-white">₹{listing.pricePerKg}/kg</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400">Expected Harvest:</span>
                <span className="text-amber-700 dark:text-amber-400">{listing.expectedHarvestDate}</span>
              </div>
            </div>

            {/* Actions: Continue Shopping or Track Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleResetAndClose}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 transition"
              >
                <span>Explore More Harvests</span>
              </button>

              <button
                onClick={() => {
                  handleResetAndClose();
                  setActiveView('orders');
                }}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
              >
                <span>Track Order & Provenance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
