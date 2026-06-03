"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, UploadCloud } from "lucide-react";

const steps = [
  "Basic details",
  "Region and state",
  "Art forms and tags",
  "Upload first artwork",
  "Publish profile",
];

export function OnboardingFlow() {
  const [step, setStep] = useState(0);

  return (
    <section className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5">
      <div className="grid gap-3 sm:grid-cols-5">
        {steps.map((item, index) => (
          <button
            key={item}
            onClick={() => setStep(index)}
            className={`rounded-lg border px-3 py-3 text-left text-sm font-semibold ${
              index === step
                ? "border-[#3B6D11] bg-[#FAF7F2]/45 text-[#3B6D11]"
                : "border-[#CFC8BA] bg-[#FAF7F2] text-[#6F6A60]"
            }`}
          >
            <span className="block text-xs">Step {index + 1}</span>
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {step === 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              Artist name
              <input className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 outline-none focus:border-[#5F8F2F]" />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Short bio
              <input className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 outline-none focus:border-[#5F8F2F]" />
            </label>
          </div>
        ) : null}
        {step === 1 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              State
              <select className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 outline-none focus:border-[#5F8F2F]">
                <option>Bihar</option>
                <option>Maharashtra</option>
                <option>Odisha</option>
                <option>Tamil Nadu</option>
                <option>Rajasthan</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              City or region
              <input className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 outline-none focus:border-[#5F8F2F]" />
            </label>
          </div>
        ) : null}
        {step === 2 ? (
          <div>
            <p className="text-sm font-semibold text-[#24231F]">
              Choose the tags that fit your practice
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Traditional",
                "Digital",
                "Handmade",
                "Painting",
                "Textile",
                "Sculpture",
                "Madhubani",
                "Warli",
                "Gond",
              ].map((tag) => (
                <label
                  key={tag}
                  className="cursor-pointer rounded-full border border-[#CFC8BA] px-3 py-2 text-sm font-semibold text-[#3B6D11]"
                >
                  <input type="checkbox" className="sr-only" />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        ) : null}
        {step === 3 ? (
          <div className="rounded-xl border border-dashed border-[#CFC8BA] bg-[#FAF7F2] p-8 text-center">
            <UploadCloud
              size={32}
              className="mx-auto text-[#3B6D11]"
              aria-hidden="true"
            />
            <h2 className="mt-3 font-display text-3xl text-[#3B6D11]">
              Upload first artwork
            </h2>
            <p className="mx-auto mt-2 max-w-md leading-7 text-[#6F6A60]">
              Add an image, title, art form, region, price or price on request,
              and cultural context.
            </p>
          </div>
        ) : null}
        {step === 4 ? (
          <div className="rounded-xl border border-[#CFC8BA] bg-[#FAF7F2]/35 p-6">
            <h2 className="font-display text-3xl text-[#3B6D11]">
              Ready to publish
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#6F6A60]">
              Your public profile, first artwork, and inquiry button are ready
              for review before going live.
            </p>
          </div>
        ) : null}
      </div>
      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <button
          disabled={step === 0}
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-sm font-semibold text-[#3B6D11] disabled:opacity-45"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back
        </button>
        <button
          onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#3B6D11] px-4 text-sm font-semibold text-white"
        >
          {step === steps.length - 1 ? (
            <>
              <Check size={15} aria-hidden="true" />
              Publish profile
            </>
          ) : (
            <>
              Continue
              <ArrowRight size={15} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
