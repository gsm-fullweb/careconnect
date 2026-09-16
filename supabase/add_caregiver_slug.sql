-- 1. Adicionar a coluna slug à tabela caregivers
ALTER TABLE public.caregivers ADD COLUMN slug text UNIQUE;

-- 2. Criar uma função para gerar o slug (simplificada para o banco de dados)
-- Essa função troca espaços por hifens e remove acentos básicos (usando unaccent, se a extensão estiver ativa, senão usa replace)
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION generate_slug(name text) RETURNS text AS $$
BEGIN
  RETURN lower(regexp_replace(unaccent(name), '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- 3. Atualizar os registros existentes com o slug baseado no nome
UPDATE public.caregivers 
SET slug = generate_slug(name)
WHERE slug IS NULL;

-- 4. Criar uma trigger para atualizar o slug automaticamente antes de insert/update
CREATE OR REPLACE FUNCTION set_caregiver_slug()
RETURNS trigger AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.name);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_caregiver_slug
BEFORE INSERT OR UPDATE OF name
ON public.caregivers
FOR EACH ROW
EXECUTE FUNCTION set_caregiver_slug();
