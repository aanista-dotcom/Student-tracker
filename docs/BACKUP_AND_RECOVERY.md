# Student Tracker Backup And Persistence Guide

This project started as a static browser app. Browser `localStorage` is useful for demos, but it is not enough for production student data because each browser has its own copy and a device reset can lose data.

## Recommended Architecture

Use this setup:

1. **Frontend:** current static React app on GitHub Pages, Netlify, or Vercel.
2. **Primary database:** Supabase Postgres.
3. **Browser cache:** localStorage remains as an offline fallback only.
4. **Backups:** encrypted daily and weekly logical dumps through GitHub Actions.
5. **Off-site storage:** GitHub encrypted artifacts for short retention, plus optional S3 or Cloudflare R2 bucket for longer retention.
6. **Restore:** decrypt `.sql.gpg`, restore with `psql`, then verify records in the app.

## Step 1: Create Supabase Database

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run `database/schema.sql`.
4. Copy your project URL and anon/publishable key.
5. Copy `config.example.js` to `config.js`.
6. Fill:

```js
window.APP_CONFIG = {
  persistenceMode: "supabase",
  supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY",
  supabaseTable: "student_progress_entries",
};
```

For local development, keep `persistenceMode: "local"` until the table is ready.

## Security Notes

- Never place `DATABASE_URL`, service role keys, or backup passphrases in frontend code.
- `supabaseAnonKey` is acceptable in the browser, but database access must be protected with Row Level Security.
- The included SQL has beginner MVP anon policies so your current static app can sync data quickly.
- For real private student data, replace the MVP policies with Supabase Auth policies for student/facilitator accounts before rollout.
- Keep backups encrypted before uploading them anywhere.
- Rotate `BACKUP_GPG_PASSPHRASE` if it is ever shared.

## Step 2: Add GitHub Secrets

In GitHub repo:

`Settings` → `Secrets and variables` → `Actions` → `New repository secret`

Required:

- `DATABASE_URL`
- `BACKUP_GPG_PASSPHRASE`

Optional off-site S3/R2:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_BACKUP_BUCKET`
- `AWS_BACKUP_PREFIX`

## Step 3: Automatic Backup Schedule

`.github/workflows/database-backup.yml` runs:

- daily at 00:15 IST
- weekly at 00:45 IST every Sunday
- manually from GitHub Actions tab

Each backup:

1. Runs `pg_dump`.
2. Encrypts the dump with GPG AES256.
3. Uploads the encrypted `.sql.gpg` and log file to GitHub Actions artifacts.
4. Optionally copies the encrypted dump to S3/R2.

If a backup fails, the workflow fails and keeps the log artifact.

## Step 4: Manual Local Backup

Install PostgreSQL client tools and GnuPG. Then run:

```powershell
$env:DATABASE_URL="postgresql://..."
$env:BACKUP_GPG_PASSPHRASE="long-random-passphrase"
powershell -ExecutionPolicy Bypass -File .\scripts\backup.ps1 -Kind manual
```

The encrypted backup appears in `backups/`.

## Step 5: Restore

Use a fresh empty database for practice first.

```powershell
$env:DATABASE_URL="postgresql://target-database..."
$env:BACKUP_GPG_PASSPHRASE="same-passphrase-used-for-backup"
powershell -ExecutionPolicy Bypass -File .\scripts\restore.ps1 -BackupFile ".\backups\student-tracker-daily-YYYYMMDD-HHMMSS.sql.gpg"
```

After restore:

1. Open Supabase table editor.
2. Check `student_progress_entries`.
3. Open the app.
4. Login as facilitator.
5. Confirm `All Student Progress` shows restored entries.

## Scaling Plan

This schema scales much better than localStorage:

- indexed by `student_name`, `school_name`, and `entry_date`
- stores full form data in `payload jsonb`
- supports future normalized tables if analytics become heavy
- supports monthly/yearly reports with SQL views later

When data grows:

1. Add Supabase Auth.
2. Add `student_id`, `facilitator_id`, and `school_id`.
3. Move repeated text fields to normalized tables.
4. Add materialized monthly summary views.
5. Keep JSON payload as an audit snapshot.

## Recovery Practice

Do one test restore every month. A backup is only useful if you know it can restore.
