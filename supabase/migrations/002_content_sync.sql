drop policy if exists "Authenticated users can manage site content" on public.site_content;
drop policy if exists "Anyone can manage site content" on public.site_content;

create policy "Anyone can manage site content"
on public.site_content
for all
to anon, authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Anyone can upload site images" on storage.objects;

create policy "Anyone can upload site images"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'site-images');
