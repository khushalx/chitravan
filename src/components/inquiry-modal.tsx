"use client";

import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";

type InquiryModalProps = {
  artworkTitle: string;
  artistName: string;
};

export function InquiryModal({ artworkTitle, artistName }: InquiryModalProps) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  function closeModal() {
    setOpen(false);
    setSent(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#E76F51] px-5 font-semibold text-white hover:bg-[#d65e42]"
      >
        <MessageSquare size={17} aria-hidden="true" />
        Request to buy
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#24231F]/45 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-title"
        >
          <form
            onSubmit={submitInquiry}
            className="w-full max-w-lg rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#5F8F2F]">
                  {artistName}
                </p>
                <h2
                  id="inquiry-title"
                  className="font-display text-3xl text-[#3B6D11]"
                >
                  Request {artworkTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close inquiry form"
                className="inline-flex size-10 items-center justify-center rounded-full border border-[#CFC8BA] text-[#6F6A60]"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>
            {sent ? (
              <div className="mt-6 rounded-lg bg-[#C0DD97]/45 px-4 py-3 font-semibold text-[#3B6D11]">
                Your inquiry has been sent to the artist.
              </div>
            ) : (
              <div className="mt-5 grid gap-4">
                <label className="grid gap-2 text-sm font-semibold text-[#24231F]">
                  Name
                  <input
                    required
                    className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 text-base outline-none focus:border-[#5F8F2F]"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#24231F]">
                  Email or phone
                  <input
                    required
                    className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 text-base outline-none focus:border-[#5F8F2F]"
                    placeholder="Email or WhatsApp number"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#24231F]">
                  Budget or offer
                  <input
                    className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 text-base outline-none focus:border-[#5F8F2F]"
                    placeholder="INR 10,000 to 20,000"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[#24231F]">
                  Message
                  <textarea
                    required
                    rows={4}
                    className="rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 py-2 text-base outline-none focus:border-[#5F8F2F]"
                    placeholder="Share what you like, timing, and delivery city."
                  />
                </label>
                <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#E76F51] px-5 font-semibold text-white hover:bg-[#d65e42]">
                  <Send size={16} aria-hidden="true" />
                  Submit inquiry
                </button>
              </div>
            )}
          </form>
        </div>
      ) : null}
    </>
  );
}
