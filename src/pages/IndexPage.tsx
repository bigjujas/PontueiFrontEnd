import { PageLayout } from "@/components/common";
import { Footer } from "@/components/layout/Footer";
import { Features } from "@/features/landing/Funcionalidades";
import { Hero } from "@/features/landing/Hero";
import { HowToStart } from "@/features/landing/HowToStart";
import { TestimonialsCarousel } from "@/components/landing";

const IndexPage = () => {
  return (
    <PageLayout showHeader={false} className="min-h-screen">
      <Hero />
      <HowToStart />
      <Features />
      <TestimonialsCarousel />
      <Footer />
    </PageLayout>
  );
};

export default IndexPage;

