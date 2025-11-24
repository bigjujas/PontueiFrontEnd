import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FeatureCard } from "@/components/landing";
import { useLandingData } from "@/hooks/useLandingData";

export const Features = () => {
  const { features } = useLandingData();
  return (
    <section id="funcionalidades" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tighter">
              Como funciona o{" "}
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                Pontuei
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Descubra todas as funcionalidades que fazem o Pontuei ser a melhor escolha 
              para economizar nas suas compras do dia a dia.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

