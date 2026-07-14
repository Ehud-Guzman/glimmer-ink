import { motion } from "framer-motion";
import { Sparkles, UserCheck, LayoutDashboard, Globe2 } from "lucide-react";

const AboutHero = () => {
  const facts = [
    { value: "2025", label: "Founded" },
    { value: "Web + Systems", label: "Focus" },
    { value: "Kenya-wide", label: "Client base" },
  ];

  const highlights = [
    {
      icon: UserCheck,
      title: "Direct with the founder",
      description: "No account managers or hand-offs — you work with me from brief to launch.",
    },
    {
      icon: LayoutDashboard,
      title: "Websites and systems",
      description: "Marketing sites and admin-backed dashboards, built to the same standard.",
    },
    {
      icon: Globe2,
      title: "Kenya-based, remote-friendly",
      description: "Clear communication and reliable delivery, wherever the client is.",
    },
  ];

  return (
    <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
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

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            GlimmerInk is a studio by Ehud Mwai, focused on crafting clean business websites,
            practical systems, and polished interface concepts with a professional,
            design-conscious feel.
          </p>

          {/* Facts — plain inline row, not another stat-card grid */}
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {facts.map((fact, index) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {fact.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {fact.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - At a glance panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8
                        border border-gray-200 dark:border-gray-700 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <img
                src="/images/GlimmerInklogo1.webp"
                alt="GlimmerInk Creations"
                className="w-10 h-10 object-contain"
              />
              <div>
                <div className="font-display font-bold text-gray-900 dark:text-white leading-tight">
                  GlimmerInk
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  At a glance
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-6">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="shrink-0 p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20">
                      <Icon className="w-5 h-5 text-primary dark:text-primary-light" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
