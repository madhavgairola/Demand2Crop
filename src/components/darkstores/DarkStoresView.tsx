import React, { useState } from 'react';
import { 
  Warehouse, 
  MapPin, 
  Thermometer, 
  Layers, 
  CheckCircle2, 
  Package, 
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DarkStoresView: React.FC = () => {
  const { darkStores, buyerCity } = useApp();

  const [selectedHubId, setSelectedHubId] = useState<string>('hub-delhi');

  const selectedHub = darkStores.find((h) => h.id === selectedHubId) || darkStores[0];

  const coldPct = Math.round((selectedHub.coldStorageUsedTons / selectedHub.coldStorageCapacityTons) * 100);
  const dryPct = Math.round((selectedHub.dryStorageUsedTons / selectedHub.dryStorageCapacityTons) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-2 transition-colors duration-150">
        <div className="flex items-center space-x-2">
          <Warehouse className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Dark Store & Urban Silo Fulfillment Network</h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl">
          Regional micro-fulfillment centers situated at metropolitan outskirts that receive bulk farm shipments,
          execute on-chain grade verification, store under optimal humidity/temp silos, and dispatch last-mile deliveries.
        </p>
      </div>

      {/* 5 Dark Stores Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {darkStores.map((hub) => {
          const isSelected = hub.id === selectedHubId;
          const isCurrentBuyerCity = hub.city.toLowerCase() === buyerCity.toLowerCase();
          const totalInvKg = hub.inventory.reduce((acc, curr) => acc + curr.quantityKg, 0);

          return (
            <div
              key={hub.id}
              onClick={() => setSelectedHubId(hub.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-600/20 shadow-sm dark:bg-slate-850 dark:border-emerald-500'
                  : 'bg-white border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Warehouse className="w-4 h-4" />
                  </div>
                  {isCurrentBuyerCity && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 uppercase">
                      Your Hub
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2.5 line-clamp-1">{hub.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{hub.city}, {hub.state}</span>
                </p>

                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Stock:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{totalInvKg.toLocaleString()} kg</strong>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Active Inbound:</span>
                    <strong className="text-emerald-700 dark:text-cyan-400 font-mono font-bold">{hub.activeShipments} trucks</strong>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[11px] flex items-center justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                <span>Inspect Silos</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Dark Store Detailed Inspector */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors duration-150">
        {/* Hub Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedHub.name}</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono border border-slate-200 dark:border-slate-700 font-semibold">
                {selectedHub.id}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Hub Manager: <strong className="text-slate-900 dark:text-white">{selectedHub.managerName}</strong> • Coordinates: [{selectedHub.coordinates.join(', ')}]
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Inbound Trucks</span>
              <span className="text-lg font-bold font-mono text-emerald-700 dark:text-cyan-400">{selectedHub.activeShipments}</span>
            </div>
            <div className="bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Outgoing Dispatches</span>
              <span className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400">{selectedHub.outgoingOrders}</span>
            </div>
          </div>
        </div>

        {/* Storage Capacity Gauges */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-950/30">
          {/* Cold Storage Gauge */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-800 dark:text-cyan-400 flex items-center space-x-1.5">
                <Thermometer className="w-4 h-4 text-cyan-600" />
                <span>Refrigerated Cold Silos (0°C - 8°C)</span>
              </span>
              <span className="text-xs font-mono text-slate-700 dark:text-slate-300">
                {selectedHub.coldStorageUsedTons} / {selectedHub.coldStorageCapacityTons} Tons ({coldPct}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
              <div
                className="h-full bg-cyan-600 rounded-full transition-all duration-500"
                style={{ width: `${coldPct}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Dedicated for perishables: Tomatoes, Strawberries, Himalayan Apples.
            </p>
          </div>

          {/* Dry Silo Gauge */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Dry Grain Silos & Ventilated Bays</span>
              </span>
              <span className="text-xs font-mono text-slate-700 dark:text-slate-300">
                {selectedHub.dryStorageUsedTons} / {selectedHub.dryStorageCapacityTons} Tons ({dryPct}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
              <div
                className="h-full bg-amber-600 rounded-full transition-all duration-500"
                style={{ width: `${dryPct}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Dedicated for staples: Sharbati Wheat, Pusa Basmati, Potatoes, Onions.
            </p>
          </div>
        </div>

        {/* Live Granular Crop Inventory Table */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Package className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Current Verified In-Store Inventory ({selectedHub.inventory.length} Batches)</span>
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Automatically updated when smart contracts reach "AT_DARK_STORE" stage
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-mono border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Crop</th>
                  <th className="py-2.5 px-4">Current Stock</th>
                  <th className="py-2.5 px-4">Farmer Origin</th>
                  <th className="py-2.5 px-4">Inbound Date</th>
                  <th className="py-2.5 px-4">Quality Grade</th>
                  <th className="py-2.5 px-4 text-right">Oracle Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                {selectedHub.inventory.map((inv, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-950/40 transition">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                      <span>{inv.crop === 'Wheat' ? '🌾' : inv.crop === 'Tomatoes' ? '🍅' : inv.crop === 'Potatoes' ? '🥔' : '🍚'}</span>
                      <span>{inv.crop}</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {inv.quantityKg.toLocaleString()} kg
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                      {inv.farmerName}
                    </td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-mono">
                      {inv.arrivedAt}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 uppercase">
                        {inv.qualityGrade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px] flex items-center justify-end space-x-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Inbound Scanned ✓</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
