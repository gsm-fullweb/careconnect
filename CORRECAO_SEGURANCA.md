# Correção de segurança crítica — CareConnect

Data: 11/07/2026

## O que estava errado

1. **Vazamento de dados de clientes (LGPD).** A tabela `public.customer` tinha RLS
   ligado, mas com políticas abertas (`TO public USING (true)`) para SELECT, INSERT
   e UPDATE. Como o `anon key` fica no bundle do site, **qualquer pessoa** conseguia
   ler e alterar nome, e-mail, WhatsApp, CEP, endereço, data de nascimento e dados de
   cuidado de todos os clientes.

2. **Painel admin sem checagem de papel.** O `ProtectedRoute` só verificava se o
   usuário estava logado — qualquer cuidador/cliente cadastrado abria a UI de `/admin/*`.

## O que foi corrigido

| Arquivo | Mudança |
|---|---|
| `supabase/migrations/20260711120000_secure_customer_rls.sql` | Cria `is_admin()`, remove as políticas abertas, aplica políticas restritas (admin ou dono) e cria a RPC `upsert_customer_lead` para o funil público. |
| `src/pages/EncontrarCuidador.tsx` | Deixa de ler/gravar a tabela `customer` de forma anônima; passa a chamar a RPC segura. |
| `src/components/admin/ProtectedRoute.tsx` | Passa a exigir papel de **admin** (via `isAdminUser`), não só sessão. |

## Como aplicar (ordem importa)

1. **Rode a migration no Supabase** (SQL Editor ou `supabase db push`):
   `supabase/migrations/20260711120000_secure_customer_rls.sql`

2. **Promova sua conta de admin** (o painel usa `is_admin()`; sem isso você perde
   acesso aos dados). No SQL Editor, troque o e-mail e execute:
   ```sql
   update public.profiles
     set user_role = 'admin'
     where id = (select id from auth.users where email = 'SEU_EMAIL_ADMIN@dominio.com');
   ```

3. **Faça o deploy do frontend** logo em seguida (as duas mudanças de `.tsx`).
   O funil `EncontrarCuidador` depende da RPC criada no passo 1.

## Como validar

- Logado como **cliente/cuidador**, tente abrir `/admin` → deve redirecionar ao login.
- Logado como **admin**, o painel de clientes deve listar normalmente.
- Faça um teste no fluxo `/encontrar-cuidador` → o lead deve ser gravado (via RPC).
- Com o `anon key` (deslogado), tentar `select * from customer` deve retornar vazio.
  O script `test-rls.js` do projeto serve para esse teste.

## Impacto / riscos

- **Preserva** todos os fluxos: painel admin, painel do cliente e captação de leads.
- Se o passo 2 não for feito, o admin fica sem acesso aos dados (corrige-se rodando o SQL).
- Ordem: rode o SQL **antes ou junto** do deploy do frontend para não abrir uma janela
  com o funil quebrado.

## Ainda recomendado (não crítico, fica para depois)

- **Auditar as demais tabelas** (`candidatos_cuidadores_rows`, `profiles`, `testimonials`,
  `partners`, blog) — provavelmente têm políticas abertas parecidas. Query para revisar:
  ```sql
  select tablename, policyname, cmd, roles, qual, with_check
  from pg_policies where schemaname = 'public' order by tablename;
  ```
- Remover lixo versionado: `test-supabase*.js`, `_ptest*.mjs`, `package.json.bak`,
  `bkp.tsx`, `build_error.txt`, config morta do Next (`next.config.js`, `next-env.d.ts`).
