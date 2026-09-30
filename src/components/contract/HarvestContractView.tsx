import React, { useState } from 'react';
import { 
  FileCode2, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Copy, 
  Check, 
  Code
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SOLIDITY_HARVEST_ESCROW_CODE } from '../../services/blockchain';

export const HarvestContractView: React.FC = () => {
  const { listings, selectedListing, setActiveView } = useApp();

  const [copiedCode, setCopiedCode] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const contractListing = selectedListing || listings.find((l) => l.contractId === '#HC-48291') || listings[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(SOLIDITY_HARVEST_ESCROW_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const steps = [
    { title: '1. Payment Locked in Escrow', desc: 'Buyer pre-commits ₹; funds held in non-custodial contract vault.', status: 'PASSED' },
    { title: '2. Sowing & Cultivation', desc: 'Farmer draws 30% upfront working capital upon seed drill telemetry.', status: 'PASSED' },
    { title: '3. Quality Verification', desc: 'Independent hub inspector signs Grade A certificate on-chain.', status: 'PASSED' },
    { title: '4. Dark Store Receipt', desc: 'Produce binned into urban distribution silo (Ludhiana → Delhi).', status: 'ACTIVE' },
    { title: '5. Doorstep Delivery', desc: 'Buyer verifies physical delivery via cryptographic OTP signature.', status: 'PENDING' },
    { title: '6. Escrow Settlement', desc: 'Smart contract automatically releases remainder funds to farmer.', status: 'PENDING' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-2 transition-colors duration-150">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <FileCode2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <span>Harvest Escrow Contract</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400">{contractListing.contractId}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Self-executing digital forward pre-purchase agreement deployed on the distributed ledger.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-cyan-300 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition"
            >
              <Code className="w-3.5 h-3.5 text-emerald-600 dark:text-cyan-400" />
              <span>{showCode ? 'Hide Solidity Code' : 'View Solidity Smart Contract'}</span>
            </button>
            <button
              onClick={() => setActiveView('blockchain')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Ledger Explorer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contract Core Specs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors duration-150">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Harvest Specification: {contractListing.crop} ({contractListing.variety})
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 uppercase">
                {contractListing.stage}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Farmer: <strong className="text-slate-900 dark:text-white">{contractListing.farmerName}</strong> • Origin: <strong className="text-slate-900 dark:text-white">{contractListing.farmerLocation}, {contractListing.farmerState}</strong>
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Current Escrow Balance Locked</span>
            <span className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
              ₹{contractListing.escrowTotalLocked.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Blockchain Metadata Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white dark:bg-slate-950/30 border-b border-slate-200 dark:border-slate-800 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-sans font-semibold">Contract Address</span>
            <p className="text-emerald-700 dark:text-cyan-400 truncate text-[11px]" title={contractListing.contractAddress}>
              {contractListing.contractAddress}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-sans font-semibold">Consensus Network</span>
            <p className="text-slate-900 dark:text-white text-[11px]">AgriLedger Rollup (L2 EVM)</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-sans font-semibold">Expected Production</span>
            <p className="text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
              {contractListing.expectedQuantityKg.toLocaleString()} kg @ ₹{contractListing.pricePerKg}/kg
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-sans font-semibold">Harvest Deadline</span>
            <p className="text-amber-700 dark:text-amber-400 text-[11px] font-bold">{contractListing.expectedHarvestDate}</p>
          </div>
        </div>

        {/* Visual Escrow Settlement State Machine */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Smart Contract Escrow Execution State Machine
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Multi-Sig Condition Guard Active</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {steps.map((st, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border space-y-1.5 ${
                  st.status === 'PASSED'
                    ? 'bg-slate-50 border-emerald-300 text-slate-800 dark:bg-slate-950 dark:border-emerald-900/60 dark:text-slate-200'
                    : st.status === 'ACTIVE'
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30 text-emerald-950 dark:bg-emerald-950/30 dark:border-emerald-500 dark:text-emerald-200'
                      : 'bg-slate-50/50 border-slate-200 text-slate-400 dark:bg-slate-950/40 dark:border-slate-800 dark:text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{st.title}</span>
                  {st.status === 'PASSED' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : st.status === 'ACTIVE' ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-300 font-mono">
                      IN PROGRESS
                    </span>
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  )}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Sig Oracle Verification Station */}
        <div className="p-6 pt-3 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
            Cryptographic Multi-Signature Oracle Verifications
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="font-sans font-semibold">Farmer Private Key</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[10px]">Sig: 0x8a92...3b1f (Confirmed)</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-cyan-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="font-sans font-semibold">Dark Store Inspector Oracle</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[10px]">Sig: 0x4f12...e901 (Certified Grade A)</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <div className="flex items-center space-x-1.5 text-amber-700 dark:text-amber-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="font-sans font-semibold">Escrow Multi-Sig Vault</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[10px]">Settlement Release: Automated on Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Solidity Source Code Accordion */}
      {showCode && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-0 animate-fade-in">
          <div className="px-6 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white font-mono">HarvestEscrow.sol (OpenZeppelin / EVM ^0.8.20)</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy Solidity'}</span>
            </button>
          </div>

          <pre className="p-6 bg-slate-950 text-slate-300 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed selection:bg-emerald-600">
            {SOLIDITY_HARVEST_ESCROW_CODE}
          </pre>
        </div>
      )}
    </div>
  );
};
