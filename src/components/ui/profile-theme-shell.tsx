import { getProfileTheme, themeToCssVars, type ProfileThemeKey } from "@/lib/profile-themes";

export function ProfileThemeShell({
  themeKey,
  children,
}: {
  themeKey?: string | null;
  children: React.ReactNode;
}) {
  const theme = getProfileTheme(themeKey);

  return (
    <div
      className="profile-themed w-full transition-colors duration-200"
      style={themeToCssVars(theme)}
    >
      {children}
    </div>
  );
}

export function ProfileThemePreview({
  themeKey,
  selected,
  onSelect,
}: {
  themeKey: ProfileThemeKey;
  selected: boolean;
  onSelect: () => void;
}) {
  const theme = getProfileTheme(themeKey);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col gap-2 rounded-xl border-2 p-3 text-left transition-all hover:scale-[1.02] ${
        selected ? "border-teal ring-2 ring-teal/30" : "border-border hover:border-teal/50"
      }`}
      aria-pressed={selected}
      aria-label={`${theme.name} theme`}
    >
      <div
        className="h-14 w-full overflow-hidden border"
        style={{
          background: theme.background,
          borderColor: theme.border,
          borderRadius: theme.radius,
        }}
      >
        <div
          className="mx-2 mt-2 h-8 border"
          style={{
            background: theme.card,
            borderColor: theme.border,
            borderRadius: theme.radius,
          }}
        >
          <div
            className="ml-2 mt-2 h-1.5 w-8 rounded-full"
            style={{ background: theme.accent }}
          />
          <div
            className="ml-2 mt-1.5 h-1 w-12 rounded-full opacity-60"
            style={{ background: theme.textMuted }}
          />
        </div>
      </div>
      <span className="text-xs font-medium text-teal-deep">{theme.name}</span>
    </button>
  );
}
