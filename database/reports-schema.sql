-- Daily report storage for the email-reporting feature.
-- Run this in the Supabase SQL Editor (after database/schema.sql).
--
-- One row per student per day (keyed on entry_id). The "daily-report" Edge Function
-- writes these rows with the service role (which bypasses RLS). The browser app only
-- READS them, and only for facilitators / program heads (see the policy below).

create table if not exists public.daily_reports (
  id uuid primary key default gen_random_uuid(),
  entry_id text not null unique,           -- same id as student_progress_entries (studentName-date)
  student_name text not null default '',
  student_email text,
  school_name text,
  report_date date not null,
  attendance text,
  overall_score integer not null default 0,
  category_scores jsonb not null default '{}'::jsonb,   -- { practicals, english, theory, wellness }
  metrics jsonb not null default '{}'::jsonb,           -- the field values used to render the email
  ai_summary jsonb not null default '{}'::jsonb,        -- { achievements[], areas_needing_support[], next_steps[] }
  facilitator_complete boolean not null default false,  -- was facilitator rating/feedback present when stored
  recipients text[] not null default '{}',
  email_status text not null default 'pending' check (email_status in ('pending', 'sent', 'failed', 'skipped')),
  email_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_daily_reports_report_date on public.daily_reports (report_date desc);
create index if not exists idx_daily_reports_student on public.daily_reports (lower(student_name));
create index if not exists idx_daily_reports_school_date on public.daily_reports (school_name, report_date desc);

-- Keep updated_at fresh (reuses the helper created in database/schema.sql).
drop trigger if exists set_daily_reports_updated_at on public.daily_reports;
create trigger set_daily_reports_updated_at
before update on public.daily_reports
for each row execute function public.set_updated_at();

alter table public.daily_reports enable row level security;

-- Reads: only signed-in users whose email has NO digit before the "@" — i.e. facilitators
-- and program heads (students' emails contain their join-year number, so they are blocked
-- at the database). This mirrors the app's role rule.
-- Writes are performed only by the Edge Function using the service role, which bypasses RLS,
-- so there is intentionally no insert/update/delete policy for normal users.
drop policy if exists "reports_readable_by_staff" on public.daily_reports;
create policy "reports_readable_by_staff"
on public.daily_reports
for select
to authenticated
using (
  position('@' in coalesce(auth.jwt() ->> 'email', '')) > 0
  and split_part(auth.jwt() ->> 'email', '@', 1) !~ '[0-9]'
);

-- NOTE (future hardening): for true per-student isolation, add a roles table (email -> role)
-- and key this policy to it instead of the digit heuristic.
