// components/Header/Logo.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Logo = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    whileHover={{
      scale: 1.05,
      rotateZ: [0, -2, 2, -1, 0],
      transition: { duration: 0.6 },
    }}
    className="flex items-center"
  >
    <Link to="/" aria-label="GlimmerInk Home" className="flex items-center gap-2">
      <img
        src="/images/GlimmerInk logo 1.png"
        alt="GlimmerInk Creations Logo"
        className="h-14 sm:h-16 md:h-18 w-auto object-contain select-none drop-shadow-md"
        loading="lazy"
      />
    </Link>
  </motion.div>
);

export default Logo;
