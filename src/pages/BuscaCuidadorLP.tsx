import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Heart, Shield, CheckCircle } from "lucide-react";
import InterlinkingBlock from "@/components/seo/InterlinkingBlock";
import { LocalBusinessSchema } from "@/components/SchemaOrg";

const BuscaCuidadorLP = () => {
  return (
    <Layout>
      <SEO 
        title="Encontrar Cuidador de Idosos: Cuidadores Qualificados | CareConnect"
        description="Quer encontrar o cuidador de idosos ideal para a sua família? A CareConnect usa inteligência e uma rigorosa seleção para conectar você aos melhores profissionais."
        canonical="/encontrar-cuidador-de-idosos"
        keywords="encontrar cuidador de idosos, procuro cuidador de idosos, achar cuidador de idosos, agência de cuidadores"
      />
      
      <LocalBusinessSchema
        name="CareConnect Cuidadores - Encontrar Cuidador"
        description="Encontre cuidadores de idosos qualificados e de confiança."
        city="São Paulo"
        state="SP"
        phone="+551148633976"
        email="contato@careconnect.com.br"
        url="/encontrar-cuidador-de-idosos"
      />

      {/* Hero Section */}
      <section className="bg-blue-50 py-20">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-full mb-6">
            <Search className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            A Forma Mais Segura de Encontrar Cuidador de Idosos
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Nós sabemos o quão difícil é encontrar um profissional de confiança para cuidar de quem você ama. Por isso, a CareConnect faz a seleção rigorosa e encontra o cuidador perfeito para a sua necessidade.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Link to="/encontrar-cuidador">
              Iniciar Busca Pelo Cuidador Ideal
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Por que buscar seu cuidador com a CareConnect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Triagem Rigorosa</h3>
              <p className="text-gray-600">Checamos antecedentes criminais, referências e validamos os certificados (COREN e cursos de cuidador) de todos os profissionais.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Matching Inteligente</h3>
              <p className="text-gray-600">Cruzamos as necessidades médicas e o perfil do idoso com a especialidade do cuidador, garantindo a combinação perfeita.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Processo Rápido</h3>
              <p className="text-gray-600">Em poucas horas você recebe os perfis dos melhores cuidadores disponíveis para a sua região e necessidade de plantão.</p>
            </div>
          </div>
        </div>
      </section>

      <InterlinkingBlock />
    </Layout>
  );
};

export default BuscaCuidadorLP;
