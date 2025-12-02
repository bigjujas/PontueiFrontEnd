import { PageLayout } from "@/components/common";
import { Hero } from "@/features/AdminStorePage/HeroAdmin";
import { AdminBenefits, AdminFeatures, AdminCTA } from "@/components/admin";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";

const AdminStorePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return (
    <PageLayout showHeader={false} className="min-h-screen">
      <Hero />
      <AdminBenefits />
      <AdminFeatures />
      <AdminCTA />
      <Footer />
    </PageLayout>
  );
};

export default AdminStorePage;

