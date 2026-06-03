import Link from "next/link";
import { LogoLockup } from "@/components/logo-lockup";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { href: "/artists", label: "Artist discovery" },
      { href: "/regional-art", label: "Regional art" },
      { href: "/artworks/courtyard-fish-song", label: "Artwork detail" },
    ],
  },
  {
    title: "Artists",
    links: [
      { href: "/auth", label: "Join as artist" },
      { href: "/onboarding", label: "Onboarding" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/community", label: "Community" },
      { href: "/workshops", label: "Workshops" },
      { href: "/grants", label: "Challenges and grants" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/admin", label: "Admin panel" },
      { href: "/dashboard/inquiries", label: "Inquiries inbox" },
      { href: "/share/courtyard-fish-song", label: "Share tools" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#3B6D11] py-14 text-white">
      <div className="container-shell relative z-10 grid gap-10 lg:grid-cols-[1.15fr_2fr]">
        <div>
          <LogoLockup tone="dark" />
          <p className="mt-6 max-w-sm text-lg leading-8 text-[#C0DD97]">
            Every artwork here grows from Indian soil.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold uppercase text-[#C0DD97]">
                {column.title}
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[#F7F5F0]/88 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-6 font-display text-[18vw] leading-none text-white/8"
      >
        चित्रवन
      </div>
    </footer>
  );
}
