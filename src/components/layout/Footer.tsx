"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary/10 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-40 h-12">
                <Image
                  src="/logo-careconnect.png"
                  alt="CareConnect Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-600 mb-6">
              Conectando cuidado a quem precisa ser cuidado. Encontre o profissional ideal de forma simples e tenha tranquilidade no cuidado com seus entes queridos.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-600 hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-gray-600 hover:text-primary transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/buscar-cuidadores" className="text-gray-600 hover:text-primary transition-colors">
                  Buscar Cuidadores
                </Link>
              </li>
              <li>
                <Link href="/cadastrar-cuidador" className="text-gray-600 hover:text-primary transition-colors">
                  Cadastrar Cuidador
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-600 hover:text-primary transition-colors">
                  Dashboard Administrativo
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-bold text-lg mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicos/cuidadores-de-idosos" className="text-gray-600 hover:text-primary transition-colors">
                  Cuidadores de Idosos
                </Link>
              </li>
              <li>
                <Link href="/servicos/acompanhantes-hospitalares" className="text-gray-600 hover:text-primary transition-colors">
                  Acompanhantes Hospitalares
                </Link>
              </li>
              <li>
                <Link href="/servicos/home-care" className="text-gray-600 hover:text-primary transition-colors">
                  Home Care
                </Link>
              </li>
              <li>
                <Link href="/servicos/enfermagem-domiciliar" className="text-gray-600 hover:text-primary transition-colors">
                  Enfermagem Domiciliar
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-primary mr-2 flex-shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                <span className="text-gray-600">
                  Mogi das Cruzes - SP
                </span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone text-primary mr-2 flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <span className="text-gray-600">(11) 4863-3976</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-primary mr-2 flex-shrink-0"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                <span className="text-gray-600">contato@careconnect.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              &copy; {currentYear} CareConnect. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <Link href="/ajuda" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Ajuda
              </Link>
              <Link href="/termos-de-uso" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Termos de Uso
              </Link>
              <Link href="/politica-de-privacidade" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/blog" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pronto para começar? */}
      <div className="bg-primary text-white py-10 mt-16">
        <div className="container-custom">
          <div className="flex flex-col items-center justify-center text-center">
            <Heart className="w-12 h-12 mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-lg mb-6 max-w-2xl">
              Encontre o cuidador ideal para sua família hoje mesmo
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/buscar-cuidadores"
                className="btn-secondary bg-white text-primary hover:bg-white/90"
              >
                Buscar Cuidadores
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
