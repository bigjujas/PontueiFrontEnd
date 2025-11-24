import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"; 
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";

import IndexPage from "@/pages/IndexPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import AdminStorePage from "@/pages/AdminStorePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { StoreLayout, StoreRegisterForm, StoreDashboardContent } from "@/components/store";
import StoreCustomizePage from "@/pages/StoreCustomizePage";
import StoreProductsPage from "@/pages/StoreProductsPage";
import StoreMembersPage from "@/pages/StoreMembersPage";
import StoreFinancialPage from "@/pages/StoreFinancialPage";
import StoreOrdersPage from "@/pages/StoreOrdersPage";
import StoreCompleteSetupPage from "@/pages/StoreCompleteSetupPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin-store" element={<AdminStorePage />} />
            <Route path="/store-dashboard" element={<StoreLayout />}>
              <Route index element={<StoreDashboardContent />} />
            </Route>
            <Route path="/store-register" element={<StoreLayout />}>
              <Route index element={<StoreRegisterForm />} />
            </Route>
            <Route path="/store/customize" element={<StoreLayout />}>
              <Route index element={<StoreCustomizePage />} />
            </Route>
            <Route path="/store/products" element={<StoreLayout />}>
              <Route index element={<StoreProductsPage />} />
            </Route>
            <Route path="/store/members" element={<StoreLayout />}>
              <Route index element={<StoreMembersPage />} />
            </Route>
            <Route path="/store/financial" element={<StoreLayout />}>
              <Route index element={<StoreFinancialPage />} />
            </Route>
            <Route path="/store/orders" element={<StoreLayout />}>
              <Route index element={<StoreOrdersPage />} />
            </Route>
            <Route path="/store/complete-setup" element={<StoreLayout />}>
              <Route index element={<StoreCompleteSetupPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </BrowserRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

