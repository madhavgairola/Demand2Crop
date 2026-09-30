import React, { useState } from 'react';
import { X, Sprout, Calendar, MapPin, AlertCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CropType } from '../../types';
import { CROP_METADATA_REGISTRY } from '../../services/cropMetadata';
import { FarmerLang, farmerTranslations } from './farmerTranslations';

interface CreateHarvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: FarmerLang;
  onCreated?: (newListingId: string) => void;
}

const CROP_HINDI_NAMES: Partial<Record<CropType, string>> = {
  'Wheat': 'गेहूं',
  'Basmati Rice': 'बासमती चावल / धान',
  'Tomatoes': 'टमाटर',
  'Onions': 'प्याज',
  'Potatoes': 'आलू',
  'Mustard Seed': 'सरसों',
  'Cotton': 'कपास',
  'Soybean': 'सोयाबीन',
  'Apples': 'सेब',
  'Strawberries': 'स्ट्रॉबेरी',
  'Green Chillies': 'हरी मिर्च',
  'Pulses (Arhar)': 'अरहर दाल'
};

export const CreateHarvestModal: React.FC<CreateHarvestModalProps> = ({ isOpen, onClose, lang = 'en', onCreated }) => {
  const { createHarvestListing } = useApp();
  const t = farmerTranslations[lang];

  const [crop, setCrop] = useState<CropType>('Wheat');
  const [variety, setVariety] = useState<string>('Sharbati PBW-550');
  const [expectedQuantityKg, setExpectedQuantityKg] = useState<number>(1000);
  const [pricePerKg, setPricePerKg] = useState<number>(10);
  const [expectedHarvestDate, setExpectedHarvestDate] = useState<string>('2026-12-15');
  const [farmerLocation, setFarmerLocation] = useState<string>('Ludhiana');
  const [description, setDescription] = useState<string>(
    'Certified non-GMO golden wheat grown with organic compost and solar-powered micro-irrigation.'
  );

  if (!isOpen) return null;

  const cropMeta = CROP_METADATA_REGISTRY[crop];
  const totalExpectedRevenue = expectedQuantityKg * pricePerKg;
  const initialWorkingCapital = Math.round(totalExpectedRevenue * 0.3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createHarvestListing({
      crop,
      variety,
      expectedQuantityKg,
      pricePerKg,
      expectedHarvestDate,
      farmerLocation,
      shelfLife: `${cropMeta.shelfLifeDays} days (${cropMeta.perishability})`,
      qualityGrade: 'GRADE_A',
      description
    });
    if (onCreated && created) {
      onCreated(created.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-400 flex items-center justify-center border border-emerald-300 dark:border-emerald-500/30">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t.createModalTitle}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.createModalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Crop Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {t.cropLabel}
              </label>
              <select
                value={crop}
                onChange={(e) => {
                  const newCrop = e.target.value as CropType;
                  setCrop(newCrop);
                  const meta = CROP_METADATA_REGISTRY[newCrop];
                  if (meta) {
                    setPricePerKg(meta.defaultPricePerKg || 15);
                  }
                }}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
              >
                {Object.keys(CROP_METADATA_REGISTRY).map((c) => (
                  <option key={c} value={c}>
                    {CROP_METADATA_REGISTRY[c as CropType].icon} {c} {lang === 'hi' ? `(${CROP_HINDI_NAMES[c as CropType]})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Variety */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {t.varietyLabel}
              </label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                required
                placeholder={lang === 'hi' ? 'उदा. शरबती PBW-550' : 'e.g. Sharbati PBW-550'}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Expected Quantity */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {t.quantityLabel}
              </label>
              <input
                type="number"
                min={50}
                step={50}
                value={expectedQuantityKg}
                onChange={(e) => setExpectedQuantityKg(Number(e.target.value))}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            {/* Target Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {t.priceLabel}
              </label>
              <input
                type="number"
                min={1}
                step={0.5}
                value={pricePerKg}
                onChange={(e) => setPricePerKg(Number(e.target.value))}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            {/* Expected Harvest Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.harvestDateInputLabel}</span>
              </label>
              <input
                type="date"
                value={expectedHarvestDate}
                onChange={(e) => setExpectedHarvestDate(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.locationLabel}</span>
              </label>
              <input
                type="text"
                value={farmerLocation}
                onChange={(e) => setFarmerLocation(e.target.value)}
                required
                placeholder={lang === 'hi' ? 'उदा. लुधियाना, पंजाब' : 'e.g. Ludhiana, Punjab'}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Perishability Notice */}
          <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start space-x-3 text-xs">
            <AlertCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {lang === 'hi' ? 'लॉजिस्टिक्स एवं शेल्फ-लाइफ जांच:' : 'Logistics Feasibility Auto-Audit:'} {cropMeta.perishability}
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                {lang === 'hi' ? 'सुरक्षित दिन:' : 'Shelf life:'} <strong className="text-slate-800 dark:text-slate-200">{cropMeta.shelfLifeDays} {lang === 'hi' ? 'दिन' : 'days'}</strong> • {lang === 'hi' ? 'तापमान:' : 'Storage:'} <strong className="text-slate-800 dark:text-slate-200">{cropMeta.idealTempCelsius}</strong> • {lang === 'hi' ? 'अधिकतम दूरी:' : 'Max radius:'} <strong className="text-slate-800 dark:text-slate-200">{cropMeta.maxLogisticsRadiusKm} km</strong>.
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              {t.descriptionLabel}
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Contract Financial Projection Box */}
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-600/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs text-emerald-800 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                {t.estRevenueLabel}
              </span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
                ₹{totalExpectedRevenue.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                {lang === 'hi' 
                  ? `बीज-खाद के लिए ₹${initialWorkingCapital.toLocaleString()} (30% अग्रिम राशि) बुवाई होते ही जारी होगी`
                  : `Up to ₹${initialWorkingCapital.toLocaleString()} (30%) eligible for upfront sowing working capital release`}
              </p>
            </div>

            <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 text-xs bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700/50">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'hi' ? 'बैंक एस्क्रो द्वारा 100% सुरक्षित' : 'Smart Contract Escrow Protected'}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {t.modalCancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm flex items-center space-x-2"
            >
              <Sprout className="w-4 h-4" />
              <span>{t.createSubmitBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
