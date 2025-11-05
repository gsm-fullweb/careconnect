import Layout from "@/components/layout/Layout";
import { Check, Star, Shield, Clock, Users, Sparkles, MessageCircle, Calendar, Heart, Pill, Bell, AlertTriangle, Database, Zap } from "lucide-react";

const Planos = () => {
  const loadMercadoPago = () => new Promise<void>((resolve, reject) => {
    if ((window as any).MercadoPago) return resolve();
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('mp-sdk-load-error'));
    document.body.appendChild(script);
  });

  const handlePay = async () => {
    try {
      const res = await fetch('/api/create_preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'completo', price: 19.9, currency: 'BRL' })
      });
      const data = await res.json();
      const preferenceId = data.preferenceId || data.id;
      if (!preferenceId) throw new Error('no preference');

      await loadMercadoPago();
      const publicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
      if (!publicKey) throw new Error('missing-public-key');

      const MPClass = (window as any).MercadoPago;
      const mp = new MPClass(publicKey, { locale: 'pt-BR' });
      (mp as any).checkout({
        preference: { id: preferenceId },
        autoOpen: true,
        render: { container: '#mp-cho-container' },
        theme: { elementsColor: '#3e8861' }
      } as any);
      return;
    } catch (e) {
      window.open('https://wa.me/551148633976?text=Quero%20assinar%20o%20plano', '_blank');
    }
  };
  return (
    <Layout>
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
                  em minutos
                </span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed text-center lg:text-left">
                Com a <strong className="text-gray-900">Mila</strong>, sua assistente de IA no WhatsApp, você encontra cuidadores qualificados, agenda visitas e acompanha tudo em tempo real.
              </p>
              
              {/* Pricing Highlight - Centralizado */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 mb-6 border border-blue-100 shadow-lg max-w-sm mx-auto lg:mx-0">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-3xl md:text-4xl font-black text-[#3e8861]">Plano Gratuito</span>
                </div>
                <p className="text-xs text-gray-600 text-center">Sem fidelidade • Cancele quando quiser</p>
              </div>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5 justify-center lg:justify-start">
                <button 
                  type="button"
                  onClick={handlePay}
                  className="group inline-flex items-center justify-center bg-[#3e8861] text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 hover:bg-[#347553] transition-all duration-300"
                >
                  <span>Plano Gratuito</span>
                  <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                </button>
                <a 
                  href="https://wa.me/551148633976" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center bg-white/90 backdrop-blur-sm text-gray-700 font-semibold px-6 py-3 rounded-lg border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <MessageCircle className="mr-2 w-4 h-4 text-[#3e8861]" />
                  <span>Falar com a Mila</span>
                </a>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-gray-600 text-xs">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#3e8861]" />
                  <span>Sem fidelidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#3e8861]" />
                  <span>100% seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#3e8861]" />
                  <span>Suporte 24/7</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image - Retângulo com fundo azul rotacionado */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-blue-200 rounded-3xl transform rotate-6"></div>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://blog.careconnect.com.br/wp-content/uploads/2025/10/Google_AI_Studio_2025-10-13T14_15_01.222Z.png"
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
              <div className="text-3xl font-bold text-[#3e8861]">
                <Shield className="w-10 h-10 mx-auto text-[#3e8861]" />
              </div>
              <div className="text-sm mt-2">Cuidadores verificados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3e8861]">
                <MessageCircle className="w-10 h-10 mx-auto text-[#3e8861]" />
              </div>
              <div className="text-sm mt-2">IA no WhatsApp</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3e8861]">
                <Clock className="w-10 h-10 mx-auto text-[#3e8861]" />
              </div>
              <div className="text-sm mt-2">Suporte 24/7</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3e8861]">
                <Check className="w-10 h-10 mx-auto text-[#3e8861]" />
              </div>
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
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              A Mila simplifica cada etapa do processo de encontrar e gerenciar cuidadores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Assistente IA 24/7</h3>
              <p className="text-gray-600 leading-relaxed">
                Converse com a Mila a qualquer hora pelo WhatsApp. Ela entende suas necessidades e encontra o cuidador perfeito.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Cuidadores Verificados</h3>
              <p className="text-gray-600 leading-relaxed">
                Profissionais avaliados e com documentos verificados.
              </p>
            </div>

            {/* Feature 7 - Lembrete de Medicação */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Pill className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Lembrete de Medicação</h3>
              <p className="text-gray-600 leading-relaxed">
                Agende dosagens e receba alertas automáticos no WhatsApp. Ideal para manter a rotina com segurança.
              </p>
            </div>

            {/* Feature 4 - Botão de Pânico */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-red-50 to-rose-100/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-rose-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Botão de Pânico</h3>
              <p className="text-gray-600 leading-relaxed">
                Alerta instantâneo via WhatsApp para familiares e responsáveis, acionado pelo idoso com uma mensagem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Mila 2.0 */}
      <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-custom mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="flex items-start gap-3 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <Database className="w-6 h-6 text-[#3e8861] flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Banco de dados</p>
                <p className="text-sm text-gray-600">Armazena agenda de medicamentos e contatos de emergência.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <Zap className="w-6 h-6 text-[#3e8861] flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Gatilhos automáticos</p>
                <p className="text-sm text-gray-600">Processos automáticos disparam lembretes e alertas.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <MessageCircle className="w-6 h-6 text-[#3e8861] flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-600">Envio de mensagens para lembretes e acionamento do botão de pânico.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#assinar" className="inline-flex items-center justify-center bg-[#3e8861] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#347553]">
              Ativar Mila 2.0
            </a>
            <a href="https://wa.me/551148633976?text=Quero%20ativar%20Lembrete%20de%20Medica%C3%A7%C3%A3o%20e%20Bot%C3%A3o%20de%20P%C3%A2nico" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
     

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Perguntas frequentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa saber sobre o CareConnect
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Como funciona a assinatura?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Tenha acesso à Mila e aos recursos essenciais da plataforma — sem pagar nada por mês.
100% gratuito, sem fidelidade e com liberdade total para usar quando quiser.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Como a Mila me ajuda a encontrar cuidadores?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A Mila usa inteligência artificial para entender suas necessidades e recomendar os cuidadores mais adequados. Você conversa pelo WhatsApp de forma natural e ela cuida de tudo.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Os cuidadores são verificados?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Sim! Todos passam por verificação de documentos, referências profissionais e background check antes de serem aprovados na plataforma.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Posso cancelar a qualquer momento?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Sim, não há fidelidade. Você pode cancelar sua assinatura a qualquer momento pelo WhatsApp ou pelo painel de controle.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Há algum custo adicional além da assinatura?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
               O acesso à plataforma é gratuito. Os valores dos serviços dos cuidadores são negociados diretamente com eles.
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
            Comece agora e tenha a Mila ao seu lado em cada etapa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#assinar" 
              className="inline-flex items-center justify-center bg-white text-[#3e8861] font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <span>Começar agora</span>
              <Sparkles className="ml-2 w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/551148633976" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              <span>Tirar dúvidas com a Mila</span>
            </a>
          </div>
        </div>
      </section>
      {/* Container oculto para o modal do Mercado Pago */}
      <div id="mp-cho-container" className="hidden" />
    </Layout>
  );
};

export default Planos;
