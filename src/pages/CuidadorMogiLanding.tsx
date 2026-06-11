import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const whatsappMessage = encodeURIComponent(
  "Olá, Mila. Estou procurando um cuidador de idosos em Mogi das Cruzes para uma pessoa que amo e quero ajuda para encontrar uma opção segura."
);

const whatsappUrl = `https://wa.me/551148633976?text=${whatsappMessage}`;

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://careconnect.com.br/#organization",
      name: "CareConnect",
      url: "https://careconnect.com.br",
      logo: "https://careconnect.com.br/images/logo-careconnect.png",
      sameAs: ["https://careconnect.com.br"],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://careconnect.com.br/#localbusiness",
      name: "CareConnect",
      url: "https://careconnect.com.br",
      image: "https://careconnect.com.br/hero-image.jpg",
      telephone: "+55-11-4863-3976",
      areaServed: [
        {
          "@type": "City",
          name: "Mogi das Cruzes",
          addressRegion: "SP",
          addressCountry: "BR",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mogi das Cruzes",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      parentOrganization: {
        "@id": "https://careconnect.com.br/#organization",
      },
    },
    {
      "@type": "Service",
      "@id": "https://careconnect.com.br/cuidador-de-idosos-mogi-das-cruzes#service",
      name: "Cuidador de idosos em Mogi das Cruzes",
      serviceType: "Busca de cuidador de idosos em domicílio",
      provider: {
        "@id": "https://careconnect.com.br/#localbusiness",
      },
      areaServed: {
        "@type": "City",
        name: "Mogi das Cruzes",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      audience: {
        "@type": "Audience",
        audienceType: "Familiares que procuram cuidador para idosos",
      },
      description:
        "A CareConnect ajuda famílias em Mogi das Cruzes a registrar a necessidade de cuidado e buscar cuidadores de idosos para quem amam, inclusive com apoio da assistente virtual Mila.",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        areaServed: "Mogi das Cruzes",
        priceCurrency: "BRL",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://careconnect.com.br/cuidador-de-idosos-mogi-das-cruzes",
      url: "https://careconnect.com.br/cuidador-de-idosos-mogi-das-cruzes",
      name: "Cuidador de idosos em Mogi das Cruzes",
      description:
        "Landing page para familiares que procuram cuidador de idosos em Mogi das Cruzes para cuidar de quem amam, com opção de cadastro no sistema ou busca com a IA Mila.",
      isPartOf: {
        "@id": "https://careconnect.com.br/#organization",
      },
      about: {
        "@id": "https://careconnect.com.br/cuidador-de-idosos-mogi-das-cruzes#service",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://careconnect.com.br/hero-image.jpg",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://careconnect.com.br/cuidador-de-idosos-mogi-das-cruzes#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: "https://careconnect.com.br/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Cuidador de idosos em Mogi das Cruzes",
          item: "https://careconnect.com.br/cuidador-de-idosos-mogi-das-cruzes",
        },
      ],
    },
  ],
};

const careSignals = [
  "Alzheimer, mobilidade reduzida, rotina de medicação ou companhia diária",
  "Atendimento por hora, pernoite ou acompanhamento 24 horas",
  "Busca orientada para famílias de Mogi das Cruzes e região",
];

const decisionSteps = [
  {
    title: "Explique a necessidade da sua mãe",
    text: "Informe cidade, horários, tipo de assistência e cuidados especiais. Quanto mais claro o contexto, melhor a triagem.",
    icon: HeartHandshake,
  },
  {
    title: "Escolha como quer buscar",
    text: "Use o cadastro no sistema para organizar a busca ou converse com a Mila para receber orientação imediata pelo WhatsApp.",
    icon: Search,
  },
  {
    title: "Compare antes de decidir",
    text: "Avalie disponibilidade, experiência, localização e aderência ao perfil da pessoa idosa antes de avançar.",
    icon: UserRoundCheck,
  },
];

const neighborhoods = [
  "Centro",
  "Vila Oliveira",
  "Mogi Moderno",
  "César de Souza",
  "Brás Cubas",
  "Jundiapeba",
  "Botujuru",
  "Alto Ipiranga",
];

export default function CuidadorMogiLanding() {
  return (
    <Layout>
      <SEO
        title="Cuidador de Idosos em Mogi das Cruzes"
        description="Procura cuidador de idosos em Mogi das Cruzes para cuidar de quem você ama? Cadastre sua necessidade no sistema CareConnect ou converse com a IA Mila pelo WhatsApp."
        canonical="/cuidador-de-idosos-mogi-das-cruzes"
        image="https://careconnect.com.br/hero-image.jpg"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
      </Helmet>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <img
            src="/hero-image.jpg"
            alt="Cuidadora acompanhando idosa em atendimento domiciliar"
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/88 to-slate-950/35" />
        </div>

        <div className="container-custom relative mx-auto px-4 py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              <MapPin className="h-4 w-4" />
              Atendimento para Mogi das Cruzes e região
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-normal md:text-6xl">
              Cuidador de idosos em Mogi das Cruzes para cuidar de quem você ama com segurança
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100 md:text-xl">
              A CareConnect ajuda famílias a organizar a busca por cuidadora ou cuidador de idosos em Mogi das Cruzes, com cadastro no sistema ou orientação rápida pela IA Mila no WhatsApp.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-[#3e8861] px-6 py-6 text-base font-bold text-white hover:bg-[#347553]">
                <Link to="/encontrar-cuidador">
                  buscar Cuidador pelo sistema
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-white px-6 py-6 text-base font-bold text-slate-900 hover:bg-slate-100">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  buscar Cuidador pelo WhatsApp
                  <MessageCircle className="ml-2 h-5 w-5 text-[#3e8861]" />
                </a>
              </Button>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 text-sm text-slate-100 sm:grid-cols-3">
              {careSignals.map((signal) => (
                <div key={signal} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 md:py-14">
        <div className="container-custom mx-auto grid gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#3e8861]">Resposta direta</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-normal text-slate-950 md:text-4xl">
              Como encontrar cuidador de idosos em Mogi das Cruzes?
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Para encontrar cuidador de idosos em Mogi das Cruzes, comece descrevendo a rotina da pessoa que precisa de apoio, a cidade, os horários necessários e qualquer cuidado especial. Na CareConnect, você pode registrar esses dados no sistema ou pedir ajuda para a Mila, nossa assistente de IA, iniciar a busca pelo WhatsApp.
            </p>
          </div>

          <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-6">
            <h3 className="text-xl font-bold text-slate-950">Quando a busca costuma ser urgente</h3>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#3e8861]" />
                Alta hospitalar e necessidade de apoio em casa.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#3e8861]" />
                Familiar sem disponibilidade para acompanhar a rotina todos os dias.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#3e8861]" />
                Pessoa idosa com Alzheimer, mobilidade reduzida ou risco de quedas.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-20">
        <div className="container-custom mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-[#6B46C1]">Escolha o caminho</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-normal text-slate-950 md:text-4xl">
              Duas formas de procurar a cuidadora ideal
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#3e8861]/10 text-[#3e8861]">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-slate-950">Cadastrar no sistema e fazer uma busca</h3>
              <p className="mt-3 leading-7 text-slate-700">
                Ideal para quem quer organizar a necessidade da mãe com cidade, horários e dados do responsável. O cadastro ajuda a centralizar as informações para comparar opções com mais calma.
              </p>
              <Button asChild className="mt-6 bg-[#3e8861] hover:bg-[#347553]">
                <Link to="/encontrar-cuidador">buscar Cuidador pelo sistema</Link>
              </Button>
            </article>

            <article className="rounded-lg border border-purple-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#6B46C1]/10 text-[#6B46C1]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-slate-950">Fazer uma busca com a IA Mila</h3>
              <p className="mt-3 leading-7 text-slate-700">
                Melhor para quem prefere conversar. A Mila faz perguntas simples, entende a cidade de Mogi das Cruzes, tipo de assistência, necessidade especial e preferência de perfil.
              </p>
              <Button asChild variant="outline" className="mt-6 border-[#6B46C1] text-[#6B46C1] hover:bg-purple-50">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">buscar Cuidador pelo WhatsApp</a>
              </Button>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container-custom mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#3e8861]">Para famílias e responsáveis</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-normal text-slate-950 md:text-4xl">
                O que avaliar antes de escolher uma cuidadora para quem você ama
              </h2>
              <p className="mt-4 leading-8 text-slate-700">
                A escolha não deve considerar apenas preço ou disponibilidade. Quando há fragilidade, Alzheimer, mobilidade reduzida ou dependência de rotina, a decisão precisa equilibrar confiança, experiência e aderência ao dia a dia da família.
              </p>
            </div>

            <div className="grid gap-4">
              {decisionSteps.map(({ title, text, icon: Icon }) => (
                <div key={title} className="rounded-lg border border-slate-200 p-5">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#3e8861]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-950">{title}</h3>
                      <p className="mt-2 leading-7 text-slate-700">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8f9] py-14 md:py-20">
        <div className="container-custom mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-[#6B46C1]">SEO local</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-normal text-slate-950 md:text-4xl">
              Busca por cuidador em bairros de Mogi das Cruzes
            </h2>
            <p className="mt-4 leading-8 text-slate-700">
              A CareConnect considera Mogi das Cruzes como área prioritária para famílias que procuram cuidador de idosos em domicílio. Informe seu bairro ou região para facilitar a triagem.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {neighborhoods.map((neighborhood) => (
              <span key={neighborhood} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                {neighborhood}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white md:py-20">
        <div className="container-custom mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">Próximo passo</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-normal md:text-4xl">
              Comece a busca por cuidador de idosos em Mogi das Cruzes hoje
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-200">
              Se você está buscando apoio para alguém que ama, registre a necessidade no sistema ou converse com a Mila para orientar os primeiros critérios da busca.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Button asChild size="lg" className="bg-[#3e8861] px-6 py-6 font-bold hover:bg-[#347553]">
              <Link to="/encontrar-cuidador">buscar Cuidador pelo sistema</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white bg-white px-6 py-6 font-bold text-slate-950 hover:bg-slate-100">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">buscar Cuidador pelo WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
