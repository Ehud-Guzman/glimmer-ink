import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import footerStructure from "@/data/footerData";
import { LOCATION, LOCATION_LABEL } from "@/data/location";

const linkClass =
  "text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary-light transition-colors";

const Footer = () => {
  const year = new Date().getFullYear();
  const { brand, navigation, contact } = footerStructure;
  const pages = navigation[0]?.links ?? [];
  const social = (contact?.social ?? []).filter((s) => s?.url && s.url !== "#");

  const services = [
    { name: "Business websites", url: "/services" },
    { name: "Online shops & M-Pesa", url: "/services" },
    { name: "Business systems", url: "/services" },
    { name: "Cost estimator", url: "/services#estimator" },
    { name: `Web developer in ${LOCATION.town}`, url: LOCATION.landingPath },
  ];

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-4 min-w-0">
            <Link
              to="/"
              aria-label="GlimmerInk Creations home"
              className="inline-flex rounded-xl bg-white px-2 py-1 -ml-2"
            >
              <img
                src="/images/logo-blue.webp"
                alt="GlimmerInk Creations logo"
                width="280"
                height="121"
                loading="lazy"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-text-light/70 dark:text-text-dark/70 max-w-sm">
              {brand.description}
            </p>

            <Link
              to={brand.cta.url}
              className="group mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              {brand.cta.text}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Pages */}
          <nav aria-label="Pages" className="md:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-4">Pages</h3>
            <ul className="space-y-2.5">
              {pages
                .filter((link) => link.url !== LOCATION.landingPath)
                .map((link) => (
                  <li key={link.url}>
                    <Link to={link.url} className={linkClass}>
                      {link.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services" className="md:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.name}>
                  <Link to={link.url} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-3 min-w-0">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:nyamuehud@gmail.com" className={`${linkClass} inline-flex items-center gap-2.5 break-all`}>
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  nyamuehud@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+254746527253" className={`${linkClass} inline-flex items-center gap-2.5`}>
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  +254 746 527 253
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/254746527253"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-2.5`}
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-text-light/70 dark:text-text-dark/70">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                {LOCATION_LABEL}
              </li>
            </ul>

            {social.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-text-light/70 dark:text-text-dark/70 hover:border-primary hover:text-primary dark:hover:text-primary-light transition-colors"
                    >
                      <item.icon className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-text-light/55 dark:text-text-dark/55">
          <p>© {year} GlimmerInk Creations. All rights reserved.</p>
          <p>Web design and development in {LOCATION_LABEL}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
