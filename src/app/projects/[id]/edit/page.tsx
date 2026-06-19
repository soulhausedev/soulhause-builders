import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/mock-data";
import { FormAlert } from "@/components/ui/form-alert";
import { updateProject } from "./actions";

const PROJECT_TYPE_OPTIONS = [
  { value: "Free", emoji: "🆓", label: "Free" },
  { value: "Paid", emoji: "💰", label: "Paid" },
  { value: "Open Source", emoji: "🔓", label: "Open Source" },
] as const;

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project || project.user_id !== user.id) notFound();

  const category =
    (project.tags as string[] | null)?.find((t) =>
      (CATEGORIES as readonly string[]).includes(t)
    ) ?? "";

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="mb-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">
          Your projects
        </p>
        <h1
          className="text-3xl"
          style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
        >
          <span className="text-teal-deep">Edit</span>{" "}
          <span className="text-orange">project</span>
        </h1>
      </div>

      {error && <FormAlert message={error} />}

      <form action={updateProject} className="flex flex-col gap-6">
        <input type="hidden" name="project_id" value={id} />
        <div className="rounded-xl border border-border bg-surface p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium text-teal-deep">
              Project name <span className="text-orange">*</span>
            </label>
            <input
              id="title"
              name="title"
              required
              type="text"
              defaultValue={project.title}
              className="h-9 rounded-lg border border-border bg-cream px-3 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-medium text-teal-deep">
              Description <span className="text-orange">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              defaultValue={project.description}
              className="rounded-lg border border-border bg-cream px-3 py-2 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-teal-deep">
              Type <span className="text-orange">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {PROJECT_TYPE_OPTIONS.map(({ value, emoji, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="project_type"
                    value={value}
                    defaultChecked={project.project_type?.includes(value)}
                    className="sr-only peer"
                  />
                  <span className="rounded-full border border-border bg-cream px-3 py-1 text-xs font-medium text-muted transition-colors peer-checked:border-teal peer-checked:bg-teal peer-checked:text-white group-hover:border-teal group-hover:text-teal">
                    {emoji} {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="category" className="text-sm font-medium text-teal-deep">
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={category}
              className="h-9 rounded-lg border border-border bg-cream px-3 text-sm text-teal-deep focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="link_url" className="text-sm font-medium text-teal-deep">
                Link <span className="text-orange">*</span>
              </label>
              <input
                id="link_url"
                name="link_url"
                required
                type="url"
                defaultValue={project.link_url ?? ""}
                className="h-9 rounded-lg border border-border bg-cream px-3 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="link_label" className="text-sm font-medium text-teal-deep">
                Link label
              </label>
              <input
                id="link_label"
                name="link_label"
                type="text"
                defaultValue={project.link_label ?? ""}
                className="h-9 rounded-lg border border-border bg-cream px-3 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="image_url" className="text-sm font-medium text-teal-deep">
              Cover image URL
            </label>
            <input
              id="image_url"
              name="image_url"
              type="url"
              defaultValue={project.image_url ?? ""}
              className="h-9 rounded-lg border border-border bg-cream px-3 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <a href="/profile" className="text-sm text-muted hover:text-teal">
            ← Back to profile
          </a>
          <button
            type="submit"
            className="rounded-lg bg-orange px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-terra"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
