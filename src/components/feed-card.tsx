"use client";

import { useState } from "react";
import { Heart, MessageCircle, Send, Share2, UserPlus } from "lucide-react";
import { ArtworkVisual } from "@/components/artwork-visual";
import type { Artist, Artwork, CommunityPost } from "@/lib/data";

type FeedCardProps = {
  post: CommunityPost;
  artist: Artist;
  artwork: Artwork;
};

export function FeedCard({ post, artist, artwork }: FeedCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <article
      className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-4"
      style={{ borderLeft: `5px solid ${post.accent}` }}
    >
      <div className="flex items-start gap-3">
        <ArtworkVisual
          visual={artist.visual}
          label={`${artist.name} avatar`}
          className="size-12 shrink-0 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-semibold text-[#24231F]">{artist.name}</h2>
              <p className="text-sm text-[#6F6A60]">
                {artist.state} · {artist.styles[0]}
              </p>
            </div>
            <button className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#CFC8BA] px-3 text-sm font-semibold text-[#3B6D11] hover:bg-[#FAF7F2]">
              <UserPlus size={15} aria-hidden="true" />
              Follow artist
            </button>
          </div>
          <p className="mt-4 text-lg leading-8 text-[#24231F]">{post.text}</p>
          <ArtworkVisual
            visual={artwork.visual}
            label={`${artwork.title} post image`}
            className="mt-4 aspect-[4/3] rounded-lg"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#FAF7F2]/65 px-3 py-1 text-xs font-semibold text-[#5F8F2F]"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold">
            <button
              onClick={() => setLiked((value) => !value)}
              aria-pressed={liked}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-[#D96C9F] hover:bg-[#FAF7F2]"
            >
              <Heart
                size={16}
                fill={liked ? "currentColor" : "none"}
                aria-hidden="true"
              />
              {post.likes + (liked ? 1 : 0)}
            </button>
            <button className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-[#6F6A60] hover:bg-[#FAF7F2]">
              <MessageCircle size={16} aria-hidden="true" />
              {post.comments}
            </button>
            <button className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-[#3B6D11] hover:bg-[#FAF7F2]">
              <Share2 size={16} aria-hidden="true" />
              Share
            </button>
            <button className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#3B6D11] px-4 text-white hover:bg-[#2f570d]">
              <Send size={16} aria-hidden="true" />
              Comment
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
