type LoadingGridProps = {
  count?: number;
};

export function LoadingGrid({ count = 4 }: LoadingGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="h-60 animate-pulse rounded-xl border border-[#CFC8BA]/70 bg-[#FAF8F4]"
        />
      ))}
    </div>
  );
}
