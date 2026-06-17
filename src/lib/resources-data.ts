export type Resource = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  categoryEmoji: string;
};

export const RESOURCE_CATEGORIES = [
  { label: "AI Tools",     emoji: "🤖" },
  { label: "Newsletters",  emoji: "📬" },
  { label: "Dev Tools",    emoji: "🛠️" },
  { label: "Learning",     emoji: "📚" },
  { label: "Communities",  emoji: "🌐" },
  { label: "Design",       emoji: "🎨" },
] as const;

const RAW: { category: string; emoji: string; items: Omit<Resource, "id" | "category" | "categoryEmoji">[] }[] = [
  {
    category: "AI Tools",
    emoji: "🤖",
    items: [
      { name: "ChatGPT",      description: "OpenAI's flagship conversational AI.",                    url: "https://chat.openai.com" },
      { name: "Claude",       description: "Anthropic's AI assistant — great for code and writing.",  url: "https://claude.ai" },
      { name: "Cursor",       description: "AI-powered code editor built on VS Code.",                url: "https://cursor.sh" },
      { name: "v0 by Vercel", description: "Generate UI components with a prompt.",                   url: "https://v0.dev" },
      { name: "Perplexity",   description: "AI search engine with cited sources.",                    url: "https://perplexity.ai" },
      { name: "Replicate",    description: "Run and deploy open-source AI models via API.",           url: "https://replicate.com" },
    ],
  },
  {
    category: "Newsletters",
    emoji: "📬",
    items: [
      { name: "The Rundown AI", description: "Daily AI news in 5 minutes.",                       url: "https://therundown.ai" },
      { name: "TLDR",           description: "Byte-sized tech, science, and coding news.",         url: "https://tldr.tech" },
      { name: "Indie Hackers",  description: "Stories and strategies from indie founders.",        url: "https://indiehackers.com" },
      { name: "Bytes.dev",      description: "Fun, weekly JavaScript newsletter.",                 url: "https://bytes.dev" },
      { name: "Ben's Bites",    description: "Daily AI products and research digest.",             url: "https://bensbites.beehiiv.com" },
    ],
  },
  {
    category: "Dev Tools",
    emoji: "🛠️",
    items: [
      { name: "Supabase",    description: "Open-source Firebase alternative — auth, DB, storage.", url: "https://supabase.com" },
      { name: "Vercel",      description: "Deploy frontend apps with zero config.",                 url: "https://vercel.com" },
      { name: "Railway",     description: "Deploy backends and databases in seconds.",              url: "https://railway.app" },
      { name: "PlanetScale", description: "Serverless MySQL with branching.",                         url: "https://planetscale.com" },
      { name: "Resend",      description: "Email API built for developers.",                          url: "https://resend.com" },
      { name: "Upstash",     description: "Serverless Redis and Kafka.",                              url: "https://upstash.com" },
    ],
  },
  {
    category: "Learning",
    emoji: "📚",
    items: [
      { name: "roadmap.sh",       description: "Community-driven developer roadmaps.",      url: "https://roadmap.sh" },
      { name: "The Odin Project", description: "Free, open-source full-stack curriculum.", url: "https://theodinproject.com" },
      { name: "Fireship",         description: "Fast-paced coding tutorials on YouTube.", url: "https://fireship.io" },
      { name: "Fast.ai",          description: "Practical deep learning for coders.",     url: "https://fast.ai" },
      { name: "DeepLearning.AI",  description: "AI courses by Andrew Ng.",                url: "https://deeplearning.ai" },
    ],
  },
  {
    category: "Communities",
    emoji: "🌐",
    items: [
      { name: "Indie Hackers",         description: "Forum for founders building in public.",          url: "https://indiehackers.com" },
      { name: "Hacker News",           description: "Tech news and discussion by Y Combinator.",      url: "https://news.ycombinator.com" },
      { name: "Dev.to",                description: "Community of software developers sharing ideas.", url: "https://dev.to" },
      { name: "Soulhause on LinkedIn", description: "Join our builder community on LinkedIn.",       url: "https://linkedin.com/groups/30920002/" },
    ],
  },
  {
    category: "Design",
    emoji: "🎨",
    items: [
      { name: "Figma",       description: "Collaborative UI design tool.",                                url: "https://figma.com" },
      { name: "Tailwind UI", description: "Official Tailwind CSS component library.",                    url: "https://tailwindui.com" },
      { name: "shadcn/ui",   description: "Beautifully designed components built with Radix + Tailwind.", url: "https://ui.shadcn.com" },
      { name: "Heroicons",   description: "Free SVG icons from the makers of Tailwind.",                 url: "https://heroicons.com" },
      { name: "Unsplash",    description: "Free high-quality stock photos.",                             url: "https://unsplash.com" },
    ],
  },
];

export const RESOURCES: Resource[] = RAW.flatMap(({ category, emoji, items }) =>
  items.map((item, i) => ({
    id: `${category.toLowerCase().replace(/\s+/g, "-")}-${i}`,
    ...item,
    category,
    categoryEmoji: emoji,
  }))
);
