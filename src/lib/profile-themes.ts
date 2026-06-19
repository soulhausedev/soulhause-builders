import type { CSSProperties } from "react";

export type ProfileThemeCategory = "default" | "personality" | "interest" | "vibe";

export type ProfileTheme = {
  name: string;
  category: ProfileThemeCategory;
  background: string;
  card: string;
  text: string;
  textMuted: string;
  accent: string;
  accentSecondary: string;
  border: string;
  radius: string;
  avatarFallback: string;
  tagBg: string;
};

export const PROFILE_THEMES = {
  soulhause: {
    name: "Soulhause Builders",
    category: "default",
    background: "#F5F0E6",
    card: "#FEFCF8",
    text: "#2D5A50",
    textMuted: "#5A8A7A",
    accent: "#E8703A",
    accentSecondary: "#4F9080",
    border: "#DDD8CE",
    radius: "12px",
    avatarFallback: "#4F9080",
    tagBg: "#A8D4C8",
  },
  minimalist: {
    name: "Minimalist",
    category: "personality",
    background: "#FFFFFF",
    card: "#F7F7F7",
    text: "#111111",
    textMuted: "#666666",
    accent: "#111111",
    accentSecondary: "#444444",
    border: "#E5E5E5",
    radius: "8px",
    avatarFallback: "#333333",
    tagBg: "#EEEEEE",
  },
  bold: {
    name: "Bold",
    category: "personality",
    background: "#0A0A0A",
    card: "#1A1A1A",
    text: "#FFFFFF",
    textMuted: "#AAAAAA",
    accent: "#FF3366",
    accentSecondary: "#FFCC00",
    border: "#333333",
    radius: "4px",
    avatarFallback: "#FF3366",
    tagBg: "#2A2A2A",
  },
  calm: {
    name: "Calm",
    category: "personality",
    background: "#EEF2F0",
    card: "#F8FAF9",
    text: "#2C4A42",
    textMuted: "#6B8A82",
    accent: "#5B9A8B",
    accentSecondary: "#8BB8AB",
    border: "#C8D9D3",
    radius: "16px",
    avatarFallback: "#5B9A8B",
    tagBg: "#D4E8E2",
  },
  energetic: {
    name: "Energetic",
    category: "personality",
    background: "#FFF8E7",
    card: "#FFFBF0",
    text: "#3D2E00",
    textMuted: "#8A7040",
    accent: "#FF6B35",
    accentSecondary: "#F5C432",
    border: "#F0DCA0",
    radius: "14px",
    avatarFallback: "#FF6B35",
    tagBg: "#FFE4A0",
  },
  tech: {
    name: "Tech",
    category: "interest",
    background: "#0F172A",
    card: "#1E293B",
    text: "#E2E8F0",
    textMuted: "#94A3B8",
    accent: "#38BDF8",
    accentSecondary: "#818CF8",
    border: "#334155",
    radius: "10px",
    avatarFallback: "#38BDF8",
    tagBg: "#1E3A5F",
  },
  music: {
    name: "Music",
    category: "interest",
    background: "#1A0A2E",
    card: "#2D1B4E",
    text: "#F0E6FF",
    textMuted: "#B8A0D8",
    accent: "#FF6B9D",
    accentSecondary: "#C084FC",
    border: "#4A3070",
    radius: "20px",
    avatarFallback: "#FF6B9D",
    tagBg: "#3D2060",
  },
  art: {
    name: "Art",
    category: "interest",
    background: "#FAF6F0",
    card: "#FFF9F2",
    text: "#3D2B1F",
    textMuted: "#8A7060",
    accent: "#C45525",
    accentSecondary: "#6B8F71",
    border: "#E8D5C0",
    radius: "18px",
    avatarFallback: "#C45525",
    tagBg: "#EDE0D0",
  },
  gaming: {
    name: "Gaming",
    category: "interest",
    background: "#0D0D0D",
    card: "#1A1A1A",
    text: "#E0E0E0",
    textMuted: "#888888",
    accent: "#7C3AED",
    accentSecondary: "#A855F7",
    border: "#2A2A2A",
    radius: "10px",
    avatarFallback: "#7C3AED",
    tagBg: "#252525",
  },
  midnight: {
    name: "Midnight",
    category: "vibe",
    background: "#0B0F1A",
    card: "#141B2D",
    text: "#E8ECF4",
    textMuted: "#7A8499",
    accent: "#6B8CFF",
    accentSecondary: "#A8B8E8",
    border: "#252D42",
    radius: "14px",
    avatarFallback: "#6B8CFF",
    tagBg: "#1C2438",
  },
  glow: {
    name: "Day Glow",
    category: "vibe",
    background: "#080C10",
    card: "#0F161C",
    text: "#D8FFF0",
    textMuted: "#5A8A78",
    accent: "#39FF14",
    accentSecondary: "#00FFD5",
    border: "#1A3D32",
    radius: "12px",
    avatarFallback: "#39FF14",
    tagBg: "#142820",
  },
  aurora: {
    name: "Aurora",
    category: "vibe",
    background: "#0A1218",
    card: "#101E28",
    text: "#E0F8FF",
    textMuted: "#6A9AAA",
    accent: "#00E5CC",
    accentSecondary: "#B388FF",
    border: "#1A3540",
    radius: "16px",
    avatarFallback: "#00E5CC",
    tagBg: "#152830",
  },
  neon: {
    name: "Neon",
    category: "vibe",
    background: "#0A0612",
    card: "#140A1E",
    text: "#F5E8FF",
    textMuted: "#9A78B8",
    accent: "#FF2E97",
    accentSecondary: "#00F0FF",
    border: "#2A1840",
    radius: "10px",
    avatarFallback: "#FF2E97",
    tagBg: "#1E1030",
  },
  dusk: {
    name: "Dusk",
    category: "vibe",
    background: "#15101F",
    card: "#1E1828",
    text: "#F0E8F8",
    textMuted: "#9A88AA",
    accent: "#FF8C69",
    accentSecondary: "#9B7EDE",
    border: "#2E2640",
    radius: "18px",
    avatarFallback: "#FF8C69",
    tagBg: "#261E34",
  },
} as const satisfies Record<string, ProfileTheme>;

export type ProfileThemeKey = keyof typeof PROFILE_THEMES;

export const DEFAULT_PROFILE_THEME: ProfileThemeKey = "soulhause";

export const PROFILE_THEME_KEYS = Object.keys(PROFILE_THEMES) as ProfileThemeKey[];

const CATEGORY_LABELS: Record<ProfileThemeCategory, string> = {
  default: "Default",
  personality: "Personality",
  interest: "Interests",
  vibe: "Vibe",
};

export function getProfileTheme(key?: string | null): ProfileTheme {
  if (key && key in PROFILE_THEMES) {
    return PROFILE_THEMES[key as ProfileThemeKey];
  }
  return PROFILE_THEMES[DEFAULT_PROFILE_THEME];
}

export function isValidProfileThemeKey(key: string): key is ProfileThemeKey {
  return key in PROFILE_THEMES;
}

export function themeToCssVars(theme: ProfileTheme): CSSProperties {
  return {
    "--pt-bg": theme.background,
    "--pt-card": theme.card,
    "--pt-text": theme.text,
    "--pt-text-muted": theme.textMuted,
    "--pt-accent": theme.accent,
    "--pt-accent-secondary": theme.accentSecondary,
    "--pt-border": theme.border,
    "--pt-radius": theme.radius,
    "--pt-avatar": theme.avatarFallback,
    "--pt-tag-bg": theme.tagBg,
    "--pt-cream": "#F5F0E6",
  } as CSSProperties;
}

export function themesByCategory(): { category: ProfileThemeCategory; label: string; keys: ProfileThemeKey[] }[] {
  const groups = new Map<ProfileThemeCategory, ProfileThemeKey[]>();

  for (const key of PROFILE_THEME_KEYS) {
    const category = PROFILE_THEMES[key].category;
    const list = groups.get(category) ?? [];
    list.push(key);
    groups.set(category, list);
  }

  const order: ProfileThemeCategory[] = ["default", "personality", "interest", "vibe"];
  return order
    .filter((c) => groups.has(c))
    .map((category) => ({
      category,
      label: CATEGORY_LABELS[category],
      keys: groups.get(category)!,
    }));
}
