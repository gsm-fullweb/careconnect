"use client";

import {
  Shield,
  UserCheck,
  Clock,
  Brain
} from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <Shield className="w-12 h-12 text-[#6B46C1]" />,
      title: "Segurança",
      description: "Todos os cuidadores passam por verificação de antecedentes e validação de documentos",
    },
    {
      icon: <UserCheck className="w-12 h-12 text-[#6B46C1]" />,
      title: "Profissionais Qualificados",
      description: "Cuidadores com experiência comprovada e certificações na área de saúde",
    },
    {
      icon: <Clock className="w-12 h-12 text-[#6B46C1]" />,
      title: "Disponibilidade 24/7",
      description: "Atendimento disponível a qualquer hora, incluindo feriados e fins de semana",
    },
    {
      icon: <Brain className="w-12 h-12 text-[#6B46C1]" />,
      title: "Matching Inteligente com IA Mila",
      description: "Sistema que encontra o profissional ideal com base nas suas necessidades",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Por que escolher a CareConnect?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              <div className="mb-5">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
