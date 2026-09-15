-- Script para criar a tabela "customer" e suas políticas RLS

CREATE TABLE IF NOT EXISTS public.customer (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  whatsapp text,
  birth_date date,
  cep text,
  address text,
  city text NOT NULL,
  state text,
  has_children boolean DEFAULT false,
  smoker boolean DEFAULT false,
  necessity text,
  special_care text,
  observations text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT customer_pkey PRIMARY KEY (id)
);

-- Ativar Row Level Security (RLS)
ALTER TABLE public.customer ENABLE ROW LEVEL SECURITY;

-- Política: Permitir leitura para usuários autenticados (ou todos, se for o caso público)
CREATE POLICY "Enable read access for all users" ON "public"."customer"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Política: Permitir inserção 
CREATE POLICY "Enable insert access for all users" ON "public"."customer"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);

-- Política: Permitir atualização
CREATE POLICY "Enable update access for all users" ON "public"."customer"
AS PERMISSIVE FOR UPDATE
TO public
USING (true);

-- Trigger para atualizar `updated_at` automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.customer;
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.customer
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();
