import { PageLayout } from "@/components/common";
import { StoreDashboard } from "@/components/store";

const StoreDashboardPage = () => {
  return (
    <PageLayout showHeader={false} className="min-h-screen bg-background">
      <StoreDashboard />
    </PageLayout>
  );
};

export default StoreDashboardPage;