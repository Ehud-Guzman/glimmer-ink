// components/Header/ThemeToggle.jsx
import { motion } from 'framer-motion';
import { Sun, Moon } from 'react-feather';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <motion.button
      onClick={toggleTheme}
      className="ml-4 p-2 rounded-full bg-[var(--current-bg)] text-[var(--current-text)] hover:bg-opacity-80 transition-all relative overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      <motion.span
        className="absolute inset-0 bg-primary opacity-0 rounded-full"
        whileHover={{ opacity: 0.1 }}
      />
    </motion.button>
  );
}
