import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { FIND_CAREGIVER_URL, FIND_CAREGIVER_LABEL } from "@/lib/contact";

const CallToAction = () => {
  return (
    <section className="section bg-careconnect-blue text-white">
      <div className="container-custom text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">
          Pronto para Receber o Melhor Cuidado?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Entre em contato conosco hoje para encontrar o cuidador ideal para você ou seu familiar.
          Nossa equipe está à disposição para esclarecer todas as suas dúvidas.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-careconnect-blue hover:bg-white/90 group">
            <a
              href={FIND_CAREGIVER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Phone className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              {FIND_CAREGIVER_LABEL}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-careconnect-blue hover:bg-white/10">
            <Link to="/services">Conheça Nossos Serviços</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
