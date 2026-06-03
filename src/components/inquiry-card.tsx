"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Modal } from "@/components/modal";
import { SuccessMessage } from "@/components/success-message";
import type { Inquiry } from "@/lib/data";
import { getArtworkBySlug } from "@/lib/data";

const statuses: Inquiry["status"][] = [
  "New",
  "Discussing",
  "Accepted",
  "Completed",
  "Declined",
];

const statusStyles = {
  New: "bg-[#F7F5F0] text-[#3B6D11]",
  Discussing: "bg-[#D9A441]/20 text-[#7a5b15]",
  Accepted: "bg-[#3B6D11]/12 text-[#3B6D11]",
  Completed: "bg-[#5F8F2F]/16 text-[#3B6D11]",
  Declined: "bg-[#E76F51]/12 text-[#9f3d26]",
};

type InquiryCardProps = {
  inquiry: Inquiry;
};

export function InquiryCard({ inquiry }: InquiryCardProps) {
  const [status, setStatus] = useState<Inquiry["status"]>(inquiry.status);
  const [note, setNote] = useState("");
  const [replyOpen, setReplyOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const artwork = inquiry.relatedArtworkSlug
    ? getArtworkBySlug(inquiry.relatedArtworkSlug)
    : null;

  function submitReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("Mock reply saved. Real messaging comes later.");
  }

  return (
    <>
      <article className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl text-[#3B6D11]">
              {inquiry.title}
            </h2>
            <p className="mt-1 font-semibold text-[#24231F]">
              {inquiry.collector}
            </p>
            <p className="text-sm text-[#6F6A60]">{inquiry.contact}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[status]}`}
          >
            {status}
          </span>
        </div>
        <p className="mt-4 leading-7 text-[#6F6A60]">{inquiry.description}</p>
        <div className="mt-4 grid gap-3 text-sm font-semibold text-[#24231F] md:grid-cols-3">
          <p className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] p-3">
            Budget range: {inquiry.budget}
          </p>
          <p className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] p-3">
            Timeline: {inquiry.timeline}
          </p>
          <p className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] p-3">
            Related artwork: {artwork?.title ?? "Not attached"}
          </p>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[220px_1fr]">
          <label>
            <span className="text-sm font-semibold text-[#6F6A60]">Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as Inquiry["status"])}
              className="mt-1 min-h-11 w-full rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none"
            >
              {statuses.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-sm font-semibold text-[#6F6A60]">
              Internal note
            </span>
            <input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Add a private note for yourself"
              className="mt-1 min-h-11 w-full rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={() => setReplyOpen(true)}
          className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-[#3B6D11] px-4 text-sm font-semibold text-white"
        >
          <MessageSquare size={16} aria-hidden="true" />
          Reply
        </button>
      </article>
      <Modal
        open={replyOpen}
        onClose={() => {
          setSuccess("");
          setReplyOpen(false);
        }}
        title={`Reply to ${inquiry.collector}`}
        description="This stores a mock reply only. No real messaging system is connected yet."
      >
        <form onSubmit={submitReply} className="grid gap-3">
          <textarea
            required
            rows={5}
            placeholder="Write a warm response"
            className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 py-3 outline-none"
          />
          <button
            type="submit"
            className="min-h-11 rounded-full bg-[#E76F51] px-5 text-sm font-semibold text-white"
          >
            Save mock reply
          </button>
          {success ? <SuccessMessage message={success} /> : null}
        </form>
      </Modal>
    </>
  );
}
