import { motion } from "framer-motion";
import { Sparkles, Target, Briefcase, Layers } from "lucide-react";

const AboutHero = () => {
  const stats = [
    { icon: Target, value: "5+", label: "Live Client Websites" },
    { icon: Briefcase, value: "8+", label: "Projects Delivered" },
    { icon: Layers, value: "Web + Systems", label: "Project Focus" },
    { icon: Sparkles, value: "2025", label: "Founded" },
  ];

  return (
    <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/3 dark:bg-primary/5 blur-3xl" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #8882 1px, transparent 1px),
                             linear-gradient(to bottom, #8882 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>
      </div>

      <div className="relative grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full">
            <Sparkles className="w-4 h-4 text-primary dark:text-primary-light" />
            <span className="text-sm font-medium text-primary dark:text-primary-light">
              About GlimmerInk
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display leading-tight">
            Building a focused
            <span className="block text-primary dark:text-primary-light mt-2">
              portfolio in websites and systems
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            GlimmerInk is a studio by Ehud Mwai, focused on crafting clean business websites,
            practical systems, and polished interface concepts with a professional,
            design-conscious feel.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
                           rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-primary dark:text-primary-light" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column - Image/Visual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Brand visual */}
          <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/10 dark:to-primary/5
                        rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="aspect-square rounded-xl overflow-hidden bg-white dark:bg-gray-900
                          border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <img
                src="/images/GlimmerInklogo1.webp"
                alt="GlimmerInk Creations"
                className="w-3/4 h-3/4 object-contain"
              />
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl
                        border border-gray-200 dark:border-gray-700 shadow-lg text-center"
            >
              <div className="text-xl font-bold text-primary dark:text-primary-light">2025</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Founded</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
