/**
 * blogUtils.ts — Utilitários para sanitização de conteúdo do blog
 *
 * O agente de publicação (Charli) às vezes insere Markdown cru no Supabase
 * (com frontmatter YAML e blocos de metadados === ... ===), ao invés de
 * HTML pré-convertido pelo publish-post.mjs. Estas funções tornam o frontend
 * resiliente a ambos os formatos.
 */

/** Registro completo de um post do blog (tabela `blog_posts`). */
export interface BlogPostRecord {
  id: string;
  title: string;
  slug: string | null;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string | null;
  author_id?: string | null;
}

/** Subconjunto usado nas listagens e cards (Blog, posts relacionados). */
export type BlogPostListItem = Pick<
  BlogPostRecord,
  "id" | "title" | "excerpt" | "cover_image" | "created_at" | "slug"
>;

/** Remove o bloco de frontmatter YAML do início do conteúdo, se presente. */
export function stripFrontmatter(content: string): string {
  // Matches optional BOM + --- at start, YAML block, closing ---
  return content.replace(/^\uFEFF?---\s*\n[\s\S]*?\n---\s*\n?/, "");
}

interface ExtractedSchemas {
  cleanContent: string;
  faqSchema: Record<string, unknown> | null;
  localBusinessSchema: Record<string, unknown> | null;
}

/**
 * Remove blocos de metadados (=== SECTION ===) do corpo do conteúdo
 * e extrai schemas JSON-LD (FAQ, LocalBusiness) se presentes.
 */
export function stripMetaSections(content: string): ExtractedSchemas {
  let faqSchema: Record<string, unknown> | null = null;
  let localBusinessSchema: Record<string, unknown> | null = null;

  // Extrai FAQ Schema JSON
  const faqMatch = content.match(
    /=== FAQ SCHEMA ===\s*\n(?:```json\s*\n)?([\s\S]*?)(?:\n```)?(?=\n=== |$)/m
  );
  if (faqMatch) {
    try {
      faqSchema = JSON.parse(faqMatch[1].trim()) as Record<string, unknown>;
    } catch {
      // JSON inválido — ignora silenciosamente
    }
  }

  // Extrai Local Business Schema JSON
  const lbMatch = content.match(
    /=== LOCAL BUSINESS SCHEMA ===\s*\n(?:```json\s*\n)?([\s\S]*?)(?:\n```)?(?=\n=== |$)/m
  );
  if (lbMatch) {
    try {
      localBusinessSchema = JSON.parse(lbMatch[1].trim()) as Record<string, unknown>;
    } catch {
      // JSON inválido — ignora silenciosamente
    }
  }

  // Remove todos os blocos === ... === e seu conteúdo
  let cleanContent = content;

  // Remove tudo antes de '=== CONTEÚDO ===' (se existir)
  cleanContent = cleanContent.replace(/^[\s\S]*?=== CONTEÚDO ===\s*/m, "");

  // Remove blocos de metadados pós-conteúdo
  cleanContent = cleanContent.replace(
    /=== (?:FAQ SCHEMA|LOCAL BUSINESS SCHEMA|INTERNAL LINKS SUGERIDOS|NOTAS EDITORIAIS|TITLE TAG|SEO BRIEFING|META DESCRIPTION)[\s\S]*?(?=\n=== |$)/gm,
    ""
  );

  return {
    cleanContent: cleanContent.trim(),
    faqSchema,
    localBusinessSchema,
  };
}

/**
 * Detecta se o conteúdo já é HTML (começa com uma tag HTML) ou é Markdown.
 * Conteúdo misto (ex.: HTML parcial com Markdown) é tratado como Markdown.
 */
export function isHtmlContent(content: string): boolean {
  const trimmed = content.trim();
  // Se começa com uma tag HTML (ex.: <h1>, <p>, <div>, <article>)
  // e NÃO começa com um heading Markdown (# ...)
  return /^<[a-zA-Z][^>]*>/.test(trimmed) && !trimmed.startsWith("# ");
}

/**
 * Pipeline completo de sanitização: strip frontmatter → strip meta sections → retorna conteúdo limpo.
 * O caller decide se converte Markdown → HTML (usando marked.parse) baseado em `isHtml`.
 */
export function prepareContentForRender(rawContent: string): {
  content: string;
  isHtml: boolean;
  faqSchema: Record<string, unknown> | null;
  localBusinessSchema: Record<string, unknown> | null;
} {
  // 1. Remove frontmatter YAML
  const withoutFrontmatter = stripFrontmatter(rawContent);

  // 2. Remove e extrai seções de metadados
  const { cleanContent, faqSchema, localBusinessSchema } =
    stripMetaSections(withoutFrontmatter);

  // 3. Detecta formato
  const isHtml = isHtmlContent(cleanContent);

  return {
    content: cleanContent,
    isHtml,
    faqSchema,
    localBusinessSchema,
  };
}
