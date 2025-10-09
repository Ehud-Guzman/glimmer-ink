import { motion } from "framer-motion";
import { FiChevronUp } from "react-icons/fi";

const FooterBackToTop = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all backdrop-blur-sm z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Back to top"
    >
      <FiChevronUp size={20} />
    </motion.button>
  );
};

export default FooterBackToTop;
