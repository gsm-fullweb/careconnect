# Manual Oficial de SEO Local - CareConnect

Este documento estabelece o padrão de arquitetura, desenvolvimento e publicação de novas páginas de cidades para a CareConnect. O objetivo central é escalar a captação local de leads sem gerar *keyword cannibalization*, penalizações por *doorway pages* ou acúmulo de conteúdo duplicado/falso.

---

## 1. Arquitetura de URLs

A estrutura padrão oficial para cidades é **`/cuidador-de-idosos/{cidade}`** (ex: `/cuidador-de-idosos/mogi-das-cruzes`).

**Por que este padrão?**
- Permite que a raiz `/cuidador-de-idosos` funcione como a página informacional mãe.
- Cria uma hierarquia semântica perfeita para *Breadcrumbs* (Ex: Início > Cuidador de Idosos > Mogi das Cruzes).
- Evita URLs longas ou genéricas demais (como `/cidades/{cidade}/cuidador` ou `/local/{cidade}`).

---

## 2. Ownership de Keywords

Cada página deve possuir um propósito e uma intenção de busca exclusivos. **Nenhuma intenção pode ser dividida entre duas páginas.**

| Termo de Busca (Intenção) | Rota Responsável | Tipo de Página |
| :--- | :--- | :--- |
| "cuidador de idosos" (Geral/O que é) | `/servicos/cuidador-de-idosos` | Institucional / Serviço |
| "encontrar cuidador" (Ação Global) | `/buscar-cuidadores` | Funcional / Plataforma |
| "cuidador de idosos em {Cidade}" | `/cuidador-de-idosos/{cidade}` | Local SEO |
| "cuidador noturno", "para alzheimer" | `/especialidades/{especialidade}` | Necessidade Específica |

---

## 3. Regras Contra Canibalização

- Nunca crie variações semânticas da mesma cidade em URLs diferentes (ex: não tenha `/cuidador-de-idosos-mogi` e `/cuidador-mogi-das-cruzes`). Toda a intenção de uma região deve ser agrupada na URL oficial.
- Se no futuro existir demanda massiva para `"cuidador noturno em mogi"`, este termo deve, primariamente, virar um `H2` dentro da página `/cuidador-de-idosos/mogi-das-cruzes`. Só criaremos uma página separada se o volume de busca for gigantesco e houver conteúdo *local e específico* para justificar uma sub-página separada (e mesmo assim, deve ter canonical forte).

---

## 4. Regras Contra Doorway Pages e Thin Content

O Google penaliza páginas que servem apenas como "portas" (doorways) sem valor real, geradas trocando apenas o nome da cidade.
- **PROIBIDO**: Gerar conteúdo local de forma 100% programática apenas mudando a variável `{cidade}`.
- **OBRIGATÓRIO**: Toda cidade precisa de informações genuinamente locais (bairros atendidos reais, especificidades de deslocamento ou contexto demográfico) e, preferencialmente, dados ou depoimentos de clientes daquela cidade, caso existam.
- **ALERTA CRÍTICO**: A existência do componente técnico `<CityLandingPage>` **nunca constitui autorização** para publicar uma nova cidade. Toda cidade continua obrigada a passar pelo *Go/No-Go*. Se não houver conteúdo e justificativa suficientes, a página não será criada/indexada. O template existe para acelerar o desenvolvimento visual, não para automatizar a criação de conteúdo vazio.

---

## 5. Critérios de Nova Cidade (Go/No-Go)

Uma nova página local só deve ser criada se atender a **pelo menos 3** dos seguintes critérios factuais:
1. Existe **volume de busca orgânica** mapeado para a região.
2. A CareConnect possui **cuidadores cadastrados e ativos** com capacidade real de atender aquela cidade.
3. Existem **clientes/famílias já atendidas** na região, validando a operação.
4. É um mercado **estrategicamente prioritário** com campanhas ativas de tráfego pago para apoiar a tração inicial.
5. Há **conteúdo factual e autêntico** suficiente para compor uma página única, sem recorrer a invenções.

---

## 6. Matriz de Conteúdo (Briefing para Novas Páginas)

Antes do desenvolvimento técnico, o responsável por SEO ou Conteúdo deve preencher esta matriz:

- **Cidade**: [Ex: Santo André]
- **Região**: [Ex: ABC Paulista]
- **Keyword principal**: `cuidador de idosos em Santo André`
- **Volume de busca**: [Inserir volume médio]
- **Intenção**: Local / Contratação via WhatsApp
- **Demanda real CareConnect**: [Ex: Temos 12 famílias atendidas]
- **Cuidadores cadastrados**: [Ex: 45 profissionais na região]
- **Principais necessidades (local)**: [Ex: Acompanhamento ao Hospital Mário Covas]
- **Bairros/região destaque**: [Ex: Campestre, Bairro Jardim, Vila Assunção]
- **Cidades próximas relevantes**: [Ex: São Bernardo do Campo, São Caetano]
- **Conteúdo local disponível**: [Ex: Depoimento de cliente, dados de atendimento]
- **Risco de canibalização interno**: [Ex: Nenhuma página atual foca no ABC]
- **CTA Foco**: Botão de WhatsApp direcionando para a Mila.
- **Status SEO**: Aprovado para produção (Index, Follow).

---

## 7. Estrutura Técnica: Componentes Reutilizáveis (DRY)

Para manter a base de código escalável sem duplicar lógica visual, os seguintes elementos devem ser extraídos para a pasta `src/components/seo-local/` e **reutilizados** entre as páginas de cidades:
- `<LocalNavbar />` e `<LocalFooter />` (ou o layout padrão do site).
- `<ComoFuncionaMila />`: O fluxo de 3 passos explicando o WhatsApp.
- `<MilaWidgetInfo />`: O card ou seção explicando que não é necessário app, apenas conversar com a Mila.
- `<TrustBadges />` ou `<PorQueCareConnect />`: Os pilares de segurança, praticidade e matching por IA.
- `<WhatsAppCTA />`: O botão padrão flutuante ou estático de contato.

---

## 8. Estrutura Técnica: Conteúdo Obrigatório Único

Para que a página seja ranqueada e útil, as seguintes seções devem ser desenvolvidas de forma **exclusiva** para a cidade em questão:
- **Hero Section**: H1 (ex: "Encontre o Cuidador Ideal em Guarulhos") e a *subheadline* contextualizando a região.
- **Seção de Necessidades ("Apoio para a Família")**: Texto que contextualiza dores locais. Se houver muitos hospitais na região (como em São Paulo capital), focar no pós-operatório.
- **Contexto Geográfico**: Um parágrafo ou bloco explicando o atendimento ("Buscamos cuidadores que residem em Santo André e no ABC...").
- **FAQ Local**: As perguntas podem ter estrutura similar, mas o conteúdo, especialmente preços ou regras locais, deve ser revisado individualmente.

---

## 9. Padrão de Metadata

Não utilize a mesma meta-description para todas as cidades. Siga esta arquitetura semântica conceitual:

- **Title Tag**: `Cuidador de Idosos em {Cidade} | CareConnect [ou Diferencial]`
  - *Ex*: `Cuidador de Idosos em Santo André | Atendimento Rápido via WhatsApp`
- **Meta Description**: Use gatilhos emocionais locais e o CTA.
  - *Ex*: `Procurando cuidador de idosos em Santo André? A CareConnect conecta sua família a profissionais de confiança da região do ABC pelo WhatsApp. Fale com a Mila!`
- **H1**: Deve conter a palavra-chave principal natural.
  - *Ex*: `Encontre o Cuidador de Idosos Ideal em Santo André`
- **Open Graph (OG)**: `og:title` igual ao Title, `og:description` igual à Meta Description, `og:image` realista de idoso/cuidador (sempre com alt text).

---

## 10. Uso de Dados Estruturados (Schema)

Gere rich snippets sem enganar os motores de busca.

**Schemas Permitidos e Recomendados:**
- `FAQPage`: Apenas se as perguntas marcadas no schema estiverem exatamente iguais e visíveis na UI.
- `WebPage` / `Service`: Para definir o serviço prestado na região.
- `Organization`: Com referência nacional ao site da CareConnect.
- `BreadcrumbList`: Sempre obrigatório para sinalizar a hierarquia ao Google.

**Schemas PROIBIDOS:**
- `LocalBusiness`: Apenas utilize se existir um endereço físico auditável da CareConnect com porta aberta para atendimento presencial na cidade. Do contrário, gera penalização.
- `AggregateRating` e `Review`: Só utilizar se estiver extraindo os dados de uma API real validada (Trustpilot, Google My Business, ou banco de dados próprio verificável). Não invente um `"ratingValue": "5.0"`.

---

## 11. Canonical Tags

- Se a cidade possui conteúdo único substancial, a URL deve possuir tag Canonical **apontando para si mesma** (Self-referencing canonical).
- Parâmetros de rastreamento (ex: `?utm_source=face`) ou filtros devem ignorar a si mesmos no canonical, forçando o Google a indexar a versão limpa.

---

## 12. Links Internos e Arquitetura do Site

Não entupa o Footer com uma "Nuvem de Tags" das 500 cidades do Brasil.

- **Fluxo Estruturado**: A página nacional de serviços (`/servicos`) ou de busca (`/buscar-cuidadores`) pode ter uma seção organizada: "Nossas Principais Cidades de Atendimento" linkando para Mogi, Suzano, ABC, etc.
- **Cross-linking Local**: Se você está na página de Santo André, faz sentido possuir um bloco contextual "Veja também nosso atendimento em: [São Bernardo do Campo], [São Caetano do Sul]".
- Links nas páginas locais devem apontar preferencialmente para: WhatsApp (conversão primária), Página Institucional (para gerar trust), e FAQ nacional (se necessário).

---

## 13. Redirects (301)

Se uma página local for deprecada (ex: deixamos de atender Diadema temporariamente ou unimos duas páginas por canibalização, como foi o caso em Mogi), siga este padrão:
- A URL antiga **sempre** deve retornar `301 Moved Permanently` apontando para:
  1. A nova URL aglutinada.
  2. A página de região agregada (Ex: se deletar `/santo-andre`, redirecione para `/abc`).
  3. A Home (como último recurso, se não houver alternativa semântica).
- Não deixe páginas inativas retornando `200 OK` (sem conteúdo útil) ou `404 Not Found` se possuírem backlinks de valor.

---

## 14. Indexação (Index / Noindex)

- **Index, Follow**: Apenas para cidades que passaram no Checklist (item 5) e possuem conteúdo 100% único.
- **Noindex, Follow**: Se, por motivos comerciais, for necessário subir uma landing page para uma campanha paga sem que a mesma tenha recebido o tratamento de "Conteúdo Único", marque como `noindex` para que o Google não penalize o site inteiro por conteúdo duplicado.

---

## 15. Checklist QA SEO Final (Antes de Deploy)

Antes de aprovar o PR de uma nova página de cidade, o Desenvolvedor / Analista de QA deve conferir:
- [ ] A URL segue o padrão `/cuidador-de-idosos/{cidade}`?
- [ ] O H1 contém a Keyword Principal + Cidade de forma natural?
- [ ] Os Schemas foram inspecionados para evitar `LocalBusiness` falso?
- [ ] Existe Canonical self-referencing válido?
- [ ] A página quebra no mobile (especialmente o CTA vs Chatbot)?
- [ ] Title e Meta Description estão dentro dos limites de caracteres?
- [ ] O conteúdo de "Necessidade" e contexto local é único?
- [ ] Existe algum redirecionamento necessário para esta página que foi esquecido?
- [ ] Os links de conversão (WhatsApp) estão com o número e o texto certos?
