import { motion } from "framer-motion";

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  isActive: boolean;
}

export function StepCard({ step, title, description, isActive }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isActive ? 1 : 0.3, x: isActive ? 0 : -20 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-lg ${isActive ? 'bg-card/80 shadow-glow' : 'bg-transparent'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-gradient-primary' : 'bg-muted'}`}>
          <span className={`text-xl font-bold transition-colors duration-500 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
            {step}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-foreground">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mt-1">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}