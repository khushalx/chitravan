import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Brush,
  Eye,
  FileUp,
  Inbox,
  MapPin,
  MessageSquare,
  PenLine,
  PlusCircle,
  Users,
} from "lucide-react";
import { ArtworkCard } from "@/components/artwork-card";
import { ArtworkUploadForm } from "@/components/artwork-upload-form";
import { CreatePostForm } from "@/components/create-post-form";
import { DashboardStatCard } from "@/components/dashboard-stat-card";
import { HostWorkshopForm } from "@/components/host-workshop-form";
import { ProfileCompletionCard } from "@/components/profile-completion-card";
import { SectionHeader } from "@/components/section-header";
import { artworks, communityPosts, inquiries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Your artist space",
  description:
    "Manage your profile, artworks, inquiries, workshops, and community activity.",
};

const quickActions = [
  { label: "Upload artwork", href: "#upload-artwork", icon: FileUp },
  { label: "Create post", href: "#create-post", icon: PenLine },
  { label: "Host workshop", href: "#host-workshop", icon: PlusCircle },
  { label: "View public profile", href: "/artists/ananya-jha", icon: Brush },
  { label: "Check inquiries", href: "/dashboard/inquiries", icon: Inbox },
];

const stats = [
  { label: "Profile views", value: "18.4k", helper: "This month", icon: Eye, bar: 82 },
  { label: "Followers", value: "4,820", helper: "Community members", icon: Users, bar: 76 },
  { label: "Artwork saves", value: "642", helper: "Across portfolio", icon: Brush, bar: 58 },
  { label: "Inquiry count", value: String(inquiries.length), helper: "Open and closed", icon: Inbox, bar: 44 },
  { label: "Top artwork", value: "Courtyard Fish Song", helper: "Most viewed", icon: BarChart3, bar: 88 },
  { label: "Audience location", value: "Patna, Delhi, Pune", helper: "Placeholder", icon: MapPin, bar: 67 },
];

export default function DashboardPage() {
  const featuredArtworks = artworks.filter((artwork) => artwork.featured);
  const priceOnRequestCount = artworks.filter((artwork) => !artwork.price).length;

  return (
    <section className="py-14">
      <div className="container-shell">
        <SectionHeader
          title="Your artist space"
          subtitle="Manage your profile, artworks, inquiries, workshops, and community activity."
        />
        <div className="mt-8 grid gap-6">
          <section className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
            <h2 className="font-display text-3xl text-[#3B6D11]">Quick actions</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#CFC8BA] bg-[#F7F5F0] px-4 text-sm font-semibold text-[#3B6D11] hover:border-[#3B6D11]"
                  >
                    <Icon size={16} aria-hidden="true" />
                    {action.label}
                  </Link>
                );
              })}
            </div>
          </section>

          <ProfileCompletionCard />

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
              <p className="text-sm font-semibold text-[#6F6A60]">Total artworks</p>
              <p className="mt-2 text-3xl font-semibold text-[#24231F]">
                {artworks.length}
              </p>
            </article>
            <article className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
              <p className="text-sm font-semibold text-[#6F6A60]">
                Featured artworks
              </p>
              <p className="mt-2 text-3xl font-semibold text-[#24231F]">
                {featuredArtworks.length}
              </p>
            </article>
            <article className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
              <p className="text-sm font-semibold text-[#6F6A60]">
                Price on request
              </p>
              <p className="mt-2 text-3xl font-semibold text-[#24231F]">
                {priceOnRequestCount}
              </p>
            </article>
            <article className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
              <p className="text-sm font-semibold text-[#6F6A60]">
                Most viewed artwork
              </p>
              <p className="mt-2 text-xl font-semibold text-[#24231F]">
                Courtyard Fish Song
              </p>
            </article>
          </section>

          <section className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-3xl text-[#3B6D11]">
                Portfolio summary
              </h2>
              <Link
                href="/dashboard/inquiries"
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#E76F51] px-4 text-sm font-semibold text-white"
              >
                <MessageSquare size={16} aria-hidden="true" />
                My inquiries
              </Link>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {artworks.slice(0, 3).map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} compact />
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <div id="upload-artwork">
              <ArtworkUploadForm />
            </div>
            <div id="create-post">
              <CreatePostForm />
            </div>
            <div id="host-workshop">
              <HostWorkshopForm />
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <article className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
              <h2 className="font-display text-3xl text-[#3B6D11]">
                Community activity
              </h2>
              <div className="mt-4 grid gap-3">
                {communityPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] p-3"
                  >
                    <p className="line-clamp-2 text-[#24231F]">{post.text}</p>
                    <p className="mt-2 text-sm font-semibold text-[#5F8F2F]">
                      {post.likes} likes · {post.comments} comments
                    </p>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
              <h2 className="font-display text-3xl text-[#3B6D11]">
                Workshop hosting & challenge submissions
              </h2>
              <div className="mt-4 grid gap-3 text-[#24231F]">
                <p className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] p-3">
                  2 workshop drafts are ready for review.
                </p>
                <p className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] p-3">
                  1 challenge submission is saved locally.
                </p>
                <p className="rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] p-3">
                  {inquiries.length} inquiry requests in your inbox.
                </p>
              </div>
            </article>
          </section>

          <section>
            <h2 className="font-display text-4xl text-[#3B6D11]">
              Basic analytics
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {stats.map((stat) => (
                <DashboardStatCard key={stat.label} {...stat} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
