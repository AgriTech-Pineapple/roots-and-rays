import { createFileRoute } from "@tanstack/react-router";
import { ReportsPage } from "@/components/reports-page";

export const Route = createFileRoute("/reports/workforce")({
  head: () => ({ meta: [{ title: "Workforce Reports — Verdant" }] }),
  component: () => (
    <ReportsPage
      eyebrow="Reports" title="Workforce Reports" description="Productivity, attendance and task efficiency summaries by team and period."
      kpis={[
        { label: "Reports (mo)", value: "18" },
        { label: "Teams covered", value: "6" },
        { label: "Payroll cycles", value: "2", hint: "fortnightly" },
        { label: "Compliance", value: "100%", hint: "labor records" },
      ]}
      reports={[
        { name: "Bi-weekly payroll digest — late May", period: "16–31 May", author: "Auto", updated: "2d ago", type: "PDF" },
        { name: "Team Bravo — harvest productivity", period: "Wk 20–22", author: "A. Tan", updated: "4d ago", type: "PDF" },
        { name: "Attendance variance — May", period: "May 2026", author: "Auto", updated: "1w ago", type: "XLSX" },
        { name: "Skyline (drone) ops summary", period: "May 2026", author: "D. Mariano", updated: "1w ago", type: "PDF" },
        { name: "Overtime audit — Q2", period: "Apr – Jun 2026", author: "Auto", updated: "2w ago", type: "CSV" },
      ]}
    />
  ),
});
