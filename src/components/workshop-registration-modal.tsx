"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { SuccessMessage } from "@/components/success-message";
import type { Workshop } from "@/lib/data";

type WorkshopRegistrationModalProps = {
  workshop: Workshop | null;
  open: boolean;
  onClose: () => void;
};

export function WorkshopRegistrationModal({
  workshop,
  open,
  onClose,
}: WorkshopRegistrationModalProps) {
  const [success, setSuccess] = useState("");

  function submitRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!workshop) return;
    setSuccess(
      workshop.access === "Free"
        ? "You’re registered for this workshop."
        : "Payment integration coming soon. Your interest has been saved.",
    );
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setSuccess("");
        onClose();
      }}
      title={workshop ? `Register for ${workshop.title}` : "Register"}
      description="Share a few details so the artist can prepare the session."
    >
      <form onSubmit={submitRegistration} className="grid gap-3">
        <label>
          <span className="text-sm font-semibold text-[#6F6A60]">Name</span>
          <input
            required
            className="mt-1 min-h-11 w-full rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none"
          />
        </label>
        <label>
          <span className="text-sm font-semibold text-[#6F6A60]">
            Email or phone
          </span>
          <input
            required
            className="mt-1 min-h-11 w-full rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none"
          />
        </label>
        <label>
          <span className="text-sm font-semibold text-[#6F6A60]">
            Experience level
          </span>
          <select className="mt-1 min-h-11 w-full rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>
        <label>
          <span className="text-sm font-semibold text-[#6F6A60]">
            Message/question
          </span>
          <textarea
            rows={4}
            className="mt-1 w-full rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 py-3 outline-none"
          />
        </label>
        <button
          type="submit"
          className="min-h-11 rounded-full bg-[#E76F51] px-5 text-sm font-semibold text-white hover:bg-[#d65e42]"
        >
          Register
        </button>
        {success ? <SuccessMessage message={success} /> : null}
      </form>
    </Modal>
  );
}
