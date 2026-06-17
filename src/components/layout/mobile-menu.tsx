"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "@/app/auth/actions";

export function MobileMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-teal-deep hover:border-teal md:hidden"
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 md:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute inset-0 bg-black/20"
            aria-hidden="true"
          />
          <nav
            className="absolute left-0 right-0 top-0 border-b border-border bg-cream px-4 py-4 flex flex-col gap-1 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <MobileLink href="/leaderboard" onClick={() => setOpen(false)}>🔥 This Week</MobileLink>
            <MobileLink href="/directory"   onClick={() => setOpen(false)}>Projects</MobileLink>
            <MobileLink href="/builders"    onClick={() => setOpen(false)}>Builders</MobileLink>
            <MobileLink href="/resources"   onClick={() => setOpen(false)}>Resources</MobileLink>

            <div className="my-2 border-t border-border" />

            {isLoggedIn ? (
              <>
                <MobileLink href="/profile"      onClick={() => setOpen(false)}>My profile</MobileLink>
                <MobileLink href="/projects/new" onClick={() => setOpen(false)}>+ Add project</MobileLink>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-muted hover:bg-border/30 hover:text-terra transition-colors"
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <MobileLink href="/auth/login" onClick={() => setOpen(false)}>
                Sign in
              </MobileLink>
            )}
          </nav>
        </div>
      )}
    </>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-lg px-4 py-2.5 text-sm font-medium text-teal-deep hover:bg-border/30 hover:text-teal transition-colors"
    >
      {children}
    </Link>
  );
}
