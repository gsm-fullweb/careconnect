# 🤖 Claude Cowork - Blog CareConnect Integration

**✅ CONFIGURAÇÃO COMPLETA - PRONTO PARA USO**

---

## O que é isso?

Você agora tem um **sistema automático de publicação de blog**. 

O Claude Cowork pode:
- Gerar artigos em Markdown
- Publicar diretamente no blog CareConnect
- Tudo sem intervenção humana

**Exemplo**:
```
Você: "Claude Cowork, escreva um artigo sobre quanto custa um cuidador"
Claude Cowork: ✅ "Artigo publicado em: https://www.careconnect.com.br/blog/..."
```

---

## 🚀 Comece em 2 Minutos

### 1. Configure suas credenciais (uma vez)

```bash
# Crie o arquivo de configuração
cp .env.local.example .env.local

# Edite e adicione sua chave (pegue em https://app.supabase.com)
SUPABASE_SERVICE_ROLE_KEY=sua_chave_aqui
```

### 2. Teste o sistema

```bash
# Validar (teste seguro)
node --env-file=.env.local scripts/publish-post.mjs example-post.md --dry-run

# Publicar
node --env-file=.env.local scripts/publish-post.mjs example-post.md --publish
```

### 3. Verificar

Acesse: https://www.careconnect.com.br/blog/seu-slug

---

## 📚 Documentação

**Leia nessa ordem:**

1. **[COWORK_DOCS_INDEX.md](./COWORK_DOCS_INDEX.md)** ← Mapa de documentação
2. **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** ← Passo a passo (comece aqui!)
3. **[COWORK_QUICK_START.md](./COWORK_QUICK_START.md)** ← Resumo rápido
4. **[COWORK_BLOG_SETUP.md](./COWORK_BLOG_SETUP.md)** ← Guia completo

---

## 📁 Arquivos Criados

```
✅ SETUP_CHECKLIST.md              (Checklist de configuração)
✅ COWORK_DOCS_INDEX.md            (Índice de documentação)
✅ COWORK_QUICK_START.md           (Resumo em 2 minutos)
✅ COWORK_BLOG_SETUP.md            (Guia completo)
✅ COWORK_COMMANDS.sh              (Comandos prontos)
✅ CLAUDE_COWORK_INTEGRATION.md    (Status & próximos passos)
✅ example-post.md                 (Exemplo de post em Markdown)
✅ .env.local.example              (Template de credenciais)
✅ COWORK_README.md                (Este arquivo)
✅ package.json                    (Atualizado com npm script)
```

---

## ⚡ Comando Essencial

```bash
# Publicar um post
node --env-file=.env.local scripts/publish-post.mjs seu-artigo.md --publish
```

Pronto! Seu artigo está em: **https://www.careconnect.com.br/blog/seu-artigo**

---

## 🎯 Próximas Ações

1. **Agora**: Ler [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
2. **Hoje**: Completar a checklist (15 min)
3. **Hoje**: Testar com `example-post.md`
4. **Amanhã**: Instruir Claude Cowork a gerar posts
5. **Semana**: Monitorar qualidade

---

## 🔒 Segurança

- ✅ Credenciais em `.env.local` (não faz commit)
- ✅ Chave de serviço bem protegida
- ✅ Nunca compartilhe a chave
- ✅ Se vazar: regenere em Supabase Settings

---

## ❓ Dúvida Rápida?

| Pergunta | Resposta |
|---|---|
| Por onde começo? | [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) |
| Qual é o comando? | `node --env-file=.env.local scripts/publish-post.mjs arquivo.md --publish` |
| Onde obtenho a chave? | https://app.supabase.com → Settings → API |
| Dá erro? | Veja troubleshooting em [COWORK_BLOG_SETUP.md](./COWORK_BLOG_SETUP.md) |

---

## ✨ Pronto!

Sistema está **100% configurado**. Você pode:

✅ Gerar artigos com Claude Cowork  
✅ Publicar automaticamente no blog  
✅ Posts aparecem em tempo real  
✅ Admin pode revisar quando quiser  

---

**Para começar**: Leia [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) agora! 🚀
