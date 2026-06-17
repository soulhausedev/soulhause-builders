export function Footer() {
  return (
    <footer className="border-t border-border bg-cream py-8">
      <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted">
        <span>© {new Date().getFullYear()} Soulhause Builders</span>
        <a
          href="https://www.linkedin.com/groups/30920002/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-teal-deep transition-colors hover:border-teal hover:text-teal"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
          </svg>
          Join the community on LinkedIn
        </a>
      </div>
    </footer>
  );
}
