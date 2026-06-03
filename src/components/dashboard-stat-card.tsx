import type { LucideIcon } from "lucide-react";

type DashboardStatCardProps = {
  label: string;
  value: string;
  helper?: string;
  icon: LucideIcon;
  bar?: number;
};

export function DashboardStatCard({
  label,
  value,
  helper,
  icon: Icon,
  bar = 62,
}: DashboardStatCardProps) {
  return (
    <article className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-[#6F6A60]">
        <Icon size={17} aria-hidden="true" />
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-[#24231F]">{value}</p>
      {helper ? <p className="mt-1 text-sm text-[#6F6A60]">{helper}</p> : null}
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#F7F5F0]">
        <div
          className="h-full rounded-full bg-[#5F8F2F]"
          style={{ width: `${bar}%` }}
        />
      </div>
    </article>
  );
}
