"use server";

import { createClient } from "@/lib/supabase/server";
import { validateUrl } from "@/lib/validate-url";
import { redirect } from "next/navigation";

export async function updateProject(formData: FormData) {
  const projectId = formData.get("project_id") as string;
  if (!projectId) redirect("/profile?error=" + encodeURIComponent("Missing project ID."));

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: existing } = await supabase
    .from("projects")
    .select("user_id")
    .eq("id", projectId)
    .single();

  if (!existing || existing.user_id !== user.id) {
    redirect("/profile?error=" + encodeURIComponent("You can only edit your own projects."));
  }

  const link_url = formData.get("link_url") as string;
  const image_url = formData.get("image_url") as string;

  const linkError = validateUrl(link_url, { required: true });
  const imageError = validateUrl(image_url, { required: false });

  if (linkError) redirect(`/projects/${projectId}/edit?error=` + encodeURIComponent(linkError));
  if (imageError) redirect(`/projects/${projectId}/edit?error=` + encodeURIComponent(imageError));

  const projectTypes = formData.getAll("project_type") as string[];
  const category = formData.get("category") as string;
  const tags = [...projectTypes, ...(category ? [category] : [])];

  const { error } = await supabase
    .from("projects")
    .update({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image_url: image_url || null,
      link_url,
      link_label: formData.get("link_label") as string,
      project_type: projectTypes,
      tags,
    })
    .eq("id", projectId);

  if (error) {
    redirect(`/projects/${projectId}/edit?error=` + encodeURIComponent(error.message));
  }

  redirect("/profile");
}
