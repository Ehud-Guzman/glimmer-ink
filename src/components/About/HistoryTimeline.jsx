import { motion } from "@/utils/motion";
import { Calendar, Code, Rocket, TrendingUp } from "lucide-react";

const HistoryTimeline = () => {
  const milestones = [
    {
      year: "2025",
      quarter: "Q1",
      title: "GlimmerInk founded",
      description: "Started the studio to build business websites and systems for Kenyan businesses.",
      icon: Calendar,
      highlight: true,
    },
    {
      year: "2025",
      quarter: "Q3",
      title: "Websites and dashboards",
      description: "Focused on business websites and admin dashboards, building up a library of case studies.",
      icon: Code,
    },
   
    {
      year: "2026",
      quarter: "Q1",
      title: "Full-stack systems",
      description: "Delivered admin-backed projects, including a hotel booking platform and a grains trading site.",
      icon: Rocket,
    },
    
   
    {
      year: "Present",
      quarter: "Now",
      title: "Taking on new projects",
      description: "Building websites, shops and systems for clients in Busia and across Kenya.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-10 md:py-14 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">
          Timeline
        </p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          How GlimmerInk got here
        </h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 
                      bg-gradient-to-b from-primary/20 via-primary to-primary/20 
                      transform -translate-x-1/2" />

        <div className="space-y-8 lg:space-y-0">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={`${milestone.year}-${milestone.quarter}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col lg:flex-row items-center ${
                  isLeft ? 'lg:justify-start' : 'lg:justify-end'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden lg:flex absolute left-1/2 w-4 h-4 bg-primary rounded-full 
                              border-4 border-white dark:border-gray-900 transform -translate-x-1/2 z-10" />

                {/* Content */}
                <div className={`w-full lg:w-5/12 ${isLeft ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 
                                border border-gray-200 dark:border-gray-700 
                                ${milestone.highlight ? 'border-primary/50 dark:border-primary-light/50' : ''}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          milestone.highlight 
                            ? 'bg-primary/10 dark:bg-primary/20' 
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            milestone.highlight 
                              ? 'text-primary dark:text-primary-light' 
                              : 'text-gray-600 dark:text-gray-300'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              {milestone.year}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {milestone.quarter}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
