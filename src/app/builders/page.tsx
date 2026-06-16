import { PeopleCard } from "@/components/ui/people-card";
import { MOCK_BUILDERS, ROLES, SKILLS } from "@/lib/mock-data";

export default function BuildersPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; skill?: string; q?: string }>;
}) {
  return <BuildersContent searchParams={searchParams} />;
}

async function BuildersContent({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; skill?: string; q?: string }>;
}) {
  const { role, skill, q } = await searchParams;

  const filtered = MOCK_BUILDERS.filter((b) => {
    const matchesRole  = role  ? b.role === role : true;
    const matchesSkill = skill ? b.skills.includes(skill as never) : true;
    const matchesQuery = q
      ? b.name.toLowerCase().includes(q.toLowerCase()) ||
        b.bio.toLowerCase().includes(q.toLowerCase())
      : true;
    return matchesRole && matchesSkill && matchesQuery;
  });

  const hasFilter = role || skill || q;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8">
        <h1
          className="mb-1 text-3xl"
          style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
        >
          <span className="text-teal-deep">Find</span>{" "}
          <span className="text-orange">builders</span>
        </h1>
        <p className="text-sm text-muted">
          {filtered.length} builder{filtered.length !== 1 ? "s" : ""}
          {role  ? ` · ${role}`  : ""}
          {skill ? ` · ${skill}` : ""}
          {q     ? ` matching "${q}"` : ""}
        </p>
      </div>

      <form method="GET" className="mb-6 flex gap-2">
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search by name or bio…"
          className="h-9 flex-1 rounded-lg border border-border bg-surface px-3 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal"
        />
        {hasFilter && (
          <a href="/builders" className="flex h-9 items-center rounded-lg border border-border bg-surface px-3 text-sm text-muted hover:text-terra">
            Clear
          </a>
        )}
      </form>

      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Role</p>
        <div className="flex flex-wrap gap-2">
          <FilterPill href="/builders" label="All" active={!role} />
          {ROLES.map((r) => (
            <FilterPill
              key={r}
              href={`/builders?role=${encodeURIComponent(r)}${skill ? `&skill=${encodeURIComponent(skill)}` : ""}`}
              label={r}
              active={role === r}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Skills</p>
        <div className="flex flex-wrap gap-2">
          <FilterPill
            href={role ? `/builders?role=${encodeURIComponent(role)}` : "/builders"}
            label="All"
            active={!skill}
          />
          {SKILLS.map((s) => (
            <FilterPill
              key={s}
              href={`/builders?skill=${encodeURIComponent(s)}${role ? `&role=${encodeURIComponent(role)}` : ""}`}
              label={s}
              active={skill === s}
            />
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((builder) => (
            <PeopleCard key={builder.id} builder={builder} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted">
          No builders found.{" "}
          <a href="/builders" className="text-teal underline">Clear filters</a>
        </div>
      )}
    </div>
  );
}

function FilterPill({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <a
      href={href}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? "border-teal bg-teal text-white"
          : "border-border bg-surface text-muted hover:border-teal hover:text-teal"
      }`}
    >
      {label}
    </a>
  );
}
