import { CropType, DarkStoreHub } from '../types';
import { CROP_METADATA_REGISTRY } from './cropMetadata';

export interface LocationCoord {
  name: string;
  state: string;
  lat: number;
  lng: number;
}

export const INDIAN_CITIES: Record<string, LocationCoord> = {
  Ludhiana: { name: 'Ludhiana', state: 'Punjab', lat: 30.9010, lng: 75.8573 },
  Delhi: { name: 'Delhi NCR', state: 'Delhi', lat: 28.6139, lng: 77.2090 },
  Chandigarh: { name: 'Chandigarh', state: 'Punjab/Haryana', lat: 30.7333, lng: 76.7794 },
  Karnal: { name: 'Karnal', state: 'Haryana', lat: 29.6857, lng: 76.9905 },
  Shimla: { name: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734 },
  Nashik: { name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lng: 73.7898 },
  Pune: { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  Mumbai: { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  Bangalore: { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  Chennai: { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  Hyderabad: { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
  Jaipur: { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  Lucknow: { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
  Indore: { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577 }
};

export const DARK_STORE_HUBS: DarkStoreHub[] = [
  {
    id: 'hub-delhi',
    name: 'Delhi NCR Distribution Hub',
    city: 'Delhi',
    state: 'Delhi',
    coordinates: [28.6139, 77.2090],
    coldStorageCapacityTons: 120,
    coldStorageUsedTons: 64,
    dryStorageCapacityTons: 400,
    dryStorageUsedTons: 285,
    activeShipments: 14,
    outgoingOrders: 42,
    managerName: 'Vikramaditya Oberoi (Lead Logistics Officer)',
    inventory: [
      { crop: 'Wheat', quantityKg: 4500, farmerName: 'Ravi Singh', arrivedAt: '2026-09-28', qualityGrade: 'GRADE_A' },
      { crop: 'Potatoes', quantityKg: 2800, farmerName: 'Aman Kumar', arrivedAt: '2026-09-27', qualityGrade: 'GRADE_A' },
      { crop: 'Tomatoes', quantityKg: 650, farmerName: 'Harpreet Kaur', arrivedAt: '2026-09-29', qualityGrade: 'GRADE_A' },
      { crop: 'Basmati Rice', quantityKg: 3200, farmerName: 'Gurpreet Gill', arrivedAt: '2026-09-26', qualityGrade: 'GRADE_A' }
    ]
  },
  {
    id: 'hub-mumbai',
    name: 'Mumbai Western Gateway Hub (Bhiwandi)',
    city: 'Mumbai',
    state: 'Maharashtra',
    coordinates: [19.2967, 73.0631],
    coldStorageCapacityTons: 180,
    coldStorageUsedTons: 110,
    dryStorageCapacityTons: 500,
    dryStorageUsedTons: 390,
    activeShipments: 22,
    outgoingOrders: 68,
    managerName: 'Kavita Deshmukh (Terminal Operations Lead)',
    inventory: [
      { crop: 'Onions', quantityKg: 6200, farmerName: 'Nitin Patil', arrivedAt: '2026-09-28', qualityGrade: 'GRADE_A' },
      { crop: 'Wheat', quantityKg: 3400, farmerName: 'Ravi Singh', arrivedAt: '2026-09-25', qualityGrade: 'GRADE_A' },
      { crop: 'Strawberries', quantityKg: 400, farmerName: 'Sanjay Shinde', arrivedAt: '2026-09-29', qualityGrade: 'GRADE_A' }
    ]
  },
  {
    id: 'hub-bangalore',
    name: 'Bangalore South Tech Ag Hub (Whitefield)',
    city: 'Bangalore',
    state: 'Karnataka',
    coordinates: [12.9698, 77.7500],
    coldStorageCapacityTons: 100,
    coldStorageUsedTons: 52,
    dryStorageCapacityTons: 300,
    dryStorageUsedTons: 180,
    activeShipments: 9,
    outgoingOrders: 31,
    managerName: 'Karthik Narayanan (Cold Chain Inspector)',
    inventory: [
      { crop: 'Tomatoes', quantityKg: 1200, farmerName: 'Ramesh Reddy', arrivedAt: '2026-09-29', qualityGrade: 'GRADE_A' },
      { crop: 'Basmati Rice', quantityKg: 2000, farmerName: 'Gurpreet Gill', arrivedAt: '2026-09-24', qualityGrade: 'GRADE_A' }
    ]
  },
  {
    id: 'hub-chennai',
    name: 'Chennai Coastal Distribution Hub',
    city: 'Chennai',
    state: 'Tamil Nadu',
    coordinates: [13.0827, 80.2707],
    coldStorageCapacityTons: 90,
    coldStorageUsedTons: 40,
    dryStorageCapacityTons: 250,
    dryStorageUsedTons: 130,
    activeShipments: 6,
    outgoingOrders: 20,
    managerName: 'Sundaram Pillai (Regional Port Dispatcher)',
    inventory: [
      { crop: 'Basmati Rice', quantityKg: 2500, farmerName: 'Gurpreet Gill', arrivedAt: '2026-09-25', qualityGrade: 'GRADE_A' },
      { crop: 'Pulses (Arhar)', quantityKg: 1800, farmerName: 'Suresh Yadav', arrivedAt: '2026-09-27', qualityGrade: 'GRADE_A' }
    ]
  },
  {
    id: 'hub-hyderabad',
    name: 'Hyderabad Deccan Logistics Park',
    city: 'Hyderabad',
    state: 'Telangana',
    coordinates: [17.3850, 78.4867],
    coldStorageCapacityTons: 110,
    coldStorageUsedTons: 68,
    dryStorageCapacityTons: 350,
    dryStorageUsedTons: 210,
    activeShipments: 11,
    outgoingOrders: 38,
    managerName: 'Anil Kumar Reddy (Hub Operations)',
    inventory: [
      { crop: 'Cotton', quantityKg: 5000, farmerName: 'Venkat Rao', arrivedAt: '2026-09-26', qualityGrade: 'GRADE_A' },
      { crop: 'Green Chillies', quantityKg: 850, farmerName: 'Kishore Goud', arrivedAt: '2026-09-29', qualityGrade: 'GRADE_A' }
    ]
  }
];

// Great circle distance in KM with road curvature multiplier
export function calculateRoadDistanceKm(originCity: string, destinationCity: string): number {
  const getCityCoord = (inputCity: string, fallbackKey: string) => {
    if (!inputCity) return INDIAN_CITIES[fallbackKey];
    if (INDIAN_CITIES[inputCity]) return INDIAN_CITIES[inputCity];
    const cleaned = inputCity.split(',')[0].trim().toLowerCase();
    const foundKey = Object.keys(INDIAN_CITIES).find((k) => {
      const kLower = k.toLowerCase();
      return kLower === cleaned || cleaned.includes(kLower) || kLower.includes(cleaned);
    });
    return foundKey ? INDIAN_CITIES[foundKey] : INDIAN_CITIES[fallbackKey];
  };

  const c1 = getCityCoord(originCity, 'Ludhiana');
  const c2 = getCityCoord(destinationCity, 'Delhi');

  if (c1.name === c2.name) return 25; // Intra-city local transit

  const R = 6371; // km
  const dLat = ((c2.lat - c1.lat) * Math.PI) / 180;
  const dLng = ((c2.lng - c1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((c1.lat * Math.PI) / 180) *
      Math.cos((c2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const airDistance = R * c;

  // Road factor 1.25 for highway routing
  return Math.round(airDistance * 1.25);
}

export interface RouteFeasibilityResult {
  isFeasible: boolean;
  transitHours: number;
  transitDays: number;
  distanceKm: number;
  shelfLifeDays: number;
  statusBadge: 'OPTIMAL' | 'ACCEPTABLE' | 'RISKY' | 'NOT_RECOMMENDED';
  reason: string;
  recommendedHub: DarkStoreHub;
  logisticsFeePerKg: number;
  totalLogisticsFee: number;
}

export function evaluateLogisticsFeasibility(
  cropName: CropType,
  farmerCity: string,
  buyerCity: string,
  quantityKg: number
): RouteFeasibilityResult {
  const cropMeta = CROP_METADATA_REGISTRY[cropName] || CROP_METADATA_REGISTRY['Wheat'];
  const distanceKm = calculateRoadDistanceKm(farmerCity, buyerCity);
  
  // Average freight transit speed: 45 km/h + 6 hrs dark store handling buffer
  const transitHours = Math.round((distanceKm / 45) + 6);
  const transitDays = Math.ceil(transitHours / 24);

  // Pick nearest dark store to buyer
  let recommendedHub = DARK_STORE_HUBS[0];
  let shortestHubDistance = 99999;
  for (const hub of DARK_STORE_HUBS) {
    const d = calculateRoadDistanceKm(hub.city, buyerCity);
    if (d < shortestHubDistance) {
      shortestHubDistance = d;
      recommendedHub = hub;
    }
  }

  // Logistics fee formula:
  // Base dark store handling fee = ₹0.50/kg
  // Freight distance fee = distanceKm * cropMeta.baseLogisticsRatePerKmKg
  // Cold chain surcharge if applicable = ₹0.75/kg
  let ratePerKg = 0.50 + (distanceKm * cropMeta.baseLogisticsRatePerKmKg);
  if (cropMeta.requiresColdChain) {
    ratePerKg += 0.85;
  }
  ratePerKg = Math.max(0.75, Math.round(ratePerKg * 10) / 10);
  const totalLogisticsFee = Math.round(ratePerKg * quantityKg);

  // Feasibility logic:
  // Highly perishable: transit must not exceed 40% of shelf life and cannot exceed maxLogisticsRadiusKm
  if (distanceKm > cropMeta.maxLogisticsRadiusKm) {
    return {
      isFeasible: false,
      transitHours,
      transitDays,
      distanceKm,
      shelfLifeDays: cropMeta.shelfLifeDays,
      statusBadge: 'NOT_RECOMMENDED',
      reason: `${cropName} has a ${cropMeta.shelfLifeDays}-day shelf life. Distance (${distanceKm} km) exceeds maximum viable freshness corridor (${cropMeta.maxLogisticsRadiusKm} km).`,
      recommendedHub,
      logisticsFeePerKg: ratePerKg,
      totalLogisticsFee
    };
  }

  if (transitDays > cropMeta.shelfLifeDays * 0.6) {
    return {
      isFeasible: false,
      transitHours,
      transitDays,
      distanceKm,
      shelfLifeDays: cropMeta.shelfLifeDays,
      statusBadge: 'RISKY',
      reason: `Transit duration (${transitDays} days) consumes majority of shelf life (${cropMeta.shelfLifeDays} days). Severe spoilage risk.`,
      recommendedHub,
      logisticsFeePerKg: ratePerKg,
      totalLogisticsFee
    };
  }

  const isOptimal = distanceKm <= 500 || cropMeta.perishability === 'Durable (Non-Perishable)';

  return {
    isFeasible: true,
    transitHours,
    transitDays,
    distanceKm,
    shelfLifeDays: cropMeta.shelfLifeDays,
    statusBadge: isOptimal ? 'OPTIMAL' : 'ACCEPTABLE',
    reason: isOptimal 
      ? `Ideal logistics corridor via ${recommendedHub.name}. Shelf life buffer: ${cropMeta.shelfLifeDays - transitDays} days.`
      : `Feasible transit via regional cold-chain corridor. Shelf life buffer: ${cropMeta.shelfLifeDays - transitDays} days.`,
    recommendedHub,
    logisticsFeePerKg: ratePerKg,
    totalLogisticsFee
  };
}
