// ─── Static constants used by forms and filters ───────────────────────────────
// (All actual data now lives in Supabase)

export const ROLES = [
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile Developer",
  "Designer",
  "Product Manager",
  "Founder",
  "DevOps / Infra",
  "Data / ML",
] as const;

export const SKILLS = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Rust",
  "Go",
  "React",
  "Next.js",
  "Vue.js",
  "React Native",
  "Node.js",
  "PostgreSQL",
  "Figma",
  "AWS",
  "Docker",
] as const;

export const CATEGORIES = [
  "Productivity",
  "Fitness & Health",
  "Food & Cooking",
  "Finance",
  "Education",
  "Travel",
  "Tools & Utilities",
  "Design",
  "Music",
  "Art & Creative",
  "Business",
  "Entertainment",
] as const;

export type Role     = (typeof ROLES)[number];
export type Skill    = (typeof SKILLS)[number];
export type Category = (typeof CATEGORIES)[number];

export const ALL_TAGS = CATEGORIES;

export type SocialLinks = {
  website?:   string;
  github?:    string;
  twitter?:   string;
  linkedin?:  string;
  instagram?: string;
  youtube?:   string;
};
