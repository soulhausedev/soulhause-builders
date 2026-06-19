import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROLES } from "@/lib/mock-data";
import { saveProfile } from "./actions";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { FormAlert } from "@/components/ui/form-alert";
import { ProjectTypeBadges, categoryTags } from "@/components/ui/project-type-badges";
import { SkillsPicker } from "@/components/ui/skills-picker";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch this user's projects from Supabase
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const initials = (profile?.full_name ?? user.email ?? "?")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const displayName = profile?.full_name || user.email || "Builder";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 space-y-10 sm:space-y-12">

      {error && <FormAlert message={error} />}

      {/* ── Profile summary card ── */}
      <section className="rounded-2xl border border-border bg-surface p-4 sm:p-6 flex items-start gap-4 sm:gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full overflow-hidden text-2xl font-bold text-white bg-teal">
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={displayName}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h1
            className="text-2xl leading-tight"
            style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
          >
            <span className="text-teal-deep">{displayName}</span>
          </h1>
          {profile?.username && (
            <p className="text-sm text-muted mt-0.5">
              @{profile.username} ·{" "}
              <Link href={`/${profile.username}`} className="text-teal hover:underline">
                view public profile →
              </Link>
            </p>
          )}
          {profile?.role && (
            <p className="mt-1 text-sm font-medium text-orange">{profile.role}</p>
          )}
          {profile?.bio && (
            <p className="mt-2 text-sm text-muted leading-relaxed">{profile.bio}</p>
          )}
          {profile?.location && (
            <p className="mt-1 text-xs text-muted">{profile.location}</p>
          )}
          {profile?.skills?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {profile.skills.map((s: string) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-cream px-2.5 py-0.5 text-xs font-medium text-teal-deep"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
        {profile?.full_name && (
          <div className="text-xs text-muted text-right shrink-0 hidden sm:block">
            {profile.full_name}
          </div>
        )}
      </section>

      {/* ── My Projects ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-xl"
            style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
          >
            <span className="text-teal-deep">My</span>{" "}
            <span className="text-orange">projects</span>
          </h2>
          <Link
            href="/projects/new"
            className="rounded-lg bg-orange px-4 py-2 text-sm font-medium text-white hover:bg-terra transition-colors"
          >
            + Add project
          </Link>
        </div>

        {!projects || projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center">
            <p className="text-2xl mb-2">📦</p>
            <p className="text-sm font-medium text-teal-deep">No projects yet</p>
            <p className="text-xs text-muted mt-1">
              Add your first project — it takes 30 seconds.
            </p>
            <Link
              href="/projects/new"
              className="mt-4 inline-block rounded-lg bg-teal px-5 py-2 text-sm font-medium text-white hover:bg-teal-dark transition-colors"
            >
              Add a project
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
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
                className="rounded-xl border border-border bg-surface p-4 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-teal-deep leading-snug">{project.title}</p>
                  <Link
                    href={`/projects/${project.id}/edit`}
                    className="text-xs text-muted hover:text-teal shrink-0"
                  >
                    Edit
                  </Link>
                </div>
                <ProjectTypeBadges types={project.project_type} />
                <p className="text-xs text-muted line-clamp-2">{project.description}</p>
                {categoryTags(project.tags).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {categoryTags(project.tags).map((t: string) => (
                      <span key={t} className="rounded-full bg-teal-pale px-2 py-0.5 text-xs text-teal-deep">
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
                    className="mt-auto text-xs text-teal hover:underline"
                  >
                    {project.link_label || project.link_url} ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Edit profile form ── */}
      <section>
        <div className="mb-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">
            Settings
          </p>
          <h2
            className="text-xl"
            style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
          >
            <span className="text-teal-deep">Edit</span>{" "}
            <span className="text-orange">profile</span>
          </h2>
        </div>

        <form action={saveProfile} className="flex flex-col gap-6">
          {/* Basic info */}
          <div className="rounded-xl border border-border bg-surface p-6">
            {/* Avatar */}
            <div className="mb-6 flex flex-col items-center gap-1">
              <AvatarUpload
                userId={user.id}
                currentUrl={profile?.avatar_url ?? null}
                initials={initials}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="full_name" defaultValue={profile?.full_name ?? ""} placeholder="Maya Chen" />
              <Field label="Username" name="username" defaultValue={profile?.username ?? ""} placeholder="mayachen" />
              <Field label="Location" name="location" defaultValue={profile?.location ?? ""} placeholder="San Francisco, CA" />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-teal-deep">Role</label>
                <select
                  name="role"
                  defaultValue={profile?.role ?? ""}
                  className="h-9 rounded-lg border border-border bg-cream px-3 text-sm text-teal-deep focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <option value="">Select a role…</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-teal-deep">Bio</label>
              <textarea
                name="bio"
                defaultValue={profile?.bio ?? ""}
                placeholder="A short bio about what you build…"
                rows={3}
                className="rounded-lg border border-border bg-cream px-3 py-2 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal resize-none"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-teal-deep">Skills</label>
              <SkillsPicker defaultSelected={profile?.skills ?? []} />
            </div>
          </div>

          {/* Social links */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <p className="mb-4 text-sm font-semibold text-teal-deep">Social links</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Website" name="website" type="url" defaultValue={profile?.website ?? ""} placeholder="https://yoursite.com" />
              <Field label="GitHub username" name="github" defaultValue={profile?.github ?? ""} placeholder="yourusername" />
              <Field label="X / Twitter handle" name="twitter" defaultValue={profile?.twitter ?? ""} placeholder="yourusername" />
              <Field label="LinkedIn username" name="linkedin" defaultValue={profile?.linkedin ?? ""} placeholder="yourusername" />
              <Field label="Instagram handle" name="instagram" defaultValue={profile?.instagram ?? ""} placeholder="yourusername" />
              <Field label="YouTube handle" name="youtube" defaultValue={profile?.youtube ?? ""} placeholder="yourusername" />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-teal px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-dark"
            >
              Save profile
            </button>
          </div>
        </form>
      </section>

    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-teal-deep">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-9 rounded-lg border border-border bg-cream px-3 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal"
      />
    </div>
  );
}
