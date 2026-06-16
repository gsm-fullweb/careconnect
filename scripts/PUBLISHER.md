# Publicador de posts no blog (Supabase)

Publica posts em Markdown direto na tabela `blog_posts` do Supabase, sem abrir o painel.

## Como funciona
- Lê um `.md` com frontmatter, converte o corpo para HTML (`marked`) e faz **upsert pelo `slug`** (cria se não existir, atualiza se já existir).
- **Padrão = rascunho** (`published=false`). Só publica de verdade com `--publish`.
- Usa a **service_role key** do Supabase (necessária por causa do RLS).

## Pré-requisitos (uma vez)
1. Node 20.6+ (para suportar `--env-file`). Confira com `node -v`.
2. Crie seu `.env` na raiz do projeto:
   ```bash
   cp scripts/publisher.env.example .env
   ```
3. No `.env`, cole a `SUPABASE_SERVICE_ROLE_KEY` (Supabase → Project Settings → API → service_role).
   O `.env` já está no `.gitignore` — a chave não vai para o git.

## Uso
```bash
# Teste sem gravar nada (recomendado na primeira vez)
node --env-file=.env scripts/publish-post.mjs ../quanto-custa-cuidador-idosos-mogi-das-cruzes.md --dry-run

# Salva como rascunho (revisar no painel antes de publicar)
node --env-file=.env scripts/publish-post.mjs ../meu-post.md

# Publica de verdade
node --env-file=.env scripts/publish-post.mjs ../meu-post.md --publish
```

Atalho via npm (faz o mesmo, sem precisar lembrar do `--env-file`):
```bash
npm run publish:post -- ../meu-post.md --dry-run
npm run publish:post -- ../meu-post.md --publish
```

## Frontmatter do post
```markdown
---
title: "Quanto custa um cuidador de idosos em Mogi das Cruzes"
slug: quanto-custa-cuidador-idosos-mogi-das-cruzes
excerpt: "Veja preços de 2026 por diária, mensalista, noturno e 24h."
cover_image: https://www.careconnect.com.br/capas/mogi-custo.webp
published: false
---

# Quanto custa um cuidador de idosos em Mogi das Cruzes?

Conteúdo em **markdown** aqui...
```
- `title` é o único obrigatório (se faltar, o script usa o primeiro `# H1`).
- `slug` é opcional — se faltar, é gerado a partir do título.
- `published` no frontmatter é ignorado quando você passa `--publish` (a flag vence).

## Segurança
- A **service_role key bypassa o RLS** — trate como senha. Nunca faça commit dela.
- O script nunca grava a chave em arquivo; ele lê do ambiente.
- Comece sempre com `--dry-run`, depois rascunho, e só então `--publish`.

## Lembrete de SEO
Publicar não basta para indexar. O Bloco A (canonical, sitemap, www) já foi feito — falta concluir o Bloco C: deploy, solicitar indexação no Search Console e validar com `site:www.careconnect.com.br/blog` antes de escalar para as páginas de cidade.
