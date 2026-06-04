import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/farm/growth")({
  head: () => ({ meta: [{ title: "Growth Analysis — Verdant" }] }),
  component: Page,
});

const canopy = [
  { wk: "W1", c: 12 }, { wk: "W4", c: 21 }, { wk: "W8", c: 34 }, { wk: "W12", c: 48 },
  { wk: "W16", c: 61 }, { wk: "W20", c: 72 }, { wk: "W24", c: 81 }, { wk: "W28", c: 88 },
];
const variance = [
  { block: "A-1", v: 4.2 }, { block: "A-2", v: 5.0 }, { block: "B-1", v: 9.3 },
  { block: "B-2", v: 6.1 }, { block: "C-3", v: 12.7 }, { block: "C-4", v: 5.4 },
];

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Farm Intelligence" title="Growth Analysis" description="Canopy distribution, uniformity and variance across cultivated blocks." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Avg canopy cover" value="74.2%" hint="estate-wide" delta="▲ 3.4 pts" />
        <KpiCard label="Growth uniformity" value="91.7" hint="index 0–100" accent="olive" />
        <KpiCard label="Mean variance" value="6.8%" hint="block-to-block" accent="harvest" />
        <KpiCard label="Stage" value="Vegetative" hint="week 28 of 52" accent="sage" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 border-border/60 shadow-none">
          <h3 className="font-display text-lg font-semibold">Canopy cover progression</h3>
          <p className="text-xs text-muted-foreground mb-4">Cumulative % cover this season</p>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={canopy}>
                <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--olive)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--olive)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="wk" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="c" stroke="var(--olive)" strokeWidth={2} fill="url(#cg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6 border-border/60 shadow-none">
          <h3 className="font-display text-lg font-semibold">Variance by block</h3>
          <p className="text-xs text-muted-foreground mb-4">Higher = less uniform growth</p>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={variance}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="block" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="v" fill="var(--clay)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
