"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface FaqItem {
  question: string;
  answer: string;
  isOpen?: boolean;
}

export default function Contato() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [faqItems, setFaqItems] = useState<FaqItem[]>([
    {
      question: "O que é Home Care?",
      answer: "Home Care é o nome popular para o segmento de Atenção Domiciliar (AD), ou seja, todo tipo de serviço de saúde prestado no domicílio do paciente. Os atendimentos são prestados por uma equipe multiprofissional e podem ser procedimentos mais simples ou até os mais complexos, realizados em substituição ou em continuidade ao atendimento hospitalar.",
      isOpen: false,
    },
    {
      question: "Qual tipo de paciente pode receber Atenção Domiciliar?",
      answer: "Pacientes de todas as idades e complexidades podem contar com os benefícios da Atenção Domiciliar. Temos diferentes programas para atender as necessidades de cada paciente.",
      isOpen: false,
    },
    {
      question: "Já tenho plano de saúde, posso contratar?",
      answer: "A CareConnect trabalha com diversos planos de saúde em todo o Brasil. É importante que você entre em contato com o seu plano de saúde e pergunte se eles disponibilizam a Atenção Domiciliar para o seu caso ou de seu familiar. Caso deseje contratar nossos serviços exclusivamente em caráter particular, entre em contato conosco pelo WhatsApp ou email.",
      isOpen: false,
    },
    {
      question: "Não tenho plano de saúde, posso contratar?",
      answer: "Sim, pode! Preenchendo os requisitos de elegibilidade para a Atenção Domiciliar, você pode contratar nossos serviços. Entre em contato conosco pelo WhatsApp ou email para mais informações.",
      isOpen: false,
    },
    {
      question: "Como é definido o tratamento do paciente?",
      answer: "Após uma avaliação realizada pelo nosso enfermeiro, definimos o Plano de Atenção Domiciliar (PAD) baseado nos critérios clínicos e objetivos da assistência. No PAD, estabelecemos os profissionais que irão atender o paciente, a frequência de atendimentos, assim como a prescrição de medicamentos, materiais e equipamentos.",
      isOpen: false,
    },
    {
      question: "O que devo avaliar na escolha de um cuidador?",
      answer: "Ao escolher um cuidador, é importante avaliar sua formação, experiência, referências, habilidades específicas (como primeiros socorros), empatia e compatibilidade com as necessidades do paciente. A CareConnect faz essa análise para você, facilitando o processo de escolha.",
      isOpen: false,
    },
    {
      question: "Os cuidadores têm formação específica?",
      answer: "Sim, todos os nossos cuidadores possuem formação e/ou experiência comprovada no cuidado com idosos. Muitos possuem cursos técnicos e especializações na área.",
      isOpen: false,
    },
    {
      question: "Vocês atendem em quais regiões?",
      answer: "Atualmente a CareConnect atende nas principais capitais brasileiras e regiões metropolitanas. Entre em contato conosco para verificar a disponibilidade na sua região.",
      isOpen: false,
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria a lógica de envio do formulário
    toast.success("Mensagem enviada com sucesso! Responderemos em breve.");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const toggleFaq = (index: number) => {
    setFaqItems(faqItems.map((item, i) => {
      if (i === index) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    }));
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary/5">
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
                    <MapPin className="w-6 h-6 text-primary mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Endereço</h3>
                      <p className="text-gray-600">
                        Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-000
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-primary mr-4 flex-shrink-0" />
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
                    <Mail className="w-6 h-6 text-primary mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Email</h3>
                      <p className="text-gray-600">
                        contato@careconnect.com.br
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start">
                    <MessageSquare className="w-6 h-6 text-primary mr-4 flex-shrink-0" />
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
                  *Atendimento de emergência disponível 24/7 pelo WhatsApp
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
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Enviar mensagem
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Perguntas Frequentes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Respostas para as perguntas mais comuns sobre nossos serviços
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-4">
                <Button
                  onClick={() => toggleFaq(index)}
                  variant="outline"
                  className="w-full flex justify-between items-center py-4 px-6 text-left rounded-lg hover:bg-primary/5"
                >
                  <span className="font-bold text-lg">{item.question}</span>
                  {item.isOpen ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary" />
                  )}
                </Button>
                {item.isOpen && (
                  <div className="bg-white p-6 rounded-b-lg shadow-sm border-t-0 border border-gray-200">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-white">
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
            className="bg-white text-primary hover:bg-white/90 rounded-full"
          >
            <Link href="https://wa.me/551148633976">
              <Image
                src="/whatsapp-icon.png"
                alt="WhatsApp"
                width={24}
                height={24}
                className="mr-2"
              />
              Falar com a Mila
            </Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
