import { motion } from "framer-motion";

const FooterLegal = ({
  legalLinks = [],
  credits = { text: "", phone: "", url: "#" },
  brand = { logo: { primary: "", secondary: "" } },
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.div
      className="border-t border-[var(--current-bg)]/20 py-6 relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-70">
            © {currentYear} {brand.logo.primary + brand.logo.secondary}. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
                whileHover={{ y: -1 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </div>

        {credits.text && (
          <motion.div
            className="mt-4 text-center text-xs opacity-50 hover:opacity-80 transition-opacity"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <a href={credits.url} className="inline-flex items-center gap-1">
              {credits.text} || {credits.phone}
              <span className="text-[10px]">↗</span>
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FooterLegal;
