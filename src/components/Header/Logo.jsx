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
      rotateZ: [0, -2, 2, -2, 0],
      transition: { duration: 0.6 },
    }}
  >
    <Link
      to="/"
      className="text-3xl font-bold tracking-tighter"
      aria-label="GlimmerInk Home"
    >
      <span className="text-primary bg-clip-text bg-gradient-to-r">Glimmer</span>
      <span className="text-secondary">Ink</span>
    </Link>
  </motion.div>
);

export default Logo;
