/**
 * API Route: /api/blog-render
 * 
 * Server-Side Render (SSR) de posts do blog para crawlers.
 * Quando Googlebot/Bingbot acessar /blog/:slug, o Vercel rewrite 
 * redireciona pra cá, que devolve HTML completo com o conteúdo do post.
 * 
 * Visitantes normais continuam recebendo a SPA normal.
 */

import { marked } from "marked";

marked.use({ breaks: true, gfm: true });

const SITE_URL = "https://www.careconnect.com.br";
const SUPABASE_URL = "https://dyxkbbojlyppizsgjjxx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5eGtiYm9qbHlwcGl6c2dqanh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzQ2NjAsImV4cCI6MjA2MzY1MDY2MH0.47pGkZXkqZoAsjVHhwSQPLEcGY99hoiDO-6LdCG-4K4";

const TEMPLATE = (title, description, content, slug, image, schemas = "") => `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeXml(title)}</title>
    <meta name="description" content="${escapeXml(description || title)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${SITE_URL}/blog/${slug}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeXml(title)}" />
    <meta property="og:description" content="${escapeXml(description || title)}" />
    <meta property="og:url" content="${SITE_URL}/blog/${slug}" />
    <meta property="og:image" content="${image || `${SITE_URL}/og-image.png`}" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="CareConnect" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeXml(title)}" />
    <meta name="twitter:description" content="${escapeXml(description || title)}" />
    <meta name="twitter:image" content="${image || `${SITE_URL}/og-image.png`}" />
    ${schemas}
    <style>
      body { font-family: Inter, system-ui, -apple-system, sans-serif; line-height: 1.7; color: #1a1a2e; max-width: 760px; margin: 0 auto; padding: 32px 20px; }
      h1 { font-size: 2rem; line-height: 1.3; margin-bottom: 1rem; color: #111; }
      h2 { font-size: 1.5rem; margin-top: 2rem; color: #222; }
      h3 { font-size: 1.2rem; margin-top: 1.5rem; }
      p { margin-bottom: 1rem; }
      strong { font-weight: 600; }
      table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
      th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
      th { background: #f5f5f5; font-weight: 600; }
      ul, ol { margin-bottom: 1rem; padding-left: 1.5rem; }
      li { margin-bottom: 0.25rem; }
      blockquote { border-left: 4px solid #2ecc71; padding-left: 1rem; margin: 1rem 0; color: #555; }
      a { color: #2ecc71; }
      .header { text-align: center; padding-bottom: 1rem; border-bottom: 1px solid #eee; margin-bottom: 2rem; }
      .header a { text-decoration: none; color: #2ecc71; font-weight: 600; font-size: 1.1rem; }
      .footer { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #eee; text-align: center; font-size: 0.85rem; color: #888; }
    </style>
  </head>
  <body>
    <div class="header">
      <a href="${SITE_URL}">CareConnect</a> — Agência de Cuidadores de Idosos
    </div>
    ${content}
    <div class="footer">
      <p>CareConnect — Conectando famílias a cuidadores qualificados</p>
      <p><a href="${SITE_URL}">${SITE_URL}</a></p>
    </div>
  </body>
</html>`;

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function markdownToHtml(md) {
  // Limpeza prévia: remove blocos de metadata que eventualmente escaparam
  md = md.replace(/^[\s\S]*?=== CONTEÚDO ===\s*/m, "");
  md = md.replace(/=== .*? ===[\s\S]*?(?=\n#|\n##|\n$|$)/g, "");

  // Conversão robusta via marked (mesmo parser do frontend e do publicador)
  return marked.parse(md, { async: false });
}

/**
 * Adiciona ids (âncoras) aos headings h2/h3 — paridade com a renderização
 * client-side, ajuda crawlers a mapear a estrutura do artigo.
 */
function addHeadingIds(html) {
  const used = new Set();
  return html.replace(/<(h[23])>([\s\S]*?)<\/\1>/g, (match, tag, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (!text) return match;
    const base =
      text
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "secao";
    let id = base;
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
}

export default async function handler(request, response) {
  try {
    const slug = request.query.slug;

    if (!slug) {
      response.status(404).send("Not found");
      return;
    }

    // Remove trailing slash if present
    const cleanSlug = slug.replace(/\/$/, "");

    // Busca no Supabase
    const supabaseRes = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=title,excerpt,content,slug,cover_image&slug=eq.${encodeURIComponent(cleanSlug)}&published=eq.true`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!supabaseRes.ok) {
      console.error("Supabase error:", supabaseRes.status);
      response.status(503).send("Service temporarily unavailable");
      return;
    }

    const posts = await supabaseRes.json();
    const post = posts?.[0];

    if (!post) {
      response.status(404).send("Post not found");
      return;
    }

    let rawContent = post.content || "";

    // 1. Strip frontmatter YAML (se o agente inseriu Markdown cru)
    rawContent = rawContent.replace(/^\uFEFF?---\s*\n[\s\S]*?\n---\s*\n?/, "");

    // 2. Extrai JSON-LD schemas antes de remover as seções
    let faqSchemaHtml = "";
    let localBusinessSchemaHtml = "";

    const faqMatch = rawContent.match(
      /=== FAQ SCHEMA ===\s*\n(?:```json\s*\n)?([\s\S]*?)(?:\n```)?(?=\n=== |$)/m
    );
    if (faqMatch) {
      try {
        const parsed = JSON.parse(faqMatch[1].trim());
        faqSchemaHtml = `<script type="application/ld+json">${JSON.stringify(parsed)}</script>`;
      } catch { /* JSON inválido — ignora */ }
    }

    const lbMatch = rawContent.match(
      /=== LOCAL BUSINESS SCHEMA ===\s*\n(?:```json\s*\n)?([\s\S]*?)(?:\n```)?(?=\n=== |$)/m
    );
    if (lbMatch) {
      try {
        const parsed = JSON.parse(lbMatch[1].trim());
        localBusinessSchemaHtml = `<script type="application/ld+json">${JSON.stringify(parsed)}</script>`;
      } catch { /* JSON inválido — ignora */ }
    }

    // 3. Remove blocos === ... === do corpo
    rawContent = rawContent.replace(/^[\s\S]*?=== CONTEÚDO ===\s*/m, "");
    rawContent = rawContent.replace(
      /=== (?:FAQ SCHEMA|LOCAL BUSINESS SCHEMA|INTERNAL LINKS SUGERIDOS|NOTAS EDITORIAIS|TITLE TAG|SEO BRIEFING|META DESCRIPTION)[\s\S]*?(?=\n=== |$)/gm,
      ""
    );
    rawContent = rawContent.trim();

    // 4. Detecta se é HTML ou Markdown e converte se necessário
    const isHtml = /^<[a-zA-Z][^>]*>/.test(rawContent) && !rawContent.startsWith("# ");
    let contentHtml;

    if (isHtml) {
      contentHtml = rawContent;
      // Extrai só o body do HTML se tiver DOCTYPE/html tags
      const bodyMatch = contentHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      if (bodyMatch) {
        contentHtml = bodyMatch[1];
      }
    } else {
      // Markdown cru — converte usando o parser embutido
      contentHtml = markdownToHtml(rawContent);
    }

    // Remove scripts e estilos (segurança)
    contentHtml = contentHtml.replace(/<script[\s\S]*?<\/script>/gi, "");
    contentHtml = contentHtml.replace(/<style[\s\S]*?<\/style>/gi, "");

    // Adiciona âncoras aos headings (paridade com o frontend)
    contentHtml = addHeadingIds(contentHtml);

    const pageHtml = TEMPLATE(
      post.title || "CareConnect Blog",
      post.excerpt || "",
      contentHtml,
      post.slug || cleanSlug,
      post.cover_image || "",
      faqSchemaHtml + localBusinessSchemaHtml
    );

    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400");
    response.setHeader("X-Robots-Tag", "index, follow");
    response.status(200).send(pageHtml);
  } catch (error) {
    console.error("Blog render error:", error);
    response.status(503).send("Service temporarily unavailable");
  }
}

