/* Cover previews use short-lived signed URLs or the local object URL before publishing. */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { ArrowUpRight, CalendarDays, Check, Eye, ImagePlus, LoaderCircle, Save, Trash2, Unlink, X } from "lucide-react";
import { RichEditor } from "@/components/author/rich-editor";
import { RichText } from "@/components/rich-text";
import { getBrowserSupabase } from "@/lib/supabase/browser";
import { plainTextFromContent, sanitizeStoryContent } from "@/lib/content";
import type { StoryContent } from "@/lib/types";
import type { EditableStory } from "@/components/author/dashboard";

type EditorForm = EditableStory;

function localDateTime(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

function slugFor(title: string, id: string) {
  const base = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 56) || "little-story";
  return `${base}-${id.replace(/-/g, "").slice(-8)}`;
}

export function StoryEditor({ initialStory, onSave, onPublish, onUnpublish, onDelete, onChanged }: {
  initialStory: EditableStory;
  onSave: (story: EditorForm) => Promise<boolean>;
  onPublish: (id: string, publishAt: string | null) => Promise<boolean>;
  onUnpublish: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onChanged: () => void;
}) {
  const [form, setForm] = useState<EditorForm>(initialStory);
  const [dirty, setDirty] = useState(false);
  const [savedLabel, setSavedLabel] = useState("");
  const [saveError, setSaveError] = useState("");
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageBusy, setImageBusy] = useState(false);
  const [tagsText, setTagsText] = useState(initialStory.tags.join(", "));
  const [published, setPublished] = useState(initialStory.published);
  const [now, setNow] = useState(0);
  const revision = useRef(0);
  const supabase = getBrowserSupabase();

  useEffect(() => {
    const timer = window.setTimeout(() => setNow(Date.now()), 0);
    const interval = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => { window.clearTimeout(timer); window.clearInterval(interval); };
  }, []);

  useEffect(() => {
    let active = true;
    async function loadCover() {
      if (!form.cover_path || !supabase) { setImageUrl(""); return; }
      const { data } = await supabase.storage.from("story-covers").createSignedUrl(form.cover_path, 60 * 60);
      if (active) setImageUrl(data?.signedUrl ?? "");
    }
    void loadCover();
    return () => { active = false; };
  }, [form.cover_path, supabase]);

  const patch = useCallback(<K extends keyof EditorForm>(key: K, value: EditorForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setDirty(true);
    setSavedLabel("");
    setSaveError("");
    onChanged();
    revision.current += 1;
  }, [onChanged]);

  const saveNow = useCallback(async () => {
    if (!form.title.trim()) {
      setSaveError("Add a title and your draft will save as you write.");
      return false;
    }
    const version = revision.current;
    const withSlug = form.slug ? form : { ...form, slug: slugFor(form.title, form.id) };
    const content = sanitizeStoryContent(withSlug.content);
    const text = plainTextFromContent(content);
    const normalized: EditorForm = {
      ...withSlug,
      content,
      slug: withSlug.slug,
      excerpt: withSlug.excerpt.trim() || text.slice(0, 220),
      tags: tagsText.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 12),
    };
    setForm((current) => current.slug ? current : { ...current, slug: normalized.slug });
    const ok = await onSave(normalized);
    if (ok) {
      setSaveError("");
      if (revision.current === version) {
        setDirty(false);
        setSavedLabel(`Saved at ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`);
      }
    } else setSaveError("This draft could not be saved. Check your connection and try again.");
    return ok;
  }, [form, onSave, tagsText]);

  useEffect(() => {
    if (!dirty || !form.title.trim()) return;
    const timer = window.setTimeout(() => { void saveNow(); }, 1100);
    return () => window.clearTimeout(timer);
  }, [dirty, form, saveNow]);

  async function publish() {
    setBusy(true);
    const saved = await saveNow();
    if (saved) {
      const publishAt = form.publication_at ? new Date(form.publication_at).toISOString() : new Date().toISOString();
      const ok = await onPublish(form.id, publishAt);
      if (ok) { setPublished(true); setDirty(false); setSavedLabel("Published"); }
    }
    setBusy(false);
  }

  async function unpublish() {
    setBusy(true);
    if (dirty) await saveNow();
    await onUnpublish(form.id);
    setPublished(false);
    setBusy(false);
  }

  async function chooseCover(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    if (!supabase) { setSaveError("Supabase is not configured."); return; }
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) { setSaveError("Choose a JPG, PNG, WebP, or AVIF image."); return; }
    if (file.size > 8 * 1024 * 1024) { setSaveError("Cover images need to be smaller than 8 MB."); return; }
    setImageBusy(true); setSaveError("");
    const suffix = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${form.id}/${crypto.randomUUID()}.${suffix}`;
    const { error } = await supabase.storage.from("story-covers").upload(path, file, { upsert: false, contentType: file.type });
    if (error) setSaveError(`Image not uploaded: ${error.message}`);
    else {
      if (imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
      const { data } = await supabase.storage.from("story-covers").createSignedUrl(path, 60 * 60);
      setImageUrl(data?.signedUrl ?? URL.createObjectURL(file));
      patch("cover_path", path);
    }
    setImageBusy(false);
  }

  async function removeCover() {
    if (imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    setImageUrl("");
    patch("cover_path", null);
  }

  async function copyStoryLink() {
    if (!form.slug) return;
    await navigator.clipboard.writeText(`${window.location.origin}/stories/${form.slug}`);
    setSavedLabel("Share link copied");
  }

  const isScheduled = published && form.publication_at && new Date(form.publication_at).getTime() > now;
  const canPreview = Boolean(form.title.trim());

  return <div className="story-editor-panel">
    <div className="editor-topline"><div><span className={`editor-status-dot ${published ? "live" : ""}`} />{isScheduled ? "Scheduled for " + new Date(form.publication_at!).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : published ? (initialStory.is_draft_revision ? "Published · your edits are a private draft" : "Published") : "Private draft"}</div><div className="editor-top-actions">{published && !isScheduled && <button className="quiet-link" type="button" onClick={() => void copyStoryLink()}><ArrowUpRight size={14} /> Copy share link</button>}<button className="quiet-link" type="button" onClick={() => setPreview(true)} disabled={!canPreview}><Eye size={14} /> Preview</button></div></div>
    <div className="story-editor-main">
      <div className="editor-fields">
        <label className="eyebrow field-eyebrow" htmlFor="story-title"><span className="eyebrow-line" /> THE STORY</label>
        <input id="story-title" className="story-title-input" maxLength={180} placeholder="Give this story a name…" value={form.title} onChange={(event) => patch("title", event.target.value)} />
        <div className="editor-subfields"><label>Story date<input type="date" value={form.story_date} onChange={(event) => patch("story_date", event.target.value)} /></label><label>Category<input maxLength={80} list="story-categories" value={form.category} onChange={(event) => patch("category", event.target.value)} placeholder="Small moments" /><datalist id="story-categories"><option>Small moments</option><option>Growing up</option><option>People I love</option><option>Quiet thoughts</option><option>Home</option></datalist></label></div>
        <label className="full-label">A short note <span>(optional; used on the story card)</span><textarea rows={2} maxLength={320} value={form.excerpt} onChange={(event) => patch("excerpt", event.target.value)} placeholder="A sentence to invite someone in…" /></label>
        <div className="cover-editor"><div><strong>Cover image</strong><span>Optional · private until the story is published · up to 8 MB</span></div><label className="cover-upload">{imageBusy ? <LoaderCircle className="spin" size={15} /> : <ImagePlus size={15} />} {form.cover_path ? "Replace image" : "Add a photo"}<input hidden type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={chooseCover} /></label>{imageUrl && <div className="cover-preview"><img src={imageUrl} alt="Story cover preview" /><button type="button" onClick={removeCover} aria-label="Remove cover image"><X size={15} /></button></div>}</div>
        <div className="content-label"><span>THE WORDS</span><span>Formatting is here when you need it</span></div>
        <RichEditor value={form.content} onChange={(content: StoryContent) => patch("content", content)} />
        <label className="full-label tag-input">Tags <span>(separate with commas)</span><input value={tagsText} onChange={(event) => { setTagsText(event.target.value); setDirty(true); setSavedLabel(""); revision.current += 1; }} placeholder="morning, home, remembering" /></label>
      </div>
      <aside className="publish-card"><div className="publish-card-title"><CalendarDays size={16} /> <span>WHEN IT’S READY</span></div><p>Save a draft any time. Choose a future time to schedule it, or leave this blank to publish now.</p><label>Publish on <input type="datetime-local" value={localDateTime(form.publication_at)} onChange={(event) => patch("publication_at", event.target.value ? new Date(event.target.value).toISOString() : null)} /></label><span className="timezone-note">Times use your device’s local time.</span><div className="publish-actions"><button className="button button-dark button-full" type="button" disabled={busy || !form.title.trim()} onClick={() => void publish()}>{busy ? <><LoaderCircle size={15} className="spin" /> Saving…</> : <>{form.publication_at && new Date(form.publication_at).getTime() > now ? <CalendarDays size={15} /> : <ArrowUpRight size={15} />}{form.publication_at && new Date(form.publication_at).getTime() > now ? "Schedule story" : published ? "Publish update" : "Publish story"}</>}</button><button className="button button-paper button-full" type="button" disabled={busy || !form.title.trim()} onClick={() => void saveNow()}><Save size={15} /> Save draft</button></div>{published && <button className="unpublish-action" type="button" disabled={busy} onClick={() => void unpublish()}><Unlink size={14} /> Unpublish and keep as a draft</button>}
        <div className="save-state" aria-live="polite">{dirty ? <><span className="save-pulse" /> Saving changes automatically…</> : savedLabel ? <><Check size={14} /> {savedLabel}</> : <><Check size={14} /> All changes saved</>}</div>
        {saveError && <p className="form-error" role="alert">{saveError}</p>}
        <div className="share-info"><span>YOUR STORY LINK</span><p>{form.slug ? `/stories/${form.slug}` : "Created when your draft is saved"}</p><small>Every story gets its own lasting address.</small></div>
        <button className="delete-story" type="button" disabled={busy} onClick={() => { if (window.confirm("Delete this story and its draft permanently?")) void onDelete(form.id); }}><Trash2 size={14} /> Delete story</button>
      </aside>
    </div>
    {preview && <div className="preview-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreview(false); }}><section className="preview-modal" role="dialog" aria-modal="true" aria-label="Story preview"><header><span><Eye size={15} /> A quiet preview</span><button type="button" onClick={() => setPreview(false)} aria-label="Close preview"><X size={17} /></button></header><div className="preview-content"><div className="eyebrow"><span className="eyebrow-line" /> {form.category || "A LITTLE STORY"}</div><h1>{form.title || "Untitled story"}</h1>{form.excerpt && <p className="story-deck">{form.excerpt}</p>}<p className="preview-date">{new Date(`${form.story_date}T12:00:00`).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</p>{imageUrl && <img className="preview-cover" src={imageUrl} alt="" />}<RichText content={form.content} /></div></section></div>}
  </div>;
}
