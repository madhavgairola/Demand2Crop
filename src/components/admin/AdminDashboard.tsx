import React from 'react';
import { 
  ShieldCheck, 
  Warehouse, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { listings, orders, darkStores, transactions, setActiveView } = useApp();

  const totalCommittedKg = listings.reduce((acc, l) => acc + l.committedQuantityKg, 0);
  const totalEscrowLocked = listings.reduce((acc, l) => acc + l.escrowTotalLocked, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-2 transition-colors duration-150">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Platform Governance & Protocol Administration</h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl">
          Real-time network telemetries across sovereign farmer contracts, decentralized escrow vaults,
          multi-city dark store inventory throughput, and distributed ledger block validation.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Farmers</span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">12+</div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">100% Accredited</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Buyers</span>
          <div className="text-2xl font-bold font-mono text-emerald-700 dark:text-teal-400">18+</div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Retail & Commercial</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Contracts</span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-cyan-400">{listings.length}</div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">On-Chain Escrows</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Committed Produce</span>
          <div className="text-2xl font-bold font-mono text-amber-700 dark:text-amber-400">{totalCommittedKg.toLocaleString()} kg</div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Pre-Purchased</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Escrow Locked</span>
          <div className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400">₹{totalEscrowLocked.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-500 font-semibold">Zero Default</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Dark Store Hubs</span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">{darkStores.length} Hubs</div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Delhi, Mumbai, etc.</span>
        </div>
      </div>

      {/* Dark Stores Storage Overview & Ledger Block Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dark Stores Capacities */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 transition-colors duration-150">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <Warehouse className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Dark Store Network Capacity & Utilization</span>
            </h3>
            <button
              onClick={() => setActiveView('darkstores')}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline flex items-center space-x-1 font-semibold"
            >
              <span>View Silos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {darkStores.map((hub) => {
              const totalCap = hub.coldStorageCapacityTons + hub.dryStorageCapacityTons;
              const totalUsed = hub.coldStorageUsedTons + hub.dryStorageUsedTons;
              const pct = Math.round((totalUsed / totalCap) * 100);

              return (
                <div key={hub.id} className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">{hub.name} ({hub.city})</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">{totalUsed} / {totalCap} Tons ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Active Inbound: {hub.activeShipments} trucks</span>
                    <span>Outgoing: {hub.outgoingOrders} orders</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Ledger Transactions Stream */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 transition-colors duration-150">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emerald-600 dark:text-cyan-400" />
              <span>Real-Time Distributed Ledger Audit Stream</span>
            </h3>
            <button
              onClick={() => setActiveView('blockchain')}
              className="text-xs text-emerald-700 dark:text-cyan-400 hover:underline flex items-center space-x-1 font-semibold"
            >
              <span>Open Explorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {transactions.slice(0, 5).map((tx) => (
              <div
                key={tx.txHash}
                className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-xs font-mono"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-slate-800 dark:text-cyan-300">
                    {tx.type}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{tx.timestamp}</span>
                </div>
                <p className="text-slate-800 dark:text-slate-300 font-sans text-xs pt-0.5">
                  {tx.details}
                </p>
                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-800/80">
                  <span className="truncate max-w-[200px]" title={tx.txHash}>{tx.txHash}</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">Block #{tx.blockNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
