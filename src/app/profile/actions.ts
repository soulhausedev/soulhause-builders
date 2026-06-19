"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateUrl } from "@/lib/validate-url";
import { DEFAULT_PROFILE_THEME, isValidProfileThemeKey } from "@/lib/profile-themes";
import { revalidatePath } from "next/cache";
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

  redirect("/profile?saved=1");
}

function revalidatePublicLists() {
  revalidatePath("/");
  revalidatePath("/builders");
  revalidatePath("/directory");
  revalidatePath("/leaderboard");
}

export async function deleteProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const admin = createAdminClient();
  const db = admin ?? supabase;
  const userId = user.id;

  const { data: projects, error: projectsReadError } = await db
    .from("projects")
    .select("id")
    .eq("user_id", userId);

  if (projectsReadError) {
    redirect("/profile?error=" + encodeURIComponent(projectsReadError.message));
  }

  const projectIds = (projects ?? []).map((p) => p.id);

  if (projectIds.length > 0) {
    const { error: votesError } = await db.from("votes").delete().in("project_id", projectIds);
    if (votesError) {
      redirect("/profile?error=" + encodeURIComponent(votesError.message));
    }
  }

  const { error: userVotesError } = await db.from("votes").delete().eq("user_id", userId);
  if (userVotesError) {
    redirect("/profile?error=" + encodeURIComponent(userVotesError.message));
  }

  const { data: deletedProjects, error: projectsError } = await db
    .from("projects")
    .delete()
    .eq("user_id", userId)
    .select("id");

  if (projectsError) {
    redirect("/profile?error=" + encodeURIComponent(projectsError.message));
  }

  if (projectIds.length > 0 && !deletedProjects?.length && !admin) {
    redirect(
      "/profile?error=" +
        encodeURIComponent("Could not delete your projects. Check Supabase delete policies.")
    );
  }

  const { data: avatarFiles } = await db.storage.from("avatars").list(userId);
  if (avatarFiles?.length) {
    const { error: storageError } = await db.storage
      .from("avatars")
      .remove(avatarFiles.map((f) => `${userId}/${f.name}`));
    if (storageError) {
      redirect("/profile?error=" + encodeURIComponent(storageError.message));
    }
  }

  const { data: deletedProfile, error: profileError } = await db
    .from("profiles")
    .delete()
    .eq("id", userId)
    .select("id");

  if (profileError) {
    redirect("/profile?error=" + encodeURIComponent(profileError.message));
  }

  if (!deletedProfile?.length) {
    redirect(
      "/profile?error=" +
        encodeURIComponent(
          admin
            ? "Profile could not be deleted. It may already be removed."
            : "Could not delete your profile. Add SUPABASE_SERVICE_ROLE_KEY to Vercel or run scripts/profile-delete-policies.sql in Supabase."
        )
    );
  }

  if (admin) {
    const { error: authError } = await admin.auth.admin.deleteUser(userId);
    if (authError) {
      redirect("/profile?error=" + encodeURIComponent(authError.message));
    }
  }

  await supabase.auth.signOut();
  revalidatePublicLists();
  redirect("/");
}
