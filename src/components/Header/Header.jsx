import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark";
  });

  const { scrollY } = useScroll();
  const location = useLocation();
  const headerRef = useRef();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light-theme", "dark-theme");
    root.classList.add(`${theme}-theme`);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [theme]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    if (latest > 100 && latest > prev) {
      setIsScrolled(true);
    } else if (latest < 10 || latest < prev) {
      setIsScrolled(false);
    }
  });

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    document.body.style.overflow = isMenuOpen ? "" : "hidden";
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <motion.header
      ref={headerRef}
      className={`fixed top-0 w-full z-50 bg-[var(--current-nav)] backdrop-blur-md transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{
        y: 0,
        padding: isScrolled ? "0.5rem 0" : "1.5rem 0",
        boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo />
          <DesktopNav theme={theme} toggleTheme={toggleTheme} />
          <MobileMenu
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </div>
      </div>
    </motion.header>
  );
}
