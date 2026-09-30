# AgriLedger — Decentralized Demand-Driven Agricultural Marketplace & Fulfillment Protocol
**Smart India Hackathon (SIH 2026) Student Innovation Prototype**

> **Core Value Paradigm:**  
> *"Instead of farmers growing first and searching for buyers later, buyers commit demand first and farmers grow against that demand."*

---

## 🚀 Live Demo URL
- **Local Application Server:** `http://localhost:5173/`

---

## 🌟 Primary Demo Walkthrough (Judge Presentation Script)

Use the built-in **"Presentation Tour"** button at the top right of the navbar to step through the exact 20-step story in front of the evaluators:

### Step 1: The Problem — Farmer Dashboard (Ravi Singh)
1. Switch role to **Farmer (Ravi Singh)**.
2. Note Ravi's location: **Ludhiana, Punjab**.
3. Highlight the core dilemma:
   - Traditional farmers bear all crop risk upfront, taking high-interest loans (24–36% APR) for seeds/fertilizer, with zero guarantee of buyers or price at harvest.
   - Middlemen exploit this uncertainty to purchase at distress prices during gluts.

### Step 2: The Harvest Listing & Smart Contract
1. Show Ravi's forward harvest listing:
   - **Crop:** Wheat (Sharbati PBW-550)
   - **Target Yield:** 1,000 kg
   - **Target Price:** ₹10/kg
   - **Expected Harvest Date:** Dec 15
   - **Contract ID:** `#HC-48291`
2. Ravi receives **30% upfront working capital release** directly upon certified sowing verification, completely eliminating predatory moneylenders.

### Step 3: The Pre-Commitment Marketplace
1. Switch role to **Buyer / Pre-Commit**.
2. Notice the **Intelligent Logistics & Perishability Engine**:
   - Change Buyer Hub between **Delhi**, **Mumbai**, and **Chennai**.
   - Note how **Ludhiana Wheat** is allowed to all cities (365-day shelf life).
   - In contrast, **Tomatoes** (5-day shelf life) or **Strawberries** (3-day shelf life) are automatically restricted to feasible regional radii to prevent transit spoilage!

### Step 4: The Primary WOW Flow — Pre-Commit 100 kg
1. Click **PRE-COMMIT / BUY** on Ravi Singh's Wheat listing.
2. Select **100 kg**:
   - **Produce Cost:** ₹1,000 (100 kg × ₹10)
   - **Estimated Freight to Delhi Hub:** ₹85
   - **Total Escrow Amount:** ₹1,085
3. Click **PRE-COMMIT / BUY (LOCK ESCROW)**.
4. Watch the animated multi-step blockchain execution in real time:
   1. *Creating Harvest Contract...*
   2. *Locking payment in Escrow Vault...*
   3. *Recording commitment on distributed ledger...*
   4. *Transaction Confirmed ✓ (Tx Hash generated)*

### Step 5: Instant Synchronization
1. Switch back to **Farmer Dashboard (Ravi Singh)**:
   - Note that committed demand instantly jumped from **650 kg → 750 kg** (75% pre-sold)!
   - Ravi now has locked guaranteed demand before harvesting!

### Step 6: Farm-to-Fork Order Lifecycle & Dark Store Logistics
1. Switch back to **Buyer** and open **My Orders & Provenance**.
2. Click through the 10-stage interactive lifecycle pipeline:
   - `Demand Committed` → `Farmer Accepted` → `Cultivation Sown` → `Growing Maturation` → `Crop Harvested` → `Quality Verified (Grade A)` → `In Transit` → `Delhi Dark Store` → `Out for Delivery` → `Delivered & Settled`.
3. Click **"Simulate Next Stage"** to move the wheat into the **Delhi Dark Store**:
   - Status updates: *"Your wheat is currently at Delhi NCR Distribution Hub (Silo #04)."*
4. Click **"Simulate Next Stage"** to trigger **Delivered & Settled**:
   - Smart contract verifies recipient OTP/NFC delivery receipt.
   - Escrow settlement is automatically disbursed to Ravi Singh.
   - Celebratory confetti triggers!

### Step 7: Agricultural Risk Handling — Partial Fulfillment Simulator
1. Go to Farmer Dashboard and click **"Simulate Partial Harvest"**.
2. Pose the real-world agricultural question: *"What if unseasonal hail causes crop yield to drop from 1,000 kg to 700 kg?"*
3. Slide the actual yield slider to **700 kg**:
   - **Farmer Payout:** 70% of escrow (₹7,000) released for the 700 kg delivered.
   - **Automated Buyer Refund:** 30% of escrow (₹3,000) refunded to buyers automatically.
4. Click **"Execute On-Chain Settlement"** to demonstrate cryptographic dispute-free risk handling!

### Step 8: Verifiable Farmer Reputation & Demand Pools
1. Open Ravi's **Verifiable Reputation Scorecard**:
   - 47 completed contracts, 96% fulfillment rate, 94% on-time delivery, Soulbound Token `#SBT-AGRI-0048291`.
2. Open **Demand Aggregation Pools**:
   - Show how large buyers (e.g., Grand Horizon Restaurant Chain needing 10,000 kg tomatoes) post aggregate demand.
   - Show multiple smallholder farmers (Harpreet Kaur 2,000 kg, Sukhbir Mann 3,000 kg, Jagjit Cheema 1,500 kg) pooling supply collectively.

### Step 9: Audit Smart Contract & Distributed Ledger
1. Open **Harvest Contract (#HC-48291)** to review the non-custodial escrow state machine.
2. Click **"View Solidity Smart Contract"** to view the production-ready `HarvestEscrow.sol` code.
3. Open **Ledger Explorer** to inspect block heights, transactions, and cryptographic proofs.

---

## 🏗️ Architecture & Technology Stack
- **Frontend & App Framework:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Distributed Ledger Service:** Simulated EVM execution layer with SHA-256 block hashing, nonce generation, and event logging.
- **Smart Contract Reference:** Clean, gas-optimized Solidity (`HarvestEscrow.sol`) with multi-sig oracle verification and proportional partial settlement algorithms.
- **Logistics & Perishability Engine:** Road distance calculation across Indian transport corridors, dark store silo capacity tracking, shelf life decay formulas, and dynamic freight fee modeling.
