import { Users, Clock, Star, Shield } from "lucide-react";

// ✅ Function: Stats
// 📌 Description: Statistics section to build trust and credibility with key metrics
// 📥 Parameters: none
// 📤 Returns: JSX.Element — statistics component with trust indicators
const Stats = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      number: "1ª",
      label: "Plataforma no Brasil",
      description: "Pioneira em matching inteligente de cuidadores"
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      number: "24/7",
      label: "Disponibilidade",
      description: "Suporte e cuidadores disponíveis a qualquer momento"
    },
    {
      icon: <Star className="w-8 h-8 text-white" />,
      number: "4.9/5",
      label: "Avaliação Média",
      description: "Alta satisfação dos nossos clientes e cuidadores"
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      number: "100%",
      label: "Verificados",
      description: "Todos os cuidadores passam por verificação completa"
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