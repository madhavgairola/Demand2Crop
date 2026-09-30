import React from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoWalkthroughBar: React.FC = () => {
  const { 
    isDemoTourActive, 
    setIsDemoTourActive, 
    demoStep, 
    setDemoStep, 
    setActiveRole, 
    setActiveView 
  } = useApp();

  if (!isDemoTourActive) return null;

  const STEPS = [
    {
      num: 1,
      title: 'Farmer Problem: Ravi Singh in Ludhiana',
      desc: 'Ravi needs working capital and certainty before sowing 1,000 kg Wheat. Traditional farming forces him into high-interest debt and unpredictable mandi prices.',
      actionLabel: 'Go to Farmer Dashboard',
      action: () => {
        setActiveRole('FARMER');
        setActiveView('farmer');
      }
    },
    {
      num: 2,
      title: 'Harvest Listing Created (#HC-48291)',
      desc: 'Ravi creates a future harvest listing: 1,000 kg Wheat at ₹10/kg for Dec 15. The distributed ledger deploys a dedicated escrow contract.',
      actionLabel: 'Inspect Harvest Contract',
      action: () => {
        setActiveRole('FARMER');
        setActiveView('farmer');
      }
    },
    {
      num: 3,
      title: 'Customer Finds Ravi on Marketplace',
      desc: 'Buyer switches to Marketplace. Notice intelligent logistics feasibility: Ludhiana to Delhi is allowed, while perishable crops to distant cities are restricted.',
      actionLabel: 'Open Marketplace',
      action: () => {
        setActiveRole('BUYER');
        setActiveView('marketplace');
      }
    },
    {
      num: 4,
      title: 'Primary WOW Flow: Pre-Commit 100 kg',
      desc: 'Customer selects Ravi\'s wheat and pre-commits 100 kg. Click "Pre-Commit / Buy" to watch the multi-step smart contract escrow lock in real time.',
      actionLabel: 'View Ravi\'s Wheat',
      action: () => {
        setActiveRole('BUYER');
        setActiveView('marketplace');
      }
    },
    {
      num: 5,
      title: 'Farmer Dashboard Immediately Updates',
      desc: 'Switch back to Ravi\'s dashboard: committed quantity jumps from 650 kg to 750 kg! Ravi gets working capital advance without bank loans.',
      actionLabel: 'View Farmer Update',
      action: () => {
        setActiveRole('FARMER');
        setActiveView('farmer');
      }
    },
    {
      num: 6,
      title: 'Order Tracking & Dark Store Transit',
      desc: 'Customer opens My Orders to see interactive farm-to-fork provenance: Harvested → Quality Verified → In Transit → Delhi Dark Store.',
      actionLabel: 'Open Order Tracker',
      action: () => {
        setActiveRole('BUYER');
        setActiveView('orders');
      }
    },
    {
      num: 7,
      title: 'Dark Store Fulfillment & Delivery',
      desc: 'Click "Simulate Next Stage" to move produce into Delhi Dark Store and dispatch to customer. Smart contract triggers automatic escrow settlement to Ravi!',
      actionLabel: 'Dark Store Network',
      action: () => {
        setActiveRole('BUYER');
        setActiveView('orders');
      }
    },
    {
      num: 8,
      title: 'Partial Fulfillment Risk Management',
      desc: 'What if bad weather causes yield to drop from 1,000 kg to 700 kg? Open the simulator to see proportional payout + automatic refunds executed.',
      actionLabel: 'Test Partial Fulfillment',
      action: () => {
        setActiveRole('FARMER');
        setActiveView('farmer');
      }
    },
    {
      num: 9,
      title: 'Institutional Demand Aggregation Pools',
      desc: 'Large buyers (e.g. restaurant chain needing 10,000 kg tomatoes) post demand pools. Multiple smallholder farmers pool supply to fulfill it collectively.',
      actionLabel: 'View Demand Pools',
      action: () => {
        setActiveView('demand');
      }
    },
    {
      num: 10,
      title: 'The Core Value Proposition',
      desc: '"Instead of farmers growing first and searching for buyers later, buyers commit demand first and farmers grow against that demand."',
      actionLabel: 'Open Protocol Explorer',
      action: () => {
        setActiveView('admin');
      }
    }
  ];

  const current = STEPS[demoStep - 1] || STEPS[0];

  const handleNext = () => {
    if (demoStep < STEPS.length) {
      const nextStep = demoStep + 1;
      setDemoStep(nextStep);
      STEPS[nextStep - 1].action();
    }
  };

  const handlePrev = () => {
    if (demoStep > 1) {
      const prevStep = demoStep - 1;
      setDemoStep(prevStep);
      STEPS[prevStep - 1].action();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-emerald-200 dark:border-emerald-500/30 px-4 py-3 shadow-sm transition-colors duration-150">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Step Badge & Info */}
        <div className="flex items-start sm:items-center space-x-3 w-full md:w-auto">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-sm shrink-0">
            {current.num}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>SIH Demo Pitch Step {current.num} of {STEPS.length}</span>
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{current.title}</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2 md:line-clamp-1 max-w-3xl">
              {current.desc}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
          <button
            onClick={current.action}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm"
          >
            <span>{current.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={handlePrev}
              disabled={demoStep === 1}
              className="p-1.5 rounded text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={demoStep === STEPS.length}
              className="p-1.5 rounded text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsDemoTourActive(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition"
            title="Close presentation guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center space-x-1.5 mt-2 justify-center">
        {STEPS.map((s) => (
          <button
            key={s.num}
            onClick={() => {
              setDemoStep(s.num);
              s.action();
            }}
            className={`h-1.5 rounded-full transition-all ${
              s.num === demoStep 
                ? 'w-8 bg-emerald-600 dark:bg-emerald-400' 
                : s.num < demoStep 
                  ? 'w-2 bg-emerald-300 dark:bg-emerald-700' 
                  : 'w-2 bg-slate-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
