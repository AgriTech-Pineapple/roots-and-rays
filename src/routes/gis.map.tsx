import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { FieldMap, LegendSwatch } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Maximize2, Compass, Search } from "lucide-react";
import { useState } from "react";
import { useFarm } from "@/lib/farms";

export const Route = createFileRoute("/gis/map")({
  head: () => ({ meta: [{ title: "GIS Mapping — Verdant" }] }),
  component: Page,
});

type LayerKey = "composite" | "ndvi" | "ndre" | "health" | "terrain" | "yield";

const layers: { key: LayerKey; label: string; overlay: "ndvi" | "ndre" | "health" | "terrain" | "yield"; legend: { color: string; label: string }[] }[] = [
  { key: "composite", label: "Composite", overlay: "health", legend: [
    { color: "oklch(0.55 0.16 130)", label: "Healthy" },
    { color: "oklch(0.78 0.14 95)", label: "Mild stress" },
    { color: "oklch(0.62 0.16 50)", label: "Severe stress" },
    { color: "oklch(0.7 0.04 100)", label: "Bare ground" },
  ]},
  { key: "ndvi", label: "NDVI", overlay: "ndvi", legend: [
    { color: "oklch(0.55 0.16 130)", label: "0.7 – 1.0" },
    { color: "oklch(0.75 0.14 110)", label: "0.5 – 0.7" },
    { color: "oklch(0.78 0.12 80)", label: "0.3 – 0.5" },
    { color: "oklch(0.62 0.15 45)", label: "< 0.3" },
  ]},
  { key: "ndre", label: "NDRE", overlay: "ndre", legend: [
    { color: "oklch(0.5 0.1 145)", label: "0.5+" },
    { color: "oklch(0.62 0.09 130)", label: "0.35 – 0.5" },
    { color: "oklch(0.75 0.07 110)", label: "< 0.35" },
    { color: "oklch(0.7 0.04 100)", label: "Bare" },
  ]},
  { key: "health", label: "Health", overlay: "health", legend: [
    { color: "oklch(0.55 0.16 130)", label: "Healthy" },
    { color: "oklch(0.78 0.14 95)", label: "Mild stress" },
    { color: "oklch(0.62 0.16 50)", label: "Severe stress" },
    { color: "oklch(0.7 0.04 100)", label: "Bare ground" },
  ]},
  { key: "terrain", label: "Terrain", overlay: "terrain", legend: [
    { color: "oklch(0.65 0.06 80)", label: "Elevation low" },
    { color: "oklch(0.55 0.05 90)", label: "Mid" },
    { color: "oklch(0.45 0.04 100)", label: "High" },
  ]},
  { key: "yield", label: "Yield", overlay: "yield", legend: [
    { color: "oklch(0.78 0.14 90)", label: "> 65 t/ha" },
    { color: "oklch(0.68 0.16 75)", label: "55 – 65" },
    { color: "oklch(0.6 0.15 50)", label: "< 55" },
  ]},
];

function Page() {
  const [active, setActive] = useState<LayerKey>("composite");
  const { farm } = useFarm();
  const layer = layers.find((l) => l.key === active)!;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={`GIS Mapping · ${farm.name}`}
        title="GIS Mapping"
        description="Interactive layered map of the selected estate. Switch layers to inspect vegetation indices, terrain or yield."
        actions={
          <>
            <Button variant="outline" size="sm">Export GeoTIFF</Button>
            <Button size="sm" className="bg-sage-deep hover:bg-sage-deep/90">Compare dates</Button>
          </>
        }
      />

      <div className="flex flex-wrap gap-1 rounded-lg border border-border/60 bg-muted/30 p-1 w-fit">
        {layers.map((l) => (
          <button
            key={l.key}
            onClick={() => setActive(l.key)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              active === l.key ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="space-y-4">
          <Card className="p-4 border-border/60 shadow-none">
            <p className="mb-2 text-sm font-medium">Active layer</p>
            <p className="font-display text-lg font-semibold">{layer.label}</p>
            <p className="text-xs text-muted-foreground mt-1">Showing {farm.name} · last capture 6 Jun 2026.</p>
          </Card>
          <Card className="p-4 border-border/60 shadow-none">
            <p className="mb-2 text-sm font-medium">Opacity</p>
            <Slider defaultValue={[78]} max={100} step={1} />
            <p className="mt-3 mb-2 text-sm font-medium">Date</p>
            <select className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs">
              {farm.captures.slice(0, 3).map((c) => (
                <option key={c.mission}>{c.date} · {c.mission}</option>
              ))}
            </select>
          </Card>
          <Card className="p-4 border-border/60 shadow-none">
            <p className="mb-3 text-sm font-medium">Legend</p>
            <div className="space-y-2">
              {layer.legend.map((l) => (
                <div key={l.label} className="flex items-center gap-2 text-xs">
                  <span className="h-3 w-6 rounded-sm" style={{ background: l.color }} />
                  <span className="text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-0 border-border/60 shadow-none overflow-hidden">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
            <div className="relative max-w-xs">
              <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Find block, coordinate…" className="h-8 w-56 rounded-md border border-input bg-muted/30 pl-7 pr-2 text-xs" />
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Compass className="h-3.5 w-3.5" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Maximize2 className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
          <FieldMap className="h-[560px] rounded-none border-0" overlay={layer.overlay} label={`${layer.label} · ${farm.name}`} />
          <div className="border-t border-border/60 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>EPSG:4326 · WGS 84</span>
            <LegendSwatch items={layer.legend.slice(0, 4)} />
            <span>Cursor {farm.coords}</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
