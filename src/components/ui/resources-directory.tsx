"use client";

import { useMemo, useState } from "react";
import { RESOURCE_CATEGORIES, type Resource } from "@/lib/resources-data";

function formatUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function pill(active: boolean) {
  return `rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
    active
      ? "border-teal bg-teal text-white"
      : "border-border bg-surface text-muted hover:border-teal hover:text-teal"
  }`;
}

export function ResourcesDirectory({ resources }: { resources: Resource[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      const matchesCategory = !category || r.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        formatUrl(r.url).toLowerCase().includes(q)
      );
    });
  }, [resources, query, category]);

  const hasFilter = query.trim() !== "" || category !== "";

  function clearFilters() {
    setQuery("");
    setCategory("");
  }

  return (
    <div>
      {/* Search */}
      <div className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, newsletters, communities…"
            className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal"
          />
        </div>
        {hasFilter && (
          <button
            type="button"
            onClick={clearFilters}
            className="shrink-0 rounded-lg border border-border bg-surface px-3 text-sm text-muted hover:text-terra transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button type="button" onClick={() => setCategory("")} className={pill(!category)}>
          All
        </button>
        {RESOURCE_CATEGORIES.map(({ label, emoji }) => (
          <button
            key={label}
            type="button"
            onClick={() => setCategory(category === label ? "" : label)}
            className={pill(category === label)}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="mb-4 text-sm text-muted">
        {filtered.length} resource{filtered.length !== 1 ? "s" : ""}
        {category ? ` in ${category}` : ""}
        {query.trim() ? ` matching "${query.trim()}"` : ""}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1.5 rounded-xl border border-border bg-surface p-4 transition-all hover:border-teal hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-teal-deep group-hover:text-teal transition-colors leading-snug">
                  {item.name}
                </p>
                <span className="shrink-0 rounded-full border border-border bg-cream px-2 py-0.5 text-[10px] font-medium text-muted">
                  {item.categoryEmoji} {item.category}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed line-clamp-2">{item.description}</p>
              <p className="mt-auto text-xs font-medium text-orange group-hover:underline truncate">
                {formatUrl(item.url)} ↗
              </p>
            </a>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-surface py-16 text-center">
          <p className="text-sm font-medium text-teal-deep">No resources found</p>
          <p className="mt-1 text-xs text-muted">Try a different search or category.</p>
          {hasFilter && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 text-sm text-teal hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
