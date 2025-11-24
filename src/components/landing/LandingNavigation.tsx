import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#como-comecar", label: "Como Começar" },
  { href: "#funcionalidades", label: "Funcionalidades" },
];

export function LandingNavigation() {
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveLink("home");
        return;
      }

      let currentSection = "";
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          currentSection = section.getAttribute('id') || "";
        }
      });
      setActiveLink(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto">
        <motion.div 
          className="flex items-center justify-between backdrop-blur-xl bg-white/40 border border-white/60 rounded-full px-6 py-3 shadow-2xl"
        >
          <Link to="/">
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
                <img src="/P.svg" alt="" className="w-6 h-6 text-primary" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-primary">
                Pontuei
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  (activeLink === link.href.substring(1))
                    ? "text-primary"
                    : "text-foreground/80"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/admin-store">
                <Button className="hover:opacity-90 transition-all shadow-2xl hover:shadow-primary/50 animate-glow-pulse">
                  Área Loja
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}