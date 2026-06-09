import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
import { Users } from "lucide-react";

export const Route = createFileRoute("/reports/workforce")({
  head: () => ({ meta: [{ title: "Workforce Reports — Agritech" }] }),
  component: () => (
    <ComingSoon
      eyebrow="Reports"
      title="Workforce Reports"
      description="Productivity, attendance and payroll-ready summaries by team and period."
      icon={Users}
      modules={[
        { title: "Bi-weekly payroll digest", body: "Hours, overtime, allowances reconciled per worker." },
        { title: "Team productivity", body: "Output per crew, harvest velocity, variance vs plan." },
        { title: "Attendance variance", body: "No-shows, late starts, geofence anomalies." },
        { title: "Compliance audit pack", body: "Labor records ready for certification audits." },
      ]}
    />
  ),
});
