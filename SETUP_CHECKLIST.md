# ✅ Claude Cowork → Blog CareConnect - Setup Checklist

Use este checklist para confirmar que tudo está configurado corretamente.

---

## 📋 Phase 1: Obter Credenciais

- [ ] **Acessei Supabase**
  - URL: https://app.supabase.com
  - Selecionei projeto "careconnect"

- [ ] **Obtive SUPABASE_URL**
  - Fui em: Settings → API → Project URL
  - Copiei URL (deve ser: `https://dyxkbbojlyppizsgjjxx.supabase.co`)

- [ ] **Obtive SUPABASE_SERVICE_ROLE_KEY**
  - Fui em: Settings → API → Service Role (secret)
  - ⚠️ **Confirmei que é a chave "service_role" (não anon)**
  - Copiei a chave inteira (muito longa, começa com `eyJ...`)

---

## 📝 Phase 2: Configurar .env.local

- [ ] **Criei arquivo .env.local**
  ```bash
  cp .env.local.example .env.local
  ```

- [ ] **Editei .env.local**
  - Abri o arquivo em um editor
  - Substituí as placeholders com minhas credenciais reais:
    ```env
    SUPABASE_URL=https://dyxkbbojlyppizsgjjxx.supabase.co
    SUPABASE_SERVICE_ROLE_KEY=eyJ... (sua chave aqui)
    ```

- [ ] **Confirmei que .env.local está no .gitignore**
  - O arquivo `.env.local` NÃO será commitado
  - É específico da minha máquina

---

## 🧪 Phase 3: Testar o Sistema

- [ ] **Testei validação (dry-run)**
  ```bash
  node --env-file=.env.local scripts/publish-post.mjs example-post.md --dry-run
  ```
  - Resultado esperado: Mostra os dados do post SEM salvar

- [ ] **Testei publicação como rascunho**
  ```bash
  node --env-file=.env.local scripts/publish-post.mjs example-post.md
  ```
  - Post foi criado
  - Apareceu em https://www.careconnect.com.br/admin/blog como 🟡 **Rascunho**

- [ ] **Testei publicação direta**
  ```bash
  node --env-file=.env.local scripts/publish-post.mjs example-post.md --publish
  ```
  - Post foi criado
  - Apareceu em https://www.careconnect.com.br/admin/blog como 🟢 **Publicado**
  - Verificar em: https://www.careconnect.com.br/blog/seu-slug

---

## 📚 Phase 4: Revisar Documentação

Leia estes documentos na ordem:

- [ ] **COWORK_QUICK_START.md** (2 min)
  - Resumo super rápido do sistema

- [ ] **COWORK_COMMANDS.sh** (5 min)
  - Comandos prontos para copiar e colar

- [ ] **COWORK_BLOG_SETUP.md** (10 min)
  - Guia completo com tudo explicado

- [ ] **CLAUDE_COWORK_INTEGRATION.md** (5 min)
  - Status da integração e próximos passos

---

## 🤖 Phase 5: Instruir Claude Cowork

- [ ] **Preparei as instruções para Claude Cowork**

Claude Cowork pode agora:
```
"Escreva um artigo sobre [tema] e publique automaticamente no blog CareConnect"
```

Claude Cowork saberá:
1. Criar arquivo Markdown com frontmatter YAML
2. Usar: `node --env-file=.env.local scripts/publish-post.mjs arquivo.md --publish`
3. Post aparecerá em tempo real no blog

---

## 🔒 Phase 6: Segurança

- [ ] **Confirmei segurança das credenciais**
  - [ ] .env.local está APENAS na minha máquina
  - [ ] .env.local NÃO foi commitado no git
  - [ ] SUPABASE_SERVICE_ROLE_KEY não foi compartilhada
  - [ ] Confirmei que .gitignore inclui `.env.local`

- [ ] **Tenho um plano de emergency**
  - Se a chave vazar, vou para https://app.supabase.com
  - Clico em Settings → API → Rotate na "service_role"
  - Atualizarei .env.local com a nova chave

---

## 📊 Phase 7: Validação Final

Execute este comando para confirmar tudo funciona:

```bash
# Teste completo
node --env-file=.env.local scripts/publish-post.mjs example-post.md --dry-run

# Esperado: Output mostrando dados do post
```

Resultados esperados:
- ✅ Script executa sem erros
- ✅ Mostra título, slug, status (rascunho)
- ✅ Mensagem: "✓ --dry-run: nada foi gravado"

---

## 🎯 Próximas Ações Após Setup

1. **Instruir Claude Cowork**
   - Explique que pode gerar artigos e publicar
   - Mostre o exemplo de uso

2. **Monitorar Qualidade**
   - Revise os posts gerados no admin
   - Verifique no blog público

3. **Otimizar Fluxo** (opcional)
   - Criar temas automáticos
   - Agendar publicações
   - Gerar múltiplos posts por dia

4. **Escalabilidade**
   - Implementar rate limiting
   - Adicionar aprovação manual (opcional)
   - Integrar com outras ferramentas

---

## ❓ Problemas Comuns

### "SUPABASE_SERVICE_ROLE_KEY não está configurada"
```bash
# Solução:
# 1. Verifique se .env.local existe: ls .env.local
# 2. Verifique conteúdo: cat .env.local | grep SUPABASE
# 3. Se vazio, edite o arquivo e adicione a chave
```

### "Row-level security violation"
```bash
# Solução:
# 1. Use --env-file=.env.local (garante chave correta)
# 2. Verifique que é SERVICE_ROLE_KEY (não anon)
# 3. Regenere a chave no Supabase se necessário
```

### "Post não aparece no admin"
```bash
# Se rodou sem --publish:
node --env-file=.env.local scripts/publish-post.mjs arquivo.md --publish

# Verifique em:
# https://www.careconnect.com.br/admin/blog
```

---

## 📞 Suporte Rápido

| Problema | Solução |
|---|---|
| "Chave não funciona" | Regenere em Supabase Settings → API |
| "Post não salva" | Use `--env-file=.env.local` |
| "Não vejo o post" | Verifique admin em `.careconnect.com.br/admin/blog` |
| "Erro de RLS" | Verifique que é SERVICE_ROLE_KEY |

---

## ✨ Conclusão

Após completar todos estes steps, você terá:

✅ Sistema funcionando  
✅ Claude Cowork pronto para publicar  
✅ Credenciais seguras  
✅ Documentação completa  
✅ Plano de backup (regenerar chave se vazar)  

---

**Data de Setup**: _______________

**Quem configurou**: _______________

**Confirmação**: Tudo funciona ✅

---

Pronto para começar com Claude Cowork publicando artigos! 🚀
