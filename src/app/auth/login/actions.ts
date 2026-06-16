"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function signInWithGoogle() {
  const supabase = await createClient();
  const headersList = await headers();
  const origin =
    headersList.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (() => { throw new Error("NEXT_PUBLIC_SITE_URL is not set"); })();

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
