import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Gift, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: TrendingUp,
    title: "Aumente suas Vendas",
    description: "Sistema de pontos que incentiva compras recorrentes",
    color: "text-green-500"
  },
  {
    icon: Users,
    title: "Fidelize Clientes",
    description: "Construa relacionamentos duradouros com seus clientes",
    color: "text-blue-500"
  },
  {
    icon: Gift,
    title: "Recompensas Personalizadas",
    description: "Crie ofertas exclusivas para seus melhores clientes",
    color: "text-purple-500"
  },
  {
    icon: BarChart3,
    title: "Analytics Avançado",
    description: "Acompanhe métricas e insights do seu negócio",
    color: "text-orange-500"
  }
];

export function AdminBenefits() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Por que escolher o <span className="text-primary">Pontuei?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforme sua loja com nossa plataforma completa de fidelização
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-elegant hover:shadow-2xl transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <benefit.icon className={`w-12 h-12 mx-auto mb-4 ${benefit.color}`} />
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}