# Demand2Crop — System Architecture & Workflow Flowcharts

> **Core Value Paradigm:** *"Instead of farmers growing first and searching for buyers later, buyers commit demand first and farmers grow against that demand."*

---

## 1. High-Level End-to-End System Architecture

```mermaid
flowchart TD
    subgraph ACTORS["1. Platform Participants"]
        FARMER["👨‍🌾 Sovereign Farmer (e.g., Ravi Singh)"]
        BUYER["🛒 Buyer / Consumer / Restaurant"]
        HUB_MGR["🏬 Dark Store Warehouse Manager"]
        CARRIER["🚚 Cold-Chain Logistics Transporter"]
    end

    subgraph FRONTEND["2. Application & Interface Layer (React + TypeScript)"]
        DASH_FARMER["Farmer Dashboard\n- Forward Harvest Listing\n- Capital Drawdown\n- Yield Simulator"]
        MARKET["Marketplace Engine\n- Shelf-life Filter\n- Route Feasibility Check\n- Demand Deficit Radar"]
        TX_MODAL["Pre-Commit Escrow Modal\n- Price + Logistics Breakdown\n- Wallet Signature"]
        TRACKER["11-Stage Provenance Tracker\n- Live State Progression\n- Batch Verification"]
        DEMAND_POOL["Institutional Demand Pools\n- Multi-farmer aggregation\n- Bulk buyer procurement"]
    end

    subgraph ENGINE["3. Logistics & Perishability Feasibility Engine"]
        MATRIX["Crop Characteristics Matrix\n- Shelf Life (days)\n- Max Safe Transit Distance\n- Cold-chain Temp Bounds"]
        ROUTING["Route Validator\n- Distance Calculation\n- Perishability Window Feasibility\n(e.g. Tomatoes: Ludhiana ➔ Delhi Allowed\nLudhiana ➔ Chennai Blocked)"]
    end

    subgraph BLOCKCHAIN["4. Distributed Ledger & Smart Contract Layer"]
        ESCROW["HarvestEscrow.sol (Smart Contract)\n- Target Yield & Floor Price\n- Buyer Escrow Vault\n- Tranche Release Rules\n- Partial Yield Pro-Rata Refund"]
        MEMPOOL["Ledger Transaction Stream\n- Block Mining & Hashing\n- Immutable Event Auditing\n- Verified Reputation Ledger"]
    end

    subgraph PHYSICAL["5. Physical Fulfillment & Dark Store Network"]
        FARMGATE["Farm Gate Origin (Ludhiana, etc.)"]
        DARK_STORE["Regional Dark Store Hub\n(Delhi, Mumbai, Bengaluru, Hyderabad, Chennai)\n- Cold Chain Silos\n- Quality & Grade Verification"]
        LAST_MILE["Last-Mile Distribution\n(Direct to Consumer / Restaurant Doorstep)"]
    end

    %% Actor Connections
    FARMER --> DASH_FARMER
    BUYER --> MARKET
    BUYER --> TX_MODAL
    BUYER --> TRACKER
    HUB_MGR --> DARK_STORE
    CARRIER --> ROUTING

    %% Frontend to Engines & Contracts
    DASH_FARMER --> ESCROW
    MARKET --> ROUTING
    ROUTING --> MATRIX
    TX_MODAL --> ESCROW
    ESCROW --> MEMPOOL

    %% Physical Pipeline
    ESCROW -.->|Signals Cultivation & Harvest| FARMGATE
    FARMGATE -->|Transport via Feasible Route| DARK_STORE
    DARK_STORE -->|Grade Verified & Inventory Logged| LAST_MILE
    LAST_MILE -->|Delivered| BUYER
    HUB_MGR -.->|Oracle Verification Attestation| ESCROW
```

---

## 2. Core Operational Flow: From Demand Commitment to Final Settlement

```mermaid
flowchart TD
    START(["Farmer Plans Future Cultivation"]) --> A1["Farmer creates Future Harvest Listing\n(Crop, Target Yield, Pre-Commit Price, Harvest Date, Hub)"]
    A1 --> A2["Smart Contract (HarvestEscrow.sol) Initialized on Ledger"]
    A2 --> B1["Buyer discovers listing on Marketplace\n(System checks Perishability & Distance Feasibility)"]

    B1 --> B2{"Is Route Feasible for Crop Shelf-life?"}
    B2 -- No --> B_REJECT["Buyer Alerted: Exceeds safe transit shelf-life\nRoute Prohibited to Prevent Spoilage"]
    B2 -- Yes --> B3["Buyer selects desired quantity (e.g., 100 kg Wheat)"]

    B3 --> C1["Buyer initiates Pre-Commitment"]
    C1 --> C2["Escrow Lock: Product cost + estimated freight locked in contract"]
    C2 --> C3["Farmer Dashboard updates in real time\n(Committed: 650 kg ➔ 750 kg)"]

    C3 --> D1{"Target Commitment Threshold Reached?"}
    D1 -- Yes --> D2["Tranche 1 Unlocked: 30% Working Capital released to Farmer\n(Zero-interest liquidity for seeds & inputs)"]
    D1 -- In Progress --> D3["Farmer continues cultivation against locked demand"]

    D2 --> E1["Farmer completes Cultivation & Harvest"]
    D3 --> E1

    E1 --> F1{"Actual Yield vs Promised Yield?"}
    F1 -- "Normal Harvest (100%)" --> G1["1,000 kg shipped to Regional Dark Store"]
    F1 -- "Partial Yield (e.g., 700 kg)" --> G2["Simulate Partial Harvest Triggered:\n- Farmer receives payment for 700 kg\n- 300 kg unfulfilled portion automatically refunded to buyers"]

    G1 --> H1["Dark Store Manager inspects & verifies quality grade"]
    G2 --> H1

    H1 --> H2["Oracle confirms receipt at Dark Store Hub\nInventory updated in Hub Silos"]
    H2 --> I1["Tranche 2 Unlocked: Final farmer payout disbursed"]
    I1 --> I2["Farmer On-Chain Reputation Score updated (+1 completed harvest)"]
    I2 --> J1["Last-mile delivery dispatched from Dark Store to Buyer"]
    J1 --> END(["Order Delivered & Transaction Finalized on Ledger"])
```

---

## 3. Smart Contract Escrow State Machine (`HarvestEscrow.sol`)

```mermaid
stateDiagram-v2
    [*] --> LISTED: Farmer Deploys Harvest Listing
    LISTED --> PRE_COMMITTED: Buyers Lock Payment in Escrow
    PRE_COMMITTED --> CULTIVATION_ACTIVE: Threshold Met (30% Working Capital Drawdown)
    CULTIVATION_ACTIVE --> HARVEST_READY: Crop Matures at Farm
    HARVEST_READY --> IN_TRANSIT: Dispatched to Regional Dark Store
    IN_TRANSIT --> HUB_RECEIVED: Arrival at Dark Store
    HUB_RECEIVED --> QUALITY_VERIFIED: Dark Store Inspection Passes
    
    QUALITY_VERIFIED --> SETTLED_FULL: 100% Yield Fulfilled (Full Payout Released)
    QUALITY_VERIFIED --> SETTLED_PARTIAL: Partial Yield (Pro-Rata Payout + Auto-Refund)
    
    SETTLED_FULL --> COMPLETED: Last-Mile Delivery Confirmed
    SETTLED_PARTIAL --> COMPLETED: Last-Mile Delivery Confirmed
    COMPLETED --> [*]
```

---

## 4. Multi-Node Logistics & Dark Store Pipeline

```mermaid
flowchart LR
    subgraph ORIGIN["Production Origin"]
        F1["👨‍🌾 Farm: Ludhiana, Punjab"]
        Q_INSPECT["Pre-dispatch Grade Check"]
    end

    subgraph TRANSIT["Inter-State Freight"]
        TRUCK["🚚 Temperature-Controlled Logistics"]
        TELEMETRY["Perishability Window Monitoring"]
    end

    subgraph HUB["Regional Distribution Hub"]
        DS_DELHI["🏬 Delhi NCR Dark Store"]
        SILO["Cold Storage Silos\n(Humidity & Temp Regulated)"]
        INV_SYS["Real-Time Hub Inventory Ledger"]
    end

    subgraph DESTINATION["Consumer Endpoint"]
        LOCAL_VAN["🛵 Urban Last-Mile Fleet"]
        RETAIL["🛒 Urban Household Consumers"]
        HO_RECA["🍽️ Institutional / Restaurant Buyers"]
    end

    F1 --> Q_INSPECT
    Q_INSPECT --> TRUCK
    TRUCK --> TELEMETRY
    TELEMETRY --> DS_DELHI
    DS_DELHI --> SILO
    SILO --> INV_SYS
    INV_SYS --> LOCAL_VAN
    LOCAL_VAN --> RETAIL
    LOCAL_VAN --> HO_RECA
```

---

## 5. Institutional Demand Aggregation Pool (B2B Multi-Farmer Model)

```mermaid
flowchart TD
    RESTAURANT["🍽️ Institutional Buyer\n(e.g., Delhi Restaurant Chain)\nDemand: 10,000 kg Tomatoes @ ₹16/kg"]
    
    POOL["Demand2Crop Demand Aggregation Pool\n(Smart Contract Escrow: ₹1,60,000 locked)"]
    
    FARMER_A["👨‍🌾 Farmer Aman (Haryana)\nContributes: 2,000 kg"]
    FARMER_B["👨‍🌾 Farmer Harpreet (Punjab)\nContributes: 3,000 kg"]
    FARMER_C["👨‍🌾 Farmer Gurpreet (Himachal)\nContributes: 5,000 kg"]

    CONSOLIDATION["🏬 Consolidated Delivery to Delhi Dark Store Hub\n(Total: 10,000 kg)"]
    
    SETTLE_A["Contract Payout: ₹32,000 ➔ Farmer Aman"]
    SETTLE_B["Contract Payout: ₹48,000 ➔ Farmer Harpreet"]
    SETTLE_C["Contract Payout: ₹80,000 ➔ Farmer Gurpreet"]

    RESTAURANT -->|Creates Requirement & Locks Funds| POOL
    FARMER_A -->|Pledges Harvest Tranche| POOL
    FARMER_B -->|Pledges Harvest Tranche| POOL
    FARMER_C -->|Pledges Harvest Tranche| POOL
    
    POOL --> CONSOLIDATION
    CONSOLIDATION -->|Quality & Weighment Verified| SETTLE_A
    CONSOLIDATION -->|Quality & Weighment Verified| SETTLE_B
    CONSOLIDATION -->|Quality & Weighment Verified| SETTLE_C
```

---

## 6. Crop-Specific Perishability & Logistics Feasibility Matrix

| Crop Type | Shelf Life | Max Transport Radius | Storage Type | Feasible Route Example | Infeasible Route Example |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **Wheat (Sharbati)** | 180–360 Days | 2,500+ km | Dry Aerated Silos | Ludhiana $\rightarrow$ Delhi / Chennai ✅ | None (National reach) |
| **Basmati Rice** | 360+ Days | 2,500+ km | Ambient Moisture-Controlled | Karnal $\rightarrow$ Mumbai / Hyderabad ✅ | None (National reach) |
| **Potatoes** | 30–60 Days | 1,200 km | Cool Ventilated | Agra $\rightarrow$ Delhi / Kolkata ✅ | Agra $\rightarrow$ Kochi ⚠️ (Requires Reefers) |
| **Tomatoes** | 2–4 Days | 350 km | Cold Chain (10–12°C) | Ludhiana $\rightarrow$ Delhi (310 km) ✅ | Ludhiana $\rightarrow$ Chennai (2,100 km) ❌ |
| **Green Spinach** | 1–2 Days | 150 km | Hydro-Cooled (2–4°C) | Sonepat $\rightarrow$ Delhi NCR (60 km) ✅ | Sonepat $\rightarrow$ Mumbai ❌ |
| **Alphonso Mangoes**| 7–10 Days | 800 km | Controlled Atmosphere | Ratnagiri $\rightarrow$ Mumbai / Pune ✅ | Ratnagiri $\rightarrow$ Delhi ⚠️ (Fast express only) |
