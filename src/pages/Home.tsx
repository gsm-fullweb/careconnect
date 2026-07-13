
import SEO from "@/components/SEO";
import { LocalBusinessSchema, FAQSchema } from "@/components/SchemaOrg";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Services from "@/components/home/Services";
import Partners from "@/components/home/Partners";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

const Home = () => {
  return (
    <Layout>
      <SEO
        title="Cuidador de Idosos em Mogi das Cruzes"
        description="Encontre cuidadores de idosos qualificados em Mogi das Cruzes e região do Alto Tietê. A CareConnect oferece home care, acompanhamento hospitalar e cuidados especializados com matching inteligente por IA. Solicite orçamento!"
        canonical="/"
      />
      <LocalBusinessSchema
        name="CareConnect"
        description="Agência de cuidadores de idosos em Mogi das Cruzes. Oferece home care 24h, acompanhamento hospitalar, cuidados para Alzheimer e cuidados paliativos domiciliares com matching inteligente por IA."
        city="Mogi das Cruzes"
        state="SP"
        phone="+55-11-4863-3976"
        email="contato@careconnect.com.br"
        url="/"
      />
      <FAQSchema
        questions={[
          {
            question: "Qual é o valor mensal para um cuidador de idosos em Mogi das Cruzes?",
            answer: "Em Mogi das Cruzes, o valor mensal de um cuidador de idosos varia de R$ 2.800 a R$ 4.500 para contratação direta, e de R$ 4.500 a R$ 9.000 via agência (inclui encargos, substituição e supervisão). O preço depende da complexidade do caso e do regime de contratação."
          },
          {
            question: "Quanto está custando a diária de uma cuidadora de idosos?",
            answer: "A diária de uma cuidadora (plantão de 12 horas) em Mogi das Cruzes custa entre R$ 150 e R$ 320. Plantões noturnos podem ter adicional de 20%. Profissionais especializados em Alzheimer ou AVC cobram de 15% a 35% acima da base."
          },
          {
            question: "Quanto é 12 horas de uma cuidadora?",
            answer: "O plantão de 12 horas de uma cuidadora em Mogi das Cruzes e região custa entre R$ 150 e R$ 320, dependendo da qualificação da profissional e da complexidade do atendimento."
          },
          {
            question: "Quanto custa 6 horas de uma cuidadora?",
            answer: "O valor médio para 6 horas de cuidadora em Mogi das Cruzes fica entre R$ 100 e R$ 200, variando conforme a experiência da profissional e as necessidades do paciente."
          },
          {
            question: "Como contratar um cuidador de idosos em Mogi das Cruzes?",
            answer: "Na CareConnect, basta acessar o WhatsApp e conversar com nossa IA assistente. Ela entende suas necessidades e encontra os melhores cuidadores verificados disponíveis em Mogi das Cruzes e região do Alto Tietê."
          },
          {
            question: "Precisa de cuidador de idosos?",
            answer: "Se seu familiar precisa de auxílio com higiene, alimentação, medicação, companhia ou acompanhamento hospitalar, um cuidador profissional pode garantir segurança e qualidade de vida. A CareConnect conecta você a cuidadores verificados em Mogi das Cruzes."
          }
        ]}
      />
      <Hero />
      <Stats />
      <HowItWorks />
      <WhyChooseUs />
      <Services />
      <Partners />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};


export default Home;
