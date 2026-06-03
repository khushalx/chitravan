"use client";

import { useState } from "react";
import { Camera, Copy, MessageCircle, Share2 } from "lucide-react";

type ShareToolsProps = {
  title: string;
  artistName: string;
  path: string;
};

export function ShareTools({ title, artistName, path }: ShareToolsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = new URL(
    path,
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://chitravan.vercel.app",
  ).toString();

  async function shareNative() {
    const text = `${title} by ${artistName} on Chitravan`;

    if (navigator.share) {
      await navigator.share({ title, text, url: shareUrl });
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={shareNative}
        className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#3B6D11] px-4 text-sm font-semibold text-white hover:bg-[#2f570d]"
      >
        <Share2 size={16} aria-hidden="true" />
        Share
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} by ${artistName} ${shareUrl}`)}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-sm font-semibold text-[#3B6D11] hover:bg-[#FAF8F4]"
      >
        <MessageCircle size={16} aria-hidden="true" />
        Share on WhatsApp
      </a>
      <button className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-sm font-semibold text-[#D96C9F] hover:bg-[#FAF8F4]">
        <Camera size={16} aria-hidden="true" />
        Share on Instagram
      </button>
      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(`${title} by ${artistName}`)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-sm font-semibold text-[#24231F] hover:bg-[#FAF8F4]"
      >
        X
        <span>Share on X</span>
      </a>
      <button
        onClick={copyLink}
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-sm font-semibold text-[#6F6A60] hover:bg-[#FAF8F4]"
      >
        <Copy size={16} aria-hidden="true" />
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
