import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard, FieldMap, LegendSwatch } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export const Route = createFileRoute("/farm/health")({
  head: () => ({ meta: [{ title: "Health Analysis — Verdant" }] }),
  component: Page,
});

const trend = [
  { d: "May 1", NDVI: 0.71, NDRE: 0.42, SAVI: 0.58 },
  { d: "May 8", NDVI: 0.73, NDRE: 0.44, SAVI: 0.6 },
  { d: "May 15", NDVI: 0.74, NDRE: 0.45, SAVI: 0.61 },
  { d: "May 22", NDVI: 0.72, NDRE: 0.43, SAVI: 0.59 },
  { d: "May 29", NDVI: 0.75, NDRE: 0.46, SAVI: 0.62 },
  { d: "Jun 5", NDVI: 0.77, NDRE: 0.48, SAVI: 0.64 },
];

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Farm Intelligence" title="Crop Health Analysis" description="Multi-index vegetation analysis from latest drone imagery." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Healthy" value="86.4%" hint="1,077 ha" delta="▲ 2.1 pts" />
        <KpiCard label="Mild stress" value="9.8%" hint="122 ha" accent="harvest" />
        <KpiCard label="Severe stress" value="3.8%" hint="48 ha" accent="clay" />
        <KpiCard label="NDVI mean" value="0.77" hint="last capture" accent="olive" delta="▲ 0.02" />
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
              <FieldMap className="h-80" overlay={k === "savi" ? "ndvi" : k} label={`${k.toUpperCase()} composite · 6 Jun`} />
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="p-6 border-border/60 shadow-none">
        <h3 className="font-display text-lg font-semibold">Index trends</h3>
        <p className="text-xs text-muted-foreground mb-4">6-week rolling means</p>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={trend}>
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
    </div>
  );
}
