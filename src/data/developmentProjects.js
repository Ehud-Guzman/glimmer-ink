const categoryMeta = {
  web: {
    galleryId: "web-dev",
    galleryName: "Web Development",
    galleryDescription:
      "Business websites, landing pages, and polished web platforms built for clarity and conversion.",
  },
  system: {
    galleryId: "systems",
    galleryName: "Systems & Dashboards",
    galleryDescription:
      "Business systems, dashboards, and workflow-focused tools designed around real operations.",
  },
};

const toGalleryProject = (project) => ({
  ...project,
  technologies: Array.isArray(project.stack) ? project.stack : [],
  liveUrl: project.url || "",
  images:
    Array.isArray(project.images) && project.images.length > 0
      ? project.images
      : [project.fullImage || project.thumbnail].filter(Boolean),
});

export const developmentProjects = [
  {
    id: 9,
    slug: "vittorios-global",
    title: "Vittorios Global",
    description:
      "A full-stack grains trading platform with product storytelling, discovery sections, and an admin backend for day-to-day business operations.",
    thumbnail: "/images/grainsglobal/home-page.webp",
    fullImage: "/images/grainsglobal/home-page.webp",
    stack: ["React", "Vite", "Tailwind CSS", "Node.js"],
    features: [
      "Product catalog with product stories",
      "Explore more / discovery section",
      "Secure admin login and control panel",
      "System admin backup tools",
      "Mobile-first responsive design",
    ],
    challenge:
      "The client needed a dedicated digital presence for their global grains trading operations — one that could showcase products with depth and still give them control over content and inventory.",
    solution:
      "Built a full-stack trading website with a content-rich catalog, admin control panel, and backup tooling so the client could manage their digital presence without relying on a developer for every update.",
    results: [
      "Client updates products and content in minutes — no developer needed",
      "Admin backup tools protect business data day to day",
      "Product storytelling gives buyers depth beyond a plain price list",
    ],
    images: [
      "/images/grainsglobal/home-page.webp",
      "/images/grainsglobal/products-page.webp",
      "/images/grainsglobal/product-page-story.webp",
      "/images/grainsglobal/control-panel-system-admin.webp",
    ],
    url: "https://grains-fronten.netlify.app/",
    category: "web",
    year: "2026",
    type: "Trading Platform",
    status: "live",
    client: "Vittorios Global",
    featured: true,
    showOnHome: true,
    homeOrder: 1,
  },
  {
    id: 13,
    slug: "adit-investment",
    title: "ADIT Investment",
    description:
      "ICT products e-commerce platform with a full product catalog, admin dashboard, and mobile-optimised shopping experience.",
    thumbnail: "/images/websites/adit-investment/adit-products.webp",
    fullImage: "/images/websites/adit-investment/adit-products.webp",
    url: "https://adit-investment.netlify.app/",
    stack: ["React", "Vite", "Tailwind CSS", "Netlify"],
    features: [
      "ICT product catalog with listings",
      "Admin dashboard for inventory management",
      "Mobile-first responsive design",
      "Fast browsing and inquiry flow",
    ],
    challenge:
      "ADIT needed to move their ICT product business online — a catalog customers could browse from any device, plus a way for the team to manage stock without touching code.",
    solution:
      "Delivered an e-commerce platform with a clean product catalog and an admin dashboard for inventory, so listings stay current and customers get a fast, mobile-first shopping experience.",
    images: [
      "/images/websites/adit-investment/adit-products.webp",
      "/images/websites/adit-investment/adit-dashboard.webp",
      "/images/websites/adit-investment/adit-products-admin.webp",
    ],
    category: "web",
    year: "2025",
    type: "E-Commerce Website",
    status: "live",
    client: "ADIT Investment",
    showOnHome: true,
    homeOrder: 2,
  },
  {
    id: 10,
    slug: "sweet-layers-bakery",
    title: "Sweet Layers Bakery",
    description:
      "Modern bakery website showcasing products, services, and a delightful brand-led experience with a focus on aesthetics and usability.",
    thumbnail: "/images/websites/sweetlayers/home.webp",
    fullImage: "/images/websites/sweetlayers/home.webp",
    url: "https://sweetlayerbakers.netlify.app/",
    stack: ["React", "Vite", "Tailwind CSS", "Netlify"],
    features: [
      "Premium hero sections and product storytelling",
      "Order, cakes, and brand story pages",
      "Mobile-first responsive design",
      "SEO-ready social sharing setup",
      "Fast booking and inquiry path",
    ],
    challenge:
      "Sweet Layers needed an online presence that matched the craft of their baking — something warm and premium that could turn browsing into orders.",
    solution:
      "Designed a brand-led site with rich hero sections, product storytelling, and a short path from craving to order, all optimised for the phones their customers actually use.",
    images: [
      "/images/websites/sweetlayers/home.webp",
      "/images/websites/sweetlayers/order.webp",
      "/images/websites/sweetlayers/our-cakes.webp",
      "/images/websites/sweetlayers/story.webp",
    ],
    category: "web",
    year: "2026",
    type: "Bakery Website",
    status: "live",
    client: "Sweet Layers Bakery",
    showOnHome: true,
    homeOrder: 3,
  },
  {
    id: 2,
    slug: "vittorios-trades",
    title: "Vittorios Trades",
    description:
      "Corporate website for an agricultural commodity trading and logistics company serving East Africa, with a product catalog and inquiry flow.",
    thumbnail: "/images/websites/vittorios.webp",
    fullImage: "/images/websites/vittorios1.jpeg",
    url: "https://vittoriostrades.com/",
    stack: ["React", "Tailwind CSS"],
    features: [
      "Product catalog",
      "Filters",
      "Contact and inquiry form",
      "Mobile-first layout",
    ],
    challenge:
      "Vittorios Trades needed a credible digital storefront for their commodity trading business — buyers researching suppliers online had nothing to find.",
    solution:
      "Built a clean corporate site with a filterable product catalog and a direct inquiry flow, giving the business a professional presence buyers can verify and contact in one visit.",
    testimonial: {
      name: "Victor Mwangi",
      role: "Manager, Vittorios Trades",
      content:
        "GlimmerInk handled our website with care and professionalism. Communication was smooth, and the final result felt clean and easy to use.",
    },
    images: [
      "/images/websites/vittorios.webp",
      "/images/websites/vittorios1.jpeg",
      "/images/websites/vittorios2.jpeg",
    ],
    category: "web",
    year: "2024",
    type: "Business Website",
    status: "live",
    client: "Vittorios Trades",
    showOnHome: true,
    homeOrder: 4,
  },
  {
    id: 4,
    slug: "lexara-law",
    title: "Lexara Law",
    description:
      "A modern law firm website for Lexara featuring practice areas, attorney profiles, and client intake pathways.",
    thumbnail: "/images/websites/Lexara/homepage.webp",
    fullImage: "/images/websites/Lexara/homepage.webp",
    url: "https://lexaralaw.netlify.app/",
    stack: ["React", "Tailwind CSS", "Vite"],
    features: [
      "Practice area pages",
      "Attorney profiles",
      "Contact and consultation CTA",
      "Responsive law firm layout",
    ],
    challenge:
      "A law firm's website has one job: make a potential client trust the firm before they ever call. Lexara needed a presence that felt established, organised, and easy to navigate.",
    solution:
      "Structured the site around practice areas and attorney profiles with clear consultation pathways, so visitors can find the right expertise and reach out without friction.",
    images: [
      "/images/websites/Lexara/homepage.webp",
      "/images/websites/Lexara/about-us.webp",
      "/images/websites/Lexara/our-advocates.webp",
      "/images/websites/Lexara/practice-area.webp",
    ],
    category: "web",
    year: "2025",
    type: "Law Firm Website",
    status: "live",
    client: "Lexara Law",
  },
  {
    id: 6,
    slug: "sunshine-schools",
    title: "Sunshine Schools",
    description:
      "School website and dashboard UI concept showcasing academic performance, staff structure, and student views.",
    thumbnail: "/images/websites/sunshine.webp",
    fullImage: "/images/websites/sunshine.webp",
    url: "https://sunshineshools.netlify.app/",
    stack: ["React", "Tailwind CSS", "Vite"],
    features: [
      "Clean academic dashboard layout",
      "Student and teacher views",
      "Performance overview sections",
      "Responsive layout",
    ],
    challenge:
      "Schools juggle performance data, staff structure, and parent communication across paperwork and spreadsheets. This concept explores what a single, clean dashboard could look like.",
    solution:
      "Designed an academic dashboard concept with student and teacher views and performance overviews — a starting point for schools ready to move their operations online.",
    images: ["/images/websites/sunshine.webp"],
    category: "web",
    year: "2025",
    type: "Education Dashboard",
    status: "demo",
    client: "Education (Concept Build)",
    showOnHome: true,
    homeOrder: 5,
  },
  {
    id: 5,
    slug: "glimmerhope-hospital",
    title: "GlimmerHope Hospital",
    description:
      "Healthcare management concept with patient records, appointment workflows, and a clean medical UI direction.",
    thumbnail: "/images/websites/glimmerhope1.webp",
    fullImage: "/images/websites/glimmerhope1.webp",
    url: "https://glimmerhope.netlify.app/",
    stack: ["React", "TypeScript", "GraphQL", "PostgreSQL"],
    features: [
      "Patient records",
      "Appointments",
      "Role-based access",
      "Secure data flows",
    ],
    challenge:
      "Clinics and hospitals still run on paper files and fragmented tools. This concept explores a unified system for records, appointments, and role-based staff access.",
    solution:
      "Built a healthcare management concept with patient records, appointment workflows, and role-based access — demonstrating the systems thinking behind GlimmerInk's dashboard work.",
    images: ["/images/websites/glimmerhope1.webp"],
    category: "system",
    year: "2024",
    type: "Healthcare System",
    status: "demo",
    client: "Healthcare (Concept Build)",
    showOnHome: true,
    homeOrder: 6,
  },
];

export const getProjectBySlug = (slug) =>
  developmentProjects.find((project) => project.slug === slug) || null;

export const workCategories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Applications" },
  { id: "system", label: "Business Systems" },
];

export const portfolioGalleryData = {
  title: "Development Portfolio",
  description:
    "Explore web projects, business systems, and interface-led builds from the same portfolio source.",
  categories: Object.entries(categoryMeta)
    .map(([category, meta]) => ({
      id: meta.galleryId,
      name: meta.galleryName,
      description: meta.galleryDescription,
      projects: developmentProjects
        .filter((project) => project.category === category)
        .map(toGalleryProject),
    }))
    .filter((category) => category.projects.length > 0),
};
