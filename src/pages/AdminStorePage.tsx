import { PageLayout } from "@/components/common";
import { Hero } from "@/features/AdminStorePage/HeroAdmin";
import { AdminBenefits, AdminFeatures, AdminCTA } from "@/components/admin";
import { Footer } from "@/components/layout/Footer";

const AdminStorePage = () => {
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

