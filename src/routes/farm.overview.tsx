import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard, FieldMap } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/farm/overview")({
  head: () => ({ meta: [{ title: "Farm Overview — Verdant" }] }),
  component: Page,
});

const blocks = [
  { id: "A-1", area: 42.1, plants: 92340, health: "Healthy", yield: "63.2 t/ha" },
  { id: "A-2", area: 38.5, plants: 84200, health: "Healthy", yield: "61.0 t/ha" },
  { id: "B-1", area: 51.2, plants: 113800, health: "Mild stress", yield: "57.4 t/ha" },
  { id: "B-2", area: 47.8, plants: 105100, health: "Healthy", yield: "60.9 t/ha" },
  { id: "C-3", area: 33.4, plants: 73600, health: "Severe stress", yield: "48.1 t/ha" },
  { id: "C-4", area: 41.7, plants: 91100, health: "Healthy", yield: "62.5 t/ha" },
];

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Farm Intelligence"
        title="Estate La Cordillera"
        description="MD2 Pineapple cultivar · Region IV · established 2009 · 38 blocks across 1,247 hectares."
        actions={<><Button variant="outline" size="sm">Generate report</Button><Button size="sm" className="bg-sage-deep hover:bg-sage-deep/90">Edit metadata</Button></>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total area" value="1,247 ha" hint="38 blocks · 4 sectors" />
        <KpiCard label="Plant population" value="2.74 M" hint="≈ 2,200 plants/ha" accent="olive" />
        <KpiCard label="Healthy canopy" value="86.4%" hint="last imagery 4h ago" accent="sage" delta="▲ 2.1 pts" />
        <KpiCard label="Season forecast" value="61.4 t/ha" hint="91% confidence" accent="harvest" delta="+8.7% YoY" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="p-6 lg:col-span-3 border-border/60 shadow-none">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Estate boundary</h3>
            <Badge variant="outline" className="font-normal">Composite layer</Badge>
          </div>
          <FieldMap className="h-80" overlay="ndvi" label="Cultivated zones · 4 sectors" />
        </Card>

        <Card className="p-6 lg:col-span-2 border-border/60 shadow-none">
          <h3 className="font-display text-lg font-semibold">Estate metadata</h3>
          <dl className="mt-4 divide-y divide-border/60 text-sm">
            {[
              ["Cultivar", "MD2 Gold"], ["Established", "2009"], ["Soil profile", "Volcanic loam"],
              ["Avg elevation", "412 m"], ["Climate zone", "Tropical wet"], ["Irrigation", "Drip · 92% coverage"],
              ["Certifications", "GlobalG.A.P · Rainforest Alliance"], ["Manager", "Maria Castillo"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <Card className="border-border/60 shadow-none">
        <div className="flex items-center justify-between border-b border-border/60 p-5">
          <h3 className="font-display text-lg font-semibold">Block summary</h3>
          <p className="text-xs text-muted-foreground">6 of 38 shown</p>
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
              {blocks.map((b) => (
                <tr key={b.id} className="border-t border-border/60 hover:bg-muted/20">
                  <td className="px-5 py-3 font-medium">{b.id}</td>
                  <td className="px-5 py-3 text-muted-foreground">{b.area} ha</td>
                  <td className="px-5 py-3 text-muted-foreground">{b.plants.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <Badge variant="secondary" className={`border-0 font-normal ${
                      b.health === "Healthy" ? "bg-sage/15 text-sage-deep" :
                      b.health === "Mild stress" ? "bg-harvest/25 text-clay" : "bg-clay/15 text-clay"
                    }`}>{b.health}</Badge>
                  </td>
                  <td className="px-5 py-3 font-medium">{b.yield}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
