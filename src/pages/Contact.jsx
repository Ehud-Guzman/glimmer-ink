import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPaperPlane,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaWhatsapp,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaUser,
  FaPen,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
  from_name: "",
  from_email: "",
  phone: "",
  subject: "",
  service: "",
  message: "",
  year: new Date().getFullYear() // optional but cool if used
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // UI state
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const controls = useAnimation();
  const formRef = useRef(null);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      content:
        "The printing quality exceeded all our expectations. GlimmerInk transformed our marketing materials into works of art that perfectly represent our brand.",
      name: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      image: "/images/2010634.webp",
      rating: 5,
    },
    {
      id: 2,
      content:
        "Working with GlimmerInk was seamless from start to finish. Their attention to detail and commitment to quality is unmatched in the industry.",
      name: "Joan Wagechi",
      role: "CEO, Nairobi Designs",
      image: "/images/african-american-business-woman.webp",
      rating: 5,
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "What's your typical turnaround time?",
      answer:
        "Standard projects are completed within 3-5 business days. Rush services are available for an additional fee with same-day or next-day turnaround.",
    },
    {
      question: "Do you offer design services?",
      answer:
        "Yes! We have an in-house design team that can create custom designs or refine your existing materials to ensure print-ready perfection.",
    },
    {
      question: "What file formats do you accept?",
      answer:
        "We accept all major file formats including PDF, AI, PSD, JPG, PNG, and TIFF. For best results, we recommend vector files (PDF/AI) or high-resolution (300dpi) images.",
    },
    {
      question: "Can I get a sample before my full order?",
      answer:
        "Absolutely. We provide complimentary samples for most products so you can verify quality before committing to your full order.",
    },
  ];

  // Services data
  const services = [
    {
      icon: <FaPhoneAlt className="text-3xl" />,
      title: "Premium Printing",
      description:
        "Offset & digital printing for business cards, brochures, banners, and all your corporate needs.",
    },
    {
      icon: <FiExternalLink className="text-3xl" />,
      title: "Branding Solutions",
      description:
        "Complete branding packages including logo design, stationery, and brand guidelines.",
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Packaging Design",
      description:
        "Custom packaging that protects your product while telling your brand story.",
    },
  ];

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("mu8JNmKu-gMTErqQ2"); // Replace with your EmailJS public key
    animateEntrance();
  }, []);

  const animateEntrance = async () => {
    await controls.start({ opacity: 1, y: 0 });
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error if field is corrected
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

const validateForm = () => {
  const newErrors = {};
  if (!formData.from_name.trim()) newErrors.from_name = "Name is required";
  if (!formData.from_email.trim()) {
    newErrors.from_email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) {
    newErrors.from_email = "Please enter a valid email";
  }
  if (!formData.message.trim()) newErrors.message = "Message is required";
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
        "service-2000", // Replace with your EmailJS service ID
        "template_2000", // Replace with your EmailJS template ID
        formData
      );

      setSubmitStatus({
        type: "success",
        message: "Thank you for your message! We will respond within 24 hours.",
      });

      // Reset form
      setFormData({
    
   from_name: "",
  from_email: "",
  phone: "",
  subject: "",
  service: "",
  message: "",
  year: new Date().getFullYear() // optional but cool if used
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Something went wrong. Please try again or contact us directly.",
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
    setActiveTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[var(--current-bg)] text-[var(--current-text)] overflow-x-hidden">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen max-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-black/40"></div>
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
              </span>{" "}
              Something Extraordinary
            </h1>
            <p className="text-xl md:text-2xl text-primary/90 mb-10 max-w-2xl mx-auto">
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
              <span className="text-sm uppercase tracking-wider">
                Our Expertise
              </span>
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

      {/* Contact Section - God Mode */}
      <section
        id="contact-form"
        className="relative py-32 bg-[var(--current-bg)] overflow-hidden"
      >
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-primary/10 to-secondary/10"
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                width: Math.random() * 8 + 2,
                height: Math.random() * 8 + 2,
                opacity: 0.3,
              }}
              animate={{
                y: [null, (Math.random() - 0.5) * 50],
                x: [null, (Math.random() - 0.5) * 50],
                transition: {
                  duration: Math.random() * 15 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            {/* Contact Form - Premium Enhanced */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-75 blur-lg animate-pulse-slow"></div>

              <div className="relative bg-[var(--current-nav)] p-10 rounded-3xl shadow-2xl border border-white/10">
                {/* Floating form elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full filter blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full filter blur-xl"></div>

                <motion.h2
                  className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Get In Touch
                </motion.h2>

                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className={`p-4 mb-6 rounded-xl ${
                        submitStatus.type === "success"
                          ? "bg-green-900/20 border border-green-500/30 text-green-100"
                          : "bg-red-900/20 border border-red-500/30 text-red-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {submitStatus.type === "success" ? (
                          <FaCheckCircle className="text-xl flex-shrink-0" />
                        ) : (
                          <FaExclamationCircle className="text-xl flex-shrink-0" />
                        )}
                        <span>{submitStatus.message}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-7"
                >
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label
                      htmlFor="name"
                      className="block mb-3 font-medium text-primary/90"
                    >
                      Full Name*
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-5 rounded-xl bg-[var(--current-bg)] border ${
                          errors.name ? "border-red-500/80" : "border-white/10"
                        } focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 placeholder-text-primary/40`}
                        placeholder="Your name"
                        required
                      />
                      <FaUser className="absolute right-5 top-1/2 -translate-y-1/2 text-text-primary/40" />
                    </div>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                      >
                        <FaExclamationCircle /> {errors.name}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label
                      htmlFor="from_email"
                      className="block mb-3 font-medium text-primary/90"
                    >
                      Email*
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="from_email"
                        name="from_email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-5 rounded-xl bg-[var(--current-bg)] border ${
                          errors.email ? "border-red-500/80" : "border-white/10"
                        } focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 placeholder-text-primary/40`}
                        placeholder="your@email.com"
                        required
                      />
                      <FaEnvelope className="absolute right-5 top-1/2 -translate-y-1/2 text-text-primary/40" />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                      >
                        <FaExclamationCircle /> {errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Phone Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label
                      htmlFor="phone"
                      className="block mb-3 font-medium text-primary/90"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-5 rounded-xl bg-[var(--current-bg)] border border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 placeholder-text-primary/40"
                        placeholder="+254 700 000000"
                      />
                      <FaPhoneAlt className="absolute right-5 top-1/2 -translate-y-1/2 text-text-primary/40" />
                    </div>
                  </motion.div>

                  {/* Service Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label
                      htmlFor="service"
                      className="block mb-3 font-medium text-primary/90"
                    >
                      Service Needed
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-5 rounded-xl bg-[var(--current-bg)] border border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 appearance-none pr-12"
                      >
                        <option value="">Select a service</option>
                        <option value="printing">Printing Services</option>
                        <option value="branding">Branding Solutions</option>
                        <option value="packaging">Packaging Design</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                      <FaChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-text-primary/40 pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label
                      htmlFor="message"
                      className="block mb-3 font-medium text-primary/90"
                    >
                      Your Message*
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full p-5 rounded-xl bg-[var(--current-bg)] border ${
                          errors.message
                            ? "border-red-500/80"
                            : "border-white/10"
                        } focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 placeholder-text-primary/40`}
                        placeholder="Tell us about your project..."
                        required
                      ></textarea>
                      <FaPen className="absolute right-5 top-5 text-text-primary/40" />
                    </div>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                      >
                        <FaExclamationCircle /> {errors.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 rounded-xl font-bold text-white flex items-center justify-center gap-3 relative overflow-hidden group"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{
                        background:
                          "linear-gradient(to right, var(--primary), var(--secondary))",
                      }}
                      animate={{
                        background: [
                          "linear-gradient(to right, var(--primary), var(--secondary))",
                          "linear-gradient(to right, var(--secondary), var(--primary))",
                          "linear-gradient(to right, var(--primary), var(--secondary))",
                        ],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message{" "}
                            <FaPaperPlane className="transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Contact Info - Premium Enhanced */}
            <motion.div
              className="space-y-10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h2
                className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Connect With Us
              </motion.h2>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Location Card */}
                <motion.div
                  variants={fadeIn}
                  className="flex items-start gap-6 bg-[var(--current-nav)] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/5 hover:border-primary/20 group"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-primary/20 p-5 rounded-xl text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <FaMapMarkerAlt className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Our Location</h3>
                    <p className="opacity-80 mb-3">Freelance, Kenya</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium inline-flex items-center gap-2 hover:underline"
                    >
                      View on map{" "}
                      <FiExternalLink className="text-sm opacity-70" />
                    </a>
                  </div>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  variants={fadeIn}
                  transition={{ delay: 0.1 }}
                  className="flex items-start gap-6 bg-[var(--current-nav)] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/5 hover:border-primary/20 group"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-primary/20 p-5 rounded-xl text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <FaPhoneAlt className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Call Us</h3>
                    <p className="opacity-80 mb-2">+254 746 527 253</p>
                    <p className="opacity-80 mb-4">Mon-Fri, 8am-5pm EAT</p>
                    <div className="flex flex-wrap gap-3">
                      <motion.a
                        href="tel:+254746527253"
                        className="px-5 py-3 bg-primary/10 text-primary rounded-xl font-medium hover:bg-primary/20 transition-all duration-300 flex items-center gap-2"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaPhoneAlt /> Call Now
                      </motion.a>
                      <motion.a
                        href="https://wa.me/254746527253"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 bg-green-500/10 text-green-400 rounded-xl font-medium hover:bg-green-500/20 transition-all duration-300 flex items-center gap-2"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaWhatsapp /> WhatsApp
                      </motion.a>
                    </div>
                  </div>
                </motion.div>

                {/* Email Card */}
                <motion.div
                  variants={fadeIn}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-6 bg-[var(--current-nav)] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/5 hover:border-primary/20 group"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-primary/20 p-5 rounded-xl text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <FaEnvelope className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Email Us</h3>
                    <p className="opacity-80 mb-4">nyamuehud@gmail.com</p>
                    <motion.a
                      href="mailto:nyamuehud@gmail.com"
                      className="px-5 py-3 bg-primary/10 text-primary rounded-xl font-medium hover:bg-primary/20 transition-all duration-300 flex items-center gap-2"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPaperPlane /> Send Email
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>

              {/* Social Media Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-[var(--current-nav)] p-8 rounded-2xl shadow-xl border border-white/5"
              >
                <h3 className="text-xl font-semibold mb-5">Follow Our Work</h3>
                <p className="opacity-80 mb-6">
                  See our latest projects and behind-the-scenes
                </p>
                <div className="flex gap-5">
                  {[
                    {
                      icon: <FaLinkedin className="text-2xl" />,
                      url: "#",
                      color:
                        "bg-blue-600/10 hover:bg-blue-600/20 text-blue-400",
                    },
                    {
                      icon: <FaInstagram className="text-2xl" />,
                      url: "https://www.instagram.com/ehud_guzman/profilecard/?igsh=ZGx0Znk2aWRjMzVh",
                      color:
                        "bg-pink-600/10 hover:bg-pink-600/20 text-pink-400",
                    },
                    {
                      icon: <FaTwitter className="text-2xl" />,
                      url: "https://x.com/Glimmerink_",
                      color:
                        "bg-blue-400/10 hover:bg-blue-400/20 text-blue-300",
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${social.color}`}
                      aria-label={`${social.icon.type.displayName} link`}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
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
              <span className="text-sm uppercase tracking-wider">
                Need Help?
              </span>
              <div className="w-12 h-px bg-current"></div>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
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
                  whileHover={{
                    backgroundColor: "rgba(var(--primary-rgb), 0.05)",
                  }}
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
                      animate={{ opacity: 1, height: "auto" }}
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
              <span className="text-sm uppercase tracking-wider">
                Client Love
              </span>
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
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `translateX(-${activeTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-[var(--current-nav)] p-8 rounded-2xl shadow-lg">
                      <div className="flex gap-1 text-yellow-400 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-xl" />
                        ))}
                      </div>
                      <p className="text-xl italic mb-8 leading-relaxed">
                        "{testimonial.content}"
                      </p>
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
                          <h4 className="font-bold text-lg">
                            {testimonial.name}
                          </h4>
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
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index
                      ? "bg-primary w-6"
                      : "bg-[var(--current-nav)]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section - Clean Premium */}
      <section className="relative py-24 bg-[var(--current-bg)]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--current-nav)] rounded-2xl p-12 shadow-2xl max-w-4xl mx-auto relative overflow-hidden border border-white/10"
          >
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-5 [mask-image:linear-gradient(to_bottom,transparent,white)]">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGgyMHYyMEgwek0yMCAyMGgyMHYyMEgyMHpNMCAyMGgyMHYyMEgwek0yMCAwaDIwdjIwSDIweiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')]"></div>
            </div>

            {/* Angular gradient accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl from-secondary/20 to-transparent pointer-events-none"></div>

            <div className="relative z-10 text-center">
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Transform Your Vision
                </span>
                <br />
                Into Reality
              </motion.h2>

              <motion.p
                className="text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Our expert team is ready to craft your perfect solution. Let's
                discuss how we can elevate your project.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Primary Button */}
                <motion.a
                  href="#contact-form"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg shadow-lg relative overflow-hidden group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Begin Your Project
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.a>

                {/* Secondary Button */}
                <motion.a
                  href="tel:+254746527253"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-colors relative overflow-hidden group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Schedule a Call
                  </span>
                  <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.a>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                className="mt-12 flex flex-wrap justify-center gap-6 text-sm opacity-80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span>Rated 5.0 (200+ Reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Trusted by 100+ Industry Leaders</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
