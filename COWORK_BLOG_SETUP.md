# ⚡ Claude Cowork → CareConnect Blog Integration

**Objetivo**: Permitir que Claude Cowork publique posts diretamente no blog CareConnect sem intervenção humana.

---

## 📋 Pré-requisitos

1. **Acesso ao Supabase**: Você precisa da chave de serviço (Service Role Key)
2. **Node.js/npm**: Instalado na máquina onde roda Claude Cowork
3. **Projeto clonado**: `site-careconnect-2026`

---

## 🔧 Configuração em 3 passos

### Passo 1: Obter a Service Role Key

1. Acesse: https://app.supabase.com → Projects → careconnect
2. Vá em: **Settings** → **API** 
3. Copie a chave **service_role** (não é a anon key!)
4. ⚠️ **Nunca compartilhe essa chave** - ela permite escrever no banco

### Passo 2: Criar arquivo `.env.local`

Na pasta raiz do projeto (`careconnect-main/`), crie um arquivo `.env.local`:

```env
SUPABASE_URL=https://dyxkbbojlyppizsgjjxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
BLOG_AUTHOR_ID=seu-uuid-aqui-opcional
```

⚠️ **Este arquivo já está no `.gitignore` - nunca será commitado**

### Passo 3: Instalar Dependências

```bash
cd C:\Users\Richard Wagner\Documents\site-careconnect-2026\careconnect-main
npm install
```

---

## 🚀 Usando o Script de Publicação

O projeto já tem um script pronto: `scripts/publish-post.mjs`

### Comando Básico

```bash
node --env-file=.env.local scripts/publish-post.mjs seu-arquivo.md
```

### Exemplos

**Criar post como rascunho** (padrão):
```bash
node --env-file=.env.local scripts/publish-post.mjs meu-post.md
```

**Publicar diretamente** (sem aprovação):
```bash
node --env-file=.env.local scripts/publish-post.mjs meu-post.md --publish
```

**Modo teste** (não salva):
```bash
node --env-file=.env.local scripts/publish-post.mjs meu-post.md --dry-run
```

---

## 📝 Formato do Arquivo Markdown

Crie um arquivo `.md` com frontmatter YAML:

```markdown
---
title: "Quanto Custa um Cuidador de Idosos em São Paulo"
slug: quanto-custa-cuidador-idosos-sao-paulo
excerpt: "Guia completo de preços por tipo de serviço e região"
cover_image: "https://exemplo.com/imagem.webp"
published: false
---

# Título do Artigo

Seu conteúdo em **Markdown** aqui...

## Seção 2
Mais conteúdo...
```

**Campos disponíveis no frontmatter:**
- `title` *(obrigatório)*: Título do post
- `slug`: URL-friendly identifier (gerado automaticamente se omitido)
- `excerpt`: Resumo para listagem
- `cover_image`: URL da imagem de capa
- `published`: `true` para publicar imediatamente (padrão: `false` = rascunho)

---

## 🤖 Integrando com Claude Cowork

Quando Claude Cowork quiser publicar um post:

### Opção 1: Gerar Markdown e Publicar

Claude Cowork executa:
```bash
node --env-file=.env.local scripts/publish-post.mjs caminho/novo-post.md --publish
```

### Opção 2: Criar Posts Manualmente

Se preferir, gere o Markdown em um arquivo, depois execute o script.

### Opção 3: Usar Script Node Customizado (Avançado)

Crie um script Node que chame diretamente a API do Supabase:

```javascript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const post = {
  title: "Novo Post",
  slug: "novo-post",
  content: "<p>Conteúdo em HTML</p>",
  published: true,
  updated_at: new Date().toISOString()
};

const { data, error } = await supabase
  .from("blog_posts")
  .insert(post);

if (error) throw error;
console.log("✓ Post publicado!", data);
```

---

## ✅ Verificar se Funcionou

1. Acesse: https://www.careconnect.com.br/admin/blog
2. Você deve ver um **novo post** como:
   - 🟡 **Rascunho** (se sem `--publish`)
   - 🟢 **Publicado** (se com `--publish`)
3. O post está automaticamente online em: `https://www.careconnect.com.br/blog/seu-slug`

---

## 🔐 Segurança

### O que NÃO fazer:
- ❌ Nunca compartilhe a `SUPABASE_SERVICE_ROLE_KEY`
- ❌ Nunca commithe o `.env.local` (já está no .gitignore)
- ❌ Nunca exponha a chave em logs ou mensagens

### O que fazer:
- ✅ Guarde a `.env.local` segura
- ✅ Regenere a chave no Supabase se achar comprometida
- ✅ Use `--dry-run` para testar antes de publicar

---

## 🐛 Troubleshooting

### "SUPABASE_SERVICE_ROLE_KEY não configurado"
```bash
# Verifique se o .env.local existe e está correto
cat .env.local | grep SUPABASE_SERVICE_ROLE_KEY

# Ou exporte a variável:
export SUPABASE_SERVICE_ROLE_KEY=sua-chave-aqui
node scripts/publish-post.mjs seu-arquivo.md
```

### "Row-level security violation"
Você está usando a chave anon? Use a **service_role** em vez disso.
```bash
# ❌ ERRADO
node scripts/publish-post.mjs arquivo.md

# ✅ CERTO
node --env-file=.env.local scripts/publish-post.mjs arquivo.md
```

### Post não aparece no admin
- Rodou sem `--publish`? Então está como rascunho
- Verifique se aparece em https://www.careconnect.com.br/admin/blog
- Edite e publique manualmente, ou rode novamente com `--publish`

---

## 📚 Estrutura de Arquivos

```
careconnect-main/
├── .env.local                    ← Suas credenciais (NÃO COMMIT)
├── scripts/
│   └── publish-post.mjs          ← Script de publicação (pronto!)
├── COWORK_BLOG_SETUP.md         ← Este arquivo
└── src/
    ├── pages/admin/BlogManagement.tsx
    └── pages/admin/BlogPostEditor.tsx
```

---

## 🎯 Próximos Passos

- [ ] Obter a Service Role Key do Supabase
- [ ] Criar `.env.local` com as credenciais
- [ ] Testar com `npm run publish:post` (script já existe!)
- [ ] Configurar Claude Cowork para chamar o script
- [ ] Verificar posts em https://www.careconnect.com.br/admin/blog
- [ ] Configurar automação/agendamento se necessário

---

## 📞 Suporte

Se tiver dúvidas:
1. Verifique o `.env.local` está correto
2. Use `--dry-run` para testar sem salvar
3. Consulte logs do Supabase em: https://app.supabase.com → Logs
4. Verifique se a Service Role Key não expirou

---

**Criado para**: Integração automática Claude Cowork → CareConnect Blog  
**Data**: 2026-06-16  
**Versão**: 1.0
