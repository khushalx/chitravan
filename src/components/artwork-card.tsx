import Link from "next/link";
import { Star } from "lucide-react";
import { ArtworkVisual } from "@/components/artwork-visual";
import type { Artwork } from "@/lib/data";
import { getArtistForArtwork } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";

type ArtworkCardProps = {
  artwork: Artwork;
  compact?: boolean;
};

export function ArtworkCard({ artwork, compact = false }: ArtworkCardProps) {
  const artist = getArtistForArtwork(artwork);

  return (
    <article className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-3">
      <Link href={`/artworks/${artwork.slug}`} className="block">
        <ArtworkVisual
          visual={artwork.visual}
          label={`${artwork.title} artwork preview`}
          className="aspect-square rounded-lg"
        />
      </Link>
      <div className="mt-4 space-y-2 px-1 pb-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.94rem] font-medium text-[#24231F]">
            {artist?.name ?? "Chitravan artist"}
          </p>
          {artwork.featured ? (
            <span
              title="Featured work"
              className="inline-flex size-6 items-center justify-center rounded-full bg-[#D9A441]/18 text-[#D9A441]"
            >
              <Star size={14} fill="currentColor" aria-hidden="true" />
            </span>
          ) : null}
        </div>
        <Link
          href={`/artworks/${artwork.slug}`}
          className={cn(
            "block font-semibold leading-snug text-[#24231F] hover:text-[#3B6D11]",
            compact ? "text-base" : "text-lg",
          )}
        >
          {artwork.title}
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#FAF7F2]/75 px-3 py-1 text-xs font-semibold text-[#5F8F2F]">
            {artwork.style}
          </span>
          <span className="text-sm text-[#6F6A60]">{artwork.state}</span>
        </div>
        <p className="text-[0.95rem] font-semibold text-[#3B6D11]">
          {formatPrice(artwork.price)}
        </p>
      </div>
    </article>
  );
}
