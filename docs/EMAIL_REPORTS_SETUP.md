# Daily Report Emails — Setup Guide

When a **student submits** their daily tracker, the app automatically:
1. builds a performance summary + an **AI highlights** section (achievements / areas needing support / next steps),
2. **emails it to the Program Heads** (via Resend), and
3. **stores it** in a `daily_reports` table, shown in the dashboard's **Report History** card
   (visible to facilitators and program heads).

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

## Step 6 — Test it
1. Make sure Google sign-in is working (`docs/GOOGLE_LOGIN_SETUP.md`).
2. Sign in as a **student** (email with a number, e.g. `name22@navgurukul.org`) and submit a daily tracker.
3. Check a **Program Head inbox** — the report email should arrive.
4. In Supabase **Table Editor → daily_reports**, confirm a new row (with `email_status = sent`).
5. Sign in as a **facilitator** (no-number email) → the dashboard's **Report History** card shows the report.
6. The email marks facilitator rating/feedback as **Pending**; once a facilitator saves that
   day's feedback, the stored report updates to include it (no second email is sent).

---

## Good to know
- **Cost:** each student submission makes one AI call + one email. Mercury's 10M free tokens
  cover a long time of daily use (and it's very cheap after); Resend's free tier covers a few
  thousand emails/month. A daily-digest option can be added later if volume grows.
- **Re-saves don't spam:** the report is keyed to the student's day, so editing a submission
  updates the stored report without sending another email.
- **If the AI call fails**, the email still sends with a simple rule-based summary.

## Troubleshooting
- **No email arrived:** check `daily_reports.email_status`/`email_error` for that row; confirm
  `RESEND_API_KEY`, `RESEND_FROM`, and `PROGRAM_HEAD_EMAILS` are set; with `onboarding@resend.dev`
  you can only receive at your own Resend account email.
- **Function logs:** Supabase → Edge Functions → `daily-report` → **Logs**.
- **Report History empty for a facilitator:** confirm Step 1 ran and the user's email has no
  digit before the `@` (the read rule treats digit-emails as students).
