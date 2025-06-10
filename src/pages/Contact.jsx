import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaPaperPlane, 
  FaChevronDown, FaChevronLeft, FaChevronRight, FaStar,
  FaWhatsapp, FaLinkedin, FaTwitter, FaInstagram
} from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  // UI state
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const controls = useAnimation();
  const formRef = useRef(null);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      content: "The printing quality exceeded all our expectations. GlimmerInk transformed our marketing materials into works of art that perfectly represent our brand.",
      name: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      image: "/images/testimonial1.jpg",
      rating: 5
    },
    {
      id: 2,
      content: "Working with GlimmerInk was seamless from start to finish. Their attention to detail and commitment to quality is unmatched in the industry.",
      name: "Michael Kariuki",
      role: "CEO, Nairobi Designs",
      image: "/images/testimonial2.jpg",
      rating: 5
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "What's your typical turnaround time?",
      answer: "Standard projects are completed within 3-5 business days. Rush services are available for an additional fee with same-day or next-day turnaround."
    },
    {
      question: "Do you offer design services?",
      answer: "Yes! We have an in-house design team that can create custom designs or refine your existing materials to ensure print-ready perfection."
    },
    {
      question: "What file formats do you accept?",
      answer: "We accept all major file formats including PDF, AI, PSD, JPG, PNG, and TIFF. For best results, we recommend vector files (PDF/AI) or high-resolution (300dpi) images."
    },
    {
      question: "Can I get a sample before my full order?",
      answer: "Absolutely. We provide complimentary samples for most products so you can verify quality before committing to your full order."
    }
  ];

  // Services data
  const services = [
    {
      icon: <FaPhoneAlt className="text-3xl" />,
      title: "Premium Printing",
      description: "Offset & digital printing for business cards, brochures, banners, and all your corporate needs."
    },
    {
      icon: <FiExternalLink className="text-3xl" />,
      title: "Branding Solutions",
      description: "Complete branding packages including logo design, stationery, and brand guidelines."
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Packaging Design",
      description: "Custom packaging that protects your product while telling your brand story."
    }
  ];

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('mu8JNmKu-gMTErqQ2'); // Replace with your EmailJS public key
    animateEntrance();
  }, []);

  const animateEntrance = async () => {
    await controls.start({ opacity: 1, y: 0 });
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error if field is corrected
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        'service-2000', // Replace with your EmailJS service ID
        'template_2000', // Replace with your EmailJS template ID
        formData
      );
      
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We will respond within 24 hours.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI handlers
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
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
    <div className="min-h-screen bg-[var(--current-bg)] text-[var(--current-text)] overflow-x-hidden">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen max-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
          <motion.div 
            className="absolute inset-0 bg-[url('/images/printing-bg.jpg')] bg-cover bg-center"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Let's Create
              </span> Something Extraordinary
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              Partner with Kenya's premier printing and branding specialists
            </p>
            <motion.a
              href="#contact-form"
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.a>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-14 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Service Highlights */}
      <section className="py-24 bg-[var(--current-bg)]">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-4 text-primary/80">
              <div className="w-12 h-px bg-current"></div>
              <span className="text-sm uppercase tracking-wider">Our Expertise</span>
              <div className="w-12 h-px bg-current"></div>
            </div>
            <h2 className="text-4xl font-bold mb-4">Premium Services</h2>
            <p className="max-w-2xl mx-auto text-lg opacity-90">
              Comprehensive solutions tailored to your brand's needs
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="group relative bg-[var(--current-nav)] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section id="contact-form" className="py-24 bg-[var(--current-bg)]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Contact Form */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-75 blur"></div>
              <div className="relative bg-[var(--current-nav)] p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-primary">Get In Touch</h2>
                
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-4 mb-6 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">Full Name*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-4 rounded-lg bg-[var(--current-bg)] border ${errors.name ? 'border-red-500' : 'border-[var(--current-nav)]'} focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
                      placeholder="Your name"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-4 rounded-lg bg-[var(--current-bg)] border ${errors.email ? 'border-red-500' : 'border-[var(--current-nav)]'} focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
                      placeholder="your@email.com"
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-4 rounded-lg bg-[var(--current-bg)] border border-[var(--current-nav)] focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="+254 700 000000"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block mb-2 font-medium">Service Needed</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full p-4 rounded-lg bg-[var(--current-bg)] border border-[var(--current-nav)] focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option value="printing">Printing Services</option>
                      <option value="branding">Branding Solutions</option>
                      <option value="packaging">Packaging Design</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">Your Message*</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full p-4 rounded-lg bg-[var(--current-bg)] border ${errors.message ? 'border-red-500' : 'border-[var(--current-nav)]'} focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
                      placeholder="Tell us about your project..."
                      required
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg font-bold text-white flex items-center justify-center gap-2 relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ background: 'linear-gradient(to right, var(--primary), var(--secondary))' }}
                    animate={{ 
                      background: [
                        'linear-gradient(to right, var(--primary), var(--secondary))',
                        'linear-gradient(to right, var(--secondary), var(--primary))',
                        'linear-gradient(to right, var(--primary), var(--secondary))'
                      ] 
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    <FaPaperPlane className="relative z-10" />
                    <span className="absolute inset-0 bg-black/10 hover:bg-black/5 transition-colors duration-300"></span>
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-6 text-primary"
              >
                Connect With Us
              </motion.h2>
              
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div
                  variants={fadeIn}
                  className="flex items-start gap-6 bg-[var(--current-nav)] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-primary/10 p-4 rounded-full text-primary flex-shrink-0">
                    <FaMapMarkerAlt className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                    <p className="opacity-80 mb-2">Nairobi, Kenya</p>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary font-medium inline-flex items-center gap-1 hover:underline"
                    >
                      View on map <FiExternalLink className="text-sm" />
                    </a>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={fadeIn}
                  transition={{ delay: 0.1 }}
                  className="flex items-start gap-6 bg-[var(--current-nav)] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-primary/10 p-4 rounded-full text-primary flex-shrink-0">
                    <FaPhoneAlt className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                    <p className="opacity-80 mb-2">+254 746 527 253</p>
                    <p className="opacity-80 mb-3">Mon-Fri, 8am-5pm EAT</p>
                    <div className="flex gap-3">
                      <a 
                        href="tel:+254746527253" 
                        className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-colors duration-200"
                      >
                        Call Now
                      </a>
                      <a 
                        href="https://wa.me/254746527253" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg font-medium hover:bg-green-500/20 transition-colors duration-200 inline-flex items-center gap-1"
                      >
                        <FaWhatsapp /> WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={fadeIn}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-6 bg-[var(--current-nav)] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-primary/10 p-4 rounded-full text-primary flex-shrink-0">
                    <FaEnvelope className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                    <p className="opacity-80 mb-3">nyamuehud@gmail.com</p>
                    <a 
                      href="mailto:nyamuehud@gmail.com" 
                      className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-colors duration-200 inline-flex items-center gap-1"
                    >
                      Send Email
                    </a>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-[var(--current-nav)] p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4">Follow Our Work</h3>
                <p className="opacity-80 mb-5">See our latest projects and behind-the-scenes</p>
                <div className="flex gap-4">
                  {[
                    { icon: <FaLinkedin className="text-xl" />, url: '#', color: 'text-blue-600' },
                    { icon: <FaInstagram className="text-xl" />, url: 'https://www.instagram.com/ehud_guzman/profilecard/?igsh=ZGx0Znk2aWRjMzVh', color: 'text-pink-600' },
                    { icon: <FaTwitter className="text-xl" />, url: 'https://x.com/Glimmerink_', color: 'text-blue-400' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-full flex items-center justify-center hover:bg-[var(--current-bg)] transition-colors duration-200 ${social.color}`}
                      aria-label={`${social.icon.type.displayName} link`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[var(--current-nav)]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-4 text-primary/80">
              <div className="w-12 h-px bg-current"></div>
              <span className="text-sm uppercase tracking-wider">Need Help?</span>
              <div className="w-12 h-px bg-current"></div>
            </div>
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="max-w-2xl mx-auto text-lg opacity-90">
              Quick answers to common questions about our services
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-[var(--current-bg)] rounded-xl overflow-hidden shadow-md"
              >
                <motion.button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 text-left"
                  whileHover={{ backgroundColor: 'rgba(var(--primary-rgb), 0.05)' }}
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="opacity-80">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    

      {/* Testimonials Carousel */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-4 text-primary/80">
              <div className="w-12 h-px bg-current"></div>
              <span className="text-sm uppercase tracking-wider">Client Love</span>
              <div className="w-12 h-px bg-current"></div>
            </div>
            <h2 className="text-4xl font-bold mb-4">Client Success Stories</h2>
            <p className="max-w-2xl mx-auto text-lg opacity-90">
              Hear what our clients say about working with us
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-[var(--current-nav)] p-8 rounded-2xl shadow-lg">
                      <div className="flex gap-1 text-yellow-400 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-xl" />
                        ))}
                      </div>
                      <p className="text-xl italic mb-8 leading-relaxed">"{testimonial.content}"</p>
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-1">
                            <FaStar className="text-sm" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{testimonial.name}</h4>
                          <p className="opacity-80">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 bg-[var(--current-nav)] rounded-full shadow-lg flex items-center justify-center hover:bg-primary/10 transition-colors duration-200 group"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="group-hover:text-primary transition-colors duration-200" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 bg-[var(--current-nav)] rounded-full shadow-lg flex items-center justify-center hover:bg-primary/10 transition-colors duration-200 group"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="group-hover:text-primary transition-colors duration-200" />
            </button>
            
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTestimonial === index ? 'bg-primary w-6' : 'bg-[var(--current-nav)]'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-[var(--current-bg)]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--current-nav)] rounded-2xl p-12 shadow-lg max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/10 rounded-full"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
                Ready to Elevate Your Brand?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Let's create something extraordinary together
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.a
                  href="#contact-form"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Now
                </motion.a>
                <motion.a
                  href="tel:+254746527253"
                  className="px-8 py-4 bg-transparent border-2 border-primary text-primary font-bold rounded-full hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call Us Directly
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;