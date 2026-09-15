import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Heart, MessageCircle, Shield, Sparkles, Star } from "lucide-react";

export default function Obrigado() {
  const [name, setName] = useState("Cuidador");

  useEffect(() => {
    const fallbackUser = localStorage.getItem("fallback_user");
    if (fallbackUser) {
      const userData = JSON.parse(fallbackUser);
      setName(userData.name || "Cuidador");
    }
  }, []);

  return (
    <Layout>
      <SEO title="Obrigado!" canonical="/obrigado" noindex={true} />

      <section className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="mb-8 animate-bounce">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4 shadow-inner">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 tracking-tight">
              Parabens, {name.split(" ")[0]}! <br />
              <span className="text-careconnect-blue">Seu cadastro foi recebido.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Nossa equipe vai analisar seu perfil com cuidado. Depois da aprovacao, clientes interessados poderao falar com voce pelo WhatsApp informado no cadastro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-none shadow-md bg-white hover:shadow-xl transition-shadow border-t-4 border-blue-400">
              <CardContent className="pt-6">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Valorizacao</h3>
                <p className="text-sm text-gray-500 italic">Cuidar e uma profissao de confianca.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white hover:shadow-xl transition-shadow border-t-4 border-yellow-400">
              <CardContent className="pt-6">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Oportunidades</h3>
                <p className="text-sm text-gray-500 italic">Clientes podem conhecer seu perfil e chamar voce.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white hover:shadow-xl transition-shadow border-t-4 border-green-400">
              <CardContent className="pt-6">
                <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Seguranca</h3>
                <p className="text-sm text-gray-500 italic">Seu perfil passa por analise antes de ficar disponivel.</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-blue-100 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-20 h-20 text-blue-900" />
            </div>

            <h2 className="text-2xl font-bold text-blue-900 mb-4">Fique atento ao seu WhatsApp</h2>
            <p className="text-gray-600 mb-6">
              Quando houver interesse no seu perfil, o cliente usara o WhatsApp cadastrado para conversar, tirar duvidas, combinar horarios e avaliar a contratacao.
            </p>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-8 text-left flex gap-4">
              <div className="w-11 h-11 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-green-900 mb-1">Mantenha o numero atualizado</h3>
                <p className="text-sm text-green-800 leading-relaxed">
                  Se o seu WhatsApp mudar, avise a equipe da CareConnect para nao perder oportunidades.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-blue-200 transition-all"
              >
                <Link to="/">Voltar para a pagina inicial</Link>
              </Button>
            </div>
          </div>

          <div className="text-gray-500 text-sm">
            <p>
              Precisa de ajuda agora?{" "}
              <Link to="/contact" className="text-blue-600 font-bold hover:underline">
                Fale com a gente no suporte.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
