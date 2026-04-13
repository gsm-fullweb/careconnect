import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";

import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("id, title, excerpt, cover_image, created_at, slug")
          .eq("published", true)
          .order("created_at", { ascending: false });
        
        if (!error && data) {
          setPosts(data);
        }
      } catch (err) {
        console.error("Erro ao carregar posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);
  
  // Filter posts based on search
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (post.excerpt?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-careconnect-blue/90 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Blog CareConnect</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Insights, dicas e recursos para cuidadores e pacientes.
          </p>
        </div>
      </div>
      
      {/* Blog Content */}
      <section className="section bg-white">
        <div className="container-custom">
          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 md:items-center mb-6 max-w-lg mx-auto">
              <div className="flex-grow">
                <Input
                  placeholder="Pesquisar publicações do blog..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-careconnect-blue mb-4 h-8 w-8" />
                <span className="ml-2 text-gray-600">Carregando matérias...</span>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold mb-4">Nenhum resultado encontrado</h3>
                <p className="text-gray-600 mb-6">
                  Tente ajustar sua pesquisa ou ainda não existem publicações.
                </p>
                <Button onClick={() => setSearchTerm("")} variant="outline">
                  Limpar Pesquisa
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden card-hover">
                    <div className="aspect-video relative overflow-hidden bg-gray-100">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Sem Imagem
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-careconnect-blue text-white text-sm font-medium py-1 px-3 rounded-full">
                        Blog
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">
                        <Link to={`/blog/${post.slug || post.id}`} className="hover:text-careconnect-blue">
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 line-clamp-3 mb-4">{post.excerpt || "Nenhum resumo disponível."}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link to={`/blog/${post.slug || post.id}`}>Ler Mais</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* Newsletter Signup */}
          <div className="mt-16 bg-careconnect-light p-8 md:p-12 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  Inscreva-se em Nossa Newsletter
                </h2>
                <p className="text-gray-700 mb-4">
                  Mantenha-se atualizado com nossos artigos mais recentes e dicas de cuidado.
                  Entregaremos diretamente no seu email.
                </p>
                <p className="text-gray-500 text-sm">
                  Respeitamos sua privacidade e nunca compartilharemos suas informações.
                </p>
              </div>
              <div>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <Input placeholder="Seu Nome" />
                  <Input placeholder="Seu Email" type="email" />
                  <Button className="w-full bg-careconnect-blue hover:bg-careconnect-blue/90">
                    Inscrever-se Agora
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
