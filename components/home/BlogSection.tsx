"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BlogSection() {
  const articles = [
    {
      id: 1,
      title: "Como Escolher o Cuidador Ideal para um Idoso?",
      excerpt: "Escolher o cuidador ideal para um idoso é uma decisão que vai além da experiência ou formação técnica.",
      image: "/blog/article-1.jpg",
      slug: "como-escolher-o-cuidador-ideal-para-um-idoso",
    },
    {
      id: 2,
      title: "Os Benefícios do Acompanhamento Domiciliar para a Qualidade de Vida",
      excerpt: "O acompanhamento domiciliar é uma prática essencial para garantir a qualidade de vida de pacientes em recuperação.",
      image: "/blog/article-2.jpg",
      slug: "os-beneficios-do-acompanhamento-domiciliar-para-a-qualidade-de-vida",
    },
    {
      id: 3,
      title: "Tecnologia e Cuidado: Como a IA Facilita a Conexão com Cuidadores",
      excerpt: "A tecnologia tem revolucionado a forma como nos conectamos com cuidadores, especialmente na saúde.",
      image: "/blog/article-3.jpg",
      slug: "tecnologia-e-cuidado-como-a-ia-facilita-a-conexao-com-cuidadores",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Conteúdo Relevante</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Encontre informações relevantes para ajudar na melhor idade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">
                  <Link href={`/blog/${article.slug}`} className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <Button
                  asChild
                  variant="outline"
                  className="text-primary border-primary hover:bg-primary/10"
                >
                  <Link href="https://blog.careconnect.com.br/" target="_blank" rel="noopener noreferrer">Veja mais!</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
