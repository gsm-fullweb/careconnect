/**
 * API Route: /api/blog-render
 * 
 * Server-Side Render (SSR) de posts do blog para crawlers.
 * Quando Googlebot/Bingbot acessar /blog/:slug, o Vercel rewrite 
 * redireciona pra cá, que devolve HTML completo com o conteúdo do post.
 * 
 * Visitantes normais continuam recebendo a SPA normal.
 */

const SITE_URL = "https://www.careconnect.com.br";
const SUPABASE_URL = process.env.SUPABASE_URL || "https://dyxkbbojlyppizsgjjxx.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const TEMPLATE = (title, description, content, slug, image) => `<!DOCTYPE html>
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

  // Processa blocos especiais
  let html = md;

  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold/italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");

  // Tables
  html = html.replace(
    /^\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/gm,
    (match, headerRow, bodyRows) => {
      const headers = headerRow.split("|").map((h) => h.trim()).filter(Boolean);
      const rows = bodyRows
        .trim()
        .split("\n")
        .map((row) => {
          const cells = row.split("|").map((c) => c.trim()).filter(Boolean);
          return `<tr>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`;
        })
        .join("\n");
      return `<table><thead><tr>${headers
        .map((h) => `<th>${h}</th>`)
        .join("")}</tr></thead><tbody>${rows}</tbody></table>`;
    }
  );

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, (match, item) => {
    // Skip if it's a table row
    if (item.startsWith("|")) return match;
    return `<li>${item}</li>`;
  });
  html = html.replace(/((?:<li>.*?<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

  // Paragraphs (lines that aren't already wrapped)
  const lines = html.split("\n");
  let inBlock = false;
  let result = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (
      !line ||
      line.startsWith("<h") ||
      line.startsWith("<li") ||
      line.startsWith("<ul") ||
      line.startsWith("</ul") ||
      line.startsWith("<ol") ||
      line.startsWith("</ol") ||
      line.startsWith("<table") ||
      line.startsWith("</table") ||
      line.startsWith("<tr") ||
      line.startsWith("</tr") ||
      line.startsWith("<th") ||
      line.startsWith("<td") ||
      line.startsWith("<thead") ||
      line.startsWith("</thead") ||
      line.startsWith("<tbody") ||
      line.startsWith("</tbody") ||
      line.startsWith("<blockquote") ||
      line.startsWith("</blockquote") ||
      line.startsWith("---") ||
      line.startsWith("<strong") ||
      line.startsWith("<em")
    ) {
      result.push(line);
      continue;
    }
    result.push(`<p>${line}</p>`);
  }
  html = result.join("\n");

  // Horizontal rules
  html = html.replace(/^---+$/gm, "<hr />");

  return html;
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

    // Converte o HTML já armazenado no Supabase para uma versão limpa
    // O content já está em HTML (convertido pelo marked.js no publish)
    let contentHtml = post.content || "";

    // Extrai só o body do HTML se tiver DOCTYPE/html tags
    const bodyMatch = contentHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      contentHtml = bodyMatch[1];
    }

    // Remove scripts e estilos
    contentHtml = contentHtml.replace(/<script[\s\S]*?<\/script>/gi, "");
    contentHtml = contentHtml.replace(/<style[\s\S]*?<\/style>/gi, "");

    const pageHtml = TEMPLATE(
      post.title || "CareConnect Blog",
      post.excerpt || "",
      contentHtml,
      post.slug || cleanSlug,
      post.cover_image || ""
    );

    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400");
    response.setHeader("X-Robots-Tag", "index, follow");
    response.status(200).send(pageHtml);
  } catch (error) {
    console.error("Blog render error:", error);
    response.status(503).send("Sitemap temporarily unavailable");
  }
}
