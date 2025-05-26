"use client";

import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Award, Heart, MessageCircle, CheckCircle, Lock, Zap } from "lucide-react";

export default function Sobre() {
  const values = [
    {
      icon: <Shield className="h-12 w-12 text-primary mb-4" />,
      title: "Segurança",
      description: "Priorizamos a segurança e o bem-estar dos idosos e de suas famílias. Todos os nossos cuidadores passam por uma rigorosa verificação de antecedentes.",
    },
    {
      icon: <Clock className="h-12 w-12 text-primary mb-4" />,
      title: "Disponibilidade",
      description: "Entendemos que o cuidado não tem hora marcada. Por isso, estamos disponíveis 24 horas por dia, 7 dias por semana para atender às necessidades dos nossos clientes.",
    },
    {
      icon: <Award className="h-12 w-12 text-primary mb-4" />,
      title: "Qualidade",
      description: "Comprometemo-nos com a excelência em todos os serviços prestados, garantindo que cada cuidador tenha a qualificação necessária para oferecer o melhor atendimento.",
    },
    {
      icon: <Heart className="h-12 w-12 text-primary mb-4" />,
      title: "Empatia",
      description: "Tratamos cada idoso com o carinho, respeito e dignidade que merecem, compreendendo suas necessidades individuais e oferecendo um atendimento humanizado.",
    },
  ];

  const teamMembers = [
    {
      image: "/team/member-1.jpg",
      name: "Kleber de Oliveira",
      title: "Diretor Geral",
      description: "Kleber de Oliveira é Diretor Geral e idealizador do projeto, que nasceu a partir de sua própria dificuldade em encontrar cuidadores de idosos qualificados. Com ampla experiência empresarial, ele une visão estratégica, foco na humanização do atendimento e uso da tecnologia para criar soluções eficazes e empáticas no cuidado com a pessoa idosa.",
    },
    {
      image: "/team/member-2.jpg",
      name: "Richard Portela",
      title: "Desenvolvedor",
      description: "Richard Portela é o desenvolvedor responsável por dar vida à plataforma CareConnect, com foco na implementação da assistente virtual IA Mila, que torna o agendamento de cuidadores mais rápido e inteligente. Combinando tecnologia e empatia para criar soluções modernas, funcionais e acessíveis, sendo peça-chave na transformação digital do cuidado com idosos.",
    },
    {
      image: "/team/member-3.jpg",
      name: "Silas Cilva",
      title: "Social Media Manager",
      description: "Silas Cilva é especialista em redes sociais, responsável pelo planejamento, gerenciamento e desempenho das plataformas digitais da empresa. Com experiência também em desenvolvimento web e criação de interfaces modernas e responsivas, destaca-se por desenvolver soluções eficientes, criativas e centradas na experiência do usuário.",
    },
  ];

  const milaFeatures = [
    {
      icon: <MessageCircle className="h-10 w-10 text-primary mb-3" />,
      title: "Atendimento 24/7",
      description: "Agende cuidadores a qualquer hora do dia ou da noite com a Mila, nossa assistente virtual disponível 24 horas por dia no seu WhatsApp.",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary mb-3" />,
      title: "Recomendações Personalizadas",
      description: "A Mila entende as necessidades específicas do seu familiar e sugere os cuidadores mais adequados com base em experiência e especialidades.",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary mb-3" />,
      title: "Contratação Segura",
      description: "Confirme agendamentos, verifique disponibilidade e finalize a contratação de forma segura diretamente pelo aplicativo.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary mb-3" />,
      title: "Resposta Instantânea",
      description: "Receba respostas imediatas para suas dúvidas sobre cuidadores, serviços e agendamentos sem tempo de espera.",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-primary/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
                Sobre a <span className="text-primary">CareConnect</span>
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                A CareConnect foi fundada no final de 2024 a partir da experiência pessoal de Kleber de Oliveira, que enfrentou desafios para encontrar cuidadores qualificados e confiáveis para um familiar idoso. Esta realidade é comum a muitas famílias brasileiras.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Nossa missão é transformar a forma como o cuidado é acessado, garantindo que cada idoso receba atenção adequada com dignidade, conforto e qualidade de vida, no ambiente onde se sentem mais seguros: seus próprios lares.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full"
                  size="lg"
                >
                  <Link href="/cadastrar-cuidador">
                    Faça parte da nossa equipe
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 font-medium rounded-full"
                  size="lg"
                >
                  <Link href="/assinatura">
                    Encontrar cuidadores
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/sobre/about-image.png"
                  alt="Equipe CareConnect"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conheça a Mila - NEW SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">Inovação no Cuidado</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Conheça a Mila, sua Assistente Virtual</h2>
            <p className="text-lg text-gray-600">
              Simplificando a busca por cuidadores com inteligência artificial diretamente no seu WhatsApp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center order-2 md:order-1">
              <div className="relative w-full max-w-md h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <Image
                  src="/sobre/mila-whatsapp.jpg"
                  alt="Assistente virtual Mila"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold mb-4">Cuidado ao alcance de uma mensagem</h3>
              <p className="text-gray-600 mb-6">
                A Mila é nossa assistente virtual com inteligência artificial que revoluciona a forma como você encontra e agenda cuidadores de idosos. Disponível 24 horas por dia no WhatsApp, ela torna o processo mais ágil, personalizado e acessível.
              </p>
              
              <div className="grid grid-cols-1 gap-6 mb-8">
                {milaFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button
                asChild
                size="lg"
                className="rounded-full bg-green-600 hover:bg-green-700 text-white font-medium w-full sm:w-auto"
              >
                <Link href="https://wa.me/5511999999999">
                  <MessageCircle className="mr-2 h-5 w-5" /> Iniciar conversa com a Mila
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">Nossa Trajetória</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa História</h2>
            <p className="text-lg text-gray-600">
              Conheça como começamos e porque estamos comprometidos com o cuidado de qualidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4">Como tudo começou</h3>
              <p className="text-gray-600 mb-4">
                A CareConnect nasceu da necessidade real enfrentada por nosso fundador, que percebeu a dificuldade das famílias em encontrar cuidadores confiáveis e qualificados para seus entes queridos.
              </p>
              <p className="text-gray-600 mb-4">
                A partir desta experiência, criamos uma plataforma que revolucionou o mercado de cuidados para idosos, implementando tecnologias como a assistente virtual Mila para garantir uma experiência simples, segura e humanizada.
              </p>
              <p className="text-gray-600">
                Hoje, conectamos famílias a cuidadores experientes em todo o Brasil, sempre com o compromisso de oferecer o melhor cuidado possível, com a conveniência da tecnologia e o calor humano que cada idoso merece.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/history-image.jpg"
                  alt="História da CareConnect"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">Nossos Princípios</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Valores</h2>
            <p className="text-lg text-gray-600">
              Os princípios que norteiam nosso trabalho e garantem a qualidade do nosso serviço
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex justify-center bg-primary/10 p-4 rounded-full w-20 h-20 mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona a Mila - NEW SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">Processo Simplificado</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como a Mila Funciona</h2>
            <p className="text-lg text-gray-600">
              Encontrar o cuidador ideal nunca foi tão fácil e rápido
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Inicie a conversa</h3>
              <p className="text-gray-600">
                Adicione a Mila no WhatsApp e comece a conversar sobre suas necessidades de cuidado para seu familiar idoso.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Receba recomendações</h3>
              <p className="text-gray-600">
                A Mila analisa suas necessidades e recomenda os melhores cuidadores disponíveis, compatíveis com seu perfil.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Agende e contrate</h3>
              <p className="text-gray-600">
                Escolha o profissional ideal e finalize a contratação diretamente pelo WhatsApp, com pagamento seguro e garantia de satisfação.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              <Link href="https://wa.me/5511999999999">
                <MessageCircle className="mr-2 h-5 w-5" /> Experimentar agora mesmo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">Quem Somos</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Equipe</h2>
            <p className="text-lg text-gray-600">
              Conheça os profissionais dedicados que fazem parte da CareConnect
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-4 border-primary/10">
                  <Image
                    src={member.image}
                    alt={`Membro da equipe ${member.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.title}</p>
                <p className="text-gray-600">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos - NEW SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">Experiências Reais</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">O que dizem nossos clientes</h2>
            <p className="text-lg text-gray-600">
              Veja como a assistente virtual Mila e nossos cuidadores estão transformando vidas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic mb-6">
                "A assistente Mila foi incrível! Em poucos minutos pelo WhatsApp, encontrei a cuidadora perfeita para minha mãe. O processo foi simples e a recomendação foi excelente. Minha mãe está muito feliz com os cuidados recebidos."
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                    ML
                  </div>
                </div>
                <div>
                  <p className="font-bold">Maria Luiza</p>
                  <p className="text-gray-500 text-sm">São Paulo, SP</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic mb-6">
                "Como médico, estava preocupado com os cuidados do meu pai após sua cirurgia. A Mila conseguiu encontrar um cuidador com experiência em pós-operatório rapidamente. O agendamento pelo WhatsApp foi prático e o serviço superou minhas expectativas."
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                    RS
                  </div>
                </div>
                <div>
                  <p className="font-bold">Ricardo Santos</p>
                  <p className="text-gray-500 text-sm">Rio de Janeiro, RJ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-[#2D1B69] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experimente o futuro do cuidado para idosos
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Comece agora mesmo com a Mila pelo WhatsApp ou junte-se à nossa equipe de cuidadores qualificados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-primary hover:bg-white/90 rounded-full font-medium"
            >
              <Link href="/cadastrar-cuidador">
                Cadastrar como Cuidador
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-green-600 text-white hover:bg-green-700 rounded-full font-medium"
            >
              <Link href="https://wa.me/5511999999999">
                <MessageCircle className="mr-2 h-5 w-5" /> Falar com a Mila agora
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
