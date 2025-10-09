import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useState, useEffect } from "react";

const codeVariants = [
  [
    "const projects = GlimmerInk.portfolio();",
    "projects.forEach(showcase);",
    "// built with React, Express, MongoDB",
  ],
  [
    "// Each design is intentional",
    "return <PixelPerfect layout />;",
    "optimizePerformance();",
  ],
  [
    "deploy('https://glimmerink.dev')",
    "code.push('live experience')",
    "// always responsive",
  ],
];

const animateLine = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 0.9,
    y: 0,
    transition: { delay: i * 0.12 },
  }),
};

const PortfolioHeroSection = () => {
  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % codeVariants.length);
    }, 4000); // every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-6 py-10 bg-[var(--hero-bg)]">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px] z-0 pointer-events-none" />
      <div className="absolute top-[-100px] left-[-80px] w-[300px] h-[300px] bg-primary/20 blur-3xl rounded-full z-0" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-secondary/20 blur-3xl rounded-full z-0" />

      {/* Code Block */}
      <motion.div
        className="hidden lg:flex absolute bottom-10 left-10 z-10"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <Tilt glareEnable={true} glareMaxOpacity={0.2} tiltMaxAngleX={10} tiltMaxAngleY={10}>
          <div className="glass-panel p-5 rounded-xl border border-white/10 shadow-2xl backdrop-blur-2xl bg-[var(--hero-card)]">
            <div className="flex mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="font-mono text-sm text-green-400/90 min-w-[260px] min-h-[120px]">
              <AnimatePresence >
                {codeVariants[currentSet].map((line, i) => (
                  <motion.div
                    key={line + i}
                    custom={i}
                    variants={animateLine}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                  >
                    {line}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Tilt>
      </motion.div>

      {/* Main Text */}
      <motion.div
        className="relative z-20 text-center max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-6">
          A Glimpse Into My Code Canvas
        </h1>
        <p className="text-lg md:text-xl text-[var(--current-text)] max-w-2xl mx-auto leading-relaxed font-mono opacity-90">
          Projects built with precision, creativity, and code that doesn’t flinch in production.
        </p>
      </motion.div>

      {/* Floating Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-accent"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-primary"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 0.3 }}
        />
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-secondary"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
        />
      </div>
    </section>
  );
};

export default PortfolioHeroSection;
