import { AdminNavigation, AdminHeroContent } from "@/components/admin";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/login');
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/store-register');
    } else {
      navigate('/login?store=true');
    }
  };

  return (
    <div id="home" className="relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute inset-0 opacity-[0.04]">
          <div 
            className="absolute inset-0 animate-grid-flow"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <AdminNavigation onLoginClick={handleLogin} onRegisterClick={handleRegister} />
      <AdminHeroContent onGetStarted={handleGetStarted} />
    </div>
  );
};