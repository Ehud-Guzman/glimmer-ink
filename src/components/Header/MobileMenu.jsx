// components/Header/MobileMenu.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Menu } from 'react-feather';
import { navLinks } from './navConfig';
import { Sun, Moon } from 'react-feather';

const menuVariants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
};

export default function MobileMenu({ isOpen, toggleMenu, theme, toggleTheme }) {
  return (
    <>
      <motion.button
        className="lg:hidden flex justify-center items-center w-12 h-12 relative z-50"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-6 h-6 text-[var(--current-text)]" /> : <Menu className="w-6 h-6 text-[var(--current-text)]" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="lg:hidden fixed top-0 left-0 w-full h-screen bg-[var(--current-nav)] flex flex-col items-center justify-center gap-6 overflow-y-auto pt-24 pb-12"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block text-[var(--current-text)] text-2xl font-medium hover:text-primary transition-colors duration-300 py-3"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}

            <motion.button
              onClick={toggleTheme}
              className="mt-8 p-4 rounded-full bg-[var(--current-bg)] text-[var(--current-text)] hover:bg-opacity-80 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </motion.button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
