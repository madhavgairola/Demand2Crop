import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Truck, 
  ArrowUpDown, 
  Lock,
  User,
  Info,
  X,
  ShieldCheck,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HarvestListing } from '../../types';
import { evaluateLogisticsFeasibility } from '../../services/logistics';
import { CROP_METADATA_REGISTRY } from '../../services/cropMetadata';
import { CommitmentTxModal } from '../checkout/CommitmentTxModal';

export const Marketplace: React.FC = () => {
  const { listings, buyerCity, buyerProfile, lang, setActiveView } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropCategory, setSelectedCropCategory] = useState<string>('ALL');
  const [selectedLocation, setSelectedLocation] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'committed' | 'price' | 'date'>('newest');

  const [activeModalListing, setActiveModalListing] = useState<HarvestListing | null>(null);
  const [detailsModalListing, setDetailsModalListing] = useState<HarvestListing | null>(null);

  // Filter listings
  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.farmerLocation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCropCategory === 'ALL' ||
      (selectedCropCategory === 'GRAINS' && ['Wheat', 'Basmati Rice', 'Soybean', 'Pulses (Arhar)', 'Mustard Seed'].includes(listing.crop)) ||
      (selectedCropCategory === 'VEGETABLES' && ['Tomatoes', 'Potatoes', 'Onions', 'Green Chillies'].includes(listing.crop)) ||
      (selectedCropCategory === 'FRUITS' && ['Apples', 'Strawberries'].includes(listing.crop)) ||
      (selectedCropCategory === 'COMMODITIES' && ['Cotton', 'Mustard Seed', 'Soybean'].includes(listing.crop));

    const matchesLocation =
      selectedLocation === 'ALL' || 
      listing.farmerState.toLowerCase().includes(selectedLocation.toLowerCase()) ||
      listing.farmerLocation.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Sort listings
  filteredListings.sort((a, b) => {
    if (sortBy === 'newest') {
      const timeA = a.id.startsWith('listing-') && !isNaN(Number(a.id.replace('listing-', '')))
        ? Number(a.id.replace('listing-', ''))
        : new Date(a.createdAt || a.expectedHarvestDate).getTime();
      const timeB = b.id.startsWith('listing-') && !isNaN(Number(b.id.replace('listing-', '')))
        ? Number(b.id.replace('listing-', ''))
        : new Date(b.createdAt || b.expectedHarvestDate).getTime();
      return timeB - timeA;
    }
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
      {/* Header & Delivery Info */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 transition-colors duration-150">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === 'hi' ? 'फसल बाज़ार' : 'Crop Marketplace'}
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {lang === 'hi' 
                ? 'सत्यापित किसानों से सीधी ताज़ा फसलें देखें और अग्रिम ऑर्डर बुक करें।' 
                : 'Browse fresh harvests directly from verified farmers and pre-order quality crops.'}
            </p>
          </div>

          {/* Clean Delivery Destination Pill */}
          <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-slate-600 dark:text-slate-400">
              {lang === 'hi' ? 'डिलीवरी:' : 'Delivering to:'} <strong className="text-slate-900 dark:text-white font-semibold">{buyerCity}</strong>
            </span>
            <button
              onClick={() => setActiveView('account')}
              className="ml-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold hover:underline"
            >
              {lang === 'hi' ? 'बदलें' : 'Change'}
            </button>
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
            <option value="COMMODITIES">Commodities & Cash Crops</option>
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
              <option value="newest" className="bg-white dark:bg-slate-900">Newest Forward Listings</option>
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
              onClick={() => setDetailsModalListing(listing)}
              className={`bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer ${
                isRaviListing 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-slate-700'
              }`}
              title={lang === 'hi' ? 'पूरा विवरण देखने के लिए क्लिक करें' : 'Click to view full details in modal'}
            >
              <div>
                {/* 1. Crop Name & Price */}
                <div className="p-4 pb-2.5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-2xl shrink-0">
                      {CROP_METADATA_REGISTRY[listing.crop]?.icon || '🌱'}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                        <span>{listing.crop}</span>
                        {isRaviListing && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-700/50 uppercase">
                            Featured
                          </span>
                        )}
                      </h4>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400">
                      ₹{listing.pricePerKg}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">/ kg</span>
                  </div>
                </div>

                {/* 2. Commitment Bar */}
                <div className="px-4 py-2 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium">
                      {lang === 'hi' ? 'अग्रिम बुकिंग:' : 'Committed:'} <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{committedPct}%</strong>
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1">
                      <span>{lang === 'hi' ? 'विवरण' : 'Details'}</span>
                      <Info className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div
                      className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${committedPct}%` }}
                    />
                  </div>
                </div>

                {/* 3. Harvest Date */}
                <div className="px-4 py-2 text-xs text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lang === 'hi' ? 'कटाई तारीख:' : 'Harvest Date:'} <strong className="text-slate-800 dark:text-slate-200">{listing.expectedHarvestDate}</strong></span>
                </div>
              </div>

                {/* 4. Action Button */}
                <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!logistics.isFeasible) {
                        setDetailsModalListing(listing);
                      } else {
                        setActiveModalListing(listing);
                      }
                    }}
                    disabled={remainingKg <= 0}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition ${
                      remainingKg <= 0
                        ? 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed'
                        : !logistics.isFeasible
                          ? 'bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                          : isRaviListing
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                    }`}
                  >
                    {!logistics.isFeasible ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {remainingKg <= 0
                        ? (lang === 'hi' ? 'पूर्णतः अग्रिम बुक (100%)' : 'Sold Out / Pre-Booked')
                        : !logistics.isFeasible
                          ? (lang === 'hi' ? 'परिवहन जोखिम (अमान्य)' : 'Transit Feasibility Risk (Blocked)')
                          : (lang === 'hi' ? `अग्रिम ऑर्डर बुक करें (₹${listing.pricePerKg}/किग्रा)` : `Pre-Order / Buy (₹${listing.pricePerKg}/kg)`)}
                    </span>
                  </button>
                </div>
              </div>
            );
        })}
      </div>

      {/* Centered Details Modal / Tab for Buyers */}
      {detailsModalListing && (() => {
        const modalLogistics = evaluateLogisticsFeasibility(
          detailsModalListing.crop,
          detailsModalListing.farmerLocation,
          buyerCity,
          100
        );
        const remainingKg = Math.max(0, detailsModalListing.expectedQuantityKg - detailsModalListing.committedQuantityKg);

        return (
          <div 
            onClick={() => setDetailsModalListing(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 dark:bg-slate-950/85 backdrop-blur-sm animate-fade-in"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scale-in"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center text-2xl border border-emerald-300 dark:border-emerald-800">
                    {CROP_METADATA_REGISTRY[detailsModalListing.crop]?.icon || '🌱'}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {detailsModalListing.crop}
                      </h3>
                      <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        {detailsModalListing.contractId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      {detailsModalListing.variety} • {detailsModalListing.qualityGrade}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setDetailsModalListing(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Fixed Pre-Order Price</span>
                    <span className="text-base font-bold font-mono text-emerald-700 dark:text-emerald-400">₹{detailsModalListing.pricePerKg} / kg</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Escrow Guaranteed</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Expected Harvest</span>
                    <span className="text-base font-semibold text-slate-800 dark:text-slate-200">{detailsModalListing.expectedHarvestDate}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Delivery Ready Date</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Committed by Buyers</span>
                    <span className="text-base font-bold font-mono text-emerald-700 dark:text-emerald-400">{detailsModalListing.committedQuantityKg.toLocaleString()} kg</span>
                    <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                      {Math.round((detailsModalListing.committedQuantityKg / detailsModalListing.expectedQuantityKg) * 100)}% Booked
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Remaining Available</span>
                    <span className="text-base font-bold font-mono text-slate-800 dark:text-slate-200">
                      {remainingKg.toLocaleString()} kg
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Open to Pre-Commit</span>
                  </div>
                </div>

                {/* Logistics Feasibility Corridor */}
                <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                  modalLogistics.isFeasible
                    ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-800/80 text-emerald-950 dark:text-slate-200'
                    : 'bg-rose-50 border-rose-300 text-rose-950 dark:bg-rose-950/30 dark:border-rose-800/80 dark:text-rose-200'
                }`}>
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center space-x-1.5">
                      <Truck className={`w-4 h-4 ${modalLogistics.isFeasible ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`} />
                      <span>Logistics Corridor: {detailsModalListing.farmerLocation} → {buyerCity} ({modalLogistics.distanceKm} km)</span>
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      modalLogistics.isFeasible 
                        ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700' 
                        : 'bg-rose-200 text-rose-900 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                    }`}>
                      {modalLogistics.isFeasible ? 'FEASIBLE ✓' : 'LOGISTICS RISK ⚠️'}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    {modalLogistics.reason}
                  </p>
                </div>

                {/* Farmer and Hub Info */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Farmer:</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{detailsModalListing.farmerName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Origin Farm:</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{detailsModalListing.farmerLocation}, {detailsModalListing.farmerState}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Distribution Hub:</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{detailsModalListing.darkStoreName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Shelf Life & Cold Chain:</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{detailsModalListing.shelfLife}</span>
                  </div>
                </div>

                {/* Description */}
                {detailsModalListing.description && (
                  <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">Crop & Cultivation Notes:</span>
                    <p>{detailsModalListing.description}</p>
                  </div>
                )}

                {/* Escrow Guarantee */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>100% Protected by Smart Contract Bank Escrow</span>
                  </span>
                  <span className="font-mono text-slate-400 truncate max-w-[180px]">
                    {detailsModalListing.contractAddress}
                  </span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setDetailsModalListing(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Close
                </button>
                {!modalLogistics.isFeasible ? (
                  <button
                    type="button"
                    disabled
                    className="px-5 py-2 rounded-xl bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300 dark:border-rose-800 font-bold text-xs cursor-not-allowed flex items-center space-x-2"
                    title={modalLogistics.reason}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                    <span>Logistics Risk (Purchase Blocked)</span>
                  </button>
                ) : remainingKg <= 0 ? (
                  <button
                    type="button"
                    disabled
                    className="px-5 py-2 rounded-xl bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500 font-bold text-xs cursor-not-allowed flex items-center space-x-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Sold Out / Pre-Booked</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const toOpen = detailsModalListing;
                      setDetailsModalListing(null);
                      setActiveModalListing(toOpen);
                    }}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm flex items-center space-x-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Pre-Order / Buy Now</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

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
