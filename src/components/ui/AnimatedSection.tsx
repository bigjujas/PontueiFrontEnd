import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  delay?: number;
}
export const AnimatedSection = ({ children, delay = 0 }: Props) => {
  const ref = useRef(null);
  
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

