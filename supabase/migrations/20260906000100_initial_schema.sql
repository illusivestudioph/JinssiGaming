-- Jinssi Gaming: no browser role can grant itself admin privileges.
begin;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admin_users enable row level security;
revoke all on public.admin_users from public, anon, authenticated;

create function public.is_admin() returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.admin_users where user_id = (select auth.uid()));
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create function private.trim_text(value text)
returns text language sql immutable set search_path = ''
as $$ select regexp_replace(value, '^[[:space:]]+|[[:space:]]+$', '', 'g'); $$;

create function private.valid_text(value jsonb, field text, minimum integer, maximum integer)
returns boolean language sql immutable set search_path = ''
as $$
  select coalesce(jsonb_typeof(value -> field) = 'string'
    and char_length(private.trim_text(value ->> field)) between minimum and maximum, false);
$$;

create function private.safe_url(value text, allow_link boolean default false)
returns boolean language sql immutable set search_path = ''
as $$
  select coalesce(char_length(value) between 1 and 2048
    and value !~ '[[:space:]\\]'
    and (value ~ '^/[^/]' or value = '/'
      or value ~ '^https://[^/@?#]+([/?#]|$)'
      or value ~ '^http://(localhost|127\.0\.0\.1|\[::1\])(:[0-9]+)?([/?#]|$)'
      or (allow_link and (value ~ '^mailto:[^?]+' or value like '#%'))), false);
$$;

create function private.valid_walkthrough(value jsonb)
returns boolean language plpgsql immutable set search_path = ''
as $$
declare
  section jsonb;
  step jsonb;
  section_ids text[] := '{}';
  step_keys text[] := '{}';
  step_key text;
begin
  if jsonb_typeof(value) is distinct from 'array' or jsonb_array_length(value) > 100 then return false; end if;
  for section in select jsonb_array_elements(value) loop
    if not private.valid_text(section, 'id', 1, 100)
      or (section ->> 'id') !~ '^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$'
      or (section ->> 'id') = any(section_ids)
      or not private.valid_text(section, 'title', 1, 200)
      or jsonb_typeof(section -> 'steps') is distinct from 'array'
      then return false; end if;
    if jsonb_array_length(section -> 'steps') > 500 then return false; end if;
    section_ids := array_append(section_ids, section ->> 'id');
    for step in select jsonb_array_elements(section -> 'steps') loop
      if not private.valid_text(step, 'id', 1, 100)
        or (step ->> 'id') !~ '^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$'
        or not private.valid_text(step, 'title', 1, 200)
        or not private.valid_text(step, 'description', 1, 10000)
        or not private.valid_text(step, 'image', 0, 2048)
        or not private.valid_text(step, 'imageAlt', 0, 500)
        or ((step ->> 'image') <> '' and not private.safe_url(step ->> 'image'))
        or (step ? 'hasSpoiler' and jsonb_typeof(step -> 'hasSpoiler') is distinct from 'boolean')
        or (step ? 'spoilerText' and not private.valid_text(step, 'spoilerText', 0, 10000))
        then return false; end if;
      step_key := (section ->> 'id') || '-' || (step ->> 'id');
      if step_key = any(step_keys) then return false; end if;
      step_keys := array_append(step_keys, step_key);
    end loop;
  end loop;
  return true;
end;
$$;

create function private.valid_cta_links(value jsonb)
returns boolean language plpgsql immutable set search_path = ''
as $$
declare
  link jsonb;
  wallet jsonb;
  ids text[] := '{}';
begin
  if jsonb_typeof(value) is distinct from 'array' or jsonb_array_length(value) > 20 then return false; end if;
  for link in select jsonb_array_elements(value) loop
    if not private.valid_text(link, 'id', 1, 100)
      or (link ->> 'id') !~ '^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$'
      or (link ->> 'id') = any(ids)
      or not private.valid_text(link, 'label', 1, 100)
      or not private.valid_text(link, 'url', 1, 2048)
      or not private.safe_url(link ->> 'url', true)
      or (link ? 'customMessage' and not private.valid_text(link, 'customMessage', 0, 1000))
      then return false; end if;
    ids := array_append(ids, link ->> 'id');
    if link ? 'wallets' then
      if jsonb_typeof(link -> 'wallets') is distinct from 'array' then return false; end if;
      if jsonb_array_length(link -> 'wallets') not between 1 and 10 then return false; end if;
      for wallet in select jsonb_array_elements(link -> 'wallets') loop
        if not private.valid_text(wallet, 'name', 1, 80)
          or not private.valid_text(wallet, 'accountName', 1, 200)
          or not private.valid_text(wallet, 'accountNumber', 0, 200)
          or (wallet ? 'qrCode' and (not private.valid_text(wallet, 'qrCode', 0, 2048)
            or ((wallet ->> 'qrCode') <> '' and not private.safe_url(wallet ->> 'qrCode'))))
          or (private.trim_text(wallet ->> 'accountNumber') = '' and coalesce(wallet ->> 'qrCode', '') = '')
          then return false; end if;
      end loop;
    end if;
  end loop;
  return true;
end;
$$;

create table public.games (
  id text primary key check (id ~ '^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$'),
  title text not null check (char_length(private.trim_text(title)) between 1 and 200),
  developer text not null check (char_length(private.trim_text(developer)) between 1 and 200),
  category text not null check (char_length(private.trim_text(category)) between 1 and 100),
  description text not null check (char_length(private.trim_text(description)) between 1 and 10000),
  accent_color text not null check (accent_color ~ '^#[0-9a-fA-F]{6}$'),
  cover_image text not null check (private.safe_url(cover_image)),
  cover_alt text not null check (char_length(private.trim_text(cover_alt)) between 1 and 500),
  walkthrough jsonb not null default '[]'::jsonb check (private.valid_walkthrough(walkthrough)),
  revision integer not null default 1,
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  id boolean primary key default true check (id),
  hero_image text not null check (private.safe_url(hero_image)),
  logo_image text not null check (private.safe_url(logo_image)),
  cta_links jsonb not null default '[]'::jsonb check (private.valid_cta_links(cta_links)),
  revision integer not null default 1,
  updated_at timestamptz not null default now()
);

create function private.bump_revision() returns trigger
language plpgsql set search_path = ''
as $$
begin
  new.revision := old.revision + 1;
  new.updated_at := now();
  return new;
end;
$$;
create trigger games_revision before update on public.games for each row execute function private.bump_revision();
create trigger settings_revision before update on public.site_settings for each row execute function private.bump_revision();

alter table public.games enable row level security;
alter table public.site_settings enable row level security;
revoke all on public.games, public.site_settings from public, anon, authenticated;
grant select on public.games, public.site_settings to anon, authenticated;
grant insert (id, title, developer, category, description, accent_color, cover_image, cover_alt, walkthrough)
  on public.games to authenticated;
grant update (title, developer, category, description, accent_color, cover_image, cover_alt, walkthrough)
  on public.games to authenticated;
grant delete on public.games to authenticated;
grant update (hero_image, logo_image, cta_links) on public.site_settings to authenticated;

create policy games_public_read on public.games for select to anon, authenticated using (true);
create policy games_admin_insert on public.games for insert to authenticated with check ((select public.is_admin()));
create policy games_admin_update on public.games for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy games_admin_delete on public.games for delete to authenticated using ((select public.is_admin()));
create policy settings_public_read on public.site_settings for select to anon, authenticated using (true);
create policy settings_admin_update on public.site_settings for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  game_id text not null references public.games(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  user_name text not null default 'Cozy Gamer' check (char_length(private.trim_text(user_name)) between 2 and 50),
  text text not null check (char_length(private.trim_text(text)) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index comments_game_created_idx on public.comments(game_id, created_at desc, id desc);
create index comments_user_created_idx on public.comments(user_id, created_at desc);

-- Derive authorship and timestamps on the server, not from client-supplied
-- email addresses or editable metadata roles. Serialize per-user inserts to
-- make the posting cooldown effective even for simultaneous requests.
create function private.prepare_comment() returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  actor uuid := auth.uid();
  display_name text;
begin
  if actor is null then raise exception 'Sign in to post a note.' using errcode = '42501'; end if;
  perform pg_advisory_xact_lock(hashtextextended(actor::text, 0));
  if exists (select 1 from public.comments where user_id = actor and created_at > now() - interval '15 seconds') then
    raise exception 'Please wait 15 seconds between notes.' using errcode = 'P0001';
  end if;
  select left(private.trim_text(raw_user_meta_data ->> 'display_name'), 50) into display_name from auth.users where id = actor;
  new.user_id := actor;
  new.user_name := case when char_length(display_name) >= 2 then display_name else 'Cozy Gamer' end;
  new.created_at := now();
  new.text := private.trim_text(new.text);
  return new;
end;
$$;
create trigger comments_prepare before insert on public.comments for each row execute function private.prepare_comment();

alter table public.comments enable row level security;
revoke all on public.comments from public, anon, authenticated;
grant select on public.comments to anon, authenticated;
grant insert (game_id, text) on public.comments to authenticated;
grant delete on public.comments to authenticated;
create policy comments_public_read on public.comments for select to anon, authenticated using (true);
create policy comments_own_insert on public.comments for insert to authenticated with check ((select auth.uid()) = user_id);
create policy comments_owner_or_admin_delete on public.comments for delete to authenticated
  using ((select auth.uid()) = user_id or (select public.is_admin()));

-- Public images only; never place sensitive/private files in this bucket.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-assets', 'site-assets', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy site_assets_read on storage.objects for select to anon, authenticated using (bucket_id = 'site-assets');
create policy site_assets_admin_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'site-assets' and (select public.is_admin()) and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy site_assets_admin_delete on storage.objects for delete to authenticated
  using (bucket_id = 'site-assets' and (select public.is_admin()));
-- No UPDATE policy: uploads use unique paths and never overwrite cached assets.

revoke all on all functions in schema private from public;
grant execute on function private.trim_text(text), private.valid_text(jsonb, text, integer, integer),
  private.safe_url(text, boolean), private.valid_walkthrough(jsonb), private.valid_cta_links(jsonb) to anon, authenticated;

commit;
