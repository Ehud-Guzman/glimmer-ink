// components/Home/HeroSection.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [typed, setTyped] = useState("");

  const fullText = "I'm a web developer turning complex problems into seamless digital experiences.";
  const typingSpeed = 40; // Slightly faster

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setTyped((prev) => prev + fullText.charAt(i));
      i++;
      if (i >= fullText.length) clearInterval(typingInterval);
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[var(--hero-bg)] overflow-hidden px-4">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px] z-0 pointer-events-none" />
      
      {/* Hero Text Content */}
      <motion.div
        className="relative z-20 text-center max-w-3xl px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--current-text)] mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Building the future—one pixel at a time
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-6 text-[var(--current-text)] max-w-2xl mx-auto leading-relaxed font-mono min-h-[60px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {typed}
          <span className="animate-pulse">|</span>
        </motion.p>

        <motion.div
          className="flex justify-center gap-6 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="/portfolio"
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 text-lg"
          >
            View My Work
          </a>
        <a
  href="/contact"
  aria-label="Start a project with Glimmer Ink"
  className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/10 transition-all text-lg focus:outline-none focus:ring-2 focus:ring-primary/70"
>
  Start a Project
</a>

        </motion.div>
      </motion.div>

      {/* Single floating dot instead of three */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          className="w-3 h-3 rounded-full bg-primary"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>
    </section>
  );
};

export default HeroSection;