
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats"; // Nova seção
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Services from "@/components/home/Services";
import Partners from "@/components/home/Partners"; // Novo componente
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

// ✅ Function: Home
// 📌 Description: Main home page with optimized component order and flow
// 📥 Parameters: none
// 📤 Returns: JSX.Element — complete home page
const Home = () => {
  return (
    <Layout>
      <Hero />
      <Stats /> {/* Nova seção para credibilidade */}
      <HowItWorks />
      <WhyChooseUs />
      <Services />
      <Partners /> {/* Nova seção de parceiros */}
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Home;
