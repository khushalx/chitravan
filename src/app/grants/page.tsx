import type { Metadata } from "next";
import { ChallengeCard } from "@/components/challenge-card";
import { CollaborationCallCard } from "@/components/collaboration-call-card";
import { GrantCard } from "@/components/grant-card";
import { SectionHeader } from "@/components/section-header";
import { SponsoredAd } from "@/components/sponsored-ad";
import {
  collaborationCalls,
  grantListings,
  monthlyChallenges,
  sponsoredAds,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Challenges & grants",
  description:
    "Find monthly art challenges, collaboration calls, and support opportunities for emerging artists.",
};

export default function GrantsRoute() {
  const [featuredChallenge, ...otherChallenges] = monthlyChallenges;

  return (
    <section className="py-14">
      <div className="container-shell">
        <SectionHeader
          title="Challenges & grants"
          subtitle="Find monthly art challenges, collaboration calls, and support opportunities for emerging artists."
        />
        <div className="mt-8 grid gap-8">
          <section>
            <ChallengeCard challenge={featuredChallenge} featured />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {otherChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-4xl text-[#3B6D11]">
              Brand collaboration calls
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {collaborationCalls.map((call) => (
                <CollaborationCallCard key={call.id} call={call} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-4xl text-[#3B6D11]">
              Grant listings
            </h2>
            <p className="mt-2 max-w-3xl leading-7 text-[#6F6A60]">
              These are fictional sample listings for the current local prototype.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {grantListings.map((grant) => (
                <GrantCard key={grant.id} grant={grant} />
              ))}
            </div>
          </section>

          <SponsoredAd ad={sponsoredAds[0]} />
        </div>
      </div>
    </section>
  );
}
