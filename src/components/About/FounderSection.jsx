import { motion } from "framer-motion";
import { Quote, Linkedin, Twitter, Mail } from "lucide-react";

const FounderSection = () => {
  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/glimmerink" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/GlimmerInk_" },
    { icon: Mail, label: "Email", href: "mailto:nyamuehud@gmail.com" },
  ];

  const founderQuote = "I care about making digital work feel clear, polished, and genuinely useful, not just visually impressive.";

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Founder Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 
                           rounded-full text-sm font-medium text-primary dark:text-primary-light">
              Founder
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ehud Mwai
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            I'm Ehud, the developer behind GlimmerInk. I focus on building websites, interface concepts,
            and business system ideas that feel clean, modern, and practical for real-world use.
          </p>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            GlimmerInk is currently a personal portfolio brand at an early growth stage. It gives me
            a focused space to present my work honestly, improve my craft, and build a strong foundation
            around premium websites and systems-oriented projects.
          </p>

          {/* Expertise */}
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Areas of Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Business Websites", "Dashboard UI", "System Concepts", "Responsive Front-end",
                "UI Structure", "React Development", "Portfolio Design", "SEO Basics"].map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-white dark:bg-gray-800 
                           border border-gray-200 dark:border-gray-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Connect with me
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 
                             border border-gray-200 dark:border-gray-700 rounded-lg 
                             hover:border-primary dark:hover:border-primary-light 
                             hover:text-primary dark:hover:text-primary-light 
                             transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Founder Image & Quote */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Founder Image Container */}
          <div className="relative mb-8">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10 
                          dark:from-primary/10 dark:to-primary/5 border border-gray-200 dark:border-gray-700">
              {/* Placeholder for founder image */}
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div className="w-40 h-40 rounded-full bg-gradient-to-r from-primary to-primary-light 
                              mb-6 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">EM</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Ehud Mwai
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Founder, GlimmerInk Creations
                </p>
              </div>
            </div>
          </div>

          {/* Quote Card */}
          <div className="relative bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 
                        rounded-2xl p-6 border border-primary/20 dark:border-primary/30">
            <Quote className="absolute -top-3 -left-3 w-8 h-8 text-primary/30 dark:text-primary/50" />
            <Quote className="absolute -bottom-3 -right-3 w-8 h-8 text-primary/30 dark:text-primary/50 transform rotate-180" />
            
            <p className="text-lg text-gray-800 dark:text-gray-200 italic mb-4">
              "{founderQuote}"
            </p>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                — Ehud Mwai
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
