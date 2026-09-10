-- Ensure audio files in site-images or dedicated audio bucket can be read and managed

-- If dedicated audio bucket is desired:
insert into storage.buckets (id, name, public)
values ('audio', 'audio', true)
on conflict (id) do update set public = true;

create policy "Anyone can read audio"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'audio' or bucket_id = 'site-images');

create policy "Anyone can upload audio"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'audio' or bucket_id = 'site-images');
