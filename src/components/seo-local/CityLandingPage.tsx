import React from "react";
import SEO from "@/components/SEO";
import { FAQSchema } from "@/components/SchemaOrg";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, CheckCircle, MapPin } from "lucide-react";

import HowItWorksSteps from "./HowItWorksSteps";
import CareConnectFeatures from "./CareConnectFeatures";
import MilaIntroduction from "./MilaIntroduction";

export interface NeedsCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CityLandingPageProps {
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;

  heroTopBadge: React.ReactNode;
  heroTitle: React.ReactNode;
  heroSubtitle: string;
  heroImageSrc: string;
  heroImageAlt: string;
  heroFloatingBadge?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };

  needsSectionTitle: string;
  needsSectionSubtitle: string;
  needsCards: NeedsCard[];

  localContextTitle: string;
  localContextBody: React.ReactNode;

  faqData: FaqItem[];
  whatsappLink?: string;

  // Slots para Extensibilidade Editorial (Conteúdo Exclusivo)
  beforeNeedsSection?: React.ReactNode;
  afterNeedsSection?: React.ReactNode;
  beforeHowItWorks?: React.ReactNode;
  afterHowItWorks?: React.ReactNode;
  beforeFeatures?: React.ReactNode;
  afterFeatures?: React.ReactNode;
  customMilaAndContextSection?: React.ReactNode;
  beforeFaq?: React.ReactNode;
  afterFaq?: React.ReactNode;
  children?: React.ReactNode;
}

const CityLandingPage: React.FC<CityLandingPageProps> = ({
  seoTitle,
  seoDescription,
  canonicalUrl,
  heroTopBadge,
  heroTitle,
  heroSubtitle,
  heroImageSrc,
  heroImageAlt,
  heroFloatingBadge,
  needsSectionTitle,
  needsSectionSubtitle,
  needsCards,
  localContextTitle,
  localContextBody,
  faqData,
  whatsappLink = "https://wa.me/551148633976",
  beforeNeedsSection,
  afterNeedsSection,
  beforeHowItWorks,
  afterHowItWorks,
  beforeFeatures,
  afterFeatures,
  customMilaAndContextSection,
  beforeFaq,
  afterFaq,
  children,
}) => {
  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
      />
      <FAQSchema questions={faqData} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-36 md:pt-32 md:pb-32 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-green-50/50" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold tracking-wide">
                <MapPin className="w-4 h-4" />
                {heroTopBadge}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                {heroTitle}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-3 w-6 h-6" />
                    Encontrar Cuidador pelo WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-bold px-8 py-6 rounded-xl transition-all duration-300 text-lg"
                >
                  <a href="#como-funciona">
                    Como Funciona
                  </a>
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-500 font-medium">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Atendimento gratuito pela Mila no WhatsApp
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="absolute inset-0 bg-purple-200/50 rounded-3xl transform rotate-3" />
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={heroImageSrc}
                  alt={heroImageAlt}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Floating Badge */}
              {heroFloatingBadge && (
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    {heroFloatingBadge.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{heroFloatingBadge.title}</p>
                    <p className="text-xs text-gray-500">{heroFloatingBadge.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {beforeNeedsSection}

      {/* Necessidade Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {needsSectionTitle}
            </h2>
            <p className="text-lg text-gray-600">
              {needsSectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {needsCards.map((card, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center text-purple-600">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {afterNeedsSection}
      {beforeHowItWorks}

      {/* Componentes Estáticos e Reutilizáveis */}
      <HowItWorksSteps whatsappLink={whatsappLink} />
      
      {afterHowItWorks}
      {beforeFeatures}

      <CareConnectFeatures />

      {afterFeatures}

      {/* Seção Mila e Contexto Local (Lado a lado) */}
      {customMilaAndContextSection ? (
        customMilaAndContextSection
      ) : (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              <MilaIntroduction whatsappLink={whatsappLink} />

              <Card className="bg-white border-2 border-gray-100 shadow-lg">
                <CardContent className="p-8 md:p-12 h-full flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6 w-max">
                    <MapPin className="w-4 h-4" />
                    {heroTopBadge}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{localContextTitle}</h3>
                  <div className="text-gray-600 leading-relaxed space-y-4">
                    {localContextBody}
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>
      )}

      {beforeFaq}

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dúvidas Frequentes
            </h2>
            <p className="text-lg text-gray-600">
              Perguntas comuns de famílias que buscam apoio na região.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                <AccordionTrigger className="px-4 py-4 text-left font-semibold text-gray-900 hover:text-purple-700 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {afterFaq}
      {children}

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-purple-700 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full mix-blend-overlay blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-overlay blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Precisa de ajuda para cuidar de alguém da sua família?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 font-light">
            Não espere a sobrecarga aumentar. Converse com a Mila agora.
          </p>
          
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-10 py-7 rounded-2xl shadow-2xl hover:shadow-[#25D366]/20 transition-all duration-300 text-xl"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-3 w-7 h-7" />
              Falar com a Mila agora
            </a>
          </Button>
          <p className="mt-6 text-sm text-purple-200">
            Atendimento via WhatsApp (11) 4863-3976
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default CityLandingPage;
