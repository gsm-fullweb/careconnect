-- ============================================================================
-- CareConnect — Consistência de cadastro + robustez do painel admin
-- Data: 13/07/2026
--
-- Este migration cobre três correções da revisão geral:
--   6) Painel admin não abre: garante que o usuário consiga LER o próprio
--      registro em public.profiles (necessário para is_admin() e para o
--      ProtectedRoute liberar o acesso).
--   7) Exclusão de cliente "falha silenciosa": cria a RPC admin_delete_customer
--      que remove a linha e RETORNA quantas linhas foram afetadas, para o
--      frontend distinguir "excluído" de "bloqueado pela RLS / não encontrado".
--   8) Campos vazios no admin (CEP, nascimento, endereço): estende a RPC
--      upsert_customer_lead para aceitar e gravar esses campos, mantendo
--      compatibilidade com o funil já existente.
--
-- Seguro de reexecutar (idempotente).
-- ============================================================================

-- 6) profiles: leitura do próprio registro + admin -----------------------------
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid() or public.is_admin());

-- 7) Exclusão de cliente com verificação de linhas afetadas --------------------
create or replace function public.admin_delete_customer(p_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted integer;
begin
  if not public.is_admin() then
    raise exception 'Apenas administradores podem excluir clientes.';
  end if;

  delete from public.customer where id = p_id;
  get diagnostics v_deleted = row_count;
  return v_deleted;  -- 0 = nada excluído (id inexistente); >=1 = excluído
end;
$$;

grant execute on function public.admin_delete_customer(uuid) to authenticated;

-- 8) upsert_customer_lead com campos adicionais --------------------------------
-- Remove a versão antiga (7 parâmetros) ANTES de criar a nova (11 parâmetros).
-- Se as duas coexistissem, uma chamada com os 7 nomes originais ficaria
-- AMBÍGUA para o Postgres ("function is not unique"), quebrando o chatbot.
drop function if exists public.upsert_customer_lead(text, text, text, text, text, text, text);

-- Nova assinatura: acrescenta birth_date, cep, address, state (todos opcionais),
-- então as chamadas antigas de 7 argumentos continuam funcionando.
create or replace function public.upsert_customer_lead(
  p_email        text,
  p_name         text,
  p_whatsapp     text,
  p_city         text,
  p_special_care text,
  p_obs_initial  text,
  p_obs_append   text,
  p_birth_date   date default null,
  p_cep          text default null,
  p_address      text default null,
  p_state        text default null
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
          birth_date   = coalesce(p_birth_date, birth_date),
          cep          = coalesce(p_cep, cep),
          address      = coalesce(p_address, address),
          state        = coalesce(p_state, state),
          observations = case
                           when v_obs is not null and length(v_obs) > 0
                             then v_obs || E'\n\n' || p_obs_append
                           else p_obs_initial
                         end,
          updated_at   = now()
      where id = v_id;
  else
    insert into public.customer
      (name, email, whatsapp, city, special_care, birth_date, cep, address, state, observations, status)
    values
      (p_name, p_email, p_whatsapp, p_city, p_special_care, p_birth_date, p_cep, p_address, p_state, p_obs_initial, 'pending');
  end if;
end;
$$;

grant execute on function public.upsert_customer_lead(text, text, text, text, text, text, text, date, text, text, text)
  to anon, authenticated;
