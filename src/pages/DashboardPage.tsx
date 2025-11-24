import { PageLayout, UserWelcome, PointsCard, TransactionList, RewardsList, StatsCard } from "@/components/common";
import { useUserData } from "@/hooks/useUserData";
import { Gift, Star } from "lucide-react";

const DashboardPage = () => {
  const { userData, redeemReward } = useUserData();
  const nextRewardPoints = 3000;

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <UserWelcome 
          userName={userData.name} 
          userInitials={userData.initials} 
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <PointsCard 
              currentPoints={userData.points} 
              nextRewardPoints={nextRewardPoints}
              userLevel={userData.level} 
            />
            <TransactionList transactions={userData.transactions} />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <StatsCard 
                icon={Star} 
                value={userData.stats.rewardsRedeemed} 
                label="Recompensas resgatadas" 
                iconColor="text-yellow-500" 
              />
              <StatsCard 
                icon={Gift} 
                value={userData.stats.storesVisited} 
                label="Lojas que você pontuou" 
              />
            </div>
            <RewardsList 
              rewards={userData.rewards} 
              userPoints={userData.points}
              onRedeemReward={redeemReward} 
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;

