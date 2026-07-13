-- ============================================================================
-- CareConnect — Correção crítica de segurança (LGPD)
-- Tabela public.customer: as políticas antigas liberavam SELECT/INSERT/UPDATE
-- para "public" com USING(true) — qualquer pessoa com o anon key (que está no
-- bundle do site) conseguia LER e ALTERAR todos os dados dos clientes.
--
-- Esta migration:
--   1. Cria a função is_admin() para checar o papel do usuário no banco.
--   2. Remove as políticas abertas.
--   3. Cria políticas restritas: admin OU dono do registro (email = auth.email()).
--   4. Cria a RPC upsert_customer_lead() (SECURITY DEFINER) para o funil público
--      de captação de leads continuar funcionando sem acesso anônimo à tabela.
--
-- ORDEM DE APLICAÇÃO: rode este SQL no Supabase ANTES (ou junto) do deploy do
-- frontend, pois EncontrarCuidador passa a chamar a RPC criada aqui.
-- ============================================================================

-- 1) Helper: usuário atual é admin? -------------------------------------------
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
        -- user_role/type podem ser enums no banco; cast para text antes de comparar
        -- (coalescer um enum com '' dispara "invalid input value for enum").
        lower(coalesce(p.user_role::text, '')) in ('admin', 'administrator')
        or lower(coalesce(p.type::text, '')) in ('admin', 'administrator')
      )
  );
$$;

-- 2) Garantir RLS ligado e remover políticas abertas antigas ------------------
alter table public.customer enable row level security;

drop policy if exists "Enable read access for all users"   on public.customer;
drop policy if exists "Enable insert access for all users"  on public.customer;
drop policy if exists "Enable update access for all users"  on public.customer;

-- 3) Políticas restritas -------------------------------------------------------
-- Leitura: apenas admin ou o próprio dono (cliente logado lê o próprio registro,
-- pois customer.email == auth.email()).
create policy "customer_select_admin_or_owner"
  on public.customer
  for select
  to authenticated
  using (public.is_admin() or email = auth.email());

-- Atualização: admin ou dono.
create policy "customer_update_admin_or_owner"
  on public.customer
  for update
  to authenticated
  using (public.is_admin() or email = auth.email())
  with check (public.is_admin() or email = auth.email());

-- Inserção pelo painel do cliente logado (com o próprio email) e pelo admin.
-- O funil PÚBLICO (anônimo) NÃO insere direto — usa a RPC abaixo.
create policy "customer_insert_admin_or_owner"
  on public.customer
  for insert
  to authenticated
  with check (public.is_admin() or email = auth.email());

-- Exclusão: apenas admin.
create policy "customer_delete_admin"
  on public.customer
  for delete
  to authenticated
  using (public.is_admin());

-- 4) RPC para o funil público (EncontrarCuidador) -----------------------------
-- Executa a lógica de "insere ou atualiza + acrescenta observação" no servidor,
-- de forma controlada. Roda como SECURITY DEFINER, então não precisa expor a
-- tabela para o papel anon. Só faz esta operação específica.
create or replace function public.upsert_customer_lead(
  p_email        text,
  p_name         text,
  p_whatsapp     text,
  p_city         text,
  p_special_care text,
  p_obs_initial  text,
  p_obs_append   text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id  uuid;
  v_obs text;
begin
  -- validações mínimas para evitar abuso
  if p_email is null or length(trim(p_email)) = 0 then
    raise exception 'email obrigatório';
  end if;

  select id, observations
    into v_id, v_obs
  from public.customer
  where email = p_email
  limit 1;

  if v_id is not null then
    update public.customer
      set name         = coalesce(p_name, name),
          whatsapp     = coalesce(p_whatsapp, whatsapp),
          city         = coalesce(p_city, city),
          special_care = coalesce(p_special_care, special_care),
          observations = case
                           when v_obs is not null and length(v_obs) > 0
                             then v_obs || E'\n\n' || p_obs_append
                           else p_obs_initial
                         end,
          updated_at   = now()
      where id = v_id;
  else
    insert into public.customer (name, email, whatsapp, city, special_care, observations, status)
    values (p_name, p_email, p_whatsapp, p_city, p_special_care, p_obs_initial, 'pending');
  end if;
end;
$$;

-- Permite que visitantes (anon) e usuários logados chamem apenas esta função.
grant execute on function public.upsert_customer_lead(text, text, text, text, text, text, text)
  to anon, authenticated;

-- ============================================================================
-- IMPORTANTE — promova sua conta de admin (rode uma vez, troque o email):
--   update public.profiles
--     set user_role = 'admin'
--     where id = (select id from auth.users where email = 'SEU_EMAIL_ADMIN@dominio.com');
-- Sem isso, is_admin() retorna false e o painel /admin perde acesso aos dados.
-- ============================================================================
