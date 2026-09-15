import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Check, Shield, Clock, Users, Sparkles, MessageCircle, Search, HeartHandshake } from "lucide-react";
import { FIND_CAREGIVER_URL, FIND_CAREGIVER_LABEL } from "@/lib/contact";

const Planos = () => {
  return (
    <Layout>
      <SEO
        title="Como Funciona | Encontre um Cuidador de Idosos em Mogi das Cruzes"
        description="Encontre cuidadores de idosos qualificados e verificados em Mogi das Cruzes com a CareConnect. Acesso gratuito à plataforma, sem fidelidade. Fale pelo WhatsApp e encontre o profissional ideal."
        canonical="/plans"
      />
      {/* Hero Section - Estilo Humanizado */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#f4f8f9] via-[#e9f3f1] to-[#f8fbfa] text-gray-800">
        {/* Background Pattern - Suave e Natural */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(144,202,249,0.08),transparent_60%)]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-50 rounded-full blur-3xl" />
        </div>

        <div className="container-custom mx-auto px-4 py-12 md:py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-2xl mx-auto lg:mx-0">
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4 text-gray-900 text-center lg:text-left">
                Encontre o cuidador ideal{" "}
                <span className="text-[#3e8861]">
                  com segurança
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed text-center lg:text-left">
                A CareConnect conecta a sua família a cuidadores de idosos qualificados e
                verificados em Mogi das Cruzes e região. Você conta com nosso atendimento pelo
                WhatsApp para encontrar o profissional certo — <strong className="text-gray-900">sem custo para usar a plataforma</strong>.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5 justify-center lg:justify-start">
                <a
                  href={FIND_CAREGIVER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center bg-[#3e8861] text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 hover:bg-[#347553] transition-all duration-300"
                >
                  <MessageCircle className="mr-2 w-4 h-4" />
                  <span>{FIND_CAREGIVER_LABEL}</span>
                </a>
                <Link
                  to="/pre-cadastro"
                  className="inline-flex items-center justify-center bg-white/90 backdrop-blur-sm text-gray-700 font-semibold px-6 py-3 rounded-lg border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <span>Cadastrar como Cuidador</span>
                  <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-gray-600 text-xs">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#3e8861]" />
                  <span>Sem fidelidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#3e8861]" />
                  <span>Cuidadores verificados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#3e8861]" />
                  <span>Atendimento no WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Hero Image - Retângulo com fundo azul rotacionado */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-blue-200 rounded-3xl transform rotate-6"></div>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/about-image.png"
                    alt="Cuidadora com idosa sorrindo - CareConnect"
                    className="object-cover w-full h-full"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="container-custom mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-gray-600">
            <div className="text-center">
              <Shield className="w-10 h-10 mx-auto text-[#3e8861]" />
              <div className="text-sm mt-2">Cuidadores verificados</div>
            </div>
            <div className="text-center">
              <MessageCircle className="w-10 h-10 mx-auto text-[#3e8861]" />
              <div className="text-sm mt-2">Atendimento no WhatsApp</div>
            </div>
            <div className="text-center">
              <Clock className="w-10 h-10 mx-auto text-[#3e8861]" />
              <div className="text-sm mt-2">Suporte humano</div>
            </div>
            <div className="text-center">
              <Check className="w-10 h-10 mx-auto text-[#3e8861]" />
              <div className="text-sm mt-2">Sem fidelidade</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Por que usar a CareConnect
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Simplificamos a busca por cuidadores de idosos qualificados, do primeiro contato até a contratação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Atendimento pelo WhatsApp</h3>
              <p className="text-gray-600 leading-relaxed">
                Fale com a nossa equipe pelo WhatsApp, explique a necessidade da sua família e receba indicações de cuidadores adequados.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Cuidadores Verificados</h3>
              <p className="text-gray-600 leading-relaxed">
                Profissionais com documentos e referências verificados antes de serem apresentados às famílias.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Indicações Personalizadas</h3>
              <p className="text-gray-600 leading-relaxed">
                Encontramos cuidadores de acordo com a cidade, a rotina e o tipo de cuidado que a sua família precisa.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Acesso Gratuito</h3>
              <p className="text-gray-600 leading-relaxed">
                Usar a plataforma para encontrar um cuidador é gratuito e sem fidelidade. Os valores do serviço são combinados diretamente com o profissional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-custom mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Como funciona em 3 passos</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="flex items-start gap-3 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <span className="w-8 h-8 flex-shrink-0 rounded-full bg-[#3e8861] text-white flex items-center justify-center font-bold">1</span>
              <div>
                <p className="font-semibold text-gray-900">Fale conosco</p>
                <p className="text-sm text-gray-600">Envie uma mensagem pelo WhatsApp com a necessidade da sua família.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <span className="w-8 h-8 flex-shrink-0 rounded-full bg-[#3e8861] text-white flex items-center justify-center font-bold">2</span>
              <div>
                <p className="font-semibold text-gray-900">Receba indicações</p>
                <p className="text-sm text-gray-600">Apresentamos cuidadores verificados que combinam com o seu caso.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <span className="w-8 h-8 flex-shrink-0 rounded-full bg-[#3e8861] text-white flex items-center justify-center font-bold">3</span>
              <div>
                <p className="font-semibold text-gray-900">Contrate com segurança</p>
                <p className="text-sm text-gray-600">Converse com o cuidador escolhido e combine os detalhes do atendimento.</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <a
              href={FIND_CAREGIVER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#3e8861] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#347553]"
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              {FIND_CAREGIVER_LABEL}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Perguntas frequentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa saber sobre a CareConnect
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Preciso pagar para usar a plataforma?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Não. Encontrar um cuidador pela CareConnect é gratuito e sem fidelidade. Os valores
                do serviço são combinados diretamente com o cuidador escolhido.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Como encontro um cuidador?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Basta falar com a nossa equipe pelo WhatsApp e contar a necessidade da sua família.
                Nós apresentamos os cuidadores verificados mais adequados para o seu caso.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Os cuidadores são verificados?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Sim. Os cuidadores passam por verificação de documentos e referências profissionais
                antes de serem apresentados às famílias.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Em quais cidades a CareConnect atende?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Atendemos Mogi das Cruzes e região do Alto Tietê, incluindo Suzano, Arujá,
                Guararema, Biritiba Mirim, Poá e Ferraz de Vasconcelos.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#3e8861] to-[#2d6647] text-white">
        <div className="container-custom mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto para encontrar o cuidador ideal?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-2xl mx-auto">
            Fale com a nossa equipe pelo WhatsApp e encontre o cuidador certo para a sua família.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={FIND_CAREGIVER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-[#3e8861] font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              <span>{FIND_CAREGIVER_LABEL}</span>
            </a>
            <Link
              to="/pre-cadastro"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              <span>Cadastrar como Cuidador</span>
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Prefere se cadastrar pelo site?{" "}
            <Link to="/encontrar-cuidador" className="underline font-semibold hover:text-white">
              Faça seu cadastro completo aqui
            </Link>
            .
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Planos;
