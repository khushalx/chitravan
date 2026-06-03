"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Eye, XCircle } from "lucide-react";
import {
  approveArtistApplication,
  rejectArtistApplication,
} from "@/app/actions";
import { ArtworkVisual } from "@/components/artwork-visual";
import { Modal } from "@/components/modal";
import { SuccessMessage } from "@/components/success-message";
import { TagPill } from "@/components/tag-pill";
import type { Artist } from "@/lib/data";
import { artists as seedArtists, getArtworksByArtist } from "@/lib/data";

const statusLabels = {
  pending_approval: "Pending approval",
  approved: "Approved",
  rejected: "Rejected",
};

const statusStyles = {
  pending_approval: "bg-[#D9A441]/18 text-[#7a5b15]",
  approved: "bg-[#5F8F2F]/14 text-[#3B6D11]",
  rejected: "bg-[#E76F51]/12 text-[#9f3d26]",
};

function sortApplications(applications: Artist[]) {
  const rank = { pending_approval: 0, approved: 1, rejected: 2 };
  return applications
    .slice()
    .sort(
      (a, b) =>
        rank[a.approval_status] - rank[b.approval_status] ||
        new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime(),
    );
}

export function ArtistApplicationsPage() {
  const [applications, setApplications] = useState<Artist[]>(
    sortApplications(seedArtists),
  );
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [rejectArtist, setRejectArtist] = useState<Artist | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [message, setMessage] = useState("");

  const grouped = useMemo(
    () => ({
      pending: applications.filter(
        (artist) => artist.approval_status === "pending_approval",
      ),
      approved: applications.filter((artist) => artist.approval_status === "approved"),
      rejected: applications.filter((artist) => artist.approval_status === "rejected"),
    }),
    [applications],
  );

  async function approveArtist(artist: Artist) {
    const formData = new FormData();
    formData.set("artistId", artist.id);
    formData.set("adminProfileId", "demo-admin-profile");
    const result = await approveArtistApplication(
      { status: "idle", message: "" },
      formData,
    );
    setMessage(result.message);
    if (result.status === "success") {
      setApplications((current) =>
        sortApplications(
          current.map((item) =>
            item.id === artist.id
              ? {
                  ...item,
                  approval_status: "approved",
                  approved_by: "demo-admin-profile",
                  approved_at: new Date().toISOString(),
                  rejection_reason: null,
                  verified: true,
                }
              : item,
          ),
        ),
      );
    }
  }

  async function submitRejection() {
    if (!rejectArtist) return;
    const formData = new FormData();
    formData.set("artistId", rejectArtist.id);
    formData.set("rejectionReason", rejectionReason);
    const result = await rejectArtistApplication(
      { status: "idle", message: "" },
      formData,
    );
    setMessage(result.message);
    if (result.status === "success") {
      setApplications((current) =>
        sortApplications(
          current.map((item) =>
            item.id === rejectArtist.id
              ? {
                  ...item,
                  approval_status: "rejected",
                  approved_by: null,
                  approved_at: null,
                  rejection_reason: rejectionReason,
                  verified: false,
                }
              : item,
          ),
        ),
      );
      setRejectArtist(null);
      setRejectionReason("");
    }
  }

  return (
    <>
      <div className="grid gap-5">
        {message ? <SuccessMessage message={message} /> : null}
        <section className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
          <h2 className="font-display text-3xl text-[#3B6D11]">
            {grouped.pending.length} artist applications pending review
          </h2>
          <p className="mt-2 leading-7 text-[#6F6A60]">
            Pending applications are listed first. Approved and rejected artists
            remain visible here for status changes.
          </p>
        </section>
        {[
          ["Pending artist applications", grouped.pending],
          ["Approved artists", grouped.approved],
          ["Rejected artists", grouped.rejected],
        ].map(([title, list]) => (
          <section key={title as string}>
            <h2 className="font-display text-4xl text-[#3B6D11]">
              {title as string}
            </h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {(list as Artist[]).map((artist) => (
                <article
                  key={artist.id}
                  className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5"
                >
                  <div className="flex items-start gap-4">
                    <ArtworkVisual
                      visual={artist.visual}
                      label={`${artist.name} avatar`}
                      className="size-16 shrink-0 rounded-xl"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-3xl text-[#3B6D11]">
                            {artist.name}
                          </h3>
                          <p className="text-sm font-semibold text-[#6F6A60]">
                            {artist.city}, {artist.state} · {artist.region}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[artist.approval_status]}`}
                        >
                          {statusLabels[artist.approval_status]}
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-2 leading-7 text-[#6F6A60]">
                        {artist.bio}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {artist.styles.slice(0, 4).map((style) => (
                          <TagPill key={style} tone="amber">
                            {style}
                          </TagPill>
                        ))}
                      </div>
                      <p className="mt-3 text-sm font-semibold text-[#6F6A60]">
                        Submitted{" "}
                        {new Date(artist.submitted_at).toLocaleDateString("en-IN")}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedArtist(artist)}
                          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-sm font-semibold text-[#3B6D11]"
                        >
                          <Eye size={16} aria-hidden="true" />
                          View details
                        </button>
                        <button
                          type="button"
                          onClick={() => approveArtist(artist)}
                          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#3B6D11] px-4 text-sm font-semibold text-white"
                        >
                          <CheckCircle2 size={16} aria-hidden="true" />
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => setRejectArtist(artist)}
                          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#E76F51] px-4 text-sm font-semibold text-white"
                        >
                          <XCircle size={16} aria-hidden="true" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <ApplicationDetailModal
        artist={selectedArtist}
        onClose={() => setSelectedArtist(null)}
        onApprove={approveArtist}
        onReject={(artist) => setRejectArtist(artist)}
      />
      <Modal
        open={Boolean(rejectArtist)}
        onClose={() => {
          setRejectArtist(null);
          setRejectionReason("");
        }}
        title="Reject artist application"
        description="Add a clear reason so the artist can edit and resubmit."
      >
        <label>
          <span className="text-sm font-semibold text-[#6F6A60]">
            Rejection reason
          </span>
          <textarea
            value={rejectionReason}
            onChange={(event) => setRejectionReason(event.target.value)}
            rows={4}
            className="mt-1 w-full rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] px-3 py-3 outline-none"
          />
        </label>
        <button
          type="button"
          onClick={submitRejection}
          className="mt-4 min-h-11 rounded-full bg-[#E76F51] px-5 text-sm font-semibold text-white"
        >
          Reject artist
        </button>
      </Modal>
    </>
  );
}

function ApplicationDetailModal({
  artist,
  onClose,
  onApprove,
  onReject,
}: {
  artist: Artist | null;
  onClose: () => void;
  onApprove: (artist: Artist) => void;
  onReject: (artist: Artist) => void;
}) {
  const sampleArtworks = artist ? getArtworksByArtist(artist.slug) : [];

  return (
    <Modal
      open={Boolean(artist)}
      onClose={onClose}
      title={artist?.name ?? "Artist application"}
      description="Full application details for admin review."
      className="max-w-4xl"
    >
      {artist ? (
        <div className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-[220px_1fr]">
            <ArtworkVisual
              visual={artist.visual}
              label={`${artist.name} cover image`}
              className="aspect-square rounded-xl"
            />
            <div>
              <p className="text-sm font-semibold text-[#6F6A60]">
                Contact: {artist.email ?? "Not provided"}
              </p>
              <p className="mt-2 text-sm font-semibold text-[#6F6A60]">
                {artist.city}, {artist.state} · {artist.region}
              </p>
              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[artist.approval_status]}`}
              >
                {statusLabels[artist.approval_status]}
              </span>
              <p className="mt-4 leading-7 text-[#24231F]">{artist.bio}</p>
              <p className="mt-4 leading-7 text-[#6F6A60]">{artist.story}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[...artist.styles, ...artist.mediums].map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
              <p className="mt-4 text-sm font-semibold text-[#6F6A60]">
                Submitted {new Date(artist.submitted_at).toLocaleString("en-IN")}
              </p>
              {artist.rejection_reason ? (
                <p className="mt-4 rounded-lg border border-[#E76F51]/35 bg-[#E76F51]/12 p-3 text-sm font-semibold text-[#9f3d26]">
                  Rejection reason: {artist.rejection_reason}
                </p>
              ) : null}
            </div>
          </div>
          <section>
            <h3 className="font-display text-3xl text-[#3B6D11]">
              Sample artworks
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {sampleArtworks.length ? (
                sampleArtworks.map((artwork) => (
                  <div
                    key={artwork.id}
                    className="rounded-xl border border-[#CFC8BA] bg-[#F7F5F0] p-3"
                  >
                    <ArtworkVisual
                      visual={artwork.visual}
                      label={`${artwork.title} sample`}
                      className="aspect-square rounded-lg"
                    />
                    <p className="mt-3 font-semibold text-[#24231F]">
                      {artwork.title}
                    </p>
                    <p className="text-sm text-[#6F6A60]">
                      {artwork.style} · {artwork.category}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-xl border border-[#CFC8BA] bg-[#F7F5F0] p-4 text-[#6F6A60]">
                  No sample artworks attached.
                </p>
              )}
            </div>
          </section>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onApprove(artist)}
              className="min-h-10 rounded-full bg-[#3B6D11] px-4 text-sm font-semibold text-white"
            >
              Approve artist
            </button>
            <button
              type="button"
              onClick={() => onReject(artist)}
              className="min-h-10 rounded-full bg-[#E76F51] px-4 text-sm font-semibold text-white"
            >
              Reject artist with reason
            </button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
