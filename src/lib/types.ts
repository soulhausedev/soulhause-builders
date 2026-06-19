export type DbProject = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tags: string[];
  project_type: string[];
  link_url: string;
  link_label: string | null;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
};

export type DbBuilder = {
  id: string;
  username: string;
  full_name: string | null;
  role: string | null;
  bio: string | null;
  location: string | null;
  skills: string[];
  avatar_url: string | null;
  profile_theme?: string | null;
};
