import { Badge } from "@/components/ui/badge";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { StepCard } from "@/components/landing";
import { useLandingData } from "@/hooks/useLandingData";

export const HowToStart = () => {
  const { steps } = useLandingData();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const stepIndex = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const unsubscribe = stepIndex.on("change", (latest) => {
      setCurrentStep(Math.round(latest));
    });
    return () => unsubscribe();
  }, [stepIndex]);

  return (
    <section id="como-comecar" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            Processo Simples
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tighter">
            Como começar a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-primary">
              economizar hoje
            </span>
          </h2>
        </div>

        <div ref={targetRef} className="relative h-[400vh]">
          <div className="sticky top-16 flex h-screen items-start justify-center overflow-hidden pt-16">
            <div className="relative flex w-full max-w-5xl items-center justify-between">
              
              <div className="w-1/2 space-y-4">
                {steps.map((step, index) => (
                  <StepCard
                    key={step.step}
                    step={step.step}
                    title={step.title}
                    description={step.description}
                    isActive={index === currentStep}
                  />
                ))}
              </div>

              <div className="w-1/3 h-[60vh] rounded-2xl bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">
                  [Imagem do App aqui]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


