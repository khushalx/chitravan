"use client";

import { useActionState, useState } from "react";
import { ArrowLeft, ArrowRight, Check, UploadCloud } from "lucide-react";
import type { ArtistApprovalActionState } from "@/app/actions";
import { submitArtistApplication } from "@/app/actions";
import { SuccessMessage } from "@/components/success-message";

const steps = [
  "Basic details",
  "Region and state",
  "Art forms and tags",
  "Upload first artwork",
  "Publish profile",
];

const initialApplicationState: ArtistApprovalActionState = {
  status: "idle",
  message: "",
};

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [artistName, setArtistName] = useState("");
  const [bio, setBio] = useState("");
  const [story, setStory] = useState("");
  const [stateName, setStateName] = useState("Bihar");
  const [city, setCity] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [state, formAction, pending] = useActionState(
    submitArtistApplication,
    initialApplicationState,
  );

  return (
    <form
      action={formAction}
      className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5"
    >
      <input type="hidden" name="artistName" value={artistName} />
      <input type="hidden" name="bio" value={bio} />
      <input type="hidden" name="story" value={story} />
      <input type="hidden" name="state" value={stateName} />
      <input type="hidden" name="city" value={city} />
      <input type="hidden" name="styles" value={selectedTags.join(",")} />
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
              <input
                value={artistName}
                onChange={(event) => setArtistName(event.target.value)}
                className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 outline-none focus:border-[#5F8F2F]"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Short bio
              <input
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 outline-none focus:border-[#5F8F2F]"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold md:col-span-2">
              Artist story
              <textarea
                value={story}
                onChange={(event) => setStory(event.target.value)}
                rows={4}
                className="rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 py-3 outline-none focus:border-[#5F8F2F]"
              />
            </label>
          </div>
        ) : null}
        {step === 1 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              State
              <select
                value={stateName}
                onChange={(event) => setStateName(event.target.value)}
                className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 outline-none focus:border-[#5F8F2F]"
              >
                <option>Bihar</option>
                <option>Maharashtra</option>
                <option>Odisha</option>
                <option>Tamil Nadu</option>
                <option>Rajasthan</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              City or region
              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 outline-none focus:border-[#5F8F2F]"
              />
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
                  className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold ${
                    selectedTags.includes(tag)
                      ? "border-[#3B6D11] bg-[#3B6D11] text-white"
                      : "border-[#CFC8BA] text-[#3B6D11]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={(event) => {
                      setSelectedTags((current) =>
                        event.target.checked
                          ? [...current, tag]
                          : current.filter((item) => item !== tag),
                      );
                    }}
                    className="sr-only"
                  />
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
              Your artist application will be submitted for admin review. Your
              profile and artworks will stay private until approved.
            </p>
          </div>
        ) : null}
      </div>
      {state.message ? (
        <div className="mt-6">
          {state.status === "success" ? (
            <SuccessMessage message={state.message} />
          ) : (
            <p className="rounded-lg border border-[#E76F51]/35 bg-[#E76F51]/12 px-4 py-3 text-sm font-semibold text-[#9f3d26]">
              {state.message}
            </p>
          )}
        </div>
      ) : null}
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
          type={step === steps.length - 1 ? "submit" : "button"}
          disabled={pending}
          onClick={() => {
            if (step !== steps.length - 1) {
              setStep((value) => Math.min(steps.length - 1, value + 1));
            }
          }}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#3B6D11] px-4 text-sm font-semibold text-white"
        >
          {step === steps.length - 1 ? (
            <>
              <Check size={15} aria-hidden="true" />
              {pending ? "Submitting" : "Submit for review"}
            </>
          ) : (
            <>
              Continue
              <ArrowRight size={15} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
