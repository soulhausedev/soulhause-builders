"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateUrl } from "@/lib/validate-url";
import { DEFAULT_PROFILE_THEME, isValidProfileThemeKey } from "@/lib/profile-themes";
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

  const themeRaw = formData.get("profile_theme") as string;
  const profile_theme = isValidProfileThemeKey(themeRaw) ? themeRaw : DEFAULT_PROFILE_THEME;

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
    profile_theme,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("profiles").upsert(updates);

  if (error) {
    redirect("/profile?error=" + encodeURIComponent(error.message));
  }

  const username = updates.username;
  if (username) {
    redirect(`/${username}`);
  }

  redirect("/profile");
}

export async function deleteProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: projects } = await supabase
    .from("projects")
    .select("id")
    .eq("user_id", user.id);

  const projectIds = (projects ?? []).map((p) => p.id);

  if (projectIds.length > 0) {
    await supabase.from("votes").delete().in("project_id", projectIds);
  }

  await supabase.from("votes").delete().eq("user_id", user.id);
  await supabase.from("projects").delete().eq("user_id", user.id);

  const { data: avatarFiles } = await supabase.storage.from("avatars").list(user.id);
  if (avatarFiles?.length) {
    await supabase.storage
      .from("avatars")
      .remove(avatarFiles.map((f) => `${user.id}/${f.name}`));
  }

  const { error: profileError } = await supabase.from("profiles").delete().eq("id", user.id);

  if (profileError) {
    redirect("/profile?error=" + encodeURIComponent(profileError.message));
  }

  const admin = createAdminClient();
  if (admin) {
    await admin.auth.admin.deleteUser(user.id);
  }

  await supabase.auth.signOut();
  redirect("/");
}
