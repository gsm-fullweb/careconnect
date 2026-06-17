
import SEO from "@/components/SEO";
import { LocalBusinessSchema } from "@/components/SchemaOrg";
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
