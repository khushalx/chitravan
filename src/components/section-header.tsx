import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl text-left", className)}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase text-[#D9A441]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl leading-tight text-[#3B6D11] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-3 text-lg leading-8 text-[#5F8F2F]">{subtitle}</p>
    </div>
  );
}
