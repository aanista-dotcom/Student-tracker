# Little Stories, Big Feelings — setup guide

This is a Next.js 16, TypeScript, Tailwind CSS, Supabase app. The public site can be previewed with its clearly labeled sample story before Supabase is connected. Writing, saving, and publishing require your own Supabase project and author account.

## 1. Create the Supabase project and the author account

1. Create a Supabase project and keep the project URL and **publishable key** handy. The legacy `anon` key also works. Do not use the `service_role` or secret key in this app.
2. In Supabase **Authentication → Providers / Settings**, disable public sign-ups. Then create one email/password user for yourself in **Authentication → Users**. Set a strong password and keep its UUID for the next step.
3. Open **SQL Editor**, paste and run [`supabase/schema.sql`](supabase/schema.sql).
4. In SQL Editor, add your user's UUID to the private owner list:

   ```sql
   insert into private.story_author (owner_id)
   values ('PASTE-YOUR-AUTH-USER-UUID-HERE');
   ```

   This single UUID is the authority for all author access. Other signed-in accounts can read published stories but cannot read drafts, manage settings, upload covers, or publish.

The schema inserts a labeled **Sample story** so the public pages have something to read. You can edit or delete it in your dashboard after signing in.

## 2. Run the website locally

Use Node.js 20.9 or newer. From this folder, copy `.env.example` to `.env.local` and fill in:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-or-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Then install and run:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The author desk is at `/author`.

## 3. Publish online

1. Push this repository to GitHub and import it in Vercel. Set the Vercel **Root Directory** to `little-stories-big-feelings`.
2. Add the same three environment variables in the Vercel project settings. Set `NEXT_PUBLIC_SITE_URL` to your final HTTPS domain, for example `https://stories.example.com`.
3. In Supabase **Authentication → URL Configuration**, set the production Site URL and add both `http://localhost:3000/**` and your production domain as allowed redirect URLs.
4. Deploy from Vercel and open `/author` on the new domain to sign in.

The sample story and the app code contain no secret keys. This app never uses a service-role key. Supabase's publishable/anon key is designed for browser use and is constrained by the database and Storage RLS policies in `supabase/schema.sql`.

## Writing and scheduling

- **Save draft** and the editor's autosave keep private working copies in `story_drafts`.
- **Publish story** copies that working version to `stories`. Public pages can query that table, which never contains drafts.
- **Unpublish** moves a published story back into the private drafts table. **Delete** removes its database row and cover files.
- Set **Publish on** to a future local date and time to schedule. The story is written to the public table with a future timestamp, while both the public RLS policy and page queries hide it until that time. No cron job is needed; it appears when the next page request runs after the scheduled time.
- Cover images are stored in a private bucket. A stable app image route serves only a file currently referenced by a published story.

## Verification

Run `pnpm typecheck`, `pnpm lint`, and `pnpm test` for the local source checks. The Supabase policy checks are in `supabase/tests/rls.test.sql`; run them against a local Supabase stack with `supabase test db`. A real end-to-end publish/login test needs your Supabase project, its Auth user, and credentials configured in `.env.local`.
