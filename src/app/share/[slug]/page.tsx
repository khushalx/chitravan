import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtworkVisual } from "@/components/artwork-visual";
import { ShareTools } from "@/components/share-tools";
import {
  getApprovedArtistForArtwork,
  getPublicArtworkBySlug,
  getPublicArtworks,
} from "@/lib/data";

type SharePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPublicArtworks().map((artwork) => ({ slug: artwork.slug }));
}

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getPublicArtworkBySlug(slug);

  return {
    title: artwork ? `Share ${artwork.title}` : "Share artwork",
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const { slug } = await params;
  const artwork = getPublicArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  const artist = getApprovedArtistForArtwork(artwork);

  return (
    <section className="py-14">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-center">
        <div className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5">
          <ArtworkVisual
            visual={artwork.visual}
            label={`${artwork.title} share preview`}
            className="aspect-square rounded-lg"
          />
          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#5F8F2F]">
                {artist?.name}
              </p>
              <h1 className="font-display text-4xl leading-tight text-[#3B6D11]">
                {artwork.title}
              </h1>
            </div>
            <div className="text-right">
              <p className="font-display text-2xl text-[#3B6D11]">
                Chitravan
              </p>
              <p className="font-display text-sm text-[#5F8F2F]">चित्रवन</p>
            </div>
          </div>
          <p className="mt-4 text-sm font-semibold text-[#6F6A60]">
            Profile link placeholder: /artists/{artist?.slug}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase text-[#D9A441]">
            Shareable artwork card
          </p>
          <h2 className="mt-3 font-display text-5xl leading-tight text-[#3B6D11]">
            Share {artwork.title}
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-[#6F6A60]">
            Use a Chitravan-branded card preview with artist name, artwork
            title, watermark, and a profile link placeholder.
          </p>
          <div className="mt-6">
            <ShareTools
              title={artwork.title}
              artistName={artist?.name ?? "Chitravan artist"}
              path={`/share/${artwork.slug}`}
            />
          </div>
          <Link
            href={`/artworks/${artwork.slug}`}
            className="mt-5 inline-flex min-h-11 items-center rounded-full border border-[#CFC8BA] px-5 font-semibold text-[#3B6D11] hover:bg-[#FAF8F4]"
          >
            Back to artwork
          </Link>
        </div>
      </div>
    </section>
  );
}
