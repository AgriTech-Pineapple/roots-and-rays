import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type FarmId = "farm-1" | "farm-2" | "farm-3";

export type Farm = {
  id: FarmId;
  name: string;
  subtitle: string;
  crop: string;
  estateType: string;
  region: string;
  established: string;
  area: string;
  blocks: number;
  sectors: number;
  plants: string;
  density: string;
  healthyPct: string;
  ndvi: string;
  yieldForecast: string;
  yieldDelta: string;
  totalTonnage: string;
  revenue: string;
  harvestWindow: string;
  confidence: string;
  soil: string;
  elevation: string;
  climate: string;
  irrigation: string;
  manager: string;
  coords: string;
  accent: "sage" | "olive" | "harvest";
  mapLabel: string;
  blockRows: { id: string; area: number; plants: number; health: string; yield: string }[];
  yearlyYield: { year: string; expected: number; actual: number | null; crop: string }[];
  monthlyBand: { m: string; low: number; mid: number; high: number }[];
  densityByBlock: { block: string; d: number }[];
  canopy: { wk: string; c: number }[];
  variance: { block: string; v: number }[];
  indexTrend: { d: string; NDVI: number; NDRE: number; SAVI: number }[];
  history: { m: string; NDVI: number; NDRE: number; SAVI: number; Yield: number }[];
  captures: { date: string; mission: string; area: string; ndviChange: string; remarks: string }[];
  recommendations: { title: string; reason: string }[];
  alerts: { level: "High" | "Medium" | "Low"; title: string; ago: string }[];
  interpretation: string[];
  kpis: {
    plants: { total: string; avgDensity: string; missing: string };
    health: { healthyPct: string; mild: string; severe: string; ndvi: string; ndviDelta: string };
    growth: { canopy: string; uniformity: string; variance: string; stage: string; canopyDelta: string };
    history: { captures12mo: string; ndviDelta: string; yieldDelta: string; stress: string };
  };
};

const farms: Farm[] = [
  {
    id: "farm-1",
    name: "Farm 1",
    subtitle: "Highland Pineapple Estate",
    crop: "Pineapple",
    estateType: "Highland Estate",
    region: "Cameron Highlands, Pahang",
    established: "2009",
    area: "1,247 ha",
    blocks: 38,
    sectors: 4,
    plants: "2.74M",
    density: "2,194 / ha",
    healthyPct: "86.4%",
    ndvi: "0.77",
    yieldForecast: "61.4 t/ha",
    yieldDelta: "+8.7% YoY",
    totalTonnage: "76,570 t",
    revenue: "RM 124M",
    harvestWindow: "Aug – Oct",
    confidence: "91%",
    soil: "Volcanic loam",
    elevation: "412 m",
    climate: "Tropical wet",
    irrigation: "Drip · 92% coverage",
    manager: "Ahmad Ismail",
    coords: "4°N 101°E",
    accent: "sage",
    mapLabel: "Farm 1 · 4 blocks",
    blockRows: [
      { id: "A-1", area: 42.1, plants: 92340, health: "Healthy", yield: "63.2 t/ha" },
      { id: "A-2", area: 38.5, plants: 84200, health: "Healthy", yield: "61.0 t/ha" },
      { id: "B-1", area: 51.2, plants: 113800, health: "Mild stress", yield: "57.4 t/ha" },
      { id: "B-2", area: 47.8, plants: 105100, health: "Healthy", yield: "60.9 t/ha" },
      { id: "C-3", area: 33.4, plants: 73600, health: "Severe stress", yield: "48.1 t/ha" },
      { id: "C-4", area: 41.7, plants: 91100, health: "Healthy", yield: "62.5 t/ha" },
    ],
    yearlyYield: [
      { year: "2020", expected: 54, actual: 53, crop: "Pineapple" },
      { year: "2021", expected: 55, actual: 56, crop: "Pineapple" },
      { year: "2022", expected: 57, actual: 56, crop: "Pineapple" },
      { year: "2023", expected: 58, actual: 59, crop: "Pineapple" },
      { year: "2024", expected: 59, actual: 58, crop: "Pineapple" },
      { year: "2025", expected: 60, actual: 61, crop: "Pineapple" },
      { year: "2026", expected: 61, actual: null, crop: "Pineapple" },
    ],
    monthlyBand: [
      { m: "Jul", low: 52, mid: 56, high: 60 }, { m: "Aug", low: 54, mid: 58, high: 62 },
      { m: "Sep", low: 56, mid: 60, high: 64 }, { m: "Oct", low: 58, mid: 62, high: 66 },
      { m: "Nov", low: 57, mid: 61, high: 65 }, { m: "Dec", low: 55, mid: 59, high: 63 },
    ],
    densityByBlock: [
      { block: "A-1", d: 2192 }, { block: "A-2", d: 2186 }, { block: "B-1", d: 2222 },
      { block: "B-2", d: 2198 }, { block: "C-3", d: 2089 }, { block: "C-4", d: 2184 },
      { block: "D-1", d: 2210 }, { block: "D-2", d: 2174 },
    ],
    canopy: [
      { wk: "W1", c: 12 }, { wk: "W4", c: 21 }, { wk: "W8", c: 34 }, { wk: "W12", c: 48 },
      { wk: "W16", c: 61 }, { wk: "W20", c: 72 }, { wk: "W24", c: 81 }, { wk: "W28", c: 88 },
    ],
    variance: [
      { block: "A-1", v: 4.2 }, { block: "A-2", v: 5.0 }, { block: "B-1", v: 9.3 },
      { block: "B-2", v: 6.1 }, { block: "C-3", v: 12.7 }, { block: "C-4", v: 5.4 },
    ],
    indexTrend: [
      { d: "May 1", NDVI: 0.71, NDRE: 0.42, SAVI: 0.58 },
      { d: "May 8", NDVI: 0.73, NDRE: 0.44, SAVI: 0.60 },
      { d: "May 15", NDVI: 0.74, NDRE: 0.45, SAVI: 0.61 },
      { d: "May 22", NDVI: 0.72, NDRE: 0.43, SAVI: 0.59 },
      { d: "May 29", NDVI: 0.75, NDRE: 0.46, SAVI: 0.62 },
      { d: "Jun 5", NDVI: 0.77, NDRE: 0.48, SAVI: 0.64 },
    ],
    history: [
      { m: "Jan", NDVI: 0.71, NDRE: 0.43, SAVI: 0.58, Yield: 56 },
      { m: "Feb", NDVI: 0.72, NDRE: 0.44, SAVI: 0.59, Yield: 57 },
      { m: "Mar", NDVI: 0.74, NDRE: 0.45, SAVI: 0.60, Yield: 58 },
      { m: "Apr", NDVI: 0.73, NDRE: 0.45, SAVI: 0.60, Yield: 58 },
      { m: "May", NDVI: 0.75, NDRE: 0.46, SAVI: 0.62, Yield: 60 },
      { m: "Jun", NDVI: 0.77, NDRE: 0.48, SAVI: 0.64, Yield: 61 },
    ],
    captures: [
      { date: "6 Jun 2026", mission: "MX-218", area: "412 ha", ndviChange: "+0.02", remarks: "Routine survey · clear sky" },
      { date: "30 May 2026", mission: "MX-212", area: "1,247 ha", ndviChange: "+0.01", remarks: "Light rain during capture" },
      { date: "22 May 2026", mission: "MX-207", area: "830 ha", ndviChange: "−0.01", remarks: "Irrigation pump failure on Block C-3" },
      { date: "14 May 2026", mission: "MX-201", area: "1,247 ha", ndviChange: "+0.03", remarks: "Post-storm recovery survey" },
    ],
    recommendations: [
      { title: "Reduce irrigation on Block C-3", reason: "Soil too wet after recent rainfall." },
      { title: "Schedule foliar feed for Block B-1", reason: "Plant health trending down for 9 days." },
      { title: "Send drone to Block 5", reason: "No fresh imagery in 12 days." },
    ],
    alerts: [
      { level: "High", title: "Severe stress in Block C-3", ago: "2h ago" },
      { level: "Medium", title: "Foliar feed needed for Block B-1", ago: "5h ago" },
      { level: "Low", title: "Drone survey completed", ago: "1d ago" },
    ],
    interpretation: [
      "Crop vigor is improving across the northern blocks (A-1, A-2). Healthy green canopy expanded steadily over the last six weeks.",
      "Block C-3 is still showing stress: leaves are thinner than the estate average and likely water-stressed. Plan a field walk within 48 hours.",
      "Overall the farm is on track for the +8.7% yield improvement. Keep watering steady and re-check after the next drone capture.",
    ],
    kpis: {
      plants: { total: "2,743,118", avgDensity: "2,194 / ha", missing: "18,402" },
      health: { healthyPct: "86.4%", mild: "9.8%", severe: "3.8%", ndvi: "0.77", ndviDelta: "▲ 0.02" },
      growth: { canopy: "74.2%", uniformity: "91.7", variance: "6.8%", stage: "Vegetative", canopyDelta: "▲ 3.4 pts" },
      history: { captures12mo: "48", ndviDelta: "+0.04", yieldDelta: "+8.7%", stress: "11" },
    },
  },
  {
    id: "farm-2",
    name: "Farm 2",
    subtitle: "Lowland Oil Palm Estate",
    crop: "Oil Palm",
    estateType: "Lowland Estate",
    region: "Sandakan, Sabah",
    established: "2014",
    area: "842 ha",
    blocks: 26,
    sectors: 3,
    plants: "1.83M",
    density: "2,178 / ha",
    healthyPct: "78.1%",
    ndvi: "0.69",
    yieldForecast: "54.8 t/ha",
    yieldDelta: "+2.4% YoY",
    totalTonnage: "46,140 t",
    revenue: "RM 74M",
    harvestWindow: "Sep – Nov",
    confidence: "84%",
    soil: "Alluvial clay-loam",
    elevation: "218 m",
    climate: "Tropical seasonal",
    irrigation: "Sprinkler · 68% coverage",
    manager: "Ahmad Ismail",
    coords: "5°N 118°E",
    accent: "harvest",
    mapLabel: "Farm 2 · 4 blocks",
    blockRows: [
      { id: "V-1", area: 36.4, plants: 79100, health: "Healthy", yield: "57.2 t/ha" },
      { id: "V-2", area: 31.8, plants: 68900, health: "Mild stress", yield: "52.0 t/ha" },
      { id: "V-3", area: 44.2, plants: 95800, health: "Mild stress", yield: "50.8 t/ha" },
      { id: "W-1", area: 28.6, plants: 62200, health: "Healthy", yield: "56.1 t/ha" },
      { id: "W-2", area: 39.1, plants: 84500, health: "Severe stress", yield: "44.6 t/ha" },
      { id: "W-3", area: 33.7, plants: 73100, health: "Healthy", yield: "55.3 t/ha" },
    ],
    yearlyYield: [
      { year: "2020", expected: 48, actual: 47, crop: "Oil Palm" },
      { year: "2021", expected: 49, actual: 50, crop: "Oil Palm" },
      { year: "2022", expected: 51, actual: 50, crop: "Oil Palm" },
      { year: "2023", expected: 52, actual: 51, crop: "Oil Palm" },
      { year: "2024", expected: 53, actual: 53, crop: "Oil Palm" },
      { year: "2025", expected: 54, actual: 54, crop: "Oil Palm" },
      { year: "2026", expected: 55, actual: null, crop: "Oil Palm" },
    ],
    monthlyBand: [
      { m: "Aug", low: 44, mid: 48, high: 52 }, { m: "Sep", low: 46, mid: 50, high: 54 },
      { m: "Oct", low: 48, mid: 52, high: 56 }, { m: "Nov", low: 50, mid: 54, high: 58 },
      { m: "Dec", low: 49, mid: 53, high: 57 }, { m: "Jan", low: 47, mid: 51, high: 55 },
    ],
    densityByBlock: [
      { block: "V-1", d: 2174 }, { block: "V-2", d: 2168 }, { block: "V-3", d: 2167 },
      { block: "W-1", d: 2192 }, { block: "W-2", d: 2104 }, { block: "W-3", d: 2188 },
      { block: "X-1", d: 2156 }, { block: "X-2", d: 2181 },
    ],
    canopy: [
      { wk: "W1", c: 9 }, { wk: "W4", c: 17 }, { wk: "W8", c: 28 }, { wk: "W12", c: 41 },
      { wk: "W16", c: 53 }, { wk: "W20", c: 63 }, { wk: "W24", c: 71 }, { wk: "W28", c: 77 },
    ],
    variance: [
      { block: "V-1", v: 6.4 }, { block: "V-2", v: 8.9 }, { block: "V-3", v: 11.2 },
      { block: "W-1", v: 5.1 }, { block: "W-2", v: 14.6 }, { block: "W-3", v: 6.7 },
    ],
    indexTrend: [
      { d: "May 1", NDVI: 0.66, NDRE: 0.38, SAVI: 0.52 },
      { d: "May 8", NDVI: 0.67, NDRE: 0.39, SAVI: 0.53 },
      { d: "May 15", NDVI: 0.68, NDRE: 0.39, SAVI: 0.54 },
      { d: "May 22", NDVI: 0.67, NDRE: 0.37, SAVI: 0.53 },
      { d: "May 29", NDVI: 0.69, NDRE: 0.40, SAVI: 0.55 },
      { d: "Jun 5", NDVI: 0.69, NDRE: 0.40, SAVI: 0.55 },
    ],
    history: [
      { m: "Jan", NDVI: 0.63, NDRE: 0.37, SAVI: 0.49, Yield: 49 },
      { m: "Feb", NDVI: 0.64, NDRE: 0.37, SAVI: 0.50, Yield: 50 },
      { m: "Mar", NDVI: 0.66, NDRE: 0.38, SAVI: 0.52, Yield: 52 },
      { m: "Apr", NDVI: 0.67, NDRE: 0.39, SAVI: 0.53, Yield: 52 },
      { m: "May", NDVI: 0.68, NDRE: 0.39, SAVI: 0.54, Yield: 54 },
      { m: "Jun", NDVI: 0.69, NDRE: 0.40, SAVI: 0.55, Yield: 55 },
    ],
    captures: [
      { date: "5 Jun 2026", mission: "VV-114", area: "342 ha", ndviChange: "+0.01", remarks: "Sprinkler pressure low on Sector 3" },
      { date: "29 May 2026", mission: "VV-110", area: "842 ha", ndviChange: "+0.02", remarks: "Routine survey" },
      { date: "21 May 2026", mission: "VV-104", area: "520 ha", ndviChange: "−0.02", remarks: "Hail event 19 May" },
      { date: "13 May 2026", mission: "VV-098", area: "842 ha", ndviChange: "+0.01", remarks: "Clear sky · full coverage" },
    ],
    recommendations: [
      { title: "Inspect Block W-2 for pest damage", reason: "Cluster of stressed plants detected." },
      { title: "Repair sprinkler on Sector 3", reason: "Pressure has dropped over 4 days." },
      { title: "Re-survey Block V-3", reason: "Cloud cover blurred last image." },
    ],
    alerts: [
      { level: "High", title: "Severe stress patch in Block W-2", ago: "1h ago" },
      { level: "Medium", title: "Sprinkler pressure low on Sector 3", ago: "4h ago" },
      { level: "Low", title: "Survey VV-114 completed", ago: "1d ago" },
    ],
    interpretation: [
      "Crop vigor is holding steady. Most blocks are green and growing as expected, but uniformity is dropping.",
      "Block W-2 has a cluster of stressed plants, likely pest-related. Send the field team this week to confirm.",
      "Yield is tracking +2.4% YoY. Fix the irrigation issue on Sector 3 to protect that gain.",
    ],
    kpis: {
      plants: { total: "1,834,560", avgDensity: "2,178 / ha", missing: "27,140" },
      health: { healthyPct: "78.1%", mild: "14.3%", severe: "7.6%", ndvi: "0.69", ndviDelta: "▲ 0.01" },
      growth: { canopy: "62.4%", uniformity: "84.2", variance: "9.1%", stage: "Mid vegetative", canopyDelta: "▲ 1.9 pts" },
      history: { captures12mo: "36", ndviDelta: "+0.02", yieldDelta: "+2.4%", stress: "19" },
    },
  },
  {
    id: "farm-3",
    name: "Farm 3",
    subtitle: "Coastal Pineapple Estate",
    crop: "Pineapple",
    estateType: "Coastal Estate",
    region: "Pontian, Johor",
    established: "2005",
    area: "1,583 ha",
    blocks: 47,
    sectors: 5,
    plants: "3.46M",
    density: "2,212 / ha",
    healthyPct: "91.2%",
    ndvi: "0.81",
    yieldForecast: "68.9 t/ha",
    yieldDelta: "+11.3% YoY",
    totalTonnage: "109,070 t",
    revenue: "RM 178M",
    harvestWindow: "Jul – Sep",
    confidence: "94%",
    soil: "Sandy loam · coastal",
    elevation: "84 m",
    climate: "Tropical humid",
    irrigation: "Drip + fertigation · 98% coverage",
    manager: "Ahmad Ismail",
    coords: "1°N 103°E",
    accent: "olive",
    mapLabel: "Farm 3 · 4 blocks",
    blockRows: [
      { id: "BD-1", area: 56.8, plants: 125600, health: "Healthy", yield: "71.0 t/ha" },
      { id: "BD-2", area: 48.3, plants: 106800, health: "Healthy", yield: "69.8 t/ha" },
      { id: "BD-3", area: 52.1, plants: 115200, health: "Healthy", yield: "70.4 t/ha" },
      { id: "BD-4", area: 41.6, plants: 91900, health: "Mild stress", yield: "62.7 t/ha" },
      { id: "BD-5", area: 49.7, plants: 109800, health: "Healthy", yield: "68.2 t/ha" },
      { id: "BD-6", area: 44.2, plants: 97600, health: "Healthy", yield: "67.5 t/ha" },
    ],
    yearlyYield: [
      { year: "2020", expected: 60, actual: 61, crop: "Pineapple" },
      { year: "2021", expected: 62, actual: 63, crop: "Pineapple" },
      { year: "2022", expected: 63, actual: 64, crop: "Pineapple" },
      { year: "2023", expected: 65, actual: 65, crop: "Pineapple" },
      { year: "2024", expected: 66, actual: 67, crop: "Pineapple" },
      { year: "2025", expected: 67, actual: 68, crop: "Pineapple" },
      { year: "2026", expected: 69, actual: null, crop: "Pineapple" },
    ],
    monthlyBand: [
      { m: "Jun", low: 60, mid: 64, high: 68 }, { m: "Jul", low: 62, mid: 66, high: 70 },
      { m: "Aug", low: 64, mid: 68, high: 72 }, { m: "Sep", low: 66, mid: 70, high: 74 },
      { m: "Oct", low: 64, mid: 68, high: 72 }, { m: "Nov", low: 62, mid: 66, high: 70 },
    ],
    densityByBlock: [
      { block: "BD-1", d: 2212 }, { block: "BD-2", d: 2218 }, { block: "BD-3", d: 2210 },
      { block: "BD-4", d: 2204 }, { block: "BD-5", d: 2220 }, { block: "BD-6", d: 2208 },
      { block: "BD-7", d: 2215 }, { block: "BD-8", d: 2206 },
    ],
    canopy: [
      { wk: "W1", c: 14 }, { wk: "W4", c: 24 }, { wk: "W8", c: 39 }, { wk: "W12", c: 54 },
      { wk: "W16", c: 67 }, { wk: "W20", c: 78 }, { wk: "W24", c: 86 }, { wk: "W28", c: 92 },
    ],
    variance: [
      { block: "BD-1", v: 3.1 }, { block: "BD-2", v: 3.6 }, { block: "BD-3", v: 4.2 },
      { block: "BD-4", v: 7.4 }, { block: "BD-5", v: 3.9 }, { block: "BD-6", v: 4.0 },
    ],
    indexTrend: [
      { d: "May 1", NDVI: 0.76, NDRE: 0.47, SAVI: 0.63 },
      { d: "May 8", NDVI: 0.77, NDRE: 0.48, SAVI: 0.64 },
      { d: "May 15", NDVI: 0.79, NDRE: 0.49, SAVI: 0.66 },
      { d: "May 22", NDVI: 0.80, NDRE: 0.50, SAVI: 0.67 },
      { d: "May 29", NDVI: 0.80, NDRE: 0.50, SAVI: 0.67 },
      { d: "Jun 5", NDVI: 0.81, NDRE: 0.51, SAVI: 0.68 },
    ],
    history: [
      { m: "Jan", NDVI: 0.74, NDRE: 0.46, SAVI: 0.61, Yield: 62 },
      { m: "Feb", NDVI: 0.76, NDRE: 0.47, SAVI: 0.62, Yield: 63 },
      { m: "Mar", NDVI: 0.78, NDRE: 0.48, SAVI: 0.65, Yield: 65 },
      { m: "Apr", NDVI: 0.79, NDRE: 0.49, SAVI: 0.66, Yield: 66 },
      { m: "May", NDVI: 0.80, NDRE: 0.50, SAVI: 0.67, Yield: 67 },
      { m: "Jun", NDVI: 0.81, NDRE: 0.51, SAVI: 0.68, Yield: 69 },
    ],
    captures: [
      { date: "6 Jun 2026", mission: "BD-321", area: "640 ha", ndviChange: "+0.03", remarks: "Fertigation cycle complete" },
      { date: "30 May 2026", mission: "BD-318", area: "1,583 ha", ndviChange: "+0.02", remarks: "Routine full survey" },
      { date: "23 May 2026", mission: "BD-314", area: "980 ha", ndviChange: "+0.01", remarks: "Salinity signature detected in BD-4" },
      { date: "15 May 2026", mission: "BD-309", area: "1,583 ha", ndviChange: "+0.02", remarks: "Clear sky · full coverage" },
    ],
    recommendations: [
      { title: "Pull harvest crew forward to Aug", reason: "Crop ripening 5% ahead of plan." },
      { title: "Reduce fertigation on Sector 1", reason: "Plants are near maximum vigor." },
      { title: "Re-survey Block BD-4", reason: "Salinity signature appearing near shore." },
    ],
    alerts: [
      { level: "High", title: "Salinity stress in Block BD-4", ago: "3h ago" },
      { level: "Medium", title: "Harvest pace ahead of plan", ago: "6h ago" },
      { level: "Low", title: "Fertigation cycle 18 completed", ago: "1d ago" },
    ],
    interpretation: [
      "Farm 3 is performing exceptionally — crop vigor improved steadily over six weeks and is the strongest in the portfolio.",
      "Block BD-4 is the only flag: the corner closest to the sea is showing salt stress. Schedule a closer drone pass this week.",
      "Yield projection (+11.3% YoY) suggests pulling the harvest crew forward to August to avoid packhouse congestion.",
    ],
    kpis: {
      plants: { total: "3,461,290", avgDensity: "2,212 / ha", missing: "9,820" },
      health: { healthyPct: "91.2%", mild: "6.4%", severe: "2.4%", ndvi: "0.81", ndviDelta: "▲ 0.05" },
      growth: { canopy: "82.6%", uniformity: "95.3", variance: "4.4%", stage: "Late vegetative", canopyDelta: "▲ 4.8 pts" },
      history: { captures12mo: "62", ndviDelta: "+0.06", yieldDelta: "+11.3%", stress: "5" },
    },
  },
];

export const FARMS = farms;
export function getFarm(id: FarmId): Farm {
  return farms.find((f) => f.id === id) ?? farms[0];
}

export const ACCOUNT = {
  firstName: "Nishit",
  fullName: "Nishit DB",
  email: "nishit.db@gmail.com",
  role: "Estate Manager",
  initials: "NDB",
};

type Ctx = { farmId: FarmId; setFarmId: (id: FarmId) => void; farm: Farm };
const FarmCtx = createContext<Ctx | null>(null);

export function FarmProvider({ children }: { children: ReactNode }) {
  const [farmId, setFarmIdState] = useState<FarmId>("farm-1");
  useEffect(() => {
    try {
      const v = localStorage.getItem("agritech.farm") as FarmId | null;
      if (v && farms.some((f) => f.id === v)) setFarmIdState(v);
    } catch {}
  }, []);
  const setFarmId = (id: FarmId) => {
    setFarmIdState(id);
    try { localStorage.setItem("agritech.farm", id); } catch {}
  };
  const farm = getFarm(farmId);
  return <FarmCtx.Provider value={{ farmId, setFarmId, farm }}>{children}</FarmCtx.Provider>;
}

export function useFarm(): Ctx {
  const c = useContext(FarmCtx);
  if (!c) throw new Error("useFarm must be used inside FarmProvider");
  return c;
}
