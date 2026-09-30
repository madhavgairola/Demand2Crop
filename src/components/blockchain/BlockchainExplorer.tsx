import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BlockchainExplorer: React.FC = () => {
  const { blocks, transactions } = useApp();

  const [searchFilter, setSearchFilter] = useState('');

  const filteredTxs = transactions.filter(
    (tx) =>
      tx.txHash.toLowerCase().includes(searchFilter.toLowerCase()) ||
      tx.contractRef.toLowerCase().includes(searchFilter.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchFilter.toLowerCase()) ||
      tx.details.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-2 transition-colors duration-150">
        <div className="flex items-center space-x-2">
          <Layers className="w-6 h-6 text-emerald-600 dark:text-cyan-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">AgriLedger Distributed Ledger Explorer</h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl">
          Zero-Knowledge Proof & EVM consensus layer recording forward crop commitments, non-custodial escrow balances,
          quality inspection oracle stamps, and partial settlement disbursements.
        </p>
      </div>

      {/* Network Live Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Latest Block Height</span>
          <div className="text-xl font-bold font-mono text-emerald-700 dark:text-cyan-400">#{blocks[0]?.blockNumber}</div>
          <span className="text-[10px] text-slate-500">Block Time ~2.4s</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Total Verified Txs</span>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">{transactions.length}</div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">100% Finality</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Consensus Mechanism</span>
          <div className="text-base font-bold text-slate-900 dark:text-white font-mono">Proof-of-Fulfillment (PoF)</div>
          <span className="text-[10px] text-slate-500">Decentralized Multi-Sig Oracles</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Smart Contract VM</span>
          <div className="text-base font-bold text-emerald-700 dark:text-emerald-400 font-mono">Solidity EVM ^0.8.20</div>
          <span className="text-[10px] text-slate-500">Native Escrow Standards</span>
        </div>
      </div>

      {/* Blocks Visual Ribbon */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3 transition-colors duration-150">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider">
          Recent Validated Blocks
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {blocks.slice(0, 4).map((b) => (
            <div
              key={b.blockNumber}
              className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono"
            >
              <div className="flex justify-between items-center">
                <span className="text-emerald-700 dark:text-cyan-400 font-bold">Block #{b.blockNumber}</span>
                <span className="text-[10px] text-slate-500">{b.transactionsCount} txs</span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                <p className="truncate" title={b.blockHash}>Hash: {b.blockHash}</p>
                <p className="text-[10px] text-slate-500">Validator: {b.validator}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Searchable Transactions Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 transition-colors duration-150">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Ledger Transaction Audit Trail ({filteredTxs.length})
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by hash, type, or contract..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-mono border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Tx Hash</th>
                <th className="py-2.5 px-3">Block</th>
                <th className="py-2.5 px-3">Action Type</th>
                <th className="py-2.5 px-3">Contract Ref</th>
                <th className="py-2.5 px-3">Amount (₹)</th>
                <th className="py-2.5 px-3">Details</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 font-mono text-xs">
              {filteredTxs.map((tx) => (
                <tr key={tx.txHash} className="hover:bg-slate-50 dark:hover:bg-slate-950/40 transition">
                  <td className="py-3 px-3 text-emerald-700 dark:text-cyan-400 font-bold truncate max-w-[130px]" title={tx.txHash}>
                    {tx.txHash.slice(0, 10)}...{tx.txHash.slice(-6)}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                    #{tx.blockNumber}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-transparent">
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-700 dark:text-emerald-400 font-bold">
                    {tx.contractRef}
                  </td>
                  <td className="py-3 px-3 text-slate-900 dark:text-white">
                    {tx.amountInr ? `₹${tx.amountInr.toLocaleString()}` : '—'}
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-700 dark:text-slate-300 truncate max-w-[260px]" title={tx.details}>
                    {tx.details}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-end space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{tx.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
