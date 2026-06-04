import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard, FieldMap } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export const Route = createFileRoute("/farm/plants")({
  head: () => ({ meta: [{ title: "Plant Count — Verdant" }] }),
  component: Page,
});

const density = [
  { block: "A-1", d: 2192 }, { block: "A-2", d: 2186 }, { block: "B-1", d: 2222 },
  { block: "B-2", d: 2198 }, { block: "C-3", d: 2089 }, { block: "C-4", d: 2184 },
  { block: "D-1", d: 2210 }, { block: "D-2", d: 2174 },
];

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Farm Intelligence" title="Plant Count Analysis" description="AI-detected pineapple plant population, density and replanting opportunities." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total plants" value="2,743,118" hint="estate-wide" />
        <KpiCard label="Avg density" value="2,194 / ha" hint="target 2,200" accent="olive" />
        <KpiCard label="Missing plants" value="18,402" hint="0.67% of expected" accent="harvest" />
        <KpiCard label="Replant opportunities" value="2,140" hint="across 14 blocks" accent="clay" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2 border-border/60 shadow-none">
          <h3 className="font-display text-lg font-semibold">Density by block</h3>
          <p className="text-xs text-muted-foreground mb-4">Plants per hectare — target 2,200</p>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={density}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="block" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[2000, 2300]} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="d" fill="var(--olive)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6 border-border/60 shadow-none">
          <h3 className="font-display text-lg font-semibold">Detected gaps</h3>
          <FieldMap className="h-64 mt-3" overlay="plain" label="Missing-plant clusters" />
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex justify-between"><span>Block C-3 north</span><span className="text-muted-foreground">812 gaps</span></li>
            <li className="flex justify-between"><span>Block B-1 east</span><span className="text-muted-foreground">514 gaps</span></li>
            <li className="flex justify-between"><span>Block D-2 strip</span><span className="text-muted-foreground">298 gaps</span></li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
