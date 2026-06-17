import { createClient } from "@/lib/supabase/server";
import { ProjectCard } from "@/components/ui/project-card";
import { CATEGORIES } from "@/lib/mock-data";
import { type DbProject } from "@/lib/types";
import Link from "next/link";

const PROJECT_TYPES = [
  { value: "Free",        emoji: "🆓" },
  { value: "Paid",        emoji: "💰" },
  { value: "Open Source", emoji: "🔓" },
] as const;

export default function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; type?: string; q?: string }>;
}) {
  return <DirectoryContent searchParams={searchParams} />;
}

async function DirectoryContent({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; type?: string; q?: string }>;
}) {
  const { tag, type, q } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("projects")
    .select("id, title, description, image_url, tags, project_type, link_url, link_label, created_at, user_id, profiles(username, full_name)")
    .order("created_at", { ascending: false });

  if (tag)  query = query.contains("tags", [tag]);
  if (type) query = query.contains("project_type", [type]);
  if (q)    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);

  const { data: projects } = await query;
  const results = (projects ?? []) as unknown as DbProject[];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8">
        <h1
          className="mb-1 text-3xl"
          style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
        >
          <span className="text-teal-deep">All</span>{" "}
          <span className="text-orange">projects</span>
        </h1>
        <p className="text-sm text-muted">
          {results.length} project{results.length !== 1 ? "s" : ""}
          {type ? ` · ${type}` : ""}
          {tag  ? ` in "${tag}"` : ""}
          {q    ? ` matching "${q}"` : ""}
        </p>
      </div>

      {/* Search */}
      <form method="GET" className="mb-6 flex gap-2">
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search projects…"
          className="h-9 flex-1 rounded-lg border border-border bg-surface px-3 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal"
        />
        {(q || tag || type) && (
          <a href="/directory" className="flex h-9 items-center rounded-lg border border-border bg-surface px-3 text-sm text-muted hover:text-terra">
            Clear
          </a>
        )}
      </form>

      {/* Type filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        <a href={tag ? `/directory?tag=${encodeURIComponent(tag)}` : "/directory"} className={pill(!type)}>
          All types
        </a>
        {PROJECT_TYPES.map(({ value, emoji }) => {
          const href = `/directory?type=${encodeURIComponent(value)}${tag ? `&tag=${encodeURIComponent(tag)}` : ""}`;
          return (
            <a key={value} href={href} className={pill(type === value)}>
              {emoji} {value}
            </a>
          );
        })}
      </div>

      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <a href={type ? `/directory?type=${encodeURIComponent(type)}` : "/directory"} className={pill(!tag)}>
          All categories
        </a>
        {CATEGORIES.map((t) => {
          const href = `/directory?tag=${encodeURIComponent(t)}${type ? `&type=${encodeURIComponent(type)}` : ""}`;
          return (
            <a key={t} href={href} className={pill(tag === t)}>
              {t}
            </a>
          );
        })}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted">
          No projects yet.{" "}
          <Link href="/projects/new" className="text-teal underline">Be the first to add one.</Link>
        </div>
      )}
    </div>
  );
}

function pill(active: boolean) {
  return `rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
    active
      ? "border-teal bg-teal text-white"
      : "border-border bg-surface text-muted hover:border-teal hover:text-teal"
  }`;
}
