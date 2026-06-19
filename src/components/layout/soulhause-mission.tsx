const SOULHAUSE_URL = "https://soulhause.com";

export function SoulhauseMission({ variant = "section" }: { variant?: "section" | "compact" }) {
  if (variant === "compact") {
    return (
      <a
        href={SOULHAUSE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-teal-deep transition-colors hover:border-teal hover:text-teal"
      >
        Explore the Soulhause mission →
      </a>
    );
  }

  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-cream p-6 sm:p-8">
          <div className="max-w-xl">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-orange">
              Part of Soulhause
            </p>
            <h2
              className="text-xl sm:text-2xl leading-snug"
              style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
            >
              <span className="text-teal-deep">Where ideas</span>{" "}
              <span className="text-orange">get built.</span>
            </h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Soulhause Builders is an extension of Soul Labs — a place to share what you&apos;re
              building, find other builders, and turn ideas into real projects.
            </p>
          </div>
          <a
            href={SOULHAUSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center rounded-lg bg-teal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-dark w-full sm:w-auto"
          >
            See the Soulhause mission →
          </a>
        </div>
      </div>
    </section>
  );
}
