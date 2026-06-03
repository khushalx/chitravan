"use client";

import { RotateCcw } from "lucide-react";
import { ErrorState } from "@/components/error-state";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-14">
      <div className="container-shell">
        <ErrorState
          title="This part of Chitravan did not load"
          description={
            error.message ||
            "Please try again. The page state can be refreshed safely."
          }
        />
        <button
          onClick={reset}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#3B6D11] px-5 font-semibold text-white"
        >
          <RotateCcw size={17} aria-hidden="true" />
          Try again
        </button>
      </div>
    </section>
  );
}
