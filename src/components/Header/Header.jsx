import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import SeasonBar from "@/components/Season/SeasonBar";

export default function Header({ isMenuOpen, setIsMenuOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Read the saved preference once, SSR-safely. The rendered markup does not
  // depend on it (ThemeToggle swaps icons with CSS dark: variants), so this can
  // never cause a hydration mismatch, and the inline script in index.html has
  // already applied the class before first paint.
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });

  const location = useLocation();

  /* ------------------------------
     Theme handling
  ------------------------------ */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    localStorage.setItem("theme", theme);

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute("content", theme === "dark" ? "#0F172A" : "#2563EB");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  /* ------------------------------
     Close mobile menu on navigation
     (App owns state; Header just updates it)
  ------------------------------ */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location, setIsMenuOpen]);

  /* ------------------------------
     Scroll detection (adds a shadow once the page moves)
  ------------------------------ */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b transition-shadow duration-200 ${
        isScrolled
          ? "border-gray-200 dark:border-gray-800 shadow-sm"
          : "border-gray-100 dark:border-gray-800/60"
      }`}
    >
      {/* Festive strip: zero height outside a season (see src/season.css) */}
      <SeasonBar />

      {/* Fixed height, matching the page offset in App.jsx (pt-16 / lg:pt-20, plus the strip above) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex justify-between items-center">
        <Logo />

        <DesktopNav toggleTheme={toggleTheme} />

        {/* Mobile hamburger */}
        <button
          onClick={toggleMenu}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          className="md:hidden p-2 -mr-2 rounded-lg transition-colors duration-200
                     text-gray-700 hover:text-gray-900 hover:bg-gray-100
                     dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* String lights hanging under the header, in season only */}
      <div className="season-lights" aria-hidden="true" />

      <MobileMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        toggleTheme={toggleTheme}
      />
    </header>
  );
}
