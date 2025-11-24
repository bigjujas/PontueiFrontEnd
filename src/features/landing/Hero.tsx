import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LandingNavigation } from "@/components/landing/LandingNavigation";
import { Highlight } from "@/components/ui/hero-highlight";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="home" className="relative min-h-screen bg-background overflow-hidden">
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

      <LandingNavigation />
      
      <style>{`
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-shine {
          animation: shine 4s ease-in-out infinite;
          background: linear-gradient(90deg, transparent 0%, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%, transparent 100%), linear-gradient(90deg, #000000, #000000);
          background-size: 200% 100%, 100% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      <div className="relative z-20 flex items-center justify-center min-h-screen px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center">
        <motion.div
          className="text-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight tracking-tighter"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <span className="relative inline-block pb-2">
                <span className="animate-shine">
                  Pontuei.
                </span>
              </span> 
              {" "}Seu novo{" "}<br/>
              <Highlight>
                aplicativo de pontos
              </Highlight>
            </motion.h1>
            
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed mt-10 pt-4">
              Compre, pontue e retire de um jeito que você nunca viu. 
              O Pontuei conecta você com o melhor das lojas da sua cidade, 
              transformando cada compra em um novo ponto de partida para economizar.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button size="lg" className="group">
              Baixe o App Agora
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10.000+</div>
              <div className="text-sm text-muted-foreground">Usuários ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Lojas parceiras</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">R$ 2M+</div>
              <div className="text-sm text-muted-foreground">Em economia gerada</div>
            </div>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

