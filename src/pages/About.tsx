import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Shield, Clock, Award, Heart, CheckCircle, Lock, Zap } from "lucide-react";

// ✅ Function: About
// 📌 Description: Main About page component that displays company information, values, team, and features
// 📥 Parameters: none
// 📤 Returns: JSX.Element - the complete About page layout
const About = () => {
  const values = [
    {
      icon: <Shield className="h-12 w-12 text-blue-600 mb-4" />,
      title: "Segurança",
      description: "Priorizamos a segurança e o bem-estar dos idosos e de suas famílias. Todos os nossos cuidadores passam por uma rigorosa verificação de antecedentes.",
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-600 mb-4" />,
      title: "Disponibilidade",
      description: "Entendemos que o cuidado não tem hora marcada. Por isso, estamos disponíveis 24 horas por dia, 7 dias por semana para atender às necessidades dos nossos clientes.",
    },
    {
      icon: <Award className="h-12 w-12 text-blue-600 mb-4" />,
      title: "Qualidade",
      description: "Comprometemo-nos com a excelência em todos os serviços prestados, garantindo que cada cuidador tenha a qualificação necessária para oferecer o melhor atendimento.",
    },
    {
      icon: <Heart className="h-12 w-12 text-blue-600 mb-4" />,
      title: "Empatia",
      description: "Tratamos cada idoso com o carinho, respeito e dignidade que merecem, compreendendo suas necessidades individuais e oferecendo um atendimento humanizado.",
    },
  ];

  const teamMembers = [
    {
      image: "https://dyxkbbojlyppizsgjjxx.supabase.co/storage/v1/object/public/images//member-1.jpg",
      name: "Kleber de Oliveira",
      title: "Diretor Geral",
      description: "Kleber de Oliveira é Diretor Geral e idealizador do projeto, que nasceu a partir de sua própria dificuldade em encontrar cuidadores de idosos qualificados. Com ampla experiência empresarial, ele une visão estratégica, foco na humanização do atendimento e uso da tecnologia para criar soluções eficazes e empáticas no cuidado com a pessoa idosa.",
    },
    {
      image: "https://dyxkbbojlyppizsgjjxx.supabase.co/storage/v1/object/public/images//member-2.jpg",
      name: "Richard Portela",
      title: "Desenvolvedor",
      description: "Richard Portela é o desenvolvedor responsável por dar vida à plataforma CareConnect, com foco na implementação da assistente virtual IA Mila, que torna o agendamento de cuidadores mais rápido e inteligente. Combinando tecnologia e empatia para criar soluções modernas, funcionais e acessíveis, sendo peça-chave na transformação digital do cuidado com idosos.",
    },
    {
      image: "https://dyxkbbojlyppizsgjjxx.supabase.co/storage/v1/object/public/images//member-3.jpg",
      name: "Silas Cilva",
      title: "Social Media Manager",
      description: "Silas Cilva é especialista em redes sociais, responsável pelo planejamento, gerenciamento e desempenho das plataformas digitais da empresa. Com experiência também em desenvolvimento web e criação de interfaces modernas e responsivas, destaca-se por desenvolver soluções eficientes, criativas e centradas na experiência do usuário.",
    },
  ];

  const features = [
    {
      icon: <CheckCircle className="h-10 w-10 text-blue-600 mb-3" />,
      title: "Recomendações Personalizadas",
      description: "Entendemos as necessidades específicas do seu familiar e sugerimos os cuidadores mais adequados com base em experiência e especialidades.",
    },
    {
      icon: <Lock className="h-10 w-10 text-blue-600 mb-3" />,
      title: "Contratação Segura",
      description: "Confirme agendamentos, verifique disponibilidade e finalize a contratação de forma segura diretamente pela plataforma.",
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-600 mb-3" />,
      title: "Resposta Rápida",
      description: "Receba respostas rápidas para suas dúvidas sobre cuidadores, serviços e agendamentos sem tempo de espera.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Sobre Nós
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Sobre a <span className="text-blue-600">CareConnect</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                A CareConnect foi fundada no final de 2024 a partir da experiência pessoal de Kleber de Oliveira, que enfrentou desafios para encontrar cuidadores qualificados e confiáveis para um familiar idoso. Esta realidade é comum a muitas famílias brasileiras.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nossa missão é transformar a forma como o cuidado é acessado, garantindo que cada idoso receba atenção adequada com dignidade, conforto e qualidade de vida, no ambiente onde se sentem mais seguros: seus próprios lares.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <a href="https://careconnect.com.br/pre-cadastro" target="_self">
                    Faça parte da nossa equipe
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                  size="lg"
                >
                  <a href="https://careconnect.com.br/plans" target="_self">
                    Encontrar cuidadores
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-3xl transform rotate-6"></div>
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://dyxkbbojlyppizsgjjxx.supabase.co/storage/v1/object/public/images//about-image.png"
                    alt="Equipe CareConnect"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Nossa Trajetória
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Nossa História</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça como começamos e porque estamos comprometidos com o cuidado de qualidade
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Como tudo começou</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  A CareConnect nasceu da necessidade real enfrentada por nosso fundador, que percebeu a dificuldade das famílias em encontrar cuidadores confiáveis e qualificados para seus entes queridos.
                </p>
                <p>
                  A partir desta experiência, criamos uma plataforma que revolucionou o mercado de cuidados para idosos, implementando tecnologias avançadas para garantir uma experiência simples, segura e humanizada.
                </p>
                <p>
                  Hoje, conectamos famílias a cuidadores experientes em todo o Brasil, sempre com o compromisso de oferecer o melhor cuidado possível, com a conveniência da tecnologia e o calor humano que cada idoso merece.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-3xl transform -rotate-6"></div>
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://dyxkbbojlyppizsgjjxx.supabase.co/storage/v1/object/public/images//history-image.jpg"
                    alt="História da CareConnect"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Nossos Princípios
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Nossos Valores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Os princípios que norteiam nosso trabalho e garantem a qualidade do nosso serviço
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
              >
                <div className="flex justify-center bg-blue-50 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos Recursos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Inovação no Cuidado
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Nossos Recursos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tecnologia avançada para simplificar a busca por cuidadores qualificados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors duration-300">
                <div className="flex-shrink-0 bg-blue-100 p-4 rounded-xl mr-6">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Quem Somos
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Nossa Equipe</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça os profissionais dedicados que fazem parte da CareConnect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-blue-100 group-hover:border-blue-200 transition-colors duration-300">
                  <img
                    src={member.image}
                    alt={`Membro da equipe ${member.name}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.title}</p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
        <h2 className="text-white text-3xl md:text-5xl from-blue-600 mb-6">
              Experimente o futuro do cuidado para idosos
        </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Comece agora mesmo encontrando cuidadores qualificados ou junte-se à nossa equipe de profissionais.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href="https://careconnect.com.br/pre-cadastro" target="_self">
                Cadastrar como Cuidador
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-green-600 text-white hover:bg-green-700 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href="https://careconnect.com.br/plans" target="_self">
                Ver Planos Disponíveis
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
