"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ImagePlus, Send } from "lucide-react";
import { SuccessMessage } from "@/components/success-message";
import type { CommunityPost } from "@/lib/data";

const postTypes: CommunityPost["postType"][] = [
  "Work in progress",
  "Process note",
  "Finished work",
  "Workshop update",
  "Challenge entry",
];

type PostComposerProps = {
  onPost: (post: {
    text: string;
    postType: CommunityPost["postType"];
    tags: string[];
  }) => void;
};

export function PostComposer({ onPost }: PostComposerProps) {
  const [text, setText] = useState("");
  const [postType, setPostType] = useState<CommunityPost["postType"]>(
    "Work in progress",
  );
  const [tag, setTag] = useState("");
  const [success, setSuccess] = useState("");

  function submitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text.trim()) return;
    const tags = tag
      .split(",")
      .map((item) => item.trim().replace(/^#/, ""))
      .filter(Boolean);
    onPost({ text, postType, tags });
    setText("");
    setTag("");
    setSuccess("Your post has been shared with the community.");
  }

  return (
    <form
      onSubmit={submitPost}
      className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-4"
    >
      <h2 className="font-display text-3xl text-[#3B6D11]">Share your process</h2>
      <div className="mt-4 grid gap-3">
        <label>
          <span className="sr-only">Post text</span>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="What are you making, learning, or testing today?"
            required
            rows={4}
            className="w-full rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 py-3 outline-none"
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className="text-sm font-semibold text-[#6F6A60]">
              Post type
            </span>
            <select
              value={postType}
              onChange={(event) =>
                setPostType(event.target.value as CommunityPost["postType"])
              }
              className="mt-1 min-h-11 w-full rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none"
            >
              {postTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-sm font-semibold text-[#6F6A60]">Tags</span>
            <input
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              placeholder="madhubani, process"
              className="mt-1 min-h-11 w-full rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none"
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-sm font-semibold text-[#3B6D11] hover:bg-[#F7F5F0]"
          >
            <ImagePlus size={16} aria-hidden="true" />
            Upload placeholder
          </button>
          <button
            type="submit"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E76F51] px-5 text-sm font-semibold text-white hover:bg-[#d65e42]"
          >
            <Send size={16} aria-hidden="true" />
            Post
          </button>
        </div>
        {success ? <SuccessMessage message={success} /> : null}
      </div>
    </form>
  );
}
