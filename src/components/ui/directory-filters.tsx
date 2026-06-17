"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { CATEGORIES } from "@/lib/mock-data";

const PROJECT_TYPES = [
  { value: "Free",        emoji: "🆓" },
  { value: "Paid",        emoji: "💰" },
  { value: "Open Source", emoji: "🔓" },
] as const;

export function DirectoryFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentType = params.get("type") ?? "";
  const currentTag  = params.get("tag")  ?? "";
  const currentQ    = params.get("q")    ?? "";

  function navigate(next: { type?: string; tag?: string }) {
    const p = new URLSearchParams();
    if (currentQ)           p.set("q", currentQ);
    if (next.type ?? currentType) p.set("type", next.type ?? currentType);
    if (next.tag  ?? currentTag)  p.set("tag",  next.tag  ?? currentTag);

    // Clear a filter when clicking its active pill
    if (next.type === currentType) p.delete("type");
    if (next.tag  === currentTag)  p.delete("tag");

    startTransition(() => {
      router.push(`/directory${p.toString() ? `?${p}` : ""}`);
    });
  }

  return (
    <div className={`flex flex-col gap-3 mb-8 transition-opacity ${isPending ? "opacity-50" : ""}`}>
      {/* Type filters */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => navigate({ type: "" })} className={pill(!currentType)}>
          All types
        </button>
        {PROJECT_TYPES.map(({ value, emoji }) => (
          <button key={value} onClick={() => navigate({ type: value })} className={pill(currentType === value)}>
            {emoji} {value}
          </button>
        ))}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => navigate({ tag: "" })} className={pill(!currentTag)}>
          All categories
        </button>
        {CATEGORIES.map((t) => (
          <button key={t} onClick={() => navigate({ tag: t })} className={pill(currentTag === t)}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function pill(active: boolean) {
  return `rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
    active
      ? "border-teal bg-teal text-white"
      : "border-border bg-surface text-muted hover:border-teal hover:text-teal"
  }`;
}
