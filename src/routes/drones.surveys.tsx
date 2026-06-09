import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard, FieldMap } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/drones/surveys")({
  head: () => ({ meta: [{ title: "Survey History — Agritech" }] }),
  component: Page,
});

const surveys = [
  { id: "SV-218", date: "6 Jun 2026", area: "Sector 1 · 412 ha", products: ["NDVI","NDRE","RGB"], type: "Multispectral" },
  { id: "SV-212", date: "30 May 2026", area: "Estate · 1,247 ha", products: ["NDVI","Thermal"], type: "Full survey" },
  { id: "SV-207", date: "22 May 2026", area: "Sectors 2–3 · 830 ha", products: ["NDVI","RGB"], type: "Multispectral" },
  { id: "SV-201", date: "14 May 2026", area: "Estate · 1,247 ha", products: ["NDVI","NDRE","LiDAR"], type: "Combined" },
  { id: "SV-198", date: "8 May 2026", area: "Sector 5 · 312 ha", products: ["Thermal"], type: "Thermal scout" },
];

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Drone Operations" title="Survey History" description="Completed aerial surveys and their resulting orthomosaics and index layers." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Surveys (mo)" value="14" />
        <KpiCard label="Area surveyed" value="6,420 ha" accent="olive" />
        <KpiCard label="Data captured" value="284 GB" accent="sage" />
        <KpiCard label="Datasets" value="42" hint="orthomosaics + indices" accent="harvest" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-1 border-border/60 shadow-none">
          <h3 className="font-display text-lg font-semibold">Coverage map</h3>
          <FieldMap className="h-72 mt-3" overlay="plain" label="Estate · 30-day coverage" />
        </Card>
        <Card className="lg:col-span-2 border-border/60 shadow-none">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-5 py-3 text-left font-medium">Survey</th><th className="px-5 py-3 text-left font-medium">Date</th><th className="px-5 py-3 text-left font-medium">Area</th><th className="px-5 py-3 text-left font-medium">Type</th><th className="px-5 py-3 text-left font-medium">Products</th></tr>
            </thead>
            <tbody>
              {surveys.map((s) => (
                <tr key={s.id} className="border-t border-border/60 hover:bg-muted/20">
                  <td className="px-5 py-3 font-medium">{s.id}</td>
                  <td className="px-5 py-3 text-muted-foreground">{s.date}</td>
                  <td className="px-5 py-3 text-muted-foreground">{s.area}</td>
                  <td className="px-5 py-3">{s.type}</td>
                  <td className="px-5 py-3"><div className="flex flex-wrap gap-1">{s.products.map((p)=><Badge key={p} variant="outline" className="font-normal text-[10px]">{p}</Badge>)}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
