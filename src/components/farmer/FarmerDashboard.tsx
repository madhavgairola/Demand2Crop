import React, { useState, useRef, useEffect } from 'react';
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
  Warehouse,
  User,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CreateHarvestModal } from './CreateHarvestModal';
import { PartialFulfillmentModal } from './PartialFulfillmentModal';
import { FarmerReputationModal } from './FarmerReputationModal';
import { LifecycleStage, HarvestListing } from '../../types';
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
  'Basmati Rice': '🍚',
  Mustard: '🌼',
  'Mustard Seed': '🌼',
  Tomato: '🍅',
  Tomatoes: '🍅',
  Onion: '🧅',
  Onions: '🧅',
  Potato: '🥔',
  Potatoes: '🥔',
  Cotton: '🌿',
  Soybean: '🌱',
  Apples: '🍎',
  Strawberries: '🍓',
  'Green Chillies': '🌶️',
  'Pulses (Arhar)': '🫘'
};

const CROP_HINDI_NAMES: Record<string, string> = {
  Wheat: 'गेहूं',
  Rice: 'बासमती चावल',
  'Basmati Rice': 'बासमती चावल',
  Mustard: 'सरसों',
  'Mustard Seed': 'सरसों',
  Tomato: 'टमाटर',
  Tomatoes: 'टमाटर',
  Onion: 'प्याज',
  Onions: 'प्याज',
  Potato: 'आलू',
  Potatoes: 'आलू',
  Cotton: 'कपास',
  Soybean: 'सोयाबीन',
  Apples: 'सेब',
  Strawberries: 'स्ट्रॉबेरी',
  'Green Chillies': 'हरी मिर्च',
  'Pulses (Arhar)': 'अरहर दाल'
};

export const FarmerDashboard: React.FC = () => {
  const { 
    listings, 
    advanceListingStage, 
    setSelectedListing, 
    setActiveView,
    lang,
    setLang,
    farmerProfile
  } = useApp();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPartialOpen, setIsPartialOpen] = useState(false);
  const [isReputationOpen, setIsReputationOpen] = useState(false);

  const t = farmerTranslations[lang];

  const [selectedListingId, setSelectedListingId] = useState<string>('');
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);
  const [detailsModalListing, setDetailsModalListing] = useState<HarvestListing | null>(null);

  // Farmer's listings
  const raviListings = listings.filter((l) => l.farmerId === 'farmer-ravi-singh');
  const primaryListing = 
    (selectedListingId ? listings.find((l) => l.id === selectedListingId) : null) || 
    raviListings[0] || 
    listings[0];

  const advancePct = primaryListing.advancePayoutPct ?? 30;
  const committedPct = Math.round((primaryListing.committedQuantityKg / primaryListing.expectedQuantityKg) * 100);
  const remainingKg = Math.max(0, primaryListing.expectedQuantityKg - primaryListing.committedQuantityKg);
  const totalRevenue = primaryListing.expectedQuantityKg * primaryListing.pricePerKg;
  const initialWorkingCapital = Math.round((primaryListing.committedQuantityKg * primaryListing.pricePerKg) * (advancePct / 100));

  const currentStageIndex = STAGE_ORDER.indexOf(primaryListing.stage);

  // Stepper Horizontal Scroll State & Auto-centering
  const stepperRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBounds = () => {
    if (stepperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = stepperRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scrollStepper = (direction: 'left' | 'right') => {
    if (stepperRef.current) {
      const scrollAmount = Math.max(220, Math.round(stepperRef.current.clientWidth * 0.65));
      stepperRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollBounds, 350);
    }
  };

  // Center active step in viewport smoothly on load or stage change
  useEffect(() => {
    if (activeStepRef.current && stepperRef.current) {
      const container = stepperRef.current;
      const activeEl = activeStepRef.current;
      const targetScroll = activeEl.offsetLeft - (container.clientWidth / 2) + (activeEl.clientWidth / 2);
      container.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
      setTimeout(checkScrollBounds, 350);
    }
  }, [primaryListing.stage, primaryListing.id]);

  useEffect(() => {
    checkScrollBounds();
    const handleResize = () => checkScrollBounds();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="space-y-6">
      {/* 1. Farmer Profile Header */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-sm transition-colors duration-150">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Farmer Avatar & Name & Badges */}
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-3xl shadow-sm text-white shrink-0">
              👨‍🌾
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {farmerProfile.name} {lang === 'hi' ? '(किसान)' : ''}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-700/50 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.farmerTitle}</span>
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700/40">
                  {t.scoreExcellent}
                </span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* View Trust Card Button */}
            <button
              onClick={() => setIsReputationOpen(true)}
              className="flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>{t.viewReputation}</span>
            </button>

            {/* Add New Harvest Button */}
            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{t.createListing}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Crop Management Switcher Tabs */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
            {lang === 'hi' ? 'प्रबंधित फसल:' : 'Managing Harvest:'}
          </span>
          {raviListings.map((l) => {
            const isSelected = l.id === primaryListing.id;
            const cropIcon = CROP_ICONS[l.crop] || '🌱';
            const cropHindi = CROP_HINDI_NAMES[l.crop] || l.crop;
            return (
              <button
                key={l.id}
                onClick={() => setSelectedListingId(l.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center space-x-2 border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span>{cropIcon}</span>
                <span>{lang === 'hi' ? cropHindi : l.crop}</span>
                <span className="text-[10px] opacity-80 font-mono">({l.variety})</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Primary Active Listing Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors duration-150">
        {/* Card Header */}
        <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 flex items-center justify-center text-2xl border border-amber-300 dark:border-amber-500/30 shrink-0">
              {CROP_ICONS[primaryListing.crop] || '🌱'}
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
                <span>
                  {committedPct >= 65
                    ? (lang === 'hi' 
                        ? `🎉 शुभ समाचार: बीज व खाद के लिए ₹${initialWorkingCapital.toLocaleString()} (${advancePct}% अग्रिम राशि) स्वीकृत! (कुल ₹${primaryListing.escrowTotalLocked.toLocaleString()} बैंक में सुरक्षित)`
                        : `🎉 Good News: ₹${initialWorkingCapital.toLocaleString()} (${advancePct}% Advance Capital) ready for seeds & fertilizer! (₹${primaryListing.escrowTotalLocked.toLocaleString()} safely in escrow)`)
                    : (lang === 'hi'
                        ? `अग्रिम राशि (${advancePct}%) प्राप्त करने के लिए खरीदारों की बुकिंग की प्रतीक्षा है।`
                        : `Awaiting buyer bookings to unlock ${advancePct}% upfront growing capital.`)}
                </span>
              </h4>
              <p className="text-emerald-800/80 dark:text-emerald-400/90 text-xs">
                {lang === 'hi' 
                  ? `बीज, खाद, और खेत की तैयारी के लिए ₹${initialWorkingCapital.toLocaleString()} (${advancePct}%) बुवाई होते ही सीधे आपके खाते में जारी। शेष राशि डिलीवरी पर तुरंत मिलेगी।`
                  : `Working capital of ₹${initialWorkingCapital.toLocaleString()} (${advancePct}%) is unlocked upon sowing for certified seeds & fertilizer. Balance is paid upon delivery.`}
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

        {/* 7. Crop Lifecycle Interactive Stepper (Single Scrollable Row with Navigation Arrows) */}
        <div className="p-5 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <span>{t.lifecycleTitle}</span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold">
                  {stageTranslations[primaryListing.stage] ? stageTranslations[primaryListing.stage][lang].label : primaryListing.stage}
                </span>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                  ({currentStageIndex + 1}/{STAGE_ORDER.length})
                </span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t.lifecycleSubtitle}
              </p>
            </div>

            {/* Quick Next Stage Advance Action Button & Stepper Nav Arrows */}
            <div className="flex items-center gap-2">
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
          </div>

          {/* Stepper Single Row with Navigation Arrows on Either Side */}
          <div className="relative flex items-center gap-2 pt-1">
            {/* Left Move Arrow */}
            <button
              type="button"
              onClick={() => scrollStepper('left')}
              disabled={!canScrollLeft}
              className={`w-9 h-9 shrink-0 rounded-xl border flex items-center justify-center transition shadow-xs ${
                canScrollLeft
                  ? 'bg-white hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-40'
              }`}
              title={lang === 'hi' ? 'पीछे के चरण देखें' : 'Move to previous steps'}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Single Horizontal Scrollable Row */}
            <div
              ref={stepperRef}
              onScroll={checkScrollBounds}
              className="flex-1 flex items-stretch space-x-3 overflow-x-auto scroll-smooth py-1.5 px-0.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent"
              style={{ scrollbarWidth: 'thin' }}
            >
              {STAGE_ORDER.map((stageKey, actualIdx) => {
                const stepInfo = stageTranslations[stageKey][lang];
                const isPassed = actualIdx <= currentStageIndex;
                const isCurrent = actualIdx === currentStageIndex;
                const stageIcon = STAGE_ICONS[stageKey];

                return (
                  <div
                    key={stageKey}
                    ref={isCurrent ? activeStepRef : null}
                    onClick={() => advanceListingStage(primaryListing.id, stageKey)}
                    className={`w-52 sm:w-56 shrink-0 p-3.5 rounded-xl border transition cursor-pointer select-none flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30 text-emerald-950 dark:bg-emerald-950/60 dark:border-emerald-500 shadow-xs'
                        : isPassed
                          ? 'bg-white border-emerald-300 text-slate-800 dark:bg-slate-950 dark:border-emerald-800/60 dark:text-slate-300 hover:border-emerald-400'
                          : 'bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-950/40 dark:border-slate-800 dark:text-slate-500 hover:border-slate-300'
                    }`}
                    title={lang === 'hi' ? `${stepInfo.label} चरण पर सेट करें` : `Click to update to ${stepInfo.label}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">{stageIcon}</span>
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
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {stepInfo.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Move Arrow */}
            <button
              type="button"
              onClick={() => scrollStepper('right')}
              disabled={!canScrollRight}
              className={`w-9 h-9 shrink-0 rounded-xl border flex items-center justify-center transition shadow-xs ${
                canScrollRight
                  ? 'bg-white hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-40'
              }`}
              title={lang === 'hi' ? 'आगे के चरण देखें' : 'Move to next steps'}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
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
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'hi' ? 'विवरण देखने के लिए किसी भी फसल पर होवर या क्लिक करें' : 'Hover or click any card for details'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.slice(0, 6).map((listing) => {
            const cropIcon = CROP_ICONS[listing.crop] || '🌱';
            const cropHindi = CROP_HINDI_NAMES[listing.crop] || listing.crop;
            const itemCommittedPct = Math.min(100, Math.round((listing.committedQuantityKg / listing.expectedQuantityKg) * 100));
            const isSelected = listing.id === primaryListing.id;
            const isHovered = hoveredListingId === listing.id;

            return (
              <div
                key={listing.id}
                onMouseEnter={() => setHoveredListingId(listing.id)}
                onMouseLeave={() => setHoveredListingId(null)}
                onClick={() => {
                  setSelectedListingId(listing.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative bg-white dark:bg-slate-900 border rounded-xl p-4 cursor-pointer transition-all duration-200 shadow-xs ${
                  isSelected 
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600/50 hover:shadow-md'
                }`}
                title={lang === 'hi' ? 'विवरण देखने व प्रबंधन करने के लिए क्लिक करें' : 'Click to select and manage this harvest'}
              >
                {/* 1. Crop Name & Cost (Clean minimalist face) */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl shrink-0">{cropIcon}</span>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {lang === 'hi' ? cropHindi : listing.crop}
                        </h4>
                        {isSelected && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                            {lang === 'hi' ? 'सक्रिय' : 'Active'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 dark:bg-slate-800 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-transparent">
                    ₹{listing.pricePerKg}/kg
                  </span>
                </div>

                {/* 2. Pre-book Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                    <span>
                      {t.committedLabel}: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{itemCommittedPct}%</strong>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetailsModalListing(listing);
                      }}
                      className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center space-x-1"
                      title={lang === 'hi' ? 'पूरा विवरण देखें' : 'View full details'}
                    >
                      <span>{t.viewDetailsBtn}</span>
                      <Info className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div
                      className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${itemCommittedPct}%` }}
                    />
                  </div>
                </div>

                {/* Hover Tab Popover (Opens cleanly on Hover) */}
                {isHovered && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 z-40 p-4 bg-white dark:bg-slate-900 border border-emerald-400 dark:border-emerald-600/50 rounded-xl shadow-xl space-y-2.5 text-xs animate-fade-in pointer-events-auto">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {lang === 'hi' ? cropHindi : listing.crop}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 ml-1.5 font-mono text-[11px]">
                          ({listing.variety})
                        </span>
                      </div>
                      <span className="font-mono text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        {listing.contractId}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.locationLabel}</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200 truncate block">
                          {listing.farmerLocation}, {listing.farmerState}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.harvestLabel}</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{listing.expectedHarvestDate}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.targetLabel}</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200 font-mono">{listing.expectedQuantityKg.toLocaleString()} kg</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.committedLabel}</span>
                        <span className="font-medium text-emerald-700 dark:text-emerald-400 font-mono">{listing.committedQuantityKg.toLocaleString()} kg</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                        {listing.advancePayoutPct || 30}% {lang === 'hi' ? 'अग्रिम पूंजी' : 'seed advance'}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                        <span>{t.selectToManage}</span>
                        <ArrowRight className="w-3 h-3 text-emerald-600" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Click Details Modal for Farmer Dashboard Listings */}
      {detailsModalListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">{CROP_ICONS[detailsModalListing.crop] || '🌱'}</span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {lang === 'hi' ? CROP_HINDI_NAMES[detailsModalListing.crop] || detailsModalListing.crop : detailsModalListing.crop}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">{detailsModalListing.variety}</p>
                </div>
              </div>
              <button
                onClick={() => setDetailsModalListing(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.guaranteedPrice}</span>
                  <span className="text-sm font-bold font-mono text-emerald-700 dark:text-emerald-400">₹{detailsModalListing.pricePerKg} / kg</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.harvestLabel}</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{detailsModalListing.expectedHarvestDate}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.committedDemand}</span>
                  <span className="text-sm font-bold font-mono text-emerald-700 dark:text-emerald-400">{detailsModalListing.committedQuantityKg} kg</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.totalQuantity}</span>
                  <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">{detailsModalListing.expectedQuantityKg} kg</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="font-semibold text-emerald-900 dark:text-emerald-300">
                  {lang === 'hi' ? 'अग्रिम पूंजी सहायता:' : 'Growing Advance Rate:'} {detailsModalListing.advancePayoutPct || 30}%
                </span>
                <p className="text-emerald-800/80 dark:text-emerald-400 text-[11px]">
                  {lang === 'hi' 
                    ? `बुवाई होते ही ₹${Math.round(detailsModalListing.committedQuantityKg * detailsModalListing.pricePerKg * ((detailsModalListing.advancePayoutPct || 30)/100)).toLocaleString()} की पूंजी सीधे खाते में जारी होगी।`
                    : `₹${Math.round(detailsModalListing.committedQuantityKg * detailsModalListing.pricePerKg * ((detailsModalListing.advancePayoutPct || 30)/100)).toLocaleString()} eligible for seed & fertilizer release upon sowing.`}
                </p>
              </div>

              <div className="flex items-center justify-between text-slate-500 pt-1">
                <span>{detailsModalListing.farmerLocation}, {detailsModalListing.farmerState}</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400">{detailsModalListing.contractId}</span>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end space-x-2">
              <button
                onClick={() => setDetailsModalListing(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {t.hideDetailsBtn}
              </button>
              <button
                onClick={() => {
                  setSelectedListingId(detailsModalListing.id);
                  setDetailsModalListing(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                {t.selectToManage}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Interactive Modals (passing lang for full Hindi & English experience) */}
      <CreateHarvestModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onCreated={(newId) => setSelectedListingId(newId)}
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
