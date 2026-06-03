import type { Metadata } from "next";
import { CircleDollarSign } from "lucide-react";
import { InquiryCard } from "@/components/inquiry-card";
import { SectionHeader } from "@/components/section-header";
import { inquiries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Commissions / Inquiry Inbox",
  description:
    "Manage inquiry and commission requests without payments or real messaging.",
};

export default function InquiriesPage() {
  return (
    <section className="py-14">
      <div className="container-shell">
        <SectionHeader
          title="Commissions / Inquiry Inbox"
          subtitle="Manage inquiry-based buying and commission requests. No milestone payments or real messaging yet."
        />
        <div className="mt-8 grid gap-4">
          {inquiries.map((inquiry) => (
            <InquiryCard key={inquiry.id} inquiry={inquiry} />
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-[#6F6A60]">
            <CircleDollarSign size={17} aria-hidden="true" />
            Milestone payments
          </p>
          <p className="mt-2 font-display text-3xl text-[#3B6D11]">
            Coming later.
          </p>
        </div>
      </div>
    </section>
  );
}
