import { ProjectCard } from "@/components/ui/project-card";
import { MOCK_PROJECTS, ALL_TAGS } from "@/lib/mock-data";

export default function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; q?: string }>;
}) {
  return <DirectoryContent searchParams={searchParams} />;
}

async function DirectoryContent({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; q?: string }>;
}) {
  const { tag, q } = await searchParams;

  const filtered = MOCK_PROJECTS.filter((p) => {
    const matchesTag = tag ? p.tags.includes(tag) : true;
    const matchesQuery = q
      ? p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase())
      : true;
    return matchesTag && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-teal-deep">All projects</h1>
        <p className="text-sm text-muted">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          {tag ? ` in "${tag}"` : ""}
          {q ? ` matching "${q}"` : ""}
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
        {(q || tag) && (
          <a
            href="/directory"
            className="flex h-9 items-center rounded-lg border border-border bg-surface px-3 text-sm text-muted hover:text-terra"
          >
            Clear
          </a>
        )}
      </form>

      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <a
          href="/directory"
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            !tag
              ? "border-teal bg-teal text-white"
              : "border-border bg-surface text-muted hover:border-teal hover:text-teal"
          }`}
        >
          All
        </a>
        {ALL_TAGS.map((t) => (
          <a
            key={t}
            href={`/directory?tag=${encodeURIComponent(t)}`}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              tag === t
                ? "border-teal bg-teal text-white"
                : "border-border bg-surface text-muted hover:border-teal hover:text-teal"
            }`}
          >
            {t}
          </a>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted">
          No projects found.{" "}
          <a href="/directory" className="text-teal underline">
            Clear filters
          </a>
        </div>
      )}
    </div>
  );
}
