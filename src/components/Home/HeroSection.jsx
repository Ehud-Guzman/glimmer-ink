// components/Home/HeroSection.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Tilt from 'react-parallax-tilt';

const leftCodeLines = [
  'const guzman = new Developer();',
  'guzman.stack = ["Frontend", "Backend", "UI/UX"];',
  'guzman.creates("sleek, scalable systems");',
  'const launch = () => guzman.deploy();',
  'launch();',
];

const rightCodeLines = [
  '<GlimmerInk>',
  '  <CraftedBy code="clean" />',
  '  <Innovation level="high" />',
  '  <UserExperience premium />',
  '</GlimmerInk>',
];

const animateLine = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 0.9,
    y: 0,
    transition: { delay: i * 0.15 },
  }),
};

const HeroSection = () => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [typed, setTyped] = useState("");

  const fullText = "I'm a web developer turning complex problems into seamless digital experiences.";
  const typingSpeed = 30;

  useEffect(() => {
    const timer = setTimeout(() => setCodeVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

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
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px] z-0 pointer-events-none" />
      <div className="absolute top-[-100px] left-[-80px] w-[300px] h-[300px] bg-primary/20 blur-3xl rounded-full z-0" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-secondary/20 blur-3xl rounded-full z-0" />

      {/* Left Code Block */}
      {codeVisible && (
        <motion.div
          className="hidden lg:flex absolute bottom-8 left-8 z-10"
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
              <div className="font-mono text-sm text-green-400/90">
                {leftCodeLines.map((line, i) => (
                  <motion.div key={i} custom={i} variants={animateLine}>
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </Tilt>
        </motion.div>
      )}

      {/* Right Code Block */}
      {codeVisible && (
        <motion.div
          className="hidden lg:flex absolute top-8 right-8 z-10"
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
              <div className="font-mono text-sm text-blue-400/90">
                {rightCodeLines.map((line, i) => (
                  <motion.div key={i} custom={i} variants={animateLine}>
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </Tilt>
        </motion.div>
      )}

      {/* Hero Text Content */}
      <motion.div
        className="relative z-20 text-center max-w-3xl px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--current-text)] mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Building the future—one pixel at a time
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-6 text-[var(--current-text)] max-w-2xl mx-auto leading-relaxed font-mono min-h-[60px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {typed}
          <span className="animate-pulse">|</span>
        </motion.p>

        <motion.div
          className="flex justify-center gap-6 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <a
            href="/portfolio"
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 text-lg"
          >
            View My Work
          </a>
          <a
            href="/contact"
            className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/10 transition-all text-lg"
          >
            Start a Project
          </a>
        </motion.div>
      </motion.div>

      {/* Floating Dots */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 flex space-x-4">
        <motion.div
          className="w-3 h-3 rounded-full bg-accent"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.div
          className="w-3 h-3 rounded-full bg-primary"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
        />
        <motion.div
          className="w-3 h-3 rounded-full bg-secondary"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, delay: 0.8 }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
