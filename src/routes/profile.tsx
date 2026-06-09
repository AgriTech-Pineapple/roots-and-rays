import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ACCOUNT } from "@/lib/farms";
import { Mail, Phone, MapPin, Shield } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Agritech" }] }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Account" title="Profile" description="Your personal account details and signed-in session." />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="p-6 border-border/60 shadow-none text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sage to-olive text-2xl font-semibold text-primary-foreground">
            {ACCOUNT.initials}
          </div>
          <h2 className="mt-4 font-display text-xl font-semibold">{ACCOUNT.fullName}</h2>
          <p className="text-sm text-muted-foreground">{ACCOUNT.role}</p>
          <Badge variant="secondary" className="mt-3 bg-sage/15 text-sage-deep border-0 font-normal">Owner</Badge>
          <Button variant="outline" size="sm" className="mt-5 w-full">Change avatar</Button>
        </Card>

        <Card className="p-6 border-border/60 shadow-none">
          <h3 className="font-display text-lg font-semibold mb-4">Account details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Full name</Label>
              <Input defaultValue={ACCOUNT.fullName} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Role</Label>
              <Input defaultValue={ACCOUNT.role} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Email</Label>
              <Input defaultValue={ACCOUNT.email} type="email" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Phone</Label>
              <Input defaultValue="+60 12 345 6789" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-xs text-muted-foreground">Location</Label>
              <Input defaultValue="Kuala Lumpur, Malaysia" />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button size="sm" className="bg-sage-deep hover:bg-sage-deep/90">Save changes</Button>
            <Button size="sm" variant="outline">Cancel</Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { icon: Mail, t: "Email preferences", d: "Choose which Agritech notifications reach your inbox.", a: "/settings" },
          { icon: Shield, t: "Security", d: "Password, 2-factor authentication and trusted devices.", a: "/settings" },
          { icon: MapPin, t: "Default farm", d: "Set the farm you'd like to land on after sign-in.", a: "/" },
        ].map((c) => (
          <Card key={c.t} className="p-5 border-border/60 shadow-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sage/15 text-sage-deep"><c.icon className="h-4 w-4" /></div>
            <h4 className="mt-3 font-display text-base font-semibold">{c.t}</h4>
            <p className="text-xs text-muted-foreground">{c.d}</p>
            <Link to={c.a} className="mt-3 inline-block text-xs font-medium text-sage-deep hover:underline">Manage →</Link>
          </Card>
        ))}
      </div>

      <Card className="p-6 border-border/60 shadow-none">
        <h3 className="font-display text-lg font-semibold mb-4">Active sessions</h3>
        <ul className="divide-y divide-border/60 text-sm">
          {[
            { device: "MacBook Pro · Chrome", where: "Kuala Lumpur, Malaysia", when: "Active now", current: true },
            { device: "iPhone 15 · Safari", where: "Pontian, Johor", when: "2 days ago", current: false },
          ].map((s) => (
            <li key={s.device} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <p className="font-medium flex items-center gap-2">
                  {s.device}
                  {s.current && <Badge variant="secondary" className="bg-sage/15 text-sage-deep border-0 font-normal text-[10px]">This device</Badge>}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Phone className="h-3 w-3" /> {s.where} · {s.when}</p>
              </div>
              {!s.current && <Button size="sm" variant="ghost" className="text-xs">Sign out</Button>}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
