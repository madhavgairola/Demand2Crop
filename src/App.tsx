import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { DemoWalkthroughBar } from './components/demo/DemoWalkthroughBar';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { Marketplace } from './components/marketplace/Marketplace';
import { OrderTrackingView } from './components/orders/OrderTrackingView';
import { LogisticsView } from './components/logistics/LogisticsView';
import { DarkStoresView } from './components/darkstores/DarkStoresView';
import { DemandDashboard } from './components/demand/DemandDashboard';
import { HarvestContractView } from './components/contract/HarvestContractView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { BlockchainExplorer } from './components/blockchain/BlockchainExplorer';
import { CheckCircle2, AlertCircle, Info, Sparkles, Sprout } from 'lucide-react';

const MainApp: React.FC = () => {
  const { activeView, toast } = useApp();

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white transition-colors duration-200">
      {/* Navbar with Role & City selection */}
      <Navbar />

      {/* Guided SIH Demo Tour Presenter Toolbar */}
      <DemoWalkthroughBar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'farmer' && <FarmerDashboard />}
        {activeView === 'marketplace' && <Marketplace />}
        {activeView === 'orders' && <OrderTrackingView />}
        {activeView === 'logistics' && <LogisticsView />}
        {activeView === 'darkstores' && <DarkStoresView />}
        {activeView === 'demand' && <DemandDashboard />}
        {activeView === 'contract' && <HarvestContractView />}
        {activeView === 'admin' && <AdminDashboard />}
        {activeView === 'blockchain' && <BlockchainExplorer />}
      </main>

      {/* Global Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div
            className={`px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3 text-xs font-semibold border ${
              toast.type === 'success'
                ? 'bg-white dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-500 shadow-emerald-500/10'
                : toast.type === 'warning'
                  ? 'bg-white dark:bg-amber-950/90 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-500 shadow-amber-500/10'
                  : 'bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 shadow-slate-500/10'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : toast.type === 'warning' ? (
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Footer with Core Value Statement */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 px-4 text-center space-y-3">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 mb-2">
            <Sprout className="w-3.5 h-3.5" />
            <span>The Demand2Crop Core Value Paradigm</span>
          </div>
          <blockquote className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 italic tracking-wide">
            "Instead of farmers growing first and searching for buyers later, buyers commit demand first and farmers grow against that demand."
          </blockquote>
          <p className="text-xs text-slate-500 mt-2 font-mono">
            Smart India Hackathon (SIH 2026) Prototype • Real-World Web3 & Supply-Chain Optimization Architecture
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
