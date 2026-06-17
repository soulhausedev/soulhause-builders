import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-cream">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div style={{ backgroundColor: "#F5F0E6" }} className="rounded-lg overflow-hidden shrink-0">
            <Image src="/logo.png" alt="Soulhause Builders" width={44} height={44} />
          </div>
          <span
            className="text-xl leading-none tracking-tight"
            style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
          >
            <span className="text-teal-deep">Soulhause</span>
            <span className="text-orange"> Builders</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <Link href="/leaderboard">
            <Button variant="ghost" size="sm">🔥 This Week</Button>
          </Link>
          <Link href="/directory">
            <Button variant="ghost" size="sm">Projects</Button>
          </Link>
          <Link href="/builders">
            <Button variant="ghost" size="sm">Builders</Button>
          </Link>
          <Link href="/resources">
            <Button variant="ghost" size="sm">Resources</Button>
          </Link>

          {user ? (
            <>
              <Link href="/profile">
                <Button variant="outline" size="sm">My profile</Button>
              </Link>
              <form action={signOut}>
                <Button variant="ghost" size="sm" type="submit">Sign out</Button>
              </form>
            </>
          ) : (
            <Link href="/auth/login">
              <Button size="sm">Sign in</Button>
            </Link>
          )}
        </nav>

        {/* Mobile hamburger */}
        <MobileMenu isLoggedIn={!!user} />
      </div>
    </header>
  );
}
