import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import BlogSection from "@/components/home/BlogSection";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <BlogSection />
    </MainLayout>
  );
}
