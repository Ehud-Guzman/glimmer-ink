import { motion } from "framer-motion";
import { Target, Zap, Users, Heart, Shield, Rocket } from "lucide-react";

const MissionValues = () => {
  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Details matter, from layout structure to the way each screen feels to use.",
      color: "text-blue-500",
      bgClass: "bg-blue-500/10",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Projects should load quickly, feel responsive, and stay practical to maintain.",
      color: "text-green-500",
      bgClass: "bg-green-500/10",
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Clear communication and honest expectation-setting are part of the work itself.",
      color: "text-purple-500",
      bgClass: "bg-purple-500/10",
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Interfaces should be easy to understand and comfortable to navigate.",
      color: "text-pink-500",
      bgClass: "bg-pink-500/10",
    },
    {
      icon: Shield,
      title: "Reliability",
      description: "A polished result should feel dependable, clear, and ready to present confidently.",
      color: "text-amber-500",
      bgClass: "bg-amber-500/10",
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "Modern tools are useful when they improve quality, not just because they are trendy.",
      color: "text-red-500",
      bgClass: "bg-red-500/10",
    },
  ];

  const mission = "To build websites and systems-oriented digital work that feels clean, useful, and professionally presented.";
  const vision = "To grow GlimmerInk into a trusted name for premium websites, practical business systems, and thoughtful front-end execution.";

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Mission & Values
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          The principles shaping how GlimmerInk grows and how each project is approached.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 
                    rounded-2xl p-8 border border-primary/20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
              <Target className="w-6 h-6 text-primary dark:text-primary-light" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Mission
            </h3>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {mission}
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 
                    rounded-2xl p-8 border border-primary/20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
              <Rocket className="w-6 h-6 text-primary dark:text-primary-light" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Vision
            </h3>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {vision}
          </p>
        </motion.div>
      </div>

      {/* Values Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 
                        border border-gray-200 dark:border-gray-700 
                        hover:border-primary/50 dark:hover:border-primary-light/50
                        transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl ${value.bgClass}`}>
                  <Icon className={`w-6 h-6 ${value.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {value.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {value.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800 text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          My Development Philosophy
        </h3>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            GlimmerInk is being built around thoughtful execution: clean interfaces, solid front-end
            implementation, practical system thinking, and honest presentation. The goal is simple:
            make digital work feel credible, useful, and ready for real people to interact with.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default MissionValues;
