import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Sun, Moon, Menu, X, ChevronDown, ChevronUp } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const headerRef = useRef(null);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Theme handling with system preference listener
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(`${theme}-theme`);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  // Scroll behavior with spring physics
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 100 && latest > previous) {
      setIsScrolled(true);
    } else if (latest < 10 || latest < previous) {
      setIsScrolled(false);
    }
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };



  const navLinks = [
    { name: 'Home', href: '/' },
    {
      name: 'Portfolio',
      href: '/portfolio',
      subLinks: [
        { name: 'Web Design', href: '/portfolio/#web' },
        { name: 'Branding', href: '/portfolio/#branding' },
        { name: 'Illustration', href: '/portfolio/#illustration' },
      ]
    },
    {
      name: 'Services',
      href: '/services',
      subLinks: [
        { name: 'UI/UX Design', href: '/services/#design' },
        { name: 'Development', href: '/services/#development' },
        { name: 'Consulting', href: '/services/#consulting' },
      ]
    },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const menuVariants = {
    hidden: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    },
    exit: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.02,
        staggerDirection: -1
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 300 }
    },
    exit: { opacity: 0, x: -20 }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 }
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const subLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.header
      ref={headerRef}
      className={`fixed top-0 w-full z-50 bg-[var(--current-nav)] backdrop-blur-md transition-all duration-300 -b`}
      initial={{ y: -100 }}
      animate={{
        y: 0,
        padding: isScrolled ? '0.5rem 0' : '1.5rem 0',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with 3D hover effect */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{
              scale: 1.05,
              rotateZ: [0, -2, 2, -2, 0],
              transition: { duration: 0.6 }
            }}
          >
            <Link
              to="/"
              className="text-3xl font-bold tracking-tighter"
              aria-label="GlimmerInk Home"
            >
              <span className="text-primary bg-clip-text bg-gradient-to-r ">
                Glimmer
              </span>
              <span className="text-secondary">Ink</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                className="relative"
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onHoverStart={() => link.subLinks && setActiveDropdown(link.name)}
                onHoverEnd={() => link.subLinks && setActiveDropdown(null)}
              >
                <motion.div className="px-4 py-2">
                  <Link
                    to={link.href}
                    className={`relative text-[var(--current-text)] font-medium group transition-colors duration-300 ${location.pathname === link.href ? 'text-primary' : ''
                      }`}
                  >
                    <span className="relative z-10 flex items-center gap-1">
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
                </motion.div>

                {/* Desktop Dropdown */}
                {link.subLinks && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        className="absolute left-0 top-full pt-2 w-56"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <div className="bg-[var(--current-nav)]  rounded-lg shadow-xl overflow-hidden">
                          {link.subLinks.map((subLink) => (
                            <motion.div
                              key={subLink.name}
                              variants={subLinkVariants}
                              whileHover={{ x: 5 }}
                            >
                              <Link
                                to={subLink.href}
                                className="block px-4 py-3 hover:bg-[var(--current-bg)] transition-colors duration-200"
                              >
                                {subLink.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            ))}

            {/* Theme Toggle with Floating Animation */}
            <motion.button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-full bg-[var(--current-bg)] text-[var(--current-text)] hover:bg-opacity-80 transition-all relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <motion.div
                key={theme}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.div>
              <motion.span
                className="absolute inset-0 bg-primary opacity-0 rounded-full"
                whileHover={{ opacity: 0.1 }}
              />
            </motion.button>
          </nav>

          {/* Mobile Menu Button with Morphing Animation */}
          <motion.button
            className="lg:hidden flex flex-col justify-center items-center w-12 h-12 cursor-pointer relative z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                closed: { rotate: 0 },
                open: { rotate: 180 }
              }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[var(--current-text)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--current-text)]" />
              )}
            </motion.div>
            <motion.span
              className="absolute inset-0 bg-primary rounded-full opacity-0"
              whileHover={{ opacity: 0.1 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation with Staggered Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="lg:hidden fixed top-0 left-0 w-full h-screen bg-[var(--current-nav)] flex flex-col items-center justify-center gap-6 overflow-y-auto pt-24 pb-12"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                custom={i}
                variants={linkVariants}
                className="w-full max-w-xs text-center"
              >
                {/* For mobile, always render as direct links */}
                <Link
                  to={link.href}
                  className="block text-[var(--current-text)] text-2xl font-medium hover:text-primary transition-colors duration-300 py-3"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveDropdown(null);
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Theme Toggle with Bounce Effect */}
            <motion.button
              onClick={toggleTheme}
              className="mt-8 p-4 rounded-full bg-[var(--current-bg)] text-[var(--current-text)] hover:bg-opacity-80 transition-all"
              variants={linkVariants}
              custom={navLinks.length}
              whileHover={{
                scale: 1.1,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 10
                }
              }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <motion.div
                key={theme}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 15
                }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </motion.div>
            </motion.button>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}