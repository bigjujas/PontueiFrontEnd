import { useState } from 'react';

interface StoreData {
  name: string;
  category: string;
  totalCustomers: number;
  totalPoints: number;
  monthlyRevenue: number;
  isActive: boolean;
}

export function useAdminStore() {
  const [storeData, setStoreData] = useState<StoreData>({
    name: "",
    category: "",
    totalCustomers: 0,
    totalPoints: 0,
    monthlyRevenue: 0,
    isActive: false
  });

  const updateStore = (data: Partial<StoreData>) => {
    setStoreData(prev => ({ ...prev, ...data }));
  };

  const registerStore = (name: string, category: string) => {
    setStoreData(prev => ({
      ...prev,
      name,
      category,
      isActive: true
    }));
  };

  return {
    storeData,
    updateStore,
    registerStore
  };
}