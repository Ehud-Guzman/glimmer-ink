import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Portfolio = () => {
  // State management
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [expandedProject, setExpandedProject] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Portfolio data
  const portfolioItems = [
    {
      id: 1,
      title: "Celestia Brand Identity",
      category: "branding",
      tags: ["logo", "stationery", "guidelines"],
      year: "2023",
      images: [
        "/images/Offerings and Services.png",
        "/images/portfolio/celestia-2.jpg",
        "/images/portfolio/celestia-3.jpg",
      ],
      description:
        "Complete visual identity for luxury skincare brand including logo design, packaging system, and brand guidelines. We focused on creating a celestial-inspired aesthetic that conveys premium quality.",
      client: "Celestia Cosmetics",
      testimonial: {
        text: '"GlimmerInk transformed our brand with their exceptional design work. The new identity perfectly captures our premium positioning and has significantly boosted our market presence."',
        author: "Sarah Johnson, Marketing Director",
      },
    },
    {
      id: 2,
      title: "Zuri Kids",
      category: "print",
      tags: ["brochure", "poster", "program"],
      year: "2023",
      images: ["public/images/Zuri.png", "/images/Zuri.png"],
      description:
        "Complete print collateral for annual technology conference including attendee badges, program booklets, and wayfinding signage. The geometric patterns reflect the cutting-edge nature of the event.",
      client: "Zuri KIds",
      testimonial: {
        text: '"The designs received countless compliments from attendees. GlimmerInk understood our tech-forward audience perfectly and created materials that enhanced the entire event experience."',
        author: "Michael Chen, Event Coordinator",
      },
    },
      {
      id: 3,
      title: "GlimmerInk Creations",
      category: "branding",
      tags: ["logo", "stationery", "guidelines"],
     
      year: "2023",
      images: ["/images/Website_Charge_Sheet.png", "/images/website-charge-sheet-2.png"],
      description:
        "Complete print collateral for annual technology conference including attendee badges, program booklets, and wayfinding signage. The geometric patterns reflect the cutting-edge nature of the event.",
      client: "Zuri KIds",
      testimonial: {
        text: '"The designs received countless compliments from attendees. GlimmerInk understood our tech-forward audience perfectly and created materials that enhanced the entire event experience."',
        author: "Michael Chen, Event Coordinator",
      },
    },
  ];

  const services = [
    {
      title: "Brand Identity",
      icon: "🖌️",
      description:
        "Complete visual systems including logos, color palettes, typography and brand guidelines",
      projects: 42,
    },
    {
      title: "Print Design",
      icon: "📄",
      description:
        "Business cards, stationery, brochures, packaging and promotional materials",
      projects: 36,
    },
    {
      title: "Digital Design",
      icon: "🖥️",
      description:
        "Websites, mobile apps, social media graphics and digital advertising",
      projects: 28,
    },
    {
      title: "Environmental Design",
      icon: "🏢",
      description: "Signage, exhibition graphics and retail space branding",
      projects: 15,
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Discovery",
      description: "We learn about your business, goals and audience",
      activities: ["Questionnaire", "Market Research", "Strategy Session"],
    },
    {
      step: 2,
      title: "Concept",
      description: "Initial ideas and directions are developed",
      activities: ["Mood Boards", "Sketches", "Style Exploration"],
    },
    {
      step: 3,
      title: "Refinement",
      description: "Designs are refined based on your feedback",
      activities: ["Revisions", "Testing", "Finalization"],
    },
    {
      step: 4,
      title: "Delivery",
      description: "Final files are prepared and project is launched",
      activities: ["File Preparation", "Style Guides", "Launch Support"],
    },
  ];

  const websites = [
    {
      id: 1,
      title: "GlimmerInk Creations",
      description:
        "Premium interior design studio website with portfolio showcase",
      thumbnail: "public/images/Logo-thumbnail.png",
      fullImage: "/images/GlimmerInk logo.png",
      url: "https://glimmerink.netlify.app",
      stack: ["React", "Tailwind CSS", "Framer Motion"],
      features: [
        "Responsive design",
        "Image gallery",
        "Booking system",
        "SEO optimized",
      ],
      year: "2023",
    },
    {
      id: 2,
      title: "Vittorios Trades",
      description: "E-commerce site for cereals and grains",
      thumbnail: "/images/vittorios.png",
      fullImage: "/images/vittorios.png",
      url: "https://vittoriostrades.com/",
      stack: ["Next.js", "Shopify", "Stripe"],
      features: [
        "Product catalog",
        "Subscription service",
        "Mobile-first design",
        "Contact forms",
      ],
      year: "2022",
    },
    
  ];

  // Filtered projects
  const filteredProjects = portfolioItems
    .filter((item) => activeFilter === "all" || item.category === activeFilter)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags
          .some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
          .slice(0, visibleProjects)
    );

  // Load more projects
  const loadMore = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  // Auto-rotate testimonials
 useEffect(() => {
  if (isPaused) return;
  const timeout = setTimeout(() => {
    setActiveTestimonial((prev) => (prev + 1) % portfolioItems.length);
  }, 8000);
  return () => clearTimeout(timeout);
}, [activeTestimonial, isPaused]);

  return (
    <div className="bg-[var(--current-bg)] text-[var(--current-text)]">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-[var(--current-nav)]/20 to-secondary/10">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('/images/texture.png')]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block">Design That</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Makes an Impact
              </span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10">
              We craft visual experiences that elevate brands and engage
              audiences
            </p>

            <div className="flex justify-center gap-6">
              <motion.a
                href="portfolio"
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.a>
              <motion.a
                href="#process"
                className="px-8 py-3 border border-[var(--current-text)] rounded-lg font-medium hover:bg-[var(--current-nav)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Process
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FiChevronDown className="text-3xl opacity-70" />
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section id="portfolio" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Portfolio</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              A selection of our recent creative projects
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div className="w-full md:w-auto">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-[var(--current-nav)] rounded-lg md:hidden"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <FiFilter /> Filters
              </button>

              <div className={`${isFilterOpen ? "block" : "hidden"} md:block`}>
                <div className="flex flex-wrap gap-2">
                  {["all", "branding", "print", "digital", "environmental"].map(
                    (filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 rounded-full capitalize transition-all ${
                          activeFilter === filter
                            ? "bg-gradient-to-r from-primary to-secondary text-white"
                            : "bg-[var(--current-nav)] hover:bg-[var(--current-nav)]/80"
                        }`}
                      >
                        {filter}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 bg-[var(--current-nav)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>

          {/* Portfolio Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {filteredProjects.map((project) => (
    <motion.div
      key={project.id}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-[var(--current-nav)] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
    >
      {/* A4 Aspect Ratio Container */}
      <div
        className="relative w-full overflow-hidden bg-primary-dark cursor-pointer group"
        style={{ paddingBottom: "141.4%" }} // 1.414 aspect ratio for A4 portrait
        onClick={() =>
          setExpandedProject(
            expandedProject === project.id ? null : project.id
          )
        }
      >
        <img
          src={project.images[0]}
          alt={project.title}
          className="absolute top-0 left-0 w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay gradient with title and client */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <div>
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="text-white/80">{project.client}</p>
          </div>
        </div>

        {/* Image count badge */}
        {project.images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
            +{project.images.length - 1}
          </div>
        )}
      </div>

      {/* Expanded project description with animation */}
      <AnimatePresence>
        {expandedProject === project.id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6">
              <p className="mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[var(--current-bg)] rounded-full text-sm capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm opacity-70">{project.year}</span>
                <a
                  href={`/project/${project.id}`}
                  className="flex items-center text-primary hover:underline"
                >
                  View project <FiExternalLink className="ml-1" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  ))}
</div>

{/* Load More Button */}
{visibleProjects < portfolioItems.length && (
  <div className="text-center mt-12">
    <motion.button
      onClick={loadMore}
      className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Load More Projects
    </motion.button>
  </div>
)}

        </div>
      </section>

      {/* Featured Project - Ultra Premium Version */}
      {portfolioItems.length > 0 && (
        <section className="py-12 bg-[var(--current-bg)]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Featured Project</h2>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                An in-depth showcase of our premium work
              </p>
            </div>

            <div className="bg-[var(--current-nav)] rounded-3xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                {/* Image Gallery */}
                <div className="relative bg-primary-dark flex items-center justify-center p-6 lg:min-h-[400px]">
                  <img
                    src={portfolioItems[0].images[0]}
                    alt={portfolioItems[0].title}
                    className="max-h-[500px] w-auto object-contain mx-auto rounded-2xl transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                    {portfolioItems[0].images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`
          w-3.5 h-3.5 rounded-full
          bg-white/50 
          hover:bg-white/80 
          transition-all duration-300 ease-in-out
          ${idx === 0 ? "bg-white scale-125 shadow-lg shadow-white/60" : ""}
          focus:outline-none
          focus:ring-2 focus:ring-white
        `}
                        aria-label={`Show image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-4">
                      <span className="text-xs font-medium text-primary tracking-wide">
                        {portfolioItems[0].category.toUpperCase()}
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-bold mt-1 leading-snug">
                        {portfolioItems[0].title}
                      </h3>
                      <p className="text-xs opacity-60 mt-1">
                        {portfolioItems[0].client} • {portfolioItems[0].year}
                      </p>
                    </div>

                    <p className="text-base mb-6 leading-relaxed">
                      {portfolioItems[0].description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-base mb-2">
                        Project Highlights
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {portfolioItems[0].tags.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm"
                          >
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            </div>
                            <span className="capitalize">{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-[var(--current-bg)]/30 p-4 rounded-xl border border-[var(--current-nav)]">
                      <div className="flex items-start">
                        <FaQuoteLeft className="text-primary text-xl mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="italic mb-3 text-base leading-relaxed">
                            {portfolioItems[0].testimonial.text}
                          </p>
                          <p className="font-medium text-sm">
                            {portfolioItems[0].testimonial.author}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Website Showcase - Premium Version */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Websites Showcase</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Modern, responsive websites built with cutting-edge technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websites.map((website) => (
              <motion.div
                key={website.id}
                whileHover={{ y: -8 }}
                className="bg-[var(--current-nav)] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all flex flex-col group"
              >
                <div className="relative h-60 overflow-hidden bg-primary-dark">
                  <img
                    src={website.thumbnail}
                    alt={website.title}
                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white">
                      {website.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {website.description}
                    </p>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{website.title}</h3>
                    <span className="text-sm opacity-70">{website.year}</span>
                  </div>
                  <p className="mb-4 text-sm opacity-80 flex-grow">
                    {website.description}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedWebsite(website);
                      setIsModalOpen(true);
                    }}
                    className="w-full py-3 border border-primary/30 text-primary rounded-lg hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Details</span>
                    <FiExternalLink className="text-sm" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Premium Version */}
      <section className="py-20 bg-gradient-to-br from-[var(--current-nav)]/20 to-[var(--current-nav)]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Comprehensive creative solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-[var(--current-bg)] p-8 rounded-2xl shadow-lg border border-[var(--current-nav)] hover:border-primary/30 transition-all"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="opacity-80 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-medium text-lg">
                  {service.projects}+ successful projects
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Premium Version */}
      <section id="process" className="py-20 bg-[var(--current-nav)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              A proven workflow that delivers exceptional results
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-[var(--current-bg)]/20 transform -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[var(--current-bg)] p-8 rounded-2xl shadow-lg border border-[var(--current-nav)] group"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center text-xl font-bold mr-4 shadow-lg">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="mb-6 text-lg leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.activities.map((activity, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                        </span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options Section - Premium Version */}
      <section className="py-20 bg-[var(--current-bg)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Let's Create Together</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Multiple ways to start your project with us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quick Quote",
                icon: "💬",
                description: "Get a project estimate in 24 hours",
                action: "Request Quote",
                color: "from-blue-500 to-blue-600",
              },
              {
                title: "Consultation",
                icon: "📅",
                description: "30-minute free strategy session",
                action: "Book Now",
                color: "from-purple-500 to-purple-600",
              },
              {
                title: "Studio Visit",
                icon: "🏢",
                description: "Meet us at our creative space",
                action: "Schedule Tour",
                color: "from-pink-500 to-pink-600",
              },
            ].map((option, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className={`bg-gradient-to-br ${option.color} p-0.5 rounded-2xl shadow-xl`}
              >
                <div className="bg-[var(--current-bg)] h-full rounded-[15px] p-8 flex flex-col">
                  <div className="text-5xl mb-6">{option.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{option.title}</h3>
                  <p className="opacity-80 mb-6 flex-grow">
                    {option.description}
                  </p>
                  <button
                    className={`px-6 py-3 bg-gradient-to-r ${option.color} text-white rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    {option.action}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* Testimonials Section - Premium Version */}
<section className="py-20 bg-[var(--current-bg)] text-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">Client Testimonials</h2>
      <p className="text-xl opacity-80 max-w-2xl mx-auto">
        What our clients say about working with us
      </p>
    </div>

    <div
      className="max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        {portfolioItems.map(
          (project, index) =>
            activeTestimonial === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5 }}
                className="bg-[var(--current-nav)] p-10 rounded-3xl shadow-xl border border-[var(--current-nav)]"
              >
                <div className="flex items-start mb-8">
                  <div className="flex -space-x-3 mr-6">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-14 h-14 rounded-full bg-[var(--current-bg)] border-2 border-[var(--current-nav)] shadow"
                      />
                    ))}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{project.client}</h3>
                    <p className="opacity-80">{project.title}</p>
                  </div>
                </div>

                <div className="mb-10">
                  <FaQuoteLeft className="text-primary text-4xl mb-6 opacity-20" />
                  <p className="text-2xl italic mb-8 leading-relaxed">
                    {project.testimonial.text}
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className="text-yellow-400 text-xl"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setActiveTestimonial(
                          (prev) =>
                            (prev - 1 + portfolioItems.length) %
                            portfolioItems.length
                        )
                      }
                      className="p-3 rounded-full bg-[var(--current-bg)] hover:bg-[var(--current-nav)] transition-colors shadow"
                    >
                      <FiChevronLeft className="text-lg" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveTestimonial(
                          (prev) => (prev + 1) % portfolioItems.length
                        )
                      }
                      className="p-3 rounded-full bg-[var(--current-bg)] hover:bg-[var(--current-nav)] transition-colors shadow"
                    >
                      <FiChevronRight className="text-lg" />
                    </button>
                  </div>
                  <span className="text-sm opacity-70">
                    {index + 1}/{portfolioItems.length}
                  </span>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  </div>
</section>


      {/* Website Modal - Premium Version */}
      <AnimatePresence>
        {isModalOpen && selectedWebsite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className={`relative bg-[var(--current-bg)] rounded-2xl shadow-2xl overflow-hidden ${
                isFullscreen ? "w-full h-full max-w-none" : "max-w-6xl w-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-20 p-3 bg-[var(--current-nav)] rounded-full hover:bg-[var(--current-nav)]/80 transition-colors shadow-lg"
                onClick={() => setIsModalOpen(false)}
              >
                <FiX className="text-xl" />
              </button>

              {/* Fullscreen toggle */}
              <button
                className="absolute top-4 right-16 z-20 p-3 bg-[var(--current-nav)] rounded-full hover:bg-[var(--current-nav)]/80 transition-colors shadow-lg"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <FiChevronDown className="text-xl" />
                ) : (
                  <FiChevronUp className="text-xl" />
                )}
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Image column */}
                <div
                  className={`relative ${
                    isFullscreen ? "lg:h-full" : "h-96 lg:h-full"
                  } bg-primary-dark`}
                >
                  <img
                    src={selectedWebsite.fullImage}
                    alt={selectedWebsite.title}
                    className="w-full h-full object-contain p-8"
                  />
                </div>

                {/* Content column */}
                <div
                  className={`p-8 lg:p-10 overflow-y-auto ${
                    isFullscreen ? "lg:h-screen" : "lg:h-[600px]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-medium">
                      WEBSITE
                    </span>
                    <span className="text-sm opacity-70">
                      {selectedWebsite.year}
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                    {selectedWebsite.title}
                  </h3>
                  <p className="text-lg mb-8 leading-relaxed">
                    {selectedWebsite.description}
                  </p>

                  <div className="mb-10">
                    <h4 className="font-semibold text-xl mb-4">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedWebsite.stack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-[var(--current-nav)] rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-10">
                    <h4 className="font-semibold text-xl mb-4">Key Features</h4>
                    <ul className="space-y-4">
                      {selectedWebsite.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <span className="text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={selectedWebsite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:opacity-90 transition-opacity text-lg font-medium shadow-lg"
                  >
                    Visit Live Site <FiExternalLink className="ml-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section - Premium Version */}
      <section className="py-28 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/dots-pattern.png')] bg-[length:40px_40px]"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to start your project?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's create something extraordinary together
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <motion.a
              href="/contact"
              className="px-10 py-5 bg-white text-primary rounded-xl font-medium hover:bg-white/90 transition-colors text-lg shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Free Quote
            </motion.a>
            <motion.a
              href="/portfolio"
              className="px-10 py-5 border-2 border-white text-white rounded-xl font-medium hover:bg-white/10 transition-colors text-lg shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Portfolio
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
