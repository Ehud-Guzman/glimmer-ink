import { useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Linkedin, Twitter, Mail } from "lucide-react";

const FounderSection = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ehud Mwai",
      jobTitle: "Creative Director & Lead Developer",
      url: "https://glimmerink.co.ke/about",
      email: "nyamuehud@gmail.com",
      address: { "@type": "PostalAddress", addressCountry: "KE" },
      sameAs: [
        "https://www.linkedin.com/company/glimmerink",
        "https://twitter.com/GlimmerInk_",
        "https://www.instagram.com/glimmerink.creations",
      ],
      worksFor: {
        "@type": "Organization",
        name: "GlimmerInk Creations",
        url: "https://glimmerink.co.ke",
      },
      knowsAbout: [
        "Web Design", "Web Development", "React", "UI/UX Design",
        "Business Systems", "E-Commerce", "Tailwind CSS",
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "person-schema";
    script.text = JSON.stringify(schema);
    const existing = document.getElementById("person-schema");
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById("person-schema");
      if (s) s.remove();
    };
  }, []);
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
            GlimmerInk gives me a focused space to present work honestly, keep raising the bar on execution,
            and build a strong body of work around premium websites and systems-oriented projects.
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
          {/* Founder identity card */}
          <div className="relative mb-8">
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              {/* Header band */}
              <div className="h-24 bg-gradient-to-r from-primary to-primary-light" />
              {/* Content */}
              <div className="px-8 pb-8 -mt-10">
                <div className="w-20 h-20 rounded-2xl bg-primary text-white border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center mb-4 text-2xl font-bold tracking-tight">
                  EM
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ehud Mwai</h3>
                <p className="text-sm text-primary dark:text-primary-light font-medium mb-5">
                  Founder · GlimmerInk Creations
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Speciality", value: "Web & Systems" },
                    { label: "Location", value: "Kenya" },
                    { label: "Available", value: "Open to projects" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0">
                      <span className="text-gray-500 dark:text-gray-400">{label}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                    </div>
                  ))}
                </div>
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
