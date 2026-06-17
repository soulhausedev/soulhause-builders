import { SunMark } from "@/components/ui/sun-mark";
import { ResourcesDirectory } from "@/components/ui/resources-directory";
import { RESOURCES } from "@/lib/resources-data";

export const metadata = {
  title: "Resources",
  description: "Searchable directory of tech and AI tools, newsletters, and communities for builders.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">

      {/* Header */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-border bg-surface px-5 py-8 sm:px-10 sm:py-10">
        <SunMark size={200} opacity={0.06} color="#4F9080" className="absolute -right-8 -top-8" />
        <h1
          className="text-3xl sm:text-4xl"
          style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
        >
          <span className="text-teal-deep">Tech &amp; AI</span>{" "}
          <span className="text-orange">Resources</span>
        </h1>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Search {RESOURCES.length}+ curated tools, newsletters, communities, and learning resources for builders.
        </p>
      </div>

      {/* Searchable directory */}
      <ResourcesDirectory resources={RESOURCES} />

      {/* Suggest a resource */}
      <div className="mt-12 rounded-2xl border border-dashed border-border bg-surface p-6 sm:p-8 text-center">
        <p className="text-lg font-bold text-teal-deep" style={{ fontFamily: "var(--font-retro)" }}>
          Know something we missed?
        </p>
        <p className="mt-1 text-sm text-muted">
          Share it in the{" "}
          <a
            href="https://linkedin.com/groups/30920002/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:underline"
          >
            LinkedIn community
          </a>{" "}
          and we&apos;ll add it here.
        </p>
      </div>

    </div>
  );
}
