-- Thesis proposals (replaces Firestore collection thesis-proposals)
create table if not exists thesis_proposals (
  id text primary key,
  title text not null default '',
  description text not null default '',
  bachelor boolean not null default false,
  master boolean not null default false,
  status text not null default 'available',
  author text not null default '',
  email text not null default '',
  date text not null default '',
  img_ref text not null default '',
  pdf_ref text not null default ''
);

alter table thesis_proposals enable row level security;

drop policy if exists "public read" on thesis_proposals;
create policy "public read" on thesis_proposals
  for select using (true);

drop policy if exists "anon write" on thesis_proposals;
create policy "anon write" on thesis_proposals
  for insert with check (true);

drop policy if exists "anon update" on thesis_proposals;
create policy "anon update" on thesis_proposals
  for update using (true);

drop policy if exists "anon delete" on thesis_proposals;
create policy "anon delete" on thesis_proposals
  for delete using (true);

-- Storage bucket for thesis images and PDFs
insert into storage.buckets (id, name, public)
values ('thesis', 'thesis', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read thesis files" on storage.objects;
create policy "Public read thesis files" on storage.objects
  for select using (bucket_id = 'thesis');

drop policy if exists "Anon upload thesis files" on storage.objects;
create policy "Anon upload thesis files" on storage.objects
  for insert with check (bucket_id = 'thesis');

drop policy if exists "Anon update thesis files" on storage.objects;
create policy "Anon update thesis files" on storage.objects
  for update using (bucket_id = 'thesis');

drop policy if exists "Anon delete thesis files" on storage.objects;
create policy "Anon delete thesis files" on storage.objects
  for delete using (bucket_id = 'thesis');

-- Enable realtime for the thesis list (idempotent)
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'thesis_proposals'
  ) then
    alter publication supabase_realtime add table thesis_proposals;
  end if;
end $$;
