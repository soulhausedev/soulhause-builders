import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";
import { PeopleCard } from "@/components/ui/people-card";
import { SunMark } from "@/components/ui/sun-mark";
import { MOCK_PROJECTS, MOCK_BUILDERS } from "@/lib/mock-data";
import { THIS_WEEK } from "@/lib/leaderboard-data";

export default function HomePage() {
  const featured  = MOCK_PROJECTS.slice(0, 3);
  const builders  = MOCK_BUILDERS.slice(0, 3);
  const topThis   = THIS_WEEK[0];

  return (
    <div className="dot-grid">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 overflow-hidden">
        <SunMark size={380} opacity={0.05} color="#4F9080" className="absolute -right-16 -top-16" />
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
          § 01 — The platform
        </p>
        <h1
          className="mb-6 max-w-3xl text-5xl leading-tight sm:text-6xl"
          style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
        >
          <span className="text-teal-deep">Build in public.</span>
          <br />
          <span className="text-orange">Get seen.</span>
        </h1>
        <p className="mb-8 max-w-lg text-lg text-muted">
          Your project deserves to be seen. Post it, link it, and let the work speak for itself.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/auth/login">
            <Button size="lg">Add your project</Button>
          </Link>
          <Link href="/leaderboard">
            <Button variant="outline" size="lg">🔥 This week&apos;s top builds</Button>
          </Link>
        </div>
      </section>

      {/* ── This week's #1 ───────────────────────────────────────────────── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              § 02 — Top build this week
            </p>
            <Link href="/leaderboard" className="text-xs font-medium text-teal hover:text-teal-dark">
              Full leaderboard →
            </Link>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
              style={{ fontFamily: "var(--font-retro)", backgroundColor: topThis.authorColor }}
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
                <span>by <Link href={`/p/${topThis.authorUsername}`} className="font-medium text-teal hover:text-teal-dark">{topThis.authorName}</Link></span>
                <span>·</span>
                <span>🔥 {topThis.views.toLocaleString()} views this week</span>
                <span>·</span>
                <span>⚡ {topThis.streak} week streak</span>
              </div>
            </div>
            <a
              href={topThis.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-lg border border-border bg-cream px-4 py-2 text-sm font-medium text-teal-deep transition-colors hover:border-teal hover:text-teal"
            >
              {topThis.linkLabel} →
            </a>
          </div>
        </div>
      </section>

      {/* ── Recent projects ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            § 03 — Recent projects
          </p>
          <Link href="/directory" className="text-xs font-medium text-teal hover:text-teal-dark">
            Browse all →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* ── Builders ─────────────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              § 04 — Builders
            </p>
            <Link href="/builders" className="text-xs font-medium text-teal hover:text-teal-dark">
              Find builders →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {builders.map((builder) => (
              <PeopleCard key={builder.id} builder={builder} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border bg-teal-deep">
        <SunMark size={320} opacity={0.08} color="#F5C432" className="absolute -left-12 -bottom-12" />
        <SunMark size={200} opacity={0.06} color="#E8703A" className="absolute -right-8 -top-8" />
        <div className="relative mx-auto max-w-5xl px-6 py-16 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-pale">
            § 05 — Your turn
          </p>
          <h2
            className="mb-4 text-4xl text-cream"
            style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
          >
            Stop hiding what you built.
          </h2>
          <p className="mb-8 text-muted-foreground mx-auto max-w-md text-teal-pale">
            Post your project in 2 minutes. No account setup. No pitch deck. Just your work.
          </p>
          <Link href="/auth/login">
            <Button
              size="lg"
              className="bg-orange text-white hover:bg-terra"
            >
              Add your project now
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
