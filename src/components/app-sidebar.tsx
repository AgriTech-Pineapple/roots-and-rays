import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Sprout, Map, Users, Plane, FileBarChart,
  Bell, Database, Settings, Leaf, ChevronRight,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type Item = { title: string; url: string; icon: any; children?: { title: string; url: string }[] };

const sections: { label: string; items: Item[] }[] = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", url: "/", icon: LayoutDashboard }],
  },
  {
    label: "Intelligence",
    items: [
      {
        title: "Farm Intelligence", url: "/farm/overview", icon: Sprout,
        children: [
          { title: "Overview", url: "/farm/overview" },
          { title: "Plant Count", url: "/farm/plants" },
          { title: "Health Analysis", url: "/farm/health" },
          { title: "Growth Analysis", url: "/farm/growth" },
          { title: "Yield Forecast", url: "/farm/yield" },
          { title: "Historical Monitoring", url: "/farm/history" },
        ],
      },
      { title: "GIS Mapping", url: "/gis/map", icon: Map },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Workforce", url: "/workforce", icon: Users },
      { title: "Drone Operations", url: "/drones", icon: Plane },
    ],
  },
  {
    label: "Insights",
    items: [
      {
        title: "Reports", url: "/reports/farm", icon: FileBarChart,
        children: [
          { title: "Farm Reports", url: "/reports/farm" },
          { title: "Workforce Reports", url: "/reports/workforce" },
          { title: "Executive Reports", url: "/reports/executive" },
        ],
      },
      { title: "Alerts", url: "/alerts", icon: Bell },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Data Management", url: "/data", icon: Database },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) => pathname === url;
  const isParentActive = (item: Item) =>
    item.children?.some((c) => pathname === c.url) || pathname === item.url;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sage-deep text-primary-foreground shadow-sm">
            <Leaf className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-display text-base font-semibold">Verdant</span>
            <span className="text-[11px] text-muted-foreground">Farm Intelligence</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) =>
                  item.children ? (
                    <Collapsible key={item.title} defaultOpen={isParentActive(item)} className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title} className="data-[active=true]:bg-sidebar-accent">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto h-3.5 w-3.5 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((c) => (
                              <SidebarMenuSubItem key={c.url}>
                                <SidebarMenuSubButton asChild isActive={isActive(c.url)}>
                                  <Link to={c.url}>{c.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                        <Link to={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ),
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-1.5 group-data-[collapsible=icon]:hidden">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sage to-olive" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">M. Castillo</span>
            <span className="text-[11px] text-muted-foreground">Estate Manager</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
