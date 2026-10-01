export type CropType = 
  | 'Wheat' 
  | 'Tomatoes' 
  | 'Potatoes' 
  | 'Basmati Rice' 
  | 'Apples' 
  | 'Strawberries' 
  | 'Onions' 
  | 'Mustard Seed'
  | 'Cotton'
  | 'Green Chillies'
  | 'Soybean'
  | 'Pulses (Arhar)';

export type CropPerishability = 'Highly Perishable' | 'Perishable' | 'Semi-Perishable' | 'Durable (Non-Perishable)';

export interface CropMetadata {
  name: CropType;
  variety: string;
  shelfLifeDays: number;
  perishability: CropPerishability;
  requiresColdChain: boolean;
  idealTempCelsius: string;
  maxLogisticsRadiusKm: number;
  baseLogisticsRatePerKmKg: number;
  standardYieldUnit: string;
  icon: string;
  defaultPricePerKg: number;
  description: string;
}

export type LifecycleStage = 
  | 'DEMAND_POSTED'
  | 'FARMER_COMMITTED'
  | 'CULTIVATION'
  | 'GROWING'
  | 'HARVEST_READY'
  | 'HARVESTED'
  | 'QUALITY_VERIFIED'
  | 'IN_TRANSIT'
  | 'AT_DARK_STORE'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'SETTLED';

export type QualityGrade = 'PENDING' | 'GRADE_A' | 'GRADE_B' | 'GRADE_C' | 'REJECTED';

export interface BuyerCommitment {
  id: string;
  contractId: string;
  buyerId: string;
  buyerName: string;
  buyerType: 'Consumer' | 'Restaurant' | 'Institutional Buyer';
  quantityKg: number;
  pricePerKg: number;
  logisticsFee: number;
  totalEscrowAmount: number;
  deliveryCity: string;
  targetHubId: string;
  escrowTxHash: string;
  committedAt: string;
  fulfillmentStatus: 'LOCKED' | 'PARTIALLY_FULFILLED' | 'FULFILLED' | 'REFUNDED';
  refundedAmount?: number;
}

export interface HarvestListing {
  id: string;
  contractId: string;
  contractAddress: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string; // e.g. "Ludhiana, Punjab"
  farmerState: string;
  coordinates: [number, number]; // [lat, lng]
  crop: CropType;
  variety: string;
  expectedQuantityKg: number;
  committedQuantityKg: number;
  pricePerKg: number;
  sowingDate: string;
  expectedHarvestDate: string;
  actualHarvestDate?: string;
  actualYieldKg?: number;
  shelfLife: string;
  qualityGrade: QualityGrade;
  description: string;
  assignedDarkStoreId: string;
  darkStoreName: string;
  stage: LifecycleStage;
  commitmentsCount: number;
  escrowTotalLocked: number;
  workingCapitalReleased: number;
  settlementReleased: number;
  isPartialFulfillmentSimulated?: boolean;
  unfulfilledQuantityKg?: number;
  refundedAmountTotal?: number;
  createdAt: string;
}

export interface UserOrder {
  id: string;
  contractId: string;
  contractAddress: string;
  crop: CropType;
  variety: string;
  quantityKg: number;
  pricePerKg: number;
  logisticsFee: number;
  totalAmount: number;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  buyerId: string;
  buyerName: string;
  deliveryAddress: string;
  deliveryCity: string;
  destinationHubId: string;
  destinationHubName: string;
  expectedHarvestDate: string;
  estimatedDeliveryDate: string;
  status: LifecycleStage;
  escrowTxHash: string;
  currentLocationNote: string;
  trackingUpdates: {
    stage: LifecycleStage;
    title: string;
    description: string;
    timestamp: string;
    txHash?: string;
    passed: boolean;
  }[];
  orderDate: string;
  isPartialSettled?: boolean;
  fulfilledQuantityKg?: number;
  refundAmount?: number;
}

export interface DarkStoreHub {
  id: string;
  name: string;
  city: string;
  state: string;
  coordinates: [number, number];
  coldStorageCapacityTons: number;
  coldStorageUsedTons: number;
  dryStorageCapacityTons: number;
  dryStorageUsedTons: number;
  activeShipments: number;
  outgoingOrders: number;
  managerName: string;
  inventory: {
    crop: CropType;
    quantityKg: number;
    farmerName: string;
    arrivedAt: string;
    qualityGrade: QualityGrade;
  }[];
}

export interface DemandPoolContribution {
  farmerId: string;
  farmerName: string;
  location: string;
  quantityKg: number;
  allocatedAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'FULFILLED';
  txHash: string;
}

export interface DemandPool {
  id: string;
  poolAddress: string;
  buyerName: string;
  buyerType: 'Restaurant Chain' | 'Food Processor' | 'Retail Conglomerate';
  crop: CropType;
  variety: string;
  totalRequiredKg: number;
  currentCommittedKg: number;
  targetPricePerKg: number;
  requiredDeliveryDate: string;
  targetHubCity: string;
  status: 'OPEN' | 'PARTIALLY_COMMITTED' | 'FULLY_COMMITTED' | 'FULFILLED';
  contributions: DemandPoolContribution[];
  description: string;
  escrowTotalLocked: number;
  createdAt: string;
}

export interface FarmerReputation {
  farmerId: string;
  farmerName: string;
  location: string;
  reputationScore: number;
  completedContracts: number;
  fulfillmentRatePct: number;
  onTimeDeliveryRatePct: number;
  qualityVerificationPct: number;
  disputeCount: number;
  badges: string[];
  onChainTokenId: string;
}

export interface LedgerTransaction {
  txHash: string;
  blockNumber: number;
  timestamp: string;
  type: 
    | 'CONTRACT_DEPLOYMENT'
    | 'BUYER_COMMITMENT_ESCROW'
    | 'STAGE_TRANSITION'
    | 'QUALITY_CERTIFIED'
    | 'DARK_STORE_INBOUND'
    | 'PARTIAL_FULFILLMENT_SETTLED'
    | 'ESCROW_SETTLEMENT_RELEASE'
    | 'DEMAND_POOL_CREATED'
    | 'DEMAND_POOL_ALLOCATION';
  from: string;
  to: string;
  amountInr?: number;
  contractRef: string;
  status: 'CONFIRMED' | 'PENDING' | 'FAILED';
  gasUsed: number;
  details: string;
}

export interface LedgerBlock {
  blockNumber: number;
  blockHash: string;
  previousHash: string;
  timestamp: string;
  transactionsCount: number;
  validator: string;
  nonce: number;
}

export type UserRole = 'FARMER' | 'BUYER' | 'ADMIN';
export type AppView = 
  | 'landing'
  | 'farmer' 
  | 'marketplace' 
  | 'orders' 
  | 'logistics' 
  | 'darkstores' 
  | 'demand' 
  | 'contract' 
  | 'admin'
  | 'blockchain'
  | 'account';
