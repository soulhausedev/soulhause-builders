"use client";

import { useState } from "react";
import {
  DEFAULT_PROFILE_THEME,
  getProfileTheme,
  isValidProfileThemeKey,
  themesByCategory,
  type ProfileThemeKey,
} from "@/lib/profile-themes";
import { ProfileThemePreview, ProfileThemeShell } from "@/components/ui/profile-theme-shell";

type PreviewProfile = {
  name: string;
  username?: string | null;
  role?: string | null;
};

export function ThemePicker({
  defaultTheme,
  preview,
}: {
  defaultTheme?: string | null;
  preview?: PreviewProfile;
}) {
  const initial =
    defaultTheme && isValidProfileThemeKey(defaultTheme)
      ? defaultTheme
      : DEFAULT_PROFILE_THEME;

  const [selected, setSelected] = useState<ProfileThemeKey>(initial);
  const groups = themesByCategory();
  const theme = getProfileTheme(selected);

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

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
          Preview · {theme.name}
        </p>
        <ProfileThemeShell themeKey={selected}>
          <div className="profile-card overflow-hidden border">
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: theme.avatarFallback }}
                >
                  {(preview?.name ?? "You").slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="profile-heading truncate text-lg font-bold"
                    style={{ fontFamily: "var(--font-retro)" }}
                  >
                    {preview?.name ?? "Your name"}
                  </p>
                  {preview?.username && (
                    <p className="profile-muted text-xs">@{preview.username}</p>
                  )}
                  {preview?.role && (
                    <p className="profile-accent mt-1 text-xs font-medium">{preview.role}</p>
                  )}
                </div>
              </div>
              <div className="profile-card mt-4 border p-3">
                <p className="profile-heading text-sm font-semibold">Sample project</p>
                <p className="profile-muted mt-1 text-xs">
                  This is how your public profile will look.
                </p>
              </div>
            </div>
          </div>
        </ProfileThemeShell>
      </div>

      <p className="text-xs text-muted">
        Your theme appears on your public profile after you save. The rest of Soulhause Builders
        stays the same.
      </p>
    </div>
  );
}
