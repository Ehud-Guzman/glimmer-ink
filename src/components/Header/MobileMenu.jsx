import { useEffect, useRef, useSyncExternalStore } from "react";
import { Link, NavLink } from "react-router-dom";
import { createPortal } from "react-dom";
import { ArrowRight, MapPin, MessageCircle, Phone, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import useQuoteClick from "./useQuoteClick";
import { LOCATION_LABEL } from "@/data/location";
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

const subscribeNever = () => () => {};

export default function MobileMenu({ isOpen, toggleMenu, closeMenu, toggleTheme }) {
  const firstLinkRef = useRef(null);

  // The menu is portalled into <body>, which the server cannot render. React
  // reports false while hydrating (matching the server's empty output) and true
  // right after, so the portal appears without breaking hydration.
  const canUsePortal = useSyncExternalStore(subscribeNever, () => true, () => false);

  const doClose = closeMenu || toggleMenu;
  const onQuoteClick = useQuoteClick();

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => firstLinkRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [isOpen]);

  const ui = (
    /* Keep in DOM always so the CSS exit transition plays */
    <div
      className={`fixed inset-0 z-[9999] md:hidden transition-opacity duration-150 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Navigation menu"
      {...(!isOpen ? { inert: "" } : {})}
    >
      <div
        className={`absolute inset-0 bg-white dark:bg-gray-950 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Top bar: logo, theme, close */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <Link to="/" onClick={doClose} aria-label="GlimmerInk Creations home" className="flex rounded-xl dark:bg-white dark:px-2 dark:py-1">
            <img
              src="/images/logo-blue.webp"
              alt="GlimmerInk Creations"
              width="280"
              height="121"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle toggleTheme={toggleTheme} />
            <button
              type="button"
              onClick={doClose}
              aria-label="Close menu"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Links */}
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-3">
          {navItems.map((item, idx) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              ref={idx === 0 ? firstLinkRef : undefined}
              onTouchStart={item.preload}
              onClick={doClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-900 font-display text-2xl font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm ${
                  isActive
                    ? "text-primary dark:text-primary-light"
                    : "text-gray-900 dark:text-gray-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive ? (
                    <span className="h-2 w-2 rounded-full bg-primary dark:bg-primary-light" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-700" aria-hidden="true" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick actions */}
        <div className="px-4 pt-4 pb-5 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 space-y-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <Link
            to="/contact"
            onClick={(event) => {
              doClose();
              onQuoteClick(event);
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors"
          >
            Get a Quote
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:+254746527253"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call
            </a>
            <a
              href="https://wa.me/254746527253"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              <MessageCircle className="w-4 h-4 text-green-600" aria-hidden="true" />
              WhatsApp
            </a>
          </div>

          <p className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            {LOCATION_LABEL} · Mon–Fri, 8AM–5PM EAT
          </p>
        </div>
      </div>
    </div>
  );

  return canUsePortal ? createPortal(ui, document.body) : null;
}
