
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout"; // Alterado de MainLayout para Layout
import { MapPin, Phone, Mail, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Alterado de sonner para hooks/use-toast

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      phone,
      message,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Responderemos em breve.",
        });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        const errorData = await response.json();
        toast({
          title: "Erro ao enviar mensagem",
          description: `Falha ao enviar mensagem: ${errorData.message || 'Erro desconhecido'}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar a mensagem.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-[#6B46C1]/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Entre em Contato
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
                        Mogi das Cruzes - SP
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
                        (11) 4863-3976
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
                        contato@careconnect.com.br
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
                        (11) 4863-3976
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
                    Enviar mensagem
                  </Button>
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
            Prefere falar diretamente com a Mila?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Nossa assistente virtual está disponível 24/7 para ajudar você a encontrar o cuidador ideal
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white text-[#6B46C1] hover:bg-white/90 rounded-full"
          >
            <Link to="/plans">
              Buscar Cuidadores
            </Link>
          </Button>
         
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
