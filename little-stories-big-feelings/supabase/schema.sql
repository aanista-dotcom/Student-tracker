-- Little Stories, Big Feelings
-- Run this in Supabase SQL Editor after creating your project.
-- Add your Auth user's UUID to private.story_author as described in SETUP.md.

create extension if not exists pgcrypto;
create schema if not exists private;

create table if not exists private.story_author (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
revoke all on schema private from public, anon, authenticated;
revoke all on all tables in schema private from public, anon, authenticated;

create or replace function public.is_story_author()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from private.story_author
    where owner_id = (select auth.uid())
  );
$$;
revoke all on function public.is_story_author() from public, anon;
grant execute on function public.is_story_author() to authenticated;

-- Public rows contain only published or scheduled stories, never draft text.
create table if not exists public.stories (
  id uuid primary key,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 180),
  excerpt text not null default '' check (char_length(excerpt) <= 320),
  content jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  category text not null default 'Journal' check (char_length(category) <= 80),
  tags text[] not null default '{}',
  cover_path text,
  story_date date not null default current_date,
  published_at timestamptz not null default now(),
  is_sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Owner-only working copies. Editing a published story creates a private revision.
create table if not exists public.story_drafts (
  id uuid primary key,
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 180),
  excerpt text not null default '' check (char_length(excerpt) <= 320),
  content jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  category text not null default 'Journal' check (char_length(category) <= 80),
  tags text[] not null default '{}',
  cover_path text,
  story_date date not null default current_date,
  publication_at timestamptz,
  is_sample boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id text primary key check (id = 'main'),
  site_title text not null default 'Little Stories, Big Feelings' check (char_length(site_title) between 1 and 80),
  tagline text not null default 'A small place for the things that stay with us.' check (char_length(tagline) <= 160),
  introduction text not null default 'I write about ordinary days, tender changes, and the small moments that quietly become our whole lives.' check (char_length(introduction) <= 320),
  about text not null default 'Hello, and welcome. This is my little corner of the internet: a place to notice things, make sense of them, and leave a few words behind. I hope you find something here that feels familiar.' check (char_length(about) <= 4000),
  updated_at timestamptz not null default now()
);

alter table public.stories enable row level security;
alter table public.story_drafts enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Anyone can read live stories" on public.stories;
create policy "Anyone can read live stories" on public.stories
  for select to anon, authenticated using (published_at <= now());
drop policy if exists "Author can read all story records" on public.stories;
create policy "Author can read all story records" on public.stories
  for select to authenticated using ((select public.is_story_author()));

drop policy if exists "Only author can access drafts" on public.story_drafts;
create policy "Only author can access drafts" on public.story_drafts
  for all to authenticated
  using ((select public.is_story_author()))
  with check ((select public.is_story_author()));

drop policy if exists "Anyone can read site settings" on public.site_settings;
create policy "Anyone can read site settings" on public.site_settings
  for select to anon, authenticated using (true);
drop policy if exists "Only author can update site settings" on public.site_settings;
create policy "Only author can update site settings" on public.site_settings
  for update to authenticated using ((select public.is_story_author()))
  with check ((select public.is_story_author()));

revoke all on public.stories from public, anon, authenticated;
revoke all on public.story_drafts from public, anon, authenticated;
revoke all on public.site_settings from public, anon, authenticated;
grant select on public.stories to anon, authenticated;
grant select, insert, update, delete on public.story_drafts to authenticated;
grant select on public.site_settings to anon, authenticated;
grant update (site_title, tagline, introduction, about, updated_at) on public.site_settings to authenticated;

create or replace function public.publish_story(p_story_id uuid, p_published_at timestamptz default now())
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  draft public.story_drafts%rowtype;
begin
  if not (select public.is_story_author()) then
    raise exception 'Only the site author can publish stories' using errcode = '42501';
  end if;
  select * into draft from public.story_drafts where id = p_story_id;
  if not found then
    raise exception 'Draft not found';
  end if;
  insert into public.stories (id, slug, title, excerpt, content, category, tags, cover_path, story_date, published_at, is_sample, created_at, updated_at)
  values (draft.id, draft.slug, draft.title, draft.excerpt, draft.content, draft.category, draft.tags, draft.cover_path, draft.story_date, coalesce(p_published_at, now()), draft.is_sample, now(), now())
  on conflict (id) do update set
    slug = excluded.slug, title = excluded.title, excerpt = excluded.excerpt,
    content = excluded.content, category = excluded.category, tags = excluded.tags,
    cover_path = excluded.cover_path, story_date = excluded.story_date,
    published_at = excluded.published_at, is_sample = excluded.is_sample, updated_at = now();
  delete from public.story_drafts where id = p_story_id;
end;
$$;

create or replace function public.unpublish_story(p_story_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not (select public.is_story_author()) then
    raise exception 'Only the site author can unpublish stories' using errcode = '42501';
  end if;
  insert into public.story_drafts (id, slug, title, excerpt, content, category, tags, cover_path, story_date, publication_at, is_sample, updated_at)
    select id, slug, title, excerpt, content, category, tags, cover_path, story_date, null, is_sample, now()
    from public.stories where id = p_story_id
    on conflict (id) do nothing;
  delete from public.stories where id = p_story_id;
end;
$$;

create or replace function public.delete_story(p_story_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not (select public.is_story_author()) then
    raise exception 'Only the site author can delete stories' using errcode = '42501';
  end if;
  delete from public.story_drafts where id = p_story_id;
  delete from public.stories where id = p_story_id;
end;
$$;

revoke all on function public.publish_story(uuid, timestamptz) from public, anon;
revoke all on function public.unpublish_story(uuid) from public, anon;
revoke all on function public.delete_story(uuid) from public, anon;
grant execute on function public.publish_story(uuid, timestamptz) to authenticated;
grant execute on function public.unpublish_story(uuid) to authenticated;
grant execute on function public.delete_story(uuid) to authenticated;

insert into public.site_settings (id) values ('main') on conflict (id) do nothing;

-- Keep unpublished cover files private. Live-story references unlock public reads.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('story-covers', 'story-covers', false, 8388608, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public = false, file_size_limit = 8388608, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Author manages story cover images" on storage.objects;
create policy "Author manages story cover images" on storage.objects
  for all to authenticated
  using (bucket_id = 'story-covers' and (select public.is_story_author()))
  with check (bucket_id = 'story-covers' and (select public.is_story_author()));
drop policy if exists "Published story covers are readable" on storage.objects;
create policy "Published story covers are readable" on storage.objects
  for select to anon, authenticated
  using (
    bucket_id = 'story-covers'
    and exists (
      select 1 from public.stories s
      where s.cover_path = storage.objects.name and s.published_at <= now()
    )
  );

-- One labeled example makes the public site ready to explore after setup.
insert into public.stories (id, slug, title, excerpt, content, category, tags, story_date, published_at, is_sample)
values (
  '1d55441c-1694-4aed-9dc7-918955010001',
  'the-blue-cup-on-the-windowsill',
  'The blue cup on the windowsill',
  'A little story about a chipped cup, a slow morning, and learning to let the day arrive at its own pace.',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"The blue cup has a small chip near its handle. I know exactly where it is because my thumb finds it every morning, before I have properly woken up."}]},{"type":"paragraph","content":[{"type":"text","text":"Today I set it on the windowsill while the kettle boiled. Outside, the street was still deciding what sort of day it wanted to be. A bicycle went past without hurry. Someone upstairs opened a window. The light rested on the rooftops like a hand."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"A small pause"}]},{"type":"paragraph","content":[{"type":"text","text":"I had been trying to get ahead of the morning: answering messages in my head, rehearsing conversations, counting the things that needed doing. Then the tea cooled just enough to drink, and I remembered there was only this cup, this window, this breath."}]},{"type":"paragraph","content":[{"type":"text","text":"Nothing important changed. The list was still there. But for a minute I let the day come to me instead of running out to meet it."}]},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"Maybe a gentler beginning is still a beginning."}]}]},{"type":"paragraph","content":[{"type":"text","text":"I picked up the cup, careful of the chip, and carried it with me. The morning had arrived. That was enough."}]}]}',
  'Small moments', array['morning','home','sample'], current_date, now(), true
)
on conflict (id) do nothing;
