"use client";

import { useMemo, useState } from "react";
import { CommunityPostCard } from "@/components/community-post-card";
import { EmptyState } from "@/components/empty-state";
import { PostComposer } from "@/components/post-composer";
import { SponsoredAd } from "@/components/sponsored-ad";
import type { CommunityPost } from "@/lib/data";
import {
  getApprovedArtistBySlug,
  getApprovedArtists,
  getPublicArtworkBySlug,
  getPublicCommunityPosts,
  sponsoredAds,
} from "@/lib/data";

export function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(getPublicCommunityPosts());
  const approvedArtists = getApprovedArtists();

  const trendingStyles = useMemo(
    () =>
      Array.from(new Set(approvedArtists.flatMap((artist) => artist.styles))).slice(0, 7),
    [approvedArtists],
  );
  const suggestedArtists = approvedArtists
    .slice()
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 4);

  function addPost(post: {
    text: string;
    postType: CommunityPost["postType"];
    tags: string[];
  }) {
    setPosts((current) => [
      {
        id: `local-${Date.now()}`,
        artistSlug: "ananya-jha",
        postType: post.postType,
        postedAt: "Just now",
        text: post.text,
        tags: post.tags.length ? post.tags : ["process"],
        comments: 0,
        likes: 0,
        accent: "#D96C9F",
        artworkSlug: "green-mithila-birds",
      },
      ...current,
    ]);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
      <main className="grid gap-4">
        <PostComposer onPost={addPost} />
        {posts.length ? (
          posts.map((post, index) => {
            const artist = getApprovedArtistBySlug(post.artistSlug);
            const artwork = getPublicArtworkBySlug(post.artworkSlug);
            if (!artist || !artwork) return null;

            return (
              <div key={post.id} className="grid gap-4">
                <CommunityPostCard post={post} artist={artist} artwork={artwork} />
                {(index + 1) % 4 === 0 ? (
                  <SponsoredAd ad={sponsoredAds[index % sponsoredAds.length]} />
                ) : null}
              </div>
            );
          })
        ) : (
          <EmptyState
            title="No community posts yet"
            description="Share a process note or follow artists to begin filling your community feed."
          />
        )}
      </main>
      <aside className="grid content-start gap-4">
        <section className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-4">
          <h2 className="font-display text-3xl text-[#3B6D11]">
            Trending art styles
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {trendingStyles.map((style) => (
              <span
                key={style}
                className="rounded-full bg-[#D9A441]/18 px-3 py-1 text-sm font-semibold text-[#7a5b15]"
              >
                {style}
              </span>
            ))}
          </div>
        </section>
        <section className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-4">
          <h2 className="font-display text-3xl text-[#3B6D11]">
            Suggested artists
          </h2>
          <div className="mt-4 grid gap-3">
            {suggestedArtists.map((artist) => (
              <div
                key={artist.slug}
                className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] p-3"
              >
                <p className="font-semibold text-[#24231F]">{artist.name}</p>
                <p className="text-sm text-[#6F6A60]">
                  {artist.state} · {artist.styles[0]}
                </p>
              </div>
            ))}
          </div>
        </section>
        <SponsoredAd ad={sponsoredAds[1]} compact />
      </aside>
    </div>
  );
}
