"use server";

import { createClient } from "@/lib/supabase/server";
import { validateUrl } from "@/lib/validate-url";
import { redirect } from "next/navigation";

export async function addProject(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const link_url  = formData.get("link_url")  as string;
  const image_url = formData.get("image_url") as string;

  const linkError  = validateUrl(link_url,  { required: true });
  const imageError = validateUrl(image_url, { required: false });

  if (linkError)  redirect("/projects/new?error=" + encodeURIComponent(linkError));
  if (imageError) redirect("/projects/new?error=" + encodeURIComponent(imageError));

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
    image_url:    image_url || null,
    link_url,
    link_label:   formData.get("link_label")  as string,
    project_type: projectTypes,
    tags,
  };

  const { error } = await supabase.from("projects").insert(project);

  if (error) {
    redirect("/projects/new?error=" + encodeURIComponent(error.message));
  }

  redirect("/profile");
}
