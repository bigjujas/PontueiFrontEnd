import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function AdminBackground() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 -left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/30 via-pink-glow/20 to-transparent blur-3xl animate-float"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-glow/25 via-primary/20 to-transparent blur-3xl animate-float-slow"
      />
      <motion.div 
        style={{ y: y3 }}
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/20 via-pink-light/30 to-transparent blur-3xl animate-pulse-glow"
      />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 via-pink-glow/30 to-primary/30 blur-3xl animate-rotate-gradient" />
      </div>

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
  );
}