"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase";

export type InquiryActionState = {
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
