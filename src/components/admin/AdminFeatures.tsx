import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Smartphone, BarChart3, Zap, Shield, Headphones, Rocket } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "App Moderno",
    description: "Interface intuitiva que seus clientes vão amar usar",
    position: { x: "8%", y: "5%" },
    connectionPoint: { x: "22%", y: "25%" }
  },
  {
    icon: BarChart3,
    title: "Dashboard Completo",
    description: "Acompanhe vendas, clientes e métricas em tempo real",
    position: { x: "65%", y: "8%" },
    connectionPoint: { x: "65%", y: "28%" }
  },
  {
    icon: Zap,
    title: "Integração Rápida",
    description: "Configure sua loja em menos de 5 minutos",
    position: { x: "12%", y: "45%" },
    connectionPoint: { x: "26%", y: "65%" }
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Proteção avançada para todos os dados e transações",
    position: { x: "72%", y: "42%" },
    connectionPoint: { x: "72%", y: "62%" }
  },
  {
    icon: Headphones,
    title: "Suporte 24/7",
    description: "Equipe especializada sempre pronta para ajudar",
    position: { x: "18%", y: "78%" },
    connectionPoint: { x: "32%", y: "98%" }
  },
  {
    icon: Rocket,
    title: "Crescimento Garantido",
    description: "Aumente suas vendas em até 40% no primeiro mês",
    position: { x: "68%", y: "75%" },
    connectionPoint: { x: "68%", y: "95%" }
  }
];

export function AdminFeatures() {
  return (
    <section id="adminfeatures" className="relative bg-gradient-to-br from-secondary/10 to-background">
      <AdminFeaturesContent />
    </section>
  );
}

function AdminFeaturesContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(1);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathData = `M 22 25 C 40 15, 50 35, 65 28 C 45 45, 15 55, 26 65 C 50 70, 85 50, 72 62 C 55 80, 25 90, 32 98 C 50 105, 75 85, 68 95`;
  
  const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const cardCount = Math.floor(latest * (features.length + 2)) + 1;
      setVisibleCards(Math.min(Math.max(cardCount, 1), features.length));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} style={{ height: '400vh' }} className="relative">
        <div className="sticky top-0 h-screen flex items-center justify-center py-30">
 
          <div className="w-full h-full px-6 relative z-10">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Tudo que sua loja <span className="text-primary">precisa</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ferramentas completas para transformar sua loja
            </p>
          </motion.div>

          <div className="relative w-full h-96">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 z-0">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E94057" />
                  <stop offset="100%" stopColor="#F27121" />
                </linearGradient>

              </defs>
              
              <motion.path
                d={pathData}
                stroke="#E94057"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                style={{ pathLength }}
              />
            </svg>

            {features.map((feature, index) => {
              const isVisible = index < visibleCards;
              const IconComponent = feature.icon;
              
              return (
                <motion.div
                  key={index}
                  className="absolute group"
                  style={{
                    left: feature.position.x,
                    top: feature.position.y,
                    zIndex: 10
                  }}
                  initial={{ opacity: 0, x: 100, scale: 0.8 }}
                  animate={{ 
                    opacity: isVisible ? 1 : 0, 
                    x: isVisible ? 0 : 100,
                    scale: isVisible ? 1 : 0.8
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeOut",
                    delay: isVisible ? index * 0.1 : 0
                  }}
                >
                  <div className="bg-card/80 backdrop-blur-md rounded-2xl p-5 border border-border/30 hover:border-primary/50 transition-all duration-200 hover:scale-105 w-56 h-40 shadow-lg relative">
                    {isVisible && <div/>}
                    <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform duration-200">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center mt-16 gap-1 pb-32">
            {features.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1 rounded-full transition-all duration-200 ${
                  index < visibleCards ? 'bg-primary w-6' : 'bg-muted-foreground/20 w-2'
                }`}
                layout
              />
            ))}
          </div>
          </div>
        </div>
    </div>
  );
}