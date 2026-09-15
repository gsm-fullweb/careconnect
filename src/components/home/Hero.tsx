import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FIND_CAREGIVER_URL, FIND_CAREGIVER_LABEL } from "@/lib/contact";

const Hero = () => {
  return (
    <section className="relative w-full bg-white md:bg-primary/5 py-12 md:py-24 overflow-hidden">
      {/* Decorative Wave Background for Mobile */}
      <div className="absolute bottom-0 w-full z-0 text-[#F5F3FF] md:hidden">
        <svg viewBox="0 0 1440 320" className="w-full h-auto" preserveAspectRatio="none" style={{ minHeight: "220px", display: "block" }}>
          <path fill="currentColor" d="M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,176C672,149,768,107,864,106.7C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Text Content */}
          <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
            <img 
              src="/images/logo-careconnect-mobile.png" 
              alt="CareConnect Logo" 
              className="w-48 md:hidden object-contain mb-8"
            />
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 leading-snug">
              Encontre Cuidadores de Idosos Confiáveis pelo WhatsApp
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg hidden md:block">
              A <strong>CareConnect</strong> conecta sua família a cuidadores qualificados e verificados. Converse com a Mila, nossa assistente virtual, e encontre o profissional ideal com segurança e agilidade.
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-lg md:hidden">
              A <strong>CareConnect</strong> conecta sua família a cuidadores verificados. Converse com a Mila e encontre o profissional ideal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 md:px-0">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-[#7058EB] hover:bg-[#5C45C8] md:bg-[#6B46C1] md:hover:bg-[#5A3A9F] text-white text-lg md:text-base font-medium rounded-full md:rounded-md py-7 md:py-auto shadow-lg hover:shadow-xl transition-all"
              >
                <a href={FIND_CAREGIVER_URL} target="_blank" rel="noopener noreferrer">
                  {FIND_CAREGIVER_LABEL}
                  <ArrowRight className="ml-2 w-5 h-5 md:hidden" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-[#6B46C1] text-[#6B46C1] hover:bg-[#6B46C1]/10 text-base py-6 md:py-auto"
              >
                <Link to="/pre-cadastro">Cadastrar como Cuidador</Link>
              </Button>
            </div>
          </div>
          
          {/* Image Content */}
          <div className="order-1 md:order-2 flex justify-center w-full mt-4 md:mt-0">
            <div className="relative w-64 h-64 md:w-full md:max-w-md md:aspect-square rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50">
              <img
                src="/images/hero-image.jpg"
                alt="Cuidador de idosos profissional da CareConnect auxiliando pessoa idosa"
                className="object-cover w-full h-full"
                width="500"
                height="500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
