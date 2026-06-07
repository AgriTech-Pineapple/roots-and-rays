import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type FarmId = "la-cordillera" | "valle-verde" | "bahia-dorada";

export type Farm = {
  id: FarmId;
  name: string;
  subtitle: string;
  cultivar: string;
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
  certs: string;
  manager: string;
  coords: string;
  accent: "sage" | "olive" | "harvest";
  // distinct visual hint for map
  mapLabel: string;
  blockRows: { id: string; area: number; plants: number; health: string; yield: string }[];
  weeklyYield: { w: string; y: number }[];
  yieldBand: { w: string; low: number; mid: number; high: number }[];
  densityByBlock: { block: string; d: number }[];
  canopy: { wk: string; c: number }[];
  variance: { block: string; v: number }[];
  indexTrend: { d: string; NDVI: number; NDRE: number; SAVI: number }[];
  history: { m: string; h: number; y: number }[];
  captures: { date: string; mission: string; area: string; change: string }[];
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
    id: "la-cordillera",
    name: "Estate La Cordillera",
    subtitle: "Highland MD2 estate · Region IV",
    cultivar: "MD2 Gold",
    region: "Region IV-A, Cordillera",
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
    revenue: "$28.4M",
    harvestWindow: "Wk 38–46",
    confidence: "91%",
    soil: "Volcanic loam",
    elevation: "412 m",
    climate: "Tropical wet",
    irrigation: "Drip · 92% coverage",
    certs: "GlobalG.A.P · Rainforest Alliance",
    manager: "Maria Castillo",
    coords: "18°N 121°E",
    accent: "sage",
    mapLabel: "La Cordillera · 4 sectors",
    blockRows: [
      { id: "A-1", area: 42.1, plants: 92340, health: "Healthy", yield: "63.2 t/ha" },
      { id: "A-2", area: 38.5, plants: 84200, health: "Healthy", yield: "61.0 t/ha" },
      { id: "B-1", area: 51.2, plants: 113800, health: "Mild stress", yield: "57.4 t/ha" },
      { id: "B-2", area: 47.8, plants: 105100, health: "Healthy", yield: "60.9 t/ha" },
      { id: "C-3", area: 33.4, plants: 73600, health: "Severe stress", yield: "48.1 t/ha" },
      { id: "C-4", area: 41.7, plants: 91100, health: "Healthy", yield: "62.5 t/ha" },
    ],
    weeklyYield: [
      { w: "W34", y: 42 }, { w: "W35", y: 45 }, { w: "W36", y: 47 },
      { w: "W37", y: 49 }, { w: "W38", y: 52 }, { w: "W39", y: 55 },
      { w: "W40", y: 58 }, { w: "W41", y: 61 },
    ],
    yieldBand: Array.from({ length: 12 }, (_, i) => ({ w: `W${30 + i}`, low: 52 + i * 0.6, mid: 56 + i * 0.7, high: 60 + i * 0.8 })),
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
      { m: "Jan", h: 0.71, y: 56 }, { m: "Feb", h: 0.72, y: 57 }, { m: "Mar", h: 0.74, y: 58 },
      { m: "Apr", h: 0.73, y: 58 }, { m: "May", h: 0.75, y: 60 }, { m: "Jun", h: 0.77, y: 61 },
    ],
    captures: [
      { date: "6 Jun 2026", mission: "MX-218", area: "412 ha", change: "+0.02 NDVI" },
      { date: "30 May 2026", mission: "MX-212", area: "1,247 ha", change: "+0.01 NDVI" },
      { date: "22 May 2026", mission: "MX-207", area: "830 ha", change: "−0.01 NDVI" },
      { date: "14 May 2026", mission: "MX-201", area: "1,247 ha", change: "+0.03 NDVI" },
    ],
    recommendations: [
      { title: "Reduce irrigation on Block C-3", reason: "Soil moisture 18% above target after recent rainfall." },
      { title: "Schedule foliar feed for Block B-1", reason: "NDRE trending downward over past 9 days." },
      { title: "Deploy survey drone to Sector 5", reason: "Last imagery captured 12 days ago." },
    ],
    alerts: [
      { level: "High", title: "Severe stress detected in Block C-3", ago: "2h ago" },
      { level: "Medium", title: "Foliar feed recommended for B-1", ago: "5h ago" },
      { level: "Low", title: "Mission MX-218 completed successfully", ago: "1d ago" },
    ],
    interpretation: [
      "Canopy vigor is improving across the northern blocks (A-1, A-2), with NDVI climbing 0.04 points over six weeks — consistent with the recent foliar program.",
      "However, Block C-3 continues to show moisture stress: NDRE is trailing the estate average by 0.06 and SAVI confirms thinning canopy. A field inspection within 48 hours is recommended.",
      "Overall the estate is on track for the +8.7% YoY yield projection. Keep irrigation flat through Wk 41 and re-evaluate after the next capture.",
    ],
    kpis: {
      plants: { total: "2,743,118", avgDensity: "2,194 / ha", missing: "18,402" },
      health: { healthyPct: "86.4%", mild: "9.8%", severe: "3.8%", ndvi: "0.77", ndviDelta: "▲ 0.02" },
      growth: { canopy: "74.2%", uniformity: "91.7", variance: "6.8%", stage: "Vegetative", canopyDelta: "▲ 3.4 pts" },
      history: { captures12mo: "48", ndviDelta: "+0.04", yieldDelta: "+8.7%", stress: "11" },
    },
  },
  {
    id: "valle-verde",
    name: "Hacienda Valle Verde",
    subtitle: "Mid-elevation MD2 · Region III",
    cultivar: "MD2 Gold",
    region: "Region III, Central Valley",
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
    revenue: "$17.1M",
    harvestWindow: "Wk 40–48",
    confidence: "84%",
    soil: "Alluvial clay-loam",
    elevation: "218 m",
    climate: "Tropical seasonal",
    irrigation: "Sprinkler · 68% coverage",
    certs: "GlobalG.A.P",
    manager: "Andres Pineda",
    coords: "16°N 120°E",
    accent: "harvest",
    mapLabel: "Valle Verde · 3 sectors",
    blockRows: [
      { id: "V-1", area: 36.4, plants: 79100, health: "Healthy", yield: "57.2 t/ha" },
      { id: "V-2", area: 31.8, plants: 68900, health: "Mild stress", yield: "52.0 t/ha" },
      { id: "V-3", area: 44.2, plants: 95800, health: "Mild stress", yield: "50.8 t/ha" },
      { id: "W-1", area: 28.6, plants: 62200, health: "Healthy", yield: "56.1 t/ha" },
      { id: "W-2", area: 39.1, plants: 84500, health: "Severe stress", yield: "44.6 t/ha" },
      { id: "W-3", area: 33.7, plants: 73100, health: "Healthy", yield: "55.3 t/ha" },
    ],
    weeklyYield: [
      { w: "W34", y: 36 }, { w: "W35", y: 38 }, { w: "W36", y: 40 },
      { w: "W37", y: 43 }, { w: "W38", y: 46 }, { w: "W39", y: 49 },
      { w: "W40", y: 52 }, { w: "W41", y: 54 },
    ],
    yieldBand: Array.from({ length: 12 }, (_, i) => ({ w: `W${30 + i}`, low: 44 + i * 0.5, mid: 48 + i * 0.6, high: 52 + i * 0.7 })),
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
      { d: "May 29", NDVI: 0.68, NDRE: 0.38, SAVI: 0.54 },
      { d: "Jun 5", NDVI: 0.69, NDRE: 0.40, SAVI: 0.55 },
    ],
    history: [
      { m: "Jan", h: 0.64, y: 49 }, { m: "Feb", h: 0.65, y: 50 }, { m: "Mar", h: 0.67, y: 51 },
      { m: "Apr", h: 0.66, y: 51 }, { m: "May", h: 0.68, y: 53 }, { m: "Jun", h: 0.69, y: 54 },
    ],
    captures: [
      { date: "5 Jun 2026", mission: "VV-104", area: "320 ha", change: "+0.01 NDVI" },
      { date: "29 May 2026", mission: "VV-101", area: "842 ha", change: "−0.01 NDVI" },
      { date: "21 May 2026", mission: "VV-098", area: "612 ha", change: "+0.02 NDVI" },
      { date: "12 May 2026", mission: "VV-091", area: "842 ha", change: "+0.01 NDVI" },
    ],
    recommendations: [
      { title: "Inspect Block W-2 for mealybug wilt", reason: "Cluster of severe-stress pixels in the south-west corner." },
      { title: "Expand sprinkler coverage in Sector 3", reason: "Irrigation reaches only 54% of W-series blocks." },
      { title: "Bring forward Wk 40 scouting walk", reason: "Mild stress is widening across V-2 and V-3." },
    ],
    alerts: [
      { level: "High", title: "Severe stress patch in Block W-2", ago: "1h ago" },
      { level: "Medium", title: "Sprinkler pressure low on Sector 3 line", ago: "4h ago" },
      { level: "Low", title: "VV-104 survey completed", ago: "1d ago" },
    ],
    interpretation: [
      "Health indices are flat: NDVI gained only 0.03 in six weeks, well below the La Cordillera benchmark. The estate is healthy on average, but uniformity is the issue.",
      "Block W-2 is the main concern — severe-stress signature is consistent with mealybug wilt. Recommend an on-foot scouting walk this week and isolate the affected rows before insecticide application.",
      "Expected season yield (54.8 t/ha) is on plan, but upside depends on resolving the W-series stress quickly. Sprinkler coverage upgrades would lift Sector 3 by an estimated 2–3 t/ha next cycle.",
    ],
    kpis: {
      plants: { total: "1,834,602", avgDensity: "2,178 / ha", missing: "24,810" },
      health: { healthyPct: "78.1%", mild: "14.6%", severe: "7.3%", ndvi: "0.69", ndviDelta: "▲ 0.01" },
      growth: { canopy: "63.4%", uniformity: "84.2", variance: "9.6%", stage: "Vegetative", canopyDelta: "▲ 1.8 pts" },
      history: { captures12mo: "36", ndviDelta: "+0.02", yieldDelta: "+2.4%", stress: "19" },
    },
  },
  {
    id: "bahia-dorada",
    name: "Plantación Bahía Dorada",
    subtitle: "Coastal high-yield estate · Region V",
    cultivar: "MD2 Gold · Sugarloaf trial",
    region: "Region V, Coastal Bahía",
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
    revenue: "$41.6M",
    harvestWindow: "Wk 36–44",
    confidence: "94%",
    soil: "Sandy loam · coastal",
    elevation: "84 m",
    climate: "Tropical humid",
    irrigation: "Drip + fertigation · 98% coverage",
    certs: "GlobalG.A.P · Rainforest Alliance · Fair Trade",
    manager: "Lucía Mendez",
    coords: "14°N 122°E",
    accent: "olive",
    mapLabel: "Bahía Dorada · 5 sectors",
    blockRows: [
      { id: "BD-1", area: 56.8, plants: 125600, health: "Healthy", yield: "71.0 t/ha" },
      { id: "BD-2", area: 48.3, plants: 106800, health: "Healthy", yield: "69.8 t/ha" },
      { id: "BD-3", area: 52.1, plants: 115200, health: "Healthy", yield: "70.4 t/ha" },
      { id: "BD-4", area: 41.6, plants: 91900, health: "Mild stress", yield: "62.7 t/ha" },
      { id: "BD-5", area: 49.7, plants: 109800, health: "Healthy", yield: "68.2 t/ha" },
      { id: "BD-6", area: 44.2, plants: 97600, health: "Healthy", yield: "67.5 t/ha" },
    ],
    weeklyYield: [
      { w: "W34", y: 48 }, { w: "W35", y: 51 }, { w: "W36", y: 54 },
      { w: "W37", y: 57 }, { w: "W38", y: 60 }, { w: "W39", y: 63 },
      { w: "W40", y: 66 }, { w: "W41", y: 69 },
    ],
    yieldBand: Array.from({ length: 12 }, (_, i) => ({ w: `W${30 + i}`, low: 60 + i * 0.7, mid: 64 + i * 0.8, high: 68 + i * 0.9 })),
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
      { m: "Jan", h: 0.74, y: 62 }, { m: "Feb", h: 0.76, y: 63 }, { m: "Mar", h: 0.78, y: 65 },
      { m: "Apr", h: 0.79, y: 66 }, { m: "May", h: 0.80, y: 67 }, { m: "Jun", h: 0.81, y: 69 },
    ],
    captures: [
      { date: "6 Jun 2026", mission: "BD-321", area: "640 ha", change: "+0.03 NDVI" },
      { date: "30 May 2026", mission: "BD-318", area: "1,583 ha", change: "+0.02 NDVI" },
      { date: "23 May 2026", mission: "BD-314", area: "980 ha", change: "+0.01 NDVI" },
      { date: "15 May 2026", mission: "BD-309", area: "1,583 ha", change: "+0.02 NDVI" },
    ],
    recommendations: [
      { title: "Lock in early harvest crew for Wk 36", reason: "Yield is tracking 5% ahead of plan — peak window pulled forward." },
      { title: "Begin fertigation taper on Sector 1", reason: "NDRE is saturating; nitrogen demand is dropping." },
      { title: "Survey Block BD-4 with multispectral", reason: "Only block showing salinity-pattern stress." },
    ],
    alerts: [
      { level: "Medium", title: "Salinity signature emerging in Block BD-4", ago: "3h ago" },
      { level: "Low", title: "Fertigation cycle 18 completed", ago: "6h ago" },
      { level: "Low", title: "BD-321 multispectral survey completed", ago: "1d ago" },
    ],
    interpretation: [
      "Bahía Dorada is performing exceptionally — NDVI climbed from 0.76 to 0.81 in six weeks, putting the estate at the top of the portfolio for vegetation vigor.",
      "Only Block BD-4 is flagged: a salinity-pattern stress is appearing in the seaward corner. Move a multispectral pass forward by a week so the agronomy team can confirm before flowering.",
      "Yield projection (+11.3% YoY) suggests pulling the harvest crew forward to Wk 36 to avoid logistics congestion at the packhouse.",
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

type Ctx = { farmId: FarmId; setFarmId: (id: FarmId) => void; farm: Farm };
const FarmCtx = createContext<Ctx | null>(null);

export function FarmProvider({ children }: { children: ReactNode }) {
  const [farmId, setFarmIdState] = useState<FarmId>("la-cordillera");
  useEffect(() => {
    try {
      const v = localStorage.getItem("verdant.farm") as FarmId | null;
      if (v && farms.some((f) => f.id === v)) setFarmIdState(v);
    } catch {}
  }, []);
  const setFarmId = (id: FarmId) => {
    setFarmIdState(id);
    try { localStorage.setItem("verdant.farm", id); } catch {}
  };
  const farm = getFarm(farmId);
  return <FarmCtx.Provider value={{ farmId, setFarmId, farm }}>{children}</FarmCtx.Provider>;
}

export function useFarm(): Ctx {
  const c = useContext(FarmCtx);
  if (!c) throw new Error("useFarm must be used inside FarmProvider");
  return c;
}
