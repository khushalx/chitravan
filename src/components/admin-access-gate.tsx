"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { ShieldAlert, ShieldCheck } from "lucide-react";

type AdminAccessGateProps = {
  children: ReactNode;
};

function parseAdminEmails(value?: string) {
  return (value ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function AdminAccessGate({ children }: AdminAccessGateProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [email, setEmail] = useState("");
  const adminEmails = useMemo(
    () => parseAdminEmails(process.env.NEXT_PUBLIC_ADMIN_EMAILS),
    [],
  );

  useEffect(() => {
    async function checkAccess() {
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        adminEmails.length === 0
      ) {
        setLoading(false);
        return;
      }

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      );
      const { data } = await supabase.auth.getUser();
      const userEmail = data.user?.email?.toLowerCase() ?? "";
      setEmail(userEmail);
      setAuthorized(Boolean(userEmail && adminEmails.includes(userEmail)));
      setLoading(false);
    }

    checkAccess();
  }, [adminEmails]);

  if (loading) {
    return (
      <div className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5 text-[#6F6A60]">
        Checking admin access...
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-[#E76F51]">
          <ShieldAlert size={17} aria-hidden="true" />
          Unauthorized access.
        </p>
        <h1 className="mt-3 font-display text-4xl text-[#3B6D11]">
          Admin access required
        </h1>
        <p className="mt-3 leading-7 text-[#6F6A60]">
          Sign in with an email listed in{" "}
          <code className="font-semibold">NEXT_PUBLIC_ADMIN_EMAILS</code>. Current
          signed-in email: {email || "none"}.
        </p>
        <div className="mt-5 rounded-lg border border-[#CFC8BA] bg-[#F7F5F0] p-4">
          <p className="font-semibold text-[#24231F]">First admin setup</p>
          <p className="mt-2 leading-7 text-[#6F6A60]">
            Add <code>NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com</code> to
            <code> .env.local</code>, or run this Supabase SQL after replacing
            the email:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-[#24231F] p-3 text-sm text-[#FAF8F4]">
            {`update public.profiles
set role = 'Admin'
where id = (
  select id from auth.users where email = 'admin@example.com'
);`}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 rounded-xl border border-[#5F8F2F]/35 bg-[#5F8F2F]/12 p-4 text-sm font-semibold text-[#3B6D11]">
        <ShieldCheck size={17} className="mr-2 inline" aria-hidden="true" />
        Admin access confirmed for {email}.
      </div>
      {children}
    </div>
  );
}
