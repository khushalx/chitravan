import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Flag, Megaphone, PencilLine, Shield } from "lucide-react";
import { AdminAccessGate } from "@/components/admin-access-gate";
import { ArtworkVisual } from "@/components/artwork-visual";
import { SectionHeader } from "@/components/section-header";
import {
  artists,
  collaborationCalls,
  grantListings,
  monthlyChallenges,
  regionalArtForms,
  sponsoredAds,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin Panel",
  description:
    "Basic Chitravan admin panel for verification, reported content, regional art, grants, and ads.",
};

export default function AdminPage() {
  const pendingApplications = artists.filter(
    (artist) => artist.approval_status === "pending_approval",
  );
  const recentApplications = artists
    .slice()
    .sort(
      (a, b) =>
        new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime(),
    )
    .slice(0, 3);
  const grantQueue = [
    ...monthlyChallenges.map((item) => ({ id: item.id, type: "Challenge", title: item.title })),
    ...collaborationCalls.map((item) => ({ id: item.id, type: "Collaboration", title: item.title })),
    ...grantListings.map((item) => ({ id: item.id, type: "Grant", title: item.title })),
  ].slice(0, 6);

  return (
    <section className="py-14">
      <div className="container-shell">
        <SectionHeader
          title="Admin Panel"
          subtitle="A focused moderation surface for artist verification, content review, regional art, grants, and ads."
        />
        <div className="mt-8">
          <AdminAccessGate>
            <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4">
            <article className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5">
              <h2 className="font-display text-3xl text-[#3B6D11]">
                {pendingApplications.length} artist applications pending review
              </h2>
              <p className="mt-2 leading-7 text-[#6F6A60]">
                Review artists before their profiles, artworks, and community
                posts become public.
              </p>
              <Link
                href="/admin/artist-applications"
                className="mt-4 inline-flex min-h-10 items-center rounded-full bg-[#E76F51] px-4 text-sm font-semibold text-white"
              >
                Open artist applications
              </Link>
            </article>
            <article className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5">
              <h2 className="flex items-center gap-2 font-display text-3xl text-[#3B6D11]">
                <BadgeCheck size={22} aria-hidden="true" />
                Verify artists
              </h2>
              <div className="mt-5 grid gap-3">
                {artists.slice(0, 5).map((artist) => (
                  <div
                    key={artist.id}
                    className="grid gap-3 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] p-3 sm:grid-cols-[52px_1fr_auto]"
                  >
                    <ArtworkVisual
                      visual={artist.visual}
                      label={`${artist.name} admin avatar`}
                      className="size-13 rounded-lg"
                    />
                    <div>
                      <p className="font-semibold text-[#24231F]">
                        {artist.name}
                      </p>
                      <p className="text-sm text-[#6F6A60]">
                        {artist.state} · {artist.styles.slice(0, 2).join(", ")}
                      </p>
                    </div>
                    <button className="min-h-10 rounded-full border border-[#CFC8BA] px-4 text-sm font-semibold text-[#3B6D11]">
                      {artist.verified ? "Verified" : "Verify"}
                    </button>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5">
              <h2 className="flex items-center gap-2 font-display text-3xl text-[#3B6D11]">
                <Flag size={22} aria-hidden="true" />
                Review reported content
              </h2>
              <div className="mt-5 grid gap-3">
                {[
                  "Artwork image flagged for duplicate upload",
                  "Community post reported for unclear attribution",
                  "Workshop description needs admin review",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] p-3"
                  >
                    <p className="font-medium text-[#24231F]">{item}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button className="min-h-9 rounded-full bg-[#3B6D11] px-3 text-sm font-semibold text-white">
                        Clear
                      </button>
                      <button className="min-h-9 rounded-full border border-[#CFC8BA] px-3 text-sm font-semibold text-[#E76F51]">
                        Hide
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5">
                <h2 className="flex items-center gap-2 font-display text-3xl text-[#3B6D11]">
                  <PencilLine size={22} aria-hidden="true" />
                  Add or edit regional art
                </h2>
                <div className="mt-4 grid gap-3">
                  {regionalArtForms.slice(0, 4).map((form) => (
                    <p
                      key={form.slug}
                      className="rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 py-2 font-medium text-[#24231F]"
                    >
                      {form.name} · {form.state}
                    </p>
                  ))}
                </div>
              </article>
              <article className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5">
                <h2 className="flex items-center gap-2 font-display text-3xl text-[#3B6D11]">
                  <Megaphone size={22} aria-hidden="true" />
                  Manage ads
                </h2>
                <div className="mt-4 grid gap-3">
                  {sponsoredAds.map((ad) => (
                    <p
                      key={ad.id}
                      className="rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 py-2 font-medium text-[#24231F]"
                    >
                      {ad.sponsor} · {ad.placement}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </div>
          <aside className="grid content-start gap-4">
            <article className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5">
              <h2 className="flex items-center gap-2 font-display text-3xl text-[#3B6D11]">
                <Shield size={22} aria-hidden="true" />
                Recent artist applications
              </h2>
              <div className="mt-4 grid gap-3">
                {recentApplications.map((artist) => (
                  <div
                    key={artist.id}
                    className="rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] p-3"
                  >
                    <p className="text-xs font-semibold uppercase text-[#D9A441]">
                      {artist.approval_status.replace("_", " ")}
                    </p>
                    <p className="mt-1 font-semibold text-[#24231F]">
                      {artist.name}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/admin/artist-applications"
                className="mt-4 inline-flex min-h-9 items-center rounded-full border border-[#CFC8BA] px-3 text-sm font-semibold text-[#3B6D11]"
              >
                Review all applications
              </Link>
            </article>

            <article className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5">
              <h2 className="flex items-center gap-2 font-display text-3xl text-[#3B6D11]">
                <Shield size={22} aria-hidden="true" />
                Grants queue
              </h2>
              <div className="mt-4 grid gap-3">
                {grantQueue.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] p-3"
                  >
                    <p className="text-xs font-semibold uppercase text-[#D9A441]">
                      {item.type}
                    </p>
                    <p className="mt-1 font-semibold text-[#24231F]">
                      {item.title}
                    </p>
                    <button className="mt-3 min-h-9 rounded-full border border-[#CFC8BA] px-3 text-sm font-semibold text-[#3B6D11]">
                      Edit listing
                    </button>
                  </div>
                ))}
              </div>
            </article>
          </aside>
            </div>
          </AdminAccessGate>
        </div>
      </div>
    </section>
  );
}
