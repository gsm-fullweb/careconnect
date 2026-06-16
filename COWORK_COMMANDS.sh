#!/bin/bash
# Claude Cowork - Comandos Prontos para Publicação de Blog
# Copie e cole os comandos abaixo para publicar posts automaticamente

# ============================================================================
# 🚀 PUBLICAR UM POST (Modo Rascunho - para revisar antes)
# ============================================================================

node --env-file=.env.local scripts/publish-post.mjs seu-arquivo.md

# Resultado: Post criado como 🟡 RASCUNHO
# Você pode revisar em https://www.careconnect.com.br/admin/blog e publicar

# ============================================================================
# 🔥 PUBLICAR UM POST (Modo Publicado - direto no ar)
# ============================================================================

node --env-file=.env.local scripts/publish-post.mjs seu-arquivo.md --publish

# Resultado: Post criado e 🟢 PUBLICADO imediatamente
# Disponível em https://www.careconnect.com.br/blog/seu-slug

# ============================================================================
# ✅ TESTAR SEM SALVAR (Validação)
# ============================================================================

node --env-file=.env.local scripts/publish-post.mjs seu-arquivo.md --dry-run

# Resultado: Valida o arquivo mas NÃO salva no banco
# Use para verificar título, slug, conteúdo antes de publicar

# ============================================================================
# 📝 EXEMPLO: Criar um novo post e publicar
# ============================================================================

# 1. Crie o arquivo com o conteúdo (copie example-post.md como base)
cat > meu-novo-post.md << 'EOF'
---
title: "Exemplo de Post"
slug: exemplo-de-post
excerpt: "Este é um exemplo"
cover_image: "https://unsplash.com/..."
published: false
---

# Meu Novo Post

Conteúdo aqui...
EOF

# 2. Valide o arquivo
node --env-file=.env.local scripts/publish-post.mjs meu-novo-post.md --dry-run

# 3. Publique como rascunho
node --env-file=.env.local scripts/publish-post.mjs meu-novo-post.md

# 4. Ou publique direto
node --env-file=.env.local scripts/publish-post.mjs meu-novo-post.md --publish

# ============================================================================
# 🔧 TROUBLESHOOTING
# ============================================================================

# Se receber erro sobre SUPABASE_SERVICE_ROLE_KEY:
export SUPABASE_SERVICE_ROLE_KEY="sua-chave-aqui"
node scripts/publish-post.mjs seu-arquivo.md --publish

# Se receber erro de RLS (Row Level Security):
# ❌ Verifique se está usando SERVICE_ROLE_KEY (não anon key)
# ✅ Use --env-file=.env.local (garante que a chave certa é usada)

# ============================================================================
# 📊 VERIFICAR POSTS PUBLICADOS
# ============================================================================

# Admin panel (ver todos os posts):
# https://www.careconnect.com.br/admin/blog

# Blog público (posts publicados):
# https://www.careconnect.com.br/blog

# Post individual:
# https://www.careconnect.com.br/blog/seu-slug

# ============================================================================
# 🎯 FLUXO RECOMENDADO PARA CLAUDE COWORK
# ============================================================================

# 1. Gerar Markdown:
# Claude Cowork cria arquivo posts/novo-artigo.md

# 2. Validar:
node --env-file=.env.local scripts/publish-post.mjs posts/novo-artigo.md --dry-run

# 3. Publicar:
node --env-file=.env.local scripts/publish-post.mjs posts/novo-artigo.md --publish

# 4. Confirmar:
# "✅ Post publicado em: https://www.careconnect.com.br/blog/novo-artigo"

# ============================================================================
# ⚡ UM-LINER PARA AUTOMATIZAR
# ============================================================================

# Publicar todos os .md em uma pasta:
for file in posts/*.md; do
  echo "📝 Publicando: $file"
  node --env-file=.env.local scripts/publish-post.mjs "$file" --publish
done

echo "✅ Todos os posts publicados!"

# ============================================================================
# 💡 DICA: Usar com variáveis de ambiente customizadas
# ============================================================================

# Se quiser usar uma chave diferente:
SUPABASE_URL=https://seu-projeto.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=sua-chave-alternativa \
node scripts/publish-post.mjs seu-arquivo.md --publish

# ============================================================================
