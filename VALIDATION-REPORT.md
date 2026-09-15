# Validação de indexação — CareConnect

Escopo: sitemap XML, robots.txt e sinais de indexação das páginas do blog.

## Resumo

O bloqueio de indexação foi confirmado em produção:

- `https://www.careconnect.com.br/sitemap.xml` respondia HTTP 401.
- A resposta vinha do gateway do Supabase (`Sb-Error-Code`) porque a URL pública era encaminhada para uma Edge Function que exigia autenticação.
- O HTML inicial de `/blog` e dos posts continha canonical para `https://careconnect.com.br`, fazendo as páginas parecerem duplicatas da home.
- O sitemap estático local listava apenas a página principal do blog, não os posts publicados.

## Achados

| Área | Severidade | Confiança | Evidência | Correção |
|---|---|---|---|---|
| Sitemap | Crítica | Confirmado | `/sitemap.xml` retornava HTTP 401 com cabeçalhos do gateway Supabase | Servir o XML por uma rota pública da Vercel |
| Descoberta de posts | Crítica | Confirmado | O sitemap estático não continha URLs individuais dos posts | Consultar `blog_posts` e incluir todo post publicado |
| Canonical | Crítica | Confirmado | `/blog` e `/blog/{slug}` entregavam canonical da home no HTML-base | Remover o canonical global e manter canonicals específicos por rota |
| Robots | Aprovado | Confirmado | `robots.txt` permite o blog e referencia o sitemap | Manter referência para o domínio `www` |

## Implementação

- Criada `api/sitemap.ts`, que gera XML público com páginas estáticas e posts publicados.
- Atualizado `vercel.json` para encaminhar somente `/sitemap.xml` à nova API.
- Removido o canonical global de `index.html`.

## Validação necessária após deploy

1. `/sitemap.xml` deve responder HTTP 200 e `Content-Type: application/xml`.
2. O XML deve conter todas as URLs `/blog/{slug}` publicadas.
3. O HTML renderizado de cada post deve apresentar canonical autorreferente.
4. Reenviar o sitemap no Google Search Console.
