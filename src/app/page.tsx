import Link from "next/link";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { ArtistCard } from "@/components/artist-card";
import { ArtworkCard } from "@/components/artwork-card";
import { ArtworkVisual } from "@/components/artwork-visual";
import { CommunityPostCard } from "@/components/community-post-card";
import { SectionHeader } from "@/components/section-header";
import { SponsoredAd } from "@/components/sponsored-ad";
import {
  artists,
  artworks,
  collaborationCalls,
  communityPosts,
  getArtistBySlug,
  getArtworkBySlug,
  getFeaturedArtworks,
  grantListings,
  monthlyChallenges,
  regionalArtForms,
  sponsoredAds,
  workshops,
} from "@/lib/data";

export default function Home() {
  const featuredWorks = getFeaturedArtworks();
  const opportunityPreview = [
    ...monthlyChallenges.slice(0, 1).map((item) => ({
      id: item.id,
      type: "Challenge",
      title: item.title,
      description: item.description,
      deadline: item.deadline,
    })),
    ...collaborationCalls.slice(0, 1).map((item) => ({
      id: item.id,
      type: "Collaboration",
      title: item.title,
      description: item.description,
      deadline: item.deadline,
    })),
    ...grantListings.slice(0, 1).map((item) => ({
      id: item.id,
      type: "Grant",
      title: item.title,
      description: item.description,
      deadline: item.deadline,
    })),
  ];

  return (
    <>
      <section className="hero-section relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#FAF7F2]">
        <div className="absolute inset-y-0 right-0 hidden w-52 sm:block">
          {artworks.slice(5, 9).map((artwork, index) => (
            <ArtworkVisual
              key={artwork.id}
              visual={artwork.visual}
              label={`${artwork.title} thumbnail fragment`}
              className="hero-artwork-card absolute aspect-square w-36 rounded-[16px] opacity-70"
              style={{
                top: `${10 + index * 21}%`,
                right: index % 2 ? "-22px" : "38px",
              }}
            />
          ))}
        </div>
        <div className="container-shell relative z-10 grid min-h-[calc(100vh-80px)] items-center py-14">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#2D5016]/20 bg-[#FAF7F2]/55 px-4 py-2 text-sm font-semibold text-[#2D5016]">
              <Sparkles size={16} aria-hidden="true" />
              चित्रवन
            </p>
            <h1 className="mt-7 font-display text-6xl leading-[1.03] text-[#2D5016] sm:text-7xl lg:text-8xl">
              India&apos;s forest of art
            </h1>
            <p className="mt-4 font-display text-4xl text-[#639922]">
              चित्रवन
            </p>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-[#4A4A3F]">
              Discover artists, regional traditions, process stories, and
              original creative work from across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/artists"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#C94F2A] px-6 font-semibold text-white transition hover:bg-[#b94728]"
              >
                Start exploring
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/auth"
                className="inline-flex min-h-12 items-center rounded-full border border-[#2D5016] bg-transparent px-6 font-semibold text-[#2D5016] transition hover:bg-[#FAF7F2]/55"
              >
                Join as artist
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-shell">
          <SectionHeader
            title="Featured Artists"
            subtitle="A first walk through artists shaping Chitravan across regions, media, and traditions."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {artists.slice(0, 4).map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F4] py-16">
        <div className="container-shell">
          <SectionHeader
            title="Regional Art Discovery"
            subtitle="Explore Indian art traditions by state, story, and material context."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {regionalArtForms.slice(0, 8).map((form) => (
              <article
                key={form.slug}
                className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF7F2] p-4"
              >
                <ArtworkVisual
                  visual={form.visual}
                  label={`${form.name} preview`}
                  className="aspect-square rounded-lg"
                />
                <h3 className="mt-4 font-display text-3xl text-[#3B6D11]">
                  {form.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#5F8F2F]">
                  {form.state} · {form.medium}
                </p>
                <p className="mt-3 leading-7 text-[#6F6A60]">{form.context}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-shell">
          <SectionHeader
            title="Community Feed Preview"
            subtitle="Work-in-progress notes, studio updates, and living process from artists."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-4">
              {communityPosts.slice(0, 3).map((post) => {
                const artist = getArtistBySlug(post.artistSlug);
                const artwork = getArtworkBySlug(post.artworkSlug);
                if (!artist || !artwork) return null;
                return (
                  <CommunityPostCard
                    key={post.id}
                    post={post}
                    artist={artist}
                    artwork={artwork}
                  />
                );
              })}
            </div>
            <SponsoredAd ad={sponsoredAds[1]} />
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F4] py-16">
        <div className="container-shell">
          <SectionHeader
            title="Artwork Marketplace Preview"
            subtitle="Discovery first, inquiry next. No checkout or payment flow in this MVP."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredWorks.slice(0, 4).map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeader
              title="Workshops Preview"
              subtitle="Live and recorded classes for artists and curious collectors."
            />
            <div className="mt-8 grid gap-4">
              {workshops.slice(0, 3).map((workshop) => {
                const teacher = getArtistBySlug(workshop.teacherSlug);
                return (
                  <article
                    key={workshop.id}
                    className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase text-[#6F6A60]">
                      <span>{workshop.format}</span>
                      <span aria-hidden="true">·</span>
                      <span>{workshop.access}</span>
                    </div>
                    <h3 className="mt-2 font-display text-3xl text-[#3B6D11]">
                      {workshop.title}
                    </h3>
                    <p className="mt-1 font-semibold text-[#5F8F2F]">
                      {teacher?.name} · {workshop.artForm}
                    </p>
                    <p className="mt-3 leading-7 text-[#6F6A60]">
                      {workshop.description}
                    </p>
                    {workshop.access === "Ticketed" ? (
                      <p className="mt-3 text-sm font-semibold text-[#E76F51]">
                        Payment integration coming soon.
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
          <div>
            <SectionHeader
              title="Challenges & Grants"
              subtitle="Prompts, material support, and collaboration calls for emerging artists."
            />
            <div className="mt-8 grid gap-4">
              {opportunityPreview.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-4"
                >
                  <p className="text-xs font-semibold uppercase text-[#D9A441]">
                    {item.type}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-[#24231F]">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-7 text-[#6F6A60]">
                    {item.description}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[#3B6D11]">
                    Deadline: {item.deadline}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-shell">
          <div className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase text-[#6F6A60]">
              <BadgeCheck size={17} aria-hidden="true" />
              Sponsored
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
              <ArtworkVisual
                visual={{
                  pattern: "block",
                  colors: ["#D9A441", "#C0DD97", "#E76F51", "#3B6D11"],
                }}
                label="Sponsor artwork-inspired texture"
                className="aspect-[5/3] rounded-lg"
              />
              <div>
                <p className="text-sm font-semibold text-[#5F8F2F]">
                  {sponsoredAds[0].sponsor}
                </p>
                <h2 className="mt-2 font-display text-4xl leading-tight text-[#3B6D11]">
                  {sponsoredAds[0].title}
                </h2>
                <p className="mt-3 text-lg leading-8 text-[#6F6A60]">
                  {sponsoredAds[0].copy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
