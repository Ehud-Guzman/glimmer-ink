// Single source of truth for the static pages' SEO metadata.
// scripts/prerender.js reads this same file at build time to bake
// per-route <head> tags into static HTML, so this must stay in sync
// with what each page actually renders — don't hardcode these strings
// again in a page component, import from here instead.
const pageSeo = {
  home: {
    title: "Web Design & Development Kenya",
    description:
      "GlimmerInk Creations builds premium websites, business systems, and custom digital experiences for modern businesses across Kenya.",
    path: "/",
  },
  work: {
    title: "Portfolio & Case Studies",
    description:
      "Explore GlimmerInk portfolio work, including business websites, dashboard concepts, and custom digital product case studies.",
    path: "/work",
  },
  services: {
    title: "Web Design & Development Services — Kenya",
    description:
      "GlimmerInk offers business websites, web applications, e-commerce, custom systems, and UI/UX design for businesses across Kenya.",
    path: "/services",
  },
  about: {
    title: "About GlimmerInk — Ehud Mwai, Creative Director & Web Developer",
    description:
      "GlimmerInk Creations is a Kenya-based creative studio led by Ehud Mwai, building premium websites, business systems, and digital experiences for modern businesses.",
    path: "/about",
  },
  contact: {
    title: "Contact GlimmerInk — Start Your Project",
    description:
      "Get in touch with GlimmerInk Creations to discuss your website, business system, or digital project. Serving clients across Kenya.",
    path: "/contact",
  },
  blog: {
    title: "Blog — Web Design & Development Insights for Kenyan Businesses",
    description:
      "Practical articles on web design, development, and digital strategy for businesses in Kenya. Written by Ehud Mwai at GlimmerInk Creations.",
    path: "/blog",
  },
};

export default pageSeo;
