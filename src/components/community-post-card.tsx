"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import {
  Heart,
  Link as LinkIcon,
  MessageCircle,
  Send,
  Share2,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { ArtworkVisual } from "@/components/artwork-visual";
import type { Artist, Artwork, CommunityPost } from "@/lib/data";

type CommunityPostCardProps = {
  post: CommunityPost;
  artist: Artist;
  artwork: Artwork;
};

export function CommunityPostCard({
  post,
  artist,
  artwork,
}: CommunityPostCardProps) {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [commentDraft, setCommentDraft] = useState("");
  const [commentCount, setCommentCount] = useState(post.comments);
  const [shareStatus, setShareStatus] = useState("");

  function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!commentDraft.trim()) return;
    setCommentCount((count) => count + 1);
    setCommentDraft("");
  }

  async function sharePost() {
    const shareUrl = `https://chitravan.example/community?post=${post.id}`;
    const shareData = {
      title: `${artist.name} on Chitravan`,
      text: post.text,
      url: shareUrl,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      setShareStatus("Shared");
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus("Mock link copied");
      return;
    }

    setShareStatus("Mock link ready");
  }

  return (
    <article
      className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-4"
      style={{ borderLeft: `5px solid ${post.accent}` }}
    >
      <div className="flex items-start gap-3">
        <ArtworkVisual
          visual={artist.visual}
          label={`${artist.name} avatar`}
          className="size-12 shrink-0 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-[#24231F]">{artist.name}</h2>
              <p className="text-sm text-[#6F6A60]">
                {artist.city}, {artist.state} · {post.postedAt}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFollowing((value) => !value)}
              aria-pressed={following}
              className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#CFC8BA] px-3 text-sm font-semibold text-[#3B6D11] hover:bg-[#FAF7F2]"
            >
              {following ? (
                <UserCheck size={15} aria-hidden="true" />
              ) : (
                <UserPlus size={15} aria-hidden="true" />
              )}
              {following ? "Following" : "Follow artist"}
            </button>
          </div>

          <span className="mt-4 inline-flex rounded-full bg-[#D9A441]/18 px-3 py-1 text-xs font-semibold text-[#7a5b15]">
            {post.postType}
          </span>
          <p className="mt-3 text-lg leading-8 text-[#24231F]">{post.text}</p>

          <ArtworkVisual
            visual={artwork.visual}
            label={`${artwork.title} post media`}
            className="mt-4 aspect-[4/3] rounded-lg"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#F7F5F0] px-3 py-1 text-xs font-semibold text-[#5F8F2F]"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setLiked((value) => !value)}
              aria-pressed={liked}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-[#D96C9F] hover:bg-[#F7F5F0]"
            >
              <Heart
                size={16}
                fill={liked ? "currentColor" : "none"}
                aria-hidden="true"
              />
              {post.likes + (liked ? 1 : 0)}
            </button>
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-[#6F6A60]">
              <MessageCircle size={16} aria-hidden="true" />
              {commentCount}
            </span>
            <button
              type="button"
              onClick={sharePost}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-[#3B6D11] hover:bg-[#F7F5F0]"
            >
              {shareStatus ? (
                <LinkIcon size={16} aria-hidden="true" />
              ) : (
                <Share2 size={16} aria-hidden="true" />
              )}
              {shareStatus || "Share"}
            </button>
          </div>

          <form onSubmit={addComment} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor={`comment-${post.id}`}>
              Add a comment
            </label>
            <input
              id={`comment-${post.id}`}
              value={commentDraft}
              onChange={(event) => setCommentDraft(event.target.value)}
              placeholder="Add a kind comment"
              className="min-h-11 flex-1 rounded-full border border-[#CFC8BA] bg-[#F7F5F0] px-4 outline-none"
            />
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#3B6D11] px-4 text-sm font-semibold text-white hover:bg-[#2f570d]"
            >
              <Send size={16} aria-hidden="true" />
              Comment
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
