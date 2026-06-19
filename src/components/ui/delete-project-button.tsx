"use client";

import { deleteProject } from "@/app/projects/[id]/edit/actions";

export function DeleteProjectButton({
  projectId,
  projectTitle,
  variant = "link",
}: {
  projectId: string;
  projectTitle: string;
  variant?: "link" | "button";
}) {
  const className =
    variant === "button"
      ? "rounded-lg border border-orange/30 px-4 py-2.5 text-sm font-medium text-orange transition-colors hover:bg-orange/10"
      : "text-xs text-muted hover:text-orange";

  return (
    <form
      action={deleteProject}
      onSubmit={(e) => {
        if (
          !confirm(
            `Delete "${projectTitle}"? This removes the project and its votes. This can't be undone.`
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="project_id" value={projectId} />
      <button type="submit" className={className}>
        Delete
      </button>
    </form>
  );
}
