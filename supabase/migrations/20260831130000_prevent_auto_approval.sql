-- ============================================================================
-- CareConnect - Bloqueio de Autoaprovação e Autoativação
-- Data: 31/08/2026
-- ============================================================================

-- 1. TRIGGER PARA PROTEGER CAMPOS ADMINISTRATIVOS
-- Esta função força o status inicial para candidatos recém-criados
-- e impede a alteração de status/ativo por usuários não administradores.

CREATE OR REPLACE FUNCTION public.enforce_caregiver_status()
RETURNS trigger AS $$
BEGIN
  -- Se o usuário atual for admin, permitimos qualquer alteração (retorna NEW)
  IF public.is_admin() THEN
    RETURN NEW;
  END IF;

  -- Se não for admin, estamos lidando com um candidato (frontend/API)
  IF TG_OP = 'INSERT' THEN
    -- Na inserção, forçamos o estado inicial seguro, ignorando o payload
    NEW.status_candidatura := 'Em análise';
    NEW.ativo := 'Não';
  ELSIF TG_OP = 'UPDATE' THEN
    -- Na atualização, impedimos que o candidato altere seu próprio status ou ativo
    -- Mantemos os valores originais da linha (OLD) para essas colunas restritas
    NEW.status_candidatura := OLD.status_candidatura;
    NEW.ativo := OLD.ativo;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Associa a trigger à tabela de candidatos
DROP TRIGGER IF EXISTS trg_enforce_caregiver_status ON public.candidatos_cuidadores_rows;
CREATE TRIGGER trg_enforce_caregiver_status
  BEFORE INSERT OR UPDATE ON public.candidatos_cuidadores_rows
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_caregiver_status();

-- 2. RLS POLICY PARA INSERT
-- Garante que um usuário autenticado possa criar o próprio cadastro se tiver logado.
-- (Assumindo que a policy não existisse formalmente no repositório)
DROP POLICY IF EXISTS "caregiver_insert_own_profile" ON public.candidatos_cuidadores_rows;
CREATE POLICY "caregiver_insert_own_profile"
  ON public.candidatos_cuidadores_rows
  FOR INSERT
  TO authenticated
  WITH CHECK (email = auth.jwt() ->> 'email');
