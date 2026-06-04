import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/workforce/tasks")({
  head: () => ({ meta: [{ title: "Task Assignments — Verdant" }] }),
  component: Page,
});

const tasks = [
  { id: "T-2148", title: "Harvest Block A-2 sector 3", team: "Bravo", lead: "A. Tan", due: "Today 17:00", progress: 72, status: "In Progress" },
  { id: "T-2151", title: "Foliar feed Block B-1", team: "Charlie", lead: "P. Ocampo", due: "Fri 09:00", progress: 0, status: "Not Started" },
  { id: "T-2143", title: "Drip line inspection Block C-3", team: "Charlie", lead: "P. Ocampo", due: "Yesterday", progress: 40, status: "Overdue" },
  { id: "T-2138", title: "Replanting · Block D-1 north", team: "Delta", lead: "I. Cruz", due: "Mon 14:00", progress: 100, status: "Completed" },
  { id: "T-2156", title: "Drone survey · Sector 5", team: "Skyline", lead: "D. Mariano", due: "Today 06:30", progress: 100, status: "Completed" },
  { id: "T-2160", title: "Soil moisture sampling", team: "Science", lead: "L. Santos", due: "Wed 11:00", progress: 25, status: "In Progress" },
];

const statusTone: Record<string, string> = {
  "Not Started": "bg-muted text-muted-foreground",
  "In Progress": "bg-harvest/25 text-clay",
  "Completed": "bg-sage/15 text-sage-deep",
  "Overdue": "bg-clay/15 text-clay",
};

function Page() {
  const counts = tasks.reduce<Record<string, number>>((acc, t) => ({ ...acc, [t.status]: (acc[t.status] || 0) + 1 }), {});
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Workforce" title="Task Assignments" description="Active and upcoming work assignments across teams and blocks."
        actions={<Button size="sm" className="bg-sage-deep hover:bg-sage-deep/90">Assign task</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Not started" value={String(counts["Not Started"] || 0)} hint="awaiting kickoff" />
        <KpiCard label="In progress" value={String(counts["In Progress"] || 0)} hint="active" accent="harvest" />
        <KpiCard label="Completed today" value={String(counts["Completed"] || 0)} accent="sage" />
        <KpiCard label="Overdue" value={String(counts["Overdue"] || 0)} hint="needs attention" accent="clay" />
      </div>
      <Card className="border-border/60 shadow-none">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Task</th>
              <th className="px-5 py-3 text-left font-medium">Team</th>
              <th className="px-5 py-3 text-left font-medium">Due</th>
              <th className="px-5 py-3 text-left font-medium">Progress</th>
              <th className="px-5 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id} className="border-t border-border/60 hover:bg-muted/20">
                <td className="px-5 py-3">
                  <p className="font-medium">{t.title}</p>
                  <p className="text-[11px] text-muted-foreground">{t.id} · lead {t.lead}</p>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{t.team}</td>
                <td className="px-5 py-3 text-muted-foreground">{t.due}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-sage-deep" style={{ width: `${t.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{t.progress}%</span>
                  </div>
                </td>
                <td className="px-5 py-3"><Badge variant="secondary" className={`border-0 font-normal ${statusTone[t.status]}`}>{t.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
