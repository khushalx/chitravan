import type { Metadata } from "next";
import { ArtistExplorer } from "@/components/artist-explorer";
import { SectionHeader } from "@/components/section-header";
import { getApprovedArtists } from "@/lib/data";

export const metadata: Metadata = {
  title: "Explore artists",
  description:
    "Filter Indian artists by state, art style, medium, and verification status.",
};

export default function ArtistsPage() {
  return (
    <section className="py-14">
      <div className="container-shell">
        <SectionHeader
          title="Explore artists"
          subtitle="Find painters, illustrators, craft makers, and regional creators from across India."
        />
        <div className="mt-8">
          <ArtistExplorer artists={getApprovedArtists()} />
        </div>
      </div>
    </section>
  );
}
