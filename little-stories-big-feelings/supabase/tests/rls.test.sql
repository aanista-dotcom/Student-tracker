-- Run after schema.sql with `supabase test db` against the local Supabase stack.
begin;
select plan(13);

-- Transaction-scoped fixtures: the fake Auth user and all story rows roll back.
insert into auth.users (id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
values ('00000000-0000-0000-0000-00000000a001', '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'story-author-test@example.invalid', '', now(),
  '{"provider":"email","providers":["email"]}', '{}', now(), now())
on conflict (id) do nothing;
insert into private.story_author (owner_id) values ('00000000-0000-0000-0000-00000000a001')
on conflict (owner_id) do nothing;
insert into public.story_drafts (id, slug, title, excerpt, content, category, story_date)
values ('00000000-0000-0000-0000-00000000b001', 'security-flow-check-b001', 'Security flow check', '',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"A private test story."}]}]}', 'Testing', current_date);
insert into public.stories (id, slug, title, excerpt, content, category, story_date, published_at)
values ('00000000-0000-0000-0000-00000000b002', 'scheduled-security-check-b002', 'Scheduled check', '',
  '{"type":"doc","content":[]}', 'Testing', current_date, now() + interval '1 day');

select ok(not has_table_privilege('anon', 'public.story_drafts', 'SELECT'),
  'anonymous readers have no table access to drafts');
select ok(not has_table_privilege('authenticated', 'public.stories', 'INSERT'),
  'authenticated users cannot insert directly into the public story table');
select ok(not has_function_privilege('anon', 'public.publish_story(uuid,timestamptz)', 'EXECUTE'),
  'anonymous readers cannot call the publish function');

set local role anon;
select throws_ok('select count(*) from public.story_drafts', '42501',
  'anonymous readers cannot query drafts');
select is((select count(*)::integer from public.stories where slug = 'the-blue-cup-on-the-windowsill'), 1,
  'anonymous readers can see the published sample story');
select is((select count(*)::integer from public.stories where slug = 'scheduled-security-check-b002'), 0,
  'anonymous readers cannot see a future scheduled story');
reset role;

select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-00000000a002', true);
set local role authenticated;
select throws_ok('select public.publish_story(''00000000-0000-0000-0000-00000000b001''::uuid, now())', '42501',
  'Only the site author can publish stories', 'a different authenticated user cannot publish');
select is((select count(*)::integer from public.story_drafts where id = '00000000-0000-0000-0000-00000000b001'), 0,
  'a different authenticated user cannot read the private draft');
reset role;

select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-00000000a001', true);
set local role authenticated;
select lives_ok('select public.publish_story(''00000000-0000-0000-0000-00000000b001''::uuid, now())',
  'the author can publish a saved draft');
reset role;
select is((select count(*)::integer from public.stories where id = '00000000-0000-0000-0000-00000000b001'), 1,
  'publishing places the story in the public table');
set local role authenticated;
select lives_ok('select public.unpublish_story(''00000000-0000-0000-0000-00000000b001''::uuid)',
  'the author can unpublish a story');
reset role;
select is((select count(*)::integer from public.story_drafts where id = '00000000-0000-0000-0000-00000000b001'), 1,
  'unpublishing preserves a private draft');
set local role anon;
select is((select count(*)::integer from public.stories where slug = 'security-flow-check-b001'), 0,
  'unpublished stories disappear from anonymous reads');
reset role;

select * from finish();
rollback;
