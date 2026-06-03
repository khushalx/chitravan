import { ArrowRight } from "lucide-react";
import { ArtworkVisual } from "@/components/artwork-visual";
import { TagPill } from "@/components/tag-pill";
import type { RegionalArtForm } from "@/lib/data";

type TraditionCardProps = {
  tradition: RegionalArtForm;
};

export function TraditionCard({ tradition }: TraditionCardProps) {
  return (
    <article className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-4">
      <ArtworkVisual
        visual={tradition.visual}
        label={`${tradition.name} visual`}
        className="aspect-[5/4] rounded-lg"
      />
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#5F8F2F]">
          <span>{tradition.state}</span>
          <span aria-hidden="true">·</span>
          <span>{tradition.medium}</span>
        </div>
        <h2 className="mt-2 font-display text-3xl text-[#3B6D11]">
          {tradition.name}
        </h2>
        <p className="mt-3 leading-7 text-[#6F6A60]">{tradition.context}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <TagPill tone="amber">
            {tradition.featuredArtists.length} featured artist
            {tradition.featuredArtists.length === 1 ? "" : "s"}
          </TagPill>
          <TagPill tone="outline">{tradition.medium}</TagPill>
        </div>
        <button className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-[#3B6D11] px-4 text-sm font-semibold text-white hover:bg-[#2f570d]">
          Explore
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
