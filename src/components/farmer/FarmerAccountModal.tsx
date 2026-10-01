import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  MapPin, 
  Sprout, 
  CreditCard, 
  Save, 
  ShieldCheck,
  CheckCircle2,
  Tractor,
  Droplets
} from 'lucide-react';
import { useApp, FarmerProfile } from '../../context/AppContext';

interface FarmerAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FarmerAccountModal: React.FC<FarmerAccountModalProps> = ({ isOpen, onClose }) => {
  const { lang, farmerProfile, updateFarmerProfile } = useApp();

  const [formData, setFormData] = useState<FarmerProfile>({ ...farmerProfile });
  const [isSaved, setIsSaved] = useState(false);

  // Sync state if modal opens with fresh profile
  React.useEffect(() => {
    if (isOpen) {
      setFormData({ ...farmerProfile });
      setIsSaved(false);
    }
  }, [isOpen, farmerProfile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmerProfile(formData);
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const isHindi = lang === 'hi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-400 flex items-center justify-center border border-emerald-300 dark:border-emerald-500/30 text-xl shadow-xs">
              👨‍🌾
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <span>{isHindi ? 'किसान प्रोफ़ाइल एवं खेत विवरण' : 'Farmer Profile & Farm Information'}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 uppercase">
                  {isHindi ? 'सत्यापित' : 'Verified'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isHindi ? 'अपनी व्यक्तिगत जानकारी, खेत का रकबा एवं बैंक एस्क्रो विवरण प्रबंधित करें' : 'Manage your personal identity, land specifications, and direct escrow bank details'}
              </p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Section 1: Personal & Contact */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              <User className="w-3.5 h-3.5" />
              <span>{isHindi ? '१. व्यक्तिगत एवं संपर्क जानकारी' : '1. Personal & Contact Information'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'किसान का पूरा नाम' : 'Farmer Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'मोबाइल नंबर' : 'Phone / Mobile Number'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'गाँव / ग्राम पंचायत' : 'Village / Locality'}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isHindi ? 'जिला' : 'District'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isHindi ? 'राज्य' : 'State'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Farm & Agricultural Land */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              <Tractor className="w-3.5 h-3.5" />
              <span>{isHindi ? '२. खेत एवं भूमि की जानकारी' : '2. Farm Land & Irrigation Specs'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'कुल कृषि भूमि (एकड़)' : 'Total Farm Land (Acres)'}
                </label>
                <div className="relative">
                  <Sprout className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min={1}
                    step={0.5}
                    required
                    value={formData.landSizeAcres}
                    onChange={(e) => setFormData({ ...formData, landSizeAcres: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'मिट्टी का प्रकार' : 'Soil Classification'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                  placeholder={isHindi ? 'उदा. उपजाऊ दोमट मिट्टी (pH 7.2)' : 'e.g. Alluvial Fertile Loam (pH 7.2)'}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center space-x-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>{isHindi ? 'सिंचाई प्रणाली / स्रोत' : 'Irrigation Facility'}</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.irrigationMethod}
                  onChange={(e) => setFormData({ ...formData, irrigationMethod: e.target.value })}
                  placeholder={isHindi ? 'उदा. नहरी + सोलर ड्रिप' : 'e.g. Canal + Solar Drip'}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'किसान क्रेडिट कार्ड / KCC नंबर' : 'Kisan Credit Card (KCC ID)'}
                </label>
                <input
                  type="text"
                  value={formData.kccNumber}
                  onChange={(e) => setFormData({ ...formData, kccNumber: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Banking & Escrow Settlement */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              <CreditCard className="w-3.5 h-3.5" />
              <span>{isHindi ? '३. बैंक खाता एवं भुगतान (30% अग्रिम प्राप्त करने हेतु)' : '3. Banking & Direct Escrow Payout (For 30% Seed Advance)'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'बैंक का नाम एवं खाता संख्या' : 'Bank Name & Account Number'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.bankAccount}
                  onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'आईएफएससी (IFSC) कोड' : 'Bank IFSC Code'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.ifscCode}
                  onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono uppercase"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'यूपीआई आईडी (तत्काल भुगतान हेतु)' : 'UPI ID (Instant Transfer)'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs flex items-center space-x-2 text-emerald-900 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>
                {isHindi 
                  ? 'आपका बैंक खाता और फसल अनुबंध 100% एन्क्रिप्टेड और आरबीआई-अनुरूप डिजिटल एस्क्रो द्वारा सुरक्षित है।'
                  : 'Your account is linked to cryptographic bank escrow. Advance funds are automatically disbursed upon verified sowing.'}
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {isHindi ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm flex items-center space-x-1.5"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isHindi ? 'सहेजा गया!' : 'Saved!'}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isHindi ? 'विवरण सहेजें' : 'Save Details'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
