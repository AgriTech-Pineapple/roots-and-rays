import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Agritech" }] }),
  component: Page,
});

const users = [
  { name: "Ahmad Ismail", email: "ahmad.ismail@agritech.my", role: "Estate Manager", access: "Owner" },
  { name: "Sarah Tan", email: "sarah.tan@agritech.my", role: "Lead Agronomist", access: "Admin" },
  { name: "David Lee", email: "david.lee@agritech.my", role: "Drone Operations", access: "Editor" },
  { name: "Nurul Aisyah", email: "nurul.aisyah@agritech.my", role: "Harvest Supervisor", access: "Editor" },
  { name: "Raj Kumar", email: "raj.kumar@agritech.my", role: "Field Lead", access: "Viewer" },
];

const prefs: { key: string; label: string; default: string; options: string[] }[] = [
  { key: "units", label: "Units", default: "Metric (ha · t · °C)", options: ["Metric (ha · t · °C)", "Imperial (ac · lb · °F)"] },
  { key: "crs", label: "Coordinate system", default: "EPSG:4326 — WGS 84", options: ["EPSG:4326 — WGS 84", "EPSG:3857 — Web Mercator", "EPSG:3375 — Kertau RSO Malaya"] },
  { key: "tz", label: "Time zone", default: "Asia/Kuala_Lumpur (UTC+8)", options: ["Asia/Kuala_Lumpur (UTC+8)", "Asia/Singapore (UTC+8)", "Asia/Jakarta (UTC+7)", "UTC"] },
  { key: "basemap", label: "Map basemap", default: "Topographic", options: ["Topographic", "Satellite", "Streets", "Hybrid"] },
  { key: "theme", label: "Theme", default: "System default", options: ["System default", "Light", "Dark"] },
];

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="System" title="Settings" description="Organisation, users, notifications and platform preferences." />
      <Tabs defaultValue="org" className="space-y-6">
        <TabsList className="bg-muted/40">
          <TabsTrigger value="org">Organisation</TabsTrigger>
          <TabsTrigger value="users">Users & permissions</TabsTrigger>
          <TabsTrigger value="notify">Notifications</TabsTrigger>
          <TabsTrigger value="prefs">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="org">
          <Card className="p-6 border-border/60 shadow-none max-w-2xl">
            <h3 className="font-display text-lg font-semibold mb-4">Organisation details</h3>
            <div className="space-y-4">
              {[
                ["Organisation name", "Agritech Plantations"],
                ["Trading entity", "Agritech Agri Holdings Sdn Bhd"],
                ["Primary estate", "Farm 1 (1,247 ha)"],
                ["Headquarters", "Kuala Lumpur, Malaysia"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 items-center gap-3">
                  <Label className="text-sm text-muted-foreground">{k}</Label>
                  <Input defaultValue={v} className="col-span-2" />
                </div>
              ))}
              <div className="pt-2"><Button size="sm" className="bg-sage-deep hover:bg-sage-deep/90">Save changes</Button></div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="border-border/60 shadow-none">
            <div className="flex items-center justify-between border-b border-border/60 p-5">
              <h3 className="font-display text-lg font-semibold">Users</h3>
              <Button size="sm" className="bg-sage-deep hover:bg-sage-deep/90">Invite user</Button>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="px-5 py-3 text-left font-medium">Name</th><th className="px-5 py-3 text-left font-medium">Role</th><th className="px-5 py-3 text-left font-medium">Access</th></tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="border-t border-border/60">
                    <td className="px-5 py-3">
                      <p className="font-medium">{u.name}</p>
                      <p className="text-[11px] text-muted-foreground">{u.email}</p>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{u.role}</td>
                    <td className="px-5 py-3"><Badge variant="secondary" className="bg-sage/15 text-sage-deep border-0 font-normal">{u.access}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        <TabsContent value="notify">
          <Card className="p-6 border-border/60 shadow-none max-w-2xl">
            <h3 className="font-display text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              {[
                ["Critical health alerts", "Email + SMS for severe stress and disease risk."],
                ["Yield forecast revisions", "Weekly email digest of model changes."],
                ["Workforce shortage forecasts", "Notify supervisors 48h in advance."],
                ["Mission completion", "Push notification when surveys finish processing."],
                ["Daily executive brief", "Morning email summary at 06:00."],
              ].map(([t, d], i) => (
                <div key={t} className="flex items-start justify-between gap-4 border-t border-border/60 pt-4 first:border-0 first:pt-0">
                  <div>
                    <p className="font-medium text-sm">{t}</p>
                    <p className="text-xs text-muted-foreground">{d}</p>
                  </div>
                  <Switch defaultChecked={i < 4} />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="prefs">
          <Card className="p-6 border-border/60 shadow-none max-w-2xl">
            <h3 className="font-display text-lg font-semibold mb-4">Platform preferences</h3>
            <div className="space-y-4">
              {prefs.map((p) => (
                <div key={p.key} className="grid grid-cols-3 items-center gap-3">
                  <Label className="text-sm text-muted-foreground">{p.label}</Label>
                  <div className="col-span-2">
                    <Select defaultValue={p.default}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {p.options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
              <div className="pt-2"><Button size="sm" className="bg-sage-deep hover:bg-sage-deep/90">Save preferences</Button></div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
