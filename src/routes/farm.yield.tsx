import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/farm/yield")({
  head: () => ({ meta: [{ title: "Yield Forecast — Verdant" }] }),
  component: Page,
});

const weekly = Array.from({ length: 12 }, (_, i) => ({
  w: `W${30 + i}`, low: 52 + i * 0.6, mid: 56 + i * 0.7, high: 60 + i * 0.8,
}));

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Farm Intelligence" title="Yield Forecast" description="AI-driven projections for the 2024/25 harvest window." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Season forecast" value="61.4 t/ha" hint="91% model confidence" delta="+8.7% YoY" />
        <KpiCard label="Total tonnage" value="76,570 t" hint="estate-wide" accent="olive" />
        <KpiCard label="Harvest window" value="Wk 38–46" hint="9-week peak" accent="harvest" />
        <KpiCard label="Revenue projection" value="$28.4 M" hint="@ market spot" accent="clay" />
      </div>
      <Card className="p-6 border-border/60 shadow-none">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">12-week forecast band</h3>
            <p className="text-xs text-muted-foreground">Lower / expected / upper bound — tonnes per hectare</p>
          </div>
          <Badge variant="outline" className="font-normal">Updated 2h ago</Badge>
        </div>
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={weekly}>
              <defs>
                <linearGradient id="bd" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--sage)" stopOpacity={0.35} /><stop offset="100%" stopColor="var(--sage)" stopOpacity={0.05} /></linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="w" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="high" stroke="none" fill="url(#bd)" stackId="1" />
              <Area type="monotone" dataKey="mid" stroke="var(--sage-deep)" strokeWidth={2} fill="none" />
              <Area type="monotone" dataKey="low" stroke="none" fill="var(--background)" stackId="2" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { t: "Weekly", v: "1,420 t", h: "Avg next 4 weeks" },
          { t: "Monthly", v: "6,080 t", h: "Forecast for July" },
          { t: "Seasonal", v: "76,570 t", h: "Total 2024/25 yield" },
        ].map((x) => (
          <Card key={x.t} className="p-5 border-border/60 shadow-none">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{x.t} projection</p>
            <p className="mt-1 font-display text-2xl font-semibold">{x.v}</p>
            <p className="text-xs text-muted-foreground">{x.h}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
