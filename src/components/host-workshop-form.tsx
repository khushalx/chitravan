"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { SuccessMessage } from "@/components/success-message";

export function HostWorkshopForm() {
  const [access, setAccess] = useState("Free");
  const [success, setSuccess] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(
      access === "Ticketed"
        ? "Ticket payments will be available later."
        : "Workshop draft saved for review.",
    );
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
      <h2 className="font-display text-3xl text-[#3B6D11]">Host workshop</h2>
      <div className="mt-4 grid gap-3">
        <input required placeholder="Workshop title" className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none" />
        <input placeholder="Art form" className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none" />
        <select className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none">
          <option>Live</option>
          <option>Recorded</option>
        </select>
        <select value={access} onChange={(event) => setAccess(event.target.value)} className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none">
          <option>Free</option>
          <option>Ticketed</option>
        </select>
        <input placeholder="Date/time" className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none" />
        <input placeholder="Duration" className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none" />
        <textarea placeholder="Description" rows={3} className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 py-3 outline-none" />
        <input placeholder="Seats" className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 outline-none" />
        <textarea placeholder="Requirements/materials" rows={3} className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 py-3 outline-none" />
        <button type="submit" className="min-h-11 rounded-full bg-[#3B6D11] px-4 text-sm font-semibold text-white">
          Submit
        </button>
        {success ? <SuccessMessage message={success} /> : null}
      </div>
    </form>
  );
}
