import React from "react";
import { CheckCircle, Shield, Clock } from "lucide-react";

const CareConnectFeatures: React.FC = () => {
  return (
    <section className="py-20 bg-purple-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Por que usar a plataforma CareConnect?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Nós conectamos famílias a profissionais cadastrados na plataforma, priorizando a segurança, a localização e a disponibilidade.
            </p>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm text-purple-600 flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Busca Personalizada</h4>
                  <p className="text-gray-600">Não mostramos uma lista infinita. Nossa plataforma encontra perfis adequados para as necessidades exatas da sua família.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm text-purple-600 flex-shrink-0 mt-1">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Profissionais Cadastrados</h4>
                  <p className="text-gray-600">Os cuidadores possuem perfil na plataforma onde você pode conferir experiência, apresentação e avaliações.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm text-purple-600 flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Extrema Praticidade</h4>
                  <p className="text-gray-600">O atendimento inicial é feito pelo WhatsApp, a ferramenta que você já usa todos os dias, sem complicações.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl border-8 border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1576765974102-b756026ecee3?q=80&w=1000&auto=format&fit=crop"
                alt="Idosa sorrindo ao lado de um cuidador"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareConnectFeatures;
