import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { marked } from "marked";

marked.use({ breaks: true, gfm: true });

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

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
          
          // INJEÇÃO DE SEO PARA O GOOGLE
          document.title = `${data.title} | CareConnect Blog`;
          
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', data.excerpt || data.title);
        }

        // Buscar posts recentes para a sidebar
        const { data: recent } = await supabase
          .from("blog_posts")
          .select("id, title, cover_image, created_at, slug")
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
        <div className="flex justify-center items-center py-40">
          <Loader2 className="animate-spin text-careconnect-blue mb-4 h-12 w-12" />
          <span className="ml-4 text-xl text-gray-600">Carregando matéria...</span>
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

  return (
    <Layout>
      {/* Article Hero */}
      <div className="bg-careconnect-blue/90 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4">
              <span className="inline-block bg-white/20 text-white text-sm font-medium py-1 px-3 rounded-full">
                Artigo
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center text-white/80 text-sm md:text-base">
              <span className="mr-4">Publicado em {new Date(post.created_at).toLocaleDateString("pt-BR")}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="max-w-3xl border-b pb-8">
                {/* Featured Image */}
                {post.cover_image && (
                  <div className="mb-10 rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      fetchPriority="high"
                      decoding="sync"
                      className="w-full h-auto max-h-[500px] object-cover"
                    />
                  </div>
                )}
                
                {/* Article Body */}
                <style dangerouslySetInnerHTML={{__html: `
                  .g1-article-format {
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
                    color: #333333 !important;
                    font-size: 20px !important;
                    line-height: 32px !important;
                    word-wrap: break-word;
                  }
                  .g1-article-format p, 
                  .g1-article-format div {
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
                    color: #333333 !important;
                    font-size: 20px !important;
                    line-height: 1.6 !important;
                    margin-bottom: 28px !important;
                  }
                  .g1-article-format h1,
                  .g1-article-format h2,
                  .g1-article-format h3,
                  .g1-article-format h4 {
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
                    color: #222222 !important;
                    font-weight: 700 !important;
                    clear: both;
                  }
                  .g1-article-format h2 {
                    font-size: 32px !important;
                    line-height: 38px !important;
                    margin-top: 48px !important;
                    margin-bottom: 24px !important;
                  }
                  .g1-article-format h3 {
                    font-size: 24px !important;
                    line-height: 30px !important;
                    margin-top: 32px !important;
                    margin-bottom: 16px !important;
                  }
                  .g1-article-format a {
                    color: #c00 !important; /* G1 Link Red */
                    font-weight: bold !important;
                    text-decoration: none !important;
                  }
                  .g1-article-format a:hover {
                    text-decoration: underline !important;
                  }
                  .g1-article-format ul, 
                  .g1-article-format ol {
                    margin-bottom: 28px !important;
                    padding-left: 40px !important;
                  }
                  .g1-article-format li {
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
                    font-size: 20px !important;
                    line-height: 32px !important;
                    color: #333333 !important;
                    margin-bottom: 12px !important;
                  }
                  .g1-article-format strong,
                  .g1-article-format b {
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
                    color: #222222 !important;
                    font-weight: bold !important;
                  }
                  .g1-article-format img {
                    max-width: 100% !important;
                    height: auto !important;
                    margin-bottom: 28px !important;
                    border-radius: 4px;
                  }
                `}} />
                
                {/* Article Body */}
                <div 
                  className="g1-article-format"
                  dangerouslySetInnerHTML={{ __html: marked.parse(post.content || "", { async: false }) as string }}
                />
                
                {/* Share and Navigate */}
                <div className="mt-12 flex flex-col sm:flex-row sm:justify-between sm:items-center pt-8">
                  <div className="mb-4 sm:mb-0">
                    <span className="text-gray-700 font-medium mr-4">Compartilhar artigo:</span>
                    <div className="inline-flex space-x-2 mt-2">
                      <Button variant="outline" size="sm" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${post.title}&url=${window.location.href}`, '_blank')}>Twitter</Button>
                      <Button variant="outline" size="sm" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}>Facebook</Button>
                      <Button variant="outline" size="sm" onClick={() => window.navigator.clipboard.writeText(window.location.href).then(() => alert('Link copiado!'))}>Copiar Link</Button>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button asChild variant="outline">
                      <Link to="/blog">Voltar ao Blog</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8 sticky top-6">
                {/* About CareConnect */}
                <div className="bg-careconnect-light p-6 rounded-xl border border-blue-50">
                  <h3 className="text-xl font-bold mb-3 text-careconnect-blue">CareConnect</h3>
                  <p className="text-gray-700 mb-5 text-sm leading-relaxed">
                    Nossa missão é oferecer serviços de cuidadores sob medida para suas necessidades,
                    garantindo independência, saúde e qualidade de vida no conforto do seu lar.
                  </p>
                  <Button asChild className="w-full bg-careconnect-blue hover:bg-careconnect-blue/90">
                    <Link to="/contact">Fale Conosco</Link>
                  </Button>
                </div>
                
                {/* Related Posts */}
                {recentPosts.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Posts Recentes</h3>
                    <div className="space-y-5">
                      {recentPosts.map((recentItem) => (
                        <Card key={recentItem.id} className="overflow-hidden shadow-sm border-gray-200">
                          {recentItem.cover_image && (
                            <div className="aspect-video relative overflow-hidden bg-gray-100">
                              <img
                                src={recentItem.cover_image}
                                alt={recentItem.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-base line-clamp-2 leading-tight">
                              <Link to={`/blog/${recentItem.slug || recentItem.id}`} className="hover:text-careconnect-blue transition-colors">
                                {recentItem.title}
                              </Link>
                            </CardTitle>
                          </CardHeader>
                          <CardFooter className="p-4 pt-0 text-xs text-gray-500 font-medium">
                            {new Date(recentItem.created_at).toLocaleDateString("pt-BR")}
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="section bg-careconnect-light border-t border-gray-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-careconnect-blue">
              Inscreva-se na nossa Newsletter
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              Receba as melhores dicas de cuidado e novidades direto no seu e-mail.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={e => e.preventDefault()}>
              <Input 
                placeholder="Seu endereço de e-mail" 
                type="email"
                className="sm:flex-grow h-12"
                required
              />
              <Button type="submit" className="h-12 px-8 bg-careconnect-blue hover:bg-careconnect-blue/90 font-semibold text-white">
                Inscrever
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
