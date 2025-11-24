import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface AdminNavigationProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export function AdminNavigation({ onLoginClick, onRegisterClick }: AdminNavigationProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCadastrarLoja = () => {
    if (isAuthenticated) {
      navigate('/store-register');
    } else {
      navigate('/login?store=true');
    }
    onRegisterClick?.();
  };

  const scrollToSection = (sectionId: string) => {
    navigate('/admin-store');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto">
        <motion.div 
          className="relative flex items-center backdrop-blur-xl bg-white/40 border border-white/60 rounded-full px-6 py-3 shadow-2xl"
        >
          <Link to="/">
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
                <img src="/P.svg" alt="" className="w-6 h-6 text-primary" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-primary">
                Pontuei
              </span>
            </motion.div>
          </Link>
          
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary transition-all hover:bg-primary/10"
                onClick={() => scrollToSection('home')}
              >
                Home
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>              
              <Button 
                variant="ghost"
                className="text-foreground hover:text-primary transition-all hover:bg-primary/10"
                onClick={() => scrollToSection('admincta')}
              >
                Agendar Reunião
              </Button>
            </motion.div>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary transition-all hover:bg-primary/10"
                onClick={onLoginClick}
              >
                Entrar
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>              
              <Button 
                className="hover:opacity-90 transition-all shadow-2xl hover:shadow-primary/50 animate-glow-pulse"
                onClick={handleCadastrarLoja}
              >
                Cadastrar Loja
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}