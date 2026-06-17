"use server";

import { createClient } from "@/lib/supabase/server";
import { validateUrl } from "@/lib/validate-url";
import { redirect } from "next/navigation";

export async function saveProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const website = formData.get("website") as string;
  const websiteError = validateUrl(website, { required: false });
  if (websiteError) redirect("/profile?error=" + encodeURIComponent(websiteError));

  const skills = formData.getAll("skills") as string[];

  const avatar_url = (formData.get("avatar_url") as string) || null;

  const updates = {
    id:         user.id,
    full_name:  formData.get("full_name")  as string,
    username:   formData.get("username")   as string,
    location:   formData.get("location")   as string,
    role:       formData.get("role")       as string,
    bio:        formData.get("bio")        as string,
    skills,
    website:    website || null,
    github:     formData.get("github")     as string,
    twitter:    formData.get("twitter")    as string,
    linkedin:   formData.get("linkedin")   as string,
    instagram:  formData.get("instagram")  as string,
    youtube:    formData.get("youtube")    as string,
    avatar_url,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("profiles").upsert(updates);

  if (error) {
    redirect("/profile?error=" + encodeURIComponent(error.message));
  }

  const username = updates.username;
  if (username) {
    redirect(`/p/${username}`);
  }

  redirect("/profile");
}
