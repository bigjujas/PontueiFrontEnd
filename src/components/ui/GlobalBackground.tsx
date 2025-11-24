import { motion } from "framer-motion";

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div 
        className="absolute -top-[50vh] -left-[50vw] w-[150vw] h-[150vh] rounded-full bg-gradient-to-br from-primary/15 via-pink-glow/8 to-transparent blur-3xl animate-float"
      />
      <motion.div 
        className="absolute -top-[30vh] -right-[30vw] w-[120vw] h-[120vh] rounded-full bg-gradient-to-br from-pink-glow/12 via-primary/8 to-transparent blur-3xl animate-float-slow"
      />
      <motion.div 
        className="absolute -bottom-[40vh] left-1/2 -translate-x-1/2 w-[180vw] h-[180vh] rounded-full bg-gradient-to-br from-primary/8 via-pink-light/12 to-transparent blur-3xl animate-pulse-glow"
      />
    </div>
  );
}