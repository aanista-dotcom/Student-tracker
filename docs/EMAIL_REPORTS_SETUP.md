# Daily Report Emails — Setup Guide

When a **student submits** their daily tracker, the app automatically:
1. builds a performance summary + an **AI highlights** section (achievements / areas needing support / next steps),
2. **emails it to the Program Heads** (via Resend), and
3. **stores it** in a `daily_reports` table, shown in the dashboard's **Report History** card
   (visible to facilitators and program heads).

The code is done. This guide covers the **one-time setup** on Supabase, Resend, and Anthropic.
Some steps use the **Supabase CLI** — if that's unfamiliar, a tech teammate can do Steps 4–5 in
a few minutes. I can also walk you through it.

> Heads-up: report emails only start flowing once **Google sign-in is active** (see
> `docs/GOOGLE_LOGIN_SETUP.md`) **and** this function is deployed.

---

## What you'll need
- The Supabase project (`almhhzssdirqlmznsmkt`).
- A **Resend** account (free tier is fine to start): https://resend.com
- An **Anthropic API key** for the AI summary: https://console.anthropic.com
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

## Step 3 — Anthropic (AI summary)
1. Sign in at the Anthropic Console and create an **API key**.
2. Copy it (starts with `sk-ant-`). The app uses the low-cost **Claude Haiku** model by default.

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
supabase secrets set ANTHROPIC_API_KEY="sk-ant-xxx"
# optional: supabase secrets set REPORT_MODEL="claude-haiku-4-5"
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
- **Cost:** each student submission makes one AI call + one email. Claude Haiku keeps the AI
  cost tiny; Resend's free tier covers a few thousand emails/month. A daily-digest option can
  be added later if volume grows.
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
