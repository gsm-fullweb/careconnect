# 📝 Modelo de Post - Claude Cowork

Você já tem um excelente modelo de post em:
```
posts/quanto-custa-cuidador-idosos-mogi-das-cruzes.md
```

Este documento explica como Claude Cowork deve **gerar posts similares** para outras cidades e regiões.

---

## 📋 Estrutura do Post (Análise do Modelo)

O post segue este padrão:

### 1. **Frontmatter YAML**
```yaml
---
title: "Quanto Custa um Cuidador de Idosos em [CIDADE] em 2026"
slug: quanto-custa-cuidador-idosos-[cidade]
excerpt: "Quanto custa um cuidador de idosos em [CIDADE] em 2026? Veja preços de diária, mensalista, noturno e 24h..."
published: false
---
```

### 2. **Introdução Impactante**
- Abre com números reais (faixa de preços)
- Explica o que afeta o valor
- Promete tabela de preços

### 3. **Tabela de Preços**
```markdown
| Modelo de contratação | Faixa de preço (2026) | Observação |
|---|---|---|
| Diária (plantão 12h diurno) | R$ XXX a R$ XXX / dia | ... |
| ...
```

**Nota**: Os valores devem ser ajustados por cidade (Mogi é mais barata que SP capital)

### 4. **Seções Principais**
1. Tabela de preços
2. O que faz variar
3. Quanto ganha um cuidador
4. Comparação (diária vs mensalista vs 24h)
5. Aviso importante (cuidado 24h exige 2+ cuidadores)
6. Como economizar
7. Call-to-action (WhatsApp/CareConnect)
8. FAQ (Perguntas Frequentes)
9. Conclusão

### 5. **CTA e Fechamento**
- Sempre termina com chamada para WhatsApp/CareConnect
- Posiciona como solução da empresa

---

## 🚀 Como Claude Cowork Deve Gerar Posts

### Template para Replicar

```markdown
---
title: "Quanto Custa um Cuidador de Idosos em [CIDADE] em 2026"
slug: quanto-custa-cuidador-idosos-[cidade-slug]
excerpt: "Quanto custa um cuidador de idosos em [CIDADE] em 2026? Veja preços de diária, mensalista, noturno e 24h."
published: false
---

# Quanto Custa um Cuidador de Idosos em [CIDADE]?

**Em 2026, contratar um cuidador de idosos em [CIDADE] custa, em média, de R$ XXX a R$ XXX por diária...** [ADAPTAR VALORES E CONTEÚDO]

[SEÇÕES]

**Fale agora no WhatsApp e receba um orçamento sem compromisso para [CIDADE].** A CareConnect conecta sua família a cuidadores qualificados e verificados da região, com agilidade e preço justo.
```

---

## 🌍 Cidades para Gerar Posts

Utilize este modelo para gerar posts de outras cidades:

- [ ] Mogi das Cruzes ✅ (já existe)
- [ ] Suzano
- [ ] Poá
- [ ] Itaquaquecetuba
- [ ] Guarulhos
- [ ] São Paulo (Capital)
- [ ] Santo André
- [ ] São Bernardo do Campo
- [ ] Diadema
- [ ] Osasco
- [ ] Barueri
- [ ] Salesópolis
- [ ] Arujá
- [ ] Biritiba Mirim

---

## 💡 Padrão Observado no Modelo

**Características do post sobre Mogi das Cruzes:**

✅ **Estratégia de SEO**: 
- Título com "Quanto Custa" (fácil de rankear)
- Inclui cidade e ano (2026)
- Slug otimizado

✅ **Conteúdo Informativo**:
- Começa com números concretos
- Tabela comparativa
- FAQ com perguntas reais
- Explicações contextualizadas

✅ **Call-to-Action**:
- WhatsApp (conversível)
- Posiciona CareConnect como solução
- Oferece "estimativa personalizada"

✅ **Estrutura Lógica**:
- Introdução → Números → Tabela → Contexto → FAQ → CTA

---

## 🎯 Para Claude Cowork: Instruções de Geração

### Quando gerar um novo post:

```
Instrução: "Gere um post seguindo o modelo de Mogi das Cruzes, 
mas para a cidade de [NOVA_CIDADE]. 

Adapte:
1. Título: substitua Mogi por [CIDADE]
2. Slug: use formato quanto-custa-cuidador-idosos-[cidade]
3. Preços: ajuste valores baseado em pesquisa de mercado
4. Regiões mencionadas: adapte para cidades vizinhas
5. Mantém estrutura: Intro → Tabela → Contexto → FAQ → CTA
6. Keep: confiança, tom informativo, posicionamento CareConnect"
```

### Variáveis a Ajustar por Cidade:

- **Título**: Substitua [CIDADE]
- **Slug**: Use [cidade-slug] em minúsculas
- **Preços**: Pesquise valores de mercado locais
  - SP Capital: 10-20% mais caro
  - Interior/ABC: 5-15% mais barato
  - Alto Tietê (Mogi): -10-15% de SP Capital
- **Regiões vizinhas**: Mencione cidades próximas
- **Contexto regional**: Adapte situação socioeconômica

---

## 📊 Preços de Referência por Região

Use como base para ajustar valores:

| Região | Diária | Mensalista | 24h |
|---|---|---|---|
| **SP Capital** | R$ 150-300 | R$ 2.500-5.500 | R$ 6.500-11.000 |
| **Alto Tietê** (Mogi) | R$ 130-250 | R$ 1.800-4.500 | R$ 5.000-9.500 |
| **ABC Paulista** | R$ 140-280 | R$ 2.000-4.800 | R$ 5.500-10.000 |
| **Guarulhos** | R$ 140-270 | R$ 2.000-4.500 | R$ 5.200-9.500 |

*Estes são estimativas — Claude Cowork deve pesquisar valores atuais*

---

## ✅ Checklist para cada Post

Antes de publicar, Claude Cowork deve confirmar:

- [ ] Frontmatter correto (title, slug, excerpt, published: false)
- [ ] Slug em minúsculas, sem acentos, hífens para espaços
- [ ] Preços pesquisados e realistas
- [ ] Tabela com 5 modelos (diária, mensalista, noturno, 24h, acompanhante)
- [ ] Seção "O que faz variar"
- [ ] Seção "Como economizar"
- [ ] FAQ com 5 perguntas
- [ ] CTA mencionando WhatsApp e CareConnect
- [ ] Conclusão forte

---

## 🚀 Comando para Publicar

```bash
# Validar antes de publicar
node --env-file=.env.local scripts/publish-post.mjs posts/seu-novo-post.md --dry-run

# Publicar como rascunho (para revisar)
node --env-file=.env.local scripts/publish-post.mjs posts/seu-novo-post.md

# Publicar direto
node --env-file=.env.local scripts/publish-post.mjs posts/seu-novo-post.md --publish
```

---

## 📈 Estratégia de Conteúdo

Depois de publicar posts para 10-15 cidades, você terá:

✅ **Cobertura regional**: Mogi, Suzano, Poá, Itaquaquecetuba, etc.
✅ **Tráfego SEO**: Cada cidade é uma palavra-chave
✅ **Conversão**: Cada post termina com CTA de WhatsApp
✅ **Autoridade**: Posiciona CareConnect como especialista de preços
✅ **Escalabilidade**: Claude Cowork gera automaticamente

---

## 🎓 Exemplo de Adaptação

**Modelo (Mogi das Cruzes)**:
```markdown
---
title: "Quanto Custa um Cuidador de Idosos em Mogi das Cruzes em 2026"
slug: quanto-custa-cuidador-idosos-mogi-das-cruzes
...
**Em 2026, contratar um cuidador de idosos em Mogi das Cruzes custa, em média, 
de R$ 130 a R$ 250 por diária...**
Esta página foi feita para famílias do Alto Tietê...
região (Suzano, Poá, Itaquaquecetuba)
```

**Adaptação (Guarulhos)**:
```markdown
---
title: "Quanto Custa um Cuidador de Idosos em Guarulhos em 2026"
slug: quanto-custa-cuidador-idosos-guarulhos
...
**Em 2026, contratar um cuidador de idosos em Guarulhos custa, em média, 
de R$ 140 a R$ 270 por diária...**
Esta página foi feita para famílias de Guarulhos...
região (São Paulo, Taboão da Serra, Osasco)
```

---

## 🎯 Próximas Ações

1. ✅ Claude Cowork conhece o modelo
2. ⏳ Gere posts para 5 cidades (Suzano, Poá, etc)
3. ⏳ Publique com `--publish` para ir direto ao ar
4. ⏳ Monitore tráfego de cada cidade
5. ⏳ Otimize títulos/preços conforme conversão

---

**Modelo criado em**: 2026-06-16  
**Baseado em**: `posts/quanto-custa-cuidador-idosos-mogi-das-cruzes.md`  
**Status**: Pronto para replicação
