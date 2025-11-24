import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Configuração gratuita e sem taxas de setup",
  "Suporte completo durante a implementação", 
  "Dashboard analytics em tempo real",
  "Aumento comprovado de 40% nas vendas"
];

export function AdminCTA() {
  return (
    <section id="admincta" className="relative py-24 bg-gradient-to-br from-primary/5 via-background to-pink-glow/5 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-glow/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para <span className="text-primary">revolucionar</span> sua loja?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Junte-se a milhares de lojistas que já transformaram seus negócios com o Pontuei
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-left"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="https://calendar.google.com/calendar/u/0?cid=NzI0MWFmYjlmZmNlY2EyNjE5YWEwZjFhOGQ1MTM5NjFlMThiZGVkMDIwZjA2ZDRkOTAyN2JhMDNjYTcwNzlmZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t">
            <Button size="lg" className="text-lg px-8 py-4 group">
              Agendar Reunião 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            </a>
          </motion.div>
          <p className="text-sm text-muted-foreground mt-10">
            ✨ Sem compromisso • Configuração gratuita • Suporte incluído
          </p>
        </motion.div>
      </div>
    </section>
  );
}