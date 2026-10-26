import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = { title: "Connect your writing desk" };

export default function SetupPage() {
  return <section className="page-wrap interior-page setup-guide-page"><Link className="back-link" href="/author"><ArrowLeft size={15} /> Author sign in</Link><div className="eyebrow"><span className="eyebrow-line" /> CONNECT YOUR WRITING DESK</div><h1>Just a few <em>little steps.</em></h1><div className="setup-steps">
    <article><span>01</span><div><h2>Create your Supabase project</h2><p>Create a project and one email/password user for yourself in Authentication → Users. Turn off public sign-ups. Keep your UUID and project URL.</p></div></article>
    <article><span>02</span><div><h2>Run the included database setup</h2><p>Open Supabase SQL Editor and run <code>supabase/schema.sql</code>. Then add your Auth user UUID:</p><pre><code>insert into private.story_author (owner_id)<br />values (&apos;YOUR-AUTH-USER-UUID&apos;);</code></pre></div></article>
    <article><span>03</span><div><h2>Add your local project details</h2><p>Copy <code>.env.example</code> to <code>.env.local</code>, then fill in your project URL and publishable (or anon) key. These are the only Supabase values this site uses; never add a service-role key.</p></div></article>
    <article><span>04</span><div><h2>Run it, then publish it</h2><p>From the app folder, run <code>pnpm install</code> and <code>pnpm dev</code>. For Vercel, set the project root to <code>little-stories-big-feelings</code> and add the same environment variables.</p></div></article>
  </div><a className="button button-dark" href="/SETUP.md">Full setup and deployment guide <ExternalLink size={15} /></a></section>;
}
