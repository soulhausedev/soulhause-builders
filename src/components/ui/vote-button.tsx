"use client";

import { useTransition } from "react";
import { toggleVote } from "@/app/leaderboard/actions";

export function VoteButton({
  projectId,
  count,
  voted,
  disabled,
}: {
  projectId: string;
  count: number;
  voted: boolean;
  disabled?: boolean; // true when user is not logged in
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (disabled) return;
    startTransition(() => {
      toggleVote(projectId);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending || disabled}
      title={disabled ? "Sign in to vote" : voted ? "Remove vote" : "Vote for this project"}
      className={[
        "flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold transition-all",
        voted
          ? "border-orange bg-orange text-white shadow-sm"
          : "border-border bg-surface text-muted hover:border-orange hover:text-orange",
        isPending ? "opacity-60" : "",
        disabled ? "cursor-default opacity-50" : "cursor-pointer",
      ].join(" ")}
    >
      <span className={isPending ? "animate-pulse" : ""}>🔥</span>
      <span>{count}</span>
    </button>
  );
}
