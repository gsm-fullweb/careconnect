import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author_id: string;
  published: boolean;
  created_at: string;
}

const BlogManagement = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch {
      toast({ title: "Erro", description: "Falha ao carregar posts", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este post?")) return;

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", postId);
      if (error) throw error;
      setPosts(posts.filter(post => post.id !== postId));
      toast({ title: "Sucesso", description: "Post excluído com sucesso." });
    } catch {
      toast({ title: "Erro", description: "Falha ao excluir post", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleGenerateAiPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    try {
      setIsGenerating(true);
      toast({ title: "Gerando matéria...", description: "A IA está escrevendo o seu artigo. Isso pode levar alguns segundos." });

      // Chama a edge function que acabamos de criar via OpenAI
      const { data: aiData, error: aiError } = await supabase.functions.invoke("blog-ai-assistant", {
        body: { text: keyword, action: "generate" },
      });

      if (aiError) throw new Error(aiError.message);
      if (aiData?.error) throw new Error(aiData.error);

      const generatedHtml = aiData?.improvedText || "";
      
      const slug = keyword
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '') + '-' + Math.floor(Math.random() * 1000);

      // Cria o Rascunho no Banco de Dados
      const { data: insertData, error: insertError } = await supabase
        .from("blog_posts")
        .insert({
          title: keyword,
          slug: slug,
          content: generatedHtml,
          published: false,
          excerpt: "Matéria gerada por Inteligência Artificial."
        })
        .select("id")
        .single();

      if (insertError) throw insertError;

      toast({ title: "Sucesso!", description: "Matéria criada com sucesso! Redirecionando para revisão..." });
      
      // Envia o usuário imediatamente para o post criado para revisar e publicar
      navigate(`/admin/blog/edit/${insertData.id}`);

    } catch (err: any) {
      toast({ title: "Erro na IA", description: err.message || "Tente novamente mais tarde.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Gerenciamento de Blog</h1>
        <Button asChild>
          <Link to="/admin/blog/edit/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Post Manual
          </Link>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <h2 className="text-lg font-medium mb-4">✨ Crie uma Postagem do Blog com IA</h2>
        <form
          className="space-y-4"
          onSubmit={handleGenerateAiPost}
        >
          <div className="flex flex-col md:flex-row items-center gap-3">
            <label htmlFor="keyword" className="sr-only">Palavra-chave/Tema</label>
            <input
              type="text"
              id="keyword"
              name="keyword"
              className="flex-1 border border-gray-300 px-4 py-2 rounded-md w-full max-w-md"
              placeholder="Digite a palavra-chave (Ex: Quando a família deve contratar um cuidador)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
              disabled={isGenerating}
            />
            <button
              type="submit"
              disabled={isGenerating}
              className="bg-careconnect-green hover:bg-careconnect-green/90 transition-colors text-white px-4 py-2 rounded-md min-w-[180px] flex items-center justify-center font-medium"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Escrevendo...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 512 512" className="mr-2" fill="currentColor">
                    <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"></path>
                  </svg>
                  Criar matéria agora
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Posts Existentes ({posts.length})</h2>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Carregando posts...</span>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {posts.map((post) => (
              <li key={post.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-gray-900">{post.title}</div>
                  <div className="text-gray-600 text-sm">{post.excerpt}</div>
                  <div className="text-xs text-gray-400 mt-1 flex gap-2 items-center">
                    <span>{new Date(post.created_at).toLocaleDateString("pt-BR")}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {post.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link to={`/admin/blog/edit/${post.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
