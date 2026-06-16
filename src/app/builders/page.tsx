import { createClient } from "@/lib/supabase/server";
import { PeopleCard } from "@/components/ui/people-card";
import { ROLES, SKILLS } from "@/lib/mock-data";
import { type DbBuilder } from "@/lib/types";

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
  const supabase = await createClient();

  let query = supabase
    .from("profiles")
    .select("id, username, full_name, role, bio, location, skills")
    .not("username", "is", null)
    .order("updated_at", { ascending: false });

  if (role)  query = query.eq("role", role);
  if (skill) query = query.contains("skills", [skill]);
  if (q)     query = query.or(`full_name.ilike.%${q}%,bio.ilike.%${q}%,username.ilike.%${q}%`);

  const { data: builders } = await query;
  const results = (builders ?? []) as DbBuilder[];
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
          {results.length} builder{results.length !== 1 ? "s" : ""}
          {role  ? ` · ${role}`   : ""}
          {skill ? ` · ${skill}`  : ""}
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

      {results.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((builder) => (
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
