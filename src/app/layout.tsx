import type { Metadata } from "next";
import { Hind, Tiro_Devanagari_Hindi } from "next/font/google";
import { Footer } from "@/components/footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

const hind = Hind({
  variable: "--font-hind",
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const tiro = Tiro_Devanagari_Hindi({
  variable: "--font-tiro",
  subsets: ["latin", "devanagari"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chitravan.vercel.app"),
  title: {
    default: "Chitravan | India's forest of art",
    template: "%s | Chitravan",
  },
  description:
    "Discover Indian artists, regional traditions, process stories, and original creative work through Chitravan.",
  keywords: [
    "Indian art",
    "artists in India",
    "regional art",
    "Madhubani",
    "Warli",
    "Gond",
    "portfolio",
    "artist discovery",
  ],
  openGraph: {
    title: "Chitravan",
    description:
      "A warm community-first platform for Indian artists, collectors, and art lovers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hind.variable} ${tiro.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#FAF7F2] text-[#4A4A3F]">
        <SiteNav />
        <main className="min-h-screen pb-24 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
