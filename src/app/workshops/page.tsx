import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { WorkshopsPage } from "@/components/workshops-page";

export const metadata: Metadata = {
  title: "Workshops & classes",
  description:
    "Learn directly from Indian artists through live sessions, recorded classes, and community workshops.",
};

export default function WorkshopsRoute() {
  return (
    <section className="py-14">
      <div className="container-shell">
        <SectionHeader
          title="Workshops & classes"
          subtitle="Learn directly from Indian artists through live sessions, recorded classes, and community workshops."
        />
        <div className="mt-8">
          <WorkshopsPage />
        </div>
      </div>
    </section>
  );
}
