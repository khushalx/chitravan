"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brush, Compass, Home, LayoutDashboard, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/artists", label: "Explore", icon: Compass },
  { href: "/community", label: "Community", icon: Users },
  { href: "/regional-art", label: "Art", icon: Brush },
  { href: "/dashboard", label: "Studio", icon: LayoutDashboard },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#CFC8BA] bg-[#FAF7F2]/96 px-2 py-2 backdrop-blur-md md:hidden"
    >
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-[0.72rem] font-medium text-[#6F6A60] transition hover:bg-[#FAF8F4] hover:text-[#3B6D11]",
                active && "bg-[#FAF8F4] text-[#3B6D11]",
              )}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
