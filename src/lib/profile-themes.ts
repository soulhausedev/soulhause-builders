import type { CSSProperties } from "react";

export type ProfileThemeCategory = "default" | "personality" | "interest" | "culture";

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
  baltimore: {
    name: "Baltimore",
    category: "culture",
    background: "#2A1A4A",
    card: "#3B275C",
    text: "#F2E9FF",
    textMuted: "#B8A0D0",
    accent: "#FFB400",
    accentSecondary: "#FF6B35",
    border: "#5A4080",
    radius: "16px",
    avatarFallback: "#FFB400",
    tagBg: "#4A3570",
  },
  dmv: {
    name: "DMV",
    category: "culture",
    background: "#F5EEF0",
    card: "#FDF8F9",
    text: "#3D1F2E",
    textMuted: "#8A6070",
    accent: "#E8437A",
    accentSecondary: "#6B2D5B",
    border: "#E8C8D4",
    radius: "14px",
    avatarFallback: "#E8437A",
    tagBg: "#F0D8E0",
  },
  hiphop: {
    name: "Hip-Hop",
    category: "culture",
    background: "#0C0C0C",
    card: "#1C1C1C",
    text: "#F5F0E0",
    textMuted: "#A09080",
    accent: "#FFD700",
    accentSecondary: "#CC2200",
    border: "#3A3A3A",
    radius: "6px",
    avatarFallback: "#FFD700",
    tagBg: "#2A2A2A",
  },
} as const satisfies Record<string, ProfileTheme>;

export type ProfileThemeKey = keyof typeof PROFILE_THEMES;

export const DEFAULT_PROFILE_THEME: ProfileThemeKey = "soulhause";

export const PROFILE_THEME_KEYS = Object.keys(PROFILE_THEMES) as ProfileThemeKey[];

const CATEGORY_LABELS: Record<ProfileThemeCategory, string> = {
  default: "Default",
  personality: "Personality",
  interest: "Interests",
  culture: "Culture",
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

  const order: ProfileThemeCategory[] = ["default", "personality", "interest", "culture"];
  return order
    .filter((c) => groups.has(c))
    .map((category) => ({
      category,
      label: CATEGORY_LABELS[category],
      keys: groups.get(category)!,
    }));
}
