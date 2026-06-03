import { CheckCircle2, Circle } from "lucide-react";

const checklist = [
  { label: "Add profile photo", done: true },
  { label: "Add artist story", done: true },
  { label: "Upload 3 artworks", done: true },
  { label: "Add region and art tags", done: true },
  { label: "Add contact preference", done: false },
];

export function ProfileCompletionCard() {
  return (
    <article className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-[#3B6D11]">
            Profile completion
          </h2>
          <p className="mt-2 leading-7 text-[#6F6A60]">
            Mock progress for your public artist profile.
          </p>
        </div>
        <div className="min-w-44">
          <div className="h-3 overflow-hidden rounded-full bg-[#F7F5F0]">
            <div className="h-full w-[82%] rounded-full bg-[#3B6D11]" />
          </div>
          <p className="mt-2 text-sm font-semibold text-[#3B6D11]">
            82% complete
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {checklist.map((item) => (
          <p
            key={item.label}
            className="flex items-center gap-2 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 py-2 text-sm font-semibold text-[#24231F]"
          >
            {item.done ? (
              <CheckCircle2 size={16} className="text-[#3B6D11]" aria-hidden="true" />
            ) : (
              <Circle size={16} className="text-[#6F6A60]" aria-hidden="true" />
            )}
            {item.label}
          </p>
        ))}
      </div>
    </article>
  );
}
