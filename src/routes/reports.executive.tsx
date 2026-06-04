import { createFileRoute } from "@tanstack/react-router";
import { ReportsPage } from "@/components/reports-page";

export const Route = createFileRoute("/reports/executive")({
  head: () => ({ meta: [{ title: "Executive Reports — Verdant" }] }),
  component: () => (
    <ReportsPage
      eyebrow="Reports" title="Executive Reports" description="Board-ready summaries combining agronomy, operations and financial outcomes."
      kpis={[
        { label: "Board reports", value: "12", hint: "annual cadence" },
        { label: "Investor briefs", value: "4", hint: "quarterly" },
        { label: "Scenario models", value: "9" },
        { label: "Last circulation", value: "8d ago" },
      ]}
      reports={[
        { name: "Q2 2026 — Estate performance brief", period: "Apr – Jun 2026", author: "M. Castillo", updated: "8d ago", type: "PDF" },
        { name: "Season 24/25 mid-cycle review", period: "Jan – May 2026", author: "M. Castillo", updated: "3w ago", type: "PDF" },
        { name: "Climate risk scenario — 2030 outlook", period: "Forward-looking", author: "L. Santos", updated: "1mo ago", type: "PDF" },
        { name: "ESG & certification compliance", period: "FY 2025/26", author: "Auto", updated: "1mo ago", type: "PDF" },
      ]}
    />
  ),
});
