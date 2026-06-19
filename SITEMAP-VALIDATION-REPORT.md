# Validação do sitemap

Data: 19 de junho de 2026

Escopo: comparação entre o sitemap público, o arquivo estático do repositório e o gerador dinâmico conectado ao Supabase.

## Resultado

| Área | Severidade | Confiança | Evidência | Correção |
|---|---|---|---|---|
| Cobertura dos posts | Crítica | Confirmada | `/sitemap.xml` continha 5 posts; `/api/sitemap` continha 104 posts | Encaminhar `/sitemap.xml` para `/api/sitemap` |
| Atualização automática | Crítica | Confirmada | O arquivo `public/sitemap.xml` era uma lista manual e obsoleta | Remover o arquivo estático |
| Referência no robots.txt | Passou | Confirmada | `robots.txt` referencia `https://www.careconnect.com.br/sitemap.xml` | Nenhuma mudança necessária |
| Formato XML | Passou | Confirmada | O endpoint dinâmico retorna XML válido com `<loc>` e `<lastmod>` | Nenhuma mudança necessária |

## Impacto

Os posts ausentes não eram apresentados pelo sitemap principal aos mecanismos de busca, reduzindo a descoberta e a atualização das páginas do blog.

## Implementação

1. Removido o sitemap estático.
2. Adicionado rewrite de `/sitemap.xml` para `/api/sitemap`.
3. O sitemap passa a consultar automaticamente todos os posts publicados no Supabase.
