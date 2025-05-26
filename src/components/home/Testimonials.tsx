"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  avatar: string;
  text: string;
  rating: number;
};

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Paulo M.",
      avatar: "/avatars/avatar-1.jpg",
      text: "Fiquei impressionada com a praticidade da Mila! Em poucos minutos, ela encontrou cuidadores disponíveis perto da minha casa. Todo o processo foi rápido e sem complicações. Recomendo demais!",
      rating: 5,
    },
    {
      id: 2,
      name: "Carlos T.",
      avatar: "/avatars/avatar-2.jpg",
      text: "A Mila facilitou tudo pra mim. Eu só mandei uma mensagem e ela já me mostrou várias opções de cuidadores. Nunca foi tão simples encontrar ajuda!",
      rating: 5,
    },
    {
      id: 3,
      name: "Luciana G.",
      avatar: "/avatars/avatar-3.jpg",
      text: "Achei a Mila super prática! Consegui conversar, ver as avaliações dos cuidadores e decidir com tranquilidade. Tudo pelo WhatsApp.",
      rating: 5,
    },
    {
      id: 4,
      name: "Renata S.",
      avatar: "/avatars/avatar-4.jpg",
      text: "Simplesmente incrível! A Mila resolveu algo que eu estava há dias tentando. Encontrou uma cuidadora disponível no mesmo dia. Rápido e eficiente.",
      rating: 5,
    },
    {
      id: 5,
      name: "Roberto G.",
      avatar: "/avatars/avatar-5.jpg",
      text: "O atendimento da CareConnect superou minhas expectativas. Estou muito satisfeito com o cuidador que encontrei para minha mãe. Ele tem sido atencioso e profissional.",
      rating: 5,
    },
    {
      id: 6,
      name: "Mariana L.",
      avatar: "/avatars/avatar-6.jpg",
      text: "Consegui encontrar uma cuidadora excelente para meu pai que está se recuperando de uma cirurgia. A CareConnect facilitou muito esse processo difícil.",
      rating: 5,
    },
  ];

  // Função para criar grupos de 3 para exibição em desktop
  const createGroups = (items: Testimonial[], size: number): Testimonial[][] => {
    const groups: Testimonial[][] = [];
    for (let i = 0; i < items.length; i += size) {
      groups.push(items.slice(i, i + size));
    }
    return groups;
  };

  const testimonialGroups = createGroups(testimonials, 3);
  const [currentGroup, setCurrentGroup] = useState(0);

  const goToNextGroup = () => {
    setCurrentGroup((prev) => (prev === testimonialGroups.length - 1 ? 0 : prev + 1));
  };

  const goToPrevGroup = () => {
    setCurrentGroup((prev) => (prev === 0 ? testimonialGroups.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Esqueça a complicação dos apps. <span className="text-primary">Com a Mila</span>, você encontra o cuidador ideal em poucos cliques
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sem baixar ou descobrir novos aplicativos. O CareConnect organiza tudo por meio do seu aplicativo de mensagens. Basta adicionar o número da Mila!
          </p>
        </div>

        {/* Desktop Testimonials */}
        <div className="hidden md:block relative">
          <div className="flex gap-6">
            {testimonialGroups[currentGroup].map((testimonial) => (
              <Card key={testimonial.id} className="p-6 flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </Card>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevGroup}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={goToNextGroup}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Mobile Testimonials */}
        <div className="md:hidden">
          <div className="space-y-4">
            {testimonials.slice(0, 3).map((testimonial) => (
              <Card key={testimonial.id} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonialGroups.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentGroup(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentGroup ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Ver grupo de depoimentos ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
