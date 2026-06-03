"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { SuccessMessage } from "@/components/success-message";

export function ArtworkUploadForm() {
  const [success, setSuccess] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("Artwork added to your portfolio.");
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
      <h2 className="font-display text-3xl text-[#3B6D11]">Upload artwork</h2>
      <div className="mt-4 grid gap-3">
        <input required placeholder="Artwork title" className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none" />
        <select className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none">
          <option>Original</option>
          <option>Print</option>
          <option>Digital art</option>
          <option>Handmade</option>
        </select>
        <input placeholder="Art style/tradition" className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none" />
        <input placeholder="State/region" className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none" />
        <input placeholder="Price" className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none" />
        <label className="flex items-center gap-2 text-sm font-semibold text-[#24231F]">
          <input type="checkbox" className="size-4 accent-[#3B6D11]" />
          Price on request
        </label>
        <textarea required placeholder="Description" rows={3} className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 py-3 outline-none" />
        <textarea placeholder="Cultural context" rows={3} className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 py-3 outline-none" />
        <button type="button" className="inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-sm font-semibold text-[#3B6D11]">
          <ImagePlus size={16} aria-hidden="true" />
          Image upload placeholder
        </button>
        <label className="flex items-center gap-2 text-sm font-semibold text-[#24231F]">
          <input type="checkbox" className="size-4 accent-[#3B6D11]" />
          Featured artwork
        </label>
        <button type="submit" className="min-h-11 rounded-full bg-[#3B6D11] px-4 text-sm font-semibold text-white">
          Save artwork
        </button>
        {success ? <SuccessMessage message={success} /> : null}
      </div>
    </form>
  );
}
