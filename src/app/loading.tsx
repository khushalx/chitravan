import { LoadingGrid } from "@/components/loading-grid";

export default function Loading() {
  return (
    <section className="py-14">
      <div className="container-shell grid gap-4">
        <div className="h-12 w-72 animate-pulse rounded-lg bg-[#CFC8BA]/45" />
        <div className="h-6 w-full max-w-xl animate-pulse rounded-lg bg-[#CFC8BA]/35" />
        <div className="mt-4">
          <LoadingGrid count={3} />
        </div>
      </div>
    </section>
  );
}
