"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { SuccessMessage } from "@/components/success-message";

type ChallengeSubmissionModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ChallengeSubmissionModal({
  open,
  onClose,
}: ChallengeSubmissionModalProps) {
  const [success, setSuccess] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("Your challenge submission has been received.");
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setSuccess("");
        onClose();
      }}
      title="Submit challenge artwork"
      description="This is a local mock submission flow for now."
    >
      <form onSubmit={submit} className="grid gap-3">
        {["Artist name", "Email or phone", "Artwork title"].map((label) => (
          <label key={label}>
            <span className="text-sm font-semibold text-[#6F6A60]">{label}</span>
            <input
              required
              className="mt-1 min-h-11 w-full rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none"
            />
          </label>
        ))}
        <label>
          <span className="text-sm font-semibold text-[#6F6A60]">
            Artwork link or upload placeholder
          </span>
          <input className="mt-1 min-h-11 w-full rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none" />
        </label>
        <label>
          <span className="text-sm font-semibold text-[#6F6A60]">
            Short description
          </span>
          <textarea
            required
            rows={4}
            className="mt-1 w-full rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 py-3 outline-none"
          />
        </label>
        <button
          type="submit"
          className="min-h-11 rounded-full bg-[#E76F51] px-5 text-sm font-semibold text-white hover:bg-[#d65e42]"
        >
          Submit
        </button>
        {success ? <SuccessMessage message={success} /> : null}
      </form>
    </Modal>
  );
}
