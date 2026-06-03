import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BarChart3, MapPin, MessageSquare, Users } from "lucide-react";
import { ArtworkCard } from "@/components/artwork-card";
import { ArtworkVisual } from "@/components/artwork-visual";
import { SectionHeader } from "@/components/section-header";
import { TagPill } from "@/components/tag-pill";
import { VerifiedBadge } from "@/components/verified-badge";
import {
  getApprovedArtistBySlug,
  getApprovedArtists,
  getPublicArtworkBySlug,
  getPublicArtworksByArtist,
  getPublicCommunityPosts,
  getPublicRegionalArtForms,
} from "@/lib/data";

type ArtistPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getApprovedArtists().map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({
  params,
}: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = getApprovedArtistBySlug(slug);

  if (!artist) {
    return { title: "Artist not found" };
  }

  return {
    title: artist.name,
    description: artist.bio,
  };
}

export default async function ArtistProfilePage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = getApprovedArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  const artistArtworks = getPublicArtworksByArtist(artist.slug);
  const regionalArtForms = getPublicRegionalArtForms();
  const tradition =
    regionalArtForms.find((form) =>
      artist.styles.some((style) =>
        form.name.toLowerCase().includes(style.toLowerCase()),
      ),
    ) ?? regionalArtForms.find((form) => form.state === artist.state);
  const recentPosts = getPublicCommunityPosts()
    .filter((post) => post.artistSlug === artist.slug)
    .slice(0, 3);
  const topArtwork = getPublicArtworkBySlug(artist.topArtworkSlug);

  return (
    <>
      <section className="bg-[#C0DD97] py-12">
        <div className="container-shell grid gap-8 lg:grid-cols-[360px_1fr] lg:items-end">
          <ArtworkVisual
            visual={artist.visual}
            label={`${artist.name} featured artwork`}
            className="aspect-square rounded-xl"
          />
          <div>
            <div className="flex flex-wrap items-center gap-3">
              {artist.verified ? <VerifiedBadge label="Verified artist" /> : null}
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#5F8F2F]">
                <MapPin size={16} aria-hidden="true" />
                {artist.city}, {artist.state}
              </span>
            </div>
            <h1 className="mt-5 font-display text-6xl leading-tight text-[#3B6D11] sm:text-7xl">
              {artist.name}
            </h1>
            <div className="mt-5 flex flex-wrap gap-2">
              {artist.styles.map((style) => (
                <TagPill key={style} tone="amber" className="text-sm">
                  {style}
                </TagPill>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-[#24231F]">
              {artist.bio}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/artworks/${artist.topArtworkSlug}#request`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E76F51] px-5 font-semibold text-white hover:bg-[#d65e42]"
              >
                <MessageSquare size={17} aria-hidden="true" />
                Commission this artist
              </Link>
              <button className="inline-flex min-h-11 items-center rounded-full border border-[#3B6D11] px-5 font-semibold text-[#3B6D11] hover:bg-[#FAF7F2]/55">
                Follow
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <SectionHeader
              title="Artist Story"
              subtitle="A personal atelier page shaped around process, region, and practice."
            />
            <p className="mt-6 text-lg leading-9 text-[#6F6A60]">
              {artist.story}
            </p>
          </div>
          <div className="grid gap-3">
            {[
              {
                label: "Profile views",
                value: artist.profileViews.toLocaleString("en-IN"),
                icon: BarChart3,
              },
              {
                label: "Followers",
                value: artist.followers.toLocaleString("en-IN"),
                icon: Users,
              },
              {
                label: "Audience",
                value: artist.audienceLocation,
                icon: MapPin,
              },
            ].map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-4"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#6F6A60]">
                    <Icon size={17} aria-hidden="true" />
                    {metric.label}
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-[#3B6D11]">
                    {metric.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-shell">
          <SectionHeader
            title="Portfolio"
            subtitle="Original works, digital studies, prints, and handmade pieces below the fold."
          />
          <div className="masonry-columns mt-8">
            {artistArtworks.map((artwork, index) => (
              <div key={artwork.id} className="masonry-item">
                <ArtworkCard artwork={artwork} compact={index % 2 === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeader
              title="About the tradition"
              subtitle="Regional context behind the artist's practice."
            />
            <div className="mt-6 rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5">
              <p className="text-sm font-semibold text-[#5F8F2F]">
                {tradition?.state ?? artist.state} · {tradition?.medium ?? artist.mediums[0]}
              </p>
              <h2 className="mt-2 font-display text-3xl text-[#3B6D11]">
                {tradition?.name ?? artist.styles[0]}
              </h2>
              <p className="mt-3 leading-8 text-[#6F6A60]">
                {tradition?.context ??
                  `${artist.name}'s practice is rooted in ${artist.region}, with work shaped by local materials, memory, and regional visual language.`}
              </p>
            </div>
          </div>
          <div>
            <SectionHeader
              title="Recent community posts"
              subtitle="Process notes and updates from the studio."
            />
            <div className="mt-6 grid gap-3">
              {recentPosts.length ? (
                recentPosts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-4"
                    style={{ borderLeft: `5px solid ${post.accent}` }}
                  >
                    <p className="leading-7 text-[#24231F]">{post.text}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <TagPill key={tag}>#{tag}</TagPill>
                      ))}
                    </div>
                  </article>
                ))
              ) : (
                <p className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-4 leading-7 text-[#6F6A60]">
                  No community posts from this artist yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5">
            <SectionHeader
              title="Contact / inquiry"
              subtitle="Start with an inquiry. Chitravan does not support checkout or payments yet."
            />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-[#24231F]">
                  {topArtwork?.title ?? "Featured artwork"}
                </p>
                <p className="mt-1 text-[#6F6A60]">
                  Send a buying or commission inquiry through the artwork page.
                </p>
              </div>
              <Link
                href={`/artworks/${artist.topArtworkSlug}#request`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E76F51] px-5 font-semibold text-white hover:bg-[#d65e42]"
              >
                <MessageSquare size={17} aria-hidden="true" />
                Open inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Link
        href={`/artworks/${artist.topArtworkSlug}#request`}
        className="fixed inset-x-4 bottom-20 z-40 inline-flex min-h-12 items-center justify-center rounded-full bg-[#E76F51] font-semibold text-white md:hidden"
      >
        Commission this artist
      </Link>
    </>
  );
}
