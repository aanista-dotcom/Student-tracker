# Google Sign-In Setup Guide

The app now uses **Sign in with Google**, limited to **@navgurukul.org** accounts. The
code is already done. This guide covers the **one-time setup** that must happen on
Google's and Supabase's websites. You'll need access to:

- A **Google account that can use Google Cloud Console** (ideally a navgurukul.org admin).
- The **Supabase project** for this app (`almhhzssdirqlmznsmkt`).

It takes about 15–20 minutes. Do the steps in order.

---

## How roles work (no list to maintain)

The app decides student vs facilitator **from the email address**:

| Email looks like | Role | Why |
|---|---|---|
| `aanistamalik22@navgurukul.org` (has a number) | **Student** | The number is the join year |
| `aanista@navgurukul.org` (no number) | **Facilitator** | Staff emails have no number |

For rare exceptions, you can list specific emails in `config.js` under
`facilitatorEmails` or `studentEmails`.

---

## Step 1 — Create Google sign-in credentials (Google Cloud Console)

1. Go to **https://console.cloud.google.com** and sign in (use a navgurukul.org admin account if you have one).
2. At the top, create a project (e.g. "Student Progress Tracker") or pick an existing one.
3. In the search bar, go to **APIs & Services → OAuth consent screen**.
   - **User Type:** choose **Internal** if it's offered. *(Internal automatically restricts sign-in to navgurukul.org accounts — this is the strongest protection.)* If only **External** is available, that's okay; the app still blocks non-navgurukul.org emails.
   - Fill in the app name (e.g. "Student Progress Tracker") and your support email. Save.
4. Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
   - **Application type:** **Web application**.
   - **Name:** anything, e.g. "Tracker Web".
   - Under **Authorized redirect URIs**, click **Add URI** and paste exactly:
     ```
     https://almhhzssdirqlmznsmkt.supabase.co/auth/v1/callback
     ```
   - Click **Create**.
5. A box shows your **Client ID** and **Client secret**. **Copy both** (keep them private — treat the secret like a password).

---

## Step 2 — Turn on Google in Supabase

1. Go to **https://supabase.com/dashboard** and open this app's project.
2. Left sidebar: **Authentication → Providers → Google**.
3. Turn Google **ON**, then paste the **Client ID** and **Client secret** from Step 1.
4. Click **Save**.

---

## Step 3 — Tell Supabase where the app lives

1. Still in Supabase: **Authentication → URL Configuration**.
2. **Site URL:** set this to where the app runs:
   - For testing on your computer: `http://127.0.0.1:4173` (this is the address `npm start` prints).
   - For the live/published site: its real address (e.g. your GitHub Pages / Netlify URL).
3. Under **Redirect URLs**, add the same address(es). For local testing add **both**
   `http://127.0.0.1:4173` and `http://localhost:4173` (they count as different addresses).
   You can add more than one line (e.g. both local and live URLs). Save.

---

## Step 4 — Lock down the database

This closes the current hole where anyone with the link could read or write data. After
this, **only signed-in navgurukul.org users** can.

1. In Supabase: **SQL Editor → New query**.
2. Paste and **Run** this:

```sql
alter table public.student_progress_entries enable row level security;

drop policy if exists "mvp_anon_can_read_progress"   on public.student_progress_entries;
drop policy if exists "mvp_anon_can_insert_progress" on public.student_progress_entries;
drop policy if exists "mvp_anon_can_update_progress" on public.student_progress_entries;

drop policy if exists "authed_can_read"   on public.student_progress_entries;
create policy "authed_can_read"   on public.student_progress_entries for select to authenticated using (true);

drop policy if exists "authed_can_insert" on public.student_progress_entries;
create policy "authed_can_insert" on public.student_progress_entries for insert to authenticated with check (true);

drop policy if exists "authed_can_update" on public.student_progress_entries;
create policy "authed_can_update" on public.student_progress_entries for update to authenticated using (true) with check (true);
```

*(This is the same as the policy block in `database/schema.sql`.)*

---

## Step 5 — Test it

1. Open the app.
2. Click **Continue with Google** → pick a navgurukul.org account → you should land in the app, signed in.
3. Check roles:
   - Sign in with a **facilitator** email (no number) → you should see **all students**.
   - Sign in with a **student** email (with a number) → you should see **only your own** progress.
4. Save a daily entry, then open Supabase **Table Editor → student_progress_entries** to confirm the row is there.
5. Click **Logout** → you should return to the sign-in screen.

If a non-navgurukul.org account tries to sign in, the app shows a message and refuses.

---

## Troubleshooting

- **"redirect_uri_mismatch" from Google:** the redirect URI in Step 1.4 doesn't match. It must be exactly `https://almhhzssdirqlmznsmkt.supabase.co/auth/v1/callback`.
- **Signs in but bounces back to login:** check the **Site URL / Redirect URLs** in Step 3 match the address you're actually using.
- **"Unsupported provider" / nothing happens:** Google isn't enabled in Step 2, or the Client ID/secret weren't saved.
- **Can read/write without signing in:** you haven't run Step 4 yet.

---

## Recommended follow-up (not done yet)

Right now the rules make data **org-members-only**, and the student-vs-facilitator split
is enforced in the app's screens. A determined student could still read other rows by
calling the database directly. To truly lock each student to **only their own rows**:

1. Add a `user_id uuid` column to `student_progress_entries` (references `auth.users`).
2. Save `user_id` on each row from the signed-in user.
3. Change the read/update policies to compare `user_id` with `auth.uid()` (facilitators keep full read access via their own policy).

Tell the developer "do the per-student row lockdown" when you're ready for this.
