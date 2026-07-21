-- MedicToros — políticas de Storage en Supabase (plan gratis)
-- 1. Supabase Dashboard → Storage → bucket "medictoros-pdfs" (Public bucket ON)
-- 2. SQL Editor → New query → pega TODO esto → Run

drop policy if exists "medictoros_public_read" on storage.objects;
drop policy if exists "medictoros_public_insert" on storage.objects;
drop policy if exists "medictoros_public_update" on storage.objects;
drop policy if exists "medictoros_public_delete" on storage.objects;

create policy "medictoros_public_read"
on storage.objects for select
to public
using (bucket_id = 'medictoros-pdfs');

create policy "medictoros_public_insert"
on storage.objects for insert
to public
with check (bucket_id = 'medictoros-pdfs');

create policy "medictoros_public_update"
on storage.objects for update
to public
using (bucket_id = 'medictoros-pdfs')
with check (bucket_id = 'medictoros-pdfs');

create policy "medictoros_public_delete"
on storage.objects for delete
to public
using (bucket_id = 'medictoros-pdfs');
