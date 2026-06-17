import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";
import { PeopleCard } from "@/components/ui/people-card";
import { SunMark } from "@/components/ui/sun-mark";
import { createClient } from "@/lib/supabase/server";
import { type DbProject, type DbBuilder } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createClient();

  const weekStart = (() => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now);
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString();
  })();

  // Fetch recent projects, builders, and top leaderboard project in parallel
  const [
    { data: recentProjects },
    { data: recentBuilders },
    { data: topProjects },
  ] = await Promise.all([
    supabase
      .from("projects")
      .select("id, title, description, image_url, tags, project_type, link_url, link_label, created_at, user_id, profiles(username, full_name)")
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("profiles")
      .select("id, username, full_name, role, bio, location, skills, avatar_url")
      .not("username", "is", null)
      .order("updated_at", { ascending: false })
      .limit(3),
    supabase
      .from("projects")
      .select("id, title, description, link_url, link_label, user_id, profiles(username, full_name), votes(id)")
      .gte("created_at", weekStart)
      .order("created_at", { ascending: false }),
  ]);

  const featured = (recentProjects ?? []) as unknown as DbProject[];
  const builders = (recentBuilders ?? []) as unknown as DbBuilder[];

  // Pick top project this week by vote count
  const topThis = (topProjects ?? [])
    .map((p: { id: string; title: string; description: string; link_url: string; link_label: string | null; profiles: { username: string; full_name: string | null } | { username: string; full_name: string | null }[] | null; votes: { id: string }[] }) => ({
      ...p,
      voteCount: (p.votes ?? []).length,
      profile: Array.isArray(p.profiles) ? p.profiles[0] : p.profiles,
    }))
    .sort((a, b) => b.voteCount - a.voteCount)[0] ?? null;

  return (
    <div className="dot-grid">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-12 sm:pt-20 pb-10 sm:pb-16 overflow-hidden">
        <SunMark size={280} opacity={0.05} color="#4F9080" className="absolute -right-10 -top-10 hidden sm:block" />
        <h1
          className="mb-5 max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
        >
          <span className="text-teal-deep">Build in public.</span>
          <br />
          <span className="text-orange">Get seen.</span>
        </h1>
        <p className="mb-7 max-w-lg text-base sm:text-lg text-muted">
          Your project deserves to be seen. Post it, link it, and let the work speak for itself.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/auth/login" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">Add your project</Button>
          </Link>
          <Link href="/leaderboard" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">🔥 This week&apos;s top builds</Button>
          </Link>
        </div>
      </section>

      {/* ── This week's #1 ───────────────────────────────────────────────── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-teal-deep" style={{ fontFamily: "var(--font-retro)" }}>
              🔥 Top build this week
            </h2>
            <Link href="/leaderboard" className="text-xs font-medium text-teal hover:text-teal-dark">
              Full leaderboard →
            </Link>
          </div>

          {topThis ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
                style={{ backgroundColor: "#4F9080" }}
              >
                🥇
              </div>
              <div className="flex-1">
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
                >
                  <span className="text-teal-deep">{topThis.title}</span>
                </h2>
                <p className="mt-1 max-w-xl text-sm text-muted">{topThis.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span>
                    by{" "}
                    <Link href={`/${topThis.profile?.username}`} className="font-medium text-teal hover:text-teal-dark">
                      {topThis.profile?.full_name || topThis.profile?.username}
                    </Link>
                  </span>
                  <span>·</span>
                  <span>🔥 {topThis.voteCount} vote{topThis.voteCount !== 1 ? "s" : ""}</span>
                </div>
              </div>
              {topThis.link_url && (
                <a
                  href={topThis.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg border border-border bg-cream px-4 py-2 text-sm font-medium text-teal-deep transition-colors hover:border-teal hover:text-teal"
                >
                  {topThis.link_label || "View project"} →
                </a>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted">
              Nothing shipped yet this week —{" "}
              <Link href="/projects/new" className="text-teal hover:underline">be the first</Link>.
            </p>
          )}
        </div>
      </section>

      {/* ── Recent projects ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-teal-deep" style={{ fontFamily: "var(--font-retro)" }}>
            Recent projects
          </h2>
          <Link href="/directory" className="text-xs font-medium text-teal hover:text-teal-dark">
            Browse all →
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">
            No projects yet.{" "}
            <Link href="/projects/new" className="text-teal hover:underline">Add the first one.</Link>
          </p>
        )}
      </section>

      {/* ── Builders ─────────────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-teal-deep" style={{ fontFamily: "var(--font-retro)" }}>
              Builders
            </h2>
            <Link href="/builders" className="text-xs font-medium text-teal hover:text-teal-dark">
              Find builders →
            </Link>
          </div>

          {builders.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {builders.map((builder) => (
                <PeopleCard key={builder.id} builder={builder} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              No builders yet.{" "}
              <Link href="/auth/login" className="text-teal hover:underline">Create your profile.</Link>
            </p>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border bg-teal-deep">
        <SunMark size={220} opacity={0.08} color="#F5C432" className="absolute -left-10 -bottom-10" />
        <SunMark size={160} opacity={0.06} color="#E8703A" className="absolute -right-6 -top-6" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h2
            className="mb-4 text-3xl sm:text-4xl text-cream"
            style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
          >
            Stop hiding what you built.
          </h2>
          <p className="mb-8 mx-auto max-w-md text-teal-pale text-sm sm:text-base">
            Post your project in 2 minutes. No pitch deck. Just your work.
          </p>
          <Link href="/auth/login">
            <Button size="lg" className="bg-orange text-white hover:bg-terra w-full sm:w-auto">
              Add your project now
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
