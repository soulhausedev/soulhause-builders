-- Run in Supabase SQL Editor
alter table profiles
  add column if not exists profile_theme text not null default 'soulhause';
