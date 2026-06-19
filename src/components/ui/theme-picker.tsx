"use client";

import { useState } from "react";
import {
  DEFAULT_PROFILE_THEME,
  isValidProfileThemeKey,
  themesByCategory,
  type ProfileThemeKey,
} from "@/lib/profile-themes";
import { ProfileThemePreview } from "@/components/ui/profile-theme-shell";

export function ThemePicker({ defaultTheme }: { defaultTheme?: string | null }) {
  const initial = defaultTheme && isValidProfileThemeKey(defaultTheme)
    ? defaultTheme
    : DEFAULT_PROFILE_THEME;

  const [selected, setSelected] = useState<ProfileThemeKey>(initial);
  const groups = themesByCategory();

  return (
    <div className="flex flex-col gap-4">
      <input type="hidden" name="profile_theme" value={selected} />

      {groups.map(({ category, label, keys }) => (
        <div key={category}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
            {label}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {keys.map((key) => (
              <ProfileThemePreview
                key={key}
                themeKey={key}
                selected={selected === key}
                onSelect={() => setSelected(key)}
              />
            ))}
          </div>
        </div>
      ))}

      <p className="text-xs text-muted">
        Your theme appears on your public profile. The rest of Soulhause Builders stays the same.
      </p>
    </div>
  );
}
