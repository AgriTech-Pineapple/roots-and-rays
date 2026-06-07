import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard, FieldMap } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useFarm } from "@/lib/farms";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/farm/overview")({
  head: () => ({ meta: [{ title: "Farm Overview — Verdant" }] }),
  component: Page,
});

function Page() {
  const { farm } = useFarm();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Farm Intelligence"
        title={farm.name}
        description={`${farm.subtitle} · ${farm.cultivar} · established ${farm.established} · ${farm.blocks} blocks across ${farm.area}.`}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => navigate({ to: "/" })}>
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Change Farm
            </Button>
            <Button variant="outline" size="sm">Generate report</Button>
            <Button size="sm" className="bg-sage-deep hover:bg-sage-deep/90">Edit metadata</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total area" value={farm.area} hint={`${farm.blocks} blocks · ${farm.sectors} sectors`} />
        <KpiCard label="Plant population" value={farm.plants} hint={`≈ ${farm.density}`} accent="olive" />
        <KpiCard label="Healthy canopy" value={farm.healthyPct} hint="last imagery 4h ago" accent="sage" delta={farm.kpis.health.ndviDelta} />
        <KpiCard label="Yield Prediction" value={farm.yieldForecast} hint={`${farm.confidence} confidence`} accent="harvest" delta={farm.yieldDelta} />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="p-6 lg:col-span-3 border-border/60 shadow-none">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Estate boundary</h3>
            <Badge variant="outline" className="font-normal">Composite layer</Badge>
          </div>
          <FieldMap className="h-80" overlay={farm.accent === "sage" ? "health" : farm.accent === "olive" ? "ndvi" : "ndre"} label={farm.mapLabel} />
        </Card>

        <Card className="p-6 lg:col-span-2 border-border/60 shadow-none">
          <h3 className="font-display text-lg font-semibold">Estate metadata</h3>
          <dl className="mt-4 divide-y divide-border/60 text-sm">
            {[
              ["Cultivar", farm.cultivar], ["Established", farm.established], ["Soil profile", farm.soil],
              ["Avg elevation", farm.elevation], ["Climate zone", farm.climate], ["Irrigation", farm.irrigation],
              ["Certifications", farm.certs], ["Manager", farm.manager],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <Card className="p-6 border-border/60 shadow-none">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">Yield prediction</h3>
            <p className="text-xs text-muted-foreground">Projected tonnage trajectory · {farm.confidence} model confidence</p>
          </div>
          <Badge variant="secondary" className="bg-sage/15 text-sage-deep border-0">{farm.yieldDelta}</Badge>
        </div>
        <div className="h-64">
          <ResponsiveContainer>
            <AreaChart data={farm.weeklyYield}>
              <defs>
                <linearGradient id="ovg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--sage-deep)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--sage-deep)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="w" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="y" stroke="var(--sage-deep)" strokeWidth={2} fill="url(#ovg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="border-border/60 shadow-none">
        <div className="flex items-center justify-between border-b border-border/60 p-5">
          <h3 className="font-display text-lg font-semibold">Block parameters</h3>
          <p className="text-xs text-muted-foreground">{farm.blockRows.length} of {farm.blocks} shown</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Block</th>
                <th className="px-5 py-3 text-left font-medium">Area</th>
                <th className="px-5 py-3 text-left font-medium">Plants</th>
                <th className="px-5 py-3 text-left font-medium">Health</th>
                <th className="px-5 py-3 text-left font-medium">Yield forecast</th>
              </tr>
            </thead>
            <tbody>
              {farm.blockRows.map((b) => (
                <tr key={b.id} className="border-t border-border/60 hover:bg-muted/20">
                  <td className="px-5 py-3 font-medium">{b.id}</td>
                  <td className="px-5 py-3 tabular-nums text-muted-foreground">{b.area} ha</td>
                  <td className="px-5 py-3 tabular-nums text-muted-foreground">{b.plants.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <Badge variant="secondary" className={`border-0 font-normal ${
                      b.health === "Healthy" ? "bg-sage/15 text-sage-deep" :
                      b.health === "Mild stress" ? "bg-harvest/25 text-clay" : "bg-clay/15 text-clay"
                    }`}>{b.health}</Badge>
                  </td>
                  <td className="px-5 py-3 font-medium tabular-nums">{b.yield}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
