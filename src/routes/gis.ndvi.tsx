import { createFileRoute } from "@tanstack/react-router";
import { GisWorkspace } from "@/components/gis-workspace";

export const Route = createFileRoute("/gis/ndvi")({
  head: () => ({ meta: [{ title: "NDVI Layer — Agritech" }] }),
  component: () => (
    <GisWorkspace
      overlay="ndvi"
      title="NDVI Layer"
      description="Normalised Difference Vegetation Index — overall plant vigor."
      legend={[
        { color: "oklch(0.5 0.18 135)", label: "0.8 – 1.0  vigorous" },
        { color: "oklch(0.65 0.15 130)", label: "0.6 – 0.8  healthy" },
        { color: "oklch(0.78 0.13 100)", label: "0.4 – 0.6  moderate" },
        { color: "oklch(0.62 0.15 50)", label: "< 0.4  stressed" },
      ]}
    />
  ),
});
