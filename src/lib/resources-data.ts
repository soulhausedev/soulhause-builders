export type Resource = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  categoryEmoji: string;
  tags: string[]; // specific type: Email, Database, Hosting, Chatbot, etc.
};

export const RESOURCE_CATEGORIES = [
  { label: "AI Tools",     emoji: "🤖" },
  { label: "Newsletters",  emoji: "📬" },
  { label: "Dev Tools",    emoji: "🛠️" },
  { label: "Learning",     emoji: "📚" },
  { label: "Communities",  emoji: "🌐" },
  { label: "Design",       emoji: "🎨" },
] as const;

type RawItem = {
  name: string;
  description: string;
  url: string;
  tags?: string[];
};

const RAW: { category: string; emoji: string; items: RawItem[] }[] = [
  {
    category: "AI Tools",
    emoji: "🤖",
    items: [
      { name: "ChatGPT",      description: "OpenAI's flagship conversational AI.",                    url: "https://chat.openai.com",         tags: ["Chatbot"] },
      { name: "Claude",       description: "Anthropic's AI assistant — great for code and writing.",  url: "https://claude.ai",               tags: ["Chatbot", "Code"] },
      { name: "Cursor",       description: "AI-powered code editor built on VS Code.",                url: "https://cursor.sh",               tags: ["Code"] },
      { name: "v0 by Vercel", description: "Generate UI components with a prompt.",                   url: "https://v0.dev",                  tags: ["UI", "Code"] },
      { name: "Perplexity",   description: "AI search engine with cited sources.",                    url: "https://perplexity.ai",           tags: ["Search"] },
      { name: "Replicate",    description: "Run and deploy open-source AI models via API.",           url: "https://replicate.com",           tags: ["API"] },
    ],
  },
  {
    category: "Newsletters",
    emoji: "📬",
    items: [
      { name: "The Rundown AI", description: "Daily AI news in 5 minutes.",                       url: "https://therundown.ai",           tags: ["AI"] },
      { name: "TLDR",           description: "Byte-sized tech, science, and coding news.",         url: "https://tldr.tech",               tags: ["Tech"] },
      { name: "Indie Hackers",  description: "Stories and strategies from indie founders.",        url: "https://indiehackers.com",        tags: ["Startups"] },
      { name: "Bytes.dev",      description: "Fun, weekly JavaScript newsletter.",                 url: "https://bytes.dev",               tags: ["JavaScript"] },
      { name: "Ben's Bites",    description: "Daily AI products and research digest.",             url: "https://bensbites.beehiiv.com",   tags: ["AI"] },
      { name: "Next Play",      description: "Weekly startup opportunities, co-founder intros, and career resources for tech people.", url: "https://nextplayso.substack.com", tags: ["Careers", "Startups"] },
    ],
  },
  {
    category: "Dev Tools",
    emoji: "🛠️",
    items: [
      { name: "Supabase",    description: "Open-source Firebase alternative — auth, DB, storage.", url: "https://supabase.com",    tags: ["Database", "Auth", "Storage"] },
      { name: "Vercel",      description: "Deploy frontend apps with zero config.",                 url: "https://vercel.com",      tags: ["Hosting"] },
      { name: "Railway",     description: "Deploy backends and databases in seconds.",              url: "https://railway.app",     tags: ["Hosting", "Database"] },
      { name: "PlanetScale", description: "Serverless MySQL with branching.",                         url: "https://planetscale.com", tags: ["Database"] },
      { name: "Resend",      description: "Email API built for developers.",                          url: "https://resend.com",      tags: ["Email"] },
      { name: "Upstash",     description: "Serverless Redis and Kafka.",                              url: "https://upstash.com",     tags: ["Database"] },
    ],
  },
  {
    category: "Learning",
    emoji: "📚",
    items: [
      { name: "roadmap.sh",       description: "Community-driven developer roadmaps.",      url: "https://roadmap.sh",              tags: ["Roadmap"] },
      { name: "The Odin Project", description: "Free, open-source full-stack curriculum.", url: "https://theodinproject.com",      tags: ["Course"] },
      { name: "Fireship",         description: "Fast-paced coding tutorials on YouTube.", url: "https://fireship.io",             tags: ["Video"] },
      { name: "Fast.ai",          description: "Practical deep learning for coders.",     url: "https://fast.ai",                 tags: ["AI", "Course"] },
      { name: "DeepLearning.AI",  description: "AI courses by Andrew Ng.",                url: "https://deeplearning.ai",         tags: ["AI", "Course"] },
    ],
  },
  {
    category: "Communities",
    emoji: "🌐",
    items: [
      { name: "Indie Hackers",         description: "Forum for founders building in public.",          url: "https://indiehackers.com",        tags: ["Forum", "Startups"] },
      { name: "Hacker News",           description: "Tech news and discussion by Y Combinator.",      url: "https://news.ycombinator.com",    tags: ["News", "Forum"] },
      { name: "Dev.to",                description: "Community of software developers sharing ideas.", url: "https://dev.to",                  tags: ["Forum"] },
      { name: "Soulhause on LinkedIn", description: "Join our builder community on LinkedIn.",       url: "https://linkedin.com/groups/30920002/", tags: ["Community"] },
    ],
  },
  {
    category: "Design",
    emoji: "🎨",
    items: [
      { name: "Figma",       description: "Collaborative UI design tool.",                                url: "https://figma.com",       tags: ["UI"] },
      { name: "Tailwind UI", description: "Official Tailwind CSS component library.",                    url: "https://tailwindui.com",  tags: ["UI", "Components"] },
      { name: "shadcn/ui",   description: "Beautifully designed components built with Radix + Tailwind.", url: "https://ui.shadcn.com",   tags: ["UI", "Components"] },
      { name: "Heroicons",   description: "Free SVG icons from the makers of Tailwind.",                 url: "https://heroicons.com",   tags: ["Icons"] },
      { name: "Unsplash",    description: "Free high-quality stock photos.",                             url: "https://unsplash.com",    tags: ["Photos"] },
    ],
  },
];

export const RESOURCES: Resource[] = RAW.flatMap(({ category, emoji, items }) =>
  items.map((item, i) => ({
    id: `${category.toLowerCase().replace(/\s+/g, "-")}-${i}`,
    name: item.name,
    description: item.description,
    url: item.url,
    tags: item.tags ?? [],
    category,
    categoryEmoji: emoji,
  }))
);
