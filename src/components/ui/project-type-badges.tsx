const PROJECT_TYPES = ["Free", "Paid", "Open Source"] as const;

export function ProjectTypeBadges({ types }: { types?: string[] }) {
  if (!types?.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {types.includes("Free") && (
        <span className="rounded-full bg-gold/20 border border-gold/40 px-2 py-0.5 text-xs font-medium text-teal-deep">
          🆓 Free
        </span>
      )}
      {types.includes("Paid") && (
        <span className="rounded-full bg-orange/10 border border-orange/30 px-2 py-0.5 text-xs font-medium text-orange">
          💰 Paid
        </span>
      )}
      {types.includes("Open Source") && (
        <span className="rounded-full bg-teal/10 border border-teal/30 px-2 py-0.5 text-xs font-medium text-teal-deep">
          🔓 Open Source
        </span>
      )}
    </div>
  );
}

export function categoryTags(tags?: string[]) {
  return (tags ?? []).filter((t) => !PROJECT_TYPES.includes(t as (typeof PROJECT_TYPES)[number]));
}
