import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code       = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type       = searchParams.get("type") as "magiclink" | "email" | null;
  const next       = searchParams.get("next") ?? "/profile";

  const supabase = await createClient();

  // PKCE flow — newer Supabase default (sends `code`)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) redirect(next);
  }

  // Implicit / OTP flow — sends `token_hash` + `type`
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) redirect(next);
  }

  redirect("/auth/login?error=Invalid+or+expired+link.+Please+try+again.");
}
