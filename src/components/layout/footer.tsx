export function Footer() {
  return (
    <footer className="border-t border-border bg-cream py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted">
        © {new Date().getFullYear()} Soulhause Builders
      </div>
    </footer>
  );
}
