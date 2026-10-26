import { getServerSupabase, hasSupabaseConfig } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/stories";
import { AuthorDashboard } from "@/components/author/dashboard";
import { AuthorLogin } from "@/components/author/login";

export const dynamic = "force-dynamic";

export default async function AuthorPage() {
  if (!hasSupabaseConfig()) return <SetupScreen />;
  const supabase = await getServerSupabase();
  const { data: { user } } = await supabase!.auth.getUser();
  const { data: isAuthor } = user ? await supabase!.rpc("is_story_author") : { data: false };
  const settings = await getSiteSettings();
  return user && isAuthor
    ? <AuthorDashboard initialSettings={settings} email={user.email ?? ""} />
    : <AuthorLogin />;
}

function SetupScreen() {
  return <section className="author-shell page-wrap"><div className="author-card setup-card"><span className="author-mark">✳</span><div className="eyebrow"><span className="eyebrow-line" /> ONE-TIME SETUP</div><h1>Your writing desk<br /><em>is almost ready.</em></h1><p>Add your Supabase project URL and publishable key to <code>.env.local</code>, run the included SQL setup, and create your author account. The setup guide walks through each step.</p><a className="button button-dark" href="/setup">Open the setup guide <span>↗</span></a><p className="muted">No keys or passwords belong in the source code.</p></div></section>;
}
