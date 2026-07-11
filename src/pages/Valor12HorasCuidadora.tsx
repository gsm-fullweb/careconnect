import SEO from "@/components/SEO";
import { LocalBusinessSchema } from "@/components/SchemaOrg";
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

const Valor12HorasCuidadora = () => {
  const servicos = [
    {
      icon: <Bath className="w-8 h-8 text-[#3e8861]" />,
      nome: "Cuidador Domiciliar",
      descricao: "AssistÃªncia completa em domicÃ­lio: higiene, alimentaÃ§Ã£o, medicaÃ§Ã£o e companhia para idosos em Mogi das Cruzes.",
    },
    {
      icon: <Activity className="w-8 h-8 text-[#3e8861]" />,
      nome: "Acompanhante Hospitalar",
      descricao: "Acompanhamento em internaÃ§Ãµes, consultas e exames nos principais hospitais locais: Santa Casa de Mogi, Hospital Ipiranga, Hospital Santana e Luzia de Pinho Melo.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-[#3e8861]" />,
      nome: "Cuidados para Alzheimer",
      descricao: "Cuidadores especializados em Alzheimer e demÃªncias, com treinamento para lidar com as particularidades da doenÃ§a.",
    },
    {
      icon: <Heart className="w-8 h-8 text-[#3e8861]" />,
      nome: "Cuidados Paliativos",
      descricao: "Suporte humanizado e digno para pacientes em cuidados paliativos, no conforto de suas casas em Mogi das Cruzes.",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#3e8861]" />,
      nome: "Cuidador Noturno",
      descricao: "PlantÃµes noturnos de 12h para garantir seguranÃ§a e cuidado durante a noite, com profissionais verificados.",
    },
    {
      icon: <Thermometer className="w-8 h-8 text-[#3e8861]" />,
      nome: "PÃ³s-CirÃºrgico",
      descricao: "Acompanhamento especializado pÃ³s-operatÃ³rio para recuperaÃ§Ã£o segura do idoso em casa.",
    },
  ];

  const precos = [
    {
      modalidade: "DiÃ¡ria (12 horas)",
      faixa: "R$ 150 â€“ R$ 320",
      detalhes: "PlantÃ£o diurno ou noturno. Adicional noturno de 20% entre 22h-5h.",
    },
    {
      modalidade: "Meio perÃ­odo (6 horas)",
      faixa: "R$ 100 â€“ R$ 200",
      detalhes: "Ideal para necessidades pontuais ou complemento de cuidado familiar.",
    },
    {
      modalidade: "Mensal (contrataÃ§Ã£o direta)",
      faixa: "R$ 2.800 â€“ R$ 4.500",
      detalhes: "Cuidador fixo contratado diretamente. Valores por regime de 12h/dia.",
    },
    {
      modalidade: "Mensal (via agÃªncia)",
      faixa: "R$ 4.500 â€“ R$ 9.000",
      detalhes: "Inclui encargos, substituiÃ§Ã£o de folgas e supervisÃ£o profissional.",
    },
  ];

  const bairrosAtendidos = [
    "Centro", "Mogilar", "Vila Oliveira", "Socorro", "Jundiapeba",
    "Braz Cubas", "BrÃ¡s Cubas", "CÃ©sar de Souza", "Vila Industrial",
    "Vila SuÃ­ssa", "Jardim Universo", "Mogi Moderno", "Alto Ipiranga",
    "Jardim Marica", "Vila Nova Aparecida", "Vila LavÃ­nia",
  ];

  const cidadesAtendidas = [
    { nome: "Mogi das Cruzes", destaque: true },
    { nome: "Suzano", destaque: false },
    { nome: "ArujÃ¡", destaque: false },
    { nome: "Guararema", destaque: false },
    { nome: "Biritiba Mirim", destaque: false },
    { nome: "SalesÃ³polis", destaque: false },
    { nome: "PoÃ¡", destaque: false },
    { nome: "Ferraz de Vasconcelos", destaque: false },
    { nome: "Itaquaquecetuba", destaque: false },
  ];

  return (
    <Layout>
      <SEO
        title="Quanto é 12 horas de uma cuidadora? | CareConnect"
        description="Descubra quanto custa 12 horas de uma cuidadora de idosos. Tabela de preços para plantões diurnos e noturnos. Tire suas dúvidas pelo WhatsApp."
        canonical="/cuidador-idosos-mogi-das-cruzes"
      />
      <LocalBusinessSchema
        name="CareConnect - Cuidador em Mogi das Cruzes"
        description="Descubra quanto custa 12 horas de uma cuidadora de idosos. Tabela de preços para plantões diurnos e noturnos. Tire suas dúvidas pelo WhatsApp."
        city="Mogi das Cruzes"
        state="SP"
        phone="+55-11-4863-3976"
        email="contato@careconnect.com.br"
        url="/quanto-e-12-horas-de-uma-cuidadora"
      />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#f4f8f9] via-[#e9f3f1] to-[#f8fbfa]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3e8861]/10 text-[#3e8861] rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4" />
                Atendimento em Mogi das Cruzes
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Quanto é 12 horas <span className="text-[#3e8861]">de uma cuidadora?</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                A <strong>CareConnect</strong> Ã© especializada em conectar famÃ­lias aos melhores 
                <strong> cuidadores em Mogi das Cruzes</strong>. Profissionais selecionados com 
                rigor e matching por InteligÃªncia Artificial para garantir que o seu ente querido 
                receba o atendimento exato e humanizado de que precisa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#3e8861] hover:bg-[#347553] text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a
                    href="https://api.whatsapp.com/send/?phone=551148633976&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Falar com Especialista
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
                  <span>SeleÃ§Ã£o Rigorosa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-5 h-5 text-[#3e8861]" />
                  <span>Matching com IA</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-5 h-5 text-[#3e8861]" />
                  <span>Agilidade</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-[#3e8861]/20 rounded-3xl transform rotate-6" />
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/hero-image.jpg"
                    alt="Cuidador trabalhando na CareConnect em Mogi das Cruzes"
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

      {/* ServiÃ§os */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos ServiÃ§os de Home Care em Mogi das Cruzes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Oferecemos serviÃ§os completos de cuidadores de idosos em domicÃ­lio, adaptados Ã s
              necessidades de cada famÃ­lia na regiÃ£o de Mogi das Cruzes e Alto TietÃª.
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

      {/* Tabela de PreÃ§os */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Valores e PreÃ§os de Cuidadores em Mogi das Cruzes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Confira a tabela de valores estimados para serviÃ§os de cuidador de idosos 
              em Mogi das Cruzes e regiÃ£o. Os preÃ§os podem variar conforme a complexidade 
              do caso e qualificaÃ§Ã£o do profissional.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#3e8861] text-white">
                    <th className="text-left px-6 py-4 font-semibold">Modalidade</th>
                    <th className="text-left px-6 py-4 font-semibold">Faixa de PreÃ§o</th>
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
              * Valores estimados para a regiÃ£o de Mogi das Cruzes (2026). 
              Solicite um orÃ§amento personalizado para o caso especÃ­fico do seu familiar.
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
              Somos a Ãºnica plataforma na regiÃ£o com matching inteligente por IA 
              para conectar famÃ­lias a cuidadores verificados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#3e8861]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#3e8861]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Cuidadores Verificados</h3>
              <p className="text-gray-600 text-sm">
                Background check completo, verificaÃ§Ã£o de documentos e referÃªncias profissionais.
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
                Cuidadores que moram em Mogi das Cruzes e regiÃ£o, garantindo pontualidade e proximidade.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#3e8861]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#3e8861]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Suporte 24/7</h3>
              <p className="text-gray-600 text-sm">
                Atendimento a qualquer hora via WhatsApp. SubstituiÃ§Ã£o de cuidadores em caso de emergÃªncia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ãreas Atendidas */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ãreas Atendidas em Mogi das Cruzes e RegiÃ£o
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Atendemos em toda a cidade de Mogi das Cruzes e cidades vizinhas do Alto TietÃª.
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
                Cidades da RegiÃ£o do Alto TietÃª
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
              Respostas para as dÃºvidas mais comuns de famÃ­lias que buscam 
              cuidadores de idosos na regiÃ£o.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Qual Ã© o valor mensal para um cuidador de idosos em Mogi das Cruzes?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Em Mogi das Cruzes, o valor mensal de um cuidador de idosos varia de 
                <strong> R$ 2.800 a R$ 4.500</strong> para contrataÃ§Ã£o direta, e de 
                <strong> R$ 4.500 a R$ 9.000</strong> via agÃªncia (inclui encargos, 
                substituiÃ§Ã£o e supervisÃ£o). O preÃ§o depende da complexidade do caso 
                e do regime de contrataÃ§Ã£o. Na CareConnect, ajudamos a encontrar o 
                melhor custo-benefÃ­cio para sua famÃ­lia.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Quanto estÃ¡ custando a diÃ¡ria de uma cuidadora de idosos?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A diÃ¡ria de uma cuidadora (plantÃ£o de 12 horas) em Mogi das Cruzes custa 
                entre <strong>R$ 150 e R$ 320</strong>. PlantÃµes noturnos podem ter adicional 
                de 20%. Profissionais especializados em Alzheimer ou AVC cobram de 15% a 35% 
                acima da base.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Quanto Ã© 12 horas de uma cuidadora?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                O plantÃ£o de 12 horas de uma cuidadora em Mogi das Cruzes custa entre 
                <strong> R$ 150 e R$ 320</strong>, dependendo da qualificaÃ§Ã£o da profissional 
                e da complexidade do atendimento. Solicite um orÃ§amento personalizado pela CareConnect.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Quanto custa 6 horas de uma cuidadora?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                O valor mÃ©dio para 6 horas de cuidadora em Mogi das Cruzes fica entre 
                <strong> R$ 100 e R$ 200</strong>, variando conforme a experiÃªncia da 
                profissional e as necessidades do paciente.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-gray-900">
                <span>Precisa de cuidador de idosos? Como saber se estÃ¡ na hora?</span>
                <span className="text-[#3e8861] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Se seu familiar apresenta dificuldades para realizar atividades do dia a dia 
                (higiene, alimentaÃ§Ã£o, locomoÃ§Ã£o), esquece medicamentos, tem quedas frequentes 
                ou precisa de companhia constante, Ã© hora de considerar um cuidador profissional. 
                A CareConnect em Mogi das Cruzes conecta vocÃª a cuidadores verificados rapidamente.
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
                disponÃ­veis em Mogi das Cruzes e regiÃ£o do Alto TietÃª. Ã‰ simples, rÃ¡pido e seguro. 
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
            Solicite um orÃ§amento gratuito e tenha acesso a cuidadores verificados na sua regiÃ£o
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#3e8861] hover:bg-white/90 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <a
                href="https://api.whatsapp.com/send/?phone=551148633976&text&type=phone_number&app_absent=0"
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

export default Valor12HorasCuidadora;

