-- ============================================================================
-- CareConnect - Blindagem Server-Side (Busca e Avaliações)
-- Data: 31/08/2026
-- ============================================================================

-- 1. VIEW PARA CUIDADORES (Protegendo colunas privadas e bloqueando inativos)
CREATE OR REPLACE VIEW public.vw_cuidadores_publicos AS
SELECT 
    id, 
    nome, 
    cidade, 
    cargo, 
    experiencia, 
    disponibilidade_horarios, 
    descricao_experiencia
FROM public.candidatos_cuidadores_rows
WHERE (status_candidatura ILIKE 'aprovado') 
  AND (ativo ILIKE 'sim' OR ativo ILIKE 'true');

-- Conceder permissão de leitura
GRANT SELECT ON public.vw_cuidadores_publicos TO authenticated;
GRANT SELECT ON public.vw_cuidadores_publicos TO anon;

-- 2. INTEGRIDADE DAS AVALIAÇÕES (Testimonials)

-- Impede que o mesmo cliente avalie o mesmo cuidador mais de uma vez
ALTER TABLE public.testimonials 
DROP CONSTRAINT IF EXISTS unique_customer_caregiver_review;

ALTER TABLE public.testimonials 
ADD CONSTRAINT unique_customer_caregiver_review UNIQUE (customer_id, caregiver_id);

-- RLS Policies para Testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Permite leitura de avaliações aprovadas ou próprias
DROP POLICY IF EXISTS "public_select_testimonials" ON public.testimonials;
CREATE POLICY "public_select_testimonials"
  ON public.testimonials
  FOR SELECT
  TO authenticated, anon
  USING (published = true OR customer_id = auth.uid());

-- Permite inserção segura (somente o próprio autor e forçando published = false)
DROP POLICY IF EXISTS "customer_insert_testimonials" ON public.testimonials;
CREATE POLICY "customer_insert_testimonials"
  ON public.testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (
    customer_id = auth.uid() 
    AND published = false
  );
