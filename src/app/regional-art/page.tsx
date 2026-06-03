import type { Metadata } from "next";
import { RegionalExplorer } from "@/components/regional-explorer";
import { SectionHeader } from "@/components/section-header";
import { regionalArtForms } from "@/lib/data";

export const metadata: Metadata = {
  title: "Regional art discovery",
  description:
    "Explore Indian art forms by state, tradition, and medium with cultural context.",
};

export default function RegionalArtPage() {
  return (
    <section className="py-14">
      <div className="container-shell">
        <SectionHeader
          title="Regional art discovery"
          subtitle="Discover folk and contemporary practices across states, mediums, and local communities."
        />
        <div className="mt-8">
          <RegionalExplorer traditions={regionalArtForms} />
        </div>
      </div>
    </section>
  );
}
