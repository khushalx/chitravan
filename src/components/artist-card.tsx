import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { ArtworkVisual } from "@/components/artwork-visual";
import { TagPill } from "@/components/tag-pill";
import { VerifiedBadge } from "@/components/verified-badge";
import type { Artist } from "@/lib/data";

type ArtistCardProps = {
  artist: Artist;
};

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <article className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-4">
      <div className="grid gap-4 sm:grid-cols-[112px_1fr]">
        <Link href={`/artists/${artist.slug}`} className="block">
          <ArtworkVisual
            visual={artist.visual}
            label={`${artist.name} artist thumbnail`}
            className="aspect-square rounded-lg"
          />
        </Link>
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link
                href={`/artists/${artist.slug}`}
                className="font-display text-2xl leading-tight text-[#3B6D11] hover:text-[#2f570d]"
              >
                {artist.name}
              </Link>
              <p className="mt-1 flex items-center gap-1 text-sm text-[#5F8F2F]">
                <MapPin size={14} aria-hidden="true" />
                {artist.city}, {artist.state}
              </p>
            </div>
            {artist.verified ? <VerifiedBadge /> : null}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {artist.styles.slice(0, 3).map((style) => (
              <TagPill key={style}>{style}</TagPill>
            ))}
          </div>
          <p className="mt-3 text-[0.96rem] leading-7 text-[#6F6A60]">
            {artist.bio}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-sm font-semibold text-[#3B6D11] transition hover:border-[#5F8F2F] hover:bg-[#FAF7F2]">
              <Heart size={15} aria-hidden="true" />
              Follow
            </button>
            <Link
              href={`/artists/${artist.slug}`}
              className="inline-flex min-h-10 items-center rounded-full bg-[#3B6D11] px-4 text-sm font-semibold text-white transition hover:bg-[#2f570d]"
            >
              View profile
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
