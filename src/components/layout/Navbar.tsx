import React from 'react';
import { 
  Sprout, 
  ShoppingBag, 
  ShieldCheck, 
  MapPin, 
  Layers, 
  RotateCcw,
  Truck,
  Warehouse,
  TrendingUp,
  FileCode2,
  Sun,
  Moon,
  LogOut,
  User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INDIAN_CITIES } from '../../services/logistics';
import { AppView, UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    lang,
    setLang,
    farmerProfile,
    buyerProfile,
    activeRole, 
    setActiveRole, 
    activeView, 
    setActiveView, 
    buyerCity, 
    setBuyerCity,
    resetDemoData,
    isDarkMode,
    toggleDarkMode
  } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-150">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Protocol Title */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => setActiveView('landing')}
            title="Return to Landing Page / Portal Selection"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm text-white">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
                  Demand<span className="text-emerald-700 dark:text-emerald-400">2Crop</span>
                </span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700/50">
                  Protocol
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-sans tracking-wide">
                Demand-Driven Harvest & Fulfillment Network
              </p>
            </div>
          </div>

          {/* Current Logged In Persona Chip (Hidden for Buyer as requested) */}
          {activeRole !== 'BUYER' && (
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'hi' ? 'सक्रिय सत्र:' : 'Active Session:'}
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold font-mono">
                {activeRole === 'FARMER' 
                  ? `${farmerProfile.name} (${lang === 'hi' ? 'किसान' : 'Farmer'})` 
                  : 'Protocol Admin'}
              </span>
            </div>
          )}

          {/* Right Navigation & Tools */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Buyer City Selector (Shown only for Buyer role) */}
            {activeRole === 'BUYER' && (
              <div className="hidden md:flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-500 dark:text-slate-400">Buyer Hub:</span>
                <select
                  value={buyerCity}
                  onChange={(e) => setBuyerCity(e.target.value)}
                  className="bg-transparent text-slate-800 dark:text-slate-200 font-medium focus:outline-none cursor-pointer"
                >
                  {Object.keys(INDIAN_CITIES).map((c) => (
                    <option key={c} value={c} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                      {c} ({INDIAN_CITIES[c].state})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Language Switcher (Shown ONLY for Farmer role as requested) */}
            {activeRole === 'FARMER' && (
              <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                    lang === 'en'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Switch interface to English"
                >
                  <span>🇬🇧 EN</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLang('hi')}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                    lang === 'hi'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="सरल हिन्दी में बदलें"
                >
                  <span>🇮🇳 हिन्दी</span>
                </button>
              </div>
            )}

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs transition"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>


            {/* User Account Button (Beside the logout button) */}
            <button
              onClick={() => setActiveView('account')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border transition shadow-xs text-xs font-semibold ${
                activeView === 'account'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-500/20'
                  : 'border-slate-300 dark:border-slate-700 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
              title="Open Account & Profile Details"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Account</span>
            </button>

            {/* Log Out Button */}
            <button
              onClick={() => setActiveView('landing')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 dark:bg-slate-900 dark:hover:bg-rose-950/40 dark:hover:border-rose-800 dark:hover:text-rose-300 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-xs transition"
              title="Log out and return to portal selection"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center justify-center space-x-1 sm:space-x-3 border-t border-slate-200 dark:border-slate-800/80 py-2 overflow-x-auto text-xs scrollbar-none">
          {activeRole === 'FARMER' && (
            <>
              <TabButton active={activeView === 'farmer'} onClick={() => setActiveView('farmer')} icon={<Sprout className="w-3.5 h-3.5" />} label={lang === 'hi' ? 'मेरा फार्म डैशबोर्ड' : 'My Farm Dashboard'} />
              <TabButton active={activeView === 'demand'} onClick={() => setActiveView('demand')} icon={<TrendingUp className="w-3.5 h-3.5" />} label={lang === 'hi' ? 'खरीदार मांग' : 'Buyer Demand'} />
              <TabButton active={activeView === 'contract'} onClick={() => setActiveView('contract')} icon={<FileCode2 className="w-3.5 h-3.5" />} label={lang === 'hi' ? 'फसल समझौता' : 'Crop Agreement'} />
              <TabButton active={activeView === 'darkstores'} onClick={() => setActiveView('darkstores')} icon={<Warehouse className="w-3.5 h-3.5" />} label={lang === 'hi' ? 'गोदाम और साइलो' : 'Storage Godowns'} />
              <TabButton active={activeView === 'blockchain'} onClick={() => setActiveView('blockchain')} icon={<Layers className="w-3.5 h-3.5" />} label={lang === 'hi' ? 'भुगतान व बैंक रिकॉर्ड' : 'Payment & Bank Records'} />
              <TabButton active={activeView === 'account'} onClick={() => setActiveView('account')} icon={<User className="w-3.5 h-3.5" />} label={lang === 'hi' ? 'किसान खाता' : 'Farmer Account'} />
            </>
          )}

          {activeRole === 'BUYER' && (
            <>
              <TabButton active={activeView === 'marketplace'} onClick={() => setActiveView('marketplace')} icon={<ShoppingBag className="w-3.5 h-3.5" />} label="Pre-Commit Marketplace" />
              <TabButton active={activeView === 'orders'} onClick={() => setActiveView('orders')} icon={<Truck className="w-3.5 h-3.5" />} label="My Orders & Provenance" />
              <TabButton active={activeView === 'logistics'} onClick={() => setActiveView('logistics')} icon={<MapPin className="w-3.5 h-3.5" />} label="Logistics & Perishability Engine" />
              <TabButton active={activeView === 'demand'} onClick={() => setActiveView('demand')} icon={<TrendingUp className="w-3.5 h-3.5" />} label="Demand Pools" />
              <TabButton active={activeView === 'contract'} onClick={() => setActiveView('contract')} icon={<FileCode2 className="w-3.5 h-3.5" />} label="Harvest Contract Inspector" />
              <TabButton active={activeView === 'account'} onClick={() => setActiveView('account')} icon={<User className="w-3.5 h-3.5" />} label="Buyer Account & Hub" />
            </>
          )}

          {activeRole === 'ADMIN' && (
            <>
              <TabButton active={activeView === 'admin'} onClick={() => setActiveView('admin')} icon={<ShieldCheck className="w-3.5 h-3.5" />} label="Admin Protocol Dashboard" />
              <TabButton active={activeView === 'darkstores'} onClick={() => setActiveView('darkstores')} icon={<Warehouse className="w-3.5 h-3.5" />} label="Dark Store Network" />
              <TabButton active={activeView === 'logistics'} onClick={() => setActiveView('logistics')} icon={<Truck className="w-3.5 h-3.5" />} label="Transit Corridors" />
              <TabButton active={activeView === 'demand'} onClick={() => setActiveView('demand')} icon={<TrendingUp className="w-3.5 h-3.5" />} label="Supply vs Demand Gap" />
              <TabButton active={activeView === 'blockchain'} onClick={() => setActiveView('blockchain')} icon={<Layers className="w-3.5 h-3.5" />} label="Distributed Ledger" />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition text-xs ${
      active
        ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-300 dark:bg-slate-800 dark:text-emerald-400 dark:border-slate-700'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);
