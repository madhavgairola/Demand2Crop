import React from 'react';
import { X, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FarmerLang, farmerTranslations } from './farmerTranslations';

interface FarmerReputationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: FarmerLang;
}

const BADGE_HINDI_MAP: Record<string, string> = {
  'Tier-1 Sovereign Producer': 'टियर-1 प्रमाणित किसान उत्पादक',
  'Organic Certified (Punjab Agro)': 'जैविक खेती प्रमाणित (पंजाब एग्रो)',
  'Cold Chain Certified Partner': 'कोल्ड चेन प्रमाणित पार्टनर',
  'Solar Irrigation Accredited': 'सौर ऊर्जा सूक्ष्म-सिंचाई मान्यता'
};

export const FarmerReputationModal: React.FC<FarmerReputationModalProps> = ({ isOpen, onClose, lang = 'en' }) => {
  const { farmerReputation } = useApp();
  const t = farmerTranslations[lang];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/30">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center border border-emerald-300 dark:border-emerald-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t.repModalTitle}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.repModalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Farmer Card */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-xl font-bold text-white shadow-sm">
                🌾
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {lang === 'hi' ? 'रवि सिंह' : farmerReputation.farmerName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'hi' ? 'लुधियाना, पंजाब' : farmerReputation.location} • {lang === 'hi' ? 'किसान आईडी #0482' : 'Sovereign Producer ID #0482'}
                </p>
                <div className="flex items-center space-x-1.5 mt-1 font-mono text-[10px] text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'डिजिटल पहचान टोकन:' : 'On-Chain Token:'} {farmerReputation.onChainTokenId}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                {farmerReputation.reputationScore}
                <span className="text-sm text-slate-400">/100</span>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800">
                {t.repTierBadge}
              </span>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">{t.repCompleted}</span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {farmerReputation.completedContracts}
              </div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                {lang === 'hi' ? 'फसलें' : 'Harvests'}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">{t.repFulfillment}</span>
              <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400 mt-1">
                {farmerReputation.fulfillmentRatePct}%
              </div>
              <span className="text-[10px] text-slate-500">
                {lang === 'hi' ? 'मांग पूर्ति' : 'Yield match'}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">{t.repOnTime}</span>
              <div className="text-xl font-bold font-mono text-emerald-700 dark:text-cyan-400 mt-1">
                {farmerReputation.onTimeDeliveryRatePct}%
              </div>
              <span className="text-[10px] text-slate-500">
                {lang === 'hi' ? 'वेयरहाउस डिलीवरी' : 'Hub delivery'}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">{t.repQuality}</span>
              <div className="text-xl font-bold font-mono text-emerald-700 dark:text-amber-400 mt-1">
                {farmerReputation.qualityVerificationPct}%
              </div>
              <span className="text-[10px] text-slate-500">
                {lang === 'hi' ? 'ग्रेड-ए प्रमाणित' : 'Grade A test'}
              </span>
            </div>
          </div>

          {/* Badges */}
          <div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-2">
              {t.repBadgesTitle}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {farmerReputation.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 flex items-center space-x-2 text-xs text-slate-800 dark:text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{lang === 'hi' && BADGE_HINDI_MAP[badge] ? BADGE_HINDI_MAP[badge] : badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Contract Sample */}
          <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
              {t.repRecentTitle}
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 py-1 border-b border-slate-200 dark:border-slate-800/60 font-mono">
                <span>#HC-39102 ({lang === 'hi' ? 'बासमती चावल - 4,000 किलो' : 'Basmati Rice - 4,000 kg'})</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">{lang === 'hi' ? '100% सफल ✓' : '100% Fulfilled ✓'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 py-1 border-b border-slate-200 dark:border-slate-800/60 font-mono">
                <span>#HC-28491 ({lang === 'hi' ? 'गेहूं PBW-550 - 1,200 किलो' : 'Wheat PBW-550 - 1,200 kg'})</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">{lang === 'hi' ? '100% सफल ✓' : '100% Fulfilled ✓'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 py-1 font-mono">
                <span>#HC-19401 ({lang === 'hi' ? 'सरसों बीज - 800 किलो' : 'Mustard Seed - 800 kg'})</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">{lang === 'hi' ? '100% सफल ✓' : '100% Fulfilled ✓'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">{t.repZeroDefault}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition"
          >
            {t.modalClose}
          </button>
        </div>
      </div>
    </div>
  );
};
