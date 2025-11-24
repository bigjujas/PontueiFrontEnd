import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface StoreHeaderProps {
  userName?: string;
  userAvatar?: string;
  storeName?: string;
}

export function StoreHeader({ userName = "João Silva", userAvatar, storeName }: StoreHeaderProps) {
  return (
    <motion.header 
      className="fixed top-0 right-0 left-64 h-16 bg-background/80 backdrop-blur-sm border-b border-border/50 z-30"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Espaço vazio para balancear */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Nome da loja no centro */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-lg font-semibold text-foreground">
            {storeName || 'Minha Loja'}
          </h1>
        </div>
        
        {/* Usuário e logout à direita */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={userAvatar} />
              <AvatarFallback className="bg-primary text-white text-sm">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{userName}</span>
          </div>

          <Link to="/admin-store">
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}