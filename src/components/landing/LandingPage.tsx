import React, { useState } from 'react';
import { 
  Sprout, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  Lock, 
  Truck, 
  TrendingUp, 
  CheckCircle2, 
  PlayCircle,
  Sun,
  Moon,
  Building2,
  Users,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { INDIAN_CITIES } from '../../services/logistics';
import landingBg from '../../assets/landingbackground.jpg';

export const LandingPage: React.FC = () => {
  const { 
    setActiveRole, 
    setActiveView, 
    buyerCity, 
    setBuyerCity, 
    setIsDemoTourActive, 
    setDemoStep,
    isDarkMode, 
    toggleDarkMode,
    showToast 
  } = useApp();

  const [selectedRoleTab, setSelectedRoleTab] = useState<UserRole>('FARMER');
  
  // Form states for customization
  const [farmerName, setFarmerName] = useState('Ravi Singh');
  const [farmerLocation, setFarmerLocation] = useState('Ludhiana, Punjab');
  const [buyerName, setBuyerName] = useState('Priya Sharma');
  const [buyerType, setBuyerType] = useState<'Consumer' | 'Restaurant'>('Consumer');
  const [adminKey, setAdminKey] = useState('0x71C84920...SuperAdmin');

  const handleFarmerLogin = () => {
    setActiveRole('FARMER');
    setActiveView('farmer');
    showToast(`Welcome back, ${farmerName}! Navigating to Sovereign Producer Dashboard`, 'success');
  };

  const handleBuyerLogin = () => {
    setActiveRole('BUYER');
    setActiveView('marketplace');
    showToast(`Welcome, ${buyerName}! Exploring harvest forward contracts in ${buyerCity}`, 'success');
  };

  const handleAdminLogin = () => {
    setActiveRole('ADMIN');
    setActiveView('admin');
    showToast('Admin session authenticated. Protocol command center activated', 'info');
  };

  const startDemoPresentation = () => {
    setIsDemoTourActive(true);
    setDemoStep(1);
    setActiveRole('FARMER');
    setActiveView('farmer');
    showToast('SIH Judge Presentation Tour activated! Starting at Step 1', 'info');
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Background Image with Clean Dark Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${landingBg})` }}
      >
        {/* Crisp Semi-Transparent Dark Overlay for High Contrast */}
        <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1.5px]" />
      </div>

      {/* Top Header / Branding Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg text-white">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight text-white font-mono">
                Demand<span className="text-emerald-400">2Crop</span>
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Protocol
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans tracking-wide">
              Decentralized Demand-Driven Agricultural Marketplace
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20 transition"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-emerald-300" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>

          {/* Quick Judge Tour Button */}
          <button
            onClick={startDemoPresentation}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Judge Demo Tour</span>
          </button>
        </div>
      </header>

      {/* Main Hero & Login Section */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Column: Mission & Core Value Proposition */}
        <div className="flex-1 text-left space-y-6">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-300 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Smart India Hackathon (SIH 2026) Student Innovation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Commit Demand First. <br />
            <span className="text-emerald-400">Farmers Grow With Certainty.</span>
          </h1>

          <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 text-base sm:text-lg font-medium text-slate-200 italic leading-relaxed bg-slate-900/40 rounded-r-xl pr-3">
            "Instead of farmers growing first and searching for buyers later, buyers commit demand first and farmers grow against that demand."
          </blockquote>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Eliminating predatory informal credit (24–36% APR), middleman distress pricing, and post-harvest spoilage. Powered by smart-contract forward commitments, automated partial-yield settlement, and regional cold-chain dark store routing.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
            <div className="bg-slate-900/70 border border-slate-700/60 rounded-xl p-3 text-center backdrop-blur-md">
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">30%</div>
              <div className="text-[11px] text-slate-300">Upfront Liquidity</div>
            </div>
            <div className="bg-slate-900/70 border border-slate-700/60 rounded-xl p-3 text-center backdrop-blur-md">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">0%</div>
              <div className="text-[11px] text-slate-300">Distress Selling</div>
            </div>
            <div className="bg-slate-900/70 border border-slate-700/60 rounded-xl p-3 text-center backdrop-blur-md">
              <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">100%</div>
              <div className="text-[11px] text-slate-300">Escrow Security</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Role Login Card */}
        <div className="w-full max-w-md">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 transition-colors duration-150">
            {/* Login Card Header */}
            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Select Your Access Role
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Enter Demand2Crop
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a portal to interact with the decentralized network
              </p>
            </div>

            {/* 3 Role Selection Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedRoleTab('FARMER')}
                className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition ${
                  selectedRoleTab === 'FARMER'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sprout className="w-4 h-4" />
                <span>Farmer</span>
              </button>

              <button
                onClick={() => setSelectedRoleTab('BUYER')}
                className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition ${
                  selectedRoleTab === 'BUYER'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buyer</span>
              </button>

              <button
                onClick={() => setSelectedRoleTab('ADMIN')}
                className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition ${
                  selectedRoleTab === 'ADMIN'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>

            {/* TAB 1: FARMER LOGIN */}
            {selectedRoleTab === 'FARMER' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      Sovereign Producer Persona
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">
                      ⭐ 97/100 Trust Score
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">Ravi Singh (Ludhiana, Punjab)</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Active Listing: 1,000 kg Wheat (#HC-48291) • 65% Pre-Committed
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Producer Name / Aadhaar
                    </label>
                    <input
                      type="text"
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Farm Hub Location
                    </label>
                    <input
                      type="text"
                      value={farmerLocation}
                      onChange={(e) => setFarmerLocation(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <button
                  onClick={handleFarmerLogin}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition"
                >
                  <span>Enter as Farmer ({farmerName})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                  Pre-configured with Ravi Singh's 1,000 kg forward wheat contract.
                </p>
              </div>
            )}

            {/* TAB 2: BUYER LOGIN */}
            {selectedRoleTab === 'BUYER' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-sky-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-sky-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-800 dark:text-sky-300">
                      Demand Commitment Portal
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                      Smart Contract Escrow
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Pre-purchase future harvests at locked direct-from-farm prices before cultivation.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Buyer Name / Entity
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Buyer Type
                      </label>
                      <select
                        value={buyerType}
                        onChange={(e) => setBuyerType(e.target.value as any)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                      >
                        <option value="Consumer">Retail Consumer</option>
                        <option value="Restaurant">Restaurant / Bistro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Delivery City Hub
                      </label>
                      <select
                        value={buyerCity}
                        onChange={(e) => setBuyerCity(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                      >
                        {Object.keys(INDIAN_CITIES).map((cityName) => (
                          <option key={cityName} value={cityName}>
                            {cityName} ({INDIAN_CITIES[cityName].state})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBuyerLogin}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition"
                >
                  <span>Enter Marketplace ({buyerCity})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                  Enables WOW Flow: Pre-commit to Ravi Singh's 100 kg Wheat contract.
                </p>
              </div>
            )}

            {/* TAB 3: ADMIN LOGIN */}
            {selectedRoleTab === 'ADMIN' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-amber-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-amber-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                      Protocol Governance & Oracles
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      Multi-Sig Overseer
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Audit smart-contract vaults, dark store silos, perishability routes, and block stream.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Validator Key / Node Hash
                    </label>
                    <input
                      type="text"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1 text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Active Dark Stores:</span>
                      <strong className="text-slate-900 dark:text-white">5 Metros</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Consensus:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400">Proof-of-Fulfillment</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAdminLogin}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition"
                >
                  <span>Enter Protocol Command Center</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                  Access dark store silos, Solidity contract inspector, and ledger explorer.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Features Strip */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-white/20 dark:border-slate-800 text-white">
          <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
              <Sprout className="w-4 h-4" />
              <span>Zero Predatory Credit</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Farmers unlock 30% upfront capital without moneylenders or 24-36% APR interest.
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold">
              <Lock className="w-4 h-4" />
              <span>Smart Contract Escrow</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Funds are secured in HarvestEscrow.sol and released upon certified physical delivery.
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold">
              <Truck className="w-4 h-4" />
              <span>Perishability Routing</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Low shelf-life crops are algorithmically matched only to feasible regional dark stores.
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>Partial Yield Settlement</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Weather anomalies trigger automated pro-rata payouts and buyer refunds seamlessly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
