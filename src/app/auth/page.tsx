import type { Metadata } from "next";
import { AuthPanel } from "@/components/auth-panel";
import { ArtworkVisual } from "@/components/artwork-visual";

export const metadata: Metadata = {
  title: "Join as Artist",
  description:
    "Sign in to Chitravan with Supabase auth and choose an artist, collector, or admin role.",
};

export default function AuthPage() {
  return (
    <section className="py-14">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-center">
        <div>
          <ArtworkVisual
            visual={{
              pattern: "madhubani",
              colors: ["#E76F51", "#D9A441", "#C0DD97", "#3B6D11"],
            }}
            label="Chitravan auth artwork texture"
            className="aspect-[4/5] rounded-xl"
          />
        </div>
        <AuthPanel />
      </div>
    </section>
  );
}
