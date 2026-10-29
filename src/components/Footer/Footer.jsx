import { Link } from "@/components/ui/SlashLink";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import footerStructure from "@/data/footerData";
import { developmentProjects } from "@/data/developmentProjects";
import { blogPosts } from "@/data/blogPosts";
import { LOCATION, LOCATION_LABEL } from "@/data/location";
import FestiveSwitch from "@/components/Season/FestiveSwitch";

const linkClass =
  "text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary-light transition-colors";

const Heading = ({ children }) => (
  <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-4">{children}</h3>
);

// Real clients first (live, then in progress); concept builds and sample-data demos are left out.
const clientProjects = developmentProjects
  .filter((project) => project.status !== "demo" && project.status !== "live-demo")
  .slice(0, 5);

const latestPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);

const Footer = () => {
  const year = new Date().getFullYear();
  const { brand, navigation, contact } = footerStructure;
  const pages = (navigation[0]?.links ?? []).filter((link) => link.url !== LOCATION.landingPath);
  const social = (contact?.social ?? []).filter((s) => s?.url && s.url !== "#");

  return (
    <footer className="relative bg-white dark:bg-gray-950 border-t border-border-light dark:border-border-dark pb-16 md:pb-0">
      <div className="season-ribbon" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 md:pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-3 min-w-0">
            <Link
              to="/"
              aria-label="GlimmerInk Creations home"
              className="inline-flex rounded-xl bg-white px-2 py-1 -ml-2"
            >
              <span className="relative inline-flex">
                <img
                  src="/images/logo-blue.webp"
                  alt="GlimmerInk Creations logo"
                  width="280"
                  height="121"
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
                <span className="season-hat" aria-hidden="true" />
              </span>
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

          {/* Explore */}
          <nav aria-label="Pages" className="lg:col-span-2">
            <Heading>Explore</Heading>
            <ul className="space-y-2.5">
              {pages.map((link) => (
                <li key={link.url}>
                  <Link to={link.url} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={LOCATION.landingPath} className={linkClass}>
                  Web developer in {LOCATION.town}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Selected work */}
          <nav aria-label="Selected work" className="lg:col-span-2">
            <Heading>Selected work</Heading>
            <ul className="space-y-2.5">
              {clientProjects.map((project) => (
                <li key={project.slug}>
                  <Link to={`/work/${project.slug}`} className={linkClass}>
                    {project.client || project.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/work" className={`${linkClass} font-medium`}>
                  All projects →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Latest articles */}
          <nav aria-label="Latest articles" className="lg:col-span-2">
            <Heading>Latest articles</Heading>
            <ul className="space-y-3">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`} className={`${linkClass} line-clamp-3 leading-snug`}>
                    {post.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className={`${linkClass} font-medium`}>
                  All articles →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3 min-w-0 sm:col-span-2">
            <Heading>Contact</Heading>
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
              <li className="flex items-start gap-2.5 text-text-light/70 dark:text-text-dark/70">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  Mon–Fri, 8AM–5PM EAT
                  <span className="block text-xs text-text-light/50 dark:text-text-dark/50">Replies within 24 hours</span>
                </span>
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

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-text-light/55 dark:text-text-dark/55">
          <p>© {year} GlimmerInk Creations. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link to="/privacy" className="text-text-light/55 dark:text-text-dark/55 hover:text-primary dark:hover:text-primary-light transition-colors">
              Privacy Policy
            </Link>
            <FestiveSwitch />
            <p>Web design and development in {LOCATION_LABEL}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
