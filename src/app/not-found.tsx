import Link from "next/link";
import { ErrorState } from "@/components/error-state";

export default function NotFound() {
  return (
    <section className="py-14">
      <div className="container-shell">
        <ErrorState
          title="This path is quiet"
          description="Try exploring artists or regional traditions to find another route into Chitravan."
        />
        <Link
          href="/artists"
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#E76F51] px-5 font-semibold text-white"
        >
          Explore artists
        </Link>
      </div>
    </section>
  );
}
