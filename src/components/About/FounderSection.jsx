import { CheckCircle2, Linkedin, Twitter, Mail } from "lucide-react";
import { LOCATION_LABEL } from "@/data/location";

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/glimmerink" },
  { icon: Twitter, label: "X (Twitter)", href: "https://x.com/GlimmerInk_" },
  { icon: Mail, label: "Email", href: "mailto:nyamuehud@gmail.com" },
];

const expertise = [
  "Business websites",
  "Online shops & M-Pesa",
  "Admin dashboards",
  "Management systems",
  "React & Tailwind CSS",
  "Mobile-first design",
  "SEO fundamentals",
  "Hosting & deployment",
];

// All of these are stated on the Services FAQ.
const expectations = [
  "A fixed quote in KES before any work starts",
  "Working previews at every milestone",
  "30 days of free support after launch",
];

const FounderSection = () => (
  <section className="py-10 md:py-14 px-4 sm:px-6 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">
          The developer
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Ehud Mwai</h2>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          I&apos;m Ehud, the developer behind GlimmerInk. I build business websites, online shops and
          admin-backed systems, and I stay involved from the first brief through launch and support.
        </p>

        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Recent work includes a full booking and events platform for a hotel in Busia and a grains trading
          platform with its own admin backend. Every project gets the same care: clear structure, fast
          pages on mobile, and a result you can manage yourself.
        </p>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">What I do</h3>
          <ul className="flex flex-wrap gap-2">
            {expertise.map((skill) => (
              <li
                key={skill}
                className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Find me online</h3>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary-light hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
              >
                <link.icon className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="min-w-0 space-y-6">
        {/* Identity card */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="h-20 bg-gradient-to-r from-primary to-primary-light" />
          <div className="px-6 sm:px-8 pb-7 -mt-9">
            <div className="h-[72px] w-[72px] rounded-2xl bg-primary text-white border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center mb-4 text-2xl font-bold tracking-tight">
              EM
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ehud Mwai</h3>
            <p className="text-sm text-primary dark:text-primary-light font-medium mb-5">
              Founder · GlimmerInk Creations
            </p>
            <dl className="space-y-3">
              {[
                { label: "Speciality", value: "Websites & business systems" },
                { label: "Based in", value: LOCATION_LABEL },
                { label: "Reply time", value: "Within 24 hours" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center gap-4 text-sm border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0"
                >
                  <dt className="text-gray-500 dark:text-gray-400">{label}</dt>
                  <dd className="font-medium text-gray-900 dark:text-white text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* What to expect */}
        <div className="rounded-2xl border border-primary/20 dark:border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-6">
          <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-3">What to expect</h3>
          <ul className="space-y-2.5">
            {expectations.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary dark:text-primary-light" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default FounderSection;
