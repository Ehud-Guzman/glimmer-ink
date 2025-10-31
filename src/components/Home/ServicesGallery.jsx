// components/Home/ServicesGallery.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn, FiGrid } from "react-icons/fi";

const ServicesGallery = ({ services }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [lightboxProject, setLightboxProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMasonryView, setIsMasonryView] = useState(true);
  const [filteredServices, setFilteredServices] = useState(services);
  
  const lightboxRef = useRef(null);

  // Filter services based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredServices(services);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = services.filter(category => {
      const categoryMatch = category.category.toLowerCase().includes(query);
      const itemMatch = category.items.some(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
      return categoryMatch || itemMatch;
    });
    
    setFilteredServices(filtered);
  }, [searchQuery, services]);

  const openLightbox = (project, imgIndex = 0) => {
    setLightboxProject(project);
    setCurrentImageIndex(imgIndex);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxProject(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => 
      (prevIndex + 1) % lightboxProject.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prevIndex => 
      (prevIndex - 1 + lightboxProject.images.length) % lightboxProject.images.length
    );
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxProject) return;
      
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxProject]);

  // Handle swipe gestures for mobile
  const handleSwipe = (swipeDirection) => {
    if (swipeDirection === "left") nextImage();
    if (swipeDirection === "right") prevImage();
  };

  // Handle click outside lightbox to close
  const handleLightboxClick = (e) => {
    if (e.target === lightboxRef.current) {
      closeLightbox();
    }
  };

  return (
    <section 
      className="py-20 services-gallery-section"
      style={{ background: 'var(--gallery-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Design Excellence Gallery
          </motion.h2>
          <motion.p
            className="text-lg text-[color:var(--current-text)] opacity-80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore my portfolio of design mastery across diverse categories
          </motion.p>
          
          {/* Search and View Controls */}
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search categories or projects..."
                className="w-full px-4 py-3 rounded-xl bg-[color:var(--current-input)] border border-[color:var(--current-border)] text-[color:var(--current-text)] placeholder-[color:var(--neutral-500)] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[color:var(--neutral-500)] hover:text-[color:var(--neutral-300)]"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
            
            {activeCategory && (
              <button 
                onClick={() => setIsMasonryView(!isMasonryView)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
                  isMasonryView 
                    ? 'bg-cyan-600 hover:bg-cyan-700' 
                    : 'bg-[color:var(--current-card)] hover:bg-[color:var(--current-border)]'
                } text-white`}
              >
                <FiGrid size={18} />
                <span>{isMasonryView ? 'Grid View' : 'Masonry View'}</span>
              </button>
            )}
          </motion.div>
        </div>

        {/* Category Grid */}
        {!activeCategory && (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {filteredServices.map((category, i) => (
              <motion.div
                key={i}
                className="relative group overflow-hidden rounded-2xl border border-[color:var(--current-border)] shadow-lg cursor-pointer"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.4, 
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 300
                }}
                onClick={() => setActiveCategory(category)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.items[0]?.images[0] || "/placeholder.webp"}
                    alt={category.category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-white font-bold text-lg truncate">{category.category}</h3>
                    <p className="text-slate-300 text-sm mt-1">{category.items.length} projects</p>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {category.items.length}
                </div>
                
                <div className="p-3 bg-slate-900/80 backdrop-blur-sm text-center text-slate-200 font-medium">
                  {category.category}
                </div>
              </motion.div>
            ))}
            
            {filteredServices.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="text-[color:var(--neutral-500)] text-xl">No results found for "{searchQuery}"</div>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl text-white font-medium transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Expanded Category Gallery */}
        {activeCategory && (
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
              >
                <FiChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>All Categories</span>
              </button>

              <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                {activeCategory.category}
              </h3>
              
              <div className="text-[color:var(--neutral-500)]">
                {activeCategory.items.length} projects
              </div>
            </div>

            {isMasonryView ? (
              // Masonry Layout
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                {activeCategory.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="mb-6 break-inside-avoid rounded-2xl overflow-hidden bg-[color:var(--current-card)] backdrop-blur-lg border border-[color:var(--current-border)] shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-auto object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
                        onClick={() => openLightbox(item)}
                      />
                      {item.images.length > 1 && (
                        <div className="absolute top-4 right-4 bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                          <FiZoomIn size={14} className="mr-1" />
                          {item.images.length}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h4 className="text-xl font-bold text-[color:var(--current-text)] mb-2">{item.title}</h4>
                      <p className="text-[color:var(--neutral-500)]">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags?.map((tag, i) => (
                          <span key={i} className="text-xs px-3 py-1 bg-[color:var(--current-border)] rounded-full text-cyan-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Grid Layout
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCategory.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="rounded-2xl overflow-hidden bg-[color:var(--current-card)] backdrop-blur-lg border border-[color:var(--current-border)] shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
                        onClick={() => openLightbox(item)}
                      />
                      {item.images.length > 1 && (
                        <div className="absolute top-4 right-4 bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                          <FiZoomIn size={14} className="mr-1" />
                          {item.images.length}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h4 className="text-xl font-bold text-[color:var(--current-text)] mb-2">{item.title}</h4>
                      <p className="text-[color:var(--neutral-500)]">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags?.map((tag, i) => (
                          <span key={i} className="text-xs px-3 py-1 bg-[color:var(--current-border)] rounded-full text-cyan-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            ref={lightboxRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleLightboxClick}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 z-10 p-2 bg-slate-800/50 rounded-full backdrop-blur-sm"
              onClick={closeLightbox}
            >
              <FiX size={32} />
            </button>

            <button
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 p-3 bg-slate-800/50 rounded-full backdrop-blur-sm disabled:opacity-30"
              onClick={prevImage}
              disabled={lightboxProject.images.length <= 1}
            >
              <FiChevronLeft size={32} />
            </button>

            <button
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 p-3 bg-slate-800/50 rounded-full backdrop-blur-sm disabled:opacity-30"
              onClick={nextImage}
              disabled={lightboxProject.images.length <= 1}
            >
              <FiChevronRight size={32} />
            </button>

            <div className="max-w-6xl w-full h-full flex flex-col">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-white">{lightboxProject.title}</h3>
                <p className="text-slate-300">{currentImageIndex + 1} of {lightboxProject.images.length}</p>
              </div>
              
              <motion.div
                className="flex-1 flex items-center justify-center"
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={lightboxProject.images[currentImageIndex]}
                  alt={lightboxProject.title}
                  className="max-h-[75vh] max-w-full object-contain"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (offset.x > 100) handleSwipe("right");
                    if (offset.x < -100) handleSwipe("left");
                  }}
                />
              </motion.div>
              
              <div className="mt-4 flex justify-center gap-2">
                {lightboxProject.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      idx === currentImageIndex 
                        ? 'bg-cyan-500' 
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
              
              <div className="mt-6 text-center text-slate-400 max-w-2xl mx-auto">
                {lightboxProject.description}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Sample data for demonstration
ServicesGallery.defaultProps = {
  services: [
    {
      category: "Brand Identity",
      items: [
        {
          title: "EcoLife Rebrand",
          description: "Complete brand identity for sustainable products company",
          images: ["/brand1.webp", "/brand2.webp", "/brand3.webp"],
          tags: ["Logo Design", "Brand Guidelines", "Packaging"]
        },
        {
          title: "TechStart Logo",
          description: "Modern logo for tech startup",
          images: ["/logo1.webp"],
          tags: ["Logo Design"]
        }
      ]
    },
    {
      category: "Web Design",
      items: [
        {
          title: "Fintech Dashboard",
          description: "User interface for financial analytics platform",
          images: ["/web1.webp", "/web2.webp"],
          tags: ["UI Design", "Dashboard", "Fintech"]
        },
        {
          title: "E-commerce Redesign",
          description: "Modern shopping experience redesign",
          images: ["/ecom1.webp"],
          tags: ["UX/UI", "E-commerce"]
        }
      ]
    },
    {
      category: "Print Design",
      items: [
        {
          title: "Fashion Magazine",
          description: "Editorial design for high-end fashion publication",
          images: ["/print1.webp", "/print2.webp", "/print3.webp"],
          tags: ["Editorial", "Layout", "Typography"]
        },
        {
          title: "Event Brochure",
          description: "Promotional materials for tech conference",
          images: ["/brochure1.webp"],
          tags: ["Brochure", "Print"]
        }
      ]
    },
    {
      category: "Packaging",
      items: [
        {
          title: "Organic Tea Packaging",
          description: "Eco-friendly packaging for premium tea brand",
          images: ["/pack1.webp"],
          tags: ["Packaging", "Sustainable Design"]
        },
        {
          title: "Skincare Line",
          description: "Luxury packaging for skincare products",
          images: ["/skincare1.webp", "/skincare2.webp"],
          tags: ["Packaging", "Luxury"]
        }
      ]
    },
    {
      category: "Illustration",
      items: [
        {
          title: "Character Series",
          description: "Set of characters for mobile game",
          images: ["/illustration1.webp", "/illustration2.webp"],
          tags: ["Digital Art", "Characters"]
        },
        {
          title: "Editorial Illustrations",
          description: "Illustrations for magazine articles",
          images: ["/editorial1.webp"],
          tags: ["Editorial", "Digital"]
        }
      ]
    }
  ]
};

export default ServicesGallery;