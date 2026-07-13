
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout"; // Alterado de MainLayout para Layout
import SEO from "@/components/SEO";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Alterado de sonner para hooks/use-toast
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_CITY,
  FIND_CAREGIVER_URL,
  FIND_CAREGIVER_LABEL,
  whatsappUrl,
} from "@/lib/contact";

interface FaqItem {
  question: string;
  answer: string;
  isOpen?: boolean;
}

const Contact = () => { // Alterado de export default function Contato() para const Contact = () => {
  const { toast } = useToast(); // Inicializa useToast
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Não existe backend de e-mail conectado ao site. Para garantir que a
    // mensagem chegue de verdade, encaminhamos o contato pelo WhatsApp — canal
    // efetivamente monitorado pela equipe — com os dados já preenchidos.
    const texto =
      `Olá! Vim pelo site da CareConnect.\n\n` +
      `*Nome:* ${name}\n` +
      `*E-mail:* ${email}\n` +
      `*Telefone:* ${phone}\n\n` +
      `*Mensagem:* ${message}`;

    window.open(whatsappUrl(texto), "_blank", "noopener,noreferrer");

    toast({
      title: "Abrindo o WhatsApp...",
      description: "Sua mensagem foi preparada. É só confirmar o envio no WhatsApp.",
    });

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <Layout>
      <SEO
        title="Contato | Cuidador de Idosos em Mogi das Cruzes"
        description="Entre em contato com a CareConnect em Mogi das Cruzes. Solicite orçamento para cuidador de idosos, home care ou acompanhante hospitalar. WhatsApp: (11) 4863-3976."
        canonical="/contact"
      />
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-[#6B46C1]/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Contato — Cuidadores de Idosos em Mogi das Cruzes
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Estamos sempre disponíveis para responder suas dúvidas e ajudar você a encontrar o melhor cuidado para sua família. Entre em contato conosco de qualquer uma das formas abaixo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-[#6B46C1] mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Endereço</h3>
                      <p className="text-gray-600">
                        {CONTACT_CITY}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-[#6B46C1] mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Telefone</h3>
                      <p className="text-gray-600">
                        {CONTACT_PHONE_DISPLAY}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-[#6B46C1] mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Email</h3>
                      <p className="text-gray-600 break-words leading-normal">
                        <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#6B46C1]">
                          {CONTACT_EMAIL}
                        </a>
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start">
                    <MessageSquare className="w-6 h-6 text-[#6B46C1] mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">WhatsApp</h3>
                      <p className="text-gray-600">
                        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-[#6B46C1]">
                          {CONTACT_PHONE_DISPLAY}
                        </a>
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Horário de Atendimento</h3>
                <p className="text-gray-600 mb-2">
                  Segunda a Sexta: 8h às 20h
                </p>
                <p className="text-gray-600 mb-2">
                  Sábado: 9h às 16h
                </p>
                <p className="text-gray-600">
                  *Atendimento disponível pelo WhatsApp
                </p>
              </div>
            </div>

            <div>
              <Card className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Como podemos ajudar?"
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#6B46C1] hover:bg-[#5A3A9F]"
                  >
                    Enviar pelo WhatsApp
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Ao enviar, sua mensagem é encaminhada para o nosso WhatsApp já preenchida.
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#6B46C1] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prefere falar direto pelo WhatsApp?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Nossa equipe está pronta para ajudar você a encontrar o cuidador ideal para a sua família.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white text-[#6B46C1] hover:bg-white/90 rounded-full"
          >
            <a href={FIND_CAREGIVER_URL} target="_blank" rel="noopener noreferrer">
              {FIND_CAREGIVER_LABEL}
            </a>
          </Button>

        </div>
      </section>
    </Layout>
  );
};

export default Contact;
