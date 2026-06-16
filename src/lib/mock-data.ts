// ─── Builders / People ───────────────────────────────────────────────────────

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

export type Role = (typeof ROLES)[number];
export type Skill = (typeof SKILLS)[number];

export type SocialLinks = {
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
};

export type Builder = {
  id: string;
  name: string;
  username: string;
  initials: string;
  avatarColor: string;
  role: Role;
  skills: Skill[];
  bio: string;
  location: string;
  available: boolean;
  social: SocialLinks;
};

export const MOCK_BUILDERS: Builder[] = [
  {
    id: "b1",
    name: "Maya Chen",
    username: "mayachen",
    initials: "MC",
    avatarColor: "#4F9080",
    role: "Full-Stack Developer",
    skills: ["TypeScript", "Next.js", "React", "PostgreSQL"],
    bio: "Indie hacker building tools for remote teams. I ship things every weekend.",
    location: "San Francisco, CA",
    available: true,
    social: { website: "https://mayachen.dev", github: "mayachen", twitter: "mayachen_dev" },
  },
  {
    id: "b2",
    name: "James Okafor",
    username: "jamesokafor",
    initials: "JO",
    avatarColor: "#E8703A",
    role: "Backend Developer",
    skills: ["Rust", "Go", "PostgreSQL", "Docker"],
    bio: "Obsessed with performance and databases. Building in public since 2022.",
    location: "Lagos, Nigeria",
    available: false,
    social: { github: "jamesokafor", twitter: "jamesokafor", linkedin: "jamesokafor" },
  },
  {
    id: "b3",
    name: "Sofia Reyes",
    username: "sofiareyes",
    initials: "SR",
    avatarColor: "#F5C432",
    role: "Designer",
    skills: ["Figma", "React", "TypeScript"],
    bio: "Designer who codes. I make things that look good and work even better.",
    location: "Mexico City, MX",
    available: true,
    social: { website: "https://sofiadesigns.io", instagram: "sofiadesigns", twitter: "sofiareyes_" },
  },
  {
    id: "b4",
    name: "Tobias Werner",
    username: "tobiaswerner",
    initials: "TW",
    avatarColor: "#C45525",
    role: "DevOps / Infra",
    skills: ["Go", "Rust", "Docker", "AWS"],
    bio: "Backend engineer obsessed with performance. Building between coffee and climbing.",
    location: "Berlin, Germany",
    available: false,
    social: { github: "tobiaswerner", linkedin: "tobiaswerner" },
  },
  {
    id: "b5",
    name: "Priya Nair",
    username: "priyanair",
    initials: "PN",
    avatarColor: "#6BAF9E",
    role: "Mobile Developer",
    skills: ["React Native", "TypeScript", "Python"],
    bio: "Product engineer on weekdays, indie builder on weekends. Passionate about EdTech.",
    location: "Bengaluru, India",
    available: true,
    social: { website: "https://priyanair.in", github: "priyanair", twitter: "priyanair_" },
  },
  {
    id: "b6",
    name: "Liam Nguyen",
    username: "liamnguyen",
    initials: "LN",
    avatarColor: "#3D7264",
    role: "Founder",
    skills: ["JavaScript", "Vue.js", "Node.js", "PostgreSQL"],
    bio: "Solo founder building micro-SaaS. Documenting the journey on my blog.",
    location: "Melbourne, AU",
    available: false,
    social: { website: "https://liamnguyen.au", twitter: "liamnguyen_au", linkedin: "liamnguyen" },
  },
  {
    id: "b7",
    name: "Amara Diallo",
    username: "amaradiallo",
    initials: "AD",
    avatarColor: "#F0A020",
    role: "Frontend Developer",
    skills: ["React", "TypeScript", "JavaScript", "Figma"],
    bio: "Frontend dev focused on accessibility and beautiful interfaces.",
    location: "Dakar, Senegal",
    available: true,
    social: { github: "amaradiallo", twitter: "amaradiallo", instagram: "amaradiallo" },
  },
  {
    id: "b8",
    name: "Kenji Tanaka",
    username: "kenjitanaka",
    initials: "KT",
    avatarColor: "#2D5A50",
    role: "Data / ML",
    skills: ["Python", "PostgreSQL", "AWS"],
    bio: "ML engineer turning messy data into useful products. Open to interesting problems.",
    location: "Tokyo, Japan",
    available: true,
    social: { github: "kenjitanaka", linkedin: "kenjitanaka", youtube: "kenjitanaka" },
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectLink = {
  label: string; // e.g. "View on GitHub", "Live Demo", "App Store"
  url: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string; // URL to cover image
  tags: string[];
  link: ProjectLink;
  authorName: string;
  authorUsername: string;
  authorInitials: string;
  authorColor: string;
};

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

export type Category = (typeof CATEGORIES)[number];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "MealStack",
    description:
      "Plan your weekly meals, auto-generate a grocery list, and discover new recipes based on what's already in your fridge.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    tags: ["Food & Cooking"],
    link: { label: "Open MealStack", url: "#" },
    authorName: "Sofia Reyes",
    authorUsername: "sofiareyes",
    authorInitials: "SR",
    authorColor: "#F5C432",
  },
  {
    id: "2",
    title: "Liftlog",
    description:
      "Simple strength training tracker. Log your sets, track progressive overload week over week, and see your PRs at a glance.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    tags: ["Fitness & Health"],
    link: { label: "Try Liftlog", url: "#" },
    authorName: "Tobias Werner",
    authorUsername: "tobiaswerner",
    authorInitials: "TW",
    authorColor: "#C45525",
  },
  {
    id: "3",
    title: "Focusblock",
    description:
      "A minimal focus timer built around the Pomodoro method. Block distracting sites, track your sessions, and build a daily streak.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    tags: ["Productivity"],
    link: { label: "Start focusing", url: "#" },
    authorName: "Maya Chen",
    authorUsername: "mayachen",
    authorInitials: "MC",
    authorColor: "#4F9080",
  },
  {
    id: "4",
    title: "Invoiced.fyi",
    description:
      "Create a professional PDF invoice in 30 seconds. No account needed, no subscription — just fill in the fields and download.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    tags: ["Finance", "Business"],
    link: { label: "Open the app", url: "#" },
    authorName: "Liam Nguyen",
    authorUsername: "liamnguyen",
    authorInitials: "LN",
    authorColor: "#3D7264",
  },
  {
    id: "5",
    title: "Flashr",
    description:
      "Spaced repetition flashcards that sync across all your devices. Import from any source or just start typing. Works fully offline.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    tags: ["Education"],
    link: { label: "Download on App Store", url: "#" },
    authorName: "Priya Nair",
    authorUsername: "priyanair",
    authorInitials: "PN",
    authorColor: "#6BAF9E",
  },
  {
    id: "6",
    title: "Triply",
    description:
      "Collaborative travel itinerary builder. Add flights, hotels, and activities on a shared timeline your whole group can edit in real time.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    tags: ["Travel"],
    link: { label: "Plan a trip", url: "#" },
    authorName: "James Okafor",
    authorUsername: "jamesokafor",
    authorInitials: "JO",
    authorColor: "#E8703A",
  },
  {
    id: "7",
    title: "Palette Studio",
    description:
      "Generate accessible color palettes from a single seed color. Export to CSS variables, Tailwind config, or Figma tokens instantly.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
    tags: ["Design", "Tools & Utilities"],
    link: { label: "Try it live", url: "#" },
    authorName: "Sofia Reyes",
    authorUsername: "sofiareyes",
    authorInitials: "SR",
    authorColor: "#F5C432",
  },
  {
    id: "8",
    title: "Chordboard",
    description:
      "Learn guitar chords interactively. Search any chord, hear how it sounds, and follow along with beginner-friendly progressions.",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80",
    tags: ["Music", "Education"],
    link: { label: "Open Chordboard", url: "#" },
    authorName: "Priya Nair",
    authorUsername: "priyanair",
    authorInitials: "PN",
    authorColor: "#6BAF9E",
  },
];

export const ALL_TAGS = CATEGORIES;
