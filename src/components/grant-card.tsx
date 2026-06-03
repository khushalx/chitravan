"use client";

import { useState } from "react";
import { Bookmark, Gift } from "lucide-react";
import type { GrantListing } from "@/lib/data";

type GrantCardProps = {
  grant: GrantListing;
};

export function GrantCard({ grant }: GrantCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
      <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-[#D9A441]">
        <Gift size={17} aria-hidden="true" />
        Fictional grant listing
      </p>
      <h3 className="mt-3 font-display text-3xl text-[#3B6D11]">{grant.title}</h3>
      <p className="mt-1 font-semibold text-[#24231F]">{grant.organization}</p>
      <p className="mt-3 leading-7 text-[#6F6A60]">{grant.description}</p>
      <div className="mt-4 grid gap-2 text-sm font-semibold text-[#24231F]">
        <p>Amount/support: {grant.support}</p>
        <p>Deadline: {grant.deadline}</p>
        <p>Eligibility: {grant.eligibility}</p>
        <p>Region: {grant.region}</p>
      </div>
      <button
        type="button"
        onClick={() => setSaved((value) => !value)}
        aria-pressed={saved}
        className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-[#3B6D11] px-4 text-sm font-semibold text-[#3B6D11] hover:bg-[#F7F5F0]"
      >
        <Bookmark size={16} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
        {saved ? "Saved" : "Save grant"}
      </button>
    </article>
  );
}
