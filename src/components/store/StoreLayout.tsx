import { Outlet } from "react-router-dom";
import { StoreSidebar, StoreHeader } from "@/components/store";
import { useAuth } from "@/context/AuthContext";

export function StoreLayout() {
  const { client, establishmentName } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <StoreSidebar />
      <StoreHeader 
        userName={client?.name || 'Usuário'} 
        storeName={establishmentName || undefined}
      />
      
      <div className="ml-64 mt-16 p-6">
        <Outlet />
      </div>
    </div>
  );
}