import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Search } from "lucide-react";
import type { ReactNode } from "react";

export function ReportsPage({
  eyebrow, title, description, reports, kpis,
}: {
  eyebrow: string; title: string; description: string;
  kpis: { label: string; value: string; hint?: string }[];
  reports: { name: string; period: string; author: string; updated: string; type: string }[];
}) {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={eyebrow} title={title} description={description}
        actions={<Button size="sm" className="bg-sage-deep hover:bg-sage-deep/90">Generate report</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => <KpiCard key={k.label} {...k} accent={(["sage","olive","harvest","clay"] as const)[i % 4]} />)}
      </div>
      <Card className="border-border/60 shadow-none">
        <div className="flex items-center gap-3 border-b border-border/60 p-4">
          <div className="relative max-w-sm flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search reports…" className="h-9 pl-8 bg-muted/30 border-transparent" />
          </div>
          <Badge variant="outline" className="font-normal">Last 90 days</Badge>
        </div>
        <ul className="divide-y divide-border/60">
          {reports.map((r) => (
            <li key={r.name} className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sage/15 text-sage-deep"><FileText className="h-4 w-4" /></div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.period} · by {r.author} · {r.updated}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="font-normal text-[10px]">{r.type}</Badge>
                <Button variant="ghost" size="sm"><Download className="h-3.5 w-3.5" /></Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export const _unused: ReactNode = null;
