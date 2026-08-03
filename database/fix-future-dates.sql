-- One-off repair: rows saved with a FUTURE date, plus the email_status constraint
-- needed by the weekly digest.
--
-- Background: the date pickers had no upper bound, so records could be saved with a
-- date ahead of today (e.g. filled on 8 Jul but stored as 8 Aug). Those rows fall
-- outside the weekly digest's look-back window, so the Saturday email reported
-- "no student activity" even though data had been entered. The app now blocks future
-- dates (see src/App.jsx), but rows already stored need correcting.
--
-- The true date is taken from created_at (when the row was actually written), read in
-- IST so the calendar day matches what the user saw.
--
-- Run this in Supabase -> SQL Editor. Steps 0 and 1 are safe to run on their own.

-- ---------------------------------------------------------------------------
-- STEP 0 (required): allow 'weekly' as an email_status.
-- The daily-report function marks rows 'weekly' (they go out in the Saturday
-- digest instead of a per-day email). Without this the upsert fails.
-- ---------------------------------------------------------------------------
alter table public.daily_reports
  drop constraint if exists daily_reports_email_status_check;

alter table public.daily_reports
  add constraint daily_reports_email_status_check
  check (email_status in ('pending', 'sent', 'failed', 'skipped', 'weekly'));

-- ---------------------------------------------------------------------------
-- STEP 1 (preview): what will change? Run this first and eyeball the result.
-- ---------------------------------------------------------------------------
select
  entry_id,
  student_name,
  report_date                                   as wrong_date,
  (created_at at time zone 'Asia/Kolkata')::date as corrected_date
from public.daily_reports
where report_date > (now() at time zone 'Asia/Kolkata')::date
order by report_date desc;

-- ---------------------------------------------------------------------------
-- STEP 2 (apply): fix daily_reports.
-- Updates the date, the entry_id (its trailing YYYY-MM-DD), and the copy of the
-- date inside the metrics JSON, so all three stay consistent.
-- ---------------------------------------------------------------------------
update public.daily_reports
set
  report_date = (created_at at time zone 'Asia/Kolkata')::date,
  entry_id = regexp_replace(
    entry_id,
    '\d{4}-\d{2}-\d{2}$',
    to_char((created_at at time zone 'Asia/Kolkata')::date, 'YYYY-MM-DD')
  ),
  metrics = jsonb_set(
    metrics,
    '{date}',
    to_jsonb(to_char((created_at at time zone 'Asia/Kolkata')::date, 'YYYY-MM-DD'))
  )
where report_date > (now() at time zone 'Asia/Kolkata')::date;

-- ---------------------------------------------------------------------------
-- STEP 3 (apply): fix the matching tracker entries.
-- Same idea for student_progress_entries: id, entry_date, and payload->date.
-- ---------------------------------------------------------------------------
update public.student_progress_entries
set
  entry_date = (created_at at time zone 'Asia/Kolkata')::date,
  id = regexp_replace(
    id,
    '\d{4}-\d{2}-\d{2}$',
    to_char((created_at at time zone 'Asia/Kolkata')::date, 'YYYY-MM-DD')
  ),
  payload = jsonb_set(
    payload,
    '{date}',
    to_jsonb(to_char((created_at at time zone 'Asia/Kolkata')::date, 'YYYY-MM-DD'))
  )
where entry_date > (now() at time zone 'Asia/Kolkata')::date;

-- ---------------------------------------------------------------------------
-- STEP 4 (verify): both should return no rows.
-- ---------------------------------------------------------------------------
select 'daily_reports' as table_name, entry_id, report_date
from public.daily_reports
where report_date > (now() at time zone 'Asia/Kolkata')::date
union all
select 'student_progress_entries', id, entry_date
from public.student_progress_entries
where entry_date > (now() at time zone 'Asia/Kolkata')::date;
