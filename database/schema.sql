-- Student Tracker production persistence schema for Supabase/Postgres.
-- Run this in Supabase SQL Editor before setting config.js to persistenceMode: "supabase".

create table if not exists public.student_progress_entries (
  id text primary key,
  student_name text not null,
  facilitator_name text,
  school_name text,
  entry_date date not null,
  last_updated_by text not null default 'unknown',
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_student_progress_student_name
  on public.student_progress_entries (lower(student_name));

create index if not exists idx_student_progress_school_date
  on public.student_progress_entries (school_name, entry_date desc);

create index if not exists idx_student_progress_entry_date
  on public.student_progress_entries (entry_date desc);

create index if not exists idx_student_progress_payload
  on public.student_progress_entries using gin (payload);

create table if not exists public.backup_runs (
  id bigserial primary key,
  backup_name text not null,
  backup_kind text not null check (backup_kind in ('daily', 'weekly', 'manual')),
  status text not null check (status in ('started', 'success', 'failed')),
  storage_location text,
  error_message text,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_student_progress_updated_at on public.student_progress_entries;
create trigger set_student_progress_updated_at
before update on public.student_progress_entries
for each row execute function public.set_updated_at();

-- Google sign-in (Supabase Auth) is required. Only authenticated users (your
-- navgurukul.org accounts) may read or write. This replaces the earlier open
-- "anon" policies that allowed anyone with the link to read/write.
alter table public.student_progress_entries enable row level security;

-- Remove the old open-to-anyone policies if they still exist.
drop policy if exists "mvp_anon_can_read_progress" on public.student_progress_entries;
drop policy if exists "mvp_anon_can_insert_progress" on public.student_progress_entries;
drop policy if exists "mvp_anon_can_update_progress" on public.student_progress_entries;

drop policy if exists "authed_can_read" on public.student_progress_entries;
create policy "authed_can_read"
on public.student_progress_entries
for select
to authenticated
using (true);

drop policy if exists "authed_can_insert" on public.student_progress_entries;
create policy "authed_can_insert"
on public.student_progress_entries
for insert
to authenticated
with check (true);

drop policy if exists "authed_can_update" on public.student_progress_entries;
create policy "authed_can_update"
on public.student_progress_entries
for update
to authenticated
using (true)
with check (true);

-- NOTE: This makes data "org-members-only". To lock each student to ONLY their own
-- rows, add a user_id column referencing auth.users and key these policies to
-- auth.uid(). See docs/GOOGLE_LOGIN_SETUP.md (follow-up section).

-- backup_runs is admin-only. Do not expose this table through the browser.
alter table public.backup_runs enable row level security;
