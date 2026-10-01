import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Maximize2, Minimize2, X, Play, Trash2, Cpu, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NodeTerminal: React.FC = () => {
  const { nodeLogs, addNodeLog, clearNodeLogs, blocks } = useApp();
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of logs when new log arrives
  useEffect(() => {
    if (isOpen) {
      logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [nodeLogs, isOpen]);

  const handleSimulatePing = () => {
    const currentBlock = blocks[0]?.blockNumber || 104294;
    addNodeLog({
      type: 'rpc',
      message: `eth_blockNumber -> #${currentBlock} (Latency: 18ms)`
    });
    setTimeout(() => {
      addNodeLog({
        type: 'info',
        message: `net_peerCount -> 12 active validator peers connected`
      });
    }, 400);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center space-x-2.5 px-3.5 py-2.5 rounded-2xl bg-slate-950 text-white border border-slate-700 hover:border-purple-500 shadow-2xl hover:shadow-purple-500/20 transition group text-xs font-mono"
        title="Open Live Polygon EVM RPC Node Console"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
        <Terminal className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
        <span className="font-semibold text-slate-200">
          Polygon RPC Node <span className="text-emerald-400">#{blocks[0]?.blockNumber}</span>
        </span>
        <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] border border-purple-800">
          /test mode
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-200 ${
        isExpanded
          ? 'bottom-4 right-4 left-4 sm:left-auto sm:w-[720px] h-[520px]'
          : 'bottom-4 right-4 w-[92vw] sm:w-[520px] h-[340px]'
      } flex flex-col rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-md overflow-hidden ring-1 ring-white/10`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800 select-none">
        <div className="flex items-center space-x-2.5">
          {/* Mac-style traffic lights */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setIsOpen(false)}
              className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition"
              title="Close terminal"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition"
              title="Minimize"
            />
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition"
              title="Toggle size"
            />
          </div>

          <div className="flex items-center space-x-2 pl-1 font-mono text-xs text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-bold text-white">Polygon Amoy Node</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-300 border border-purple-700/50">
              Chain 80002 :8545
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleSimulatePing}
            className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-mono transition"
            title="Simulate JSON-RPC eth_blockNumber ping"
          >
            <Play className="w-2.5 h-2.5 text-emerald-400" />
            <span>Ping RPC</span>
          </button>
          <button
            onClick={clearNodeLogs}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
            title="Clear logs"
          >
            <Trash2 className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
            title="Minimize to pill"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Log Output */}
      <div className="flex-1 p-3.5 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="text-slate-500 pb-1 border-b border-slate-900 flex items-center justify-between text-[10px]">
          <span>EVM JSON-RPC Server initialized at ws://127.0.0.1:8546</span>
          <span className="text-emerald-400 font-semibold flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Syncd Block #{blocks[0]?.blockNumber}</span>
          </span>
        </div>

        {nodeLogs.map((log) => {
          let tagClass = 'text-purple-400 bg-purple-950/60 border-purple-800/60';
          let tagText = 'RPC';
          if (log.type === 'mining') {
            tagClass = 'text-amber-400 bg-amber-950/60 border-amber-800/60';
            tagText = 'MINING';
          } else if (log.type === 'event') {
            tagClass = 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
            tagText = 'EVENT';
          } else if (log.type === 'info') {
            tagClass = 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60';
            tagText = 'NODE';
          }

          return (
            <div key={log.id} className="flex items-start space-x-2 text-slate-300 hover:bg-slate-900/40 px-1 py-0.5 rounded">
              <span className="text-slate-500 select-none text-[10px] shrink-0 mt-0.5">
                {log.timestamp}
              </span>
              <span className={`text-[9px] font-bold px-1 py-0.2 rounded border uppercase shrink-0 mt-0.5 ${tagClass}`}>
                {tagText}
              </span>
              <span className={`break-all ${
                log.type === 'mining'
                  ? 'text-amber-200'
                  : log.type === 'event'
                    ? 'text-emerald-300 font-semibold'
                    : log.type === 'rpc'
                      ? 'text-cyan-200'
                      : 'text-slate-300'
              }`}>
                {log.message}
              </span>
            </div>
          );
        })}
        <div ref={logsEndRef} />
      </div>

      {/* Terminal Footer Status Bar */}
      <div className="px-3.5 py-1.5 bg-slate-900/80 border-t border-slate-800 text-[10px] font-mono flex items-center justify-between text-slate-400">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Gas: <strong>22 Gwei</strong></span>
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">Validators: <strong>12 Active</strong></span>
        </div>
        <div className="text-slate-400">
          Tip: Actions in the UI emit live on-chain logs here
        </div>
      </div>
    </div>
  );
};
