import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { FiShield, FiLock, FiMail, FiGlobe, FiDatabase, FiUser, FiSettings } from 'react-icons/fi';
import { useState } from 'react';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(null);
  
  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <motion.main 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Privacy Policy | GlimmerInk</title>
        <meta name="description" content="Learn how GlimmerInk collects, uses, and protects your personal information." />
        <meta name="keywords" content="privacy policy, data protection, GDPR, personal data, GlimmerInk" />
      </Helmet>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sticky navigation sidebar */}
        <motion.div 
          className="lg:w-64 flex-shrink-0 hidden lg:block"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="sticky top-24 bg-[var(--current-bg)] rounded-xl shadow-lg border border-[var(--current-border)] p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiShield className="text-primary" /> Policy Navigation
            </h2>
            <nav className="space-y-2">
              {[
                { id: 'introduction', title: 'Introduction' },
                { id: 'information-collected', title: 'Information We Collect' },
                { id: 'data-use', title: 'How We Use Your Data' },
                { id: 'data-security', title: 'Data Security' },
                { id: 'data-retention', title: 'Data Retention' },
                { id: 'legal-rights', title: 'Your Legal Rights' },
                { id: 'third-party', title: 'Third-Party Links' },
                { id: 'cookies', title: 'Cookies' },
                { id: 'policy-changes', title: 'Policy Changes' },
                { id: 'contact', title: 'Contact Us' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-[var(--current-bg-hover)] text-[var(--current-text)]'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </nav>
            
            <div className="mt-8 p-4 bg-[var(--current-bg-secondary)] rounded-lg border border-[var(--current-border)]">
              <h3 className="font-medium mb-2">Quick Summary</h3>
              <ul className="text-sm space-y-2 text-[var(--current-text-secondary)]">
                <li className="flex items-start gap-2">
                  <FiLock className="flex-shrink-0 mt-0.5 text-primary" />
                  <span>We never sell your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiDatabase className="flex-shrink-0 mt-0.5 text-primary" />
                  <span>Minimal data collection</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiUser className="flex-shrink-0 mt-0.5 text-primary" />
                  <span>Full control over your information</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1">
          <motion.div 
            className="bg-[var(--current-bg)] rounded-xl shadow-2xl overflow-hidden border border-[var(--current-border)]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Enhanced header */}
            <div className="relative bg-gradient-to-r from-primary to-secondary p-12 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full filter blur-3xl"></div>
              </div>
              <div className="relative">
                <motion.h1 
                  className="text-5xl font-bold text-white mb-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Privacy Policy
                </motion.h1>
                <motion.p 
                  className="text-xl text-white/90 mb-6"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Your Data. Your Control.
                </motion.p>
                <motion.div
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white/90"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <FiSettings className="animate-spin-slow" />
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </motion.div>
              </div>
            </div>

            {/* Content container */}
            <div className="p-8 md:p-12 space-y-12 text-[var(--current-text)]">
              <Section id="introduction" title="Introduction" icon={<FiGlobe />}>
                <p className="text-lg leading-relaxed">
                  At GlimmerInk, we respect your privacy and are committed to protecting your personal data with 
                  enterprise-grade security measures. This privacy policy explains how we collect, use, disclose, 
                  and safeguard your information when you visit our website or use our services.
                </p>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div className="bg-[var(--current-bg-secondary)] p-6 rounded-lg border border-[var(--current-border)]">
                    <h3 className="font-bold mb-2 text-primary">Our Commitment</h3>
                    <p className="text-[var(--current-text-secondary)]">
                      We adhere to global privacy standards including GDPR, CCPA, and other applicable data protection laws.
                    </p>
                  </div>
                  <div className="bg-[var(--current-bg-secondary)] p-6 rounded-lg border border-[var(--current-border)]">
                    <h3 className="font-bold mb-2 text-primary">Transparency</h3>
                    <p className="text-[var(--current-text-secondary)]">
                      We believe in clear, straightforward language about how we handle your data—no hidden clauses.
                    </p>
                  </div>
                </div>
              </Section>

              <Section id="information-collected" title="1. Information We Collect" icon={<FiDatabase />}>
                <p>
                  We collect only the data necessary to provide and improve our services. Here's a detailed breakdown:
                </p>
                
                <div className="mt-6 space-y-6">
                  <DataCategory 
                    title="Identity Data" 
                    examples={["First name", "Last name", "Username", "Unique user ID"]}
                    purpose="To personalize your experience and secure your account"
                  />
                  
                  <DataCategory 
                    title="Contact Data" 
                    examples={["Email address", "Phone number", "Mailing address (for shipments)"]}
                    purpose="To communicate with you and deliver services"
                  />
                  
                  <DataCategory 
                    title="Technical Data" 
                    examples={["IP address", "Browser type", "Device information", "Operating system"]}
                    purpose="To ensure compatibility and security"
                  />
                  
                  <DataCategory 
                    title="Usage Data" 
                    examples={["Pages visited", "Features used", "Session duration", "Clickstream data"]}
                    purpose="To improve our services and user experience"
                  />
                  
                  <DataCategory 
                    title="Marketing Data" 
                    examples={["Communication preferences", "Subscription status", "Campaign responses"]}
                    purpose="To respect your communication choices"
                  />
                </div>
                
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold mb-2 text-blue-600 dark:text-blue-300">What We Don't Collect</h3>
                  <p className="text-blue-700 dark:text-blue-200">
                    We never collect sensitive information like credit card numbers (processed by PCI-compliant third parties), 
                    government IDs, or health data unless explicitly required and with your explicit consent.
                  </p>
                </div>
              </Section>

              <Section id="data-use" title="2. How We Use Your Data" icon={<FiSettings />}>
                <p>
                  We process your data lawfully, fairly, and transparently. Here are the specific purposes:
                </p>
                
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Service Delivery",
                      description: "To create and manage your account, provide customer support, and fulfill orders",
                      legalBasis: "Contractual necessity"
                    },
                    {
                      title: "Service Improvement",
                      description: "To analyze usage patterns, develop new features, and optimize performance",
                      legalBasis: "Legitimate interest"
                    },
                    {
                      title: "Security",
                      description: "To detect and prevent fraud, unauthorized access, and service abuse",
                      legalBasis: "Legitimate interest"
                    },
                    {
                      title: "Communications",
                      description: "To send service notifications, updates, and (with consent) marketing",
                      legalBasis: "Consent or legitimate interest"
                    },
                    {
                      title: "Legal Compliance",
                      description: "To meet tax, regulatory, and law enforcement requirements",
                      legalBasis: "Legal obligation"
                    },
                    {
                      title: "Personalization",
                      description: "To tailor content, recommendations, and user experience",
                      legalBasis: "Consent or legitimate interest"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-[var(--current-bg-secondary)] p-6 rounded-lg border border-[var(--current-border)] hover:border-primary/50 transition-colors"
                      whileHover={{ y: -2 }}
                    >
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-[var(--current-text-secondary)] mb-3">{item.description}</p>
                      <div className="text-xs bg-[var(--current-bg)] px-2 py-1 rounded inline-block border border-[var(--current-border)]">
                        Legal basis: {item.legalBasis}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Section>

              <Section id="data-security" title="3. Data Security" icon={<FiLock />}>
                <p>
                  We implement robust security measures to protect your data throughout its lifecycle:
                </p>
                
                <div className="mt-6 space-y-6">
                  <SecurityMeasure 
                    title="Encryption" 
                    description="All data in transit uses TLS 1.2+ encryption. Sensitive data at rest is encrypted using AES-256."
                  />
                  
                  <SecurityMeasure 
                    title="Access Controls" 
                    description="Strict role-based access with multi-factor authentication for all employees and contractors."
                  />
                  
                  <SecurityMeasure 
                    title="Infrastructure" 
                    description="Enterprise-grade cloud hosting with regular penetration testing and vulnerability scanning."
                  />
                  
                  <SecurityMeasure 
                    title="Incident Response" 
                    description="24/7 monitoring with defined procedures for potential breaches (never occurred to date)."
                  />
                  
                  <SecurityMeasure 
                    title="Employee Training" 
                    description="Annual privacy training and strict confidentiality agreements for all staff."
                  />
                </div>
                
                <div className="mt-8 bg-green-50 dark:bg-green-900/30 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="font-bold mb-2 text-green-600 dark:text-green-300">Our Security Certifications</h3>
                  <p className="text-green-700 dark:text-green-200">
                    We maintain SOC 2 Type II compliance and regularly undergo independent security audits. 
                    Our infrastructure providers are ISO 27001, ISO 27017, and ISO 27018 certified.
                  </p>
                </div>
              </Section>

              <Section id="data-retention" title="4. Data Retention">
                <p>
                  We retain personal data only as long as necessary for the purposes collected:
                </p>
                
                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full divide-y divide-[var(--current-border)]">
                    <thead className="bg-[var(--current-bg-secondary)]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--current-text)] uppercase tracking-wider">
                          Data Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--current-text)] uppercase tracking-wider">
                          Retention Period
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--current-text)] uppercase tracking-wider">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--current-border)]">
                      {[
                        { type: "Account data", period: "3 years after last activity", notes: "Anonymized after deletion" },
                        { type: "Transaction records", period: "7 years", notes: "For tax compliance" },
                        { type: "Customer support tickets", period: "2 years", notes: "For service improvement" },
                        { type: "Website analytics", period: "26 months", notes: "Automatically deleted after" },
                        { type: "Marketing consents", period: "Until withdrawn", notes: "Immediately removed upon request" },
                      ].map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-[var(--current-bg)]' : 'bg-[var(--current-bg-secondary)]'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--current-text)]">
                            {row.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--current-text)]">
                            {row.period}
                          </td>
                          <td className="px-6 py-4 text-sm text-[var(--current-text-secondary)]">
                            {row.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              <Section id="legal-rights" title="5. Your Legal Rights">
                <p>
                  Under data protection laws, you have rights we want you to know about:
                </p>
                
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Access",
                      description: "Request copies of your personal data we hold (free for first request)",
                      icon: "📄"
                    },
                    {
                      title: "Rectification",
                      description: "Request correction of inaccurate or incomplete data",
                      icon: "✏️"
                    },
                    {
                      title: "Erasure",
                      description: "Request deletion under certain circumstances ('right to be forgotten')",
                      icon: "🗑️"
                    },
                    {
                      title: "Restriction",
                      description: "Request limited processing while disputes are resolved",
                      icon: "⏸️"
                    },
                    {
                      title: "Portability",
                      description: "Receive your data in structured format to transfer elsewhere",
                      icon: "📤"
                    },
                    {
                      title: "Objection",
                      description: "Object to processing based on legitimate interests",
                      icon: "✋"
                    },
                    {
                      title: "Consent Withdrawal",
                      description: "Withdraw previously given consent at any time",
                      icon: "↩️"
                    },
                    {
                      title: "Complaint",
                      description: "Lodge complaints with your local data protection authority",
                      icon: "⚖️"
                    }
                  ].map((right, index) => (
                    <motion.div
                      key={index}
                      className="bg-[var(--current-bg-secondary)] p-6 rounded-lg border border-[var(--current-border)]"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-2xl">{right.icon}</span>
                        <div>
                          <h3 className="font-bold">{right.title}</h3>
                          <p className="text-[var(--current-text-secondary)] mt-1">{right.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h3 className="font-bold mb-2 text-purple-600 dark:text-purple-300">Exercising Your Rights</h3>
                  <p className="text-purple-700 dark:text-purple-200">
                    To exercise any rights, email privacy@glimmerink.com with "Data Request" in the subject. 
                    We respond within 30 days (often faster) and may request verification to protect your data.
                  </p>
                </div>
              </Section>

              <Section id="third-party" title="6. Third-Party Services">
                <p>
                  We integrate with these carefully vetted third-party services:
                </p>
                
                <div className="mt-6 space-y-4">
                  <ThirdPartyService 
                    name="Payment Processors" 
                    providers={["Stripe", "PayPal"]}
                    dataShared={["Payment information (processed directly)", "Transaction amounts"]}
                    privacyLinks={[
                      "https://stripe.com/privacy",
                      "https://www.paypal.com/webapps/mpp/ua/privacy-full"
                    ]}
                  />
                  
                  <ThirdPartyService 
                    name="Analytics" 
                    providers={["Google Analytics", "Amplitude"]}
                    dataShared={["Usage data", "Device information"]}
                    privacyLinks={[
                      "https://policies.google.com/privacy",
                      "https://amplitude.com/privacy"
                    ]}
                  />
                  
                  <ThirdPartyService 
                    name="Hosting" 
                    providers={["AWS", "Vercel"]}
                    dataShared={["All service data"]}
                    privacyLinks={[
                      "https://aws.amazon.com/privacy/",
                      "https://vercel.com/legal/privacy-policy"
                    ]}
                  />
                  
                  <ThirdPartyService 
                    name="Customer Support" 
                    providers={["Zendesk"]}
                    dataShared={["Contact information", "Support tickets"]}
                    privacyLinks={[
                      "https://www.zendesk.com/company/customers-partners/privacy-policy/"
                    ]}
                  />
                </div>
              </Section>

              <Section id="cookies" title="7. Cookies & Tracking">
                <p>
                  We use these technologies to enhance your experience:
                </p>
                
                <div className="mt-6">
                  <h3 className="font-bold mb-3">Essential Cookies</h3>
                  <p className="text-[var(--current-text-secondary)] mb-4">
                    Required for basic functionality (always active):
                  </p>
                  <ul className="space-y-3">
                    <CookieType 
                      name="session_id" 
                      purpose="Maintains your login session" 
                      duration="Until browser closed"
                    />
                    <CookieType 
                      name="csrf_token" 
                      purpose="Prevents cross-site request forgery" 
                      duration="Session"
                    />
                  </ul>
                  
                  <h3 className="font-bold mb-3 mt-6">Optional Cookies</h3>
                  <p className="text-[var(--current-text-secondary)] mb-4">
                    You can manage these in our <a href="/cookie-settings" className="text-primary hover:underline">Cookie Settings</a>:
                  </p>
                  <ul className="space-y-3">
                    <CookieType 
                      name="ga_*" 
                      purpose="Analytics to improve our services" 
                      duration="2 years"
                    />
                    <CookieType 
                      name="marketing_consent" 
                      purpose="Remembers your marketing preferences" 
                      duration="1 year"
                    />
                    <CookieType 
                      name="personalization" 
                      purpose="Stores UI preferences (theme, layout)" 
                      duration="1 month"
                    />
                  </ul>
                </div>
              </Section>

              <Section id="policy-changes" title="8. Policy Updates">
                <p>
                  We may update this policy to reflect legal, technical, or business developments:
                </p>
                
                <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-bold mb-2 text-yellow-600 dark:text-yellow-300">Update Notification Process</h3>
                  <ul className="list-disc pl-6 space-y-2 text-yellow-700 dark:text-yellow-200">
                    <li>Minor changes: Posted on this page with updated date</li>
                    <li>Material changes: Email notification 30 days before taking effect</li>
                    <li>Significant reductions in rights: Additional prominent notice</li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-bold mb-3">Recent Changes</h3>
                  <ul className="space-y-4">
                    <PolicyChange 
                      date="March 15, 2024" 
                      change="Added detailed data retention periods for each data category"
                    />
                    <PolicyChange 
                      date="October 1, 2024" 
                      change="Clarified third-party processor relationships and links to their policies"
                    />
                    <PolicyChange 
                      date="June 5, 2024" 
                      change="Initial GDPR compliance updates and rights explanation"
                    />
                  </ul>
                </div>
              </Section>

              <Section id="contact" title="Contact Our Privacy Team" icon={<FiMail />}>
                <p>
                  We welcome questions, concerns, or requests regarding your data:
                </p>
                
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div className="bg-[var(--current-bg-secondary)] p-6 rounded-lg border border-[var(--current-border)]">
                    <h3 className="font-bold mb-3 text-primary">Data Protection Officer</h3>
                    <p className="mb-4">Email: <a href="mailto:dpo@glimmerink.com" className="hover:underline">dpo@glimmerink.com</a></p>
                    <p>Response time: Typically within 72 hours</p>
                  </div>
                  
                  <div className="bg-[var(--current-bg-secondary)] p-6 rounded-lg border border-[var(--current-border)]">
                    <h3 className="font-bold mb-3 text-primary">Mailing Address</h3>
                    <address className="not-italic">
                      GlimmerInk Privacy Office<br />
                      123 Data Protection Lane<br />
                      Privacy City, PC 12345<br />
                      United States
                    </address>
                  </div>
                </div>
                
                <div className="mt-8 bg-[var(--current-bg-secondary)] p-6 rounded-lg border border-[var(--current-border)]">
                  <h3 className="font-bold mb-3">Need Immediate Help?</h3>
                  <p className="mb-4">For urgent privacy concerns, call our dedicated line:</p>
                  <p className="text-2xl font-mono">+1 (555) 123-4567</p>
                  <p className="text-sm mt-2 text-[var(--current-text-secondary)]">Available 24/7 for verified account holders</p>
                </div>
              </Section>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}

// Reusable Section component with enhanced features
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

// Component for data categories
function DataCategory({ title, examples, purpose }) {
  return (
    <motion.div 
      className="bg-[var(--current-bg-secondary)] p-5 rounded-lg border border-[var(--current-border)]"
      whileHover={{ x: 5 }}
    >
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <div className="mb-3">
        <h4 className="text-sm font-medium text-[var(--current-text-secondary)] mb-1">Examples:</h4>
        <ul className="list-disc pl-5 text-[var(--current-text)]">
          {examples.map((example, i) => (
            <li key={i}>{example}</li>
          ))}
        </ul>
      </div>
      <p className="text-sm">
        <span className="font-medium">Purpose: </span>{purpose}
      </p>
    </motion.div>
  );
}

// Component for security measures
function SecurityMeasure({ title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 mt-1 w-3 h-3 rounded-full bg-primary"></div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-[var(--current-text-secondary)]">{description}</p>
      </div>
    </div>
  );
}

// Component for third-party services
function ThirdPartyService({ name, providers, dataShared, privacyLinks }) {
  return (
    <div className="bg-[var(--current-bg-secondary)] p-5 rounded-lg border border-[var(--current-border)]">
      <h3 className="font-bold text-lg mb-2">{name}</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <h4 className="text-sm font-medium text-[var(--current-text-secondary)] mb-1">Providers:</h4>
          <ul>
            {providers.map((provider, i) => (
              <li key={i}>{provider}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[var(--current-text-secondary)] mb-1">Data Shared:</h4>
          <ul className="list-disc pl-5">
            {dataShared.map((data, i) => (
              <li key={i}>{data}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[var(--current-text-secondary)] mb-1">Privacy Policies:</h4>
          <ul>
            {privacyLinks.map((link, i) => (
              <li key={i}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {providers[i]} Policy
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Component for cookie types
function CookieType({ name, purpose, duration }) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
      <code className="bg-[var(--current-bg)] px-2 py-1 rounded text-sm font-mono w-32 flex-shrink-0">{name}</code>
      <span className="flex-1">{purpose}</span>
      <span className="text-sm text-[var(--current-text-secondary)] w-24 flex-shrink-0">{duration}</span>
    </li>
  );
}

// Component for policy changes
function PolicyChange({ date, change }) {
  return (
    <li className="flex gap-4">
      <div className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-primary"></div>
      <div>
        <span className="font-medium">{date}: </span>
        <span>{change}</span>
      </div>
    </li>
  );
}