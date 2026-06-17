import { createClient } from "@/lib/supabase/server";
import { ProjectCard } from "@/components/ui/project-card";
import { DirectoryFilters } from "@/components/ui/directory-filters";
import { type DbProject } from "@/lib/types";
import Link from "next/link";
import { Suspense } from "react";

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

      <Suspense>
        <DirectoryFilters />
      </Suspense>

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

