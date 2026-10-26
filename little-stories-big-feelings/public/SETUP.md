LITTLE STORIES, BIG FEELINGS — ONLINE SETUP

1. Create a Supabase project and one email/password user under Authentication → Users. Disable public sign-ups.
2. Run supabase/schema.sql in the Supabase SQL Editor. Add your user's UUID:

   insert into private.story_author (owner_id) values ('YOUR-AUTH-USER-UUID');

3. Copy .env.example to .env.local and fill in:

   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-or-anon-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

4. Run pnpm install, then pnpm dev. Open http://localhost:3000; sign in at /author.
5. Deploy on Vercel with the project root set to little-stories-big-feelings. Add the same variables and set NEXT_PUBLIC_SITE_URL to your HTTPS domain.
6. In Supabase Authentication → URL Configuration, set the production Site URL and allow http://localhost:3000/** and your production domain.

The app uses no service-role key. Draft text is in the owner-only story_drafts table. Public pages read only the published stories table. Scheduling is enforced by database RLS timestamps, so a scheduled story appears after its time on the next page request.

See SETUP.md in the project folder for full details, commands, and verification steps.
