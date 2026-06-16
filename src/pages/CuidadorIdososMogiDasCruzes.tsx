import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  Shield,
  Heart,
  Phone,
  Star,
  CheckCircle,
  Users,
  Bath,
  Utensils,
  BedDouble,
  Pill,
  Activity,
  Thermometer,
  BookOpen,
  MessageCircle,
} from "lucide-react";

const CuidadorIdososMogiDasCruzes = () => {
  const servicos = [
    {
      icon: <Bath className="w-8 h-8 text-[#3e8861]" />,
      nome: "Cuidador Domiciliar",
      descricao: "Assistência completa em domicílio: higiene, alimentação, medicação e companhia para idosos em Mogi das Cruzes.",
    },
    {
      icon: <Activity className="w-8 h-8 text-[#3e8861]" />,
      nome: "Acompanhante Hospitalar",
      descricao: "Acompanhamento em internações, consultas e exames nos hospitais de Mogi das Cruzes e região.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-[#3e8861]" />,
      nome: "Cuidados para Alzheimer",
      descricao: "Cuidadores especializados em Alzheimer e demências, com treinamento para lidar com as particularidades da doença.",
    },
    {
      icon: <Heart className="w-8 h-8 text-[#3e8861]" />,
      nome: "Cuidados Paliativos",
      descricao: "Suporte humanizado e digno para pacientes em cuidados paliativos, no conforto de suas casas em Mogi das Cruzes.",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#3e8861]" />,
      nome: "Cuidador Noturno",
      descricao: "Plantões noturnos de 12h para garantir segurança e cuidado durante a noite, com profissionais verificados.",
    },
    {
      icon: <Thermometer className="w-8 h-8 text-[#3e8861]" />,
      nome: "Pós-Cirúrgico",
      descricao: "Acompanhamento especializado pós-operatório para recuperação segura do idoso em casa.",
    },
  ];

  const precos = [
    {
      modalidade: "Diária (12 horas)",
      faixa: "R$ 150 – R$ 320",
      detalhes: "Plantão diurno ou noturno. Adicional noturno de 20% entre 22h-5h.",
    },
    {
      modalidade: "Meio período (6 horas)",
      faixa: "R$ 100 – R$ 200",
      detalhes: "Ideal para necessidades pontuais ou complemento de cuidado familiar.",
    },
    {
      modalidade: "Mensal (contratação direta)",
      faixa: "R$ 2.800 – R$ 4.500",
      detalhes: "Cuidador fixo contratado diretamente. Valores por regime de 12h/dia.",
    },
    {
      modalidade: "Mensal (via agência)",
      faixa: "R$ 4.500 – R$ 9.000",
      detalhes: "Inclui encargos, substituição de folgas e supervisão profissional.",
    },
  ];

  const bairrosAtendidos = [
    "Centro", "Mogilar", "Vila Oliveira", "Socorro", "Jundiapeba",
    "Braz Cubas", "Brás Cubas", "César de Souza", "Vila Industrial",
    "Vila Suíssa", "Jardim Universo", "Mogi Moderno", "Alto Ipiranga",
    "Jardim Marica", "Vila Nova Aparecida", "Vila Lavínia",
  ];

  const cidadesAtendidas = [
    { nome: "Mogi das Cruzes", destaque: true },
    { nome: "Suzano", destaque: false },
    { nome: "Arujá", destaque: false },
    { nome: "Guararema", destaque: false },
    { nome: "Biritiba Mirim", destaque: false },
    { nome: "Salesópolis", destaque: false },
    { nome: "Poá", destaque: false },
    { nome: "Ferraz de Vasconcelos", destaque: false },
    { nome: "Itaquaquecetuba", destaque: false },
  ];

  return (
    <Layout>
      <SEO
        title="Cuidador de Idosos em Mogi das Cruzes | Home Care e Acompanhante Hospitalar"
        description="Cuidadores de idosos qualificados em Mogi das Cruzes e Alto Tietê. Home care 24h, acompanhante hospitalar, cuidados para Alzheimer e paliativos. Diária a partir de R$ 150. Solicite orçamento!"
        canonical="/cuidador-idosos-mogi-das-cruzes"
      />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#f4f8f9] via-[#e9f3f1] to-[#f8fbfa]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3e8861]/10 text-[#3e8861] rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4" />
                Mogi das Cruzes e Região
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Cuidador de Idosos em{" "}
                <span className="text-[#3e8861]">Mogi das Cruzes</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                A <strong>CareConnect</strong> é a agência de cuidadores de idosos referência em{" "}
                <strong>Mogi das Cruzes</strong> e região do <strong>Alto Tietê</strong>. 
                Conectamos famílias a cuidadores qualificados e verificados através de 
                matching inteligente com IA, garantindo segurança, confiança e o melhor 
                cuidado para seu ente querido.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#3e8861] hover:bg-[#347553] text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a
                    href="https://wa.me/551148633976?text=Ol%C3%A1%2C%20preciso%20de%20um%20cuidador%20de%20idosos%20em%20Mogi%20das%20Cruzes"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Solicitar Orçamento Grátis
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#3e8861] text-[#3e8861] hover:bg-[#3e8861]/10 font-semibold px-8 py-4 rounded-lg transition-all duration-300"
                >
                  <a href="tel:+551148633976">
                    <Phone className="mr-2 w-5 h-5" />
                    (11) 4863-3976
                  </a>
                </Button>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-[#3e8861]" />
                  <span>Cuidadores Verificados</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-5 h-5 text-[#3e8861]" />
                  <span>Matching com IA</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-5 h-5 text-[#3e8861]" />
                  <span>Suporte 24/7</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-[#3e8861]/20 rounded-3xl transform rotate-6" />
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/hero-image.jpg"
                    alt="Cuidador de idosos profissional da CareConnect em Mogi das Cruzes"
                    className="object-cover w-full h-full"
                    width="500"
                    height="500"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços de Home Care em Mogi das Cruzes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Oferecemos serviços completos de cuidadores de idosos em domicílio, adaptados às
              necessidades de cada família na região de Mogi das Cruzes e Alto Tietê.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicos.map((servico, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-[#3e8861]/10 p-3 rounded-xl group-hover:bg-[#3e8861]/20 transition-colors">
                    {servico.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-900">
                      {servico.nome}
                    </h3>
                    <p className="text-gray-600">{servico.descricao}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tabela de Preços */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Valores e Preços de Cuidadores em Mogi das Cruzes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Confira a tabela de valores estimados para serviços de cuidador de idosos 
              em Mogi das Cruzes e região. Os preços podem variar conforme a complexidade 
              do caso e qualificação do profissional.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#3e8861] text-white">
                    <th className="text-left px-6 py-4 font-semibold">Modalidade</th>
                    <th className="text-left px-6 py-4 font-semibold">Faixa de Preço</th>
                    <th className="text-left px-6 py-4 font-semibold hidden md:table-cell">Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  {precos.map((preco, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-100`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {preco.modalidade}
                      </td>
                      <td className="px-6 py-4 text-[#3e8861] font-bold text-lg">
                        {preco.faixa}
                      </td>
                      <td className="px-6 py-4 text-gray-600 hidden md:table-cell">
                        {preco.detalhes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              * Valores estimados para a região de Mogi das Cruzes (2026). 
              Solicite um orçamento personalizado para o caso específico do seu familiar.
            </p>
          </div>
        </div>
      </section>

      {/* Por que escolher a CareConnect */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que Escolher a CareConnect em Mogi das Cruzes?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Somos a única plataforma na região com matching inteligente por IA 
              para conectar famílias a cuidadores verificados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#3e8861]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#3e8861]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Cuidadores Verificados</h3>
              <p className="text-gray-600 text-sm">
                Background check completo, verificação de documentos e referências profissionais.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#3e8861]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[#3e8861]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Matching com IA</h3>
              <p className="text-gray-600 text-sm">
                Nossa IA entende as necessidades do seu familiar e encontra o cuidador ideal em Mogi das Cruzes.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#3e8861]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#3e8861]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Equipe Local</h3>
              <p className="text-gray-600 text-sm">
                Cuidadores que moram em Mogi das Cruzes e região, garantindo pontualidade e proximidade.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#3e8861]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#3e8861]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Suporte 24/7</h3>
              <p className="text-gray-600 text-sm">
                Atendimento a qualquer hora via WhatsApp. Substituição de cuidadores em caso de emergência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas Atendidas */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Áreas Atendidas em Mogi das Cruzes e Região
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Atendemos em toda a cidade de Mogi das Cruzes e cidades vizinhas do Alto Tietê.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Bairros */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#3e8861]" />
                Bairros em Mogi das Cruzes
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {bairrosAtendidos.map((bairro, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <CheckCircle className="w-4 h-4 text-[#3e8861] flex-shrink-0" />
                    <span>{bairro}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cidades */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#3e8861]" />
                Cidades da Região do Alto Tietê
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {cidadesAtendidas.map((cidade, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 ${
                      cidade.destaque ? "text-[#3e8861] font-semibold" : "text-gray-600"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 text-[#3e8861] flex-shrink-0" />
                    <span>{cidade.nome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Local */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes sobre Cuidadores em Mogi das Cruzes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Respostas para as dúvidas mais comuns de famílias que buscam 
              cuidadores de idosos na região.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Qual é o valor mensal para um cuidador de idosos em Mogi das Cruzes?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Em Mogi das Cruzes, o valor mensal de um cuidador de idosos varia de 
                <strong> R$ 2.800 a R$ 4.500</strong> para contratação direta, e de 
                <strong> R$ 4.500 a R$ 9.000</strong> via agência (inclui encargos, 
                substituição e supervisão). O preço depende da complexidade do caso 
                e do regime de contratação. Na CareConnect, ajudamos a encontrar o 
                melhor custo-benefício para sua família.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Quanto está custando a diária de uma cuidadora de idosos?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A diária de uma cuidadora (plantão de 12 horas) em Mogi das Cruzes custa 
                entre <strong>R$ 150 e R$ 320</strong>. Plantões noturnos podem ter adicional 
                de 20%. Profissionais especializados em Alzheimer ou AVC cobram de 15% a 35% 
                acima da base.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Quanto é 12 horas de uma cuidadora?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                O plantão de 12 horas de uma cuidadora em Mogi das Cruzes custa entre 
                <strong> R$ 150 e R$ 320</strong>, dependendo da qualificação da profissional 
                e da complexidade do atendimento. Solicite um orçamento personalizado pela CareConnect.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Quanto custa 6 horas de uma cuidadora?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                O valor médio para 6 horas de cuidadora em Mogi das Cruzes fica entre 
                <strong> R$ 100 e R$ 200</strong>, variando conforme a experiência da 
                profissional e as necessidades do paciente.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Precisa de cuidador de idosos? Como saber se está na hora?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Se seu familiar apresenta dificuldades para realizar atividades do dia a dia 
                (higiene, alimentação, locomoção), esquece medicamentos, tem quedas frequentes 
                ou precisa de companhia constante, é hora de considerar um cuidador profissional. 
                A CareConnect em Mogi das Cruzes conecta você a cuidadores verificados rapidamente.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Como contratar um cuidador de idosos em Mogi das Cruzes?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Na CareConnect, basta acessar nosso WhatsApp e conversar com nossa IA assistente. 
                Ela entende suas necessidades e encontra os melhores cuidadores verificados 
                disponíveis em Mogi das Cruzes e região do Alto Tietê. É simples, rápido e seguro. 
                Ligue para <strong>(11) 4863-3976</strong> ou envie uma mensagem pelo WhatsApp.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#3e8861] to-[#2d6647] text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Encontre o Cuidador Ideal em Mogi das Cruzes
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-2xl mx-auto">
            Solicite um orçamento gratuito e tenha acesso a cuidadores verificados na sua região
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#3e8861] hover:bg-white/90 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <a
                href="https://wa.me/551148633976?text=Ol%C3%A1%2C%20preciso%20de%20um%20cuidador%20de%20idosos%20em%20Mogi%20das%20Cruzes"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                WhatsApp: (11) 4863-3976
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              <Link to="/pre-cadastro">
                Trabalhe Conosco como Cuidador
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CuidadorIdososMogiDasCruzes;
