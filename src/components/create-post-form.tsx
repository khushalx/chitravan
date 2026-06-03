"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { SuccessMessage } from "@/components/success-message";

export function CreatePostForm() {
  const [success, setSuccess] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("Your post has been shared with the community.");
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
      <h2 className="font-display text-3xl text-[#3B6D11]">Create post</h2>
      <div className="mt-4 grid gap-3">
        <textarea required placeholder="Post text" rows={4} className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 py-3 outline-none" />
        <select className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none">
          <option>Work in progress</option>
          <option>Process note</option>
          <option>Finished work</option>
          <option>Workshop update</option>
          <option>Challenge entry</option>
        </select>
        <input placeholder="Tags" className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none" />
        <button type="button" className="inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-sm font-semibold text-[#3B6D11]">
          <ImagePlus size={16} aria-hidden="true" />
          Image/video placeholder
        </button>
        <button type="submit" className="min-h-11 rounded-full bg-[#E76F51] px-4 text-sm font-semibold text-white">
          Publish
        </button>
        {success ? <SuccessMessage message={success} /> : null}
      </div>
    </form>
  );
}
