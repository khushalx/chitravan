import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoLockupProps = {
  tone?: "light" | "dark";
  className?: string;
};

export function LogoLockup({ tone = "light", className }: LogoLockupProps) {
  const dark = tone === "dark";

  return (
    <Link
      href="/"
      aria-label="Chitravan home"
      className={cn(
        "inline-flex w-fit flex-col items-center leading-none",
        className,
      )}
    >
      <span
        className={cn(
          "font-display text-[1.72rem] text-[#2D5016]",
          dark && "text-[#F7F5F0]",
        )}
      >
        Chitravan
      </span>
      <span
        className={cn(
          "mt-1 font-display text-sm text-[#639922]",
          dark && "text-[#C0DD97]",
        )}
      >
        चित्रवन
      </span>
    </Link>
  );
}
