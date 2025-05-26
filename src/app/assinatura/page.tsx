"use client";

import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function Assinatura() {
  const subscriptions = [
    {
      price: "19.90",
      plan: "Básico",
      description: "Ideal para quem busca o essencial para encontrar o cuidador ideal.",
      features: [
        "Acesso ilimitado à Mila, sua assistente virtual 24/7.",
        "Recomendações personalizadas de cuidadores baseadas em suas necessidades.",
        "Processo de agendamento simplificado e rápido.",
        "Notificações sobre novos cuidadores na sua região."
      ],
    },
    {
      price: "29.90",
      plan: "Essencial",
      description: "Mais recursos para uma busca e contratação de cuidadores ainda mais eficiente.",
      features: [
        "Todos os recursos do plano Básico.",
        "Prioridade nas recomendações de cuidadores, garantindo acesso aos melhores profissionais.",
        "Suporte dedicado via chat para tirar todas as suas dúvidas.",
        "Acesso a avaliações e comentários de outros usuários sobre cuidadores."
      ],
    },
    {
      price: "59.90",
      plan: "Premium",
      description: "Experiência completa e personalizada para quem busca o máximo em cuidado e conveniência.",
      features: [
        "Todos os recursos do plano Essencial.",
        "Acesso exclusivo a cuidadores premium, com vasta experiência e qualificações diferenciadas.",
        "Consultoria personalizada para auxiliar na escolha do cuidador perfeito.",
        "Gerenciamento completo de agendamentos e pagamentos pela plataforma."
      ],
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#483db4] to-[#5ab385] text-white py-20 md:py-32">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Cuidado de Qualidade ao Seu Alcance
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto">
            Assine a Mila e transforme a maneira como você encontra e gerencia cuidadores. Tenha acesso a uma rede de profissionais qualificados e a ferramentas que simplificam o cuidado.
          </p>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto font-semibold text-yellow-300">
            E o melhor: seu primeiro agendamento é gratuito!
          </p>
          <Button asChild size="lg" className="bg-white text-[#483db4] hover:bg-gray-100 text-lg rounded-full px-8 py-3">
            <Link href="#planos">Escolha seu Plano</Link>
          </Button>
        </div>
      </section>

      {/* Subscription Plans Section */}
      <section id="planos" className="py-16 md:py-24 bg-primary/5">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Planos de Assinatura
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Encontre o plano perfeito para suas necessidades e comece a desfrutar dos benefícios da CareConnect com a ajuda da Mila.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptions.map((sub, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md flex flex-col justify-between border border-gray-200"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{sub.plan}</h3>
                  <p className="text-lg text-gray-600 mb-6">{sub.description}</p>
                  <p className="text-4xl font-bold text-[#483db4] mb-6">
                    R${sub.price} <span className="text-lg text-gray-600">/ mês</span>
                  </p>
                  <ul className="text-left text-gray-700 mb-8 space-y-3">
                    {sub.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#5ab385] mr-2 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="bg-[#5ab385] text-white hover:bg-[#4a9c73] rounded-full w-full text-lg py-3">
                  <Link href="#">Assinar {sub.plan}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image and Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-80 md:h-auto aspect-square rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/sobre/mila-whatsapp.jpg"
              alt="Mila - Sua Assistente Virtual"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Conheça a Mila: Sua Aliada no Cuidado
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Mila é a inteligência artificial da CareConnect, desenvolvida para simplificar a sua busca por cuidadores. Com ela, você tem acesso rápido e intuitivo a recomendações personalizadas, agendamentos e todas as informações que precisa.
            </p>
            <ul className="text-lg text-gray-700 space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#5ab385] mr-3 flex-shrink-0" />
                <span>Disponível 24 horas por dia, 7 dias por semana.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#5ab385] mr-3 flex-shrink-0" />
                <span>Recomendações precisas baseadas em suas preferências e localização.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#5ab385] mr-3 flex-shrink-0" />
                <span>Facilita a comunicação e o agendamento com cuidadores.</span>
              </li>
               <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#5ab385] mr-3 flex-shrink-0" />
                <span>Mila guarda suas conversas anteriores, tornando a edição e novos agendamentos muito mais simples e rápidos.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

       {/* Call to Action Section */}
       <section className="py-16 md:py-24 bg-primary/5 text-center">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Pronto para Simplificar o Cuidado?
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Escolha seu plano hoje mesmo e tenha a tranquilidade de encontrar o cuidador ideal com a ajuda da Mila e da CareConnect.
          </p>
          <Button asChild size="lg" className="bg-[#483db4] text-white hover:bg-[#3a308c] text-lg rounded-full px-8 py-3">
            <Link href="#planos">Assinar Agora</Link>
          </Button>
        </div>
      </section>

    </MainLayout>
  );
}
