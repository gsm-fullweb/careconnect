import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <>
      {/* Mobile Minimalist View */}
      <div className="md:hidden flex flex-col min-h-[100dvh] bg-white relative overflow-hidden justify-between pb-10">
        <div className="flex flex-col items-center pt-[15vh] px-8 z-10">
          <img 
            src="/images/logo-careconnect.png" 
            alt="CareConnect Logo" 
            className="w-56 object-contain mb-14"
          />
          <h1 className="text-[1.4rem] text-center text-gray-800 font-normal leading-snug">
            Encontre <span className="text-[#6850E2] font-semibold">Cuidadores de Idosos</span><br />ou acompanhante facilmente
          </h1>
        </div>

        <div className="px-6 w-full flex justify-center z-10 relative mb-4">
          <Button
            asChild
            className="w-full max-w-sm rounded-full py-7 bg-[#7058EB] hover:bg-[#5C45C8] text-white text-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <a href="https://api.whatsapp.com/send/?phone=551148633976&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
              Encontre Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>

        {/* Decorative Wave Background */}
        <div className="absolute bottom-0 w-full z-0 text-[#F5F3FF]">
          <svg viewBox="0 0 1440 320" className="w-full h-auto" preserveAspectRatio="none" style={{ minHeight: "220px", display: "block" }}>
            <path fill="currentColor" d="M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,176C672,149,768,107,864,106.7C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Desktop View */}
      <section className="hidden md:block bg-primary/5 py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Cuidador de Idosos em Mogi das Cruzes — Encontre o Profissional Ideal
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              A <strong>CareConnect</strong> conecta famílias em <strong>Mogi das Cruzes</strong> e região do Alto Tietê a cuidadores de idosos qualificados e verificados. Matching inteligente com IA para encontrar o profissional ideal com segurança e agilidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#6B46C1] hover:bg-[#5A3A9F] text-white text-base"
              >
                <a href="https://api.whatsapp.com/send/?phone=551148633976&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">Encontre um Cuidador</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#6B46C1] text-[#6B46C1] hover:bg-[#6B46C1]/10 text-base"
              >
                <a href="https://careconnect.com.br/pre-cadastro" target="_self" rel="noopener noreferrer">Cadastrar como Cuidador</a>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden">
              <img
                src="/images/hero-image.jpg"
                alt="Cuidador de idosos profissional da CareConnect em Mogi das Cruzes auxiliando pessoa idosa"
                className="object-cover w-full h-full"
                width="500"
                height="500"
              />
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default Hero;
