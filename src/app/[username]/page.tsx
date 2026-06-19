import { createClient } from "@/lib/supabase/server";
import { type SocialLinks } from "@/lib/mock-data";
import { getProfileTheme } from "@/lib/profile-themes";
import { notFound } from "next/navigation";
import { ProjectTypeBadges, categoryTags } from "@/components/ui/project-type-badges";
import { ProfileThemeShell } from "@/components/ui/profile-theme-shell";
import { MapPin } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, bio, avatar_url")
    .eq("username", username)
    .single();

  const name = profile?.full_name || username;
  const description = profile?.bio || `Check out ${name}'s projects on Soulhause Builders.`;

  return {
    title: name,
    description,
    openGraph: {
      title: `${name} (@${username}) — Soulhause Builders`,
      description,
      url: `https://soulhausebuilders.com/${username}`,
      ...(profile?.avatar_url && {
        images: [{ url: profile.avatar_url, width: 256, height: 256, alt: name }],
      }),
    },
    twitter: {
      card: "summary",
      title: `${name} (@${username})`,
      description,
    },
  };
}

export default function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  return <ProfileContent params={params} />;
}

async function ProfileContent({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  const theme = getProfileTheme(profile.profile_theme);
  const name = profile.full_name || username;
  const initials = name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);

  const social: SocialLinks = {
    website:   profile.website   || undefined,
    github:    profile.github    || undefined,
    twitter:   profile.twitter   || undefined,
    linkedin:  profile.linkedin  || undefined,
    instagram: profile.instagram || undefined,
    youtube:   profile.youtube   || undefined,
  };

  return (
    <ProfileThemeShell themeKey={profile.profile_theme}>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 flex items-start gap-5">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full overflow-hidden text-2xl font-bold text-white"
            style={{ backgroundColor: theme.avatarFallback }}
          >
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <div className="flex-1">
            <h1
              className="profile-heading text-3xl"
              style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
            >
              {name}
            </h1>
            <p className="profile-muted text-sm">@{username}</p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              {profile.role && (
                <span className="profile-accent text-sm font-medium">{profile.role}</span>
              )}
              {profile.location && (
                <span className="profile-muted flex items-center gap-1 text-xs">
                  <MapPin size={11} /> {profile.location}
                </span>
              )}
            </div>

            {profile.bio && (
              <p className="profile-muted mt-3 max-w-xl text-sm">{profile.bio}</p>
            )}

            {profile.skills?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {profile.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="profile-tag rounded-full border px-2.5 py-0.5 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <SocialBar social={social} />
          </div>
        </div>

        {projects && projects.length > 0 ? (
          <>
            <h2 className="profile-heading mb-5 text-lg font-semibold">
              Projects · {projects.length}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {projects.map((project: {
                id: string;
                title: string;
                description: string;
                tags: string[];
                project_type: string[];
                link_url: string;
                link_label: string;
              }) => (
                <div
                  key={project.id}
                  className="profile-card flex flex-col gap-2 border p-5"
                >
                  <p className="profile-heading font-semibold">{project.title}</p>
                  <ProjectTypeBadges types={project.project_type} />
                  <p className="profile-muted text-sm leading-relaxed">{project.description}</p>
                  {categoryTags(project.tags).length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {categoryTags(project.tags).map((t: string) => (
                        <span
                          key={t}
                          className="profile-tag rounded-full px-2.5 py-0.5 text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.link_url && (
                    <a
                      href={project.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="profile-link mt-auto text-xs font-medium hover:underline"
                    >
                      {project.link_label || "View project"} ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="profile-muted text-sm">No projects posted yet.</p>
        )}
      </div>
    </ProfileThemeShell>
  );
}

function SocialIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    website:   "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2c1.07 0 2.37.65 3.47 2.37A13.5 13.5 0 0 1 16.9 10H7.1a13.5 13.5 0 0 1 1.43-3.63C9.63 4.65 10.93 4 12 4zm-5.87 6h11.74a13.7 13.7 0 0 1 0 4H6.13a13.7 13.7 0 0 1 0-4zM7.1 16h9.8c-.35.9-.79 1.72-1.43 2.37C14.37 19.35 13.07 20 12 20s-2.37-.65-3.47-2.63A10.3 10.3 0 0 1 7.1 16zm-3.04-2a8 8 0 0 1 0-4H2.1a9.9 9.9 0 0 0 0 4h1.96zm13.88-4h1.96a9.9 9.9 0 0 1 0 4h-1.96a13.7 13.7 0 0 0 0-4zM4.06 8H2.1a9.9 9.9 0 0 1 4.48-4.93A12.3 12.3 0 0 0 4.06 8zm13.88 0h1.96a9.9 9.9 0 0 0-4.48-4.93A12.3 12.3 0 0 1 17.94 8zM4.06 16H2.1a9.9 9.9 0 0 0 4.48 4.93A12.3 12.3 0 0 1 4.06 16zm13.88 0h1.96a9.9 9.9 0 0 1-4.48 4.93A12.3 12.3 0 0 0 17.94 16z",
    github:    "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z",
    twitter:   "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    linkedin:  "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z",
    instagram: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    youtube:   "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.52V8.48L15.82 12l-6.07 3.52z",
  };
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d={icons[type] ?? icons.website} />
    </svg>
  );
}

function SocialBar({ social }: { social: SocialLinks }) {
  const links: { key: string; href?: string; label: string }[] = [
    { key: "website",   href: social.website,                                                                    label: "Website"      },
    { key: "github",    href: social.github    ? `https://github.com/${social.github}`              : undefined, label: "GitHub"       },
    { key: "twitter",   href: social.twitter   ? `https://x.com/${social.twitter}`                 : undefined, label: "X / Twitter"  },
    { key: "linkedin",  href: social.linkedin  ? `https://linkedin.com/in/${social.linkedin}`      : undefined, label: "LinkedIn"     },
    { key: "instagram", href: social.instagram ? `https://instagram.com/${social.instagram}`       : undefined, label: "Instagram"    },
    { key: "youtube",   href: social.youtube   ? `https://youtube.com/@${social.youtube}`          : undefined, label: "YouTube"      },
  ].filter((l) => l.href);

  if (links.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.key}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className="profile-social flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
        >
          <SocialIcon type={l.key} />
          {l.label}
        </a>
      ))}
    </div>
  );
}
