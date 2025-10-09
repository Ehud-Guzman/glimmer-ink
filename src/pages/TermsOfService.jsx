import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { FiShield, FiLock, FiAlertTriangle, FiFileText, FiDollarSign, FiCode, FiGlobe } from 'react-icons/fi';

export default function TermsOfService() {
  return (
    <motion.main 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Terms of Service | GlimmerInk</title>
        <meta name="description" content="GlimmerInk's Terms of Service - Legal agreement for using our creative and digital services." />
      </Helmet>

      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-primary to-secondary rounded-3xl shadow-2xl overflow-hidden mb-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 p-12 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Terms of Service
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            The legal agreement governing your use of GlimmerInk's services
          </motion.p>
          
          <motion.div
            className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white/90"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <FiAlertTriangle className="animate-pulse" />
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sticky Navigation Sidebar */}
        <motion.div 
          className="lg:w-64 flex-shrink-0 hidden lg:block"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="sticky top-24 bg-[var(--current-bg)] rounded-xl shadow-lg border border-[var(--current-border)] p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiFileText className="text-primary" /> Quick Navigation
            </h2>
            <nav className="space-y-2">
              {[
                { id: 'introduction', title: '1. Introduction', icon: <FiGlobe /> },
                { id: 'accounts', title: '2. Account Terms', icon: <FiShield /> },
                { id: 'services', title: '3. Services', icon: <FiCode /> },
                { id: 'payments', title: '4. Payments', icon: <FiDollarSign /> },
                { id: 'content', title: '5. Content Policy', icon: <FiFileText /> },
                { id: 'liability', title: '6. Liability', icon: <FiAlertTriangle /> },
                { id: 'termination', title: '7. Termination', icon: <FiLock /> },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[var(--current-bg-hover)] transition-colors text-[var(--current-text)]"
                >
                  {item.icon}
                  {item.title}
                </a>
              ))}
            </nav>
            
            <div className="mt-8 p-4 bg-[var(--current-bg-secondary)] rounded-lg border border-[var(--current-border)]">
              <h3 className="font-medium mb-2">Key Points</h3>
              <ul className="text-sm space-y-2 text-[var(--current-text-secondary)]">
                <li className="flex items-start gap-2">
                  <FiLock className="flex-shrink-0 mt-0.5 text-primary" />
                  <span>25% deposit required to start projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiAlertTriangle className="flex-shrink-0 mt-0.5 text-primary" />
                  <span>2 free revisions included</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiShield className="flex-shrink-0 mt-0.5 text-primary" />
                  <span>Kenyan law governs this agreement</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-[var(--current-bg)] rounded-xl shadow-lg border border-[var(--current-border)] overflow-hidden">
            {/* Content Container */}
            <div className="p-8 md:p-12 space-y-12 text-[var(--current-text)]">
              <Section id="introduction" title="1. Introduction" icon={<FiGlobe />}>
                <p className="text-lg leading-relaxed">
                  Welcome to <strong>GlimmerInk</strong> ("we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our creative design, digital, and printing services (collectively, the "Services"). By using our Services, you agree to be bound by these Terms.
                </p>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div className="bg-[var(--current-bg-secondary)] p-6 rounded-lg border border-[var(--current-border)]">
                    <h3 className="font-bold mb-2 text-primary">Our Services</h3>
                    <p className="text-[var(--current-text-secondary)]">
                      We provide professional design, digital documentation, and online processing services tailored to your needs.
                    </p>
                  </div>
                  <div className="bg-[var(--current-bg-secondary)] p-6 rounded-lg border border-[var(--current-border)]">
                    <h3 className="font-bold mb-2 text-primary">Agreement</h3>
                    <p className="text-[var(--current-text-secondary)]">
                      By using our Services, you confirm you're at least 18 years old and agree to these legally binding Terms.
                    </p>
                  </div>
                </div>
              </Section>

              <Section id="accounts" title="2. Account Terms" icon={<FiShield />}>
                <p>
                  To access certain Services, you may need to create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain the security of your password</li>
                  <li>Notify us immediately of any unauthorized use</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
                
                <div className="mt-6 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                  <h3 className="font-bold mb-2 text-red-600 dark:text-red-300">Prohibited Conduct</h3>
                  <p className="text-red-700 dark:text-red-200">
                    You may not: impersonate others, use bots/scrapers, or engage in fraudulent activities. Violations may result in immediate account termination.
                  </p>
                </div>
              </Section>

              <Section id="services" title="3. Our Services" icon={<FiCode />}>
                <p>
                  GlimmerInk offers the following services under these Terms:
                </p>
                
                <div className="mt-6 space-y-6">
                  <ServiceCategory 
                    title="Digital Documentation"
                    services={[
                      "Professional Printing (B&W and Color)",
                      "Precision Photocopying",
                      "Typesetting & Formatting"
                    ]}
                    terms="Turnaround time: 3-5 business days for standard orders"
                  />
                  
                  <ServiceCategory 
                    title="Online Services"
                    services={[
                      "Government Registration Assistance",
                      "Academic Application Processing",
                      "General Form Submissions"
                    ]}
                    terms="Accuracy guaranteed for submitted information"
                  />
                </div>
              </Section>

              <Section id="payments" title="4. Payments & Pricing" icon={<FiDollarSign />}>
                <p>
                  Our pricing structure is transparent and project-based:
                </p>
                
                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full divide-y divide-[var(--current-border)]">
                    <thead className="bg-[var(--current-bg-secondary)]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--current-text)] uppercase tracking-wider">
                          Plan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--current-text)] uppercase tracking-wider">
                          Monthly
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--current-text)] uppercase tracking-wider">
                          Annual (Save 20%)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--current-border)]">
                      {[
                        { plan: "Basic", monthly: "KSh 2,500", annual: "KSh 10,000" },
                        { plan: "Standard", monthly: "KSh 3,200", annual: "KSh 15,600" },
                        { plan: "Premium", monthly: "KSh 4,500", annual: "KSh 20,000" }
                      ].map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-[var(--current-bg)]' : 'bg-[var(--current-bg-secondary)]'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--current-text)]">
                            {row.plan}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--current-text)]">
                            {row.monthly}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--current-text)]">
                            {row.annual}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div className="bg-[var(--current-bg-secondary)] p-6 rounded-lg border border-[var(--current-border)]">
                    <h3 className="font-bold mb-3 text-primary">Payment Terms</h3>
                    <ul className="space-y-2">
                      <li>25% deposit required to begin work</li>
                      <li>75% balance due upon completion</li>
                      <li>5% late fee applied weekly after due date</li>
                    </ul>
                  </div>
                  <div className="bg-[var(--current-bg-secondary)] p-6 rounded-lg border border-[var(--current-border)]">
                    <h3 className="font-bold mb-3 text-primary">Refund Policy</h3>
                    <ul className="space-y-2">
                      <li>Deposits are non-refundable after work begins</li>
                      <li>No refunds after final delivery</li>
                      <li>Disputes must be filed within 7 days</li>
                    </ul>
                  </div>
                </div>
              </Section>

              {/* Additional sections... */}

              <Section id="contact" title="Contact Us">
                <p>
                  For questions about these Terms, please contact:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Email: legal@glimmerink.com</li>
                  <li>Phone: +254 746 527 253</li>
                  <li>Address: 123 Creative Lane, Nairobi, Kenya</li>
                </ul>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}

// Reusable Section Component
function Section({ id, title, children, icon }) {
  return (
    <motion.section 
      id={id}
      className="scroll-mt-24 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 border-b border-[var(--current-border)] pb-3">
        {icon && <div className="text-2xl text-primary">{icon}</div>}
        <h2 className="text-2xl font-bold text-[var(--current-text)]">
          {title}
        </h2>
      </div>
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
    </motion.section>
  );
}

// Service Category Component
function ServiceCategory({ title, services, terms }) {
  return (
    <motion.div 
      className="bg-[var(--current-bg-secondary)] p-6 rounded-xl border border-[var(--current-border)]"
      whileHover={{ x: 5 }}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="list-disc pl-6 space-y-2">
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      {terms && (
        <p className="mt-4 text-sm text-[var(--current-text-secondary)]">
          <strong>Terms:</strong> {terms}
        </p>
      )}
    </motion.div>
  );
}