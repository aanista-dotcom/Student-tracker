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

-- Beginner-friendly MVP policy.
-- This lets the current static app write through the public anon key.
-- For private student data, replace this with Supabase Auth + authenticated-only policies.
alter table public.student_progress_entries enable row level security;

drop policy if exists "mvp_anon_can_read_progress" on public.student_progress_entries;
create policy "mvp_anon_can_read_progress"
on public.student_progress_entries
for select
to anon
using (true);

drop policy if exists "mvp_anon_can_insert_progress" on public.student_progress_entries;
create policy "mvp_anon_can_insert_progress"
on public.student_progress_entries
for insert
to anon
with check (true);

drop policy if exists "mvp_anon_can_update_progress" on public.student_progress_entries;
create policy "mvp_anon_can_update_progress"
on public.student_progress_entries
for update
to anon
using (true)
with check (true);

-- backup_runs is admin-only. Do not expose this table through the browser.
alter table public.backup_runs enable row level security;
