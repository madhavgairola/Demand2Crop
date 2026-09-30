import { LedgerBlock, LedgerTransaction } from '../types';

// Simple deterministic hash generator for realistic blockchain hashes
function pseudoHash(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const rand = Math.random().toString(16).substring(2, 10);
  const time = Date.now().toString(16);
  return `0x${hex}${rand}${time}`.padEnd(66, 'e').substring(0, 66);
}

export function generateContractAddress(): string {
  const chars = '0123456789abcdef';
  let addr = '0x';
  for (let i = 0; i < 40; i++) {
    addr += chars[Math.floor(Math.random() * chars.length)];
  }
  return addr;
}

export function generateTxHash(action: string): string {
  return pseudoHash(`${action}-${Date.now()}-${Math.random()}`);
}

export function generateContractId(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `#HC-${num}`;
}

// Initial realistic blockchain ledger state
export const INITIAL_TRANSACTIONS: LedgerTransaction[] = [
  {
    txHash: '0x4f8a912e7bb014389012a6cb82e99f0183490712a4b87c53d0e91428bf0a6532',
    blockNumber: 104289,
    timestamp: '2026-09-28 09:14:22',
    type: 'CONTRACT_DEPLOYMENT',
    from: '0x3a4b928198f12a6b4129e81b9e28f1b92019481a',
    to: '0x88912e7bb014389012a6cb82e99f018349071241',
    contractRef: '#HC-48291',
    status: 'CONFIRMED',
    gasUsed: 142890,
    details: 'Deployed HarvestEscrow for Ravi Singh (Wheat 1,000 kg @ ₹10/kg)'
  },
  {
    txHash: '0x8b22a0149021a8bf929104f9812acb92014890281b9e812a6b41298f01834907',
    blockNumber: 104290,
    timestamp: '2026-09-28 11:32:05',
    type: 'BUYER_COMMITMENT_ESCROW',
    from: '0x71a481b92019481a3a4b928198f12a6b4129e81b',
    to: '0x88912e7bb014389012a6cb82e99f018349071241',
    amountInr: 3250,
    contractRef: '#HC-48291',
    status: 'CONFIRMED',
    gasUsed: 88400,
    details: 'Buyer Commitment: 300 kg pre-purchased by Grand Horizon Restaurant (₹3,000 + ₹250 logistics)'
  },
  {
    txHash: '0x1c940128bf0a65324f8a912e7bb014389012a6cb82e99f0183490712a4b87c53',
    blockNumber: 104291,
    timestamp: '2026-09-28 14:05:40',
    type: 'BUYER_COMMITMENT_ESCROW',
    from: '0x992019481a3a4b928198f12a6b4129e81b71a481',
    to: '0x88912e7bb014389012a6cb82e99f018349071241',
    amountInr: 2160,
    contractRef: '#HC-48291',
    status: 'CONFIRMED',
    gasUsed: 84200,
    details: 'Buyer Commitment: 200 kg pre-purchased by Sunita Verma (₹2,000 + ₹160 logistics)'
  },
  {
    txHash: '0x6d8f018349078b22a0149021a8bf929104f9812acb92014890281b9e812a6b41',
    blockNumber: 104292,
    timestamp: '2026-09-29 08:44:11',
    type: 'BUYER_COMMITMENT_ESCROW',
    from: '0x4429e81b71a481b92019481a3a4b928198f12a6b',
    to: '0x88912e7bb014389012a6cb82e99f018349071241',
    amountInr: 1620,
    contractRef: '#HC-48291',
    status: 'CONFIRMED',
    gasUsed: 84150,
    details: 'Buyer Commitment: 150 kg pre-purchased by Amit Sharma (₹1,500 + ₹120 logistics)'
  },
  {
    txHash: '0x5e99f0183490712a4b87c53d0e91428bf0a65324f8a912e7bb014389012a6cb8',
    blockNumber: 104293,
    timestamp: '2026-09-29 16:20:00',
    type: 'STAGE_TRANSITION',
    from: '0x3a4b928198f12a6b4129e81b9e28f1b92019481a',
    to: '0x88912e7bb014389012a6cb82e99f018349071241',
    contractRef: '#HC-48291',
    status: 'CONFIRMED',
    gasUsed: 52000,
    details: 'Lifecycle Update: Sowing & Cultivation Verified (Stage 3/10)'
  }
];

export const INITIAL_BLOCKS: LedgerBlock[] = [
  {
    blockNumber: 104293,
    blockHash: '0x0000a891f732489a012c8b74910283f9812acb92014890281b9e812a6b41298f',
    previousHash: '0x00003b4129e81b92019481a3a4b928198f12a6b4129e81b9e28f1b92019481a',
    timestamp: '2026-09-29 16:20:00',
    transactionsCount: 1,
    validator: 'Validator-Node-Punjab-Agri-01',
    nonce: 491028
  },
  {
    blockNumber: 104292,
    blockHash: '0x00003b4129e81b92019481a3a4b928198f12a6b4129e81b9e28f1b92019481a',
    previousHash: '0x0000928f1b92019481a3a4b928198f12a6b4129e81b9e28f1b92019481a14890',
    timestamp: '2026-09-29 08:44:11',
    transactionsCount: 1,
    validator: 'Validator-Node-Delhi-Hub-02',
    nonce: 812904
  },
  {
    blockNumber: 104291,
    blockHash: '0x0000928f1b92019481a3a4b928198f12a6b4129e81b9e28f1b92019481a14890',
    previousHash: '0x00001428bf0a65324f8a912e7bb014389012a6cb82e99f0183490712a4b87c53',
    timestamp: '2026-09-28 14:05:40',
    transactionsCount: 1,
    validator: 'Validator-Node-Haryana-NABARD-01',
    nonce: 194812
  },
  {
    blockNumber: 104290,
    blockHash: '0x00001428bf0a65324f8a912e7bb014389012a6cb82e99f0183490712a4b87c53',
    previousHash: '0x00007c53d0e91428bf0a65324f8a912e7bb014389012a6cb82e99f0183490712',
    timestamp: '2026-09-28 11:32:05',
    transactionsCount: 1,
    validator: 'Validator-Node-Maharashtra-Agri-03',
    nonce: 729104
  }
];

// Reference Solidity Smart Contract code for the HarvestEscrow
export const SOLIDITY_HARVEST_ESCROW_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HarvestEscrow
 * @notice Demand-driven forward agricultural pre-purchase escrow protocol.
 * Facilitates buyer pre-commitments, working capital release, partial fulfillment settling,
 * and dark-store oracle fulfillment verification.
 */
contract HarvestEscrow {
    enum Stage {
        DEMAND_POSTED,
        FARMER_COMMITTED,
        CULTIVATION,
        GROWING,
        HARVESTED,
        QUALITY_VERIFIED,
        IN_TRANSIT,
        AT_DARK_STORE,
        OUT_FOR_DELIVERY,
        DELIVERED,
        SETTLED
    }

    struct Commitment {
        address buyer;
        uint256 quantityKg;
        uint256 totalAmountWei;
        bool refunded;
        bool fulfilled;
    }

    address public immutable farmer;
    address public darkStoreOracle;
    string public cropName;
    uint256 public expectedYieldKg;
    uint256 public committedYieldKg;
    uint256 public pricePerKgWei;
    uint256 public harvestDeadline;
    
    Stage public currentStage;
    uint256 public actualHarvestYieldKg;
    uint256 public totalEscrowLocked;

    Commitment[] public commitments;
    mapping(address => uint256) public buyerCommitmentIndex;

    event HarvestCreated(address indexed farmer, uint256 expectedYieldKg, uint256 pricePerKg);
    event BuyerPreCommitted(address indexed buyer, uint256 quantityKg, uint256 amountLocked);
    event StageAdvanced(Stage indexed previousStage, Stage indexed newStage);
    event PartialSettlementExecuted(uint256 expectedKg, uint256 actualKg, uint256 refundPool);
    event FundsReleased(address indexed recipient, uint256 amount);

    modifier onlyFarmer() {
        require(msg.sender == farmer, "Only farmer");
        _;
    }

    modifier onlyOracle() {
        require(msg.sender == darkStoreOracle, "Only dark store inspector");
        _;
    }

    constructor(
        address _farmer,
        address _darkStoreOracle,
        string memory _cropName,
        uint256 _expectedYieldKg,
        uint256 _pricePerKgWei,
        uint256 _harvestDeadline
    ) {
        farmer = _farmer;
        darkStoreOracle = _darkStoreOracle;
        cropName = _cropName;
        expectedYieldKg = _expectedYieldKg;
        pricePerKgWei = _pricePerKgWei;
        harvestDeadline = _harvestDeadline;
        currentStage = Stage.FARMER_COMMITTED;
        emit HarvestCreated(_farmer, _expectedYieldKg, _pricePerKgWei);
    }

    function preCommit(uint256 _quantityKg) external payable {
        require(currentStage <= Stage.CULTIVATION, "Commitment window closed");
        require(committedYieldKg + _quantityKg <= expectedYieldKg, "Exceeds target yield");
        uint256 requiredPayment = _quantityKg * pricePerKgWei;
        require(msg.value >= requiredPayment, "Insufficient escrow deposit");

        commitments.push(Commitment({
            buyer: msg.sender,
            quantityKg: _quantityKg,
            totalAmountWei: msg.value,
            refunded: false,
            fulfilled: false
        }));

        committedYieldKg += _quantityKg;
        totalEscrowLocked += msg.value;
        emit BuyerPreCommitted(msg.sender, _quantityKg, msg.value);
    }

    function advanceToCultivation() external onlyFarmer {
        require(currentStage == Stage.FARMER_COMMITTED, "Invalid state transition");
        currentStage = Stage.CULTIVATION;
        emit StageAdvanced(Stage.FARMER_COMMITTED, Stage.CULTIVATION);
    }

    function recordHarvest(uint256 _actualYieldKg) external onlyFarmer {
        require(currentStage == Stage.GROWING, "Not in growing stage");
        actualHarvestYieldKg = _actualYieldKg;
        currentStage = Stage.HARVESTED;
        emit StageAdvanced(Stage.GROWING, Stage.HARVESTED);
    }

    function verifyQualityAndInbound(uint8 _grade) external onlyOracle {
        require(currentStage == Stage.HARVESTED || currentStage == Stage.IN_TRANSIT, "Invalid stage");
        require(_grade >= 1, "Grade rejected");
        currentStage = Stage.AT_DARK_STORE;
        emit StageAdvanced(currentStage, Stage.AT_DARK_STORE);
    }

    function executeDeliveryAndSettlement() external onlyOracle {
        require(currentStage == Stage.OUT_FOR_DELIVERY, "Not out for delivery");
        currentStage = Stage.DELIVERED;

        if (actualHarvestYieldKg < expectedYieldKg && actualHarvestYieldKg > 0) {
            // Partial fulfillment calculation
            uint256 fulfillmentRatio = (actualHarvestYieldKg * 1e18) / expectedYieldKg;
            uint256 farmerPayout = (totalEscrowLocked * fulfillmentRatio) / 1e18;
            uint256 refundPool = totalEscrowLocked - farmerPayout;

            // Disburse farmer payout
            payable(farmer).transfer(farmerPayout);
            emit FundsReleased(farmer, farmerPayout);
            emit PartialSettlementExecuted(expectedYieldKg, actualHarvestYieldKg, refundPool);
        } else {
            // 100% fulfillment
            payable(farmer).transfer(totalEscrowLocked);
            emit FundsReleased(farmer, totalEscrowLocked);
        }
        currentStage = Stage.SETTLED;
    }
}`;
