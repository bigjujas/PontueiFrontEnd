import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <Card className="group hover:shadow-glow transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm hover:-translate-y-2 h-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}