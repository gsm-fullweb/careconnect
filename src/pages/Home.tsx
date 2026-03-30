
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
        title="Agência de Cuidadores de Idosos" 
        description="CareConnect oferece serviços profissionais de cuidadores de idosos em domicílio. Qualidade, segurança e carinho para sua família."
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
