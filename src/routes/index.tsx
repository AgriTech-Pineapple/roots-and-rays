import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard, FieldMap } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sprout, Leaf, Users, Plane, ArrowUpRight, AlertCircle, TrendingUp, Droplets } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard — Verdant" }, { name: "description", content: "Executive command center for plantation operations." }] }),
  component: Dashboard,
});

const yieldTrend = [
  { w: "W34", y: 42 }, { w: "W35", y: 45 }, { w: "W36", y: 47 },
  { w: "W37", y: 49 }, { w: "W38", y: 52 }, { w: "W39", y: 55 },
  { w: "W40", y: 58 }, { w: "W41", y: 61 },
];

const recommendations = [
  { title: "Reduce irrigation on Block C-3", reason: "Soil moisture 18% above target after recent rainfall.", tone: "sage" },
  { title: "Schedule foliar feed for Block B-1", reason: "NDRE trending downward over past 9 days.", tone: "harvest" },
  { title: "Deploy survey drone to Sector 5", reason: "Last imagery captured 12 days ago.", tone: "clay" },
];

const recentAlerts = [
  { level: "High", title: "Severe stress detected in Block C-3", ago: "2h ago" },
  { level: "Medium", title: "Worker shortage forecast for Wednesday", ago: "5h ago" },
  { level: "Low", title: "Mission MX-218 completed successfully", ago: "1d ago" },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Estate · La Cordillera"
        title="Good afternoon, Maria"
        description="Here's how your plantation is performing today, Thursday June 4."
        actions={
          <>
            <Button variant="outline" size="sm">Export brief</Button>
            <Button size="sm" className="bg-sage-deep hover:bg-sage-deep/90">New survey</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Cultivated area" value="1,247 ha" hint="across 38 blocks" icon={<Sprout className="h-4 w-4" />} delta="+24 ha this season" />
        <KpiCard label="Healthy canopy" value="86.4%" hint="3-week rolling avg" icon={<Leaf className="h-4 w-4" />} delta="▲ 2.1 pts" accent="olive" />
        <KpiCard label="Workforce on duty" value="142 / 168" hint="84.5% attendance" icon={<Users className="h-4 w-4" />} delta="On target" accent="harvest" />
        <KpiCard label="Active missions" value="3" hint="2 surveys · 1 scout" icon={<Plane className="h-4 w-4" />} delta="6 completed this week" accent="clay" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2 border-border/60 shadow-none">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Projected yield</p>
              <h3 className="font-display text-xl font-semibold">61.4 t/ha forecast for harvest</h3>
              <p className="text-xs text-muted-foreground">+8.7% vs prior season · 91% model confidence</p>
            </div>
            <Badge variant="secondary" className="bg-sage/15 text-sage-deep border-0">
              <TrendingUp className="mr-1 h-3 w-3" /> Trending up
            </Badge>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={yieldTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--sage-deep)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--sage-deep)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="w" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="y" stroke="var(--sage-deep)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 border-border/60 shadow-none">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Recommendations</h3>
            <Badge variant="outline" className="font-normal">AI · today</Badge>
          </div>
          <ul className="space-y-4">
            {recommendations.map((r) => (
              <li key={r.title} className="border-l-2 border-sage/40 pl-3">
                <p className="text-sm font-medium leading-snug">{r.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.reason}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2 border-border/60 shadow-none">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Field overview</h3>
              <p className="text-xs text-muted-foreground">Health composite · last imagery 4h ago</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/gis/map">Open map <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
          <FieldMap className="h-72" overlay="health" label="Composite health · Estate La Cordillera" />
        </Card>

        <Card className="p-6 border-border/60 shadow-none">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Recent alerts</h3>
            <Link to="/alerts" className="text-xs text-muted-foreground hover:text-foreground">View all</Link>
          </div>
          <ul className="space-y-3">
            {recentAlerts.map((a) => (
              <li key={a.title} className="flex gap-3 rounded-lg border border-border/60 p-3">
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                  a.level === "High" ? "bg-clay/15 text-clay" : a.level === "Medium" ? "bg-harvest/20 text-clay" : "bg-sage/15 text-sage-deep"
                }`}>
                  <AlertCircle className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.level} · {a.ago}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-5 border-border/60 shadow-none">
          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider"><Droplets className="h-3.5 w-3.5" /> Soil moisture</div>
          <p className="mt-2 font-display text-2xl font-semibold">42.6%</p>
          <p className="text-xs text-muted-foreground">Optimal range · Sector 1-4</p>
        </Card>
        <Card className="p-5 border-border/60 shadow-none">
          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">Weather window</div>
          <p className="mt-2 font-display text-2xl font-semibold">Clear · 28°C</p>
          <p className="text-xs text-muted-foreground">Light NE wind · ideal for surveys</p>
        </Card>
        <Card className="p-5 border-border/60 shadow-none">
          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">Tasks closing today</div>
          <p className="mt-2 font-display text-2xl font-semibold">17</p>
          <p className="text-xs text-muted-foreground">14 on schedule · 3 at risk</p>
        </Card>
      </div>
    </div>
  );
}
