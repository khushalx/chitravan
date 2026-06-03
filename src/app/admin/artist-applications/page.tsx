import type { Metadata } from "next";
import { AdminAccessGate } from "@/components/admin-access-gate";
import { ArtistApplicationsPage } from "@/components/artist-applications-page";
import { SectionHeader } from "@/components/section-header";

export const metadata: Metadata = {
  title: "Artist Applications",
  description:
    "Review, approve, and reject Chitravan artist applications before public publishing.",
};

export default function ArtistApplicationsRoute() {
  return (
    <section className="py-14">
      <div className="container-shell">
        <SectionHeader
          title="Artist applications"
          subtitle="Review every artist profile before it becomes public on Chitravan."
        />
        <div className="mt-8">
          <AdminAccessGate>
            <ArtistApplicationsPage />
          </AdminAccessGate>
        </div>
      </div>
    </section>
  );
}
