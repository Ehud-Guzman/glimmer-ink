// components/Home/HeroSection.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const fullText =
    "I  design and build premium websites, business systems, polished dashboards, and modern digital experiences for growing brands.";
  const typingSpeed = 28;

  // 🔒 Lock the first character so it never disappears
  const firstChar = fullText.charAt(0);
  const restText = fullText.slice(1);

  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    setTyped("");

    const typingInterval = setInterval(() => {
      setTyped((prev) => prev + restText.charAt(i));
      i++;
      if (i >= restText.length) clearInterval(typingInterval);
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [restText]);

  const chips = ["1 live client website", "Concept case studies", "Mobile-first builds", "Fast turnaround"];

  return (
    <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center md:justify-start gap-12 md:gap-16 overflow-hidden px-4 md:px-16 lg:px-32 pt-10 md:pt-14">
      {/* Left: Hero Text */}
      <motion.div
        className="flex-1 max-w-xl md:max-w-2xl relative z-20 text-center md:text-left mb-8 md:mb-0 px-2 md:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
    

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="block text-text-light dark:text-text-dark">
            Premium websites and
          </span>
          <span className="block bg-gradient-to-r from-primary via-primary-light to-primary-dark dark:from-primary-light dark:via-primary dark:to-primary-dark bg-clip-text text-transparent">
            practical business systems.
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl mb-5 text-text-light/85 dark:text-text-dark/85 leading-relaxed max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
        >
          I help businesses show up professionally online and run more smoothly behind the scenes
          with clean websites, practical systems, thoughtful structure, and modern front-end execution.
        </motion.p>

        {/* Typed description (safe, unclippable) */}
        <motion.p
          className="text-base sm:text-lg md:text-xl mb-7 text-text-light/80 dark:text-text-dark/80 leading-relaxed min-h-[72px] relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Accent bar */}
          <span className="absolute left-0 top-1 bottom-1 w-1 bg-primary rounded-full" />

          <span className="pl-4 block">
            <span className="select-none">{firstChar}</span>
            {typed}
            <span className="animate-pulse text-primary">|</span>
          </span>
        </motion.p>

        {/* Trust chips */}
        <motion.div
          className="mb-8 flex flex-wrap gap-2 justify-center md:justify-start"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {chips.map((chip) => (
            <span
              key={chip}
              className="text-xs sm:text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-light/80 dark:text-text-dark/80"
            >
              {chip}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="/work"
            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
          >
            View Selected Work
          </a>
          <a
            href="/contact"
            className="px-8 py-3 border-2 border-primary text-primary dark:text-primary-light rounded-lg font-semibold hover:bg-primary/10 transition-all text-lg"
          >
            Start a Conversation
          </a>
        </motion.div>

        {/* Subtle credibility line */}
        <motion.div
          className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 px-4 py-3">
            <div className="font-semibold text-text-light dark:text-text-dark">Best fit</div>
            <div className="text-text-light/65 dark:text-text-dark/65">SMEs, personal brands, schools</div>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 px-4 py-3">
            <div className="font-semibold text-text-light dark:text-text-dark">Focus</div>
            <div className="text-text-light/65 dark:text-text-dark/65">Websites, systems, dashboards, UI concepts</div>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 px-4 py-3">
            <div className="font-semibold text-text-light dark:text-text-dark">Approach</div>
            <div className="text-text-light/65 dark:text-text-dark/65">Clean design, practical execution</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right: Illustration */}
      <motion.div
        className="w-full md:w-auto flex justify-center md:justify-end mb-8 md:mb-0 px-4 md:px-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="relative w-full md:max-w-md lg:max-w-lg">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary to-primary-light dark:from-primary-dark dark:to-primary rounded-2xl blur-xl opacity-20" />
          <img
            src="/images/illustration.png"
            alt="GlimmerInk design and development showcase"
            className="relative w-full rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800"
            loading="eager"
          />
          <div className="absolute -bottom-5 left-1/2 w-[92%] -translate-x-1/2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/92 dark:bg-gray-900/92 backdrop-blur px-5 py-4 shadow-xl">
            <div className="flex items-center justify-between gap-4 text-sm">
              <div>
                <div className="font-semibold text-text-light dark:text-text-dark">Current portfolio stage</div>
                <div className="text-text-light/65 dark:text-text-dark/65">1 live client site, curated concept builds</div>
              </div>
              <a
                href="/work"
                className="shrink-0 rounded-full bg-primary px-4 py-2 text-white font-medium hover:bg-primary-dark transition-colors"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
