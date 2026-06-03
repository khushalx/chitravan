import type { Metadata } from "next";
import { CommunityPage } from "@/components/community-page";
import { SectionHeader } from "@/components/section-header";

export const metadata: Metadata = {
  title: "Community",
  description:
    "See what artists are making, sharing, learning, and building across India.",
};

export default function CommunityRoute() {
  return (
    <section className="py-14">
      <div className="container-shell">
        <SectionHeader
          title="Community"
          subtitle="See what artists are making, sharing, learning, and building across India."
        />
        <div className="mt-8">
          <CommunityPage />
        </div>
      </div>
    </section>
  );
}
