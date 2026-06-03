"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Mail, ShieldCheck } from "lucide-react";

const roles = ["Artist", "Collector / Viewer"];

function isAdminEmail(email: string) {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.trim().toLowerCase());
}

export function AuthPanel() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const configured =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!configured) {
      setLoading(false);
      setMessage(
        "Supabase keys are not configured yet. Add them to .env.local to enable auth.",
      );
      return;
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const resolvedRole = isAdminEmail(email) ? "Admin" : role;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { role: resolvedRole },
        emailRedirectTo: `${window.location.origin}/${
          resolvedRole === "Admin" ? "admin" : "dashboard"
        }`,
      },
    });

    setLoading(false);
    setMessage(
      error
        ? `Supabase auth error: ${error.message}`
        : "Check your email for the magic link.",
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-5"
    >
      <div className="flex items-center gap-2 text-sm font-semibold uppercase text-[#5F8F2F]">
        <ShieldCheck size={17} aria-hidden="true" />
        Supabase auth
      </div>
      <h1 className="mt-3 font-display text-4xl leading-tight text-[#3B6D11]">
        Join Chitravan
      </h1>
      <p className="mt-3 leading-7 text-[#6F6A60]">
        Magic-link sign in with artist and collector roles. Admin role is
        assigned only when the email is listed in NEXT_PUBLIC_ADMIN_EMAILS.
      </p>
      <label className="mt-6 grid gap-2 text-sm font-semibold text-[#24231F]">
        Email
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-h-11 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3 text-base outline-none focus:border-[#5F8F2F]"
          placeholder="artist@example.com"
        />
      </label>
      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-[#24231F]">Role</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {roles.map((item) => (
            <label
              key={item}
              className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold ${
                role === item
                  ? "border-[#3B6D11] bg-[#3B6D11] text-white"
                  : "border-[#CFC8BA] text-[#3B6D11]"
              }`}
            >
              <input
                className="sr-only"
                type="radio"
                name="role"
                value={item}
                checked={role === item}
                onChange={() => setRole(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>
      {message ? (
        <p className="mt-5 rounded-lg bg-[#FAF7F2]/45 px-3 py-2 text-sm font-medium text-[#3B6D11]">
          {message}
        </p>
      ) : null}
      <button
        disabled={loading}
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#E76F51] px-5 font-semibold text-white hover:bg-[#d65e42] disabled:opacity-70"
      >
        <Mail size={17} aria-hidden="true" />
        {loading ? "Sending magic link" : "Send magic link"}
      </button>
    </form>
  );
}
