import React, { useState } from 'react';
import { 
  X, 
  User, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Save, 
  ShieldCheck,
  CheckCircle2,
  Truck
} from 'lucide-react';
import { useApp, BuyerProfile } from '../../context/AppContext';
import { INDIAN_CITIES } from '../../services/logistics';

interface BuyerAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BuyerAccountModal: React.FC<BuyerAccountModalProps> = ({ isOpen, onClose }) => {
  const { lang, buyerProfile, updateBuyerProfile } = useApp();

  const [formData, setFormData] = useState<BuyerProfile>({ ...buyerProfile });
  const [isSaved, setIsSaved] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setFormData({ ...buyerProfile });
      setIsSaved(false);
    }
  }, [isOpen, buyerProfile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBuyerProfile(formData);
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const isHindi = lang === 'hi';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4 md:p-6 bg-slate-950/70 dark:bg-slate-950/85 backdrop-blur-sm animate-fade-in flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh] my-auto">
        {/* Header - shrink-0 to prevent compression */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-400 flex items-center justify-center border border-emerald-300 dark:border-emerald-500/30 text-xl shadow-xs">
              🏢
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <span>{isHindi ? 'खरीदार प्रोफ़ाइल एवं डिलीवरी गंतव्य' : 'Buyer Profile & Delivery Destination'}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 uppercase">
                  {isHindi ? 'अधिकृत खरीदार' : 'Authorized Buyer'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isHindi ? 'अपनी संस्था, डिलीवरी हब वेयरहाउस और बिलिंग विवरण अपडेट करें' : 'Update your procurement entity, receiving delivery warehouse, and escrow settlement details'}
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

        {/* Form Body - flex flex-col flex-1 min-h-0 */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Scrollable Form Content */}
          <div className="p-6 space-y-6 overflow-y-auto flex-1 min-h-0">
            {/* Section 1: Entity & Representative */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>{isHindi ? '१. खरीदार संस्था एवं अधिकारी' : '1. Procurement Entity & Officer Details'}</span>
              </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'खरीदार / अधिकारी का नाम' : 'Procurement Officer Name'}
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
                  {isHindi ? 'कंपनी / प्रतिष्ठान का नाम' : 'Company / Entity Legal Name'}
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'व्यापार का प्रकार' : 'Business Category / Sector'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  placeholder="e.g. Retail Supermarket Chain, Food Processor, Exporter"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'जीएसटी (GSTIN) नंबर' : 'GSTIN / Commercial Tax ID'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono uppercase"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Communication */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              <Phone className="w-3.5 h-3.5" />
              <span>{isHindi ? '२. संपर्क एवं सूचना' : '2. Contact & Dispatch Communication'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'संपर्क मोबाइल' : 'Official Phone / Mobile'}
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
                  {isHindi ? 'आधिकारिक ईमेल' : 'Official Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Delivery Hub & Destination */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              <Truck className="w-3.5 h-3.5" />
              <span>{isHindi ? '३. डिलीवरी गंतव्य एवं वेयरहाउस हब' : '3. Receiving Warehouse Hub & Routing'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'डिलीवरी शहर / मुख्य हब' : 'Buyer Delivery City Hub'}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.city}
                    onChange={(e) => {
                      const newCity = e.target.value;
                      const st = INDIAN_CITIES[newCity]?.state || 'Delhi';
                      setFormData({ ...formData, city: newCity, state: st });
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-semibold cursor-pointer"
                  >
                    {Object.keys(INDIAN_CITIES).map((c) => (
                      <option key={c} value={c}>
                        {c} ({INDIAN_CITIES[c].state})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'राज्य / प्रभाग' : 'State / Province'}
                </label>
                <input
                  type="text"
                  readOnly
                  value={formData.state}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-600 dark:text-slate-400 font-medium cursor-not-allowed"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'विस्तृत अनलोडिंग पता / वेयरहाउस' : 'Detailed Unloading Address / Dark Store Terminal'}
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Settlement / Escrow Refund Account */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              <CreditCard className="w-3.5 h-3.5" />
              <span>{isHindi ? '४. बैंक एस्क्रो रिफंड खाता' : '4. Bank Escrow Settlement & Refund Account'}</span>
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isHindi ? 'एस्क्रो लिंक बैंक खाता (शॉर्टफॉल रिफंड हेतु)' : 'Escrow Linked Bank Account (For Automated Deficit Refunds)'}
              </label>
              <input
                type="text"
                required
                value={formData.bankAccount}
                onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-medium"
              />
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs flex items-center space-x-2 text-emerald-900 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>
                {isHindi 
                  ? 'अग्रिम खरीद अनुबंधों के तहत जमा पूंजी सुरक्षित एस्क्रो में रहती है और फसल डिलीवरी सत्यापन पर ही जारी होती है।'
                  : 'Pre-commitment deposit amounts are held in smart escrow. If yield shortfall occurs, refunds disburse back into this account automatically.'}
              </span>
            </div>
            </div>
          </div>

          {/* Fixed Footer Actions - shrink-0 */}
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end space-x-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {isHindi ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm flex items-center space-x-1.5"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isHindi ? 'सहेजा गया!' : 'Saved!'}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isHindi ? 'प्रोफ़ाइल सहेजें' : 'Save Profile'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
