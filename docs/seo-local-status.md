# Status Oficial do Projeto SEO Local - CareConnect Web

Este documento consolida o estado atual (Snapshot) do projeto de expansão de SEO Local da CareConnect Web Squad. Ele serve como a **Fonte Oficial de Verdade** para a retomada futura dos trabalhos.

## 1. Documentação Oficial Mapeada

A base de conhecimento estratégico e operacional do projeto está dividida nos seguintes documentos imutáveis (salvo atualizações oficiais do time):

- **`docs/seo-local-careconnect.md`**: O Manual Oficial de SEO Local da CareConnect. Contém todas as regras de negócio, diretrizes contra *doorway pages* e a exigência de preenchimento da Matriz de Conteúdo (Checklist Go/No-Go).
- **`docs/seo-local-ranking.md`**: O Ranking de Oportunidades para expansão. Avalia qualitativamente e quantitativamente as praças e dita a prioridade comercial.
- **`docs/go-no-go-guarulhos.md`**: Auditoria crítica que refutou o score inicial de Guarulhos e estabeleceu a cidade como GO CONDICIONAL.

## 2. Status das Cidades (Até o Momento)

- **Mogi das Cruzes (`/cuidador-de-idosos/mogi-das-cruzes`)**: Única página local implementada e 100% validada. Refatorada para usar a nova infraestrutura.
- **Arujá**: **NO-GO** no momento (falta de dados e demanda).
- **Guarulhos**: **GO CONDICIONAL**. O score inicial 90 foi refutado e revisado para 40 após auditoria operacional rigorosa. Não autorizada para publicação até a obtenção factual de dados reais (hospitais, demanda e quantidade de cuidadores verificados).

## 3. Infraestrutura Técnica (Código)

- **`CityLandingPage` (`src/components/seo-local/CityLandingPage.tsx`)**: Infraestrutura técnica reutilizável, componente mestre e extensível para abrigar páginas locais futuras. 
- **Regra Fundamental (Código vs Conteúdo)**: DRY (Don't Repeat Yourself) **no código**, **NUNCA** no conteúdo SEO. 
- Nenhuma nova cidade pode ser criada automaticamente apenas plugando variáveis no template. 
- É expressamente **proibido** criar páginas locais apenas trocando o nome da cidade (risco de *Doorway Page*).
- É proibido inventar bairros, demanda, quantidade de cuidadores, cobertura, avaliações, hospitais ou qualquer outro dado para justificar densidade de texto.
- **A principal e única conversão** das páginas destinadas às famílias continua sendo a Mila no WhatsApp: **(11) 4863-3976 — [https://wa.me/551148633976](https://wa.me/551148633976)**.

## 4. Próxima Etapa (Quando o projeto for retomado)

**NÃO DESENVOLVER NENHUMA NOVA LANDING PAGE AGORA.**

A expansão em código só deverá acontecer quando o time de operações/comercial apresentar dados reais da operação da CareConnect. Quando o projeto for reativado, o fluxo obrigatório é:

1. Levantar **solicitações reais de famílias** por cidade alvo.
2. Levantar o número de **cuidadores cadastrados** na respectiva região e sua disponibilidade real.
3. Definir os **tipos de atendimento** mais procurados no local.
4. Mapear **regiões e bairros efetivamente atendidos** pelos cuidadores.
5. Obter **outras evidências comerciais reais** que justifiquem uma página.
6. **Executar novamente o processo de Go/No-Go** (como foi feito com Guarulhos) utilizando os novos dados coletados ANTES de qualquer implementação no repositório.
