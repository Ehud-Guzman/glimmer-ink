import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiArrowRight, FiChevronDown, FiChevronUp, FiX, FiMessageSquare } from 'react-icons/fi';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const HomePage = () => {
  // State for expanded view
  const [expandedService, setExpandedService] = useState(null);
  const [visibleItems, setVisibleItems] = useState(3);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Gallery items data with multiple images
  const services = [
    {
      category: 'Poster Designs',
      items: [
        {
          title: 'Event Posters',
          description: 'Eye-catching designs for concerts, exhibitions, and special events',
          images: [
            '/images/Zuri.png',
            '/images/posters/event-2.jpg',
            '/images/posters/event-3.jpg'
          ],
          link: '/portfolio/posters',
          tags: ['events', 'marketing', 'print']
        },
        {
          title: 'Movie Posters',
          description: 'Cinematic designs that tell stories',
          images: [
            '/images/posters/movie-1.jpg',
            '/images/posters/movie-2.jpg'
          ],
          link: '/portfolio/movie-posters',
          tags: ['entertainment', 'film', 'cinematic']
        },
        {
          title: 'Promotional Posters',
          description: 'Marketing materials that convert',
          images: [
            '/images/posters/promo-1.jpg',
            '/images/posters/promo-2.jpg',
            '/images/posters/promo-3.jpg'
          ],
          link: '/portfolio/promotional',
          tags: ['marketing', 'advertising', 'sales']
        },
        {
          title: 'Political Posters',
          description: 'Powerful messaging for campaigns',
          images: [
            '/images/posters/political-1.jpg',
            '/images/posters/political-2.jpg'
          ],
          link: '/portfolio/political',
          tags: ['campaigns', 'political', 'activism']
        }
      ]
    },
    {
      category: 'Brand Identity',
      items: [
        {
          title: 'Logo Designs',
          description: 'Unique brand marks that capture your essence',
          images: [
            '/images/branding/logo-1.jpg',
            '/images/branding/logo-2.jpg',
            '/images/branding/logo-3.jpg'
          ],
          link: '/portfolio/logos',
          tags: ['branding', 'identity', 'logo']
        },
        {
          title: 'Business Cards',
          description: 'Memorable first impressions in print',
          images: [
            '/images/branding/cards-1.jpg',
            '/images/branding/cards-2.jpg'
          ],
          link: '/portfolio/business-cards',
          tags: ['print', 'networking', 'branding']
        },
        {
          title: 'Letterheads',
          description: 'Professional stationery suite',
          images: [
            '/images/branding/stationery-1.jpg',
            '/images/branding/stationery-2.jpg',
            '/images/branding/stationery-3.jpg'
          ],
          link: '/portfolio/stationery',
          tags: ['print', 'corporate', 'branding']
        },
        {
          title: 'Brand Guidelines',
          description: 'Comprehensive brand playbooks',
          images: [
            '/images/branding/guidelines-1.jpg',
            '/images/branding/guidelines-2.jpg'
          ],
          link: '/portfolio/brand-guidelines',
          tags: ['branding', 'strategy', 'identity']
        }
      ]
    },
    {
      category: 'Digital Designs',
      items: [
        {
          title: 'Website Designs',
          description: 'Responsive, conversion-focused websites',
          images: [
            '/images/digital/website-1.jpg',
            '/images/digital/website-2.jpg',
            '/images/digital/website-3.jpg'
          ],
          link: '/portfolio/websites',
          tags: ['web', 'ui/ux', 'development']
        },
        {
          title: 'Mobile UI/UX',
          description: 'Intuitive app interfaces',
          images: [
            '/images/digital/mobile-1.jpg',
            '/images/digital/mobile-2.jpg'
          ],
          link: '/portfolio/mobile',
          tags: ['mobile', 'app', 'ui/ux']
        },
        {
          title: 'Social Media Kits',
          description: 'Platform-optimized assets',
          images: [
            '/images/digital/social-1.jpg',
            '/images/digital/social-2.jpg',
            '/images/digital/social-3.jpg'
          ],
          link: '/portfolio/social',
          tags: ['social', 'marketing', 'digital']
        },
        {
          title: 'Email Templates',
          description: 'Engaging newsletter designs',
          images: [
            '/images/digital/email-1.jpg',
            '/images/digital/email-2.jpg'
          ],
          link: '/portfolio/email-templates',
          tags: ['email', 'marketing', 'digital']
        }
      ]
    }
  ];

  // Toggle expanded view for a service
  const toggleExpand = (categoryIndex, itemIndex) => {
    setExpandedService(expandedService === `${categoryIndex}-${itemIndex}` ? null : `${categoryIndex}-${itemIndex}`);
  };

  // Show more items
  const showMoreItems = () => {
    setVisibleItems(prev => prev + 3);
  };

  // Send chat message
  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      text: inputMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd recommend checking out our portfolio section for examples of similar work.",
        "Based on your interest, you might like our Brand Identity services.",
        "We've done several projects in that area. Would you like me to show you some examples?",
        "That's a great question! Our team specializes in exactly that kind of work.",
        "I can connect you with one of our designers to discuss your project in more detail."
      ];
      
      const aiMessage = {
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Particle configuration for CTA
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: ['var(--primary)', 'var(--secondary)'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
      },
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 4 },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* AI Chatbot */}
      <div className="fixed bottom-6 right-6 z-40">
        {chatbotOpen ? (
          <motion.div 
            className="glass bg-[var(--current-bg)] rounded-2xl shadow-xl w-80 overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="bg-primary p-4 text-primary flex justify-between items-center">
              <h3 className="font-medium">Design Assistant</h3>
              <button 
                onClick={() => setChatbotOpen(false)}
                className="hover:opacity-80 transition-opacity"
              >
                <FiX />
              </button>
            </div>
            
            <div className="h-64 p-4 overflow-y-auto">
              {chatMessages.length === 0 ? (
                <div className="text-center text-sm opacity-70 h-full flex flex-col justify-center">
                  <p>Hi there! I'm your design assistant.</p>
                  <p>How can I help you today?</p>
                </div>
              ) : (
                chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    <div 
                      className={`inline-block px-3 py-2 rounded-lg max-w-xs ${msg.sender === 'user' 
                        ? 'bg-primary text-primary' 
                        : 'bg-[var(--current-nav)]'}`}
                    >
                      {msg.text}
                    </div>
                    <div className="text-xs opacity-50 mt-1">
                      {msg.time}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-3 border-t border-[var(--current-nav)]">
              <div className="flex">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-[var(--current-nav)] rounded-l-lg px-3 py-2 text-sm focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="bg-primary text-primary px-3 py-2 rounded-r-lg hover:opacity-90 transition-opacity"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setChatbotOpen(true)}
            className="btn-gradient w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMessageSquare size={24} />
          </motion.button>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[var(--current-nav)] to-[var(--current-bg)] overflow-hidden">
        {/* Glowy Gradient Blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary opacity-30 blur-[120px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary opacity-30 blur-[120px] rounded-full animate-pulse-slow" />
        </div>

        {/* Centered Content */}
        <motion.div
          className="text-center px-6 z-10 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-[2.75rem] md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Where <span className="text-primary">Ink</span> Meets<br />
            <span className="text-secondary">Imagination</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl mt-6 mb-10 text-[var(--current-text)]/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Premium design services that bridge creativity and technology
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="/portfolio"
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary rounded-xl font-medium hover:opacity-90 transition-opacity shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
            </motion.a>
            <motion.a
              href="/contact"
              className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/10 transition-all shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Quote
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-sm text-[var(--current-text)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <span className="mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-[var(--current-text)] rounded-full flex justify-center items-start">
            <motion.div
              className="w-1.5 h-1.5 bg-[var(--current-text)] rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Gallery Section */}
      <section className="py-20 bg-[var(--current-bg)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold mb-4 text-primary drop-shadow-title">
              Our Creative Services
            </h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Blending artistry with precision across all mediums
            </p>
          </motion.div>

          {services.map((serviceCategory, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="mb-24"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-10 text-secondary border-b border-[var(--current-bg)]/20 pb-2">
                {serviceCategory.category}
              </h3>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {serviceCategory.items.slice(0, visibleItems).map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="group relative overflow-hidden rounded-2xl backdrop-blur bg-[var(--current-nav)]/70 shadow-xl border border-white/10 transition-all duration-300"
                    variants={item}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    {/* Poster Image Container - Modified for better display */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className={`w-full h-full object-contain ${serviceCategory.category === 'Poster Designs' ? 'bg-navy p-4' : 'object-cover'}`}
                      />
                      {item.images.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-medium">
                          +{item.images.length - 1} more
                        </div>
                      )}
                    </div>

                    <div className="p-6 text-primary">
                      <h4 className="text-xl font-bold mb-2 text-primary ">
                        {item.title}
                      </h4>
                      <p className="opacity-80 mb-4 text-sm">{item.description}</p>

                      <div className="flex justify-between items-center text-blue-600">
                        <a
                          href={item.link}
                          className="inline-flex items-center text-blue hover:underline font-medium transition-all"
                        >
                          View examples <FiArrowRight className="ml-2" />
                        </a>

                        <button
                          onClick={() => toggleExpand(categoryIndex, itemIndex)}
                          className="text-sm text-secondary hover:text-primary transition-colors flex items-center"
                        >
                          {expandedService === `${categoryIndex}-${itemIndex}` ? (
                            <>
                              Show less <FiChevronUp className="ml-1" />
                            </>
                          ) : (
                            <>
                              View all <FiChevronDown className="ml-1" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {expandedService === `${categoryIndex}-${itemIndex}` && (
                      <div className="p-6 border-t border-white/10 bg-[var(--current-nav)]/60 backdrop-blur-sm">
                        <h5 className="font-medium mb-4">All Designs:</h5>
                        <div className="grid grid-cols-2 gap-4">
                          {item.images.slice(1).map((image, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`h-40 overflow-hidden rounded-lg shadow-inner ${serviceCategory.category === 'Poster Designs' ? 'bg-white p-2' : ''}`}
                            >
                              <img
                                src={image}
                                alt={`${item.title} variation ${imgIndex + 1}`}
                                className={`w-full h-full ${serviceCategory.category === 'Poster Designs' ? 'object-contain' : 'object-cover'}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {visibleItems < serviceCategory.items.length && (
                <div className="text-center mt-10">
                  <button
                    onClick={showMoreItems}
                    className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors flex items-center mx-auto"
                  >
                    Show more {serviceCategory.category}
                    <FiChevronDown className="ml-2" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Supreme Process Section */}
      <section className="py-24 bg-[var(--current-nav)] relative overflow-hidden">
        {/* Soft Background Aura */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-primary to-secondary opacity-30 rounded-full blur-[200px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-secondary to-primary opacity-20 rounded-full blur-[180px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Animated Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h2 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-text-glow mb-2">
              Our Creative Process
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto text-[var(--current-text)]">
              Watch concepts evolve into captivating realities.
            </p>
          </motion.div>

          {/* Process Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Discovery",
                description: "Deep dive into your brand and objectives",
                icon: "🔍"
              },
              {
                title: "Design",
                description: "Crafting visual solutions that communicate",
                icon: "🎨"
              },
              {
                title: "Delivery",
                description: "Perfecting and implementing the final product",
                icon: "🚀"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative bg-[var(--current-bg)] p-10 rounded-3xl shadow-xl border border-transparent hover:border-primary/50 transition-all duration-500 backdrop-blur-md group overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: 'easeOut' }}
                whileHover={{ y: -10 }}
              >
                {/* Glowing Icon */}
                <div className="text-5xl mb-6 relative z-10 group-hover:animate-pulse">
                  <span className="drop-shadow-lg">{step.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--current-text)] opacity-85 leading-relaxed relative z-10">
                  {step.description}
                </p>

                {/* Shimmer Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500 z-0 rounded-3xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--current-nav)] to-[var(--current-bg)] overflow-hidden">
        {/* Particle Background */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="pointer-events-auto"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-extrabold text-[var(--current-text)] mb-6 leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Unleash Your Brand's <span className="text-primary">Epic Potential</span>
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-[var(--current-text)] opacity-90 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Transform your vision into a masterpiece that captivates and conquers.
            </motion.p>

            {/* CTA with flare and tilt */}
            <motion.a
              href="/contact"
              className="group relative inline-block px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold text-lg shadow-xl overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:rotate-[0.5deg] hover:shadow-2xl"
              whileHover={{ scale: 1.08, rotate: 0.5 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              {/* Light flare */}
              <span className="absolute -top-1 -left-1 w-40 h-40 bg-white rounded-full opacity-10 blur-2xl pointer-events-none group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative z-10">Launch Your Legacy</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Background aura */}
        <div className="absolute w-[30rem] h-[30rem] bg-primary opacity-30 rounded-full blur-[200px] top-1/3 left-1/2 -translate-x-1/2 -z-10" />
      </section>
    </div>
  );
};

export default HomePage;