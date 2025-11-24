import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface AdminHeroContentProps {
  onGetStarted?: () => void;
}

export function AdminHeroContent({ onGetStarted }: AdminHeroContentProps) {
  return (
    <main className="relative z-10 px-6 pt-48 pb-32 mt-20">
      <motion.div 
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-6 mb-8">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-foreground">Transforme sua loja em um </span>
            <span className="bg-gradient-to-r from-primary via-pink-glow to-pink-dark bg-clip-text text-transparent">
              Hub de fidelidade
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed pt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Conecte-se com milhares de clientes, aumente suas vendas e construa 
            relacionamentos duradouros através do nosso sistema de pontos inteligente.
          </motion.p>
        </div>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              className="group text-lg px-8 py-4 shadow-2xl hover:shadow-primary/50"
              onClick={onGetStarted}
            >
              Começar Agora
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}