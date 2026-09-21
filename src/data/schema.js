// Structured data builders - the single source of truth for JSON-LD.
// Imported by the React pages (via <SEOHead jsonLd={...} />) and by
// scripts/prerender.js, which bakes the same blocks into the static HTML so
// crawlers that never execute JavaScript still see them.
// Pure data only: no JSX, no browser APIs, safe to import in Node.
import { servicePricing, priceRangeLabel } from "./pricing.js";
import { serviceFaqs } from "./faqs.js";

export const SITE_URL = "https://glimmerink.co.ke";
export const SITE_NAME = "GlimmerInk Creations";
export const SITE_EMAIL = "nyamuehud@gmail.com";
export const SITE_PHONE = "+254746527253";
export const LOGO_URL = `${SITE_URL}/favicon_io/android-chrome-512x512.png`;
export const DEFAULT_IMAGE = `${SITE_URL}/images/Glimmer-OG.jpg`;

export const BUSINESS_DESCRIPTION =
  "GlimmerInk Creations is a Kenya-based creative studio building premium websites, business systems and custom digital experiences for modern businesses.";

const SOCIAL_PROFILES = [
  "https://x.com/GlimmerInk_",
  "https://www.instagram.com/glimmerink.creations",
  "https://www.linkedin.com/company/glimmerink",
  "https://dribbble.com/Ehud_Guzman",
];

const absolute = (value) => (value ? new URL(value, `${SITE_URL}/`).toString() : undefined);

const postalAddress = () => ({
  "@type": "PostalAddress",
  addressLocality: "Nairobi",
  addressCountry: "KE",
});

const businessRef = () => ({ "@id": `${SITE_URL}/#business` });

const teamRef = () => ({ "@type": "Person", name: "Ehud Mwai", url: `${SITE_URL}/about` });

const offers = () =>
  servicePricing.map((service) => ({
    "@type": "Offer",
    name: service.label,
    description: service.description,
    priceSpecification: {
      "@type": "PriceSpecification",
      price: service.basePrice,
      priceCurrency: "KES",
      valueAddedTaxIncluded: false,
    },
    itemOffered: {
      "@type": "Service",
      name: service.label,
      description: service.description,
      areaServed: { "@type": "Country", name: "Kenya" },
      provider: businessRef(),
    },
  }));

export const webSite = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "GlimmerInk",
  url: `${SITE_URL}/`,
  inLanguage: "en-KE",
  publisher: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
});

export const professionalService = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  alternateName: "GlimmerInk",
  description: BUSINESS_DESCRIPTION,
  url: `${SITE_URL}/`,
  logo: LOGO_URL,
  image: DEFAULT_IMAGE,
  email: SITE_EMAIL,
  telephone: SITE_PHONE,
  priceRange: priceRangeLabel,
  foundingDate: "2025",
  founder: { "@type": "Person", name: "Ehud Mwai", jobTitle: "Creative Director & Lead Developer", url: `${SITE_URL}/about` },
  address: postalAddress(),
  areaServed: [
    { "@type": "Country", name: "Kenya" },
    { "@type": "City", name: "Nairobi" },
  ],
  availableLanguage: ["English", "Kiswahili"],
  sameAs: SOCIAL_PROFILES,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    contactType: "Customer Service",
    areaServed: "KE",
    availableLanguage: ["English", "Kiswahili"],
  },
  makesOffer: offers(),
});

export const person = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#ehud-mwai`,
  name: "Ehud Mwai",
  jobTitle: "Creative Director & Lead Developer",
  url: `${SITE_URL}/about`,
  email: SITE_EMAIL,
  telephone: SITE_PHONE,
  address: postalAddress(),
  sameAs: SOCIAL_PROFILES,
  worksFor: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
  knowsAbout: ["Web Design", "Web Development", "React", "UI/UX Design", "Business Systems", "E-Commerce", "Tailwind CSS", "M-Pesa integration"],
  hasOccupation: {
    "@type": "Occupation",
    name: "Web Developer",
    occupationLocation: { "@type": "Country", name: "Kenya" },
    skills: "React, Node.js, Tailwind CSS, UI/UX design, business systems",
  },
});

export const serviceList = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Services offered by ${SITE_NAME}`,
  itemListElement: servicePricing.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.label,
      description: service.description,
      areaServed: { "@type": "Country", name: "Kenya" },
      provider: businessRef(),
      offers: {
        "@type": "Offer",
        priceCurrency: "KES",
        price: service.basePrice,
        priceSpecification: { "@type": "PriceSpecification", price: service.basePrice, priceCurrency: "KES" },
      },
    },
  })),
});

export const faqPage = (faqs = serviceFaqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

export const breadcrumbs = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

const wordCount = (post) =>
  (post.content ?? []).reduce((total, block) => {
    const text = block.text ?? (Array.isArray(block.items) ? block.items.join(" ") : "");
    return total + String(text).split(/\s+/).filter(Boolean).length;
  }, 0);

export const article = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  image: [DEFAULT_IMAGE],
  datePublished: post.date,
  dateModified: post.updated ?? post.date,
  author: { "@type": "Person", name: "Ehud Mwai", url: `${SITE_URL}/about` },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  url: `${SITE_URL}/blog/${post.slug}`,
  keywords: (post.tags ?? []).join(", "),
  articleSection: post.category,
  wordCount: wordCount(post),
  inLanguage: "en-KE",
});

export const caseStudy = (project) => {
  const images = project.images?.length ? project.images : [project.fullImage ?? project.thumbnail].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.title} - Case Study`,
    description: project.description,
    url: `${SITE_URL}/work/${project.slug}`,
    image: images.map((image) => absolute(image)).filter(Boolean),
    creator: teamRef(),
    dateCreated: project.year,
    about: project.client ? { "@type": "Organization", name: project.client } : undefined,
    keywords: (project.stack ?? []).join(", "),
    sameAs: absolute(project.url),
    inLanguage: "en-KE",
  };
};

export const workCollection = (projects) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `Portfolio and case studies - ${SITE_NAME}`,
  url: `${SITE_URL}/work`,
  about: "Websites, business systems and interface builds delivered by GlimmerInk Creations",
  hasPart: projects.map((project) => ({
    "@type": "CreativeWork",
    name: project.title,
    url: `${SITE_URL}/work/${project.slug}`,
    creator: teamRef(),
  })),
});

export const blogCollection = (posts) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `GlimmerInk Creations Blog`,
  url: `${SITE_URL}/blog`,
  inLanguage: "en-KE",
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    author: { "@type": "Person", name: "Ehud Mwai", url: `${SITE_URL}/about` },
  })),
});

export const contactPage = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${SITE_NAME}`,
  url: `${SITE_URL}/contact`,
  mainEntity: businessRef(),
});
