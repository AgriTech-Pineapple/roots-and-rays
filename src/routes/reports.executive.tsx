import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
import { FileBarChart } from "lucide-react";

export const Route = createFileRoute("/reports/executive")({
  head: () => ({ meta: [{ title: "Executive Reports — Verdant" }] }),
  component: () => (
    <ComingSoon
      eyebrow="Reports"
      title="Executive Reports"
      description="Board-ready summaries combining agronomy, operations and financial outcomes."
      icon={FileBarChart}
      modules={[
        { title: "Quarterly performance brief", body: "Estate-wide KPIs vs targets, ready for the board pack." },
        { title: "Scenario models", body: "Yield, weather and price scenarios for the next season." },
        { title: "ESG & certification", body: "Compliance position across GlobalG.A.P, Rainforest Alliance, Fair Trade." },
        { title: "Investor briefings", body: "Auto-generated investor letters with portfolio-wide commentary." },
      ]}
    />
  ),
});
