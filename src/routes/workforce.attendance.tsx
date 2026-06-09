import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/farm-ui";
import { Card } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export const Route = createFileRoute("/workforce/attendance")({
  head: () => ({ meta: [{ title: "Attendance — Agritech" }] }),
  component: Page,
});

const trend = [
  { d: "Mon", a: 88 }, { d: "Tue", a: 86 }, { d: "Wed", a: 91 },
  { d: "Thu", a: 84 }, { d: "Fri", a: 89 }, { d: "Sat", a: 76 }, { d: "Sun", a: 0 },
];

const log = [
  { name: "E. Rivera", in: "05:42", out: "—", hrs: "6.3h", status: "Present" },
  { name: "A. Tan", in: "05:48", out: "—", hrs: "6.2h", status: "Present" },
  { name: "M. Delgado", in: "06:02", out: "—", hrs: "6.0h", status: "Present" },
  { name: "P. Ocampo", in: "—", out: "—", hrs: "—", status: "Leave" },
  { name: "D. Mariano", in: "—", out: "—", hrs: "—", status: "Absent" },
  { name: "R. Velasco", in: "05:39", out: "—", hrs: "6.4h", status: "Present" },
];

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Workforce" title="Attendance Dashboard" description="Daily attendance, leave records and 7-day trends." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Present today" value="142" hint="of 168" accent="sage" />
        <KpiCard label="Absent" value="14" hint="unscheduled" accent="clay" />
        <KpiCard label="On leave" value="12" hint="approved" accent="harvest" />
        <KpiCard label="7-day avg" value="86.1%" hint="attendance rate" accent="olive" />
      </div>
      <Card className="p-6 border-border/60 shadow-none">
        <h3 className="font-display text-lg font-semibold">Attendance · 7-day trend</h3>
        <div className="h-56 mt-3">
          <ResponsiveContainer>
            <LineChart data={trend}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="a" stroke="var(--sage-deep)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="border-border/60 shadow-none">
        <div className="border-b border-border/60 p-5"><h3 className="font-display text-lg font-semibold">Today's log</h3></div>
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-5 py-3 text-left font-medium">Worker</th><th className="px-5 py-3 text-left font-medium">Clock in</th><th className="px-5 py-3 text-left font-medium">Clock out</th><th className="px-5 py-3 text-left font-medium">Hours</th><th className="px-5 py-3 text-left font-medium">Status</th></tr>
          </thead>
          <tbody>
            {log.map((l) => (
              <tr key={l.name} className="border-t border-border/60">
                <td className="px-5 py-3 font-medium">{l.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{l.in}</td>
                <td className="px-5 py-3 text-muted-foreground">{l.out}</td>
                <td className="px-5 py-3">{l.hrs}</td>
                <td className="px-5 py-3"><span className={`rounded-full px-2 py-0.5 text-xs ${l.status==="Present"?"bg-sage/15 text-sage-deep":l.status==="Leave"?"bg-harvest/25 text-clay":"bg-clay/15 text-clay"}`}>{l.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
