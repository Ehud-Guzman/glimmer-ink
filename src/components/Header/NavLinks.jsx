// components/Header/NavLinks.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'react-feather';
import { navLinks } from './navConfig';

const dropdownVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
};

const subLinkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export default function NavLinks({ location, activeDropdown, setActiveDropdown }) {
  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navLinks.map((link) => (
        <motion.div
          key={link.name}
          className="relative"
          onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
          onMouseLeave={() => link.subLinks && setActiveDropdown(null)}
        >
          <Link
            to={link.href}
            className={`relative text-[var(--current-text)] font-medium px-4 py-2 group ${
              location.pathname === link.href ? 'text-primary' : ''
            }`}
          >
            <span className="flex items-center gap-1 z-10 relative">
              {link.name}
              {link.subLinks && (
                <motion.span
                  animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} />
                </motion.span>
              )}
            </span>
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Dropdown */}
          <AnimatePresence>
            {activeDropdown === link.name && link.subLinks && (
              <motion.div
                className="absolute left-0 top-full pt-2 w-56"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="bg-[var(--current-nav)] rounded-lg shadow-xl">
                  {link.subLinks.map((sub) => (
                    <motion.div key={sub.name} variants={subLinkVariants} whileHover={{ x: 5 }}>
                      <Link
                        to={sub.href}
                        className="block px-4 py-3 hover:bg-[var(--current-bg)] transition-colors"
                      >
                        {sub.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </nav>
  );
}
