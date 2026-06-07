import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard, FieldMap, LegendSwatch } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useFarm } from "@/lib/farms";
import { Lightbulb } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export const Route = createFileRoute("/farm/health")({
  head: () => ({ meta: [{ title: "Health Analysis — Verdant" }] }),
  component: Page,
});

function Page() {
  const { farm } = useFarm();
  return (
    <div className="space-y-8">
      <PageHeader eyebrow={`Farm Intelligence · ${farm.name}`} title="Crop Health Analysis" description="Multi-index vegetation analysis from the latest drone imagery." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Healthy" value={farm.kpis.health.healthyPct} hint="canopy share" delta={farm.kpis.health.ndviDelta} />
        <KpiCard label="Mild stress" value={farm.kpis.health.mild} accent="harvest" />
        <KpiCard label="Severe stress" value={farm.kpis.health.severe} accent="clay" />
        <KpiCard label="NDVI mean" value={farm.kpis.health.ndvi} hint="last capture" accent="olive" delta={farm.kpis.health.ndviDelta} />
      </div>

      <Tabs defaultValue="ndvi" className="space-y-4">
        <TabsList className="bg-muted/40">
          <TabsTrigger value="ndvi">NDVI</TabsTrigger>
          <TabsTrigger value="ndre">NDRE</TabsTrigger>
          <TabsTrigger value="savi">SAVI</TabsTrigger>
        </TabsList>
        {(["ndvi", "ndre", "savi"] as const).map((k) => (
          <TabsContent key={k} value={k}>
            <Card className="p-6 border-border/60 shadow-none">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold uppercase">{k}</h3>
                <LegendSwatch items={[
                  { color: "oklch(0.55 0.16 130)", label: "0.7 – 1.0" },
                  { color: "oklch(0.75 0.14 110)", label: "0.5 – 0.7" },
                  { color: "oklch(0.78 0.12 80)", label: "0.3 – 0.5" },
                  { color: "oklch(0.62 0.15 45)", label: "< 0.3" },
                ]} />
              </div>
              <FieldMap className="h-80" overlay={k === "savi" ? "ndvi" : k} label={`${k.toUpperCase()} composite · ${farm.name}`} />
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 border-border/60 shadow-none">
          <h3 className="font-display text-lg font-semibold">Index trends</h3>
          <p className="text-xs text-muted-foreground mb-4">6-week rolling means</p>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={farm.indexTrend}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="NDVI" stroke="var(--sage-deep)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="NDRE" stroke="var(--olive)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="SAVI" stroke="var(--clay)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 border-border/60 shadow-none">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sage/15 text-sage-deep">
                <Lightbulb className="h-3.5 w-3.5" />
              </div>
              <h3 className="font-display text-lg font-semibold">Interpretation</h3>
            </div>
            <Badge variant="outline" className="font-normal text-[10px]">For {farm.name}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Plain-language reading of the index trends, written for farm owners and managers.</p>
          <div className="space-y-4 text-sm leading-relaxed">
            {farm.interpretation.map((p, i) => (
              <p key={i} className="border-l-2 border-sage/40 pl-3 text-foreground/90">{p}</p>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
