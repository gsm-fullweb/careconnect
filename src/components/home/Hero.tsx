"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-primary/5 py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Conectando cuidado a quem precisa ser cuidado
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Conectamos famílias a cuidadores experientes, garantindo segurança, praticidade e confiança. Encontre o profissional ideal de forma simples e tenha tranquilidade no cuidado com seus entes queridos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="btn-primary text-base"
              >
                <Link href="/assinatura">Buscar Cuidadores</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-secondary text-base"
              >
                <Link href="/cadastrar-cuidador">Cadastrar como Cuidador</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden">
              <Image
                src="/hero-image.jpg"
                alt="Cuidador e pessoa idosa juntos"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
