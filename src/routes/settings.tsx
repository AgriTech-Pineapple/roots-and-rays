import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Verdant" }] }),
  component: Page,
});

const users = [
  { name: "Maria Castillo", email: "m.castillo@verdant.farm", role: "Estate Manager", access: "Owner" },
  { name: "Liwayway Santos", email: "l.santos@verdant.farm", role: "Lead Agronomist", access: "Admin" },
  { name: "Diego Mariano", email: "d.mariano@verdant.farm", role: "Drone Operations", access: "Editor" },
  { name: "Aurora Tan", email: "a.tan@verdant.farm", role: "Harvest Supervisor", access: "Editor" },
  { name: "Esteban Rivera", email: "e.rivera@verdant.farm", role: "Field Lead", access: "Viewer" },
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
                ["Organisation name", "Verdant Plantations"],
                ["Trading entity", "Verdant Agri Holdings, S.A."],
                ["Primary estate", "La Cordillera (1,247 ha)"],
                ["Headquarters", "Davao, Philippines"],
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
              {[
                ["Units", "Metric (ha · t · °C)"],
                ["Coordinate system", "EPSG:4326 — WGS 84"],
                ["Time zone", "Asia/Manila (UTC+8)"],
                ["Map basemap", "Topographic"],
                ["Theme", "System default"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 items-center gap-3">
                  <Label className="text-sm text-muted-foreground">{k}</Label>
                  <Input defaultValue={v} className="col-span-2" />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
