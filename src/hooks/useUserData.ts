import { useState } from 'react';

interface Transaction {
  store: string;
  points: string;
  date: string;
  type: 'earn' | 'redeem';
}

interface Reward {
  title: string;
  points: number;
  store: string;
  available: boolean;
}

interface UserData {
  name: string;
  initials: string;
  points: number;
  level: string;
  transactions: Transaction[];
  rewards: Reward[];
  stats: {
    rewardsRedeemed: number;
    storesVisited: number;
  };
}

export function useUserData() {
  const [userData, setUserData] = useState<UserData>({
    name: "Derek",
    initials: "D",
    points: 2450,
    level: "Gold",
    transactions: [
      { store: "Café Central", points: "+25", date: "Hoje", type: "earn" },
      { store: "Farmácia São José", points: "+15", date: "Ontem", type: "earn" },
      { store: "Recompensa Resgatada", points: "-500", date: "2 dias", type: "redeem" },
      { store: "Supermercado Bom Preço", points: "+80", date: "3 dias", type: "earn" }
    ],
    rewards: [
      { title: "Desconto 10%", points: 500, store: "Várias lojas", available: true },
      { title: "Café Grátis", points: 200, store: "Café Central", available: true },
      { title: "Frete Grátis", points: 300, store: "Loja Online", available: true },
      { title: "Produto Grátis", points: 1000, store: "Farmácia", available: true }
    ],
    stats: {
      rewardsRedeemed: 12,
      storesVisited: 8
    }
  });

  const redeemReward = (reward: Reward) => {
    if (userData.points >= reward.points) {
      setUserData(prev => ({
        ...prev,
        points: prev.points - reward.points,
        stats: {
          ...prev.stats,
          rewardsRedeemed: prev.stats.rewardsRedeemed + 1
        }
      }));
    }
  };

  return {
    userData,
    redeemReward
  };
}