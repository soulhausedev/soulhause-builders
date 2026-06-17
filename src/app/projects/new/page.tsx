import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CATEGORIES } from "@/lib/mock-data";
import { addProject } from "./actions";

export default async function NewProjectPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="mb-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">
          Share your work
        </p>
        <h1
          className="text-3xl"
          style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
        >
          <span className="text-teal-deep">Add a</span>{" "}
          <span className="text-orange">project</span>
        </h1>
        <p className="mt-1 text-sm text-muted">
          Free to list. Your app can be free, paid, or open source.
        </p>
      </div>

      <form action={addProject} className="flex flex-col gap-6">
        <div className="rounded-xl border border-border bg-surface p-6 flex flex-col gap-5">

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium text-teal-deep">
              Project name <span className="text-orange">*</span>
            </label>
            <input
              id="title"
              name="title"
              required
              type="text"
              placeholder="e.g. Focusblock"
              className="h-9 rounded-lg border border-border bg-cream px-3 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-medium text-teal-deep">
              Description <span className="text-orange">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              placeholder="What does it do? Who is it for?"
              className="rounded-lg border border-border bg-cream px-3 py-2 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal resize-none"
            />
          </div>

          {/* Project type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-teal-deep">
              Type <span className="text-orange">*</span>
            </label>
            <p className="text-xs text-muted -mt-1">Pick all that apply.</p>
            <div className="flex flex-wrap gap-2">
              {([
                { value: "Free",        emoji: "🆓", label: "Free"        },
                { value: "Paid",        emoji: "💰", label: "Paid"        },
                { value: "Open Source", emoji: "🔓", label: "Open Source" },
              ]).map(({ value, emoji, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="project_type"
                    value={value}
                    className="sr-only peer"
                  />
                  <span className="rounded-full border border-border bg-cream px-3 py-1 text-xs font-medium text-muted transition-colors peer-checked:border-teal peer-checked:bg-teal peer-checked:text-white group-hover:border-teal group-hover:text-teal">
                    {emoji} {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="category" className="text-sm font-medium text-teal-deep">Category</label>
            <select
              id="category"
              name="category"
              className="h-9 rounded-lg border border-border bg-cream px-3 text-sm text-teal-deep focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Link */}
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
                placeholder="https://yourproject.com"
                className="h-9 rounded-lg border border-border bg-cream px-3 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="link_label" className="text-sm font-medium text-teal-deep">Link label</label>
              <input
                id="link_label"
                name="link_label"
                type="text"
                placeholder="e.g. View on GitHub"
                className="h-9 rounded-lg border border-border bg-cream px-3 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
          </div>

          {/* Cover image URL */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="image_url" className="text-sm font-medium text-teal-deep">Cover image URL</label>
            <input
              id="image_url"
              name="image_url"
              type="url"
              placeholder="https://…"
              className="h-9 rounded-lg border border-border bg-cream px-3 text-sm text-teal-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal"
            />
            <p className="text-xs text-muted">Paste a public image URL (Unsplash, Imgur, etc.)</p>
          </div>

        </div>

        <div className="flex items-center justify-between">
          <a href="/profile" className="text-sm text-muted hover:text-teal">← Back to profile</a>
          <button
            type="submit"
            className="rounded-lg bg-orange px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-terra"
          >
            Post project
          </button>
        </div>
      </form>
    </div>
  );
}
