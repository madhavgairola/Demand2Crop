import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  HarvestListing, 
  UserOrder, 
  DemandPool, 
  DarkStoreHub, 
  LedgerTransaction, 
  LedgerBlock, 
  UserRole, 
  AppView, 
  LifecycleStage,
  CropType
} from '../types';
import { 
  INITIAL_LISTINGS, 
  INITIAL_ORDERS, 
  INITIAL_DEMAND_POOLS, 
  RAVI_SINGH_REPUTATION 
} from '../services/seedData';
import { DARK_STORE_HUBS, evaluateLogisticsFeasibility, INDIAN_CITIES } from '../services/logistics';
import { 
  INITIAL_TRANSACTIONS, 
  INITIAL_BLOCKS, 
  generateContractAddress, 
  generateTxHash, 
  generateContractId 
} from '../services/blockchain';
import { FarmerLang } from '../components/farmer/farmerTranslations';

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface NodeLog {
  id: string;
  timestamp: string;
  type: 'rpc' | 'mining' | 'event' | 'info';
  message: string;
}

const INITIAL_NODE_LOGS: NodeLog[] = [
  {
    id: 'log-1',
    timestamp: '09:14:22',
    type: 'info',
    message: 'Polygon Amoy JSON-RPC Node started at ws://127.0.0.1:8546 (Chain ID: 80002)'
  },
  {
    id: 'log-2',
    timestamp: '09:14:23',
    type: 'rpc',
    message: 'eth_chainId -> 0x13882 (Polygon Amoy PoS Testnet)'
  },
  {
    id: 'log-3',
    timestamp: '09:14:24',
    type: 'mining',
    message: 'Block #104292 verified by Validator-Node-Punjab-Agri-01 (100% finality)'
  },
  {
    id: 'log-4',
    timestamp: '09:14:25',
    type: 'event',
    message: 'Contract Deployed: HarvestEscrow (#HC-48291) at 0x88912e7bb014389012a6cb82e99f018349071241'
  },
  {
    id: 'log-5',
    timestamp: '11:32:05',
    type: 'rpc',
    message: 'eth_sendRawTransaction: lockEscrowDeposit(300 kg, ₹3,250)'
  },
  {
    id: 'log-6',
    timestamp: '11:32:06',
    type: 'mining',
    message: 'Mined in Block #104293 (Tx: 0x8b22a0149021... Gas: 88,400)'
  },
  {
    id: 'log-7',
    timestamp: '11:32:06',
    type: 'event',
    message: 'Event: BuyerPreCommitted(buyer: 0x71a481..., escrowLocked: 3250 INR)'
  }
];

export interface FarmerProfile {
  name: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  landSizeAcres: number;
  soilType: string;
  irrigationMethod: string;
  kccNumber: string;
  bankAccount: string;
  ifscCode: string;
  upiId: string;
}

export interface BuyerProfile {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  deliveryAddress: string;
  businessType: string;
  gstin: string;
  bankAccount: string;
}

export const DEFAULT_FARMER_PROFILE: FarmerProfile = {
  name: 'Ravi Singh',
  phone: '+91 98765 43210',
  village: 'Sahnewal Khurd',
  district: 'Ludhiana',
  state: 'Punjab',
  landSizeAcres: 12,
  soilType: 'Alluvial Fertile Loam (pH 7.2)',
  irrigationMethod: 'Canal + Solar Micro-Drip',
  kccNumber: 'KCC-PB-489201',
  bankAccount: 'State Bank of India (SBI) •••• 4892',
  ifscCode: 'SBIN0001234',
  upiId: 'ravi.singh@oksbi'
};

export const DEFAULT_BUYER_PROFILE: BuyerProfile = {
  name: 'Priya Sharma',
  companyName: 'FreshRoot Agro Procurements Ltd',
  phone: '+91 98100 12345',
  email: 'priya.sharma@freshroot.in',
  city: 'Delhi',
  state: 'Delhi NCR',
  deliveryAddress: 'Warehouse 4B, Okhla Industrial Area Phase-III, New Delhi',
  businessType: 'Retail Supermarket & Food Processing',
  gstin: '07AAAAA0000A1Z5',
  bankAccount: 'HDFC Bank •••• 8821'
};

const STORAGE_KEY_LISTINGS = 'demand2crop_listings_v3';
const STORAGE_KEY_ORDERS = 'demand2crop_orders_v3';
const STORAGE_KEY_TXS = 'demand2crop_txs_v3';
const STORAGE_KEY_BLOCKS = 'demand2crop_blocks_v3';
const STORAGE_KEY_LANG = 'demand2crop_lang_v2';
const STORAGE_KEY_FARMER_PROFILE = 'demand2crop_farmer_profile_v2';
const STORAGE_KEY_BUYER_PROFILE = 'demand2crop_buyer_profile_v2';

interface AppContextType {
  // Language (English / Hindi)
  lang: FarmerLang;
  setLang: (lang: FarmerLang) => void;

  // Account / Profiles
  farmerProfile: FarmerProfile;
  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;
  buyerProfile: BuyerProfile;
  updateBuyerProfile: (profile: Partial<BuyerProfile>) => void;

  // Navigation & Role
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  buyerCity: string;
  setBuyerCity: (city: string) => void;

  // Data Collections
  listings: HarvestListing[];
  orders: UserOrder[];
  demandPools: DemandPool[];
  darkStores: DarkStoreHub[];
  transactions: LedgerTransaction[];
  blocks: LedgerBlock[];
  farmerReputation: typeof RAVI_SINGH_REPUTATION;

  // Selection state
  selectedListing: HarvestListing | null;
  setSelectedListing: (listing: HarvestListing | null) => void;
  selectedOrder: UserOrder | null;
  setSelectedOrder: (order: UserOrder | null) => void;

  // Guided Demo Walkthrough
  demoStep: number;
  setDemoStep: (step: number) => void;
  isDemoTourActive: boolean;
  setIsDemoTourActive: (active: boolean) => void;
  advanceDemoTour: () => void;

  // Theme mode (Light / Dark)
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Notifications
  toast: ToastState | null;
  showToast: (message: string, type?: ToastState['type']) => void;

  // Actions
  createHarvestListing: (data: Partial<HarvestListing>) => HarvestListing;
  preCommitToHarvest: (
    listingId: string, 
    quantityKg: number, 
    buyerCity: string
  ) => { order: UserOrder; txHash: string; contractId: string };
  advanceOrderStage: (orderId: string, nextStage?: LifecycleStage) => void;
  advanceListingStage: (listingId: string, nextStage: LifecycleStage) => void;
  simulatePartialFulfillment: (listingId: string, actualYieldKg: number) => void;
  contributeToDemandPool: (poolId: string, quantityKg: number, farmerName: string) => void;
  resetDemoData: () => void;

  // Web3 / Blockchain Test Mode (/test)
  isWeb3Mode: boolean;
  setIsWeb3Mode: (val: boolean) => void;
  nodeLogs: NodeLog[];
  addNodeLog: (log: { type: 'rpc' | 'mining' | 'event' | 'info'; message: string }) => void;
  clearNodeLogs: () => void;
  mineTestBlock: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to check if current URL indicates /test route
export const checkIsWeb3Path = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return path.startsWith('/test') || hash.includes('test') || search.includes('test');
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWeb3Mode, setIsWeb3ModeState] = useState<boolean>(() => checkIsWeb3Path());
  const [nodeLogs, setNodeLogs] = useState<NodeLog[]>(INITIAL_NODE_LOGS);

  const setIsWeb3Mode = (val: boolean) => {
    setIsWeb3ModeState(val);
    if (typeof window !== 'undefined') {
      if (val) {
        if (!window.location.pathname.startsWith('/test')) {
          window.history.pushState(null, '', '/test');
        }
      } else {
        if (window.location.pathname.startsWith('/test')) {
          window.history.pushState(null, '', '/');
        }
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setIsWeb3ModeState(checkIsWeb3Path());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const addNodeLog = (log: { type: 'rpc' | 'mining' | 'event' | 'info'; message: string }) => {
    const newEntry: NodeLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: log.type,
      message: log.message
    };
    setNodeLogs((prev) => [...prev, newEntry]);
  };

  const clearNodeLogs = () => {
    setNodeLogs([]);
  };

  const [activeRole, setActiveRoleState] = useState<UserRole>('FARMER');
  const [activeView, setActiveView] = useState<AppView>(() => checkIsWeb3Path() ? 'farmer' : 'landing');
  const [buyerCity, setBuyerCity] = useState<string>('Delhi');

  const [listings, setListings] = useState<HarvestListing[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LISTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_LISTINGS;
  });

  const [orders, setOrders] = useState<UserOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_ORDERS;
  });

  const [demandPools, setDemandPools] = useState<DemandPool[]>(INITIAL_DEMAND_POOLS);
  const [darkStores, setDarkStores] = useState<DarkStoreHub[]>(DARK_STORE_HUBS);

  const [transactions, setTransactions] = useState<LedgerTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TXS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_TRANSACTIONS;
  });

  const [blocks, setBlocks] = useState<LedgerBlock[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BLOCKS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_BLOCKS;
  });

  const [farmerReputation] = useState(RAVI_SINGH_REPUTATION);

  const [selectedListing, setSelectedListing] = useState<HarvestListing | null>(INITIAL_LISTINGS[0]);
  const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(INITIAL_ORDERS[0]);

  // Persist updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(listings));
    } catch (e) {
      console.error(e);
    }
  }, [listings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TXS, JSON.stringify(transactions));
    } catch (e) {
      console.error(e);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BLOCKS, JSON.stringify(blocks));
    } catch (e) {
      console.error(e);
    }
  }, [blocks]);

  // Real-time synchronization across browser tabs (e.g. Farmer in Tab 1, Buyer in Tab 2)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_LISTINGS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setListings(parsed);
        } catch {}
      }
      if (e.key === STORAGE_KEY_ORDERS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setOrders(parsed);
        } catch {}
      }
      if (e.key === STORAGE_KEY_LANG && e.newValue) {
        if (e.newValue === 'en' || e.newValue === 'hi') setLangState(e.newValue as FarmerLang);
      }
      if (e.key === STORAGE_KEY_FARMER_PROFILE && e.newValue) {
        try {
          setFarmerProfile(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === STORAGE_KEY_BUYER_PROFILE && e.newValue) {
        try {
          setBuyerProfile(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Language state (English / Hindi)
  const [lang, setLangState] = useState<FarmerLang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved === 'en' || saved === 'hi') return saved as FarmerLang;
    } catch {}
    return 'en';
  });

  const setLang = (newLang: FarmerLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, newLang);
    } catch {}
  };

  // Farmer & Buyer Profiles
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FARMER_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_FARMER_PROFILE;
  });

  const updateFarmerProfile = (data: Partial<FarmerProfile>) => {
    setFarmerProfile((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(STORAGE_KEY_FARMER_PROFILE, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast(
      lang === 'hi' ? 'किसान खाता व खेत विवरण सफलतापूर्वक सहेजा गया!' : 'Farmer account & farm info updated successfully!',
      'success'
    );
  };

  const [buyerProfile, setBuyerProfile] = useState<BuyerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BUYER_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_BUYER_PROFILE;
  });

  const updateBuyerProfile = (data: Partial<BuyerProfile>) => {
    setBuyerProfile((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(STORAGE_KEY_BUYER_PROFILE, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    if (data.city) {
      setBuyerCity(data.city);
    }
    showToast(
      lang === 'hi' ? 'खरीदार प्रोफ़ाइल व डिलीवरी विवरण सहेजा गया!' : 'Buyer account & delivery profile updated successfully!',
      'success'
    );
  };

  // Guided demo tour
  const [demoStep, setDemoStep] = useState<number>(1);
  const [isDemoTourActive, setIsDemoTourActive] = useState<boolean>(false);

  // Toast notification
  const [toast, setToast] = useState<ToastState | null>(null);

  // Theme mode: false = Light Mode (default requested), true = Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const showToast = (message: string, type: ToastState['type'] = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    if (role === 'FARMER') {
      setActiveView('farmer');
    } else if (role === 'BUYER') {
      setActiveView('marketplace');
    } else if (role === 'ADMIN') {
      setActiveView('admin');
    }
  };

  // 1. Create a future harvest listing (Flow 1)
  const createHarvestListing = (data: Partial<HarvestListing>): HarvestListing => {
    const contractId = generateContractId();
    const contractAddress = generateContractAddress();
    const txHash = generateTxHash('DEPLOY_CONTRACT');
    const newBlockNum = blocks[0].blockNumber + 1;

    const locationInput = (data.farmerLocation || 'Ludhiana').trim();
    const matchedCityKey = Object.keys(INDIAN_CITIES).find((c) =>
      locationInput.toLowerCase().includes(c.toLowerCase())
    );
    const derivedState = matchedCityKey ? INDIAN_CITIES[matchedCityKey].state : (data.farmerState || 'Punjab');
    const derivedCoords: [number, number] = matchedCityKey 
      ? [INDIAN_CITIES[matchedCityKey].lat, INDIAN_CITIES[matchedCityKey].lng] 
      : [30.9010, 75.8573];

    const newListing: HarvestListing = {
      id: `listing-${Date.now()}`,
      contractId,
      contractAddress,
      farmerId: 'farmer-ravi-singh',
      farmerName: farmerProfile.name,
      farmerLocation: locationInput || farmerProfile.district || 'Ludhiana',
      farmerState: derivedState || farmerProfile.state || 'Punjab',
      coordinates: derivedCoords,
      crop: (data.crop as CropType) || 'Wheat',
      variety: data.variety || 'Certified Variety',
      expectedQuantityKg: data.expectedQuantityKg || 1000,
      committedQuantityKg: 0,
      pricePerKg: data.pricePerKg || 10,
      sowingDate: data.sowingDate || new Date().toISOString().split('T')[0],
      expectedHarvestDate: data.expectedHarvestDate || '2026-12-15',
      shelfLife: data.shelfLife || 'Long shelf life (365 days)',
      qualityGrade: data.qualityGrade || 'GRADE_A',
      description: data.description || 'Forward harvest listing with cryptographic escrow backing.',
      assignedDarkStoreId: 'hub-delhi',
      darkStoreName: 'Delhi NCR Distribution Hub',
      stage: 'FARMER_COMMITTED',
      commitmentsCount: 0,
      escrowTotalLocked: 0,
      workingCapitalReleased: 0,
      settlementReleased: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Update listings
    setListings((prev) => [newListing, ...prev]);

    // Record on simulated blockchain
    const newTx: LedgerTransaction = {
      txHash,
      blockNumber: newBlockNum,
      timestamp: new Date().toLocaleString(),
      type: 'CONTRACT_DEPLOYMENT',
      from: '0x3a4b928198f12a6b4129e81b9e28f1b92019481a',
      to: contractAddress,
      contractRef: contractId,
      status: 'CONFIRMED',
      gasUsed: 154200,
      details: `Created Harvest Contract for ${newListing.crop} (${newListing.expectedQuantityKg} kg @ ₹${newListing.pricePerKg}/kg)`
    };

    const newBlock: LedgerBlock = {
      blockNumber: newBlockNum,
      blockHash: generateTxHash('BLOCK'),
      previousHash: blocks[0].blockHash,
      timestamp: new Date().toLocaleString(),
      transactionsCount: 1,
      validator: 'Validator-Node-Punjab-Agri-01',
      nonce: Math.floor(Math.random() * 900000)
    };

    setTransactions((prev) => [newTx, ...prev]);
    setBlocks((prev) => [newBlock, ...prev]);

    addNodeLog({
      type: 'rpc',
      message: `eth_sendRawTransaction: deployHarvestEscrow("${newListing.crop}", ${newListing.expectedQuantityKg}kg, ₹${newListing.pricePerKg}/kg)`
    });
    addNodeLog({
      type: 'mining',
      message: `Block #${newBlockNum} mined with Tx ${txHash.slice(0, 18)}... (Gas Used: 154,200)`
    });
    addNodeLog({
      type: 'event',
      message: `HarvestEscrow.HarvestCreated(contract: ${contractAddress.slice(0, 14)}..., id: "${contractId}")`
    });

    showToast(`🌾 Harvest for ${newListing.crop} listed! Live on Buyer Marketplace.`, 'success');

    return newListing;
  };

  // 2. Buy / Pre-commit flow (Flow 3)
  const preCommitToHarvest = (
    listingId: string,
    quantityKg: number,
    buyerSelectedCity: string
  ) => {
    const listing = listings.find((l) => l.id === listingId);
    if (!listing) throw new Error('Listing not found');

    const feasibility = evaluateLogisticsFeasibility(
      listing.crop,
      listing.farmerLocation,
      buyerSelectedCity,
      quantityKg
    );

    const productCost = quantityKg * listing.pricePerKg;
    const logisticsFee = feasibility.totalLogisticsFee;
    const totalAmount = productCost + logisticsFee;

    const txHash = generateTxHash('ESCROW_DEPOSIT');
    const newBlockNum = blocks[0].blockNumber + 1;

    // Update listing commitments
    setListings((prev) =>
      prev.map((l) => {
        if (l.id === listingId) {
          const newCommitted = Math.min(l.expectedQuantityKg, l.committedQuantityKg + quantityKg);
          return {
            ...l,
            committedQuantityKg: newCommitted,
            commitmentsCount: l.commitmentsCount + 1,
            escrowTotalLocked: l.escrowTotalLocked + totalAmount
          };
        }
        return l;
      })
    );

    // Create user order
    const newOrder: UserOrder = {
      id: `order-${Date.now()}`,
      contractId: listing.contractId,
      contractAddress: listing.contractAddress,
      crop: listing.crop,
      variety: listing.variety,
      quantityKg,
      pricePerKg: listing.pricePerKg,
      logisticsFee,
      totalAmount,
      farmerId: listing.farmerId,
      farmerName: listing.farmerName,
      farmerLocation: `${listing.farmerLocation}, ${listing.farmerState}`,
      buyerId: 'user-primary-buyer',
      buyerName: 'Demo Buyer (You)',
      deliveryAddress: `Sector 62 / Central Hub, ${buyerSelectedCity}`,
      deliveryCity: buyerSelectedCity,
      destinationHubId: feasibility.recommendedHub.id,
      destinationHubName: feasibility.recommendedHub.name,
      expectedHarvestDate: listing.expectedHarvestDate,
      estimatedDeliveryDate: listing.expectedHarvestDate,
      status: 'DEMAND_POSTED',
      escrowTxHash: txHash,
      currentLocationNote: `Pre-commitment registered. Cultivation escrow locked for ${listing.farmerName}`,
      orderDate: new Date().toISOString().split('T')[0],
      trackingUpdates: [
        {
          stage: 'DEMAND_POSTED',
          title: 'Demand Committed & Escrow Locked',
          description: `Buyer pre-committed to ${quantityKg} kg. ₹${totalAmount.toLocaleString()} locked in HarvestEscrow Smart Contract.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          txHash,
          passed: true
        },
        {
          stage: 'FARMER_COMMITTED',
          title: 'Farmer Cultivation Scheduled',
          description: `${listing.farmerName} locked sowing schedule against your pre-order.`,
          timestamp: 'Scheduled',
          passed: false
        },
        {
          stage: 'CULTIVATION',
          title: 'Direct Sowing & Sprouting',
          description: 'Seeds sown. 30% upfront working capital unlocked for farmer.',
          timestamp: 'Pending sowing',
          passed: false
        },
        {
          stage: 'GROWING',
          title: 'Active Crop Monitoring',
          description: 'Vegetative growth verified by satellite and drone telemetry.',
          timestamp: 'Pending',
          passed: false
        },
        {
          stage: 'HARVESTED',
          title: 'Harvesting Completed',
          description: 'Fresh crop harvested at farm gate.',
          timestamp: 'Pending',
          passed: false
        },
        {
          stage: 'QUALITY_VERIFIED',
          title: 'Quality Verification & Grading',
          description: 'Inspected and certified Grade-A on-chain.',
          timestamp: 'Pending',
          passed: false
        },
        {
          stage: 'IN_TRANSIT',
          title: `Dispatched to ${feasibility.recommendedHub.name}`,
          description: 'Loaded onto climate-controlled transit freight.',
          timestamp: 'Pending',
          passed: false
        },
        {
          stage: 'AT_DARK_STORE',
          title: `Arrived at ${feasibility.recommendedHub.city} Dark Store`,
          description: 'Produce sorted into local fulfillment bay.',
          timestamp: 'Pending',
          passed: false
        },
        {
          stage: 'OUT_FOR_DELIVERY',
          title: 'Out for Local Delivery',
          description: 'Dispatched for last-mile delivery to your address.',
          timestamp: 'Pending',
          passed: false
        },
        {
          stage: 'DELIVERED',
          title: 'Delivered & Contract Settled',
          description: 'Delivery confirmed. Smart contract releases escrow payment to farmer.',
          timestamp: 'Pending',
          passed: false
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setSelectedOrder(newOrder);

    // Record on blockchain
    const newTx: LedgerTransaction = {
      txHash,
      blockNumber: newBlockNum,
      timestamp: new Date().toLocaleString(),
      type: 'BUYER_COMMITMENT_ESCROW',
      from: '0x71a481b92019481a3a4b928198f12a6b4129e81b',
      to: listing.contractAddress,
      amountInr: totalAmount,
      contractRef: listing.contractId,
      status: 'CONFIRMED',
      gasUsed: 89400,
      details: `Pre-committed ${quantityKg} kg ${listing.crop} (₹${productCost} + ₹${logisticsFee} logistics) via ${listing.contractId}`
    };

    const newBlock: LedgerBlock = {
      blockNumber: newBlockNum,
      blockHash: generateTxHash('BLOCK'),
      previousHash: blocks[0].blockHash,
      timestamp: new Date().toLocaleString(),
      transactionsCount: 1,
      validator: 'Validator-Node-Delhi-Hub-02',
      nonce: Math.floor(Math.random() * 900000)
    };

    setTransactions((prev) => [newTx, ...prev]);
    setBlocks((prev) => [newBlock, ...prev]);

    addNodeLog({
      type: 'rpc',
      message: `eth_sendRawTransaction: lockEscrowDeposit("${listing.contractId}", ${quantityKg}kg, ₹${totalAmount})`
    });
    addNodeLog({
      type: 'mining',
      message: `Block #${newBlockNum} mined with Tx ${txHash.slice(0, 18)}... (Gas Used: 89,400)`
    });
    addNodeLog({
      type: 'event',
      message: `HarvestEscrow.BuyerPreCommitted(buyer: 0x71a481..., escrowLocked: ₹${totalAmount.toLocaleString()})`
    });

    return { order: newOrder, txHash, contractId: listing.contractId };
  };

  // 3. Advance Order lifecycle stage (Flow 4 & 6)
  const advanceOrderStage = (orderId: string, nextStage?: LifecycleStage) => {
    const stageSequence: LifecycleStage[] = [
      'DEMAND_POSTED',
      'FARMER_COMMITTED',
      'CULTIVATION',
      'GROWING',
      'HARVESTED',
      'QUALITY_VERIFIED',
      'IN_TRANSIT',
      'AT_DARK_STORE',
      'OUT_FOR_DELIVERY',
      'DELIVERED',
      'SETTLED'
    ];

    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id !== orderId) return order;

        const currentIndex = stageSequence.indexOf(order.status);
        const resolvedNextStage = nextStage || stageSequence[Math.min(currentIndex + 1, stageSequence.length - 1)];

        // Update tracking updates list
        const updatedTracking = order.trackingUpdates.map((step) => {
          const stepIndex = stageSequence.indexOf(step.stage);
          const nextIndex = stageSequence.indexOf(resolvedNextStage);
          if (stepIndex <= nextIndex) {
            return {
              ...step,
              passed: true,
              timestamp: step.timestamp.includes('Pending') || step.timestamp.includes('Scheduled') 
                ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : step.timestamp
            };
          }
          return step;
        });

        // Current location notes
        let locationNote = order.currentLocationNote;
        if (resolvedNextStage === 'AT_DARK_STORE') {
          locationNote = `Your ${order.crop} is currently at ${order.destinationHubName} (Silo / Bin #04).`;
        } else if (resolvedNextStage === 'OUT_FOR_DELIVERY') {
          locationNote = `Out for local delivery in ${order.deliveryCity} via electric logistics van.`;
        } else if (resolvedNextStage === 'DELIVERED' || resolvedNextStage === 'SETTLED') {
          locationNote = `Delivered! Smart contract verified recipient confirmation. Escrow settled.`;
        } else if (resolvedNextStage === 'HARVESTED') {
          locationNote = `Harvested at ${order.farmerLocation}. Undergoing grade quality inspection.`;
        } else if (resolvedNextStage === 'IN_TRANSIT') {
          locationNote = `In transit along cold-chain corridor to ${order.destinationHubName}.`;
        }

        // If arrived at dark store, update Dark Store inventory (Flow 6)
        if (resolvedNextStage === 'AT_DARK_STORE' && order.status !== 'AT_DARK_STORE') {
          setDarkStores((prevHubs) =>
            prevHubs.map((hub) => {
              if (hub.id === order.destinationHubId) {
                const existing = hub.inventory.find((inv) => inv.crop === order.crop && inv.farmerName === order.farmerName);
                if (existing) {
                  return {
                    ...hub,
                    inventory: hub.inventory.map((inv) =>
                      inv === existing ? { ...inv, quantityKg: inv.quantityKg + order.quantityKg } : inv
                    )
                  };
                } else {
                  return {
                    ...hub,
                    inventory: [
                      {
                        crop: order.crop,
                        quantityKg: order.quantityKg,
                        farmerName: order.farmerName,
                        arrivedAt: new Date().toISOString().split('T')[0],
                        qualityGrade: 'GRADE_A'
                      },
                      ...hub.inventory
                    ]
                  };
                }
              }
              return hub;
            })
          );
        }

        // If delivered or settled, fire celebration and record settlement tx (Flow 4, 8)
        if (resolvedNextStage === 'DELIVERED' || resolvedNextStage === 'SETTLED') {
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {
            // Safe fallback
          }

          const txHash = generateTxHash('ESCROW_SETTLEMENT');
          const newBlockNum = blocks[0].blockNumber + 1;
          const settlementTx: LedgerTransaction = {
            txHash,
            blockNumber: newBlockNum,
            timestamp: new Date().toLocaleString(),
            type: 'ESCROW_SETTLEMENT_RELEASE',
            from: order.contractAddress,
            to: '0x3a4b928198f12a6b4129e81b9e28f1b92019481a',
            amountInr: order.totalAmount,
            contractRef: order.contractId,
            status: 'CONFIRMED',
            gasUsed: 92400,
            details: `Released escrow settlement of ₹${order.totalAmount.toLocaleString()} to ${order.farmerName} upon delivery confirmation`
          };
          setTransactions((prev) => [settlementTx, ...prev]);
        }

        return {
          ...order,
          status: resolvedNextStage,
          currentLocationNote: locationNote,
          trackingUpdates: updatedTracking
        };
      })
    );

    // Keep selectedOrder in sync
    setSelectedOrder((prev) => {
      if (!prev || prev.id !== orderId) return prev;
      const updated = orders.find((o) => o.id === orderId);
      return updated || prev;
    });

    showToast(`Order status updated to ${nextStage || 'next stage'}`, 'info');
  };

  // 4. Advance Farmer's Harvest Listing stage
  const advanceListingStage = (listingId: string, nextStage: LifecycleStage) => {
    setListings((prev) =>
      prev.map((l) => (l.id === listingId ? { ...l, stage: nextStage } : l))
    );
    const txHash = generateTxHash('STAGE_TRANSITION');
    const newTx: LedgerTransaction = {
      txHash,
      blockNumber: blocks[0].blockNumber + 1,
      timestamp: new Date().toLocaleString(),
      type: 'STAGE_TRANSITION',
      from: '0x3a4b928198f12a6b4129e81b9e28f1b92019481a',
      to: '0x88912e7bb014389012a6cb82e99f018349071241',
      contractRef: '#HC-48291',
      status: 'CONFIRMED',
      gasUsed: 48000,
      details: `Advanced contract state to ${nextStage}`
    };
    setTransactions((prev) => [newTx, ...prev]);

    addNodeLog({
      type: 'rpc',
      message: `eth_sendRawTransaction: advanceListingStage("${listingId}", "${nextStage}")`
    });
    addNodeLog({
      type: 'mining',
      message: `Block #${blocks[0].blockNumber + 1} mined (Tx: ${txHash.slice(0, 18)}... Gas: 48,000)`
    });
    addNodeLog({
      type: 'event',
      message: `Event: HarvestEscrow.StageAdvanced(stage: "${nextStage}")`
    });

    showToast(`Harvest stage updated to: ${nextStage}`, 'info');
  };

  // 5. Partial Fulfillment Simulator (Flow 9)
  const simulatePartialFulfillment = (listingId: string, actualYieldKg: number) => {
    const listing = listings.find((l) => l.id === listingId);
    if (!listing) return;

    const expectedKg = listing.expectedQuantityKg;
    const shortfallKg = Math.max(0, expectedKg - actualYieldKg);
    const fulfillmentRatio = Math.min(1, actualYieldKg / expectedKg);

    const totalEscrow = listing.escrowTotalLocked;
    const releasedToFarmer = Math.round(totalEscrow * fulfillmentRatio);
    const refundedToBuyers = totalEscrow - releasedToFarmer;

    setListings((prev) =>
      prev.map((l) => {
        if (l.id === listingId) {
          return {
            ...l,
            isPartialFulfillmentSimulated: true,
            actualYieldKg,
            unfulfilledQuantityKg: shortfallKg,
            settlementReleased: releasedToFarmer,
            refundedAmountTotal: refundedToBuyers,
            stage: 'SETTLED'
          };
        }
        return l;
      })
    );

    // Update any related orders to reflect partial fulfillment
    setOrders((prev) =>
      prev.map((o) => {
        if (o.contractId === listing.contractId) {
          const buyerFulfilledKg = Math.round(o.quantityKg * fulfillmentRatio);
          const refundAmt = Math.round(o.totalAmount * (1 - fulfillmentRatio));
          return {
            ...o,
            isPartialSettled: true,
            fulfilledQuantityKg: buyerFulfilledKg,
            refundAmount: refundAmt,
            status: 'SETTLED',
            currentLocationNote: `Partial Settlement: ${buyerFulfilledKg} kg delivered, ₹${refundAmt} refunded to your escrow wallet.`
          };
        }
        return o;
      })
    );

    const txHash = generateTxHash('PARTIAL_SETTLEMENT');
    const newTx: LedgerTransaction = {
      txHash,
      blockNumber: blocks[0].blockNumber + 1,
      timestamp: new Date().toLocaleString(),
      type: 'PARTIAL_FULFILLMENT_SETTLED',
      from: listing.contractAddress,
      to: '0x3a4b928198f12a6b4129e81b9e28f1b92019481a',
      amountInr: releasedToFarmer,
      contractRef: listing.contractId,
      status: 'CONFIRMED',
      gasUsed: 98500,
      details: `Partial Harvest Settlement: ${actualYieldKg}/${expectedKg} kg fulfilled. Released ₹${releasedToFarmer.toLocaleString()} to farmer, refunded ₹${refundedToBuyers.toLocaleString()} to buyers.`
    };

    setTransactions((prev) => [newTx, ...prev]);
    showToast(
      `Partial fulfillment executed! ₹${releasedToFarmer} paid to farmer, ₹${refundedToBuyers} refunded to buyers.`,
      'warning'
    );
  };

  // 6. Contribute to Demand Pool
  const contributeToDemandPool = (poolId: string, quantityKg: number, farmerName: string) => {
    setDemandPools((prev) =>
      prev.map((pool) => {
        if (pool.id === poolId) {
          const newCommitted = pool.currentCommittedKg + quantityKg;
          return {
            ...pool,
            currentCommittedKg: newCommitted,
            status: newCommitted >= pool.totalRequiredKg ? 'FULLY_COMMITTED' : 'PARTIALLY_COMMITTED',
            contributions: [
              {
                farmerId: 'farmer-ravi-singh',
                farmerName,
                location: 'Ludhiana, Punjab',
                quantityKg,
                allocatedAt: new Date().toISOString().split('T')[0],
                status: 'ACCEPTED',
                txHash: generateTxHash('POOL_PLEDGE')
              },
              ...pool.contributions
            ]
          };
        }
        return pool;
      })
    );

    const txHash = generateTxHash('DEMAND_POOL_ALLOCATION');
    const newTx: LedgerTransaction = {
      txHash,
      blockNumber: blocks[0].blockNumber + 1,
      timestamp: new Date().toLocaleString(),
      type: 'DEMAND_POOL_ALLOCATION',
      from: '0x3a4b928198f12a6b4129e81b9e28f1b92019481a',
      to: '0x88992019481a3a4b928198f12a6b4129e81b9e28',
      contractRef: poolId,
      status: 'CONFIRMED',
      gasUsed: 62000,
      details: `${farmerName} pledged ${quantityKg.toLocaleString()} kg to institutional demand pool`
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Pledged ${quantityKg.toLocaleString()} kg to Demand Pool!`, 'success');
  };

  // 7. Reset demo data
  const resetDemoData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_LISTINGS);
      localStorage.removeItem(STORAGE_KEY_ORDERS);
      localStorage.removeItem(STORAGE_KEY_TXS);
      localStorage.removeItem(STORAGE_KEY_BLOCKS);
      localStorage.removeItem(STORAGE_KEY_FARMER_PROFILE);
      localStorage.removeItem(STORAGE_KEY_BUYER_PROFILE);
    } catch {}
    setListings(INITIAL_LISTINGS);
    setOrders(INITIAL_ORDERS);
    setDemandPools(INITIAL_DEMAND_POOLS);
    setDarkStores(DARK_STORE_HUBS);
    setTransactions(INITIAL_TRANSACTIONS);
    setBlocks(INITIAL_BLOCKS);
    setFarmerProfile(DEFAULT_FARMER_PROFILE);
    setBuyerProfile(DEFAULT_BUYER_PROFILE);
    setDemoStep(1);
    showToast('Platform data reset to benchmark initial state!', 'info');
  };

  const advanceDemoTour = () => {
    setDemoStep((prev) => (prev >= 10 ? 1 : prev + 1));
  };

  const mineTestBlock = () => {
    const newBlockNum = (blocks[0]?.blockNumber || 104293) + 1;
    const txHash = generateTxHash('CONSENSUS_STAMP');
    const newTx: LedgerTransaction = {
      txHash,
      blockNumber: newBlockNum,
      timestamp: new Date().toLocaleString(),
      type: 'STAGE_TRANSITION',
      from: '0x3a4b928198f12a6b4129e81b9e28f1b92019481a',
      to: '0x88912e7bb014389012a6cb82e99f018349071241',
      contractRef: '#HC-48291',
      status: 'CONFIRMED',
      gasUsed: 38200,
      details: `Oracle Consensus Stamp verified by 12 multi-sig validator nodes`
    };

    const newBlock: LedgerBlock = {
      blockNumber: newBlockNum,
      blockHash: generateTxHash('BLOCK'),
      previousHash: blocks[0]?.blockHash || '0x0000a891f732489a012c8b74910283f9812acb92014890281b9e812a6b41298f',
      timestamp: new Date().toLocaleString(),
      transactionsCount: 1,
      validator: 'Validator-Node-Amoy-PoS-01',
      nonce: Math.floor(Math.random() * 900000)
    };

    setTransactions((prev) => [newTx, ...prev]);
    setBlocks((prev) => [newBlock, ...prev]);

    addNodeLog({
      type: 'mining',
      message: `Block #${newBlockNum} mined by Validator-Node-Amoy-PoS-01 (Hash: ${newBlock.blockHash.slice(0, 18)}...)`
    });

    showToast(`⚡ Block #${newBlockNum} mined on Polygon Amoy!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        farmerProfile,
        updateFarmerProfile,
        buyerProfile,
        updateBuyerProfile,
        activeRole,
        setActiveRole,
        activeView,
        setActiveView,
        buyerCity,
        setBuyerCity,
        listings,
        orders,
        demandPools,
        darkStores,
        transactions,
        blocks,
        farmerReputation,
        selectedListing,
        setSelectedListing,
        selectedOrder,
        setSelectedOrder,
        demoStep,
        setDemoStep,
        isDemoTourActive,
        setIsDemoTourActive,
        advanceDemoTour,
        isDarkMode,
        toggleDarkMode,
        toast,
        showToast,
        createHarvestListing,
        preCommitToHarvest,
        advanceOrderStage,
        advanceListingStage,
        simulatePartialFulfillment,
        contributeToDemandPool,
        resetDemoData,
        isWeb3Mode,
        setIsWeb3Mode,
        nodeLogs,
        addNodeLog,
        clearNodeLogs,
        mineTestBlock
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
