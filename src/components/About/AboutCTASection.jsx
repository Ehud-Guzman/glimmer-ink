import { motion } from "@/utils/motion";
import { ArrowRight, Calendar, MessageSquare, FileText } from "lucide-react";
import { Link } from "@/components/ui/SlashLink";
import { LOCATION_LABEL } from "@/data/location";

const AboutCTASection = () => {
  const actions = [
    {
      icon: Calendar,
      title: "Start a project",
      description: "Share what you want to build and get a quote in KES.",
      button: "Contact",
      href: "/contact",
      primary: true,
    },
    {
      icon: MessageSquare,
      title: "Send an email",
      description: "Reach out directly with questions or a brief.",
      button: "Email",
      href: "mailto:nyamuehud@gmail.com",
    },
    {
      icon: FileText,
      title: "View the portfolio",
      description: "See live websites, systems and case studies in one place.",
      button: "View Work",
      href: "/work",
    },
  ];

  return (
    <section className="py-10 md:py-14 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 
                    rounded-3xl p-8 md:p-12 border border-primary/20 dark:border-primary/30">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Have a project in mind?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tell me what you need and I&apos;ll reply with honest advice and a clear quote,
            or look through the portfolio first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  action.primary
                    ? "bg-primary text-white border-primary"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className={`p-3 rounded-xl w-fit mb-4 ${
                  action.primary
                    ? "bg-white/20"
                    : "bg-primary/10 dark:bg-primary/20"
                }`}>
                  <Icon className={`w-6 h-6 ${
                    action.primary
                      ? "text-white"
                      : "text-primary dark:text-primary-light"
                  }`} />
                </div>
                
                <h3 className={`text-xl font-bold mb-2 ${
                  action.primary ? "text-white" : "text-gray-900 dark:text-white"
                }`}>
                  {action.title}
                </h3>
                
                <p className={`mb-6 text-sm ${
                  action.primary ? "text-white/95" : "text-gray-600 dark:text-gray-300"
                }`}>
                  {action.description}
                </p>
                
                {action.href.startsWith("/") ? (
                  <Link
                    to={action.href}
                    className={`inline-flex items-center gap-2 font-medium ${
                      action.primary
                        ? "text-white hover:text-white/90"
                        : "text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/90"
                    }`}
                  >
                    {action.button}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <a
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center gap-2 font-medium ${
                      action.primary
                        ? "text-white hover:text-white/90"
                        : "text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/90"
                    }`}
                  >
                    {action.button}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Contact Info */}
        <div className="pt-8 border-t border-primary/20 dark:border-primary/30">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Email
              </div>
              <a href="mailto:nyamuehud@gmail.com" className="text-gray-900 dark:text-white 
                                                               hover:text-primary dark:hover:text-primary-light">
                nyamuehud@gmail.com
              </a>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Location
              </div>
              <div className="text-gray-900 dark:text-white">
                {LOCATION_LABEL}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Response Time
              </div>
              <div className="text-gray-900 dark:text-white">
                Within 24 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTASection;
