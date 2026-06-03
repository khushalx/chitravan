import { Handshake } from "lucide-react";
import type { CollaborationCall } from "@/lib/data";

type CollaborationCallCardProps = {
  call: CollaborationCall;
};

export function CollaborationCallCard({ call }: CollaborationCallCardProps) {
  return (
    <article className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
      <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-[#D9A441]">
        <Handshake size={17} aria-hidden="true" />
        Brand collaboration call
      </p>
      <h3 className="mt-3 font-display text-3xl text-[#3B6D11]">{call.title}</h3>
      <p className="mt-3 leading-7 text-[#6F6A60]">{call.description}</p>
      <div className="mt-4 grid gap-2 text-sm font-semibold text-[#24231F]">
        <p>Art style needed: {call.artStyleNeeded}</p>
        <p>Budget range: {call.budgetRange}</p>
        <p>Deadline: {call.deadline}</p>
        <p>Region preference: {call.regionPreference}</p>
      </div>
      <button
        type="button"
        className="mt-5 min-h-10 rounded-full border border-[#3B6D11] px-4 text-sm font-semibold text-[#3B6D11] hover:bg-[#F7F5F0]"
      >
        Apply
      </button>
    </article>
  );
}
