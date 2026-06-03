import { cn } from "@/lib/utils";

type TagPillProps = {
  children: React.ReactNode;
  tone?: "mist" | "amber" | "outline";
  className?: string;
};

export function TagPill({ children, tone = "mist", className }: TagPillProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold",
        tone === "mist" && "bg-[#C0DD97]/65 text-[#5F8F2F]",
        tone === "amber" && "bg-[#D9A441]/22 text-[#7a5b15]",
        tone === "outline" && "border border-[#CFC8BA] text-[#6F6A60]",
        className,
      )}
    >
      {children}
    </span>
  );
}
