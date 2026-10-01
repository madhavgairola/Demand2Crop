import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Save, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft, 
  Truck, 
  Warehouse, 
  Sprout,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useApp, BuyerProfile, FarmerProfile } from '../../context/AppContext';
import { INDIAN_CITIES } from '../../services/logistics';

export const AccountPage: React.FC = () => {
  const { 
    activeRole, 
    buyerProfile, 
    updateBuyerProfile, 
    farmerProfile, 
    updateFarmerProfile, 
    setActiveView,
    buyerCity,
    setBuyerCity,
    lang,
    showToast
  } = useApp();

  const isHindi = lang === 'hi' && activeRole === 'FARMER';

  // Buyer Form State
  const [buyerData, setBuyerData] = useState<BuyerProfile>({ ...buyerProfile });
  const [isBuyerSaved, setIsBuyerSaved] = useState(false);

  // Farmer Form State
  const [farmerData, setFarmerData] = useState<FarmerProfile>({ ...farmerProfile });
  const [isFarmerSaved, setIsFarmerSaved] = useState(false);

  useEffect(() => {
    setBuyerData({ ...buyerProfile });
  }, [buyerProfile]);

  useEffect(() => {
    setFarmerData({ ...farmerProfile });
  }, [farmerProfile]);

  const handleBuyerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBuyerProfile(buyerData);
    if (buyerData.city && buyerData.city !== buyerCity) {
      setBuyerCity(buyerData.city);
    }
    setIsBuyerSaved(true);
    showToast('Buyer profile & delivery destination updated successfully!', 'success');
    setTimeout(() => setIsBuyerSaved(false), 2500);
  };

  const handleFarmerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmerProfile(farmerData);
    setIsFarmerSaved(true);
    showToast('किसान प्रोफ़ाइल और बैंक विवरण सफलतापूर्वक सहेजे गए!', 'success');
    setTimeout(() => setIsFarmerSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Top Breadcrumb & Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveView(activeRole === 'BUYER' ? 'marketplace' : 'farmer')}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{activeRole === 'BUYER' ? 'Back to Marketplace' : 'वापस डैशबोर्ड पर जाएं (Back to Dashboard)'}</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {activeRole === 'BUYER' ? 'Account & Settings' : 'खाता व सेटिंग्स'}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center space-x-3">
            <span>{activeRole === 'BUYER' ? '🏢 Buyer Account & Procurement Profile' : '👨‍🌾 किसान प्रोफ़ाइल एवं खेत विवरण (Farmer Account)'}</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
            {activeRole === 'BUYER'
              ? 'Manage your legal procurement organization, receiving delivery hub warehouse, dispatch contacts, and automated escrow refund credentials.'
              : 'अपनी पहचान, कृषि रकबा, सिंचाई प्रणाली और प्रत्यक्ष एस्क्रो बैंक खाते का विवरण प्रबंधित करें।'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800">
            {activeRole === 'BUYER' ? 'Authorized Buyer' : 'सत्यापित किसान'}
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. BUYER ACCOUNT VIEW                                     */}
      {/* ========================================================= */}
      {activeRole === 'BUYER' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleBuyerSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
              
              {/* Section 1: Entity & Representative */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <Building2 className="w-4 h-4" />
                  <span>1. Procurement Entity & Officer Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Procurement Officer Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={buyerData.name}
                        onChange={(e) => setBuyerData({ ...buyerData, name: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Company / Entity Legal Name
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={buyerData.companyName}
                        onChange={(e) => setBuyerData({ ...buyerData, companyName: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Business Classification
                    </label>
                    <select
                      value={buyerData.businessType}
                      onChange={(e) => setBuyerData({ ...buyerData, businessType: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Retail Supermarket & Food Processing">Retail Supermarket & Food Processing</option>
                      <option value="FMCG & Agri Commodities Distributor">FMCG & Agri Commodities Distributor</option>
                      <option value="Hospitality & Restaurant Chain Procurement">Hospitality & Restaurant Chain Procurement</option>
                      <option value="Direct Export & Cold Chain Hub">Direct Export & Cold Chain Hub</option>
                      <option value="Institutional Caterer & Bulk Consumer">Institutional Caterer & Bulk Consumer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      GSTIN Number
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerData.gstin}
                      onChange={(e) => setBuyerData({ ...buyerData, gstin: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Contact & Dispatch */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <Phone className="w-4 h-4" />
                  <span>2. Contact & Dispatch Communication</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Official Phone / Mobile
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={buyerData.phone}
                        onChange={(e) => setBuyerData({ ...buyerData, phone: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Official Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={buyerData.email}
                        onChange={(e) => setBuyerData({ ...buyerData, email: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Receiving Warehouse Hub */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <Warehouse className="w-4 h-4" />
                  <span>3. Receiving Warehouse Hub & Routing</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Buyer Delivery City Hub
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={buyerData.city}
                        onChange={(e) => {
                          const chosenCity = e.target.value;
                          const state = INDIAN_CITIES[chosenCity]?.state || buyerData.state;
                          setBuyerData({ ...buyerData, city: chosenCity, state });
                        }}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-medium"
                      >
                        {Object.keys(INDIAN_CITIES).map((cityName) => (
                          <option key={cityName} value={cityName}>
                            {cityName} ({INDIAN_CITIES[cityName].state})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={buyerData.state}
                      className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-700 dark:text-slate-300 font-medium cursor-not-allowed"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Detailed Unloading Address / Dark Store Terminal
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={buyerData.deliveryAddress}
                      onChange={(e) => setBuyerData({ ...buyerData, deliveryAddress: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Bank Escrow Settlement */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <CreditCard className="w-4 h-4" />
                  <span>4. Bank Escrow Settlement & Refund Account</span>
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Escrow Linked Bank Account (For Automated Deficit Refunds)
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerData.bankAccount}
                    onChange={(e) => setBuyerData({ ...buyerData, bankAccount: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs flex items-center space-x-3 text-emerald-900 dark:text-emerald-300">
                  <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>
                    Pre-commitment deposit amounts are held in cryptographic smart contract escrow. If an unexpected yield shortfall occurs, refunds disburse back into this account automatically.
                  </span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setActiveView('marketplace')}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm flex items-center space-x-2"
                >
                  {isBuyerSaved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Changes Saved!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-white" />
                      <span>Save Profile & Delivery Hub</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Overview Card */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-400 flex items-center justify-center text-2xl border border-emerald-300 dark:border-emerald-500/30">
                  🏢
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{buyerProfile.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{buyerProfile.companyName}</p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">Current Hub:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{buyerCity}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">GSTIN:</span>
                  <span className="font-mono text-slate-900 dark:text-white text-[11px]">{buyerProfile.gstin}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">Escrow Account:</span>
                  <span className="font-mono text-slate-900 dark:text-white text-[11px]">{buyerProfile.bankAccount}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveView('orders')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition"
                >
                  <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>View My Orders & Provenance</span>
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-xs space-y-2">
              <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Demand2Crop Logistics Router</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                When you update your delivery city hub, our multi-modal perishability engine automatically recalculates travel times, dark store distribution corridors, and shelf-life feasibility for all future pre-commitments.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. FARMER ACCOUNT VIEW                                    */}
      {/* ========================================================= */}
      {activeRole === 'FARMER' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleFarmerSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
              
              {/* Section 1: Personal & Contact */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <User className="w-4 h-4" />
                  <span>{isHindi ? '१. व्यक्तिगत एवं संपर्क जानकारी' : '1. Personal & Contact Information'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isHindi ? 'किसान का पूरा नाम' : 'Farmer Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={farmerData.name}
                      onChange={(e) => setFarmerData({ ...farmerData, name: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isHindi ? 'फ़ोन नंबर' : 'Phone Number'}
                    </label>
                    <input
                      type="text"
                      required
                      value={farmerData.phone}
                      onChange={(e) => setFarmerData({ ...farmerData, phone: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isHindi ? 'गांव' : 'Village'}
                    </label>
                    <input
                      type="text"
                      required
                      value={farmerData.village}
                      onChange={(e) => setFarmerData({ ...farmerData, village: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isHindi ? 'जिला व राज्य' : 'District & State'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={farmerData.district}
                        onChange={(e) => setFarmerData({ ...farmerData, district: e.target.value })}
                        placeholder="District"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                      />
                      <input
                        type="text"
                        required
                        value={farmerData.state}
                        onChange={(e) => setFarmerData({ ...farmerData, state: e.target.value })}
                        placeholder="State"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Land & Soil */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <Sprout className="w-4 h-4" />
                  <span>{isHindi ? '२. कृषि भूमि एवं मृदा प्रकार' : '2. Land Holding & Soil Specifications'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isHindi ? 'कुल कृषि भूमि (एकड़)' : 'Cultivable Land Area (Acres)'}
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={500}
                      value={farmerData.landSizeAcres}
                      onChange={(e) => setFarmerData({ ...farmerData, landSizeAcres: Number(e.target.value) || 1 })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isHindi ? 'मृदा वर्गीकरण' : 'Soil Classification / Type'}
                    </label>
                    <input
                      type="text"
                      required
                      value={farmerData.soilType}
                      onChange={(e) => setFarmerData({ ...farmerData, soilType: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isHindi ? 'सिंचाई व्यवस्था' : 'Irrigation Infrastructure / Water Source'}
                    </label>
                    <input
                      type="text"
                      required
                      value={farmerData.irrigationMethod}
                      onChange={(e) => setFarmerData({ ...farmerData, irrigationMethod: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Banking & Escrow */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <CreditCard className="w-4 h-4" />
                  <span>{isHindi ? '३. सीधा एस्क्रो बैंक खाता एवं केसीसी' : '3. Escrow Direct Settlement & KCC'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isHindi ? 'केसीसी (KCC) कार्ड संख्या' : 'Kisan Credit Card (KCC) No.'}
                    </label>
                    <input
                      type="text"
                      required
                      value={farmerData.kccNumber}
                      onChange={(e) => setFarmerData({ ...farmerData, kccNumber: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isHindi ? 'बैंक खाता विवरण' : 'Bank Account Name & No.'}
                    </label>
                    <input
                      type="text"
                      required
                      value={farmerData.bankAccount}
                      onChange={(e) => setFarmerData({ ...farmerData, bankAccount: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isHindi ? 'आईएफएससी (IFSC) कोड' : 'IFSC Code'}
                    </label>
                    <input
                      type="text"
                      required
                      value={farmerData.ifscCode}
                      onChange={(e) => setFarmerData({ ...farmerData, ifscCode: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isHindi ? 'यूपीआई आईडी (UPI ID)' : 'Direct Settlement UPI ID'}
                    </label>
                    <input
                      type="text"
                      required
                      value={farmerData.upiId}
                      onChange={(e) => setFarmerData({ ...farmerData, upiId: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setActiveView('farmer')}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  {isHindi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm flex items-center space-x-2"
                >
                  {isFarmerSaved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>{isHindi ? 'सहेजा गया!' : 'Changes Saved!'}</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-white" />
                      <span>{isHindi ? 'विवरण सहेजें' : 'Save Details'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Overview */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-sm">
                  👨‍🌾
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{farmerProfile.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{farmerProfile.village}, {farmerProfile.district}</p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">Land Area:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">{farmerProfile.landSizeAcres} Acres</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">KCC Number:</span>
                  <span className="font-mono text-slate-900 dark:text-white text-[11px]">{farmerProfile.kccNumber}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">Settlement UPI:</span>
                  <span className="font-mono text-slate-900 dark:text-white text-[11px]">{farmerProfile.upiId}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveView('farmer')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition"
                >
                  <Sprout className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>View Farm Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
