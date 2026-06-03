import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bookmark, ExternalLink } from "lucide-react";
import { ArtworkCard } from "@/components/artwork-card";
import { ArtworkVisual } from "@/components/artwork-visual";
import { InquiryModal } from "@/components/inquiry-modal";
import { SectionHeader } from "@/components/section-header";
import { ShareTools } from "@/components/share-tools";
import { SponsoredAd } from "@/components/sponsored-ad";
import {
  artworks,
  getArtistForArtwork,
  getArtworkBySlug,
  sponsoredAds,
} from "@/lib/data";
import { formatPrice } from "@/lib/utils";

type ArtworkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return artworks.map((artwork) => ({ slug: artwork.slug }));
}

export async function generateMetadata({
  params,
}: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) {
    return { title: "Artwork not found" };
  }

  const artist = getArtistForArtwork(artwork);

  return {
    title: artwork.title,
    description: `${artwork.title} by ${artist?.name ?? "a Chitravan artist"}. ${artwork.description}`,
  };
}

export default async function ArtworkDetailPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  const artist = getArtistForArtwork(artwork);
  const related = artworks
    .filter((item) => item.style === artwork.style && item.slug !== artwork.slug)
    .slice(0, 3);

  return (
    <section className="py-14">
      <div className="container-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
        <div>
          <ArtworkVisual
            visual={artwork.visual}
            label={`${artwork.title} large artwork preview`}
            className="aspect-[4/3] rounded-xl"
          />
          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#FAF7F2]/65 px-3 py-1 text-sm font-semibold text-[#5F8F2F]">
                {artwork.style}
              </span>
              <span className="rounded-full bg-[#D9A441]/18 px-3 py-1 text-sm font-semibold text-[#7a5b15]">
                {artwork.category}
              </span>
              <span className="rounded-full border border-[#CFC8BA] px-3 py-1 text-sm font-semibold text-[#6F6A60]">
                {artwork.state}
              </span>
            </div>
            <h1 className="mt-5 font-display text-5xl leading-tight text-[#3B6D11] sm:text-6xl">
              {artwork.title}
            </h1>
            {artist ? (
              <Link
                href={`/artists/${artist.slug}`}
                className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-[#5F8F2F] hover:text-[#3B6D11]"
              >
                {artist.name}
                <ExternalLink size={16} aria-hidden="true" />
              </Link>
            ) : null}
            <p className="mt-5 text-2xl font-semibold text-[#24231F]">
              {formatPrice(artwork.price)}
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-sm font-semibold uppercase text-[#6F6A60]">
                  Description
                </h2>
                <p className="mt-2 text-lg leading-8 text-[#24231F]">
                  {artwork.description}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase text-[#6F6A60]">
                  Region and cultural context
                </h2>
                <p className="mt-2 text-lg leading-8 text-[#24231F]">
                  {artwork.culturalContext}
                </p>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              <button className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-sm font-semibold text-[#3B6D11] hover:bg-[#FAF8F4]">
                <Bookmark size={16} aria-hidden="true" />
                Save
              </button>
              <InquiryModal
                artworkTitle={artwork.title}
                artistName={artist?.name ?? "Chitravan artist"}
              />
              <ShareTools
                title={artwork.title}
                artistName={artist?.name ?? "Chitravan artist"}
                path={`/artworks/${artwork.slug}`}
              />
            </div>
          </div>
          {related.length ? (
            <div className="mt-14">
              <SectionHeader
                title="More in this tradition"
                subtitle="Related works from the same style family."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {related.map((item) => (
                  <ArtworkCard key={item.id} artwork={item} compact />
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <aside className="grid content-start gap-4 lg:sticky lg:top-28">
          <div
            id="request"
            className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-4"
          >
            <h2 className="font-display text-3xl text-[#3B6D11]">
              Buying by inquiry
            </h2>
            <p className="mt-2 leading-7 text-[#6F6A60]">
              No checkout yet. Send a message and budget so the artist can
              respond directly.
            </p>
            <div className="mt-5">
              <InquiryModal
                artworkTitle={artwork.title}
                artistName={artist?.name ?? "Chitravan artist"}
              />
            </div>
          </div>
          <SponsoredAd ad={sponsoredAds[2]} compact />
        </aside>
      </div>
    </section>
  );
}
