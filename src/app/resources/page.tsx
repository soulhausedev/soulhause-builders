import { SunMark } from "@/components/ui/sun-mark";

type Resource = {
  name: string;
  description: string;
  url: string;
  tag: string;
};

type Category = {
  label: string;
  emoji: string;
  items: Resource[];
};

const RESOURCES: Category[] = [
  {
    label: "AI Tools",
    emoji: "🤖",
    items: [
      { name: "ChatGPT",      description: "OpenAI's flagship conversational AI.",                    url: "https://chat.openai.com",         tag: "AI" },
      { name: "Claude",       description: "Anthropic's AI assistant — great for code and writing.",  url: "https://claude.ai",               tag: "AI" },
      { name: "Cursor",       description: "AI-powered code editor built on VS Code.",                url: "https://cursor.sh",               tag: "AI" },
      { name: "v0 by Vercel", description: "Generate UI components with a prompt.",                   url: "https://v0.dev",                  tag: "AI" },
      { name: "Perplexity",   description: "AI search engine with cited sources.",                    url: "https://perplexity.ai",           tag: "AI" },
      { name: "Replicate",    description: "Run and deploy open-source AI models via API.",           url: "https://replicate.com",           tag: "AI" },
    ],
  },
  {
    label: "Newsletters",
    emoji: "📬",
    items: [
      { name: "The Rundown AI",    description: "Daily AI news in 5 minutes.",                       url: "https://therundown.ai",           tag: "Newsletter" },
      { name: "TLDR",              description: "Byte-sized tech, science, and coding news.",         url: "https://tldr.tech",               tag: "Newsletter" },
      { name: "Indie Hackers",     description: "Stories and strategies from indie founders.",        url: "https://indiehackers.com",        tag: "Newsletter" },
      { name: "Bytes.dev",         description: "Fun, weekly JavaScript newsletter.",                 url: "https://bytes.dev",               tag: "Newsletter" },
      { name: "Ben's Bites",       description: "Daily AI products and research digest.",             url: "https://bensbites.beehiiv.com",   tag: "Newsletter" },
    ],
  },
  {
    label: "Dev Tools",
    emoji: "🛠️",
    items: [
      { name: "Supabase",    description: "Open-source Firebase alternative — auth, DB, storage.",   url: "https://supabase.com",            tag: "Dev Tool" },
      { name: "Vercel",      description: "Deploy frontend apps with zero config.",                   url: "https://vercel.com",              tag: "Dev Tool" },
      { name: "Railway",     description: "Deploy backends and databases in seconds.",                url: "https://railway.app",             tag: "Dev Tool" },
      { name: "PlanetScale", description: "Serverless MySQL with branching.",                         url: "https://planetscale.com",         tag: "Dev Tool" },
      { name: "Resend",      description: "Email API built for developers.",                          url: "https://resend.com",              tag: "Dev Tool" },
      { name: "Upstash",     description: "Serverless Redis and Kafka.",                              url: "https://upstash.com",             tag: "Dev Tool" },
    ],
  },
  {
    label: "Learning",
    emoji: "📚",
    items: [
      { name: "roadmap.sh",      description: "Community-driven developer roadmaps.",                url: "https://roadmap.sh",              tag: "Learning" },
      { name: "The Odin Project", description: "Free, open-source full-stack curriculum.",           url: "https://theodinproject.com",      tag: "Learning" },
      { name: "Fireship",        description: "Fast-paced coding tutorials on YouTube.",             url: "https://fireship.io",             tag: "Learning" },
      { name: "Fast.ai",         description: "Practical deep learning for coders.",                 url: "https://fast.ai",                 tag: "Learning" },
      { name: "DeepLearning.AI", description: "AI courses by Andrew Ng.",                            url: "https://deeplearning.ai",         tag: "Learning" },
    ],
  },
  {
    label: "Communities",
    emoji: "🌐",
    items: [
      { name: "Indie Hackers",        description: "Forum for founders building in public.",         url: "https://indiehackers.com",        tag: "Community" },
      { name: "Hacker News",          description: "Tech news and discussion by Y Combinator.",     url: "https://news.ycombinator.com",    tag: "Community" },
      { name: "Dev.to",               description: "Community of software developers sharing ideas.",url: "https://dev.to",                  tag: "Community" },
      { name: "Soulhause on LinkedIn","description": "Join our builder community on LinkedIn.",      url: "https://linkedin.com/groups/30920002/", tag: "Community" },
    ],
  },
  {
    label: "Design",
    emoji: "🎨",
    items: [
      { name: "Figma",       description: "Collaborative UI design tool.",                           url: "https://figma.com",               tag: "Design" },
      { name: "Tailwind UI", description: "Official Tailwind CSS component library.",                url: "https://tailwindui.com",          tag: "Design" },
      { name: "shadcn/ui",   description: "Beautifully designed components built with Radix + Tailwind.", url: "https://ui.shadcn.com",      tag: "Design" },
      { name: "Heroicons",   description: "Free SVG icons from the makers of Tailwind.",             url: "https://heroicons.com",           tag: "Design" },
      { name: "Unsplash",    description: "Free high-quality stock photos.",                         url: "https://unsplash.com",            tag: "Design" },
    ],
  },
];

export const metadata = {
  title: "Resources",
  description: "Curated tech and AI tools, newsletters, and communities for builders.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">

      {/* Header */}
      <div className="relative mb-12 overflow-hidden rounded-2xl border border-border bg-surface px-6 py-10 sm:px-10">
        <SunMark size={200} opacity={0.06} color="#4F9080" className="absolute -right-8 -top-8" />
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">Builder toolkit</p>
        <h1
          className="text-3xl sm:text-4xl"
          style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
        >
          <span className="text-teal-deep">Tech &amp; AI</span>{" "}
          <span className="text-orange">Resources</span>
        </h1>
        <p className="mt-2 max-w-lg text-sm text-muted">
          A curated directory of tools, newsletters, communities, and learning resources for builders. No fluff — just the good stuff.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-12">
        {RESOURCES.map((cat) => (
          <section key={cat.label}>
            <h2
              className="mb-4 flex items-center gap-2 text-xl"
              style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
            >
              <span>{cat.emoji}</span>
              <span className="text-teal-deep">{cat.label}</span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1.5 rounded-xl border border-border bg-surface p-4 transition-all hover:border-teal hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-teal-deep group-hover:text-teal transition-colors leading-snug">
                      {item.name}
                    </p>
                    <span className="shrink-0 rounded-full border border-border bg-cream px-2 py-0.5 text-[10px] font-medium text-muted">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                  <p className="mt-auto text-xs font-medium text-orange group-hover:underline">
                    {item.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
                  </p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Suggest a resource */}
      <div className="mt-14 rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
        <p className="text-lg font-bold text-teal-deep" style={{ fontFamily: "var(--font-retro)" }}>
          Know something we missed?
        </p>
        <p className="mt-1 text-sm text-muted">
          Share it in the{" "}
          <a href="https://linkedin.com/groups/30920002/" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
            LinkedIn community
          </a>{" "}
          and we&apos;ll add it here.
        </p>
      </div>

    </div>
  );
}
