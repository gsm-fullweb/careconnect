"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Star, SearchIcon, MapPin, Clock } from "lucide-react";

interface Cuidador {
  id: number;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  specialties: string[];
  experience: string;
  availability: string;
}

export default function BuscarCuidadores() {
  const [searchTerm, setSearchTerm] = useState("");

  const cuidadores: Cuidador[] = [
    {
      id: 1,
      name: "Maria Silva",
      avatar: "/cuidadores/cuidador-1.jpg",
      location: "São Paulo, SP",
      rating: 4.8,
      specialties: ["Cuidadora de Idosos", "Técnica de Enfermagem"],
      experience: "8 anos de experiência",
      availability: "Período Integral",
    },
    {
      id: 2,
      name: "João Pereira",
      avatar: "/cuidadores/cuidador-2.jpg",
      location: "São Paulo, SP",
      rating: 4.9,
      specialties: ["Cuidador de Idosos", "Fisioterapeuta"],
      experience: "6 anos de experiência",
      availability: "Período Diurno",
    },
    {
      id: 3,
      name: "Ana Oliveira",
      avatar: "/cuidadores/cuidador-3.jpg",
      location: "São Paulo, SP",
      rating: 5.0,
      specialties: ["Cuidadora de Idosos", "Enfermeira"],
      experience: "10 anos de experiência",
      availability: "Período Noturno",
    },
    {
      id: 4,
      name: "Carlos Santos",
      avatar: "/cuidadores/cuidador-4.jpg",
      location: "São Paulo, SP",
      rating: 4.7,
      specialties: ["Cuidador de Idosos"],
      experience: "5 anos de experiência",
      availability: "Disponibilidade Flexível",
    },
    {
      id: 5,
      name: "Beatriz Lima",
      avatar: "/cuidadores/cuidador-5.jpg",
      location: "São Paulo, SP",
      rating: 4.9,
      specialties: ["Cuidadora de Idosos", "Psicóloga"],
      experience: "7 anos de experiência",
      availability: "Período Integral",
    },
    {
      id: 6,
      name: "Ricardo Moreira",
      avatar: "/cuidadores/cuidador-6.jpg",
      location: "São Paulo, SP",
      rating: 4.6,
      specialties: ["Cuidador de Idosos"],
      experience: "4 anos de experiência",
      availability: "Fins de Semana",
    },
  ];

  const filteredCuidadores = cuidadores.filter(
    (cuidador) =>
      cuidador.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cuidador.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cuidador.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <MainLayout>
      <section className="py-12 md:py-20 bg-primary/5">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Encontre o Cuidador Ideal para sua Família
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Conecte-se com a Mila pelo WhatsApp e encontre o cuidador perfeito de forma rápida, segura e sem estresse!
            </p>

            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar por nome, localização ou especialidade..."
                className="pl-10 h-12 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="mt-4">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90"
              >
                <Link href="https://wa.me/551148633976">
                  <Image
                    src="/whatsapp-icon.png"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  Falar com a Mila no WhatsApp
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCuidadores.length > 0 ? (
              filteredCuidadores.map((cuidador) => (
                <Card key={cuidador.id} className="overflow-hidden">
                  <div className="flex items-center p-6 border-b">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={cuidador.avatar}
                        alt={cuidador.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{cuidador.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {cuidador.location}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="font-medium mr-1">{cuidador.rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(cuidador.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="font-medium mb-2">Especialidades:</p>
                      <div className="flex flex-wrap gap-2">
                        {cuidador.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{cuidador.experience}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {cuidador.availability}
                      </span>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <a href={`https://wa.me/551148633976?text=Olá! Gostaria de saber mais sobre o(a) cuidador(a) ${cuidador.name}`}>
                        <Image
                          src="/whatsapp-icon.png"
                          alt="WhatsApp"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        Solicitar este cuidador
                      </a>
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg mb-4">
                  Nenhum cuidador encontrado com os critérios informados.
                </p>
                <p className="text-gray-600">
                  Tente buscar com outros termos ou entre em contato conosco para ajuda personalizada.
                </p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4">
                Agende 10x mais rápido com a Mila pelo WhatsApp!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Basta enviar uma mensagem de texto ou voz para a Mila, e ela cuidará de tudo para você.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <a href="https://wa.me/551148633976">
                  <Image
                    src="/whatsapp-icon.png"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  Falar com a Mila
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
