import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/workforce/analytics")({
  head: () => ({ meta: [{ title: "Workforce Analytics — Verdant" }] }),
  component: Page,
});

const prod = [
  { w: "W34", p: 78 }, { w: "W35", p: 82 }, { w: "W36", p: 79 },
  { w: "W37", p: 85 }, { w: "W38", p: 88 }, { w: "W39", p: 87 },
  { w: "W40", p: 90 }, { w: "W41", p: 92 },
];
const completion = [
  { t: "Bravo", c: 96 }, { t: "Alpha", c: 92 }, { t: "Delta", c: 88 },
  { t: "Charlie", c: 81 }, { t: "Science", c: 94 }, { t: "Skyline", c: 90 },
];

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Workforce" title="Workforce Analytics" description="Productivity, attendance and task efficiency across teams and roles." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Productivity index" value="92" hint="this week" delta="▲ 4 pts" />
        <KpiCard label="Tasks / worker / day" value="3.7" hint="rolling 30d" accent="olive" />
        <KpiCard label="On-time completion" value="89.4%" hint="last 30 days" accent="sage" />
        <KpiCard label="Avg overtime" value="42 min" hint="per worker / week" accent="harvest" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 border-border/60 shadow-none">
          <h3 className="font-display text-lg font-semibold">Productivity trend</h3>
          <div className="h-64 mt-3">
            <ResponsiveContainer>
              <AreaChart data={prod}>
                <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--sage-deep)" stopOpacity={0.35}/><stop offset="100%" stopColor="var(--sage-deep)" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="w" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="p" stroke="var(--sage-deep)" strokeWidth={2} fill="url(#pg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6 border-border/60 shadow-none">
          <h3 className="font-display text-lg font-semibold">Task completion rate by team</h3>
          <div className="h-64 mt-3">
            <ResponsiveContainer>
              <BarChart data={completion}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="t" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[60,100]}/>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="c" fill="var(--olive)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
