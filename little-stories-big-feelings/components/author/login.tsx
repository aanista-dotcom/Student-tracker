"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, LoaderCircle } from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabase/browser";

export function AuthorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const supabase = getBrowserSupabase();
    if (!supabase) { setError("Supabase is not configured yet. Add your project details in .env.local."); setBusy(false); return; }
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (signInError) { setError("That email and password combination did not work."); setBusy(false); return; }
    const { data: allowed, error: checkError } = await supabase.rpc("is_story_author");
    if (checkError || !allowed) {
      await supabase.auth.signOut();
      setError("This account is not the site author. Ask the site owner to check the author setup.");
      setBusy(false);
      return;
    }
    router.refresh();
  }

  return <section className="author-shell page-wrap"><div className="author-card login-card"><span className="author-mark"><KeyRound size={19} /></span><div className="eyebrow"><span className="eyebrow-line" /> PRIVATE AUTHOR SPACE</div><h1>Come on <em>in.</em></h1><p>Your quiet desk for writing, saving, and sharing a new story.</p><form onSubmit={submit} className="author-form"><label>Email address<input autoComplete="username" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Password<input autoComplete="current-password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-dark button-full" disabled={busy}>{busy ? <><LoaderCircle className="spin" size={16} /> Checking your key…</> : <>Open my writing desk <span>↗</span></>}</button></form><p className="login-note">Private access for the author · Public sign-up is disabled in the setup guide.</p></div></section>;
}
