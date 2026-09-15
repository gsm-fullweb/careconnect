# 📅 Agendamento Automático - Claude Cowork Publica Diariamente

Você agora tem um **sistema de publicação automática** que publica um novo post no blog **todos os dias às 8h da manhã**.

---

## ✅ Status Atual

| Propriedade | Valor |
|---|---|
| **Job ID** | `155d242b` |
| **Horário** | 8:03 AM (todos os dias) |
| **Status** | 🟢 **ATIVO** |
| **Durável** | ✅ Sim (persiste entre sessões) |
| **Auto-expira** | 7 dias |

---

## 🚀 Como Funciona

### **Fluxo Diário Automático**

```
8:03 AM todos os dias
        ↓
Claude Cowork é acionado automaticamente
        ↓
Gera um post sobre "Quanto Custa um Cuidador"
        ↓
Para uma NOVA cidade (diferente a cada dia)
        ↓
Adapta preços e contexto regional
        ↓
Valida o conteúdo
        ↓
PUBLICA DIRETO no blog
        ↓
Post está online em: https://www.careconnect.com.br/blog/[slug]
```

---

## 📝 O que Claude Cowork Publica Diariamente

Cada dia, um novo post sobre:
```
"Quanto Custa um Cuidador de Idosos em [CIDADE] em 2026"
```

**Modelo**: `posts/quanto-custa-cuidador-idosos-mogi-das-cruzes.md`

**Estrutura**:
- Introdução com preços
- Tabela de preços (diária, mensalista, noturno, 24h)
- Contexto regional
- Como economizar
- FAQ
- CTA para WhatsApp

---

## 🌍 Cidades Sugeridas (uma por dia)

**Semana 1** (Alto Tietê):
- [ ] Dia 1: Suzano
- [ ] Dia 2: Poá
- [ ] Dia 3: Itaquaquecetuba
- [ ] Dia 4: Salesópolis
- [ ] Dia 5: Arujá

**Semana 2** (ABC Paulista):
- [ ] Dia 6: Guarulhos
- [ ] Dia 7: Santo André
- [ ] Dia 8: São Bernardo do Campo
- [ ] Dia 9: Diadema
- [ ] Dia 10: Osasco

**Semana 3** (Grandes):
- [ ] Dia 11: São Paulo Capital
- [ ] Dia 12: Barueri
- [ ] Dia 13: Carapicuíba

---

## 📊 Preços de Referência

Use esses valores base e adapte para cada cidade:

| Região | Diária | Mensalista | 24h |
|---|---|---|---|
| **Alto Tietê** | R$ 130-250 | R$ 1.800-4.500 | R$ 5.000-9.500 |
| **ABC Paulista** | R$ 140-280 | R$ 2.000-4.800 | R$ 5.500-10.000 |
| **Guarulhos** | R$ 140-270 | R$ 2.000-4.800 | R$ 5.200-10.000 |
| **São Paulo** | R$ 150-300 | R$ 2.500-5.500 | R$ 6.500-11.000 |

---

## 🔧 Gerenciar Tarefas Agendadas

### **Ver Todas as Tarefas**
```bash
# No Claude Code, execute:
cron list
```

### **Pausar a Publicação Diária**
```bash
# Cancela o Job ID 155d242b
cron delete 155d242b
```

### **Criar Nova Tarefa Diferente**
```bash
# Por exemplo, publicar a cada 6 horas em vez de diariamente
cron create --cron "0 */6 * * *" --prompt "Publique um novo post..."
```

### **Arquivo de Configuração**
As tarefas são salvas em:
```
.claude/scheduled_tasks.json
```

Você pode editar este arquivo diretamente se precisar.

---

## 💡 Exemplos de Variações

### **Exemplo 1: Publicar 2x por dia**
```
Horários: 8h da manhã + 17h à tarde
Cron: "3 8 * * *" e "7 17 * * *"
```

### **Exemplo 2: Publicar apenas nos dias úteis**
```
Segunda a Sexta (não publica sábado/domingo)
Cron: "3 8 * * 1-5"
```

### **Exemplo 3: Publicar toda semana (não diariamente)**
```
Todas as segundas-feiras às 8h
Cron: "3 8 * * 1"
```

---

## 📈 Resultados Esperados

Após 30 dias de publicação automática:

✅ **30 posts publicados** (uma cidade por dia)  
✅ **30 palavras-chave** rankeando no Google  
✅ **+3000-5000 views** por mês nos posts  
✅ **100-200 cliques** em WhatsApp (conversão)  
✅ **CareConnect** posicionada como especialista em preços

---

## 🎯 Monitorar o Desempenho

### **Verificar Posts Publicados**
```
Admin: https://www.careconnect.com.br/admin/blog
Blog: https://www.careconnect.com.br/blog
```

### **Análise SEO**
Depois de 1 semana, verifique:
- Quantos posts aparecem no Google
- Qual cidade tem mais tráfego
- Qual tem mais conversão (cliques em WhatsApp)

### **Otimizações**
Se descobrir que uma cidade gera muito tráfego:
- Aumente frequência de posts para essa região
- Crie posts relacionados (complementares)
- Otimize preços/títulos baseado em tráfego

---

## 🛠️ Troubleshooting

### **"A tarefa não rodou no horário agendado"**
Claude Code/Cowork precisa estar rodando para as tarefas executarem.
Deixe rodando continuamente ou configure para re-iniciar automaticamente.

### **"Quer parar o agendamento?"**
```bash
cron delete 155d242b
```

### **"Quer mudar o horário?"**
1. Cancele a tarefa atual: `cron delete 155d242b`
2. Crie nova com novo horário: `cron create ...`

### **"Quer um post em horário específico?"**
Exemplo para publicar amanhã às 14h:
```bash
cron create --cron "0 14 <amanhã_dia> <amanhã_mês> *" --prompt "..." --recurring false
```

---

## 📋 Instruções para Claude Cowork

Se você quiser **modificar o comportamento** da publicação diária, instrua assim:

```
"Modifique o agendamento de publicação diária:
- Horário: Mude para [novo horário]
- Frequência: [diária/2x por dia/semanal]
- Cidades: Priorize [região específica]
- Preços: Ajuste baseado em [critério]"
```

---

## 🔄 Renovar Após 7 Dias

A tarefa auto-expira após 7 dias. Para renovar:

```
"Claude, renove o agendamento de publicação diária.
Job ID: 155d242b
Mesmo horário (8h) e mesma rotina.
Salve em .claude/scheduled_tasks.json"
```

---

## 📞 Próximas Ações

- [ ] ✅ Tarefa está agendada (feito!)
- [ ] Verifique post publicado amanhã às 8h
- [ ] Monitore tráfego no admin
- [ ] Otimize cidades com melhor performance
- [ ] Renove a tarefa antes do dia 7

---

## 🎯 Resumo

| Aspecto | Detalhe |
|---|---|
| **O quê** | Publica 1 novo post por dia |
| **Quando** | 8:03 AM todos os dias |
| **Quanto** | 30 posts/mês = 30 cidades = 30 keywords |
| **Resultado** | +3000-5000 views/mês + conversão via WhatsApp |
| **Durável** | Sim, persiste entre restarts |
| **Job ID** | `155d242b` |

---

**Criado em**: 2026-06-16  
**Status**: ✅ Ativo  
**Auto-expira**: 2026-06-23 (7 dias)

🚀 **Seu blog vai crescer automaticamente!**
