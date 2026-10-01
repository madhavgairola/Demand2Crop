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

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

const STORAGE_KEY_LISTINGS = 'demand2crop_listings_v3';
const STORAGE_KEY_ORDERS = 'demand2crop_orders_v3';
const STORAGE_KEY_TXS = 'demand2crop_txs_v3';
const STORAGE_KEY_BLOCKS = 'demand2crop_blocks_v3';

interface AppContextType {
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRoleState] = useState<UserRole>('FARMER');
  const [activeView, setActiveView] = useState<AppView>('landing');
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
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
      farmerName: 'Ravi Singh',
      farmerLocation: locationInput,
      farmerState: derivedState,
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
    } catch {}
    setListings(INITIAL_LISTINGS);
    setOrders(INITIAL_ORDERS);
    setDemandPools(INITIAL_DEMAND_POOLS);
    setDarkStores(DARK_STORE_HUBS);
    setTransactions(INITIAL_TRANSACTIONS);
    setBlocks(INITIAL_BLOCKS);
    setDemoStep(1);
    showToast('Platform data reset to benchmark initial state!', 'info');
  };

  const advanceDemoTour = () => {
    setDemoStep((prev) => (prev >= 10 ? 1 : prev + 1));
  };

  return (
    <AppContext.Provider
      value={{
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
        resetDemoData
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
