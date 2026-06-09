import { createFileRoute } from "@tanstack/react-router";
import { ReportsPage } from "@/components/reports-page";

export const Route = createFileRoute("/reports/farm")({
  head: () => ({ meta: [{ title: "Farm Reports — Agritech" }] }),
  component: () => (
    <ReportsPage
      eyebrow="Reports" title="Farm Reports" description="Agronomy, health and yield reports synthesised from drone and field data."
      kpis={[
        { label: "Auto-generated", value: "31", hint: "this month" },
        { label: "Exports", value: "84", hint: "this month" },
      ]}
      reports={[
        { name: "May 2026 — Estate health composite", period: "1 May – 31 May", author: "Auto", updated: "2d ago", type: "PDF" },
        { name: "Block C-3 stress investigation", period: "Week 23", author: "L. Santos", updated: "3d ago", type: "PDF" },
        { name: "Yield forecast model — June revision", period: "1 Jun", author: "Auto", updated: "5d ago", type: "PDF" },
        { name: "Plant count audit — Sectors 1–4", period: "30 May", author: "Auto", updated: "1w ago", type: "CSV" },
        { name: "Disease scouting digest", period: "Wk 21–22", author: "L. Santos", updated: "2w ago", type: "PDF" },
        { name: "NDVI longitudinal — 12 months", period: "Jun 2025 – May 2026", author: "Auto", updated: "3w ago", type: "PDF" },
      ]}
    />
  ),
});
