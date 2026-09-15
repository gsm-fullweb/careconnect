-- ============================================================================
-- CareConnect - Correção de escrita do painel /admin
-- Data: 20/07/2026
--
-- Sintoma: telas dentro de /admin carregam, mas alterações não persistem ou
-- falham ao salvar. A causa mais provável é RLS sem policies administrativas
-- completas nas tabelas que o painel escreve diretamente.
--
-- Esta migration é idempotente e não abre escrita pública. Ela garante que
-- usuários autenticados cujo profile tem user_role/type = admin/administrator
-- possam ler, inserir, atualizar e excluir os registros gerenciados no /admin.
-- ============================================================================

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and (
        lower(coalesce(p.user_role::text, '')) in ('admin', 'administrator')
        or lower(coalesce(p.type::text, '')) in ('admin', 'administrator')
      )
  );
$$;

grant execute on function public.is_admin() to authenticated;

-- Tabelas editadas pelo painel administrativo.
alter table public.customer enable row level security;
alter table public.candidatos_cuidadores_rows enable row level security;
alter table public.blog_posts enable row level security;
alter table public.testimonials enable row level security;
alter table public.partners enable row level security;

drop policy if exists "admin_all_customer" on public.customer;
create policy "admin_all_customer"
  on public.customer
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin_all_candidatos_cuidadores_rows" on public.candidatos_cuidadores_rows;
create policy "admin_all_candidatos_cuidadores_rows"
  on public.candidatos_cuidadores_rows
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin_all_blog_posts" on public.blog_posts;
create policy "admin_all_blog_posts"
  on public.blog_posts
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin_all_testimonials" on public.testimonials;
create policy "admin_all_testimonials"
  on public.testimonials
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin_all_partners" on public.partners;
create policy "admin_all_partners"
  on public.partners
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Upload/galeria de imagens do editor de blog usa o bucket "public".
-- As policies abaixo deixam o admin listar, enviar, atualizar e apagar objetos
-- neste bucket sem depender de policies antigas do Storage.
drop policy if exists "admin_select_public_storage" on storage.objects;
create policy "admin_select_public_storage"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'public' and public.is_admin());

drop policy if exists "admin_insert_public_storage" on storage.objects;
create policy "admin_insert_public_storage"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'public' and public.is_admin());

drop policy if exists "admin_update_public_storage" on storage.objects;
create policy "admin_update_public_storage"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'public' and public.is_admin())
  with check (bucket_id = 'public' and public.is_admin());

drop policy if exists "admin_delete_public_storage" on storage.objects;
create policy "admin_delete_public_storage"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'public' and public.is_admin());
