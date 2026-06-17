"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function signInWithGoogle() {
  const supabase = await createClient();
  const headersList = await headers();
  // Prefer the explicit env var so production always uses the canonical domain,
  // not whatever Vercel deployment URL the request arrived on.
  const origin = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    headersList.get("origin") ??
    (() => { throw new Error("NEXT_PUBLIC_SITE_URL is not set"); })()
  ).replace(/\/$/, "");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    redirect("/auth/login?error=" + encodeURIComponent(error.message));
  }

  redirect(data.url);
}
