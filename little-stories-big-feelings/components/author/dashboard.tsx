"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Check, ChevronRight, CircleHelp, Clock3, ExternalLink, FilePenLine, LogOut, Plus, Settings2, Sparkles } from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabase/browser";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/types";
import type { StoryContent, StoryDraft } from "@/lib/types";
import { StoryEditor } from "@/components/author/story-editor";

export type EditableStory = Omit<StoryDraft, "cover_url"> & {
  published: boolean;
  published_at: string | null;
  is_draft_revision: boolean;
};

export function AuthorDashboard({ initialSettings, email }: { initialSettings: SiteSettings; email: string }) {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [stories, setStories] = useState<EditableStory[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [loadError, setLoadError] = useState("");
  const [now, setNow] = useState(0);
  const supabase = getBrowserSupabase();

  const refresh = useCallback(async () => {
    if (!supabase) { setLoadError("Supabase is not configured in this browser."); setLoading(false); return; }
    setLoadError("");
    const [publicResult, draftResult, settingsResult] = await Promise.all([
      supabase.from("stories").select("id,slug,title,excerpt,content,category,tags,cover_path,story_date,published_at,is_sample,updated_at").order("story_date", { ascending: false }),
      supabase.from("story_drafts").select("id,slug,title,excerpt,content,category,tags,cover_path,story_date,publication_at,is_sample,updated_at").order("updated_at", { ascending: false }),
      supabase.from("site_settings").select("*").eq("id", "main").maybeSingle(),
    ]);
    if (publicResult.error || draftResult.error) {
      setLoadError("I couldn't load the archive. Check the database setup and author access policy.");
      setLoading(false);
      return;
    }
    const published = (publicResult.data ?? []) as Array<Record<string, unknown>>;
    const byId = new Map(published.map((story) => [String(story.id), story]));
    const drafts = (draftResult.data ?? []) as Array<Record<string, unknown>>;
    const draftIds = new Set(drafts.map((draft) => String(draft.id)));
    const merged: EditableStory[] = [
      ...drafts.map((draft) => {
        const live = byId.get(String(draft.id));
        return {
          ...draft,
          publication_at: (draft.publication_at as string | null) ?? (live?.published_at as string | null) ?? null,
          published: Boolean(live),
          published_at: (live?.published_at as string | null) ?? null,
          updated_at: String(draft.updated_at ?? new Date().toISOString()),
          is_draft_revision: Boolean(live),
        } as EditableStory;
      }),
      ...published.filter((story) => !draftIds.has(String(story.id))).map((story) => ({
        ...story,
        publication_at: null,
        published: true,
        published_at: String(story.published_at),
        updated_at: String(story.updated_at ?? story.published_at),
        is_draft_revision: false,
      } as EditableStory)),
    ];
    merged.sort((a, b) => b.story_date.localeCompare(a.story_date) || b.updated_at.localeCompare(a.updated_at));
    setStories(merged);
    if (settingsResult.data) setSettings({ ...DEFAULT_SETTINGS, ...settingsResult.data } as SiteSettings);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void refresh(); }, 0);
    return () => window.clearTimeout(timer);
  }, [refresh]);
  useEffect(() => {
    const timer = window.setTimeout(() => setNow(Date.now()), 0);
    const interval = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => { window.clearTimeout(timer); window.clearInterval(interval); };
  }, []);

  const selected = useMemo(() => stories.find((story) => story.id === selectedId) ?? null, [stories, selectedId]);
  const storyCount = stories.length;
  const draftCount = stories.filter((story) => !story.published).length;

  function createStory() {
    const id = crypto.randomUUID();
    const today = new Date().toISOString().slice(0, 10);
    const story: EditableStory = {
      id, slug: "", title: "", excerpt: "", content: { type: "doc", content: [{ type: "paragraph" }] } as StoryContent,
      category: "Small moments", tags: [], cover_path: null, story_date: today, publication_at: null,
      updated_at: new Date().toISOString(), is_sample: false, published: false, published_at: null, is_draft_revision: false,
    };
    setStories((current) => [story, ...current]);
    setSelectedId(id);
    setSettingsOpen(false);
    setNotice("");
  }

  async function saveStory(input: EditableStory): Promise<boolean> {
    if (!supabase) { setNotice("Connect Supabase to save stories."); return false; }
    const response = await supabase.from("story_drafts").upsert({
      id: input.id,
      slug: input.slug,
      title: input.title.trim().slice(0, 180),
      excerpt: input.excerpt.trim().slice(0, 320),
      content: input.content,
      category: input.category.trim().slice(0, 80) || "Journal",
      tags: input.tags.slice(0, 12).map((tag) => tag.trim().slice(0, 32)).filter(Boolean),
      cover_path: input.cover_path,
      story_date: input.story_date,
      publication_at: input.publication_at,
      is_sample: input.is_sample,
      updated_at: new Date().toISOString(),
    }, { onConflict: "id" });
    if (response.error) {
      setNotice(`Draft not saved: ${response.error.message}`);
      return false;
    }
    setNotice("");
    setStories((current) => current.map((story) => story.id === input.id ? { ...story, ...input, updated_at: new Date().toISOString(), is_draft_revision: story.published } : story));
    return true;
  }

  async function publishStory(id: string, publishAt: string | null) {
    if (!supabase) return false;
    const { data: draft } = await supabase.from("story_drafts").select("cover_path").eq("id", id).maybeSingle();
    const { error } = await supabase.rpc("publish_story", { p_story_id: id, p_published_at: publishAt || new Date().toISOString() });
    if (error) { setNotice(`Could not publish: ${error.message}`); return false; }
    await removeUnusedCovers(id, [String(draft?.cover_path ?? "")].filter(Boolean));
    setNotice("Your story is out in the world.");
    await refresh();
    return true;
  }

  async function unpublishStory(id: string) {
    if (!supabase) return;
    const [{ data: before }, { data: draft }] = await Promise.all([
      supabase.from("stories").select("cover_path").eq("id", id).maybeSingle(),
      supabase.from("story_drafts").select("cover_path").eq("id", id).maybeSingle(),
    ]);
    const { error } = await supabase.rpc("unpublish_story", { p_story_id: id });
    if (error) setNotice(`Could not unpublish: ${error.message}`);
    else {
      const kept = draft ? String(draft.cover_path ?? "") : String(before?.cover_path ?? "");
      await removeUnusedCovers(id, [kept].filter(Boolean));
      setNotice("Story moved back to your drafts.");
      await refresh();
    }
  }

  async function deleteStory(id: string) {
    if (!supabase) return;
    const { error } = await supabase.rpc("delete_story", { p_story_id: id });
    if (error) setNotice(`Could not delete: ${error.message}`);
    else { await removeUnusedCovers(id, []); setStories((current) => current.filter((story) => story.id !== id)); setSelectedId(null); setNotice("Story deleted."); }
  }

  async function removeUnusedCovers(id: string, keepPaths: string[]) {
    if (!supabase) return;
    const { data } = await supabase.storage.from("story-covers").list(id, { limit: 100 });
    const paths = (data ?? []).map((file) => `${id}/${file.name}`).filter((path) => !keepPaths.includes(path));
    if (paths.length) await supabase.storage.from("story-covers").remove(paths);
  }

  async function signOut() {
    await supabase?.auth.signOut();
    router.refresh();
  }

  return <section className="author-workspace page-wrap">
    <header className="desk-header"><div><div className="eyebrow"><span className="eyebrow-line" /> YOUR PRIVATE WRITING DESK</div><h1>Good to have you <em>back.</em></h1><p>Signed in as {email}</p></div><div className="desk-header-actions"><Link href="/" className="quiet-link"><ExternalLink size={14} /> View your site</Link><button className="quiet-link" type="button" onClick={signOut}><LogOut size={14} /> Sign out</button></div></header>
    {notice && <p className="desk-notice" role="status"><Check size={15} /> {notice}</p>}
    {loadError && <p className="form-error" role="alert">{loadError}</p>}
    <div className="desk-layout">
      <aside className="archive-panel">
        <div className="archive-top"><div><span className="archive-kicker">YOUR ARCHIVE</span><h2>{storyCount} {storyCount === 1 ? "story" : "stories"}</h2></div><button className="icon-button add-story-button" type="button" onClick={createStory} aria-label="Create a new story"><Plus size={18} /></button></div>
        <button className={`settings-row ${settingsOpen ? "selected" : ""}`} type="button" onClick={() => { setSettingsOpen(true); setSelectedId(null); }}><Settings2 size={16} /><span>Site name & about</span><ChevronRight size={14} /></button>
        <div className="archive-list-heading"><span>STORIES BY DATE</span><span>{draftCount} drafts</span></div>
        {loading ? <div className="archive-loading">Gathering your pages…</div> : stories.length ? <div className="archive-list">{stories.map((story) => {
          const future = story.published_at && new Date(story.published_at).getTime() > now;
          const label = story.published ? (future ? "Scheduled" : story.is_draft_revision ? "Edits saved" : "Published") : "Draft";
          return <button key={story.id} className={`archive-item ${selectedId === story.id && !settingsOpen ? "active" : ""}`} type="button" onClick={() => { setSelectedId(story.id); setSettingsOpen(false); }}><span className={`archive-dot ${story.published ? "published" : ""}`} /><span className="archive-item-copy"><strong>{story.title || "Untitled story"}</strong><span>{new Date(`${story.story_date}T12:00:00`).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</span></span><span className={`archive-status ${future ? "scheduled" : ""}`}>{label}</span></button>;
        })}</div> : <div className="archive-empty"><span>✳</span><p>Nothing on the shelf yet.<br />Begin with one small thing.</p><button type="button" onClick={createStory}>Write your first story <ChevronRight size={14} /></button></div>}
        <div className="archive-bottom"><span><Clock3 size={13} /> Autosaved as you write</span><span><CircleHelp size={13} /> Drafts stay private</span></div>
      </aside>
      <div className="editor-panel">
        {settingsOpen ? <SiteSettingsEditor settings={settings} onSaved={(next) => { setSettings(next); setNotice("Your site details are saved."); router.refresh(); }} />
          : selected ? <StoryEditor key={selected.id} initialStory={selected} onSave={saveStory} onPublish={publishStory} onUnpublish={unpublishStory} onDelete={deleteStory} onChanged={() => setNotice("")} />
            : <div className="desk-welcome"><span className="desk-welcome-mark"><Sparkles size={20} /></span><p className="eyebrow">A PAGE, WHEN YOU’RE READY</p><h2>Start with<br /><em>something small.</em></h2><p>A conversation you keep replaying. The color of the evening. Something you almost forgot.</p><button className="button button-dark" onClick={createStory} type="button"><Plus size={16} /> Begin a story</button><div className="welcome-stats"><span><BookOpen size={15} /> {storyCount} in your archive</span><span><FilePenLine size={15} /> {draftCount} {draftCount === 1 ? "draft" : "drafts"}</span></div></div>}
      </div>
    </div>
  </section>;
}

function SiteSettingsEditor({ settings, onSaved }: { settings: SiteSettings; onSaved: (settings: SiteSettings) => void }) {
  const [form, setForm] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const supabase = getBrowserSupabase();

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setSaving(true); setError("");
    const next = { ...form, site_title: form.site_title.trim().slice(0, 80), tagline: form.tagline.trim().slice(0, 160), introduction: form.introduction.trim().slice(0, 320), about: form.about.trim().slice(0, 4000) };
    const { error: saveError } = await supabase.from("site_settings").update({ site_title: next.site_title, tagline: next.tagline, introduction: next.introduction, about: next.about, updated_at: new Date().toISOString() }).eq("id", "main");
    setSaving(false);
    if (saveError) setError(saveError.message); else onSaved(next);
  }

  return <div className="settings-editor"><div className="eyebrow"><span className="eyebrow-line" /> MAKE THIS PLACE YOURS</div><h2>Site name <em>& voice.</em></h2><p>These words appear on your home page and in the browser tab. Change them whenever they stop feeling like you.</p><form className="author-form" onSubmit={save}><label>Site name<input required maxLength={80} value={form.site_title} onChange={(event) => setForm({ ...form, site_title: event.target.value })} /></label><label>One-line tagline<input maxLength={160} value={form.tagline} onChange={(event) => setForm({ ...form, tagline: event.target.value })} /></label><label>Home page introduction<textarea rows={3} maxLength={320} value={form.introduction} onChange={(event) => setForm({ ...form, introduction: event.target.value })} /></label><label>About page<textarea rows={8} maxLength={4000} value={form.about} onChange={(event) => setForm({ ...form, about: event.target.value })} /></label>{error && <p className="form-error">{error}</p>}<button className="button button-dark" disabled={saving}>{saving ? "Saving…" : "Save these words"} <ChevronRight size={15} /></button></form></div>;
}
