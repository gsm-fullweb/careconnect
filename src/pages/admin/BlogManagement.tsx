import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

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

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Gerenciamento de Blog</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <h2 className="text-lg font-medium mb-4">Crie uma postagem do WordPress com IA</h2>
        <form
          className="space-y-4"
          method="POST"
          action="https://n8n-n8n.n1n956.easypanel.host/webhook/blog"
        >
          <div className="flex flex-col md:flex-row items-center gap-3">
            <label htmlFor="keyword" className="sr-only">Palavra-chave</label>
            <input
              type="text"
              id="keyword"
              name="keyword"
              className="flex-1 border border-gray-300 px-4 py-2 rounded-md w-full max-w-md"
              placeholder="Digite a palavra-chave da postagem"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md min-w-[180px] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 512 512" className="mr-2">
                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"></path>
              </svg>
              Criar matéria agora
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
              <li key={post.id} className="p-4">
                <div className="font-bold text-gray-900">{post.title}</div>
                <div className="text-gray-600 text-sm">{post.excerpt}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(post.created_at).toLocaleDateString("pt-BR")}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
