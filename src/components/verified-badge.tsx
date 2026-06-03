import { BadgeCheck } from "lucide-react";

export function VerifiedBadge({ label = "Verified" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#C0DD97]/70 px-2.5 py-1 text-xs font-semibold text-[#3B6D11]">
      <BadgeCheck size={14} aria-hidden="true" />
      {label}
    </span>
  );
}
