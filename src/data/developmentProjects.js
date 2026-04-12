export const developmentProjects = [
  // =========================
  // FEATURED / STRONGEST FIRST
  // =========================
/*
{
  id: 4,
  title: "School Management System",
  description:
    "Multi-tenant school platform for student records, attendance, fees, exams/results, and automated reporting.",
  thumbnail: "/images/systems/systemadmin.png",
  fullImage: "/images/systems/teacher-dashboard.png",
  url: "https://granitesms.netlify.app/app", 
  stack: ["React", "Vite", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma"],
  features: [
    "Multi-tenant (school isolation)",
    "Student & class management",
    "Attendance sessions & tracking",
    "Fees workflow + printable receipts",
    "Exams & results processing",
    "Role-based access (Admin/Teacher/Bursar)",
    "Reports & exports",
  ],
  category: "system",
  year: "2025",
  type: "School Management System",
  status: "in-progress",
  featured: true,
},

*/

  {
    id: 2,
    title: "Vittorios Trades",
    description:
      "E-commerce website for cereals and grains with a product catalog and inquiry/contact flows.",
    thumbnail: "/images/websites/vittorios.webp",
    fullImage: "/images/websites/vittorios1.jpeg",
    url: "https://vittoriostrades.com/",
    stack: ["React", "Tailwind"],
    features: ["Product catalog", "Filters", "Contact/inquiry form", "Mobile-first layout"],
    category: "web",
    year: "2024",
    type: "Business Website",
  },

  {
    id: 9,
    title: "VittoriosGlobal",
    description:
      "A full-stack grains and cereals trading platform built from the ground up — giving the client a product-rich storefront, deep product storytelling, and a complete admin backend to run the business from.",
    thumbnail: "/images/grainsglobal/home-page.png",
    fullImage: "/images/grainsglobal/home-page.png",
    // url: "", // TODO: add live URL
    stack: ["React", "Vite", "Tailwind CSS", "Node.js"],
    features: [
      "Product catalog with product stories",
      "Explore more / discovery section",
      "Secure admin login and control panel",
      "System admin backup tools",
      "Mobile-first responsive design",
    ],
    challenge:
      "The client needed a dedicated digital presence for their global grains trading operations — one that could showcase their product range with depth, tell the story behind each product, and give them full control over content and inventory without depending on a developer for every update.",
    solution:
      "Built a full-stack trading website with a content-rich product catalog, admin control panel, and backup tooling — giving the client full ownership of their digital presence without needing a developer for every update.",
    images: [
      "/images/grainsglobal/home-page.png",
      "/images/grainsglobal/products-page.png",
      "/images/grainsglobal/product-page-story.png",
      "/images/grainsglobal/control-panel-system-admin.png",
    ],
    category: "web",
    year: "2026",
    type: "Trading Website",
    client: "Vittorios Global",
    featured: true,
  },

   {
    id: 6,
    title: "Sunshine Schools",
    description:
      "School dashboard UI for performance and staff/student views (frontend build).",
    thumbnail: "/images/websites/sunshine.webp",
    fullImage: "/images/websites/sunshine.webp",
    url: "https://sunshineshools.netlify.app/",
    stack: ["React", "Tailwind CSS", "Vite"],
    features: ["Performance overview", "Teacher views", "Responsive layout"],
    category: "web",
    year: "2025",
    type: "Education Dashboard",
    status: "demo",
  },

  /*
  {
    id: 3,
    title: "Adit Investments",
    description:
      "Computer shop & repair business site with an admin dashboard and product management features.",
    thumbnail: "/images/websites/adit-admin.png",
    fullImage: "/images/websites/adit-products.png",
    url: "https://adit-investment.netlify.app/",
    stack: ["React", "Express.js", "MongoDB", "Payment APIs"],
    features: ["Admin dashboard", "Inventory tracking", "Sales analytics", "Product CRUD"],
    category: "web",
    year: "2024",
    type: "E-commerce Website",
  },
  */

  // =========================
  // SYSTEMS
  // =========================


  {
    id: 5,
    title: "GlimmerHope Hospital",
    description:
      "Healthcare management concept with patient records and appointment scheduling workflows.",
    thumbnail: "/images/websites/glimmerhope1.webp",
    fullImage: "/images/websites/glimmerhope1.webp",
    url: "https://glimmerhope.netlify.app/",
    stack: ["React", "TypeScript", "GraphQL", "PostgreSQL"],
    features: ["Patient records", "Appointments", "Role-based access", "Secure data flows"],
    category: "system",
    year: "2024",
    type: "Healthcare System",
    status: "demo", // removes legal risk
  },

  {
    id: 1,
    title: "GlimmerInk Creations",
    description:
      "My portfolio platform showcasing real case studies, services, and contact flow for client acquisition.",
    thumbnail: "/images/GlimmerInklogo1.webp",
    fullImage: "/images/GlimmerInklogo1.webp",
    url: "https://glimmerink.co.ke",
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    features: ["Responsive UI", "Service pages", "Case study layout", "SEO-ready structure"],
    category: "web",
    year: "2023",
    type: "Portfolio Website",
  },

 

  {
    id: 7,
    title: "Njoroge and Partners Advocates",
    description:
      "Legal practice management system concept with case tracking and client workflows.",
    thumbnail: "/images/websites/njoro.webp",
    fullImage: "/images/websites/njoro.webp",
    url: "https://njorolawfirm.netlify.app/",
    stack: ["React", "Redux", "Express", "MySQL"],
    features: ["Case management", "Document workflows", "Time tracking", "Client portal"],
    category: "system",
    year: "2025",
    type: "Legal Practice System",
    status: "demo",
  },

  // =========================
  // OPTIONAL / IF YOU KEEP IT
  // =========================
  {
    id: 8,
    title: "Premium Cars KE",
    description: "Car dealership website showcasing vehicle listings and contact inquiries.",
    thumbnail: "/images/websites/premiumcars.webp",
    fullImage: "/images/websites/premiumcars.webp",
    url: "https://premiumcarske.netlify.app/",
    stack: ["React", "Tailwind"],
    features: ["Vehicle listings", "Responsive layout", "Inquiry/contact CTA"],
    category: "web",
    year: "2025",
    type: "Business Website",
    status: "in-progress",
  },
];

export const workCategories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Applications" },
  { id: "system", label: "Business Systems" },
  // Keep app only when you actually add mobile projects
  // { id: "app", label: "Mobile Apps" },
];
