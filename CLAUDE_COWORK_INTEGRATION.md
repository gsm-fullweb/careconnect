# 🤖 Claude Cowork → CareConnect Blog Integration

**Status**: ✅ **PRONTO PARA USO**

Claude Cowork agora pode publicar posts diretamente no blog CareConnect **sem intervenção humana**.

---

## 📋 O que foi configurado

Você tem um sistema completo de publicação automática que permite:

✅ **Claude Cowork gera conteúdo em Markdown**
✅ **Automaticamente publica no blog CareConnect**  
✅ **Posts aparecem em tempo real em www.careconnect.com.br/blog**
✅ **Admin pode revisar em www.careconnect.com.br/admin/blog**

---

## 🚀 Como Usar

### Passo 1: Configurar Credenciais (Uma Única Vez)

```bash
# 1. Crie o arquivo .env.local na raiz do projeto
cp .env.local.example .env.local

# 2. Edite .env.local e adicione sua SUPABASE_SERVICE_ROLE_KEY
# (Pegue em https://app.supabase.com → Settings → API → service_role)
```

### Passo 2: Teste o Sistema

```bash
# Valide sem salvar (teste seguro)
node --env-file=.env.local scripts/publish-post.mjs example-post.md --dry-run

# Resultado esperado:
# ──────────────────────────────────────────
# Título   : Quanto Custa um Cuidador de Idosos em São Paulo...
# Slug     : quanto-custa-cuidador-idosos-sao-paulo-2026
# Status   : 🟡 RASCUNHO
# ──────────────────────────────────────────
# ✓ --dry-run: nada foi gravado.
```

### Passo 3: Publicar um Post

**Opção A: Como Rascunho** (para revisar depois)
```bash
node --env-file=.env.local scripts/publish-post.mjs seu-artigo.md
```
Post aparecerá em https://www.careconnect.com.br/admin/blog como 🟡 **Rascunho**

**Opção B: Publicado** (direto no ar)
```bash
node --env-file=.env.local scripts/publish-post.mjs seu-artigo.md --publish
```
Post aparecerá em https://www.careconnect.com.br/blog com 🟢 **Publicado**

---

## 📝 Formato de Post (Markdown)

Claude Cowork deve gerar posts assim:

```markdown
---
title: "Seu Título Aqui"
slug: seu-titulo-em-url
excerpt: "Resumo breve do artigo"
cover_image: "https://imagem.jpg"
published: false
---

# Seu Título

Conteúdo em **Markdown**...

## Seção 2
Mais conteúdo...
```

**Campos**:
- `title` *(obrigatório)*: Título do artigo
- `slug`: URL-safe (gerado automaticamente se omitido)
- `excerpt`: Resumo para listagens
- `cover_image`: URL da imagem de capa
- `published`: `true` = publicado; `false` = rascunho

---

## 🔄 Fluxo Automático do Claude Cowork

```
1. Claude Cowork recebe instrução
   "Escreva um artigo sobre cuidados com idosos"
        ↓
2. Gera posts/cuidados-idosos.md
        ↓
3. Executa: node --env-file=.env.local scripts/publish-post.mjs posts/cuidados-idosos.md --publish
        ↓
4. Post publicado em:
   https://www.careconnect.com.br/blog/cuidados-idosos
```

---

## 📁 Arquivos Criados

```
careconnect-main/
├── .env.local.example              ← Template de credenciais
├── CLAUDE_COWORK_INTEGRATION.md    ← Este arquivo
├── COWORK_BLOG_SETUP.md            ← Guia completo
├── COWORK_QUICK_START.md           ← Resumo rápido
├── COWORK_COMMANDS.sh              ← Comandos prontos
├── example-post.md                 ← Exemplo de post
│
├── scripts/
│   └── publish-post.mjs            ← Script de publicação (existente)
│
└── src/
    ├── pages/admin/BlogManagement.tsx    ← Painel admin
    └── pages/admin/BlogPostEditor.tsx    ← Editor de posts
```

---

## 🔐 Segurança

### Proteção de Credenciais

```bash
# ✅ CORRETO - Credenciais seguras
.env.local          # Não faz commit (está em .gitignore)
cat .env.local      # Nunca vaza a chave em git

# ❌ ERRADO - Risco de segurança
git add .env.local  # NUNCA!
echo "KEY=xyz" >> scripts/publish-post.mjs  # NUNCA!
```

### Regenerar Chave (se vazar)

```
1. Vá para https://app.supabase.com
2. Settings → API
3. Ao lado de "service_role", clique em "Rotate"
4. Confirme
5. Copie a nova chave para .env.local
```

---

## 🐛 Troubleshooting

### Erro: "SUPABASE_SERVICE_ROLE_KEY não configurado"

```bash
# Verifique se .env.local existe
ls -la .env.local

# Verifique o conteúdo
grep SUPABASE_SERVICE_ROLE_KEY .env.local

# Se vazio, edite e adicione a chave
```

### Erro: "Row-level security violation"

```bash
# Problema: Chave anon em vez de service_role
# Solução: Use a SERVICE_ROLE_KEY em .env.local
node --env-file=.env.local scripts/publish-post.mjs arquivo.md --publish
```

### Post não aparece no admin

```bash
# Se rodou sem --publish, ficou como rascunho
# Solução: Rode com --publish ou edite manualmente

node --env-file=.env.local scripts/publish-post.mjs arquivo.md --publish

# Verifique em: https://www.careconnect.com.br/admin/blog
```

---

## 📊 Status da Integração

| Componente | Status | Descrição |
|---|---|---|
| Script de publicação | ✅ Pronto | `publish-post.mjs` existente |
| Banco de dados | ✅ Pronto | Tabela `blog_posts` no Supabase |
| Painel admin | ✅ Pronto | `/admin/blog` funcional |
| Blog público | ✅ Pronto | `/blog` funcionando |
| Documentação | ✅ Completa | 4 arquivos de referência |

---

## 🎯 Próximas Ações

- [ ] **Hoje**: Configurar `.env.local` com credenciais
- [ ] **Hoje**: Testar com `example-post.md --dry-run`
- [ ] **Hoje**: Publicar um post teste (`--publish`)
- [ ] **Amanhã**: Instruir Claude Cowork a gerar posts
- [ ] **Semana**: Monitorar qualidade dos posts gerados
- [ ] **Depois**: Configurar automação/agendamento (opcional)

---

## 💡 Exemplos de Uso

### Claude Cowork gera um artigo sobre "Preços de Cuidadores"

```
Usuário: "Claude Cowork, escreva um artigo sobre quanto custa um cuidador em SP"

Claude Cowork:
1. Cria arquivo: artigos/precos-cuidadores-sp.md
2. Executa: node --env-file=.env.local scripts/publish-post.mjs artigos/precos-cuidadores-sp.md --publish
3. Responde: "✅ Artigo publicado em: https://www.careconnect.com.br/blog/precos-cuidadores-sp"
```

### Claude Cowork atualiza um artigo existente

```
Usuário: "Atualize o artigo sobre sinais de demência"

Claude Cowork:
1. Edita arquivo: artigos/sinais-demencia.md
2. Executa: node --env-file=.env.local scripts/publish-post.mjs artigos/sinais-demencia.md --publish
3. Resposta: "✅ Artigo atualizado em: https://www.careconnect.com.br/blog/sinais-demencia"
```

---

## 📚 Documentação Adicional

- **Guia Completo**: [COWORK_BLOG_SETUP.md](./COWORK_BLOG_SETUP.md)
- **Quick Start**: [COWORK_QUICK_START.md](./COWORK_QUICK_START.md)
- **Comandos**: [COWORK_COMMANDS.sh](./COWORK_COMMANDS.sh)
- **Exemplo de Post**: [example-post.md](./example-post.md)
- **Template .env**: [.env.local.example](./.env.local.example)

---

## ✅ Checklist de Setup

- [ ] Obtive a `SUPABASE_SERVICE_ROLE_KEY` do Supabase
- [ ] Criei o arquivo `.env.local` no projeto
- [ ] Configurei todas as variáveis de ambiente
- [ ] Testei com `node --env-file=.env.local scripts/publish-post.mjs example-post.md --dry-run`
- [ ] Publiquei um post teste com `--publish`
- [ ] Verifiquei o post em https://www.careconnect.com.br/admin/blog
- [ ] Verifiquei o post no blog público em https://www.careconnect.com.br/blog
- [ ] Instruí Claude Cowork sobre o novo sistema

---

## 🎉 Conclusão

**Claude Cowork está oficialmente conectado ao blog CareConnect!**

Agora você pode:
- ✅ Instruir Claude Cowork a gerar artigos de blog
- ✅ Posts são publicados automaticamente
- ✅ Conteúdo aparece em tempo real no site
- ✅ Admin pode revisar e editar quando necessário

---

**Configurado em**: 2026-06-16  
**Versão**: 1.0  
**Status**: ✅ PRODUÇÃO
