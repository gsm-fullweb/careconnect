#!/usr/bin/env node
/**
 * CareConnect — Publicador de posts no blog (Supabase)
 * -----------------------------------------------------
 * Lê um arquivo Markdown (com frontmatter YAML simples), converte para HTML
 * e faz upsert na tabela `blog_posts` do Supabase, casando pelo `slug`.
 *
 * Segurança:
 *  - Requer a SERVICE_ROLE key do Supabase (secreta) via variável de ambiente.
 *    NUNCA coloque a chave neste arquivo nem faça commit dela. Use um .env local
 *    (já ignorado pelo .gitignore) ou exporte no terminal.
 *  - Por padrão o post entra como RASCUNHO (published=false). Use --publish para
 *    publicar de fato.
 *
 * Uso:
 *   node --env-file=.env scripts/publish-post.mjs caminho/post.md
 *   node --env-file=.env scripts/publish-post.mjs caminho/post.md --publish
 *   node --env-file=.env scripts/publish-post.mjs caminho/post.md --dry-run
 *
 * Variáveis de ambiente:
 *   SUPABASE_URL                (opcional; default = projeto CareConnect)
 *   SUPABASE_SERVICE_ROLE_KEY   (obrigatória para gravar)
 *   BLOG_AUTHOR_ID              (opcional; UUID de um profile admin para author_id)
 *
 * Frontmatter aceito (todas opcionais exceto title):
 *   ---
 *   title: "Quanto custa um cuidador de idosos em Mogi das Cruzes"
 *   slug: quanto-custa-cuidador-idosos-mogi-das-cruzes
 *   excerpt: "Veja preços de 2026 por diária, mensalista, noturno e 24h."
 *   cover_image: https://.../capa.webp
 *   published: false
 *   ---
 *   # Título do artigo
 *   Conteúdo em **markdown**...
 */

import { readFileSync } from "node:fs";
import { argv, env, exit } from "node:process";
import { marked } from "marked";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://dyxkbbojlyppizsgjjxx.supabase.co";
const SITE_BASE = "https://www.careconnect.com.br";

// ---------- CLI ----------
const args = argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const positional = args.filter((a) => !a.startsWith("--"));
const file = positional[0];
const wantPublish = flags.has("--publish");
const dryRun = flags.has("--dry-run");

if (!file) {
  console.error("Uso: node --env-file=.env scripts/publish-post.mjs <arquivo.md> [--publish] [--dry-run]");
  exit(1);
}

// ---------- Frontmatter parser (mínimo, sem dependências) ----------
function parseFrontmatter(raw) {
  const fm = {};
  let body = raw;
  const match = raw.match(/^﻿?---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (match) {
    const [, block, rest] = match;
    body = rest;
    for (const line of block.split("\n")) {
      const m = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)$/);
      if (!m) continue;
      let [, key, val] = m;
      val = val.trim().replace(/^["'](.*)["']$/, "$1"); // tira aspas externas
      if (val === "true") val = true;
      else if (val === "false") val = false;
      fm[key] = val;
    }
  }
  return { fm, body };
}

function slugify(s) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------- Lê e prepara o post ----------
let raw;
try {
  raw = readFileSync(file, "utf8");
} catch (e) {
  console.error(`Não consegui ler o arquivo: ${file}\n${e.message}`);
  exit(1);
}

const { fm, body } = parseFrontmatter(raw);

// ---------- Limpeza: remove seções de briefing/metadados que sobram no corpo ----------
function stripMetaSections(text) {
  // Remove tudo antes de '=== CONTEÚDO ===' (se existir)
  text = text.replace(/^[\s\S]*?=== CONTEÚDO ===\s*/m, '');
  // Remove blocos de metadados pós-conteúdo (FAQ, links internos, notas)
  text = text.replace(/=== FAQ SCHEMA[\s\S]*?(?===|$)/m, '');
  text = text.replace(/=== INTERNAL LINKS SUGERIDOS[\s\S]*?(?===|$)/m, '');
  text = text.replace(/=== NOTAS EDITORIAIS[\s\S]*$/m, '');
  // Remove === TITLE TAG === e === META DESCRIPTION === soltos
  text = text.replace(/=== TITLE TAG ===[\s\S]*?(?===|$)/m, '');
  text = text.replace(/=== SEO BRIEFING ===[\s\S]*?(?===|$)/m, '');
  text = text.replace(/=== META DESCRIPTION ===[\s\S]*?(?===|$)/m, '');
  return text.trim();
}

const cleanBody = stripMetaSections(body);

// title: frontmatter > primeiro H1
let title = fm.title;
if (!title) {
  const h1 = cleanBody.match(/^\s*#\s+(.+)$/m);
  title = h1 ? h1[1].trim() : null;
}
if (!title) {
  console.error("Faltou o título. Adicione `title:` no frontmatter ou um `# Título` no corpo.");
  exit(1);
}

const slug = fm.slug ? slugify(String(fm.slug)) : slugify(title);
const excerpt = fm.excerpt || null;
const coverImage = fm.cover_image || null;
const authorId = fm.author_id || env.BLOG_AUTHOR_ID || null;

// published: --publish vence; senão frontmatter; senão false (rascunho)
const published = wantPublish ? true : fm.published === true;

// Converte markdown -> HTML (o blog renderiza HTML no campo content)
const contentHtml = marked.parse(cleanBody);

const postUrl = `${SITE_BASE}/blog/${slug}`;

console.log("──────────────────────────────────────────");
console.log("Título   :", title);
console.log("Slug     :", slug);
console.log("Excerpt  :", excerpt || "(nenhum)");
console.log("Capa     :", coverImage || "(nenhuma)");
console.log("Autor    :", authorId || "(null)");
console.log("Status   :", published ? "PUBLICADO" : "rascunho (published=false)");
console.log("URL final:", postUrl);
console.log("HTML     :", `${contentHtml.length} caracteres`);
console.log("──────────────────────────────────────────");

if (dryRun) {
  console.log("✓ --dry-run: nada foi gravado. Confira os campos acima.");
  exit(0);
}

// ---------- Conexão com Supabase ----------
const supabaseUrl = env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceKey) {
  console.error(
    "\nFalta a SUPABASE_SERVICE_ROLE_KEY no ambiente.\n" +
      "A chave anon (pública) não consegue inserir por causa do RLS.\n" +
      "Pegue a service_role em: Supabase → Project Settings → API → service_role.\n" +
      "Depois rode com: node --env-file=.env scripts/publish-post.mjs <arquivo.md>\n" +
      "(coloque SUPABASE_SERVICE_ROLE_KEY=... no seu .env local — ele já está no .gitignore)"
  );
  exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});

// ---------- Upsert por slug ----------
const now = new Date().toISOString();

const row = {
  title,
  slug,
  content: contentHtml,
  excerpt,
  cover_image: coverImage,
  published,
  updated_at: now,
};
if (authorId) row.author_id = authorId;

try {
  const { data: existing, error: selErr } = await supabase
    .from("blog_posts")
    .select("id, published")
    .eq("slug", slug)
    .maybeSingle();

  if (selErr) throw selErr;

  let result;
  if (existing) {
    result = await supabase
      .from("blog_posts")
      .update(row)
      .eq("id", existing.id)
      .select("id, slug, published")
      .single();
    console.log(`↻ Atualizado post existente (id ${existing.id}).`);
  } else {
    result = await supabase
      .from("blog_posts")
      .insert(row)
      .select("id, slug, published")
      .single();
    console.log("✚ Novo post criado.");
  }

  if (result.error) throw result.error;

  console.log("✓ Sucesso:", result.data);
  console.log(
    published
      ? `\n🟢 Publicado: ${postUrl}`
      : `\n🟡 Salvo como rascunho. Revise no painel admin e publique quando quiser (ou rode de novo com --publish).`
  );
} catch (e) {
  console.error("\n✗ Erro ao gravar no Supabase:");
  console.error(e.message || e);
  if (String(e.message || "").toLowerCase().includes("row-level security")) {
    console.error(
      "→ Isso indica que a chave usada não é service_role (ou o RLS bloqueou). Use a service_role key."
    );
  }
  exit(1);
}
