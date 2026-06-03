"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitInquiry, type InquiryActionState } from "@/app/actions";

type InquiryFormProps = {
  artworkSlug: string;
  artistSlug: string;
  requestTitle: string;
};

const initialState: InquiryActionState = {
  status: "idle",
  message: "",
};

export function InquiryForm({
  artworkSlug,
  artistSlug,
  requestTitle,
}: InquiryFormProps) {
  const [state, formAction, pending] = useActionState(
    submitInquiry,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-4"
    >
      <input type="hidden" name="artworkSlug" value={artworkSlug} />
      <input type="hidden" name="artistSlug" value={artistSlug} />
      <input type="hidden" name="requestTitle" value={requestTitle} />
      <div>
        <h2 className="font-display text-3xl text-[#3B6D11]">Request to buy</h2>
        <p className="mt-2 leading-7 text-[#6F6A60]">
          No checkout yet. Send a thoughtful inquiry and the artist can reply
          from their inbox.
        </p>
      </div>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-[#24231F]">
          Name
          <input
            required
            name="collectorName"
            className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 text-base outline-none focus:border-[#5F8F2F]"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#24231F]">
          Email or phone
          <input
            required
            name="contact"
            className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 text-base outline-none focus:border-[#5F8F2F]"
            placeholder="Email or WhatsApp number"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#24231F]">
          Budget or offer
          <input
            name="budgetRange"
            className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 text-base outline-none focus:border-[#5F8F2F]"
            placeholder="INR 10,000 to 20,000"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#24231F]">
          Message
          <textarea
            required
            name="message"
            rows={4}
            className="rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 py-2 text-base outline-none focus:border-[#5F8F2F]"
            placeholder="Share what you like, timing, and delivery city."
          />
        </label>
      </div>
      {state.message ? (
        <p
          className={`mt-4 rounded-lg px-3 py-2 text-sm font-medium ${
            state.status === "error"
              ? "bg-[#E76F51]/12 text-[#9f3d26]"
              : "bg-[#FAF7F2]/55 text-[#3B6D11]"
          }`}
        >
          {state.message}
        </p>
      ) : null}
      <button
        disabled={pending}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#E76F51] px-5 font-semibold text-white transition hover:bg-[#d65e42] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Send size={16} aria-hidden="true" />
        {pending ? "Sending inquiry" : "Submit inquiry"}
      </button>
    </form>
  );
}
