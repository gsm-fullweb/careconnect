import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout"; // Alterado de MainLayout para Layout
import SEO from "@/components/SEO";
import { FIND_CAREGIVER_URL, FIND_CAREGIVER_LABEL } from "@/lib/contact";
import {
  Clock,
  Heart,
  Activity,
  Thermometer,
  ShieldPlus,
  Pill,
  Utensils,
  BedDouble,
  Bath,
  BookOpen
} from "lucide-react";

const Services = () => { // Alterado de export default function Servicos() para const Servicos = () => {
  const categories = [
    {
      title: "Cuidados Básicos",
      icon: <Heart className="w-16 h-16 text-[#3e8861] mb-4" />,
      description: "Serviços essenciais de assistência diária para garantir conforto e bem-estar",
      services: [
        {
          icon: <Bath className="w-8 h-8 text-[#3e8861]" />,
          name: "Higiene Pessoal",
          description: "Auxílio no banho, higiene bucal, troca de roupas e fraldas"
        },
        {
          icon: <Utensils className="w-8 h-8 text-[#3e8861]" />,
          name: "Alimentação",
          description: "Preparo de refeições adequadas à dieta e auxílio na alimentação"
        },
        {
          icon: <BedDouble className="w-8 h-8 text-[#3e8861]" />,
          name: "Locomoção e Transferência",
          description: "Auxílio para levantar da cama, sentar, caminhar e realizar atividades"
        },
        {
          icon: <Clock className="w-8 h-8 text-[#3e8861]" />,
          name: "Companhia",
          description: "Presença para conversar, entreter e fornecer apoio emocional"
        }
      ]
    },
    {
      title: "Cuidados Específicos",
      icon: <Activity className="w-16 h-16 text-[#3e8861] mb-4" />,
      description: "Cuidados especializados para necessidades específicas de saúde",
      services: [
        {
          icon: <Thermometer className="w-8 h-8 text-[#3e8861]" />,
          name: "Monitoramento de Sinais Vitais",
          description: "Acompanhamento de pressão, temperatura e batimentos cardíacos"
        },
        {
          icon: <Pill className="w-8 h-8 text-[#3e8861]" />,
          name: "Administração de Medicamentos",
          description: "Controle da medicação conforme prescrição médica"
        },
        {
          icon: <ShieldPlus className="w-8 h-8 text-[#3e8861]" />,
          name: "Cuidados com Feridas",
          description: "Limpeza e curativos em feridas sob orientação médica"
        },
        {
          icon: <BookOpen className="w-8 h-8 text-[#3e8861]" />,
          name: "Estímulo Cognitivo",
          description: "Atividades para manter e estimular as capacidades mentais"
        }
      ]
    }
  ];

  const additionalServices = [
    {
      title: "Acompanhamento em Consultas",
      description: "Transporte e acompanhamento em consultas médicas, exames e terapias"
    },
    {
      title: "Atendimento Pós-Hospitalar",
      description: "Cuidados especiais para pacientes em recuperação após internação"
    },
    {
      title: "Cuidados a Pacientes com Alzheimer",
      description: "Atendimento especializado para pessoas com Alzheimer e outras demências"
    },
    {
      title: "Cuidados Paliativos",
      description: "Suporte para proporcionar conforto e dignidade em cuidados paliativos"
    },
    {
      title: "Cuidado Noturno",
      description: "Acompanhamento durante a noite para garantir segurança e atendimento imediato"
    },
    {
      title: "Fisioterapia Domiciliar",
      description: "Sessões de fisioterapia realizadas no conforto da casa do paciente"
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Serviços de Home Care e Cuidador de Idosos em Mogi das Cruzes" 
        description="Serviços de cuidador de idosos em Mogi das Cruzes: home care 24h, acompanhamento hospitalar, cuidados para Alzheimer, cuidados paliativos e pós-cirúrgico. Cuidadores verificados e qualificados."
        canonical="/services"
      />
      {/* Hero Section - Estilo Humanizado */}

      <section className="py-16 md:py-24 bg-gradient-to-br from-[#f4f8f9] via-[#e9f3f1] to-[#f8fbfa]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Serviços de Cuidador de Idosos em Mogi das Cruzes
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                A CareConnect oferece serviços completos de cuidadores de idosos em Mogi das Cruzes e região do Alto Tietê. Cuidados personalizados para atender às necessidades específicas de cada idoso, garantindo conforto, dignidade e qualidade de vida.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Todos os nossos cuidadores são rigorosamente selecionados, treinados e supervisionados para proporcionar o melhor atendimento possível.
              </p>
              <Button
                asChild
                className="bg-[#3e8861] hover:bg-[#347553] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href={FIND_CAREGIVER_URL} target="_blank" rel="noopener noreferrer">
                  {FIND_CAREGIVER_LABEL}
                </a>
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-blue-200 rounded-3xl transform rotate-6"></div>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/services-main.png"
                    alt="Cuidador auxiliando idoso"
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias de Serviços */}
      {categories.map((category, index) => (
        <section key={index} className={`py-16 md:py-24 ${index % 2 ? "" : "bg-primary/5"}`}>
          <div className="container-custom">
            <div className="text-center mb-12">
              <div className="flex justify-center">{category.icon}</div>
              <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.services.map((service, serviceIndex) => (
                <Card key={serviceIndex} className="p-6 flex">
                  <div className="mr-4 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{service.name}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Serviços Adicionais */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Serviços Adicionais</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Além dos cuidados básicos e específicos, oferecemos uma variedade de serviços complementares para atender a todas as necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Como Funciona</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Contratar um cuidador através da CareConnect é simples e rápido
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#3e8861] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Entre em Contato</h3>
              <p className="text-gray-600">
                Fale com o Encontre um cuidador pelo WhatsApp e informe as necessidades específicas de cuidado para seu familiar
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#3e8861] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Receba Indicações</h3>
              <p className="text-gray-600">
                Nossa IA Encontre um cuidador selecionará os melhores cuidadores de acordo com as necessidades informadas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#3e8861] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Inicie o Atendimento</h3>
              <p className="text-gray-600">
                Escolha o cuidador ideal, agende uma visita e comece a receber o atendimento personalizado
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-[#3e8861] hover:bg-[#347553] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href={FIND_CAREGIVER_URL} target="_blank" rel="noopener noreferrer">
                {FIND_CAREGIVER_LABEL}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Perguntas Frequentes */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Perguntas Frequentes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Respostas para as dúvidas mais comuns sobre nossos serviços
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Qual é o valor mensal para um cuidador de idosos em Mogi das Cruzes?</h3>
              <p className="text-gray-600">
                Em Mogi das Cruzes, o valor mensal de um cuidador de idosos varia de R$ 2.800 a R$ 4.500 para contratação direta, e de R$ 4.500 a R$ 9.000 via agência (inclui encargos, substituição e supervisão). O preço depende da complexidade do caso e do regime de contratação. Na CareConnect, ajudamos a encontrar o melhor custo-benefício.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Quanto está custando a diária de uma cuidadora de idosos?</h3>
              <p className="text-gray-600">
                A diária de uma cuidadora (plantão de 12 horas) em Mogi das Cruzes e região custa entre R$ 150 e R$ 320. Plantões noturnos podem ter adicional de 20%. Profissionais especializados em Alzheimer ou AVC cobram de 15% a 35% acima da base.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Quanto é 12 horas de uma cuidadora?</h3>
              <p className="text-gray-600">
                O plantão de 12 horas de uma cuidadora em Mogi das Cruzes custa entre R$ 150 e R$ 320, dependendo da qualificação da profissional e da complexidade do atendimento. Solicite um orçamento personalizado pela CareConnect.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Quanto custa 6 horas de uma cuidadora?</h3>
              <p className="text-gray-600">
                O valor médio para 6 horas de cuidadora em Mogi das Cruzes fica entre R$ 100 e R$ 200, variando conforme a experiência da profissional e as necessidades do paciente.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Qual é a diferença entre cuidador e enfermeiro?</h3>
              <p className="text-gray-600">
                Cuidadores oferecem assistência nas atividades diárias como alimentação, higiene e acompanhamento, enquanto enfermeiros são profissionais de saúde formados que podem realizar procedimentos médicos específicos. Na CareConnect, temos ambos os perfis disponíveis em Mogi das Cruzes.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Como contratar um cuidador de idosos em Mogi das Cruzes?</h3>
              <p className="text-gray-600">
                Na CareConnect, basta acessar nosso WhatsApp e conversar com nossa IA assistente. Ela entende suas necessidades e encontra os melhores cuidadores verificados disponíveis em Mogi das Cruzes e região do Alto Tietê. É simples, rápido e seguro.
              </p>
            </Card>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="text-[#3e8861] font-medium hover:underline"
            >
              Ver todas as perguntas frequentes →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#3e8861] to-[#2d6647] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para encontrar o cuidador ideal?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Converse com o Encontre um cuidador e descubra como podemos ajudar a sua família a encontrar o melhor cuidado
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#3e8861] hover:bg-white/90 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href={FIND_CAREGIVER_URL} target="_blank" rel="noopener noreferrer">
                {FIND_CAREGIVER_LABEL}
              </a>
            </Button>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
