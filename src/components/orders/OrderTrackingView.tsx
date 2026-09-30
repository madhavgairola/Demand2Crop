import React, { useState } from 'react';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileCode2, 
  ArrowRight, 
  Warehouse
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LifecycleStage } from '../../types';

export const OrderTrackingView: React.FC = () => {
  const { orders, advanceOrderStage, selectedOrder, setSelectedOrder, setActiveView } = useApp();

  const activeOrder = selectedOrder || orders[0];

  const [selectedPhaseStage, setSelectedPhaseStage] = useState<LifecycleStage | null>(
    activeOrder?.status || 'IN_TRANSIT'
  );

  if (!activeOrder) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
        <Truck className="w-12 h-12 text-slate-400 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Active Orders Yet</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">Pre-commit to a harvest on the marketplace to view live lifecycle tracking.</p>
      </div>
    );
  }

  const stageOrder: LifecycleStage[] = [
    'DEMAND_POSTED',
    'FARMER_COMMITTED',
    'CULTIVATION',
    'GROWING',
    'HARVEST_READY',
    'HARVESTED',
    'QUALITY_VERIFIED',
    'IN_TRANSIT',
    'AT_DARK_STORE',
    'OUT_FOR_DELIVERY',
    'DELIVERED'
  ];

  const currentStageIndex = stageOrder.indexOf(activeOrder.status);

  const handleAdvanceStep = () => {
    if (currentStageIndex < stageOrder.length - 1) {
      const nextStage = stageOrder[currentStageIndex + 1];
      advanceOrderStage(activeOrder.id, nextStage);
      setSelectedPhaseStage(nextStage);
    }
  };

  const selectedUpdate = activeOrder.trackingUpdates.find((u) => u.stage === selectedPhaseStage) || 
    activeOrder.trackingUpdates.find((u) => u.stage === activeOrder.status) || 
    activeOrder.trackingUpdates[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors duration-150">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Crop Lifecycle & Provenance Tracking</h2>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-slate-800 dark:text-cyan-400 border border-emerald-200 dark:border-slate-700 font-semibold">
              {activeOrder.contractId}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time multi-oracle verification from seed sowing to dark-store doorstep fulfillment.
          </p>
        </div>

        {/* Live Demo Advance Controller */}
        <div className="flex items-center space-x-2">
          {currentStageIndex < stageOrder.length - 1 ? (
            <button
              onClick={handleAdvanceStep}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm"
            >
              <span>Simulate Next Stage ({stageOrder[currentStageIndex + 1]})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Smart Contract Fulfilled & Settled</span>
            </div>
          )}
        </div>
      </div>

      {/* Orders Selector Pills if multiple */}
      {orders.length > 1 && (
        <div className="flex items-center space-x-3 overflow-x-auto pb-1 scrollbar-none">
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setSelectedOrder(o);
                setSelectedPhaseStage(o.status);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-medium border whitespace-nowrap transition flex items-center space-x-2 ${
                o.id === activeOrder.id
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-slate-800 dark:text-emerald-400 dark:border-emerald-500/50 shadow-sm font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-850'
              }`}
            >
              <span>{o.crop} ({o.quantityKg} kg)</span>
              <span className="text-[10px] font-mono px-1 rounded bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300">
                {o.contractId}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Primary Order Overview Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors duration-150">
        {/* Current Status Highlight Banner */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center text-2xl border border-emerald-300 dark:border-emerald-500/30">
              {activeOrder.crop === 'Wheat' ? '🌾' : '🍅'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {activeOrder.crop} — {activeOrder.quantityKg} kg
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800 font-semibold uppercase">
                  {activeOrder.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-center space-x-1">
                <span>Farmer: <strong className="text-slate-900 dark:text-white">{activeOrder.farmerName}</strong> ({activeOrder.farmerLocation})</span>
                <span>•</span>
                <span>Destination: <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">{activeOrder.deliveryCity}</strong></span>
              </p>
            </div>
          </div>

          {/* Current Location Note Banner */}
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 text-xs space-y-1 max-w-md shadow-sm">
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Live Logistics Broadcast
            </span>
            <p className="text-emerald-800 dark:text-emerald-300 font-medium">
              "{activeOrder.currentLocationNote}"
            </p>
          </div>
        </div>

        {/* Interactive Clickable Timeline */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider">
              Interactive 11-Stage Provenance Pipeline (Click phase to inspect proof)
            </span>
            <span>Current: <strong className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">{activeOrder.status}</strong></span>
          </div>

          {/* Pipeline Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {stageOrder.map((stageKey, idx) => {
              const isPassed = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const isSelected = selectedPhaseStage === stageKey;

              const stageLabels: Record<LifecycleStage, string> = {
                DEMAND_POSTED: 'Demand Committed',
                FARMER_COMMITTED: 'Farmer Accepted',
                CULTIVATION: 'Cultivation Sown',
                GROWING: 'Growing Maturation',
                HARVEST_READY: 'Harvest Ready',
                HARVESTED: 'Crop Harvested',
                QUALITY_VERIFIED: 'Quality Verified',
                IN_TRANSIT: 'In Transit',
                AT_DARK_STORE: `${activeOrder.deliveryCity} Dark Store`,
                OUT_FOR_DELIVERY: 'Out for Delivery',
                DELIVERED: 'Delivered & Settled',
                SETTLED: 'Settled'
              };

              return (
                <button
                  key={stageKey}
                  onClick={() => setSelectedPhaseStage(stageKey)}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30 text-emerald-950 dark:bg-slate-800 dark:border-emerald-500 dark:text-white'
                      : isCurrent
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-600/70 dark:text-emerald-200'
                        : isPassed
                          ? 'bg-white border-emerald-300 text-slate-800 hover:border-emerald-400 dark:bg-slate-950 dark:border-emerald-900/60 dark:text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-950/40 dark:border-slate-800 dark:text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">Step {idx + 1}</span>
                    {isPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                    )}
                  </div>
                  <div className="text-xs font-bold leading-tight">
                    {stageLabels[stageKey]}
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    {isPassed ? 'Verified ✓' : 'Upcoming'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Phase Detail Drawer */}
        {selectedUpdate && (
          <div className="p-6 bg-slate-50/50 dark:bg-slate-900/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 font-mono">
                  Phase Inspection
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{selectedUpdate.title}</h4>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Timestamp: {selectedUpdate.timestamp}</span>
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              {selectedUpdate.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-sans font-semibold">Ledger Transaction Hash</span>
                <p className="text-emerald-700 dark:text-cyan-400 truncate text-[11px]" title={selectedUpdate.txHash || activeOrder.escrowTxHash}>
                  {selectedUpdate.txHash || activeOrder.escrowTxHash}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-sans font-semibold">Quality & Inbound Certificate</span>
                <p className="text-emerald-700 dark:text-emerald-400 flex items-center space-x-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Grade A Verified • Zero Moisture Spoilage</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Financials & Escrow Card */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 dark:text-slate-400">Total Escrow Value Locked:</span>
            <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
              ₹{activeOrder.totalAmount.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Crop: ₹{(activeOrder.quantityKg * activeOrder.pricePerKg).toLocaleString()} + Logistics: ₹{activeOrder.logisticsFee}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveView('contract')}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-cyan-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition shadow-sm"
            >
              <FileCode2 className="w-3.5 h-3.5 text-emerald-600 dark:text-cyan-400" />
              <span>Inspect Smart Contract</span>
            </button>

            <button
              onClick={() => setActiveView('darkstores')}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition shadow-sm"
            >
              <Warehouse className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Inspect Dark Store Silo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
