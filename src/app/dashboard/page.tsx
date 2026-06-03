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
import { artists, artworks, communityPosts, inquiries } from "@/lib/data";

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

type DashboardPageProps = {
  searchParams?: Promise<{ artist?: string }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentArtist =
    artists.find((artist) => artist.slug === resolvedSearchParams?.artist) ??
    artists[0];
  const isApproved = currentArtist.approval_status === "approved";
  const isPending = currentArtist.approval_status === "pending_approval";
  const isRejected = currentArtist.approval_status === "rejected";
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
          {isPending ? (
            <article className="rounded-xl border border-[#D9A441]/45 bg-[#D9A441]/12 p-5">
              <h2 className="font-display text-3xl text-[#3B6D11]">
                Your artist profile is under review.
              </h2>
              <p className="mt-2 leading-7 text-[#6F6A60]">
                You can edit your application, but it will not be public until
                approved.
              </p>
            </article>
          ) : null}
          {isRejected ? (
            <article className="rounded-xl border border-[#E76F51]/45 bg-[#E76F51]/12 p-5">
              <h2 className="font-display text-3xl text-[#9f3d26]">
                Your artist application was not approved.
              </h2>
              {currentArtist.rejection_reason ? (
                <p className="mt-2 leading-7 text-[#6F6A60]">
                  Reason: {currentArtist.rejection_reason}
                </p>
              ) : null}
              <a
                href="/onboarding"
                className="mt-4 inline-flex min-h-10 items-center rounded-full bg-[#E76F51] px-4 text-sm font-semibold text-white"
              >
                Edit and resubmit application
              </a>
            </article>
          ) : null}

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

          {isApproved ? (
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
          ) : null}

          {isApproved ? (
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
          ) : null}

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

          {isApproved ? (
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
          ) : null}

          {isApproved ? (
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
          ) : null}
        </div>
      </div>
    </section>
  );
}
