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
  Sparkles, 
  Languages, 
  IndianRupee, 
  Package, 
  Calendar, 
  Building2, 
  Truck, 
  Check, 
  TrendingUp, 
  Info,
  Scale,
  Warehouse
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CreateHarvestModal } from './CreateHarvestModal';
import { PartialFulfillmentModal } from './PartialFulfillmentModal';
import { FarmerReputationModal } from './FarmerReputationModal';
import { LifecycleStage } from '../../types';
import { FarmerLang, farmerTranslations, stageTranslations } from './farmerTranslations';

const STAGE_ORDER: LifecycleStage[] = [
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
  'DELIVERED',
  'SETTLED'
];

const STAGE_ICONS: Record<LifecycleStage, string> = {
  DEMAND_POSTED: '📋',
  FARMER_COMMITTED: '🤝',
  CULTIVATION: '🌱',
  GROWING: '🌿',
  HARVEST_READY: '🌾',
  HARVESTED: '🚜',
  QUALITY_VERIFIED: '🔬',
  IN_TRANSIT: '🚚',
  AT_DARK_STORE: '🏬',
  OUT_FOR_DELIVERY: '🛵',
  DELIVERED: '📦',
  SETTLED: '💰'
};

const CROP_ICONS: Record<string, string> = {
  Wheat: '🌾',
  Rice: '🍚',
  Mustard: '🌼',
  Tomato: '🍅',
  Onion: '🧅',
  Potato: '🥔',
  Cotton: '🌿',
  Soybean: '🌱'
};

const CROP_HINDI_NAMES: Record<string, string> = {
  Wheat: 'गेहूं',
  Rice: 'बासमती चावल',
  Mustard: 'सरसों',
  Tomato: 'टमाटर',
  Onion: 'प्याज',
  Potato: 'आलू',
  Cotton: 'कपास',
  Soybean: 'सोयाबीन'
};

export const FarmerDashboard: React.FC = () => {
  const { 
    listings, 
    advanceListingStage, 
    setSelectedListing, 
    setActiveView 
  } = useApp();

  const [lang, setLang] = useState<FarmerLang>('en');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPartialOpen, setIsPartialOpen] = useState(false);
  const [isReputationOpen, setIsReputationOpen] = useState(false);

  const t = farmerTranslations[lang];

  // Focus on Ravi Singh's primary demo listing (Ludhiana Wheat)
  const raviListings = listings.filter((l) => l.farmerId === 'farmer-ravi-singh');
  const primaryListing = raviListings.find((l) => l.crop === 'Wheat') || raviListings[0] || listings[0];

  const committedPct = Math.round((primaryListing.committedQuantityKg / primaryListing.expectedQuantityKg) * 100);
  const remainingKg = Math.max(0, primaryListing.expectedQuantityKg - primaryListing.committedQuantityKg);
  const totalRevenue = primaryListing.expectedQuantityKg * primaryListing.pricePerKg;
  const initialWorkingCapital = Math.round((primaryListing.committedQuantityKg * primaryListing.pricePerKg) * 0.3);

  const currentStageIndex = STAGE_ORDER.indexOf(primaryListing.stage);

  return (
    <div className="space-y-6">
      {/* 1. Farmer Profile Header & Accessibility Toolbar */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-sm transition-colors duration-150">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          {/* Farmer Avatar & Info */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-3xl shadow-sm text-white shrink-0">
              👨‍🌾
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {lang === 'hi' ? 'रवि सिंह (Ravi Singh)' : 'Ravi Singh'}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-700/50 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.farmerTitle}</span>
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700/40">
                  {t.scoreExcellent}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center space-x-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t.location}</span>
              </p>

              {/* Stat Chips */}
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.reputationScore}:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">97/100</strong>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <span>🌾</span>
                  <span>{t.completedHarvests}:</span>
                  <strong className="text-slate-900 dark:text-white font-mono font-bold">47</strong>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.fulfillmentRate}:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">96%</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action Toolbar & Language Switcher */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                  lang === 'en'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Switch interface to English"
              >
                <span>🇬🇧 English</span>
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                  lang === 'hi'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="सरल हिन्दी में बदलें"
              >
                <span>🇮🇳 हिन्दी</span>
              </button>
            </div>

            {/* Scorecard Button */}
            <button
              onClick={() => setIsReputationOpen(true)}
              className="flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>{t.viewReputation}</span>
            </button>

            {/* Add Harvest Button */}
            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{t.createListing}</span>
            </button>
          </div>
        </div>

        {/* 2. Clear Visual Problem & Solution Comparison */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-rose-50 dark:bg-rose-950/20 p-4 rounded-xl border border-rose-200 dark:border-rose-900/40">
            <span className="font-semibold text-rose-800 dark:text-rose-400 flex items-center space-x-2 mb-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>{t.dilemmaTitle}</span>
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {t.dilemmaDesc}
            </p>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
            <span className="font-semibold text-emerald-800 dark:text-emerald-400 flex items-center space-x-2 mb-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.solutionTitle}</span>
            </span>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
              {t.solutionDesc}
            </p>
          </div>
        </div>

        {/* 3. Quick Farmer Guide Banner (3 Simple Steps) */}
        <div className="mt-4 bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5 shrink-0">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>{t.guideTitle}:</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
              <strong className="text-emerald-700 dark:text-emerald-400 block">{t.step1Title}</strong>
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">{t.step1Desc}</span>
            </div>
            <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
              <strong className="text-emerald-700 dark:text-emerald-400 block">{t.step2Title}</strong>
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">{t.step2Desc}</span>
            </div>
            <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
              <strong className="text-emerald-700 dark:text-emerald-400 block">{t.step3Title}</strong>
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">{t.step3Desc}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Primary Active Listing Card: Ravi Singh's Wheat */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors duration-150">
        {/* Card Header */}
        <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 flex items-center justify-center text-2xl border border-amber-300 dark:border-amber-500/30 shrink-0">
              🌾
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {lang === 'hi' ? `${CROP_HINDI_NAMES[primaryListing.crop] || primaryListing.crop} (${primaryListing.variety})` : `${primaryListing.crop} (${primaryListing.variety})`}
                </h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-emerald-400 border border-slate-300 dark:border-slate-700 font-semibold">
                  {primaryListing.contractId}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 uppercase flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>{t.activeContract}</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                <span>{t.harvestDateLabel}: <strong className="text-slate-900 dark:text-slate-200">{primaryListing.expectedHarvestDate}</strong></span>
                <span>•</span>
                <span>{t.assignedHubLabel}: <strong className="text-slate-900 dark:text-slate-200">{primaryListing.darkStoreName}</strong></span>
              </p>
            </div>
          </div>

          {/* Action Buttons: Simulator & Contract Audit */}
          <div className="flex items-center space-x-2.5 w-full md:w-auto">
            <button
              onClick={() => setIsPartialOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/40 text-xs font-semibold transition shadow-sm"
              title={lang === 'hi' ? 'कम पैदावार या मौसम नुकसान का हिसाब देखें' : 'Simulate yield reduction payout'}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{t.simulateYieldBtn}</span>
            </button>

            <button
              onClick={() => {
                setSelectedListing(primaryListing);
                setActiveView('contract');
              }}
              className="flex-1 md:flex-none flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold transition shadow-sm"
              title={lang === 'hi' ? 'डिजिटल अनुबंध व नियम देखें' : 'View contract code & clauses'}
            >
              <FileCode2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>{t.auditContractBtn}</span>
            </button>
          </div>
        </div>

        {/* 5. 6 Key Metrics Cards (Clear, Visual, Icon-Rich) */}
        <div className="p-5 md:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/40">
          {/* 1. Total Target */}
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
              <Package className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold">{t.totalQuantity}</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
              {primaryListing.expectedQuantityKg.toLocaleString()} kg
            </div>
            <span className="text-[11px] text-slate-500">{t.totalQuantitySub}</span>
          </div>

          {/* 2. Committed Demand */}
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-emerald-300 dark:border-emerald-800/60 shadow-2xs">
            <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 text-xs mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">{t.committedDemand}</span>
            </div>
            <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
              {primaryListing.committedQuantityKg.toLocaleString()} kg
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-500 font-semibold">
              {committedPct}% {t.committedDemandSub}
            </span>
          </div>

          {/* 3. Remaining Available */}
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center space-x-1.5 text-amber-700 dark:text-amber-400 text-xs mb-1">
              <Scale className="w-4 h-4 text-amber-500" />
              <span className="font-semibold">{t.remainingAvailable}</span>
            </div>
            <div className="text-xl font-bold font-mono text-amber-700 dark:text-amber-400">
              {remainingKg.toLocaleString()} kg
            </div>
            <span className="text-[11px] text-slate-500">{t.remainingAvailableSub}</span>
          </div>

          {/* 4. Guaranteed Rate */}
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 text-xs mb-1">
              <IndianRupee className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">{t.guaranteedPrice}</span>
            </div>
            <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
              ₹{primaryListing.pricePerKg}/kg
            </div>
            <span className="text-[11px] text-slate-500">{t.guaranteedPriceSub}</span>
          </div>

          {/* 5. Committed Buyers */}
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-400 text-xs mb-1">
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold">{t.activeBuyers}</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
              {primaryListing.commitmentsCount} {lang === 'hi' ? 'खरीदार' : 'buyers'}
            </div>
            <span className="text-[11px] text-slate-500">{t.activeBuyersSub}</span>
          </div>

          {/* 6. Expected Revenue */}
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-emerald-300 dark:border-emerald-800/60 shadow-2xs">
            <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 text-xs mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">{t.expectedRevenue}</span>
            </div>
            <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-500 font-semibold">{t.expectedRevenueSub}</span>
          </div>
        </div>

        {/* 6. Advance Capital Highlight Banner & Commitment Progress Bar */}
        <div className="p-5 md:p-6 bg-white dark:bg-slate-900 space-y-3.5 border-b border-slate-200 dark:border-slate-800">
          {/* Highlight Banner */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 flex items-start space-x-3 text-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              💰
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm flex items-center space-x-2">
                <span>{committedPct >= 65 ? t.advanceCapitalNotice : t.awaitingCommitments}</span>
              </h4>
              <p className="text-emerald-800/80 dark:text-emerald-400/90 text-xs">
                {lang === 'hi' 
                  ? `बीज, खाद, और डीजल की लागत के लिए ₹${initialWorkingCapital.toLocaleString()} सीधे आपके खाते में जारी। शेष राशि डिलीवरी पर तुरंत मिलेगी।`
                  : `Working capital of ₹${initialWorkingCapital.toLocaleString()} is released upon sowing. The remaining funds are disbursed seamlessly upon hub delivery.`}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {t.progressLabel}: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{primaryListing.committedQuantityKg} / {primaryListing.expectedQuantityKg} kg ({committedPct}%)</strong>
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                {t.escrowSecured}: <strong className="text-slate-900 dark:text-white font-mono">₹{primaryListing.escrowTotalLocked.toLocaleString()}</strong>
              </span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
              <div
                className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-700 shadow-xs"
                style={{ width: `${committedPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
              <span>0 kg</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                {committedPct >= 65 ? `✓ ${committedPct}% ${t.committedDemandSub}` : `${committedPct}%`}
              </span>
              <span>{primaryListing.expectedQuantityKg.toLocaleString()} kg</span>
            </div>
          </div>
        </div>

        {/* 7. Crop Lifecycle Interactive Stepper (All 10 Stages with Icons) */}
        <div className="p-5 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <span>{t.lifecycleTitle}</span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold">
                  {stageTranslations[primaryListing.stage] ? stageTranslations[primaryListing.stage][lang].label : primaryListing.stage}
                </span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t.lifecycleSubtitle}
              </p>
            </div>

            {/* Quick Next Stage Advance Action Button */}
            {currentStageIndex < STAGE_ORDER.length - 1 && (
              <button
                onClick={() => {
                  const nextStage = STAGE_ORDER[currentStageIndex + 1];
                  advanceListingStage(primaryListing.id, nextStage);
                }}
                className="flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm shrink-0"
              >
                <span>
                  {t.nextStageButton}: {stageTranslations[STAGE_ORDER[currentStageIndex + 1]][lang].label}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Stepper Grid (10 Stages: 5 per row on desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
            {STAGE_ORDER.map((stageKey, actualIdx) => {
              const stepInfo = stageTranslations[stageKey][lang];
              const isPassed = actualIdx <= currentStageIndex;
              const isCurrent = actualIdx === currentStageIndex;
              const stageIcon = STAGE_ICONS[stageKey];

              return (
                <div
                  key={stageKey}
                  onClick={() => advanceListingStage(primaryListing.id, stageKey)}
                  className={`p-3 rounded-xl border transition cursor-pointer select-none ${
                    isCurrent
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30 text-emerald-950 dark:bg-emerald-950/60 dark:border-emerald-500 shadow-xs'
                      : isPassed
                        ? 'bg-white border-emerald-300 text-slate-800 dark:bg-slate-950 dark:border-emerald-800/60 dark:text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-950/40 dark:border-slate-800 dark:text-slate-500 hover:border-slate-300'
                  }`}
                  title={lang === 'hi' ? `${stepInfo.label} चरण पर सेट करें` : `Click to update to ${stepInfo.label}`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base">{stageIcon}</span>
                    <span className="text-[10px] font-mono font-semibold uppercase text-slate-500 dark:text-slate-400">
                      {t.phaseLabel} {actualIdx + 1}
                    </span>
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    )}
                  </div>
                  <div className={`text-xs font-bold leading-tight ${isCurrent ? 'text-emerald-800 dark:text-emerald-300' : isPassed ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                    {stepInfo.label}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {stepInfo.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 8. Other Active Listings in Farmer's Portfolio */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-2">
            <span>🌾</span>
            <span>{t.allListingsTitle} ({listings.length})</span>
          </h3>
          <span className="text-xs text-slate-500">
            {lang === 'hi' ? 'सभी सौदे सुरक्षित बैंक एस्क्रो में हैं' : 'All contracts secured by smart contract escrow'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.slice(0, 6).map((listing) => {
            const cropIcon = CROP_ICONS[listing.crop] || '🌱';
            const cropHindi = CROP_HINDI_NAMES[listing.crop] || listing.crop;
            const itemCommittedPct = Math.min(100, Math.round((listing.committedQuantityKg / listing.expectedQuantityKg) * 100));

            return (
              <div
                key={listing.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl">{cropIcon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                        <span>{lang === 'hi' ? cropHindi : listing.crop}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">({listing.variety})</span>
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {lang === 'hi' && listing.farmerName === 'Ravi Singh' ? 'रवि सिंह' : listing.farmerName} • {listing.farmerLocation}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 dark:bg-slate-800 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-transparent">
                    ₹{listing.pricePerKg}/kg
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>{t.committedLabel}: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{listing.committedQuantityKg.toLocaleString()} kg</strong> ({itemCommittedPct}%)</span>
                    <span>{t.targetLabel}: <strong className="text-slate-700 dark:text-slate-300 font-mono">{listing.expectedQuantityKg.toLocaleString()} kg</strong></span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full"
                      style={{ width: `${itemCommittedPct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.harvestLabel}: {listing.expectedHarvestDate}</span>
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px] font-semibold">{listing.contractId}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 9. Interactive Modals (passing lang for full Hindi & English experience) */}
      <CreateHarvestModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        lang={lang} 
      />
      <PartialFulfillmentModal
        isOpen={isPartialOpen}
        onClose={() => setIsPartialOpen(false)}
        listing={primaryListing}
        lang={lang}
      />
      <FarmerReputationModal 
        isOpen={isReputationOpen} 
        onClose={() => setIsReputationOpen(false)} 
        lang={lang} 
      />
    </div>
  );
};
