import { PageLayout } from "@/components/common";
import { StoreRegisterForm } from "@/components/store";

const StoreRegisterPage = () => {
  return (
    <PageLayout showHeader={false} className="min-h-screen">
      <StoreRegisterForm />
    </PageLayout>
  );
};

export default StoreRegisterPage;