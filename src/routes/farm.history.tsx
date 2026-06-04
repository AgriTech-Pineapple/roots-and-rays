import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard, FieldMap } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

export const Route = createFileRoute("/farm/history")({
  head: () => ({ meta: [{ title: "Historical Monitoring — Verdant" }] }),
  component: Page,
});

const series = [
  { m: "Jan", h: 0.71, y: 56 }, { m: "Feb", h: 0.72, y: 57 }, { m: "Mar", h: 0.74, y: 58 },
  { m: "Apr", h: 0.73, y: 58 }, { m: "May", h: 0.75, y: 60 }, { m: "Jun", h: 0.77, y: 61 },
];

const captures = [
  { date: "6 Jun 2026", mission: "MX-218", area: "412 ha", change: "+0.02 NDVI" },
  { date: "30 May 2026", mission: "MX-212", area: "1,247 ha", change: "+0.01 NDVI" },
  { date: "22 May 2026", mission: "MX-207", area: "830 ha", change: "−0.01 NDVI" },
  { date: "14 May 2026", mission: "MX-201", area: "1,247 ha", change: "+0.03 NDVI" },
];

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Farm Intelligence" title="Historical Monitoring" description="Long-range trends and change detection across imagery captures." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Captures (12 mo)" value="48" hint="3.8 / month avg" />
        <KpiCard label="NDVI Δ vs 2024" value="+0.04" hint="estate mean" accent="olive" delta="Improving" />
        <KpiCard label="Yield Δ vs 2024" value="+8.7%" hint="t/ha" accent="harvest" />
        <KpiCard label="Stress events" value="11" hint="last 6 months" accent="clay" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2 border-border/60 shadow-none">
          <h3 className="font-display text-lg font-semibold">6-month trends</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={series}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis yAxisId="l" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis yAxisId="r" orientation="right" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line yAxisId="l" type="monotone" dataKey="h" name="NDVI" stroke="var(--sage-deep)" strokeWidth={2} />
                <Line yAxisId="r" type="monotone" dataKey="y" name="Yield t/ha" stroke="var(--clay)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6 border-border/60 shadow-none">
          <h3 className="font-display text-lg font-semibold">Change detection</h3>
          <FieldMap className="h-64 mt-3" overlay="health" label="Δ vs prior capture" />
        </Card>
      </div>
      <Card className="border-border/60 shadow-none">
        <div className="border-b border-border/60 p-5"><h3 className="font-display text-lg font-semibold">Recent captures</h3></div>
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-5 py-3 text-left font-medium">Date</th><th className="px-5 py-3 text-left font-medium">Mission</th><th className="px-5 py-3 text-left font-medium">Coverage</th><th className="px-5 py-3 text-left font-medium">Change</th></tr>
          </thead>
          <tbody>
            {captures.map((c) => (
              <tr key={c.mission} className="border-t border-border/60 hover:bg-muted/20">
                <td className="px-5 py-3">{c.date}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.mission}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.area}</td>
                <td className="px-5 py-3 font-medium">{c.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
