// Address of the chama system's live demo (sample data, read-only). The domain
// may change; this one line is the only edit needed. If it is empty, the
// project is left out of the site entirely, so there is never a dead link.
const CHAMA_DEMO_URL = "https://mwangazashg.netlify.app";

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
    id: 14,
    slug: "hotel-itoya",
    title: "Hotel Itoya",
    description:
      "A full hospitality platform for a premier business hotel in Busia — live room browsing, a photo gallery, and dedicated conference and events pages.",
    thumbnail: "/images/websites/itoya/home.webp",
    fullImage: "/images/websites/itoya/home.webp",
    stack: ["React", "Tailwind CSS", "Node.js", "REST API"],
    features: [
      "Live room and rate browser across four room tiers",
      "Dedicated conference and events pages for business and MICE clients",
      "Filterable photo gallery (spaces, rooms, dining, conference, events)",
      "Inline quick-search bar for room type, dates, and rate",
      "Mobile-first responsive design",
    ],
    challenge:
      "Hotel Itoya needed more than a brochure site — as a business hotel built around conferences and events as much as stays, most competing hotel sites in the area offer little beyond a phone number and a contact form.",
    solution:
      "Built a full hospitality platform with a live room and rate browser, a photo gallery, and dedicated conference and events pages, so guests can research and compare before they get in touch — while positioning Itoya as a serious business hotel, not just a leisure stopover.",
    results: [
      "Guests can browse rooms and rates before they call",
      "Conference and events pages open the site up to MICE clients, the hotel's core business market",
      "Filterable gallery lets guests explore rooms, dining, and event spaces before committing",
    ],
    images: [
      "/images/websites/itoya/home.webp",
      "/images/websites/itoya/Reception.webp",
      "/images/websites/itoya/Rooms.webp",
      "/images/websites/itoya/booking.webp",
      "/images/websites/itoya/Meetings.webp",
      "/images/websites/itoya/gallery.webp",
    ],
    url: "https://www.hotelitoya.co.ke",
    category: "web",
    year: "2026",
    type: "Hotel & Hospitality Website",
    status: "live",
    client: "Hotel Itoya",
    featured: true,
    showOnHome: true,
    homeOrder: 1,
  },
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
    status: "in-progress",
    client: "Vittorios Global",
    showOnHome: true,
    homeOrder: 2,
  },
  /* Disabled: ADIT Investment. Uncomment to restore.
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
    homeOrder: 3,
  },
  */
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
    homeOrder: 4,
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
    year: "2025",
    type: "Business Website",
    status: "live",
    client: "Vittorios Trades",
    showOnHome: true,
    homeOrder: 5,
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
    homeOrder: 6,
  },
  ...(CHAMA_DEMO_URL
    ? [
        {
          id: 15,
          slug: "chama-management-system",
          title: "Chama Management System",
          description:
            "A full management system for a savings group - weekly contributions, fines, expenses, meeting minutes and a member passbook - with a live demo you can click through, no sign-up needed.",
          thumbnail: "/images/systems/mwangaza/dashboard.webp",
          fullImage: "/images/systems/mwangaza/dashboard.webp",
          url: CHAMA_DEMO_URL,
          stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
          features: [
            "Treasurer's ledger with receipts and M-Pesa references",
            "Automatic arrears: who is behind and by how many weeks",
            "Fines issued from the meeting roll, with part-payments",
            "Member passbook opened with ID + phone (statements as PDF or Excel)",
            "Role-based access (admin, treasurer, secretary, disciplinary)",
            "Tamper-evident audit log, closed-books locking and nightly backups",
            "Mobile-first, with a quick-log sheet for logging payments on a phone",
          ],
          challenge:
            "Most savings groups run on a paper book and a WhatsApp group. Figures drift, arrears get argued about, and members can't see where they stand without asking the treasurer.",
          solution:
            "One trusted set of books: payments are logged once, and every balance, arrears figure and report is worked out from them. Members check their own passbook, the committee works from role-based screens, and every change leaves a trail.",
          results: [
            "One source of truth for contributions, fines, expenses and minutes",
            "Members see their own balance without calling the treasurer",
            "Every change is traceable",
          ],
          images: [
            "/images/systems/mwangaza/dashboard.webp",
            "/images/systems/mwangaza/member-ledger.webp",
            "/images/systems/mwangaza/fines.webp",
            "/images/systems/mwangaza/reports.webp",
            "/images/systems/mwangaza/passbook.webp",
            "/images/systems/mwangaza/home.webp",
          ],
          category: "system",
          year: "2026",
          type: "Savings Group System",
          status: "live-demo",
          client: "Savings group (demo uses sample data)",
          // Names, IDs and phones below must match the demo's seed data (see
          // frontend/src/utils/demo.js in the chama repo). Shown on /demos.
          imageCaptions: [
            "Dashboard: who has paid, who owes, money held",
            "Member ledger",
            "Fines issued from the meeting roll",
            "Reports",
            "A member's passbook",
            "The member portal",
          ],
          // The demo's API sleeps on free hosting. The Demos page pings this when it
          // opens so the demo is already awake by the time a visitor clicks through.
          // Its origin must also be listed in connect-src in netlify.toml.
          demoWarmup: "https://chama-demo-api.onrender.com/api/health",
          // Phone-sized captures of the live demo (390x844), shown in a phone frame.
          mobileImages: [
            "/images/systems/mwangaza/mobile-dashboard.webp",
            "/images/systems/mwangaza/mobile-quicklog.webp",
            "/images/systems/mwangaza/mobile-members.webp",
            "/images/systems/mwangaza/mobile-fines.webp",
            "/images/systems/mwangaza/mobile-passbook.webp",
          ],
          mobileCaptions: [
            "Dashboard on a phone",
            "Quick-log sheet for recording a payment",
            "Members",
            "Fines",
            "A member's passbook",
          ],
          demoGuide: {
            access: "One-tap sign-in. No password, no sign-up.",
            roles: [
              {
                role: "Admin",
                action: "Tap “Explore as Admin” on the demo's home page.",
                detail: "Members, finance, fines, minutes, reports and the audit trail, all with data.",
              },
              {
                role: "Treasurer",
                action: "Tap “Explore as Treasurer” on the demo's home page.",
                detail: "The ledger and the weekly collection.",
              },
              {
                role: "Member",
                action: "Tap “Fill in” on a sample member, then “Check contributions”.",
                detail: "What a member sees for themselves, with no staff login needed.",
              },
            ],
            samples: [
              { name: "Amina Wekesa", status: "Up to date", id: "30010001", phone: "0700100001" },
              { name: "Esther Naliaka", status: "Behind on contributions", id: "30010005", phone: "0700100005" },
            ],
            tip: "Try saving anything, such as logging a payment. It is a read-only demo, so a message appears and nothing is changed.",
            note: "It runs on free hosting, so the first load after a quiet spell can take up to a minute.",
          },
          showOnHome: true,
          homeOrder: 7,
        },
      ]
    : []),
];

// Single source for "how many live sites" claims across the site.
export const liveProjectCount = developmentProjects.filter((p) => p.status === "live").length;

// Projects with something to click through: working demos first, then concept
// builds. Drives the /demos page.
const demoRank = { "live-demo": 0, demo: 1 };
export const demoProjects = developmentProjects
  .filter((p) => p.status in demoRank && /^https?:\/\//i.test(p.url ?? ""))
  .sort((a, b) => demoRank[a.status] - demoRank[b.status]);

export const getProjectBySlug = (slug) =>
  developmentProjects.find((project) => project.slug === slug) || null;

// The Systems filter only appears once a system project is on the site, so it
// is never an empty tab while the chama demo is switched off.
export const workCategories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Applications" },
  { id: "system", label: "Systems & Dashboards" },
].filter(
  (category) =>
    category.id === "all" || developmentProjects.some((project) => project.category === category.id)
);

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
