import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, FiPhone, FiMapPin, 
  FiArrowRight, FiInstagram, 
  FiTwitter, FiDribbble, FiLinkedin,
  FiChevronUp
} from 'react-icons/fi';
import { FaBehance } from 'react-icons/fa';

const UltimateFooter = () => {
  const [activeHover, setActiveHover] = useState(null);
  const [copied, setCopied] = useState(false);

  // Enhanced data structure with functional elements
  const footerStructure = {
    brand: {
      logo: {
        primary: "Glimmer",
        secondary: "Ink",
        tagline: "Where ink meets imagination"
      },
      description: "Transforming ideas into exceptional digital experiences through innovative design and development solutions.",
      cta: {
        text: "Start your project",
        url: "/contact",
        hoverText: "Let's create →"
      }
    },
    navigation: [
      {
        title: "Discover",
        links: [
          { name: "Our Work", url: "/portfolio", hoverEffect: "scale" },
          { name: "Services", url: "/services", hoverEffect: "underline" },
          { name: "Process", url: "/process", hoverEffect: "arrow" },
          { name: "About Us", url: "/about", hoverEffect: "highlight" }
        ]
      },
      {
        title: "Resources",
        links: [
          { name: "Blog", url: "/blog", hoverEffect: "scale" },
          { name: "Case Studies", url: "/case-studies", hoverEffect: "underline" },
          { name: "Help Center", url: "/help", hoverEffect: "arrow" },
          { name: "Careers", url: "/careers", hoverEffect: "highlight" }
        ]
      }
    ],
    contact: {
      title: "Get in touch",
      methods: [
        { 
          icon: <FiMail />, 
          text: "nyamuehud@gmail.com", 
          action: () => {
            navigator.clipboard.writeText("nyamuehud@gmail.com");
            setCopied("Email");
            setTimeout(() => setCopied(false), 2000);
          },
          hoverColor: "text-primary"
        },
        { 
          icon: <FiPhone />, 
          text: "+254 746 527 253", 
          action: () => {
            window.location.href = "tel:+254 746 527 253";
          },
          hoverColor: "text-secondary"
        },
        { 
          icon: <FiMapPin />, 
          text: "Freelance, Kenya", 
          action: () => {
            window.open("https://maps.google.com?q=Nairobi+Kenya", "_blank");
          },
          hoverColor: "text-accent"
        }
      ],
      social: [
        { 
          icon: <FiInstagram />, 
          url: "https://instagram.com/ehud_guzman", 
          label: "Instagram",
          bgHover: "bg-gradient-to-br from-yellow-400 to-pink-600"
        },
        { 
          icon: <FiTwitter />, 
          url: "https://twitter.com/Glimmerink_", 
          label: "Twitter",
          bgHover: "bg-gradient-to-br from-blue-400 to-blue-600"
        },
        { 
          icon: <FiDribbble />, 
          url: "https://dribbble.com/Ehud_Guzman", 
          label: "Dribbble",
          bgHover: "bg-gradient-to-br from-pink-400 to-red-500"
        },
        { 
          icon: <FaBehance />, 
          url: "#", 
          label: "Behance",
          bgHover: "bg-gradient-to-br from-blue-500 to-blue-700"
        },
        { 
          icon: <FiLinkedin />, 
          url: "#", 
          label: "LinkedIn",
          bgHover: "bg-gradient-to-br from-blue-600 to-blue-800"
        }
      ]
    },
    legal: [
      { name: "Privacy Policy", url: "/privacypolicy" },
      { name: "Terms of Service", url: "/termsofservice" },
      { name: "Cookie Policy", url: "/cookies" }
    ],
    credits: {
      text: "Website Created by GlimmerInk Creations",
      phone: "+254 746 527 253",
      url: "glimmerink.netlify.app"
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }

  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const hoverItem = {
    rest: { scale: 1 },
    hover: { scale: 1.05 }
  };

  const LinkHoverEffect = ({ effect, children }) => {
    switch(effect) {
      case "scale":
        return (
          <motion.span whileHover={{ scale: 1.05 }} className="block">
            {children}
          </motion.span>
        );
      case "underline":
        return (
          <span className="relative group">
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
          </span>
        );
      case "arrow":
        return (
          <span className="flex items-center gap-1 group">
            {children}
            <FiArrowRight className="opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition-all duration-300" size={14} />
          </span>
        );
      case "highlight":
        return (
          <span className="relative group">
            {children}
            <span className="absolute inset-0 h-full w-0 bg-primary/10 group-hover:w-full transition-all duration-300 rounded-md"></span>
          </span>
        );
      default:
        return children;
    }
  };

  return (
    <motion.footer 
      className="bg-[var(--current-nav)] text-[var(--current-text)] border-t border-[var(--current-bg)]/20 relative overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={container}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
        {/* Brand column */}
        <motion.div 
          className="md:col-span-4 space-y-6"
          variants={item}
        >
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ x: 5 }}
            transition={{ type: "spring" }}
          >
            <a href="/" className="text-3xl font-bold flex items-end">
              <motion.span 
                className="text-primary"
                whileHover={{ y: -3 }}
              >
                {footerStructure.brand.logo.primary}
              </motion.span>
              <motion.span 
                className="text-secondary"
                whileHover={{ y: 3 }}
              >
                {footerStructure.brand.logo.secondary}
              </motion.span>
            </a>
            <span className="text-xs uppercase tracking-widest opacity-60">
              {footerStructure.brand.logo.tagline}
            </span>
          </motion.div>
          
          <p className="text-lg opacity-80 leading-relaxed">
            {footerStructure.brand.description}
          </p>
          
          <motion.div
            className="relative group"
            initial="rest"
            whileHover="hover"
            variants={hoverItem}
          >
            <motion.a
              href={footerStructure.brand.cta.url}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2">
                <span className="block group-hover:hidden">{footerStructure.brand.cta.text}</span>
                <span className="hidden group-hover:block">{footerStructure.brand.cta.hoverText}</span>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Navigation columns */}
        <motion.div 
          className="md:col-span-4 grid grid-cols-2 gap-8"
          variants={item}
        >
          {footerStructure.navigation.map((section, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <motion.li 
                    key={j} 
                    className="relative"
                    onHoverStart={() => setActiveHover(`${i}-${j}`)}
                    onHoverEnd={() => setActiveHover(null)}
                  >
                    <a 
                      href={link.url} 
                      className="flex items-center opacity-80 hover:opacity-100 transition-all py-1"
                    >
                      <LinkHoverEffect effect={link.hoverEffect}>
                        {link.name}
                      </LinkHoverEffect>
                    </a>
                    <AnimatePresence>
                      {activeHover === `${i}-${j}` && (
                        <motion.div 
                          className="absolute inset-0 bg-[var(--current-bg)]/10 rounded-md -z-10"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Contact column */}
        <motion.div 
          className="md:col-span-4 space-y-8"
          variants={item}
        >
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
              {footerStructure.contact.title}
            </h3>
            <ul className="space-y-3">
              {footerStructure.contact.methods.map((method, i) => (
                <motion.li 
                  key={i}
                  className="flex items-center opacity-80 hover:opacity-100 transition-opacity group cursor-pointer"
                  whileHover={{ x: 5 }}
                  onClick={method.action}
                >
                  <span className={`mr-3 ${method.hoverColor} transition-colors`}>
                    {method.icon}
                  </span>
                  <span className="hover:text-primary transition-colors flex items-center gap-2">
                    {method.text}
                    <span className="text-xs opacity-0 group-hover:opacity-70 transition-opacity">
                      {method.icon.type === FiMail ? "⎘" : "→"}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ul>
            <AnimatePresence>
              {copied && (
                <motion.div
                  className="text-sm text-green-500"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {copied} copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-3">
              {footerStructure.contact.social.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`p-2.5 rounded-lg text-white transition-all relative overflow-hidden ${social.bgHover}`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{social.icon}</span>
                  <span className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity"></span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Legal footer */}
      <motion.div 
        className="border-t border-[var(--current-bg)]/20 py-6 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-70">
              © {new Date().getFullYear()} {footerStructure.brand.logo.primary + footerStructure.brand.logo.secondary}. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {footerStructure.legal.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
                  whileHover={{ y: -1 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Credits */}
          <motion.div
            className="mt-4 text-center md:text-center text-xs opacity-50 hover:opacity-80 transition-opacity"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <a href={footerStructure.credits.url} className="inline-flex items-center gap-1">
              {footerStructure.credits.text} || {footerStructure.credits.phone}
              <span className="text-[10px]">↗</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

    {/* Back to top button */}
<motion.button
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all backdrop-blur-sm z-50"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
  whileHover={{ scale: 1.1, rotate: 5 }}
  whileTap={{ scale: 0.9 }}
  aria-label="Back to top"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 15l7-7 7 7"
    />
  </svg>
</motion.button>

        <FiChevronUp size={20} />
      </motion.button>
    </motion.footer>
  );
};

export default UltimateFooter;