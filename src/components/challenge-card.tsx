"use client";

import { useState } from "react";
import { ArrowRight, Trophy } from "lucide-react";
import { ChallengeSubmissionModal } from "@/components/challenge-submission-modal";
import type { MonthlyChallenge } from "@/lib/data";

type ChallengeCardProps = {
  challenge: MonthlyChallenge;
  featured?: boolean;
};

export function ChallengeCard({ challenge, featured = false }: ChallengeCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-[#D9A441]">
          <Trophy size={17} aria-hidden="true" />
          {featured ? "Monthly Art Challenge" : "Challenge"}
        </p>
        <h2 className="mt-3 font-display text-4xl leading-tight text-[#3B6D11]">
          {challenge.title}
        </h2>
        <p className="mt-2 font-semibold text-[#24231F]">
          Theme: {challenge.theme}
        </p>
        <p className="mt-3 leading-7 text-[#6F6A60]">{challenge.description}</p>
        <div className="mt-5 grid gap-3 rounded-xl border border-[#CFC8BA] bg-[#F7F5F0] p-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-[#6F6A60]">Prize details</p>
            <p className="font-semibold text-[#24231F]">{challenge.prizeDetails}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#6F6A60]">
              Submission deadline
            </p>
            <p className="font-semibold text-[#3B6D11]">{challenge.deadline}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#6F6A60]">Eligibility</p>
            <p className="font-semibold text-[#24231F]">{challenge.eligibility}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#6F6A60]">
              Submission count
            </p>
            <p className="font-semibold text-[#24231F]">
              {challenge.submissions} submissions
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E76F51] px-5 text-sm font-semibold text-white hover:bg-[#d65e42]"
        >
          Submit artwork
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </article>
      <ChallengeSubmissionModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
