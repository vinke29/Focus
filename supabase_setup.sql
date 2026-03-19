-- ── FOCUS · 集中 — Supabase Setup ────────────────────────────────────────────
-- Run this entire file in the Supabase SQL editor.
--
-- RECOMMENDED: In Supabase Dashboard → Authentication → Settings,
-- disable "Enable email confirmations" for frictionless sign-up.
-- ─────────────────────────────────────────────────────────────────────────────

-- PROFILES (display name, linked to auth.users)
create table if not exists public.profiles (
  id         uuid primary key references auth.users on delete cascade,
  name       text not null,
  email      text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_insert" on public.profiles
  for insert with check (auth.uid() = id);
create policy "profiles_update" on public.profiles
  for update using (auth.uid() = id);


-- COLLECTION (hatched creatures)
create table if not exists public.collection (
  id         bigserial primary key,
  user_id    uuid not null references auth.users on delete cascade,
  char_id    text not null,
  variant    text not null default 'standard',
  hatched_at timestamptz not null default now()
);

alter table public.collection enable row level security;

create policy "collection_select" on public.collection
  for select using (auth.uid() = user_id);
create policy "collection_insert" on public.collection
  for insert with check (auth.uid() = user_id);
create policy "collection_delete" on public.collection
  for delete using (auth.uid() = user_id);

-- Index for fast per-user queries
create index if not exists collection_user_id_idx on public.collection(user_id);


-- SESSIONS (completed focus sessions)
create table if not exists public.sessions (
  id           bigserial primary key,
  user_id      uuid not null references auth.users on delete cascade,
  duration     int not null,   -- minutes
  completed_at timestamptz not null default now()
);

alter table public.sessions enable row level security;

create policy "sessions_select" on public.sessions
  for select using (auth.uid() = user_id);
create policy "sessions_insert" on public.sessions
  for insert with check (auth.uid() = user_id);

create index if not exists sessions_user_id_idx on public.sessions(user_id);
