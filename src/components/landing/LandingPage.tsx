import React, { useState } from 'react';
import { 
  Sprout, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Phone, 
  User, 
  Key, 
  ChevronDown, 
  CheckCircle2, 
  Truck, 
  Warehouse, 
  TrendingUp, 
  Sun, 
  Moon, 
  Sparkles,
  Layers,
  MapPin,
  Clock,
  Eye,
  EyeOff
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
    isDarkMode, 
    toggleDarkMode,
    showToast 
  } = useApp();

  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [selectedRole, setSelectedRole] = useState<UserRole>('FARMER');

  // Input states
  const [identifier, setIdentifier] = useState('9876543210');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('Ravi Singh');
  const [farmLocation, setFarmLocation] = useState('Ludhiana, Punjab');

  // Quick fill helper for demoing
  const applyPreset = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'FARMER') {
      setIdentifier('9876543210');
      setPassword('farmer@2026');
      setFullName('Ravi Singh');
      setFarmLocation('Ludhiana, Punjab');
    } else if (role === 'BUYER') {
      setIdentifier('9810012345');
      setPassword('buyer@2026');
      setFullName('Priya Sharma');
      setBuyerCity('Delhi');
    } else if (role === 'ADMIN') {
      setIdentifier('operator.node01');
      setPassword('admin@harvest2026');
      setFullName('Chief Protocol Auditor');
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRole === 'FARMER') {
      setActiveRole('FARMER');
      setActiveView('farmer');
      showToast(`Welcome, ${fullName || 'Ravi Singh'}! Sovereign Producer Dashboard loaded.`, 'success');
    } else if (selectedRole === 'BUYER') {
      setActiveRole('BUYER');
      setActiveView('marketplace');
      showToast(`Signed in as Buyer (${buyerCity} Hub). Exploring active harvest listings.`, 'success');
    } else if (selectedRole === 'ADMIN') {
      setActiveRole('ADMIN');
      setActiveView('admin');
      showToast('Protocol administrator session active. Command center unlocked.', 'info');
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about-product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Background Image with Clean Translucent Backdrop */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${landingBg})` }}
      >
        {/* Soft, Light Dark Overlay so Green Farm Fields Show Vibrantly */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* TOP HEADER */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg text-white">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight text-white font-mono">
                Demand<span className="text-emerald-400">2Crop</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans tracking-wide">
              Decentralized Agricultural Forward Marketplace
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <button 
            onClick={scrollToAbout}
            className="hidden md:inline-block text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            About Product
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20 transition"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-emerald-300" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              applyPreset('FARMER');
              setActiveRole('FARMER');
              setActiveView('farmer');
            }}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition"
          >
            Explore App
          </button>
        </div>
      </header>

      {/* TOP EDITORIAL TAGLINE BANNER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4 sm:pt-6">
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/15 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <h1 className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-emerald-300">
            Plan before you plant
          </h1>
        </div>
      </div>

      {/* CENTERED TRANSLUCENT AUTH SECTION */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 min-h-[calc(100vh-210px)] flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-[420px] mx-auto bg-slate-950/45 backdrop-blur-2xl border border-white/20 border-t-white/35 rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.5)] p-7 sm:p-8 space-y-6 text-left transition-all duration-200 relative overflow-hidden">
          {/* Subtle Glass Top Rim Light */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/35" />

          {/* Clean Segmented Role Switcher */}
          <div className="grid grid-cols-3 p-1 bg-black/35 backdrop-blur-md rounded-xl border border-white/15">
            <button
              type="button"
              onClick={() => applyPreset('FARMER')}
              className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                selectedRole === 'FARMER'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Farmer
            </button>

            <button
              type="button"
              onClick={() => applyPreset('BUYER')}
              className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                selectedRole === 'BUYER'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Buyer
            </button>

            <button
              type="button"
              onClick={() => applyPreset('ADMIN')}
              className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                selectedRole === 'ADMIN'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Clean Card Title */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white drop-shadow-sm">
              {authMode === 'LOGIN' ? 'Sign in' : 'Create an account'}
            </h2>
            <p className="text-xs text-white/60">
              {authMode === 'LOGIN' 
                ? `Enter your credentials to access the ${selectedRole.toLowerCase()} portal` 
                : `Register as a new ${selectedRole.toLowerCase()} on the network`}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {/* If Sign Up: Full Name */}
            {authMode === 'SIGNUP' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/90">
                  Full Name / Business Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ravi Singh"
                    className="w-full bg-black/25 backdrop-blur-md border border-white/20 rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 focus:bg-black/35 transition"
                  />
                </div>
              </div>
            )}

            {/* Username or Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/90">
                {selectedRole === 'ADMIN' ? 'Admin Identifier' : 'Mobile Number or Email'}
              </label>
              <div className="relative">
                {selectedRole === 'ADMIN' ? (
                  <Key className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
                ) : (
                  <Phone className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
                )}
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={selectedRole === 'ADMIN' ? 'operator.node01' : 'e.g. 98765 43210'}
                  className="w-full bg-black/25 backdrop-blur-md border border-white/20 rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 focus:bg-black/35 transition font-mono"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-white/90">
                  Password
                </label>
                {authMode === 'LOGIN' && (
                  <button type="button" className="text-xs text-white/60 hover:text-emerald-400 transition">
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-black/25 backdrop-blur-md border border-white/20 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 focus:bg-black/35 transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Conditional Buyer Hub Selector */}
            {selectedRole === 'BUYER' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/90">
                  Delivery Distribution Hub
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
                  <select
                    value={buyerCity}
                    onChange={(e) => setBuyerCity(e.target.value)}
                    className="w-full bg-black/30 backdrop-blur-md border border-white/20 rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400 transition cursor-pointer"
                  >
                    {Object.keys(INDIAN_CITIES).map((cityName) => (
                      <option key={cityName} value={cityName} className="bg-slate-900 text-white">
                        {cityName} Hub ({INDIAN_CITIES[cityName].state})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Clean Submit Button (NO Hardcoded Person Names!) */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-black/40 transition mt-2"
            >
              <span>{authMode === 'LOGIN' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle between Sign In and Sign Up */}
          <div className="text-center text-xs text-white/60 pt-1">
            {authMode === 'LOGIN' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('SIGNUP')}
                  className="text-emerald-400 hover:text-emerald-300 font-medium ml-1 transition"
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('LOGIN')}
                  className="text-emerald-400 hover:text-emerald-300 font-medium ml-1 transition"
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          {/* Subtle Demo Credentials Helper */}
          <div className="pt-3 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={() => applyPreset(selectedRole)}
              className="text-[11px] text-white/40 hover:text-emerald-300 font-mono transition inline-flex items-center space-x-1"
            >
              <span>⚡ Quick-fill sample credentials</span>
            </button>
          </div>
        </div>

        {/* Scroll Prompt */}
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center justify-center space-y-1 text-slate-400 hover:text-white transition pt-4 animate-bounce"
        >
          <span className="text-xs font-semibold tracking-wider uppercase">About The Product</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </section>

      {/* ABOUT THE PRODUCT SECTION (ON SCROLL DOWN) */}
      <section id="about-product" className="relative z-10 w-full bg-slate-900/90 dark:bg-slate-950/95 border-t border-white/10 backdrop-blur-2xl py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Why Demand2Crop
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              A Direct Agricultural Protocol for Modern India
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              India produces over 300 million tons of food grains annually, yet farmers face price crashes during harvest gluts while consumers pay marked-up prices. Demand2Crop fixes this structural misalignment.
            </p>
          </div>

          {/* Comparison Cards: Traditional Broken Mandi vs Demand2Crop Protocol */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Broken Traditional Cycle */}
            <div className="bg-slate-950/70 border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
                <span>The Traditional Problem</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Blind Cultivation & Middleman Distress
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start space-x-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Predatory Informal Credit:</strong> Farmers borrow at 24–36% APR from local moneylenders to buy seeds and fertilizer.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Harvest Distress Selling:</strong> During regional gluts, mandi traders offer distress rates knowing perishable crops will rot.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Logistics Wastage:</strong> Fragile produce is transported long distances without perishability checks, creating high transit spoilage.</span>
                </li>
              </ul>
            </div>

            {/* The Demand2Crop Protocol */}
            <div className="bg-slate-950/70 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>The Demand2Crop Architecture</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Plan Before You Plant
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Forward Pre-Commitment:</strong> Consumers and restaurants lock purchase quantities and pre-agreed prices before planting starts.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>30% Upfront Working Capital:</strong> Certified sowing unlocks zero-interest working capital directly from the escrow vault.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Dark Store Cold-Chain Routing:</strong> Automated perishability checks match crops to nearby urban hubs, preventing transit decay.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 4-Step Operational Flow */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                End-to-End Workflow
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                How The Protocol Operates
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-950/60 border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm border border-emerald-500/30">
                  01
                </div>
                <h4 className="text-base font-bold text-white">Demand Committed</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Buyers pledge future harvest demand. Payments are locked in non-custodial smart contracts until fulfillment.
                </p>
              </div>

              <div className="bg-slate-950/60 border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm border border-emerald-500/30">
                  02
                </div>
                <h4 className="text-base font-bold text-white">Capital Release</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Farmers receive 30% upfront liquidity to finance high-quality seeds, fertilizer, and electricity without informal debt.
                </p>
              </div>

              <div className="bg-slate-950/60 border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm border border-emerald-500/30">
                  03
                </div>
                <h4 className="text-base font-bold text-white">Cold-Chain Intake</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Crops are dispatched to regional dark store silos (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai) where quality grade is verified.
                </p>
              </div>

              <div className="bg-slate-950/60 border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm border border-emerald-500/30">
                  04
                </div>
                <h4 className="text-base font-bold text-white">Instant Settlement</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The smart contract releases final payouts. Weather yield drops trigger automated pro-rata payouts and buyer refunds seamlessly.
                </p>
              </div>
            </div>
          </div>

          {/* Key Product Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-center">
            <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 font-medium">Demand-Backed Cultivation</div>
            </div>

            <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">30%</div>
              <div className="text-xs text-slate-400 font-medium">Upfront Working Capital</div>
            </div>

            <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">5 Metros</div>
              <div className="text-xs text-slate-400 font-medium">Dark Store Silos</div>
            </div>

            <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">0%</div>
              <div className="text-xs text-slate-400 font-medium">Predatory Debt Interest</div>
            </div>
          </div>

          {/* CTA Banner at bottom of About Section */}
          <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-3xl p-8 text-center space-y-4 max-w-2xl mx-auto shadow-2xl">
            <h3 className="text-2xl font-black text-white">
              Ready to experience Demand2Crop?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Access the live platform as a Farmer, Buyer, or Protocol Auditor to test the complete escrow and logistics flow.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
            >
              Back to Sign In / Portals ↑
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 w-full bg-slate-950 border-t border-white/10 py-8 px-4 text-center space-y-2">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-slate-400 font-mono">
            Demand2Crop Foundation • Next-Generation Agricultural Supply Infrastructure
          </p>
          <p className="text-[11px] text-slate-500">
            "Plan before you plant" — Connecting Sovereign Producers with Direct Pre-Committed Demand.
          </p>
        </div>
      </footer>
    </div>
  );
};
