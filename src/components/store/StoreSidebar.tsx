import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  Package, 
  Users, 
  DollarSign,
  Palette,
  ShoppingCart,
  CheckCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { icon: Home, title: "Dashboard", route: "/store-dashboard" },
  { icon: CheckCircle, title: "Concluir Cadastro", route: "/store-register" },
  { icon: Palette, title: "Personalizar Página", route: "/store/customize" },
  { icon: Package, title: "Configurar Produtos", route: "/store/products" },
  { icon: ShoppingCart, title: "Pedidos", route: "/store/orders" },
  { icon: Users, title: "Gerenciar Membros", route: "/store/members" },
  { icon: DollarSign, title: "Financeiro", route: "/store/financial" }
];

export function StoreSidebar() {
  const location = useLocation();
  const { hasEstablishment } = useAuth();

  const filteredMenuItems = hasEstablishment 
    ? menuItems.filter(item => item.title !== "Concluir Cadastro")
    : menuItems.filter(item => item.title === "Concluir Cadastro");
  
  return (
    <motion.div 
      className="fixed left-0 top-0 h-full w-64 bg-card/80 backdrop-blur-xl border-r border-border/50 z-40"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-8">
            <img src="/P.svg" alt="" className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-primary">
            Minha Loja
          </span>
        </Link>

        <nav className="space-y-2">
          {filteredMenuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                to={item.route}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-primary/10 ${
                  location.pathname === item.route ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}