import React, { useState } from 'react';
import { 
  Sprout, 
  Plus, 
  MapPin, 
  Users, 
  AlertTriangle, 
  ShieldCheck, 
  Award, 
  FileCode2, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CreateHarvestModal } from './CreateHarvestModal';
import { PartialFulfillmentModal } from './PartialFulfillmentModal';
import { FarmerReputationModal } from './FarmerReputationModal';
import { LifecycleStage } from '../../types';

export const FarmerDashboard: React.FC = () => {
  const { 
    listings, 
    advanceListingStage, 
    setSelectedListing, 
    setActiveView
  } = useApp();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPartialOpen, setIsPartialOpen] = useState(false);
  const [isReputationOpen, setIsReputationOpen] = useState(false);

  // Focus on Ravi Singh's primary demo listing (Ludhiana Wheat)
  const raviListings = listings.filter((l) => l.farmerId === 'farmer-ravi-singh');
  const primaryListing = raviListings.find((l) => l.crop === 'Wheat') || raviListings[0] || listings[0];

  const committedPct = Math.round((primaryListing.committedQuantityKg / primaryListing.expectedQuantityKg) * 100);
  const remainingKg = Math.max(0, primaryListing.expectedQuantityKg - primaryListing.committedQuantityKg);
  const totalRevenue = primaryListing.expectedQuantityKg * primaryListing.pricePerKg;

  const stageOrder: { stage: LifecycleStage; label: string; desc: string }[] = [
    { stage: 'DEMAND_POSTED', label: 'Listing Deployed', desc: 'Pre-commitments open' },
    { stage: 'FARMER_COMMITTED', label: 'Farmer Locked', desc: 'Sowing scheduled' },
    { stage: 'CULTIVATION', label: 'Sowing & Sprouting', desc: '30% advance capital' },
    { stage: 'GROWING', label: 'Crop Maturation', desc: 'IoT/drone monitored' },
    { stage: 'HARVESTED', label: 'Harvested', desc: 'Farm gate yield weighed' },
    { stage: 'QUALITY_VERIFIED', label: 'Quality Verified', desc: 'Grade A oracle stamp' },
    { stage: 'IN_TRANSIT', label: 'Dispatched to Hub', desc: 'Cold/freight corridor' },
    { stage: 'AT_DARK_STORE', label: 'At Dark Store', desc: 'Local hub staging' },
    { stage: 'DELIVERED', label: 'Delivered', desc: 'Customer received' },
    { stage: 'SETTLED', label: 'Settled', desc: 'Escrow funds released' }
  ];

  const currentStageIndex = stageOrder.findIndex((s) => s.stage === primaryListing.stage);

  return (
    <div className="space-y-6">
      {/* Farmer Profile Hero & The Core Problem Context */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors duration-150">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-3xl shadow-sm text-white">
              👨‍🌾
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ravi Singh</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-700/50 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Sovereign Producer</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center space-x-2 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Ludhiana, Punjab • Agro-Climatic Zone VI (Trans-Gangetic Plains)</span>
              </p>
              <div className="flex items-center space-x-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Reputation Score: <strong className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">97/100</strong></span>
                <span>•</span>
                <span>Completed Harvests: <strong className="text-slate-900 dark:text-white font-mono font-bold">47</strong></span>
                <span>•</span>
                <span>Fulfillment Rate: <strong className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">96%</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              onClick={() => setIsReputationOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Verifiable Reputation</span>
            </button>

            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Harvest Listing</span>
            </button>
          </div>
        </div>

        {/* Core Value Proposition Alert Box */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-rose-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-rose-200 dark:border-slate-800">
            <span className="font-semibold text-rose-800 dark:text-rose-400 flex items-center space-x-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>The Traditional Dilemma Solved</span>
            </span>
            <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
              Previously, Ravi had to take high-interest informal loans (24-36% APR) to buy seeds and fertilizer, grow crops blindly, and take whatever distress price middlemen dictated at harvest.
            </p>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
            <span className="font-semibold text-emerald-800 dark:text-emerald-400 flex items-center space-x-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AgriLedger Demand-Driven Model</span>
            </span>
            <p className="text-slate-800 dark:text-slate-300 leading-relaxed">
              <strong>Buyers commit demand first</strong> with funds locked in smart contract escrow. Ravi receives guaranteed demand visibility, locked pre-agreed prices, and 30% upfront working capital!
            </p>
          </div>
        </div>
      </div>

      {/* Primary Listing Card: Ravi Singh's Wheat */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors duration-150">
        {/* Listing Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 flex items-center justify-center text-2xl border border-amber-300 dark:border-amber-500/30">
              🌾
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {primaryListing.crop} ({primaryListing.variety})
                </h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-cyan-400 border border-slate-300 dark:border-slate-700 font-semibold">
                  {primaryListing.contractId}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 uppercase">
                  Active Forward Contract
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Harvest Target: <strong className="text-slate-900 dark:text-slate-200">{primaryListing.expectedHarvestDate}</strong> • Assigned Dark Store: <strong className="text-slate-900 dark:text-slate-200">{primaryListing.darkStoreName}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPartialOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/40 text-xs font-semibold transition"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Simulate Partial Harvest</span>
            </button>

            <button
              onClick={() => {
                setSelectedListing(primaryListing);
                setActiveView('contract');
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-cyan-300 border border-slate-300 dark:border-slate-700 text-xs font-semibold transition"
            >
              <FileCode2 className="w-3.5 h-3.5 text-emerald-700 dark:text-cyan-400" />
              <span>Audit Contract</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/40">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Quantity</span>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              {primaryListing.expectedQuantityKg.toLocaleString()} kg
            </div>
            <span className="text-[11px] text-slate-500">Target Harvest</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Committed Demand</span>
            <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">
              {primaryListing.committedQuantityKg.toLocaleString()} kg
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-500 font-semibold">{committedPct}% Pre-Sold</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Remaining Available</span>
            <div className="text-xl font-bold font-mono text-amber-700 dark:text-amber-400 mt-0.5">
              {remainingKg.toLocaleString()} kg
            </div>
            <span className="text-[11px] text-slate-500">Open on Marketplace</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pre-Commit Price</span>
            <div className="text-xl font-bold font-mono text-emerald-700 dark:text-cyan-400 mt-0.5">
              ₹{primaryListing.pricePerKg}/kg
            </div>
            <span className="text-[11px] text-slate-500">Locked Price</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Buyers</span>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5 flex items-center space-x-1">
              <Users className="w-4 h-4 text-emerald-600 dark:text-teal-400" />
              <span>{primaryListing.commitmentsCount} buyers</span>
            </div>
            <span className="text-[11px] text-slate-500">Consumers + Restaurant</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Expected Revenue</span>
            <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-500">Escrow Backed</span>
          </div>
        </div>

        {/* Commitment Progress Bar */}
        <div className="px-6 py-4 bg-white dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              Forward Demand Commitment Progress: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{primaryListing.committedQuantityKg} / {primaryListing.expectedQuantityKg} kg ({committedPct}%)</strong>
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              Escrow Secured: <strong className="text-slate-900 dark:text-white font-mono">₹{primaryListing.escrowTotalLocked.toLocaleString()}</strong>
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
            <div
              className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${committedPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
            <span>0 kg</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">
              {committedPct >= 65 ? 'Working capital release condition unlocked (30% Drawdown active)' : 'Awaiting commitments'}
            </span>
            <span>1,000 kg</span>
          </div>
        </div>

        {/* Crop Lifecycle Interactive Stepper */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <span>Crop Lifecycle Status</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  {primaryListing.stage}
                </span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Ravi controls stage progression. Smart contracts disburse milestone funds as verified steps pass.
              </p>
            </div>

            {/* Quick Stage Advance Action */}
            {currentStageIndex < stageOrder.length - 1 && (
              <button
                onClick={() => {
                  const nextStage = stageOrder[currentStageIndex + 1].stage;
                  advanceListingStage(primaryListing.id, nextStage);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm"
              >
                <span>Advance to: {stageOrder[currentStageIndex + 1].label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Stepper Visual */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
            {stageOrder.slice(2, 7).map((step, idx) => {
              const actualIdx = idx + 2;
              const isPassed = actualIdx <= currentStageIndex;
              const isCurrent = actualIdx === currentStageIndex;

              return (
                <div
                  key={step.stage}
                  onClick={() => advanceListingStage(primaryListing.id, step.stage)}
                  className={`p-3 rounded-xl border transition cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30 text-emerald-950 dark:bg-emerald-950/60 dark:border-emerald-500'
                      : isPassed
                        ? 'bg-white border-emerald-300 text-slate-800 dark:bg-slate-950 dark:border-emerald-800/50 dark:text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-950/40 dark:border-slate-800 dark:text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-semibold uppercase text-slate-500 dark:text-slate-400">
                      Phase {actualIdx + 1}
                    </span>
                    {isPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                    )}
                  </div>
                  <div className={`text-xs font-bold ${isCurrent ? 'text-emerald-800 dark:text-emerald-300' : isPassed ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                    {step.label}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {step.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Other Active Listings in Farmer's Portfolio */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          All Active Forward Harvest Listings ({listings.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.slice(0, 6).map((listing) => (
            <div
              key={listing.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <span>{listing.crop}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">({listing.variety})</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {listing.farmerName} • {listing.farmerLocation}
                  </p>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-slate-800 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-transparent">
                  ₹{listing.pricePerKg}/kg
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Committed: <strong className="text-slate-900 dark:text-white">{listing.committedQuantityKg} kg</strong></span>
                  <span>Target: <strong className="text-slate-700 dark:text-slate-300">{listing.expectedQuantityKg} kg</strong></span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full"
                    style={{
                      width: `${Math.min(100, Math.round((listing.committedQuantityKg / listing.expectedQuantityKg) * 100))}%`
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Harvest: {listing.expectedHarvestDate}</span>
                <span className="text-emerald-700 dark:text-cyan-400 font-mono text-[11px] font-semibold">{listing.contractId}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <CreateHarvestModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <PartialFulfillmentModal
        isOpen={isPartialOpen}
        onClose={() => setIsPartialOpen(false)}
        listing={primaryListing}
      />
      <FarmerReputationModal isOpen={isReputationOpen} onClose={() => setIsReputationOpen(false)} />
    </div>
  );
};
