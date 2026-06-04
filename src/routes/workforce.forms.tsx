import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ClipboardList, Droplets, Bug, Plane, Wheat, Sprout, Plus } from "lucide-react";

export const Route = createFileRoute("/workforce/forms")({
  head: () => ({ meta: [{ title: "Task Forms — Verdant" }] }),
  component: Page,
});

const forms = [
  { name: "Planting Record", icon: Sprout, fields: 11, used: 142, updated: "2d ago" },
  { name: "Irrigation Log", icon: Droplets, fields: 8, used: 318, updated: "1d ago" },
  { name: "Fertilizer Application", icon: Wheat, fields: 14, used: 96, updated: "3d ago" },
  { name: "Disease Inspection", icon: Bug, fields: 16, used: 64, updated: "5d ago" },
  { name: "Drone Survey", icon: Plane, fields: 9, used: 48, updated: "today" },
  { name: "Harvest Record", icon: ClipboardList, fields: 12, used: 210, updated: "today" },
];

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Workforce"
        title="Task Forms"
        description="Reusable mobile-first forms collected from the field. Build, version and assign workflows."
        actions={<Button size="sm" className="bg-sage-deep hover:bg-sage-deep/90"><Plus className="mr-1.5 h-3.5 w-3.5" />New form</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {forms.map((f) => (
          <Card key={f.name} className="p-5 border-border/60 shadow-none group cursor-pointer transition hover:border-sage/40">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage/15 text-sage-deep">
                <f.icon className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="font-normal text-[10px]">v1.4</Badge>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{f.name}</h3>
            <p className="text-xs text-muted-foreground">{f.fields} fields · updated {f.updated}</p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{f.used} submissions</span>
              <span className="text-sage-deep group-hover:underline">View →</span>
            </div>
          </Card>
        ))}
      </div>
      <Card className="p-6 border-border/60 shadow-none">
        <div className="flex items-center gap-2 text-sm font-medium"><FileText className="h-4 w-4" /> Recent submissions</div>
        <ul className="mt-3 divide-y divide-border/60 text-sm">
          {[
            ["Harvest Record · Block A-2", "M. Delgado", "12 min ago"],
            ["Drone Survey · MX-218", "D. Mariano", "2h ago"],
            ["Irrigation Log · Block B-1", "P. Ocampo", "4h ago"],
            ["Disease Inspection · Block C-3", "L. Santos", "yesterday"],
          ].map(([t, w, ago]) => (
            <li key={t} className="flex items-center justify-between py-3">
              <div><p className="font-medium">{t}</p><p className="text-xs text-muted-foreground">by {w}</p></div>
              <span className="text-xs text-muted-foreground">{ago}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
