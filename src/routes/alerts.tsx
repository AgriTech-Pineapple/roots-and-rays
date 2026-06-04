import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, Bell, Info } from "lucide-react";

export const Route = createFileRoute("/alerts")({
  head: () => ({ meta: [{ title: "Alerts — Verdant" }] }),
  component: Page,
});

const alerts = [
  { lvl: "Critical", title: "Severe stress detected · Block C-3", body: "NDVI dropped 0.18 since last capture. Affects 18.2 ha.", time: "2h ago", source: "AI · imagery" },
  { lvl: "High",    title: "Disease risk · Phytophthora", body: "Conditions favourable in Sectors 2–3. Recommend scout in 48h.", time: "4h ago", source: "Model · climate" },
  { lvl: "High",    title: "Workforce shortage forecast", body: "Wednesday roster shows −12 workers vs harvest schedule.", time: "5h ago", source: "Roster system" },
  { lvl: "Medium",  title: "Yield decline · Block B-1", body: "Projection revised −4.2 t/ha for harvest window.", time: "yesterday", source: "Forecast model" },
  { lvl: "Medium",  title: "Missed survey · Sector 5", body: "No imagery in 12 days. Auto-scheduled for tomorrow 06:00.", time: "yesterday", source: "Operations" },
  { lvl: "Low",     title: "Mission MX-218 completed", body: "412 ha processed. New layers available.", time: "1d ago", source: "Drone Ops" },
  { lvl: "Low",     title: "5 tasks closed today", body: "Bravo team completed harvest sector 3 ahead of schedule.", time: "1d ago", source: "Task system" },
];

const iconFor: Record<string, any> = { Critical: AlertTriangle, High: AlertCircle, Medium: Bell, Low: Info };
const toneFor: Record<string, string> = {
  Critical: "bg-clay/15 text-clay border-clay/30",
  High: "bg-clay/10 text-clay border-clay/20",
  Medium: "bg-harvest/20 text-clay border-harvest/30",
  Low: "bg-sage/15 text-sage-deep border-sage/20",
};

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Operations" title="Alert Center" description="Prioritised events from agronomy models, operations and field reports."
        actions={<><Button variant="outline" size="sm">Configure thresholds</Button><Button size="sm" className="bg-sage-deep hover:bg-sage-deep/90">Mark all read</Button></>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Critical" value="1" accent="clay" />
        <KpiCard label="High" value="2" accent="clay" />
        <KpiCard label="Medium" value="2" accent="harvest" />
        <KpiCard label="Low" value="2" accent="sage" />
      </div>
      <Card className="border-border/60 shadow-none">
        <ul className="divide-y divide-border/60">
          {alerts.map((a) => {
            const Icon = iconFor[a.lvl];
            return (
              <li key={a.title} className="flex gap-4 p-5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${toneFor[a.lvl]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{a.title}</p>
                    <Badge variant="outline" className="font-normal text-[10px]">{a.lvl}</Badge>
                    <span className="text-[11px] text-muted-foreground">· {a.source}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{a.body}</p>
                </div>
                <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground shrink-0">
                  <span>{a.time}</span>
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">Resolve</Button>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
