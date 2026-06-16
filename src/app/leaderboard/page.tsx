import { createClient } from "@/lib/supabase/server";
import { VoteButton } from "@/components/ui/vote-button";
import Link from "next/link";

function getWeekStart() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString();
}

const MEDAL = ["🥇", "🥈", "🥉"];

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const weekStart = getWeekStart();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch this week's projects with vote counts and author profiles
  const { data: projects } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      description,
      link_url,
      link_label,
      project_type,
      tags,
      created_at,
      profiles ( username, full_name ),
      votes ( id )
    `)
    .gte("created_at", weekStart)
    .order("created_at", { ascending: false });

  type RawProject = {
    id: string;
    title: string;
    description: string;
    link_url: string;
    link_label: string;
    project_type: string[];
    tags: string[];
    created_at: string;
    profiles: { username: string; full_name: string }[] | { username: string; full_name: string } | null;
    votes: { id: string }[];
  };

  // Sort by vote count descending
  const sorted = (projects ?? [])
    .map((p: RawProject) => {
      // Supabase may return profiles as array (one-to-many join) or object
      const profileRaw = p.profiles;
      const profile = Array.isArray(profileRaw) ? profileRaw[0] ?? null : profileRaw;
      return {
        ...p,
        profiles: profile as { username: string; full_name: string } | null,
        voteCount: p.votes?.length ?? 0,
      };
    })
    .sort((a, b) => b.voteCount - a.voteCount);

  // Get current user's votes for this week's projects
  let userVotedIds: string[] = [];
  if (user) {
    const { data: userVotes } = await supabase
      .from("votes")
      .select("project_id")
      .eq("user_id", user.id)
      .in("project_id", sorted.map((p) => p.id));
    userVotedIds = (userVotes ?? []).map((v: { project_id: string }) => v.project_id);
  }

  const weekLabel = new Date(weekStart).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">
          Week of {weekLabel}
        </p>
        <h1
          className="text-4xl leading-tight"
          style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
        >
          <span className="text-teal-deep">What builders</span>
          <br />
          <span className="text-orange">shipped this week</span>
        </h1>
        <p className="mt-2 text-sm text-muted max-w-md">
          Projects submitted this week, ranked by 🔥 from the community.
          {!user && (
            <> <Link href="/auth/login" className="text-teal hover:underline">Sign in</Link> to vote.</>
          )}
        </p>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-surface p-12 text-center">
          <p className="text-3xl mb-3">🏗️</p>
          <p className="font-semibold text-teal-deep">Nothing shipped yet this week</p>
          <p className="text-sm text-muted mt-1">Be the first to post a project.</p>
          {user ? (
            <Link
              href="/projects/new"
              className="mt-5 inline-block rounded-lg bg-orange px-6 py-2.5 text-sm font-medium text-white hover:bg-terra transition-colors"
            >
              + Add a project
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="mt-5 inline-block rounded-lg bg-teal px-6 py-2.5 text-sm font-medium text-white hover:bg-teal-dark transition-colors"
            >
              Sign in to post
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sorted.map((project, i) => {
            const voted = userVotedIds.includes(project.id);
            const author = project.profiles;
            const categoryTags = (project.tags ?? []).filter(
              (t: string) => !["Free", "Open Source"].includes(t)
            );

            return (
              <div
                key={project.id}
                className={[
                  "rounded-2xl border bg-surface p-5 flex gap-4 transition-shadow hover:shadow-sm",
                  i === 0 ? "border-orange/40 bg-orange/5" : "border-border",
                ].join(" ")}
              >
                {/* Rank */}
                <div className="flex flex-col items-center gap-2 pt-1 w-8 shrink-0">
                  <span className="text-xl leading-none">
                    {i < 3 ? MEDAL[i] : <span className="text-sm font-bold text-muted">#{i + 1}</span>}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-teal-deep leading-snug">{project.title}</p>
                      {author && (
                        <p className="text-xs text-muted mt-0.5">
                          by{" "}
                          <Link
                            href={`/p/${author.username}`}
                            className="hover:text-teal transition-colors"
                          >
                            {author.full_name || author.username}
                          </Link>
                        </p>
                      )}
                    </div>
                    <VoteButton
                      projectId={project.id}
                      count={project.voteCount}
                      voted={voted}
                      disabled={!user}
                    />
                  </div>

                  <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {/* Free / Open Source badges */}
                    {project.project_type?.includes("Free") && (
                      <span className="rounded-full bg-gold/20 border border-gold/40 px-2 py-0.5 text-xs font-medium text-teal-deep">🆓 Free</span>
                    )}
                    {project.project_type?.includes("Open Source") && (
                      <span className="rounded-full bg-teal/10 border border-teal/30 px-2 py-0.5 text-xs font-medium text-teal-deep">🔓 Open Source</span>
                    )}
                    {/* Category tags */}
                    {categoryTags.map((t: string) => (
                      <span key={t} className="rounded-full bg-cream border border-border px-2 py-0.5 text-xs text-muted">
                        {t}
                      </span>
                    ))}
                    {/* Link */}
                    {project.link_url && (
                      <a
                        href={project.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-xs font-medium text-teal hover:underline"
                      >
                        {project.link_label || "View project"} ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CTA for logged-in users */}
      {user && sorted.length > 0 && (
        <div className="mt-10 text-center">
          <Link
            href="/projects/new"
            className="inline-block rounded-lg bg-orange px-6 py-2.5 text-sm font-medium text-white hover:bg-terra transition-colors"
          >
            + Ship something this week
          </Link>
        </div>
      )}
    </div>
  );
}
