import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, AlertCircle, MapPin, TrendingUp } from "lucide-react";
import { FARMS, useFarm, type FarmId } from "@/lib/farms";
import { FieldMap } from "@/components/farm-ui";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard — Verdant" }, { name: "description", content: "Portfolio overview across all plantations." }] }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const { setFarmId } = useFarm();

  const open = (id: FarmId) => {
    setFarmId(id);
    navigate({ to: "/farm/overview" });
  };

  // portfolio-wide aggregates
  const totalArea = "3,672 ha";
  const totalPlants = "8.03 M";
  const portfolioHealth = "85.5%";
  const portfolioYield = "61.7 t/ha";

  const portfolioRecs = [
    { farm: "Bahía Dorada", title: "Pull harvest crew forward to Wk 36", reason: "Yield tracking 5% ahead of plan." },
    { farm: "Valle Verde", title: "Inspect Block W-2 for mealybug wilt", reason: "Cluster of severe-stress pixels detected." },
    { farm: "La Cordillera", title: "Reduce irrigation on Block C-3", reason: "Soil moisture 18% above target." },
  ];

  const portfolioAlerts = [
    { level: "High" as const, farm: "La Cordillera", title: "Severe stress in Block C-3", ago: "2h ago" },
    { level: "High" as const, farm: "Valle Verde", title: "Severe stress patch in Block W-2", ago: "1h ago" },
    { level: "Medium" as const, farm: "Bahía Dorada", title: "Salinity signature in Block BD-4", ago: "3h ago" },
    { level: "Medium" as const, farm: "Valle Verde", title: "Sprinkler pressure low on Sector 3", ago: "4h ago" },
    { level: "Low" as const, farm: "La Cordillera", title: "Mission MX-218 completed", ago: "1d ago" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Portfolio · 3 plantations"
        title="Good afternoon, Maria"
        description="Pick a farm to dive in, or review portfolio-wide signals on the right."
        actions={<Button size="sm" variant="outline">Export portfolio brief</Button>}
      />

      <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">
        {/* LEFT: farm cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Your farms</h2>
            <span className="text-xs text-muted-foreground">Select a farm to load its intelligence</span>
          </div>

          <div className="grid gap-4">
            {FARMS.map((f) => (
              <Card
                key={f.id}
                onClick={() => open(f.id)}
                className="group cursor-pointer border-border/60 shadow-none transition hover:border-sage-deep/40 hover:shadow-sm"
              >
                <div className="grid gap-0 md:grid-cols-[200px_1fr]">
                  <div className="relative h-32 md:h-auto overflow-hidden rounded-l-xl">
                    <FieldMap className="absolute inset-0 h-full w-full rounded-none border-0" overlay={f.accent === "sage" ? "health" : f.accent === "olive" ? "ndvi" : "ndre"} showPins={false} />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />{f.region}
                        </div>
                        <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">{f.name}</h3>
                        <p className="text-xs text-muted-foreground">{f.subtitle}</p>
                      </div>
                      <Badge variant="secondary" className={`border-0 font-normal ${
                        f.accent === "sage" ? "bg-sage/15 text-sage-deep" :
                        f.accent === "olive" ? "bg-olive/15 text-olive" : "bg-harvest/25 text-clay"
                      }`}>{f.cultivar.split(" ")[0]}</Badge>
                    </div>
                    <dl className="mt-4 grid grid-cols-4 gap-3">
                      {[
                        ["Area", f.area],
                        ["Plants", f.plants],
                        ["Healthy", f.healthyPct],
                        ["Yield", f.yieldForecast],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</dt>
                          <dd className="font-num text-base font-semibold tabular-nums mt-0.5">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {f.blocks} blocks · est. {f.established}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-sage-deep group-hover:underline">
                        Open farm <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* RIGHT: portfolio stats + alerts */}
        <div className="space-y-6">
          <Card className="p-5 border-border/60 shadow-none">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold">Portfolio at a glance</h3>
              <Badge variant="secondary" className="bg-sage/15 text-sage-deep border-0">
                <TrendingUp className="mr-1 h-3 w-3" /> +7.4% YoY
              </Badge>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              {[
                ["Total area", totalArea, Sprout],
                ["Total plants", totalPlants, Sprout],
                ["Healthy canopy", portfolioHealth, Sprout],
                ["Avg yield forecast", portfolioYield, Sprout],
              ].map(([k, v]) => (
                <div key={k as string} className="rounded-lg bg-muted/30 p-3">
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{k as string}</dt>
                  <dd className="mt-1 font-num text-xl font-semibold tabular-nums">{v as string}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="p-5 border-border/60 shadow-none">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-base font-semibold">Recommendations</h3>
              <Badge variant="outline" className="font-normal text-[10px]">AI · today</Badge>
            </div>
            <ul className="space-y-3">
              {portfolioRecs.map((r) => (
                <li key={r.title} className="border-l-2 border-sage/40 pl-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.farm}</p>
                  <p className="text-sm font-medium leading-snug">{r.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.reason}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5 border-border/60 shadow-none">
            <h3 className="mb-3 font-display text-base font-semibold">Recent alerts · all farms</h3>
            <ul className="space-y-2.5">
              {portfolioAlerts.map((a) => (
                <li key={a.title} className="flex gap-3 rounded-lg border border-border/60 p-3">
                  <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                    a.level === "High" ? "bg-clay/15 text-clay" : a.level === "Medium" ? "bg-harvest/25 text-clay" : "bg-sage/15 text-sage-deep"
                  }`}>
                    <AlertCircle className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{a.farm}</p>
                    <p className="text-sm font-medium leading-snug">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.level} · {a.ago}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
