"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Leaf } from "lucide-react";
import { LogoLockup } from "@/components/logo-lockup";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/artists", label: "Artists" },
  { href: "/regional-art", label: "Regional art" },
  { href: "/community", label: "Community" },
  { href: "/workshops", label: "Workshops" },
  { href: "/grants", label: "Grants" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[#CFC8BA] bg-[#EAF3D8]">
      <nav
        className="container-shell flex min-h-20 items-center justify-between gap-4 py-4"
        aria-label="Primary navigation"
      >
        <LogoLockup />
        <div className="hidden items-center gap-7 text-[0.95rem] font-medium text-[#24231F] lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              className={cn(
                "border-b border-transparent pb-1 transition hover:text-[#3B6D11]",
                pathname.startsWith(link.href) &&
                  "border-[#3B6D11] text-[#3B6D11]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="hidden min-h-10 items-center rounded-full px-3 text-sm font-semibold text-[#24231F] transition hover:text-[#3B6D11] lg:inline-flex"
            aria-current={pathname.startsWith("/dashboard") ? "page" : undefined}
          >
            Dashboard
          </Link>
          <Link
            href="/artists"
            className="hidden min-h-11 items-center gap-2 rounded-full border border-[#3B6D11] px-4 py-2 text-sm font-semibold text-[#3B6D11] transition hover:bg-[#FAF8F4] sm:inline-flex"
          >
            <Compass size={16} aria-hidden="true" />
            Start exploring
          </Link>
          <Link
            href="/auth"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#3B6D11] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2f570d]"
          >
            <Leaf size={16} aria-hidden="true" />
            Join as artist
          </Link>
        </div>
      </nav>
    </header>
  );
}
