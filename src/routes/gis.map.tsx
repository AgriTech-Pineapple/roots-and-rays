import { createFileRoute } from "@tanstack/react-router";
import { GisWorkspace } from "@/components/gis-workspace";

export const Route = createFileRoute("/gis/map")({
  head: () => ({ meta: [{ title: "Farm Map — Verdant" }] }),
  component: () => (
    <GisWorkspace
      overlay="health"
      title="Farm Map"
      description="Authoritative geospatial workspace · base composite layer."
      legend={[
        { color: "oklch(0.55 0.16 130)", label: "Healthy canopy" },
        { color: "oklch(0.78 0.14 95)", label: "Mild stress" },
        { color: "oklch(0.62 0.16 50)", label: "Severe stress" },
        { color: "oklch(0.7 0.04 100)", label: "Bare / pathway" },
      ]}
    />
  ),
});
