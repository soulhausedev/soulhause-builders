"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleVote(projectId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // Check if vote already exists
  const { data: existing } = await supabase
    .from("votes")
    .select("id")
    .eq("user_id", user.id)
    .eq("project_id", projectId)
    .single();

  if (existing) {
    await supabase.from("votes").delete().eq("id", existing.id);
  } else {
    await supabase.from("votes").insert({ user_id: user.id, project_id: projectId });
  }

  revalidatePath("/leaderboard");
}
