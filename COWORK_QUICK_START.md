# 🚀 Claude Cowork - Publicação Automática de Blog

## Resumo Ultra-Rápido

O Claude Cowork pode publicar posts automaticamente no blog CareConnect. Basta:

1. **Gerar o post em Markdown** (com frontmatter YAML)
2. **Chamar o script**: `node --env-file=.env.local scripts/publish-post.mjs seu-arquivo.md --publish`
3. **Pronto!** Post está online em https://www.careconnect.com.br/blog/seu-slug

## ✨ Exemplo de Uso

```bash
# Claude Cowork pode fazer isso:
node --env-file=.env.local scripts/publish-post.mjs novo-artigo.md --publish

# Resultado:
# ✅ Post publicado em: https://www.careconnect.com.br/blog/novo-artigo
```

## 📝 Formato Markdown (com exemplo)

```markdown
---
title: "Seu Título Aqui"
slug: seu-titulo-aqui
excerpt: "Resumo breve do post"
cover_image: "https://link-da-imagem.com/imagem.webp"
published: false
---

# Seu Título

Conteúdo em **Markdown**...

## Seção
Mais conteúdo...
```

## 🔐 Configuração Necessária

O `.env.local` já deve estar configurado com:
```env
SUPABASE_URL=https://dyxkbbojlyppizsgjjxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-chave-aqui
```

**Nota**: Este arquivo está no `.gitignore` - não será commitado.

## 🎯 Fluxo Típico do Claude Cowork

1. **Recebe instrução** para escrever um artigo sobre "Cuidados com Idosos"
2. **Cria arquivo Markdown**: `posts/cuidados-com-idosos.md`
3. **Publica automaticamente**: `node --env-file=.env.local scripts/publish-post.mjs posts/cuidados-com-idosos.md --publish`
4. **Post está online** em: `https://www.careconnect.com.br/blog/cuidados-com-idosos`
5. **Confirma sucesso** ao usuário

## 📋 Flags do Script

```bash
# Publicar como rascunho (padrão)
node --env-file=.env.local scripts/publish-post.mjs arquivo.md

# Publicar diretamente (sem aprovação)
node --env-file=.env.local scripts/publish-post.mjs arquivo.md --publish

# Testar sem salvar
node --env-file=.env.local scripts/publish-post.mjs arquivo.md --dry-run

# Ver no admin
https://www.careconnect.com.br/admin/blog
```

## 🌐 Acessar Blog Publicado

Posts publicados aparecem automaticamente em:
- **Listagem**: https://www.careconnect.com.br/blog
- **Post individual**: https://www.careconnect.com.br/blog/seu-slug

## 🔍 Verificar se Funcionou

1. Acesse https://www.careconnect.com.br/admin/blog
2. Procure pelo novo post
3. Se estiver marcado como 🟢 **Publicado** → está online!
4. Se estiver como 🟡 **Rascunho** → use `--publish` para ativar

## ❓ Dúvidas?

Leia o guia completo: [COWORK_BLOG_SETUP.md](./COWORK_BLOG_SETUP.md)

---

**Claude Cowork está pronto para publicar! 🎉**
