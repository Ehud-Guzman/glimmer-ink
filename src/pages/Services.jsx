import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiChevronDown, FiChevronUp, FiCheck, FiX, FiStar, FiShield, FiLock, FiHelpCircle, FiXCircle } from 'react-icons/fi';

const Services = () => {
  // State for expanded service details
  const [expandedService, setExpandedService] = useState(null);
  // State for billing toggle
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);
  // State for tooltip
  const [tooltip, setTooltip] = useState(null);
  // State for selected extras
  const [selectedExtras, setSelectedExtras] = useState({
    basic: { prints: 0 },
    standard: { colorPrints: 0 },
    premium: { apps: 0 }
  });
  // State for active testimonial
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  // State for hovered benefit
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  // State for comparison table visibility
  const [showComparison, setShowComparison] = useState(false);
  // State for checkout modal
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  // State for promo code
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // Pricing data configuration
  const pricingData = {
    basic: {
      monthly: 500,
      annual: 4000,
      features: [
        { included: true, text: '50 B&W prints' },
        { included: true, text: '20 color prints' },
        { included: true, text: 'Basic document formatting' },
        { included: false, text: 'Online application support' },
        { included: false, text: 'Priority support' }
      ],
      extras: {
        prints: [
          { value: 0, price: 0, label: '0 (KSh 0)' },
          { value: 50, price: 250, label: '50 (KSh 250)' },
          { value: 100, price: 450, label: '100 (KSh 450)' }
        ]
      }
    },
    standard: {
      monthly: 1200,
      annual: 9600,
      features: [
        { included: true, text: '100 B&W prints' },
        { included: true, text: '50 color prints' },
        { included: true, text: 'Advanced formatting' },
        { included: true, text: '5 online applications' },
        { included: false, text: '24/7 support' }
      ],
      extras: {
        colorPrints: [
          { value: 0, price: 0, label: '0 (KSh 0)' },
          { value: 20, price: 400, label: '20 (KSh 400)' },
          { value: 40, price: 750, label: '40 (KSh 750)' }
        ]
      }
    },
    premium: {
      monthly: 2500,
      annual: 20000,
      features: [
        { included: true, text: 'Unlimited B&W prints' },
        { included: true, text: '100 color prints' },
        { included: true, text: 'Premium formatting' },
        { included: true, text: '15 online applications' },
        { included: true, text: '24/7 support' }
      ],
      extras: {
        apps: [
          { value: 0, price: 0, label: '0 (KSh 0)' },
          { value: 5, price: 750, label: '5 (KSh 750)' },
          { value: 10, price: 1350, label: '10 (KSh 1,350)' }
        ]
      }
    }
  };

  // Testimonials data
  const testimonials = [
    {
      quote: "GlimmerInk transformed our business documents with their professional printing services. The quality exceeded our expectations!",
      name: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      rating: 5
    },
    {
      quote: "Their online application service saved me hours of frustration. They handled my university applications perfectly while I focused on exams.",
      name: "Michael Omondi",
      role: "Student, Nairobi University",
      rating: 4.5
    },
    {
      quote: "The team at GlimmerInk made our government registration process smooth and stress-free. Highly recommended for any business paperwork!",
      name: "Grace Wambui",
      role: "CEO, GreenSolutions",
      rating: 5
    }
  ];

  // Service categories data
  const serviceCategories = [
    {
      name: "Digital Documentation",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      ),
      services: [
        {
          title: "Professional Printing",
          description: "High-quality printing for documents, presentations, and marketing materials",
          features: ["Color/B&W printing", "Large format printing", "Binding & finishing"],
          expandedContent: "Our professional printing service delivers crisp, vibrant results on premium paper stocks with a variety of finishing options to make your materials stand out."
        },
        {
          title: "Precision Photocopying",
          description: "Accurate reproduction of documents with various scaling options",
          features: ["Bulk copying", "Document resizing", "Quality enhancement"],
          expandedContent: "State-of-the-art copiers ensure your documents are reproduced with perfect clarity, even when enlarging or reducing size, with options for contrast adjustment."
        },
        {
          title: "Typesetting Services",
          description: "Professional document formatting for print and digital",
          features: ["Thesis formatting", "Business documents", "Technical manuals"],
          expandedContent: "Our typesetting experts will ensure your documents have perfect typography, layout, and hierarchy, whether for academic, corporate, or technical purposes."
        }
      ]
    },
    {
      name: "Online Services",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11V11.99z"/>
        </svg>
      ),
      services: [
        {
          title: "Government Registrations",
          description: "Assistance with all official online registrations and applications",
          features: ["Business registrations", "Tax filings", "License applications"],
          expandedContent: "We navigate complex government portals to ensure your registrations are completed accurately and efficiently, saving you hours of frustration."
        },
        {
          title: "Academic Applications",
          description: "Complete handling of educational institution applications",
          features: ["University admissions", "Scholarship forms", "Certification programs"],
          expandedContent: "From gathering required documents to submitting polished applications, we handle every step of the academic application process with care."
        },
        {
          title: "General Online Processing",
          description: "Professional handling of any online forms and submissions",
          features: ["Document uploads", "Form completion", "Status tracking"],
          expandedContent: "Our team becomes your digital concierge, managing all types of online submissions with precision and following up until completion."
        }
      ]
    }
  ];

  // Benefits data
  const benefits = [
    {
      title: "Fast Turnaround",
      description: "Quick service without compromising quality",
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="currentColor" d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
        </svg>
      ),
      hoverEffect: "scale-110 rotate-2"
    },
    {
      title: "Accuracy Guaranteed",
      description: "Precision in every document and application",
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
        </svg>
      ),
      hoverEffect: "scale-110 -rotate-2"
    },
    {
      title: "Confidential Handling",
      description: "Secure processing of sensitive documents",
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="currentColor" d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 15.22 14.47 17 12 17s-4.52-1.78-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V21c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>
        </svg>
      ),
      hoverEffect: "scale-110"
    }
  ];

  // Calculate plan price
  const calculatePlanPrice = (plan) => {
    const basePrice = isAnnualBilling ? pricingData[plan].annual : pricingData[plan].monthly;
    let extrasTotal = 0;
    const extras = selectedExtras[plan];
    for (const [extraType, value] of Object.entries(extras)) {
      const extraOption = pricingData[plan].extras[extraType].find(opt => opt.value === value);
      if (extraOption) {
        extrasTotal += isAnnualBilling ? extraOption.price * 0.8 : extraOption.price;
      }
    }
    const subtotal = basePrice + extrasTotal;
    return subtotal * (1 - promoDiscount);
  };

  // Handle extra change
  const handleExtraChange = (plan, extraType, value) => {
    setSelectedExtras(prev => ({
      ...prev,
      [plan]: {
        ...prev[plan],
        [extraType]: parseInt(value)
      }
    }));
  };

  // Handle promo code
  const applyPromoCode = () => {
    const validCodes = {
      'SAVE10': 0.1,
      'WELCOME20': 0.2
    };
    if (validCodes[promoCode.toUpperCase()]) {
      setPromoDiscount(validCodes[promoCode.toUpperCase()]);
      setPromoError('');
    } else {
      setPromoDiscount(0);
      setPromoError('Invalid promo code');
    }
  };

  // Handle plan selection
  const handlePlanSelection = (plan) => {
    setCheckoutPlan(plan);
  };

  // Handle checkout submission
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const planName = checkoutPlan.charAt(0).toUpperCase() + checkoutPlan.slice(1);
    alert(`Thank you for choosing the ${planName} plan! Your order has been submitted.`);
    setCheckoutPlan(null);
    setPromoCode('');
    setPromoDiscount(0);
    setPromoError('');
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--current-bg)]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[var(--current-nav)] to-[var(--current-bg)] overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-secondary blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.25, 0.1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <motion.div 
          className="text-center px-6 z-10 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="block text-[var(--current-text)]">Comprehensive <span className="text-primary">Cyber</span></span>
            <span className="block text-[var(--current-text)]">Services <span className="text-secondary">Solutions</span></span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-10">
            Your one-stop solution for all digital and printing needs in the modern cyber world
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="#services"
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Services
            </motion.a>
            <motion.a
              href="#pricing"
              className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Pricing
            </motion.a>
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          
        </motion.div>
      </section>

      {/* Services Categories Section */}
      <section id="services" className="py-20 bg-[var(--current-bg)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold mb-4 text-primary">Our Service Categories</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Professional services tailored to your digital and print needs
            </p>
          </motion.div>

          {serviceCategories.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex}
              className="mb-20 bg-[var(--current-nav)] rounded-2xl p-8 shadow-lg"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-6">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-[var(--current-text)]">{category.name}</h3>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.services.map((service, serviceIndex) => (
                  <motion.div 
                    key={serviceIndex}
                    className={`group relative overflow-hidden rounded-xl bg-[var(--current-nav)] shadow-md transition-all duration-300 ${expandedService === `${categoryIndex}-${serviceIndex}` ? 'ring-2 ring-primary' : 'hover:shadow-lg'}`}
                    variants={fadeIn}
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-3 text-[var(--current-text)]">{service.title}</h4>
                      <p className="opacity-80 mb-4">{service.description}</p>
                      
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <FiCheck className="text-green-500 mr-2" />
                            <span className="text-[var(--current-text)]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <button 
                        onClick={() => setExpandedService(expandedService === `${categoryIndex}-${serviceIndex}` ? null : `${categoryIndex}-${serviceIndex}`)}
                        className="flex items-center text-primary font-medium hover:underline"
                      >
                        {expandedService === `${categoryIndex}-${serviceIndex}` ? (
                          <>
                            Show less <FiChevronUp className="ml-2" />
                          </>
                        ) : (
                          <>
                            Learn more <FiChevronDown className="ml-2" />
                          </>
                        )}
                      </button>
                    </div>
                    
                    {/* Expanded content */}
                    <AnimatePresence>
                      {expandedService === `${categoryIndex}-${serviceIndex}` && (
                        <motion.div 
                          className="px-6 pb-6"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="pt-4 border-t border-[var(--current-bg)]/20">
                            <p className="text-[var(--current-text)]">{service.expandedContent}</p>
                            <div className="mt-4">
                              <a 
                                href="/contact" 
                                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                              >
                                Get this service <FiArrowRight className="ml-2" />
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold mb-4 text-primary">Why Choose Our Services?</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              We deliver exceptional value through our commitment to quality and service
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="relative"
                variants={fadeIn}
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <div className={`absolute inset-0 bg-[var(--current-nav)] rounded-xl shadow-lg transition-all duration-500 ${hoveredBenefit === index ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg transition-all duration-500 ${hoveredBenefit === index ? 'opacity-100' : 'opacity-0'}`}></div>
                
                <div className={`relative p-8 rounded-xl h-full transition-all duration-500 ${hoveredBenefit === index ? 'text-white' : 'text-[var(--current-text)]'}`}>
                  <motion.div 
                    className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full ${hoveredBenefit === index ? 'bg-white/20' : 'bg-primary/10'} ${benefit.hoverEffect} transition-transform duration-300`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className={`${hoveredBenefit === index ? 'text-white/90' : 'opacity-80'}`}>{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[var(--current-bg)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold mb-4 text-primary">Client Testimonials</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Hear from businesses and individuals who've used our services
            </p>
          </motion.div>

          <div className="relative h-96">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                activeTestimonial === index && (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : i < testimonial.rating ? 'text-yellow-400 opacity-50' : 'text-gray-300 dark:text-gray-600'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    
                    <blockquote className="text-2xl md:text-3xl font-medium italic text-[var(--current-text)] mb-8">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="text-lg">
                      <p className="font-bold text-[var(--current-text)]">{testimonial.name}</p>
                      <p className="opacity-80">{testimonial.role}</p>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 mx-2 rounded-full transition-colors ${activeTestimonial === index ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[var(--current-nav)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold mb-4 text-primary">Flexible Service Plans</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Choose your perfect package with interactive customization
            </p>
          </motion.div>

          {/* Billing Toggle and Comparison Toggle */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <span className={`text-lg font-medium ${!isAnnualBilling ? 'text-primary' : 'opacity-80'}`}>
                Monthly
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isAnnualBilling}
                  onChange={() => setIsAnnualBilling(!isAnnualBilling)}
                  aria-label="Toggle billing period"
                />
                <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
              <div className="flex flex-col">
                <span className={`text-lg font-medium ${isAnnualBilling ? 'text-primary' : 'opacity-80'}`}>
                  Annual
                </span>
                <span className="text-sm text-green-500">Save 20%</span>
              </div>
            </div>
            <motion.button
              className="mt-4 sm:mt-0 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowComparison(!showComparison)}
              aria-label={showComparison ? "Hide plan comparison" : "Show plan comparison"}
            >
              {showComparison ? 'Hide Comparison' : 'Compare Plans'}
            </motion.button>
          </motion.div>

          {/* Comparison Table */}
          <AnimatePresence>
            {showComparison && (
              <motion.div
                className="mb-12 bg-[var(--current-nav)] rounded-xl shadow-lg p-6 overflow-x-auto"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[var(--current-bg)]/20">
                      <th className="p-4 text-[var(--current-text)] font-bold">Feature</th>
                      <th className="p-4 text-center text-primary">Basic</th>
                      <th className="p-4 text-center text-primary">Standard</th>
                      <th className="p-4 text-center text-primary">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData.basic.features.map((feature, index) => (
                      <tr key={index} className="border-b border-[var(--current-bg)]/20">
                        <td className="p-4 text-[var(--current-text)]">{feature.text}</td>
                        <td className="p-4 text-center">
                          {feature.included ? <FiCheck className="text-green-500 mx-auto" /> : <FiX className="text-red-500 mx-auto" />}
                        </td>
                        <td className="p-4 text-center">
                          {pricingData.standard.features[index].included ? <FiCheck className="text-green-500 mx-auto" /> : <FiX className="text-red-500 mx-auto" />}
                        </td>
                        <td className="p-4 text-center">
                          {pricingData.premium.features[index].included ? <FiCheck className="text-green-500 mx-auto" /> : <FiX className="text-red-500 mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pricing Cards */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Basic Plan */}
            <motion.div 
              className="relative"
              variants={fadeIn}
            >
              <div className="h-full flex flex-col">
                <div className="bg-[var(--current-nav)] p-8 rounded-xl shadow-2xl border border-[var(--current-bg)]/20 hover:border-primary/50 transition-all hover:-translate-y-2 h-full flex flex-col group relative overflow-hidden">
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  
                  {/* Ribbon for mobile */}
                  <div className="lg:hidden absolute -top-3 left-4 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase z-10">
                    Budget Friendly
                  </div>
                  
                  <div className="text-xl font-bold mb-6 text-primary relative pb-4">
                    <span className="relative z-10">Basic</span>
                    <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                  </div>
                  
                  {/* Price with floating animation */}
                  <motion.div 
                    className="text-4xl font-bold mb-6 flex justify-center items-center h-16"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {isAnnualBilling ? (
                      <>
                        <span>KSh {pricingData.basic.annual.toLocaleString()}</span>
                        <span className="text-sm font-normal opacity-80 ml-2">/year</span>
                        <div className="absolute -right-4 top-0 bg-green-500 text-white text-xs px-2 py-1 rounded-lg transform rotate-12 shadow-sm">
                          Save KSh {(pricingData.basic.monthly * 12 - pricingData.basic.annual).toLocaleString()}
                        </div>
                      </>
                    ) : (
                      <>
                        <span>KSh {pricingData.basic.monthly.toLocaleString()}</span>
                        <span className="text-sm font-normal opacity-80 ml-2">/month</span>
                      </>
                    )}
                  </motion.div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {pricingData.basic.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <div className="relative mr-2 mt-1 flex-shrink-0">
                            <FiCheck className="text-green-500 z-10 relative" />
                            <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                          </div>
                        ) : (
                          <FiX className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                        )}
                        <span className="text-[var(--current-text)]">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="my-6 py-6 border-t border-b border-dashed border-[var(--current-bg)]/20 relative">
                    {/* Animated dots on borders */}
                    <div className="absolute -top-3 left-0 right-0 flex justify-center space-x-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-primary/40"></div>
                      ))}
                    </div>
                    <div className="absolute -bottom-3 left-0 right-0 flex justify-center space-x-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-primary/40"></div>
                      ))}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--current-text)] mb-2">
                        Additional B&W Prints: {selectedExtras.basic.prints}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="50"
                        value={selectedExtras.basic.prints}
                        onChange={(e) => handleExtraChange('basic', 'prints', e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        aria-label="Additional B&W prints"
                      />
                      <div className="mt-2 text-sm opacity-80">
                        {pricingData.basic.extras.prints.find(opt => opt.value === selectedExtras.basic.prints)?.label}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center font-bold text-lg mb-6 pt-4 border-t-2 border-primary">
                    <span className="text-[var(--current-text)]">Your Total:</span>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">
                        {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(calculatePlanPrice('basic'))}
                      </span>
                      <FiHelpCircle 
                        className="text-primary/70 cursor-pointer hover:text-primary" 
                        onMouseEnter={() => setTooltip('basic')}
                        onMouseLeave={() => setTooltip(null)}
                        aria-label="View pricing details"
                      />
                      {tooltip === 'basic' && (
                        <div className="absolute right-0 bottom-16 bg-[var(--current-nav)] border border-primary/20 p-3 rounded-lg shadow-lg w-64 text-sm font-normal z-20">
                          Includes base plan plus selected extras. Annual billing saves you 20%.
                          {promoDiscount > 0 && ` ${promoDiscount * 100}% discount applied.`}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <motion.button 
                    className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-xl transition-all hover:opacity-90 mt-auto relative overflow-hidden group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanSelection('basic')}
                    aria-label="Select Basic Plan"
                  >
                    <span className="relative z-10">Select Plan</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            {/* Standard Plan (Featured) */}
            <motion.div 
              className="relative"
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <div className="h-full flex flex-col">
                {/* Popular badge with animation */}
                <motion.div 
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-4 py-1 rounded-full uppercase z-10 shadow-lg flex items-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FiStar className="mr-1" /> Most Popular
                </motion.div>
                
                <div className="bg-[var(--current-nav)] p-8 rounded-xl shadow-2xl border-2 border-primary relative transform lg:scale-[1.03] hover:-translate-y-2 transition-all h-full flex flex-col group overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-500 -z-20">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="text-xl font-bold mb-6 text-primary relative pb-4">
                    <span className="relative z-10">Standard</span>
                    <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                  </div>
                  
                  <motion.div 
                    className="text-4xl font-bold mb-6 flex justify-center items-center h-16 relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {isAnnualBilling ? (
                      <>
                        <span>KSh {pricingData.standard.annual.toLocaleString()}</span>
                        <span className="text-sm font-normal opacity-80 ml-2">/year</span>
                        <div className="absolute -right-4 top-0 bg-green-500 text-white text-xs px-2 py-1 rounded-lg transform rotate-12 shadow-sm">
                          Save KSh {(pricingData.standard.monthly * 12 - pricingData.standard.annual).toLocaleString()}
                        </div>
                      </>
                    ) : (
                      <>
                        <span>KSh {pricingData.standard.monthly.toLocaleString()}</span>
                        <span className="text-sm font-normal opacity-80 ml-2">/month</span>
                      </>
                    )}
                  </motion.div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {pricingData.standard.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <div className="relative mr-2 mt-1 flex-shrink-0">
                            <FiCheck className="text-green-500 z-10 relative" />
                            <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                          </div>
                        ) : (
                          <FiX className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                        )}
                        <span className="text-[var(--current-text)]">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="my-6 py-6 border-t border-b border-dashed border-[var(--current-bg)]/20 relative">
                    <div className="absolute -top-3 left-0 right-0 flex justify-center space-x-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-primary/40"></div>
                      ))}
                    </div>
                    <div className="absolute -bottom-3 left-0 right-0 flex justify-center space-x-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-primary/40"></div>
                      ))}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--current-text)] mb-2">
                        Additional Color Prints: {selectedExtras.standard.colorPrints}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        step="20"
                        value={selectedExtras.standard.colorPrints}
                        onChange={(e) => handleExtraChange('standard', 'colorPrints', e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        aria-label="Additional color prints"
                      />
                      <div className="mt-2 text-sm opacity-80">
                        {pricingData.standard.extras.colorPrints.find(opt => opt.value === selectedExtras.standard.colorPrints)?.label}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center font-bold text-lg mb-6 pt-4 border-t-2 border-primary">
                    <span className="text-[var(--current-text)]">Your Total:</span>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">
                        {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(calculatePlanPrice('standard'))}
                      </span>
                      <FiHelpCircle 
                        className="text-primary/70 cursor-pointer hover:text-primary" 
                        onMouseEnter={() => setTooltip('standard')}
                        onMouseLeave={() => setTooltip(null)}
                        aria-label="View pricing details"
                      />
                      {tooltip === 'standard' && (
                        <div className="absolute right-0 bottom-16 bg-[var(--current-nav)] border border-primary/20 p-3 rounded-lg shadow-lg w-64 text-sm font-normal z-20">
                          Best value plan with color printing included. Annual billing saves you 20%.
                          {promoDiscount > 0 && ` ${promoDiscount * 100}% discount applied.`}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <motion.button 
                    className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-xl transition-all hover:opacity-90 mt-auto relative overflow-hidden group"
                    whileHover={{ 
                      y: -2,
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanSelection('standard')}
                    aria-label="Select Standard Plan"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-20"></div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            {/* Premium Plan */}
            <motion.div 
              className="relative"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="h-full flex flex-col">
                <div className="bg-[var(--current-nav)] p-8 rounded-xl shadow-2xl border border-[var(--current-bg)]/20 hover:border-primary/50 transition-all hover:-translate-y-2 h-full flex flex-col group relative overflow-hidden">
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  
                  {/* Ribbon for mobile */}
                  <div className="lg:hidden absolute -top-3 left-4 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full uppercase z-10">
                    Premium Choice
                  </div>
                  
                  <div className="text-xl font-bold mb-6 text-primary relative pb-4">
                    <span className="relative z-10">Premium</span>
                    <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                  </div>
                  
                  <motion.div 
                    className="text-4xl font-bold mb-6 flex justify-center items-center h-16"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {isAnnualBilling ? (
                      <>
                        <span>KSh {pricingData.premium.annual.toLocaleString()}</span>
                        <span className="text-sm font-normal opacity-80 ml-2">/year</span>
                        <div className="absolute -right-4 top-0 bg-green-500 text-white text-xs px-2 py-1 rounded-lg transform rotate-12 shadow-sm">
                          Save KSh {(pricingData.premium.monthly * 12 - pricingData.premium.annual).toLocaleString()}
                        </div>
                      </>
                    ) : (
                      <>
                        <span>KSh {pricingData.premium.monthly.toLocaleString()}</span>
                        <span className="text-sm font-normal opacity-80 ml-2">/month</span>
                      </>
                    )}
                  </motion.div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {pricingData.premium.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <div className="relative mr-2 mt-1 flex-shrink-0">
                            <FiCheck className="text-green-500 z-10 relative" />
                            <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                          </div>
                        ) : (
                          <FiX className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                        )}
                        <span className="text-[var(--current-text)]">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="my-6 py-6 border-t border-b border-dashed border-[var(--current-bg)]/20 relative">
                    <div className="absolute -top-3 left-0 right-0 flex justify-center space-x-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-primary/40"></div>
                      ))}
                    </div>
                    <div className="absolute -bottom-3 left-0 right-0 flex justify-center space-x-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-primary/40"></div>
                      ))}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--current-text)] mb-2">
                        Additional Online Applications: {selectedExtras.premium.apps}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="5"
                        value={selectedExtras.premium.apps}
                        onChange={(e) => handleExtraChange('premium', 'apps', e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        aria-label="Additional online applications"
                      />
                      <div className="mt-2 text-sm opacity-80">
                        {pricingData.premium.extras.apps.find(opt => opt.value === selectedExtras.premium.apps)?.label}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center font-bold text-lg mb-6 pt-4 border-t-2 border-primary">
                    <span className="text-[var(--current-text)]">Your Total:</span>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">
                        {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(calculatePlanPrice('premium'))}
                      </span>
                      <FiHelpCircle 
                        className="text-primary/70 cursor-pointer hover:text-primary" 
                        onMouseEnter={() => setTooltip('premium')}
                        onMouseLeave={() => setTooltip(null)}
                        aria-label="View pricing details"
                      />
                      {tooltip === 'premium' && (
                        <div className="absolute right-0 bottom-16 bg-[var(--current-nav)] border border-primary/20 p-3 rounded-lg shadow-lg w-64 text-sm font-normal z-20">
                          Our most comprehensive plan with priority support. Annual billing saves you 20%.
                          {promoDiscount > 0 && ` ${promoDiscount * 100}% discount applied.`}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <motion.button 
                    className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-xl transition-all hover:opacity-90 mt-auto relative overflow-hidden group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanSelection('premium')}
                    aria-label="Select Premium Plan"
                  >
                    <span className="relative z-10">Get Premium</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Enterprise CTA */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-[var(--current-nav)] border border-[var(--current-bg)]/20 rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-lg">
                Need custom enterprise solutions?{' '}
                <a 
                  href="/contact" 
                  className="text-primary font-semibold hover:text-secondary transition-colors relative group"
                >
                  Contact our team
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </a>{' '}
                for personalized pricing.
              </p>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center mt-8 gap-6 opacity-80">
              <div className="flex items-center">
                <FiShield className="text-green-500 mr-2" />
                <span>14-day money-back guarantee</span>
              </div>
              <div className="flex items-center">
                <FiLock className="text-blue-500 mr-2" />
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-center">
                <FiHelpCircle className="text-purple-500 mr-2" />
                <span>24/7 customer support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutPlan && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[var(--current-nav)] rounded-xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <button
                className="absolute top-4 right-4 text-[var(--current-text)] hover:text-primary"
                onClick={() => setCheckoutPlan(null)}
                aria-label="Close checkout modal"
              >
                <FiXCircle size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-primary">
                Checkout - {checkoutPlan.charAt(0).toUpperCase() + checkoutPlan.slice(1)} Plan
              </h2>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Plan ({isAnnualBilling ? 'Annual' : 'Monthly'})</span>
                    <span>
                      {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(
                        isAnnualBilling ? pricingData[checkoutPlan].annual : pricingData[checkoutPlan].monthly
                      )}
                    </span>
                  </div>
                  {Object.entries(selectedExtras[checkoutPlan]).map(([extraType, value]) => {
                    const extraOption = pricingData[checkoutPlan].extras[extraType].find(opt => opt.value === value);
                    if (value > 0) {
                      return (
                        <div key={extraType} className="flex justify-between">
                          <span>{extraOption.label}</span>
                          <span>
                            {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(
                              isAnnualBilling ? extraOption.price * 0.8 : extraOption.price
                            )}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Promo Discount ({promoCode})</span>
                      <span>-{promoDiscount * 100}%</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total</span>
                    <span>
                      {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(
                        calculatePlanPrice(checkoutPlan)
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--current-text)] mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full p-2 border border-[var(--current-bg)]/20 rounded-lg bg-[var(--current-nav)] text-[var(--current-text)] focus:ring-2 focus:ring-primary"
                    placeholder="Enter promo code"
                    aria-label="Promo code"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    aria-label="Apply promo code"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-sm mt-2">{promoError}</p>}
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full p-2 border border-[var(--current-bg)]/20 rounded-lg bg-[var(--current-nav)] text-[var(--current-text)] focus:ring-2 focus:ring-primary"
                    aria-label="Card number"
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-1/2 p-2 border border-[var(--current-bg)]/20 rounded-lg bg-[var(--current-nav)] text-[var(--current-text)] focus:ring-2 focus:ring-primary"
                      aria-label="Card expiry date"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-1/2 p-2 border border-[var(--current-bg)]/20 rounded-lg bg-[var(--current-nav)] text-[var(--current-text)] focus:ring-2 focus:ring-primary"
                      aria-label="Card CVV"
                    />
                  </div>
                </div>
              </div>
              <motion.button
                className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckoutSubmit}
                aria-label="Complete purchase"
              >
                Complete Purchase
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to transform your digital presence?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help with your specific needs
            </p>
            <motion.a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;