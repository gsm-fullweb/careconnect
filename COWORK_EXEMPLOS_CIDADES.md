# 🌍 Exemplos de Posts por Cidade - Claude Cowork

Este arquivo mostra como o Claude Cowork deve adaptar o modelo de Mogi das Cruzes para outras cidades do Alto Tietê e Grande São Paulo.

---

## 🎯 Estratégia de Replicação

O modelo de "Quanto Custa um Cuidador de Idosos em [CIDADE]" funciona porque:

1. **Alto volume de buscas** ("Quanto custa" é pergunta de usuário real)
2. **Baixa concorrência** (poucos sites têm dados por cidade)
3. **Fácil conversão** (pessoa buscando esse termo tem intenção)
4. **Escalável** (gera um post por cidade)

---

## 📋 Cidades Prioritárias (Alto Tietê + Região)

### Tier 1 (Alto Tietê - Prioridade Alta)
Estas cidades estão perto de Mogi e têm demanda similar:

- [ ] **Suzano** - População 270k, grande demanda
- [ ] **Poá** - População 110k, bem próxima
- [ ] **Itaquaquecetuba** - População 320k, região oficial
- [ ] **Salesópolis** - Município menor, oportunidade
- [ ] **Arujá** - População 80k
- [ ] **Biritiba Mirim** - Município pequeno
- [ ] **Mogi das Cruzes** ✅ (já existe)

### Tier 2 (Grande SP - Secundário)
Maiores cidades, mais competição, mas maior volume:

- [ ] **São Paulo Capital** - Altíssimo volume, pagar mais caro
- [ ] **Guarulhos** - 1.2M habitantes, segundo maior ABCD
- [ ] **Santo André** - ABC Paulista
- [ ] **São Bernardo do Campo** - ABC Paulista
- [ ] **Diadema** - ABC Paulista
- [ ] **Osasco** - Grande SP, vizinho Barueri
- [ ] **Barueri** - Grande SP, rico

---

## 🔢 Estimativa de Preços por Região

Use como referência para adaptações:

### **Alto Tietê** (mais barato - 10-15% abaixo SP)
- Mogi das Cruzes: R$ 130-250 (diária), R$ 1.800-4.500 (mês)
- Suzano: R$ 130-260
- Poá: R$ 120-240
- Itaquaquecetuba: R$ 130-260
- Salesópolis: R$ 120-220 (menor)

### **ABC Paulista** (médio - 5% abaixo SP)
- Santo André: R$ 140-270
- São Bernardo: R$ 140-280
- Diadema: R$ 140-270
- Osasco: R$ 150-290

### **SP Capital** (mais caro - referência máxima)
- São Paulo: R$ 150-300 (diária), R$ 2.500-5.500 (mês)

### **Guarulhos** (médio-alto)
- Guarulhos: R$ 140-270

---

## 📝 Formato de Nomeclatura de Arquivo

```
posts/quanto-custa-cuidador-idosos-[cidade].md

Exemplos:
- quanto-custa-cuidador-idosos-suzano.md
- quanto-custa-cuidador-idosos-guarulhos.md
- quanto-custa-cuidador-idosos-sao-paulo.md
```

---

## ✨ Elementos que Variam por Cidade

### 1. **Título e Slug**
```markdown
# Original (Mogi)
title: "Quanto Custa um Cuidador de Idosos em Mogi das Cruzes em 2026"
slug: quanto-custa-cuidador-idosos-mogi-das-cruzes

# Adaptado (Suzano)
title: "Quanto Custa um Cuidador de Idosos em Suzano em 2026"
slug: quanto-custa-cuidador-idosos-suzano
```

### 2. **Preços na Tabela**
```markdown
# Original (Mogi - mais barato)
| Diária (plantão 12h diurno) | R$ 130 a R$ 250 / dia | 

# Adaptado (Guarulhos - mais caro)
| Diária (plantão 12h diurno) | R$ 140 a R$ 270 / dia |

# Adaptado (São Paulo - ainda mais caro)
| Diária (plantão 12h diurno) | R$ 150 a R$ 300 / dia |
```

### 3. **Contexto Regional**
```markdown
# Original
Esta página foi feita para famílias do Alto Tietê que já decidiram contratar...
região (Suzano, Poá, Itaquaquecetuba), tendendo a ficar abaixo dos praticados 
na capital de São Paulo.

# Adaptado (Guarulhos)
Esta página foi feita para famílias de Guarulhos que já decidiram contratar...
região (São Paulo, Taboão da Serra, Osasco), com preços similares aos da capital.

# Adaptado (São Paulo)
Esta página foi feita para famílias de São Paulo que já decidiram contratar...
região (Guarulhos, Santo André, São Bernardo), com preços de referência para 
toda a Grande São Paulo.
```

### 4. **Salários Locais**
```markdown
# Original (Mogi - pesquisar portais locais)
Em Mogi das Cruzes, o salário médio de um cuidador de idosos mensalista 
gira em torno de R$ 1.500 a R$ 2.500 por mês...

# Adaptado (Guarulhos - maior custo de vida)
Em Guarulhos, o salário médio de um cuidador de idosos mensalista 
gira em torno de R$ 1.800 a R$ 3.000 por mês...

# Adaptado (São Paulo - maior ainda)
Em São Paulo, o salário médio de um cuidador de idosos mensalista 
gira em torno de R$ 2.000 a R$ 3.500 por mês...
```

---

## 🎓 Exemplo Completo de Adaptação

### Original (Mogi das Cruzes)

```markdown
---
title: "Quanto Custa um Cuidador de Idosos em Mogi das Cruzes em 2026"
slug: quanto-custa-cuidador-idosos-mogi-das-cruzes
excerpt: "Quanto custa um cuidador de idosos em Mogi das Cruzes em 2026? Veja preços de diária, mensalista, noturno e 24h e simule seu orçamento no WhatsApp."
published: false
---

# Quanto Custa um Cuidador de Idosos em Mogi das Cruzes?

**Em 2026, contratar um cuidador de idosos em Mogi das Cruzes custa, em média, 
de R$ 130 a R$ 250 por diária, de R$ 1.800 a R$ 4.500 por mês no formato 
mensalista diurno, e de R$ 5.000 a R$ 9.500 por mês na escala 24 horas.**

Esta página foi feita para famílias do Alto Tietê...

| Modelo de contratação | Faixa de preço (2026) |
|---|---|
| Diária (plantão 12h diurno) | R$ 130 a R$ 250 / dia |
| Mensalista diurno (8h a 12h) | R$ 1.800 a R$ 4.500 / mês |
| Escala 24 horas | R$ 5.000 a R$ 9.500 / mês |

Em Mogi das Cruzes, o salário médio de um cuidador de idosos mensalista 
gira em torno de R$ 1.500 a R$ 2.500 por mês...

região (Suzano, Poá, Itaquaquecetuba), tendendo a ficar abaixo dos praticados 
na capital de São Paulo.
```

### Adaptado (Guarulhos)

```markdown
---
title: "Quanto Custa um Cuidador de Idosos em Guarulhos em 2026"
slug: quanto-custa-cuidador-idosos-guarulhos
excerpt: "Quanto custa um cuidador de idosos em Guarulhos em 2026? Veja preços de diária, mensalista, noturno e 24h e simule seu orçamento no WhatsApp."
published: false
---

# Quanto Custa um Cuidador de Idosos em Guarulhos?

**Em 2026, contratar um cuidador de idosos em Guarulhos custa, em média, 
de R$ 140 a R$ 270 por diária, de R$ 2.000 a R$ 4.800 por mês no formato 
mensalista diurno, e de R$ 5.200 a R$ 10.000 por mês na escala 24 horas.**

Esta página foi feita para famílias de Guarulhos...

| Modelo de contratação | Faixa de preço (2026) |
|---|---|
| Diária (plantão 12h diurno) | R$ 140 a R$ 270 / dia |
| Mensalista diurno (8h a 12h) | R$ 2.000 a R$ 4.800 / mês |
| Escala 24 horas | R$ 5.200 a R$ 10.000 / mês |

Em Guarulhos, o salário médio de um cuidador de idosos mensalista 
gira em torno de R$ 1.800 a R$ 3.000 por mês...

região (São Paulo, Taboão da Serra, Osasco), com preços similares aos da capital.
```

---

## 📊 Tabela de Variações Estimadas

Use como "cheat sheet" para Claude Cowork:

| Cidade | Diária | Mês (diurno) | 24h | Referência |
|---|---|---|---|---|
| **Mogi das Cruzes** | 130-250 | 1.800-4.500 | 5.000-9.500 | Base |
| **Suzano** | 130-260 | 1.800-4.600 | 5.100-9.600 | -5% Mogi |
| **Poá** | 120-240 | 1.700-4.300 | 4.900-9.300 | -10% Mogi |
| **Itaquaquecetuba** | 130-260 | 1.800-4.600 | 5.100-9.600 | = Mogi |
| **Guarulhos** | 140-270 | 2.000-4.800 | 5.200-10.000 | +8% Mogi |
| **Santo André** | 140-270 | 2.000-4.800 | 5.500-10.000 | +8% Mogi |
| **São Paulo** | 150-300 | 2.500-5.500 | 6.500-11.000 | +20% Mogi |

---

## 🚀 Plano de Publicação Sugerido

**Semana 1**: Alto Tietê
- [ ] Suzano
- [ ] Poá
- [ ] Itaquaquecetuba

**Semana 2**: Entorno de Mogi
- [ ] Salesópolis
- [ ] Arujá
- [ ] Biritiba Mirim

**Semana 3**: Grande SP
- [ ] Guarulhos
- [ ] Santo André
- [ ] São Bernardo do Campo

**Semana 4**: Grandes Cidades
- [ ] São Paulo Capital
- [ ] Osasco
- [ ] Barueri
- [ ] Diadema

---

## ✅ Checklist para Claude Cowork

Para cada novo post, verificar:

- [ ] Arquivo criado em: `posts/quanto-custa-cuidador-idosos-[cidade].md`
- [ ] Slug correto (sem acentos, hífens para espaços)
- [ ] Preços ajustados para a região
- [ ] Cidades vizinhas mencionadas no contexto
- [ ] Salários locais pesquisados
- [ ] Frontmatter completo (title, slug, excerpt, published: false)
- [ ] Publicado com: `node --env-file=.env.local scripts/publish-post.mjs posts/[arquivo].md --publish`
- [ ] Verificado em: https://www.careconnect.com.br/blog/quanto-custa-cuidador-idosos-[cidade]

---

## 📈 KPIs a Monitorar

Depois de gerar 10 posts, analise:

- **Tráfego**: Qual cidade gera mais acessos?
- **Conversão**: Qual post tem mais cliques em WhatsApp?
- **Dwell Time**: Em qual cidade as pessoas leem mais?
- **Keyword Ranking**: Quais slugs rankeiam bem no Google?

Depois, otimize para as cidades com melhor desempenho.

---

## 💡 Dicas de Otimização

1. **Título**: Use exatamente o modelo, apenas troque cidade
2. **Preços**: Pesquise em portais de emprego locais (salary.com, linkedin)
3. **Contexto**: Adapte nomes de cidades vizinhas
4. **Calls**: Sempre termina com WhatsApp + CareConnect
5. **FAQ**: Mude números nas respostas, mas mantenha estrutura

---

## 🎯 Resultado Esperado

Após gerar posts para 15 cidades:

✅ **SEO**: 15 palavras-chave diferentes rankeando  
✅ **Tráfego**: +300-500% aumento em buscas locais  
✅ **Leads**: Dezenas de cliques em WhatsApp por semana  
✅ **Autoridade**: CareConnect = "especialista em preços de cuidadores"  
✅ **Escalabilidade**: Processo totalmente automático com Claude Cowork

---

**Criado em**: 2026-06-16  
**Baseado em**: `posts/quanto-custa-cuidador-idosos-mogi-das-cruzes.md`  
**Próximo passo**: Claude Cowork gera post para Suzano
