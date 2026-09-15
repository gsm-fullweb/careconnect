import { Users, Clock, Star, Shield } from "lucide-react";

// ✅ Function: Stats
// 📌 Description: Statistics section to build trust and credibility with key metrics
// 📥 Parameters: none
// 📤 Returns: JSX.Element — statistics component with trust indicators
const Stats = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      number: "Conexão",
      label: "Família e Cuidador",
      description: "Conectamos você aos profissionais da sua região"
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      number: "24/7",
      label: "Disponibilidade",
      description: "Nossa assistente Mila atende a qualquer momento"
    },
    {
      icon: <Star className="w-8 h-8 text-white" />,
      number: "Qualidade",
      label: "Foco no Cuidado",
      description: "Buscamos os melhores perfis para sua necessidade"
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      number: "Segurança",
      label: "Profissionais Avaliados",
      description: "Priorizamos cuidadores com experiência comprovada"
    }
  ];

  return (
    <section className="py-16 bg-[#6B46C1] text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white/10 rounded-full">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              <div className="text-white/80 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;