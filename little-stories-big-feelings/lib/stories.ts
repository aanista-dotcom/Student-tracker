import { SAMPLE_STORY } from "@/lib/sample-story";
import type { SiteSettings, Story } from "@/lib/types";
import { DEFAULT_SETTINGS } from "@/lib/types";
import { getServerSupabase } from "@/lib/supabase/server";

function attachCoverUrl(story: Story): Story {
  if (!story.cover_path) return { ...story, cover_url: null };
  return { ...story, cover_url: `/api/covers?path=${encodeURIComponent(story.cover_path)}` };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await getServerSupabase();
  if (!supabase) return DEFAULT_SETTINGS;
  const { data } = await supabase.from("site_settings").select("*").eq("id", "main").maybeSingle();
  return data ? { ...DEFAULT_SETTINGS, ...data } as SiteSettings : DEFAULT_SETTINGS;
}

export async function getPublishedStories(limit = 100): Promise<Story[]> {
  const supabase = await getServerSupabase();
  if (!supabase) return [SAMPLE_STORY].slice(0, limit);
  const { data, error } = await supabase
    .from("stories")
    .select("id,slug,title,excerpt,content,category,tags,cover_path,story_date,published_at,is_sample")
    .lte("published_at", new Date().toISOString())
    .order("story_date", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data.map((story) => attachCoverUrl(story as Story));
}

export async function getPublishedStory(slug: string): Promise<Story | null> {
  const supabase = await getServerSupabase();
  if (!supabase) return slug === SAMPLE_STORY.slug ? SAMPLE_STORY : null;
  const { data } = await supabase
    .from("stories")
    .select("id,slug,title,excerpt,content,category,tags,cover_path,story_date,published_at,is_sample")
    .eq("slug", slug)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();
  return data ? attachCoverUrl(data as Story) : null;
}
