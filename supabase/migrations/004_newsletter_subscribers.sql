create table if not exists public.newsletter_subscribers (
  email text primary key check (char_length(email) between 3 and 320),
  subscribed_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "Anyone can subscribe to newsletter" on public.newsletter_subscribers;
create policy "Anyone can subscribe to newsletter"
on public.newsletter_subscribers
for insert
to anon, authenticated
with check (true);