"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary py-4 md:py-5 sticky top-0 z-50">
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-40 h-12">
                <Image
                  src="/logo-careconnect-white.png"
                  alt="CareConnect Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>
 {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center text-white">
            <Link href="/" className="font-medium hover:text-primary-foreground/80 transition-colors">
              Início
            </Link>
            <Link href="/sobre" className="font-medium hover:text-primary-foreground/80 transition-colors">
              Sobre Nós
            </Link>
            <Link href="/servicos" className="font-medium hover:text-primary-foreground/80 transition-colors">
              Serviços
            </Link>
            <Link href="/contato" className="font-medium hover:text-primary-foreground/80 transition-colors">
              Contato
            </Link>
          </div>

          <div className="hidden md:flex gap-4">
            <Button
              asChild
              variant="outline"
              className="font-medium bg-white text-primary hover:bg-white/90 hover:text-primary rounded-full px-6"
            >
                <Link href="/assinatura">Assinatura</Link>
            </Button>
            <Button
              asChild
              className="font-medium bg-[#2D1B69] text-white hover:bg-[#231356] rounded-full px-6"
            >
              <Link href="/cadastrar-cuidador">Cadastrar como Cuidador</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary text-white p-5 absolute top-[72px] left-0 right-0 z-50 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="font-medium py-2 hover:text-primary-foreground/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/sobre"
              className="font-medium py-2 hover:text-primary-foreground/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link
              href="/servicos"
              className="font-medium py-2 hover:text-primary-foreground/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link
              href="/contato"
              className="font-medium py-2 hover:text-primary-foreground/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <Link
              href="/blog"
              className="font-medium py-2 hover:text-primary-foreground/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/assinatura"
              className="font-medium py-2 hover:text-primary-foreground/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Assinatura
            </Link>
            <div className="pt-2 flex flex-col gap-3">
               {/* Substituído Button com asChild por Link estilizado */}
              <Button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-white text-primary shadow-sm hover:bg-white/90 hover:text-primary w-full h-9"
                 onClick={() => {
                  window.open('https://api.whatsapp.com/send/?phone=551148633976&text&type=phone_number&app_absent=0', '_blank');
                  setIsMenuOpen(false);
                }}
              >
                Buscar Cuidadores
              </Button>
              <Button
                asChild
                className="font-medium bg-[#2D1B69] text-white hover:bg-[#231356] rounded-full w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/cadastrar-cuidador">Cadastrar como Cuidador</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
