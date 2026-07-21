# Report Emails — Setup Guide

When a **student submits** their daily tracker, the app automatically:
1. builds a performance summary + an **AI highlights** section (achievements / areas needing support / next steps), and
2. **stores it** in a `daily_reports` table, shown in the dashboard's **Report History** card
   (visible to facilitators and program heads).

**Program Heads are emailed once a week, not every day.** A scheduled `weekly-report`
function rolls up the whole week per student, groups them by batch, and sends **one combined
digest** email (default: **Saturday 18:00 IST**). See [Step 7](#step-7--weekly-digest-email) below.

The code is done. This guide covers the **one-time setup** on Supabase, Resend, and Inception (Mercury).
Some steps use the **Supabase CLI** — if that's unfamiliar, a tech teammate can do Steps 4–5 in
a few minutes. I can also walk you through it.

> Heads-up: report emails only start flowing once **Google sign-in is active** (see
> `docs/GOOGLE_LOGIN_SETUP.md`) **and** this function is deployed.

---

## What you'll need
- The Supabase project (`almhhzssdirqlmznsmkt`).
- A **Resend** account (free tier is fine to start): https://resend.com
- An **Inception (Mercury) API key** for the AI summary: https://platform.inceptionlabs.ai
  (new accounts get 10 million free tokens). This is **optional** — without it, the email still
  sends with a built-in rule-based summary.
- The **Program Head email address(es)** that should receive reports.

---

## Step 1 — Create the reports table
In Supabase → **SQL Editor → New query**, paste the contents of
[`database/reports-schema.sql`](../database/reports-schema.sql) and **Run**.
This creates `daily_reports` and its security rules (only facilitators/program heads can read it).

## Step 2 — Resend (email)
1. Create a Resend account.
2. **Sending address:**
   - *Quick test:* you can send from `onboarding@resend.dev`, but Resend only delivers test
     emails to **your own** account email. Good for a first check.
   - *Real use:* add and **verify your domain** (e.g. `navgurukul.org`) in Resend, then send
     from something like `reports@navgurukul.org`. (Domain verification may need IT to add DNS records.)
3. Copy your **Resend API key** (starts with `re_`).

## Step 3 — Inception / Mercury (AI summary) — optional
1. Sign in at https://platform.inceptionlabs.ai → **API Keys** → create a key.
2. Copy it. New accounts include **10 million free tokens**; the app uses the **mercury-2** model by default.
3. Skip this step entirely if you don't want AI wording — the email still sends a built-in summary.

## Step 4 — Deploy the Edge Function
The function lives at [`supabase/functions/daily-report/`](../supabase/functions/daily-report/).

**Option A — Supabase CLI (recommended):**
```bash
# install once: https://supabase.com/docs/guides/cli
supabase login
supabase link --project-ref almhhzssdirqlmznsmkt
supabase functions deploy daily-report
```

**Option B — Dashboard:** Supabase → **Edge Functions → Create function**, name it
`daily-report`, and paste the contents of `supabase/functions/daily-report/index.ts`.

## Step 5 — Set the function secrets
CLI:
```bash
supabase secrets set RESEND_API_KEY="re_xxx"
supabase secrets set RESEND_FROM="Student Tracker <reports@navgurukul.org>"
supabase secrets set PROGRAM_HEAD_EMAILS="head1@navgurukul.org,head2@navgurukul.org"
# optional AI wording (skip for the free built-in summary):
supabase secrets set INCEPTION_API_KEY="your-inception-key"
# optional: supabase secrets set REPORT_MODEL="mercury-2"
```
Or set the same keys in the dashboard under **Edge Functions → daily-report → Secrets**.
(`SUPABASE_URL` and the service role key are provided automatically — don't set those.)

---

## Step 7 — Weekly digest email
Program Heads receive **one combined weekly digest** (not per-day emails). This is a second
Edge Function, `weekly-report`, run on a schedule.

**a) Deploy the function**
```bash
supabase functions deploy weekly-report
```
Or in the dashboard: **Edge Functions → Create function**, name it `weekly-report`, and paste
the contents of `supabase/functions/weekly-report/index.ts`. It reuses the same secrets
(`RESEND_API_KEY`, `RESEND_FROM`, `PROGRAM_HEAD_EMAILS`, and optional `INCEPTION_API_KEY`).

**b) (Recommended) add a shared secret** so only the scheduler can trigger it:
```bash
supabase secrets set CRON_SECRET="pick-a-long-random-string"
```

**c) Schedule it — Saturday 18:00 IST (= 12:30 UTC).**
In Supabase → **SQL Editor**, run this once (enables the scheduler and books the weekly run):
```sql
create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'weekly-progress-digest',
  '30 12 * * 6',   -- 12:30 UTC every Saturday = 18:00 IST
  $$
  select net.http_post(
    url     := 'https://almhhzssdirqlmznsmkt.supabase.co/functions/v1/weekly-report',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'x-cron-secret', 'pick-a-long-random-string'   -- must match CRON_SECRET above
    ),
    body    := '{}'::jsonb
  );
  $$
);
```
To change the time later, re-run `cron.schedule` with the same job name and a new cron
expression. To stop it: `select cron.unschedule('weekly-progress-digest');`

**d) Test without waiting for Saturday** — invoke it manually once:
```bash
curl -X POST 'https://almhhzssdirqlmznsmkt.supabase.co/functions/v1/weekly-report' \
  -H 'x-cron-secret: pick-a-long-random-string'
```
You should get a JSON response like `{"ok":true,"sent":true,"students":N,...}` and the digest
should arrive in the Program Head inbox.

---

## Step 8 — Sanity check the flow
1. Sign in as a **student** (email with a number) and submit a tracker.
2. In Supabase **Table Editor → daily_reports**, confirm a new row (`email_status = weekly`).
   No email is sent at this point — that's expected now.
3. Sign in as a **facilitator** → the dashboard's **Report History** card shows the stored report.
4. Trigger the weekly digest (Step 7d) → confirm the combined email lands in the Program Head inbox.

---

## Good to know
- **One email a week:** students' daily submissions are stored all week; the Saturday digest
  rolls them up per student, grouped by batch. No per-day inbox noise.
- **Cost:** each student submission makes one AI call (for the dashboard summary); the weekly
  digest makes at most one more AI call for the overview. Mercury's 10M free tokens last a long
  time. Resend's free tier easily covers one digest a week.
- **If the AI call fails**, everything still works with a built-in rule-based summary.

## Troubleshooting
- **Weekly digest didn't arrive:** run Step 7d manually and read the JSON/`Logs`; confirm
  `RESEND_API_KEY`, `RESEND_FROM`, `PROGRAM_HEAD_EMAILS` are set and the domain is verified in
  Resend (with `onboarding@resend.dev` you can only receive at your own Resend account email).
- **Function logs:** Supabase → Edge Functions → `weekly-report` (or `daily-report`) → **Logs**.
- **Cron didn't fire:** check `select * from cron.job;` and `select * from cron.job_run_details order by start_time desc limit 5;`.
- **Report History empty for a facilitator:** confirm Step 1 ran and the user's email has no
  digit before the `@` (the read rule treats digit-emails as students).
