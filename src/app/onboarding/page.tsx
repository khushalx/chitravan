import type { Metadata } from "next";
import { OnboardingFlow } from "@/components/onboarding-flow";
import { SectionHeader } from "@/components/section-header";

export const metadata: Metadata = {
  title: "Artist Onboarding",
  description:
    "Five-step artist onboarding flow for Chitravan profiles and first artwork publishing.",
};

export default function OnboardingPage() {
  return (
    <section className="py-14">
      <div className="container-shell">
        <SectionHeader
          title="Artist Onboarding"
          subtitle="A simple five-step flow for profile details, region, tags, first artwork, and publishing."
        />
        <div className="mt-8">
          <OnboardingFlow />
        </div>
      </div>
    </section>
  );
}
