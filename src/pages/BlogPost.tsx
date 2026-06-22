import { useEffect, useState, useMemo } from "react";
import { formatDate } from "@/lib/utils";
import { prepareContentForRender, type BlogPostRecord, type BlogPostListItem } from "@/lib/blogUtils";
import SEO from "@/components/SEO";
import { ArticleSchema, BreadcrumbSchema } from "@/components/SchemaOrg";

import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Calendar, Clock, User, Share2, Facebook, Copy, ChevronRight, Home, List } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { toast } from "sonner";

marked.use({ breaks: true, gfm: true });

/** Gera um slug estável para usar como âncora (id) de um heading. */
function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPostRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState<BlogPostListItem[]>([]);

  // Sanitiza o conteúdo: strip frontmatter, extrai schemas, detecta HTML vs Markdown,
  // protege contra XSS, adiciona âncoras nos headings e monta o índice (TOC).
  const prepared = useMemo(() => {
    if (!post?.content) return null;
    const result = prepareContentForRender(post.content);
    const rawHtml = result.isHtml
      ? result.content
      : (marked.parse(result.content, { async: false }) as string);

    // 🔒 Sanitiza contra XSS antes de injetar via dangerouslySetInnerHTML
    const safeHtml = DOMPurify.sanitize(rawHtml, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "rel"],
    });

    let htmlContent = safeHtml;
    const toc: TocItem[] = [];
    let wordCount = 0;

    if (typeof window !== "undefined") {
      const doc = new DOMParser().parseFromString(safeHtml, "text/html");

      // IDs únicos nos headings + entradas do índice
      const usedIds = new Set<string>();
      doc.querySelectorAll("h2, h3").forEach((el) => {
        const text = el.textContent?.trim() || "";
        if (!text) return;
        const base = slugifyHeading(text) || "secao";
        let id = base;
        let n = 2;
        while (usedIds.has(id)) id = `${base}-${n++}`;
        usedIds.add(id);
        el.id = id;
        toc.push({ id, text, level: el.tagName === "H2" ? 2 : 3 });
      });

      // Links externos abrem em nova aba com segurança
      doc.querySelectorAll('a[href^="http"]').forEach((a) => {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      });

      htmlContent = doc.body.innerHTML;
      wordCount = (doc.body.textContent || "").split(/\s+/).filter(Boolean).length;
    } else {
      wordCount = safeHtml.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    }

    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    return { ...result, htmlContent, toc, readingTime };
  }, [post?.content]);

  const readingTime = prepared?.readingTime ?? 0;

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        if (!id) return;

        // Verifica se o ID passado é um UUID válido para buscar por ID, senão busca pelo Slug
        const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-{0,1}[0-9a-fA-F]{4}-{0,1}[0-9a-fA-F]{4}-{0,1}[0-9a-fA-F]{12}$/.test(id);
        
        let query = supabase.from("blog_posts").select("*").eq("published", true);
        
        if (isUUID) {
          query = query.eq("id", id);
        } else {
          query = query.eq("slug", id);
        }

        const { data, error } = await query.single();
        
        if (error) {
          console.error("Erro ao buscar post:", error);
        } else if (data) {
          setPost(data);
        }

        // Buscar posts recentes para a sidebar
        const { data: recent } = await supabase
          .from("blog_posts")
          .select("id, title, excerpt, cover_image, created_at, slug")
          .eq("published", true)
          .neq("id", data?.id || "") // Exclui o post atual
          .order("created_at", { ascending: false })
          .limit(3);
          
        if (recent) setRecentPosts(recent);

      } catch (err) {
        console.error("Exceção ao carregar post:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center py-40">
          <Loader2 className="animate-spin text-careconnect-blue mb-4 h-12 w-12" />
          <span className="text-lg text-gray-500">Carregando matéria...</span>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container-custom text-center py-40">
          <h1 className="text-3xl font-bold mb-4">Post não encontrado</h1>
          <p className="text-gray-600 mb-8">Esta matéria pode ter sido removida ou o link está incorreto.</p>
          <Button asChild>
            <Link to="/blog">Voltar para o Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    switch (platform) {
      case "whatsapp":
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`, "_blank");
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "copy":
        navigator.clipboard.writeText(url).then(
          () => toast.success("Link copiado para a área de transferência!"),
          () => toast.error("Não foi possível copiar o link.")
        );
        break;
    }
  };

  return (
    <Layout>
      {post && (
        <>
          <SEO
            title={post.title}
            description={post.excerpt || post.title}
            canonical={`/blog/${post.slug || post.id}`}
            type="article"
            image={post.cover_image}
          />
          <ArticleSchema
            title={post.title}
            description={post.excerpt || post.title}
            image={post.cover_image}
            datePublished={post.created_at}
            dateModified={post.updated_at || post.created_at}
            url={`/blog/${post.slug || post.id}`}
          />
          <BreadcrumbSchema
            items={[
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
              { name: post.title, url: `/blog/${post.slug || post.id}` }
            ]}
          />
          {/* Injeta FAQ Schema extraído do conteúdo como JSON-LD */}
          {prepared?.faqSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(prepared.faqSchema) }}
            />
          )}
          {/* Injeta Local Business Schema extraído do conteúdo como JSON-LD */}
          {prepared?.localBusinessSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(prepared.localBusinessSchema) }}
            />
          )}
        </>
      )}

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-3">
          <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
              <li className="flex items-center gap-1.5">
                <Link to="/" className="hover:text-careconnect-blue transition-colors flex items-center gap-1">
                  <Home className="h-3.5 w-3.5" />
                  <span>Início</span>
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                <Link to="/blog" className="hover:text-careconnect-blue transition-colors">Blog</Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-gray-800 font-medium line-clamp-1">{post.title}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Back to Blog */}
      <div className="container-custom py-3">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-careconnect-blue transition-colors font-medium">
          <ArrowLeft className="h-4 w-4" />
          Voltar para o Blog
        </Link>
      </div>

      {/* Article */}
      <article className="container-custom pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="flex gap-2 mb-5 flex-wrap">
            <span className="inline-flex items-center rounded-full bg-careconnect-blue text-white px-3 py-1 text-xs font-semibold">
              Blog CareConnect
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            {post.title}
          </h1>

          {/* Excerpt / Quick Answer */}
          {post.excerpt && (
            <p className="text-lg font-medium text-gray-700 mb-8 leading-relaxed border-l-4 border-careconnect-blue pl-5 py-1">
              {post.excerpt}
            </p>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-500 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Equipe CareConnect</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.created_at)}</span>
            </div>
            {post.updated_at && post.updated_at !== post.created_at && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Atualizado em {formatDate(post.updated_at)}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min de leitura</span>
            </div>
          </div>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
              <img
                src={post.cover_image}
                alt={`Imagem de capa: ${post.title}`}
                fetchPriority="high"
                decoding="sync"
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Índice / Sumário (TOC) — só aparece em artigos com 3+ seções */}
          {prepared && prepared.toc.length >= 3 && (
            <nav
              aria-label="Índice do artigo"
              className="mb-10 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                <List className="h-4 w-4 text-careconnect-blue" />
                Neste artigo
              </p>
              <ul className="space-y-1.5">
                {prepared.toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-gray-600 hover:text-careconnect-blue hover:underline transition-colors"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* ═══════ Article Body ═══════ */}
          <div
            className="cc-article-body"
            dangerouslySetInnerHTML={{ __html: prepared?.htmlContent || "" }}
          />

          {/* Divider */}
          <hr className="my-12 border-gray-200" />

          {/* Share Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <Share2 className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 font-semibold text-sm">Compartilhar:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="inline-flex items-center justify-center h-9 px-3 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all"
                  aria-label="Compartilhar no WhatsApp"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="inline-flex items-center justify-center h-9 px-3 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all"
                  aria-label="Compartilhar no Facebook"
                >
                  <Facebook className="h-3.5 w-3.5 mr-1" /> Facebook
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="inline-flex items-center justify-center h-9 px-3 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 transition-all"
                  aria-label="Compartilhar no Twitter"
                >
                  Twitter
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="inline-flex items-center justify-center h-9 px-3 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-all"
                  aria-label="Copiar link"
                >
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copiar Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-careconnect-blue py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Precisa de um cuidador de idosos?
            </h2>
            <p className="text-white/85 text-lg mb-8 leading-relaxed">
              A CareConnect conecta famílias a cuidadores qualificados em Mogi das Cruzes e todo o Alto Tietê.
              Seleção rigorosa, substituição garantida e acompanhamento contínuo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-careconnect-blue hover:bg-gray-100 font-bold px-8 h-12 rounded-full text-base">
                <a href="https://wa.me/5511948633976?text=Ol%C3%A1!%20Vim%20pelo%20blog%20da%20CareConnect%20e%20preciso%20de%20um%20cuidador." target="_blank" rel="noopener noreferrer">
                  Fale pelo WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-bold px-8 h-12 rounded-full text-base">
                <Link to="/contact">
                  Solicitar Orçamento
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-gray-50 py-16 border-t border-gray-100">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">
              Continue Lendo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {recentPosts.map((recentItem) => (
                <Card key={recentItem.id} className="overflow-hidden shadow-sm border-gray-200 hover:shadow-md transition-shadow bg-white">
                  {recentItem.cover_image && (
                    <div className="aspect-video relative overflow-hidden bg-gray-100">
                      <img
                        src={recentItem.cover_image}
                        alt={recentItem.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-base line-clamp-2 leading-snug font-semibold">
                      <Link to={`/blog/${recentItem.slug || recentItem.id}`} className="hover:text-careconnect-blue transition-colors">
                        {recentItem.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="p-5 pt-1 text-xs text-gray-500 font-medium">
                    {formatDate(recentItem.created_at)}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogPost;
