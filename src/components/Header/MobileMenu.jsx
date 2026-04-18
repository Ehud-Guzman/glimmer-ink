import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { createPortal } from "react-dom";
import {
  loadHome,
  loadWork,
  loadServices,
  loadAbout,
  loadContact,
  loadBlog,
} from "@/utils/routePreloaders";

const navItems = [
  { name: "Home", path: "/", preload: loadHome },
  { name: "Work", path: "/work", preload: loadWork },
  { name: "Services", path: "/services", preload: loadServices },
  { name: "About", path: "/about", preload: loadAbout },
  { name: "Blog", path: "/blog", preload: loadBlog },
  { name: "Contact", path: "/contact", preload: loadContact },
];

export default function MobileMenu({ isOpen, toggleMenu, closeMenu, theme, toggleTheme }) {
  const firstLinkRef = useRef(null);
  const canUsePortal = typeof document !== "undefined";

  const doClose = closeMenu || toggleMenu;

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => firstLinkRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [isOpen]);

  const ui = (
    /* Keep in DOM always so CSS exit transition plays */
    <div
      className={`fixed inset-0 z-[9999] md:hidden transition-opacity duration-150 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-modal="true"
      role="dialog"
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu backdrop"
        className={`absolute inset-0 bg-black transition-opacity duration-150 ${
          isOpen ? "opacity-[0.92]" : "opacity-0"
        }`}
        onClick={doClose}
      />

      {/* Menu panel — slides up from bottom */}
      <div
        className={`absolute inset-0 bg-white dark:bg-gray-900 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Navigation
          </span>

          <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            <button
              type="button"
              onClick={doClose}
              aria-label="Close menu"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100
                         dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <nav className="flex-1 flex flex-col p-6">
          {navItems.map((item, idx) => (
            <NavLink
              key={item.name}
              to={item.path}
              ref={idx === 0 ? firstLinkRef : undefined}
              onTouchStart={item.preload}
              onMouseEnter={item.preload}
              onClick={doClose}
              className={({ isActive }) =>
                `group relative px-4 py-4 rounded-lg text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                  isActive
                    ? "text-primary dark:text-primary-light bg-primary/10"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-light" />
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            GlimmerInk Creations © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );

  return canUsePortal ? createPortal(ui, document.body) : null;
}
