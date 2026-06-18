# Session Context — Student Progress Tracker

> Paste this at the start of a new session to resume where we left off.

---

## Project Overview

**What it is:** A Student Progress Tracker for NavGurukul (navgurukul.org). Students fill a daily tracker form; facilitators review and add feedback; program heads receive automated email reports.

**Tech stack:**
- Single-file React 18 app (no build step) — CDN React + Babel 7 standalone
- Served by `server.cjs` on port 4173
- Supabase Postgres (cloud DB): `https://almhhzssdirqlmznsmkt.supabase.co`
- Supabase Auth (Google OAuth) — configured but not yet activated
- Supabase Edge Functions (Deno) for backend report handler
- Resend API for email delivery
- Anthropic API (claude-haiku-4-5) for AI summaries

**Key files:**
- `src/App.jsx` — entire frontend (~3000+ lines)
- `config.js` — runtime config (Supabase URL, keys, domain)
- `config.example.js` — template for new setups
- `index.html` — CDN script tags, Tailwind config
- `database/schema.sql` — main progress entries table + RLS
- `database/reports-schema.sql` — NEW: daily_reports table + RLS
- `supabase/functions/daily-report/index.ts` — NEW: Edge Function
- `docs/GOOGLE_LOGIN_SETUP.md` — step-by-step Google OAuth guide
- `docs/EMAIL_REPORTS_SETUP.md` — step-by-step email reports guide

---

## What Was Built This Session (all local, NOT yet committed to git)

### 1. Google Sign-In (replaces typed-name login)
- `LoginScreen` rewritten — shows a "Continue with Google" button (Google glyph SVG), no name/role form
- Auth backed by Supabase Auth (Google OAuth provider)
- Domain restriction: only `@navgurukul.org` accounts can sign in
- Role detection via email heuristic: digit before `@` = student (e.g. `aanistamalik22@navgurukul.org`), no digit = facilitator (e.g. `aanista@navgurukul.org`)
- `config.js` has `facilitatorEmails: []` and `studentEmails: []` for rare exceptions
- Auth state managed via `useState(null)` + `useEffect` subscribing to `supabase.auth.onAuthStateChange`
- Loading spinner shown while session is being checked (`authLoading` state)
- `database/schema.sql` updated: replaced anon RLS policies with `authenticated`-only policies

### 2. Email Reports Feature
- When a **student** saves their tracker, `sendDailyReport()` is called (fire-and-forget, never blocks the save)
- Calls Supabase Edge Function `daily-report` with a `buildReportPayload()` object
- Edge Function: calls Anthropic API for AI summary → sends HTML email via Resend → upserts row in `daily_reports`
- Fallback: if AI call fails, a `templatedSummary()` rule-based summary is used — email always sends
- No duplicate emails: keyed on `entry_id` (studentName-date); re-saves update the record, don't re-email
- When a **facilitator** saves, also calls Edge Function in `mode: "facilitator"` to update stored report without re-sending email
- `ReportHistoryPanel` component added to the analytics dashboard, visible to facilitators only (gated by `isFacilitator`)
- `reports` state loaded via `useEffect` on auth, calls `loadReports()` → `supabase.from("daily_reports").select("*")`

### 3. Critical Bug Fix (Babel blank screen)
- Babel CDN `"latest"` silently switched to Babel 8 which uses automatic JSX runtime → injects ES `import` → non-module script blanks the page
- Fix: pinned to `@babel/standalone@7` in `index.html`
- Comment left in HTML explaining why (important — do not remove this pin)

---

## Key Code Added to src/App.jsx

### Auth helper functions (after `getAppConfig`):
```javascript
function getAllowedDomain() { ... }         // returns "navgurukul.org"
function isAllowedEmail(email) { ... }      // checks @navgurukul.org
function detectRoleFromEmail(email) { ... } // digit heuristic + config overrides
function authFromSupabaseUser(user) { ... } // maps Supabase user → app auth object
```

### State:
```javascript
const [auth, setAuth] = useState(null);
const [authLoading, setAuthLoading] = useState(true);
const [authError, setAuthError] = useState("");
const [reports, setReports] = useState([]);
```

### Auth useEffect: subscribes to `supabase.auth.onAuthStateChange`, validates domain, sets auth state.

### Reports useEffect: loads `daily_reports` for facilitators when auth is set.

### `signInWithGoogle()`: calls `supabase.auth.signInWithOAuth({ provider: "google", options: { hd: "navgurukul.org" } })`

### `logout()`: calls `supabase.auth.signOut()`, clears state.

### Report functions:
- `loadReports()` — fetches from `daily_reports` table
- `buildReportPayload(entry, role)` — builds the full payload using existing scoring functions
- `sendDailyReport(entry, role, studentEmail)` — fire-and-forget Edge Function invoke

### Render gate (before auth check):
```javascript
if (authLoading) { return <LoadingSpinner />; }
if (!auth) { return <LoginScreen onSignIn={signInWithGoogle} error={authError} />; }
```

---

## config.js (current values)
```javascript
window.APP_CONFIG = {
  persistenceMode: "supabase",
  supabaseUrl: "https://almhhzssdirqlmznsmkt.supabase.co",
  supabaseAnonKey: "sb_publishable_rB1-oNZGgEeSYlBPZXopkQ_Vm0qj3NB",
  supabaseTable: "student_progress_entries",
  allowedEmailDomain: "navgurukul.org",
  facilitatorEmails: [],
  studentEmails: [],
  programHeadEmails: [],
};
```

---

## What Still Needs To Be Done (in order)

### Step 1 — Commit the code to git (nothing committed yet)
All changes from this session are local only. Commit before doing any setup.

### Step 2 — Google Login Setup (was paused mid-Stage 1)
Follow `docs/GOOGLE_LOGIN_SETUP.md`. Key steps:
1. Google Cloud Console → create project → OAuth consent screen (Internal, navgurukul.org)
2. Create OAuth Web Client ID
3. Add redirect URI: `https://almhhzssdirqlmznsmkt.supabase.co/auth/v1/callback`
4. Copy Client ID + Secret → paste into Supabase Dashboard → Auth → Providers → Google
5. In Supabase → Auth → URL Configuration, add site URL + redirect URL
6. Run `database/schema.sql` in Supabase SQL Editor (updates RLS to authenticated-only)

### Step 3 — Email Reports Setup
Follow `docs/EMAIL_REPORTS_SETUP.md`. Key steps:
1. Run `database/reports-schema.sql` in Supabase SQL Editor
2. Create Resend account → get API key (`re_...`)
3. Get Anthropic API key (`sk-ant-...`)
4. **Need from user: Program Head email addresses** (goes into `PROGRAM_HEAD_EMAILS` secret)
5. Deploy Edge Function: `supabase functions deploy daily-report`
6. Set 4 secrets: `RESEND_API_KEY`, `RESEND_FROM`, `PROGRAM_HEAD_EMAILS`, `ANTHROPIC_API_KEY`

---

## Security Rules (must be preserved)
- `RESEND_API_KEY`, `RESEND_FROM`, `PROGRAM_HEAD_EMAILS`, `ANTHROPIC_API_KEY` → server-side Edge Function secrets ONLY, never in browser
- `supabaseAnonKey` (`sb_publishable_...`) is safe in browser — it's a publishable key
- Program Head emails kept as server secret so they can't be tampered with from the browser
- Never commit `.env` files or real credentials to git

---

## Product Decisions (confirmed with user, don't revisit)
- Send trigger: right when student submits (not a digest)
- Facilitator fields shown as "Pending" at email time — that's correct behavior
- One email per student submission (re-saves update record, no second email)
- Report history visible to: Program Heads + Facilitators (NOT students)
- Role detection: digit in local part of email = student, no digit = facilitator

---

## User Profile
- Organization: NavGurukul (`navgurukul.org`)
- Non-technical — prefers plain English explanations
- Wants clarification on product decisions, but tech decisions can be made independently
- Email: `people@navgurukul.org`

---

## Supabase Project
- Project ref: `almhhzssdirqlmznsmkt`
- URL: `https://almhhzssdirqlmznsmkt.supabase.co`
- Anon key: `sb_publishable_rB1-oNZGgEeSYlBPZXopkQ_Vm0qj3NB`
