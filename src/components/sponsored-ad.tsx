import { Megaphone } from "lucide-react";
import type { SponsoredAd as SponsoredAdType } from "@/lib/data";

type SponsoredAdProps = {
  ad: SponsoredAdType;
  compact?: boolean;
};

export function SponsoredAd({ ad, compact = false }: SponsoredAdProps) {
  return (
    <aside className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#6F6A60]">
        <Megaphone size={15} aria-hidden="true" />
        Sponsored
      </div>
      <div className={compact ? "mt-3" : "mt-4"}>
        <p className="text-sm font-semibold text-[#5F8F2F]">{ad.sponsor}</p>
        <h3 className="mt-1 font-display text-2xl leading-tight text-[#3B6D11]">
          {ad.title}
        </h3>
        <p className="mt-2 leading-7 text-[#6F6A60]">{ad.copy}</p>
      </div>
    </aside>
  );
}
