
import SEO from "@/components/SEO";
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
