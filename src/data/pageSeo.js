// Single source of truth for the static pages' SEO metadata.
// scripts/prerender.js reads this same file at build time to bake
// per-route <head> tags into static HTML, so this must stay in sync
// with what each page actually renders — don't hardcode these strings
// again in a page component, import from here instead.
const pageSeo = {
  home: {
    title: "Web Designer & Developer in Busia, Kenya",
    description:
      "Web developer in Busia, Kenya building fast business websites, e-commerce, dashboards and custom systems. See live client work and get a quote in KES.",
    path: "/",
  },
  busia: {
    title: "Web Developer in Busia, Kenya",
    description:
      "Need a website developer in Busia? GlimmerInk builds business websites, e-commerce and custom systems for Busia, Malaba and Western Kenya. Clear KES pricing.",
    path: "/web-developer-busia",
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
    title: "About Ehud Mwai — Web Developer in Busia, Kenya",
    description:
      "Meet Ehud Mwai, the Busia-based web developer behind GlimmerInk Creations. Business websites, online shops and management systems for clients across Kenya.",
    path: "/about",
  },
  contact: {
    title: "Contact GlimmerInk — Get a Quote",
    description:
      "Contact GlimmerInk Creations in Busia, Kenya for a website, online shop or business system. Reply within 24 hours with a clear quote in KES.",
    path: "/contact",
  },
  blog: {
    title: "Blog — Website Pricing, Local SEO & Web Design in Kenya",
    description:
      "Practical articles on website costs, Google Business Profile, web design and development for businesses in Busia and across Kenya, by Ehud Mwai.",
    path: "/blog",
  },
};

export default pageSeo;
