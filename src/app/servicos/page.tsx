"use client";

import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

export default function Servicos() {
  const categories = [
    {
      title: "Cuidados Básicos",
      icon: <Heart className="w-16 h-16 text-primary mb-4" />,
      description: "Serviços essenciais de assistência diária para garantir conforto e bem-estar",
      services: [
        {
          icon: <Bath className="w-8 h-8 text-primary" />,
          name: "Higiene Pessoal",
          description: "Auxílio no banho, higiene bucal, troca de roupas e fraldas"
        },
        {
          icon: <Utensils className="w-8 h-8 text-primary" />,
          name: "Alimentação",
          description: "Preparo de refeições adequadas à dieta e auxílio na alimentação"
        },
        {
          icon: <BedDouble className="w-8 h-8 text-primary" />,
          name: "Locomoção e Transferência",
          description: "Auxílio para levantar da cama, sentar, caminhar e realizar atividades"
        },
        {
          icon: <Clock className="w-8 h-8 text-primary" />,
          name: "Companhia",
          description: "Presença para conversar, entreter e fornecer apoio emocional"
        }
      ]
    },
    {
      title: "Cuidados Específicos",
      icon: <Activity className="w-16 h-16 text-primary mb-4" />,
      description: "Cuidados especializados para necessidades específicas de saúde",
      services: [
        {
          icon: <Thermometer className="w-8 h-8 text-primary" />,
          name: "Monitoramento de Sinais Vitais",
          description: "Acompanhamento de pressão, temperatura e batimentos cardíacos"
        },
        {
          icon: <Pill className="w-8 h-8 text-primary" />,
          name: "Administração de Medicamentos",
          description: "Controle da medicação conforme prescrição médica"
        },
        {
          icon: <ShieldPlus className="w-8 h-8 text-primary" />,
          name: "Cuidados com Feridas",
          description: "Limpeza e curativos em feridas sob orientação médica"
        },
        {
          icon: <BookOpen className="w-8 h-8 text-primary" />,
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
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Nossos Serviços de Cuidados
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Oferecemos uma ampla gama de serviços de cuidados personalizados para atender às necessidades específicas de cada idoso, garantindo conforto, dignidade e qualidade de vida.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Todos os nossos cuidadores são rigorosamente selecionados, treinados e supervisionados para proporcionar o melhor atendimento possível.
              </p>
              <Button
                asChild
                className="btn-primary"
              >
                <Link href="/assinatura">
                  Encontrar Cuidadores
                </Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/services-main.png"
                  alt="Cuidador auxiliando idoso"
                  fill
                  className="object-cover"
                />
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
            <h2 className="section-title">Serviços Adicionais</h2>
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
            <h2 className="section-title">Como Funciona</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Contratar um cuidador através da CareConnect é simples e rápido
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Entre em Contato</h3>
              <p className="text-gray-600">
                Fale com a Mila pelo WhatsApp e informe as necessidades específicas de cuidado para seu familiar
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Receba Indicações</h3>
              <p className="text-gray-600">
                Nossa IA Mila selecionará os melhores cuidadores de acordo com as necessidades informadas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
              className="btn-primary"
            >
              <Link href="https://wa.me/551148633976">
                <Image
                  src="/whatsapp-icon.png"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Falar com a Mila
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Perguntas Frequentes */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Perguntas Frequentes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Respostas para as dúvidas mais comuns sobre nossos serviços
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Qual é a diferença entre cuidador e enfermeiro?</h3>
              <p className="text-gray-600">
                Cuidadores oferecem assistência nas atividades diárias como alimentação, higiene e acompanhamento, enquanto enfermeiros são profissionais de saúde formados que podem realizar procedimentos médicos específicos.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Os cuidadores têm formação específica?</h3>
              <p className="text-gray-600">
                Sim, todos os nossos cuidadores possuem formação e/ou experiência comprovada no cuidado com idosos. Muitos possuem cursos técnicos e especializações na área.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Como é feita a seleção dos cuidadores?</h3>
              <p className="text-gray-600">
                Realizamos um rigoroso processo de seleção que inclui verificação de antecedentes, validação de documentos, entrevistas e avaliação de experiência e habilidades específicas.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">É possível contratar por períodos específicos?</h3>
              <p className="text-gray-600">
                Sim, oferecemos serviços flexíveis que podem ser contratados por horas, períodos (diurno/noturno) ou em regime integral, de acordo com a necessidade de cada família.
              </p>
            </Card>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/contato"
              className="text-primary font-medium hover:underline"
            >
              Ver todas as perguntas frequentes →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para encontrar o cuidador ideal?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Converse com a Mila e descubra como podemos ajudar a sua família a encontrar o melhor cuidado
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-primary hover:bg-white/90 rounded-full"
            >
              <Link href="/assinatura">
                Buscar Cuidadores
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#2D1B69] text-white hover:bg-[#231356] rounded-full"
            >
              <Link href="https://wa.me/551148633976">
                <Image
                  src="/whatsapp-icon.png"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Falar com a Mila
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
