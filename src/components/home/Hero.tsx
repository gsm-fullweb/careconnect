import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-primary/5 py-16 md:py-24">
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
  );
};

export default Hero;
