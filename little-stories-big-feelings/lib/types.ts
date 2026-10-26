export type RichTextNode = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: Array<{ type?: string; attrs?: Record<string, unknown> }>;
  content?: RichTextNode[];
};

export type StoryContent = { type: "doc"; content: RichTextNode[] };

export type Story = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: StoryContent;
  category: string;
  tags: string[];
  cover_path: string | null;
  story_date: string;
  published_at: string;
  is_sample: boolean;
  cover_url?: string | null;
};

export type StoryDraft = Omit<Story, "published_at" | "cover_url"> & {
  publication_at: string | null;
  updated_at: string;
};

export type SiteSettings = {
  id: string;
  site_title: string;
  tagline: string;
  introduction: string;
  about: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  id: "main",
  site_title: "Little Stories, Big Feelings",
  tagline: "A small place for the things that stay with us.",
  introduction:
    "I write about ordinary days, tender changes, and the small moments that quietly become our whole lives.",
  about:
    "Hello, and welcome. This is my little corner of the internet: a place to notice things, make sense of them, and leave a few words behind. I hope you find something here that feels familiar.",
};
