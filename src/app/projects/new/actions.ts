"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function addProject(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const projectTypes = formData.getAll("project_type") as string[];
  const category = formData.get("category") as string;
  const tags = [
    ...projectTypes,
    ...(category ? [category] : []),
  ];

  const project = {
    user_id:      user.id,
    title:        formData.get("title")       as string,
    description:  formData.get("description") as string,
    image_url:    formData.get("image_url")   as string,
    link_url:     formData.get("link_url")    as string,
    link_label:   formData.get("link_label")  as string,
    project_type: projectTypes,
    tags,
  };

  const { error } = await supabase.from("projects").insert(project);

  if (error) {
    redirect("/projects/new?error=" + encodeURIComponent(error.message));
  }

  // Redirect to profile to see the new project
  redirect("/profile");
}
