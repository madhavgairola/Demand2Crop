import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Truck, 
  ArrowUpDown, 
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HarvestListing } from '../../types';
import { evaluateLogisticsFeasibility } from '../../services/logistics';
import { CommitmentTxModal } from '../checkout/CommitmentTxModal';

export const Marketplace: React.FC = () => {
  const { listings, buyerCity } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropCategory, setSelectedCropCategory] = useState<string>('ALL');
  const [selectedLocation, setSelectedLocation] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'committed' | 'price' | 'date'>('committed');

  const [activeModalListing, setActiveModalListing] = useState<HarvestListing | null>(null);

  // Filter listings
  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.farmerLocation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCropCategory === 'ALL' ||
      (selectedCropCategory === 'GRAINS' && ['Wheat', 'Basmati Rice', 'Soybean', 'Pulses (Arhar)'].includes(listing.crop)) ||
      (selectedCropCategory === 'VEGETABLES' && ['Tomatoes', 'Potatoes', 'Onions', 'Green Chillies'].includes(listing.crop)) ||
      (selectedCropCategory === 'FRUITS' && ['Apples', 'Strawberries'].includes(listing.crop));

    const matchesLocation =
      selectedLocation === 'ALL' || listing.farmerState.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Sort listings
  filteredListings.sort((a, b) => {
    if (sortBy === 'committed') {
      const pctA = a.committedQuantityKg / a.expectedQuantityKg;
      const pctB = b.committedQuantityKg / b.expectedQuantityKg;
      return pctB - pctA;
    }
    if (sortBy === 'price') {
      return a.pricePerKg - b.pricePerKg;
    }
    if (sortBy === 'date') {
      return new Date(a.expectedHarvestDate).getTime() - new Date(b.expectedHarvestDate).getTime();
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header & Logistics Feasibility Alert */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 transition-colors duration-150">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                Agri<span className="text-emerald-700 dark:text-emerald-400">Market</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 uppercase">
                Demand-Driven Forward Exchange
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Pre-commit to verified farmer harvests before sowing. Lock lower forward prices with smart-contract escrow security.
            </p>
          </div>

          {/* Active Delivery Destination */}
          <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center space-x-3 text-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center border border-emerald-300 dark:border-emerald-500/30">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Your Delivery Destination</span>
              <span className="font-bold text-slate-900 dark:text-white">{buyerCity} Metropolitan Corridor</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search text */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search crop, variety, or farmer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCropCategory}
            onChange={(e) => setSelectedCropCategory(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-emerald-600"
          >
            <option value="ALL">All Crop Categories</option>
            <option value="GRAINS">Grains & Pulses</option>
            <option value="VEGETABLES">Fresh Vegetables</option>
            <option value="FRUITS">Orchard Fruits</option>
          </select>

          {/* State Filter */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-emerald-600"
          >
            <option value="ALL">All Farmer Regions</option>
            <option value="Punjab">Punjab</option>
            <option value="Haryana">Haryana</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Telangana">Telangana</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
          </select>

          {/* Sort By */}
          <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-500 dark:text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer w-full"
            >
              <option value="committed" className="bg-white dark:bg-slate-900">Highest Committed %</option>
              <option value="price" className="bg-white dark:bg-slate-900">Price: Low to High</option>
              <option value="date" className="bg-white dark:bg-slate-900">Earliest Harvest Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredListings.map((listing) => {
          const committedPct = Math.round((listing.committedQuantityKg / listing.expectedQuantityKg) * 100);
          const remainingKg = Math.max(0, listing.expectedQuantityKg - listing.committedQuantityKg);
          
          const logistics = evaluateLogisticsFeasibility(
            listing.crop,
            listing.farmerLocation,
            buyerCity,
            100
          );

          const isRaviListing = listing.farmerId === 'farmer-ravi-singh';

          return (
            <div
              key={listing.id}
              className={`bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden transition-all flex flex-col justify-between ${
                isRaviListing 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div>
                {/* Card Top Banner */}
                <div className="p-5 pb-3 flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-2xl shrink-0">
                      {listing.crop === 'Wheat' ? '🌾' :
                       listing.crop === 'Tomatoes' ? '🍅' :
                       listing.crop === 'Potatoes' ? '🥔' :
                       listing.crop === 'Basmati Rice' ? '🍚' :
                       listing.crop === 'Apples' ? '🍎' :
                       listing.crop === 'Onions' ? '🧅' :
                       listing.crop === 'Strawberries' ? '🍓' : '🌱'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">{listing.crop}</h4>
                        {isRaviListing && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-700/50 uppercase">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{listing.variety}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>{listing.farmerName} • {listing.farmerLocation}, {listing.farmerState}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400">
                      ₹{listing.pricePerKg}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">/ kg</span>
                  </div>
                </div>

                {/* Logistics Feasibility Badge */}
                <div className="px-5 py-2">
                  <div
                    className={`p-2 rounded-xl text-xs flex items-start space-x-2 ${
                      logistics.isFeasible
                        ? 'bg-emerald-50/70 border border-emerald-200 text-emerald-900 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300'
                        : 'bg-rose-50 border border-rose-200 text-rose-900 dark:bg-rose-950/30 dark:border-rose-800/40 dark:text-rose-300'
                    }`}
                  >
                    <Truck className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${logistics.isFeasible ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`} />
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-semibold">
                          {listing.farmerLocation} → {buyerCity} ({logistics.distanceKm} km)
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          logistics.isFeasible ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-200 text-rose-900 dark:bg-rose-950 dark:text-rose-300'
                        }`}>
                          {logistics.isFeasible ? 'FEASIBLE ✓' : 'LOGISTICS RISK ⚠️'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1">
                        {logistics.reason}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Commitment Progress Bar */}
                <div className="px-5 py-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Committed: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{listing.committedQuantityKg} kg ({committedPct}%)</strong></span>
                    <span>Remaining: <strong className="text-slate-900 dark:text-white font-mono">{remainingKg} kg</strong></span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div
                      className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${committedPct}%` }}
                    />
                  </div>
                </div>

                {/* Metadata details */}
                <div className="px-5 py-2.5 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Harvest: <strong className="text-slate-800 dark:text-slate-200">{listing.expectedHarvestDate}</strong></span>
                  </span>
                  <span className="font-mono text-[11px] text-emerald-700 dark:text-cyan-400 font-semibold">{listing.contractId}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/40">
                <button
                  onClick={() => setActiveModalListing(listing)}
                  disabled={remainingKg <= 0 || !logistics.isFeasible}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition ${
                    remainingKg <= 0
                      ? 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed'
                      : !logistics.isFeasible
                        ? 'bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-slate-800 dark:text-rose-300'
                        : isRaviListing
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>
                    {remainingKg <= 0
                      ? '100% PRE-COMMITTED'
                      : !logistics.isFeasible
                        ? 'PERISHABILITY EXCEEDED'
                        : `PRE-COMMIT / BUY (₹${listing.pricePerKg}/kg)`}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pre-commitment Checkout Modal */}
      {activeModalListing && (
        <CommitmentTxModal
          isOpen={!!activeModalListing}
          onClose={() => setActiveModalListing(null)}
          listing={activeModalListing}
        />
      )}
    </div>
  );
};
