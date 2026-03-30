import SEO from "@/components/SEO";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, Star, Shield, ArrowRight, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";

export default function Obrigado() {
  const [name, setName] = useState("Cuidador");
  const navigate = useNavigate();

  useEffect(() => {
    const fallbackUser = localStorage.getItem('fallback_user');
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
              Parabéns, {name.split(' ')[0]}! <br/>
              <span className="text-careconnect-blue">Você agora é Care Connect!</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Sua jornada para transformar vidas e encontrar as melhores oportunidades profissionais começa <span className="font-bold text-blue-900">agora</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-none shadow-md bg-white hover:shadow-xl transition-shadow border-t-4 border-blue-400">
              <CardContent className="pt-6">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Valorização</h3>
                <p className="text-sm text-gray-500 italic">"Cuidar é a forma mais nobre de amar."</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md bg-white hover:shadow-xl transition-shadow border-t-4 border-yellow-400">
              <CardContent className="pt-6">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Perspectiva</h3>
                <p className="text-sm text-gray-500 italic">Novas chances de brilhar a cada dia.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white hover:shadow-xl transition-shadow border-t-4 border-green-400">
              <CardContent className="pt-6">
                <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Segurança</h3>
                <p className="text-sm text-gray-500 italic">Estamos com você em cada passo.</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-blue-100 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-20 h-20 text-blue-900" />
            </div>
            
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Sua conta está sendo preparada!</h2>
            <p className="text-gray-600 mb-8">
              Enviamos todos os detalhes para o seu e-mail. Nossa equipe de seleção irá analisar seu perfil com muito carinho para conectá-lo às famílias ideais.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Button 
                onClick={() => navigate("/client-dashboard")}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-blue-200 transition-all flex items-center gap-2"
              >
                Explorar Meu Dashboard <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="text-gray-500 text-sm">
            <p>Precisa de ajuda agora? <a href="/contact" className="text-blue-600 font-bold hover:underline">Fale com a gente no suporte.</a></p>
          </div>

        </div>
      </section>
    </Layout>
  );
}
