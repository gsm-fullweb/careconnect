# Relatório de Go/No-Go SEO: Guarulhos - SP (Auditoria Crítica)

Este relatório desafia a hipótese anterior (Score 90) submetendo a cidade de Guarulhos a um pente-fino rigoroso de separação entre **fato**, **inferência** e **ausência de dados**, seguindo o manual oficial.

---

## 1. DEMANDA REAL DA CARECONNECT
- **Evidência**: Temos um post de blog sobre preços em Guarulhos (`posts/quanto-custa-um-cuidador-de-idosos-em-guarulhos-em-2026.md`) e Guarulhos está listado na descrição genérica de SEO (`src/components/SEO.tsx`) e em componentes de menu.
- **Classificação**: **NÃO DISPONÍVEL**.
- **O que comprova**: Planejamento de marketing não comprova atendimento real. Não há registro no código ou nos arquivos de dados de famílias reais de Guarulhos solicitando serviços ou fechando contratos.

---

## 2. OFERTA REAL (CUIDADORES)
- **Evidência**: Guarulhos aparece como opção no `LocationSection.tsx` e `AddressSection.tsx` para cadastro de cuidadores.
- **Classificação**: **NÃO DISPONÍVEL**.
- **O que comprova**: Comprova que o sistema está preparado tecnicamente para aceitar cuidadores de lá, mas *não* comprova que existe 1 único cuidador ativo, validado e disponível para plantão hoje na cidade. Sem dados quantitativos ou painel de BI, o número real é um vácuo.

---

## 3. PESQUISA DE BUSCA (CENÁRIO DO GOOGLE)
- **Intenção**: Transacional e Local ("cuidador de idosos Guarulhos", "home care Guarulhos").
- **SERP / Oportunidade**: **INFERIDO**. Sendo a 2ª maior cidade de SP, a SERP é dominada por agências tradicionais físicas, franquias (HomeAngels, Acuidar, Cuidare) e marketplaces genéricos (GetNinjas, SuperProf).
- **Oportunidade CareConnect**: **INFERIDO**. Há claro espaço para uma proposta de valor baseada em agilidade via WhatsApp, contrastando com o funil burocrático de agências tradicionais locais, mas isso depende da oferta real de profissionais, que desconhecemos.

---

## 4. DIFERENCIAÇÃO EM RELAÇÃO A MOGI
- Se criássemos a página hoje, o que seria genuinamente diferente? **Nada**.
- **Contexto real necessário**: Para não ser um clone, Guarulhos precisaria citar a logística da Rodovia Presidente Dutra/Ayrton Senna (que dita a locomoção de cuidadores), hospitais de referência locais (Hospital Padre Bento, Carlos Chagas) e bairros centrais (Bosque Maia, Vila Galvão). Sem isso, reescreveríamos Mogi trocando o nome da cidade.

---

## 5. DENSIDADE EDITORIAL
- **Status atual**: **INSUFICIENTE**.
- Com os dados que temos no projeto hoje, não conseguimos preencher:
  - Contexto local real.
  - Necessidades específicas do público de Guarulhos.
  - Regiões e bairros atendidos.
  - Casos reais de demandas na região.
  - FAQ com valores exatos operados pela Mila (o blog post tem estimativas genéricas).

---

## 6. RISCO DE DOORWAY
- **Classificação**: **ALTO**.
- **Resposta Direta**: Se publicássemos Guarulhos hoje utilizando apenas a arquitetura `CityLandingPage` e nosso conhecimento atual, a página **NÃO** teria motivo próprio para existir além de capturar a keyword local. Ela seria um invólucro de palavras-chave ("Guarulhos") sem entregar um grama de valor local verdadeiro para a família que acessasse. 

---

## 7. CANIBALIZAÇÃO
- **Ownership**: A intenção local (`cuidador de idosos em Guarulhos`) pertence inquestionavelmente à futura LP de Guarulhos.
- **Conflito**: **BAIXO**. O único ativo atual é o post de blog de preços. O blog resolve a intenção *informacional*, a LP resolveria a *transacional*. Com um bom *cross-link* entre os dois, eles se impulsionariam (o post de preço linkando pro CTA da Mila na LP).

---

## 8. MATRIZ GO/NO-GO

- **Cidade**: Guarulhos
- **Estado**: SP
- **Região**: Grande São Paulo
- **Keyword principal**: `cuidador de idosos em Guarulhos`
- **Intenção**: Transacional / Fundo de funil
- **Demanda orgânica**: INFERIDA (Alta, pelo tamanho populacional).
- **Demanda real CareConnect**: NÃO DISPONÍVEL.
- **Oferta de cuidadores**: NÃO DISPONÍVEL.
- **Capacidade operacional**: NÃO DISPONÍVEL.
- **Conteúdo local**: INSUFICIENTE.
- **Diferenciação vs. Mogi**: NENHUMA (com os dados atuais).
- **Concorrência**: INFERIDA (Média/Alta).
- **Risco de canibalização**: BAIXO.
- **Risco de doorway**: ALTO.
- **Oportunidade comercial**: INFERIDA (Alta).
- **Confiança dos dados**: BAIXA.

---

## 9. REAVALIAÇÃO DO SCORE
- **Score anterior**: 90
- **Score revisado**: **40**
- **Confiança**: ALTA (Tenho alta confiança de que *não estamos prontos*).
- **Motivo da alteração**: O score 90 foi uma miopia de planejamento baseada apenas no tamanho da cidade e no SEO teórico. População grande + keyword existente não é igual a página aprovada. Quando aplicamos a lente operacional e editorial, percebemos que tentar criar a página hoje resultaria em *Thin Content*. Sem oferta de cuidadores confirmada e sem densidade editorial levantada, a publicação traria risco penalizatório ao domínio.

---

## 10. DECISÃO FINAL

# GO CONDICIONAL

A oportunidade demográfica e de SERP é inegável (por isso não é um *NO-GO* definitivo), mas a execução imediata em código é **proibida** pela falta de substância de negócios. Guarulhos está aprovada apenas para a etapa de coleta comercial/editorial.

**O que precisamos obter obrigatoriamente antes da criação da página:**
1. **Dados Operacionais (Comercial)**: Confirmação de disponibilidade real de cuidadores que residem ou têm fácil acesso logístico à cidade de Guarulhos.
2. **Briefing Editorial Local (Conteúdo)**:
   - Lista de 3 a 5 hospitais de referência de Guarulhos para ancoragem semântica.
   - Lista de 3 a 5 bairros/regiões principais com demanda validada (Vila Augusta, Bosque Maia, Cumbica, etc).
   - Tabela de preços reais operados na prática pela plataforma em Guarulhos (FAQ).
   - Tipos de atendimentos mais procurados no município.
   - Depoimentos ou casos de uso reais da região para os cards de necessidade.
