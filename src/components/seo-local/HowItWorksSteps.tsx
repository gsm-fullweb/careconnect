import React from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, MessageCircle, Users } from "lucide-react";

interface HowItWorksStepsProps {
  whatsappLink: string;
}

const HowItWorksSteps: React.FC<HowItWorksStepsProps> = ({ whatsappLink }) => {
  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Como Funciona a Busca na CareConnect?
          </h2>
          <p className="text-lg text-gray-600">
            Esqueça ligações longas ou cadastros demorados. Tudo foi pensado para a sua praticidade.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 relative max-w-4xl mx-auto">
          {/* Linha conectora apenas no desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gray-100 z-0"></div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-[250px]">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-purple-100 flex items-center justify-center text-purple-600 mb-6 shadow-sm">
              <Smartphone className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Fale com a Mila</h3>
            <p className="text-gray-600 text-sm">
              Chame nossa assistente virtual no WhatsApp a qualquer momento.
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-[250px]">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-purple-100 flex items-center justify-center text-purple-600 mb-6 shadow-sm">
              <MessageCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Conte o que precisa</h3>
            <p className="text-gray-600 text-sm">
              Informe o perfil do idoso, horários desejados e localização.
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-[250px]">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-purple-100 flex items-center justify-center text-purple-600 mb-6 shadow-sm">
              <Users className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Conheça profissionais</h3>
            <p className="text-gray-600 text-sm">
              Receba o perfil de cuidadores compatíveis e converse diretamente com eles.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-6 rounded-xl shadow-md transition-all duration-300 text-lg"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Começar agora pelo WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSteps;
