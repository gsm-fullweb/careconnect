import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Stethoscope, HeartHandshake, BookOpen } from 'lucide-react';

const InterlinkingBlock: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Mais Serviços e Regiões de Atendimento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-3">Onde Atuamos</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/cuidador-idosos-mogi-das-cruzes" className="hover:text-blue-600 transition-colors">Mogi das Cruzes</Link></li>
              <li><Link to="/home-angels-mogi-das-cruzes" className="hover:text-blue-600 transition-colors">Home Care Mogi</Link></li>
              <li><Link to="/cuidare-mogi-das-cruzes" className="hover:text-blue-600 transition-colors">Cuidadores SP</Link></li>
              <li><Link to="/acuidar-mogi-das-cruzes-cuidadores-de-idosos" className="hover:text-blue-600 transition-colors">Agência Acuidar</Link></li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-3">Nossos Serviços</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/services" className="hover:text-blue-600 transition-colors">Cuidados com Alzheimer</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition-colors">Acompanhamento Hospitalar</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition-colors">Cuidados Paliativos</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition-colors">Enfermagem Domiciliar</Link></li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-3">Planos e Preços</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/plans" className="hover:text-blue-600 transition-colors">Plantão 12 horas</Link></li>
              <li><Link to="/plans" className="hover:text-blue-600 transition-colors">Plantão 24 horas</Link></li>
              <li><Link to="/qual-o-valor-da-diaria-do-cuidador-de-idoso" className="hover:text-blue-600 transition-colors">Valor da Diária</Link></li>
              <li><Link to="/quanto-e-12-horas-de-uma-cuidadora" className="hover:text-blue-600 transition-colors">Preço Plantão 12h</Link></li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-3">Dúvidas Comuns</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/duvidas-frequentes-cuidador-de-idosos" className="hover:text-blue-600 transition-colors">Perguntas Frequentes</Link></li>
              <li><Link to="/como-contratar-cuidador-sem-vinculo-empregaticio" className="hover:text-blue-600 transition-colors">Como contratar sem vínculo</Link></li>
              <li><Link to="/encontrar-cuidador-de-idosos" className="hover:text-blue-600 transition-colors">Encontrar cuidador ideal</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600 transition-colors">Blog da CareConnect</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InterlinkingBlock;
