"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase";

export type InquiryActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export type ArtistApprovalActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitInquiry(
  _previousState: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> {
  const collectorName = String(formData.get("collectorName") ?? "").trim();
  const contact = String(formData.get("contact") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const budgetRange = String(formData.get("budgetRange") ?? "").trim();
  const artworkSlug = String(formData.get("artworkSlug") ?? "").trim();
  const artistSlug = String(formData.get("artistSlug") ?? "").trim();
  const requestTitle = String(formData.get("requestTitle") ?? "").trim();

  if (!collectorName || !contact || !message) {
    return {
      status: "error",
      message: "Please add your name, contact detail, and a short message.",
    };
  }

  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return {
      status: "success",
      message:
        "Inquiry captured in demo mode. Add Supabase environment variables to persist it in production.",
    };
  }

  const { error } = await supabase.from("inquiries").insert({
    artwork_slug: artworkSlug,
    artist_slug: artistSlug,
    request_title: requestTitle,
    collector_name: collectorName,
    contact,
    message,
    budget_range: budgetRange || "Not specified",
    status: "New",
  });

  if (error) {
    return {
      status: "error",
      message: `Supabase could not save this inquiry: ${error.message}`,
    };
  }

  revalidatePath(`/artworks/${artworkSlug}`);

  return {
    status: "success",
    message: "Inquiry sent. The artist can now review it in their inbox.",
  };
}

export async function approveArtistApplication(
  _previousState: ArtistApprovalActionState,
  formData: FormData,
): Promise<ArtistApprovalActionState> {
  const artistId = String(formData.get("artistId") ?? "").trim();
  const adminProfileId = String(formData.get("adminProfileId") ?? "").trim();

  if (!artistId) {
    return { status: "error", message: "Missing artist application id." };
  }

  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return { status: "success", message: "Artist approved successfully." };
  }

  const { error } = await supabase
    .from("artists")
    .update({
      approval_status: "approved",
      approved_by: adminProfileId || null,
      approved_at: new Date().toISOString(),
      rejection_reason: null,
      published: true,
      verified: true,
    })
    .eq("id", artistId);

  if (error) {
    return {
      status: "error",
      message: `Supabase could not approve this artist: ${error.message}`,
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/artist-applications");
  revalidatePath("/artists");
  revalidatePath("/regional-art");

  return { status: "success", message: "Artist approved successfully." };
}

export async function rejectArtistApplication(
  _previousState: ArtistApprovalActionState,
  formData: FormData,
): Promise<ArtistApprovalActionState> {
  const artistId = String(formData.get("artistId") ?? "").trim();
  const rejectionReason = String(formData.get("rejectionReason") ?? "").trim();

  if (!artistId) {
    return { status: "error", message: "Missing artist application id." };
  }

  if (!rejectionReason) {
    return { status: "error", message: "Please add a rejection reason." };
  }

  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return { status: "success", message: "Artist application rejected." };
  }

  const { error } = await supabase
    .from("artists")
    .update({
      approval_status: "rejected",
      approved_by: null,
      approved_at: null,
      rejection_reason: rejectionReason,
      published: false,
      verified: false,
    })
    .eq("id", artistId);

  if (error) {
    return {
      status: "error",
      message: `Supabase could not reject this artist: ${error.message}`,
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/artist-applications");
  revalidatePath("/artists");
  revalidatePath("/regional-art");

  return { status: "success", message: "Artist application rejected." };
}

export async function submitArtistApplication(
  _previousState: ArtistApprovalActionState,
  formData: FormData,
): Promise<ArtistApprovalActionState> {
  const name = String(formData.get("artistName") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const styleValues = formData.getAll("styleTags").map((value) => String(value));
  const styles = (String(formData.get("styles") ?? "") || styleValues.join(","))
    .split(",")
    .map((style) => style.trim())
    .filter(Boolean);

  if (!name || !bio || !state) {
    return {
      status: "error",
      message: "Please add artist name, short bio, and state before submitting.",
    };
  }

  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return {
      status: "success",
      message:
        "Your artist profile has been submitted for review. Chitravan will notify you once it is approved.",
    };
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const { error } = await supabase.from("artists").insert({
    slug,
    name,
    state,
    city,
    region: city,
    styles,
    mediums: styles,
    bio,
    story: String(formData.get("story") ?? "").trim(),
    approval_status: "pending_approval",
    submitted_at: new Date().toISOString(),
    published: false,
    verified: false,
  });

  if (error) {
    return {
      status: "error",
      message: `Supabase could not submit this artist application: ${error.message}`,
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/artist-applications");

  return {
    status: "success",
    message:
      "Your artist profile has been submitted for review. Chitravan will notify you once it is approved.",
  };
}
