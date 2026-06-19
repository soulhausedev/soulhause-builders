"use client";

import { useState } from "react";
import { deleteProfile } from "@/app/profile/actions";
import { ConfirmModal } from "@/components/ui/confirm-modal";

export function DeleteProfileButton({ username }: { username?: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-orange/30 px-4 py-2 text-sm font-medium text-orange transition-colors hover:bg-orange/10"
      >
        Delete profile
      </button>

      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete your profile?"
      >
        <p className="mb-4 text-sm text-muted leading-relaxed">
          This permanently removes your public profile, all projects, votes, and avatar.
          You won&apos;t be able to recover this account. This can&apos;t be undone.
        </p>

        {username && (
          <p className="mb-4 text-sm text-teal-deep">
            Profile: <span className="font-medium">@{username}</span>
          </p>
        )}

        <form
          action={deleteProfile}
          className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-teal hover:text-teal-deep"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-orange px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-terra"
          >
            Yes, delete my profile
          </button>
        </form>
      </ConfirmModal>
    </>
  );
}
